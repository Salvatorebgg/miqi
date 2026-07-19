import { beforeEach, describe, expect, it } from 'vitest'
import { createLocalRepository } from './localRepository'
import type {
  CourseProgress,
  DailyTask,
  ExerciseAttempt,
  GameSession,
  ReadingAttempt,
  SavedArticle,
  VocabularyProgress,
} from '../types/domain'

const timestamp = '2026-07-18T08:30:00.000Z'

const task: DailyTask = {
  id: 'task-1',
  userId: 'user-1',
  date: '2026-07-18',
  category: 'math',
  title: 'Complete algebra practice',
  target: 10,
  completed: 4,
  order: 2,
  updatedAt: timestamp,
}

const courseProgress: CourseProgress = {
  id: 'course-progress-1',
  userId: 'user-1',
  courseId: 'algebra-1',
  lessonId: 'lesson-1',
  read: true,
  exerciseScore: 86,
  quizScore: 92,
  updatedAt: timestamp,
}

const exerciseAttempt: ExerciseAttempt = {
  id: 'exercise-attempt-1',
  userId: 'user-1',
  lessonId: 'lesson-1',
  exerciseId: 'exercise-1',
  topic: 'linear equations',
  correct: true,
  durationSeconds: 75,
  createdAt: timestamp,
}

const vocabularyProgress: VocabularyProgress = {
  id: 'vocabulary-1',
  userId: 'user-1',
  wordId: 'word-1',
  familiarity: 2,
  intervalDays: 7,
  nextReviewAt: '2026-07-25T08:30:00.000Z',
  updatedAt: timestamp,
}

const readingAttempt: ReadingAttempt = {
  id: 'reading-attempt-1',
  userId: 'user-1',
  materialId: 'article-1',
  kind: 'news',
  correct: 4,
  total: 5,
  durationSeconds: 120,
  summary: 'A concise summary.',
  createdAt: timestamp,
}

const gameSession: GameSession = {
  id: 'game-session-1',
  userId: 'user-1',
  game: 'sudoku',
  difficulty: 'medium',
  durationSeconds: 360,
  moves: 42,
  score: 880,
  createdAt: timestamp,
}

const savedArticle: SavedArticle = {
  id: 'saved-article-1',
  userId: 'user-1',
  articleId: 'article-1',
  read: false,
  saved: true,
  updatedAt: timestamp,
}

describe('createLocalRepository', () => {
  beforeEach(() => localStorage.clear())

  it('persists every learning record and queues its upsert event', async () => {
    const repository = createLocalRepository(localStorage)

    await repository.saveTask(task)
    await repository.saveCourseProgress(courseProgress)
    await repository.saveExerciseAttempt(exerciseAttempt)
    await repository.saveVocabulary(vocabularyProgress)
    await repository.saveReadingAttempt(readingAttempt)
    await repository.saveGameSession(gameSession)
    await repository.saveArticle(savedArticle)

    expect(await repository.listTasks('2026-07-18')).toEqual([task])
    expect(await repository.listCourseProgress()).toEqual([courseProgress])
    expect(await repository.listExerciseAttempts()).toEqual([exerciseAttempt])
    expect(await repository.listVocabulary()).toEqual([vocabularyProgress])
    expect(await repository.listReadingAttempts()).toEqual([readingAttempt])
    expect(await repository.listGameSessions()).toEqual([gameSession])
    expect(await repository.listSavedArticles()).toEqual([savedArticle])
    expect(repository.pendingEvents()).toMatchObject([
      { entity: 'daily_tasks', entityId: task.id, operation: 'upsert', payload: task },
      { entity: 'course_progress', entityId: courseProgress.id, operation: 'upsert', payload: courseProgress },
      { entity: 'exercise_attempts', entityId: exerciseAttempt.id, operation: 'upsert', payload: exerciseAttempt },
      { entity: 'vocabulary_progress', entityId: vocabularyProgress.id, operation: 'upsert', payload: vocabularyProgress },
      { entity: 'reading_attempts', entityId: readingAttempt.id, operation: 'upsert', payload: readingAttempt },
      { entity: 'game_sessions', entityId: gameSession.id, operation: 'upsert', payload: gameSession },
      { entity: 'saved_articles', entityId: savedArticle.id, operation: 'upsert', payload: savedArticle },
    ])
  })

  it('returns daily tasks in their planned order', async () => {
    const repository = createLocalRepository(localStorage)
    const firstTask = { ...task, id: 'task-0', order: 1 }
    const laterTask = { ...task, id: 'task-2', date: '2026-07-19', order: 0 }

    await repository.saveTask(task)
    await repository.saveTask(firstTask)
    await repository.saveTask(laterTask)

    expect(await repository.listTasks('2026-07-18')).toEqual([firstTask, task])
  })

  it('updates matching records without discarding other user data or prior events', async () => {
    const repository = createLocalRepository(localStorage)
    const anotherTask = { ...task, id: 'task-2', title: 'Read a paper', order: 1 }
    const updatedTask = { ...task, completed: 10, updatedAt: '2026-07-18T09:00:00.000Z' }

    await repository.saveTask(task)
    await repository.saveTask(anotherTask)
    await repository.saveTask(updatedTask)

    expect(await repository.listTasks('2026-07-18')).toEqual([anotherTask, updatedTask])
    expect(repository.pendingEvents()).toHaveLength(3)
  })

  it('keeps events ordered with unique identifiers and acknowledges only selected events', async () => {
    const repository = createLocalRepository(localStorage)

    await repository.saveTask(task)
    await repository.saveTask({ ...task, completed: 5, updatedAt: '2026-07-18T09:00:00.000Z' })
    await repository.saveArticle(savedArticle)

    const events = repository.pendingEvents()
    expect(events.map(event => event.entity)).toEqual(['daily_tasks', 'daily_tasks', 'saved_articles'])
    expect(new Set(events.map(event => event.id)).size).toBe(events.length)

    repository.acknowledgeEvents([events[1].id])

    expect(repository.pendingEvents().map(event => event.id)).toEqual([events[0].id, events[2].id])
  })

  it('falls back safely from corrupted collection and queue JSON', async () => {
    localStorage.setItem('miqi:tasks', '{invalid')
    localStorage.setItem('miqi:sync-events', '{invalid')
    const repository = createLocalRepository(localStorage)

    expect(await repository.listTasks('2026-07-18')).toEqual([])
    expect(repository.pendingEvents()).toEqual([])

    await repository.saveTask(task)

    expect(await repository.listTasks('2026-07-18')).toEqual([task])
    expect(repository.pendingEvents()).toMatchObject([{ entity: 'daily_tasks', entityId: task.id }])
  })
})

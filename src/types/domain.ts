export type LearningCategory = 'math' | 'english' | 'reading' | 'game'

export interface DailyTask {
  id: string
  userId: string
  date: string
  category: LearningCategory
  title: string
  target: number
  completed: number
  order: number
  updatedAt: string
}

export interface CourseProgress {
  id: string
  userId: string
  courseId: string
  lessonId: string
  read: boolean
  exerciseScore: number
  quizScore: number
  updatedAt: string
}

export interface VocabularyProgress {
  id: string
  userId: string
  wordId: string
  familiarity: 0 | 1 | 2
  intervalDays: number
  nextReviewAt: string
  updatedAt: string
}

export interface GameSession {
  id: string
  userId: string
  game: 'sudoku' | 'maze' | 'numberPuzzle' | 'memory' | 'sliding' | 'hanoi' | 'speedMath' | 'simon'
  difficulty: string
  durationSeconds: number
  moves: number
  score: number
  createdAt: string
}

export interface ExerciseAttempt {
  id: string
  userId: string
  lessonId: string
  exerciseId: string
  topic: string
  correct: boolean
  durationSeconds: number
  createdAt: string
}

export interface ReadingAttempt {
  id: string
  userId: string
  materialId: string
  kind: 'scenario' | 'news' | 'paper'
  correct: number
  total: number
  durationSeconds: number
  summary: string
  createdAt: string
}

export interface SavedArticle {
  id: string
  userId: string
  articleId: string
  read: boolean
  saved: boolean
  updatedAt: string
}

export interface SyncEvent {
  id: string
  entity: string
  entityId: string
  operation: 'upsert' | 'delete'
  payload: unknown
  version: number
  updatedAt: string
}

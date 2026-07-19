import type {
  CourseProgress,
  DailyTask,
  ExerciseAttempt,
  GameSession,
  ReadingAttempt,
  SavedArticle,
  SyncEvent,
  VocabularyProgress,
} from '../types/domain'
import type { LearningRepository } from './repository'

type PersistedRecord = { id: string; updatedAt?: string; createdAt?: string }

const storageKey = (key: string) => `miqi:${key}`

const readList = <T>(storage: Storage, key: string): T[] => {
  try {
    const rawValue = storage.getItem(storageKey(key))
    if (rawValue === null) return []

    const parsed: unknown = JSON.parse(rawValue)
    return Array.isArray(parsed) ? (parsed as T[]) : []
  } catch {
    return []
  }
}

const write = (storage: Storage, key: string, value: unknown): void => {
  storage.setItem(storageKey(key), JSON.stringify(value))
}

export function createLocalRepository(storage: Storage): LearningRepository {
  let eventSequence = 0

  const nextEventId = (events: SyncEvent[]): string => {
    let id: string
    do {
      eventSequence += 1
      const randomPart = globalThis.crypto?.randomUUID?.() ?? Date.now().toString(36)
      id = `sync-${randomPart}-${eventSequence}`
    } while (events.some(event => event.id === id))
    return id
  }

  const enqueue = (entity: string, record: PersistedRecord): void => {
    const events = readList<SyncEvent>(storage, 'sync-events')
    const event: SyncEvent = {
      id: nextEventId(events),
      entity,
      entityId: record.id,
      operation: 'upsert',
      payload: record,
      version: 1,
      updatedAt: record.updatedAt ?? record.createdAt ?? new Date().toISOString(),
    }
    write(storage, 'sync-events', [...events, event])
  }

  const save = <T extends PersistedRecord>(key: string, entity: string, record: T): void => {
    const records = readList<T>(storage, key)
    write(storage, key, [...records.filter(item => item.id !== record.id), record])
    enqueue(entity, record)
  }

  return {
    async saveTask(task: DailyTask) {
      save('tasks', 'daily_tasks', task)
    },
    async listTasks(date: string) {
      return readList<DailyTask>(storage, 'tasks')
        .filter(task => task.date === date)
        .sort((first, second) => first.order - second.order)
    },
    async saveCourseProgress(progress: CourseProgress) {
      save('course-progress', 'course_progress', progress)
    },
    async listCourseProgress() {
      return readList<CourseProgress>(storage, 'course-progress')
    },
    async saveExerciseAttempt(attempt: ExerciseAttempt) {
      save('exercise-attempts', 'exercise_attempts', attempt)
    },
    async listExerciseAttempts() {
      return readList<ExerciseAttempt>(storage, 'exercise-attempts')
    },
    async saveVocabulary(progress: VocabularyProgress) {
      save('vocabulary', 'vocabulary_progress', progress)
    },
    async listVocabulary() {
      return readList<VocabularyProgress>(storage, 'vocabulary')
    },
    async saveReadingAttempt(attempt: ReadingAttempt) {
      save('reading-attempts', 'reading_attempts', attempt)
    },
    async listReadingAttempts() {
      return readList<ReadingAttempt>(storage, 'reading-attempts')
    },
    async saveGameSession(session: GameSession) {
      save('game-sessions', 'game_sessions', session)
    },
    async listGameSessions() {
      return readList<GameSession>(storage, 'game-sessions')
    },
    async saveArticle(article: SavedArticle) {
      save('saved-articles', 'saved_articles', article)
    },
    async listSavedArticles() {
      return readList<SavedArticle>(storage, 'saved-articles')
    },
    pendingEvents() {
      return readList<SyncEvent>(storage, 'sync-events')
    },
    acknowledgeEvents(ids: string[]) {
      const acknowledged = new Set(ids)
      write(storage, 'sync-events', readList<SyncEvent>(storage, 'sync-events').filter(event => !acknowledged.has(event.id)))
    },
  }
}

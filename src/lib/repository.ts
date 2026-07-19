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

export interface LearningRepository {
  saveTask(task: DailyTask): Promise<void>
  listTasks(date: string): Promise<DailyTask[]>
  saveCourseProgress(progress: CourseProgress): Promise<void>
  listCourseProgress(): Promise<CourseProgress[]>
  saveExerciseAttempt(attempt: ExerciseAttempt): Promise<void>
  listExerciseAttempts(): Promise<ExerciseAttempt[]>
  saveVocabulary(progress: VocabularyProgress): Promise<void>
  listVocabulary(): Promise<VocabularyProgress[]>
  saveReadingAttempt(attempt: ReadingAttempt): Promise<void>
  listReadingAttempts(): Promise<ReadingAttempt[]>
  saveGameSession(session: GameSession): Promise<void>
  listGameSessions(): Promise<GameSession[]>
  saveArticle(article: SavedArticle): Promise<void>
  listSavedArticles(): Promise<SavedArticle[]>
  pendingEvents(): SyncEvent[]
  acknowledgeEvents(ids: string[]): void
}

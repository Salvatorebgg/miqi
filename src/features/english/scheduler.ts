import type { VocabularyProgress } from '../../types/domain'
import type { IeltsWord, ReadingSet } from '../../data/englishContent'

const intervals = { 0: 1, 1: 3, 2: 7 } as const
const MAX_INTERVAL_DAYS = 60

/**
 * Spaced-repetition update: unfamiliar words come back tomorrow, familiar
 * words double their interval (capped at 60 days).
 */
export function scheduleReview(
  progress: VocabularyProgress,
  rating: 0 | 1 | 2,
  now: Date,
): VocabularyProgress {
  const intervalDays =
    rating === 2 ? Math.min(Math.max(progress.intervalDays * 2, intervals[rating]), MAX_INTERVAL_DAYS) : intervals[rating]
  const next = new Date(now)
  next.setUTCDate(next.getUTCDate() + intervalDays)
  return {
    ...progress,
    familiarity: rating,
    intervalDays,
    nextReviewAt: next.toISOString(),
    updatedAt: now.toISOString(),
  }
}

/** Words due for review at `now`, plus fresh words to reach the daily target. */
export function selectDailyWords(
  words: IeltsWord[],
  progress: VocabularyProgress[],
  now: Date,
  dailyTarget = 12,
): { due: IeltsWord[]; fresh: IeltsWord[] } {
  const byWord = new Map(progress.map(item => [item.wordId, item]))
  const due = words.filter(word => {
    const record = byWord.get(word.id)
    return record && new Date(record.nextReviewAt).getTime() <= now.getTime()
  })
  const fresh = words.filter(word => !byWord.has(word.id)).slice(0, Math.max(dailyTarget - due.length, 0))
  return { due, fresh }
}

/** Deterministically pick a reading set for a date so the day feels planned. */
export function readingForDate<T extends ReadingSet>(sets: T[], date: string): T | undefined {
  if (sets.length === 0) return undefined
  const dayNumber = Math.floor(Date.parse(`${date}T00:00:00Z`) / 86_400_000)
  return sets[dayNumber % sets.length]
}

export interface DailyEnglishPlan {
  date: string
  due: IeltsWord[]
  fresh: IeltsWord[]
  scenario?: ReadingSet
  news?: ReadingSet
  paper?: ReadingSet
}

export function getDailyEnglishPlan(
  date: string,
  words: IeltsWord[],
  progress: VocabularyProgress[],
  scenarios: ReadingSet[],
  newsSets: ReadingSet[],
  paperSets: ReadingSet[],
  now = new Date(),
): DailyEnglishPlan {
  const { due, fresh } = selectDailyWords(words, progress, now)
  return {
    date,
    due,
    fresh,
    scenario: readingForDate(scenarios, date),
    news: readingForDate(newsSets, date),
    paper: readingForDate(paperSets, date),
  }
}

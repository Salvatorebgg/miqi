import { describe, expect, it } from 'vitest'
import { getDailyEnglishPlan, readingForDate, scheduleReview, selectDailyWords } from './scheduler'
import { ieltsWords, scenarioSets, englishNewsSets, paperSets } from '../../data/englishContent'
import type { VocabularyProgress } from '../../types/domain'

const baseProgress: VocabularyProgress = {
  id: 'vp-1',
  userId: 'local-user',
  wordId: 'w01',
  familiarity: 1,
  intervalDays: 3,
  nextReviewAt: '2026-07-18T00:00:00.000Z',
  updatedAt: '2026-07-15T00:00:00.000Z',
}

describe('scheduleReview', () => {
  it.each([[0, 1], [1, 3], [2, 7]] as const)('maps familiarity %i to %i day interval', (rating, days) => {
    const fresh: VocabularyProgress = { ...baseProgress, intervalDays: 1 }
    const next = scheduleReview(fresh, rating, new Date('2026-07-18T00:00:00Z'))
    expect(next.intervalDays).toBe(days)
    expect(next.nextReviewAt).toBe(new Date(Date.UTC(2026, 6, 18 + days)).toISOString())
  })

  it('doubles the interval for mastered words, capped at 60 days', () => {
    const known: VocabularyProgress = { ...baseProgress, intervalDays: 10 }
    expect(scheduleReview(known, 2, new Date('2026-07-18T00:00:00Z')).intervalDays).toBe(20)
    const veteran: VocabularyProgress = { ...baseProgress, intervalDays: 50 }
    expect(scheduleReview(veteran, 2, new Date('2026-07-18T00:00:00Z')).intervalDays).toBe(60)
  })

  it('stamps updatedAt with the review time', () => {
    const next = scheduleReview(baseProgress, 1, new Date('2026-07-18T12:00:00Z'))
    expect(next.updatedAt).toBe('2026-07-18T12:00:00.000Z')
  })
})

describe('selectDailyWords', () => {
  it('selects words whose review time has passed', () => {
    const now = new Date('2026-07-18T00:00:00Z')
    const { due, fresh } = selectDailyWords(ieltsWords, [baseProgress], now)
    expect(due.map(word => word.id)).toEqual(['w01'])
    expect(fresh.length).toBeGreaterThan(0)
    expect(fresh.some(word => word.id === 'w01')).toBe(false)
  })

  it('excludes words scheduled in the future', () => {
    const future: VocabularyProgress = { ...baseProgress, nextReviewAt: '2026-08-01T00:00:00.000Z' }
    const { due } = selectDailyWords(ieltsWords, [future], new Date('2026-07-18T00:00:00Z'))
    expect(due).toHaveLength(0)
  })
})

describe('readingForDate', () => {
  it('is deterministic for a given date', () => {
    expect(readingForDate(scenarioSets, '2026-07-18')).toEqual(readingForDate(scenarioSets, '2026-07-18'))
  })

  it('rotates through the sets across days', () => {
    const picked = new Set(
      ['2026-07-18', '2026-07-19', '2026-07-20', '2026-07-21'].map(date => readingForDate(scenarioSets, date)?.id),
    )
    expect(picked.size).toBeGreaterThan(1)
  })
})

describe('getDailyEnglishPlan', () => {
  it('builds a complete daily plan', () => {
    const plan = getDailyEnglishPlan(
      '2026-07-18',
      ieltsWords,
      [baseProgress],
      scenarioSets,
      englishNewsSets,
      paperSets,
      new Date('2026-07-18T00:00:00Z'),
    )
    expect(plan.due).toHaveLength(1)
    expect(plan.fresh.length).toBeGreaterThan(0)
    expect(plan.scenario?.kind).toBe('scenario')
    expect(plan.news?.kind).toBe('news')
    expect(plan.paper?.kind).toBe('paper')
  })
})

describe('english content contract', () => {
  it('has at least 60 academic words with full fields', () => {
    expect(ieltsWords.length).toBeGreaterThanOrEqual(60)
    for (const word of ieltsWords) {
      expect(word.definition.length).toBeGreaterThan(0)
      expect(word.collocations.length).toBeGreaterThanOrEqual(1)
      expect(word.example.length).toBeGreaterThan(0)
    }
  })

  it('has six scenarios, four news sets, and four paper sets', () => {
    expect(scenarioSets).toHaveLength(6)
    expect(englishNewsSets).toHaveLength(4)
    expect(paperSets).toHaveLength(4)
  })

  it('every reading set covers all four question kinds with explanations', () => {
    for (const set of [...scenarioSets, ...englishNewsSets, ...paperSets]) {
      const kinds = new Set(set.questions.map(question => question.kind))
      for (const kind of ['main-idea', 'detail', 'inference', 'summary'] as const) {
        expect(kinds.has(kind), `${set.id} missing ${kind}`).toBe(true)
      }
      for (const question of set.questions) {
        expect(question.explanation.length).toBeGreaterThan(0)
        expect(question.options.some(option => option.id === question.answer)).toBe(true)
      }
    }
  })
})

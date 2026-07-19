import { describe, expect, it } from 'vitest'
import { aggregateWeakAreas, buildDailyPlan, calculateStreak, categoryCompletion, dayCompletion, nextMathLesson } from './progress'
import type { CourseProgress, DailyTask, ExerciseAttempt } from '../../types/domain'

describe('calculateStreak', () => {
  it('counts a streak ending today across date boundaries', () => {
    expect(calculateStreak(['2026-07-16', '2026-07-17', '2026-07-18'], '2026-07-18')).toBe(3)
  })

  it('returns 0 when today is missing and stops at gaps', () => {
    expect(calculateStreak(['2026-07-17'], '2026-07-18')).toBe(0)
    expect(calculateStreak(['2026-07-15', '2026-07-17', '2026-07-18'], '2026-07-18')).toBe(2)
  })

  it('handles month boundaries', () => {
    expect(calculateStreak(['2026-06-30', '2026-07-01'], '2026-07-01')).toBe(2)
  })
})

describe('aggregateWeakAreas', () => {
  const attempt = (topic: string, correct: boolean, createdAt: string): ExerciseAttempt => ({
    id: `${topic}-${createdAt}-${correct}`,
    userId: 'u',
    lessonId: 'l',
    exerciseId: 'e',
    topic,
    correct,
    durationSeconds: 10,
    createdAt,
  })

  it('ranks weak areas by errors weighted toward recent attempts', () => {
    const attempts = [
      attempt('limits', false, new Date().toISOString()),
      attempt('limits', false, new Date().toISOString()),
      attempt('vectors', false, new Date(Date.now() - 120 * 86_400_000).toISOString()),
      attempt('vectors', true, new Date().toISOString()),
    ]
    expect(aggregateWeakAreas(attempts)[0]).toMatchObject({ topic: 'limits' })
  })

  it('excludes topics with no errors', () => {
    expect(aggregateWeakAreas([attempt('integrals', true, new Date().toISOString())])).toHaveLength(0)
  })
})

describe('buildDailyPlan', () => {
  const baseContext = {
    userId: 'local-user',
    date: '2026-07-18',
    existingTasks: [] as DailyTask[],
    courseProgress: [] as CourseProgress[],
    vocabulary: [],
    now: new Date('2026-07-18T08:00:00Z'),
  }

  it('creates math, english, reading, and game tasks', () => {
    const plan = buildDailyPlan(baseContext)
    const categories = plan.map(task => task.category)
    expect(categories).toContain('math')
    expect(categories).toContain('english')
    expect(categories).toContain('reading')
    expect(categories).toContain('game')
  })

  it('never creates duplicate tasks for existing IDs', () => {
    const first = buildDailyPlan(baseContext)
    const second = buildDailyPlan({ ...baseContext, existingTasks: first })
    expect(second).toHaveLength(0)
  })

  it('starts with the first bridge lesson when nothing is done', () => {
    const plan = buildDailyPlan(baseContext)
    expect(plan.find(task => task.category === 'math')?.title).toContain('函数与图像')
  })
})

describe('nextMathLesson', () => {
  it('skips fully completed lessons and respects prerequisites', () => {
    const done: CourseProgress = {
      id: 'cp1',
      userId: 'u',
      courseId: 'bridge',
      lessonId: 'bridge-functions',
      read: true,
      exerciseScore: 100,
      quizScore: 100,
      updatedAt: '2026-07-18T00:00:00.000Z',
    }
    expect(nextMathLesson([done])).toBe('bridge-trig')
  })

  it('keeps the current lesson when prerequisites are unmet', () => {
    expect(nextMathLesson([])).toBe('bridge-functions')
  })
})

describe('dayCompletion / categoryCompletion', () => {
  const task = (category: string, completed: number, target: number): DailyTask => ({
    id: `${category}-t`,
    userId: 'u',
    date: '2026-07-18',
    category: category as DailyTask['category'],
    title: category,
    target,
    completed,
    order: 0,
    updatedAt: '2026-07-18T00:00:00.000Z',
  })

  it('computes percentages per category and overall', () => {
    const tasks = [task('math', 1, 1), task('english', 6, 12), task('reading', 0, 1)]
    expect(dayCompletion(tasks)).toBe(50)
    expect(categoryCompletion(tasks).english).toEqual({ done: 6, target: 12 })
  })

  it('returns 0 for an empty day', () => {
    expect(dayCompletion([])).toBe(0)
  })
})

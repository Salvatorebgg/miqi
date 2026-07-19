import type { CourseProgress, DailyTask, ExerciseAttempt, VocabularyProgress } from '../../types/domain'
import { mathLessons, findLesson } from '../../data/mathCurriculum'
import { lessonCompletion } from '../math/math'
import { ieltsWords } from '../../data/englishContent'

/** Consecutive active days ending at `today` (0 if today is not active). */
export function calculateStreak(activeDates: string[], today: string): number {
  const dates = new Set(activeDates)
  const cursor = new Date(`${today}T00:00:00Z`)
  let streak = 0
  while (dates.has(cursor.toISOString().slice(0, 10))) {
    streak += 1
    cursor.setUTCDate(cursor.getUTCDate() - 1)
  }
  return streak
}

export interface WeakArea {
  topic: string
  errors: number
  attempts: number
  weightedErrors: number
}

/** Ranks topics by errors, weighting recent mistakes more heavily. */
export function aggregateWeakAreas(attempts: ExerciseAttempt[], now = Date.now()): WeakArea[] {
  const HALF_LIFE_MS = 14 * 86_400_000
  const byTopic = new Map<string, WeakArea>()
  for (const attempt of attempts) {
    const age = Math.max(0, now - Date.parse(attempt.createdAt))
    const weight = Math.pow(0.5, age / HALF_LIFE_MS)
    const area = byTopic.get(attempt.topic) ?? { topic: attempt.topic, errors: 0, attempts: 0, weightedErrors: 0 }
    area.attempts += 1
    if (!attempt.correct) {
      area.errors += 1
      area.weightedErrors += weight
    }
    byTopic.set(attempt.topic, area)
  }
  return [...byTopic.values()]
    .filter(area => area.errors > 0)
    .sort((a, b) => b.weightedErrors - a.weightedErrors)
}

export interface PlanContext {
  userId: string
  date: string
  existingTasks: DailyTask[]
  courseProgress: CourseProgress[]
  vocabulary: VocabularyProgress[]
  now?: Date
}

export const MATH_TASK_TARGET = 1
export const VOCAB_TASK_TARGET = 12

/** The next mathematics lesson to study: first unlocked lesson not fully completed. */
export function nextMathLesson(courseProgress: CourseProgress[]): string | null {
  const byLesson = new Map(courseProgress.map(item => [item.lessonId, item]))
  for (const lesson of mathLessons) {
    const record = byLesson.get(lesson.id)
    if (record && lessonCompletion(record) >= 100) continue
    const locked = lesson.prerequisites.some(prerequisite => {
      const prereq = byLesson.get(prerequisite)
      return !prereq || lessonCompletion(prereq) < 60
    })
    if (!locked) return lesson.id
  }
  return null
}

/**
 * Builds the day's task list. IDs are deterministic per user/date/content so
 * regenerating the plan never creates duplicates.
 */
export function buildDailyPlan(context: PlanContext): DailyTask[] {
  const { userId, date, existingTasks, courseProgress, vocabulary } = context
  const now = context.now ?? new Date()
  const existingIds = new Set(existingTasks.map(task => task.id))
  const tasks: DailyTask[] = []
  let order = existingTasks.length

  const push = (id: string, category: DailyTask['category'], title: string, target: number) => {
    if (existingIds.has(id)) return
    tasks.push({
      id,
      userId,
      date,
      category,
      title,
      target,
      completed: 0,
      order: order++,
      updatedAt: now.toISOString(),
    })
  }

  const lessonId = nextMathLesson(courseProgress)
  if (lessonId) {
    const lesson = findLesson(lessonId)
    if (lesson) push(`task-${userId}-${date}-math-${lessonId}`, 'math', `数学：${lesson.title}`, MATH_TASK_TARGET)
  }

  const dueCount = vocabulary.filter(item => new Date(item.nextReviewAt).getTime() <= now.getTime()).length
  const newCount = Math.max(VOCAB_TASK_TARGET - dueCount, 0)
  const learned = new Set(vocabulary.map(item => item.wordId))
  const freshAvailable = ieltsWords.filter(word => !learned.has(word.id)).length
  const vocabTarget = Math.min(dueCount + Math.min(newCount, freshAvailable), VOCAB_TASK_TARGET)
  if (vocabTarget > 0) {
    push(`task-${userId}-${date}-english-vocab`, 'english', `英语：背诵/复习 ${vocabTarget} 个雅思词汇`, vocabTarget)
  }

  push(`task-${userId}-${date}-reading`, 'reading', '阅读：完成今日情景/新闻/论文精读', 1)
  push(`task-${userId}-${date}-game`, 'game', '脑力：一局数独或迷宫', 1)

  return tasks
}

/** Per-category completion ratio for a list of tasks. */
export function categoryCompletion(tasks: DailyTask[]): Record<string, { done: number; target: number }> {
  const result: Record<string, { done: number; target: number }> = {}
  for (const task of tasks) {
    const entry = result[task.category] ?? { done: 0, target: 0 }
    entry.done += Math.min(task.completed, task.target)
    entry.target += task.target
    result[task.category] = entry
  }
  return result
}

/** Overall completion percentage for a day. */
export function dayCompletion(tasks: DailyTask[]): number {
  const total = tasks.reduce((sum, task) => sum + task.target, 0)
  if (total === 0) return 0
  const done = tasks.reduce((sum, task) => sum + Math.min(task.completed, task.target), 0)
  return Math.round((done / total) * 100)
}

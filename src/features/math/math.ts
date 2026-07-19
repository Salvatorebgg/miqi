import type { MathExercise } from '../../data/mathCurriculum'

export interface CompletionInput {
  read: boolean
  exerciseScore: number
  quizScore: number
}

/** Combines reading, exercise, and quiz evidence into a 0–100 completion score. */
export const lessonCompletion = ({ read, exerciseScore, quizScore }: CompletionInput): number =>
  Math.round((read ? 20 : 0) + exerciseScore * 0.4 + quizScore * 0.4)

const normalize = (value: string): string =>
  value
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '')
    .replace(/[（）]/g, match => (match === '（' ? '(' : ')'))
    .replace(/，/g, ',')

export function gradeExercise(exercise: MathExercise, raw: string): boolean {
  if (raw.trim() === '') return false
  if (exercise.type === 'number') {
    const value = Number(raw)
    if (Number.isNaN(value)) return false
    return Math.abs(value - Number(exercise.answer)) <= (exercise.tolerance ?? 0)
  }
  if (exercise.type === 'choice') return raw === exercise.answer
  return normalize(raw) === normalize(String(exercise.answer))
}

/** Mean score (0–100) over a set of graded answers. */
export const scoreAnswers = (correct: boolean[]): number =>
  correct.length === 0 ? 0 : Math.round((correct.filter(Boolean).length / correct.length) * 100)

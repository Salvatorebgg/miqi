import { describe, expect, it } from 'vitest'
import { gradeExercise, lessonCompletion, scoreAnswers } from './math'
import { mathLessons, mathTracks, lessonsForTrack, findLesson } from '../../data/mathCurriculum'

describe('lessonCompletion', () => {
  it('combines reading, exercise, and quiz evidence into completion', () => {
    expect(lessonCompletion({ read: true, exerciseScore: 80, quizScore: 90 })).toBe(88)
  })

  it('is zero with no evidence and caps at 100', () => {
    expect(lessonCompletion({ read: false, exerciseScore: 0, quizScore: 0 })).toBe(0)
    expect(lessonCompletion({ read: true, exerciseScore: 100, quizScore: 100 })).toBe(100)
  })
})

describe('gradeExercise', () => {
  it('accepts an equivalent normalized numeric answer', () => {
    expect(gradeExercise({ type: 'number', answer: 0.5, tolerance: 0.001 } as never, '0.500')).toBe(true)
  })

  it('rejects a numeric answer outside tolerance', () => {
    expect(gradeExercise({ type: 'number', answer: 1, tolerance: 0.001 } as never, '1.1')).toBe(false)
  })

  it('grades choice answers by option id', () => {
    const exercise = { type: 'choice', answer: 'a' } as never
    expect(gradeExercise(exercise, 'a')).toBe(true)
    expect(gradeExercise(exercise, 'b')).toBe(false)
  })

  it('normalizes expression answers', () => {
    const exercise = { type: 'expression', answer: '2x cos(x^2)' } as never
    expect(gradeExercise(exercise, ' 2X cos(x^2)')).toBe(true)
  })

  it('rejects empty answers', () => {
    expect(gradeExercise({ type: 'number', answer: 1, tolerance: 0.1 } as never, '  ')).toBe(false)
  })
})

describe('scoreAnswers', () => {
  it('computes a percentage and handles empty input', () => {
    expect(scoreAnswers([true, true, false])).toBe(67)
    expect(scoreAnswers([])).toBe(0)
  })
})

describe('curriculum content contract', () => {
  it('has five ordered tracks', () => {
    expect(mathTracks).toHaveLength(5)
    expect(mathTracks.map(track => track.order)).toEqual([1, 2, 3, 4, 5])
  })

  it('every track has at least two lessons', () => {
    for (const track of mathTracks) {
      expect(lessonsForTrack(track.id).length).toBeGreaterThanOrEqual(2)
    }
  })

  it('every lesson meets the content contract', () => {
    for (const lesson of mathLessons) {
      expect(lesson.objectives.length).toBeGreaterThanOrEqual(2)
      expect(lesson.intuition.length).toBeGreaterThanOrEqual(2)
      expect(lesson.principles.length).toBeGreaterThanOrEqual(2)
      expect(lesson.examples.length).toBeGreaterThanOrEqual(1)
      expect(lesson.exercises.length).toBeGreaterThanOrEqual(3)
      expect(new Set(lesson.exercises.map(ex => ex.difficulty)).size).toBeGreaterThanOrEqual(2)
      expect(lesson.quiz.length).toBeGreaterThanOrEqual(1)
      expect(lesson.resources.length).toBeGreaterThanOrEqual(2)
      for (const exercise of [...lesson.exercises, ...lesson.quiz]) {
        expect(exercise.solution.length).toBeGreaterThanOrEqual(1)
        if (exercise.type === 'choice') {
          expect(exercise.options?.some(option => option.id === exercise.answer)).toBe(true)
        }
      }
      for (const resource of lesson.resources) {
        expect(resource.url.startsWith('https://')).toBe(true)
      }
    }
  })

  it('prerequisites reference existing lessons and never create cycles within a track order', () => {
    const orderOf = new Map(mathLessons.map((lesson, index) => [lesson.id, index]))
    for (const lesson of mathLessons) {
      for (const prerequisite of lesson.prerequisites) {
        expect(findLesson(prerequisite), `${lesson.id} -> ${prerequisite}`).toBeDefined()
        expect(orderOf.get(prerequisite)!).toBeLessThan(orderOf.get(lesson.id)!)
      }
    }
  })
})

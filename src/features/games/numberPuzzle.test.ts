import { describe, expect, it } from 'vitest'
import { evaluateExpression, extractNumbers, generatePuzzle, seededRandom, validateNumbers } from './numberPuzzle'

describe('generatePuzzle', () => {
  it('always returns a solvable puzzle that evaluates to 24', () => {
    for (const difficulty of ['easy', 'medium', 'hard'] as const) {
      const puzzle = generatePuzzle(difficulty, seededRandom(42))
      expect(puzzle.numbers).toHaveLength(4)
      expect(evaluateExpression(puzzle.solution).valid).toBe(true)
      expect(Math.abs((evaluateExpression(puzzle.solution).value ?? 0) - 24)).toBeLessThan(1e-6)
    }
  })

  it('is deterministic with a seeded rng', () => {
    expect(generatePuzzle('medium', seededRandom(9))).toEqual(generatePuzzle('medium', seededRandom(9)))
  })
})

describe('evaluateExpression', () => {
  it('evaluates a valid expression', () => {
    const result = evaluateExpression('(3 + 5) * (9 - 7)')
    expect(result.valid).toBe(true)
    expect(result.value).toBe(16)
  })

  it('rejects unsafe characters', () => {
    const result = evaluateExpression('3 + 5; alert(1)')
    expect(result.valid).toBe(false)
  })

  it('rejects unbalanced parentheses', () => {
    expect(evaluateExpression('(3 + 5').valid).toBe(false)
    expect(evaluateExpression('3 + 5)').valid).toBe(false)
  })

  it('rejects an expression ending with an operator', () => {
    expect(evaluateExpression('3 +').valid).toBe(false)
  })
})

describe('extractNumbers', () => {
  it('extracts the integers used in an expression', () => {
    expect(extractNumbers('(3+5)*(9-7)')).toEqual([3, 5, 9, 7])
  })
})

describe('validateNumbers', () => {
  it('allows a subset when useAll is false', () => {
    expect(validateNumbers([3, 5], [3, 5, 7, 9], false).valid).toBe(true)
  })

  it('requires every number exactly once when useAll is true', () => {
    expect(validateNumbers([3, 5, 9], [3, 5, 7, 9], true).valid).toBe(false)
    expect(validateNumbers([3, 5, 9, 7], [3, 5, 7, 9], true).valid).toBe(true)
    expect(validateNumbers([3, 3, 9, 7], [3, 5, 7, 9], true).valid).toBe(false)
  })
})

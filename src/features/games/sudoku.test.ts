import { describe, expect, it } from 'vitest'
import { generateSudoku, isSolved, seededRandom, validateSudoku } from './sudoku'

const solvedBoard = [
  [5, 3, 4, 6, 7, 8, 9, 1, 2],
  [6, 7, 2, 1, 9, 5, 3, 4, 8],
  [1, 9, 8, 3, 4, 2, 5, 6, 7],
  [8, 5, 9, 7, 6, 1, 4, 2, 3],
  [4, 2, 6, 8, 5, 3, 7, 9, 1],
  [7, 1, 3, 9, 2, 4, 8, 5, 6],
  [9, 6, 1, 5, 3, 7, 2, 8, 4],
  [2, 8, 7, 4, 1, 9, 6, 3, 5],
  [3, 4, 5, 2, 8, 6, 1, 7, 9],
]

describe('validateSudoku', () => {
  it('recognizes a complete valid Sudoku solution', () => {
    expect(validateSudoku(solvedBoard)).toEqual({ valid: true, complete: true, conflicts: [] })
  })

  it('detects a row conflict', () => {
    const board = solvedBoard.map(row => [...row])
    board[0][1] = 5
    const result = validateSudoku(board)
    expect(result.valid).toBe(false)
    expect(result.conflicts).toContainEqual([0, 0])
    expect(result.conflicts).toContainEqual([0, 1])
  })

  it('flags incomplete boards', () => {
    const board = solvedBoard.map(row => [...row])
    board[4][4] = 0
    expect(validateSudoku(board).complete).toBe(false)
  })
})

describe('generateSudoku', () => {
  it('is deterministic with a seeded rng', () => {
    const a = generateSudoku('medium', seededRandom(42))
    const b = generateSudoku('medium', seededRandom(42))
    expect(a.cells).toEqual(b.cells)
  })

  it('keeps the requested clue count and a valid complete solution', () => {
    for (const [difficulty, clues] of Object.entries({ easy: 40, medium: 34, hard: 28 })) {
      const board = generateSudoku(difficulty as 'easy', seededRandom(7))
      const given = board.cells.flat().filter(value => value !== 0)
      expect(given).toHaveLength(clues)
      expect(isSolved(board.solution)).toBe(true)
    }
  })

  it('marks given cells as fixed and empty cells as editable', () => {
    const board = generateSudoku('easy', seededRandom(1))
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        expect(board.fixed[r][c]).toBe(board.cells[r][c] !== 0)
      }
    }
  })

  it('puzzle cells never contradict the solution (fixed cells match)', () => {
    const board = generateSudoku('medium', seededRandom(3))
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        if (board.cells[r][c] !== 0) expect(board.cells[r][c]).toBe(board.solution[r][c])
      }
    }
  })
})

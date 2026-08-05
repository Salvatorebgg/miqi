export type SudokuRng = () => number

export interface SudokuBoard {
  /** 9x9 grid, 0 = empty */
  cells: number[][]
  /** true for given (fixed) cells */
  fixed: boolean[][]
  /** the complete solution */
  solution: number[][]
}

export const difficultyClues = { easy: 40, medium: 34, hard: 28, expert: 24 } as const
export type SudokuDifficulty = keyof typeof difficultyClues

export const difficultyLabels: Record<SudokuDifficulty, string> = {
  easy: 'Easy',
  medium: 'Medium',
  hard: 'Hard',
  expert: 'Expert',
}

export interface DifficultyConfig {
  clues: number
  label: string
  description: string
}

export const difficultyConfig: Record<SudokuDifficulty, DifficultyConfig> = {
  easy: { clues: 40, label: 'Easy', description: '40 clues — great for beginners' },
  medium: { clues: 34, label: 'Medium', description: '34 clues — a balanced challenge' },
  hard: { clues: 28, label: 'Hard', description: '28 clues — for experienced players' },
  expert: { clues: 24, label: 'Expert', description: '24 clues — extreme difficulty' },
}

/** Deterministic RNG (mulberry32) for reproducible tests and shareable puzzles. */
export function seededRandom(seed: number): SudokuRng {
  let state = seed >>> 0
  return () => {
    state = (state + 0x6d2b79f5) >>> 0
    let t = state
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const shuffled = <T>(values: T[], rng: SudokuRng): T[] => {
  const copy = [...values]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

const pattern = (row: number, col: number): number => (row * 3 + Math.floor(row / 3) + col) % 9

/** Builds a complete valid solution by shuffling the canonical Sudoku pattern. */
export function generateSolution(rng: SudokuRng): number[][] {
  const base = [0, 1, 2]
  const rows = shuffled(base, rng).flatMap(group => shuffled(base, rng).map(index => group * 3 + index))
  const cols = shuffled(base, rng).flatMap(group => shuffled(base, rng).map(index => group * 3 + index))
  const numbers = shuffled([1, 2, 3, 4, 5, 6, 7, 8, 9], rng)
  return rows.map(row => cols.map(col => numbers[pattern(row, col)]))
}

export function generateSudoku(difficulty: SudokuDifficulty = 'medium', rng: SudokuRng = Math.random): SudokuBoard {
  const solution = generateSolution(rng)
  const clues = difficultyClues[difficulty]
  const cells = solution.map(row => [...row])
  const positions = shuffled(
    Array.from({ length: 81 }, (_, index) => [Math.floor(index / 9), index % 9] as const),
    rng,
  )
  for (const [row, col] of positions.slice(0, 81 - clues)) {
    cells[row][col] = 0
  }
  const fixed = cells.map(row => row.map(value => value !== 0))
  return { cells, fixed, solution }
}

export interface SudokuValidation {
  valid: boolean
  complete: boolean
  conflicts: [number, number][]
}

/**
 * Killer-like sum check: for a unit (row, col, or box), if all 9 cells are filled,
 * the sum must be exactly 45 and contain every digit 1-9 exactly once.
 * For partially filled units, checks that no duplicate exists and the current sum
 * does not exceed 45 (early failure signal).
 */
function checkUnit(
  values: number[],
  coordsList: [number, number][],
  conflicts: Set<string>,
): void {
  const nonZero = values.filter(v => v !== 0)
  const sum = nonZero.reduce((s, v) => s + v, 0)

  // Duplicate detection
  const seen = new Map<number, number>()
  for (let i = 0; i < values.length; i++) {
    const v = values[i]
    if (v === 0) continue
    const prev = seen.get(v)
    if (prev !== undefined) {
      conflicts.add(`${coordsList[prev][0]},${coordsList[prev][1]}`)
      conflicts.add(`${coordsList[i][0]},${coordsList[i][1]}`)
    } else {
      seen.set(v, i)
    }
  }

  // Killer-like sum validation: if the unit is fully filled, sum must be exactly 45
  // and all digits 1-9 must be present
  if (nonZero.length === 9) {
    const digitSet = new Set(nonZero)
    if (digitSet.size !== 9 || sum !== 45) {
      // Mark all cells in the unit as conflicting (the unit as a whole is invalid)
      for (const [r, c] of coordsList) {
        conflicts.add(`${r},${c}`)
      }
    }
  }
}

/** Checks rows, columns, and boxes for conflicts; complete = no empty cells. */
export function validateSudoku(cells: number[][]): SudokuValidation {
  const conflicts = new Set<string>()

  for (let row = 0; row < 9; row++) {
    const coords = Array.from({ length: 9 }, (_, col) => [row, col] as [number, number])
    checkUnit(cells[row], coords, conflicts)
  }
  for (let col = 0; col < 9; col++) {
    const values = cells.map(row => row[col])
    const coords = Array.from({ length: 9 }, (_, row) => [row, col] as [number, number])
    checkUnit(values, coords, conflicts)
  }
  for (let box = 0; box < 9; box++) {
    const boxRow = Math.floor(box / 3) * 3
    const boxCol = (box % 3) * 3
    const values: number[] = []
    const coords: [number, number][] = []
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        values.push(cells[boxRow + r][boxCol + c])
        coords.push([boxRow + r, boxCol + c])
      }
    }
    checkUnit(values, coords, conflicts)
  }

  const complete = cells.every(row => row.every(value => value !== 0))
  return {
    valid: conflicts.size === 0,
    complete,
    conflicts: [...conflicts].map(key => key.split(',').map(Number) as [number, number]),
  }
}

/** A correct, complete board matching the validation rules. */
export function isSolved(cells: number[][]): boolean {
  const result = validateSudoku(cells)
  return result.valid && result.complete
}

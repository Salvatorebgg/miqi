export type SlidingDifficulty = 'easy' | 'medium' | 'hard'

export interface SlidingState {
  /** 2D grid of tiles. 0 represents the empty space. */
  tiles: number[][]
  /** Row index of the empty space (0-based). */
  emptyRow: number
  /** Column index of the empty space (0-based). */
  emptyCol: number
  /** Grid dimension (e.g. 3 for 3x3, 4 for 4x4). */
  gridSize: number
  difficulty: SlidingDifficulty
  moves: number
  startTime: number
  solved: boolean
}

/** Grid size for each difficulty. easy and medium both use 3x3; hard uses 4x4. */
export const slidingGridSizes: Record<SlidingDifficulty, number> = {
  easy: 3,
  medium: 3,
  hard: 4,
}

/**
 * Number of random valid moves to apply when shuffling from the solved state.
 * More shuffles = harder starting position.
 */
export const slidingShuffleMoves: Record<SlidingDifficulty, number> = {
  easy: 30,
  medium: 100,
  hard: 200,
}

/** Deterministic RNG (mulberry32) for reproducible puzzles. */
export function seededRandom(seed: number): () => number {
  let state = seed >>> 0
  return () => {
    state = (state + 0x6d2b79f5) >>> 0
    let t = state
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/** Creates a solved tile grid: numbers 1..(n*n-1) with 0 (empty) in the bottom-right corner. */
function createSolvedGrid(size: number): { tiles: number[][]; emptyRow: number; emptyCol: number } {
  const tiles: number[][] = []
  for (let r = 0; r < size; r++) {
    const row: number[] = []
    for (let c = 0; c < size; c++) {
      const value = r * size + c + 1
      row.push(value < size * size ? value : 0)
    }
    tiles.push(row)
  }
  return { tiles, emptyRow: size - 1, emptyCol: size - 1 }
}

const directions = [
  { dr: -1, dc: 0 },
  { dr: 1, dc: 0 },
  { dr: 0, dc: -1 },
  { dr: 0, dc: 1 },
]

/**
 * Applies a single valid move to the grid: slides a neighboring tile into the empty space.
 * Returns the new state after the move, or the same state if the move is invalid.
 */
function applyMove(
  tiles: number[][],
  emptyRow: number,
  emptyCol: number,
  tileRow: number,
  tileCol: number,
): { tiles: number[][]; emptyRow: number; emptyCol: number } | null {
  // The clicked tile must be adjacent (Manhattan distance 1) to the empty space
  const dr = Math.abs(tileRow - emptyRow)
  const dc = Math.abs(tileCol - emptyCol)
  if ((dr + dc) !== 1) return null

  const newTiles = tiles.map(row => [...row])
  newTiles[emptyRow][emptyCol] = newTiles[tileRow][tileCol]
  newTiles[tileRow][tileCol] = 0
  return { tiles: newTiles, emptyRow: tileRow, emptyCol: tileCol }
}

/**
 * Generates a sliding puzzle (15-puzzle style).
 * Starts from the solved state and shuffles by performing random valid moves,
 * guaranteeing the resulting puzzle is always solvable.
 *
 * @param difficulty - Controls grid size and shuffle depth.
 * @param rng - Optional seeded random number generator.
 */
export function generateSlidingPuzzle(
  difficulty: SlidingDifficulty,
  rng: () => number = Math.random,
): SlidingState {
  const gridSize = slidingGridSizes[difficulty]
  const shuffleCount = slidingShuffleMoves[difficulty] * gridSize

  let { tiles, emptyRow, emptyCol } = createSolvedGrid(gridSize)

  // Shuffle by performing random valid moves from the solved state
  for (let i = 0; i < shuffleCount; i++) {
    const validMoves: { dr: number; dc: number }[] = []
    for (const { dr, dc } of directions) {
      const nr = emptyRow + dr
      const nc = emptyCol + dc
      if (nr >= 0 && nr < gridSize && nc >= 0 && nc < gridSize) {
        validMoves.push({ dr, dc })
      }
    }
    const move = validMoves[Math.floor(rng() * validMoves.length)]
    const tileRow = emptyRow + move.dr
    const tileCol = emptyCol + move.dc
    const result = applyMove(tiles, emptyRow, emptyCol, tileRow, tileCol)!
    tiles = result.tiles
    emptyRow = result.emptyRow
    emptyCol = result.emptyCol
  }

  return {
    tiles,
    emptyRow,
    emptyCol,
    gridSize,
    difficulty,
    moves: 0,
    startTime: Date.now(),
    solved: false,
  }
}

/**
 * Moves the tile at (row, col) into the empty space, if adjacent.
 * Returns a new SlidingState. If the move is invalid, returns the unchanged state.
 */
export function moveTile(state: SlidingState, row: number, col: number): SlidingState {
  if (state.solved) return state

  const result = applyMove(state.tiles, state.emptyRow, state.emptyCol, row, col)
  if (!result) return state

  const solved = isSlidingSolved(result.tiles, state.gridSize)
  return {
    ...state,
    tiles: result.tiles,
    emptyRow: result.emptyRow,
    emptyCol: result.emptyCol,
    moves: state.moves + 1,
    solved,
  }
}

/**
 * Checks whether the given tile grid is in the solved configuration:
 * numbers 1..(n*n-1) in row-major order, 0 at the bottom-right.
 */
export function isSlidingSolved(tiles: number[][], gridSize?: number): boolean {
  const size = gridSize ?? tiles.length
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      const expected = r === size - 1 && c === size - 1 ? 0 : r * size + c + 1
      if (tiles[r][c] !== expected) return false
    }
  }
  return true
}

/** Returns the elapsed time in seconds since the game started. */
export function slidingElapsed(state: SlidingState): number {
  return Math.floor((Date.now() - state.startTime) / 1000)
}

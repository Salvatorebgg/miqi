/** Minesweeper — classic logic puzzle. First click guaranteed safe. */

export type MinesweeperDifficulty = 'easy' | 'medium' | 'hard'

export interface MinesweeperCell {
  revealed: boolean
  flagged: boolean
  isMine: boolean
  adjacentMines: number
}

export interface MinesweeperState {
  grid: MinesweeperCell[][]
  rows: number
  cols: number
  totalMines: number
  difficulty: MinesweeperDifficulty
  gameOver: boolean
  won: boolean
  started: boolean
  startedAt: number
  flagCount: number
  revealedCount: number
}

const DIFF_CONFIG: Record<MinesweeperDifficulty, { rows: number; cols: number; mines: number }> = {
  easy: { rows: 9, cols: 9, mines: 10 },
  medium: { rows: 16, cols: 16, mines: 40 },
  hard: { rows: 16, cols: 30, mines: 99 },
}

export const minesweeperDiffLabels: Record<MinesweeperDifficulty, string> = {
  easy: '9×9 · 10雷', medium: '16×16 · 40雷', hard: '16×30 · 99雷',
}

function emptyGrid(rows: number, cols: number): MinesweeperCell[][] {
  return Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => ({
      revealed: false, flagged: false, isMine: false, adjacentMines: 0,
    })),
  )
}

function placeMines(grid: MinesweeperCell[][], rows: number, cols: number, mineCount: number, safeR: number, safeC: number): void {
  const safe = new Set([`${safeR},${safeC}`])
  for (let dr = -1; dr <= 1; dr++)
    for (let dc = -1; dc <= 1; dc++) {
      const nr = safeR + dr, nc = safeC + dc
      if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) safe.add(`${nr},${nc}`)
    }

  let placed = 0
  while (placed < mineCount) {
    const r = Math.floor(Math.random() * rows)
    const c = Math.floor(Math.random() * cols)
    if (!safe.has(`${r},${c}`) && !grid[r][c].isMine) {
      grid[r][c].isMine = true
      placed++
    }
  }

  for (let r = 0; r < rows; r++)
    for (let c = 0; c < cols; c++) {
      if (grid[r][c].isMine) continue
      let count = 0
      for (let dr = -1; dr <= 1; dr++)
        for (let dc = -1; dc <= 1; dc++) {
          const nr = r + dr, nc = c + dc
          if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc].isMine) count++
        }
      grid[r][c].adjacentMines = count
    }
}

function floodReveal(grid: MinesweeperCell[][], rows: number, cols: number, r: number, c: number): number {
  if (r < 0 || r >= rows || c < 0 || c >= cols || grid[r][c].revealed || grid[r][c].flagged) return 0
  grid[r][c].revealed = true
  let revealed = 1
  if (grid[r][c].adjacentMines === 0) {
    for (let dr = -1; dr <= 1; dr++)
      for (let dc = -1; dc <= 1; dc++)
        revealed += floodReveal(grid, rows, cols, r + dr, c + dc)
  }
  return revealed
}

export function generateMinesweeper(difficulty: MinesweeperDifficulty): MinesweeperState {
  const { rows, cols, mines } = DIFF_CONFIG[difficulty]
  return {
    grid: emptyGrid(rows, cols), rows, cols, totalMines: mines,
    difficulty, gameOver: false, won: false, started: false,
    startedAt: 0, flagCount: 0, revealedCount: 0,
  }
}

export function revealCell(state: MinesweeperState, row: number, col: number): MinesweeperState {
  if (state.gameOver || row < 0 || row >= state.rows || col < 0 || col >= state.cols) return state
  const cell = state.grid[row][col]
  if (cell.revealed || cell.flagged) return state

  const grid = state.grid.map(r => r.map(c => ({ ...c })))

  if (!state.started) {
    const safeCells = (state.rows * state.cols) - 9 // ensure at least 9 safe cells around first click
    const actualMines = Math.min(state.totalMines, safeCells)
    placeMines(grid, state.rows, state.cols, actualMines, row, col)
  }

  if (grid[row][col].isMine) {
    // Reveal all mines on game over
    for (let r = 0; r < state.rows; r++)
      for (let c = 0; c < state.cols; c++)
        if (grid[r][c].isMine) grid[r][c].revealed = true
    return { ...state, grid, gameOver: true, won: false, started: true, startedAt: state.startedAt || Date.now() }
  }

  const newlyRevealed = floodReveal(grid, state.rows, state.cols, row, col)
  const revealedCount = state.revealedCount + newlyRevealed
  const totalSafe = state.rows * state.cols - (state.started ? state.totalMines : grid.flat().filter(c => c.isMine).length)
  const won = revealedCount >= totalSafe

  return { ...state, grid, revealedCount, won, gameOver: won, started: true, startedAt: state.startedAt || Date.now() }
}

export function toggleFlag(state: MinesweeperState, row: number, col: number): MinesweeperState {
  if (state.gameOver || !state.started) return state
  const cell = state.grid[row][col]
  if (cell.revealed) return state
  const grid = state.grid.map(r => r.map(c => ({ ...c })))
  grid[row][col].flagged = !grid[row][col].flagged
  return { ...state, grid, flagCount: state.flagCount + (grid[row][col].flagged ? 1 : -1) }
}

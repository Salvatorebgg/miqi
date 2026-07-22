export type HanoiDifficulty = 'easy' | 'medium' | 'hard'

export interface HanoiDisk {
  /** Disk size, 1 = smallest, n = largest. */
  size: number
}

export interface HanoiState {
  /** Three pegs, each an array of disks (index 0 = top of peg). */
  pegs: HanoiDisk[][]
  /** Index of the currently selected peg (0-2), or null if no peg is selected. */
  selectedPeg: number | null
  /** Total number of disks. */
  numDisks: number
  difficulty: HanoiDifficulty
  moves: number
  startTime: number
  /** Minimum number of moves to solve: 2^n - 1. */
  minMoves: number
  solved: boolean
}

/** Number of disks for each difficulty level. */
export const hanoiDiskCounts: Record<HanoiDifficulty, number> = {
  easy: 3,
  medium: 4,
  hard: 5,
}

/**
 * Generates a Tower of Hanoi game.
 * All disks start on peg 0 (left), stacked largest to smallest (bottom to top).
 * The goal is to move all disks to peg 2 (right).
 *
 * @param difficulty - Controls the number of disks.
 */
export function generateHanoi(difficulty: HanoiDifficulty): HanoiState {
  const numDisks = hanoiDiskCounts[difficulty]
  const pegs: HanoiDisk[][] = [[], [], []]

  // Create disks from largest (bottom) to smallest (top)
  for (let size = numDisks; size >= 1; size--) {
    pegs[0].push({ size })
  }

  return {
    pegs,
    selectedPeg: null,
    numDisks,
    difficulty,
    moves: 0,
    startTime: Date.now(),
    minMoves: Math.pow(2, numDisks) - 1,
    solved: false,
  }
}

/**
 * Handles peg selection for Tower of Hanoi.
 *
 * - If no peg is currently selected, selects the clicked peg (if it has disks).
 * - If a peg is already selected:
 *   - Clicking the same peg deselects it.
 *   - Clicking a different peg attempts to move the top disk from the selected peg
 *     to the target peg. The move is valid only if the target peg is empty or the
 *     top disk on the target peg is larger than the disk being moved.
 *
 * @param state - Current game state.
 * @param pegIndex - The peg clicked (0, 1, or 2).
 * @returns A new HanoiState reflecting the selection or move.
 */
export function selectPeg(state: HanoiState, pegIndex: number): HanoiState {
  if (state.solved) return state
  if (pegIndex < 0 || pegIndex > 2) return state

  // No peg selected yet — select this one (if it has disks)
  if (state.selectedPeg === null) {
    if (state.pegs[pegIndex].length === 0) return state
    return { ...state, selectedPeg: pegIndex }
  }

  // Clicking the same peg — deselect
  if (state.selectedPeg === pegIndex) {
    return { ...state, selectedPeg: null }
  }

  // Attempt to move top disk from selectedPeg to pegIndex
  const fromPeg = state.selectedPeg
  const toPeg = pegIndex

  const fromStack = state.pegs[fromPeg]
  const toStack = state.pegs[toPeg]

  if (fromStack.length === 0) {
    // Should not happen since we only allow selecting non-empty pegs
    return { ...state, selectedPeg: null }
  }

  const movingDisk = fromStack[fromStack.length - 1]
  const topTarget = toStack.length > 0 ? toStack[toStack.length - 1] : null

  // Invalid move: cannot place a larger disk on a smaller one
  if (topTarget !== null && movingDisk.size > topTarget.size) {
    // Invalid move — switch selection to the target peg if it has disks
    if (toStack.length > 0) {
      return { ...state, selectedPeg: pegIndex }
    }
    return { ...state, selectedPeg: null }
  }

  // Valid move
  const newPegs = state.pegs.map(peg => [...peg])
  newPegs[toPeg] = [...toStack, movingDisk]
  newPegs[fromPeg] = fromStack.slice(0, -1)

  const solved = isHanoiSolvedState(newPegs, state.numDisks)

  return {
    ...state,
    pegs: newPegs,
    selectedPeg: null,
    moves: state.moves + 1,
    solved,
  }
}

/** Internal check against raw peg arrays (no full state needed). */
function isHanoiSolvedState(pegs: HanoiDisk[][], numDisks: number): boolean {
  return pegs[2].length === numDisks
}

/**
 * Returns true if all disks have been moved to peg 2 (the rightmost peg).
 */
export function isHanoiSolved(state: HanoiState): boolean {
  return state.pegs[2].length === state.numDisks
}

/** Returns the elapsed time in seconds since the game started. */
export function hanoiElapsed(state: HanoiState): number {
  return Math.floor((Date.now() - state.startTime) / 1000)
}

/**
 * Returns a performance rating based on how close the player's move count
 * is to the theoretical minimum.
 * - Perfect: exactly minMoves.
 * - Excellent: within 20% extra.
 * - Good: within 50% extra.
 * - Fair: within 100% extra.
 * - Keep practicing: more than double.
 */
export function hanoiRating(state: HanoiState): 'perfect' | 'excellent' | 'good' | 'fair' | 'practice' {
  if (!state.solved) return 'practice'
  const ratio = state.moves / state.minMoves
  if (ratio <= 1) return 'perfect'
  if (ratio <= 1.2) return 'excellent'
  if (ratio <= 1.5) return 'good'
  if (ratio <= 2) return 'fair'
  return 'practice'
}

export type MemoryDifficulty = 'easy' | 'medium' | 'hard'

export interface MemoryCard {
  id: number
  pairId: number
  content: string
  flipped: boolean
  matched: boolean
}

export interface MemoryState {
  cards: MemoryCard[]
  difficulty: MemoryDifficulty
  moves: number
  pairsFound: number
  totalPairs: number
  startTime: number
  /** The id of the first card selected in the current turn, or null if none yet. */
  firstSelection: number | null
  /** When non-zero, two mismatched cards are face-up and will be flipped back. */
  lockUntil: number
  gameOver: boolean
}

/** Grid dimensions for each difficulty level. */
export const memoryGrids: Record<MemoryDifficulty, { cols: number; rows: number }> = {
  easy: { cols: 4, rows: 3 },
  medium: { cols: 4, rows: 4 },
  hard: { cols: 5, rows: 4 },
}

/** Number of pairs for each difficulty. */
export const memoryPairs: Record<MemoryDifficulty, number> = {
  easy: 6,
  medium: 8,
  hard: 10,
}

/**
 * Math formula/result pairs used in the memory game.
 * Each entry is [formula, result] — the player matches the formula with its simplified value.
 */
const formulaPairs: [string, string][] = [
  ['sin²x+cos²x', '1'],
  ['√4', '2'],
  ['2³', '8'],
  ['3²', '9'],
  ['√9', '3'],
  ['7×8', '56'],
  ['5!', '120'],
  ['√16', '4'],
  ['2⁴', '16'],
  ['10²', '100'],
  ['√25', '5'],
  ['3³', '27'],
  ['6×7', '42'],
  ['√36', '6'],
  ['4³', '64'],
  ['12²', '144'],
  ['9×9', '81'],
  ['2⁵', '32'],
  ['√49', '7'],
  ['11²', '121'],
  ['8×9', '72'],
  ['√64', '8'],
  ['2⁶', '64'],
  ['15²', '225'],
  ['4!', '24'],
]

/** Deterministic RNG (mulberry32) for reproducible card shuffles. */
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

/** Fisher-Yates shuffle using the provided RNG. */
function shuffle<T>(arr: T[], rng: () => number): T[] {
  const result = [...arr]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

/**
 * Generates a memory card matching game.
 * Cards display math formulas and their simplified results — the player matches each formula with its answer.
 *
 * @param difficulty - Controls grid size and number of pairs.
 * @param rng - Optional seeded random number generator for deterministic shuffles.
 */
export function generateMemoryGame(
  difficulty: MemoryDifficulty,
  rng: () => number = Math.random,
): MemoryState {
  const pairCount = memoryPairs[difficulty]
  const selected = shuffle(formulaPairs, rng).slice(0, pairCount)

  const cards: MemoryCard[] = []
  let id = 0
  for (let pairId = 0; pairId < pairCount; pairId++) {
    const [formula, result] = selected[pairId]
    cards.push({ id: id++, pairId, content: formula, flipped: false, matched: false })
    cards.push({ id: id++, pairId, content: result, flipped: false, matched: false })
  }

  const shuffledCards = shuffle(cards, rng)

  return {
    cards: shuffledCards,
    difficulty,
    moves: 0,
    pairsFound: 0,
    totalPairs: pairCount,
    startTime: Date.now(),
    firstSelection: null,
    lockUntil: 0,
    gameOver: false,
  }
}

/**
 * Flips a card in the memory game. Handles the two-card matching logic:
 * - First card of a turn: simply flips it face-up.
 * - Second card: checks for a match. If matched, both stay face-up.
 *   If mismatched, both are scheduled to flip back after a short delay.
 *
 * @param state - Current game state.
 * @param cardId - The id of the card to flip.
 * @returns A new MemoryState reflecting the flip.
 */
export function flipCard(state: MemoryState, cardId: number): MemoryState {
  if (state.gameOver) return state

  const card = state.cards.find(c => c.id === cardId)
  if (!card) return state
  // Cannot flip a card that is already face-up or already matched.
  if (card.flipped || card.matched) return state
  // Cannot flip while two mismatched cards are still showing.
  if (state.lockUntil > 0 && Date.now() < state.lockUntil) return state

  // First selection of the turn
  if (state.firstSelection === null) {
    const cards = state.cards.map(c =>
      c.id === cardId ? { ...c, flipped: true } : c,
    )
    return { ...state, cards, firstSelection: cardId, lockUntil: 0 }
  }

  // Second selection: check for match
  const firstCard = state.cards.find(c => c.id === state.firstSelection)!
  const isMatch = firstCard.pairId === card.pairId

  if (isMatch) {
    const cards = state.cards.map(c =>
      c.id === cardId || c.id === state.firstSelection
        ? { ...c, flipped: true, matched: true }
        : c,
    )
    const pairsFound = state.pairsFound + 1
    const gameOver = pairsFound === state.totalPairs
    return {
      ...state,
      cards,
      moves: state.moves + 1,
      pairsFound,
      firstSelection: null,
      lockUntil: 0,
      gameOver,
    }
  }

  // Mismatch: flip second card, schedule both to flip back
  const cards = state.cards.map(c =>
    c.id === cardId ? { ...c, flipped: true } : c,
  )
  return {
    ...state,
    cards,
    moves: state.moves + 1,
    firstSelection: null,
    lockUntil: Date.now() + 800, // 800ms to memorize before they flip back
  }
}

/**
 * Resolves the lock timer. If the lock has expired, flips any unmatched face-up cards back down.
 * Should be called periodically (e.g., on each render tick) to handle the mismatch reveal timeout.
 */
export function tickMemory(state: MemoryState): MemoryState {
  if (state.lockUntil === 0 || Date.now() < state.lockUntil) return state

  const cards = state.cards.map(c => {
    if (c.matched) return c
    return { ...c, flipped: false }
  })
  return { ...state, cards, lockUntil: 0 }
}

/** Returns the elapsed time in seconds since the game started. */
export function memoryElapsed(state: MemoryState): number {
  return Math.floor((Date.now() - state.startTime) / 1000)
}

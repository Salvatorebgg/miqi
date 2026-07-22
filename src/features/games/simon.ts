export interface SimonState {
  /** The complete sequence of color indices the player must repeat. */
  sequence: number[]
  /** Which step in the sequence the player is currently trying to reproduce (0-based). */
  playerIndex: number
  /** Current round number (1-based). Each round adds one color to the sequence. */
  currentRound: number
  /** The four color names, in order: red, blue, green, yellow. */
  colors: string[]
  /** Whether the game is currently showing the sequence to the player. */
  isShowing: boolean
  /** Which index of the sequence is currently being highlighted during the show phase. */
  showingIndex: number
  /** If true, the game is over (player made a mistake or completed all rounds). */
  gameOver: boolean
  /** Player's score: number of rounds successfully completed. */
  score: number
  /** Timestamp when the game started (ms). */
  startTime: number
  /** Maximum number of rounds before the game is won (0 = unlimited). */
  maxRounds: number
  /** Whether the player has won (completed all maxRounds). */
  won: boolean
}

/** Maximum rounds for a "win" condition. Set to 0 for endless mode. */
const DEFAULT_MAX_ROUNDS = 20

/**
 * Generates a new Simon Says game.
 * The game starts with an empty sequence; the first round begins immediately
 * after calling `advanceSequence`.
 *
 * @param maxRounds - Maximum rounds to win (default 20, 0 = endless).
 */
export function generateSimon(maxRounds: number = DEFAULT_MAX_ROUNDS): SimonState {
  return {
    sequence: [],
    playerIndex: 0,
    currentRound: 0,
    colors: ['red', 'blue', 'green', 'yellow'],
    isShowing: false,
    showingIndex: 0,
    gameOver: false,
    score: 0,
    startTime: Date.now(),
    maxRounds,
    won: false,
  }
}

/**
 * Advances to the next round: appends a new random color to the sequence,
 * then enters the "showing" phase where the machine displays the sequence.
 *
 * Call this at the start of a new round (or to begin the first round).
 */
export function advanceSequence(state: SimonState): SimonState {
  if (state.gameOver) return state

  // Check if player has won
  if (state.maxRounds > 0 && state.currentRound >= state.maxRounds) {
    return { ...state, won: true, gameOver: true, isShowing: false }
  }

  const nextColor = Math.floor(Math.random() * 4)
  const newSequence = [...state.sequence, nextColor]
  const newRound = state.currentRound + 1

  return {
    ...state,
    sequence: newSequence,
    playerIndex: 0,
    currentRound: newRound,
    isShowing: true,
    showingIndex: 0,
  }
}

/**
 * Starts the machine's sequence-display phase.
 * Called when transitioning from "player's turn" to "showing the sequence."
 * Resets the showing index to 0 so the sequence replays from the beginning.
 */
export function startShowingSequence(state: SimonState): SimonState {
  if (state.gameOver) return state
  return {
    ...state,
    isShowing: true,
    showingIndex: 0,
    playerIndex: 0,
  }
}

/**
 * Called each time the machine highlights a color during the show phase.
 * Advances `showingIndex` by one. When the entire sequence has been shown,
 * sets `isShowing = false` so the player can begin pressing.
 *
 * Returns the new state, and the color index that was just shown (or -1 if done).
 */
export function advanceShowing(state: SimonState): { state: SimonState; highlightedColor: number } {
  if (!state.isShowing || state.gameOver) {
    return { state, highlightedColor: -1 }
  }

  if (state.showingIndex >= state.sequence.length) {
    // Finished showing — hand control to the player
    return {
      state: { ...state, isShowing: false },
      highlightedColor: -1,
    }
  }

  const highlightedColor = state.sequence[state.showingIndex]
  const newState: SimonState = {
    ...state,
    showingIndex: state.showingIndex + 1,
  }

  return { state: newState, highlightedColor }
}

/**
 * Handles a player's button press during their turn.
 *
 * - If the correct color is pressed at the current playerIndex:
 *   advances playerIndex. If the player has completed the full sequence,
 *   increments the score — the caller should then call `advanceSequence` to start the next round.
 * - If the wrong color is pressed: game over.
 *
 * @param state - Current game state.
 * @param colorIndex - The index of the color the player pressed (0-3).
 * @returns A new SimonState reflecting the result.
 */
export function playerPress(state: SimonState, colorIndex: number): SimonState {
  // Cannot press while the machine is showing the sequence
  if (state.isShowing) return state
  if (state.gameOver) return state

  const expectedColor = state.sequence[state.playerIndex]

  if (colorIndex !== expectedColor) {
    // Wrong color — game over
    return {
      ...state,
      gameOver: true,
      isShowing: false,
    }
  }

  // Correct press
  const newPlayerIndex = state.playerIndex + 1
  const completedSequence = newPlayerIndex >= state.sequence.length

  if (completedSequence) {
    // Player successfully repeated the full sequence
    const newScore = state.score + 1

    // Check win condition
    if (state.maxRounds > 0 && state.currentRound >= state.maxRounds) {
      return {
        ...state,
        playerIndex: 0,
        score: newScore,
        won: true,
        gameOver: true,
        isShowing: false,
      }
    }

    return {
      ...state,
      playerIndex: 0,
      score: newScore,
    }
  }

  // Still more colors to press in this round
  return {
    ...state,
    playerIndex: newPlayerIndex,
  }
}

/** Returns the elapsed time in seconds since the game started. */
export function simonElapsed(state: SimonState): number {
  return Math.floor((Date.now() - state.startTime) / 1000)
}

/** Returns the color name for a given color index. */
export function getColorName(state: SimonState, colorIndex: number): string {
  return state.colors[colorIndex] ?? 'unknown'
}

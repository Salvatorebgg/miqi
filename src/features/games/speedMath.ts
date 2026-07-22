export type SpeedMathDifficulty = 'easy' | 'medium' | 'hard'

export interface SpeedMathQuestion {
  a: number
  b: number
  op: string
  answer: number
  /** Human-readable expression, e.g. "12 + 7". */
  expression: string
}

export interface SpeedMathState {
  question: SpeedMathQuestion
  score: number
  correctCount: number
  wrongCount: number
  /** Consecutive correct answers streak. */
  combo: number
  /** Seconds remaining. */
  timeLeft: number
  /** Total game duration in seconds. */
  totalTime: number
  difficulty: SpeedMathDifficulty
  startTime: number
  gameOver: boolean
}

/** Default total time in seconds. */
export const DEFAULT_SPEED_MATH_TIME = 60

/** Number ranges and allowed operators per difficulty. */
interface SpeedMathConfig {
  min: number
  max: number
  ops: string[]
}

const speedMathConfigs: Record<SpeedMathDifficulty, SpeedMathConfig> = {
  easy: { min: 1, max: 20, ops: ['+', '-'] },
  medium: { min: 1, max: 30, ops: ['+', '-', '*'] },
  hard: { min: 1, max: 50, ops: ['+', '-', '*', '/'] },
}

/** Deterministic RNG (mulberry32) for reproducible question sequences. */
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

/**
 * Generates a random arithmetic question based on the difficulty config.
 */
function generateQuestion(
  config: SpeedMathConfig,
  rng: () => number,
): SpeedMathQuestion {
  const op = config.ops[Math.floor(rng() * config.ops.length)]
  let a: number
  let b: number
  let answer: number

  switch (op) {
    case '+':
      a = Math.floor(rng() * (config.max - config.min + 1)) + config.min
      b = Math.floor(rng() * (config.max - config.min + 1)) + config.min
      answer = a + b
      break

    case '-':
      // Ensure non-negative result for easy/medium
      a = Math.floor(rng() * (config.max - config.min + 1)) + config.min
      b = Math.floor(rng() * (a - config.min + 1)) + config.min
      answer = a - b
      break

    case '*':
      // Keep factors manageable
      a = Math.floor(rng() * Math.min(config.max, 12)) + 1
      b = Math.floor(rng() * Math.min(config.max, 12)) + 1
      answer = a * b
      break

    case '/':
      // Generate b first, then a = b * k so division is exact with integer result
      b = Math.floor(rng() * Math.min(config.max, 12)) + 1
      const k = Math.floor(rng() * Math.min(config.max, 12)) + 1
      a = b * k
      answer = k
      break

    default:
      a = 0
      b = 0
      answer = 0
  }

  let expression: string
  switch (op) {
    case '*':
      expression = `${a} × ${b}`
      break
    case '/':
      expression = `${a} ÷ ${b}`
      break
    default:
      expression = `${a} ${op} ${b}`
  }

  return { a, b, op, answer, expression }
}

/**
 * Generates a new timed mental arithmetic challenge.
 *
 * @param difficulty - Controls the number range and operators available.
 * @param totalTime - Game duration in seconds (default 60).
 * @param rng - Optional seeded random number generator.
 */
export function generateSpeedMath(
  difficulty: SpeedMathDifficulty,
  totalTime: number = DEFAULT_SPEED_MATH_TIME,
  rng: () => number = Math.random,
): SpeedMathState {
  const config = speedMathConfigs[difficulty]
  const question = generateQuestion(config, rng)

  return {
    question,
    score: 0,
    correctCount: 0,
    wrongCount: 0,
    combo: 0,
    timeLeft: totalTime,
    totalTime,
    difficulty,
    startTime: Date.now(),
    gameOver: false,
  }
}

/**
 * Submits an answer to the current question.
 * - Correct: increments score and combo, generates a new question.
 * - Wrong: decrements combo to 0, tracks wrong count, generates a new question.
 *
 * Score formula: correct = +10 base + combo bonus (combo * 2, capped at +20).
 * Wrong answers deduct 5 points (score never goes below 0).
 *
 * @param state - Current game state.
 * @param answer - The player's submitted answer.
 * @returns A new SpeedMathState with the result applied.
 */
export function submitAnswer(state: SpeedMathState, answer: number): SpeedMathState {
  if (state.gameOver) return state

  const config = speedMathConfigs[state.difficulty]
  const isCorrect = answer === state.question.answer

  if (isCorrect) {
    const newCombo = state.combo + 1
    const comboBonus = Math.min(newCombo * 2, 20)
    const points = 10 + comboBonus
    const newQuestion = generateQuestion(
      config,
      typeof state.question.a === 'number' ? Math.random : Math.random,
    )

    return {
      ...state,
      question: newQuestion,
      score: state.score + points,
      correctCount: state.correctCount + 1,
      combo: newCombo,
    }
  }

  // Wrong answer
  const newQuestion = generateQuestion(
    config,
    typeof state.question.a === 'number' ? Math.random : Math.random,
  )

  return {
    ...state,
    question: newQuestion,
    score: Math.max(0, state.score - 5),
    wrongCount: state.wrongCount + 1,
    combo: 0,
  }
}

/**
 * Advances the game timer by one second. Should be called every second.
 * When timeLeft reaches 0, the game is over.
 */
export function tickTimer(state: SpeedMathState): SpeedMathState {
  if (state.gameOver) return state

  const newTimeLeft = Math.max(0, state.timeLeft - 1)
  const gameOver = newTimeLeft <= 0

  return {
    ...state,
    timeLeft: newTimeLeft,
    gameOver,
  }
}

/** Returns the elapsed time in seconds since the game started. */
export function speedMathElapsed(state: SpeedMathState): number {
  return Math.floor((Date.now() - state.startTime) / 1000)
}

/** Returns the accuracy percentage (0-100). */
export function speedMathAccuracy(state: SpeedMathState): number {
  const total = state.correctCount + state.wrongCount
  if (total === 0) return 100
  return Math.round((state.correctCount / total) * 100)
}

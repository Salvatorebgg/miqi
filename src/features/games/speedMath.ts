export type SpeedMathDifficulty = 'easy' | 'medium' | 'hard' | 'expert'

export interface SpeedMathQuestion {
  a: number
  b: number
  op: string
  answer: number
  /** Human-readable expression, e.g. "12 + 7". */
  expression: string
  /** Optional third operand for three-operand expressions (e.g. a + b × c). */
  c?: number
  /** Optional second operator for three-operand expressions. */
  op2?: string
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
export interface SpeedMathConfig {
  min: number
  max: number
  ops: string[]
  /** Special question types enabled for this difficulty. */
  specials?: string[]
}

export const speedMathConfigs: Record<SpeedMathDifficulty, SpeedMathConfig> = {
  easy: { min: 1, max: 20, ops: ['+', '-'] },
  medium: { min: 1, max: 30, ops: ['+', '-', '*'] },
  hard: { min: 1, max: 40, ops: ['+', '-', '*', '/'], specials: ['exponent', 'sqrt', 'three-op'] },
  expert: { min: 1, max: 50, ops: ['+', '-', '*', '/'], specials: ['fraction', 'percentage', 'complex'] },
}

/** Timer duration in seconds per difficulty. */
export const speedMathTimers: Record<SpeedMathDifficulty, number> = {
  easy: 90,
  medium: 60,
  hard: 45,
  expert: 30,
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
 * For hard: exponents, square roots, and three-operand expressions.
 * For expert: fractions, percentages, and complex expressions.
 */
function generateQuestion(
  config: SpeedMathConfig,
  rng: () => number,
): SpeedMathQuestion {
  // Decide whether to generate a special question type (weighted)
  const specials = config.specials ?? []
  if (specials.length > 0 && rng() < 0.5) {
    const special = specials[Math.floor(rng() * specials.length)]
    switch (special) {
      case 'exponent':
        return generateExponentQuestion(config, rng)
      case 'sqrt':
        return generateSqrtQuestion(config, rng)
      case 'three-op':
        return generateThreeOpQuestion(config, rng)
      case 'fraction':
        return generateFractionQuestion(config, rng)
      case 'percentage':
        return generatePercentageQuestion(config, rng)
      case 'complex':
        return generateComplexQuestion(config, rng)
    }
  }

  // Standard arithmetic question
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
      a = Math.floor(rng() * (config.max - config.min + 1)) + config.min
      b = Math.floor(rng() * (a - config.min + 1)) + config.min
      answer = a - b
      break

    case '*':
      a = Math.floor(rng() * Math.min(config.max, 12)) + 1
      b = Math.floor(rng() * Math.min(config.max, 12)) + 1
      answer = a * b
      break

    case '/':
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

/** Generates an exponent question, e.g. 2^3 = 8 or 3^2 = 9. */
function generateExponentQuestion(
  _config: SpeedMathConfig,
  rng: () => number,
): SpeedMathQuestion {
  const base = Math.floor(rng() * 8) + 2 // 2..9
  const exp = Math.floor(rng() * 3) + 2  // 2..4
  const answer = Math.pow(base, exp)
  return {
    a: base,
    b: exp,
    op: '^',
    answer,
    expression: `${base}^${exp}`,
  }
}

/** Generates a square root question with a perfect square, e.g. √49 = 7. */
function generateSqrtQuestion(
  _config: SpeedMathConfig,
  rng: () => number,
): SpeedMathQuestion {
  const root = Math.floor(rng() * 11) + 2 // 2..12
  const square = root * root
  return {
    a: square,
    b: 0,
    op: '√',
    answer: root,
    expression: `√${square}`,
  }
}

/** Generates a three-operand expression with operator precedence, e.g. 3 + 4 × 2 = 11. */
function generateThreeOpQuestion(
  config: SpeedMathConfig,
  rng: () => number,
): SpeedMathQuestion {
  const ops: [string, string][] = [
    ['+', '×'], ['-', '×'], ['×', '+'], ['×', '-'],
    ['+', '÷'], ['-', '÷'],
  ]
  const [op1, op2] = ops[Math.floor(rng() * ops.length)]
  let a: number, b: number, c: number, answer: number

  // Generate values that produce clean integer results
  if (op2 === '×') {
    b = Math.floor(rng() * 11) + 2  // 2..12
    c = Math.floor(rng() * 11) + 2  // 2..12
    const product = b * c
    if (op1 === '+') {
      a = Math.floor(rng() * (config.max - 1)) + 1
      answer = a + product
    } else {
      // op1 === '-': ensure non-negative
      a = product + Math.floor(rng() * (config.max - 1)) + 1
      answer = a - product
    }
  } else if (op2 === '÷') {
    c = Math.floor(rng() * 11) + 2
    const k = Math.floor(rng() * 11) + 1
    b = c * k // ensures b ÷ c is exact
    if (op1 === '+') {
      a = Math.floor(rng() * (config.max - 1)) + 1
      answer = a + k
    } else {
      a = k + Math.floor(rng() * (config.max - 1)) + 1
      answer = a - k
    }
  } else {
    // Fallback: op2 is + or -
    a = Math.floor(rng() * (config.max - config.min + 1)) + config.min
    b = Math.floor(rng() * (config.max - config.min + 1)) + config.min
    c = Math.floor(rng() * (config.max - config.min + 1)) + config.min
    const middle = op2 === '+' ? b + c : b - c
    answer = op1 === '+' ? a + middle : a - middle
  }

  return {
    a, b, op: op1, answer,
    expression: `${a} ${op1} ${b} ${op2} ${c}`,
    c,
    op2,
  }
}

/** Generates a fraction addition/subtraction with a clean integer or simple fraction answer, e.g. 1/2 + 1/2 = 1. */
function generateFractionQuestion(
  _config: SpeedMathConfig,
  rng: () => number,
): SpeedMathQuestion {
  const den = Math.floor(rng() * 9) + 2 // 2..10
  const num1 = Math.floor(rng() * (den - 1)) + 1 // 1..den-1
  const num2 = Math.floor(rng() * (den - 1)) + 1
  const isAdd = rng() > 0.5

  let answer: number
  let op: string
  let expression: string

  if (isAdd) {
    answer = (num1 + num2) / den
    op = '+'
    expression = `${num1}/${den} + ${num2}/${den}`
  } else {
    // Ensure non-negative
    const larger = Math.max(num1, num2)
    const smaller = Math.min(num1, num2)
    answer = (larger - smaller) / den
    op = '−'
    expression = `${larger}/${den} − ${smaller}/${den}`
  }

  return {
    a: num1, b: den, op,
    answer: Math.round(answer * 100) / 100, // guard against FP imprecision for simple cases
    expression,
  }
}

/** Generates a percentage question, e.g. 25% of 200 = 50. */
function generatePercentageQuestion(
  _config: SpeedMathConfig,
  rng: () => number,
): SpeedMathQuestion {
  const pct = (Math.floor(rng() * 9) + 1) * 5 // 5, 10, 15, ..., 45
  const base = (Math.floor(rng() * 19) + 1) * 10 // 10, 20, ..., 190
  const answer = (pct / 100) * base

  return {
    a: pct,
    b: base,
    op: '%',
    answer,
    expression: `${pct}% of ${base}`,
  }
}

/** Generates a complex expression mixing operators or special forms, e.g. (15 + 25) ÷ 5 = 8. */
function generateComplexQuestion(
  config: SpeedMathConfig,
  rng: () => number,
): SpeedMathQuestion {
  const type = Math.floor(rng() * 3)

  if (type === 0) {
    // Parenthesized expression: (a + b) × c or (a + b) ÷ c
    const useMul = rng() > 0.5
    const a = Math.floor(rng() * (config.max / 2)) + 1
    const b = Math.floor(rng() * (config.max / 2)) + 1
    if (useMul) {
      const c = Math.floor(rng() * 5) + 2 // 2..6
      return {
        a, b, op: '+', answer: (a + b) * c,
        expression: `(${a} + ${b}) × ${c}`,
        c, op2: '×',
      }
    } else {
      const c = Math.floor(rng() * 5) + 2
      const sum = a + b
      const adjusted = sum * c // ensure a+b is divisible by c
      return {
        a: adjusted - b, b, op: '+', answer: c,
        expression: `(${adjusted - b} + ${b}) ÷ ${c}`,
        c, op2: '÷',
      }
    }
  } else if (type === 1) {
    // Mixed percentage: X% of Y, what is the result?
    return generatePercentageQuestion(config, rng)
  } else {
    // Exponent with addition: base^exp + n
    const base = Math.floor(rng() * 5) + 2 // 2..6
    const exp = Math.floor(rng() * 2) + 2  // 2..3
    const pow = Math.pow(base, exp)
    const n = Math.floor(rng() * (config.max - pow)) + 1
    return {
      a: base, b: exp, op: '^', answer: pow + n,
      expression: `${base}^${exp} + ${n}`,
      c: n, op2: '+',
    }
  }
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
  totalTime: number = speedMathTimers[difficulty],
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
 * Score formula: correct = +10 base + combo bonus (combo * 3, capped at +30).
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
    const comboBonus = Math.min(newCombo * 3, 30)
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

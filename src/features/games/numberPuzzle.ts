export type PuzzleRng = () => number

export type PuzzleDifficulty = 'easy' | 'medium' | 'hard'

export interface PuzzleConfig {
  min: number
  max: number
  useAll: boolean
  numberCount: number
}

export const puzzleDifficultyConfig: Record<PuzzleDifficulty, PuzzleConfig> = {
  easy: { min: 1, max: 9, useAll: false, numberCount: 4 },
  medium: { min: 1, max: 13, useAll: true, numberCount: 4 },
  hard: { min: 2, max: 20, useAll: true, numberCount: 4 },
}

export interface NumberPuzzle {
  numbers: number[]
  solution: string
}

export interface EvaluateResult {
  valid: boolean
  value: number | null
  error?: string
}

export interface ValidateNumbersResult {
  valid: boolean
  message: string
}

/** Deterministic RNG (mulberry32) shared with sudoku pattern. */
export function seededRandom(seed: number): PuzzleRng {
  let state = seed >>> 0
  return () => {
    state = (state + 0x6d2b79f5) >>> 0
    let t = state
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

type OpFn = (a: number, b: number) => number | null

const operations: { symbol: string; fn: OpFn }[] = [
  { symbol: '+', fn: (a, b) => a + b },
  { symbol: '-', fn: (a, b) => a - b },
  { symbol: '*', fn: (a, b) => a * b },
  { symbol: '/', fn: (a, b) => (b === 0 ? null : a / b) },
]

function permutations(arr: number[]): number[][] {
  if (arr.length <= 1) return [arr]
  const result: number[][] = []
  for (let i = 0; i < arr.length; i++) {
    const rest = [...arr.slice(0, i), ...arr.slice(i + 1)]
    for (const perm of permutations(rest)) {
      result.push([arr[i], ...perm])
    }
  }
  return result
}

/** Tries every bracket pattern to find a formula that equals 24. */
function findSolution(numbers: number[]): string | null {
  const perms = permutations(numbers)
  // Deduplicate permutations (important when numbers repeat).
  const seen = new Set<string>()
  const uniquePerms = perms.filter(p => {
    const key = p.join(',')
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })

  for (const [a, b, c, d] of uniquePerms) {
    for (const op1 of operations) {
      for (const op2 of operations) {
        for (const op3 of operations) {
          // Pattern: ((a op b) op c) op d
          const ab = op1.fn(a, b)
          if (ab !== null) {
            const abc = op2.fn(ab, c)
            if (abc !== null) {
              const abcd = op3.fn(abc, d)
              if (abcd !== null && Math.abs(abcd - 24) < 1e-9) {
                return `((${a} ${op1.symbol} ${b}) ${op2.symbol} ${c}) ${op3.symbol} ${d}`
              }
            }
          }
          // Pattern: (a op (b op c)) op d
          const bc = op2.fn(b, c)
          if (bc !== null) {
            const abc2 = op1.fn(a, bc)
            if (abc2 !== null) {
              const abcd2 = op3.fn(abc2, d)
              if (abcd2 !== null && Math.abs(abcd2 - 24) < 1e-9) {
                return `(${a} ${op1.symbol} (${b} ${op2.symbol} ${c})) ${op3.symbol} ${d}`
              }
            }
          }
          // Pattern: (a op b) op (c op d)
          if (ab !== null) {
            const cd = op3.fn(c, d)
            if (cd !== null) {
              const abcd3 = op2.fn(ab, cd)
              if (abcd3 !== null && Math.abs(abcd3 - 24) < 1e-9) {
                return `(${a} ${op1.symbol} ${b}) ${op2.symbol} (${c} ${op3.symbol} ${d})`
              }
            }
          }
          // Pattern: a op ((b op c) op d)
          if (bc !== null) {
            const bcd = op3.fn(bc, d)
            if (bcd !== null) {
              const abcd4 = op1.fn(a, bcd)
              if (abcd4 !== null && Math.abs(abcd4 - 24) < 1e-9) {
                return `${a} ${op1.symbol} ((${b} ${op2.symbol} ${c}) ${op3.symbol} ${d})`
              }
            }
          }
          // Pattern: a op (b op (c op d))
          const cd5 = op3.fn(c, d)
          if (cd5 !== null) {
            const bcd5 = op2.fn(b, cd5)
            if (bcd5 !== null) {
              const abcd5 = op1.fn(a, bcd5)
              if (abcd5 !== null && Math.abs(abcd5 - 24) < 1e-9) {
                return `${a} ${op1.symbol} (${b} ${op2.symbol} (${c} ${op3.symbol} ${d}))`
              }
            }
          }
        }
      }
    }
  }
  return null
}

/**
 * Generates a guaranteed-solvable puzzle by brute forcing random number sets.
 * Falls back to a known solvable set after maxAttempts.
 */
export function generatePuzzle(difficulty: PuzzleDifficulty, rng: PuzzleRng = Math.random): NumberPuzzle {
  const config = puzzleDifficultyConfig[difficulty]
  const maxAttempts = 5000
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const numbers = Array.from({ length: config.numberCount }, () =>
      Math.floor(rng() * (config.max - config.min + 1)) + config.min,
    )
    const solution = findSolution(numbers)
    if (solution) return { numbers, solution }
  }
  // Reliable fallbacks per difficulty
  const fallbacks: Record<PuzzleDifficulty, NumberPuzzle> = {
    easy: { numbers: [3, 5, 7, 9], solution: '(3 + 5) * (9 - 7)' },
    medium: { numbers: [2, 4, 8, 10], solution: '((10 - 8) + 2) * 4' },
    hard: { numbers: [3, 3, 8, 8], solution: '8 / (3 - (8 / 3))' },
  }
  return fallbacks[difficulty]
}

/** Safely evaluates a mathematical expression string. Only allows digits, operators, parens, decimal points. */
export function evaluateExpression(expr: string): EvaluateResult {
  const cleaned = expr.replace(/\s+/g, '')
  if (!cleaned) return { valid: false, value: null, error: '请输入算式' }
  if (cleaned.length > 200) return { valid: false, value: null, error: '算式过长' }
  // Only allow safe characters
  if (!/^[\d+\-*/().]+$/.test(cleaned)) {
    return { valid: false, value: null, error: '算式包含无效字符，仅允许数字和 + - * / ( )' }
  }
  // Check for consecutive operators (allow unary minus at start)
  if (/[+\-*/]{2,}/.test(cleaned)) {
    return { valid: false, value: null, error: '运算符使用不正确' }
  }
  // Check balanced parentheses
  let depth = 0
  for (const ch of cleaned) {
    if (ch === '(') depth++
    if (ch === ')') depth--
    if (depth < 0) return { valid: false, value: null, error: '括号不匹配' }
  }
  if (depth !== 0) return { valid: false, value: null, error: '括号不匹配' }
  // Check doesn't end with operator
  if (/[+\-*/]$/.test(cleaned)) {
    return { valid: false, value: null, error: '算式不能以运算符结尾' }
  }
  try {
    const result = new Function(`return (${cleaned})`)()
    if (typeof result !== 'number' || !isFinite(result)) {
      return { valid: false, value: null, error: '算式结果无效' }
    }
    return { valid: true, value: result }
  } catch {
    return { valid: false, value: null, error: '算式格式错误' }
  }
}

/** Extracts all integer numbers found in the expression string. */
export function extractNumbers(expr: string): number[] {
  const matches = expr.match(/\d+(\.\d+)?/g)
  return matches ? matches.map(Number) : []
}

/** Validates that the extracted numbers match the available numbers according to difficulty rules. */
export function validateNumbers(used: number[], available: number[], useAll: boolean): ValidateNumbersResult {
  const remaining = [...available]
  const usedCopy = [...used]
  const matched: number[] = []

  for (const num of usedCopy) {
    const idx = remaining.findIndex(n => Math.abs(n - num) < 1e-9)
    if (idx >= 0) {
      matched.push(num)
      remaining.splice(idx, 1)
    }
  }

  if (useAll && remaining.length > 0) {
    return { valid: false, message: `必须使用全部 ${available.length} 个数字` }
  }

  if (matched.length === 0) {
    return { valid: false, message: '请使用给出的数字' }
  }

  if (useAll) {
    // Check each available number is used exactly once
    const sortedAvailable = [...available].sort((a, b) => a - b)
    const sortedUsed = [...matched].sort((a, b) => a - b)
    if (sortedAvailable.length !== sortedUsed.length ||
        !sortedAvailable.every((v, i) => Math.abs(v - sortedUsed[i]) < 1e-9)) {
      return { valid: false, message: `必须恰好使用给出的 ${available.length} 个数字，每个一次` }
    }
  }

  return { valid: true, message: '' }
}

/** Generates a hint: returns the first step of the solution. */
export function generateHint(solution: string): string {
  if (!solution) return '试试结合乘法和加法...'
  // Extract the innermost operation as a hint step
  const innerMatch = solution.match(/\((\d+ [+\-*/] \d+)\)/)
  if (innerMatch) {
    return `提示：先计算 ${innerMatch[1]}`
  }
  return `提示：${solution}`
}

/** Gets the label for a difficulty level. */
export const puzzleDifficultyLabels: Record<PuzzleDifficulty, string> = {
  easy: '简单',
  medium: '中等',
  hard: '困难',
}

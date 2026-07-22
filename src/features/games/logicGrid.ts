/** Logic Grid Puzzle — Einstein-style deduction puzzle.
 *  Given a set of categories and clues, the player fills in a grid to find the solution.
 *  Simplified version: match 4 items across 3 categories (e.g. Name, Color, Pet). */

export type LogicDifficulty = 'easy' | 'medium' | 'hard'

export interface LogicClue {
  text: string
  /** e.g. "Alice has the cat" → positive(0, 0, 2) */
  type: 'positive' | 'negative' | 'adjacent' | 'left-of' | 'right-of'
  catA: number // category index
  itemA: number // item index
  catB: number
  itemB: number
}

export interface LogicGridState {
  categories: string[][] // e.g. [['Alice','Bob','Carol','Dave'], ['Red','Blue','Green','Yellow'], ['Cat','Dog','Bird','Fish']]
  grid: boolean[][][][] // grid[catA][itemA][catB][itemB] = true if match is possible
  clues: LogicClue[]
  currentClue: number // index of current clue being shown
  score: number
  difficulty: LogicDifficulty
  startedAt: number
  gameOver: boolean
  mistakes: number
}

// Pre-built puzzles: items across 3 categories, 4 items each
const PUZZLES = [
  {
    categories: [
      ['Alice', 'Bob', 'Carol', 'Dave'],
      ['Red', 'Blue', 'Green', 'Yellow'],
      ['Cat', 'Dog', 'Bird', 'Fish'],
    ],
    solution: [
      [0, 2, 1], // Alice-Green-Dog
      [1, 0, 3], // Bob-Red-Fish
      [2, 3, 0], // Carol-Yellow-Cat
      [3, 1, 2], // Dave-Blue-Bird
    ],
    clues: [
      { text: 'Alice 养的是狗', type: 'positive' as const, catA: 0, itemA: 0, catB: 2, itemB: 1 },
      { text: '穿红色衣服的人养鱼', type: 'positive' as const, catA: 1, itemA: 0, catB: 2, itemB: 3 },
      { text: 'Carol 不喜欢蓝色', type: 'negative' as const, catA: 0, itemA: 2, catB: 1, itemB: 1 },
      { text: 'Bob 不是绿色', type: 'negative' as const, catA: 0, itemA: 1, catB: 1, itemB: 2 },
      { text: '养猫的人衣服是黄色的', type: 'positive' as const, catA: 2, itemA: 0, catB: 1, itemB: 3 },
      { text: 'Dave 养的是鸟', type: 'positive' as const, catA: 0, itemA: 3, catB: 2, itemB: 2 },
    ],
  },
  {
    categories: [
      ['张三', '李四', '王五', '赵六'],
      ['数学', '物理', '化学', '生物'],
      ['85分', '90分', '95分', '100分'],
    ],
    solution: [
      [0, 1, 2], // 张三-物理-95分
      [1, 0, 3], // 李四-数学-100分
      [2, 3, 0], // 王五-生物-85分
      [3, 2, 1], // 赵六-化学-90分
    ],
    clues: [
      { text: '李四考了满分', type: 'positive' as const, catA: 0, itemA: 1, catB: 2, itemB: 3 },
      { text: '学生物的分数最低', type: 'positive' as const, catA: 1, itemA: 3, catB: 2, itemB: 0 },
      { text: '张三不是学化学的', type: 'negative' as const, catA: 0, itemA: 0, catB: 1, itemB: 2 },
      { text: '考95分的人学物理', type: 'positive' as const, catA: 2, itemA: 2, catB: 1, itemB: 1 },
      { text: '赵六比王五考得好', type: 'negative' as const, catA: 0, itemA: 3, catB: 2, itemB: 0 },
    ],
  },
]

export function generateLogicPuzzle(difficulty: LogicDifficulty): LogicGridState {
  const puzzle = PUZZLES[Math.floor(Math.random() * PUZZLES.length)]
  const size = puzzle.categories[0].length
  // Initialize grid: all combinations possible
  const grid: boolean[][][][] = []
  for (let a = 0; a < 3; a++) {
    const catA: boolean[][][] = []
    for (let i = 0; i < size; i++) {
      const itemA: boolean[][] = []
      for (let b = 0; b < 3; b++) {
        const catB: boolean[] = []
        for (let j = 0; j < size; j++) catB.push(true)
        itemA.push(catB)
      }
      catA.push(itemA)
    }
    grid.push(catA)
  }

  return {
    categories: puzzle.categories,
    grid,
    clues: puzzle.clues,
    currentClue: 0,
    score: 0,
    difficulty,
    startedAt: Date.now(),
    gameOver: false,
    mistakes: 0,
  }
}

export function showNextClue(state: LogicGridState): LogicGridState {
  if (state.currentClue >= state.clues.length) return state
  return { ...state, currentClue: state.currentClue + 1 }
}

export function checkSolution(state: LogicGridState, answers: number[][]): LogicGridState {
  if (answers.length !== 4) return { ...state, mistakes: state.mistakes + 1 }
  const gameOver = true
  const score = state.mistakes === 0 ? 1000 : Math.max(500 - state.mistakes * 100, 100)
  return { ...state, gameOver, score }
}

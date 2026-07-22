import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Brain,
  Calculator,
  Eraser,
  Gem,
  Grid3x3,
  HelpCircle,
  Lightbulb,
  Puzzle,
  RotateCcw,
  Send,
  Sparkles,
  Table2,
  Trophy,
  Undo2,
  Zap,
} from 'lucide-react'
import {
  difficultyClues,
  generateSudoku,
  validateSudoku,
  isSolved,
  type SudokuBoard,
  type SudokuDifficulty,
} from './sudoku'
import { createMazeState, movePlayer, type Direction, type MazeState } from './maze'
import {
  evaluateExpression,
  extractNumbers,
  generateHint,
  generatePuzzle,
  puzzleDifficultyConfig,
  puzzleDifficultyLabels,
  validateNumbers,
  type NumberPuzzle,
  type PuzzleDifficulty,
} from './numberPuzzle'
import {
  generateMemoryGame,
  flipCard as flipMemoryCard,
  type MemoryState,
} from './memory'
import {
  generateSlidingPuzzle,
  moveTile,
  type SlidingState,
} from './slidingPuzzle'
import {
  generateHanoi,
  selectPeg,
  isHanoiSolved,
  type HanoiState,
} from './hanoi'
import {
  generateSpeedMath,
  submitAnswer as submitSpeedMath,
  tickTimer as tickSpeedMathTimer,
  type SpeedMathState,
} from './speedMath'
import {
  generateSimon,
  advanceSequence,
  startShowingSequence,
  advanceShowing,
  playerPress,
  type SimonState,
} from './simon'
import { getRepository, LOCAL_USER_ID, newId } from '../../lib/repositoryInstance'
import type { GameSession } from '../../types/domain'

// ── helpers ──────────────────────────────────────────────────────────

const saveSession = (session: Omit<GameSession, 'id' | 'userId' | 'createdAt'>) =>
  getRepository().saveGameSession({
    ...session,
    id: newId(),
    userId: LOCAL_USER_ID,
    createdAt: new Date().toISOString(),
  })

const formatTime = (seconds: number): string =>
  `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`

function useTimer(active: boolean): { seconds: number; reset: () => void } {
  const [seconds, setSeconds] = useState(0)
  const activeRef = useRef(active)
  activeRef.current = active
  useEffect(() => {
    if (!active) return
    const timer = setInterval(() => setSeconds(value => value + 1), 1000)
    return () => clearInterval(timer)
  }, [active])
  const reset = useCallback(() => setSeconds(0), [])
  return { seconds, reset }
}

// ── high scores ──────────────────────────────────────────────────────

const HS_KEY = 'miqi-game-high-scores'

function loadHighScores(): Record<string, number> {
  try {
    return JSON.parse(localStorage.getItem(HS_KEY) || '{}') as Record<string, number>
  } catch {
    return {}
  }
}

function saveHighScore(game: string, difficulty: string, score: number) {
  const key = `${game}:${difficulty}`
  const scores = loadHighScores()
  if (!scores[key] || score > scores[key]) {
    scores[key] = score
    localStorage.setItem(HS_KEY, JSON.stringify(scores))
  }
}

function useHighScore(game: string, difficulty: string): number {
  const [score, setScore] = useState(() => loadHighScores()[`${game}:${difficulty}`] ?? 0)
  useEffect(() => {
    setScore(loadHighScores()[`${game}:${difficulty}`] ?? 0)
  }, [game, difficulty])
  return score
}

// ── confetti ─────────────────────────────────────────────────────────

const CONFETTI_COLORS = ['#58c99d', '#9ddfca', '#e8879b', '#fde68a', '#bfdbfe', '#c4b5fd', '#f9a8d4', '#fdba74']

interface ConfettiProps {
  active: boolean
}

function Confetti({ active }: ConfettiProps) {
  const pieces = useMemo(
    () =>
      Array.from({ length: 40 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
        delay: `${Math.random() * 0.6}s`,
        duration: `${2.2 + Math.random() * 2}s`,
        rotation: `${360 + Math.random() * 720}deg`,
        size: `${6 + Math.random() * 6}px`,
      })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [active],
  )

  if (!active) return null

  return (
    <div className="confetti-overlay" aria-hidden="true">
      {pieces.map(p => (
        <div
          key={p.id}
          className="confetti-piece"
          style={{
            left: p.left,
            background: p.color,
            width: p.size,
            height: p.size,
            animationDelay: p.delay,
            animationDuration: p.duration,
            ['--confetti-rot' as string]: p.rotation,
            ['--confetti-delay' as string]: p.delay,
            ['--confetti-dur' as string]: p.duration,
          } as React.CSSProperties}
        />
      ))}
    </div>
  )
}

// ── Sudoku ───────────────────────────────────────────────────────────

function SudokuGame() {
  const [difficulty, setDifficulty] = useState<SudokuDifficulty>('easy')
  const [board, setBoard] = useState<SudokuBoard>(() => generateSudoku('easy'))
  const [cells, setCells] = useState<number[][]>(board.cells.map(row => [...row]))
  const [history, setHistory] = useState<number[][][]>([])
  const [selected, setSelected] = useState<[number, number] | null>(null)
  const [won, setWon] = useState(false)
  const [showHelp, setShowHelp] = useState(false)
  const { seconds, reset: resetTimer } = useTimer(!won)
  const secondsRef = useRef(seconds)
  secondsRef.current = seconds
  const highScore = useHighScore('sudoku', difficulty)
  const [confetti, setConfetti] = useState(false)

  const conflicts = new Set(validateSudoku(cells).conflicts.map(([r, c]) => `${r},${c}`))

  const restart = (nextDifficulty = difficulty) => {
    const next = generateSudoku(nextDifficulty)
    setDifficulty(nextDifficulty)
    setBoard(next)
    setCells(next.cells.map(row => [...row]))
    setHistory([])
    setSelected(null)
    setWon(false)
    setConfetti(false)
    resetTimer()
  }

  const place = useCallback(
    (value: number) => {
      setSelected(current => {
        if (!current || won) return current
        const [row, col] = current
        if (board.fixed[row][col]) return current
        setCells(previous => {
          const next = previous.map(r => [...r])
          next[row][col] = value
          setHistory(h => [...h, previous])
          if (value !== 0 && isSolved(next)) {
            setWon(true)
            setConfetti(true)
            const score = Math.max(1000 - secondsRef.current * 2, 100)
            void saveSession({
              game: 'sudoku',
              difficulty,
              durationSeconds: secondsRef.current,
              moves: 81 - difficultyClues[difficulty],
              score,
            })
            saveHighScore('sudoku', difficulty, score)
          }
          return next
        })
        return current
      })
    },
    [board, difficulty, won],
  )

  const undo = () => {
    setHistory(previous => {
      if (previous.length === 0) return previous
      setCells(previous[previous.length - 1])
      return previous.slice(0, -1)
    })
  }

  const hint = () => {
    if (!selected || won) return
    const [row, col] = selected
    if (board.fixed[row][col]) return
    place(board.solution[row][col])
  }

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (/^[1-9]$/.test(event.key)) place(Number(event.key))
      if (event.key === 'Backspace' || event.key === 'Delete' || event.key === '0') place(0)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [place])

  return (
    <div className="game-pane">
      <Confetti active={confetti} />

      <div className="game-toolbar">
        <div className="difficulty-row">
          {(Object.keys(difficultyClues) as SudokuDifficulty[]).map(level => (
            <button
              key={level}
              type="button"
              className={`difficulty-pill ${difficulty === level ? 'active' : ''}`}
              onClick={() => restart(level)}
            >
              {{ easy: '简单', medium: '中等', hard: '困难' }[level]}
            </button>
          ))}
        </div>
        <span className="game-timer" role="timer" aria-label="用时">{formatTime(seconds)}</span>
        {highScore > 0 ? (
          <span className="game-high-score"><Trophy aria-hidden="true" />{highScore}</span>
        ) : null}
        <button type="button" className="help-toggle" onClick={() => setShowHelp(h => !h)} aria-expanded={showHelp}>
          <HelpCircle aria-hidden="true" />{showHelp ? '收起' : '帮助'}
        </button>
      </div>

      {showHelp ? (
        <div className="help-panel">
          <h4>玩法说明</h4>
          <ul>
            <li>点击方格选中，然后点击数字键盘或按键盘 1-9 填入数字</li>
            <li>每行、每列、每个 3x3 九宫格内数字 1-9 不能重复</li>
            <li>灰色数字为固定提示，不可修改</li>
            <li>使用「撤销」回退错误操作，「提示」自动填入正确答案</li>
          </ul>
        </div>
      ) : null}

      <div className="sudoku-grid" role="grid" aria-label="数独棋盘">
        {cells.map((row, rowIndex) =>
          row.map((value, colIndex) => {
            const key = `${rowIndex},${colIndex}`
            const isSelected = selected?.[0] === rowIndex && selected?.[1] === colIndex
            return (
              <button
                key={key}
                type="button"
                role="gridcell"
                aria-label={`第 ${rowIndex + 1} 行第 ${colIndex + 1} 列${value ? `，数字 ${value}` : '，空'}${board.fixed[rowIndex][colIndex] ? '（固定）' : ''}`}
                aria-selected={isSelected}
                className={[
                  'sudoku-cell',
                  board.fixed[rowIndex][colIndex] ? 'fixed' : '',
                  isSelected ? 'selected' : '',
                  conflicts.has(key) ? 'conflict' : '',
                  colIndex % 3 === 2 && colIndex < 8 ? 'box-right' : '',
                  rowIndex % 3 === 2 && rowIndex < 8 ? 'box-bottom' : '',
                ].join(' ')}
                onClick={() => setSelected([rowIndex, colIndex])}
              >
                {value !== 0 ? value : ''}
              </button>
            )
          }),
        )}
      </div>

      <div className="sudoku-pad" role="group" aria-label="数字键盘">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(number => (
          <button key={number} type="button" className="ghost-button" onClick={() => place(number)}>
            {number}
          </button>
        ))}
        <button type="button" className="ghost-button" onClick={() => place(0)} aria-label="清除">
          <Eraser aria-hidden="true" />
        </button>
      </div>

      <div className="game-actions">
        <button type="button" className="ghost-button" onClick={undo} disabled={history.length === 0}>
          <Undo2 aria-hidden="true" />撤销
        </button>
        <button type="button" className="ghost-button" onClick={hint} disabled={!selected || won}>
          <Lightbulb aria-hidden="true" />提示
        </button>
        <button type="button" className="ghost-button" onClick={() => restart()}>
          <RotateCcw aria-hidden="true" />新一局
        </button>
      </div>

      <div aria-live="polite">
        {won ? (
          <p className="game-result glass" role="status">
            <Sparkles aria-hidden="true" /> 恭喜完成数独！用时 {formatTime(seconds)}。
          </p>
        ) : null}
      </div>
    </div>
  )
}

// ── Maze ─────────────────────────────────────────────────────────────

function MazeGame() {
  const [state, setState] = useState<MazeState>(() => createMazeState(10, 10))
  const { seconds, reset: resetTimer } = useTimer(!state.won)
  const secondsRef = useRef(seconds)
  secondsRef.current = seconds
  const savedRef = useRef(false)
  const highScore = useHighScore('maze', '10x10')
  const [confetti, setConfetti] = useState(false)
  const [showHelp, setShowHelp] = useState(false)

  const move = useCallback(
    (direction: Direction) => {
      setState(current => {
        const next = movePlayer(current, direction)
        if (next.won && !current.won && !savedRef.current) {
          savedRef.current = true
          setConfetti(true)
          const score = Math.max(1000 - next.moves * 5 - secondsRef.current, 100)
          void saveSession({
            game: 'maze',
            difficulty: '10x10',
            durationSeconds: secondsRef.current,
            moves: next.moves,
            score,
          })
          saveHighScore('maze', '10x10', score)
        }
        return next
      })
    },
    [],
  )

  useEffect(() => {
    const keyMap: Record<string, Direction> = {
      ArrowUp: 'up', ArrowDown: 'down', ArrowLeft: 'left', ArrowRight: 'right',
      w: 'up', s: 'down', a: 'left', d: 'right',
      W: 'up', S: 'down', A: 'left', D: 'right',
    }
    const onKey = (event: KeyboardEvent) => {
      const direction = keyMap[event.key]
      if (!direction) return
      if ((event.target as HTMLElement | null)?.tagName === 'INPUT') return
      event.preventDefault()
      move(direction)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [move])

  const restart = () => {
    savedRef.current = false
    setConfetti(false)
    resetTimer()
    setState(createMazeState(10, 10))
  }

  return (
    <div className="game-pane">
      <Confetti active={confetti} />

      <div className="game-toolbar">
        <span className="game-timer" role="timer" aria-label="用时">{formatTime(seconds)}</span>
        <span className="game-moves">步数：{state.moves}</span>
        {highScore > 0 ? (
          <span className="game-high-score"><Trophy aria-hidden="true" />{highScore}</span>
        ) : null}
        <button type="button" className="help-toggle" onClick={() => setShowHelp(h => !h)} aria-expanded={showHelp}>
          <HelpCircle aria-hidden="true" />{showHelp ? '收起' : '帮助'}
        </button>
        <button type="button" className="ghost-button" onClick={restart}>
          <RotateCcw aria-hidden="true" />新迷宫
        </button>
      </div>

      {showHelp ? (
        <div className="help-panel">
          <h4>玩法说明</h4>
          <ul>
            <li>使用方向键或 WASD 控制绿色圆点移动</li>
            <li>从左上角起点到达右下角粉色终点即获胜</li>
            <li>你也可以点击下方的方向按钮来移动</li>
            <li>尝试用最少的步数完成迷宫挑战！</li>
          </ul>
        </div>
      ) : null}

      <div
        className="maze-grid"
        role="application"
        aria-label="迷宫：使用方向键或 WASD 移动，从左上方起点走到右下方终点"
        tabIndex={0}
      >
        {state.maze.map((row, y) =>
          row.map((cell, x) => (
            <div
              key={`${x},${y}`}
              className={[
                'maze-cell',
                cell.walls.up ? 'wall-up' : '',
                cell.walls.down ? 'wall-down' : '',
                cell.walls.left ? 'wall-left' : '',
                cell.walls.right ? 'wall-right' : '',
                state.goal.x === x && state.goal.y === y ? 'goal' : '',
              ].join(' ')}
            >
              {state.player.x === x && state.player.y === y ? <span className="maze-player" aria-hidden="true" /> : null}
            </div>
          )),
        )}
      </div>

      <div className="maze-pad" role="group" aria-label="移动方向">
        <span />
        <button type="button" className="ghost-button" onClick={() => move('up')} aria-label="向上移动"><ArrowUp aria-hidden="true" /></button>
        <span />
        <button type="button" className="ghost-button" onClick={() => move('left')} aria-label="向左移动"><ArrowLeft aria-hidden="true" /></button>
        <button type="button" className="ghost-button" onClick={() => move('down')} aria-label="向下移动"><ArrowDown aria-hidden="true" /></button>
        <button type="button" className="ghost-button" onClick={() => move('right')} aria-label="向右移动"><ArrowRight aria-hidden="true" /></button>
      </div>

      <div aria-live="polite">
        {state.won ? (
          <p className="game-result glass" role="status">
            <Sparkles aria-hidden="true" /> 走出迷宫！{state.moves} 步，用时 {formatTime(seconds)}。
          </p>
        ) : null}
      </div>
    </div>
  )
}

// ── Number Puzzle (24-Point) ─────────────────────────────────────────

const GAME_ID = 'numberPuzzle' as const

function NumberPuzzleGame() {
  const [difficulty, setDifficulty] = useState<PuzzleDifficulty>('easy')
  const [puzzle, setPuzzle] = useState<NumberPuzzle>(() => generatePuzzle('easy'))
  const [expression, setExpression] = useState('')
  const [feedback, setFeedback] = useState<{ type: 'error' | 'success' | 'hint'; message: string } | null>(null)
  const [won, setWon] = useState(false)
  const [hintText, setHintText] = useState('')
  const [moves, setMoves] = useState(0)
  const [showHelp, setShowHelp] = useState(false)
  const { seconds, reset: resetTimer } = useTimer(!won)
  const secondsRef = useRef(seconds)
  secondsRef.current = seconds
  const highScore = useHighScore(GAME_ID, difficulty)
  const [confetti, setConfetti] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const config = puzzleDifficultyConfig[difficulty]

  const restart = (nextDifficulty = difficulty) => {
    const next = generatePuzzle(nextDifficulty)
    setDifficulty(nextDifficulty)
    setPuzzle(next)
    setExpression('')
    setFeedback(null)
    setHintText('')
    setWon(false)
    setMoves(0)
    setConfetti(false)
    resetTimer()
    setTimeout(() => inputRef.current?.focus(), 50)
  }

  const submit = () => {
    if (won) return
    const trimmed = expression.trim()
    if (!trimmed) {
      setFeedback({ type: 'error', message: '请输入算式' })
      return
    }
    setHintText('')
    setMoves(m => m + 1)

    // Evaluate
    const result = evaluateExpression(trimmed)
    if (!result.valid) {
      setFeedback({ type: 'error', message: result.error || '算式无效' })
      return
    }

    // Check result equals 24
    if (Math.abs(result.value! - 24) > 1e-9) {
      setFeedback({ type: 'error', message: `结果为 ${result.value}，不等于 24，再试试！` })
      return
    }

    // Check number usage
    const usedNums = extractNumbers(trimmed)
    const numCheck = validateNumbers(usedNums, puzzle.numbers, config.useAll)
    if (!numCheck.valid) {
      setFeedback({ type: 'error', message: numCheck.message })
      return
    }

    // Success!
    setWon(true)
    setConfetti(true)
    setFeedback({ type: 'success', message: '太棒了！算式正确等于 24！' })
    const score = Math.max(1000 - secondsRef.current * 2 - moves * 10, 100)
    void saveSession({
      game: GAME_ID,
      difficulty,
      durationSeconds: secondsRef.current,
      moves,
      score,
    })
    saveHighScore(GAME_ID, difficulty, score)
  }

  const showHint = () => {
    if (won) return
    setMoves(m => m + 1)
    setHintText(generateHint(puzzle.solution))
    setFeedback({ type: 'hint', message: '已显示提示（计入步数）' })
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      submit()
    }
  }

  return (
    <div className="game-pane">
      <Confetti active={confetti} />

      <div className="game-toolbar">
        <div className="difficulty-row">
          {(Object.keys(puzzleDifficultyConfig) as PuzzleDifficulty[]).map(level => (
            <button
              key={level}
              type="button"
              className={`difficulty-pill ${difficulty === level ? 'active' : ''}`}
              onClick={() => restart(level)}
            >
              {puzzleDifficultyLabels[level]}
            </button>
          ))}
        </div>
        <span className="game-timer" role="timer" aria-label="用时">{formatTime(seconds)}</span>
        <span className="game-moves">尝试：{moves}</span>
        {highScore > 0 ? (
          <span className="game-high-score"><Trophy aria-hidden="true" />{highScore}</span>
        ) : null}
        <button type="button" className="help-toggle" onClick={() => setShowHelp(h => !h)} aria-expanded={showHelp}>
          <HelpCircle aria-hidden="true" />{showHelp ? '收起' : '帮助'}
        </button>
      </div>

      {showHelp ? (
        <div className="help-panel">
          <h4>24 点玩法说明</h4>
          <ul>
            <li>使用给出的 {config.numberCount} 个数字，通过 + - * / 和括号组合，使结果等于 24</li>
            {config.useAll ? (
              <li>必须<b>恰好使用全部</b> {config.numberCount} 个数字，每个数字用一次</li>
            ) : (
              <li>可以使用部分数字，输入算式后提交即可</li>
            )}
            <li>例如：数字 3, 5, 7, 9，算式 (3+5)*(9-7) = 24</li>
            <li>支持小数：如 8/(3-8/3) = 24</li>
            <li>点击「提示」获取解题思路（会增加尝试次数）</li>
          </ul>
        </div>
      ) : null}

      <div className="number-puzzle-numbers" aria-label="可用数字">
        {puzzle.numbers.map((num, i) => (
          <div key={i} className="number-card">{num}</div>
        ))}
      </div>

      <div className="puzzle-input-row">
        <div className="puzzle-input-wrap">
          <input
            ref={inputRef}
            type="text"
            value={expression}
            onChange={e => { setExpression(e.target.value); setFeedback(null); setHintText('') }}
            onKeyDown={handleKeyDown}
            className={feedback?.type === 'error' ? 'input-error' : ''}
            placeholder="输入算式，例如 (3+5)*(9-7)"
            aria-label="算式输入"
            disabled={won}
            autoFocus
          />
        </div>
        <button type="button" className="primary-button" onClick={submit} disabled={won}>
          <Send aria-hidden="true" />提交
        </button>
      </div>

      {feedback ? (
        <p className={`puzzle-feedback ${feedback.type}`} role={feedback.type === 'error' ? 'alert' : 'status'} aria-live="polite">
          {feedback.message}
        </p>
      ) : null}

      {hintText ? (
        <p className="puzzle-hint-text"><Lightbulb aria-hidden="true" /> {hintText}</p>
      ) : null}

      <div className="game-actions">
        <button type="button" className="ghost-button" onClick={showHint} disabled={won}>
          <Lightbulb aria-hidden="true" />提示
        </button>
        <button type="button" className="ghost-button" onClick={() => restart()}>
          <RotateCcw aria-hidden="true" />新一局
        </button>
      </div>

      <div aria-live="polite">
        {won ? (
          <p className="game-result glass" role="status">
            <Sparkles aria-hidden="true" /> 恭喜完成 24 点！用时 {formatTime(seconds)}，尝试 {moves} 次。
          </p>
        ) : null}
      </div>
    </div>
  )
}

// ── Game definitions for the selector ────────────────────────────────

type GameId = 'sudoku' | 'maze' | 'numberPuzzle' | 'memory' | 'sliding' | 'hanoi' | 'speedMath' | 'simon'

interface GameDef {
  id: GameId
  icon: React.ReactNode
  name: string
  desc: string
}

const gameDefs: GameDef[] = [
  { id: 'sudoku', icon: <Grid3x3 aria-hidden="true" />, name: '数独', desc: '经典数字填空' },
  { id: 'maze', icon: <Puzzle aria-hidden="true" />, name: '迷宫', desc: '方向键移动寻路' },
  { id: 'numberPuzzle', icon: <Calculator aria-hidden="true" />, name: '24 点', desc: '四数合算 24' },
  { id: 'memory', icon: <Brain aria-hidden="true" />, name: '记忆翻牌', desc: '匹配数学恒等式' },
  { id: 'sliding', icon: <Table2 aria-hidden="true" />, name: '滑块拼图', desc: '滑动数字排序' },
  { id: 'hanoi', icon: <Puzzle aria-hidden="true" />, name: '汉诺塔', desc: '碟片移动挑战' },
  { id: 'speedMath', icon: <Zap aria-hidden="true" />, name: '心算竞赛', desc: '限时速算得分' },
  { id: 'simon', icon: <Gem aria-hidden="true" />, name: '西蒙记忆', desc: '颜色序列回忆' },
]

// ── Memory Game ───────────────────────────────────────────────────

function MemoryGame() {
  const [state, setState] = useState<MemoryState>(() => generateMemoryGame('medium'))
  const [confetti, setConfetti] = useState(false)
  const timer = useTimer(true)
  const diffLabel = { easy: '易', medium: '中', hard: '难' }

  const handleFlip = (cardId: number) => setState(s => flipMemoryCard(s, cardId))
  const restart = (d: 'easy' | 'medium' | 'hard') => { setState(generateMemoryGame(d)); setConfetti(false) }
  const won = state.pairsFound === state.totalPairs
  if (won && !confetti) { setConfetti(true); saveSession({ game: 'memory', difficulty: 'medium', durationSeconds: timer.seconds, moves: state.moves, score: Math.max(1000 - timer.seconds * 2 - state.moves * 5, 100) }) }

  return (
    <div className="game-pane fade-in">
      <Confetti active={confetti} />
      <div className="game-toolbar">
        <span className="game-timer">{formatTime(timer.seconds)}</span>
        <span className="game-moves">步数: {state.moves}</span>
        <span className="game-moves">{state.pairsFound}/{state.totalPairs} 对</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${state.totalPairs > 6 ? 5 : 4}, 3.5rem)`, gap: '0.5rem' }}>
        {state.cards.map(card => (
          <button key={card.id} onClick={() => handleFlip(card.id)} disabled={card.matched || card.flipped}
            style={{ height: '3.5rem', borderRadius: '0.5rem', border: '2px solid var(--mint-500)',
              background: card.matched ? 'var(--mint-100)' : card.flipped ? '#fff' : 'var(--forest)',
              color: card.flipped || card.matched ? 'var(--ink)' : 'transparent', fontSize: '0.7rem', fontWeight: 700,
              cursor: card.matched ? 'default' : 'pointer', padding: '0.2rem' }}>
            {card.flipped || card.matched ? card.content : '?'}
          </button>
        ))}
      </div>
      {won ? <div className="game-result glass"><Sparkles size={16} /> 全部配对！{state.moves} 步完成</div> : null}
      <div className="difficulty-row">
        {(['easy', 'medium', 'hard'] as const).map(d =>
          <button key={d} className={`difficulty-pill ${d === 'medium' ? 'active' : ''}`} onClick={() => restart(d)}>{diffLabel[d]}</button>
        )}
      </div>
    </div>
  )
}

// ── Sliding Puzzle ────────────────────────────────────────────────

function SlidingGame() {
  const [state, setState] = useState<SlidingState>(() => generateSlidingPuzzle('medium'))
  const [confetti, setConfetti] = useState(false)
  const timer = useTimer(!state.solved)

  const handleMove = (r: number, c: number) => setState(s => moveTile(s, r, c))
  const restart = () => { setState(generateSlidingPuzzle('medium')); setConfetti(false) }
  if (state.solved && !confetti) { setConfetti(true); saveSession({ game: 'sliding', difficulty: 'medium', durationSeconds: timer.seconds, moves: state.moves, score: Math.max(1000 - timer.seconds - state.moves * 5, 100) }) }

  return (
    <div className="game-pane fade-in">
      <Confetti active={confetti} />
      <div className="game-toolbar">
        <span className="game-timer">{formatTime(timer.seconds)}</span>
        <span className="game-moves">步数: {state.moves}</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${state.gridSize}, 3.5rem)`, gap: '0.3rem' }}>
        {state.tiles.map((row, r) => row.map((val, c) => (
          <button key={`${r}-${c}`} onClick={() => handleMove(r, c)}
            style={{ height: '3.5rem', borderRadius: '0.5rem', border: '2px solid var(--mint-300)',
              background: val === 0 ? 'transparent' : '#fff', color: val === 0 ? 'transparent' : 'var(--forest)',
              fontSize: '1.2rem', fontWeight: 700, cursor: val === 0 ? 'default' : 'pointer' }}>
            {val || ''}
          </button>
        )))}
      </div>
      {state.solved ? <div className="game-result glass"><Sparkles size={16} /> 拼图完成！{state.moves} 步</div> : null}
      <button className="ghost-button" onClick={restart}><RotateCcw size={14} /> 新一局</button>
    </div>
  )
}

// ── Hanoi ─────────────────────────────────────────────────────────

function HanoiGame() {
  const [state, setState] = useState<HanoiState>(() => generateHanoi('medium'))
  const [confetti, setConfetti] = useState(false)
  const timer = useTimer(!isHanoiSolved(state))
  const won = isHanoiSolved(state)

  const handlePeg = (i: number) => setState(s => selectPeg(s, i))
  const restart = () => { setState(generateHanoi('medium')); setConfetti(false) }
  if (won && !confetti) { setConfetti(true); saveSession({ game: 'hanoi', difficulty: 'medium', durationSeconds: timer.seconds, moves: state.moves, score: Math.max(1000 - timer.seconds - state.moves * 5, 100) }) }

  const COLORS = ['#58c99d', '#9ddfca', '#315949', '#2e9c74', '#78d5b1']
  return (
    <div className="game-pane fade-in">
      <Confetti active={confetti} />
      <div className="game-toolbar">
        <span className="game-timer">{formatTime(timer.seconds)}</span>
        <span className="game-moves">步数: {state.moves} / 最少: {state.minMoves}</span>
      </div>
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
        {state.pegs.map((peg, i) => (
          <button key={i} onClick={() => handlePeg(i)}
            style={{ width: '5rem', minHeight: '8rem', border: `3px solid ${state.selectedPeg === i ? 'var(--mint-500)' : 'var(--mint-300)'}`,
              borderRadius: '0.5rem', background: state.selectedPeg === i ? 'var(--mint-100)' : 'rgba(255,255,255,0.5)',
              display: 'flex', flexDirection: 'column-reverse', alignItems: 'center', padding: '0.3rem', gap: '0.15rem', cursor: 'pointer' }}>
            {peg.map((disk, j) => (
              <div key={j} style={{ height: '1.2rem', borderRadius: '0.3rem',
                background: COLORS[disk.size % COLORS.length], width: `${1.5 + disk.size * 0.8}rem` }} />
            ))}
          </button>
        ))}
      </div>
      {won ? <div className="game-result glass"><Sparkles size={16} /> 完成！{state.moves} 步 (最优 {state.minMoves} 步)</div> : null}
      <button className="ghost-button" onClick={restart}><RotateCcw size={14} /> 重置</button>
    </div>
  )
}

// ── Speed Math ────────────────────────────────────────────────────

function SpeedMathGame() {
  const [state, setState] = useState<SpeedMathState>(() => generateSpeedMath('medium'))
  const [confetti, setConfetti] = useState(false)
  const [input, setInput] = useState('')
  const intervalRef = useRef<ReturnType<typeof setInterval>>()

  useEffect(() => {
    intervalRef.current = setInterval(() => setState(s => tickSpeedMathTimer(s)), 1000)
    return () => clearInterval(intervalRef.current)
  }, [])

  useEffect(() => { if (state.gameOver) clearInterval(intervalRef.current) }, [state.gameOver])
  if (state.gameOver && !confetti) { setConfetti(true); saveSession({ game: 'speedMath', difficulty: 'medium', durationSeconds: 60 - state.timeLeft, moves: state.correctCount, score: state.score }) }

  const submit = () => {
    setState(s => submitSpeedMath(s, Number(input)))
    setInput('')
  }
  const restart = () => {
    clearInterval(intervalRef.current)
    const fresh = generateSpeedMath('medium')
    setState(fresh)
    setConfetti(false)
    setInput('')
    intervalRef.current = setInterval(() => setState(s => tickSpeedMathTimer(s)), 1000)
  }

  return (
    <div className="game-pane fade-in">
      <Confetti active={confetti} />
      <div className="game-toolbar">
        <span className="game-timer" style={{ color: state.timeLeft <= 10 ? '#b3394f' : undefined }}>{state.timeLeft}s</span>
        <span className="game-moves">得分: {state.score}</span>
        <span className="game-moves">连击: {state.combo}x</span>
      </div>
      {!state.gameOver ? (
        <>
          <h3 style={{ fontSize: '2rem', margin: '1rem 0', color: 'var(--forest)' }}>{state.question.expression} = ?</h3>
          <div className="puzzle-input-row">
            <div className="puzzle-input-wrap">
              <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && submit()}
                placeholder="输入答案" inputMode="decimal" />
            </div>
            <button className="primary-button" onClick={submit}><Send size={14} /></button>
          </div>
        </>
      ) : (
        <div className="game-result glass"><Sparkles size={16} /> 正确 {state.correctCount} 题，得分 {state.score}！</div>
      )}
      <button className="ghost-button" onClick={restart}><RotateCcw size={14} /> 重新开始</button>
    </div>
  )
}

// ── Simon ─────────────────────────────────────────────────────────

function SimonGame() {
  const [state, setState] = useState<SimonState>(() => generateSimon())
  const [confetti, setConfetti] = useState(false)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    if (!state.isShowing || !started || state.gameOver) return
    const timer = setInterval(() => setState(s => advanceShowing(s).state), 600)
    return () => clearInterval(timer)
  }, [state.isShowing, started, state.gameOver])

  const startRound = () => {
    setStarted(true)
    const nextState = startShowingSequence(advanceSequence(state))
    setState(nextState)
  }
  const handlePress = (i: number) => {
    if (state.isShowing || state.gameOver) return
    const result = playerPress(state, i)
    if (result.gameOver && !confetti && result.currentRound > 1) { setConfetti(true) }
    setState(result)
  }
  const restart = () => { setState(generateSimon()); setStarted(false); setConfetti(false) }

  const COLORS_SIMON = ['#e74c3c', '#3498db', '#2ecc71', '#f1c40f']

  return (
    <div className="game-pane fade-in">
      <Confetti active={confetti} />
      <div className="game-toolbar">
        <span className="game-moves">轮次: {state.currentRound}</span>
        <span className="game-moves">得分: {state.score}</span>
        {state.gameOver ? <span className="game-moves" style={{ color: '#b3394f' }}>游戏结束</span> : null}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
        {COLORS_SIMON.map((color, i) => (
          <button key={i} onClick={() => handlePress(i)} disabled={state.isShowing || state.gameOver || !started}
            style={{ width: '5rem', height: '5rem', borderRadius: '0.75rem', border: '3px solid transparent',
              background: color, opacity: state.isShowing && state.showingIndex === i ? 0.4 : 1,
              cursor: started && !state.isShowing && !state.gameOver ? 'pointer' : 'default',
              boxShadow: state.isShowing && state.showingIndex === i ? `0 0 20px ${color}` : undefined,
              transition: 'all 0.15s ease', transform: state.isShowing && state.showingIndex === i ? 'scale(0.9)' : undefined }} />
        ))}
      </div>
      {!started || state.gameOver ? (
        <button className="primary-button" onClick={state.gameOver ? restart : startRound}>{state.gameOver ? <><RotateCcw size={14} /> 重新开始</> : '开始'}</button>
      ) : (
        <p className="game-moves">{state.isShowing ? '观察序列…' : '重复序列'}</p>
      )}
    </div>
  )
}

// ── GamesPage ────────────────────────────────────────────────────────

export function GamesPage() {
  const [game, setGame] = useState<GameId>('sudoku')
  const [animKey, setAnimKey] = useState(0)

  const switchGame = (id: GameId) => {
    if (id !== game) {
      setGame(id)
      setAnimKey(k => k + 1)
    }
  }

  return (
    <section className="page-panel glass" aria-labelledby="games-title">
      <p className="eyebrow">脑力游戏</p>
      <h2 id="games-title">给大脑一次轻快挑战</h2>

      <div className="game-selector" role="tablist" aria-label="选择游戏">
        {gameDefs.map(def => (
          <button
            key={def.id}
            type="button"
            role="tab"
            aria-selected={game === def.id}
            className={`game-card ${game === def.id ? 'active' : ''}`}
            onClick={() => switchGame(def.id)}
          >
            <span className="game-card-icon">{def.icon}</span>
            <span className="game-card-name">{def.name}</span>
            <span className="game-card-desc">{def.desc}</span>
          </button>
        ))}
      </div>

      <div key={animKey} className="game-pane fade-in">
        {game === 'sudoku' ? <SudokuGame /> : game === 'maze' ? <MazeGame /> : game === 'numberPuzzle' ? <NumberPuzzleGame /> : game === 'memory' ? <MemoryGame /> : game === 'sliding' ? <SlidingGame /> : game === 'hanoi' ? <HanoiGame /> : game === 'speedMath' ? <SpeedMathGame /> : <SimonGame />}
      </div>
    </section>
  )
}

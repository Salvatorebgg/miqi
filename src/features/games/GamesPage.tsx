import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  ArrowDown, ArrowLeft, ArrowRight, ArrowUp,
  Bomb, Eraser,
  Grid3x3, HelpCircle, Lightbulb, Puzzle,
  RotateCcw, Send, Sparkles, Table2,
  Timer, Trophy, Type, Undo2, Zap,
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
  generateWordle, typeLetter, backspace, submitGuess,
  type WordleState,
} from './wordle'
import {
  generateSlidingPuzzle, moveTile,
  type SlidingState,
} from './slidingPuzzle'
import {
  generateMinesweeper, revealCell, toggleFlag,
  type MinesweeperState, minesweeperDiffLabels, type MinesweeperDifficulty,
} from './minesweeper'
import {
  generateSpeedMath, submitAnswer as submitSpeedMath,
  tickTimer as tickSpeedMathTimer, type SpeedMathState,
} from './speedMath'
import {
  generateReaction, goGreen, tap, getReactionRating,
  type ReactionState,
} from './reaction'
import {
  generateLogicPuzzle, showNextClue, type LogicGridState,
} from './logicGrid'
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
// (replaced by Minesweeper + Wordle + Reaction + LogicGrid)

function WordleGame() {
  const [state, setState] = useState<WordleState>(() => generateWordle())
  const [confetti, setConfetti] = useState(false)
  const QWERTY = ['QWERTYUIOP', 'ASDFGHJKL', 'ZXCVBNM']

  const onKey = (k: string) => setState(s => {
    if (k === '⌫') return backspace(s)
    if (k === '⏎') { const ns = submitGuess(s); if (ns.won && !confetti) setConfetti(true); return ns }
    if (s.currentGuess.length < 5) return typeLetter(s, k)
    return s
  })
  const restart = () => { setState(generateWordle()); setConfetti(false) }

  const getColor = (ch: string) => {
    const ls = state.lettersUsed[ch]
    return ls === 'correct' ? 'var(--mint-500)' : ls === 'present' ? '#e2a840' : ls === 'absent' ? '#777' : undefined
  }

  return (
    <div className="game-pane fade-in">
      <Confetti active={confetti} />
      <div className="game-toolbar">
        <span className="game-moves">{state.attempts}/6 次</span>
        {state.message ? <span className={state.won ? 'form-success' : 'form-error'}>{state.message}</span> : null}
      </div>
      <div style={{ display: 'grid', gap: '0.3rem' }}>
        {Array.from({ length: 6 }, (_, r) => {
          const guess = state.guesses[r]
          const eval_ = state.evaluations[r]
          const isCurrent = r === state.guesses.length && !state.gameOver
          return (
            <div key={r} style={{ display: 'flex', gap: '0.3rem', justifyContent: 'center' }}>
              {Array.from({ length: 5 }, (_, c) => {
                const ch = isCurrent ? state.currentGuess[c] : guess ? guess[c] : ''
                const bg = eval_ ? (eval_[c] === 'correct' ? 'var(--mint-500)' : eval_[c] === 'present' ? '#e2a840' : '#555') : undefined
                const color = bg ? '#fff' : 'var(--ink)'
                const border = isCurrent && c === state.currentGuess.length ? '2px solid var(--mint-500)' : '2px solid #ccc'
                return (
                  <span key={c} style={{ width: '3rem', height: '3rem', display: 'grid', placeItems: 'center',
                    borderRadius: '0.4rem', background: bg || '#fff', color, border,
                    fontSize: '1.3rem', fontWeight: 700, textTransform: 'uppercase' }}>
                    {ch || ''}
                  </span>
                )
              })}
            </div>
          )
        })}
      </div>
      {/* Keyboard */}
      <div style={{ display: 'grid', gap: '0.35rem', marginTop: '0.5rem' }}>
        {QWERTY.map((row, ri) => (
          <div key={ri} style={{ display: 'flex', gap: '0.2rem', justifyContent: 'center' }}>
            {ri === 2 ? <button onClick={() => onKey('⏎')} style={kbStyle}>⏎</button> : null}
            {row.split('').map(ch => (
              <button key={ch} onClick={() => onKey(ch)} style={{ ...kbStyle, background: getColor(ch) || '#ddd', color: getColor(ch) ? '#fff' : '#333', minWidth: '1.8rem' }}>{ch}</button>
            ))}
            {ri === 2 ? <button onClick={() => onKey('⌫')} style={{ ...kbStyle, minWidth: '2.5rem' }}>⌫</button> : null}
          </div>
        ))}
      </div>
      <button className="ghost-button" onClick={restart}><RotateCcw size={14} /> 新单词</button>
    </div>
  )
}

const kbStyle: React.CSSProperties = { height: '2.5rem', borderRadius: '0.35rem', border: 'none', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 700, padding: '0 0.4rem' }

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

// ── Minesweeper ───────────────────────────────────────────────────

function MinesweeperGame() {
  const [diff, setDiff] = useState<MinesweeperDifficulty>('medium')
  const [state, setState] = useState<MinesweeperState>(() => generateMinesweeper(diff))
  const [confetti, setConfetti] = useState(false)
  const timer = useTimer(state.started && !state.gameOver)

  const handleCell = (r: number, c: number) => setState(s => {
    const ns = revealCell(s, r, c)
    if (ns.won && !confetti) setConfetti(true)
    return ns
  })
  const handleRightClick = (r: number, c: number, e: React.MouseEvent) => {
    e.preventDefault()
    setState(s => toggleFlag(s, r, c))
  }
  const restart = (d?: MinesweeperDifficulty) => {
    const nd = d || diff
    setDiff(nd); setState(generateMinesweeper(nd)); setConfetti(false)
  }

  const isDark = (r: number, c: number) => (r + c) % 2 === 0
  return (
    <div className="game-pane fade-in">
      <Confetti active={confetti} />
      <div className="game-toolbar">
        <span className="game-timer">{formatTime(timer.seconds)}</span>
        <span className="game-moves">🚩{state.flagCount}/{state.totalMines}</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${state.cols}, 1.8rem)`, gap: 0, border: '2px solid var(--forest)', borderRadius: '0.3rem', overflow: 'hidden' }}>
        {state.grid.map((row, r) => row.map((cell, c) => (
          <button key={`${r}-${c}`} onClick={() => handleCell(r, c)} onContextMenu={e => handleRightClick(r, c, e)}
            style={{ width: '1.8rem', height: '1.8rem', border: '1px solid rgba(0,0,0,0.15)', padding: 0,
              background: cell.revealed ? (isDark(r, c) ? '#e8e8e0' : '#f0f0e8') : (isDark(r, c) ? '#a0d0a8' : '#b0d8b8'),
              color: cell.revealed ? ['','#2563eb','#16a34a','#dc2626','#1e40af','#7c3aed','#0d9488','#333','#666'][cell.adjacentMines] || '#333' : 'transparent',
              fontSize: '0.85rem', fontWeight: 800, cursor: 'pointer' }}>
            {cell.revealed ? (cell.isMine ? '💣' : cell.adjacentMines || '') : cell.flagged ? '🚩' : ''}
          </button>
        )))}
      </div>
      {state.gameOver ? <div className={`game-result glass`}>{state.won ? <><Sparkles size={16} /> 扫雷成功！</> : '💥 踩雷了！'}</div> : null}
      <div className="difficulty-row">
        {(Object.keys(minesweeperDiffLabels) as MinesweeperDifficulty[]).map(d => (
          <button key={d} className={`difficulty-pill ${d === diff ? 'active' : ''}`} onClick={() => restart(d)}>{minesweeperDiffLabels[d]}</button>
        ))}
      </div>
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

// ── Reaction ──────────────────────────────────────────────────────

function ReactionGame() {
  const [state, setState] = useState<ReactionState>(() => generateReaction(5))
  useEffect(() => {
    if (state.phase === 'ready') {
      const delay = 1000 + Math.random() * 4000
      const t = setTimeout(() => setState(s => goGreen(s)), delay)
      return () => clearTimeout(t)
    }
  }, [state.phase])

  const handleTap = () => {
    if (state.phase === 'idle' || state.phase === 'go') setState(s => tap(s))
    else if (state.phase === 'ready') setState(s => tap(s)) // false start
  }

  const restart = () => setState(generateReaction(5))

  const bgColor = state.phase === 'go' ? '#2ecc71' : state.phase === 'ready' ? '#e74c3c' : state.phase === 'falseStart' ? '#e67e22' : '#3498db'

  return (
    <div className="game-pane fade-in">
      <div className="game-toolbar">
        <span className="game-moves">{state.round}/{state.totalRounds} 轮</span>
        {state.bestTime < Infinity ? <span className="game-moves">最佳: {state.bestTime}ms</span> : null}
        {state.avgTime > 0 ? <span className="game-moves">平均: {state.avgTime}ms</span> : null}
      </div>
      <button onClick={handleTap}
        style={{ width: '12rem', height: '12rem', borderRadius: '50%', border: '4px solid rgba(255,255,255,0.3)',
          background: bgColor, color: '#fff', fontSize: '1.4rem', fontWeight: 800, cursor: 'pointer',
          transition: 'background 0.1s ease', boxShadow: `0 0 40px ${bgColor}66` }}>
        {state.phase === 'idle' && !state.gameOver ? '点击开始' : state.phase === 'ready' ? '等待...' : state.phase === 'go' ? '快按！' : state.phase === 'falseStart' ? '太早！' : state.gameOver ? `${getReactionRating(state.avgTime)}\n${state.avgTime}ms` : ''}
      </button>
      {state.reactionTimes.length > 0 ? (
        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          {state.reactionTimes.map((t, i) => (
            <span key={i} style={{ padding: '0.2rem 0.5rem', borderRadius: '0.3rem', fontSize: '0.78rem',
              background: t < 200 ? 'var(--mint-100)' : t < 300 ? '#fef3c7' : '#fce4ec', fontWeight: 700 }}>
              {t}ms
            </span>
          ))}
        </div>
      ) : null}
      {state.gameOver ? <button className="ghost-button" onClick={restart}><RotateCcw size={14} /> 重新测试</button> : null}
    </div>
  )
}

// ── Logic Grid ────────────────────────────────────────────────────

function LogicGridGame() {
  const [state, setState] = useState<LogicGridState>(() => generateLogicPuzzle('medium'))

  const nextClue = () => setState(s => showNextClue(s))
  const restart = () => setState(generateLogicPuzzle('medium'))

  return (
    <div className="game-pane fade-in">
      <div className="game-toolbar">
        <span className="game-moves">线索: {state.currentClue}/{state.clues.length}</span>
        {state.mistakes > 0 ? <span className="game-moves" style={{ color: '#b3394f' }}>错误: {state.mistakes}</span> : null}
      </div>
      <div className="help-panel glass" style={{ maxWidth: '28rem', lineHeight: 1.6 }}>
        {state.clues.slice(0, state.currentClue).map((clue, i) => (
          <p key={i} style={{ margin: '0.3rem 0', fontSize: '0.85rem' }}>
            <strong>{i + 1}.</strong> {clue.text}
          </p>
        ))}
        {state.currentClue < state.clues.length ? (
          <p style={{ margin: '0.3rem 0', color: 'var(--muted)' }}>
            <strong>{state.currentClue + 1}.</strong> <em>点击"下一线索"揭晓</em>
          </p>
        ) : null}
        {state.currentClue === 0 ? <p style={{ color: 'var(--muted)', fontSize: '0.82rem' }}>阅读线索，推理出每个属性组合。点击"下一线索"逐条查看。</p> : null}
      </div>
      {/* Category legend */}
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center', fontSize: '0.78rem', fontWeight: 600 }}>
        {state.categories.map((cat, i) => (
          <div key={i}>
            <span style={{ color: 'var(--muted)' }}>{['姓名','科目','成绩'][i]}: </span>
            {cat.join(', ')}
          </div>
        ))}
      </div>
      <div className="game-actions">
        {state.currentClue < state.clues.length ? (
          <button className="primary-button" onClick={nextClue}><Lightbulb size={14} /> 下一线索</button>
        ) : null}
        <button className="ghost-button" onClick={restart}><RotateCcw size={14} /> 新谜题</button>
      </div>
    </div>
  )
}

// ── Game definitions ──────────────────────────────────────────────

type GameId = 'sudoku' | 'maze' | 'sliding' | 'speedMath' | 'wordle' | 'minesweeper' | 'reaction' | 'logicGrid'

interface GameDef {
  id: GameId
  icon: React.ReactNode
  name: string
  desc: string
}

const gameDefs: GameDef[] = [
  { id: 'sudoku', icon: <Grid3x3 aria-hidden="true" />, name: '数独', desc: '专家模式 · 24线索' },
  { id: 'maze', icon: <Puzzle aria-hidden="true" />, name: '迷宫', desc: '最大25×25 · 迷雾' },
  { id: 'sliding', icon: <Table2 aria-hidden="true" />, name: '滑块拼图', desc: '5×5高难挑战' },
  { id: 'speedMath', icon: <Zap aria-hidden="true" />, name: '心算竞赛', desc: '指数·根号·分数' },
  { id: 'wordle', icon: <Type aria-hidden="true" />, name: '猜词', desc: '6次机会猜5字母单词' },
  { id: 'minesweeper', icon: <Bomb aria-hidden="true" />, name: '扫雷', desc: '16×30 · 99雷专家' },
  { id: 'reaction', icon: <Timer aria-hidden="true" />, name: '反应测试', desc: '毫秒级速度测试' },
  { id: 'logicGrid', icon: <Lightbulb aria-hidden="true" />, name: '逻辑谜题', desc: '爱因斯坦推理挑战' },
]

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
        {game === 'sudoku' ? <SudokuGame /> : game === 'maze' ? <MazeGame /> : game === 'sliding' ? <SlidingGame /> : game === 'speedMath' ? <SpeedMathGame /> : game === 'wordle' ? <WordleGame /> : game === 'minesweeper' ? <MinesweeperGame /> : game === 'reaction' ? <ReactionGame /> : <LogicGridGame />}
      </div>
    </section>
  )
}

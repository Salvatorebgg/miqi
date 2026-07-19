import { useCallback, useEffect, useRef, useState } from 'react'
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, Eraser, Grid3x3, Lightbulb, Puzzle, RotateCcw, Undo2 } from 'lucide-react'
import {
  difficultyClues,
  generateSudoku,
  validateSudoku,
  isSolved,
  type SudokuBoard,
  type SudokuDifficulty,
} from './sudoku'
import { createMazeState, movePlayer, type Direction, type MazeState } from './maze'
import { getRepository, LOCAL_USER_ID, newId } from '../../lib/repositoryInstance'
import type { GameSession } from '../../types/domain'

const saveSession = (session: Omit<GameSession, 'id' | 'userId' | 'createdAt'>) =>
  getRepository().saveGameSession({
    ...session,
    id: newId(),
    userId: LOCAL_USER_ID,
    createdAt: new Date().toISOString(),
  })

const formatTime = (seconds: number): string =>
  `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`

function useTimer(active: boolean): number {
  const [seconds, setSeconds] = useState(0)
  useEffect(() => {
    if (!active) return
    const timer = setInterval(() => setSeconds(value => value + 1), 1000)
    return () => clearInterval(timer)
  }, [active])
  return seconds
}

function SudokuGame() {
  const [difficulty, setDifficulty] = useState<SudokuDifficulty>('easy')
  const [board, setBoard] = useState<SudokuBoard>(() => generateSudoku('easy'))
  const [cells, setCells] = useState<number[][]>(board.cells.map(row => [...row]))
  const [history, setHistory] = useState<number[][][]>([])
  const [selected, setSelected] = useState<[number, number] | null>(null)
  const [won, setWon] = useState(false)
  const seconds = useTimer(!won)
  const secondsRef = useRef(seconds)
  secondsRef.current = seconds

  const conflicts = new Set(validateSudoku(cells).conflicts.map(([r, c]) => `${r},${c}`))

  const restart = (nextDifficulty = difficulty) => {
    const next = generateSudoku(nextDifficulty)
    setDifficulty(nextDifficulty)
    setBoard(next)
    setCells(next.cells.map(row => [...row]))
    setHistory([])
    setSelected(null)
    setWon(false)
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
            void saveSession({
              game: 'sudoku',
              difficulty,
              durationSeconds: secondsRef.current,
              moves: 81 - difficultyClues[difficulty],
              score: Math.max(1000 - secondsRef.current * 2, 100),
            })
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
      <div className="game-toolbar">
        {(Object.keys(difficultyClues) as SudokuDifficulty[]).map(level => (
          <button
            key={level}
            type="button"
            className={`tab-button ${difficulty === level ? 'active' : ''}`}
            onClick={() => restart(level)}
          >
            {{ easy: '简单', medium: '中等', hard: '困难' }[level]}
          </button>
        ))}
        <span className="game-timer" role="timer" aria-label="用时">{formatTime(seconds)}</span>
      </div>

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
            🎉 恭喜完成数独！用时 {formatTime(seconds)}。
          </p>
        ) : null}
      </div>
    </div>
  )
}

function MazeGame() {
  const [state, setState] = useState<MazeState>(() => createMazeState(10, 10))
  const seconds = useTimer(!state.won)
  const secondsRef = useRef(seconds)
  secondsRef.current = seconds
  const savedRef = useRef(false)

  const move = useCallback(
    (direction: Direction) => {
      setState(current => {
        const next = movePlayer(current, direction)
        if (next.won && !current.won && !savedRef.current) {
          savedRef.current = true
          void saveSession({
            game: 'maze',
            difficulty: '10x10',
            durationSeconds: secondsRef.current,
            moves: next.moves,
            score: Math.max(1000 - next.moves * 5 - secondsRef.current, 100),
          })
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
    setState(createMazeState(10, 10))
  }

  return (
    <div className="game-pane">
      <div className="game-toolbar">
        <span className="game-timer" role="timer" aria-label="用时">{formatTime(seconds)}</span>
        <span className="game-moves">步数：{state.moves}</span>
        <button type="button" className="ghost-button" onClick={restart}>
          <RotateCcw aria-hidden="true" />新迷宫
        </button>
      </div>

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
            🎉 走出迷宫！{state.moves} 步，用时 {formatTime(seconds)}。
          </p>
        ) : null}
      </div>
    </div>
  )
}

export function GamesPage() {
  const [game, setGame] = useState<'sudoku' | 'maze'>('sudoku')
  return (
    <section className="page-panel glass" aria-labelledby="games-title">
      <p className="eyebrow">脑力游戏</p>
      <h2 id="games-title">给大脑一次轻快挑战</h2>
      <div className="tab-row" role="tablist" aria-label="选择游戏">
        <button type="button" role="tab" aria-selected={game === 'sudoku'} className={`tab-button ${game === 'sudoku' ? 'active' : ''}`} onClick={() => setGame('sudoku')}>
          <Grid3x3 aria-hidden="true" />数独
        </button>
        <button type="button" role="tab" aria-selected={game === 'maze'} className={`tab-button ${game === 'maze' ? 'active' : ''}`} onClick={() => setGame('maze')}>
          <Puzzle aria-hidden="true" />迷宫
        </button>
      </div>
      {game === 'sudoku' ? <SudokuGame /> : <MazeGame />}
    </section>
  )
}

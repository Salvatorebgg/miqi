import { describe, expect, it } from 'vitest'
import { createMazeState, generateMaze, movePlayer, openEdges, reachableCells, revealAdjacentCells, revealAllCells } from './maze'
import { seededRandom } from './sudoku'

describe('generateMaze', () => {
  it('generates a connected perfect maze', () => {
    const maze = generateMaze(12, 12, seededRandom(42))
    expect(reachableCells(maze)).toBe(144)
    expect(openEdges(maze)).toBe(143)
  })

  it('keeps walls symmetric between neighbours', () => {
    const maze = generateMaze(8, 8, seededRandom(5))
    for (let y = 0; y < 8; y++) {
      for (let x = 0; x < 8; x++) {
        if (x + 1 < 8) expect(maze[y][x].walls.right).toBe(maze[y][x + 1].walls.left)
        if (y + 1 < 8) expect(maze[y][x].walls.down).toBe(maze[y + 1][x].walls.up)
      }
    }
  })

  it('is deterministic with a seeded rng', () => {
    expect(generateMaze(6, 6, seededRandom(9))).toEqual(generateMaze(6, 6, seededRandom(9)))
  })
})

describe('fog-of-war', () => {
  it('lights up the spawn area on creation', () => {
    const state = createMazeState(5, 5, seededRandom(3))
    expect(state.maze[0][0].revealed).toBe(true)
    expect(state.maze[0][1].revealed).toBe(true)
    expect(state.maze[1][0].revealed).toBe(true)
  })

  it('reveals cells adjacent to the player when moving', () => {
    const state = createMazeState(5, 5, seededRandom(4))
    const open = (['up', 'down', 'left', 'right'] as const).find(
      direction => !state.maze[0][0].walls[direction],
    )!
    const next = movePlayer(state, open)
    const revealedCount = next.maze.flat().filter(cell => cell.revealed).length
    expect(revealedCount).toBeGreaterThan(state.maze.flat().filter(cell => cell.revealed).length)
  })

  it('reveals everything on revealAllCells', () => {
    const state = createMazeState(4, 4, seededRandom(7))
    const revealed = revealAllCells(state)
    expect(revealed.maze.every(row => row.every(cell => cell.revealed))).toBe(true)
  })

  it('never reveals cells outside the maze bounds', () => {
    const state = createMazeState(3, 3, seededRandom(9))
    // Move the player to a corner and confirm revealAdjacentCells stays in-bounds.
    const corner = { ...state, player: { x: 2, y: 2 } }
    const result = revealAdjacentCells(corner)
    expect(result.maze).toHaveLength(3)
    expect(result.maze.every(row => row.length === 3)).toBe(true)
  })
})

describe('movePlayer', () => {
  it('blocks movement through walls', () => {
    const state = createMazeState(5, 5, seededRandom(11))
    // Start at (0,0); the top and left borders are always walls.
    expect(movePlayer(state, 'up')).toBe(state)
    expect(movePlayer(state, 'left')).toBe(state)
  })

  it('moves through open passages and counts steps', () => {
    const state = createMazeState(5, 5, seededRandom(11))
    // The start cell always has at least one open passage; find it.
    const open = (['up', 'down', 'left', 'right'] as const).find(
      direction => !state.maze[0][0].walls[direction],
    )!
    const next = movePlayer(state, open)
    expect(next).not.toBe(state)
    expect(next.moves).toBe(1)
  })

  it('detects winning at the goal cell', () => {
    const state = createMazeState(3, 3, seededRandom(2))
    const wonState = { ...state, player: { x: 2, y: 1 }, moves: 10 }
    // Force an open passage to the goal.
    wonState.maze = state.maze.map((row, y) =>
      row.map((cell, x) =>
        x === 2 && y === 1 ? { ...cell, walls: { ...cell.walls, down: false } } : x === 2 && y === 2 ? { ...cell, walls: { ...cell.walls, up: false } } : cell,
      ),
    )
    const next = movePlayer(wonState, 'down')
    expect(next.won).toBe(true)
  })
})

export type MazeRng = () => number

export type MazeDifficulty = 'easy' | 'medium' | 'hard' | 'expert'

export const mazeDifficultySizes: Record<MazeDifficulty, { width: number; height: number }> = {
  easy: { width: 5, height: 5 },
  medium: { width: 10, height: 10 },
  hard: { width: 20, height: 20 },
  expert: { width: 25, height: 25 },
}

export type Direction = 'up' | 'down' | 'left' | 'right'

export interface MazeCell {
  /** walls[side] === true means a wall on that side */
  walls: Record<Direction, boolean>
  /** Whether this cell has been revealed (fog-of-war). */
  revealed: boolean
}

export interface Position {
  x: number
  y: number
}

export interface MazeState {
  maze: MazeCell[][]
  player: Position
  goal: Position
  moves: number
  won: boolean
}

const directionToWall: Record<Direction, Direction> = { up: 'up', down: 'down', left: 'left', right: 'right' }
const opposite: Record<Direction, Direction> = { up: 'down', down: 'up', left: 'right', right: 'left' }
const delta: Record<Direction, Position> = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
}

/** Randomized depth-first search producing a perfect maze with symmetric walls. */
export function generateMaze(width: number, height: number, rng: MazeRng = Math.random): MazeCell[][] {
  const maze: MazeCell[][] = Array.from({ length: height }, () =>
    Array.from({ length: width }, () => ({ walls: { up: true, down: true, left: true, right: true }, revealed: false })),
  )
  const visited = Array.from({ length: height }, () => Array<boolean>(width).fill(false))
  const stack: Position[] = [{ x: 0, y: 0 }]
  visited[0][0] = true

  while (stack.length > 0) {
    const current = stack[stack.length - 1]
    const neighbours = (Object.keys(delta) as Direction[])
      .map(direction => ({
        direction,
        position: { x: current.x + delta[direction].x, y: current.y + delta[direction].y },
      }))
      .filter(({ position }) =>
        position.x >= 0 && position.x < width && position.y >= 0 && position.y < height && !visited[position.y][position.x],
      )

    if (neighbours.length === 0) {
      stack.pop()
      continue
    }
    const { direction, position } = neighbours[Math.floor(rng() * neighbours.length)]
    maze[current.y][current.x].walls[directionToWall[direction]] = false
    maze[position.y][position.x].walls[opposite[direction]] = false
    visited[position.y][position.x] = true
    stack.push(position)
  }
  return maze
}

export function createMazeState(width: number, height: number, rng: MazeRng = Math.random): MazeState {
  const base: MazeState = {
    maze: generateMaze(width, height, rng),
    player: { x: 0, y: 0 },
    goal: { x: width - 1, y: height - 1 },
    moves: 0,
    won: false,
  }
  // Fog-of-war starts with the spawn area lit so the player can move at once.
  return revealAdjacentCells(base)
}

export function movePlayer(state: MazeState, direction: Direction): MazeState {
  if (state.won) return state
  const wall = directionToWall[direction]
  if (state.maze[state.player.y][state.player.x].walls[wall]) return state
  const player: Position = {
    x: state.player.x + delta[direction].x,
    y: state.player.y + delta[direction].y,
  }
  const nextState: MazeState = {
    ...state,
    player,
    moves: state.moves + 1,
    won: player.x === state.goal.x && player.y === state.goal.y,
  }
  // Apply fog-of-war: reveal cells adjacent to the new player position
  return revealAdjacentCells(nextState)
}

/**
 * Fog-of-war: reveals the cell the player is standing on plus all
 * cardinal-direction neighbours (up to 5 cells).
 */
export function revealAdjacentCells(state: MazeState): MazeState {
  const { maze, player } = state
  const height = maze.length
  const width = maze[0]?.length ?? 0
  const newMaze = maze.map(row => row.map(cell => ({ ...cell, walls: { ...cell.walls } })))

  // Reveal the player's current cell and all 4 cardinal neighbours
  const toReveal: Position[] = [
    { x: player.x, y: player.y },
    { x: player.x, y: player.y - 1 },
    { x: player.x, y: player.y + 1 },
    { x: player.x - 1, y: player.y },
    { x: player.x + 1, y: player.y },
  ]

  for (const pos of toReveal) {
    if (pos.x >= 0 && pos.x < width && pos.y >= 0 && pos.y < height) {
      newMaze[pos.y][pos.x].revealed = true
    }
  }

  return { ...state, maze: newMaze }
}

/**
 * Fully reveals all cells on the maze (e.g. when the game is won).
 */
export function revealAllCells(state: MazeState): MazeState {
  const newMaze = state.maze.map(row =>
    row.map(cell => ({ ...cell, walls: { ...cell.walls }, revealed: true })),
  )
  return { ...state, maze: newMaze }
}

/** Counts cells reachable from (0,0); a perfect maze reaches every cell. */
export function reachableCells(maze: MazeCell[][]): number {
  const height = maze.length
  const width = maze[0]?.length ?? 0
  const visited = Array.from({ length: height }, () => Array<boolean>(width).fill(false))
  const queue: Position[] = [{ x: 0, y: 0 }]
  visited[0][0] = true
  let count = 0
  while (queue.length > 0) {
    const current = queue.shift()!
    count += 1
    for (const direction of Object.keys(delta) as Direction[]) {
      if (maze[current.y][current.x].walls[directionToWall[direction]]) continue
      const next = { x: current.x + delta[direction].x, y: current.y + delta[direction].y }
      if (next.x < 0 || next.x >= width || next.y < 0 || next.y >= height || visited[next.y][next.x]) continue
      visited[next.y][next.x] = true
      queue.push(next)
    }
  }
  return count
}

/** Counts open passages between adjacent cells (each counted once). */
export function openEdges(maze: MazeCell[][]): number {
  let edges = 0
  for (let y = 0; y < maze.length; y++) {
    for (let x = 0; x < maze[y].length; x++) {
      if (!maze[y][x].walls.right) edges += 1
      if (!maze[y][x].walls.down) edges += 1
    }
  }
  return edges
}

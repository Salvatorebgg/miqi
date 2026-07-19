export type MazeRng = () => number

export type Direction = 'up' | 'down' | 'left' | 'right'

export interface MazeCell {
  /** walls[side] === true means a wall on that side */
  walls: Record<Direction, boolean>
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
    Array.from({ length: width }, () => ({ walls: { up: true, down: true, left: true, right: true } })),
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
  return {
    maze: generateMaze(width, height, rng),
    player: { x: 0, y: 0 },
    goal: { x: width - 1, y: height - 1 },
    moves: 0,
    won: false,
  }
}

export function movePlayer(state: MazeState, direction: Direction): MazeState {
  if (state.won) return state
  const wall = directionToWall[direction]
  if (state.maze[state.player.y][state.player.x].walls[wall]) return state
  const player: Position = {
    x: state.player.x + delta[direction].x,
    y: state.player.y + delta[direction].y,
  }
  return {
    ...state,
    player,
    moves: state.moves + 1,
    won: player.x === state.goal.x && player.y === state.goal.y,
  }
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

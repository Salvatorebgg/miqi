import { describe, expect, it } from 'vitest'
import { generateHanoi, hanoiDiskCounts, hanoiRating, isHanoiSolved, selectPeg } from './hanoi'

describe('generateHanoi', () => {
  it('stacks all disks on the left peg, largest at the bottom', () => {
    const state = generateHanoi('medium')
    expect(state.numDisks).toBe(hanoiDiskCounts.medium)
    expect(state.pegs[0]).toHaveLength(state.numDisks)
    expect(state.pegs[1]).toHaveLength(0)
    expect(state.pegs[2]).toHaveLength(0)
    // index 0 is the largest disk (bottom of the stack)
    expect(state.pegs[0][0].size).toBe(state.numDisks)
    expect(state.pegs[0][state.numDisks - 1].size).toBe(1)
    expect(state.minMoves).toBe(Math.pow(2, state.numDisks) - 1)
    expect(state.solved).toBe(false)
  })
})

describe('selectPeg', () => {
  it('selects a peg that has disks and ignores empty pegs', () => {
    const state = generateHanoi('easy')
    expect(selectPeg(state, 1)).toBe(state) // empty peg → no-op
    const selected = selectPeg(state, 0)
    expect(selected.selectedPeg).toBe(0)
  })

  it('deselects when clicking the same peg again', () => {
    const state = generateHanoi('easy')
    const selected = selectPeg(state, 0)
    expect(selectPeg(selected, 0).selectedPeg).toBeNull()
  })

  it('moves the top disk to an empty peg', () => {
    const state = selectPeg(generateHanoi('easy'), 0)
    const next = selectPeg(state, 1)
    expect(next.pegs[0]).toHaveLength(2)
    expect(next.pegs[1]).toHaveLength(1)
    expect(next.pegs[1][0].size).toBe(1)
    expect(next.moves).toBe(1)
  })

  it('blocks placing a larger disk on a smaller one', () => {
    let state = generateHanoi('easy')
    // Move the size-1 disk to peg 1, then the size-2 disk onto peg 1 is invalid.
    state = selectPeg(state, 0)
    state = selectPeg(state, 1) // 1 → peg 1
    state = selectPeg(state, 0)
    const next = selectPeg(state, 1) // try to put 2 onto 1 → invalid
    expect(next.pegs[1]).toHaveLength(1)
    expect(next.pegs[1][0].size).toBe(1)
    expect(next.moves).toBe(1)
  })

  it('detects the solved state once all disks reach the right peg', () => {
    // Solve a 3-disk puzzle in the minimal 7 moves.
    const moves: [number, number][] = [[0, 2], [0, 1], [2, 1], [0, 2], [1, 0], [1, 2], [0, 2]]
    let state = generateHanoi('easy')
    for (const [from, to] of moves) {
      state = selectPeg(state, from)
      state = selectPeg(state, to)
    }
    expect(isHanoiSolved(state)).toBe(true)
    expect(state.moves).toBe(7)
    expect(hanoiRating(state)).toBe('perfect')
  })
})

describe('hanoiRating', () => {
  it('rates near-optimal solves higher than sloppy ones', () => {
    const base = generateHanoi('easy')
    const perfect = { ...base, solved: true, moves: 7 }
    const good = { ...base, solved: true, moves: 10 }
    const fair = { ...base, solved: true, moves: 14 }
    expect(hanoiRating(perfect)).toBe('perfect')
    expect(hanoiRating(good)).toBe('good')
    expect(hanoiRating(fair)).toBe('fair')
    expect(hanoiRating({ ...base, solved: false })).toBe('practice')
  })
})

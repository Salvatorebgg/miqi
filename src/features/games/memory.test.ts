import { describe, expect, it } from 'vitest'
import { flipCard, generateMemoryGame, memoryGrids, memoryPairs, seededRandom, tickMemory } from './memory'

describe('generateMemoryGame', () => {
  it('builds the requested number of pairs and shuffles cards', () => {
    const state = generateMemoryGame('medium', seededRandom(42))
    expect(state.cards).toHaveLength(memoryPairs.medium * 2)
    expect(state.totalPairs).toBe(memoryPairs.medium)
    expect(state.moves).toBe(0)
    expect(state.gameOver).toBe(false)
  })

  it('is deterministic with a seeded rng', () => {
    const a = generateMemoryGame('medium', seededRandom(7))
    const b = generateMemoryGame('medium', seededRandom(7))
    expect(a.cards.map(c => c.content)).toEqual(b.cards.map(c => c.content))
  })

  it('exposes matching grid dimensions per difficulty', () => {
    const { cols, rows } = memoryGrids.easy
    expect(cols * rows).toBeGreaterThanOrEqual(memoryPairs.easy)
  })
})

describe('flipCard', () => {
  it('flips the first card of a turn', () => {
    const state = generateMemoryGame('easy', seededRandom(3))
    const target = state.cards[0]
    const next = flipCard(state, target.id)
    expect(next.cards.find(c => c.id === target.id)!.flipped).toBe(true)
    expect(next.firstSelection).toBe(target.id)
  })

  it('matches two cards of the same pair', () => {
    const state = generateMemoryGame('easy', seededRandom(3))
    const pairId = 0
    const [a, b] = state.cards.filter(c => c.pairId === pairId)
    const afterFirst = flipCard(state, a.id)
    const afterSecond = flipCard(afterFirst, b.id)
    expect(afterSecond.cards.filter(c => c.matched)).toHaveLength(2)
    expect(afterSecond.pairsFound).toBe(1)
    expect(afterSecond.moves).toBe(1)
  })

  it('flags a mismatch and flips both cards back once the lock expires', () => {
    const state = generateMemoryGame('easy', seededRandom(3))
    const a = state.cards.find(c => c.pairId === 0)!
    const b = state.cards.find(c => c.pairId === 1)!
    const afterFirst = flipCard(state, a.id)
    const afterSecond = flipCard(afterFirst, b.id)
    expect(afterSecond.moves).toBe(1)
    expect(afterSecond.lockUntil).toBeGreaterThan(0)
    // Simulate the reveal delay having passed.
    const expired = { ...afterSecond, lockUntil: 1 }
    const ticked = tickMemory(expired)
    expect(ticked.cards.every(c => !c.flipped || c.matched)).toBe(true)
    expect(ticked.lockUntil).toBe(0)
  })

  it('ends the game once all pairs are found', () => {
    let state = generateMemoryGame('easy', seededRandom(11))
    // Flip each pair twice until every pair is matched.
    for (let pair = 0; pair < state.totalPairs; pair++) {
      const [a, b] = state.cards.filter(c => c.pairId === pair)
      state = flipCard(state, a.id)
      state = flipCard(state, b.id)
    }
    expect(state.gameOver).toBe(true)
    expect(state.pairsFound).toBe(state.totalPairs)
  })
})

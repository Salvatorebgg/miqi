import { describe, expect, it } from 'vitest'
import { advanceSequence, advanceShowing, generateSimon, playerPress } from './simon'

describe('generateSimon', () => {
  it('starts empty and not showing', () => {
    const state = generateSimon()
    expect(state.sequence).toHaveLength(0)
    expect(state.currentRound).toBe(0)
    expect(state.isShowing).toBe(false)
    expect(state.gameOver).toBe(false)
  })
})

describe('advanceSequence', () => {
  it('appends a colour and enters the showing phase', () => {
    const next = advanceSequence(generateSimon())
    expect(next.sequence).toHaveLength(1)
    expect(next.currentRound).toBe(1)
    expect(next.isShowing).toBe(true)
    expect(next.playerIndex).toBe(0)
  })
})

describe('advanceShowing', () => {
  it('highlights each colour in order, then hands control to the player', () => {
    let state = advanceSequence(generateSimon())
    const length = state.sequence.length
    const highlights: number[] = []
    while (state.isShowing) {
      const { state: next, highlightedColor } = advanceShowing(state)
      if (highlightedColor >= 0) highlights.push(highlightedColor)
      state = next
    }
    expect(highlights).toHaveLength(length)
    expect(state.isShowing).toBe(false)
  })
})

describe('playerPress', () => {
  it('ends the game on a wrong colour', () => {
    let state = advanceSequence(generateSimon())
    // Complete the show phase first.
    while (state.isShowing) state = advanceShowing(state).state
    const wrong = (state.sequence[0] + 1) % 4
    const next = playerPress(state, wrong)
    expect(next.gameOver).toBe(true)
  })

  it('increments the score after repeating the full sequence', () => {
    let state = advanceSequence(generateSimon())
    while (state.isShowing) state = advanceShowing(state).state
    for (const colour of state.sequence) {
      state = playerPress(state, colour)
    }
    expect(state.score).toBe(1)
    expect(state.gameOver).toBe(false)
    expect(state.playerIndex).toBe(0)
  })

  it('wins the game after completing all max rounds', () => {
    let state = generateSimon(2)
    for (let round = 0; round < 2; round++) {
      state = advanceSequence(state)
      while (state.isShowing) state = advanceShowing(state).state
      for (const colour of state.sequence) {
        state = playerPress(state, colour)
      }
    }
    expect(state.won).toBe(true)
    expect(state.gameOver).toBe(true)
    expect(state.score).toBe(2)
  })
})

import { beforeEach, describe, expect, it, vi } from 'vitest'
import { installControlSounds, isMuted, playControlTone, setMuted } from './audio'

const createOscillator = vi.fn(() => ({
  type: 'sine',
  frequency: { value: 0 },
  connect: vi.fn().mockReturnThis(),
  start: vi.fn(),
  stop: vi.fn(),
}))
const createGain = vi.fn(() => ({
  gain: { setValueAtTime: vi.fn(), exponentialRampToValueAtTime: vi.fn() },
  connect: vi.fn().mockReturnThis(),
}))

class MockAudioContext {
  currentTime = 0
  destination = {}
  createOscillator = createOscillator
  createGain = createGain
}

describe('playControlTone', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.stubGlobal('AudioContext', MockAudioContext)
    localStorage.clear()
    setMuted(false)
    vi.stubGlobal('matchMedia', vi.fn(() => ({ matches: false })))
  })

  it('plays a quiet tone when unmuted', () => {
    playControlTone('tap')
    expect(createOscillator).toHaveBeenCalledTimes(1)
  })

  it('does not create an oscillator when muted', () => {
    setMuted(true)
    playControlTone('tap')
    expect(createOscillator).not.toHaveBeenCalled()
  })

  it('stays silent under reduced-motion preferences', () => {
    vi.stubGlobal('matchMedia', vi.fn(() => ({ matches: true })))
    playControlTone('tap')
    expect(createOscillator).not.toHaveBeenCalled()
  })

  it('uses distinct frequencies for success and error', () => {
    playControlTone('success')
    expect(createOscillator.mock.results[0].value.frequency.value).toBe(620)
    playControlTone('error')
    expect(createOscillator.mock.results[1].value.frequency.value).toBe(190)
  })

  it('reports the mute state', () => {
    expect(isMuted()).toBe(false)
    setMuted(true)
    expect(isMuted()).toBe(true)
  })
})

describe('installControlSounds', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.stubGlobal('AudioContext', MockAudioContext)
    setMuted(false)
    vi.stubGlobal('matchMedia', vi.fn(() => ({ matches: false })))
  })

  it('plays a tap tone when a button is clicked', () => {
    const root = document.createElement('div')
    const button = document.createElement('button')
    root.appendChild(button)
    const uninstall = installControlSounds(root)
    button.click()
    expect(createOscillator).toHaveBeenCalled()
    uninstall()
  })

  it('ignores clicks on plain content', () => {
    const root = document.createElement('div')
    const span = document.createElement('span')
    root.appendChild(span)
    installControlSounds(root)
    span.click()
    expect(createOscillator).not.toHaveBeenCalled()
  })
})

import { loadPreferences } from './preferences'

export type ControlTone = 'tap' | 'success' | 'error'

let audioContext: AudioContext | null = null
let muted = loadPreferences().muted

export function setMuted(value: boolean): void {
  muted = value
}

export function isMuted(): boolean {
  return muted
}

const context = (): AudioContext => {
  if (!audioContext) audioContext = new AudioContext()
  return audioContext
}

const prefersReducedMotion = (): boolean =>
  typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * A restrained synthesized chime for interface controls. Sound only ever
 * starts from a user interaction, stays very quiet, and respects both the
 * mute preference and reduced-motion settings.
 */
export function playControlTone(kind: ControlTone): void {
  if (muted || prefersReducedMotion()) return
  try {
    const ctx = context()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'sine'
    osc.frequency.value = kind === 'success' ? 620 : kind === 'error' ? 190 : 420
    gain.gain.setValueAtTime(0.025, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.08)
    osc.connect(gain).connect(ctx.destination)
    osc.start()
    osc.stop(ctx.currentTime + 0.08)
  } catch {
    // Audio is decorative; never let it break an interaction.
  }
}

/** Wires pleasant, quiet feedback to primary interface controls. */
export function installControlSounds(root: HTMLElement = document.body): () => void {
  const onClick = (event: MouseEvent) => {
    const target = (event.target as HTMLElement | null)?.closest('button, a')
    if (!target) return
    playControlTone('tap')
  }
  root.addEventListener('click', onClick)
  return () => root.removeEventListener('click', onClick)
}

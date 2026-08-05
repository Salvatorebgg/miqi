import { isMuted } from './audio'

export type Accent = 'en-GB' | 'en-US'

export const accentLabels: Record<Accent, string> = {
  'en-GB': '英音',
  'en-US': '美音',
}

let voices: SpeechSynthesisVoice[] = []
let voicesLoaded = false

/** The browser loads voices asynchronously; cache them once available. */
function loadVoices(): SpeechSynthesisVoice[] {
  if (typeof speechSynthesis === 'undefined') return []
  if (!voicesLoaded) {
    voices = speechSynthesis.getVoices()
    voicesLoaded = true
  }
  return voices
}

if (typeof speechSynthesis !== 'undefined') {
  const refresh = () => {
    voices = speechSynthesis.getVoices()
    voicesLoaded = true
  }
  speechSynthesis.onvoiceschanged = refresh
  refresh()
}

export function speechAvailable(): boolean {
  return typeof speechSynthesis !== 'undefined' && typeof SpeechSynthesisUtterance !== 'undefined'
}

function pickVoice(accent: Accent): SpeechSynthesisVoice | null {
  const matches = loadVoices().filter(voice => voice.lang.toLowerCase().startsWith(accent))
  if (matches.length === 0) return null
  return matches.find(voice => voice.localService) ?? matches[0]
}

/**
 * Speaks `text` aloud in the requested accent via the Web Speech API.
 * Silently no-ops when speech is unavailable, muted, or the browser throws —
 * pronunciation is decorative and must never break an interaction.
 */
export function speak(text: string, accent: Accent = 'en-GB'): void {
  if (!speechAvailable() || isMuted()) return
  try {
    cancelSpeech()
    const utterance = new SpeechSynthesisUtterance(text)
    const voice = pickVoice(accent)
    if (voice) {
      utterance.voice = voice
      utterance.lang = voice.lang
    } else {
      utterance.lang = accent
    }
    utterance.rate = 0.9
    utterance.pitch = 1
    speechSynthesis.speak(utterance)
  } catch {
    // Pronunciation is decorative; never break an interaction.
  }
}

/** Stops any utterance currently playing so new speech can start cleanly. */
export function cancelSpeech(): void {
  if (typeof speechSynthesis === 'undefined') return
  try {
    speechSynthesis.cancel()
  } catch {
    // ignore
  }
}

export interface Preferences {
  muted: boolean
  reduceMotion: boolean
  theme: 'mint' | 'dark'
}

const KEY = 'miqi:preferences'

const defaults: Preferences = { muted: false, reduceMotion: false, theme: 'mint' }

export function loadPreferences(storage: Storage = localStorage): Preferences {
  try {
    const raw = storage.getItem(KEY)
    if (!raw) return defaults
    return { ...defaults, ...(JSON.parse(raw) as Partial<Preferences>) }
  } catch {
    return defaults
  }
}

export function savePreferences(preferences: Preferences, storage: Storage = localStorage): void {
  storage.setItem(KEY, JSON.stringify(preferences))
  window.dispatchEvent(new CustomEvent<Preferences>('miqi:preferences', { detail: preferences }))
}

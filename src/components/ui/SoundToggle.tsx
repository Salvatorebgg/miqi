import { useEffect, useState } from 'react'
import { Volume2, VolumeX } from 'lucide-react'
import { setMuted } from '../../lib/audio'
import { loadPreferences, savePreferences } from '../../lib/preferences'

export function SoundToggle() {
  const [mutedState, setMutedState] = useState(() => loadPreferences().muted)

  useEffect(() => {
    const onPreferences = (event: Event) => {
      const detail = (event as CustomEvent<{ muted: boolean }>).detail
      setMutedState(detail.muted)
      setMuted(detail.muted)
    }
    window.addEventListener('miqi:preferences', onPreferences)
    return () => window.removeEventListener('miqi:preferences', onPreferences)
  }, [])

  const toggle = () => {
    const next = !mutedState
    setMutedState(next)
    setMuted(next)
    savePreferences({ ...loadPreferences(), muted: next })
  }

  return (
    <button
      type="button"
      className="sound-toggle"
      onClick={toggle}
      aria-pressed={!mutedState}
      aria-label={mutedState ? '开启按键音效' : '关闭按键音效'}
    >
      {mutedState ? <VolumeX aria-hidden="true" /> : <Volume2 aria-hidden="true" />}
    </button>
  )
}

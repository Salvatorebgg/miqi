import { useEffect, useRef, useState } from 'react'
import { Pause, Play, RotateCcw } from 'lucide-react'

type TimerState = 'idle' | 'running' | 'break'

const FOCUS_SECONDS = 25 * 60
const BREAK_SECONDS = 5 * 60

export function FocusTimer() {
  const [state, setState] = useState<TimerState>('idle')
  const [seconds, setSeconds] = useState(FOCUS_SECONDS)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const playChime = () => {
    try {
      const ctx = new AudioContext()
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.type = 'sine'
      osc.frequency.value = 880
      gain.gain.setValueAtTime(0.15, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35)
      osc.start(ctx.currentTime)
      osc.stop(ctx.currentTime + 0.35)
    } catch {
      /* audio unavailable */
    }
  }

  useEffect(() => {
    if (state === 'running' || state === 'break') {
      intervalRef.current = setInterval(() => {
        setSeconds(prev => {
          if (prev <= 1) {
            playChime()
            if (state === 'running') {
              setState('break')
              return BREAK_SECONDS
            } else {
              setState('idle')
              return FOCUS_SECONDS
            }
          }
          return prev - 1
        })
      }, 1000)
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [state])

  const start = () => setState('running')
  const pause = () => setState('idle')
  const reset = () => {
    setState('idle')
    setSeconds(FOCUS_SECONDS)
  }

  const total = state === 'break' ? BREAK_SECONDS : FOCUS_SECONDS
  const percent = Math.round(((total - seconds) / total) * 360)
  const minutes = Math.floor(seconds / 60)
  const secs = seconds % 60
  const timeLabel = `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`

  const label = state === 'break' ? '休息时间' : state === 'running' ? '专注中' : '准备开始'

  return (
    <div className="focus-timer">
      <div
        className="progress-ring large"
        role="img"
        aria-label={`计时器 ${timeLabel}`}
        style={{ '--percent': `${percent}deg` } as React.CSSProperties}
      >
        <span>{timeLabel}</span>
      </div>
      <p className="focus-label">{label}</p>
      <div className="focus-actions">
        {state === 'running' || state === 'break' ? (
          <button type="button" className="ghost-button" onClick={pause}>
            <Pause aria-hidden="true" /> 暂停
          </button>
        ) : (
          <button type="button" className="primary-button" onClick={start}>
            <Play aria-hidden="true" /> 开始
          </button>
        )}
        <button type="button" className="ghost-button" onClick={reset}>
          <RotateCcw aria-hidden="true" /> 重置
        </button>
      </div>
    </div>
  )
}

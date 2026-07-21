import { useEffect, useRef, useState } from 'react'

export interface MathGraphProps {
  /** Math formula as a JS expression in x, e.g. "x*x" or "Math.sin(x)" */
  formula: string
  xMin?: number
  xMax?: number
  yMin?: number
  yMax?: number
  width?: number
  height?: number
  title?: string
  annotations?: { x: number; label: string }[]
  showControls?: boolean
}

function evaluateFormula(formula: string, x: number): number {
  try {
    // eslint-disable-next-line no-new-func
    const fn = new Function('x', `with (Math) { return (${formula}); }`)
    const value = fn(x)
    return typeof value === 'number' && !Number.isNaN(value) ? value : NaN
  } catch {
    return NaN
  }
}

export function MathGraph({
  formula,
  xMin = -5,
  xMax = 5,
  yMin = -5,
  yMax = 5,
  width = 640,
  height = 300,
  title,
  annotations = [],
  showControls = true,
}: MathGraphProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [a, setA] = useState(1)
  const [b, setB] = useState(0)
  const [zoom, setZoom] = useState(1)
  const [input, setInput] = useState(formula)
  const [hover, setHover] = useState<{ x: number; y: number } | null>(null)

  const preparedFormula = input
    .replace(/\ba\b/g, a.toString())
    .replace(/\bb\b/g, b.toString())

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1
    canvas.width = Math.floor(width * dpr)
    canvas.height = Math.floor(height * dpr)
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

    ctx.clearRect(0, 0, width, height)
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, width, height)

    const padding = { top: 24, right: 24, bottom: 32, left: 40 }
    const graphWidth = width - padding.left - padding.right
    const graphHeight = height - padding.top - padding.bottom

    const scaleX = graphWidth / (xMax - xMin) / zoom
    const scaleY = graphHeight / (yMax - yMin) / zoom
    const centerX = padding.left + (-xMin * zoom * scaleX)
    const centerY = padding.top + (yMax * zoom * scaleY)

    const toCanvasX = (x: number) => centerX + x * zoom * scaleX
    const toCanvasY = (y: number) => centerY - y * zoom * scaleY

    // Grid
    ctx.strokeStyle = 'rgba(232,135,155,0.15)'
    ctx.lineWidth = 1
    const gridX = [0, 1, -1, 2, -2, 3, -3, 4, -4, 5, -5, 10, -10].filter(
      x => x >= xMin && x <= xMax,
    )
    const gridY = [0, 1, -1, 2, -2, 3, -3, 4, -4, 5, -5, 10, -10].filter(
      y => y >= yMin && y <= yMax,
    )

    gridX.forEach(x => {
      ctx.beginPath()
      ctx.moveTo(toCanvasX(x), padding.top)
      ctx.lineTo(toCanvasX(x), height - padding.bottom)
      ctx.stroke()
    })
    gridY.forEach(y => {
      ctx.beginPath()
      ctx.moveTo(padding.left, toCanvasY(y))
      ctx.lineTo(width - padding.right, toCanvasY(y))
      ctx.stroke()
    })

    // Axes
    ctx.strokeStyle = 'rgba(61,31,42,0.5)'
    ctx.lineWidth = 1.5
    ctx.beginPath()
    ctx.moveTo(padding.left, toCanvasY(0))
    ctx.lineTo(width - padding.right, toCanvasY(0))
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(toCanvasX(0), padding.top)
    ctx.lineTo(toCanvasX(0), height - padding.bottom)
    ctx.stroke()

    // Function plot
    ctx.strokeStyle = '#e8879b'
    ctx.lineWidth = 2.5
    ctx.beginPath()
    let started = false
    for (let px = 0; px <= graphWidth; px += 1) {
      const x = xMin + (px / graphWidth) * (xMax - xMin)
      const y = evaluateFormula(preparedFormula, x)
      if (!Number.isFinite(y) || y < yMin || y > yMax) {
        started = false
        continue
      }
      const cx = toCanvasX(x)
      const cy = toCanvasY(y)
      if (!started) {
        ctx.moveTo(cx, cy)
        started = true
      } else {
        ctx.lineTo(cx, cy)
      }
    }
    ctx.stroke()

    // Annotations
    annotations.forEach(point => {
      const y = evaluateFormula(preparedFormula, point.x)
      if (Number.isFinite(y)) {
        const cx = toCanvasX(point.x)
        const cy = toCanvasY(y)
        ctx.fillStyle = '#8c3a50'
        ctx.beginPath()
        ctx.arc(cx, cy, 4, 0, Math.PI * 2)
        ctx.fill()
        ctx.fillStyle = '#8c3a50'
        ctx.font = '12px sans-serif'
        ctx.fillText(point.label, cx + 6, cy - 6)
      }
    })

    // Hover point
    if (hover) {
      const y = evaluateFormula(preparedFormula, hover.x)
      if (Number.isFinite(y)) {
        const cx = toCanvasX(hover.x)
        const cy = toCanvasY(y)
        ctx.fillStyle = '#d66e84'
        ctx.beginPath()
        ctx.arc(cx, cy, 4, 0, Math.PI * 2)
        ctx.fill()
        ctx.fillStyle = '#8c3a50'
        ctx.font = '12px sans-serif'
        ctx.fillText(`(${hover.x.toFixed(2)}, ${y.toFixed(2)})`, cx + 6, cy - 6)
      }
    }

    // Labels
    ctx.fillStyle = '#8a6972'
    ctx.font = '10px sans-serif'
    ctx.textAlign = 'center'
    gridX.filter(x => x !== 0).forEach(x => {
      ctx.fillText(x.toString(), toCanvasX(x), height - padding.bottom + 14)
    })
    ctx.textAlign = 'right'
    gridY.filter(y => y !== 0).forEach(y => {
      ctx.fillText(y.toString(), padding.left - 6, toCanvasY(y) + 3)
    })
    ctx.fillText('O', padding.left - 6, toCanvasY(0) + 12)
  }, [preparedFormula, xMin, xMax, yMin, yMax, width, height, zoom, hover, annotations])

  const handleMouseMove: React.MouseEventHandler<HTMLCanvasElement> = event => {
    const canvas = canvasRef.current
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    const x =
      xMin +
      ((event.clientX - rect.left - 40) / (width - 64)) * (xMax - xMin) * zoom
    if (x >= xMin && x <= xMax) setHover({ x, y: 0 })
  }

  const handleMouseLeave = () => setHover(null)

  return (
    <div className="graph-container">
      {title ? <h4 style={{ margin: '0 0 0.5rem', color: 'var(--rose)' }}>{title}</h4> : null}
      <canvas
        ref={canvasRef}
        className="graph-canvas"
        style={{ width: '100%', height }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      />
      {showControls ? (
        <div className="graph-controls">
          <label>
            公式:
            <input
              type="text"
              value={input}
              onChange={event => setInput(event.target.value)}
              style={{ minWidth: '12rem' }}
            />
          </label>
          <label>
            a:
            <input
              type="range"
              min="-5"
              max="5"
              step="0.1"
              value={a}
              onChange={event => setA(Number(event.target.value))}
            />
            <span>{a.toFixed(1)}</span>
          </label>
          <label>
            b:
            <input
              type="range"
              min="-5"
              max="5"
              step="0.1"
              value={b}
              onChange={event => setB(Number(event.target.value))}
            />
            <span>{b.toFixed(1)}</span>
          </label>
          <label>
            缩放:
            <input
              type="range"
              min="0.5"
              max="3"
              step="0.1"
              value={zoom}
              onChange={event => setZoom(Number(event.target.value))}
            />
            <span>{zoom.toFixed(1)}</span>
          </label>
        </div>
      ) : null}
      {hover ? (
        <p className="graph-info">
          鼠标位置: x ≈ {hover.x.toFixed(2)}, y ≈{' '}
          {evaluateFormula(preparedFormula, hover.x).toFixed(2)}
        </p>
      ) : (
        <p className="graph-info">把鼠标移到图上查看坐标</p>
      )}
    </div>
  )
}

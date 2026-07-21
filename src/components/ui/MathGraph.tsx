import { useEffect, useRef, useState } from 'react'

export interface MathGraphProps {
  formula: string
  xMin?: number
  xMax?: number
  yMin?: number
  yMax?: number
  width?: number
  height?: number
  title?: string
  annotations?: { x: number; label: string; color?: string }[]
  showControls?: boolean
  fillArea?: boolean
  derivatives?: { x: number }[]
}

function evaluateFormula(formula: string, x: number): number {
  try {
    const fn = new Function('x', `with (Math) { return (${formula}); }`)
    const value = fn(x)
    return typeof value === 'number' && !Number.isNaN(value) ? value : NaN
  } catch {
    return NaN
  }
}

function samplePoints(
  formula: string,
  xMin: number,
  xMax: number,
  yMin: number,
  yMax: number,
  count: number,
): { x: number; y: number }[] {
  const points: { x: number; y: number }[] = []
  for (let i = 0; i < count; i++) {
    const x = xMin + (i / (count - 1)) * (xMax - xMin)
    const y = evaluateFormula(formula, x)
    if (Number.isFinite(y)) {
      points.push({ x, y: Math.max(yMin, Math.min(yMax, y)) })
    }
  }
  return points
}

export function MathGraph({
  formula,
  xMin = -5,
  xMax = 5,
  yMin = -5,
  yMax = 5,
  width = 640,
  height = 340,
  title,
  annotations = [],
  showControls = true,
  fillArea = true,
  derivatives = [],
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

    // Background with subtle grid-paper texture
    ctx.fillStyle = '#fafff9'
    ctx.fillRect(0, 0, width, height)

    // Dot grid background
    ctx.fillStyle = 'rgba(88,201,157,0.08)'
    for (let gx = 0; gx < width; gx += 20) {
      for (let gy = 0; gy < height; gy += 20) {
        ctx.beginPath()
        ctx.arc(gx, gy, 1, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const padding = { top: 30, right: 28, bottom: 36, left: 44 }
    const graphWidth = width - padding.left - padding.right
    const graphHeight = height - padding.top - padding.bottom

    const scaleX = graphWidth / (xMax - xMin) / zoom
    const scaleY = graphHeight / (yMax - yMin) / zoom
    const centerX = padding.left + (-xMin * zoom * scaleX)
    const centerY = padding.top + (yMax * zoom * scaleY)

    const toCanvasX = (x: number) => centerX + x * zoom * scaleX
    const toCanvasY = (y: number) => centerY - y * zoom * scaleY

    // Clip to graph area
    ctx.save()
    ctx.beginPath()
    ctx.rect(padding.left, padding.top, graphWidth, graphHeight)
    ctx.clip()

    // Grid lines
    const gridX = [0, 1, -1, 2, -2, 3, -3, 4, -4, 5, -5]
    const gridY = [0, 1, -1, 2, -2, 3, -3, 4, -4, 5, -5]

    ctx.strokeStyle = 'rgba(88,201,157,0.12)'
    ctx.lineWidth = 1
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

    // Area fill under curve (beautiful gradient)
    if (fillArea) {
      const allPoints = samplePoints(preparedFormula, xMin, xMax, yMin - 1, yMax + 1, 600)
      if (allPoints.length > 1) {
        const gradient = ctx.createLinearGradient(0, padding.top, 0, height - padding.bottom)
        gradient.addColorStop(0, 'rgba(88,201,157,0.28)')
        gradient.addColorStop(0.5, 'rgba(88,201,157,0.10)')
        gradient.addColorStop(1, 'rgba(88,201,157,0.02)')
        ctx.fillStyle = gradient

        ctx.beginPath()
        const firstX = allPoints[0].x
        ctx.moveTo(toCanvasX(firstX), toCanvasY(0))
        for (const p of allPoints) {
          ctx.lineTo(toCanvasX(p.x), toCanvasY(p.y))
        }
        const lastX = allPoints[allPoints.length - 1].x
        ctx.lineTo(toCanvasX(lastX), toCanvasY(0))
        ctx.closePath()
        ctx.fill()
      }
    }

    // Derivative tangent lines
    derivatives.forEach(({ x: px }) => {
      const y0 = evaluateFormula(preparedFormula, px)
      if (!Number.isFinite(y0)) return
      const h = 0.0001
      const slope = (evaluateFormula(preparedFormula, px + h) - evaluateFormula(preparedFormula, px - h)) / (2 * h)
      if (!Number.isFinite(slope)) return

      const x1 = px - 1.5
      const x2 = px + 1.5
      const y1 = y0 + slope * (x1 - px)
      const y2 = y0 + slope * (x2 - px)

      ctx.strokeStyle = 'rgba(230,160,80,0.6)'
      ctx.lineWidth = 1.5
      ctx.setLineDash([5, 4])
      ctx.beginPath()
      ctx.moveTo(toCanvasX(x1), toCanvasY(y1))
      ctx.lineTo(toCanvasX(x2), toCanvasY(y2))
      ctx.stroke()
      ctx.setLineDash([])
    })

    ctx.restore()

    // Axes (drawn over the clip region)
    ctx.strokeStyle = 'rgba(23,63,49,0.42)'
    ctx.lineWidth = 1.5
    ctx.beginPath()
    ctx.moveTo(padding.left, toCanvasY(0))
    ctx.lineTo(width - padding.right, toCanvasY(0))
    ctx.stroke()
    // Axis arrow heads
    ctx.beginPath()
    ctx.moveTo(width - padding.right, toCanvasY(0))
    ctx.lineTo(width - padding.right - 8, toCanvasY(0) - 4)
    ctx.lineTo(width - padding.right - 8, toCanvasY(0) + 4)
    ctx.fillStyle = 'rgba(23,63,49,0.42)'
    ctx.fill()

    ctx.beginPath()
    ctx.moveTo(toCanvasX(0), padding.top)
    ctx.lineTo(toCanvasX(0), height - padding.bottom)
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(toCanvasX(0), padding.top)
    ctx.lineTo(toCanvasX(0) - 4, padding.top + 8)
    ctx.lineTo(toCanvasX(0) + 4, padding.top + 8)
    ctx.fill()

    // Function curve with glow
    const allPoints = samplePoints(preparedFormula, xMin, xMax, yMin, yMax, 800)
    if (allPoints.length > 1) {
      // Glow layer
      ctx.strokeStyle = 'rgba(88,201,157,0.35)'
      ctx.lineWidth = 6
      ctx.beginPath()
      let started = false
      for (const p of allPoints) {
        const cx = toCanvasX(p.x)
        const cy = toCanvasY(p.y)
        if (!started) { ctx.moveTo(cx, cy); started = true }
        else ctx.lineTo(cx, cy)
      }
      ctx.stroke()

      // Main curve
      ctx.strokeStyle = '#3fae85'
      ctx.lineWidth = 2.8
      ctx.beginPath()
      started = false
      for (const p of allPoints) {
        const cx = toCanvasX(p.x)
        const cy = toCanvasY(p.y)
        if (!started) { ctx.moveTo(cx, cy); started = true }
        else ctx.lineTo(cx, cy)
      }
      ctx.stroke()
    }

    // Annotations with pulsing dots
    annotations.forEach(point => {
      const y = evaluateFormula(preparedFormula, point.x)
      if (!Number.isFinite(y)) return
      const cx = toCanvasX(point.x)
      const cy = toCanvasY(y)

      // Pulse ring
      ctx.strokeStyle = point.color || 'rgba(63,174,133,0.35)'
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.arc(cx, cy, 9, 0, Math.PI * 2)
      ctx.stroke()

      // Solid dot
      ctx.fillStyle = point.color || '#315949'
      ctx.beginPath()
      ctx.arc(cx, cy, 4.5, 0, Math.PI * 2)
      ctx.fill()

      // Label with background
      ctx.font = 'bold 11px -apple-system, sans-serif'
      const textWidth = ctx.measureText(point.label).width
      ctx.fillStyle = 'rgba(255,255,255,0.85)'
      ctx.fillRect(cx + 8, cy - 22, textWidth + 10, 18)
      ctx.fillStyle = '#173f31'
      ctx.fillText(point.label, cx + 13, cy - 8)
    })

    // Hover crosshair
    if (hover) {
      const y = evaluateFormula(preparedFormula, hover.x)
      if (Number.isFinite(y)) {
        const cx = toCanvasX(hover.x)
        const cy = toCanvasY(y)

        ctx.strokeStyle = 'rgba(63,174,133,0.35)'
        ctx.lineWidth = 1
        ctx.setLineDash([3, 4])
        ctx.beginPath()
        ctx.moveTo(cx, padding.top)
        ctx.lineTo(cx, height - padding.bottom)
        ctx.stroke()
        ctx.beginPath()
        ctx.moveTo(padding.left, cy)
        ctx.lineTo(width - padding.right, cy)
        ctx.stroke()
        ctx.setLineDash([])

        ctx.fillStyle = '#3fae85'
        ctx.beginPath()
        ctx.arc(cx, cy, 3.5, 0, Math.PI * 2)
        ctx.fill()

        // Tooltip
        const tooltip = `(${hover.x.toFixed(2)}, ${y.toFixed(2)})`
        ctx.font = 'bold 11px -apple-system, sans-serif'
        const tw = ctx.measureText(tooltip).width
        const tooltipX = Math.min(cx + 10, width - tw - 20)
        ctx.fillStyle = 'rgba(23,63,49,0.88)'
        ctx.beginPath()
        ctx.roundRect(tooltipX, cy - 30, tw + 14, 22, 6)
        ctx.fill()
        ctx.fillStyle = '#ffffff'
        ctx.fillText(tooltip, tooltipX + 7, cy - 14)
      }
    }

    // Axis labels
    ctx.fillStyle = '#648075'
    ctx.font = '10px -apple-system, sans-serif'
    ctx.textAlign = 'center'
    gridX.filter(x => x !== 0).forEach(x => {
      ctx.fillText(String(x), toCanvasX(x), height - padding.bottom + 15)
    })
    ctx.textAlign = 'right'
    gridY.filter(y => y !== 0).forEach(y => {
      ctx.fillText(String(y), padding.left - 7, toCanvasY(y) + 3)
    })
    ctx.fillText('O', padding.left - 7, toCanvasY(0) + 13)
    ctx.fillText('x', width - padding.right + 9, toCanvasY(0) + 4)
    ctx.fillText('y', toCanvasX(0) + 10, padding.top - 5)
  }, [preparedFormula, xMin, xMax, yMin, yMax, width, height, zoom, hover, annotations, fillArea, derivatives])

  const handleMouseMove: React.MouseEventHandler<HTMLCanvasElement> = event => {
    const canvas = canvasRef.current
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    const padding = 44
    const graphWidth = width - padding - 28
    const x = xMin + ((event.clientX - rect.left - padding) / graphWidth) * (xMax - xMin) * zoom
    if (x >= xMin && x <= xMax) setHover({ x, y: 0 })
  }

  const handleMouseLeave = () => setHover(null)

  return (
    <div className="graph-container">
      {title ? <h4 style={{ margin: '0 0 0.5rem', color: 'var(--forest)', fontSize: '0.9rem', fontWeight: 700 }}>{title}</h4> : null}
      <canvas
        ref={canvasRef}
        className="graph-canvas"
        style={{ width: '100%', height, borderRadius: '0.8rem', border: '1px solid var(--glass-border)' }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      />
      {showControls ? (
        <div className="graph-controls">
          <label>
            f(x)=
            <input type="text" value={input} onChange={e => setInput(e.target.value)} style={{ minWidth: '10rem' }} />
          </label>
          <label>
            a
            <input type="range" min="-5" max="5" step=".1" value={a} onChange={e => setA(+e.target.value)} />
            <span>{a.toFixed(1)}</span>
          </label>
          <label>
            b
            <input type="range" min="-5" max="5" step=".1" value={b} onChange={e => setB(+e.target.value)} />
            <span>{b.toFixed(1)}</span>
          </label>
          <label>
            zoom
            <input type="range" min=".5" max="3" step=".1" value={zoom} onChange={e => setZoom(+e.target.value)} />
            <span>{zoom.toFixed(1)}</span>
          </label>
        </div>
      ) : null}
      {hover ? (
        <p className="graph-info">x ≈ {hover.x.toFixed(2)}, y = {evaluateFormula(preparedFormula, hover.x).toFixed(2)}</p>
      ) : (
        <p className="graph-info">鼠标悬停查看坐标 · 拖动滑块变换函数</p>
      )}
    </div>
  )
}

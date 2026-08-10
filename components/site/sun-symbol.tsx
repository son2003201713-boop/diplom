import { cn } from "@/lib/utils"

type SunSymbolProps = {
  className?: string
  /** 0..1 — how "present" the sun is. 1 = full, 0 = faded/gone */
  strength?: number
  rays?: number
  strokeWidth?: number
  spin?: boolean
}

// Abstract sun / keskĕ rosette inspired by Chuvash geometric embroidery.
// Built programmatically from an 8/16-point stepped star inside a toothed
// diamond frame — deliberately geometric, not a realistic yellow sun.
export function SunSymbol({
  className,
  strength = 1,
  rays = 16,
  strokeWidth = 2,
  spin = false,
}: SunSymbolProps) {
  const size = 200
  const c = size / 2
  const outer = 92
  const mid = 66
  const inner = 40
  const core = 20

  const rayLines: { x1: number; y1: number; x2: number; y2: number; long: boolean }[] = []
  for (let i = 0; i < rays; i++) {
    const a = (i / rays) * Math.PI * 2 - Math.PI / 2
    const long = i % 2 === 0
    const r1 = mid
    const r2 = long ? outer : mid + 10
    rayLines.push({
      x1: c + Math.cos(a) * r1,
      y1: c + Math.sin(a) * r1,
      x2: c + Math.cos(a) * r2,
      y2: c + Math.sin(a) * r2,
      long,
    })
  }

  // 8-point star polygon
  const starPts: string[] = []
  const starPoints = 8
  for (let i = 0; i < starPoints * 2; i++) {
    const a = (i / (starPoints * 2)) * Math.PI * 2 - Math.PI / 2
    const r = i % 2 === 0 ? inner : inner * 0.42
    starPts.push(`${c + Math.cos(a) * r},${c + Math.sin(a) * r}`)
  }

  // Toothed diamond frame
  const diamond = `M ${c} ${c - outer - 2} L ${c + outer + 2} ${c} L ${c} ${c + outer + 2} L ${c - outer - 2} ${c} Z`

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      className={cn(spin && "animate-slow-spin", className)}
      role="img"
      aria-label="Символ солнца в чувашском геометрическом орнаменте"
      style={{ opacity: 0.25 + strength * 0.75 }}
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="square"
        strokeLinejoin="miter"
      >
        <path d={diamond} strokeWidth={strokeWidth * 0.75} opacity={0.55} />
        <circle cx={c} cy={c} r={outer} opacity={0.9} />
        <circle cx={c} cy={c} r={mid} strokeWidth={strokeWidth * 0.85} opacity={0.7} />
        {rayLines.map((r, i) => (
          <line
            key={i}
            x1={r.x1}
            y1={r.y1}
            x2={r.x2}
            y2={r.y2}
            strokeWidth={r.long ? strokeWidth : strokeWidth * 0.7}
          />
        ))}
        <polygon points={starPts.join(" ")} fill="currentColor" fillOpacity={0.12} />
        <polygon points={starPts.join(" ")} strokeWidth={strokeWidth * 0.9} />
        <circle cx={c} cy={c} r={core} />
        <circle cx={c} cy={c} r={core * 0.4} fill="currentColor" fillOpacity={0.9} stroke="none" />
      </g>
    </svg>
  )
}

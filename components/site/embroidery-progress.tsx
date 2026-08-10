import { FUNDRAISING } from "@/lib/content"

// A custom fundraising visual inspired by Chuvash embroidery.
// As money is raised, the red geometric ornament is gradually "stitched" in.
// Stitches beyond the raised ratio are shown as faint guide holes.
export function EmbroideryProgress() {
  const ratio = Math.max(0, Math.min(1, FUNDRAISING.raised / FUNDRAISING.goal))

  const cols = 24
  const rows = 6
  const total = cols * rows

  // Build a symmetric geometric motif mask so filled stitches form ornament,
  // filling column-by-column from the outside in as ratio grows.
  const cells: { x: number; y: number; on: boolean }[] = []
  let order = 0
  for (let c = 0; c < cols; c++) {
    for (let r = 0; r < rows; r++) {
      // motif: diagonal diamonds / zigzag typical of the band ornament
      const inMotif =
        (c + r) % 4 === 0 ||
        (c - r + rows) % 4 === 0 ||
        r === 0 ||
        r === rows - 1
      cells.push({ x: c, y: r, on: inMotif })
      order++
    }
  }

  const filledCount = Math.round(ratio * total)

  const unit = 20
  const w = cols * unit
  const h = rows * unit

  return (
    <div className="w-full overflow-hidden rounded-sm border border-border bg-card p-4 sm:p-6">
      <svg
        viewBox={`0 0 ${w} ${h}`}
        className="w-full"
        role="img"
        aria-label={`Собрано ${FUNDRAISING.raised.toLocaleString("ru-RU")} из ${FUNDRAISING.goal.toLocaleString("ru-RU")} рублей`}
      >
        {cells.map((cell, i) => {
          const cx = cell.x * unit + unit / 2
          const cy = cell.y * unit + unit / 2
          const filled = i < filledCount && cell.on
          if (cell.on) {
            // cross-stitch mark
            const s = 5
            return (
              <g
                key={i}
                stroke={filled ? "var(--thread)" : "var(--border)"}
                strokeWidth={filled ? 2.4 : 1}
                strokeLinecap="round"
                opacity={filled ? 1 : 0.5}
              >
                <line x1={cx - s} y1={cy - s} x2={cx + s} y2={cy + s} />
                <line x1={cx - s} y1={cy + s} x2={cx + s} y2={cy - s} />
              </g>
            )
          }
          return <circle key={i} cx={cx} cy={cy} r={0.8} fill="var(--border)" opacity={0.4} />
        })}
      </svg>
    </div>
  )
}

import { FUNDRAISING } from "@/lib/content"

export function EmbroideryProgress({
  raised = FUNDRAISING.raised,
  partnerSupport = 80906,
  originalBudget = 450000,
}: {
  raised?: number
  partnerSupport?: number
  originalBudget?: number
}) {
  const cols = 24
  const rows = 6

  const cells: {
    x: number
    y: number
    on: boolean
  }[] = []

  for (let c = 0; c < cols; c++) {
    for (let r = 0; r < rows; r++) {
      const inMotif =
        (c + r) % 4 === 0 ||
        (c - r + rows) % 4 === 0 ||
        r === 0 ||
        r === rows - 1

      cells.push({
        x: c,
        y: r,
        on: inMotif,
      })
    }
  }

  // Берём только настоящие крестики орнамента
  const motifCells = cells.filter((cell) => cell.on)
  const motifCount = motifCells.length

  // Красные крестики идут СЛЕВА
  const raisedCount = Math.round(
    (raised / originalBudget) * motifCount,
  )

  // Тёмные крестики идут СПРАВА
  const partnerCount = Math.round(
    (partnerSupport / originalBudget) * motifCount,
  )

  // Определяем порядковый номер каждого крестика
  // слева направо
  const motifIndex = new Map<string, number>()

  motifCells
    .sort((a, b) => {
      if (a.x !== b.x) return a.x - b.x
      return a.y - b.y
    })
    .forEach((cell, index) => {
      motifIndex.set(`${cell.x}-${cell.y}`, index)
    })

  const unit = 20
  const w = cols * unit
  const h = rows * unit

  return (
    <div className="w-full overflow-hidden rounded-sm border border-border bg-card p-4 sm:p-6">
      <svg
        viewBox={`0 0 ${w} ${h}`}
        className="w-full"
        role="img"
        aria-label={`Собрано ${raised.toLocaleString(
          "ru-RU",
        )} рублей. Помощь друзей и партнёров — ${partnerSupport.toLocaleString(
          "ru-RU",
        )} рублей.`}
      >
        {cells.map((cell, i) => {
          const cx = cell.x * unit + unit / 2
          const cy = cell.y * unit + unit / 2

          if (cell.on) {
            const s = 5

            const index =
              motifIndex.get(`${cell.x}-${cell.y}`) ?? 0

            // Красный движется слева направо →
            const raisedFilled =
              index < raisedCount

            // Тёмный движется справа налево ←
            const partnerFilled =
              index >= motifCount - partnerCount

            let stroke = "var(--border)"
            let strokeWidth = 1
            let opacity = 0.5

            if (partnerFilled) {
              stroke = "var(--ink)"
              strokeWidth = 2.3
              opacity = 0.5
            }

            if (raisedFilled) {
              stroke = "var(--thread)"
              strokeWidth = 2.4
              opacity = 1
            }

            return (
              <g
                key={i}
                stroke={stroke}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                opacity={opacity}
              >
                <line
                  x1={cx - s}
                  y1={cy - s}
                  x2={cx + s}
                  y2={cy + s}
                />

                <line
                  x1={cx - s}
                  y1={cy + s}
                  x2={cx + s}
                  y2={cy - s}
                />
              </g>
            )
          }

          return (
            <circle
              key={i}
              cx={cx}
              cy={cy}
              r={0.8}
              fill="var(--border)"
              opacity={0.4}
            />
          )
        })}
      </svg>
    </div>
  )
}
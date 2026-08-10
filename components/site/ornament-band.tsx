import { cn } from "@/lib/utils"

// A woven horizontal band of Chuvash-inspired geometric ornament.
export function OrnamentBand({
  className,
  tone = "thread",
}: {
  className?: string
  tone?: "thread" | "gold" | "ink"
}) {
  const color =
    tone === "gold"
      ? "var(--gold)"
      : tone === "ink"
        ? "var(--ink)"
        : "var(--thread)"

  return (
    <div
      className={cn("mx-auto h-6 w-full", className)}
      style={{ color }}
      aria-hidden="true"
      role="presentation"
    >
      <svg
        className="block h-full w-full"
        viewBox="0 0 240 24"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <pattern
            id="chuvash-band"
            x="0"
            y="0"
            width="48"
            height="24"
            patternUnits="userSpaceOnUse"
          >
            <g
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
            >
              <path
                d="M0 12 L48 12"
                strokeWidth="0.9"
                opacity="0.5"
              />

              <path d="M4 12 L12 4 L20 12 L12 20 Z" />

              <path
                d="M12 12 L12 4 M12 12 L12 20 M4 12 L20 12"
                strokeWidth="0.9"
              />

              <path d="M28 12 L36 4 L44 12 L36 20 Z" />

              <path
                d="M36 12 L36 4 M36 12 L36 20 M28 12 L44 12"
                strokeWidth="0.9"
              />

              <path d="M20 12 L28 12" />

              <circle
                cx="12"
                cy="12"
                r="1.6"
                fill="currentColor"
                stroke="none"
              />

              <circle
                cx="36"
                cy="12"
                r="1.6"
                fill="currentColor"
                stroke="none"
              />
            </g>
          </pattern>
        </defs>

        <rect
          x="0"
          y="0"
          width="240"
          height="24"
          fill="url(#chuvash-band)"
        />
      </svg>
    </div>
  )
}
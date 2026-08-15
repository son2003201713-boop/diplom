import { cn } from "@/lib/utils"

export function SunSymbol({
  className,
  strength = 1,
  spin = false,
}: {
  className?: string
  strength?: number
  spin?: boolean
}) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={cn(
        spin && "animate-[spin_65s_linear_infinite]",
        className,
      )}
      aria-hidden="true"
      style={{ opacity: strength }}
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Центральная восьмиконечная звезда */}
        <path
          fill="currentColor"
          stroke="none"
          d="
            M100 42
            L114 72
            L145 55
            L128 86
            L162 100
            L128 114
            L145 145
            L114 128
            L100 162
            L86 128
            L55 145
            L72 114
            L38 100
            L72 86
            L55 55
            L86 72
            Z
          "
        />

        {/* Белые линии внутри звезды */}
        <g stroke="var(--linen)" strokeWidth="3">
          <path d="M100 58 L100 86" />
          <path d="M100 114 L100 142" />

          <path d="M58 100 L86 100" />
          <path d="M114 100 L142 100" />

          <path d="M70 70 L89 89" />
          <path d="M111 111 L130 130" />

          <path d="M130 70 L111 89" />
          <path d="M89 111 L70 130" />
        </g>

        {/* Центральный крест */}
        <g stroke="var(--linen)" strokeWidth="3">
          <path d="M100 91 L100 109" />
          <path d="M91 100 L109 100" />
        </g>

        {/* Верхняя спираль */}
        <path
          d="
            M100 34
            L116 18
            L134 36
            L118 52
            L106 40
            L116 30
            L124 38
          "
        />

        {/* Правая спираль */}
        <path
          d="
            M166 100
            L182 116
            L164 134
            L148 118
            L160 106
            L170 116
            L162 124
          "
        />

        {/* Нижняя спираль */}
        <path
          d="
            M100 166
            L84 182
            L66 164
            L82 148
            L94 160
            L84 170
            L76 162
          "
        />

        {/* Левая спираль */}
        <path
          d="
            M34 100
            L18 84
            L36 66
            L52 82
            L40 94
            L30 84
            L38 76
          "
        />

        {/* Маленькие декоративные штрихи */}
        <g strokeWidth="3">
          <path d="M82 42 L88 48" />
          <path d="M118 42 L112 48" />

          <path d="M158 82 L152 88" />
          <path d="M158 118 L152 112" />

          <path d="M118 158 L112 152" />
          <path d="M82 158 L88 152" />

          <path d="M42 118 L48 112" />
          <path d="M42 82 L48 88" />
        </g>
      </g>
    </svg>
  )
}
import { cn } from "@/lib/utils"

/**
 * The display serif (Playfair) has no ₽ glyph, so it renders as tofu.
 * Render the ruble sign in the sans font, which supports it, while keeping
 * surrounding numerals in whatever font the parent uses.
 */
export function Ruble({ className }: { className?: string }) {
  return (
    <span className={cn("font-sans", className)} aria-label="рублей">
      ₽
    </span>
  )
}

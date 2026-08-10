import { OrnamentBand } from "./ornament-band"

export function Footer() {
  return (
    <footer className="bg-ink text-linen">
      <OrnamentBand tone="gold" className="opacity-60" />
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-5 py-12 text-center">
        <p className="font-serif text-2xl tracking-tight">ТРИ СОЛНЦА</p>
        <p className="text-xs uppercase tracking-[0.2em] text-linen/50">
          Документальный фильм · ВГИК · 2026
        </p>
        <p className="mt-2 max-w-md text-xs leading-relaxed text-linen/40 text-pretty">
          Культура живёт, пока её продолжают.
        </p>
      </div>
    </footer>
  )
}

import { Reveal } from "./reveal"

export function Diary() {
  return (
    <section id="diary" className="relative bg-linen">
      <div className="mx-auto max-w-3xl px-5 py-24 text-center sm:py-32">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-thread">
            Дневник
          </p>

          <h2 className="mt-5 font-serif text-3xl leading-tight text-ink sm:text-5xl text-balance">
            Дневник «Трёх солнц»
          </h2>

          <p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-foreground/80 text-pretty">
            С 9 сентября мы отправимся в экспедицию. Будем показывать дорогу,
            съёмочные дни, наших героев и то, как постепенно собирается фильм.
          </p>
        </Reveal>

        <Reveal delay={120} className="mt-10">
          <div className="flex flex-wrap items-center justify-center gap-x-11 gap-y-3 font-serif text-xl italic text-thread sm:text-2xl">
            <a
              href="https://t.me/threesunsdoc"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-opacity hover:opacity-60"
            >
              Дневник фильма
            </a>

            <span className="text-ink/30">·</span>

            <a
              href="https://www.instagram.com/threesunsdoc/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-opacity hover:opacity-60"
            >
              Фото-дневник
            </a>

            <span className="text-ink/30">·</span>

            <a
              href="https://www.tiktok.com/@threesunsdoc"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-opacity hover:opacity-60"
            >
              Видео-дневник
            </a>
          </div>

          <p className="mt-4 text-xs uppercase tracking-[0.16em] text-muted-foreground">
            @threesunsdoc
          </p>
        </Reveal>
      </div>
    </section>
  )
}
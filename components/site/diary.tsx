import { Reveal } from "./reveal"

export function Diary() {
  return (
    <section id="diary" className="relative bg-linen">
      <div className="mx-auto max-w-6xl px-5 py-24 text-center sm:py-32">
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

        <Reveal delay={120} className="mt-14">
          <div className="mx-auto grid max-w-6xl gap-8 sm:grid-cols-3">
            {/* Telegram */}
            <a
              href="https://t.me/threesunsdoc"
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <div className="overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-xl">
                <img
                  src="/images/telegram.png"
                  alt="Дневник фильма «Три солнца» в Telegram"
                  className="h-auto w-full"
                />
              </div>

              <div className="mt-4 flex items-center justify-between px-1">
                <span className="font-serif text-xl italic text-thread">
                  Дневник фильма
                </span>

                <span className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-ink/45 transition-colors group-hover:text-thread">
                  Telegram ↗
                </span>
              </div>
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/threesunsdoc/"
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <div className="overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-xl">
                <img
                  src="/images/instagram.png"
                  alt="Фото-дневник фильма «Три солнца»"
                  className="h-auto w-full"
                />
              </div>

              <div className="mt-4 flex items-center justify-between px-1">
                <span className="font-serif text-xl italic text-thread">
                  Фото-дневник
                </span>

                <span className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-ink/45 transition-colors group-hover:text-thread">
                  Картинки ↗
                </span>
              </div>
            </a>

            {/* TikTok */}
            <a
              href="https://www.tiktok.com/@threesunsdoc"
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <div className="overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-xl">
                <img
                  src="/images/tiktok.PNG"
                  alt="Видео-дневник фильма «Три солнца» в TikTok"
                  className="h-auto w-full"
                />
              </div>

              <div className="mt-4 flex items-center justify-between px-1">
                <span className="font-serif text-xl italic text-thread">
                  Видео-дневник
                </span>

                <span className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-ink/45 transition-colors group-hover:text-thread">
                  TikTok ↗
                </span>
              </div>
            </a>
          </div>

          <p className="mt-8 text-xs uppercase tracking-[0.16em] text-muted-foreground">
            @threesunsdoc
          </p>
        </Reveal>
      </div>
    </section>
  )
}
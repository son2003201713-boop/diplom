import { Reveal } from "./reveal"

export function Personal() {
  return (
    <section className="relative bg-linen">
      <div className="mx-auto grid max-w-6xl gap-14 px-5 py-28 sm:py-40 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <Reveal>
          <h2 className="font-serif text-4xl leading-[1.02] text-ink sm:text-6xl text-balance">
            Почему для нас это важно
          </h2>
          <div className="mt-8 flex items-center gap-4">
            <span className="h-px w-16 bg-thread" />
            <span className="size-2 rotate-45 bg-thread" />
          </div>
        </Reveal>

        <Reveal delay={120} className="flex flex-col gap-6 text-lg leading-relaxed text-foreground/85">
          <p className="text-pretty">
            Для нас «Три солнца» — ещё и разговор с собственными корнями.
          </p>
          <p className="text-pretty">
            Нам хочется показать культуру родного края не только как наследие прошлого, но и как
            пространство для нового творчества.
          </p>
          <p className="text-pretty">
            Вместе с нашей командой мы хотим сделать фильм, после которого кому-то захочется узнать
            больше о чувашской культуре, а кому-то начать создавать что-то своё.
          </p>
          <p className="mt-6 font-serif text-2xl italic leading-snug text-thread sm:text-3xl text-balance">
            Иногда интерес к культуре начинается с одной истории.
          </p>
        </Reveal>
      </div>
    </section>
  )
}

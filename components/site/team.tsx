import { TEAM } from "@/lib/content"
import { Reveal } from "./reveal"

export function Team() {
  return (
    <section className="relative bg-ink text-linen">
      <div className="mx-auto max-w-4xl px-5 py-28 sm:py-36">
        <Reveal className="mb-16 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">Команда</p>
          <h2 className="mt-5 font-serif text-3xl leading-tight sm:text-5xl">Съёмочная группа</h2>
        </Reveal>

        <ul className="divide-y divide-linen/15">
          {TEAM.map((member, i) => (
            <Reveal key={member.name} delay={i * 60} as="li">
              <div className="flex flex-col gap-1 py-6 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-gold sm:w-40 sm:shrink-0">
                  {member.role}
                </p>
                <p className="font-serif text-2xl leading-none text-linen sm:flex-1 sm:text-3xl">
                  {member.name}
                </p>
                {member.note ? (
                  <p className="text-sm text-linen/55 sm:w-52 sm:text-right">{member.note}</p>
                ) : (
                  <span className="hidden sm:block sm:w-52" aria-hidden="true" />
                )}
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}

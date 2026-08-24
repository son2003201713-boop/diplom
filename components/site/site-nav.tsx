"use client"

import { useEffect, useState } from "react"

const sections = [
  { id: "top", label: "Начало" },
  { id: "legend", label: "Легенда" },
  { id: "heroes", label: "Герои" },
  { id: "about", label: "О фильме" },
  { id: "production", label: "Съёмки" },
  { id: "support", label: "Поддержать" },
  { id: "team", label: "Команда" },
  { id: "diary", label: "Дневник" },
  { id: "after", label: "После съёмок" },
]

export function SiteNav() {
  const [active, setActive] = useState("top")
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    function updateActiveSection() {
      const point =
        window.scrollY + window.innerHeight * 0.45

      let current = "top"

      for (const section of sections) {
        const element = document.getElementById(section.id)

        if (!element) continue

        const top =
          element.getBoundingClientRect().top +
          window.scrollY

        if (top <= point) {
          current = section.id
        }
      }

      setActive(current)
    }

    updateActiveSection()

    window.addEventListener(
      "scroll",
      updateActiveSection,
      { passive: true },
    )

    window.addEventListener(
      "resize",
      updateActiveSection,
    )

    return () => {
      window.removeEventListener(
        "scroll",
        updateActiveSection,
      )

      window.removeEventListener(
        "resize",
        updateActiveSection,
      )
    }
  }, [])

  function goTo(id: string) {
    const element = document.getElementById(id)

    if (!element) return

    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })

    setMobileOpen(false)
  }

  return (
    <>
      {/* DESKTOP */}
      <nav
        className="fixed right-8 top-1/2 z-[60] hidden -translate-y-1/2 sm:block"
        aria-label="Навигация по сайту"
      >
        <div className="flex flex-col items-end">
          {sections.map((section, index) => {
            const current = active === section.id

            return (
              <div
                key={section.id}
                className="flex flex-col items-end"
              >
                <button
                  type="button"
                  onClick={() => goTo(section.id)}
                  className="group flex items-center gap-3 py-1"
                  aria-label={section.label}
                >
                  {/* Название появляется при наведении */}
                  <span
                    className={`pointer-events-none translate-x-1 whitespace-nowrap text-[0.65rem] font-semibold uppercase tracking-[0.16em] opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100 ${
                      current
                        ? "text-thread"
                        : "text-ink/55"
                    }`}
                  >
                    {section.label}
                  </span>

                  {/* Фиксированный ромб */}
                  <span
                    className={`block size-2.5 shrink-0 rotate-45 border transition-all duration-200 ${
                      current
                        ? "scale-110 border-thread bg-thread"
                        : "border-ink/25 bg-linen group-hover:border-thread"
                    }`}
                  />
                </button>

                {/* Вертикальная нить */}
                {index < sections.length - 1 && (
                  <span className="mr-[4.5px] h-5 w-px bg-ink/15" />
                )}
              </div>
            )
          })}
        </div>
      </nav>

      {/* MOBILE */}
      <div className="fixed right-4 top-20 z-[60] sm:hidden">
        <button
          type="button"
          onClick={() =>
            setMobileOpen((value) => !value)
          }
          className="rounded-full border border-ink/15 bg-linen/90 px-4 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-ink shadow-sm backdrop-blur-md"
        >
          Разделы
        </button>

        {mobileOpen && (
          <div className="absolute right-0 mt-2 w-48 overflow-hidden rounded-xl border border-border bg-linen/95 p-2 shadow-xl backdrop-blur-md">
            {sections.map((section) => {
              const current =
                active === section.id

              return (
                <button
                  key={section.id}
                  type="button"
                  onClick={() =>
                    goTo(section.id)
                  }
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-xs font-semibold uppercase tracking-[0.12em] transition-colors ${
                    current
                      ? "bg-thread text-linen"
                      : "text-ink hover:bg-secondary"
                  }`}
                >
                  <span
                    className={`size-1.5 rotate-45 border ${
                      current
                        ? "border-linen bg-linen"
                        : "border-current"
                    }`}
                  />

                  {section.label}
                </button>
              )
            })}
          </div>
        )}
      </div>
    </>
  )
}
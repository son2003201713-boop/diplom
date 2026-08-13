"use client"

import { useEffect, useRef, useState } from "react"
import { ChevronDown, X } from "lucide-react"
import { BANK, FUNDRAISING } from "@/lib/content"
import { cn } from "@/lib/utils"
import { CopyButton } from "./copy-button"
import { useDonation } from "./donation-context"

function formatAmount(n: number) {
  return n.toLocaleString("ru-RU")
}

export function DonationModal() {
  const { open, presetAmount, closeModal } = useDonation()

  const [selected, setSelected] = useState<number | null>(
    FUNDRAISING.amounts[1],
  )
  const [custom, setCustom] = useState("")
  const [fullName, setFullName] = useState("")
  const [bankOpen, setBankOpen] = useState(false)

  const dialogRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (open) {
      setSelected(presetAmount ?? FUNDRAISING.amounts[1])
      setCustom("")
      setFullName("")
      setBankOpen(presetAmount != null)
    }
  }, [open, presetAmount])

  useEffect(() => {
    if (!open) return

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal()
    }

    document.addEventListener("keydown", onKey)

    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"

    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = prev
    }
  }, [open, closeModal])

  if (!open) return null

  const activeAmount = custom ? Number(custom) : selected

  const bankRows: { label: string; value: string }[] = [
    { label: "Получатель", value: BANK.recipient },
    { label: "Номер счёта", value: BANK.account },
    { label: "БИК", value: BANK.bik },
    { label: "Банк-получатель", value: BANK.bank },
    { label: "Корр. счёт", value: BANK.corrAccount },
    { label: "ИНН", value: BANK.inn },
    { label: "КПП", value: BANK.kpp },
    { label: "Назначение платежа", value: BANK.purpose },
  ]

  const allRequisites = bankRows
    .map((r) => `${r.label}: ${r.value}`)
    .join("\n")

  return (
    <div
      className="fixed inset-0 z-[70] flex items-end justify-center sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="donation-title"
    >
      <button
        type="button"
        aria-label="Закрыть"
        onClick={closeModal}
        className="absolute inset-0 animate-fade-in bg-ink/60 backdrop-blur-sm"
      />

      <div
        ref={dialogRef}
        className="relative flex max-h-[92vh] w-full max-w-lg animate-sheet-up flex-col overflow-hidden rounded-t-2xl border border-border bg-linen shadow-2xl sm:animate-fade-in sm:rounded-2xl"
      >
        <div className="flex justify-center pt-3 sm:hidden">
          <span className="h-1.5 w-12 rounded-full bg-border" />
        </div>

        <div className="flex items-start justify-between gap-4 px-6 pt-5 pb-4">
          <div>
            <h2
              id="donation-title"
              className="font-serif text-2xl leading-tight text-ink"
            >
              Поддержать «Три солнца»
            </h2>

            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
              Выберите сумму и укажите имя.
            </p>
          </div>

          <button
            type="button"
            onClick={closeModal}
            aria-label="Закрыть окно"
            className="-mr-1 -mt-1 shrink-0 rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-ink"
          >
            <X className="size-5" />
          </button>
        </div>

        <div className="overflow-y-auto px-6 pb-6">

          {/* Форма ЮKassa */}
          <form
            action="https://yookassa.ru/integration/simplepay/payment"
            method="post"
            acceptCharset="utf-8"
          >
            {/* ФИО */}
            <div className="mb-4">
              <label
                htmlFor="donor-name"
                className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-ink"
              >
                Ваше имя
              </label>

              <input
                id="donor-name"
                name="custName"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="ФИО"
                required
                className="w-full rounded-md border border-border bg-card px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-muted-foreground focus:border-thread"
              />

              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                Имя поможет нам найти вашу поддержку. Если вы хотите остаться
                анонимным, напишите «Анонимно».
              </p>
            </div>

            {/* Выбор суммы */}
            <div className="grid grid-cols-3 gap-2.5">
              {FUNDRAISING.amounts.map((amount) => {
                const active = !custom && selected === amount

                return (
                  <button
                    key={amount}
                    type="button"
                    onClick={() => {
                      setSelected(amount)
                      setCustom("")
                    }}
                    className={cn(
                      "flex flex-col items-center justify-center rounded-md border py-3.5 text-sm font-semibold transition-colors",
                      active
                        ? "border-thread bg-thread text-linen"
                        : "border-border bg-card text-ink hover:border-thread",
                    )}
                  >
                    {formatAmount(amount)} ₽
                  </button>
                )
              })}
            </div>

            {/* Другая сумма */}
            <div className="mt-2.5">
              <label className="sr-only" htmlFor="custom-amount">
                Другая сумма
              </label>

              <div
                className={cn(
                  "flex items-center gap-2 rounded-md border px-4 py-3 transition-colors",
                  custom ? "border-thread" : "border-border",
                )}
              >
                <input
                  id="custom-amount"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  placeholder="ДРУГАЯ СУММА"
                  value={custom}
                  onChange={(e) =>
                    setCustom(e.target.value.replace(/[^0-9]/g, ""))
                  }
                  className="w-full bg-transparent text-sm font-semibold uppercase tracking-[0.08em] text-ink outline-none placeholder:text-muted-foreground"
                />

                {custom && (
                  <span className="text-sm font-semibold text-ink">₽</span>
                )}
              </div>
            </div>

            {/* Именно это значение получит ЮKassa */}
            <input
              name="sum"
              type="hidden"
              value={activeAmount ?? ""}
            />

            <input
              name="customerNumber"
              type="hidden"
              value="Если вы поддержали нас суммой более 5000 мы укажем вас в титрах, пожалуйста, напишите свое ФИО."
            />

            <input
              name="shopId"
              type="hidden"
              value="1432391"
            />

            {/* Благодарности в титрах */}
            {activeAmount != null &&
              activeAmount >= FUNDRAISING.creditThreshold && (
                <div className="mt-3 rounded-md border border-gold/50 bg-gold/10 px-4 py-3">
                  <p className="text-xs leading-relaxed text-ink">
                    Поддержка от{" "}
                    {formatAmount(FUNDRAISING.creditThreshold)} ₽ — мы укажем
                    ваше имя в благодарностях в финальных титрах фильма.
                  </p>
                </div>
              )}

            {/* Главная кнопка ЮKassa */}
            <button
              type="submit"
              disabled={!activeAmount || !fullName.trim()}
              className="mt-5 w-full rounded-md bg-thread px-5 py-4 text-sm font-semibold uppercase tracking-[0.14em] text-linen transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {activeAmount
                ? `Поддержать на ${formatAmount(activeAmount)} ₽`
                : "Выберите сумму"}
            </button>
          </form>

          {/* QR */}
          <div className="mt-4 rounded-md border border-border bg-card px-4 py-5">
            <div className="flex flex-col items-center text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-ink">
                Быстрый перевод
              </p>

              <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">
                Или отсканируйте QR-код камерой телефона.
              </p>

              <div className="mt-4 rounded-md bg-white p-3">
                <img
                  src="/images/qr.jpg"
                  alt="QR-код для поддержки фильма «Три солнца»"
                  className="h-52 w-52 object-contain"
                />
              </div>

              <p className="mt-3 text-xs text-muted-foreground">
                При переводе по QR имя лучше сообщить нам отдельно.
              </p>
            </div>
          </div>

          {/* Реквизиты */}
          <div className="mt-4 overflow-hidden rounded-md border border-border">
            <button
              type="button"
              onClick={() => setBankOpen((v) => !v)}
              aria-expanded={bankOpen}
              className="flex w-full items-center justify-between gap-3 bg-card px-4 py-3.5 text-left"
            >
              <span className="text-xs font-semibold uppercase tracking-[0.12em] text-ink">
                Перевести по реквизитам
              </span>

              <ChevronDown
                className={cn(
                  "size-4 shrink-0 text-muted-foreground transition-transform",
                  bankOpen && "rotate-180",
                )}
              />
            </button>

            {bankOpen && (
              <div className="animate-fade-in border-t border-border bg-linen px-4 py-4">
                <dl className="divide-y divide-border">
                  {bankRows.map((row) => (
                    <div
                      key={row.label}
                      className="flex flex-col gap-1 py-2.5"
                    >
                      <dt className="text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                        {row.label}
                      </dt>

                      <dd className="text-sm leading-snug text-ink break-words">
                        {row.value}
                      </dd>
                    </div>
                  ))}
                </dl>

                <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                  При переводе по реквизитам, пожалуйста, укажите назначение
                  платежа без изменений.
                </p>

                <div className="mt-4 flex flex-col gap-2">
                  <CopyButton
                    value={BANK.account}
                    label="Скопировать номер счёта"
                    variant="solid"
                  />

                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    <CopyButton
                      value={BANK.purpose}
                      label="Скопировать назначение"
                    />

                    <CopyButton
                      value={allRequisites}
                      label="Скопировать все реквизиты"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="mt-4 rounded-md border border-border bg-secondary/40 px-4 py-3">
            <p className="text-xs leading-relaxed text-muted-foreground">
              <span className="font-semibold text-ink">
                Если страница оплаты не открывается:
              </span>{" "}
              попробуйте открыть сайт в Яндекс Браузере или воспользуйтесь
              переводом по QR-коду.
            </p>
          </div>

          <p className="mt-4 text-center text-xs leading-relaxed text-muted-foreground">
            Каждый перевод приближает один из наших съёмочных дней.
          </p>
        </div>
      </div>
    </div>
  )
}
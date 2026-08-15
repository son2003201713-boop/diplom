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
  const [donorConsent, setDonorConsent] = useState(false)
  const [creditsConsent, setCreditsConsent] = useState(false)
  const [bankOpen, setBankOpen] = useState(false)
  const [paying, setPaying] = useState(false)

  const dialogRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (open) {
      setSelected(presetAmount ?? FUNDRAISING.amounts[1])
      setCustom("")
      setFullName("")
      setDonorConsent(false)
      setCreditsConsent(false)
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
  const hasName = fullName.trim().length > 0

  const needsCreditsConsent =
    hasName &&
    activeAmount != null &&
    activeAmount >= FUNDRAISING.creditThreshold

  const paymentDisabled =
    !activeAmount ||
    activeAmount <= 0 ||
    paying ||
    (hasName && !donorConsent)

  async function handlePayment() {
    if (paymentDisabled || !activeAmount) return

    try {
      setPaying(true)

      const response = await fetch("/api/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: activeAmount,

          // Если поле пустое — платёж анонимный.
          donorName: hasName ? fullName.trim() : "",

          // Согласие на хранение ФИО.
          donorConsent: hasName ? donorConsent : false,

          // Согласие на имя в титрах.
          creditsConsent:
            needsCreditsConsent && creditsConsent,
        }),
      })

      const data = await response.json()

      if (!response.ok || !data.confirmationUrl) {
        alert(
          data?.error ??
            "Не удалось открыть оплату. Попробуйте ещё раз.",
        )
        return
      }

      window.location.href = data.confirmationUrl
    } catch (error) {
      console.error(error)
      alert("Произошла ошибка. Попробуйте ещё раз.")
    } finally {
      setPaying(false)
    }
  }

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
      {/* Затемнение фона */}
      <button
        type="button"
        aria-label="Закрыть"
        onClick={closeModal}
        className="absolute inset-0 animate-fade-in bg-ink/60 backdrop-blur-sm"
      />

      {/* Окно */}
      <div
        ref={dialogRef}
        className="relative flex max-h-[92vh] w-full max-w-lg animate-sheet-up flex-col overflow-hidden rounded-t-2xl border border-border bg-linen shadow-2xl sm:animate-fade-in sm:rounded-2xl"
      >
        <div className="flex justify-center pt-3 sm:hidden">
          <span className="h-1.5 w-12 rounded-full bg-border" />
        </div>

        {/* Заголовок */}
        <div className="flex items-start justify-between gap-4 px-6 pt-5 pb-4">
          <div>
            <h2
              id="donation-title"
              className="font-serif text-2xl leading-tight text-ink"
            >
              Поддержать «Три солнца»
            </h2>

            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
              Выберите сумму. Имя можно оставить, если хотите, чтобы мы знали,
              кто поддержал фильм.
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

          {/* ФИО */}
          <div className="mb-5">
            <label
              htmlFor="donor-name"
              className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-ink"
            >
              ФИО — необязательно
            </label>

            <input
              id="donor-name"
              type="text"
              value={fullName}
              onChange={(e) => {
                const value = e.target.value

                setFullName(value)

                if (!value.trim()) {
                  setDonorConsent(false)
                  setCreditsConsent(false)
                }
              }}
              placeholder="Введите имя или оставьте поле пустым"
              className="w-full rounded-md border border-border bg-card px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-muted-foreground focus:border-thread"
            />

            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
              Можно оставить поле пустым и поддержать фильм анонимно.
            </p>

            {/* Согласие на обработку ФИО */}
            {hasName && (
              <label className="mt-4 flex cursor-pointer items-start gap-3 rounded-md border border-border bg-card px-4 py-3">
                <input
                  type="checkbox"
                  checked={donorConsent}
                  onChange={(e) => {
                    const checked = e.target.checked
                    setDonorConsent(checked)

                    if (!checked) {
                      setCreditsConsent(false)
                    }
                  }}
                  className="mt-0.5 size-4 shrink-0 accent-current"
                />

                <span className="text-xs leading-relaxed text-foreground/80">
                  Я согласен(на) на обработку указанного ФИО для учёта моей
                  поддержки фильма.
                </span>
              </label>
            )}
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

                    if (amount < FUNDRAISING.creditThreshold) {
                      setCreditsConsent(false)
                    }
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
            <label
              className="sr-only"
              htmlFor="custom-amount"
            >
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
                onChange={(e) => {
                  const value = e.target.value.replace(/[^0-9]/g, "")
                  setCustom(value)

                  if (
                    value &&
                    Number(value) < FUNDRAISING.creditThreshold
                  ) {
                    setCreditsConsent(false)
                  }
                }}
                className="w-full bg-transparent text-sm font-semibold uppercase tracking-[0.08em] text-ink outline-none placeholder:text-muted-foreground"
              />

              {custom && (
                <span className="text-sm font-semibold text-ink">
                  ₽
                </span>
              )}
            </div>
          </div>

          {/* Титры */}
          {activeAmount != null &&
            activeAmount >= FUNDRAISING.creditThreshold && (
              <div className="mt-3 rounded-md border border-gold/50 bg-gold/10 px-4 py-3">
                <p className="text-xs leading-relaxed text-ink">
                  Поддержка от{" "}
                  {formatAmount(FUNDRAISING.creditThreshold)} ₽ — мы можем
                  указать ваше имя в благодарностях в финальных титрах фильма.
                </p>

                {hasName && donorConsent && (
                  <label className="mt-3 flex cursor-pointer items-start gap-3">
                    <input
                      type="checkbox"
                      checked={creditsConsent}
                      onChange={(e) =>
                        setCreditsConsent(e.target.checked)
                      }
                      className="mt-0.5 size-4 shrink-0 accent-current"
                    />

                    <span className="text-xs leading-relaxed text-ink">
                      Я согласен(на) на указание введённого ФИО в
                      благодарностях в финальных титрах фильма.
                    </span>
                  </label>
                )}

                {!hasName && (
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                    Чтобы попасть в титры, укажите ФИО выше.
                  </p>
                )}
              </div>
            )}

          {/* Оплата */}
          <button
            type="button"
            onClick={handlePayment}
            disabled={paymentDisabled}
            className="mt-5 w-full rounded-md bg-thread px-5 py-4 text-sm font-semibold uppercase tracking-[0.14em] text-linen transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {paying
              ? "Переходим к оплате..."
              : activeAmount
                ? `Поддержать на ${formatAmount(activeAmount)} ₽`
                : "Выберите сумму"}
          </button>

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

          <p className="mt-4 text-center text-xs leading-relaxed text-muted-foreground">
            Каждый перевод приближает один из наших съёмочных дней.
          </p>
        </div>
      </div>
    </div>
  )
}
"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { X } from "lucide-react"

export function PaymentSuccess() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const paymentSuccess = searchParams.get("payment") === "success"

  if (!paymentSuccess) return null

  function close() {
    router.replace("/")
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-5">
      {/* Затемнение фона */}
      <button
        type="button"
        aria-label="Закрыть"
        onClick={close}
        className="absolute inset-0 bg-ink/60 backdrop-blur-sm"
      />

      {/* Окно */}
      <div className="relative z-10 w-full max-w-lg rounded-2xl border border-border bg-linen px-6 py-10 text-center shadow-2xl sm:px-10">
        <button
          type="button"
          onClick={close}
          aria-label="Закрыть окно"
          className="absolute right-4 top-4 rounded-full p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-ink"
        >
          <X className="size-5" />
        </button>

        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-thread">
          Спасибо
        </p>

        <h2 className="mt-4 font-serif text-3xl leading-tight text-ink sm:text-4xl">
          Спасибо за поддержку
          <br />
          «Трёх солнц»!
        </h2>

        <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-foreground/80">
          Ваш вклад помогает нам продолжать работу над фильмом.
        </p>

        <div className="my-7 h-px bg-border" />

        <p className="text-sm leading-relaxed text-foreground/80">
          Если вы поддержали фильм на <strong>5 000 ₽ или больше</strong> и
          хотите, чтобы мы указали ваше имя в благодарностях в финальных
          титрах, напишите нам во ВКонтакте.
        </p>

        <a
          href="https://vk.ru/lllllllolll"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex rounded-md bg-thread px-6 py-3.5 text-sm font-semibold uppercase tracking-[0.12em] text-linen transition-opacity hover:opacity-90"
        >
          Написать во ВКонтакте
        </a>

        <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
          Укажите ваше имя и сумму перевода.
        </p>
      </div>
    </div>
  )
}
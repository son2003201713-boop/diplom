"use client"

import { useEffect, useState } from "react"
import Script from "next/script"

const METRIKA_ID = 111635291

export function MetrikaConsent() {
  const [consent, setConsent] = useState<
    "accepted" | "declined" | null
  >(null)

  const [ready, setReady] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem("metrika-consent")

    if (saved === "accepted" || saved === "declined") {
      setConsent(saved)
    }

    setReady(true)
  }, [])

  function accept() {
    localStorage.setItem("metrika-consent", "accepted")
    setConsent("accepted")
  }

  function decline() {
    localStorage.setItem("metrika-consent", "declined")
    setConsent("declined")
  }

  if (!ready) return null

  return (
    <>
      {consent === "accepted" && (
        <Script id="yandex-metrika" strategy="afterInteractive">
          {`
            (function(m,e,t,r,i,k,a){
              m[i]=m[i]||function(){
                (m[i].a=m[i].a||[]).push(arguments)
              };

              m[i].l=1*new Date();

              for (var j=0; j<document.scripts.length; j++) {
                if (document.scripts[j].src === r) return;
              }

              k=e.createElement(t);
              a=e.getElementsByTagName(t)[0];
              k.async=1;
              k.src=r;
              a.parentNode.insertBefore(k,a);
            })(
              window,
              document,
              "script",
              "https://mc.yandex.ru/metrika/tag.js?id=${METRIKA_ID}",
              "ym"
            );

            ym(${METRIKA_ID}, "init", {
              clickmap: true,
              trackLinks: true,
              accurateTrackBounce: true,
              webvisor: true
            });
          `}
        </Script>
      )}

      {consent === null && (
        <div className="fixed bottom-4 left-4 right-4 z-[100] mx-auto max-w-xl rounded-sm border border-border bg-linen/95 p-5 shadow-xl backdrop-blur-md sm:bottom-6">
          <p className="font-serif text-lg text-ink">
            Аналитика сайта
          </p>

          <p className="mt-2 text-sm leading-relaxed text-foreground/75">
            Мы используем Яндекс Метрику, чтобы понимать, как посетители
            пользуются сайтом, и улучшать проект.
          </p>

          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
            Подробнее — в политике конфиденциальности.
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={accept}
              className="rounded-full bg-thread px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] text-linen"
            >
              Разрешить
            </button>

            <button
              type="button"
              onClick={decline}
              className="rounded-full border border-ink/20 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] text-ink"
            >
              Не разрешать
            </button>
          </div>
        </div>
      )}
    </>
  )
}
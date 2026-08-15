import { MetrikaConsent } from "@/components/site/metrika-consent"
import { Analytics } from "@vercel/analytics/next"
import type { Metadata, Viewport } from "next"
import { Playfair_Display, Inter } from "next/font/google"
import "./globals.css"

const playfair = Playfair_Display({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-serif",
  display: "swap",
})

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Три солнца — документальный фильм о современной чувашской культуре",
  description:
    "«Три солнца» — документальный фильм о современных чувашских творцах, которые переосмысляют традицию. Пять творцов, одна древняя легенда. Поддержите съёмки фильма.",
  generator: "v0.app",
  openGraph: {
    title: "Три солнца — документальный фильм",
    description:
      "Пять творцов. Одна древняя легенда. Один разговор о том, как культура продолжает жить.",
    locale: "ru_RU",
    type: "website",
  },
}

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#efe7d6",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="ru"
      className={`${playfair.variable} ${inter.variable} bg-background`}
    >
      <body className="antialiased font-sans">
        {children}

        <MetrikaConsent />

        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  )
}
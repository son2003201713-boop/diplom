import { Suspense } from "react"

import { DonationProvider } from "@/components/site/donation-context"
import { DonationModal } from "@/components/site/donation-modal"
import { StickyCTA } from "@/components/site/sticky-cta"
import { Hero } from "@/components/site/hero"
import { PaymentSuccess } from "@/components/site/payment-success"
import { Legend } from "@/components/site/legend"
import { PresentDay } from "@/components/site/present-day"
import { Protagonists } from "@/components/site/protagonists"
import { Manifesto } from "@/components/site/manifesto"
import { Personal } from "@/components/site/personal"
import { Production } from "@/components/site/production"
import { Fundraising } from "@/components/site/fundraising"
import { Director } from "@/components/site/director"
import { Team } from "@/components/site/team"
import { Diary } from "@/components/site/diary"
import { AfterFilming } from "@/components/site/after-filming"
import { FinalCTA } from "@/components/site/final-cta"
import { Footer } from "@/components/site/footer"

export default function Page() {
  return (
    <DonationProvider>
      <main className="grain relative bg-linen">
      <Suspense fallback={null}>
  <PaymentSuccess />
</Suspense>
  <Hero />
  <Legend />
        <PresentDay />
        <Protagonists />
        <Manifesto />
        <Personal />
        <Production />
        <Fundraising />
        <Director />
        <Team />
        <Diary />
        <AfterFilming />
        <FinalCTA />
        <Footer />
      </main>
      <StickyCTA />
      <DonationModal />
    </DonationProvider>
  )
}

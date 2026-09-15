"use client"

import { useRef } from "react"
import Image from "next/image"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ArrowRight } from "lucide-react"
import { useLang } from "@/lib/lang"
import ContactDropdown from "@/components/ui/ContactDropdown"

const STATS = [
  { value: "2,500+", labelKey: "hero.statTravelers" },
  { value: "2022+", labelKey: "hero.statCars" },
  { value: "7", labelKey: "hero.statPackages" },
]

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null)
  const { t } = useLang()

  useGSAP(() => {
    gsap.fromTo(
      ".hero-reveal",
      { y: 28, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, stagger: 0.12, delay: 0.15, ease: "power3.out" }
    )
  }, { scope: heroRef })

  return (
    <section
      ref={heroRef}
      className="relative flex min-h-[100svh] items-end overflow-hidden bg-ink pt-32 pb-14"
    >
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=2938&auto=format&fit=crop"
          alt="Balinese temple gateway at sunrise"
          fill
          sizes="100vw"
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/40" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 xl:px-12">
        <div className="flex flex-col gap-14 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="hero-reveal eyebrow mb-5">{t("hero.eyebrow")}</p>

            <h1 className="hero-reveal display text-6xl leading-[0.88] text-white sm:text-7xl lg:text-8xl xl:text-9xl">
              {t("hero.headlineTop")}
              <br />
              <span className="text-outline">{t("hero.headlineOutline")}</span>
            </h1>

            <p className="hero-reveal mt-7 max-w-lg text-sm leading-relaxed text-white/60 sm:text-base">
              {t("hero.sub")}
            </p>

            <div className="hero-reveal mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <ContactDropdown label={t("hero.bookNow")} variant="primary" />
              <a
                href="#packages"
                className="inline-flex items-center justify-center gap-2 rounded-md border border-line-strong px-7 py-4 text-xs font-bold tracking-widest text-white uppercase transition-colors hover:border-white/35 hover:bg-white/5"
              >
                {t("hero.viewPackages")}
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="hero-reveal flex flex-wrap gap-x-10 gap-y-6 lg:flex-col lg:gap-8 lg:text-right">
            {STATS.map((stat) => (
              <div key={stat.labelKey}>
                <p className="display text-3xl text-brand lg:text-4xl">{stat.value}</p>
                <p className="mt-1 text-[10px] font-semibold tracking-[0.18em] text-white/45 uppercase">
                  {t(stat.labelKey)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

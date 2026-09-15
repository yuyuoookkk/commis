"use client"

import { useRef } from "react"
import Image from "next/image"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useLang } from "@/lib/lang"
import ContactDropdown from "@/components/ui/ContactDropdown"

gsap.registerPlugin(ScrollTrigger)

export default function FinalCTA() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { t } = useLang()

  useGSAP(() => {
    gsap.fromTo(
      ".cta-content",
      { y: 36, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: containerRef.current, start: "top 78%" },
      }
    )
  }, { scope: containerRef })

  return (
    <section
      id="book"
      ref={containerRef}
      className="border-t border-line bg-ink px-6 py-24 md:px-12 lg:px-24"
    >
      <div className="cta-content relative mx-auto max-w-7xl overflow-hidden rounded-2xl border border-line">
        <Image
          src="https://images.unsplash.com/photo-1537956965359-7573183d1f57?auto=format&fit=crop&q=80&w=2000"
          alt="Bali coastline at golden hour"
          fill
          sizes="(max-width: 1280px) 100vw, 1280px"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/40" />

        <div className="relative px-8 py-16 md:px-16 md:py-24">
          <h2 className="display max-w-2xl text-4xl leading-[0.95] text-white sm:text-5xl lg:text-6xl">
            {t("cta.heading")}
          </h2>

          <p className="mt-6 max-w-xl text-sm leading-relaxed text-white/55 sm:text-base">
            {t("cta.desc")}
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <ContactDropdown label={t("cta.startPlanning")} variant="primary" />
            <a
              href="#packages"
              className="inline-flex items-center justify-center rounded-md border border-line-strong px-7 py-4 text-xs font-bold tracking-widest text-white uppercase transition-colors hover:border-white/35 hover:bg-white/5"
            >
              {t("hero.viewPackages")}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

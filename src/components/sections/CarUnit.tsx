"use client"

import { useRef } from "react"
import Image from "next/image"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Users, Briefcase, Check } from "lucide-react"
import { useLang } from "@/lib/lang"
import SectionHeading from "@/components/ui/SectionHeading"
import ContactDropdown from "@/components/ui/ContactDropdown"

gsap.registerPlugin(ScrollTrigger)

const UNITS = [
  {
    id: 1,
    image: "/assets/car-avanza-black.jpg",
    nameKey: "carUnit.avanzaBlack.name",
    colorKey: "carUnit.avanzaBlack.color",
    plate: "DK 1529 ACP",
    passengers: 6,
    luggage: 3,
    featureKeys: ["carUnit.feat.dualAc", "carUnit.feat.usbCharging", "carUnit.feat.recliningSeats"],
  },
  {
    id: 2,
    image: "/assets/car-avanza-white.jpg",
    nameKey: "carUnit.avanzaWhite.name",
    colorKey: "carUnit.avanzaWhite.color",
    plate: "DK 1653 HT",
    passengers: 6,
    luggage: 3,
    featureKeys: ["carUnit.feat.dualAc", "carUnit.feat.mineralWater", "carUnit.feat.tintedWindows"],
  },
]

export default function CarUnit() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { t } = useLang()

  useGSAP(() => {
    gsap.fromTo(
      ".car-unit-card",
      { y: 36, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: { trigger: containerRef.current, start: "top 75%" },
      }
    )
  }, { scope: containerRef })

  return (
    <section
      id="car-unit"
      ref={containerRef}
      className="border-t border-line bg-ink px-6 py-24 md:px-12 lg:px-24"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow={t("carUnit.label")}
          title={t("carUnit.heading")}
          description={t("carUnit.desc")}
          className="mb-12"
        />

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {UNITS.map((unit) => (
            <article
              key={unit.id}
              className="car-unit-card group flex flex-col rounded-xl border border-line bg-surface p-3 transition-colors hover:border-brand/40"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-surface-2">
                <Image
                  src={unit.image}
                  alt={`${t(unit.nameKey)} — ${unit.plate}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute top-2 left-2 rounded bg-black/65 px-2 py-1 text-[10px] font-semibold tracking-wider text-white uppercase backdrop-blur-sm">
                  {unit.plate}
                </span>
              </div>

              <div className="flex flex-1 flex-col px-2 pt-5 pb-2">
                <h3 className="display text-2xl text-white">{t(unit.nameKey)}</h3>
                <p className="mt-1 text-sm text-brand">{t(unit.colorKey)}</p>

                <div className="mt-5 mb-5 flex items-center gap-6 border-y border-line py-4">
                  <span className="flex items-center gap-2 text-sm text-white/55">
                    <Users className="h-4.5 w-4.5 text-brand" />
                    {unit.passengers} {t("carUnit.pax")}
                  </span>
                  <span className="flex items-center gap-2 text-sm text-white/55">
                    <Briefcase className="h-4.5 w-4.5 text-brand" />
                    {unit.luggage} {t("carUnit.bags")}
                  </span>
                </div>

                <ul className="mb-6 space-y-2.5">
                  {unit.featureKeys.map((featKey) => (
                    <li key={featKey} className="flex items-start gap-2 text-sm text-white/60">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                      {t(featKey)}
                    </li>
                  ))}
                </ul>

                <ContactDropdown
                  label={t("carUnit.bookThisCar")}
                  message={`Hi! I'd like to book the ${t(unit.nameKey)} (${unit.plate}).`}
                  variant="outline"
                  wrapperClassName="mt-auto w-full"
                  className="w-full"
                />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

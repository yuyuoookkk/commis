"use client"

import { useRef } from "react"
import Image from "next/image"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Car, Users, Briefcase, Check } from "lucide-react"
import { useLang } from "@/lib/lang"
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
    gsap.fromTo('.car-unit-header',
      { y: 30, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.8,
        scrollTrigger: { trigger: containerRef.current, start: "top 80%" }
      }
    )

    gsap.fromTo('.car-unit-card',
      { y: 40, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: "power2.out",
        scrollTrigger: { trigger: containerRef.current, start: "top 70%" }
      }
    )
  }, { scope: containerRef })

  return (
    <section id="car-unit" ref={containerRef} className="py-24 px-6 md:px-12 lg:px-24 bg-dark-surface relative border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="car-unit-header text-center mb-16 max-w-2xl mx-auto">
          <span className="text-luxury-gold font-medium tracking-wider uppercase text-sm mb-4 flex items-center justify-center gap-2">
            <Car className="w-4 h-4" /> {t("carUnit.label")}
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-white mb-6">
            {t("carUnit.heading")}
          </h2>
          <p className="text-gray-400 text-lg">
            {t("carUnit.desc")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {UNITS.map((unit) => (
            <div
              key={unit.id}
              className="car-unit-card group glass-dark rounded-2xl overflow-hidden border border-white/5 hover:border-luxury-gold/30 transition-colors flex flex-col"
            >
              <div className="relative w-full aspect-[4/5] sm:aspect-[4/3] overflow-hidden">
                <Image
                  src={unit.image}
                  alt={`${t(unit.nameKey)} — ${unit.plate}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-80" />
                <span className="absolute top-4 left-4 px-3 py-1.5 rounded-full text-xs font-semibold tracking-wider text-white bg-black/50 backdrop-blur-sm border border-white/15">
                  {unit.plate}
                </span>
              </div>

              <div className="p-8 flex-1 flex flex-col">
                <h3 className="text-2xl font-serif text-white mb-1">{t(unit.nameKey)}</h3>
                <p className="text-luxury-gold text-sm mb-6">{t(unit.colorKey)}</p>

                <div className="flex items-center gap-6 mb-6 pb-6 border-b border-white/5">
                  <div className="flex items-center gap-2 text-gray-400 text-sm">
                    <Users className="w-5 h-5 text-luxury-gold" />
                    <span>{unit.passengers} {t("carUnit.pax")}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400 text-sm">
                    <Briefcase className="w-5 h-5 text-luxury-gold" />
                    <span>{unit.luggage} {t("carUnit.bags")}</span>
                  </div>
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {unit.featureKeys.map((featKey, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-300">
                      <Check className="w-4 h-4 text-luxury-gold shrink-0" />
                      {t(featKey)}
                    </li>
                  ))}
                </ul>

                <ContactDropdown
                  label={t("carUnit.bookThisCar")}
                  message={`Hi! I'd like to book the ${t(unit.nameKey)} (${unit.plate}).`}
                  variant="outline"
                  className="w-full justify-center"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

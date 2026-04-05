"use client"

import { useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { Clock, Sun, Ship, Anchor, Plane, Heart, Car, ChevronRight } from "lucide-react"
import { useLang } from "@/lib/lang"

const SERVICES = [
  {
    id: 1,
    titleKey: "tours.fullDay.title",
    subtitleKey: "tours.fullDay.subtitle",
    descKey: "tours.fullDay.desc",
    icon: Sun,
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=1400",
    featureKeys: ["feat.petrol", "feat.driver", "feat.newestCar"],
  },
  {
    id: 2,
    titleKey: "tours.halfDay.title",
    subtitleKey: "tours.halfDay.subtitle",
    descKey: "tours.halfDay.desc",
    icon: Clock,
    image: "https://images.unsplash.com/photo-1555400038-63f5ba517a47?auto=format&fit=crop&q=80&w=1400",
    featureKeys: ["feat.petrol", "feat.driver", "feat.newestCar"],
  },
  {
    id: 3,
    titleKey: "tours.shuttle.title",
    subtitleKey: "tours.shuttle.subtitle",
    descKey: "tours.shuttle.desc",
    icon: Ship,
    image: "https://images.unsplash.com/photo-1468413253725-0d5181091126?auto=format&fit=crop&q=80&w=1400",
    featureKeys: ["feat.hotelPickup", "feat.harbourDrop", "feat.return"],
  },
  {
    id: 4,
    titleKey: "tours.penida.title",
    subtitleKey: "tours.penida.subtitle",
    descKey: "tours.penida.desc",
    icon: Anchor,
    image: "https://images.unsplash.com/photo-1537956965359-7573183d1f57?auto=format&fit=crop&q=80&w=1400",
    featureKeys: ["feat.allInclusive", "feat.boatTicket", "feat.privateCar"],
  },
  {
    id: 5,
    titleKey: "tours.airport.title",
    subtitleKey: "tours.airport.subtitle",
    descKey: "tours.airport.desc",
    icon: Plane,
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=1400",
    featureKeys: ["feat.mineralWater", "feat.newestCarShort", "feat.meetGreet"],
  },
  {
    id: 6,
    titleKey: "tours.wedding.title",
    subtitleKey: "tours.wedding.subtitle",
    descKey: "tours.wedding.desc",
    icon: Heart,
    image: "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&q=80&w=1400",
    featureKeys: ["feat.customDeco", "feat.privateVehicle", "feat.weddingReady"],
  },
  {
    id: 7,
    titleKey: "tours.rentCar.title",
    subtitleKey: "tours.rentCar.subtitle",
    descKey: "tours.rentCar.desc",
    icon: Car,
    image: "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&q=80&w=1400",
    featureKeys: ["feat.selfDrive", "feat.newestModels", "feat.flexibleRental"],
  },
]

export default function TourPackages() {
  const [hoveredId, setHoveredId] = useState<number | null>(null)
  const { t } = useLang()

  return (
    <section id="tours" className="py-28 md:py-36 bg-[#F5F1E7] text-[#111111] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-20">
          <h2 className="text-[#C28B6A] uppercase tracking-widest text-xs font-bold mb-4">{t("tours.label")}</h2>
          <h3 className="font-serif text-4xl md:text-5xl text-[#16425B] leading-tight mb-6">
            {t("tours.heading")}
          </h3>
          <p className="text-[#111]/60 text-base md:text-lg leading-relaxed">
            {t("tours.desc")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map((service) => {
            const Icon = service.icon
            return (
              <div
                key={service.id}
                className={cn(
                  "group relative bg-white rounded-3xl overflow-hidden border border-black/5 flex flex-col",
                  "hover:shadow-2xl hover:shadow-black/8 hover:-translate-y-1.5 transition-all duration-500",
                  (service.id === 1 || service.id === 7) && "lg:col-span-2"
                )}
                onMouseEnter={() => setHoveredId(service.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <div className={cn(
                  "relative w-full overflow-hidden shrink-0 min-h-[240px]",
                  (service.id === 1 || service.id === 7) ? "aspect-[16/9]" : "aspect-[4/3]"
                )}>
                  <Image
                    src={service.image}
                    alt={t(service.titleKey)}
                    fill
                    sizes={(service.id === 1 || service.id === 7) ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 100vw, 33vw"}
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm shadow-sm">
                    <Icon className="w-3.5 h-3.5 text-[#C28B6A]" />
                    <span className="text-xs font-semibold text-[#16425B]">{t(service.subtitleKey)}</span>
                  </div>
                </div>

                <div className="p-6 md:p-7 flex-1 flex flex-col">
                  <h4 className={cn(
                    "font-serif text-[#16425B] mb-2 leading-tight",
                    (service.id === 1 || service.id === 7) ? "text-2xl md:text-3xl" : "text-xl md:text-2xl"
                  )}>
                    {t(service.titleKey)}
                  </h4>
                  <p className="text-[#111]/55 text-sm leading-relaxed mb-5 flex-1">
                    {t(service.descKey)}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {service.featureKeys.map((featKey, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 rounded-full text-[11px] font-medium bg-[#F5F1E7] text-[#16425B]/80 border border-[#C28B6A]/15"
                      >
                        {t(featKey)}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-14 md:mt-20 text-center">
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#16425B] hover:bg-[#1d5475] text-white font-semibold text-sm transition-all duration-300 hover:shadow-xl hover:shadow-[#16425B]/20 hover:-translate-y-0.5"
          >
            {t("tours.contactUs")}
            <ChevronRight className="w-4 h-4" />
          </a>
          <p className="text-[#111]/40 text-xs mt-4">{t("tours.priceNote")}</p>
        </div>
      </div>
    </section>
  )
}

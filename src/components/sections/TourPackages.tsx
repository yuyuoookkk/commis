"use client"

import { useRef, useState } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowRight, Check } from "lucide-react"
import { useLang } from "@/lib/lang"
import PackageCard from "@/components/ui/PackageCard"
import SectionHeading from "@/components/ui/SectionHeading"
import Modal from "@/components/ui/Modal"
import ContactActions from "@/components/ui/ContactActions"
import { waLink } from "@/lib/contact"

gsap.registerPlugin(ScrollTrigger)

interface Service {
  id: string
  titleKey: string
  subtitleKey: string
  descKey: string
  image: string
  featureKeys: string[]
  priceValue?: string
  bestSeller?: boolean
}

const MAIN_PACKAGES: Service[] = [
  {
    id: "full-day",
    titleKey: "tours.fullDay.title",
    subtitleKey: "tours.fullDay.subtitle",
    descKey: "tours.fullDay.desc",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=1400",
    featureKeys: ["feat.petrol", "feat.driver", "feat.newestCar"],
    priceValue: "IDR 600k",
    bestSeller: true,
  },
  {
    id: "half-day",
    titleKey: "tours.halfDay.title",
    subtitleKey: "tours.halfDay.subtitle",
    descKey: "tours.halfDay.desc",
    image: "https://images.unsplash.com/photo-1555400038-63f5ba517a47?auto=format&fit=crop&q=80&w=1400",
    featureKeys: ["feat.petrol", "feat.driver", "feat.newestCar"],
  },
  {
    id: "penida-full",
    titleKey: "tours.penida.title",
    subtitleKey: "tours.penida.subtitle",
    descKey: "tours.penida.desc",
    image: "/assets/tour-nusa-penida.jpg",
    featureKeys: ["feat.allInclusive", "feat.boatTicket", "feat.privateCar"],
    bestSeller: true,
  },
  {
    id: "airport",
    titleKey: "tours.airport.title",
    subtitleKey: "tours.airport.subtitle",
    descKey: "tours.airport.desc",
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=1400",
    featureKeys: ["feat.mineralWater", "feat.newestCarShort", "feat.meetGreet"],
    priceValue: "IDR 200k",
  },
]

const EXTRA_PACKAGES: Service[] = [
  {
    id: "shuttle",
    titleKey: "tours.shuttle.title",
    subtitleKey: "tours.shuttle.subtitle",
    descKey: "tours.shuttle.desc",
    image: "/assets/tour-gili-trawangan.jpg",
    featureKeys: ["feat.hotelPickup", "feat.harbourDrop", "feat.return"],
  },
  {
    id: "wedding",
    titleKey: "tours.wedding.title",
    subtitleKey: "tours.wedding.subtitle",
    descKey: "tours.wedding.desc",
    image: "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&q=80&w=1400",
    featureKeys: ["feat.customDeco", "feat.privateVehicle", "feat.weddingReady"],
  },
  {
    id: "rent-car",
    titleKey: "tours.rentCar.title",
    subtitleKey: "tours.rentCar.subtitle",
    descKey: "tours.rentCar.desc",
    image: "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&q=80&w=1400",
    featureKeys: ["feat.selfDrive", "feat.newestModels", "feat.flexibleRental"],
  },
]

export default function TourPackages() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [selected, setSelected] = useState<Service | null>(null)
  const { t } = useLang()

  useGSAP(() => {
    gsap.fromTo(
      ".package-card",
      { y: 32, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: { trigger: containerRef.current, start: "top 75%" },
      }
    )
  }, { scope: containerRef })

  const renderCard = (service: Service) => (
    <PackageCard
      key={service.id}
      className="package-card"
      image={service.image}
      title={t(service.titleKey)}
      badge={t(service.subtitleKey)}
      description={t(service.descKey)}
      priceLabel={service.priceValue ? t("card.startFrom") : t("card.pricing")}
      priceValue={service.priceValue ?? t("card.onRequest")}
      features={service.featureKeys.map((key) => t(key))}
      highlightLabel={service.bestSeller ? t("card.bestSeller") : undefined}
      detailsLabel={t("card.details")}
      bookLabel={t("card.book")}
      bookHref={waLink(`Hi! I'd like to book the ${t(service.titleKey)}.`)}
      onDetails={() => setSelected(service)}
    />
  )

  return (
    <>
      <section
        id="packages"
        ref={containerRef}
        className="border-t border-line bg-ink px-6 py-24 md:px-12 lg:px-24"
      >
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow={t("packages.mainLabel")}
            title={t("packages.mainHeading")}
            description={t("packages.mainDesc")}
            className="mb-12"
          />

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {MAIN_PACKAGES.map(renderCard)}
          </div>

          <SectionHeading
            eyebrow={t("packages.extraLabel")}
            title={t("packages.extraHeading")}
            description={t("packages.extraDesc")}
            className="mt-24 mb-12"
          />

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {EXTRA_PACKAGES.map(renderCard)}

            <div className="package-card flex flex-col justify-center rounded-xl border border-dashed border-brand/35 bg-brand-soft p-7">
              <h3 className="display text-xl text-white">{t("packages.customTitle")}</h3>
              <p className="mt-3 text-[13px] leading-relaxed text-white/50">
                {t("packages.customDesc")}
              </p>
              <a
                href={waLink("Hi! I'd like to plan a custom trip in Bali.")}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex w-fit items-center gap-2 rounded-md bg-brand px-5 py-3 text-xs font-bold tracking-wide text-white uppercase transition-colors hover:bg-brand-hover"
              >
                {t("tours.contactUs")}
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          <p className="mt-10 text-center text-xs text-white/35">{t("tours.priceNote")}</p>
        </div>
      </section>

      {selected && (
        <Modal
          label={t(selected.titleKey)}
          closeLabel={t("islandTours.close")}
          onClose={() => setSelected(null)}
        >
          <span className="eyebrow">{t(selected.subtitleKey)}</span>
          <h3 className="display mt-3 text-2xl text-white md:text-3xl">{t(selected.titleKey)}</h3>

          <p className="mt-4 border-b border-line pb-7 text-sm leading-relaxed text-white/50">
            {t(selected.descKey)}
          </p>

          <p className="mt-7 mb-4 font-medium text-white">{t("card.whatsIncluded")}</p>
          <ul className="mb-7 space-y-3">
            {selected.featureKeys.map((key) => (
              <li key={key} className="flex items-start gap-3 text-sm text-white/60">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                {t(key)}
              </li>
            ))}
          </ul>

          <p className="mb-7 border-b border-line pb-7 text-sm">
            <span className="text-white/40">
              {selected.priceValue ? `${t("card.startFrom")}: ` : `${t("card.pricing")}: `}
            </span>
            <span className="font-semibold text-brand">
              {selected.priceValue ?? t("card.onRequest")}
            </span>
          </p>

          <ContactActions
            message={`Hi! I'd like the price and details for the ${t(selected.titleKey)}.`}
            copiedLabel={t("islandTours.copied")}
          />
        </Modal>
      )}
    </>
  )
}

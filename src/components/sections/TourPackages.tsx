"use client"

import { useRef, useState, useEffect } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Check, ChevronRight, X, MessageCircle } from "lucide-react"
import { useLang } from "@/lib/lang"
import PackageCard from "@/components/ui/PackageCard"
import ContactDropdown from "@/components/ui/ContactDropdown"

gsap.registerPlugin(ScrollTrigger)

const WHATSAPP_NUMBER = "62881037512641"
const WECHAT_ID = "wxid_tz213yzqzud422"

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

const SERVICES: Service[] = [
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

function ServiceModal({ service, onClose }: { service: Service; onClose: () => void }) {
  const { t } = useLang()
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    document.body.style.overflow = "hidden"
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", handleKey)
    return () => {
      document.body.style.overflow = ""
      document.removeEventListener("keydown", handleKey)
    }
  }, [onClose])

  const waMessage = encodeURIComponent(
    `Hi! I'd like the price and details for the ${t(service.titleKey)}.`
  )
  const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${waMessage}`

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      <div
        role="dialog"
        aria-modal="true"
        aria-label={t(service.titleKey)}
        data-lenis-prevent
        className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl border border-white/10 bg-[#121212] p-8 shadow-2xl md:p-10"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label={t("islandTours.close")}
          className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/5 transition-colors hover:bg-white/10"
        >
          <X className="h-5 w-5 text-white/70" />
        </button>

        <span className="mb-6 inline-block rounded-full bg-luxury-gold/10 px-3 py-1 text-xs font-semibold tracking-widest text-luxury-gold uppercase">
          {t(service.subtitleKey)}
        </span>

        <h3 className="mb-4 font-serif text-2xl leading-snug text-white md:text-3xl">
          {t(service.titleKey)}
        </h3>

        <p className="mb-8 border-b border-white/10 pb-8 text-sm leading-relaxed text-gray-400">
          {t(service.descKey)}
        </p>

        <p className="mb-4 font-medium text-white">{t("card.whatsIncluded")}</p>
        <ul className="mb-8 space-y-3">
          {service.featureKeys.map((key) => (
            <li key={key} className="flex items-start gap-3 text-sm text-gray-300">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-luxury-gold" />
              {t(key)}
            </li>
          ))}
        </ul>

        <div className="mb-8 flex items-baseline gap-2 border-b border-white/10 pb-8">
          <span className="text-sm text-gray-500">
            {service.priceValue ? t("card.startFrom") : t("card.pricing")}:
          </span>
          <span className="text-2xl font-bold text-luxury-gold">
            {service.priceValue ?? t("card.onRequest")}
          </span>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-1 items-center justify-center gap-3 rounded-xl bg-[#25D366] px-6 py-4 font-semibold text-white shadow-lg transition-all hover:scale-[1.02] hover:brightness-110"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            WhatsApp
          </a>
          <button
            onClick={() => {
              navigator.clipboard.writeText(WECHAT_ID)
              setCopied(true)
              setTimeout(() => setCopied(false), 2500)
            }}
            className="flex flex-1 items-center justify-center gap-3 rounded-xl bg-[#07C160] px-6 py-4 font-semibold text-white shadow-lg transition-all hover:scale-[1.02] hover:brightness-110"
          >
            <MessageCircle className="h-5 w-5" />
            {copied ? t("islandTours.copied") : "WeChat"}
          </button>
        </div>
        <p className="mt-4 text-center text-xs text-gray-500">
          WeChat ID: <span className="font-mono text-gray-400">{WECHAT_ID}</span>
        </p>
      </div>
    </div>
  )
}

export default function TourPackages() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [selected, setSelected] = useState<Service | null>(null)
  const { t } = useLang()

  useGSAP(() => {
    gsap.fromTo(
      ".packages-header",
      { y: 30, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: containerRef.current, start: "top 85%" },
      }
    )

    gsap.fromTo(
      ".package-card",
      { y: 40, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.7, stagger: 0.08, ease: "power2.out",
        scrollTrigger: { trigger: containerRef.current, start: "top 75%" },
      }
    )
  }, { scope: containerRef })

  return (
    <>
      <section
        id="packages"
        ref={containerRef}
        className="relative border-t border-white/5 bg-dark-surface px-6 py-24 md:px-12 lg:px-24"
      >
        <div className="absolute top-1/4 right-0 h-[500px] w-[500px] rounded-full bg-luxury-gold/5 blur-[120px] pointer-events-none" />

        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="packages-header mx-auto mb-16 max-w-2xl text-center">
            <span className="mb-4 block text-sm font-medium tracking-wider text-luxury-gold uppercase">
              {t("tours.label")}
            </span>
            <h2 className="mb-6 font-serif text-4xl text-white md:text-5xl">{t("tours.heading")}</h2>
            <p className="text-lg text-gray-400">{t("tours.desc")}</p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map((service) => (
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
                bookHref={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                  `Hi! I'd like to book the ${t(service.titleKey)}.`
                )}`}
                onDetails={() => setSelected(service)}
              />
            ))}
          </div>

          <div className="mt-14 text-center">
            <ContactDropdown
              label={t("tours.contactUs")}
              message="Hi! I'd like to plan a custom trip in Bali."
              variant="gold"
              icon={<ChevronRight className="h-4 w-4" />}
            />
            <p className="mt-4 text-xs text-gray-500">{t("tours.priceNote")}</p>
          </div>
        </div>
      </section>

      {selected && <ServiceModal service={selected} onClose={() => setSelected(null)} />}
    </>
  )
}

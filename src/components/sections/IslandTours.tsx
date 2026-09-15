"use client"

import { useRef, useState, useEffect } from "react"
import Image from "next/image"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Ship, Ticket, Mountain, ArrowRight, X, MessageCircle, Clock, Anchor } from "lucide-react"
import { useLang } from "@/lib/lang"

gsap.registerPlugin(ScrollTrigger)

const WHATSAPP_NUMBER = "62881037512641"
const WECHAT_ID = "wxid_tz213yzqzud422"

interface Departure {
  id: string
  name: string
  labelKey: string
}

interface Trip {
  id: string
  kind: "tour" | "ticket"
  icon: typeof Mountain
  image?: string
  nameKey: string
  taglineKey: string
  badgeKey: string
  detailKeys: string[]
  noteKey: string
  departures?: Departure[]
}

const TRIPS: Trip[] = [
  {
    id: "gili-trawangan",
    kind: "ticket",
    icon: Ticket,
    image: "/assets/tour-gili-trawangan.jpg",
    nameKey: "islandTours.gili.name",
    taglineKey: "islandTours.gili.tagline",
    badgeKey: "islandTours.gili.badge",
    noteKey: "islandTours.ticketNote",
    detailKeys: [
      "islandTours.gili.d1",
      "islandTours.gili.d2",
      "islandTours.gili.d3",
    ],
    departures: [
      { id: "padang-bai", name: "Padang Bai", labelKey: "islandTours.departure.padangBai" },
      { id: "sanur", name: "Sanur", labelKey: "islandTours.departure.sanur" },
    ],
  },
  {
    id: "nusa-penida",
    kind: "tour",
    icon: Mountain,
    image: "/assets/tour-nusa-penida.jpg",
    nameKey: "islandTours.penida.name",
    taglineKey: "islandTours.penida.tagline",
    badgeKey: "islandTours.penida.badge",
    noteKey: "islandTours.tourNote",
    detailKeys: [
      "islandTours.penida.d1",
      "islandTours.penida.d2",
      "islandTours.penida.d3",
      "islandTours.penida.d4",
      "islandTours.penida.d5",
    ],
  },
]

function TripModal({ trip, onClose }: { trip: Trip; onClose: () => void }) {
  const { t } = useLang()
  const [copied, setCopied] = useState(false)
  const [visible, setVisible] = useState(false)
  const [departure, setDeparture] = useState<Departure | null>(null)

  useEffect(() => {
    const frame = requestAnimationFrame(() => setVisible(true))
    document.body.style.overflow = "hidden"

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", handleKey)

    return () => {
      cancelAnimationFrame(frame)
      document.body.style.overflow = ""
      document.removeEventListener("keydown", handleKey)
    }
  }, [onClose])

  const waText = trip.kind === "ticket"
    ? departure
      ? `Hi! I'd like a ${t(trip.nameKey)} departing from ${departure.name}.`
      : `Hi! I'd like a ${t(trip.nameKey)}.`
    : `Hi! I'd like the price and details for the ${t(trip.nameKey)}.`

  const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(waText)}`

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4" onClick={onClose}>
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Modal */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={t(trip.nameKey)}
        // Lenis hijacks the wheel on desktop; this opts the modal out so it scrolls natively
        data-lenis-prevent
        className={`relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-[#121212] border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl transition-all duration-300 ${
          visible ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-4"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label={t("islandTours.close")}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
        >
          <X className="w-5 h-5 text-white/70" />
        </button>

        <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-luxury-gold bg-luxury-gold/10 px-3 py-1 rounded-full mb-6">
          {trip.kind === "ticket" ? <Ticket className="w-3.5 h-3.5" /> : <Ship className="w-3.5 h-3.5" />}
          {t(trip.badgeKey)}
        </span>

        <h3 className="text-2xl md:text-3xl font-serif text-white mb-2 leading-snug">
          {t(trip.nameKey)}
        </h3>
        <p className="text-gray-400 text-sm mb-8 pb-8 border-b border-white/10">
          {t(trip.taglineKey)}
        </p>

        <p className="text-white font-medium mb-4">
          {trip.kind === "ticket" ? t("islandTours.whatYouGet") : t("islandTours.highlights")}
        </p>
        <ul className="space-y-3 mb-8 text-sm text-gray-300">
          {trip.detailKeys.map((key) => (
            <li key={key} className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-luxury-gold mt-1.5 shrink-0" />
              {t(key)}
            </li>
          ))}
        </ul>

        {/* Departure picker (tickets only) */}
        {trip.departures && (
          <div className="mb-8">
            <p className="text-white font-medium mb-4">{t("islandTours.chooseDeparture")}</p>
            <div className="grid grid-cols-2 gap-3">
              {trip.departures.map((dep) => {
                const active = departure?.id === dep.id
                return (
                  <button
                    key={dep.id}
                    type="button"
                    onClick={() => setDeparture(active ? null : dep)}
                    aria-pressed={active}
                    className={`flex items-center gap-2 px-4 py-3 rounded-xl border text-sm font-medium transition-all ${
                      active
                        ? "bg-luxury-gold/15 border-luxury-gold text-white"
                        : "bg-white/5 border-white/10 text-gray-300 hover:bg-white/10 hover:border-white/20"
                    }`}
                  >
                    <Anchor className={`w-4 h-4 shrink-0 ${active ? "text-luxury-gold" : "text-gray-500"}`} />
                    {t(dep.labelKey)}
                  </button>
                )
              })}
            </div>
          </div>
        )}

        <p className="text-gray-400 text-sm mb-8 pb-8 border-b border-white/10">
          {t(trip.noteKey)}
        </p>

        {/* Contact actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-[#25D366] text-white font-semibold hover:brightness-110 hover:scale-[1.02] transition-all shadow-lg"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            WhatsApp
          </a>
          <button
            onClick={() => {
              navigator.clipboard.writeText(WECHAT_ID)
              setCopied(true)
              setTimeout(() => setCopied(false), 2500)
            }}
            className="flex-1 flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-[#07C160] text-white font-semibold hover:brightness-110 hover:scale-[1.02] transition-all shadow-lg"
          >
            <MessageCircle className="w-5 h-5" />
            WeChat
          </button>
        </div>
        <p className="text-center text-gray-500 text-xs mt-4">
          WeChat ID: <span className="text-gray-400 font-mono">{WECHAT_ID}</span>
        </p>

        {/* Toast notification */}
        <div
          className={`absolute left-1/2 -translate-x-1/2 bottom-6 flex items-center gap-2 px-5 py-3 rounded-full bg-luxury-gold text-dark-surface text-sm font-semibold shadow-[0_0_25px_rgba(212,175,55,0.4)] transition-all duration-500 pointer-events-none whitespace-nowrap ${
            copied ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          {t("islandTours.copied")}
        </div>
      </div>
    </div>
  )
}

export default function IslandTours() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null)
  const { t } = useLang()

  useGSAP(() => {
    gsap.fromTo('.island-tour-header',
      { y: 30, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: containerRef.current, start: "top 85%" }
      }
    )

    gsap.fromTo('.island-tour-card',
      { y: 40, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: "power2.out",
        scrollTrigger: { trigger: containerRef.current, start: "top 75%" }
      }
    )
  }, { scope: containerRef })

  return (
    <>
      <section id="tours" ref={containerRef} className="py-24 px-6 md:px-12 lg:px-24 bg-dark-surface relative overflow-hidden border-t border-white/5">
        {/* Background glow */}
        <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-luxury-gold/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="island-tour-header text-center mb-16 max-w-2xl mx-auto">
            <span className="text-luxury-gold font-medium tracking-wider uppercase text-sm mb-4 flex items-center justify-center gap-2">
              <Ship className="w-4 h-4" /> {t("islandTours.label")}
            </span>
            <h2 className="text-4xl md:text-5xl font-serif text-white mb-6">
              {t("islandTours.heading")}
            </h2>
            <p className="text-gray-400 text-lg">
              {t("islandTours.desc")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {TRIPS.map((trip) => {
              const Icon = trip.icon
              return (
                <button
                  key={trip.id}
                  type="button"
                  onClick={() => setSelectedTrip(trip)}
                  className="island-tour-card group text-left glass-dark rounded-2xl overflow-hidden border border-white/5 hover:border-luxury-gold/30 hover:shadow-[0_0_30px_rgba(212,175,55,0.07)] transition-all cursor-pointer flex flex-col"
                >
                  {/* Visual */}
                  <div className={`relative w-full overflow-hidden bg-gradient-to-br from-luxury-gold/15 via-white/5 to-transparent ${trip.image ? "aspect-[16/10]" : "h-36"}`}>
                    {trip.image ? (
                      <Image
                        src={trip.image}
                        alt={t(trip.nameKey)}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Icon className="w-14 h-14 text-luxury-gold/25 transition-transform duration-700 group-hover:scale-110" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
                    <span className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold text-white bg-black/50 backdrop-blur-sm border border-white/15">
                      {trip.kind === "ticket"
                        ? <Ticket className="w-3.5 h-3.5 text-luxury-gold" />
                        : <Clock className="w-3.5 h-3.5 text-luxury-gold" />}
                      {t(trip.badgeKey)}
                    </span>
                  </div>

                  {/* Body */}
                  <div className="p-8 flex-1 flex flex-col">
                    <h3 className="text-2xl font-serif text-white mb-1">{t(trip.nameKey)}</h3>
                    <p className="text-luxury-gold text-sm mb-6">{t(trip.taglineKey)}</p>

                    <ul className="space-y-3 mb-6 flex-1">
                      {trip.detailKeys.map((key) => (
                        <li key={key} className="flex items-start gap-3 text-sm text-gray-300">
                          <div className="w-1.5 h-1.5 rounded-full bg-luxury-gold mt-1.5 shrink-0" />
                          {t(key)}
                        </li>
                      ))}
                    </ul>

                    {/* Departure options preview */}
                    {trip.departures && (
                      <div className="flex flex-wrap gap-2 mb-6">
                        {trip.departures.map((dep) => (
                          <span
                            key={dep.id}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-white/5 border border-white/10 text-gray-300"
                          >
                            <Anchor className="w-3 h-3 text-luxury-gold" />
                            {t(dep.labelKey)}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-6 border-t border-white/5">
                      <span className="text-white font-medium group-hover:text-luxury-gold transition-colors">
                        {t("islandTours.tapForPrice")}
                      </span>
                      <ArrowRight className="w-5 h-5 text-luxury-gold group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {selectedTrip && (
        <TripModal trip={selectedTrip} onClose={() => setSelectedTrip(null)} />
      )}
    </>
  )
}

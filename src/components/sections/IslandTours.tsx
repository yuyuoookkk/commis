"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Ticket, Clock, ArrowRight, Anchor, Check } from "lucide-react"
import { useLang } from "@/lib/lang"
import SectionHeading from "@/components/ui/SectionHeading"
import Modal from "@/components/ui/Modal"
import ContactActions from "@/components/ui/ContactActions"

gsap.registerPlugin(ScrollTrigger)

interface Departure {
  id: string
  name: string
  labelKey: string
}

interface Trip {
  id: string
  kind: "tour" | "ticket"
  image: string
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
    image: "/assets/tour-gili-trawangan.jpg",
    nameKey: "islandTours.gili.name",
    taglineKey: "islandTours.gili.tagline",
    badgeKey: "islandTours.gili.badge",
    noteKey: "islandTours.ticketNote",
    detailKeys: ["islandTours.gili.d1", "islandTours.gili.d2", "islandTours.gili.d3"],
    departures: [
      { id: "padang-bai", name: "Padang Bai", labelKey: "islandTours.departure.padangBai" },
      { id: "sanur", name: "Sanur", labelKey: "islandTours.departure.sanur" },
    ],
  },
  {
    id: "nusa-penida",
    kind: "tour",
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
  const [departure, setDeparture] = useState<Departure | null>(null)

  const waText =
    trip.kind === "ticket"
      ? departure
        ? `Hi! I'd like a ${t(trip.nameKey)} departing from ${departure.name}.`
        : `Hi! I'd like a ${t(trip.nameKey)}.`
      : `Hi! I'd like the price and details for the ${t(trip.nameKey)}.`

  return (
    <Modal label={t(trip.nameKey)} closeLabel={t("islandTours.close")} onClose={onClose}>
      <span className="eyebrow">{t(trip.badgeKey)}</span>

      <h3 className="display mt-3 text-2xl leading-tight text-white md:text-3xl">
        {t(trip.nameKey)}
      </h3>
      <p className="mt-2 border-b border-line pb-7 text-sm text-white/50">{t(trip.taglineKey)}</p>

      <p className="mt-7 mb-4 font-medium text-white">
        {trip.kind === "ticket" ? t("islandTours.whatYouGet") : t("islandTours.highlights")}
      </p>
      <ul className="mb-7 space-y-3">
        {trip.detailKeys.map((key) => (
          <li key={key} className="flex items-start gap-3 text-sm text-white/60">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
            {t(key)}
          </li>
        ))}
      </ul>

      {trip.departures && (
        <div className="mb-7">
          <p className="mb-4 font-medium text-white">{t("islandTours.chooseDeparture")}</p>
          <div className="grid grid-cols-2 gap-3">
            {trip.departures.map((dep) => {
              const active = departure?.id === dep.id
              return (
                <button
                  key={dep.id}
                  type="button"
                  onClick={() => setDeparture(active ? null : dep)}
                  aria-pressed={active}
                  className={`flex cursor-pointer items-center gap-2 rounded-lg border px-4 py-3 text-sm font-medium transition-all ${
                    active
                      ? "border-brand bg-brand-soft text-white"
                      : "border-line-strong text-white/70 hover:border-white/30 hover:bg-white/5"
                  }`}
                >
                  <Anchor className={`h-4 w-4 shrink-0 ${active ? "text-brand" : "text-white/35"}`} />
                  {t(dep.labelKey)}
                </button>
              )
            })}
          </div>
        </div>
      )}

      <p className="mb-7 border-b border-line pb-7 text-sm leading-relaxed text-white/45">
        {t(trip.noteKey)}
      </p>

      <ContactActions message={waText} copiedLabel={t("islandTours.copied")} />
    </Modal>
  )
}

export default function IslandTours() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null)
  const { t } = useLang()

  useGSAP(() => {
    gsap.fromTo(
      ".island-tour-card",
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
    <>
      <section
        id="tours"
        ref={containerRef}
        className="border-t border-line bg-ink px-6 py-24 md:px-12 lg:px-24"
      >
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow={t("islandTours.label")}
            title={t("islandTours.heading")}
            description={t("islandTours.desc")}
            className="mb-12"
          />

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {TRIPS.map((trip) => (
              <button
                key={trip.id}
                type="button"
                onClick={() => setSelectedTrip(trip)}
                className="island-tour-card group flex cursor-pointer flex-col rounded-xl border border-line bg-surface p-3 text-left transition-colors hover:border-brand/40"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg bg-surface-2">
                  <Image
                    src={trip.image}
                    alt={t(trip.nameKey)}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute top-2 left-2 flex items-center gap-1.5 rounded bg-black/65 px-2 py-1 text-[10px] font-semibold tracking-wider text-white uppercase backdrop-blur-sm">
                    {trip.kind === "ticket" ? (
                      <Ticket className="h-3 w-3 text-brand" />
                    ) : (
                      <Clock className="h-3 w-3 text-brand" />
                    )}
                    {t(trip.badgeKey)}
                  </span>
                </div>

                <div className="flex flex-1 flex-col px-2 pt-5 pb-2">
                  <h3 className="display text-2xl text-white">{t(trip.nameKey)}</h3>
                  <p className="mt-1 text-sm text-brand">{t(trip.taglineKey)}</p>

                  <ul className="mt-5 mb-5 space-y-2.5">
                    {trip.detailKeys.map((key) => (
                      <li key={key} className="flex items-start gap-2 text-sm text-white/60">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                        {t(key)}
                      </li>
                    ))}
                  </ul>

                  {trip.departures && (
                    <div className="mb-5 flex flex-wrap gap-2">
                      {trip.departures.map((dep) => (
                        <span
                          key={dep.id}
                          className="inline-flex items-center gap-1.5 rounded border border-line-strong px-2.5 py-1.5 text-[11px] font-medium text-white/60"
                        >
                          <Anchor className="h-3 w-3 text-brand" />
                          {t(dep.labelKey)}
                        </span>
                      ))}
                    </div>
                  )}

                  <span className="mt-auto flex items-center justify-between border-t border-line pt-4 text-xs font-bold tracking-widest text-white/70 uppercase transition-colors group-hover:text-brand">
                    {t("islandTours.tapForPrice")}
                    <ArrowRight className="h-4 w-4 text-brand transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {selectedTrip && <TripModal trip={selectedTrip} onClose={() => setSelectedTrip(null)} />}
    </>
  )
}

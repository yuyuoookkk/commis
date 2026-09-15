"use client"

import { useRef, useState } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Plane, Map, ArrowRight, Check } from "lucide-react"
import SectionHeading from "@/components/ui/SectionHeading"
import Modal from "@/components/ui/Modal"
import ContactActions from "@/components/ui/ContactActions"
import ContactDropdown from "@/components/ui/ContactDropdown"

gsap.registerPlugin(ScrollTrigger)

interface ListingItem {
  route: string
  price: string
  duration?: string
  type: "transfer" | "tour"
}

const transfers: ListingItem[] = [
  { route: "Airport → Kuta / Legian", price: "200k", type: "transfer" },
  { route: "Airport → Nusa Dua", price: "250k", type: "transfer" },
  { route: "Airport → Sanur", price: "250k", type: "transfer" },
  { route: "Airport → Umalas / Kerobokan / Seminyak", price: "300k", type: "transfer" },
  { route: "Airport → Canggu", price: "400k", type: "transfer" },
  { route: "Airport → Ubud", price: "400k", type: "transfer" },
  { route: "Airport → Kintamani", price: "600k", type: "transfer" },
  { route: "Airport → Lovina", price: "700k", type: "transfer" },
  { route: "Airport → Amed", price: "600k", type: "transfer" },
  { route: "Airport → Tulamben", price: "700k", type: "transfer" },
  { route: "Sanur → Kuta / Legian", price: "200k", type: "transfer" },
  { route: "Sanur → Seminyak", price: "250k", type: "transfer" },
  { route: "Sanur → Berawa / Canggu", price: "400k", type: "transfer" },
  { route: "Sanur → Nusa Dua", price: "300k", type: "transfer" },
  { route: "Sanur → Uluwatu", price: "400k", type: "transfer" },
  { route: "Sanur → Jimbaran", price: "250k", type: "transfer" },
  { route: "Sanur → Ubud Central", price: "300k", type: "transfer" },
]

const tours: ListingItem[] = [
  { route: "Kuta / Uluwatu Tour", duration: "10 hours", price: "600k", type: "tour" },
  { route: "Kuta / Ubud Tour", duration: "10 hours", price: "700k", type: "tour" },
  { route: "Ubud Tour", duration: "10 hours", price: "600k", type: "tour" },
  { route: "Kuta → Kintamani Tour", duration: "10 hours", price: "800k", type: "tour" },
]

const INCLUSIONS = [
  "Professional English-speaking driver",
  "Comfortable air-conditioned vehicle",
  "All fuel & parking included",
]

function RateList({
  items,
  icon: Icon,
  title,
  onSelect,
}: {
  items: ListingItem[]
  icon: typeof Plane
  title: string
  onSelect: (item: ListingItem) => void
}) {
  return (
    <div>
      <div className="mb-6 flex items-center gap-3 border-b border-line pb-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-md bg-brand-soft">
          <Icon className="h-4.5 w-4.5 text-brand" />
        </div>
        <h3 className="display text-xl text-white">{title}</h3>
      </div>

      <div className="space-y-1">
        {items.map((item) => (
          <button
            key={item.route}
            type="button"
            onClick={() => onSelect(item)}
            className="pricing-item group flex w-full cursor-pointer items-center justify-between gap-4 rounded-lg border border-transparent px-4 py-3 text-left transition-colors hover:border-line hover:bg-surface"
          >
            <span>
              <span className="block text-sm text-white/70 transition-colors group-hover:text-white">
                {item.route}
              </span>
              {item.duration && (
                <span className="text-[11px] tracking-wider text-white/35 uppercase">
                  {item.duration}
                </span>
              )}
            </span>
            <span className="flex shrink-0 items-center gap-2.5">
              <span className="text-sm font-bold text-brand">IDR {item.price}</span>
              <ArrowRight className="h-4 w-4 text-transparent transition-colors group-hover:text-brand" />
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default function Pricing() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [selectedItem, setSelectedItem] = useState<ListingItem | null>(null)

  useGSAP(() => {
    gsap.fromTo(
      ".pricing-item",
      { x: -16, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        stagger: 0.04,
        duration: 0.45,
        ease: "power2.out",
        scrollTrigger: { trigger: containerRef.current, start: "top 75%" },
      }
    )
  }, { scope: containerRef })

  return (
    <>
      <section
        id="pricing"
        ref={containerRef}
        className="border-t border-line bg-ink px-6 py-24 md:px-12 lg:px-24"
      >
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            eyebrow="Transparent Rates"
            title="Fixed Prices, No Surprises"
            description="Published rates for airport transfers and full-day charters. Tap any route for what's included and to book it."
            className="mb-14"
          />

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
            <RateList
              items={transfers}
              icon={Plane}
              title="Airport & Hotel Transfers"
              onSelect={setSelectedItem}
            />

            <div>
              <RateList items={tours} icon={Map} title="Charters & Day Tours" onSelect={setSelectedItem} />

              <div className="mt-8 flex flex-col items-start justify-between gap-5 rounded-xl border border-dashed border-brand/35 bg-brand-soft p-6 sm:flex-row sm:items-center">
                <div>
                  <h4 className="display text-lg text-white">Looking for a custom route?</h4>
                  <p className="mt-1 text-sm text-white/50">We can tailor a journey just for you.</p>
                </div>
                <ContactDropdown
                  label="Contact Us"
                  variant="small"
                  message="Hi! I'd like to discuss a custom route."
                  className="shrink-0 whitespace-nowrap"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {selectedItem && (
        <Modal label={selectedItem.route} onClose={() => setSelectedItem(null)}>
          <span className="eyebrow">
            {selectedItem.type === "transfer" ? "Airport Transfer" : "Charter Tour"}
          </span>

          <h3 className="display mt-3 text-2xl leading-tight text-white md:text-3xl">
            {selectedItem.route}
          </h3>
          {selectedItem.duration && (
            <p className="mt-2 text-[11px] tracking-wider text-white/40 uppercase">
              {selectedItem.duration}
            </p>
          )}

          <div className="mt-5 mb-7 flex items-baseline gap-2 border-b border-line pb-7">
            <span className="display text-4xl text-brand">IDR {selectedItem.price}</span>
            <span className="text-sm text-white/40">/vehicle</span>
          </div>

          <ul className="mb-8 space-y-3">
            {INCLUSIONS.map((inclusion) => (
              <li key={inclusion} className="flex items-start gap-3 text-sm text-white/60">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                {inclusion}
              </li>
            ))}
          </ul>

          <ContactActions
            message={`Hi! I'm interested in booking: ${selectedItem.route} (IDR ${selectedItem.price}).`}
          />
        </Modal>
      )}
    </>
  )
}

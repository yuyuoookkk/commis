"use client"

import { useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import {
  Clock,
  Sun,
  Ship,
  Anchor,
  Plane,
  Heart,
  Car,
  ChevronRight,
  Sparkles,
} from "lucide-react"

const SERVICES = [
  {
    id: 1,
    title: "Full Day Tour",
    subtitle: "Max 10 Hours",
    desc: "Maximum 10 hours of exploration. Includes petrol, car, and driver. All cars are newest models starting from 2022.",
    icon: Sun,
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=1400",
    features: ["Petrol included", "Private driver", "Newest car models"],
  },
  {
    id: 2,
    title: "Half Day Tour",
    subtitle: "Max 6 Hours",
    desc: "Maximum 6 hours of sightseeing. Includes petrol, car, and driver. All cars are newest models starting from 2022.",
    icon: Clock,
    image: "https://images.unsplash.com/photo-1555400038-63f5ba517a47?auto=format&fit=crop&q=80&w=1400",
    features: ["Petrol included", "Private driver", "Newest car models"],
  },
  {
    id: 3,
    title: "Shuttle Penida Island",
    subtitle: "Transfer Service",
    desc: "Transportation only, from hotel to harbour and harbour back to hotel.",
    icon: Ship,
    image: "https://images.unsplash.com/photo-1468413253725-0d5181091126?auto=format&fit=crop&q=80&w=1400",
    features: ["Hotel pickup", "Harbour drop‑off", "Return transfer"],
  },
  {
    id: 4,
    title: "Full Package Penida Island",
    subtitle: "One Day Trip",
    desc: "All-inclusive package: transportation, round-trip boat ticket, and private car with driver on Penida Island.",
    icon: Anchor,
    image: "https://images.unsplash.com/photo-1537956965359-7573183d1f57?auto=format&fit=crop&q=80&w=1400",
    features: ["All‑inclusive", "Boat ticket", "Private car on island"],
  },
  {
    id: 5,
    title: "Airport & Hotel Transfer",
    subtitle: "Check In / Check Out",
    desc: "Premium service including mineral water and newest car, waiting at the airport or hotel.",
    icon: Plane,
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=1400",
    features: ["Mineral water", "Newest car", "Meet & greet"],
  },
  {
    id: 6,
    title: "Wedding Vehicle",
    subtitle: "Special Occasions",
    desc: "Private vehicle that can be customised and decorated as per request for wedding occasions.",
    icon: Heart,
    image: "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&q=80&w=1400",
    features: ["Custom decoration", "Private vehicle", "Wedding‑ready"],
  },
  {
    id: 7,
    title: "Rent Car",
    subtitle: "Self‑Drive",
    desc: "Self-drive rental with our newest car models.",
    icon: Car,
    image: "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&q=80&w=1400",
    features: ["Self‑drive", "Newest models", "Flexible rental"],
  },
]

export default function TourPackages() {
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  return (
    <section id="tours" className="py-28 md:py-36 bg-[#F5F1E7] text-[#111111] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-20">
          <h2 className="text-[#C28B6A] uppercase tracking-widest text-xs font-bold mb-4">Our Services</h2>
          <h3 className="font-serif text-4xl md:text-5xl text-[#16425B] leading-tight mb-6">
            Tours & Packages
          </h3>
          <p className="text-[#111]/60 text-base md:text-lg leading-relaxed">
            From full-day island adventures to airport transfers and wedding rides — everything you need for the perfect Bali experience.
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map((service) => {
            const Icon = service.icon
            const isHovered = hoveredId === service.id
            return (
                <div
                  key={service.id}
                  className={cn(
                    "group relative bg-white rounded-3xl overflow-hidden border border-black/5 flex flex-col",
                    "hover:shadow-2xl hover:shadow-black/8 hover:-translate-y-1.5 transition-all duration-500",
                    // Make the first and last item span 2 columns on lg to fill the grid without spaces
                    (service.id === 1 || service.id === 7) && "lg:col-span-2"
                  )}
                  onMouseEnter={() => setHoveredId(service.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  {/* Image */}
                  <div className={cn(
                    "relative w-full overflow-hidden shrink-0 min-h-[240px]",
                    (service.id === 1 || service.id === 7) ? "aspect-[16/9]" : "aspect-[4/3]"
                  )}>
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      sizes={(service.id === 1 || service.id === 7) ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 100vw, 33vw"}
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    {/* Subtle gradient overlay on image */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

                    {/* Duration/subtitle badge */}
                    <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm shadow-sm">
                      <Icon className="w-3.5 h-3.5 text-[#C28B6A]" />
                      <span className="text-xs font-semibold text-[#16425B]">{service.subtitle}</span>
                    </div>
                  </div>

                {/* Content */}
                <div className="p-6 md:p-7 flex-1 flex flex-col">
                  <h4 className={cn(
                    "font-serif text-[#16425B] mb-2 leading-tight",
                    service.id === 1 ? "text-2xl md:text-3xl" : "text-xl md:text-2xl"
                  )}>
                    {service.title}
                  </h4>
                  <p className="text-[#111]/55 text-sm leading-relaxed mb-5 flex-1">
                    {service.desc}
                  </p>

                  {/* Feature pills */}
                  <div className="flex flex-wrap gap-2">
                    {service.features.map((feat, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 rounded-full text-[11px] font-medium bg-[#F5F1E7] text-[#16425B]/80 border border-[#C28B6A]/15"
                      >
                        {feat}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Contact CTA */}
        <div className="mt-14 md:mt-20 text-center">
          <a
            href="https://wa.me/6281234567890"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#16425B] hover:bg-[#1d5475] text-white font-semibold text-sm transition-all duration-300 hover:shadow-xl hover:shadow-[#16425B]/20 hover:-translate-y-0.5"
          >
            Contact Us for Pricing
            <ChevronRight className="w-4 h-4" />
          </a>
          <p className="text-[#111]/40 text-xs mt-4">Prices vary by season and group size. Reach out for a personalized quote.</p>
        </div>
      </div>
    </section>
  )
}

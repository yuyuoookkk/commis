"use client"

import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Users, Briefcase, Zap } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

const vehicles = [
  {
    name: "Premium SUV",
    model: "Toyota Fortuner / Innova Zenix",
    image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=800&auto=format&fit=crop", // placeholder SUV
    passengers: 6,
    luggage: 4,
    features: ["Leather Seats", "Extra Legroom", "Dual Climate AC"]
  },
  {
    name: "Luxury Minivan",
    model: "Toyota Alphard / Vellfire",
    image: "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?q=80&w=800&auto=format&fit=crop", // placeholder Luxury car
    passengers: 5,
    luggage: 3,
    features: ["Captain Seats", "Massage Functions", "Premium Audio"]
  },
  {
    name: "Group Minibus",
    model: "Toyota Hiace Commuter",
    image: "https://images.unsplash.com/photo-1541897855018-0902c2db2c90?q=80&w=800&auto=format&fit=crop", // placeholder Minibus/Van
    passengers: 12,
    luggage: 8,
    features: ["Spacious Interior", "Reclining Seats", "Overhead AC"]
  }
]

export default function Fleet() {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    gsap.fromTo('.fleet-header',
      { y: 30, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.8,
        scrollTrigger: { trigger: containerRef.current, start: "top 80%" }
      }
    )

    gsap.fromTo('.fleet-card',
      { y: 40, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: "power2.out",
        scrollTrigger: { trigger: containerRef.current, start: "top 70%" }
      }
    )
  }, { scope: containerRef })

  return (
    <section ref={containerRef} className="py-24 px-6 md:px-12 lg:px-24 bg-dark-surface relative border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="fleet-header text-center mb-16 max-w-2xl mx-auto">
          <span className="text-luxury-gold font-medium tracking-wider uppercase text-sm mb-4 block">
            Our Fleet
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-white mb-6">
            Travel in Comfort
          </h2>
          <p className="text-gray-400 text-lg">
            Choose from our selection of well-maintained, premium vehicles designed to make your journey across Bali as comfortable as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {vehicles.map((vehicle, index) => (
            <div key={index} className="fleet-card glass-dark rounded-2xl overflow-hidden group border border-white/5 hover:border-luxury-gold/30 transition-colors">
              <div className="h-64 overflow-hidden relative">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url(${vehicle.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent opacity-80" />
              </div>
              
              <div className="p-8 relative -mt-10">
                <div className="bg-[#1a1a1a] rounded-xl p-6 border border-white/10 shadow-xl relative z-10">
                  <h3 className="text-2xl font-serif text-white mb-1">{vehicle.name}</h3>
                  <p className="text-luxury-gold text-sm mb-6">{vehicle.model}</p>
                  
                  <div className="flex items-center gap-6 mb-6 pb-6 border-b border-white/5">
                    <div className="flex items-center gap-2 text-gray-400">
                      <Users className="w-5 h-5 text-luxury-gold" />
                      <span>{vehicle.passengers} Pax</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400">
                      <Briefcase className="w-5 h-5 text-luxury-gold" />
                      <span>{vehicle.luggage} Bags</span>
                    </div>
                  </div>
                  
                  <ul className="space-y-3">
                    {vehicle.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-gray-300">
                        <Zap className="w-4 h-4 text-luxury-gold" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

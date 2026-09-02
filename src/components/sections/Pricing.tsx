"use client"

import { useRef, useState, useEffect } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Plane, Map, ArrowRight, X, MessageCircle } from "lucide-react"
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
]

const tours: ListingItem[] = [
  { route: "Kuta / Uluwatu Tour", duration: "10 hours", price: "600k", type: "tour" },
  { route: "Kuta / Ubud Tour", duration: "10 hours", price: "700k", type: "tour" },
  { route: "Ubud Tour", duration: "10 hours", price: "600k", type: "tour" },
  { route: "Kuta → Kintamani Tour", duration: "10 hours", price: "800k", type: "tour" },
]

const WHATSAPP_NUMBER = "62881037512641"
const WECHAT_ID = "wxid_tz213yzqzud422"

function DetailModal({ item, onClose }: { item: ListingItem; onClose: () => void }) {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => { document.body.style.overflow = "" }
  }, [])

  const waMessage = encodeURIComponent(
    `Hi! I'm interested in booking: ${item.route} (IDR ${item.price}).`
  )
  const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${waMessage}`

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4" onClick={onClose}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative w-full max-w-lg bg-[#121212] border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl animate-[modalIn_0.3s_ease-out]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
        >
          <X className="w-5 h-5 text-white/70" />
        </button>

        {/* Badge */}
        <span className="inline-block text-xs font-semibold uppercase tracking-widest text-luxury-gold bg-luxury-gold/10 px-3 py-1 rounded-full mb-6">
          {item.type === "transfer" ? "Airport Transfer" : "Charter Tour"}
        </span>

        {/* Route */}
        <h3 className="text-2xl md:text-3xl font-serif text-white mb-2 leading-snug">
          {item.route}
        </h3>
        {item.duration && (
          <p className="text-gray-500 text-sm uppercase tracking-wider mb-4">{item.duration}</p>
        )}

        {/* Price */}
        <div className="flex items-baseline gap-2 mb-8 pb-8 border-b border-white/10">
          <span className="text-4xl font-bold text-luxury-gold">IDR {item.price}</span>
          <span className="text-gray-500 text-sm">/vehicle</span>
        </div>

        {/* Features */}
        <ul className="space-y-3 mb-10 text-sm text-gray-300">
          <li className="flex items-center gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-luxury-gold" />
            Professional English-speaking driver
          </li>
          <li className="flex items-center gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-luxury-gold" />
            Comfortable Air-Conditioned Vehicle
          </li>
          <li className="flex items-center gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-luxury-gold" />
            All Fuel &amp; Parking Included
          </li>
        </ul>

        {/* CTA Buttons */}
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
          WeChat ID Copied!
        </div>
      </div>
    </div>
  )
}

export default function Pricing() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [selectedItem, setSelectedItem] = useState<ListingItem | null>(null)
  
  useGSAP(() => {
    gsap.fromTo('.pricing-header',
      { y: 30, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: containerRef.current, start: "top 85%" }
      }
    )

    gsap.fromTo('.pricing-item',
      { x: -20, opacity: 0 },
      {
        x: 0, opacity: 1, stagger: 0.05, duration: 0.5, ease: "power2.out",
        scrollTrigger: { trigger: containerRef.current, start: "top 75%" }
      }
    )
  }, { scope: containerRef })

  return (
    <>
      <section id="pricing" ref={containerRef} className="py-24 px-6 md:px-12 lg:px-24 relative bg-[#0a0a0a]">
        {/* Background glow */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-luxury-gold/5 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="pricing-header text-center mb-16 max-w-2xl mx-auto">
            <span className="text-luxury-gold font-medium tracking-wider uppercase text-sm mb-4 block">
              Transparent Rates
            </span>
            <h2 className="text-4xl md:text-5xl font-serif text-white mb-6">
              Our Pricing
            </h2>
            <p className="text-gray-400 text-lg">
              Competitive and transparent pricing for airport transfers and curated day tours across Bali. Tap any listing to book instantly.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
            
            {/* Airport Transfers */}
            <div>
              <div className="flex items-center gap-3 mb-8 pb-4 border-b border-white/10">
                <div className="p-2 bg-luxury-gold/10 rounded-lg">
                  <Plane className="w-6 h-6 text-luxury-gold" />
                </div>
                <h3 className="text-2xl font-serif text-white">Airport Transfers</h3>
              </div>
              
              <div className="space-y-2">
                {transfers.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => setSelectedItem(item)}
                    className="pricing-item group flex items-center justify-between p-4 rounded-xl hover:bg-white/5 transition-all cursor-pointer border border-transparent hover:border-luxury-gold/20 hover:shadow-[0_0_15px_rgba(212,175,55,0.05)]"
                  >
                    <span className="text-gray-300 group-hover:text-white transition-colors">
                      {item.route}
                    </span>
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-luxury-gold text-lg">
                        IDR {item.price}
                      </span>
                      <ArrowRight className="w-4 h-4 text-white/0 group-hover:text-luxury-gold transition-colors" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Charters & Tours */}
            <div>
              <div className="flex items-center gap-3 mb-8 pb-4 border-b border-white/10">
                <div className="p-2 bg-luxury-gold/10 rounded-lg">
                  <Map className="w-6 h-6 text-luxury-gold" />
                </div>
                <h3 className="text-2xl font-serif text-white">Charters & Tours</h3>
              </div>
              
              <div className="space-y-2">
                {tours.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => setSelectedItem(item)}
                    className="pricing-item group flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl hover:bg-white/5 transition-all cursor-pointer border border-transparent hover:border-luxury-gold/20 hover:shadow-[0_0_15px_rgba(212,175,55,0.05)] gap-2 sm:gap-0"
                  >
                    <div>
                      <span className="block text-gray-300 group-hover:text-white transition-colors">
                        {item.route}
                      </span>
                      <span className="text-xs text-gray-500 uppercase tracking-wider">
                        {item.duration}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-luxury-gold text-lg">
                        IDR {item.price}
                      </span>
                      <ArrowRight className="w-4 h-4 text-white/0 group-hover:text-luxury-gold transition-colors" />
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 p-6 rounded-xl border border-luxury-gold/20 bg-luxury-gold/5 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h4 className="text-white font-medium mb-1">Looking for a custom route?</h4>
                  <p className="text-sm text-gray-400">We can tailor a journey just for you.</p>
                </div>
                <ContactDropdown
                  label="Contact Us"
                  variant="small"
                  message="Hi! I'd like to discuss a custom route."
                  icon={<ArrowRight className="w-4 h-4" />}
                  className="whitespace-nowrap px-6 py-2.5 rounded-lg text-sm"
                />
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* Detail Modal */}
      {selectedItem && (
        <DetailModal item={selectedItem} onClose={() => setSelectedItem(null)} />
      )}

      <style jsx global>{`
        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.95) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </>
  )
}

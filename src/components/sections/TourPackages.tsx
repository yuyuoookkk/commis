"use client"

import Image from "next/image"
import { ArrowRight, Clock, Star } from "lucide-react"
import { cn } from "@/lib/utils"

const PACKAGES = [
  {
    id: 1,
    title: "Bali Honeymoon Escape",
    desc: "A romantic 7-day journey across Bali's most intimate locations, featuring private pool villas, sunset dinners, and couple's spa treatments.",
    price: "IDR 15,000,000",
    image: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&q=80&w=1200",
    featured: true,
    rating: 4.9,
    reviews: 124,
    duration: "7 Days"
  },
  {
    id: 2,
    title: "Mt. Agung Trekking",
    desc: "Challenge yourself with a guided sunrise trek up Bali's highest and most sacred volcano.",
    price: "IDR 850,000",
    image: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&q=80&w=800",
    featured: false,
    rating: 4.8,
    reviews: 86,
    duration: "1 Day"
  },
  {
    id: 3,
    title: "Temple & Culture Tour",
    desc: "Immerse in Bali's spiritual heritage visiting Lempuyang, Besakih, and Tirta Empul.",
    price: "IDR 600,000",
    image: "https://images.unsplash.com/photo-1537956965359-7573183d1f57?auto=format&fit=crop&q=80&w=800",
    featured: false,
    rating: 5.0,
    reviews: 312,
    duration: "1 Day"
  },
  {
    id: 4,
    title: "Beach & Sunset Escapade",
    desc: "Discover hidden beaches and enjoy an epic sunset dinner in Jimbaran Bay.",
    price: "IDR 550,000",
    image: "https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?auto=format&fit=crop&q=80&w=800",
    featured: false,
    rating: 4.7,
    reviews: 198,
    duration: "Full Day"
  },
  {
    id: 5,
    title: "Ubud Culture & Swing",
    desc: "Experience the heart of Bali with sprawling rice terraces, local artisans, and the iconic jungle swing.",
    price: "IDR 650,000",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=800",
    featured: false,
    rating: 4.9,
    reviews: 420,
    duration: "Full Day"
  },
  {
    id: 6,
    title: "Nusa Penida Adventure",
    desc: "Take a fast boat to explore dramatic cliffs, pristine beaches, and swim with manta rays.",
    price: "IDR 1,100,000",
    image: "https://images.unsplash.com/photo-1505881502353-a1986add3762?auto=format&fit=crop&q=80&w=800",
    featured: false,
    rating: 4.8,
    reviews: 315,
    duration: "Full Day"
  }
]

export default function TourPackages() {
  return (
    <section id="tours" className="py-32 bg-[#F5F1E7] text-[#111111]">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-20 animate-in fade-in slide-in-from-bottom-8 duration-1000 ease-out">
          <h2 className="text-[#C28B6A] uppercase tracking-widest text-xs font-bold mb-4">Curated Experiences</h2>
          <h3 className="font-serif text-4xl md:text-5xl text-[#16425B] leading-tight mb-6">
            Journeys crafted with passion
          </h3>
          <p className="text-[#111]/70">
            From sacred temples to sun-soaked beaches, discover our signature packages designed to give you an unforgettable Bali experience.
          </p>
        </div>

        {/* Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PACKAGES.map((pkg, i) => (
            <div 
              key={pkg.id}
              className={cn(
                "group relative bg-white rounded-3xl overflow-hidden hover:shadow-2xl hover:shadow-black/5 hover:-translate-y-2 transition-all duration-500 border border-black/5 flex flex-col",
                pkg.featured ? "md:col-span-2 md:row-span-2" : "md:col-span-1"
              )}
            >
              {/* Image Section */}
              <div className={cn("relative w-full overflow-hidden", pkg.featured ? "aspect-[16/9] md:aspect-auto md:h-[60%]" : "aspect-[4/3]")}>
                <Image src={pkg.image} alt={pkg.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                <div className="absolute top-4 left-4 glass px-3 py-1.5 rounded-full flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-[#C28B6A] text-[#C28B6A]" />
                  <span className="text-xs font-medium text-white">{pkg.rating} <span className="text-white/80 font-normal">({pkg.reviews})</span></span>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-8 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-[#C28B6A] mb-3 text-xs font-bold uppercase tracking-wider">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{pkg.duration}</span>
                  </div>
                  <h4 className={cn("font-serif text-[#16425B] mb-3", pkg.featured ? "text-3xl" : "text-xl")}>
                    {pkg.title}
                  </h4>
                  <p className="text-[#111]/60 text-sm leading-relaxed mb-6">
                    {pkg.desc}
                  </p>
                </div>
                
                <div className="flex flex-wrap items-end justify-between gap-4 mt-auto">
                  <div>
                    <span className="text-xs text-[#111]/50 block mb-1">Starting from</span>
                    <span className="font-semibold text-lg text-[#16425B]">{pkg.price}</span>
                    <span className="text-xs text-[#111]/50 ml-1">/ person</span>
                  </div>
                  
                  <button className="bg-[#16425B] hover:bg-[#2D4A3E] text-white px-6 py-3 rounded-full text-sm font-semibold transition-colors flex items-center gap-2">
                    View Details
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  )
}

"use client"

import Image from "next/image"
import { ArrowRight } from "lucide-react"

const MOMENTS = [
  {
    id: 1,
    title: "Sacred Cleansing",
    caption: "Tirta Empul Temple",
    image: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&q=80&w=1200",
  },
  {
    id: 2,
    title: "Morning Light",
    caption: "Tegalalang Rice Terrace",
    image: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&q=80&w=1200",
  },
  {
    id: 3,
    title: "Hidden Waterfalls",
    caption: "Sekumpul Waterfall",
    image: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&q=80&w=1200",
  },
  {
    id: 4,
    title: "Golden Hour Trek",
    caption: "Mount Batur",
    image: "https://images.unsplash.com/photo-1537956965359-7573183d1f57?auto=format&fit=crop&q=80&w=1200",
  }
]

export default function FeaturedMoments() {
  return (
    <section id="gallery" className="relative py-32 bg-[#0a0a0a] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="max-w-2xl">
          <h2 className="text-[#C28B6A] uppercase tracking-widest text-xs font-bold mb-4">Featured Moments</h2>
          <h3 className="font-serif text-4xl md:text-5xl text-white leading-tight">
            Curated experiences for the <br className="hidden md:block"/> soulful traveler.
          </h3>
        </div>
        <p className="text-white/60 max-w-sm text-sm">
          A collection of unscripted moments, dramatic landscapes, and profound cultural encounters waiting for you in Bali.
        </p>
      </div>

      {/* Horizontal Scroll Gallery */}
      <div className="w-full flex overflow-x-auto snap-x snap-mandatory hide-scroll pl-6 md:pl-[calc((100vw-80rem)/2+1.5rem)] pr-6 pb-8 gap-6 pt-4">
        {MOMENTS.map((moment) => (
          <div 
            key={moment.id} 
            className="relative shrink-0 w-[85vw] md:w-[600px] aspect-[4/5] md:aspect-[16/10] snap-center rounded-[2rem] overflow-hidden group cursor-pointer"
          >
            <Image 
              src={moment.image} 
              alt={moment.title} 
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80" />
            
            {/* Content */}
            <div className="absolute bottom-0 inset-x-0 p-8 md:p-12 pl-10 flex items-end justify-between">
              <div>
                <p className="text-white/80 font-medium text-sm mb-2">{moment.caption}</p>
                <h4 className="font-serif text-2xl md:text-3xl text-white">{moment.title}</h4>
              </div>
              <div className="w-12 h-12 rounded-full glass flex items-center justify-center translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <ArrowRight className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
        ))}
        {/* Spacer for right aesthetic edge */}
        <div className="shrink-0 w-6 md:w-[calc((100vw-80rem)/2)] h-full" />
      </div>
    </section>
  )
}

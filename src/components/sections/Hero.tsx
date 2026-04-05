"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { gsap } from "gsap"
import { cn } from "@/lib/utils"
import { ArrowRight, MapPin } from "lucide-react"

const TOURS = [
  {
    id: 1,
    title: "Mt. Batur Sunrise",
    category: "Active Volcano Trek",
    image: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&q=80&w=2940",
    headline: "Conquer the Dawn",
    subhead: "A rewarding sunrise hike above the clouds."
  },
  {
    id: 2,
    title: "Uluwatu Cliff Edge",
    category: "Temple & Culture",
    image: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&q=80&w=2940",
    headline: "Dance with the Gods",
    subhead: "Witness the legendary Kecak fire dance at sunset."
  },
  {
    id: 3,
    title: "Nusa Penida Coast",
    category: "Beach & Sunset",
    image: "https://images.unsplash.com/photo-1537956965359-7573183d1f57?auto=format&fit=crop&q=80&w=2940",
    headline: "Untamed Paradise",
    subhead: "Explore towering cliffs and crystal clear waters."
  }
]

const AVATARS = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150&h=150",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150&h=150",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150"
]

export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(0)
  const headlineRef = useRef<HTMLDivElement>(null)
  const [showTapHint, setShowTapHint] = useState(true)
  
  const animateText = () => {
    if (headlineRef.current) {
      gsap.fromTo(headlineRef.current, 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
      )
    }
  }

  const handleCardClick = (index: number) => {
    if (index === activeIndex) return
    setActiveIndex(index)
    animateText()
  }

  // Mobile tap handler — cycles to the next background
  const handleMobileTap = (e: React.MouseEvent<HTMLDivElement>) => {
    // Only on mobile/tablet (below xl = 1280px)
    if (window.innerWidth >= 1280) return
    
    // Don't trigger if user tapped on a card, button, or link
    const target = e.target as HTMLElement
    if (target.closest("button") || target.closest("a") || target.closest("[data-no-cycle]")) return

    setActiveIndex((prev) => (prev + 1) % TOURS.length)
    animateText()
    setShowTapHint(false)
  }

  // Hide tap hint after first auto-cycle or timeout
  useEffect(() => {
    const timer = setTimeout(() => setShowTapHint(false), 5000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section
      className="relative w-full h-[100svh] min-h-[600px] overflow-hidden flex items-center bg-black cursor-pointer xl:cursor-default"
      onClick={handleMobileTap}
    >
      {/* Background Images Crossfade */}
      {TOURS.map((tour, index) => (
        <Image
          key={tour.id}
          src={tour.image}
          alt={tour.title}
          fill
          sizes="100vw"
          priority={index === 0}
          className={cn(
            "object-cover transition-opacity duration-1000 ease-in-out",
            index === activeIndex ? "opacity-60" : "opacity-0"
          )}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40 xl:bg-gradient-to-r xl:from-black/80 xl:to-transparent" />

      {/* Mobile Tap Hint — positioned above slide indicators */}
      <div
        className={cn(
          "absolute bottom-20 left-1/2 -translate-x-1/2 z-30 xl:hidden transition-all duration-700",
          showTapHint ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        )}
      >
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 animate-pulse">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-orange-300">
            <path d="M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2" />
            <path d="M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2" />
            <path d="M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8" />
            <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />
          </svg>
          <span className="text-xs font-medium text-white/90 tracking-wide">Tap to explore</span>
        </div>
      </div>

      {/* Slide Indicators (Mobile) — pinned to bottom */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 xl:hidden flex items-center gap-2">
        {TOURS.map((_, index) => (
          <div
            key={index}
            className={cn(
              "h-1.5 rounded-full transition-all duration-500",
              index === activeIndex ? "w-8 bg-orange-400" : "w-1.5 bg-white/40"
            )}
          />
        ))}
      </div>

      {/* Main Content Layout */}
      <div className="relative z-10 w-full h-full max-w-7xl mx-auto px-6 pt-28 pb-20 xl:pb-12 flex flex-col xl:flex-row xl:items-center justify-center xl:justify-between gap-8 xl:gap-12">
        
        {/* Left: Headline & Social Proof */}
        <div className="flex-1 flex flex-col justify-center max-w-2xl" ref={headlineRef}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/20 bg-white/5 backdrop-blur-md mb-5 w-fit">
            <MapPin className="w-4 h-4 text-orange-300" />
            <span className="text-xs font-semibold uppercase tracking-wider text-white/90">
              {TOURS[activeIndex].category}
            </span>
          </div>
          
          <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl xl:text-8xl text-white leading-[1.1] mb-4 md:mb-6">
            {TOURS[activeIndex].headline}
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl text-white/80 max-w-md font-light mb-8 md:mb-10 leading-relaxed">
            {TOURS[activeIndex].subhead}
          </p>

          {/* Social Proof Card (Glass) — compact on mobile */}
          <div className="glass p-4 sm:p-5 rounded-2xl sm:rounded-3xl inline-flex items-center gap-4 sm:gap-6 w-fit" data-no-cycle>
            <div className="flex -space-x-3">
              {AVATARS.map((avatar, i) => (
                <div key={i} className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-[#1a1a1a] overflow-hidden relative">
                  <Image src={avatar} alt="Traveler" fill sizes="40px" className="object-cover" />
                </div>
              ))}
            </div>
            <div>
              <p className="text-white font-semibold text-xs sm:text-sm">2,500+ happy travelers</p>
              <p className="text-white/60 text-[10px] sm:text-xs mt-0.5">Explore Bali&apos;s finest with us</p>
            </div>
          </div>
        </div>

        {/* Right: Tour Highlight Slider — hidden on mobile, visible on xl */}
        <div className="hidden xl:flex xl:w-80 xl:flex-col gap-4 xl:overflow-visible relative z-20" data-no-cycle>
          <p className="text-white/50 text-xs font-semibold uppercase tracking-widest pl-2 mb-2">Explore Destinations</p>
          
          {TOURS.map((tour, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                key={tour.id}
                onClick={() => handleCardClick(index)}
                className={cn(
                  "relative shrink-0 snap-start rounded-2xl overflow-hidden group transition-all duration-500",
                  "w-full h-32",
                  isActive ? "ring-2 ring-white scale-105" : "hover:bg-white/10 hover:scale-105 opacity-60 hover:opacity-100"
                )}
              >
                <Image src={tour.image} alt={tour.title} fill sizes="320px" className="object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className={cn("absolute inset-0 transition-colors duration-300", isActive ? "bg-black/20" : "bg-black/50 group-hover:bg-black/30")} />
                
                <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 to-transparent flex flex-col items-start">
                  <h3 className="text-white font-medium text-lg leading-tight text-left">{tour.title}</h3>
                  <p className="text-white/70 text-xs mt-1 text-left">{tour.category}</p>
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}

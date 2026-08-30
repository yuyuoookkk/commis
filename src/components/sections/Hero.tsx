"use client"

import { useRef, useEffect } from "react"
import Image from "next/image"
import { gsap } from "gsap"
import { ArrowRight, Car } from "lucide-react"
import ContactDropdown from "@/components/ui/ContactDropdown"

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.hero-badge', 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.2, ease: "power3.out" }
      )
      
      gsap.fromTo('.hero-title', 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, delay: 0.4, ease: "power3.out" }
      )
      
      gsap.fromTo('.hero-desc', 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.7, ease: "power3.out" }
      )
      
      gsap.fromTo('.hero-cta', 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.9, ease: "power3.out" }
      )
    }, heroRef)
    
    return () => ctx.revert()
  }, [])

  return (
    <section ref={heroRef} className="relative w-full h-[100svh] min-h-[600px] overflow-hidden flex items-center bg-dark-surface">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=2940&auto=format&fit=crop"
          alt="Luxury driver in Bali"
          fill
          sizes="100vw"
          priority
          className="object-cover opacity-50 mix-blend-overlay"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 xl:px-12 flex flex-col justify-center pt-20">
        
        <div className="flex-1 flex flex-col justify-center max-w-3xl">
          <div className="hero-badge inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-luxury-gold/30 bg-luxury-gold/5 backdrop-blur-md mb-6 w-fit">
            <Car className="w-4 h-4 text-luxury-gold" />
            <span className="text-xs font-semibold uppercase tracking-widest text-luxury-gold">
              Premium Private Drivers
            </span>
          </div>
          
          <h1 className="hero-title font-serif text-5xl md:text-7xl xl:text-8xl text-white leading-[1.1] mb-6 tracking-tight">
            Explore Bali <br/>
            <span className="text-luxury-gold italic font-light">Your Way</span>
          </h1>
          
          <p className="hero-desc text-lg md:text-xl text-gray-300 max-w-xl font-light mb-10 leading-relaxed">
            Experience the ultimate freedom and comfort. Hire a professional private driver and discover the hidden gems of Bali at your own pace.
          </p>

          <div className="hero-cta flex flex-col sm:flex-row gap-4 w-fit">
            <a
              href="#pricing"
              className="bg-luxury-gold text-dark-surface px-8 py-4 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-luxury-gold-hover hover:scale-105 transition-all shadow-[0_0_20px_rgba(212,175,55,0.3)]"
            >
              View Pricing <ArrowRight className="w-5 h-5" />
            </a>
            <ContactDropdown
              label="Contact Us"
              variant="outline"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

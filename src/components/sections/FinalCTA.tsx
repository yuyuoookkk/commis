"use client"

import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowRight, Phone } from "lucide-react"
import ContactDropdown from "@/components/ui/ContactDropdown"

gsap.registerPlugin(ScrollTrigger)

export default function FinalCTA() {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    gsap.fromTo('.cta-content',
      { y: 40, opacity: 0, scale: 0.95 },
      {
        y: 0, opacity: 1, scale: 1, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: containerRef.current, start: "top 75%" }
      }
    )
  }, { scope: containerRef })

  return (
    <section id="book" ref={containerRef} className="py-24 px-6 md:px-12 lg:px-24 bg-dark-surface relative overflow-hidden flex items-center justify-center">
      {/* Dynamic background */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-luxury-gold rounded-full mix-blend-screen filter blur-[150px] animate-pulse" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-luxury-gold/50 rounded-full mix-blend-screen filter blur-[150px] animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="cta-content relative z-10 w-full max-w-5xl mx-auto glass-dark border border-luxury-gold/20 rounded-[2.5rem] p-12 md:p-20 text-center shadow-[0_0_50px_rgba(212,175,55,0.1)]">
        <h2 className="text-4xl md:text-6xl font-serif text-white mb-6 leading-tight">
          Ready to Explore <br className="hidden md:block"/>
          <span className="text-luxury-gold italic">Bali in Style?</span>
        </h2>
        
        <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-10">
          Book your premium private driver today and ensure your journey is as spectacular as the destination. 
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <ContactDropdown
            label="Book Now"
            variant="gold"
            icon={<ArrowRight className="w-5 h-5" />}
            className="w-full sm:w-auto shadow-lg"
          />
          
          <ContactDropdown
            label="Contact Us"
            variant="outline"
            icon={<Phone className="w-5 h-5 text-luxury-gold" />}
            className="w-full sm:w-auto"
          />
        </div>
      </div>
    </section>
  )
}

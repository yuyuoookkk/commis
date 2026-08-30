"use client"

import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { CalendarDays, Map, Smile } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

const steps = [
  {
    icon: CalendarDays,
    title: "1. Choose a Package",
    description: "Select from our Half-Day, Full-Day, or Custom multi-day charter options based on your needs."
  },
  {
    icon: Map,
    title: "2. Plan Your Route",
    description: "Pick your favorite destinations. Our experienced drivers can also provide local recommendations."
  },
  {
    icon: Smile,
    title: "3. Enjoy the Ride",
    description: "Your professional driver will pick you up at your hotel. Sit back, relax, and enjoy Bali in comfort."
  }
]

export default function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    gsap.fromTo('.hiw-header',
      { y: 30, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.8,
        scrollTrigger: { trigger: containerRef.current, start: "top 80%" }
      }
    )

    gsap.fromTo('.hiw-step',
      { y: 40, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: "power2.out",
        scrollTrigger: { trigger: containerRef.current, start: "top 70%" }
      }
    )
  }, { scope: containerRef })

  return (
    <section id="how-it-works" ref={containerRef} className="py-24 px-6 md:px-12 lg:px-24 bg-[#0a0a0a] relative overflow-hidden">
      {/* Abstract decorative elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-luxury-gold/5 to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="hiw-header text-center mb-20 max-w-2xl mx-auto">
          <span className="text-luxury-gold font-medium tracking-wider uppercase text-sm mb-4 block">
            Simple Process
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-white mb-6">
            How It Works
          </h2>
          <p className="text-gray-400 text-lg">
            Booking a private driver with us is seamless and straightforward.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          {/* Connecting line for desktop */}
          <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-px bg-gradient-to-r from-transparent via-luxury-gold/30 to-transparent" />
          
          {steps.map((step, index) => (
            <div key={index} className="hiw-step flex flex-col items-center text-center relative z-10">
              <div className="w-24 h-24 rounded-full bg-[#1a1a1a] border border-luxury-gold/20 flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(212,175,55,0.05)] relative group transition-all duration-300 hover:border-luxury-gold hover:shadow-[0_0_40px_rgba(212,175,55,0.2)]">
                <step.icon className="w-10 h-10 text-luxury-gold transition-transform duration-300 group-hover:scale-110" />
                <div className="absolute inset-2 rounded-full border border-white/5" />
              </div>
              <h3 className="text-2xl font-serif text-white mb-4">{step.title}</h3>
              <p className="text-gray-400 text-base leading-relaxed max-w-sm">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

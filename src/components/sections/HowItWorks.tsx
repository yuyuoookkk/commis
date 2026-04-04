"use client"

import Image from "next/image"
import { Compass, CalendarCheck, Map, Camera } from "lucide-react"

const STEPS = [
  {
    icon: Compass,
    title: "Discover Your Vibe",
    desc: "Browse our curated packages and find the experience that speaks to your soul, from serene temples to active volcanoes."
  },
  {
    icon: CalendarCheck,
    title: "Easy Booking",
    desc: "Select your dates and customize your itinerary. Secure your journey with a seamless, hassle-free booking process."
  },
  {
    icon: Map,
    title: "Expert Guidance",
    desc: "Our local experts and dedicated guides will handle all logistics, ensuring you experience Bali authentically and safely."
  },
  {
    icon: Camera,
    title: "Unforgettable Memories",
    desc: "Immerse yourself fully. We take care of everything else so you can focus on making memories that last a lifetime."
  }
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-32 bg-white relative">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Left: Image Pillar */}
        <div className="relative aspect-[3/4] lg:aspect-[4/5] rounded-[2.5rem] overflow-hidden order-2 lg:order-1 shadow-2xl">
          <Image 
            src="https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?auto=format&fit=crop&q=80&w=1200" 
            alt="Traveler exploring Bali" 
            fill 
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-10">
            <div className="glass-dark p-6 rounded-2xl w-full">
              <p className="text-white font-serif text-2xl mb-1">Your Journey Begins</p>
              <p className="text-white/80 text-sm">Every step is tailored to you.</p>
            </div>
          </div>
        </div>

        {/* Right: Step Content */}
        <div className="order-1 lg:order-2">
          <h2 className="text-[#C28B6A] uppercase tracking-widest text-xs font-bold mb-4">How it Works</h2>
          <h3 className="font-serif text-4xl md:text-5xl text-[#16425B] leading-tight mb-12">
            A seamless path to paradise.
          </h3>
          
          <div className="space-y-12">
            {STEPS.map((step, index) => (
              <div key={index} className="flex gap-6 group">
                {/* Icon Container */}
                <div className="relative flex flex-col items-center">
                  <div className="w-14 h-14 rounded-full bg-[#F5F1E7] border border-[#C28B6A]/30 text-[#16425B] flex items-center justify-center shrink-0 z-10 group-hover:scale-110 group-hover:bg-[#16425B] group-hover:text-white transition-all duration-300">
                    <step.icon className="w-6 h-6" />
                  </div>
                  {/* Line connecting steps */}
                  {index !== STEPS.length - 1 && (
                    <div className="absolute top-14 bottom-[-3rem] w-px bg-gradient-to-b from-[#C28B6A]/30 to-transparent" />
                  )}
                </div>
                
                {/* Text Content */}
                <div className="pt-2 pb-6">
                  <h4 className="text-xl font-serif text-[#16425B] mb-2">{step.title}</h4>
                  <p className="text-[#111]/60 text-sm leading-relaxed max-w-md">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  )
}

"use client"

import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Quote, Star } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

const testimonials = [
  {
    name: "Sarah Jenkins",
    role: "Family Traveler",
    text: "Having a private driver made our Bali trip completely stress-free. The van was always immaculate, and Wayan knew all the best spots to avoid the crowds.",
    rating: 5
  },
  {
    name: "Michael Chen",
    role: "Honeymooner",
    text: "Exceptional service from start to finish. Our driver was punctual, incredibly polite, and gave us fantastic restaurant recommendations in Seminyak.",
    rating: 5
  },
  {
    name: "Emma Watson",
    role: "Solo Explorer",
    text: "I felt so safe and well taken care of. Being able to customize my itinerary on the fly for a 3-day trip was exactly what I needed. Highly recommend!",
    rating: 5
  }
]

export default function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    gsap.fromTo('.test-header',
      { y: 30, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.8,
        scrollTrigger: { trigger: containerRef.current, start: "top 80%" }
      }
    )

    gsap.fromTo('.test-card',
      { y: 40, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: "power2.out",
        scrollTrigger: { trigger: containerRef.current, start: "top 70%" }
      }
    )
  }, { scope: containerRef })

  return (
    <section id="reviews" ref={containerRef} className="py-24 px-6 md:px-12 lg:px-24 bg-dark-elevated relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="test-header text-center mb-16 max-w-2xl mx-auto">
          <span className="text-luxury-gold font-medium tracking-wider uppercase text-sm mb-4 block">
            Client Experiences
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-white mb-6">
            What They Say
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((test, index) => (
            <div key={index} className="test-card glass-dark p-8 rounded-2xl relative border border-white/5 hover:border-luxury-gold/20 transition-colors">
              <Quote className="absolute top-6 right-6 w-12 h-12 text-luxury-gold/10" />
              
              <div className="flex gap-1 mb-6">
                {[...Array(test.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-luxury-gold text-luxury-gold" />
                ))}
              </div>
              
              <p className="text-gray-300 text-base leading-relaxed mb-8 relative z-10 italic">
                "{test.text}"
              </p>
              
              <div className="flex items-center gap-4 mt-auto">
                <div className="w-12 h-12 rounded-full bg-luxury-gold/20 flex items-center justify-center font-serif text-luxury-gold text-xl border border-luxury-gold/30">
                  {test.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-white font-medium">{test.name}</h4>
                  <p className="text-gray-500 text-sm">{test.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

"use client"

import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Camera, Star } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

const testimonials = [
  {
    image: "/assets/image.png",
    name: "The Smith Family",
    review: "An unforgettable journey. Our driver was amazing!",
    size: "large"
  },
  {
    image: "/assets/image copy.png",
    name: "Jessica & Mark",
    review: "Perfect honeymoon experience in Bali.",
    size: "small"
  },
  {
    image: "/assets/image copy 2.png",
    name: "David T.",
    review: "Explored places I'd never find on my own.",
    size: "small"
  },
  {
    image: "/assets/image copy 3.png",
    name: "Emma W.",
    review: "Safe, comfortable, and totally reliable.",
    size: "medium"
  }
]

export default function PhotoTestimonials() {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    gsap.fromTo('.photo-header',
      { y: 30, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.8,
        scrollTrigger: { trigger: containerRef.current, start: "top 80%" }
      }
    )

    gsap.fromTo('.photo-card',
      { y: 40, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power2.out",
        scrollTrigger: { trigger: containerRef.current, start: "top 70%" }
      }
    )
  }, { scope: containerRef })

  return (
    <section id="gallery" ref={containerRef} className="py-24 px-6 md:px-12 lg:px-24 bg-dark-surface relative border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="photo-header text-center mb-16 max-w-2xl mx-auto">
          <span className="text-luxury-gold font-medium tracking-wider uppercase text-sm mb-4 flex items-center justify-center gap-2">
            <Camera className="w-4 h-4" /> Guest Memories
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-white mb-6">
            Captured Moments
          </h2>
          <p className="text-gray-400 text-lg">
            See Bali through the eyes of our happy clients. 
            Real moments from real journeys.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:auto-rows-[250px]">
          {testimonials.map((test, i) => (
            <div 
              key={i} 
              className={`photo-card group relative rounded-2xl overflow-hidden border border-white/5 hover:border-luxury-gold/30 transition-colors
                ${test.size === 'large' ? 'md:col-span-2 md:row-span-2' : 
                  test.size === 'medium' ? 'md:col-span-2 md:row-span-1' : 'md:col-span-1 md:row-span-1'}`}
            >
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url('${encodeURI(test.image)}')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
              
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="flex gap-1 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {[...Array(5)].map((_, idx) => (
                      <Star key={idx} className="w-3 h-3 fill-luxury-gold text-luxury-gold" />
                    ))}
                  </div>
                  <h3 className="text-xl font-serif text-white mb-1">{test.name}</h3>
                  <p className="text-luxury-gold text-sm md:text-base opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 italic">
                    "{test.review}"
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

"use client"

import { useCallback } from "react"
import useEmblaCarousel from "embla-carousel-react"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import { cn } from "@/lib/utils"
import { useLang } from "@/lib/lang"

const REVIEWS = [
  { id: 1, name: "Sarah Jenkins", location: "Australia", text: "The Mt. Agung sunrise trek was the most challenging and rewarding experience of my life. The guides were incredibly supportive and knowledgeable. Truly a once-in-a-lifetime journey.", rating: 5 },
  { id: 2, name: "Michael Chen", location: "Singapore", text: "Absolutely impeccable service from start to finish. The bespoke honeymoon package was orchestrated flawlessly. They truly understand the art of premium hospitality.", rating: 5 },
  { id: 3, name: "Emma & James", location: "United Kingdom", text: "We wanted an authentic cultural experience away from the tourist traps. Bintang Bali delivered beyond our expectations with their private temple tours.", rating: 5 },
  { id: 4, name: "David Rossi", location: "Italy", text: "An unforgettable adventure! The diving sites they recommended at Nusa Penida were pristine. Highly recommend their bespoke coastal packages.", rating: 4.9 },
]

export default function Testimonials() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "center" })
  const { t } = useLang()

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  return (
    <section id="reviews" className="py-32 bg-[#16425B] relative overflow-hidden">
      <div className="absolute top-[-20%] left-[-10%] w-[50%] aspect-square rounded-full bg-[#2D4A3E]/30 blur-[120px]" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] aspect-square rounded-full bg-[#C28B6A]/20 blur-[120px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 mb-16 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
        <div>
          <h2 className="text-[#C28B6A] uppercase tracking-widest text-xs font-bold mb-4">{t("reviews.label")}</h2>
          <h3 className="font-serif text-4xl md:text-5xl text-white leading-tight">
            {t("reviews.heading")}
          </h3>
        </div>
        
        <div className="flex items-center gap-4">
          <button 
            onClick={scrollPrev}
            className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>
          <button 
            onClick={scrollNext}
            className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      <div className="relative z-10 max-w-[100vw] overflow-hidden" ref={emblaRef}>
        <div className="flex px-4 md:px-[calc((100vw-80rem)/2)]">
          {REVIEWS.map((review) => (
            <div key={review.id} className="flex-[0_0_85%] md:flex-[0_0_400px] min-w-0 pl-6">
              <div className="glass-dark h-full p-8 rounded-[2rem] flex flex-col justify-between hover:-translate-y-2 transition-transform duration-500">
                <div>
                  <div className="flex items-center gap-1 mb-6">
                    {[...Array(Math.floor(review.rating))].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#C28B6A] text-[#C28B6A]" />
                    ))}
                  </div>
                  <p className="text-white/90 text-sm md:text-base leading-relaxed mb-8 italic">
                    &quot;{review.text}&quot;
                  </p>
                </div>
                
                <div>
                  <h4 className="text-white font-medium text-lg font-serif">{review.name}</h4>
                  <p className="text-white/50 text-xs uppercase tracking-wider">{review.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

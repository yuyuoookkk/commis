"use client"

import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Quote, Star } from "lucide-react"
import { useLang } from "@/lib/lang"
import SectionHeading from "@/components/ui/SectionHeading"

gsap.registerPlugin(ScrollTrigger)

const TESTIMONIALS = [
  {
    name: "Sarah Jenkins",
    role: "Family Traveler",
    text: "Having a private driver made our Bali trip completely stress-free. The van was always immaculate, and Wayan knew all the best spots to avoid the crowds.",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "Honeymooner",
    text: "Exceptional service from start to finish. Our driver was punctual, incredibly polite, and gave us fantastic restaurant recommendations in Seminyak.",
    rating: 5,
  },
  {
    name: "Emma Watson",
    role: "Solo Explorer",
    text: "I felt so safe and well taken care of. Being able to customise my itinerary on the fly for a 3-day trip was exactly what I needed. Highly recommend!",
    rating: 5,
  },
]

export default function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { t } = useLang()

  useGSAP(() => {
    gsap.fromTo(
      ".test-card",
      { y: 36, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: { trigger: containerRef.current, start: "top 75%" },
      }
    )
  }, { scope: containerRef })

  return (
    <section
      id="reviews"
      ref={containerRef}
      className="border-t border-line bg-ink px-6 py-24 md:px-12 lg:px-24"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow={t("reviews.label")}
          title={t("reviews.heading")}
          className="mb-14"
        />

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {TESTIMONIALS.map((testimonial) => (
            <figure
              key={testimonial.name}
              className="test-card relative rounded-xl border border-line bg-surface p-8 transition-colors hover:border-brand/40"
            >
              <Quote className="absolute top-6 right-6 h-10 w-10 text-white/5" />

              <div className="flex gap-1">
                {Array.from({ length: testimonial.rating }, (_, i) => (
                  <Star key={i} className="h-4 w-4 fill-brand text-brand" />
                ))}
              </div>

              <blockquote className="relative mt-5 text-sm leading-relaxed text-white/60">
                {testimonial.text}
              </blockquote>

              <figcaption className="mt-7 flex items-center gap-3 border-t border-line pt-5">
                <div className="display flex h-11 w-11 items-center justify-center rounded-md bg-brand-soft text-lg text-brand">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{testimonial.name}</p>
                  <p className="text-xs text-white/40">{testimonial.role}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}

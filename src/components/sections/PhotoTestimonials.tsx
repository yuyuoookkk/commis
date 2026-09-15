"use client"

import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Star } from "lucide-react"
import SectionHeading from "@/components/ui/SectionHeading"

gsap.registerPlugin(ScrollTrigger)

const MOMENTS = [
  {
    image: "/assets/image.png",
    name: "The Smith Family",
    review: "An unforgettable journey. Our driver was amazing!",
    span: "md:col-span-2 md:row-span-2",
  },
  {
    image: "/assets/image copy.png",
    name: "Jessica & Mark",
    review: "Perfect honeymoon experience in Bali.",
    span: "md:col-span-1 md:row-span-1",
  },
  {
    image: "/assets/image copy 2.png",
    name: "David T.",
    review: "Explored places I'd never find on my own.",
    span: "md:col-span-1 md:row-span-1",
  },
  {
    image: "/assets/image copy 3.png",
    name: "Emma W.",
    review: "Safe, comfortable, and totally reliable.",
    span: "md:col-span-2 md:row-span-1",
  },
]

export default function PhotoTestimonials() {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    gsap.fromTo(
      ".photo-card",
      { y: 36, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.12,
        ease: "power2.out",
        scrollTrigger: { trigger: containerRef.current, start: "top 75%" },
      }
    )
  }, { scope: containerRef })

  return (
    <section
      id="gallery"
      ref={containerRef}
      className="border-t border-line bg-ink px-6 py-24 md:px-12 lg:px-24"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Guest Memories"
          title="Captured Moments"
          description="See Bali through the eyes of our guests — real moments from real journeys."
          className="mb-12"
        />

        <div className="grid auto-rows-[220px] grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
          {MOMENTS.map((moment) => (
            <figure
              key={moment.name}
              className={`photo-card group relative overflow-hidden rounded-xl border border-line transition-colors hover:border-brand/40 ${moment.span}`}
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url('${encodeURI(moment.image)}')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent" />

              <figcaption className="absolute inset-x-0 bottom-0 p-6">
                <div className="mb-2 flex gap-1 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star key={i} className="h-3 w-3 fill-brand text-brand" />
                  ))}
                </div>
                <p className="display text-lg text-white">{moment.name}</p>
                <p className="mt-1 text-sm text-white/0 transition-colors duration-500 group-hover:text-brand">
                  {moment.review}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}

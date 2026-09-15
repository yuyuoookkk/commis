"use client"

import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { CalendarDays, Map, Smile } from "lucide-react"
import SectionHeading from "@/components/ui/SectionHeading"

gsap.registerPlugin(ScrollTrigger)

const STEPS = [
  {
    icon: CalendarDays,
    title: "Choose a Package",
    description:
      "Select from our half-day, full-day, or custom multi-day charter options based on your needs.",
  },
  {
    icon: Map,
    title: "Plan Your Route",
    description:
      "Pick your favourite destinations. Our experienced drivers can also provide local recommendations.",
  },
  {
    icon: Smile,
    title: "Enjoy the Ride",
    description:
      "Your driver picks you up at your hotel. Sit back, relax, and enjoy Bali in comfort.",
  },
]

export default function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    gsap.fromTo(
      ".hiw-step",
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
      id="how-it-works"
      ref={containerRef}
      className="border-t border-line bg-ink px-6 py-24 md:px-12 lg:px-24"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Simple Process"
          title="How It Works"
          description="Booking a private driver with us takes three steps and a single WhatsApp message."
          className="mb-14"
        />

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {STEPS.map((step, index) => (
            <div
              key={step.title}
              className="hiw-step relative overflow-hidden rounded-xl border border-line bg-surface p-8 transition-colors hover:border-brand/40"
            >
              <span className="display text-outline pointer-events-none absolute -top-3 right-4 text-8xl">
                {index + 1}
              </span>

              <div className="relative flex h-12 w-12 items-center justify-center rounded-md bg-brand-soft">
                <step.icon className="h-6 w-6 text-brand" />
              </div>

              <h3 className="display relative mt-6 text-xl text-white">{step.title}</h3>
              <p className="relative mt-3 text-sm leading-relaxed text-white/50">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

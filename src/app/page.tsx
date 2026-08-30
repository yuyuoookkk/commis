import Hero from "@/components/sections/Hero"
import Pricing from "@/components/sections/Pricing"
import PhotoTestimonials from "@/components/sections/PhotoTestimonials"
import HowItWorks from "@/components/sections/HowItWorks"
import Testimonials from "@/components/sections/Testimonials"
import FinalCTA from "@/components/sections/FinalCTA"

export default function Home() {
  return (
    <main className="w-full relative bg-dark-surface text-white">
      <Hero />
      <Pricing />
      <PhotoTestimonials />
      <HowItWorks />
      <Testimonials />
      <FinalCTA />
    </main>
  )
}

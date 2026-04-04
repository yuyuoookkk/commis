import Hero from "@/components/sections/Hero"
import FeaturedMoments from "@/components/sections/FeaturedMoments"
import TourPackages from "@/components/sections/TourPackages"
import HowItWorks from "@/components/sections/HowItWorks"
import Testimonials from "@/components/sections/Testimonials"
import FinalCTA from "@/components/sections/FinalCTA"

export default function Home() {
  return (
    <main className="w-full relative">
      <Hero />
      <FeaturedMoments />
      <TourPackages />
      <HowItWorks />
      <Testimonials />
      <FinalCTA />
    </main>
  )
}

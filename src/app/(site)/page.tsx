import Hero from "@/components/sections/Hero"
import Pricing from "@/components/sections/Pricing"
import CarUnit from "@/components/sections/CarUnit"
import IslandTours from "@/components/sections/IslandTours"
import PhotoTestimonials from "@/components/sections/PhotoTestimonials"
import VideoStories from "@/components/sections/VideoStories"
import HowItWorks from "@/components/sections/HowItWorks"
import Testimonials from "@/components/sections/Testimonials"
import FinalCTA from "@/components/sections/FinalCTA"

export default function Home() {
  return (
    <main className="w-full relative bg-dark-surface text-white">
      <Hero />
      <Pricing />
      <CarUnit />
      <IslandTours />
      <PhotoTestimonials />
      <VideoStories />
      <HowItWorks />
      <Testimonials />
      <FinalCTA />
    </main>
  )
}

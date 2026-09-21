"use client"

import { useRef, useState } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Play, Video } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

// #t=1 makes the browser paint the frame at one second as the thumbnail rather
// than an empty black box, without pulling down the whole clip up front.
const CLIPS = [1, 2, 3, 4].map((n) => ({
  id: n,
  src: `/assets/video/clip-${n}.mp4#t=1`,
}))

export default function VideoStories() {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])
  const [started, setStarted] = useState<number[]>([])

  useGSAP(() => {
    gsap.fromTo('.video-header',
      { y: 30, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.8,
        scrollTrigger: { trigger: containerRef.current, start: "top 80%" }
      }
    )

    gsap.fromTo('.video-card',
      { y: 40, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: "power2.out",
        scrollTrigger: { trigger: containerRef.current, start: "top 70%" }
      }
    )
  }, { scope: containerRef })

  // Covers the overlay button and the native controls alike, so two clips
  // can never play over each other.
  const handlePlay = (index: number) => {
    videoRefs.current.forEach((video, i) => {
      if (video && i !== index) video.pause()
    })
    setStarted((prev) => (prev.includes(index) ? prev : [...prev, index]))
  }

  return (
    <section
      id="videos"
      ref={containerRef}
      className="py-24 px-6 md:px-12 lg:px-24 bg-dark-surface relative border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto">
        <div className="video-header text-center mb-16 max-w-2xl mx-auto">
          <span className="text-luxury-gold font-medium tracking-wider uppercase text-sm mb-4 flex items-center justify-center gap-2">
            <Video className="w-4 h-4" /> On The Road
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-white mb-6">
            See It In Motion
          </h2>
          <p className="text-gray-400 text-lg">
            Short clips from our trips around the island.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {CLIPS.map((clip, index) => {
            const isStarted = started.includes(index)
            return (
              <div
                key={clip.id}
                className="video-card group relative aspect-[9/16] rounded-2xl overflow-hidden border border-white/5 bg-dark-elevated hover:border-luxury-gold/30 transition-colors"
              >
                <video
                  ref={(el) => { videoRefs.current[index] = el }}
                  src={clip.src}
                  preload="metadata"
                  playsInline
                  controls={isStarted}
                  onPlay={() => handlePlay(index)}
                  className="absolute inset-0 w-full h-full object-cover"
                />

                {!isStarted && (
                  <button
                    type="button"
                    onClick={() => videoRefs.current[index]?.play()}
                    aria-label={`Play video ${index + 1}`}
                    className="absolute inset-0 flex items-center justify-center bg-black/25 hover:bg-black/10 transition-colors cursor-pointer"
                  >
                    <span className="flex items-center justify-center w-14 h-14 rounded-full bg-luxury-gold text-dark-surface shadow-lg transition-transform group-hover:scale-110">
                      <Play className="w-6 h-6 fill-current ml-0.5" />
                    </span>
                  </button>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    let lastScrollY = window.scrollY
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setScrolled(currentScrollY > 50)
      
      // Hide on scroll down past 100px, show on scroll up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setHidden(true)
      } else {
        setHidden(false)
      }
      lastScrollY = currentScrollY
    }
    
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={cn(
        "fixed left-1/2 z-50 transition-all duration-500 ease-in-out",
        "w-[90%] max-w-7xl rounded-full px-6 py-4 flex items-center justify-between",
        scrolled ? "glass-dark" : "bg-black/10 backdrop-blur-sm border border-white/10",
        hidden ? "-translate-y-[150%] top-0 -translate-x-1/2 opacity-0 pointer-events-none" : "top-6 -translate-y-0 -translate-x-1/2 opacity-100"
      )}
    >
      {/* Logo */}
      <Link href="/" className="flex items-center gap-3 group">
        <div className="relative w-10 h-10 overflow-hidden group-hover:scale-105 transition-transform shrink-0">
          <Image src="/image.png" alt="Bintang Bali Logo" fill sizes="40px" className="object-contain" priority />
        </div>
        <span className="font-serif text-lg font-medium tracking-wide text-white">Bintang Bali</span>
      </Link>

      {/* Links - Hidden on Mobile */}
      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/80">
        <Link href="#tours" className="hover:text-white transition-colors">Tours & Packages</Link>
        <Link href="#gallery" className="hover:text-white transition-colors">Moments</Link>
        <Link href="#how-it-works" className="hover:text-white transition-colors">How it Works</Link>
        <Link href="#reviews" className="hover:text-white transition-colors">Reviews</Link>
      </div>

      {/* CTA */}
      <Link 
        href="#book"
        className="bg-white text-black px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-white/90 hover:scale-105 transition-all active:scale-95"
      >
        Book Journey
      </Link>
    </nav>
  )
}

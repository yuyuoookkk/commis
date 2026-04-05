"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { useLang } from "@/lib/lang"

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const { lang, toggle, t } = useLang()

  useEffect(() => {
    let lastScrollY = window.scrollY
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setScrolled(currentScrollY > 50)
      
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
        "w-[92%] max-w-7xl rounded-full px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between",
        scrolled ? "glass-dark" : "bg-black/10 backdrop-blur-sm border border-white/10",
        hidden ? "-translate-y-[150%] top-0 -translate-x-1/2 opacity-0 pointer-events-none" : "top-6 -translate-y-0 -translate-x-1/2 opacity-100"
      )}
    >
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 sm:gap-3 group shrink-0">
        <div className="relative w-8 h-8 sm:w-10 sm:h-10 overflow-hidden group-hover:scale-105 transition-transform shrink-0">
          <Image src="/image.png" alt="Bintang Bali Logo" fill sizes="40px" className="object-contain" priority />
        </div>
        <span className="hidden sm:inline font-serif text-lg font-medium tracking-wide text-white">Bintang Bali</span>
      </Link>

      {/* Links - Hidden on Mobile */}
      <div className="hidden lg:flex items-center gap-8 text-sm font-medium text-white/80">
        <Link href="#tours" className="hover:text-white transition-colors">{t("nav.tours")}</Link>
        <Link href="#gallery" className="hover:text-white transition-colors">{t("nav.moments")}</Link>
        <Link href="#how-it-works" className="hover:text-white transition-colors">{t("nav.howItWorks")}</Link>
        <Link href="#reviews" className="hover:text-white transition-colors">{t("nav.reviews")}</Link>
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Language Toggle */}
        <button
          onClick={toggle}
          className="flex items-center justify-center w-9 h-9 sm:w-auto sm:h-auto sm:px-3 sm:py-2 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 text-white text-xs font-semibold tracking-wide transition-all duration-300 hover:scale-105 active:scale-95"
          aria-label="Toggle language"
        >
          <span className="sm:hidden text-xs font-bold">{lang === "en" ? "ID" : "EN"}</span>
          <span className="hidden sm:flex items-center gap-1.5">
            <span className="text-sm">🌐</span>
            <span>{lang === "en" ? "ID" : "EN"}</span>
          </span>
        </button>

        {/* CTA */}
        <Link 
          href="#book"
          className="bg-white text-black px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold hover:bg-white/90 hover:scale-105 transition-all active:scale-95"
        >
          {t("nav.book")}
        </Link>
      </div>
    </nav>
  )
}

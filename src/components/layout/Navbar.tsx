"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { useLang } from "@/lib/lang"
import { MessageCircle } from "lucide-react"

const WHATSAPP_NUMBER = "62881037512641"
const WECHAT_ID = "wxid_tz213yzqzud422"

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [bookOpen, setBookOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { lang, toggle } = useLang()
  const dropdownRef = useRef<HTMLDivElement>(null)

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

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setBookOpen(false)
      }
    }
    if (bookOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [bookOpen])

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
          <Image src="/image.png" alt="Violet Bali Driver Logo" fill sizes="40px" className="object-contain" priority />
        </div>
        <span className="font-serif text-base sm:text-lg font-medium tracking-wide text-white">Violet Bali Driver</span>
      </Link>

      {/* Links - Hidden on Mobile */}
      <div className="hidden lg:flex items-center gap-8 text-sm font-medium text-white/80">
        <Link href="#pricing" className="hover:text-white transition-colors">Pricing</Link>
        <Link href="#gallery" className="hover:text-white transition-colors">Moments</Link>
        <Link href="#how-it-works" className="hover:text-white transition-colors">How It Works</Link>
        <Link href="#reviews" className="hover:text-white transition-colors">Reviews</Link>
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

        {/* Book Journey Dropdown */}
        <div ref={dropdownRef} className="relative">
          <button
            onClick={() => setBookOpen(!bookOpen)}
            className="bg-white text-black px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold hover:bg-white/90 hover:scale-105 transition-all active:scale-95"
          >
            Book Journey
          </button>

          {/* Dropdown */}
          <div
            className={cn(
              "absolute right-0 top-full mt-3 w-56 rounded-2xl overflow-hidden border border-white/10 shadow-2xl transition-all duration-300 origin-top-right",
              "bg-[#121212]/95 backdrop-blur-xl",
              bookOpen ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
            )}
          >
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi! I'd like to book a driver in Bali.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-5 py-4 hover:bg-white/5 transition-colors border-b border-white/5"
              onClick={() => setBookOpen(false)}
            >
              <div className="w-8 h-8 rounded-full bg-[#25D366]/15 flex items-center justify-center shrink-0">
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-[#25D366]" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </div>
              <div>
                <p className="text-white text-sm font-medium">WhatsApp</p>
                <p className="text-gray-500 text-xs">Chat with us directly</p>
              </div>
            </a>

            <button
              onClick={() => {
                navigator.clipboard.writeText(WECHAT_ID)
                setCopied(true)
                setTimeout(() => { setCopied(false); setBookOpen(false) }, 1500)
              }}
              className="w-full flex items-center gap-3 px-5 py-4 hover:bg-white/5 transition-colors text-left"
            >
              <div className="w-8 h-8 rounded-full bg-[#07C160]/15 flex items-center justify-center shrink-0">
                <MessageCircle className="w-4 h-4 text-[#07C160]" />
              </div>
              <div>
                <p className="text-white text-sm font-medium">
                  {copied ? "✓ ID Copied!" : "WeChat"}
                </p>
                <p className="text-gray-500 text-xs">
                  {copied ? WECHAT_ID : "Copy our WeChat ID"}
                </p>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden flex items-center justify-center w-10 h-10 rounded-full border border-white/15 bg-white/5 text-white"
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
            {mobileMenuOpen ? (
              <path fillRule="evenodd" clipRule="evenodd" d="M18.364 5.636a1 1 0 0 1 0 1.414L13.414 12l4.95 4.95a1 1 0 0 1-1.414 1.414L12 13.414l-4.95 4.95a1 1 0 0 1-1.414-1.414L10.586 12 5.636 7.05a1 1 0 0 1 1.414-1.414L12 10.586l4.95-4.95a1 1 0 0 1 1.414 0z" />
            ) : (
              <path fillRule="evenodd" clipRule="evenodd" d="M4 6h16v2H4V6zm0 5h16v2H4v-2zm0 5h16v2H4v-2z" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          "absolute top-full left-0 right-0 mt-4 p-6 rounded-3xl border border-white/10 glass-dark flex flex-col gap-6 lg:hidden transition-all duration-300 origin-top",
          mobileMenuOpen ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 -translate-y-4 pointer-events-none"
        )}
      >
        <Link href="#pricing" onClick={() => setMobileMenuOpen(false)} className="text-lg font-serif text-white border-b border-white/10 pb-4">Pricing</Link>
        <Link href="#gallery" onClick={() => setMobileMenuOpen(false)} className="text-lg font-serif text-white border-b border-white/10 pb-4">Moments</Link>
        <Link href="#how-it-works" onClick={() => setMobileMenuOpen(false)} className="text-lg font-serif text-white border-b border-white/10 pb-4">How It Works</Link>
        <Link href="#reviews" onClick={() => setMobileMenuOpen(false)} className="text-lg font-serif text-white border-b border-white/10 pb-4">Reviews</Link>
      </div>
    </nav>
  )
}

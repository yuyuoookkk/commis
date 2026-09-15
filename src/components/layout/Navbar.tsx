"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { useLang } from "@/lib/lang"
import { MessageCircle } from "lucide-react"
import { WECHAT_ID, waLink } from "@/lib/contact"
import WhatsAppIcon from "@/components/ui/WhatsAppIcon"

const NAV_LINKS = [
  { href: "#packages", label: "Packages" },
  { href: "#pricing", label: "Pricing" },
  { href: "#car-unit", label: "Car Unit" },
  { href: "#tours", label: "Tours" },
  { href: "#gallery", label: "Moments" },
  { href: "#how-it-works", label: "How It Works" },
  { href: "#reviews", label: "Reviews" },
]

const BOOK_MESSAGE = "Hi! I'd like to book a driver in Bali."

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
      setScrolled(currentScrollY > 40)
      setHidden(currentScrollY > lastScrollY && currentScrollY > 120)
      lastScrollY = currentScrollY
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setBookOpen(false)
      }
    }
    if (bookOpen) document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [bookOpen])

  const copyWechat = () => {
    navigator.clipboard.writeText(WECHAT_ID)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <nav
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "border-b border-line bg-ink/90 backdrop-blur-md" : "border-b border-transparent",
        hidden && "-translate-y-full"
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-6">
        <Link href="/" className="group flex shrink-0 items-center gap-2.5">
          <div className="relative h-9 w-9 shrink-0 overflow-hidden transition-transform group-hover:scale-105">
            <Image src="/image.png" alt="Violet Bali Driver Logo" fill sizes="36px" className="object-contain" priority />
          </div>
          <span className="display text-base tracking-wide text-white sm:text-lg">Violet Bali Driver</span>
        </Link>

        <div className="hidden items-center gap-7 xl:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[11px] font-semibold tracking-[0.14em] text-white/55 uppercase transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={toggle}
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-md border border-line-strong text-[11px] font-bold text-white/80 transition-colors hover:border-white/35 hover:text-white sm:h-auto sm:w-auto sm:px-3 sm:py-2.5"
            aria-label="Toggle language"
          >
            {lang === "en" ? "ID" : "EN"}
          </button>

          <div ref={dropdownRef} className="relative hidden sm:block">
            <button
              type="button"
              onClick={() => setBookOpen(!bookOpen)}
              className="cursor-pointer rounded-md bg-brand px-5 py-2.5 text-[11px] font-bold tracking-widest text-white uppercase transition-colors hover:bg-brand-hover"
            >
              Book Now
            </button>

            <div
              className={cn(
                "absolute top-full right-0 mt-3 w-56 overflow-hidden rounded-xl border border-line bg-surface shadow-2xl transition-all duration-300",
                bookOpen ? "translate-y-0 scale-100 opacity-100" : "-translate-y-2 scale-95 opacity-0 pointer-events-none"
              )}
            >
              <a
                href={waLink(BOOK_MESSAGE)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 border-b border-line px-5 py-4 transition-colors hover:bg-white/5"
                onClick={() => setBookOpen(false)}
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#25D366]/15">
                  <WhatsAppIcon className="h-4 w-4 fill-[#25D366]" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">WhatsApp</p>
                  <p className="text-xs text-white/40">Chat with us directly</p>
                </div>
              </a>

              <button
                type="button"
                onClick={copyWechat}
                className="flex w-full cursor-pointer items-center gap-3 px-5 py-4 text-left transition-colors hover:bg-white/5"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#07C160]/15">
                  <MessageCircle className="h-4 w-4 text-[#07C160]" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">{copied ? "ID Copied!" : "WeChat"}</p>
                  <p className="text-xs text-white/40">{copied ? WECHAT_ID : "Copy our WeChat ID"}</p>
                </div>
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-md border border-line-strong text-white xl:hidden"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" xmlns="http://www.w3.org/2000/svg">
              {mobileMenuOpen ? (
                <path fillRule="evenodd" clipRule="evenodd" d="M18.364 5.636a1 1 0 0 1 0 1.414L13.414 12l4.95 4.95a1 1 0 0 1-1.414 1.414L12 13.414l-4.95 4.95a1 1 0 0 1-1.414-1.414L10.586 12 5.636 7.05a1 1 0 0 1 1.414-1.414L12 10.586l4.95-4.95a1 1 0 0 1 1.414 0z" />
              ) : (
                <path fillRule="evenodd" clipRule="evenodd" d="M4 6h16v2H4V6zm0 5h16v2H4v-2zm0 5h16v2H4v-2z" />
              )}
            </svg>
          </button>
        </div>
      </div>

      <div
        className={cn(
          "overflow-hidden border-t border-line bg-ink transition-all duration-300 xl:hidden",
          mobileMenuOpen ? "max-h-[85vh] opacity-100" : "max-h-0 border-transparent opacity-0"
        )}
      >
        <div className="flex flex-col gap-1 px-5 py-5">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="display border-b border-line py-3 text-lg text-white"
            >
              {link.label}
            </Link>
          ))}

          <p className="eyebrow mt-5 mb-1">Book Now</p>
          <a
            href={waLink(BOOK_MESSAGE)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 flex items-center gap-3 rounded-lg border border-[#25D366]/25 bg-[#25D366]/10 p-4 text-white transition-colors hover:bg-[#25D366]/20"
          >
            <WhatsAppIcon className="h-5 w-5 fill-[#25D366]" />
            <span className="font-medium">WhatsApp</span>
          </a>
          <button
            type="button"
            onClick={copyWechat}
            className="mt-2 flex cursor-pointer items-center gap-3 rounded-lg border border-[#07C160]/25 bg-[#07C160]/10 p-4 text-left text-white transition-colors hover:bg-[#07C160]/20"
          >
            <MessageCircle className="h-5 w-5 text-[#07C160]" />
            <span className="font-medium">{copied ? "ID Copied!" : "WeChat"}</span>
          </button>
        </div>
      </div>
    </nav>
  )
}

"use client"

import { useState, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"
import { MessageCircle } from "lucide-react"

const WHATSAPP_NUMBER = "62881037512641"
const WECHAT_ID = "wxid_tz213yzqzud422"

interface ContactDropdownProps {
  label: string
  message?: string
  className?: string
  variant?: "gold" | "outline" | "small"
  icon?: React.ReactNode
}

export default function ContactDropdown({ label, message, className, variant = "gold", icon }: ContactDropdownProps) {
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const waMessage = encodeURIComponent(message || "Hi! I'd like to book a driver in Bali.")
  const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${waMessage}`

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    if (open) document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [open])

  const baseStyles = {
    gold: "bg-luxury-gold text-dark-surface hover:bg-luxury-gold-hover hover:scale-105 shadow-[0_0_20px_rgba(212,175,55,0.3)]",
    outline: "bg-white/5 text-white hover:bg-white/10 border border-white/10",
    small: "bg-luxury-gold text-dark-surface hover:bg-luxury-gold-hover",
  }

  return (
    <div ref={ref} className="relative inline-flex">
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          "px-8 py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all",
          baseStyles[variant],
          className
        )}
      >
        {icon}
        {label}
      </button>

      {/* Dropdown */}
      <div
        className={cn(
          "absolute left-1/2 -translate-x-1/2 bottom-full mb-3 w-60 rounded-2xl overflow-hidden border border-white/10 shadow-2xl transition-all duration-300 origin-bottom z-50",
          "bg-[#121212]/95 backdrop-blur-xl",
          open ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-2 pointer-events-none"
        )}
      >
        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-5 py-4 hover:bg-white/5 transition-colors border-b border-white/5"
          onClick={() => setOpen(false)}
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
            setTimeout(() => { setCopied(false); setOpen(false) }, 1500)
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
  )
}

"use client"

import { useState, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"
import { MessageCircle } from "lucide-react"
import { WECHAT_ID, waLink } from "@/lib/contact"
import WhatsAppIcon from "@/components/ui/WhatsAppIcon"

interface ContactDropdownProps {
  label: string
  message?: string
  className?: string
  wrapperClassName?: string
  variant?: "primary" | "outline" | "small"
  icon?: React.ReactNode
}

const VARIANTS = {
  primary: "bg-brand text-white hover:bg-brand-hover px-7 py-4 text-xs tracking-widest",
  outline: "border border-line-strong text-white hover:border-white/35 hover:bg-white/5 px-7 py-4 text-xs tracking-widest",
  small: "bg-brand text-white hover:bg-brand-hover px-5 py-3 text-xs tracking-wide",
}

export default function ContactDropdown({
  label,
  message,
  className,
  wrapperClassName,
  variant = "primary",
  icon,
}: ContactDropdownProps) {
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    if (open) document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [open])

  return (
    <div ref={ref} className={cn("relative inline-flex", wrapperClassName)}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={cn(
          "flex cursor-pointer items-center justify-center gap-2 rounded-md font-bold uppercase transition-colors",
          VARIANTS[variant],
          className
        )}
      >
        {icon}
        {label}
      </button>

      <div
        className={cn(
          "absolute bottom-full left-1/2 z-50 mb-3 w-60 -translate-x-1/2 overflow-hidden rounded-xl border border-line bg-surface shadow-2xl transition-all duration-300",
          open ? "translate-y-0 scale-100 opacity-100" : "translate-y-2 scale-95 opacity-0 pointer-events-none"
        )}
      >
        <a
          href={waLink(message || "Hi! I'd like to book a driver in Bali.")}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 border-b border-line px-5 py-4 transition-colors hover:bg-white/5"
          onClick={() => setOpen(false)}
        >
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#25D366]/15">
            <WhatsAppIcon className="h-4 w-4 fill-[#25D366]" />
          </div>
          <div className="text-left">
            <p className="text-sm font-medium text-white">WhatsApp</p>
            <p className="text-xs text-white/40">Chat with us directly</p>
          </div>
        </a>

        <button
          type="button"
          onClick={() => {
            navigator.clipboard.writeText(WECHAT_ID)
            setCopied(true)
            setTimeout(() => {
              setCopied(false)
              setOpen(false)
            }, 1500)
          }}
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
  )
}

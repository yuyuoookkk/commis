"use client"

import { useEffect, useState, type ReactNode } from "react"
import { X } from "lucide-react"

interface ModalProps {
  label: string
  closeLabel?: string
  onClose: () => void
  children: ReactNode
}

export default function Modal({ label, closeLabel = "Close", onClose, children }: ModalProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const frame = requestAnimationFrame(() => setVisible(true))
    document.body.style.overflow = "hidden"

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", handleKey)

    return () => {
      cancelAnimationFrame(frame)
      document.body.style.overflow = ""
      document.removeEventListener("keydown", handleKey)
    }
  }, [onClose])

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center px-4" onClick={onClose}>
      <div
        className={`absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity duration-300 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label={label}
        // Lenis hijacks the wheel on desktop; this opts the modal out so it scrolls natively
        data-lenis-prevent
        className={`relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-line bg-surface p-7 shadow-2xl transition-all duration-300 md:p-9 ${
          visible ? "translate-y-0 scale-100 opacity-100" : "translate-y-4 scale-95 opacity-0"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label={closeLabel}
          className="absolute top-4 right-4 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-white/5 transition-colors hover:bg-white/10"
        >
          <X className="h-5 w-5 text-white/70" />
        </button>
        {children}
      </div>
    </div>
  )
}

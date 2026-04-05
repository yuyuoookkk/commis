"use client"

import { useState } from "react"
import Image from "next/image"
import { ArrowRight, MessageCircle, Mail } from "lucide-react"
import { useLang } from "@/lib/lang"

export default function FinalCTA() {
  const [showContact, setShowContact] = useState(false)
  const { t } = useLang()

  return (
    <section id="book" className="relative py-48 overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 z-0">
        <Image 
          src="https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&q=80&w=2940" 
          alt="Bali landscape sunset" 
          fill 
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center flex flex-col items-center">
        <h2 className="font-serif text-5xl md:text-7xl text-white leading-tight mb-8">
          {t("cta.heading")}
        </h2>
        
        <p className="text-white/80 text-lg md:text-xl font-light max-w-2xl mb-12">
          {t("cta.desc")}
        </p>
        
        <div className="h-[60px] flex items-center justify-center">
          {!showContact ? (
            <button 
              onClick={() => setShowContact(true)}
              className="group relative inline-flex items-center gap-4 bg-white text-black px-8 py-4 rounded-full font-medium text-lg overflow-hidden transition-transform hover:scale-105 active:scale-95 animate-in zoom-in-95 duration-300"
            >
              <span className="relative z-10">{t("cta.startPlanning")}</span>
              <div className="relative z-10 w-8 h-8 rounded-full bg-black/10 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors duration-300">
                <ArrowRight className="w-4 h-4" />
              </div>
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-black/5 to-transparent group-hover:animate-shimmer" />
            </button>
          ) : (
            <div className="flex flex-col sm:flex-row items-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <a 
                href="#" 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#20bd5a] text-white px-8 py-4 rounded-full font-medium text-lg transition-transform hover:scale-105 active:scale-95"
              >
                <MessageCircle className="w-5 h-5" />
                {t("cta.whatsapp")}
              </a>
              <a 
                href="#" 
                className="inline-flex items-center gap-3 bg-white hover:bg-gray-100 text-black px-8 py-4 rounded-full font-medium text-lg transition-transform hover:scale-105 active:scale-95"
              >
                <Mail className="w-5 h-5" />
                {t("cta.email")}
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

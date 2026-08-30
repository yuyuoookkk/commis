"use client"

import Link from "next/link"
import Image from "next/image"
import { Mail, Globe, MessageCircle } from "lucide-react"
import { useLang } from "@/lib/lang"

export default function Footer() {
  const { t } = useLang()

  return (
    <footer className="bg-[#0a0a0a] text-white/60 py-20 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">

          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-3 mb-6 text-white group">
              <div className="relative w-10 h-10 overflow-hidden group-hover:scale-105 transition-transform shrink-0">
                <Image src="/image.png" alt="Violet Bali Driver Logo" fill sizes="40px" className="object-contain" priority />
              </div>
              <span className="font-serif text-lg font-medium tracking-wide">Violet Bali Driver</span>
            </Link>
            <p className="text-sm max-w-sm">
              {t("footer.tagline")}
            </p>
          </div>

          {/* Listings Links */}
          <div>
            <h4 className="text-white text-sm font-semibold tracking-wider uppercase mb-6">Popular Routes</h4>
            <ul className="space-y-4 text-sm">
              <li><Link href="#pricing" className="hover:text-white transition-colors">Airport → Seminyak / Canggu</Link></li>
              <li><Link href="#pricing" className="hover:text-white transition-colors">Airport → Ubud</Link></li>
              <li><Link href="#pricing" className="hover:text-white transition-colors">Kuta / Uluwatu Tour</Link></li>
              <li><Link href="#pricing" className="hover:text-white transition-colors">Kuta → Kintamani Tour</Link></li>
            </ul>
          </div>

          {/* Company Links — scroll to relevant sections */}
          <div>
            <h4 className="text-white text-sm font-semibold tracking-wider uppercase mb-6">{t("footer.company")}</h4>
            <ul className="space-y-4 text-sm">
              <li><Link href="#how-it-works" className="hover:text-white transition-colors">{t("footer.about")}</Link></li>
              <li><Link href="#book" className="hover:text-white transition-colors">{t("footer.contact")}</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white text-sm font-semibold tracking-wider uppercase mb-6">{t("footer.contact")}</h4>
            <div className="space-y-4 text-sm">
              <a href="mailto:donitamba094@gmail.com" className="flex items-center gap-3 hover:text-white transition-colors">
                <Mail className="w-4 h-4 text-[#C28B6A] shrink-0" />
                <span>donitamba094@gmail.com</span>
              </a>
              <a href="https://wa.me/62881037512641" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-white transition-colors">
                <MessageCircle className="w-4 h-4 text-[#25D366] shrink-0" />
                <span>+62 881-0375-12641</span>
              </a>
              <a href="https://violetbalidriver.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-white transition-colors">
                <Globe className="w-4 h-4 text-white/40 shrink-0" />
                <span>violetbalidriver.com</span>
              </a>
            </div>
          </div>

        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs">
            © {new Date().getFullYear()} {t("footer.copyright")}
          </p>
          <div className="flex items-center gap-4">
            <a href="mailto:donitamba094@gmail.com" className="text-white/60 hover:text-white transition-colors" aria-label="Email">
              <Mail className="w-5 h-5" />
            </a>
            <a href="https://violetbalidriver.com" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors" aria-label="Website">
              <Globe className="w-5 h-5" />
            </a>
            <a href="https://wa.me/62881037512641" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors" aria-label="WhatsApp">
              <MessageCircle className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

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
                <Image src="/image.png" alt="Bintang Bali Logo" fill sizes="40px" className="object-contain" priority />
              </div>
              <span className="font-serif text-lg font-medium tracking-wide">Bintang Bali</span>
            </Link>
            <p className="text-sm max-w-sm">
              {t("footer.tagline")}
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white text-sm font-semibold tracking-wider uppercase mb-6">{t("footer.experiences")}</h4>
            <ul className="space-y-4 text-sm">
              <li><Link href="#" className="hover:text-white transition-colors">{t("footer.templeCulture")}</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">{t("footer.beachSunset")}</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">{t("footer.trekking")}</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">{t("footer.honeymoon")}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white text-sm font-semibold tracking-wider uppercase mb-6">{t("footer.company")}</h4>
            <ul className="space-y-4 text-sm">
              <li><Link href="#" className="hover:text-white transition-colors">{t("footer.about")}</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">{t("footer.contact")}</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">{t("footer.terms")}</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">{t("footer.privacy")}</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white text-sm font-semibold tracking-wider uppercase mb-6">{t("footer.company")}</h4>
            <div className="space-y-4 text-sm">
              <a href="#" className="flex items-center gap-3 hover:text-white transition-colors">
                <Mail className="w-4 h-4 text-[#C28B6A] shrink-0" />
                <span>info@bintangbali.com</span>
              </a>
              <a href="#" className="flex items-center gap-3 hover:text-white transition-colors">
                <MessageCircle className="w-4 h-4 text-[#25D366] shrink-0" />
                <span>+62 812-3456-7890</span>
              </a>
              <a href="#" className="flex items-center gap-3 hover:text-white transition-colors">
                <Globe className="w-4 h-4 text-white/40 shrink-0" />
                <span>bintangbaliholiday.com</span>
              </a>
            </div>
          </div>

        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs">
            © {new Date().getFullYear()} {t("footer.copyright")}
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-white/60 hover:text-white transition-colors" aria-label="Email">
              <Mail className="w-5 h-5" />
            </a>
            <a href="#" className="text-white/60 hover:text-white transition-colors" aria-label="Website">
              <Globe className="w-5 h-5" />
            </a>
            <a href="#" className="text-white/60 hover:text-white transition-colors" aria-label="Message">
              <MessageCircle className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

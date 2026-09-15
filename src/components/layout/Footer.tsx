"use client"

import Link from "next/link"
import Image from "next/image"
import { Mail, Globe, MessageCircle } from "lucide-react"
import { useLang } from "@/lib/lang"

const EMAIL = "donitamba094@gmail.com"
const WEBSITE = "https://violetbalidriver.com"
const WHATSAPP_URL = "https://wa.me/62881037512641"

export default function Footer() {
  const { t } = useLang()

  return (
    <footer className="border-t border-line bg-ink py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-14 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <div>
            <Link href="/" className="group mb-5 inline-flex items-center gap-2.5 text-white">
              <div className="relative h-9 w-9 shrink-0 overflow-hidden transition-transform group-hover:scale-105">
                <Image src="/image.png" alt="Violet Bali Driver Logo" fill sizes="36px" className="object-contain" />
              </div>
              <span className="display text-lg tracking-wide">Violet Bali Driver</span>
            </Link>
            <p className="max-w-sm text-sm leading-relaxed text-white/45">{t("footer.tagline")}</p>
          </div>

          <div>
            <h4 className="eyebrow mb-5">Popular Routes</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="#pricing" className="text-white/50 transition-colors hover:text-white">Airport → Seminyak / Canggu</Link></li>
              <li><Link href="#pricing" className="text-white/50 transition-colors hover:text-white">Airport → Ubud</Link></li>
              <li><Link href="#pricing" className="text-white/50 transition-colors hover:text-white">Kuta / Uluwatu Tour</Link></li>
              <li><Link href="#pricing" className="text-white/50 transition-colors hover:text-white">Kuta → Kintamani Tour</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="eyebrow mb-5">{t("footer.company")}</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="#packages" className="text-white/50 transition-colors hover:text-white">{t("tours.heading")}</Link></li>
              <li><Link href="#how-it-works" className="text-white/50 transition-colors hover:text-white">{t("footer.about")}</Link></li>
              <li><Link href="#book" className="text-white/50 transition-colors hover:text-white">{t("footer.contact")}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="eyebrow mb-5">{t("footer.contact")}</h4>
            <div className="space-y-3 text-sm">
              <a href={`mailto:${EMAIL}`} className="flex items-center gap-3 text-white/50 transition-colors hover:text-white">
                <Mail className="h-4 w-4 shrink-0 text-brand" />
                <span>{EMAIL}</span>
              </a>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-white/50 transition-colors hover:text-white">
                <MessageCircle className="h-4 w-4 shrink-0 text-[#25D366]" />
                <span>+62 881-0375-12641</span>
              </a>
              <a href={WEBSITE} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-white/50 transition-colors hover:text-white">
                <Globe className="h-4 w-4 shrink-0 text-white/35" />
                <span>violetbalidriver.com</span>
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-line pt-7 md:flex-row">
          <p className="text-xs text-white/35">
            © {new Date().getFullYear()} {t("footer.copyright")}
          </p>
          <div className="flex items-center gap-4">
            <a href={`mailto:${EMAIL}`} className="text-white/45 transition-colors hover:text-white" aria-label="Email">
              <Mail className="h-5 w-5" />
            </a>
            <a href={WEBSITE} target="_blank" rel="noopener noreferrer" className="text-white/45 transition-colors hover:text-white" aria-label="Website">
              <Globe className="h-5 w-5" />
            </a>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="text-white/45 transition-colors hover:text-white" aria-label="WhatsApp">
              <MessageCircle className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

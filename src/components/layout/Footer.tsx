import Link from "next/link"
import Image from "next/image"
import { Mail, Globe, MessageCircle, ArrowRight } from "lucide-react"

export default function Footer() {
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
              Your Journey • Our Passion. Curated holiday experiences across the Island of the Gods.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white text-sm font-semibold tracking-wider uppercase mb-6">Experiences</h4>
            <ul className="space-y-4 text-sm">
              <li><Link href="#" className="hover:text-white transition-colors">Temple & Culture tours</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Beach & Sunset Packages</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Mt. Agung Trekking</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Honeymoon Packages</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white text-sm font-semibold tracking-wider uppercase mb-6">Company</h4>
            <ul className="space-y-4 text-sm">
              <li><Link href="#" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Contact</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Terms & Conditions</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white text-sm font-semibold tracking-wider uppercase mb-6">Newsletter</h4>
            <p className="text-sm mb-4">Subscribe for travel inspiration and exclusive offers.</p>
            <form className="relative flex items-center">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full bg-white/5 border border-white/10 rounded-full px-5 py-3 text-sm text-white focus:outline-none focus:border-[#C28B6A] transition-colors"
                required
              />
              <button 
                type="submit" 
                className="absolute right-1 w-10 h-10 rounded-full bg-white flex items-center justify-center hover:bg-[#C28B6A] group transition-colors"
              >
                <ArrowRight className="w-4 h-4 text-black group-hover:text-white transition-colors" />
              </button>
            </form>
          </div>

        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs">
            © {new Date().getFullYear()} Bintang Bali Holiday. All rights reserved.
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

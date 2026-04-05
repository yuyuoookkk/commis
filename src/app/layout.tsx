import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import "./globals.css"
import SmoothScroll from "@/components/layout/SmoothScroll"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import Providers from "@/components/Providers"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
})

export const metadata = {
  title: "Bintang Bali Holiday | Your Journey • Our Passion",
  description: "A Bali-based travel agency offering curated holiday experiences across the Island of the Gods.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} antialiased`} suppressHydrationWarning>
      <body className="font-sans antialiased bg-[#0d1117] text-white">
        <Providers>
          <SmoothScroll>
            <Navbar />
            {children}
            <Footer />
          </SmoothScroll>
        </Providers>
      </body>
    </html>
  )
}

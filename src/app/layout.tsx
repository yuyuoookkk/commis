import type { Metadata } from "next"
import { Inter, Oswald } from "next/font/google"
import "./globals.css"
import SmoothScroll from "@/components/layout/SmoothScroll"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import Providers from "@/components/Providers"
import { Analytics } from "@vercel/analytics/next"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-oswald",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Violet Bali Driver | Your Journey • Our Passion",
  description: "Premium private driver services in Bali. Explore the Island of the Gods in comfort and style.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${oswald.variable} antialiased`} suppressHydrationWarning>
      <body className="font-sans antialiased bg-ink text-white">
        <Providers>
          <SmoothScroll>
            <Navbar />
            {children}
            <Footer />
          </SmoothScroll>
        </Providers>
        <Analytics />
      </body>
    </html>
  )
}

"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"

type Lang = "en" | "id"

interface LangContextType {
  lang: Lang
  toggle: () => void
  t: (key: string) => string
}

const translations: Record<string, Record<Lang, string>> = {
  // Navbar
  "nav.tours": { en: "Tours & Packages", id: "Tur & Paket" },
  "nav.moments": { en: "Moments", id: "Momen" },
  "nav.howItWorks": { en: "How it Works", id: "Cara Kerja" },
  "nav.reviews": { en: "Reviews", id: "Ulasan" },
  "nav.book": { en: "Book Journey", id: "Pesan Sekarang" },

  // Hero
  "hero.travelers": { en: "2,500+ happy travelers", id: "2.500+ wisatawan puas" },
  "hero.exploreBali": { en: "Explore Bali's finest with us", id: "Jelajahi keindahan Bali bersama kami" },
  "hero.tapToExplore": { en: "Tap to explore", id: "Ketuk untuk jelajahi" },
  "hero.exploreDestinations": { en: "Explore Destinations", id: "Jelajahi Destinasi" },

  // Hero Tours
  "hero.tour1.category": { en: "Active Volcano Trek", id: "Pendakian Gunung Berapi" },
  "hero.tour1.headline": { en: "Conquer the Dawn", id: "Taklukkan Fajar" },
  "hero.tour1.subhead": { en: "A rewarding sunrise hike above the clouds.", id: "Pendakian matahari terbit yang menakjubkan di atas awan." },
  "hero.tour2.category": { en: "Temple & Culture", id: "Pura & Budaya" },
  "hero.tour2.headline": { en: "Dance with the Gods", id: "Menari Bersama Para Dewa" },
  "hero.tour2.subhead": { en: "Witness the legendary Kecak fire dance at sunset.", id: "Saksikan tarian api Kecak yang legendaris saat matahari terbenam." },
  "hero.tour3.category": { en: "Beach & Sunset", id: "Pantai & Matahari Terbenam" },
  "hero.tour3.headline": { en: "Untamed Paradise", id: "Surga yang Liar" },
  "hero.tour3.subhead": { en: "Explore towering cliffs and crystal clear waters.", id: "Jelajahi tebing-tebing menjulang dan air jernih sebening kristal." },

  // Featured Moments
  "moments.label": { en: "Featured Moments", id: "Momen Pilihan" },
  "moments.heading": { en: "Curated experiences for the soulful traveler.", id: "Pengalaman pilihan untuk wisatawan sejati." },
  "moments.desc": { en: "A collection of unscripted moments, dramatic landscapes, and profound cultural encounters waiting for you in Bali.", id: "Koleksi momen autentik, lanskap dramatis, dan perjumpaan budaya mendalam yang menanti Anda di Bali." },
  "moments.sacredCleansing": { en: "Sacred Cleansing", id: "Melukat" },
  "moments.tirtaEmpul": { en: "Tirta Empul Temple", id: "Pura Tirta Empul" },
  "moments.morningLight": { en: "Morning Light", id: "Cahaya Pagi" },
  "moments.tegalalang": { en: "Tegalalang Rice Terrace", id: "Terasering Tegalalang" },
  "moments.hiddenWaterfalls": { en: "Hidden Waterfalls", id: "Air Terjun Tersembunyi" },
  "moments.sekumpul": { en: "Sekumpul Waterfall", id: "Air Terjun Sekumpul" },
  "moments.goldenHour": { en: "Golden Hour Trek", id: "Pendakian Senja Emas" },
  "moments.mountBatur": { en: "Mount Batur", id: "Gunung Batur" },

  // Tour Packages
  "tours.label": { en: "Our Services", id: "Layanan Kami" },
  "tours.heading": { en: "Tours & Packages", id: "Tur & Paket" },
  "tours.desc": { en: "From full-day island adventures to airport transfers and wedding rides — everything you need for the perfect Bali experience.", id: "Dari tur seharian hingga antar jemput bandara dan kendaraan pernikahan — semua yang Anda butuhkan untuk pengalaman Bali yang sempurna." },
  "tours.contactUs": { en: "Contact Us for Pricing", id: "Hubungi Kami untuk Harga" },
  "tours.priceNote": { en: "Prices vary by season and group size. Reach out for a personalized quote.", id: "Harga bervariasi berdasarkan musim dan ukuran grup. Hubungi kami untuk penawaran khusus." },

  // Tour items
  "tours.fullDay.title": { en: "Full Day Tour", id: "Tur Seharian" },
  "tours.fullDay.subtitle": { en: "Max 10 Hours", id: "Maks 10 Jam" },
  "tours.fullDay.desc": { en: "Maximum 10 hours of exploration. Includes petrol, car, and driver. All cars are newest models starting from 2022.", id: "Maksimal 10 jam eksplorasi. Termasuk bensin, mobil, dan sopir. Semua mobil model terbaru mulai tahun 2022." },
  "tours.halfDay.title": { en: "Half Day Tour", id: "Tur Setengah Hari" },
  "tours.halfDay.subtitle": { en: "Max 6 Hours", id: "Maks 6 Jam" },
  "tours.halfDay.desc": { en: "Maximum 6 hours of sightseeing. Includes petrol, car, and driver. All cars are newest models starting from 2022.", id: "Maksimal 6 jam wisata. Termasuk bensin, mobil, dan sopir. Semua mobil model terbaru mulai tahun 2022." },
  "tours.shuttle.title": { en: "Shuttle Penida Island", id: "Shuttle Pulau Penida" },
  "tours.shuttle.subtitle": { en: "Transfer Service", id: "Layanan Transfer" },
  "tours.shuttle.desc": { en: "Transportation only, from hotel to harbour and harbour back to hotel.", id: "Transportasi saja, dari hotel ke pelabuhan dan pelabuhan kembali ke hotel." },
  "tours.penida.title": { en: "Full Package Penida Island", id: "Paket Lengkap Pulau Penida" },
  "tours.penida.subtitle": { en: "One Day Trip", id: "Perjalanan Satu Hari" },
  "tours.penida.desc": { en: "All-inclusive package: transportation, round-trip boat ticket, and private car with driver on Penida Island.", id: "Paket all-inclusive: transportasi, tiket perahu pulang-pergi, dan mobil pribadi dengan sopir di Pulau Penida." },
  "tours.airport.title": { en: "Airport & Hotel Transfer", id: "Antar Jemput Bandara & Hotel" },
  "tours.airport.subtitle": { en: "Check In / Check Out", id: "Check In / Check Out" },
  "tours.airport.desc": { en: "Premium service including mineral water and newest car, waiting at the airport or hotel.", id: "Layanan premium termasuk air mineral dan mobil terbaru, menunggu di bandara atau hotel." },
  "tours.wedding.title": { en: "Wedding Vehicle", id: "Kendaraan Pernikahan" },
  "tours.wedding.subtitle": { en: "Special Occasions", id: "Acara Spesial" },
  "tours.wedding.desc": { en: "Private vehicle that can be customised and decorated as per request for wedding occasions.", id: "Kendaraan pribadi yang dapat disesuaikan dan dihias sesuai permintaan untuk acara pernikahan." },
  "tours.rentCar.title": { en: "Rent Car", id: "Sewa Mobil" },
  "tours.rentCar.subtitle": { en: "Self‑Drive", id: "Lepas Kunci" },
  "tours.rentCar.desc": { en: "Self-drive rental with our newest car models.", id: "Sewa mobil lepas kunci dengan model mobil terbaru kami." },

  // Tour features
  "feat.petrol": { en: "Petrol included", id: "Bensin termasuk" },
  "feat.driver": { en: "Private driver", id: "Sopir pribadi" },
  "feat.newestCar": { en: "Newest car models", id: "Mobil model terbaru" },
  "feat.hotelPickup": { en: "Hotel pickup", id: "Penjemputan hotel" },
  "feat.harbourDrop": { en: "Harbour drop‑off", id: "Antar ke pelabuhan" },
  "feat.return": { en: "Return transfer", id: "Transfer pulang" },
  "feat.allInclusive": { en: "All‑inclusive", id: "All-inclusive" },
  "feat.boatTicket": { en: "Boat ticket", id: "Tiket perahu" },
  "feat.privateCar": { en: "Private car on island", id: "Mobil pribadi di pulau" },
  "feat.mineralWater": { en: "Mineral water", id: "Air mineral" },
  "feat.newestCarShort": { en: "Newest car", id: "Mobil terbaru" },
  "feat.meetGreet": { en: "Meet & greet", id: "Penyambutan" },
  "feat.customDeco": { en: "Custom decoration", id: "Dekorasi khusus" },
  "feat.privateVehicle": { en: "Private vehicle", id: "Kendaraan pribadi" },
  "feat.weddingReady": { en: "Wedding‑ready", id: "Siap pernikahan" },
  "feat.selfDrive": { en: "Self‑drive", id: "Lepas kunci" },
  "feat.newestModels": { en: "Newest models", id: "Model terbaru" },
  "feat.flexibleRental": { en: "Flexible rental", id: "Sewa fleksibel" },

  // Package cards
  "card.bestSeller": { en: "Best Seller", id: "Terlaris" },
  "card.details": { en: "Details", id: "Detail" },
  "card.book": { en: "Book", id: "Pesan" },
  "card.pricing": { en: "Pricing", id: "Harga" },
  "card.startFrom": { en: "Start from", id: "Mulai dari" },
  "card.onRequest": { en: "On request", id: "Sesuai permintaan" },
  "card.whatsIncluded": { en: "What's included", id: "Yang termasuk" },

  // Car Unit
  "carUnit.label": { en: "Car Unit", id: "Unit Mobil" },
  "carUnit.heading": { en: "Meet Our Cars", id: "Kenali Mobil Kami" },
  "carUnit.desc": { en: "The actual vehicles that will pick you up — clean, well-maintained Toyota Avanza units from 2022 onwards, ready for airport transfers and full-day tours.", id: "Kendaraan asli yang akan menjemput Anda — unit Toyota Avanza yang bersih dan terawat, keluaran 2022 ke atas, siap untuk antar jemput bandara dan tur seharian." },
  "carUnit.pax": { en: "Passengers", id: "Penumpang" },
  "carUnit.bags": { en: "Bags", id: "Koper" },
  "carUnit.bookThisCar": { en: "Book This Car", id: "Pesan Mobil Ini" },
  "carUnit.avanzaBlack.name": { en: "Toyota Avanza", id: "Toyota Avanza" },
  "carUnit.avanzaBlack.color": { en: "Black — Bali Plate", id: "Hitam — Plat Bali" },
  "carUnit.avanzaWhite.name": { en: "Toyota Avanza", id: "Toyota Avanza" },
  "carUnit.avanzaWhite.color": { en: "White — Bali Plate", id: "Putih — Plat Bali" },
  "carUnit.feat.dualAc": { en: "Dual air conditioning", id: "AC ganda" },
  "carUnit.feat.usbCharging": { en: "USB charging ports", id: "Port pengisian USB" },
  "carUnit.feat.recliningSeats": { en: "Reclining seats", id: "Kursi dapat direbahkan" },
  "carUnit.feat.mineralWater": { en: "Complimentary mineral water", id: "Air mineral gratis" },
  "carUnit.feat.tintedWindows": { en: "Tinted windows", id: "Kaca film" },

  // Island Tours & Tickets
  "islandTours.label": { en: "Island Trips", id: "Perjalanan Pulau" },
  "islandTours.heading": { en: "Tours & Boat Tickets", id: "Tur & Tiket Kapal" },
  "islandTours.desc": { en: "Head across the water. Tap one to get the price and details from us on WhatsApp or WeChat.", id: "Menyeberang laut. Ketuk salah satu untuk mendapatkan harga dan detailnya dari kami via WhatsApp atau WeChat." },
  "islandTours.highlights": { en: "Tour highlights", id: "Sorotan tur" },
  "islandTours.whatYouGet": { en: "What you get", id: "Yang Anda dapatkan" },
  "islandTours.chooseDeparture": { en: "Choose your departure harbour", id: "Pilih pelabuhan keberangkatan" },
  "islandTours.tapForPrice": { en: "Tap for price & details", id: "Ketuk untuk harga & detail" },
  "islandTours.tourNote": { en: "Price and the full itinerary depend on your dates and group size. Message us and we will send you a personalised quote.", id: "Harga dan itinerari lengkap tergantung tanggal dan jumlah peserta. Hubungi kami dan kami akan mengirimkan penawaran khusus untuk Anda." },
  "islandTours.ticketNote": { en: "Tell us your departure harbour, travel date, number of passengers, and whether you need one way or return — we will send you the price and secure your seats.", id: "Beri tahu kami pelabuhan keberangkatan, tanggal perjalanan, jumlah penumpang, dan apakah Anda butuh sekali jalan atau pulang-pergi — kami akan mengirimkan harga dan mengamankan kursi Anda." },
  "islandTours.copied": { en: "WeChat ID Copied!", id: "ID WeChat Disalin!" },
  "islandTours.close": { en: "Close", id: "Tutup" },
  "islandTours.departure.padangBai": { en: "Padang Bai", id: "Padang Bai" },
  "islandTours.departure.sanur": { en: "Sanur", id: "Sanur" },

  "islandTours.gili.name": { en: "Gili Trawangan Boat Ticket", id: "Tiket Kapal Gili Trawangan" },
  "islandTours.gili.badge": { en: "Ticket only", id: "Tiket saja" },
  "islandTours.gili.tagline": { en: "Fast boat crossing to the Gilis", id: "Penyeberangan fast boat ke Gili" },
  "islandTours.gili.d1": { en: "Fast boat ticket only — no tour or driver included", id: "Hanya tiket fast boat — tanpa tur atau sopir" },
  "islandTours.gili.d2": { en: "Two departure harbours to choose from", id: "Dua pilihan pelabuhan keberangkatan" },
  "islandTours.gili.d3": { en: "One way or return, booked for your travel date", id: "Sekali jalan atau pulang-pergi, dipesan sesuai tanggal Anda" },

  "islandTours.penida.name": { en: "Nusa Penida Tour", id: "Tur Nusa Penida" },
  "islandTours.penida.badge": { en: "One day trip", id: "Perjalanan sehari" },
  "islandTours.penida.tagline": { en: "Cliffs, coves and Kelingking", id: "Tebing, teluk, dan Kelingking" },
  "islandTours.penida.d1": { en: "Kelingking Beach viewpoint", id: "Panorama Pantai Kelingking" },
  "islandTours.penida.d2": { en: "Angel's Billabong & Broken Beach", id: "Angel's Billabong & Pasih Uug" },
  "islandTours.penida.d3": { en: "Crystal Bay for swimming and sunset", id: "Crystal Bay untuk berenang dan sunset" },
  "islandTours.penida.d4": { en: "Snorkelling session included", id: "Termasuk sesi snorkeling" },
  "islandTours.penida.d5": { en: "Fast boat from Sanur, private car and driver on the island", id: "Fast boat dari Sanur, mobil pribadi dan sopir di pulau" },

  // How it Works
  "how.label": { en: "How it Works", id: "Cara Kerja" },
  "how.heading": { en: "A seamless path to paradise.", id: "Jalan mulus menuju surga." },
  "how.journeyBegins": { en: "Your Journey Begins", id: "Perjalanan Anda Dimulai" },
  "how.tailored": { en: "Every step is tailored to you.", id: "Setiap langkah disesuaikan untuk Anda." },
  "how.step1.title": { en: "Discover Your Vibe", id: "Temukan Gaya Anda" },
  "how.step1.desc": { en: "Browse our curated packages and find the experience that speaks to your soul, from serene temples to active volcanoes.", id: "Jelajahi paket-paket pilihan kami dan temukan pengalaman yang berbicara pada jiwa Anda, dari pura yang damai hingga gunung berapi aktif." },
  "how.step2.title": { en: "Easy Booking", id: "Pemesanan Mudah" },
  "how.step2.desc": { en: "Select your dates and customize your itinerary. Secure your journey with a seamless, hassle-free booking process.", id: "Pilih tanggal dan sesuaikan itinerari Anda. Amankan perjalanan Anda dengan proses pemesanan yang mudah dan lancar." },
  "how.step3.title": { en: "Expert Guidance", id: "Panduan Ahli" },
  "how.step3.desc": { en: "Our local experts and dedicated guides will handle all logistics, ensuring you experience Bali authentically and safely.", id: "Para ahli lokal dan pemandu setia kami akan menangani semua logistik, memastikan Anda merasakan Bali secara autentik dan aman." },
  "how.step4.title": { en: "Unforgettable Memories", id: "Kenangan Tak Terlupakan" },
  "how.step4.desc": { en: "Immerse yourself fully. We take care of everything else so you can focus on making memories that last a lifetime.", id: "Nikmati sepenuhnya. Kami mengurus semuanya agar Anda bisa fokus membuat kenangan yang abadi." },

  // Testimonials
  "reviews.label": { en: "Traveler Stories", id: "Cerita Wisatawan" },
  "reviews.heading": { en: "Don't just take our word for it.", id: "Jangan hanya percaya kata kami." },

  // Final CTA
  "cta.heading": { en: "The Island of the Gods is calling you.", id: "Pulau Dewata memanggil Anda." },
  "cta.desc": { en: "Let us craft a beautiful, unscripted journey tailored exactly to the rhythm of your soul. Your next great adventure awaits.", id: "Biarkan kami merancang perjalanan indah yang disesuaikan dengan irama jiwa Anda. Petualangan besar Anda berikutnya menanti." },
  "cta.startPlanning": { en: "Start Planning", id: "Mulai Rencanakan" },
  "cta.whatsapp": { en: "WhatsApp Us", id: "WhatsApp Kami" },
  "cta.email": { en: "Email Us", id: "Email Kami" },

  // Footer
  "footer.tagline": { en: "Your Journey • Our Passion. Curated holiday experiences across the Island of the Gods.", id: "Perjalanan Anda • Semangat Kami. Pengalaman liburan terkurasi di seluruh Pulau Dewata." },
  "footer.experiences": { en: "Experiences", id: "Pengalaman" },
  "footer.templeCulture": { en: "Temple & Culture tours", id: "Tur Pura & Budaya" },
  "footer.beachSunset": { en: "Beach & Sunset Packages", id: "Paket Pantai & Matahari Terbenam" },
  "footer.trekking": { en: "Mt. Agung Trekking", id: "Pendakian Gunung Agung" },
  "footer.honeymoon": { en: "Honeymoon Packages", id: "Paket Bulan Madu" },
  "footer.company": { en: "Company", id: "Perusahaan" },
  "footer.about": { en: "About Us", id: "Tentang Kami" },
  "footer.contact": { en: "Contact", id: "Kontak" },
  "footer.terms": { en: "Terms & Conditions", id: "Syarat & Ketentuan" },
  "footer.privacy": { en: "Privacy Policy", id: "Kebijakan Privasi" },
  "footer.newsletter": { en: "Newsletter", id: "Buletin" },
  "footer.subscribe": { en: "Subscribe for travel inspiration and exclusive offers.", id: "Berlangganan untuk inspirasi perjalanan dan penawaran eksklusif." },
  "footer.emailPlaceholder": { en: "Enter your email", id: "Masukkan email Anda" },
  "footer.copyright": { en: "Violet Bali Driver. All rights reserved.", id: "Violet Bali Driver. Hak cipta dilindungi." },
}

const LangContext = createContext<LangContextType | null>(null)

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en")

  const toggle = useCallback(() => {
    setLang((prev) => (prev === "en" ? "id" : "en"))
  }, [])

  const t = useCallback(
    (key: string): string => {
      return translations[key]?.[lang] ?? key
    },
    [lang]
  )

  return (
    <LangContext.Provider value={{ lang, toggle, t }}>
      {children}
    </LangContext.Provider>
  )
}

export function useLang() {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error("useLang must be used within LangProvider")
  return ctx
}

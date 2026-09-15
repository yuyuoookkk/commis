"use client"

import Image from "next/image"
import { Check, Phone } from "lucide-react"
import { cn } from "@/lib/utils"

interface PackageCardProps {
  image: string
  title: string
  badge?: string
  description: string
  priceLabel: string
  priceValue: string
  features: string[]
  highlightLabel?: string
  detailsLabel: string
  bookLabel: string
  bookHref: string
  onDetails: () => void
  className?: string
}

export default function PackageCard({
  image,
  title,
  badge,
  description,
  priceLabel,
  priceValue,
  features,
  highlightLabel,
  detailsLabel,
  bookLabel,
  bookHref,
  onDetails,
  className,
}: PackageCardProps) {
  return (
    <article
      className={cn(
        "group glass-dark flex flex-col rounded-2xl border border-white/5 p-3 transition-colors hover:border-luxury-gold/30",
        className
      )}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-dark-elevated">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        {badge && (
          <span className="absolute top-3 left-3 rounded-full border border-white/15 bg-black/50 px-3 py-1 text-[11px] font-semibold text-white backdrop-blur-sm">
            {badge}
          </span>
        )}
        {highlightLabel && (
          <span className="absolute top-3 right-3 rounded-full bg-luxury-gold px-3 py-1 text-[10px] font-bold tracking-wider text-dark-surface uppercase">
            {highlightLabel}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col px-2 pt-5 pb-1">
        <h3 className="font-serif text-xl leading-tight text-white">{title}</h3>

        <p className="mt-3 text-sm leading-relaxed text-gray-400">{description}</p>

        <p className="mt-4 text-sm">
          <span className="text-gray-500">{priceLabel}: </span>
          <span className="font-bold text-luxury-gold">{priceValue}</span>
        </p>

        <ul className="mt-4 space-y-2.5">
          {features.map((feature) => (
            <li key={feature} className="flex items-start gap-2 text-sm text-gray-300">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-luxury-gold" />
              {feature}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex gap-2 border-t border-white/5 pt-5">
          <button
            type="button"
            onClick={onDetails}
            className="flex-1 cursor-pointer rounded-xl border border-white/10 bg-white/5 px-3 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
          >
            {detailsLabel}
          </button>
          <a
            href={bookHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-luxury-gold px-3 py-3 text-sm font-semibold text-dark-surface transition-colors hover:bg-luxury-gold-hover"
          >
            <Phone className="h-4 w-4" />
            {bookLabel}
          </a>
        </div>
      </div>
    </article>
  )
}

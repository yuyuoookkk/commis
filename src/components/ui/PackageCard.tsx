"use client"

import Image from "next/image"
import { Check, Phone, Star } from "lucide-react"
import { cn } from "@/lib/utils"

interface PackageCardProps {
  image: string
  title: string
  badge?: string
  description: string
  rating?: number
  priceLabel: string
  priceValue: string
  features: string[]
  highlightLabel?: string
  detailsLabel: string
  bookLabel: string
  bookHref: string
  onDetails: () => void
  sizes?: string
  className?: string
}

export default function PackageCard({
  image,
  title,
  badge,
  description,
  rating,
  priceLabel,
  priceValue,
  features,
  highlightLabel,
  detailsLabel,
  bookLabel,
  bookHref,
  onDetails,
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw",
  className,
}: PackageCardProps) {
  return (
    <article
      className={cn(
        "group flex flex-col rounded-xl border border-line bg-surface p-3 transition-colors duration-300 hover:border-brand/40",
        className
      )}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-surface-2">
        <Image
          src={image}
          alt={title}
          fill
          sizes={sizes}
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {badge && (
          <span className="absolute top-2 left-2 rounded bg-black/65 px-2 py-1 text-[10px] font-semibold tracking-wider text-white uppercase backdrop-blur-sm">
            {badge}
          </span>
        )}
        {highlightLabel && (
          <span className="absolute top-2 right-2 rounded bg-brand px-2 py-1 text-[10px] font-bold tracking-wider text-white uppercase">
            {highlightLabel}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col px-1 pt-4 pb-1">
        <h3 className="display text-lg text-white">{title}</h3>

        {rating !== undefined && (
          <div className="mt-2 flex items-center gap-1.5">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }, (_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "h-3 w-3",
                    i < Math.round(rating) ? "fill-brand text-brand" : "text-white/20"
                  )}
                />
              ))}
            </div>
            <span className="text-[11px] font-semibold text-white/50">{rating.toFixed(1)}</span>
          </div>
        )}

        <p className="mt-3 text-[13px] leading-relaxed text-white/45">{description}</p>

        <p className="mt-4 text-[13px]">
          <span className="text-white/40">{priceLabel}: </span>
          <span className="font-semibold text-brand">{priceValue}</span>
        </p>

        <ul className="mt-4 space-y-2">
          {features.map((feature) => (
            <li key={feature} className="flex items-start gap-2 text-[13px] text-white/60">
              <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand" />
              {feature}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex gap-2 border-t border-line pt-4">
          <button
            type="button"
            onClick={onDetails}
            className="flex-1 cursor-pointer rounded-md border border-line-strong px-3 py-2.5 text-xs font-semibold tracking-wide text-white/80 uppercase transition-colors hover:border-white/30 hover:text-white"
          >
            {detailsLabel}
          </button>
          <a
            href={bookHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-1 items-center justify-center gap-1.5 rounded-md bg-brand px-3 py-2.5 text-xs font-bold tracking-wide text-white uppercase transition-colors hover:bg-brand-hover"
          >
            <Phone className="h-3.5 w-3.5" />
            {bookLabel}
          </a>
        </div>
      </div>
    </article>
  )
}

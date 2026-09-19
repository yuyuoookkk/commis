"use client"

import { useState, useEffect } from "react"
import { X, Star, Check } from "lucide-react"
import { submitReview } from "@/lib/reviews"

const MAX_COMMENT = 1000

export default function ReviewModal({ onClose }: { onClose: () => void }) {
  const [name, setName] = useState("")
  const [rating, setRating] = useState(0)
  const [hovered, setHovered] = useState(0)
  const [comment, setComment] = useState("")
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle")
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    document.body.style.overflow = "hidden"
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", handleKey)
    return () => {
      document.body.style.overflow = ""
      document.removeEventListener("keydown", handleKey)
    }
  }, [onClose])

  const trimmedName = name.trim()
  const trimmedComment = comment.trim()
  const valid =
    trimmedName.length >= 2 &&
    trimmedName.length <= 60 &&
    rating >= 1 &&
    trimmedComment.length >= 10 &&
    trimmedComment.length <= MAX_COMMENT

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!valid || status === "sending") return

    setStatus("sending")
    setError(null)
    try {
      await submitReview({ name: trimmedName, rating, comment: trimmedComment })
      setStatus("sent")
    } catch {
      setStatus("idle")
      setError("Something went wrong. Please try again, or message us on WhatsApp.")
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Write a review"
        // Lenis hijacks the wheel on desktop; this opts the modal out so it scrolls natively
        data-lenis-prevent
        className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-[#121212] border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl animate-[modalIn_0.3s_ease-out]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-5 h-5 text-white/70" />
        </button>

        {status === "sent" ? (
          <div className="py-8 text-center">
            <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-luxury-gold/15">
              <Check className="h-7 w-7 text-luxury-gold" />
            </div>
            <h3 className="font-serif text-2xl text-white mb-3">Thank you!</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-8">
              Your review has been sent. It will appear on the site once we&apos;ve had a chance to
              read it.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="px-8 py-3 rounded-xl bg-luxury-gold text-dark-surface font-semibold hover:bg-luxury-gold-hover transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-luxury-gold bg-luxury-gold/10 px-3 py-1 rounded-full mb-6">
              Your Experience
            </span>

            <h3 className="font-serif text-2xl md:text-3xl text-white mb-2">Write a review</h3>
            <p className="text-gray-400 text-sm mb-8 pb-8 border-b border-white/10">
              Tell other travellers how your trip went. We read every review before it goes up.
            </p>

            {/* Rating */}
            <label className="block text-white font-medium mb-3">Your rating</label>
            <div className="flex gap-1.5 mb-8" onMouseLeave={() => setHovered(0)}>
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setRating(value)}
                  onMouseEnter={() => setHovered(value)}
                  aria-label={`${value} star${value > 1 ? "s" : ""}`}
                  className="cursor-pointer p-1 transition-transform hover:scale-110"
                >
                  <Star
                    className={`w-8 h-8 transition-colors ${
                      value <= (hovered || rating)
                        ? "fill-luxury-gold text-luxury-gold"
                        : "text-white/25"
                    }`}
                  />
                </button>
              ))}
            </div>

            {/* Name */}
            <label htmlFor="review-name" className="block text-white font-medium mb-3">
              Your name
            </label>
            <input
              id="review-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={60}
              placeholder="e.g. Sarah from Australia"
              className="w-full mb-8 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-600 focus:outline-none focus:border-luxury-gold/50 transition-colors"
            />

            {/* Comment */}
            <label htmlFor="review-comment" className="block text-white font-medium mb-3">
              Your review
            </label>
            <textarea
              id="review-comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              maxLength={MAX_COMMENT}
              rows={5}
              placeholder="What did you enjoy? How was your driver?"
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-600 focus:outline-none focus:border-luxury-gold/50 transition-colors resize-none"
            />
            <p className="mt-2 mb-8 text-right text-xs text-gray-600">
              {trimmedComment.length}/{MAX_COMMENT}
            </p>

            {error && (
              <p className="mb-6 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={!valid || status === "sending"}
              className="w-full px-8 py-4 rounded-xl bg-luxury-gold text-dark-surface font-semibold transition-all hover:bg-luxury-gold-hover disabled:opacity-40 disabled:cursor-not-allowed enabled:cursor-pointer"
            >
              {status === "sending" ? "Sending…" : "Submit review"}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Star, Check, EyeOff, Trash2, LogOut, ArrowLeft, Loader2 } from "lucide-react"
import {
  supabase,
  reviewsEnabled,
  isAdmin,
  fetchAllReviews,
  setReviewApproved,
  deleteReview,
  type AdminReview,
} from "@/lib/reviews"

type Gate = "loading" | "signed-out" | "not-admin" | "ready"

function Stars({ rating }: { rating: number }) {
  return (
    <span className="flex gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={`h-3.5 w-3.5 ${
            i < rating ? "fill-luxury-gold text-luxury-gold" : "text-white/20"
          }`}
        />
      ))}
    </span>
  )
}

function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // A successful sign-in fires onAuthStateChange, which re-runs the gate below.
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!supabase || busy) return

    setBusy(true)
    setError(null)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    setBusy(false)

    // Supabase distinguishes a wrong password from an unconfirmed email or a
    // disabled provider, and that difference is what you need to fix it.
    if (error) setError(error.message)
  }

  return (
    <form onSubmit={handleSubmit} className="glass-dark w-full max-w-sm rounded-2xl border border-white/5 p-8">
      <h1 className="mb-2 font-serif text-2xl text-white">Review dashboard</h1>
      <p className="mb-8 text-sm text-gray-500">Sign in to publish guest reviews.</p>

      <label htmlFor="email" className="mb-2 block text-sm font-medium text-white">Email</label>
      <input
        id="email"
        type="email"
        autoComplete="username"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="mb-5 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white transition-colors focus:border-luxury-gold/50 focus:outline-none"
      />

      <label htmlFor="password" className="mb-2 block text-sm font-medium text-white">Password</label>
      <input
        id="password"
        type="password"
        autoComplete="current-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="mb-6 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white transition-colors focus:border-luxury-gold/50 focus:outline-none"
      />

      {error && (
        <p className="mb-5 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={busy}
        className="w-full cursor-pointer rounded-xl bg-luxury-gold px-8 py-3.5 font-semibold text-dark-surface transition-colors hover:bg-luxury-gold-hover disabled:opacity-40"
      >
        {busy ? "Signing in…" : "Sign in"}
      </button>
    </form>
  )
}

function ReviewRow({
  review,
  onApproved,
  onDeleted,
}: {
  review: AdminReview
  onApproved: (approved: boolean) => void
  onDeleted: () => void
}) {
  const [busy, setBusy] = useState(false)
  const [confirming, setConfirming] = useState(false)
  const [error, setError] = useState(false)

  const run = async (fn: () => Promise<void>, after: () => void) => {
    setBusy(true)
    setError(false)
    try {
      await fn()
      after()
    } catch {
      setError(true)
    } finally {
      setBusy(false)
    }
  }

  return (
    <li className="glass-dark rounded-2xl border border-white/5 p-6">
      <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-2">
        <Stars rating={review.rating} />
        <span className="font-medium text-white">{review.name}</span>
        <span className="text-xs text-gray-500">
          {new Date(review.created_at).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </span>
        <span
          className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
            review.approved
              ? "bg-luxury-gold/15 text-luxury-gold"
              : "bg-white/10 text-gray-400"
          }`}
        >
          {review.approved ? "Published" : "Pending"}
        </span>
      </div>

      <p className="mb-5 text-sm leading-relaxed text-gray-300">{review.comment}</p>

      <div className="flex flex-wrap items-center gap-2">
        {review.approved ? (
          <button
            type="button"
            disabled={busy}
            onClick={() => run(() => setReviewApproved(review.id, false), () => onApproved(false))}
            className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/10 disabled:opacity-40"
          >
            <EyeOff className="h-4 w-4" /> Unpublish
          </button>
        ) : (
          <button
            type="button"
            disabled={busy}
            onClick={() => run(() => setReviewApproved(review.id, true), () => onApproved(true))}
            className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-luxury-gold px-4 py-2 text-sm font-semibold text-dark-surface transition-colors hover:bg-luxury-gold-hover disabled:opacity-40"
          >
            <Check className="h-4 w-4" /> Publish
          </button>
        )}

        {confirming ? (
          <>
            <button
              type="button"
              disabled={busy}
              onClick={() => run(() => deleteReview(review.id), onDeleted)}
              className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-red-500/90 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-500 disabled:opacity-40"
            >
              <Trash2 className="h-4 w-4" /> Delete for good
            </button>
            <button
              type="button"
              onClick={() => setConfirming(false)}
              className="cursor-pointer px-3 py-2 text-sm text-gray-400 hover:text-white"
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            type="button"
            disabled={busy}
            onClick={() => setConfirming(true)}
            className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-white/10 px-4 py-2 text-sm font-medium text-gray-400 transition-colors hover:border-red-500/40 hover:text-red-300 disabled:opacity-40"
          >
            <Trash2 className="h-4 w-4" /> Delete
          </button>
        )}

        {error && <span className="text-sm text-red-300">That didn&apos;t work. Try again.</span>}
      </div>
    </li>
  )
}

export default function AdminDashboard() {
  const [gate, setGate] = useState<Gate>("loading")
  const [reviews, setReviews] = useState<AdminReview[]>([])
  const [loadError, setLoadError] = useState(false)

  // Supabase emits the current session on subscribe and again on every sign
  // in/out, so the gate is driven entirely from this callback.
  useEffect(() => {
    if (!supabase) return
    let active = true

    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      void (async () => {
        if (!session) {
          if (active) {
            setReviews([])
            setGate("signed-out")
          }
          return
        }

        const admin = await isAdmin()
        if (!active) return
        if (!admin) {
          setGate("not-admin")
          return
        }

        setGate("ready")
        try {
          const rows = await fetchAllReviews()
          if (active) {
            setReviews(rows)
            setLoadError(false)
          }
        } catch {
          if (active) setLoadError(true)
        }
      })()
    })

    return () => {
      active = false
      data.subscription.unsubscribe()
    }
  }, [])

  if (!reviewsEnabled) {
    return (
      <p className="max-w-md text-center text-gray-400">
        Reviews are not configured yet. Add the Supabase environment variables described in{" "}
        <code className="text-luxury-gold">supabase/README.md</code>.
      </p>
    )
  }

  if (gate === "loading") {
    return <Loader2 className="h-6 w-6 animate-spin text-luxury-gold" />
  }

  if (gate === "signed-out") {
    return <LoginForm />
  }

  const signOut = () => supabase?.auth.signOut()

  if (gate === "not-admin") {
    return (
      <div className="max-w-md text-center">
        <p className="mb-6 text-gray-400">
          This account is signed in but is not an admin.
        </p>
        <button
          type="button"
          onClick={signOut}
          className="cursor-pointer rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-medium text-white hover:bg-white/10"
        >
          Sign out
        </button>
      </div>
    )
  }

  const pending = reviews.filter((r) => !r.approved)
  const published = reviews.filter((r) => r.approved)

  const update = (id: string, approved: boolean) =>
    setReviews((prev) => prev.map((r) => (r.id === id ? { ...r, approved } : r)))
  const remove = (id: string) => setReviews((prev) => prev.filter((r) => r.id !== id))

  return (
    <div className="w-full max-w-3xl">
      <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl text-white">Review dashboard</h1>
          <p className="mt-1 text-sm text-gray-500">
            {pending.length} pending · {published.length} published
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/10"
          >
            <ArrowLeft className="h-4 w-4" /> Site
          </Link>
          <button
            type="button"
            onClick={signOut}
            className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/10"
          >
            <LogOut className="h-4 w-4" /> Sign out
          </button>
        </div>
      </div>

      {loadError && (
        <p className="mb-6 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          Could not load reviews. Refresh to try again.
        </p>
      )}

      <h2 className="mb-4 text-sm font-semibold tracking-wider text-luxury-gold uppercase">
        Pending
      </h2>
      {pending.length === 0 ? (
        <p className="mb-12 text-sm text-gray-500">Nothing waiting for review.</p>
      ) : (
        <ul className="mb-12 space-y-4">
          {pending.map((r) => (
            <ReviewRow
              key={r.id}
              review={r}
              onApproved={(a) => update(r.id, a)}
              onDeleted={() => remove(r.id)}
            />
          ))}
        </ul>
      )}

      <h2 className="mb-4 text-sm font-semibold tracking-wider text-luxury-gold uppercase">
        Published
      </h2>
      {published.length === 0 ? (
        <p className="text-sm text-gray-500">Nothing published yet.</p>
      ) : (
        <ul className="space-y-4">
          {published.map((r) => (
            <ReviewRow
              key={r.id}
              review={r}
              onApproved={(a) => update(r.id, a)}
              onDeleted={() => remove(r.id)}
            />
          ))}
        </ul>
      )}
    </div>
  )
}

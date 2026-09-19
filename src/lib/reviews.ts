import { createClient } from "@supabase/supabase-js"

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Null until the two env vars are set, so the site still builds and renders
// without a Supabase project attached.
export const supabase = url && anonKey ? createClient(url, anonKey) : null

export const reviewsEnabled = supabase !== null

export interface Review {
  id: string
  name: string
  rating: number
  comment: string
  created_at: string
}

export interface AdminReview extends Review {
  approved: boolean
}

export async function fetchApprovedReviews(): Promise<Review[]> {
  if (!supabase) return []

  const { data, error } = await supabase
    .from("reviews")
    .select("id, name, rating, comment, created_at")
    .eq("approved", true)
    .order("created_at", { ascending: false })
    .limit(12)

  if (error) throw error
  return data ?? []
}

export async function submitReview(input: { name: string; rating: number; comment: string }) {
  if (!supabase) throw new Error("Reviews are not configured")

  const { error } = await supabase.from("reviews").insert({
    name: input.name.trim(),
    rating: input.rating,
    comment: input.comment.trim(),
  })

  if (error) throw error
}

/* ---- dashboard ---- */
/* These only succeed for a signed-in admin; row-level security rejects
   everyone else, so they are safe to ship in public browser code. */

export async function isAdmin(): Promise<boolean> {
  if (!supabase) return false
  const { data } = await supabase.from("admins").select("user_id").maybeSingle()
  return data !== null
}

export async function fetchAllReviews(): Promise<AdminReview[]> {
  if (!supabase) return []

  const { data, error } = await supabase
    .from("reviews")
    .select("id, name, rating, comment, created_at, approved")
    .order("created_at", { ascending: false })

  if (error) throw error
  return data ?? []
}

export async function setReviewApproved(id: string, approved: boolean) {
  if (!supabase) throw new Error("Reviews are not configured")
  const { error } = await supabase.from("reviews").update({ approved }).eq("id", id)
  if (error) throw error
}

export async function deleteReview(id: string) {
  if (!supabase) throw new Error("Reviews are not configured")
  const { error } = await supabase.from("reviews").delete().eq("id", id)
  if (error) throw error
}

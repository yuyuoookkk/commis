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

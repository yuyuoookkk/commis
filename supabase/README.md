# Guest reviews setup

Visitors submit reviews from the site; nothing appears publicly until you approve it.

## 1. Create the project

1. Sign up at [supabase.com](https://supabase.com) and create a new project (free tier is fine).
2. Open **SQL Editor → New query**, paste the contents of [`schema.sql`](./schema.sql), and run it.

## 2. Connect the site

In the Supabase dashboard go to **Project Settings → API** and copy two values:

- **Project URL**
- the **anon / public** key

Add them as environment variables:

```bash
# .env.local  (already gitignored — never commit real keys)
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi...
```

Add the same two variables in your hosting dashboard (Vercel: **Settings → Environment
Variables**) and redeploy.

Without these set, the site still builds and runs — the "Write a review" button is hidden
and the placeholder testimonials show instead.

## 3. Approving reviews

New submissions land in the `reviews` table with `approved = false`, which means the site
cannot see them at all.

To publish one: **Table Editor → reviews →** tick the `approved` checkbox on that row.
It appears on the site the next time someone loads the page. Untick it to take it down.
Delete a row to discard spam.

## Why the anon key is safe to publish

The anon key is designed to sit in public browser code. What it can actually do is fixed by
the row-level security policies in `schema.sql`:

- **read** — only rows where `approved = true`
- **insert** — only rows where `approved = false`, so nobody can publish their own review
- **update / delete** — no policy exists, so both are refused

Approving happens in the dashboard, which uses your privileged credentials and bypasses RLS.
Keep the **service_role** key secret — it ignores every policy above and must never go in
this repo or in a `NEXT_PUBLIC_*` variable.

## Note on spam

Approval means junk never reaches the site, but bots can still fill the table. If that
becomes noisy, enable Supabase's built-in CAPTCHA protection or add a rate limit.

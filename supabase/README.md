# Guest reviews setup

Visitors submit reviews from the site; nothing appears publicly until you approve it at
`/admin`.

## 1. Create the project

1. Sign up at [supabase.com](https://supabase.com) and create a new project (free tier is fine).
2. Open **SQL Editor → New query**, paste the contents of [`schema.sql`](./schema.sql), and run it.
   It is safe to re-run if you change it later.

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

Without these set, the site still builds and runs — the "Write a review" button is hidden,
the placeholder testimonials show, and `/admin` says it is not configured.

## 3. Create your admin login

1. **Authentication → Users → Add user**. Use your own email and a strong password, and
   tick *Auto Confirm User*.
2. Copy the new user's **UID**.
3. **SQL Editor**, replacing the UID:

   ```sql
   insert into public.admins (user_id) values ('paste-the-uid-here');
   ```

4. **Authentication → Sign In / Providers**: turn **off** "Allow new users to sign up".
   Nobody needs to register — you add admins by hand.

## 4. Approving reviews

Go to `/admin` on your site (e.g. `violetbalidriver.com/admin`) and sign in.

- **Pending** lists everything waiting. **Publish** puts a review on the site.
- **Published** lists what is live. **Unpublish** takes one down without deleting it.
- **Delete** asks for confirmation, then removes the review permanently.

The page is excluded from search engines, but treat the URL as public — the password is
what protects it.

## Why the anon key is safe to publish

The anon key is designed to sit in public browser code. What it can actually do is fixed by
the row-level security policies in `schema.sql`:

| Who | Can do |
| --- | --- |
| Anyone, signed out | Read reviews where `approved = true`; insert a review that is forced to `approved = false` |
| Signed in, not in `admins` | Exactly the same as signed out |
| Signed in, in `admins` | Read every review, publish/unpublish, delete |

Nobody can publish their own review: the insert policy's `with check` refuses any row where
`approved` is true. There is no update or delete policy for visitors, so both are denied.
The dashboard's buttons only work because a signed-in admin's token satisfies the admin
policies — the buttons existing in public JavaScript grants nothing on its own.

Keep the **service_role** key secret. It ignores every policy above and must never appear in
this repo or in a `NEXT_PUBLIC_*` variable.

## Note on spam

Approval means junk never reaches the site, but bots can still fill the table. If that
becomes noisy, enable Supabase's built-in CAPTCHA protection or add a rate limit.

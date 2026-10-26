# Egypt Hidden Wonders content studio

The private content studio is available at `/admin`. It manages Work places, Itinerary journeys, and selected page photography: the Home hero, the three Home journey cards, and the three About guide portraits.

Content is stored as one private JSON document in Vercel Blob. Uploaded images are also private Blob objects and are served through the website's image endpoint. Local development uses the ignored `data/` directory instead.

## Production setup on Vercel

1. Open the Vercel project and create or connect a **private Blob store**. Vercel adds `BLOB_READ_WRITE_TOKEN` automatically.
2. Add these Production environment variables:
   - `ADMIN_EMAIL`
   - `ADMIN_PASSWORD_HASH`
   - `SESSION_SECRET`
3. Generate the password hash locally:

   ```powershell
   node scripts/hash-password.mjs "your strong password"
   ```

4. Generate a session secret locally:

   ```powershell
   node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
   ```

5. Redeploy after saving the environment variables.

Never commit the plain password, generated hash, session secret, Blob token, `.env.local`, or the local `data/` directory.

## Editing workflow

- Sign in at `/admin`.
- Choose **Page images**, **Work places**, or **Journeys**.
- Page images have a fixed structure: replace the image and maintain its English and Traditional Chinese accessibility description.
- Edit English and Traditional Chinese content independently.
- New items start as drafts. Turn on **Visible on website** when ready.
- Select **Publish changes** to update the public website.

The existing public content remains the fallback until the first successful publish.

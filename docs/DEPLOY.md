# Deploy kyroslabs.tech for $0 (plain English)

You already own **kyroslabs.tech**. Do **not** change DNS until the new site is live on Vercel.

## Already done for you

- Marketing site + legal pages in this repo  
- Live free weights: https://huggingface.co/MAKALY/kepler-1.1  
- `npm run build` should succeed on this code  
- Your older Vercel project **`kyros-mainframe`** stays untouched until cutover  

## Step 1 — Put this code on GitHub (you)

Cursor’s temporary remote is not your public GitHub yet. Easiest path:

1. In Cursor, click **Create repo** (or create a public repo on GitHub under your account).  
2. Push this `main` branch there.  
3. Tell me the exact GitHub URL so we update any remaining GitHub links in `src/lib/site.ts`.

## Step 2 — New Vercel project (Hobby / free)

1. Open https://vercel.com/new  
2. **Import** the GitHub repo from Step 1  
3. Framework preset: **Next.js** (auto)  
4. Click **Deploy**  
5. Wait for green  
6. Open the `*.vercel.app` URL and confirm the dark Kyros / Kepler site  

Suggested project name: **`kyros-labs`** (separate from `kyros-mainframe`).

## Step 3 — Point the domain (you — last)

Only after the preview looks right:

1. Vercel → your new project → **Settings** → **Domains**  
2. Add `kyroslabs.tech` (and `www` if you want)  
3. Copy the DNS records Vercel shows  
4. In your domain registrar, set those records  
5. Wait for HTTPS → visit https://kyroslabs.tech  
6. Remove `kyroslabs.tech` from **`kyros-mainframe`** (or old host) so only the new project answers  

## Step 4 — After cutover

- Create inbox **hello@kyroslabs.tech** (forwarding is fine)  
- Post marketing copy from [`MARKETING.md`](./MARKETING.md)  
- Full checklist: [`LAUNCH.md`](./LAUNCH.md)  

## Cost check

GitHub public + Vercel Hobby + Hugging Face public + your existing domain = **$0**.

## Troubleshooting

| Problem | Fix |
|---|---|
| Domain still shows old site | DNS not updated, or old project still owns the domain — remove domain from `kyros-mainframe` first |
| Build failed | Run `npm run build` locally; fix errors; push again |
| Wrong GitHub button on site | Send me the real repo URL after Create repo |

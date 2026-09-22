# Launch checklist (marketing-ready)

More training can wait. Ship what you have.

## Done

- [x] Dark marketing site (Kyros / Kepler 1.1)
- [x] Privacy + Terms
- [x] Free Kaggle fine-tune
- [x] Public weights: https://huggingface.co/MAKALY/kepler-1.1
- [x] HF model card + Apache 2.0
- [x] Site CTAs point at free weights + docs
- [x] Demo shows tool-gate / secret-tripwire story

## You do next (still $0)

### 1. Create the public GitHub repo
In Cursor, click **Create repo** (or create one on GitHub under your account).  
This project already has `LICENSE`, `NOTICE`, and `README.md`.

After it exists, tell me the exact URL so we update the GitHub button (placeholder is still `kyros-labs/kepler`).

### 2. Deploy on Vercel Hobby (free)
1. https://vercel.com/new  
2. Import the GitHub repo  
3. Framework: Next.js (auto)  
4. Deploy  
5. Open the `*.vercel.app` URL and confirm the site

Do **not** change DNS yet.

### 3. Point kyroslabs.tech last
Only after the Vercel preview looks right:

1. Vercel project → **Domains** → add `kyroslabs.tech`  
2. Copy DNS records into your registrar  
3. Wait for HTTPS  
4. Remove the domain from any old project so only this one answers  

Details: [`DEPLOY.md`](./DEPLOY.md)

### 4. Inbox
Create / forward **hello@kyroslabs.tech** (the site already uses it).

## Marketing copy

Ready-to-paste posts: [`MARKETING.md`](./MARKETING.md)

## Later (not blocking launch)

- Longer / stronger fine-tune on Kaggle  
- Public GitHub stars push  
- Extra eval harness  

## Cost

GitHub public + Vercel Hobby + HF public + your domain = **$0**.

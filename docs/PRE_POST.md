# Pre-post checklist — do these BEFORE you tweet

Thought through three times. **Do not post until #1–#3 are done.**

## Critical (block posting)

### 1. Push latest code to public GitHub
This Cursor agent pushes to **Origin only**. Public GitHub is still on **Kepler 1.1** (last commit ~15:30 UTC, README + description say 1.1).

Vercel deploys from GitHub → until GitHub moves, **kyroslabs.tech stays on 1.1** and `/waitlist` **404s**.

**You:** on your Mac / in Cursor, sync or push `main` to  
https://github.com/020909/KyrosLabs-Kepler-1  

Also update the GitHub **About** description to something like:

> Kepler 1.2 — open local System One from Kyros Labs. Free Apache weights.

### 2. Confirm production shows 1.2
After GitHub push + Vercel deploy (~1–3 min):

| Check | Expect |
|---|---|
| https://www.kyroslabs.tech | Hero says **Kepler 1.2** · “most powerful” |
| https://www.kyroslabs.tech/waitlist | Form (name / email / country) — **not 404** |
| https://www.kyroslabs.tech/playground | Checkpoint `MAKALY/kepler-1.2` |

Hard-refresh / private window (Safari cache lied before).

### 3. Hugging Face model card for 1.2
Weights exist, but **no README/model card** yet (“Entry not found”).

1. Open https://huggingface.co/MAKALY/kepler-1.2  
2. **Add Model Card**  
3. Paste all of `model/cards/hf-README-1.2.md`  
4. Commit  

People landing from tweets will bounce without a card.

---

## Strongly recommended (same day)

### 4. Confirm waitlist email delivery
Waitlist now also emails **hello@kyroslabs.tech** via FormSubmit.  
**First** submission sends a one-time confirm link to that inbox — click it, or leads never arrive.

Test: submit yourself on production `/waitlist`, confirm the FormSubmit email, check inbox.

### 5. Links to use when posting
From `docs/MARKETING.md`:

- Weights: https://huggingface.co/MAKALY/kepler-1.2  
- Site: https://kyroslabs.tech  
- Playground: https://kyroslabs.tech/playground  
- Waitlist: https://kyroslabs.tech/waitlist  
- GitHub: https://github.com/020909/KyrosLabs-Kepler-1  

---

## Already done (no action)

- Site + CLI code for 1.2 launch (in this repo / Origin `main`)  
- Bat sticker avatar (no box)  
- Marketing copy kit  
- Lineage story (1.1 → 1.2 → 1.3 waitlist)  

## Do NOT block on

- Training 1.3  
- Paid infra  
- Claiming “beats Jev” without numbers  

---

**Rule:** if www still says Kepler 1.1, **do not post**. Fix GitHub → Vercel first.

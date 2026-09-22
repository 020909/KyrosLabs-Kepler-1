# Kaggle click-by-click — Kepler 1.2 (Aly)

Same $0 path as 1.1. **Do not start until** you have the file `model/notebooks/kepler_1_2_kaggle.ipynb` in this project (Cursor already added it).

Kepler **1.1 stays live**. This run trains a **new** repo: `MAKALY/kepler-1.2`.

## A. Hugging Face (same token as before)

1. Open https://huggingface.co/settings/tokens  
2. Reuse your **Write** token (`hf_…`), or create a new Write token  
3. Keep it private

## B. Download the 1.2 notebook

1. In Cursor: `model` → `notebooks` → **`kepler_1_2_kaggle.ipynb`**  
2. Right-click → **Download…**  
3. Save to Downloads  

Do **not** use the old `kepler_1_1_kaggle.ipynb` for this run.

## C. Import into Kaggle

1. https://www.kaggle.com/code → **New Notebook**  
2. **File → Import Notebook**  
3. Pick `kepler_1_2_kaggle.ipynb`

## D. Settings (right sidebar)

1. **Accelerator** → `GPU T4 x2` (or `GPU T4`)  
2. **Internet** → **On**  
3. **Add-ons → Secrets**
   - `HF_TOKEN` = your Hugging Face write token  
   - `HF_REPO` = **`MAKALY/kepler-1.2`**  
     (must be **1.2**, not 1.1)

## E. Run

1. **Run All**  
2. Leave the tab open  
3. Expect **about 2–5 hours** (more data + 8 epochs)  
4. Last cells print: `DONE → https://huggingface.co/MAKALY/kepler-1.2`

Ignore red pip “dependency conflicts” if `laya` / `torch` print OK (same as 1.1).

## F. Paste the link back here

Send the Hugging Face URL in Cursor chat.  
I will:

1. Point CLI default + playground at 1.2  
2. Give you a short model-card paste for the new repo  

## What 1.2 trains (Jev-like surface)

| Workflow | Primitives |
|---|---|
| Agent tool gates + secret tripwire | `choice`, `noul` |
| Support triage (team / urgency / refund / escalate) | `choice`, `noul`, `score` |
| Moderation (spam + allow/review/remove) | `noul`, `choice` |
| Incident detect on ops text | `noul` |

Base model: open Laya (`convaiinnovations/laya`). Cost: **$0**.

## If something breaks

Same table as [`KAGGLE_CLICK_BY_CLICK.md`](./KAGGLE_CLICK_BY_CLICK.md) (GPU verify, Internet On, HF_TOKEN secret).  
If you accidentally set `HF_REPO` to `kepler-1.1`, stop and change it to `kepler-1.2` before the push cell.

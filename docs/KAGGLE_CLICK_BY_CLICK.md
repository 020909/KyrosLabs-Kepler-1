# Kaggle click-by-click (Aly)

You already have Kaggle + Hugging Face accounts. Follow this exactly.

## A. Hugging Face token (1 minute)

1. Open https://huggingface.co/settings/tokens  
2. Create a token with **Write** permission  
3. Copy it (starts with `hf_…`)  
4. Keep it private — never paste it in Discord/Twitter/chat

## B. Get the notebook onto your Mac, then into Kaggle

### B1. Save the file from Cursor (pick one)

**Easiest — download from the file tree**

1. In Cursor’s left sidebar, open folders: `model` → `notebooks`
2. Find `kepler_1_1_kaggle.ipynb`
3. **Right-click** the file → **Download…** (or **Download**)
4. Save it somewhere easy, like **Downloads**

**If you do not see Download**

1. Click the file once so it opens
2. At the top of the editor, use the **⋯** menu (or right-click the tab)
3. Choose **Download** / **Save As** if shown  
4. Or on Mac: select the file in the sidebar, then **File → Save As…** / copy it out via Download in the agent file viewer

Do **not** copy-paste the notebook text into Notes or Word. That breaks it. You need the real `.ipynb` file.

### B2. Import into Kaggle (2 minutes)

1. Open https://www.kaggle.com/code  
2. Click **New Notebook**  
3. **File → Import Notebook**  
4. Choose the `kepler_1_1_kaggle.ipynb` file from your Downloads folder  

If import is annoying: open a blank notebook and tell me in chat — I will give you paste-by-cell steps. Import is easier.

## C. Notebook settings (right sidebar)

1. **Accelerator** → `GPU T4 x2`  
   - If that is missing, use `GPU T4` (still fine)
2. **Internet** → **On**
3. **Add-ons → Secrets**
   - Name: `HF_TOKEN`  
     Value: your Hugging Face write token  
   - Optional Name: `HF_REPO`  
     Value: `YOUR_HF_USERNAME/kepler-1.1`  
     (example: `alymaknojiya/kepler-1.1`)

## D. Run

1. Click **Run All**  
2. Leave the tab open  
3. Wait **about 1.5–4 hours**  
4. Last cells should print something like:  
   `DONE → https://huggingface.co/YOUR_USERNAME/kepler-1.1`

## E. Send me the link

Paste the Hugging Face model URL back in Cursor chat.  
I will wire the website demo to it.

## If something breaks

| Symptom | Fix |
|---|---|
| GPU / TPU grayed out (only “None” works) | Verify phone: https://www.kaggle.com/settings → Phone Verification. Refresh the notebook tab, then pick GPU T4 x2 again. New accounts often need this once. |
| Still no GPU after verify | Check https://www.kaggle.com/settings for GPU quota / weekly limit. Wait for reset, or try later. |
| “No GPU” after it was enabled | Accelerator → GPU T4 x2 / GPU T4, then restart session |
| Internet / download errors | Internet → On, restart |
| HF_TOKEN assert | Add secret `HF_TOKEN`, re-run last cell |
| Session died mid-train | Re-run All (checkpoints save each epoch) |

## What you are training

Kepler 1.1 specialist on:

1. Coding-agent tool gates (allow / ask / deny)  
2. Secret / credential tripwire  

Base model: open Laya (`convaiinnovations/laya`, Apache 2.0).  
Cost: **$0**.

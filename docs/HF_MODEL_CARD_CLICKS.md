# Add license + model card on Hugging Face (Aly)

Your weights are already live at https://huggingface.co/MAKALY/kepler-1.1  
This page only adds the **Model Card** and **license tags** so people trust it. Still **$0**.

## A. Add Model Card (2 minutes)

1. Open https://huggingface.co/MAKALY/kepler-1.1  
2. Click **Add Model Card** (big button on the getting-started screen)  
3. Delete any placeholder text in the editor  
4. Open this file in Cursor and **copy all of it**:  
   `model/cards/hf-README.md`  
5. Paste into the Hugging Face editor  
6. Click **Commit changes to main** (or **Save**)

That file already sets:

- `license: apache-2.0`  
- `base_model: convaiinnovations/laya`  
- tags + quick start + NOTICE attribution  

## B. Double-check the sidebar tags

On the model page, right side / settings, confirm:

| Field | Value |
|---|---|
| License | **apache-2.0** |
| Base model | **convaiinnovations/laya** |

If a field is empty: click **+ Add License** → Apache 2.0, and **+ Add Base Model** → `convaiinnovations/laya`.

## C. Optional: upload LICENSE + NOTICE as files

1. On the model page → **Files and versions**  
2. **Add file → Upload files**  
3. Upload from this project:  
   - `LICENSE`  
   - `NOTICE`  
4. Commit to `main`

Not required if the model card text is there, but looks more professional.

## D. GitHub (when you create the public repo)

This Cursor project **already has**:

- `LICENSE` (Apache 2.0)  
- `NOTICE` (Laya + Kyros credit)  
- `README.md`  

When you click **Create repo** in Cursor (or make `kyros-labs/kepler` on GitHub), those files ship with it. No extra paid plan.

## Money check

| Thing | Cost |
|---|---|
| Kaggle T4 training (already done) | **$0** |
| Hugging Face public model hosting | **$0** |
| Adding a model card / license | **$0** |
| GitHub public repo | **$0** |

Do **not** buy Kaggle upgrade, Colab Pro, or Hugging Face Pro for this. You do not need them.

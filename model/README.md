# Kepler — free training pack

## Cuts

| Version | Notebook | HF (when live) | Focus |
|---|---|---|---|
| **1.1** | `notebooks/kepler_1_1_kaggle.ipynb` | [MAKALY/kepler-1.1](https://huggingface.co/MAKALY/kepler-1.1) | Agent gates + secret tripwire |
| **1.2** | `notebooks/kepler_1_2_kaggle.ipynb` | `MAKALY/kepler-1.2` | Jev-like System One (triage, mod, incident + gates) |

## Files

| Path | Purpose |
|---|---|
| `model/notebooks/kepler_1_2_kaggle.ipynb` | **Next train** — Run All on Kaggle |
| `model/scripts/build_kepler_1_2_notebook.py` | Regenerates the 1.2 notebook |
| `model/cards/hf-README-1.2.md` | Paste onto HF after push |
| `docs/KAGGLE_1_2_CLICK_BY_CLICK.md` | Non-technical run guide |

## Your steps (1.2)

1. Follow [`docs/KAGGLE_1_2_CLICK_BY_CLICK.md`](../docs/KAGGLE_1_2_CLICK_BY_CLICK.md)  
2. Secret `HF_REPO` = **`MAKALY/kepler-1.2`**  
3. Paste the HF URL back in Cursor  
4. Model card: copy [`model/cards/hf-README-1.2.md`](./cards/hf-README-1.2.md)

## Attribution

Fine-tuned from [`convaiinnovations/laya`](https://huggingface.co/convaiinnovations/laya) (Apache 2.0).  
Built by **Kyros Labs**. Not affiliated with TypeSafe AI or Jev.

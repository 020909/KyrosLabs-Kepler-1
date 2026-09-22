# Kepler 1.1 — free training pack

## What this is

A **$0 Kaggle fine-tune** of open Laya into **Kepler 1.1**, specialised for:

1. **Coding-agent tool gates** — allow / ask / deny for shell, files, network  
2. **Secret tripwire** — detect credential leaks in tool calls  

This is the viral first cut (not full Jev parity).

## Files

| Path | Purpose |
|---|---|
| `model/notebooks/kepler_1_1_kaggle.ipynb` | Self-contained Kaggle notebook (Run All) |
| `model/data/kepler_agent_gates.jsonl` | Same dataset checked into git for reference |
| `model/scripts/train_kepler_ddp.py` | Trainer used inside the notebook |
| `docs/KAGGLE_CLICK_BY_CLICK.md` | Non-technical run guide for Aly |

## Your steps

1. Follow [`docs/KAGGLE_CLICK_BY_CLICK.md`](../docs/KAGGLE_CLICK_BY_CLICK.md) *(done)*  
2. Live weights: [MAKALY/kepler-1.1](https://huggingface.co/MAKALY/kepler-1.1)  
3. Add license + model card: [`docs/HF_MODEL_CARD_CLICKS.md`](../docs/HF_MODEL_CARD_CLICKS.md)  
4. We attach it to the Kyros site demo *(done)*

## Attribution

Fine-tuned from [`convaiinnovations/laya`](https://huggingface.co/convaiinnovations/laya) (Apache 2.0).  
Built by **Aly Maknojiya** / **Kyros Labs**. Not affiliated with TypeSafe AI or Jev.

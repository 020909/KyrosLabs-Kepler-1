# Making Kepler more like Jev

## Status

| Cut | Live | Role |
|---|---|---|
| **1.1** | [MAKALY/kepler-1.1](https://huggingface.co/MAKALY/kepler-1.1) | Agent tool gates + secret tripwire |
| **1.2** | Train next → `MAKALY/kepler-1.2` | Jev-like System One breadth |

**1.1** is not general System One. Free-text philosophy is the wrong test — use `kepler noul` / `choice` / `score` with **1.2** once weights land.

## What Jev does (product shape)

1. **Primitives:** `choice`, `score`, `noul` on any state  
2. **Playground** for feel  
3. **CLI / SDK / API** for software  
4. **Broad workflows:** tickets, triage, routing, risk — not only agents  

Kepler already has playground + CLI + primitives. **1.2 = breadth of training.**

## Play for 1.2 (now)

1. Pack is ready: `model/notebooks/kepler_1_2_kaggle.ipynb`  
2. Aly: follow [`docs/KAGGLE_1_2_CLICK_BY_CLICK.md`](./KAGGLE_1_2_CLICK_BY_CLICK.md)  
3. Secrets: `HF_TOKEN` + `HF_REPO=MAKALY/kepler-1.2`  
4. Paste the HF URL back → we flip site/CLI default to 1.2  

No paid cloud. Same $0 Kaggle T4 path.

## Product rule

- Marketing: “open System One”  
- Live demo today: tool gates (1.1)  
- Next demo: triage / noul / score (1.2)  

Founder credit stays on the **Kyros Labs** company site / NOTICE — not inside Kepler terminal chrome.

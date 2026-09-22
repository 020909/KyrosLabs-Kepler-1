# Kepler 1.2

**Kepler 1.2** is Kyros Labs’ most powerful open decision model yet — a fine-tune of [Laya](https://github.com/NandhaKishorM/laya) that stays **free**, **local**, and **Apache 2.0**.

**Built by [Aly Maknojiya](https://kyroslabs.tech), a student from Boston.**

Website: [kyroslabs.tech](https://kyroslabs.tech) · Weights: [MAKALY/kepler-1.2](https://huggingface.co/MAKALY/kepler-1.2)

> Kepler 1.2 from Kyros Labs — our most powerful model yet. Built by Aly Maknojiya, a student from Boston.

---

## In one sentence

Software often needs a fast *choice* (route this ticket, is this urgent, should the agent run that shell?) — not a long written answer. Kepler is that reflex: open weights you run on your own machine.

## Lineage

| Cut | Role |
|---|---|
| **1.1** | Coding-agent tool gates + secret tripwire |
| **1.2** (now) | Full System One — triage, moderation, incident noul, plus gates |
| **1.3** (soon) | Order-of-magnitude jump — [waitlist](https://kyroslabs.tech/waitlist) |

## Status

| Piece | Status |
|---|---|
| Marketing site | Live in this repo |
| Kepler 1.2 weights | **Live** — [MAKALY/kepler-1.2](https://huggingface.co/MAKALY/kepler-1.2) |
| Kepler 1.1 weights | [MAKALY/kepler-1.1](https://huggingface.co/MAKALY/kepler-1.1) |
| 1.3 waitlist | [/waitlist](https://kyroslabs.tech/waitlist) |

## Run locally

See [`docs/RUN_LOCAL.md`](./docs/RUN_LOCAL.md).

```bash
pip install "laya>=0.3.0" "numpy<2" "transformers>=4.48.0,<5" "torch==2.2.2"
```

```python
from laya import load
agent = load("MAKALY/kepler-1.2")
```

## Legal

- Fine-tune of Laya under Apache 2.0 — keep credit.  
- Not affiliated with TypeSafe AI or Jev.  
- See [`NOTICE`](./NOTICE) and [`docs/LEGAL.md`](./docs/LEGAL.md).

## Run the website

```bash
npm install
npm run dev
```

## Upstream

- Laya GitHub: https://github.com/NandhaKishorM/laya  
- Laya Hugging Face: https://huggingface.co/convaiinnovations/laya  

## License

Apache License 2.0 — see [`LICENSE`](./LICENSE).

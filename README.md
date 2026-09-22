# Kepler 1.1

**Kepler 1.1** is Kyros Labs’ open decision model — a fine-tune of [Laya](https://github.com/NandhaKishorM/laya) that stays **free**, **local**, and **Apache 2.0**.

**Built by [Aly Maknojiya](https://kyroslabs.tech), a student from Boston.**

Website: [kyroslabs.tech](https://kyroslabs.tech)

> Kepler 1.1 from Kyros Labs, built by Aly Maknojiya, a student from Boston.

---

## In one sentence

Software often needs a fast *choice* (route this ticket, is this spam, how urgent?) — not a long written answer. Kepler aims to be that reflex: open weights you run on your own machine.

## Why this exists

| | Closed cloud (e.g. Jev) | Open local (Laya → Kepler 1.1) |
|---|---|---|
| Who hosts it | Someone else’s servers | You |
| Can you inspect weights? | No | Yes |
| Typical cost | Paid API | Free to self-host |
| Speed | Network + model | Local, often much faster |

[Laya](https://github.com/NandhaKishorM/laya) (Nandakishor Mukkunnoth / ConvAI Innovations) proved the open local path. Fine-tuning is where quality comes from. **Kyros Labs trains that gap and ships Kepler 1.1 in the open.**

## Status

| Piece | Status |
|---|---|
| Marketing site | Live in this repo |
| Privacy / Terms | [`/privacy`](https://kyroslabs.tech/privacy), [`/terms`](https://kyroslabs.tech/terms) |
| Training recipes | [`model/`](./model/) |
| Kepler 1.1 weights | **Live** — [MAKALY/kepler-1.1](https://huggingface.co/MAKALY/kepler-1.1) (Apache 2.0, free) |

## Legal (non‑negotiable)

- We **fine-tune Laya** under **Apache 2.0** and keep credit.
- We are **not** affiliated with TypeSafe AI or Jev.
- We do **not** copy Jev weights, code, or private data.
- See [`NOTICE`](./NOTICE) and [`docs/LEGAL.md`](./docs/LEGAL.md).

## Run the website locally

```bash
npm install
npm run dev
```

Open [http://127.0.0.1:43123](http://127.0.0.1:43123).

Deploy / domain steps (plain English): [`docs/DEPLOY.md`](./docs/DEPLOY.md).

## Upstream

- Laya GitHub: https://github.com/NandhaKishorM/laya  
- Laya Hugging Face: https://huggingface.co/convaiinnovations/laya  

## License

Apache License 2.0 — see [`LICENSE`](./LICENSE).

Website content © Kyros Labs / Aly Maknojiya. Model derivatives of Laya retain Apache 2.0 obligations and attribution.

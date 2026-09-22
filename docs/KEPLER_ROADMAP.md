# Making Kepler more like Jev

## Honest status (1.1)

**Kepler 1.1** is a strong first specialist cut:

- Tool gates: allow / ask / deny  
- Secret tripwire  

It is **not** yet a general System One model like Jev (support routing, urgency, refund, escalate, arbitrary typed questions).

That’s why “existence of god” as free text is the wrong test for 1.1 — and the CLI now refuses that path instead of faking a shell gate.

## What Jev does (product shape)

1. **Primitives:** `choice`, `score`, `noul` on any state  
2. **Playground** for feel  
3. **CLI / SDK / API** for software  
4. **Broad workflows:** tickets, triage, routing, risk — not only agents  

Kepler already has playground + CLI. The gap is **breadth of training**.

## How we get there

Yes — **more training**, but specifically:

| Step | What |
|---|---|
| 1 | Keep agent gates (viral demo) |
| 2 | Add public/synthetic datasets for routing, urgency, spam, refund, escalate, toxicity, etc. |
| 3 | Train with `choice` + `score` + `noul` (full Laya System One surface) |
| 4 | Ship **Kepler 1.2** weights on HF + widen CLI (`kepler noul`, `kepler choice`, `kepler score`) |
| 5 | Keep $0 path: Kaggle T4 again |

No need for a paid cloud API to match Jev’s *role*. Jev is cloud; Kepler stays **open + local**.

## Product rule

- Marketing: “open System One”  
- Demo today: tool gates (what 1.1 nails)  
- Roadmap: general typed decisions (1.2+)  

Founder credit stays on the **Kyros Labs** company site / NOTICE — not inside the Kepler terminal product chrome.

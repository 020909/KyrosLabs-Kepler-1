---
license: apache-2.0
library_name: transformers
base_model: convaiinnovations/laya
tags:
  - kepler
  - kyros-labs
  - laya
  - system-one
  - decision-model
  - agent-gates
  - support-triage
  - calibrated-decisions
pipeline_tag: text-classification
---

# Kepler 1.2

**Kepler 1.2** is an open, local System One decision model from **Kyros Labs**.

Fine-tuned from [convaiinnovations/laya](https://huggingface.co/convaiinnovations/laya) under **Apache License 2.0**.

- Website: [kyroslabs.tech](https://kyroslabs.tech)
- This model: [MAKALY/kepler-1.2](https://huggingface.co/MAKALY/kepler-1.2)
- Prior cut: [MAKALY/kepler-1.1](https://huggingface.co/MAKALY/kepler-1.1) (agent gates)

## What it does

Typed decisions (`choice` / `score` / `noul`) over JSON state:

1. **Agent tool gates** + secret tripwire (from 1.1)
2. **Support triage** — team, urgency, refund, escalate, frustration, priority
3. **Moderation** — spam / allow·review·remove
4. **Incident detect** — calibrated yes/no on operational text

Not a chat model. One forward pass → structured answers with calibrated confidence.

## Quick start (free, local)

**Mac (especially Intel):** pin versions so torch and transformers match.

```bash
python3 -m venv ~/kepler-env
source ~/kepler-env/bin/activate
pip install "laya>=0.3.0" "numpy<2" "transformers>=4.48.0,<5" "torch==2.2.2"
```

```python
from laya import load

agent = load("MAKALY/kepler-1.2")

msg = {"message": "I was charged twice. Refund me today — urgent.", "channel": "email"}
questions = {
    "team": {
        "type": "choice",
        "instructions": "Which team should handle this message?",
        "criteria": {
            "billing": "Payment, charge, invoice, refund",
            "technical": "Bug, outage, integration failure",
            "sales": "Pricing, upgrade, demo request",
            "other": "None of these",
        },
    },
    "urgent": {"type": "noul", "instructions": "Does this message express urgency?"},
}
print(agent.predict(msg, questions))
```

CLI: `kepler` / `kepler noul` / `kepler choice` / `kepler score` / `kepler gate`

## License

Apache License 2.0.

Keep attribution to **Laya** (ConvAI Innovations / Nandakishor Mukkunnoth) and to **Kepler / Kyros Labs**.

## Attribution / NOTICE

```
Kepler is fine-tuned from Laya (Apache 2.0).
Laya © ConvAI Innovations / Nandakishor Mukkunnoth.
Kepler © Kyros Labs.
```

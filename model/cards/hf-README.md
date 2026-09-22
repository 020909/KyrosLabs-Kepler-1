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
  - calibrated-decisions
pipeline_tag: text-classification
---

# Kepler 1.1

**Kepler 1.1** is an open, local System One decision model from **Kyros Labs**.

**Built by Aly Maknojiya, a student from Boston.**

Fine-tuned from [convaiinnovations/laya](https://huggingface.co/convaiinnovations/laya) under **Apache License 2.0**.

- Website: [kyroslabs.tech](https://kyroslabs.tech)
- This model: [MAKALY/kepler-1.1](https://huggingface.co/MAKALY/kepler-1.1)

## What it does

Typed decisions over JSON tool state for coding agents:

1. **Tool gates** — `allow` / `ask` / `deny` before shell, files, or network
2. **Secret tripwire** — block credential-shaped leaks in tool calls

Not a chat model. One forward pass → structured choice with calibrated confidence.

## Quick start (free, local)

```bash
pip install laya
```

```python
from laya import load

agent = load("MAKALY/kepler-1.1")

state = {
    "tool": "shell",
    "command": "rm -rf /",
    "cwd": "/workspace",
    "agent": "cursor",
    "goal": "cleanup",
}
questions = {
    "action": {
        "type": "choice",
        "options": {
            "allow": "Safe to run",
            "ask": "Needs confirmation",
            "deny": "Dangerous or secret leak",
        },
    }
}
print(agent.predict(state, questions))
```

## License

Apache License 2.0. See the `LICENSE` file in the Kyros / Kepler source repo.

You must keep attribution to **Laya** (ConvAI Innovations / Nandakishor Mukkunnoth) and to **Kepler 1.1 / Kyros Labs / Aly Maknojiya**.

## Attribution / NOTICE

```
Kepler 1.1
Copyright 2026 Aly Maknojiya / Kyros Labs

This product includes software and model weights derived from Laya:

  Laya
  Copyright ConvAI Innovations / Nandakishor Mukkunnoth
  https://github.com/NandhaKishorM/laya
  https://huggingface.co/convaiinnovations/laya
  Licensed under the Apache License, Version 2.0
```

We are **not** affiliated with TypeSafe AI or the Jev product. Mentions of Jev are for public technical comparison only.

## Training (cost: $0)

Fine-tuned on **Kaggle free GPU** (`GPU T4 x2`) from open Laya using a specialist dataset of coding-agent tool gates and secret tripwires.

## Intended use

- Local / on-prem agent babysitting (allow / ask / deny)
- Research and demos of open System One decision models

## Out of scope

- Free-form chat or long prose generation
- Claiming to be Jev / TypeSafe
- Use that strips Apache 2.0 notices

## Citation

```
Kepler 1.1, Kyros Labs (Aly Maknojiya). Fine-tuned from Laya (ConvAI Innovations).
```

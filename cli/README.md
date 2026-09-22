# kepler CLI

**Kepler** in the terminal — same product feel as the website playground.

Kyros Labs

## Install

```bash
cd cli
python3 -m venv .venv
source .venv/bin/activate
pip install -e .
pip install "torch==2.2.2" "numpy<2" "transformers>=4.48.0,<5"   # Intel Mac safe pins
```

## Interactive (default)

```bash
kepler
```

Branded session: menu, type a command to gate, or ask a typed decision.
Big **ALLOW / ASK / DENY** with probability bars. Model stays warm until `q`.

Scripts:

```bash
kepler gate --command "rm -rf /" --value
kepler gate --command "git status" --json
```

## Website

https://kyroslabs.tech/playground

## Weights

https://huggingface.co/MAKALY/kepler-1.1

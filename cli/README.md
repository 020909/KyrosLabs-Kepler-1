# kepler CLI

**Kepler 1.1** in the terminal — same product feel as the website playground.

Kyros Labs · Aly Maknojiya (Boston)

## Install

```bash
cd cli
python3 -m venv .venv
source .venv/bin/activate
pip install -e .
pip install "torch==2.2.2" "numpy<2" "transformers>=4.48.0,<5"   # Intel Mac safe pins
```

## Interactive (default)

Just run:

```bash
kepler
```

You get a branded session:

- menu of viral scenarios  
- or type your own command  
- big **ALLOW / ASK / DENY** with probability bars  
- model stays loaded until you quit (`q`)

This is the non-technical path. Technical users can still script:

```bash
kepler gate --command "rm -rf /" --value
kepler gate --command "git status" --json
```

## Website twin

https://kyroslabs.tech/playground

## Weights

https://huggingface.co/MAKALY/kepler-1.1

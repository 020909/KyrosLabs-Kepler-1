# kepler CLI

**Kepler** in the terminal — same product feel as the website playground.

Kyros Labs · bat mascot · dark + lavender `#828fff`

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

Branded session with the Kepler bat. Menu: tool gates + support triage + incident noul.
Big typed verdicts with probability bars. Model stays warm until `q`.

## System One primitives

```bash
# Still strong on 1.1
kepler gate --command "rm -rf /" --value

# Breadth unlocks with 1.2 weights (--model MAKALY/kepler-1.2)
kepler noul --ask "Is this urgent?" --state "Refund me today or I cancel."
kepler choice --ask "Which team?" \
  -o billing="Payment/refund" -o technical="Bug/outage" -o sales="Pricing" -o other="Other" \
  --state "Charged twice last month"
kepler score --ask "Frustration?" \
  -l Calm -l Annoyed -l Angry -l Furious \
  --state "THIS IS THE THIRD DAY. FIX IT NOW."
```

Default model is still `MAKALY/kepler-1.1` until 1.2 finishes training. Then:

```bash
kepler --model MAKALY/kepler-1.2
```

## Website

https://kyroslabs.tech/playground

## Weights

- 1.1: https://huggingface.co/MAKALY/kepler-1.1  
- 1.2: train with [`docs/KAGGLE_1_2_CLICK_BY_CLICK.md`](../docs/KAGGLE_1_2_CLICK_BY_CLICK.md)

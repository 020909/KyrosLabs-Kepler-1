# kepler CLI

**Kepler 1.2** in the terminal — same product feel as the website playground.

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

Loads `MAKALY/kepler-1.2` by default. Menu: tool gates + support triage + incident noul.

## System One primitives

```bash
kepler gate --command "rm -rf /" --value

kepler noul --ask "Is this urgent?" --state "Refund me today or I cancel."
kepler choice --ask "Which team?" \
  -o billing="Payment/refund" -o technical="Bug/outage" -o sales="Pricing" -o other="Other" \
  --state "Charged twice last month"
kepler score --ask "Frustration?" \
  -l Calm -l Annoyed -l Angry -l Furious \
  --state "THIS IS THE THIRD DAY. FIX IT NOW."
```

## Website

https://kyroslabs.tech/playground

## Weights

https://huggingface.co/MAKALY/kepler-1.2

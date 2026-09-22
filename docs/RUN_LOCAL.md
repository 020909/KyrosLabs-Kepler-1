# Run Kepler 1.2 on your Mac (tested path)

Intel Macs often get an older PyTorch. Use these pins.

```bash
python3 -m venv ~/kepler-env
source ~/kepler-env/bin/activate
pip install -U pip
pip install "laya>=0.3.0" "numpy<2" "transformers>=4.48.0,<5" "torch==2.2.2"
```

Then:

```bash
python - <<'PY'
from laya import load

agent = load("MAKALY/kepler-1.2")

# Tool gate (from 1.1)
gate_q = {
  "action": {
    "type": "choice",
    "instructions": "Should the coding agent run this call?",
    "criteria": {
      "allow": "Safe",
      "ask": "Needs confirmation",
      "deny": "Dangerous or secret leak",
    },
  }
}
print(agent.predict(
  {"tool": "shell", "command": "rm -rf /", "cwd": "/workspace", "agent": "cursor", "goal": "cleanup"},
  gate_q,
))

# Support triage (new in 1.2)
triage_q = {
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
print(agent.predict(
  {"message": "I was charged twice. Refund me today — urgent.", "channel": "email"},
  triage_q,
))
PY
```

Prior specialist cut: `MAKALY/kepler-1.1`.

CLI:

```bash
cd cli && pip install -e . && kepler
```

A pink `RuntimeWarning` about temperature clamping is OK.

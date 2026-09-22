"""Shared Kepler model helpers + System One primitives."""

from __future__ import annotations

from typing import Any


DEFAULT_MODEL = "MAKALY/kepler-1.1"
# After Kaggle 1.2 finishes, flip CLI default to MAKALY/kepler-1.2

GATE_QUESTION = {
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

TRIAGE_QUESTIONS = {
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
    "urgent": {
        "type": "noul",
        "instructions": "Does this message express urgency or need a same-day reply?",
    },
    "refund": {
        "type": "noul",
        "instructions": "Is the customer asking for a refund or chargeback?",
    },
}


def load_agent(model: str):
    try:
        from laya import load
    except ImportError as exc:  # pragma: no cover
        raise SystemExit(
            "laya is not installed. Try:\n"
            '  pip install "laya>=0.3.0" "numpy<2" "transformers>=4.48.0,<5"\n'
        ) from exc
    return load(model)


def predict_gate(agent: Any, state: dict[str, Any]) -> Any:
    return agent.predict(state, GATE_QUESTION)


def extract_payload(out: Any, key: str | None = None) -> dict[str, Any]:
    payload = out
    if isinstance(out, dict) and "answers" in out:
        answers = out["answers"]
        if key and isinstance(answers, dict) and key in answers:
            payload = answers[key]
        else:
            payload = answers
    elif isinstance(out, dict) and key and key in out:
        payload = out[key]
    if not isinstance(payload, dict):
        return {"value": payload}
    return payload


def extract_action(out: Any) -> tuple[str, dict[str, float], float | None]:
    """Normalize laya response → (choice, probs, confidence)."""
    payload = extract_payload(out, "action")
    if "choice" not in payload and "answer" not in payload and "value" not in payload:
        # nested single-key answers
        if len(payload) == 1:
            only = next(iter(payload.values()))
            if isinstance(only, dict):
                payload = only

    choice = str(
        payload.get("choice")
        or payload.get("answer")
        or payload.get("value")
        or "unknown"
    )
    probs_raw = payload.get("probabilities") or payload.get("probs") or {}
    probs = {str(k): float(v) for k, v in dict(probs_raw).items()}
    conf = payload.get("confidence")
    conf_f = float(conf) if conf is not None else None
    return choice, probs, conf_f


def extract_noul(out: Any, key: str = "answer") -> tuple[bool, float | None, dict[str, float]]:
    payload = extract_payload(out, key)
    if "probabilities" not in payload and len(payload) == 1:
        only = next(iter(payload.values()))
        if isinstance(only, dict):
            payload = only
    probs_raw = payload.get("probabilities") or payload.get("probs") or {}
    probs = {str(k).lower(): float(v) for k, v in dict(probs_raw).items()}
    p_true = probs.get("true")
    if p_true is None:
        val = payload.get("choice") or payload.get("answer") or payload.get("value")
        if isinstance(val, bool):
            p_true = 1.0 if val else 0.0
        elif str(val).lower() in {"true", "yes", "1"}:
            p_true = 1.0
        elif str(val).lower() in {"false", "no", "0"}:
            p_true = 0.0
        else:
            p_true = 0.5
    return bool(p_true >= 0.5), float(p_true), probs


def extract_score(out: Any, key: str = "answer") -> tuple[float | None, dict[str, float]]:
    payload = extract_payload(out, key)
    if "probabilities" not in payload and len(payload) == 1:
        only = next(iter(payload.values()))
        if isinstance(only, dict):
            payload = only
    probs_raw = payload.get("probabilities") or payload.get("probs") or {}
    probs = {str(k): float(v) for k, v in dict(probs_raw).items()}
    score = payload.get("score")
    if score is None and probs:
        # expected value over level indices when keys are numeric
        try:
            score = sum(int(k) * v for k, v in probs.items())
        except ValueError:
            score = max(probs, key=probs.get)
    return (float(score) if score is not None else None), probs

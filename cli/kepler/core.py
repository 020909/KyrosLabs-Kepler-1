"""Shared Kepler model helpers."""

from __future__ import annotations

from typing import Any


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


def extract_action(out: Any) -> tuple[str, dict[str, float], float | None]:
    """Normalize laya response → (choice, probs, confidence)."""
    payload = out
    if isinstance(out, dict) and "answers" in out:
        payload = out["answers"].get("action", out["answers"])
    elif isinstance(out, dict) and "action" in out:
        payload = out["action"]

    if not isinstance(payload, dict):
        return str(out), {}, None

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

"""Kepler CLI — typed allow/ask/deny without writing Python each time."""

from __future__ import annotations

import argparse
import json
import sys
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


def _load_agent(model: str):
    try:
        from laya import load
    except ImportError as exc:  # pragma: no cover
        raise SystemExit(
            "laya is not installed. Try:\n"
            '  pip install "laya>=0.3.0" "numpy<2" "transformers>=4.48.0,<5"\n'
        ) from exc
    return load(model)


def _print_result(label: str, out: Any, *, value_only: bool) -> None:
    if value_only:
        # laya returns nested structures; prefer action.choice when present
        if isinstance(out, dict):
            action = out.get("action") or out
            if isinstance(action, dict) and "choice" in action:
                print(action["choice"])
                return
            if isinstance(action, dict) and "answer" in action:
                print(action["answer"])
                return
        print(out)
        return
    print(label)
    print(json.dumps(out, indent=2, default=str))


def cmd_gate(args: argparse.Namespace) -> int:
    state: dict[str, Any] = {
        "tool": args.tool,
        "agent": args.agent,
        "goal": args.goal,
    }
    if args.tool == "shell":
        if not args.command:
            print("error: --command is required for shell", file=sys.stderr)
            return 2
        state["command"] = args.command
        state["cwd"] = args.cwd
    elif args.tool == "http":
        if not args.url:
            print("error: --url is required for http", file=sys.stderr)
            return 2
        state["url"] = args.url
        if args.method:
            state["method"] = args.method
    else:
        print(f"error: unknown tool {args.tool}", file=sys.stderr)
        return 2

    agent = _load_agent(args.model)
    out = agent.predict(state, GATE_QUESTION)
    _print_result(args.command or args.url or args.tool, out, value_only=args.value)
    return 0


def cmd_decide(args: argparse.Namespace) -> int:
    raw = sys.stdin.read() if args.state == "-" else args.state
    if args.state.startswith("@"):
        path = args.state[1:]
        with open(path, encoding="utf-8") as f:
            raw = f.read()
    try:
        state = json.loads(raw)
    except json.JSONDecodeError:
        state = raw

    if args.questions:
        with open(args.questions, encoding="utf-8") as f:
            questions = json.load(f)
    else:
        questions = GATE_QUESTION

    agent = _load_agent(args.model)
    out = agent.predict(state, questions)
    if args.pretty:
        print(json.dumps(out, indent=2, default=str))
    else:
        print(json.dumps(out, default=str))
    return 0


def build_parser() -> argparse.ArgumentParser:
    p = argparse.ArgumentParser(
        prog="kepler",
        description="Kepler 1.1 — open local System One decisions (Kyros Labs).",
    )
    p.add_argument(
        "--model",
        default="MAKALY/kepler-1.1",
        help="Hugging Face model id or local path (default: MAKALY/kepler-1.1)",
    )
    sub = p.add_subparsers(dest="cmd", required=True)

    gate = sub.add_parser("gate", help="Allow / ask / deny a tool call")
    gate.add_argument("--tool", default="shell", choices=["shell", "http"])
    gate.add_argument("--command", "-c", help="Shell command to gate")
    gate.add_argument("--cwd", default="/workspace")
    gate.add_argument("--url", help="HTTP URL to gate")
    gate.add_argument("--method", default="GET")
    gate.add_argument("--agent", default="cursor")
    gate.add_argument("--goal", default="inspect")
    gate.add_argument(
        "--value",
        action="store_true",
        help="Print only the choice key when possible",
    )
    gate.set_defaults(func=cmd_gate)

    decide = sub.add_parser("decide", help="Run a full state + questions payload")
    decide.add_argument(
        "--state",
        "-s",
        required=True,
        help='JSON state string, @file.json, or "-" for stdin',
    )
    decide.add_argument(
        "--questions",
        "-q",
        help="Path to questions JSON (default: tool-gate allow/ask/deny)",
    )
    decide.add_argument("--pretty", action="store_true")
    decide.set_defaults(func=cmd_decide)

    return p


def main(argv: list[str] | None = None) -> int:
    parser = build_parser()
    args = parser.parse_args(argv)
    return int(args.func(args))


if __name__ == "__main__":
    raise SystemExit(main())

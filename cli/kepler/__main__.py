"""Kepler CLI — interactive playground in the terminal (plus scriptable commands)."""

from __future__ import annotations

import argparse
import json
import sys
from typing import Any

from .core import (
    DEFAULT_MODEL,
    GATE_QUESTION,
    extract_action,
    extract_noul,
    extract_score,
    load_agent,
    predict_gate,
)
from .session import run_interactive
from . import ui


def cmd_gate(args: argparse.Namespace) -> int:
    state: dict[str, Any] = {
        "tool": args.tool,
        "agent": args.agent,
        "goal": args.goal,
    }
    if args.tool == "shell":
        if not args.command:
            ui.err("error: --command is required for shell")
            return 2
        state["command"] = args.command
        state["cwd"] = args.cwd
    elif args.tool == "http":
        if not args.url:
            ui.err("error: --url is required for http")
            return 2
        state["url"] = args.url
        if args.method:
            state["method"] = args.method
    else:
        ui.err(f"error: unknown tool {args.tool}")
        return 2

    agent = load_agent(args.model)
    out = predict_gate(agent, state)
    choice, probs, conf = extract_action(out)
    label = args.command or args.url or args.tool

    if args.value:
        print(choice)
        return 0
    if args.json:
        print(json.dumps(out, indent=2, default=str))
        return 0

    ui.render_decision(label, choice, probs, conf)
    return 0


def cmd_decide(args: argparse.Namespace) -> int:
    raw = sys.stdin.read() if args.state == "-" else args.state
    if args.state.startswith("@"):
        with open(args.state[1:], encoding="utf-8") as f:
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

    agent = load_agent(args.model)
    out = agent.predict(state, questions)
    if args.pretty or not args.value:
        print(json.dumps(out, indent=2 if args.pretty else None, default=str))
    else:
        choice, _, _ = extract_action(out)
        print(choice)
    return 0


def cmd_choice(args: argparse.Namespace) -> int:
    criteria = {}
    for part in args.option:
        if "=" not in part:
            ui.err(f"error: options must be key=description, got {part!r}")
            return 2
        k, v = part.split("=", 1)
        criteria[k.strip()] = v.strip()
    if len(criteria) < 2:
        ui.err("error: need at least two --option key=desc")
        return 2

    state: Any
    if args.state.startswith("@"):
        with open(args.state[1:], encoding="utf-8") as f:
            state = json.load(f)
    else:
        try:
            state = json.loads(args.state)
        except json.JSONDecodeError:
            state = {"text": args.state}

    q = {
        "answer": {
            "type": "choice",
            "instructions": args.ask,
            "criteria": criteria,
        }
    }
    agent = load_agent(args.model)
    out = agent.predict(state, q)
    if args.json:
        print(json.dumps(out, indent=2, default=str))
        return 0
    choice, probs, conf = extract_action(out)
    # extract_action looks for "action"; fall back to answer key
    if choice == "unknown":
        from .core import extract_payload

        payload = extract_payload(out, "answer")
        choice = str(
            payload.get("choice")
            or payload.get("answer")
            or payload.get("value")
            or "unknown"
        )
        probs_raw = payload.get("probabilities") or {}
        probs = {str(k): float(v) for k, v in dict(probs_raw).items()}
        conf = float(payload["confidence"]) if payload.get("confidence") is not None else None
    label = args.state if len(args.state) < 80 else args.state[:77] + "…"
    ui.render_decision(label, choice, probs, conf)
    return 0


def cmd_noul(args: argparse.Namespace) -> int:
    state: Any
    if args.state.startswith("@"):
        with open(args.state[1:], encoding="utf-8") as f:
            state = json.load(f)
    else:
        try:
            state = json.loads(args.state)
        except json.JSONDecodeError:
            state = {"text": args.state}

    q = {"answer": {"type": "noul", "instructions": args.ask}}
    agent = load_agent(args.model)
    out = agent.predict(state, q)
    if args.json:
        print(json.dumps(out, indent=2, default=str))
        return 0
    yes, p_true, probs = extract_noul(out, "answer")
    if args.value:
        print("true" if yes else "false")
        return 0
    label = args.state if len(str(args.state)) < 80 else str(args.state)[:77] + "…"
    ui.render_noul(label, yes, p_true, probs)
    return 0


def cmd_score(args: argparse.Namespace) -> int:
    levels = list(args.level)
    if len(levels) < 2:
        ui.err("error: need at least two --level labels")
        return 2
    state: Any
    if args.state.startswith("@"):
        with open(args.state[1:], encoding="utf-8") as f:
            state = json.load(f)
    else:
        try:
            state = json.loads(args.state)
        except json.JSONDecodeError:
            state = {"text": args.state}

    q = {
        "answer": {
            "type": "score",
            "instructions": args.ask,
            "criteria": levels,
        }
    }
    agent = load_agent(args.model)
    out = agent.predict(state, q)
    if args.json:
        print(json.dumps(out, indent=2, default=str))
        return 0
    score, probs = extract_score(out, "answer")
    if args.value:
        print(score if score is not None else "")
        return 0
    label = args.state if len(str(args.state)) < 80 else str(args.state)[:77] + "…"
    ui.render_score(label, score, levels, probs)
    return 0


def build_parser() -> argparse.ArgumentParser:
    p = argparse.ArgumentParser(
        prog="kepler",
        description=(
            "Kepler — open local System One decisions (Kyros Labs).\n"
            "Run with no arguments to open the interactive playground.\n"
            "Primitives: gate · choice · noul · score (1.2 weights unlock breadth)."
        ),
        formatter_class=argparse.RawDescriptionHelpFormatter,
    )
    p.add_argument(
        "--model",
        default=DEFAULT_MODEL,
        help=f"Hugging Face model id or local path (default: {DEFAULT_MODEL})",
    )
    p.add_argument(
        "--version",
        action="version",
        version="kepler 0.3.0",
    )
    sub = p.add_subparsers(dest="cmd")

    gate = sub.add_parser("gate", help="One-shot allow/ask/deny (scripts / CI)")
    gate.add_argument("--tool", default="shell", choices=["shell", "http"])
    gate.add_argument("--command", "-c", help="Shell command to gate")
    gate.add_argument("--cwd", default="/workspace")
    gate.add_argument("--url", help="HTTP URL to gate")
    gate.add_argument("--method", default="GET")
    gate.add_argument("--agent", default="cursor")
    gate.add_argument("--goal", default="inspect")
    gate.add_argument("--value", action="store_true", help="Print only the choice")
    gate.add_argument("--json", action="store_true", help="Print raw JSON")
    gate.set_defaults(func=cmd_gate)

    decide = sub.add_parser("decide", help="Full state + questions JSON")
    decide.add_argument(
        "--state",
        "-s",
        required=True,
        help='JSON state, @file.json, or "-" for stdin',
    )
    decide.add_argument("--questions", "-q", help="Path to questions JSON")
    decide.add_argument("--pretty", action="store_true")
    decide.add_argument("--value", action="store_true")
    decide.set_defaults(func=cmd_decide)

    choice = sub.add_parser("choice", help="Typed multi-way choice (System One)")
    choice.add_argument("--ask", "-a", required=True, help="Question / instructions")
    choice.add_argument(
        "--option",
        "-o",
        action="append",
        required=True,
        help="key=description (repeat)",
    )
    choice.add_argument("--state", "-s", required=True, help="JSON state, @file, or text")
    choice.add_argument("--json", action="store_true")
    choice.set_defaults(func=cmd_choice)

    noul = sub.add_parser("noul", help="Calibrated true/false (System One)")
    noul.add_argument("--ask", "-a", required=True, help="Yes/no question")
    noul.add_argument("--state", "-s", required=True, help="JSON state, @file, or text")
    noul.add_argument("--value", action="store_true")
    noul.add_argument("--json", action="store_true")
    noul.set_defaults(func=cmd_noul)

    score = sub.add_parser("score", help="Ordered score / severity (System One)")
    score.add_argument("--ask", "-a", required=True, help="What to score")
    score.add_argument(
        "--level",
        "-l",
        action="append",
        required=True,
        help="Level label from low→high (repeat)",
    )
    score.add_argument("--state", "-s", required=True, help="JSON state, @file, or text")
    score.add_argument("--value", action="store_true")
    score.add_argument("--json", action="store_true")
    score.set_defaults(func=cmd_score)

    return p


_SUBCOMMANDS = {"gate", "decide", "choice", "noul", "score"}


def main(argv: list[str] | None = None) -> int:
    argv = list(sys.argv[1:] if argv is None else argv)
    # Bare `kepler` → interactive session (Claude Code / product feel).
    if not argv or argv[0].startswith("-") and argv[0] not in {
        "-h",
        "--help",
        "--version",
    }:
        model = DEFAULT_MODEL
        if "--model" in argv:
            i = argv.index("--model")
            if i + 1 < len(argv):
                model = argv[i + 1]
        elif any(a.startswith("--model=") for a in argv):
            model = next(a.split("=", 1)[1] for a in argv if a.startswith("--model="))
        if argv and argv[0] in {"-h", "--help"}:
            build_parser().print_help()
            return 0
        if argv and argv[0] == "--version":
            print("kepler 0.3.0")
            return 0
        if argv and argv[0] in _SUBCOMMANDS:
            pass
        else:
            return run_interactive(model)

    parser = build_parser()
    args = parser.parse_args(argv)
    if not getattr(args, "cmd", None):
        return run_interactive(args.model)
    return int(args.func(args))


if __name__ == "__main__":
    raise SystemExit(main())

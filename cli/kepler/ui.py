"""Terminal styling for Kepler (Kyros brand: dark + lavender signal)."""

from __future__ import annotations

import os
import shutil
import sys


def _tty() -> bool:
    return sys.stdout.isatty() and os.environ.get("NO_COLOR") is None


class C:
    RESET = "\033[0m"
    DIM = "\033[2m"
    BOLD = "\033[1m"
    SIGNAL = "\033[38;2;130;143;255m"  # #828fff — site signal
    FG = "\033[38;2;237;237;237m"
    MUTED = "\033[38;2;160;160;168m"
    ALLOW = "\033[38;2;110;231;183m"
    ASK = "\033[38;2;252;211;77m"
    DENY = "\033[38;2;251;113;133m"
    LINE = "\033[38;2;40;40;46m"
    BG = "\033[48;2;8;8;10m"  # #08080a


def c(code: str, text: str) -> str:
    if not _tty():
        return text
    return f"{code}{text}{C.RESET}"


def width() -> int:
    return max(60, min(shutil.get_terminal_size((80, 24)).columns, 88))


def rule() -> None:
    print(c(C.LINE, "─" * width()))


def banner() -> None:
    """Kyros brand: near-black + lavender #828fff."""
    print()
    # Bat mark (lavender) — dark-design companion, ~2× presence.
    face = [
        "   ╱╲   ╱╲",
        "  ╱  ╲_╱  ╲",
        "  │ ◉   ◉ │",
        "  ╰───ᴗ───╯",
        "   ╲_____╱",
    ]
    for line in face:
        print(c(C.SIGNAL, line))
    print()
    print(c(C.SIGNAL, "██") + "  " + c(C.BOLD + C.FG, "Kepler"))
    print(c(C.MUTED, "    Kyros Labs · open System One"))
    print()
    print(
        c(
            C.DIM + C.MUTED,
            "Typed decisions for software. Local. $0.",
        )
    )
    rule()
    print()


def try_show_avatar() -> None:
    """Best-effort inline image in iTerm2; otherwise ASCII only."""
    if not _tty():
        return
    try:
        from importlib import resources

        avatar = resources.files("kepler.assets").joinpath("kepler-avatar.png")
        data = avatar.read_bytes()
    except Exception:
        return

    if os.environ.get("TERM_PROGRAM") == "iTerm.app":
        import base64

        b64 = base64.b64encode(data).decode("ascii")
        sys.stdout.write(
            f"\033]1337;File=name=kepler.png;inline=1;width=8;height=8;preserveAspectRatio=1:{b64}\a\n"
        )
        sys.stdout.flush()


def verdict_color(choice: str) -> str:
    return {
        "allow": C.ALLOW,
        "ask": C.ASK,
        "deny": C.DENY,
    }.get(choice.lower(), C.FG)


def bar(label: str, prob: float, *, highlight: bool) -> None:
    filled = max(1, int(round(prob * 28)))
    empty = 28 - filled
    color = verdict_color(label) if highlight else C.MUTED
    track = "█" * filled + c(C.LINE, "░" * empty)
    pct = f"{prob * 100:5.1f}%"
    mark = "◂" if highlight else " "
    print(
        f"  {c(color, f'{label:<5}')} {c(color, track)}  {c(C.MUTED, pct)} {c(color, mark)}"
    )


def render_decision(
    label: str, choice: str, probs: dict[str, float], confidence: float | None
) -> None:
    print()
    rule()
    print(c(C.MUTED, "  state"))
    print(f"  {c(C.FG, label)}")
    print()
    print(c(C.MUTED, "  decision"))
    print(f"  {c(C.BOLD + verdict_color(choice), choice.upper())}")
    if confidence is not None:
        print(f"  {c(C.SIGNAL, f'conf {confidence:.2f}')}")
    print()
    print(c(C.MUTED, "  distribution"))
    keys = list(probs.keys())
    preferred = [k for k in ("allow", "ask", "deny") if k in probs]
    order = preferred if preferred else keys
    for key in order:
        bar(key, float(probs[key]), highlight=(key == choice))
    for key in keys:
        if key not in order:
            bar(key, float(probs[key]), highlight=(key == choice))
    rule()
    print()


def render_noul(
    label: str, yes: bool, p_true: float | None, probs: dict[str, float]
) -> None:
    print()
    rule()
    print(c(C.MUTED, "  state"))
    print(f"  {c(C.FG, label)}")
    print()
    print(c(C.MUTED, "  noul"))
    color = C.ALLOW if yes else C.MUTED
    print(f"  {c(C.BOLD + color, 'TRUE' if yes else 'FALSE')}")
    if p_true is not None:
        print(f"  {c(C.SIGNAL, f'p(true) {p_true:.2f}')}")
    print()
    print(c(C.MUTED, "  distribution"))
    for key in ("false", "true"):
        if key in probs:
            bar(key, float(probs[key]), highlight=(key == ("true" if yes else "false")))
    rule()
    print()


def render_score(
    label: str,
    score: float | None,
    levels: list[str],
    probs: dict[str, float],
) -> None:
    print()
    rule()
    print(c(C.MUTED, "  state"))
    print(f"  {c(C.FG, label)}")
    print()
    print(c(C.MUTED, "  score"))
    if score is not None:
        idx = int(round(score))
        name = levels[idx] if 0 <= idx < len(levels) else str(score)
        print(f"  {c(C.BOLD + C.SIGNAL, name)}  {c(C.MUTED, f'(level {score:.2f})')}")
    else:
        print(f"  {c(C.FG, 'unknown')}")
    print()
    print(c(C.MUTED, "  distribution"))
    if probs:
        # prefer numeric keys aligned to levels
        for i, name in enumerate(levels):
            key = str(i)
            if key in probs:
                bar(name[:12], float(probs[key]), highlight=(score is not None and int(round(score)) == i))
            elif name in probs:
                bar(name[:12], float(probs[name]), highlight=False)
    rule()
    print()


def info(msg: str) -> None:
    print(c(C.MUTED, msg))


def err(msg: str) -> None:
    print(c(C.DENY, msg), file=sys.stderr)

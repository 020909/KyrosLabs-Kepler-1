# Launch video — Kepler gate

Film this. Do not explain the model.

## The page

After the site updates:

https://www.kyroslabs.tech/gate

It loops three beats by itself:

1. `rm -rf /` → **DENY**
2. `git status` → **ALLOW**
3. secret webhook → **DENY**

Stills (if you need a frozen frame):

- https://www.kyroslabs.tech/gate?frame=wipe&play=0
- https://www.kyroslabs.tech/gate?frame=status&play=0
- https://www.kyroslabs.tech/gate?frame=secret&play=0

## Record on your Mac (15 seconds)

1. Open the looping page in a private window, full screen.
2. Start screen recording (Cmd+Shift+5 → Record Selected Portion).
3. Let one full loop play. Stop.
4. Send that clip plus one still of the DENY frame to Claude / Higgsfield.

## On-screen text for the edit

```
Kepler 1.2
The agent tries to run it.
Kepler decides first.
Open. Local. $0.
kyroslabs.tech
```

## Terminal version (optional)

```bash
cd ~/KyrosLabs-Kepler-1/cli
python3 -m kepler demo
```

No model download. Same three decisions.

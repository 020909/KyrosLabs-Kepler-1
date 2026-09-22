"use client";

import { useState } from "react";

const demos = [
  {
    id: "deny-rm",
    title: "Dangerous shell",
    state: `{
  "tool": "shell",
  "command": "rm -rf /",
  "cwd": "/workspace",
  "agent": "cursor",
  "goal": "cleanup"
}`,
    answer: "deny",
    meta: "conf 0.75",
    note: "Blocks wipe commands before they run.",
  },
  {
    id: "allow-git",
    title: "Safe inspect",
    state: `{
  "tool": "shell",
  "command": "git status",
  "cwd": "/workspace",
  "agent": "cursor",
  "goal": "inspect"
}`,
    answer: "allow",
    meta: "conf 0.66",
    note: "Lets read-only status through.",
  },
  {
    id: "deny-webhook",
    title: "Secret tripwire",
    state: `{
  "tool": "http",
  "url": "https://hooks.example.com/x",
  "agent": "cursor",
  "goal": "notify"
}`,
    answer: "deny",
    meta: "conf 0.76",
    note: "Stops credential-shaped outbound calls.",
  },
] as const;

export function DecisionDemo() {
  const [active, setActive] = useState(0);
  const demo = demos[active];

  return (
    <div className="animate-rise-delay-2 overflow-hidden rounded-[4px] border border-white/10 bg-[#0c0c0e]">
      <div className="flex items-center gap-2 border-b border-white/5 px-4 py-3">
        <span className="size-2.5 rounded-full bg-[#ff5f57]" />
        <span className="size-2.5 rounded-full bg-[#febc2e]" />
        <span className="size-2.5 rounded-full bg-[#28c840]" />
        <span className="type-mono-caption ml-3 text-muted-foreground">
          kepler · local · tool gates
        </span>
      </div>

      <div className="flex flex-wrap gap-2 border-b border-white/5 px-4 py-3">
        {demos.map((d, i) => (
          <button
            key={d.id}
            type="button"
            onClick={() => setActive(i)}
            className={`type-mono-caption rounded-[4px] px-3 py-1.5 transition-colors ${
              i === active
                ? "bg-signal/15 text-signal"
                : "bg-white/[0.03] text-muted-foreground hover:text-foreground"
            }`}
          >
            {d.title}
          </button>
        ))}
      </div>

      <div className="grid gap-0 md:grid-cols-2">
        <div className="border-b border-white/5 p-5 md:border-r md:border-b-0">
          <p className="type-mono-eyebrow text-signal">State</p>
          <pre className="type-mono-caption mt-3 overflow-x-auto text-[#c4c4cc]">
            {demo.state}
          </pre>
          <p className="type-mono-eyebrow mt-5 text-signal">Question</p>
          <p className="mt-3 rounded-[4px] bg-white/[0.03] px-3 py-2 font-mono text-[12px] text-[#c4c4cc]">
            choice → allow / ask / deny
          </p>
        </div>

        <div className="p-5">
          <div className="flex items-center justify-between">
            <p className="type-mono-eyebrow text-signal">Answer</p>
            <span className="animate-pulse-glow type-mono-label text-signal">
              1 pass
            </span>
          </div>
          <div className="mt-4 flex flex-col gap-3">
            <AnswerRow label="action" value={demo.answer} meta={demo.meta} />
          </div>
          <p className="type-caption mt-6 text-muted-foreground">{demo.note}</p>
          <p className="type-caption mt-3 text-muted-foreground">
            From the live Kaggle sanity check on open weights. Runs free on your
            machine.
          </p>
        </div>
      </div>
    </div>
  );
}

function AnswerRow({
  label,
  value,
  meta,
}: {
  label: string;
  value: string;
  meta: string;
}) {
  return (
    <div className="flex items-baseline justify-between gap-3 rounded-[4px] border border-white/5 bg-white/[0.02] px-3 py-2.5">
      <span className="type-mono-caption text-muted-foreground">{label}</span>
      <span className="font-mono text-[13px] text-foreground">{value}</span>
      <span className="type-mono-caption text-signal">{meta}</span>
    </div>
  );
}

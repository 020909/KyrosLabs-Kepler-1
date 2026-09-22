import type { Metadata } from "next";
import Link from "next/link";
import { ScrollReveal } from "@/components/scroll-reveal";
import { SiteShell } from "@/components/site-shell";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Docs",
  description: `Documentation for ${siteConfig.product}.`,
};

export default function DocsPage() {
  return (
    <SiteShell>
      <article className="px-6 pt-16 pb-28 md:pt-24">
        <div className="mx-auto max-w-3xl">
          <ScrollReveal>
            <h1 className="mt-4 font-sans text-4xl font-medium tracking-tight md:text-5xl">
              Get {siteConfig.product} into your stack
            </h1>
            <p className="mt-5 text-base text-muted-foreground">
              Start in the playground. Prefer terminal? Use the CLI. Building an
              agent? Load the open weights. Same typed decisions everywhere.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild>
                <Link href="/playground">Open playground</Link>
              </Button>
              <Button asChild variant="outline">
                <a
                  href={siteConfig.keplerHuggingFace}
                  target="_blank"
                  rel="noreferrer"
                >
                  Free weights
                </a>
              </Button>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.05}>
            <h2 className="mt-14 font-sans text-2xl font-medium">CLI</h2>
            <p className="mt-3 text-sm text-muted-foreground">
              No paste-a-script every time. Gate a command from the terminal.
            </p>
            <pre className="mt-4 overflow-x-auto rounded-xl border border-white/10 bg-black/50 p-5 font-mono text-[13px] text-[#c4c4cc]">
{`pip install -e ./cli
kepler gate --command "rm -rf /"
# -> deny
kepler gate --command "git status"
# -> allow`}
            </pre>
          </ScrollReveal>

          <ScrollReveal delay={0.05}>
            <h2 className="mt-14 font-sans text-2xl font-medium">
              Python (optional)
            </h2>
            <pre className="mt-4 overflow-x-auto rounded-xl border border-white/10 bg-black/50 p-5 font-mono text-[13px] text-[#c4c4cc]">
{`pip install "laya>=0.3.0" "numpy<2" "transformers>=4.48.0,<5"
from laya import load
agent = load("${siteConfig.keplerModelId}")

out = agent.predict(
  {"tool": "shell", "command": "git status", "cwd": "/workspace"},
  {"action": {
    "type": "choice",
    "instructions": "Should the coding agent run this call?",
    "criteria": {"allow": "Safe", "ask": "Needs confirmation", "deny": "Dangerous or secret leak"},
  }},
)
print(out)`}
            </pre>
            <p className="mt-3 text-sm text-muted-foreground">
              Model page:{" "}
              <a
                href={siteConfig.keplerHuggingFace}
                className="text-foreground underline-offset-2 hover:underline"
                target="_blank"
                rel="noreferrer"
              >
                {siteConfig.keplerModelId}
              </a>
              . Lineage:{" "}
              <a
                href={siteConfig.layaGithub}
                className="text-foreground underline-offset-2 hover:underline"
                target="_blank"
                rel="noreferrer"
              >
                open Laya
              </a>
              . Mac notes:{" "}
              <code className="text-signal">docs/RUN_LOCAL.md</code>.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.08}>
            <h2 className="mt-14 font-sans text-2xl font-medium">
              Decision primitives
            </h2>
            <div className="mt-6 flex flex-col border-t border-white/10">
              {[
                {
                  name: "choice",
                  body: "Pick one option from labeled criteria. Returns the key, full distribution, and confidence.",
                },
                {
                  name: "score",
                  body: "Place the state on an ordinal rubric (0…n). Returns expected level + distribution.",
                },
                {
                  name: "noul",
                  body: "Boolean question. Returns calibrated P(true) with P(false) = 1 − P(true).",
                },
              ].map((p) => (
                <div
                  key={p.name}
                  className="grid gap-2 border-b border-white/10 py-5 sm:grid-cols-[7rem_1fr] sm:gap-6"
                >
                  <p className="type-mono-label text-signal">{p.name}</p>
                  <p className="type-body-md text-muted-foreground">{p.body}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h2 className="mt-14 font-sans text-2xl font-medium">
              Minimal call shape
            </h2>
            <pre className="mt-4 overflow-x-auto rounded-xl border border-white/10 bg-black/50 p-5 font-mono text-[12px] leading-relaxed text-[#c4c4cc]">
{`state = {
  "subject": "Duplicate charge",
  "body": "Billed twice, refund or we cancel."
}

questions = {
  "department": {
    "type": "choice",
    "instructions": "Which team owns this?",
    "criteria": {
      "billing": "refunds, invoices",
      "technical": "outages, bugs",
      "sales": "pricing, contracts"
    }
  },
  "urgency": {
    "type": "score",
    "instructions": "How urgent?",
    "criteria": ["low", "medium", "critical"]
  },
  "churn_risk": {
    "type": "noul",
    "instructions": "Does the user threaten to leave?"
  }
}

# result = agent.predict(state, questions)`}
            </pre>
          </ScrollReveal>

          <ScrollReveal delay={0.12}>
            <div className="mt-12 flex flex-wrap gap-3">
              <Button
                asChild
                className="rounded-md bg-foreground text-background hover:bg-foreground/90"
              >
                <a
                  href={siteConfig.github}
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub recipes
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="rounded-md border-white/15 bg-transparent hover:bg-white/5"
              >
                <Link href="/use-cases">Browse use cases</Link>
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </article>
    </SiteShell>
  );
}

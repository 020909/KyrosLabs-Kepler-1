import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowUpRight,
  Inbox,
  ShieldCheck,
  Ticket,
  Filter,
  FileWarning,
  Lock,
} from "lucide-react";
import { ScrollReveal } from "@/components/scroll-reveal";
import { SiteShell } from "@/components/site-shell";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Use cases",
  description: `Where ${siteConfig.product} fits in real systems.`,
};

const cases = [
  {
    icon: Ticket,
    index: "01",
    eyebrow: "Support",
    title: "Support ticket routing",
    body: "Classify queue, urgency, and churn risk from a single ticket payload, before an LLM writes a reply.",
    tint: "bg-white/[0.04]",
  },
  {
    icon: Inbox,
    index: "02",
    eyebrow: "Inbox",
    title: "Email & inbox triage",
    body: "Spam, phishing, refund intent, and department ownership without streaming tokens.",
    tint: "bg-white/[0.04]",
  },
  {
    icon: ShieldCheck,
    index: "03",
    eyebrow: "Agents",
    title: "Agent tool-call gates",
    body: "Ask structured safety questions before a coding agent runs shell, writes files, or hits the network.",
    tint: "bg-white/[0.04]",
  },
  {
    icon: Filter,
    index: "04",
    eyebrow: "Retrieval",
    title: "RAG relevance filters",
    body: "Keep or drop passages with calibrated confidence instead of hoping a chat model “feels” relevant.",
    tint: "bg-white/[0.04]",
  },
  {
    icon: FileWarning,
    index: "05",
    eyebrow: "Ops",
    title: "Invoice & ops alerts",
    body: "Score severity and route finance vs engineering when documents mix numbers and prose.",
    tint: "bg-white/[0.04]",
  },
  {
    icon: Lock,
    index: "06",
    eyebrow: "Security",
    title: "On-prem / air-gapped stacks",
    body: "When data cannot leave the building, local System One decisions still ship.",
    tint: "bg-white/[0.04]",
  },
];

export default function UseCasesPage() {
  return (
    <SiteShell>
      <article className="px-6 pt-16 pb-28 md:pt-24">
        <div className="mx-auto max-w-6xl">
          <ScrollReveal>
<h1 className="type-display-xxl mt-5 max-w-3xl">
              Where Kepler earns its keep
            </h1>
            <p className="type-body-lg mt-5 max-w-2xl text-muted-foreground">
              Use generative models for writing. Use {siteConfig.product} when
              the system only needs a decision.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <Badge className="type-mono-caption rounded-[4px] bg-signal text-[#08080a]">
                System One
              </Badge>
              <Badge
                variant="outline"
                className="type-mono-caption rounded-[4px]"
              >
                Typed outputs
              </Badge>
              <Badge
                variant="outline"
                className="type-mono-caption rounded-[4px]"
              >
                Local first
              </Badge>
            </div>
          </ScrollReveal>

          <div className="mt-16 flex flex-col">
            {cases.map((c, i) => (
              <ScrollReveal key={c.title} delay={i * 0.04}>
                <div
                  className={`grid gap-6 border-white/10 py-10 md:grid-cols-[5rem_1fr_1.2fr] md:items-start md:gap-10 ${
                    i === 0 ? "border-t" : ""
                  } border-b`}
                >
                  <span className="type-mono-caption text-muted-foreground">
                    {c.index}
                  </span>
                  <div className="flex gap-4">
                    <div
                      className={`flex size-12 shrink-0 items-center justify-center rounded-[4px] ${c.tint}`}
                    >
                      <c.icon className="size-5 text-signal" />
                    </div>
                    <div>
                      <p className="type-mono-eyebrow text-signal">{c.eyebrow}</p>
                      <h2 className="type-display-md mt-3">{c.title}</h2>
                    </div>
                  </div>
                  <p className="type-body-md text-muted-foreground md:pt-8">
                    {c.body}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.1}>
            <div className="mt-16 rounded-[4px] border border-white/10 bg-white/[0.03] p-8 md:p-10">
<h2 className="type-display-lg mt-4 max-w-xl">
                Plug decisions into code, then keep the writer model for writing.
              </h2>
              <p className="type-body-md mt-3 max-w-xl text-muted-foreground">
                Docs cover install, primitives, and how to gate agent tools with
                Kepler before anything irreversible runs.
              </p>
              <Separator className="my-8 bg-white/10" />
              <div className="flex flex-wrap gap-3">
                <Button asChild>
                  <Link href="/docs">
                    See docs
                    <ArrowUpRight data-icon="inline-end" />
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/pricing">Pricing</Link>
                </Button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </article>
    </SiteShell>
  );
}

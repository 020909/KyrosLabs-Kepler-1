import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PlaygroundConsole } from "@/components/playground-console";
import { ScrollReveal } from "@/components/scroll-reveal";
import { SiteShell } from "@/components/site-shell";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Playground",
  description: `Feel ${siteConfig.product} decide — allow, ask, or deny — without writing code.`,
};

export default function PlaygroundPage() {
  return (
    <SiteShell>
      <section className="px-6 pt-16 pb-10 md:pt-24">
        <div className="mx-auto max-w-6xl">
          <ScrollReveal>
            <div className="flex items-center gap-4">
              <Image
                src="/brand/kepler-avatar.png"
                alt="Kepler bat"
                width={112}
                height={112}
                className="size-28 object-contain"
                priority
              />
              <p className="type-mono-eyebrow text-signal">{siteConfig.product}</p>
            </div>
            <h1 className="type-display-xxl mt-4 max-w-3xl">
              Feel the decision.
              <span className="mt-2 block text-foreground/65 italic">
                Gates, triage, noul — no Python required.
              </span>
            </h1>
            <p className="type-body-lg mt-6 max-w-2xl text-muted-foreground">
              Live {siteConfig.product} checkpoint. Tool gates from 1.1, plus
              support triage on the broader System One surface.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="px-6 pb-16">
        <div className="mx-auto max-w-6xl">
          <ScrollReveal delay={0.06}>
            <PlaygroundConsole />
          </ScrollReveal>
        </div>
      </section>

      <section className="border-t border-white/5 px-6 py-[80px]">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2">
          <ScrollReveal>
            <h2 className="type-display-xl mt-2">Use it like a tool</h2>
            <p className="type-body-lg mt-4 text-muted-foreground">
              Prefer terminal over a browser? Install the CLI once, then gate
              commands without writing a script.
            </p>
            <pre className="mt-6 overflow-x-auto rounded-[4px] border border-white/10 bg-black/50 p-5 font-mono text-[13px] text-[#c4c4cc]">
{`pip install -e ./cli
kepler
# branded session · menu or type a command
# → ALLOW / ASK / DENY with probability bars`}
            </pre>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild variant="outline">
                <Link href="/docs">
                  Docs
                  <ArrowUpRight data-icon="inline-end" />
                </Link>
              </Button>
              <Button asChild variant="outline">
                <a
                  href={siteConfig.keplerHuggingFace}
                  target="_blank"
                  rel="noreferrer"
                >
                  Free weights
                  <ArrowUpRight data-icon="inline-end" />
                </a>
              </Button>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.08}>
            <h2 className="type-display-xl mt-2">What this is</h2>
            <ul className="mt-6 flex flex-col border-t border-white/10">
              {[
                "System One reflex for coding agents — not a chatbot.",
                "Outputs are typed: allow, ask, or deny, with probabilities.",
                "Open weights on Hugging Face. $0 to self-host.",
                "Playground shows checkpoint-backed scenarios for product feel.",
              ].map((item) => (
                <li
                  key={item}
                  className="type-body-md border-b border-white/10 py-4 text-muted-foreground"
                >
                  {item}
                </li>
              ))}
            </ul>
          </ScrollReveal>
        </div>
      </section>
    </SiteShell>
  );
}

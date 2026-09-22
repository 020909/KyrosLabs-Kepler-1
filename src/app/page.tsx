import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Shield, Zap, Globe2, Binary } from "lucide-react";
import { NumberTicker } from "@/components/ui/number-ticker";
import { Marquee } from "@/components/ui/marquee";
import { ShineBorder } from "@/components/ui/shine-border";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { DecisionDemo } from "@/components/decision-demo";
import { ComparisonTabs } from "@/components/comparison-tabs";
import { FaqList } from "@/components/faq-list";
import { ScrollReveal } from "@/components/scroll-reveal";
import { SiteShell } from "@/components/site-shell";
import { siteConfig } from "@/lib/site";

const lanes = [
  "Support queues",
  "Tool-call gates",
  "Ticket routing",
  "Email triage",
  "Agent guardrails",
  "Phishing checks",
  "Urgency scoring",
  "Invoice flags",
];

const features = [
  {
    icon: Zap,
    title: "Reflex-speed",
    body: "Milliseconds on commodity hardware.",
    tint: "bg-white/[0.03]",
  },
  {
    icon: Shield,
    title: "No hallucination prose",
    body: "Outputs are typed. nothing to regex.",
    tint: "bg-white/[0.03]",
  },
  {
    icon: Binary,
    title: "Open & inspectable",
    body: "Apache lineage. Weights you can host.",
    tint: "bg-white/[0.03]",
  },
  {
    icon: Globe2,
    title: "Air-gap ready",
    body: "Keep sensitive state on-prem.",
    tint: "bg-white/[0.03]",
  },
];

const explore = [
  {
    href: "/playground",
    index: "01",
    title: "Playground",
    body: "Feel allow / ask / deny without writing code.",
  },
  {
    href: "/docs",
    index: "02",
    title: "Docs",
    body: "CLI, install path, primitives, plug into agents.",
  },
  {
    href: "/about",
    index: "03",
    title: "About",
    body: "What Kepler is, why it exists, and how we stay legal.",
  },
  {
    href: "/use-cases",
    index: "04",
    title: "Use cases",
    body: "Routing, guardrails, triage. where System One wins.",
  },
  {
    href: "/pricing",
    index: "05",
    title: "Pricing",
    body: "$0. Free. Open. Self-hosted. No meter.",
  },
  {
    href: siteConfig.keplerHuggingFace,
    index: "06",
    title: "Weights",
    body: "Free public checkpoint on Hugging Face. download and run local.",
    external: true,
  },
];

const faqs = [
  {
    q: "Is Kepler really free?",
    a: "Yes. Self-host the open weights at $0 from Hugging Face. You pay for your own compute. not a usage meter from Kyros Labs.",
  },
  {
    q: "Where do I download the model?",
    a: "Public weights: huggingface.co/MAKALY/kepler-1.1. pip install laya, then load that model id.",
  },
  {
    q: "How is this different from a chat model?",
    a: "Chat models write prose. Kepler answers typed questions. route, score, yes/no. so your code can branch without regex gymnastics.",
  },
  {
    q: "How does Kepler compare to Jev?",
    a: "Jev is a proprietary System One stack. Kepler is open, Apache-lineage via Laya, and designed to run locally with reflex-speed latency on commodity hardware.",
  },
  {
    q: "Can I run it air-gapped?",
    a: "Yes. Download the weights once, then keep inference entirely on-prem. No outbound API calls required for decisions.",
  },
  {
    q: "What license applies?",
    a: "Kepler inherits Apache 2.0 lineage from Laya. See NOTICE and the Hugging Face model card for attribution and redistribution guidance.",
  },
];

const comparisons = [
  {
    metric: "Typical local latency",
    kepler: "~33 ms",
    jev: "Cloud round-trip",
  },
  {
    metric: "Self-host cost",
    kepler: "$0 weights",
    jev: "Vendor priced",
  },
  {
    metric: "Output shape",
    kepler: "Typed choices",
    jev: "Vendor API",
  },
  {
    metric: "Inspectability",
    kepler: "Open weights",
    jev: "Closed stack",
  },
  {
    metric: "Air-gap",
    kepler: "First-class",
    jev: "Depends on vendor",
  },
];

export default function HomePage() {
  return (
    <SiteShell>
      <section className="relative overflow-hidden px-6 pt-16 pb-[80px] md:pt-24 md:pb-[80px]">
        <div className="relative mx-auto max-w-6xl">
          <h1 className="animate-rise type-display-xxl mt-2 max-w-4xl">
            {siteConfig.product}
            <span className="mt-2 block text-foreground/65 italic">
              {siteConfig.tagline}
            </span>
          </h1>

          <p className="animate-rise-delay-2 type-body-lg mt-8 max-w-2xl text-muted-foreground">
            {siteConfig.description} Fine-tuned from open-source Laya. Built for
            software that needs yes/no, route, and score answers. not another
            chatbot.
          </p>

          <div className="animate-rise-delay-3 mt-10 flex flex-wrap items-center gap-3">
            <Button asChild size="lg" variant="default">
              <Link href="/playground">
                Open playground
                <ArrowUpRight data-icon="inline-end" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a
                href={siteConfig.keplerHuggingFace}
                target="_blank"
                rel="noreferrer"
              >
                Get free weights
                <ArrowUpRight data-icon="inline-end" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      <section className="border-y border-white/5 bg-black/15 py-5">
        <Marquee pauseOnHover className="[--duration:42s]">
          {lanes.map((item) => (
            <span key={item} className="type-mono-label mx-8 text-muted-foreground">
              {item}
            </span>
          ))}
        </Marquee>
      </section>

      <section className="px-6 py-[80px]">
        <div className="mx-auto max-w-6xl">
          <ScrollReveal>
<h2 className="type-display-xl mt-5 max-w-2xl">
              Reflex latency you can budget for
            </h2>
            <p className="type-body-lg mt-4 max-w-xl text-muted-foreground">
              One forward pass. No paid cloud round-trip. Numbers that belong in
              a product SLA.
            </p>
          </ScrollReveal>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {[
              {
                value: 33,
                suffix: "ms",
                label: "Typical local latency",
                detail: "One forward pass. No round-trip to a paid cloud API.",
                tint: "bg-white/[0.03]",
              },
              {
                value: 0,
                suffix: "$",
                label: "Self-hosted cost",
                detail: "Open weights. Run on your GPU or CPU. Forever free.",
                tint: "bg-white/[0.03]",
              },
              {
                value: 100,
                suffix: "+",
                label: "Languages via Laya stack",
                detail: "Multilingual routing when you need global coverage.",
                tint: "bg-white/[0.03]",
              },
            ].map((stat, i) => (
              <ScrollReveal key={stat.label} delay={i * 0.08}>
                <div
                  className={`relative overflow-hidden rounded-[4px] border border-white/10 p-8 ${stat.tint}`}
                >
                  <ShineBorder
                    shineColor={["#828fff", "#ffffff", "#828fff"]}
                  />
                  <p className="type-display-xl tracking-tight">
                    <NumberTicker value={stat.value} />
                    <span className="text-signal">{stat.suffix}</span>
                  </p>
                  <p className="type-mono-label mt-5 text-foreground">
                    {stat.label}
                  </p>
                  <p className="type-caption mt-2 text-muted-foreground">
                    {stat.detail}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/5 px-6 py-[80px]">
        <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <ScrollReveal>
<h2 className="type-display-xl mt-5">
              Most AI writes paragraphs.
              <span className="mt-1 block text-muted-foreground italic">
                Kepler makes choices.
              </span>
            </h2>
            <p className="type-body-lg mt-6 text-muted-foreground">
              Pass a state and typed questions. Get choices, scores, and
              calibrated probabilities in one pass. ready for production
              control flow.
            </p>
            <div className="mt-10 flex flex-col">
              {features.map((item, i) => (
                <div
                  key={item.title}
                  className={`flex gap-5 border-white/10 py-6 ${i === 0 ? "border-t" : ""} border-b`}
                >
                  <div
                    className={`flex size-11 shrink-0 items-center justify-center rounded-[4px] ${item.tint}`}
                  >
                    <item.icon className="size-4 text-signal" />
                  </div>
                  <div>
                    <p className="type-display-md">{item.title}</p>
                    <p className="type-body-md mt-1.5 text-muted-foreground">
                      {item.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <DecisionDemo />
          </ScrollReveal>
        </div>
      </section>

      <section className="border-t border-white/5 bg-black/10 px-6 py-[80px]">
        <div className="mx-auto max-w-6xl">
          <ScrollReveal>
<h2 className="type-display-xl mt-5 max-w-2xl">
              Open reflex speed. No vendor meter.
            </h2>
            <p className="type-body-lg mt-4 max-w-xl text-muted-foreground">
              Kepler is the open System One path: local, inspectable, and
              priced at zero for self host. Not affiliated with TypeSafe AI or
              Jev.
            </p>
          </ScrollReveal>

          <ComparisonTabs rows={comparisons} />
        </div>
      </section>

      <section className="border-t border-white/5 px-6 py-[80px]">
        <div className="mx-auto max-w-6xl">
          <ScrollReveal>
<h2 className="type-display-xl mt-5 max-w-2xl">
              Everything you need to evaluate Kepler.
            </h2>
          </ScrollReveal>
          <div className="mt-12 flex flex-col border-t border-white/10">
            {explore.map((card, i) => (
              <ScrollReveal key={card.href} delay={i * 0.04}>
                <Link
                  href={card.href}
                  {...(card.external
                    ? { target: "_blank", rel: "noreferrer" }
                    : {})}
                  className="group grid grid-cols-[auto_1fr_auto] items-start gap-4 border-b border-white/10 py-7 transition-colors hover:bg-white/[0.02] md:grid-cols-[4.5rem_12rem_1fr_auto] md:items-center md:gap-8 md:px-2"
                >
                  <span className="type-mono-caption text-muted-foreground">
                    {card.index}
                  </span>
                  <h3 className="type-display-md group-hover:text-signal">
                    {card.title}
                  </h3>
                  <p className="type-body-md col-span-2 text-muted-foreground md:col-span-1">
                    {card.body}
                  </p>
                  <ArrowUpRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-signal" />
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/5 px-6 py-[80px]">
        <div className="mx-auto max-w-6xl">
          <ScrollReveal>
<h2 className="type-display-xl mt-5">Notes from the lab</h2>
            <p className="type-body-lg mt-4 max-w-xl text-muted-foreground">
              Articles on System One design, open weights, and how Kepler fits
              real product code.
            </p>
          </ScrollReveal>
          <div className="mt-12 flex flex-col border-t border-white/10">
            {siteConfig.articles.map((article, i) => (
              <ScrollReveal key={article.slug} delay={i * 0.04}>
                                <article className="grid gap-4 border-b border-white/10 py-8 md:grid-cols-[11rem_minmax(0,1fr)] md:items-start md:gap-12">
                  <div className="flex flex-col gap-2 md:pt-1">
                    <p className="type-mono-eyebrow text-signal">
                      {article.eyebrow}
                    </p>
                    <p className="type-mono-caption text-muted-foreground">
                      {article.meta}
                    </p>
                  </div>
                  <div className="min-w-0">
                    <h3 className="type-display-md">{article.title}</h3>
                    <p className="type-body-md mt-3 max-w-2xl text-muted-foreground">
                      {article.summary}
                    </p>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/5 px-6 py-[80px]">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <ScrollReveal>
<h2 className="type-display-xl mt-5">
              Questions teams ask before they ship
            </h2>
            <p className="type-body-lg mt-4 text-muted-foreground">
              Short answers. Full detail lives in docs and the open repo.
            </p>
            <Button asChild variant="outline" className="mt-8">
              <Link href="/docs">
                Read docs
                <ArrowUpRight data-icon="inline-end" />
              </Link>
            </Button>
          </ScrollReveal>
          <FaqList items={faqs} />
        </div>
      </section>

      <section className="border-t border-white/5 px-6 py-[80px]">
        <ScrollReveal>
          <div className="mx-auto flex max-w-6xl flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-xl">
<h2 className="type-display-xl mt-5">
                Ship the open alternative.
              </h2>
              <p className="type-body-lg mt-4 text-muted-foreground">
                Open the playground. Download free weights. Run Kepler where your
                data already lives.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href="/playground">
                  Open playground
                  <ArrowUpRight data-icon="inline-end" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a
                  href={siteConfig.keplerHuggingFace}
                  target="_blank"
                  rel="noreferrer"
                >
                  Get free weights
                </a>
              </Button>
            </div>
          </div>
          <Separator className="mx-auto mt-12 max-w-6xl bg-white/10" />
          <p className="type-caption mx-auto mt-6 max-w-6xl text-muted-foreground/80">
            Built on{" "}
            <a
              href={siteConfig.layaGithub}
              className="underline-offset-2 hover:text-foreground hover:underline"
              target="_blank"
              rel="noreferrer"
            >
              Laya
            </a>{" "}
            (Apache 2.0). Not affiliated with TypeSafe AI or Jev.
          </p>
        </ScrollReveal>
      </section>
    </SiteShell>
  );
}

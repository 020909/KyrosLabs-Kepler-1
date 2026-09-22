import type { Metadata } from "next";
import Link from "next/link";
import { ScrollReveal } from "@/components/scroll-reveal";
import { SiteShell } from "@/components/site-shell";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: `About ${siteConfig.product} and ${siteConfig.name}.`,
};

export default function AboutPage() {
  return (
    <SiteShell>
      <article className="px-6 pt-16 pb-28 md:pt-24">
        <div className="mx-auto max-w-3xl">
          <ScrollReveal>
<h1 className="mt-4 font-sans text-4xl font-medium tracking-tight md:text-5xl">
              {siteConfig.product}, purpose, origin, and how we stay clean
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.05}>
            <div className="mt-12 flex flex-col gap-6 text-[15px] leading-relaxed text-muted-foreground">
              <p>
                <span className="text-foreground">{siteConfig.product}</span>{" "}
                is Kyros Labs’ first and most powerful decision model. It is a
                System One model: give it a state (email, ticket, JSON) and
                typed questions; get choices, scores, and calibrated
                probabilities, in milliseconds, on your machine.
              </p>
              <p>
                Chatbots are built to write. Software often only needs to{" "}
                <em className="text-foreground not-italic">decide</em>: which
                queue, how urgent, is this safe? Kepler exists so those
                decisions don’t require a paid cloud round-trip or fragile
                text parsing.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.08}>
            <h2 className="mt-16 font-sans text-2xl font-medium text-foreground">
              Why the category exploded
            </h2>
            <div className="mt-5 flex flex-col gap-4 text-[15px] leading-relaxed text-muted-foreground">
              <p>
                Closed products like TypeSafe’s Jev showed the world that
                structured decisions are a new model class, fast, typed, and
                useful inside agent workflows. Exciting. Also closed, cloud, and
                metered.
              </p>
              <p>
                Open-source{" "}
                <a
                  href={siteConfig.layaGithub}
                  className="text-foreground underline-offset-2 hover:underline"
                  target="_blank"
                  rel="noreferrer"
                >
                  Laya
                </a>{" "}
                (ConvAI Innovations / Nandakishor Mukkunnoth) proved you can do
                this locally under Apache 2.0, often much faster because
                inference never leaves your hardware. Its authors are clear that
                fine-tuning is where quality comes from, and that some hard
                cases still lag closed systems.
              </p>
              <p>
                Kyros Labs fine-tunes that open base into Kepler, legally, with
                full credit, and ships the result as open weights the community
                can run and improve.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h2 className="mt-16 font-sans text-2xl font-medium text-foreground">
              Leadership
            </h2>
            <p className="mt-5 text-[15px] leading-relaxed text-muted-foreground">
              <span className="text-foreground">
                {siteConfig.founder.name}
              </span>{" "}
              is the {siteConfig.founder.title} of {siteConfig.name}, based in{" "}
              {siteConfig.founder.location}.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.12}>
            <h2 className="mt-16 font-sans text-2xl font-medium text-foreground">
              Legal stance
            </h2>
            <ul className="mt-5 flex list-disc flex-col gap-2 pl-5 text-[15px] leading-relaxed text-muted-foreground">
              <li>
                Fine-tune Laya under Apache 2.0 with attribution in NOTICE and
                model cards.
              </li>
              <li>
                No affiliation with TypeSafe AI or Jev. No proprietary weight
                or private-data copying.
              </li>
              <li>
                Fair public comparisons. Honest benchmarks, including losses.
              </li>
            </ul>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button
                asChild
                className="rounded-md bg-foreground text-background hover:bg-foreground/90"
              >
                <Link href="/docs">Read docs</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="rounded-md border-white/15 bg-transparent hover:bg-white/5"
              >
                <Link href="/join">Join us</Link>
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </article>
    </SiteShell>
  );
}

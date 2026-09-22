import type { Metadata } from "next";
import Link from "next/link";
import { WaitlistForm } from "@/components/waitlist-form";
import { ScrollReveal } from "@/components/scroll-reveal";
import { SiteShell } from "@/components/site-shell";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Kepler 1.3 early access",
  description: `Join the ${siteConfig.nextProduct} waitlist — early access to Kyros Labs’ next System One model.`,
};

export default function WaitlistPage() {
  return (
    <SiteShell>
      <article className="px-6 pt-16 pb-28 md:pt-24">
        <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[0.95fr_1fr]">
          <ScrollReveal>
            <p className="type-mono-eyebrow text-signal">Coming soon</p>
            <h1 className="mt-4 font-sans text-4xl font-medium tracking-tight md:text-5xl">
              {siteConfig.nextProduct}
              <span className="mt-2 block text-foreground/65 italic">
                An order of magnitude beyond anything we’ve shipped.
              </span>
            </h1>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              {siteConfig.product} is live today. {siteConfig.nextProduct} is
              next — broader training, harder evals, and the same open local
              path. Join early access if you want first weights and private
              notes from the lab.
            </p>
            <ul className="mt-8 flex flex-col gap-3 text-sm text-muted-foreground">
              {[
                "Early weights when 1.3 ships",
                "Private release notes from Kyros Labs",
                "Same $0 self-host philosophy — no vendor meter",
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-signal" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-8 text-xs text-muted-foreground">
              Already shipping with {siteConfig.product}?{" "}
              <Link href="/playground" className="text-signal underline-offset-2 hover:underline">
                Open the playground
              </Link>{" "}
              or{" "}
              <a
                href={siteConfig.keplerHuggingFace}
                target="_blank"
                rel="noreferrer"
                className="text-signal underline-offset-2 hover:underline"
              >
                grab the weights
              </a>
              .
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.08}>
            <div className="rounded-[4px] border border-white/10 bg-white/[0.02] p-6 md:p-8">
              <p className="type-mono-eyebrow text-signal">Early access</p>
              <p className="mt-3 font-sans text-xl font-medium tracking-tight">
                Name, email, country. That’s it.
              </p>
              <div className="mt-6">
                <WaitlistForm />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </article>
    </SiteShell>
  );
}

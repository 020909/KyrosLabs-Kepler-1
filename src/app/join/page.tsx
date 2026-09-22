import type { Metadata } from "next";
import { JoinForm } from "@/components/join-form";
import { ScrollReveal } from "@/components/scroll-reveal";
import { SiteShell } from "@/components/site-shell";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Join us",
  description: `Apply to join ${siteConfig.name}.`,
};

export default function JoinPage() {
  return (
    <SiteShell>
      <article className="px-6 pt-16 pb-28 md:pt-24">
        <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[0.9fr_1.1fr]">
          <ScrollReveal>
<h1 className="mt-4 font-sans text-4xl font-medium tracking-tight md:text-5xl">
              Help build the open decision stack
            </h1>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              We’re looking for people who care about local models, evaluation
              honesty, and product craft. Write a short paragraph about your
              skills, what you’ve shipped and what you want to own at{" "}
              {siteConfig.name}.
            </p>
            <ul className="mt-8 flex flex-col gap-3 text-sm text-muted-foreground">
              {[
                "Research / training / eval harnesses",
                "Systems & inference",
                "Product, design, developer experience",
                "Growth, community, technical writing",
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-signal" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-8 text-xs text-muted-foreground">
              Submissions go to {siteConfig.email}. No placeholding, this form
              is live.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.08}>
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 md:p-8">
              <JoinForm />
            </div>
          </ScrollReveal>
        </div>
      </article>
    </SiteShell>
  );
}

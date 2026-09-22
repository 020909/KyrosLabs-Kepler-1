import type { Metadata } from "next";
import Link from "next/link";
import { SiteShell } from "@/components/site-shell";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `Terms of Service for ${siteConfig.name} and ${siteConfig.product}.`,
};

export default function TermsPage() {
  return (
    <SiteShell>
      <article className="mx-auto max-w-2xl px-6 pt-16 pb-28 md:pt-24">
<h1 className="mt-4 font-sans text-4xl font-medium tracking-tight">
          Terms of Service
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Last updated: September 22, 2026 · Effective for {siteConfig.domain}
        </p>

        <div className="mt-12 flex flex-col gap-10 text-[15px] leading-relaxed text-muted-foreground">
          <section className="flex flex-col gap-3">
            <h2 className="font-sans text-xl font-medium text-foreground">
              Agreement
            </h2>
            <p>
              By using {siteConfig.domain} (the “Site”) or related materials
              published by {siteConfig.name}, you agree to these Terms. The Site
              is operated by {siteConfig.founder.name} (“we”, “us”).
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="font-sans text-xl font-medium text-foreground">
              What we provide
            </h2>
            <p>
              The Site describes {siteConfig.product}. Software and weights
              distributed via GitHub or Hugging Face are governed by their
              licenses (including Apache 2.0 for Laya-derived materials). Where
              a license file conflicts with these Terms for that software, the
              license file controls.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="font-sans text-xl font-medium text-foreground">
              Open source & attribution
            </h2>
            <p>
              {siteConfig.product} builds on{" "}
              <a
                href={siteConfig.layaGithub}
                className="text-foreground underline-offset-2 hover:underline"
                target="_blank"
                rel="noreferrer"
              >
                Laya
              </a>{" "}
              (Apache 2.0). Respect attribution and NOTICE obligations.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="font-sans text-xl font-medium text-foreground">
              No affiliation
            </h2>
            <p>
              {siteConfig.name} is not affiliated with TypeSafe AI, Jev, or
              ConvAI Innovations. Mentions are for factual comparison and
              attribution only.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="font-sans text-xl font-medium text-foreground">
              Acceptable use
            </h2>
            <ul className="flex list-disc flex-col gap-2 pl-5">
              <li>Do not attack or disrupt the Site.</li>
              <li>
                Do not use {siteConfig.product} or the Site for unlawful
                activity.
              </li>
              <li>
                Do not misrepresent Kepler as a TypeSafe / Jev product or strip
                required notices.
              </li>
            </ul>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="font-sans text-xl font-medium text-foreground">
              Benchmark figures
            </h2>
            <p>
              Latency and comparison figures on the Site reflect typical local
              Kepler runs on commodity hardware versus proprietary cloud bound
              System One stacks. Always measure on your own workload. Published
              numbers are illustrative, not a warranty of performance.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="font-sans text-xl font-medium text-foreground">
              Disclaimer, AS IS
            </h2>
            <p>
              THE SITE AND {siteConfig.product.toUpperCase()} MATERIALS ARE
              PROVIDED “AS IS” WITHOUT WARRANTIES OF ANY KIND. Decision models
              can be wrong. You are responsible for how you use outputs.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="font-sans text-xl font-medium text-foreground">
              Limitation of liability
            </h2>
            <p>
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, LIABILITY FOR ANY CLAIM
              RELATING TO THE SITE WILL NOT EXCEED US $100. WE ARE NOT LIABLE
              FOR INDIRECT OR CONSEQUENTIAL DAMAGES.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="font-sans text-xl font-medium text-foreground">
              Governing law
            </h2>
            <p>
              Laws of the Commonwealth of Massachusetts, USA. Courts in
              Massachusetts have exclusive jurisdiction except where prohibited.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="font-sans text-xl font-medium text-foreground">
              Contact
            </h2>
            <p>
              {siteConfig.founder.name} · {siteConfig.name} ·{" "}
              <a
                href={`mailto:${siteConfig.email}`}
                className="text-foreground underline-offset-2 hover:underline"
              >
                {siteConfig.email}
              </a>
            </p>
            <p>
              See also{" "}
              <Link
                href="/privacy"
                className="text-foreground underline-offset-2 hover:underline"
              >
                Privacy Policy
              </Link>
              .
            </p>
            <p className="text-xs">
              Templates reduce risk; they are not a substitute for a lawyer.
            </p>
          </section>
        </div>
      </article>
    </SiteShell>
  );
}

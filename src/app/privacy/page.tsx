import type { Metadata } from "next";
import Link from "next/link";
import { SiteShell } from "@/components/site-shell";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy Policy for ${siteConfig.name} and ${siteConfig.domain}.`,
};

export default function PrivacyPage() {
  return (
    <SiteShell>
      <article className="mx-auto max-w-2xl px-6 pt-16 pb-28 md:pt-24">
<h1 className="mt-4 font-sans text-4xl font-medium tracking-tight">
          Privacy Policy
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Last updated: September 22, 2026 · Effective for {siteConfig.domain}
        </p>

        <div className="mt-12 flex flex-col gap-10 text-[15px] leading-relaxed text-muted-foreground">
          <section className="flex flex-col gap-3">
            <h2 className="font-sans text-xl font-medium text-foreground">
              Who we are
            </h2>
            <p>
              {siteConfig.name} is operated by {siteConfig.founder.name} (
              {siteConfig.founder.title}). Contact:{" "}
              <a
                href={`mailto:${siteConfig.email}`}
                className="text-foreground underline-offset-2 hover:underline"
              >
                {siteConfig.email}
              </a>
              .
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="font-sans text-xl font-medium text-foreground">
              What this site does
            </h2>
            <p>
              This website markets and documents the open-source{" "}
              {siteConfig.product} project. Join-us applications are stored so
              we can review candidates. We do not sell personal data.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="font-sans text-xl font-medium text-foreground">
              Information we may collect
            </h2>
            <ul className="flex list-disc flex-col gap-2 pl-5">
              <li>
                <span className="text-foreground">Hosting logs</span> from our
                host (IP, browser, pages, timestamps) to operate and secure the
                site.
              </li>
              <li>
                <span className="text-foreground">Join applications</span> , 
                name, email, role interest, skills paragraph, optional links.
              </li>
              <li>
                <span className="text-foreground">Email you send us</span> to{" "}
                {siteConfig.email}.
              </li>
              <li>
                Third-party sites (GitHub, Hugging Face) have their own
                policies.
              </li>
            </ul>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="font-sans text-xl font-medium text-foreground">
              How we use information
            </h2>
            <p>
              To operate {siteConfig.domain}, review join applications, respond
              to messages, improve the site, and protect against abuse.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="font-sans text-xl font-medium text-foreground">
              Retention & security
            </h2>
            <p>
              Logs and applications are kept only as long as needed for
              operations and hiring. No transmission method is 100% secure.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="font-sans text-xl font-medium text-foreground">
              Your choices
            </h2>
            <p>
              Email {siteConfig.email} to access, correct, or delete personal
              information we hold about you, subject to applicable law.
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
                href="/terms"
                className="text-foreground underline-offset-2 hover:underline"
              >
                Terms of Service
              </Link>
              .
            </p>
          </section>
        </div>
      </article>
    </SiteShell>
  );
}

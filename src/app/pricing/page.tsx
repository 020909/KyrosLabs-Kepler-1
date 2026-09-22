import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import { ScrollReveal } from "@/components/scroll-reveal";
import { SiteShell } from "@/components/site-shell";
import { Button } from "@/components/ui/button";
import { ShineBorder } from "@/components/ui/shine-border";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Pricing",
  description: `${siteConfig.product} is free, $0 to self-host.`,
};

const included = [
  "Open weights on Hugging Face (Apache 2.0 via Laya)",
  "Run on your own machines, no usage meter",
  "Docs, recipes, and public demos",
  "Community issues & contributions",
  "No seat licenses for local inference",
];

export default function PricingPage() {
  return (
    <SiteShell>
      <article className="px-6 pt-16 pb-28 md:pt-24">
        <div className="mx-auto max-w-6xl">
          <ScrollReveal>
<h1 className="type-display-xxl mt-5 max-w-3xl">
              Free. Zero dollars. No catch meter.
            </h1>
            <p className="type-body-lg mt-5 max-w-2xl text-muted-foreground">
              {siteConfig.product} is open. Self-host it. Pay for electricity , 
              not tokens.
            </p>
          </ScrollReveal>

          <div className="mt-14 grid gap-6 lg:grid-cols-[1fr_1.1fr] lg:items-start">
            <ScrollReveal delay={0.08}>
              <div className="relative overflow-hidden rounded-[4px] border border-white/10 bg-white/[0.03] p-8 md:p-10">
                <ShineBorder shineColor={["#828fff", "#ffffff", "#828fff"]} />
                <Badge className="type-mono-caption rounded-[4px] bg-signal text-[#08080a]">
                  Community
                </Badge>
                <p className="type-display-xxl mt-6 tracking-tight">$0</p>
                <p className="type-body-md mt-2 text-muted-foreground">
                  forever for self-hosted {siteConfig.product}
                </p>
                <ul className="mt-8 flex flex-col gap-3">
                  {included.map((item) => (
                    <li
                      key={item}
                      className="type-body-md flex gap-3 text-muted-foreground"
                    >
                      <Check className="mt-0.5 size-4 shrink-0 text-signal" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                  <Button asChild className="flex-1">
                    <a
                      href={siteConfig.keplerHuggingFace}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Get free weights
                    </a>
                  </Button>
                  <Button asChild variant="outline" className="flex-1">
                    <Link href="/docs">Read docs</Link>
                  </Button>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.12}>
              <div className="overflow-hidden rounded-[4px] border border-white/10">
                <Table>
                  <TableHeader>
                    <TableRow className="border-white/10 hover:bg-transparent">
                      <TableHead className="type-mono-label h-12 px-5 text-muted-foreground">
                        Plan
                      </TableHead>
                      <TableHead className="type-mono-label h-12 px-5 text-muted-foreground">
                        Price
                      </TableHead>
                      <TableHead className="type-mono-label h-12 px-5 text-muted-foreground">
                        Notes
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow className="border-white/10 hover:bg-white/[0.02]">
                      <TableCell className="type-body-md-strong px-5 py-4">
                        Self-host
                      </TableCell>
                      <TableCell className="type-body-md px-5 py-4 text-signal">
                        $0
                      </TableCell>
                      <TableCell className="type-body-md px-5 py-4 text-muted-foreground">
                        Open weights, your machines
                      </TableCell>
                    </TableRow>
                    <TableRow className="border-white/10 hover:bg-white/[0.02]">
                      <TableCell className="type-body-md-strong px-5 py-4">
                        Cloud API
                      </TableCell>
                      <TableCell className="type-body-md px-5 py-4 text-muted-foreground">
                        Not offered
                      </TableCell>
                      <TableCell className="type-body-md px-5 py-4 text-muted-foreground">
                        Not required. Run local.
                      </TableCell>
                    </TableRow>
                    <TableRow className="border-white/10 hover:bg-white/[0.02]">
                      <TableCell className="type-body-md-strong px-5 py-4">
                        Enterprise support
                      </TableCell>
                      <TableCell className="type-body-md px-5 py-4">
                        Later
                      </TableCell>
                      <TableCell className="type-body-md px-5 py-4 text-muted-foreground">
                        Optional custom fine-tunes
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
              <p className="type-caption mt-6 text-muted-foreground">
                Enterprise support / custom fine-tunes may be offered later.
                Inference of open Kepler weights stays free to self-host.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </article>
    </SiteShell>
  );
}

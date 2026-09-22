"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { GitHubIcon } from "@/components/github-icon";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#08080a]/80 backdrop-blur-xl">
      <div className="flex h-14 w-full items-center justify-between gap-6 pl-4 pr-4 md:h-16 md:pl-5 md:pr-6 lg:pl-6 lg:pr-8">
        <Link href="/" className="relative z-10 flex shrink-0 items-center gap-3">
          <Image
            src="/brand/logo.png"
            alt={`${siteConfig.name} logo`}
            width={32}
            height={32}
            className="size-8 rounded-[4px]"
            priority
          />
          <span className="type-body-md-strong tracking-tight">
            {siteConfig.name}
          </span>
        </Link>

        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 lg:flex">
          {siteConfig.nav.map((item) => {
            const active =
              pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-[4px] px-3 py-1.5 text-[14px] font-medium tracking-[-0.16px] transition-colors",
                  active
                    ? "bg-white/[0.08] text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="relative z-10 flex shrink-0 items-center gap-2">
          <Button
            asChild
            size="sm"
            variant="white"
            className="hidden sm:inline-flex"
          >
            <a href={siteConfig.github} target="_blank" rel="noreferrer">
              <GitHubIcon data-icon="inline-start" />
              GitHub
            </a>
          </Button>
          <button
            type="button"
            className="inline-flex size-9 items-center justify-center rounded-[4px] border border-white/10 text-foreground lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-white/10 bg-[#08080a]/95 px-4 py-4 backdrop-blur-xl lg:hidden">
          <div className="flex flex-col gap-1">
            {siteConfig.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-[4px] px-3 py-2.5 text-[14px] text-muted-foreground hover:bg-white/5 hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
            <a
              href={siteConfig.github}
              target="_blank"
              rel="noreferrer"
              className="type-mono-button mt-2 inline-flex items-center justify-center gap-2 rounded-[4px] bg-white px-3 py-3 text-[13px] text-[#08080a]"
            >
              <GitHubIcon className="size-4" />
              GitHub
            </a>
          </div>
        </div>
      ) : null}
    </header>
  );
}

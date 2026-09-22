"use client";

import { ChevronDown } from "lucide-react";

export type FaqItem = {
  q: string;
  a: string;
};

export function FaqList({ items }: { items: FaqItem[] }) {
  return (
    <div className="relative z-20 border-t border-white/10">
      {items.map((item) => (
        <details
          key={item.q}
          className="group border-b border-white/10 open:bg-transparent"
        >
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 text-left marker:content-none [&::-webkit-details-marker]:hidden">
            <span className="type-body-md-strong pr-4">{item.q}</span>
            <ChevronDown className="mt-0.5 size-4 shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-180 group-open:text-signal" />
          </summary>
          <p className="type-body-md pb-5 text-muted-foreground">{item.a}</p>
        </details>
      ))}
    </div>
  );
}

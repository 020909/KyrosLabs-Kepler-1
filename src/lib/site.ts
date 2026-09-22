/** Shared brand + links */
export const siteConfig = {
  name: "Kyros Labs",
  product: "Kepler 1.1",
  domain: "kyroslabs.tech",
  url: "https://kyroslabs.tech",
  github: "https://github.com/020909/KyrosLabs-Kepler-1",
  email: "hello@kyroslabs.tech",
  founder: {
    name: "Aly Maknojiya",
    title: "CEO & Founder",
    location: "Boston",
  },
  tagline: "Our first and most powerful decision model.",
  description:
    "Kepler 1.1 is Kyros Labs’ open, local System One decision model, typed answers in milliseconds, free to run on your machine.",
  layaGithub: "https://github.com/NandhaKishorM/laya",
  layaHuggingFace: "https://huggingface.co/convaiinnovations/laya",
  layaSite: "https://laya.convaiinnovations.com/",
  /** Live Kepler 1.1 weights (free public HF). */
  keplerHuggingFace: "https://huggingface.co/MAKALY/kepler-1.1",
  keplerModelId: "MAKALY/kepler-1.1",
  nav: [
    { href: "/playground", label: "Playground" },
    { href: "/docs", label: "Docs" },
    { href: "/about", label: "About" },
    { href: "/use-cases", label: "Use cases" },
    { href: "/pricing", label: "Pricing" },
    { href: "/join", label: "Join us" },
  ],
  articles: [
    {
      slug: "system-one-vs-chat",
      eyebrow: "PRODUCT",
      title: "Why typed decisions beat chat for control flow",
      summary:
        "Kepler returns choices and scores in one pass, so your product code never has to parse a paragraph.",
      meta: "Kyros Labs · 4 min read",
    },
    {
      slug: "open-laya-lineage",
      eyebrow: "RESEARCH",
      title: "Apache lineage, local weights, no vendor lock",
      summary:
        "Kepler 1.1 is fine-tuned from open Laya. Host it yourself, inspect it, and keep sensitive state on-prem.",
      meta: "Engineering · 6 min read",
    },
    {
      slug: "vs-jev-latency",
      eyebrow: "BENCHMARKS",
      title: "Reflex latency on commodity hardware",
      summary:
        "How Kepler stacks against proprietary System One stacks on local CPUs and a single consumer GPU.",
      meta: "Benchmarks · 5 min read",
    },
  ],
} as const;

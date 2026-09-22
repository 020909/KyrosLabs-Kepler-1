/** Shared brand + links */
export const siteConfig = {
  name: "Kyros Labs",
  product: "Kepler 1.2",
  previousProduct: "Kepler 1.1",
  nextProduct: "Kepler 1.3",
  domain: "kyroslabs.tech",
  url: "https://kyroslabs.tech",
  github: "https://github.com/020909/KyrosLabs-Kepler-1",
  email: "hello@kyroslabs.tech",
  founder: {
    name: "Aly Maknojiya",
    title: "CEO & Founder",
    location: "Boston",
  },
  tagline: "Our most powerful model yet.",
  description:
    "Kepler 1.2 is Kyros Labs’ open, local System One decision model — choice, score, and noul in one pass. Free to run on your machine.",
  layaGithub: "https://github.com/NandhaKishorM/laya",
  layaHuggingFace: "https://huggingface.co/convaiinnovations/laya",
  layaSite: "https://laya.convaiinnovations.com/",
  /** Live Kepler weights (free public HF). */
  keplerHuggingFace: "https://huggingface.co/MAKALY/kepler-1.2",
  keplerModelId: "MAKALY/kepler-1.2",
  kepler11HuggingFace: "https://huggingface.co/MAKALY/kepler-1.1",
  kepler11ModelId: "MAKALY/kepler-1.1",
  nav: [
    { href: "/playground", label: "Playground" },
    { href: "/docs", label: "Docs" },
    { href: "/waitlist", label: "1.3 Waitlist" },
    { href: "/about", label: "About" },
    { href: "/use-cases", label: "Use cases" },
    { href: "/pricing", label: "Pricing" },
    { href: "/join", label: "Join us" },
  ],
  articles: [
    {
      slug: "kepler-1-2-launch",
      eyebrow: "LAUNCH",
      title: "Kepler 1.2 is live — our most powerful model yet",
      summary:
        "1.1 taught coding agents to gate tool calls. 1.2 expands to full System One: triage, moderation, incident noul, and the gates you already know.",
      meta: "Kyros Labs · 3 min read",
    },
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
        "Kepler is fine-tuned from open Laya. Host it yourself, inspect it, and keep sensitive state on-prem.",
      meta: "Engineering · 6 min read",
    },
  ],
} as const;

import type { Metadata } from "next";
import { GateReel } from "@/components/gate-reel";

export const metadata: Metadata = {
  title: "Gate",
  description: "Kepler gates a coding agent before the command runs.",
};

export default async function GatePage({
  searchParams,
}: {
  searchParams: Promise<{ frame?: string; play?: string }>;
}) {
  const params = await searchParams;
  return (
    <GateReel
      frame={params.frame}
      play={params.play === "0" ? false : true}
    />
  );
}

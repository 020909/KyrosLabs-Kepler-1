"use server";

import { mkdir, appendFile } from "node:fs/promises";
import path from "node:path";

export type WaitlistState = {
  ok: boolean;
  message: string;
  errors?: Record<string, string>;
};

export async function submitWaitlist(
  _prev: WaitlistState,
  formData: FormData,
): Promise<WaitlistState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const country = String(formData.get("country") ?? "").trim();

  const errors: Record<string, string> = {};
  if (name.length < 2) errors.name = "Please enter your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    errors.email = "Enter a valid email.";
  if (country.length < 2) errors.country = "Enter your country.";

  if (Object.keys(errors).length > 0) {
    return {
      ok: false,
      message: "Fix the highlighted fields and try again.",
      errors,
    };
  }

  const entry = {
    submittedAt: new Date().toISOString(),
    name,
    email,
    country,
    product: "kepler-1.3",
  };

  const dir = path.join(process.cwd(), "data");
  await mkdir(dir, { recursive: true });
  await appendFile(
    path.join(dir, "waitlist-1.3.jsonl"),
    `${JSON.stringify(entry)}\n`,
    "utf8",
  );

  return {
    ok: true,
    message:
      "You’re on the Kepler 1.3 early-access list. We’ll email you when it’s ready.",
  };
}

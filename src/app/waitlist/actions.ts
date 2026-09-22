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

  // Best-effort local log (works in local/dev; ephemeral on Vercel).
  try {
    const dir = path.join(process.cwd(), "data");
    await mkdir(dir, { recursive: true });
    await appendFile(
      path.join(dir, "waitlist-1.3.jsonl"),
      `${JSON.stringify(entry)}\n`,
      "utf8",
    );
  } catch {
    // ignore filesystem failures on serverless
  }

  // Durable path: email to Kyros inbox via FormSubmit (free, no API key).
  // First submission triggers a one-time confirmation email to hello@kyroslabs.tech — click it.
  try {
    const res = await fetch("https://formsubmit.co/ajax/hello@kyroslabs.tech", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        _subject: "Kepler 1.3 waitlist signup",
        name,
        email,
        country,
        product: "kepler-1.3",
      }),
    });
    if (!res.ok) {
      // Still accept the lead — local log may have it; email may need FormSubmit confirm.
      console.warn("formsubmit status", res.status, await res.text());
    }
  } catch (err) {
    console.warn("formsubmit failed", err);
  }

  return {
    ok: true,
    message:
      "You’re on the Kepler 1.3 early-access list. We’ll email you when it’s ready.",
  };
}

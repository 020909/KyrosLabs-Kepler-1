"use server";

import { mkdir, appendFile } from "node:fs/promises";
import path from "node:path";
import { emailFormSubmission } from "@/lib/form-inbox";

export type JoinState = {
  ok: boolean;
  message: string;
  errors?: Record<string, string>;
};

export async function submitJoinApplication(
  _prev: JoinState,
  formData: FormData,
): Promise<JoinState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const role = String(formData.get("role") ?? "").trim();
  const skills = String(formData.get("skills") ?? "").trim();
  const links = String(formData.get("links") ?? "").trim();

  const errors: Record<string, string> = {};
  if (name.length < 2) errors.name = "Please enter your full name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    errors.email = "Enter a valid email.";
  if (role.length < 2) errors.role = "Tell us the role you want.";
  if (skills.length < 40)
    errors.skills =
      "Write a short paragraph (at least ~40 characters) about your skills.";

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
    role,
    skills,
    links: links || null,
  };

  try {
    const dir = path.join(process.cwd(), "data");
    await mkdir(dir, { recursive: true });
    await appendFile(
      path.join(dir, "join-applications.jsonl"),
      `${JSON.stringify(entry)}\n`,
      "utf8",
    );
  } catch {
    // ignore filesystem failures on serverless
  }

  await emailFormSubmission("Kyros Labs — Join us application", {
    name,
    email,
    role,
    skills,
    links: links || "(none)",
  });

  return {
    ok: true,
    message:
      "Application received. We’ll review it and reply by email if there’s a fit.",
  };
}

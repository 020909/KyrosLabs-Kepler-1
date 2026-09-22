"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FORM_INBOX } from "@/lib/form-inbox";

type Status = "idle" | "pending" | "ok" | "activate" | "error";

export function JoinForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") ?? "").trim();
    const email = String(fd.get("email") ?? "").trim();
    const role = String(fd.get("role") ?? "").trim();
    const skills = String(fd.get("skills") ?? "").trim();
    const links = String(fd.get("links") ?? "").trim();

    const nextErrors: Record<string, string> = {};
    if (name.length < 2) nextErrors.name = "Please enter your full name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      nextErrors.email = "Enter a valid email.";
    if (role.length < 2) nextErrors.role = "Tell us the role you want.";
    if (skills.length < 40)
      nextErrors.skills =
        "Write a short paragraph (at least ~40 characters) about your skills.";
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      setStatus("error");
      setMessage("Fix the highlighted fields and try again.");
      return;
    }
    setErrors({});
    setStatus("pending");
    setMessage("");

    try {
      const res = await fetch(`https://formsubmit.co/ajax/${FORM_INBOX}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          _subject: "Kyros Labs — Join us application",
          _template: "table",
          _captcha: "false",
          name,
          email,
          role,
          skills,
          links: links || "(none)",
        }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        success?: string | boolean;
        message?: string;
      };
      const raw = `${data.success ?? ""} ${data.message ?? ""}`.toLowerCase();
      if (
        raw.includes("confirm") ||
        raw.includes("activate") ||
        raw.includes("check your email")
      ) {
        setStatus("activate");
        setMessage(
          `Check Spam/Inbox for ${FORM_INBOX} — open the FormSubmit “Confirm your email” link once. Then submit again.`,
        );
        return;
      }
      if (!res.ok) {
        setStatus("error");
        setMessage("Couldn’t send right now. Try again in a minute.");
        return;
      }
      setStatus("ok");
      setMessage(
        "Application received. We’ll review it and reply by email if there’s a fit.",
      );
    } catch {
      setStatus("error");
      setMessage("Network error. Check your connection and try again.");
    }
  }

  if (status === "ok") {
    return (
      <div className="rounded-xl border border-signal/30 bg-signal/5 p-8">
        <p className="font-sans text-2xl font-medium text-foreground">
          You’re in the queue.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          {message}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5">
      <div className="grid gap-5 md:grid-cols-2">
        <Field id="name" label="Full name" error={errors.name} required>
          <Input
            id="name"
            name="name"
            required
            placeholder="Ada Lovelace"
            className="h-11 border-white/10 bg-white/[0.03]"
            aria-invalid={!!errors.name}
          />
        </Field>
        <Field id="email" label="Email" error={errors.email} required>
          <Input
            id="email"
            name="email"
            type="email"
            required
            placeholder="you@example.com"
            className="h-11 border-white/10 bg-white/[0.03]"
            aria-invalid={!!errors.email}
          />
        </Field>
      </div>

      <Field
        id="role"
        label="Role you’re aiming for"
        error={errors.role}
        required
      >
        <Input
          id="role"
          name="role"
          required
          placeholder="Research eng · Design · Growth · Ops…"
          className="h-11 border-white/10 bg-white/[0.03]"
          aria-invalid={!!errors.role}
        />
      </Field>

      <Field
        id="skills"
        label="What skills do you bring?"
        error={errors.skills}
        required
        hint="A short paragraph, what you’ve shipped, what you’re great at, why Kyros."
      >
        <Textarea
          id="skills"
          name="skills"
          required
          rows={6}
          placeholder="I’ve trained / evaluated decision models, shipped open-source tooling, or built product surfaces that need typed decisions…"
          className="border-white/10 bg-white/[0.03]"
          aria-invalid={!!errors.skills}
        />
      </Field>

      <Field
        id="links"
        label="Links (optional)"
        hint="GitHub, portfolio, papers, space-separated URLs are fine."
      >
        <Input
          id="links"
          name="links"
          placeholder="https://github.com/you"
          className="h-11 border-white/10 bg-white/[0.03]"
        />
      </Field>

      {status === "activate" || status === "error" ? (
        <p
          className={
            status === "activate" ? "text-sm text-signal" : "text-sm text-destructive"
          }
        >
          {message}
        </p>
      ) : null}

      <Button
        type="submit"
        disabled={status === "pending"}
        className="h-11 rounded-md bg-foreground text-background hover:bg-foreground/90"
      >
        {status === "pending" ? "Sending…" : "Submit application"}
      </Button>
    </form>
  );
}

function Field({
  id,
  label,
  children,
  error,
  hint,
  required,
}: {
  id: string;
  label: string;
  children: React.ReactNode;
  error?: string;
  hint?: string;
  required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={id} className="text-sm text-foreground">
        {label}
        {required ? <span className="text-signal"> *</span> : null}
      </Label>
      {children}
      {hint ? (
        <p className="text-xs text-muted-foreground">{hint}</p>
      ) : null}
      {error ? <p className="text-xs text-destructive">{error}</p> : null}
    </div>
  );
}

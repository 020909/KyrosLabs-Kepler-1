"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FORM_INBOX } from "@/lib/form-inbox";

type Status = "idle" | "pending" | "ok" | "activate" | "error";

export function WaitlistForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") ?? "").trim();
    const email = String(fd.get("email") ?? "").trim();
    const country = String(fd.get("country") ?? "").trim();

    const nextErrors: Record<string, string> = {};
    if (name.length < 2) nextErrors.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      nextErrors.email = "Enter a valid email.";
    if (country.length < 2) nextErrors.country = "Enter your country.";
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
          _subject: "Kepler 1.3 waitlist signup",
          _template: "table",
          _captcha: "false",
          name,
          email,
          country,
          product: "kepler-1.3",
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
          `Check Spam/Inbox for ${FORM_INBOX} — open the FormSubmit “Confirm your email” link once. Then try again.`,
        );
        return;
      }
      if (!res.ok) {
        setStatus("error");
        setMessage("Couldn’t send right now. Email us directly or try again.");
        return;
      }
      setStatus("ok");
      setMessage(
        "You’re on the Kepler 1.3 early-access list. We’ll email you when it’s ready.",
      );
    } catch {
      setStatus("error");
      setMessage("Network error. Check your connection and try again.");
    }
  }

  if (status === "ok") {
    return (
      <div className="rounded-[4px] border border-signal/30 bg-signal/5 p-8">
        <p className="font-sans text-2xl font-medium text-foreground">
          You’re on the list.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          {message}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5">
      <Field id="name" label="Name" error={errors.name} required>
        <Input
          id="name"
          name="name"
          required
          autoComplete="name"
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
          autoComplete="email"
          placeholder="you@example.com"
          className="h-11 border-white/10 bg-white/[0.03]"
          aria-invalid={!!errors.email}
        />
      </Field>
      <Field id="country" label="Country" error={errors.country} required>
        <Input
          id="country"
          name="country"
          required
          autoComplete="country-name"
          placeholder="United States"
          className="h-11 border-white/10 bg-white/[0.03]"
          aria-invalid={!!errors.country}
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
        className="h-11 rounded-[4px] bg-foreground text-background hover:bg-foreground/90"
      >
        {status === "pending" ? "Joining…" : "Join the waitlist"}
      </Button>
    </form>
  );
}

function Field({
  id,
  label,
  children,
  error,
  required,
}: {
  id: string;
  label: string;
  children: React.ReactNode;
  error?: string;
  required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={id} className="text-sm text-foreground">
        {label}
        {required ? <span className="text-signal"> *</span> : null}
      </Label>
      {children}
      {error ? <p className="text-xs text-destructive">{error}</p> : null}
    </div>
  );
}

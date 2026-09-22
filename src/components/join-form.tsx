"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  submitJoinApplication,
  type JoinState,
} from "@/app/join/actions";

const initial: JoinState = { ok: false, message: "" };

export function JoinForm() {
  const [state, action, pending] = useActionState(
    submitJoinApplication,
    initial,
  );

  if (state.ok) {
    return (
      <div className="rounded-xl border border-signal/30 bg-signal/5 p-8">
        <p className="font-sans text-2xl font-medium text-foreground">
          You’re in the queue.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          {state.message}
        </p>
      </div>
    );
  }

  return (
    <form action={action} className="flex flex-col gap-5">
      <div className="grid gap-5 md:grid-cols-2">
        <Field
          id="name"
          label="Full name"
          error={state.errors?.name}
          required
        >
          <Input
            id="name"
            name="name"
            required
            placeholder="Ada Lovelace"
            className="h-11 border-white/10 bg-white/[0.03]"
            aria-invalid={!!state.errors?.name}
          />
        </Field>
        <Field id="email" label="Email" error={state.errors?.email} required>
          <Input
            id="email"
            name="email"
            type="email"
            required
            placeholder="you@example.com"
            className="h-11 border-white/10 bg-white/[0.03]"
            aria-invalid={!!state.errors?.email}
          />
        </Field>
      </div>

      <Field
        id="role"
        label="Role you’re aiming for"
        error={state.errors?.role}
        required
      >
        <Input
          id="role"
          name="role"
          required
          placeholder="Research eng · Design · Growth · Ops…"
          className="h-11 border-white/10 bg-white/[0.03]"
          aria-invalid={!!state.errors?.role}
        />
      </Field>

      <Field
        id="skills"
        label="What skills do you bring?"
        error={state.errors?.skills}
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
          aria-invalid={!!state.errors?.skills}
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

      {state.message && !state.ok ? (
        <p className="text-sm text-destructive">{state.message}</p>
      ) : null}

      <Button
        type="submit"
        disabled={pending}
        className="h-11 rounded-md bg-foreground text-background hover:bg-foreground/90"
      >
        {pending ? "Sending…" : "Submit application"}
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

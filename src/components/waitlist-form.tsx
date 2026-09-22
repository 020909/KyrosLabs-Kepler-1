"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  submitWaitlist,
  type WaitlistState,
} from "@/app/waitlist/actions";

const initial: WaitlistState = { ok: false, message: "" };

export function WaitlistForm() {
  const [state, action, pending] = useActionState(submitWaitlist, initial);

  if (state.ok) {
    return (
      <div className="rounded-[4px] border border-signal/30 bg-signal/5 p-8">
        <p className="font-sans text-2xl font-medium text-foreground">
          You’re on the list.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          {state.message}
        </p>
      </div>
    );
  }

  return (
    <form action={action} className="flex flex-col gap-5">
      <Field id="name" label="Name" error={state.errors?.name} required>
        <Input
          id="name"
          name="name"
          required
          autoComplete="name"
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
          autoComplete="email"
          placeholder="you@example.com"
          className="h-11 border-white/10 bg-white/[0.03]"
          aria-invalid={!!state.errors?.email}
        />
      </Field>
      <Field
        id="country"
        label="Country"
        error={state.errors?.country}
        required
      >
        <Input
          id="country"
          name="country"
          required
          autoComplete="country-name"
          placeholder="United States"
          className="h-11 border-white/10 bg-white/[0.03]"
          aria-invalid={!!state.errors?.country}
        />
      </Field>

      {state.message && !state.ok ? (
        <p className="text-sm text-destructive">{state.message}</p>
      ) : null}

      <Button
        type="submit"
        disabled={pending}
        className="h-11 rounded-[4px] bg-foreground text-background hover:bg-foreground/90"
      >
        {pending ? "Joining…" : "Join the waitlist"}
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

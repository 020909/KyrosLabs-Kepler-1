"use server";

/** Legacy server actions kept for typecheck; forms submit via browser FormSubmit. */

export type WaitlistState = {
  ok: boolean;
  message: string;
  errors?: Record<string, string>;
};

export async function submitWaitlist(
  _prev: WaitlistState,
  _formData: FormData,
): Promise<WaitlistState> {
  return {
    ok: false,
    message: "Use the on-page form (browser submit).",
  };
}

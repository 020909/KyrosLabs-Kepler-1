"use server";

/** Legacy server actions kept for typecheck; forms submit via browser FormSubmit. */

export type JoinState = {
  ok: boolean;
  message: string;
  errors?: Record<string, string>;
};

export async function submitJoinApplication(
  _prev: JoinState,
  _formData: FormData,
): Promise<JoinState> {
  return {
    ok: false,
    message: "Use the on-page form (browser submit).",
  };
}

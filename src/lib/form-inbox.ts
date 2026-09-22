/** Inbox that receives waitlist + join form submissions. */
export const FORM_INBOX = "alymaknojiya7@gmail.com";

export async function emailFormSubmission(
  subject: string,
  fields: Record<string, string>,
): Promise<void> {
  // FormSubmit: first submission sends a one-time confirm link to FORM_INBOX — click it.
  try {
    const res = await fetch(`https://formsubmit.co/ajax/${FORM_INBOX}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        _subject: subject,
        ...fields,
      }),
    });
    if (!res.ok) {
      console.warn("formsubmit status", res.status, await res.text());
    }
  } catch (err) {
    console.warn("formsubmit failed", err);
  }
}

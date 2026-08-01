export const FORMSPREE_ENDPOINT = "https://formspree.io/f/xbdnvazg";

export interface SubmitFormOptions {
  formName: string;
  data: Record<string, unknown>;
}

export async function submitToFormspree(options: SubmitFormOptions): Promise<{ success: boolean; error?: string }> {
  try {
    const payload = {
      _subject: `[Femrose Properties] ${options.formName}`,
      ...options.data,
      _submittedAt: new Date().toISOString(),
    };

    const response = await fetch(FORMSPREE_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      return { success: true };
    } else {
      const errorData = await response.json().catch(() => ({}));
      const errorMsg =
        errorData?.errors?.map((e: { message: string }) => e.message).join(', ') ||
        'Form submission to Formspree failed.';
      return { success: false, error: errorMsg };
    }
  } catch (err: unknown) {
    console.error("Formspree submit error:", err);
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Network connection error. Please try again.'
    };
  }
}

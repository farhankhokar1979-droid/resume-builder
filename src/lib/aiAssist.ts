export type AiAssistMode = "summary" | "bullets";

/**
 * Sends text to the /api/ai-assist serverless function (Groq-backed) and
 * returns the AI-rewritten version. Throws with a user-facing message on
 * any failure so callers can show it directly.
 */
export async function improveWithAi(mode: AiAssistMode, input: string): Promise<string> {
    const res = await fetch("/api/ai-assist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode, input }),
    });

    let data: { result?: string; error?: string } = {};
    try {
        data = await res.json();
    } catch {
        // fall through to the generic error below
    }

    if (!res.ok || !data.result) {
        throw new Error(data.error || "AI request failed. Please try again.");
    }

    return data.result;
}
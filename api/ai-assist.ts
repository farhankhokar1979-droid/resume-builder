// Vercel Serverless Function — POST /api/ai-assist
// Calls Groq's OpenAI-compatible chat completions endpoint server-side, so
// the API key never reaches the browser. Configure GROQ_API_KEY as an
// environment variable in your Vercel project settings (never commit it).

const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";

// llama-3.3-70b-versatile and llama-3.1-8b-instant were both deprecated by
// Groq on 2026-06-17. Groq retires/renames models periodically, so instead
// of hardcoding one model, we try a short list in order — if the first
// fails (e.g. it gets deprecated again in the future), we automatically
// retry with the next one before giving up. This is what stops a single
// Groq-side model change from silently breaking the whole feature again.
const GROQ_MODELS = ["openai/gpt-oss-120b", "openai/gpt-oss-20b"];

const SYSTEM_PROMPT = `You are a professional resume-writing assistant helping a job seeker improve their resume text.
Follow these rules exactly:
1. Never invent facts, employers, dates, numbers, or skills that are not implied by the user's original text.
2. Write in a professional, concise, achievement-oriented tone appropriate for a resume.
3. Avoid clichés and filler words such as "hardworking", "team player", or "passionate go-getter".
4. If the mode is "summary": return a single paragraph of 2-4 sentences, with no first-person pronouns.
5. If the mode is "bullets": the input is a list of bullet points, one per line. Return the SAME NUMBER of lines, each rewritten to start with a strong past-tense action verb, stay under 25 words, and contain no leading bullet symbol or numbering.
6. Return ONLY the rewritten text — no headers, no quotes, no explanations, no markdown formatting.`;

interface VercelLikeRequest {
    method?: string;
    body?: unknown;
}

interface VercelLikeResponse {
    status: (code: number) => VercelLikeResponse;
    json: (body: unknown) => void;
}

async function callGroq(model: string, apiKey: string, mode: string, input: string) {
    return fetch(GROQ_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
            model,
            messages: [
                { role: "system", content: SYSTEM_PROMPT },
                { role: "user", content: `mode: ${mode}\n\ninput:\n${input}` },
            ],
            temperature: 0.4,
            max_tokens: 300,
        }),
    });
}

function extractProviderMessage(detail: string): string {
    try {
        const parsed = JSON.parse(detail);
        return parsed?.error?.message || detail;
    } catch {
        return detail;
    }
}

export default async function handler(req: VercelLikeRequest, res: VercelLikeResponse) {
    if (req.method !== "POST") {
        res.status(405).json({ error: "Method not allowed" });
        return;
    }

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
        res.status(500).json({ error: "AI feature is not configured on this server (missing GROQ_API_KEY)." });
        return;
    }

    const body = (req.body ?? {}) as { mode?: string; input?: string };
    const { mode, input } = body;

    if (mode !== "summary" && mode !== "bullets") {
        res.status(400).json({ error: "Invalid or missing 'mode' — expected 'summary' or 'bullets'." });
        return;
    }
    if (!input || typeof input !== "string" || !input.trim()) {
        res.status(400).json({ error: "Missing 'input' text." });
        return;
    }
    if (input.length > 2000) {
        res.status(400).json({ error: "Input is too long." });
        return;
    }

    let lastError = "Unknown error.";

    for (const model of GROQ_MODELS) {
        try {
            const groqRes = await callGroq(model, apiKey, mode, input);

            if (!groqRes.ok) {
                const detail = await groqRes.text();
                lastError = extractProviderMessage(detail);
                // Try the next model in the list instead of failing immediately.
                continue;
            }

            const data = await groqRes.json();
            const text = data?.choices?.[0]?.message?.content?.trim();

            if (!text) {
                lastError = "AI provider returned no content.";
                continue;
            }

            res.status(200).json({ result: text });
            return;
        } catch {
            lastError = "Unexpected error while contacting the AI provider.";
        }
    }

    // Every model in the list failed.
    res.status(502).json({ error: `AI provider error: ${lastError}` });
}
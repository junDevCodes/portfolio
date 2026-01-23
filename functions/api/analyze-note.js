export async function onRequestPost({ request, env }) {
    try {
        const { content, title, category } = await request.json();
        const apiKey = env.GEMINI_API_KEY;

        if (!apiKey) {
            return new Response(JSON.stringify({ error: "Missing GEMINI_API_KEY" }), { status: 500 });
        }

        const prompt = `
      You are an expert technical writer and engineer. Analyze the following concept note.
      
      Title: ${title}
      Category: ${category}
      Content:
      """
      ${content}
      """

      Please provide a JSON response with the following fields:
      1. "tags": Array of strings. Recommend 3-5 relevant technical tags.
      2. "definition": A clear, concise technical definition of the concept (2-3 sentences).
      3. "corrections": Array of objects { "original": string, "correction": string, "reason": string }. Suggest fixes for any factual errors or awkward phrasing. If none, empty array.
      4. "related_concepts": Array of strings. 3-5 related technical concepts that might exist in a knowledge base.

      Respond ONLY in valid JSON format.
    `;

        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }],
                generationConfig: { response_mime_type: "application/json" }
            })
        });

        const data = await response.json();

        // Parse the inner JSON from Gemini response
        const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!generatedText) {
            throw new Error("Failed to generate content from Gemini");
        }

        const result = JSON.parse(generatedText);

        return new Response(JSON.stringify(result), {
            headers: { "Content-Type": "application/json" }
        });

    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}

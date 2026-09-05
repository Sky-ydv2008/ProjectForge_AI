/**
 * Google Gemini API Client Helper for ProjectForge AI
 */

export async function callGeminiApi(
  systemInstruction: string,
  userPrompt: string,
  apiKey: string
): Promise<string> {
  // Use gemini-1.5-flash or gemini-2.0-flash endpoint
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `${systemInstruction}\n\nUser Request:\n${userPrompt}\n\nIMPORTANT: Return ONLY a valid, raw JSON object matching the requested schema. Do not include markdown code block formatting like \`\`\`json.`,
            },
          ],
        },
      ],
      generationConfig: {
        temperature: 0.7,
        responseMimeType: "application/json",
      },
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Gemini API HTTP ${response.status}: ${errorText}`);
  }

  const data = await response.json();
  const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text || "";

  // Clean raw markdown if present
  return rawText.replace(/```json/g, "").replace(/```/g, "").trim();
}

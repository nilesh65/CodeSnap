import { extractCode } from './extractCode';
import { createGeminiClient } from './gemini';

const ai = createGeminiClient();

export const generateCode = async ({ prompt, framework }) => {
  if (!prompt?.trim()) {
    throw new Error('EMPTY_PROMPT');
  }

  const res = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: `
Generate a modern, responsive UI component.

Description:
"${prompt}"

Framework:
${framework}

Rules:
- Return ONLY code
- Wrap in a Markdown code block
- Single HTML file
- No explanations
`,
  });

  return extractCode(res.text);
};

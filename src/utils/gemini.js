import { GoogleGenAI } from '@google/genai';

export const createGeminiClient = () =>
  new GoogleGenAI({
    apiKey: import.meta.env.VITE_GEMINI_API_KEY,
  });

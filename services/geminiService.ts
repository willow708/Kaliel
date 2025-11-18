
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export async function generateCodeStream(prompt: string, language: string) {
  const model = ai.models['gemini-2.5-pro'];

  const languageInstruction = language === 'auto'
    ? 'The user has not specified a language. Please auto-detect the most appropriate programming or scripting language based on the prompt.'
    : `The target language is ${language}.`;
  
  const fullPrompt = `
    You are an expert code generation assistant. Your task is to provide a complete, correct, and working code snippet based on the user's request.
    
    ${languageInstruction}

    User Request: "${prompt}"

    Your response must contain ONLY the raw code for the solution. Do not include any explanatory text, introductory phrases, or markdown formatting like \`\`\`language. Just the code itself.
  `;

  const response = await ai.models.generateContentStream({
    model: 'gemini-2.5-pro',
    contents: [{ parts: [{ text: fullPrompt }] }],
  });

  return response;
}

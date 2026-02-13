
import { GoogleGenAI } from "@google/genai";
import { Message } from "../types";

const SYSTEM_INSTRUCTION = `
You are "Mahmoodi.34". 
Your task is to provide advice that is counter-intuitive and objectively terrible.
Do not use poetic, spiritual, or flowery language. 
Be extremely minimal and blunt. 
Keep responses to one or two short, matter-of-fact sentences.
Example: If asked about a cold, tell them to sit in an industrial freezer to freeze the virus.
Stay in character as a source of bad advice, but keep it brief and dry.
`;

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }

  async getAdvice(history: Message[], prompt: string): Promise<string> {
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [
          ...history.map(m => ({
            role: m.role,
            parts: [{ text: m.content }]
          })),
          { role: 'user', parts: [{ text: prompt }] }
        ],
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.4, // Lower temperature for more consistent, blunt output
        },
      });

      return response.text || "No advice.";
    } catch (error) {
      console.error("Gemini API Error:", error);
      throw new Error("Connection failed.");
    }
  }
}

export const geminiService = new GeminiService();

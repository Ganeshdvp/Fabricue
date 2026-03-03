import dotenv from "dotenv";
dotenv.config();
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const SUB_CATEGORIES = [
  "T-Shirts",
  "Shirts",
  "Jeans",
  "Jackets",
  "Hoodies",
  "Blazers",
  "Shots",
  "Sweaters",
  "Underwears",
  "Sarees",
  "Kurti",
  "Dress",
  "Top",
  "Skirt",
  "Lehenga",
];

// Ai search Integrated
const AISearch = async (prompt) => {
  try {
    const searchPrompt = `
Choose exactly one from:
${JSON.stringify(SUB_CATEGORIES)}
for this input: "${prompt}".
Return only the value.
`;
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: searchPrompt,
      temperature: 0,
    });
    return response.text.trim();
  } catch (err) {
    return err;
  }
};

export default AISearch;

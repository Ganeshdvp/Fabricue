import dotenv from "dotenv";
dotenv.config();
import Groq from "groq-sdk";

  const groq = new Groq({
  apiKey: process.env.GROK_API_KEY
});


const SUB_CATEGORIES = [
  "T-shirts",
  "Shirts",
  "Jeans",
  "Jackets",
  "Hoodies",
  "Blazers",
  "Shorts",
  "Sweaters",
  "Underwears",
  "Sarees",
  "Kurtis",
  "Dresses",
  "Tops",
  "Skirts",
  "Lehengas",
  "Kids t-shirts",
  "Kids shirts",
  "Kids dresses",
  "Kids hoodies",
  "Kids jackets",
  "Kids sweatshirts"
];

// Ai search Integrated
const AISearch = async (prompt) => {

  try {
    const searchPrompt = `
You are a clothing product classifier.

Choose EXACTLY ONE category from the list below.

Rules:
- Return ONLY the category name.
- No explanations.
- No extra text.
- Must match exactly from the list.

Categories:
${JSON.stringify(SUB_CATEGORIES)}

User Input:
"${prompt}"

Output:
`;
    const response = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: 'user',
          content: searchPrompt
        }
      ],
      temperature: 0,
      max_tokens: 20
    });
    return response.choices[0]?.message?.content.trim()
  } catch (err) {
    console.log(err)
    return err;
  }
};

export default AISearch;

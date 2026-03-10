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
Choose exactly one from:
${JSON.stringify(SUB_CATEGORIES)}
based on this input: "${prompt}".
Don't give extra texts or sentence and first letter is upper case and rest of the letters is lower case, dont care about two words just follow the pattern!.
`;
    const response = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: 'user',
          content: searchPrompt
        }
      ],
      max_tokens: 20
    });
    return response.choices[0]?.message?.content.trim()
  } catch (err) {
    console.log(err)
    return err;
  }
};

export default AISearch;

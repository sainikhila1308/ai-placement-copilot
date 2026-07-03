const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const generateResponse = async (prompt) => {
  try {
    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",

      messages: [
        {
          role: "system",
          content:
            "You are an expert Software Engineering Career Advisor. Always return valid JSON when requested. Never wrap JSON inside markdown.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],

      temperature: 0.2,
      max_tokens: 2048,
      top_p: 1,
    });

    return completion.choices[0].message.content.trim();

  } catch (error) {
    console.log("Groq Error:", error);

    throw error;
  }
};

module.exports = {
  generateResponse,
};
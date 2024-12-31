require('dotenv').config(); // Load environment variables
const axios = require('axios');
const fs = require('fs');
const downloadRandomWikipediaArticle = require('./wikiarticle')


const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

if (!OPENAI_API_KEY) {
    console.error('API key is not set. Please define it in the .env file or as an environment variable.');
    process.exit(1);
}

async function generateQuizFromText(filename, article) {
    try {


        // Construct the messages array
        const messages = [
            { role: "system", content: "You are a quiz generator. Create a quiz with 5 multiple-choice questions." },
            {
                role: "user",
                content: `Based on the following text, generate a quiz with 5 questions in JSON format. Each question should cover a key idea, and include 4 options with the correct answer clearly labeled. JSON Format:

                {question: [question]},
                {options : [{A: [option 1]} , {B: [option 2]}, {C: [option 3]}, {D: [option 4] }]},
                {answer: [correct option]}

                Text: ${article.text}`
            }
        ];

        // Make the OpenAI API request
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: 'gpt-4', // Use 'gpt-3.5-turbo' if you don't have GPT-4 access
                messages: messages,
                max_tokens: 500,
                temperature: 0.7
            },
            {
                headers: {
                    'Authorization': `Bearer ${OPENAI_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        // Extract and save the quiz
        const quiz = response.data.choices[0].message.content.trim();
        console.log("Generated quiz: ", quiz)
        const name = `assets/articles/${filename}.json`;
        fs.writeFileSync(name, JSON.stringify({ article, quiz }, null, 2));
        console.log('Quiz saved to ', name);

    } catch (error) {
        console.error('Error generating quiz:', error.response ? error.response.data : error.message);
    }
}



(async () => {
  try {

    // Call the function with your input file
    for (let i = 10; i < 20; i++) {
      const article = await downloadRandomWikipediaArticle();
      await generateQuizFromText(i, article);
    }

    console.log('Quiz generation completed!');
  } catch (error) {
    console.error('Error:', error.message);
  }
})();
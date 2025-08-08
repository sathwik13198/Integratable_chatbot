const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const companyContent = require('../config/companyContent.json');

const router = express.Router();
// Initialize Gemini API inside the route handler to ensure it uses the latest API key

router.post('/', async (req, res) => {
  try {
    const { message } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Check if API key is set and not the placeholder
    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'your_valid_gemini_api_key_here') {
      return res.status(500).json({ 
        error: 'API key not configured', 
        message: 'Please set a valid Gemini API key in your .env file. Get your API key from https://aistudio.google.com/app/apikey'
      });
    }

    // Initialize Gemini API with the current environment variable
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });


    // Create a context-aware prompt with company information
    const prompt = `
    You are an AI assistant for ${companyContent.name}.
    
    About the company:
    ${companyContent.about}
    
    Services offered:
    ${companyContent.services.join(', ')}
    
    FAQ information:
    ${Object.entries(companyContent.faq).map(([key, value]) => `- ${key}: ${value}`).join('\n')}
    
    Contact information:
    ${Object.entries(companyContent.contact).map(([key, value]) => `- ${key}: ${value}`).join('\n')}
    
    User: ${message}
    Assistant:`;

    const result = await model.generateContent(prompt);
    const response = result.response.text();

    res.json({ response });
  } catch (err) {
    console.error('Gemini Error:', err);
    console.error('Error details:', {
      message: err.message,
      stack: err.stack,
      apiKey: process.env.GEMINI_API_KEY ? 'Set' : 'Not set'
    });
    // Return details in dev to help diagnose
    res.status(500).json({ error: 'Failed to generate response', details: err.message });
  }
});

module.exports = router;

/**
 * Debug Server for Gemini API Key Testing
 * 
 * This script helps you test if your Gemini API key is working correctly.
 * Run this script to verify your API key before starting the full application.
 */

const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/chat', async (req, res) => {
  try {
    console.log('Received request:', req.body);
    const { message } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Check if API key is set and not the placeholder
    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'your_valid_gemini_api_key_here') {
      console.error('\x1b[31m%s\x1b[0m', 'ERROR: API key not configured!');
      return res.status(500).json({ 
        error: 'API key not configured', 
        message: 'Please set a valid Gemini API key in your .env file. Get your API key from https://aistudio.google.com/app/apikey'
      });
    }
    
    console.log('API Key:', `${process.env.GEMINI_API_KEY.substring(0, 4)}...${process.env.GEMINI_API_KEY.substring(process.env.GEMINI_API_KEY.length - 4)}`);
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    console.log('Generating content...');
    const result = await model.generateContent(`User: ${message}\nAssistant:`);
    const response = result.response.text();
    
    console.log('Response:', response);
    res.json({ response });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ error: 'Failed to generate response', details: err.message });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log('\x1b[36m%s\x1b[0m', `Debug server running on port ${PORT}`);
  console.log('\x1b[33m%s\x1b[0m', 'Test the API by sending a POST request to:');
  console.log('http://localhost:5000/api/chat');
  console.log('\x1b[33m%s\x1b[0m', 'With JSON body: { "message": "Hello" }');
  console.log('\x1b[36m%s\x1b[0m', 'You can use tools like Postman or curl to test:');
  console.log('curl -X POST http://localhost:5000/api/chat -H "Content-Type: application/json" -d "{\"message\":\"Hello\"}"');
});

/**
 * Gemini API Test Script
 * 
 * This script tests if your Gemini API key is working correctly.
 * Run this script before starting the application to verify your API key.
 */

const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

async function testGeminiAPI() {
  try {
    console.log('\x1b[36m%s\x1b[0m', 'Testing Gemini API with gemini-2.0-flash...');
    
    // Check if API key is set and not the placeholder
    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'your_valid_gemini_api_key_here') {
      console.error('\x1b[31m%s\x1b[0m', 'ERROR: API key not configured!');
      console.log('\x1b[33m%s\x1b[0m', 'Please set a valid Gemini API key in your .env file.');
      console.log('Get your API key from: https://aistudio.google.com/app/apikey');
      return;
    }
    
    console.log('API Key:', `${process.env.GEMINI_API_KEY.substring(0, 4)}...${process.env.GEMINI_API_KEY.substring(process.env.GEMINI_API_KEY.length - 4)}`);
    
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
    
    const result = await model.generateContent('Say hello');
    const response = result.response.text();
    
    console.log('\x1b[32m%s\x1b[0m', '✅ API working! Response:');
    console.log(response);
    console.log('\x1b[32m%s\x1b[0m', '✓ Your API key is working correctly!');
    console.log('\x1b[36m%s\x1b[0m', 'You can now run the full application with: npm run dev');
  } catch (error) {
    console.error('\x1b[31m%s\x1b[0m', '❌ API Error:', error.message);
    console.log('\x1b[33m%s\x1b[0m', 'Possible reasons:');
    console.log('1. Your API key is invalid or expired');
    console.log('2. You have exceeded your API quota');
    console.log('3. The Gemini API service is currently unavailable');
    console.log('\x1b[36m%s\x1b[0m', 'Please check your API key and try again.');
  }
}

testGeminiAPI();

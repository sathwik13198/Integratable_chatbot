require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

async function testModel() {
  try {
    console.log('Testing with API key:', process.env.GEMINI_API_KEY);
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    
    // Test with gemini-1.5-flash
    try {
      console.log('Testing with gemini-1.5-flash...');
      const model1 = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
      const result1 = await model1.generateContent('Hello');
      console.log('gemini-1.5-flash works:', result1.response.text());
    } catch (err) {
      console.error('gemini-1.5-flash error:', err.message);
    }
    
    // Test with gemini-2.0-flash
    try {
      console.log('\nTesting with gemini-2.0-flash...');
      const model2 = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
      const result2 = await model2.generateContent('Hello');
      console.log('gemini-2.0-flash works:', result2.response.text());
    } catch (err) {
      console.error('gemini-2.0-flash error:', err.message);
    }
  } catch (err) {
    console.error('General error:', err.message);
  }
}

testModel();
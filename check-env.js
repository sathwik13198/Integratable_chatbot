require('dotenv').config();
console.log('API Key in server:', process.env.GEMINI_API_KEY ? 'Set' : 'Not set');
console.log('API Key value:', process.env.GEMINI_API_KEY);
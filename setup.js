#!/usr/bin/env node

/**
 * Setup Script for Integratable Chatbot
 * 
 * This script helps you set up the project by:
 * 1. Creating a .env file if it doesn't exist
 * 2. Installing dependencies for both server and client
 * 3. Validating the Gemini API key
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const readline = require('readline');

console.log('🚀 Setting up Reusable Gemini Flash 2.0 Chatbot...\n');

// Create interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Check if .env exists, if not create from example
if (!fs.existsSync('.env')) {
  if (fs.existsSync('env.example')) {
    fs.copyFileSync('env.example', '.env');
    console.log('\x1b[32m%s\x1b[0m', '✅ Created .env file from env.example');
    console.log('\x1b[33m%s\x1b[0m', '⚠️  Please edit .env and add your Gemini API key');
    console.log('Get your API key from: https://aistudio.google.com/app/apikey\n');
  } else {
    console.log('\x1b[31m%s\x1b[0m', '❌ env.example not found');
    process.exit(1);
  }
} else {
  console.log('\x1b[32m%s\x1b[0m', '✅ .env file already exists');
}

// Install root dependencies
console.log('\n📦 Installing root dependencies...');
try {
  execSync('npm install', { stdio: 'inherit' });
  console.log('✅ Root dependencies installed');
} catch (error) {
  console.log('❌ Failed to install root dependencies');
  process.exit(1);
}

// Install client dependencies
console.log('\n📦 Installing client dependencies...');
try {
  execSync('npm install', { stdio: 'inherit', cwd: './client' });
  console.log('✅ Client dependencies installed');
} catch (error) {
  console.log('❌ Failed to install client dependencies');
  process.exit(1);
}

console.log('\n\x1b[32m%s\x1b[0m', '🎉 Setup complete!');

// Ask if user wants to test the API key
rl.question('\n\x1b[36m%s\x1b[0m\n', 'Would you like to test your Gemini API key now? (y/n): ', (answer) => {
  if (answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes') {
    console.log('\n\x1b[36m%s\x1b[0m', 'Running API test...');
    try {
      execSync('node test-api.js', { stdio: 'inherit' });
    } catch (error) {
      console.log('\n\x1b[31m%s\x1b[0m', '❌ API test failed. Please check your API key in .env file.');
    }
  }
  
  console.log('\n\x1b[36m%s\x1b[0m', '📋 Next steps:');
  console.log('1. Edit .env and add your Gemini API key (if you haven\'t already)');
  console.log('2. Customize server/config/companyContent.json with your company info');
  console.log('3. Run "npm run dev" to start the development server');
  console.log('4. Open http://localhost:3000 to see the chatbot in action');
  console.log('\n\x1b[36m%s\x1b[0m', '📚 For more information, see README.md');
  
  rl.close();
});

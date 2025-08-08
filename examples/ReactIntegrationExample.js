import React from 'react';
import ConfigurableChatbotWidget from './ConfigurableChatbotWidget';

function App() {
  return (
    <div className="your-app">
      {/* Your website content */}
      <h1>Your Website</h1>
      <p>This is an example of integrating the chatbot into your React application.</p>
      
      {/* Chatbot Widget with custom configuration */}
      <ConfigurableChatbotWidget 
        apiUrl="https://your-backend-api.com/api/chat" // Replace with your deployed backend URL
        position="bottom-right"
        theme="custom"
        primaryColor="#4f46e5" // Indigo
        secondaryColor="#7c3aed" // Purple
        headerTitle="Your Company Name"
        headerSubtitle="Ask me anything!"
        welcomeMessage="👋 Hello! How can I assist you today?"
        placeholderText="Type your question..."
        showTimestamp={true}
        buttonIcon="💬"
        closeIcon="✕"
      />
    </div>
  );
}

export default App;
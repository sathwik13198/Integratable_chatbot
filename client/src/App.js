import React from 'react';
import ChatbotWidget from './components/ChatbotWidget';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Welcome to MyTech Solutions</h1>
      <p>This is a demo page showing the reusable chatbot widget.</p>
      <p>Click the chat button in the bottom right to start chatting!</p>
      <ChatbotWidget />
    </div>
  );
}

export default App;

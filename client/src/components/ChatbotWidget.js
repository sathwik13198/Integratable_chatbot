import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import './ChatbotWidget.css';

const ChatbotWidget = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = { sender: 'user', text: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const res = await axios.post('/api/chat', { message: input });
      const botMessage = { 
        sender: 'bot', 
        text: res.data.response, 
        timestamp: new Date() 
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      let errorText = 'Sorry, something went wrong. Please try again.';
      
      // Check for API key configuration error
      if (error.response && error.response.data) {
        const { error: errorType, message } = error.response.data;
        if (errorType === 'API key not configured' || errorType === 'Failed to generate response') {
          errorText = message || 'API key error: Please check server configuration.';
        }
      }
      
      const errorMessage = { 
        sender: 'bot', 
        text: errorText, 
        timestamp: new Date() 
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatTime = (timestamp) => {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="chatbot-container">
      <button 
        className={`chat-toggle ${open ? 'active' : ''}`} 
        onClick={() => setOpen(!open)}
        aria-label="Toggle chat"
      >
        {open ? '✕' : '💬'}
      </button>
      
      {open && (
        <div className="chat-popup">
          <div className="chat-header">
            <h3>MyTech Solutions</h3>
            <p>How can we help you today?</p>
          </div>
          
          <div className="chat-messages">
            {messages.length === 0 && (
              <div className="welcome-message">
                <p>👋 Hi! I'm your AI assistant. Ask me anything about our services!</p>
              </div>
            )}
            
            {messages.map((message, index) => (
              <div key={index} className={`message ${message.sender}`}>
                <div className="message-content">
                  {message.text}
                </div>
                <div className="message-time">
                  {formatTime(message.timestamp)}
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="message bot">
                <div className="message-content">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
          
          <div className="chat-input">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              disabled={isLoading}
            />
            <button 
              onClick={sendMessage} 
              disabled={isLoading || !input.trim()}
              className="send-button"
            >
              {isLoading ? '⏳' : '➤'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatbotWidget;

import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import './ChatbotWidget.css';

/**
 * Configurable ChatbotWidget component that can be easily integrated into any website
 * 
 * @param {Object} props - Component properties
 * @param {string} props.apiUrl - The URL of the chatbot API endpoint (required)
 * @param {string} props.position - Position of the chatbot widget ('bottom-right', 'bottom-left', 'top-right', 'top-left')
 * @param {string} props.theme - Color theme ('default', 'dark', 'light', 'custom')
 * @param {string} props.primaryColor - Primary color for custom theme (hex code)
 * @param {string} props.secondaryColor - Secondary color for custom theme (hex code)
 * @param {string} props.headerTitle - Title displayed in the chat header
 * @param {string} props.headerSubtitle - Subtitle displayed in the chat header
 * @param {string} props.welcomeMessage - Initial message displayed when chat is opened
 * @param {string} props.placeholderText - Placeholder text for the input field
 * @param {boolean} props.showTimestamp - Whether to show message timestamps
 * @param {string} props.buttonIcon - Icon to display on the chat button (emoji or text)
 * @param {string} props.closeIcon - Icon to display on the close button (emoji or text)
 */
const ConfigurableChatbotWidget = ({
  apiUrl = '/api/chat',
  position = 'bottom-right',
  theme = 'default',
  primaryColor = '#667eea',
  secondaryColor = '#764ba2',
  headerTitle = 'AI Assistant',
  headerSubtitle = 'How can I help you today?',
  welcomeMessage = '👋 Hi! I\'m your AI assistant. Ask me anything!',
  placeholderText = 'Type your message...',
  showTimestamp = true,
  buttonIcon = '💬',
  closeIcon = '✕'
}) => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Generate dynamic styles based on theme and custom colors
  const getThemeStyles = () => {
    switch (theme) {
      case 'dark':
        return {
          '--primary-gradient': 'linear-gradient(135deg, #2d3748 0%, #1a202c 100%)',
          '--button-color': '#2d3748',
          '--chat-bg': '#1a202c',
          '--user-message-bg': '#4a5568',
          '--bot-message-bg': '#2d3748',
          '--input-bg': '#2d3748',
          '--text-color': '#ffffff',
          '--placeholder-color': '#a0aec0',
        };
      case 'light':
        return {
          '--primary-gradient': 'linear-gradient(135deg, #e2e8f0 0%, #cbd5e0 100%)',
          '--button-color': '#4a5568',
          '--chat-bg': '#ffffff',
          '--user-message-bg': '#4a5568',
          '--bot-message-bg': '#edf2f7',
          '--input-bg': '#edf2f7',
          '--text-color': '#1a202c',
          '--placeholder-color': '#718096',
        };
      case 'custom':
        return {
          '--primary-gradient': `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%)`,
          '--button-color': primaryColor,
          '--chat-bg': '#ffffff',
          '--user-message-bg': primaryColor,
          '--bot-message-bg': '#ffffff',
          '--input-bg': '#f7fafc',
          '--text-color': '#1a202c',
          '--placeholder-color': '#718096',
        };
      default: // default theme
        return {
          '--primary-gradient': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          '--button-color': '#667eea',
          '--chat-bg': '#ffffff',
          '--user-message-bg': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          '--bot-message-bg': '#ffffff',
          '--input-bg': '#f7fafc',
          '--text-color': '#1a202c',
          '--placeholder-color': '#718096',
        };
    }
  };

  // Get position styles
  const getPositionStyles = () => {
    switch (position) {
      case 'bottom-left':
        return { bottom: '20px', left: '20px' };
      case 'top-right':
        return { top: '20px', right: '20px' };
      case 'top-left':
        return { top: '20px', left: '20px' };
      default: // bottom-right
        return { bottom: '20px', right: '20px' };
    }
  };

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
      // Use the configurable API URL
      const res = await axios.post(apiUrl, { message: input });
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

  const themeStyles = getThemeStyles();
  const positionStyles = getPositionStyles();

  return (
    <div 
      className="chatbot-container" 
      style={{
        ...positionStyles,
        '--primary-gradient': themeStyles['--primary-gradient'],
        '--button-color': themeStyles['--button-color'],
        '--chat-bg': themeStyles['--chat-bg'],
        '--user-message-bg': themeStyles['--user-message-bg'],
        '--bot-message-bg': themeStyles['--bot-message-bg'],
        '--input-bg': themeStyles['--input-bg'],
        '--text-color': themeStyles['--text-color'],
        '--placeholder-color': themeStyles['--placeholder-color'],
      }}
    >
      <button 
        className={`chat-toggle ${open ? 'active' : ''}`} 
        onClick={() => setOpen(!open)}
        aria-label="Toggle chat"
      >
        {open ? closeIcon : buttonIcon}
      </button>
      
      {open && (
        <div className="chat-popup">
          <div className="chat-header">
            <h3>{headerTitle}</h3>
            <p>{headerSubtitle}</p>
          </div>
          
          <div className="chat-messages">
            {messages.length === 0 && (
              <div className="welcome-message">
                <p>{welcomeMessage}</p>
              </div>
            )}
            
            {messages.map((message, index) => (
              <div key={index} className={`message ${message.sender}`}>
                <div className="message-content">
                  {message.text}
                </div>
                {showTimestamp && (
                  <div className="message-time">
                    {formatTime(message.timestamp)}
                  </div>
                )}
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
              placeholder={placeholderText}
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

export default ConfigurableChatbotWidget;
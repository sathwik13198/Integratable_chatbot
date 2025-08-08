# Reusable Gemini Flash 2.0 Chatbot

A modern, reusable chatbot system built with React (frontend), Node.js (backend), and Google's Gemini Flash 2.0 AI model. The chatbot appears as a beautiful popup widget that can be integrated into any website.

## ⚠️ IMPORTANT: Gemini 2.0 Flash API Key Required

This chatbot requires a valid Gemini 2.0 Flash API key to function. You will see an "API key error" message if you haven't configured a valid key.

1. Get your free API key from [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Make sure to enable the Gemini 2.0 Flash model for your API key
3. Add it to your `.env` file: `GEMINI_API_KEY=your_actual_api_key_here`
4. Restart the server

### Troubleshooting

- **API Key Error**: Make sure your API key is valid and has access to the Gemini 2.0 Flash model
- **Model Overloaded Error**: The Gemini API may occasionally return a "model overloaded" error. This is a temporary issue with Google's servers. Simply retry your request after a few seconds.

## 🚀 Features

- **Modern UI/UX**: Beautiful, responsive design with smooth animations
- **Real-time Chat**: Instant messaging with typing indicators
- **AI-Powered**: Powered by Google's Gemini Flash 2.0 model
- **Company Context**: Customizable company information for personalized responses
- **Responsive Design**: Works perfectly on desktop and mobile devices
- **Easy Integration**: Simple to embed in any website
- **Error Handling**: Robust error handling and user feedback

## 📁 Project Structure

```
integratable_chatbot/
├── client/               # React frontend
│   ├── public/
│   │   └── index.html
│   └── src/
│       ├── components/
│       │   ├── ChatbotWidget.js
│       │   └── ChatbotWidget.css
│       ├── App.js
│       ├── App.css
│       ├── index.js
│       └── index.css
├── server/               # Node.js backend
│   ├── config/
│   │   └── companyContent.json
│   ├── routes/
│   │   └── chat.js
│   └── index.js
├── package.json
├── env.example
└── README.md
```

## 🛠️ Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Google Gemini API key

### 1. Clone and Install Dependencies

```bash
# Install root dependencies
npm install

# Install client dependencies
cd client && npm install
cd ..
```

### 2. Environment Configuration

1. Copy the example environment file:
```bash
cp env.example .env
```

2. Edit `.env` and add your Gemini API key:
```env
GEMINI_API_KEY=your_actual_gemini_api_key_here
PORT=5000
```

> **IMPORTANT**: You must obtain a valid Gemini API key from [Google AI Studio](https://aistudio.google.com/app/apikey). The chatbot will not function without a valid API key.

### 3. Customize Company Content

Edit `server/config/companyContent.json` to match your company's information:

```json
{
  "name": "Your Company Name",
  "services": ["Service 1", "Service 2", "Service 3"],
  "about": "Your company description",
  "contact": {
    "email": "contact@yourcompany.com",
    "phone": "+1-555-123-4567",
    "address": "Your address"
  },
  "faq": {
    "services": "Description of your services",
    "pricing": "Your pricing information",
    "timeline": "Project timeline information"
  }
}
```

### 4. Run the Application

#### Development Mode (Both Frontend and Backend)
```bash
npm run dev
```

#### Run Backend Only
```bash
npm run server
```

#### Run Frontend Only
```bash
npm run client
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## 🎨 Customization

### Styling
The chatbot widget can be customized by modifying `client/src/components/ChatbotWidget.css`. Key customization areas:

- Colors and gradients
- Widget size and position
- Animations and transitions
- Typography and spacing

### Company Information
Update `server/config/companyContent.json` to change:
- Company name and description
- Services offered
- Contact information
- FAQ responses

### API Integration
The chatbot uses the Gemini Flash 2.0 model. You can modify the prompt structure in `server/routes/chat.js` to change how the AI responds.

## 🔧 Integration Guide

### Embedding in Other Websites

1. Build the React app:
```bash
cd client && npm run build
```

2. Copy the built files from `client/build/` to your website

3. Include the chatbot component in your HTML:
```html
<div id="chatbot-root"></div>
<script src="path/to/chatbot.js"></script>
```

### API Endpoints

- `POST /api/chat` - Send a message to the chatbot
  - Body: `{ "message": "user message" }`
  - Response: `{ "response": "bot response" }`

## 🚀 Deployment

### Backend Deployment (Render, Vercel, etc.)

1. Set environment variables:
   - `GEMINI_API_KEY`
   - `PORT` (optional)

2. Deploy the `server/` directory

3. Update the frontend API URL to point to your deployed backend

### Frontend Deployment

1. Build the React app:
```bash
cd client && npm run build
```

2. Deploy the `build/` folder to any static hosting service

## 🔒 Security Considerations

- Keep your Gemini API key secure
- Use environment variables for sensitive data
- Implement rate limiting for production use
- Consider adding user authentication if needed

## 🐛 Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure the backend CORS configuration matches your frontend URL
2. **API Key Issues**: Verify your Gemini API key is valid and has proper permissions
3. **Port Conflicts**: Change the PORT in `.env` if port 5000 is already in use

### Debug Mode

Enable debug logging by adding to your `.env`:
```env
DEBUG=true
```

## 📝 License

MIT License - feel free to use this project for commercial purposes.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📞 Support

For issues and questions, please open an issue on the repository.

---

**Built with ❤️ using React, Node.js, and Gemini Flash 2.0**

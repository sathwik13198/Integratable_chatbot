# Chatbot Integration Guide

This guide explains how to integrate the Gemini 2.0 Flash chatbot into other websites.

## Table of Contents

1. [Integration Options](#integration-options)
   - [Option 1: Embed as an iFrame](#option-1-embed-as-an-iframe-simplest)
   - [Option 2: Build and Host the Widget](#option-2-build-and-host-the-widget-recommended)
   - [Option 3: Create a Distributable Package](#option-3-create-a-distributable-package)
2. [Backend Configuration](#backend-configuration)
3. [Customization](#customization)
4. [Troubleshooting](#troubleshooting)
5. [Examples](#examples)

## Integration Options

### Option 1: Embed as an iFrame (Simplest)

If you've deployed the chatbot to a public URL, you can embed it as an iFrame in any website.

```html
<!-- Add this code where you want the chatbot to appear -->
<iframe 
  src="https://your-deployed-chatbot-url.com" 
  width="400" 
  height="600" 
  frameborder="0"
  style="position: fixed; bottom: 20px; right: 20px; z-index: 1000; border-radius: 10px; box-shadow: 0 5px 40px rgba(0,0,0,0.16);"
></iframe>
```

**Pros:**
- Simplest integration method
- No need to modify your website's code
- Updates automatically when the chatbot is updated

**Cons:**
- Limited customization options
- May have cross-origin issues
- Less integrated user experience

### Option 2: Build and Host the Widget (Recommended)

1. **Build the React app:**

```bash
cd client
npm install
npm run build
```

2. **Host the build folder** on your web server or CDN

3. **Add the script and CSS to your website:**

```html
<!-- In the <head> of your HTML -->
<link rel="stylesheet" href="https://your-host.com/path-to-build/static/css/main.[hash].css">

<!-- At the end of your <body> -->
<div id="chatbot-root"></div>
<script src="https://your-host.com/path-to-build/static/js/main.[hash].js"></script>
<script>
  // Initialize the chatbot with your backend URL
  window.initChatbot = {
    apiUrl: 'https://your-backend-api.com/api/chat',
    theme: 'default',
    position: 'bottom-right',
    headerTitle: 'Your Company Name',
    headerSubtitle: 'Ask me anything!'
  };
</script>
```

4. **Update the backend URL** in your configuration to point to your deployed backend API

**Pros:**
- Better integration with your website
- More customization options
- Better performance than iFrame

**Cons:**
- Requires manual updates when the chatbot is updated
- More complex setup

### Option 3: Create a Distributable Package

For more advanced integration, you can create an npm package:

1. **Modify the React component** to accept configuration options (see the `examples/ConfigurableChatbotWidget.js` file)

2. **Create a build configuration** that generates a distributable package (see the `examples/NPM_PACKAGE_GUIDE.md` file)

3. **Publish to npm** or host the package on a private registry

4. **Install in other projects:**

```bash
npm install your-chatbot-package
```

```javascript
import { ChatbotWidget } from 'your-chatbot-package';

function App() {
  return (
    <div className="your-website">
      <ChatbotWidget 
        apiUrl="https://your-backend-api.com/api/chat"
        theme="light"
        position="bottom-right"
        headerTitle="Your Company"
      />
    </div>
  );
}
```

**Pros:**
- Most flexible and maintainable option
- Easy to update across multiple projects
- Best for organizations with multiple websites

**Cons:**
- Most complex setup
- Requires knowledge of npm package creation

## Backend Configuration

Regardless of how you integrate the frontend, you'll need to:

1. **Deploy the backend** to a server or serverless platform (see `DEPLOYMENT.md` for options)

2. **Set the required environment variables:**
   - `GEMINI_API_KEY`: Your Gemini 2.0 Flash API key
   - `PORT`: The port for your server (often set by the hosting platform)

3. **Configure CORS** to allow requests from your website domains:

```javascript
// In server/index.js
app.use(cors({
  origin: ['https://your-website.com', 'https://www.your-website.com']
}));
```

## Customization

### Styling

You can customize the appearance of the chatbot by modifying the CSS:

1. Edit `client/src/components/ChatbotWidget.css` to match your website's design

2. Rebuild the client application

### Configuration Options

The configurable chatbot widget accepts the following props:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `apiUrl` | string | `/api/chat` | The URL of the chatbot API endpoint |
| `position` | string | `bottom-right` | Position of the widget (`bottom-right`, `bottom-left`, `top-right`, `top-left`) |
| `theme` | string | `default` | Color theme (`default`, `dark`, `light`, `custom`) |
| `primaryColor` | string | `#667eea` | Primary color for custom theme (hex code) |
| `secondaryColor` | string | `#764ba2` | Secondary color for custom theme (hex code) |
| `headerTitle` | string | `AI Assistant` | Title displayed in the chat header |
| `headerSubtitle` | string | `How can I help you today?` | Subtitle displayed in the chat header |
| `welcomeMessage` | string | `👋 Hi! I'm your AI assistant. Ask me anything!` | Initial message displayed when chat is opened |
| `placeholderText` | string | `Type your message...` | Placeholder text for the input field |
| `showTimestamp` | boolean | `true` | Whether to show message timestamps |
| `buttonIcon` | string | `💬` | Icon to display on the chat button (emoji or text) |
| `closeIcon` | string | `✕` | Icon to display on the close button (emoji or text) |

## Troubleshooting

- **CORS Errors**: Ensure your backend CORS settings include your website's domain
- **API Connection Issues**: Verify the API URL is correct and accessible
- **Styling Conflicts**: Use more specific CSS selectors to prevent style conflicts with your website
- **API Key Errors**: Make sure your Gemini API key is valid and has access to the Gemini 2.0 Flash model
- **Model Overloaded Errors**: The Gemini API may occasionally return a "model overloaded" error. This is a temporary issue with Google's servers. Simply retry your request after a few seconds.

## Examples

Check the `examples` directory for complete integration examples:

- `ConfigurableChatbotWidget.js` - A configurable React component
- `ConfigurableChatbotWidget.css` - CSS with theming support
- `ReactIntegrationExample.js` - Example of using the widget in a React app
- `VanillaJsIntegration.html` - Example of using the widget in a non-React website
- `NPM_PACKAGE_GUIDE.md` - Guide for creating an npm package

## Security Considerations

- Never expose your Gemini API key in the frontend code
- Implement rate limiting on your backend to prevent abuse
- Consider adding authentication if the chatbot will handle sensitive information
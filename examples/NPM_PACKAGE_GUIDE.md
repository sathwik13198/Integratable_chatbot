# Creating a Distributable NPM Package for the Chatbot Widget

This guide explains how to convert the chatbot widget into a distributable npm package that can be easily integrated into any React application.

## Step 1: Set Up the Package Structure

Create a new directory for your package with the following structure:

```
chatbot-widget/
├── src/
│   ├── components/
│   │   ├── ChatbotWidget.js
│   │   └── ChatbotWidget.css
│   └── index.js
├── dist/
├── package.json
├── webpack.config.js
├── .gitignore
├── README.md
└── LICENSE
```

## Step 2: Create the Package Configuration

### package.json

```json
{
  "name": "gemini-chatbot-widget",
  "version": "1.0.0",
  "description": "A reusable chatbot widget powered by Gemini 2.0 Flash",
  "main": "dist/index.js",
  "module": "dist/index.esm.js",
  "files": [
    "dist"
  ],
  "scripts": {
    "build": "rollup -c",
    "test": "jest",
    "prepublishOnly": "npm run build"
  },
  "keywords": [
    "chatbot",
    "widget",
    "react",
    "gemini",
    "ai"
  ],
  "author": "Your Name",
  "license": "MIT",
  "peerDependencies": {
    "react": "^16.8.0 || ^17.0.0 || ^18.0.0",
    "react-dom": "^16.8.0 || ^17.0.0 || ^18.0.0",
    "axios": "^0.21.0 || ^1.0.0"
  },
  "devDependencies": {
    "@babel/core": "^7.18.6",
    "@babel/preset-env": "^7.18.6",
    "@babel/preset-react": "^7.18.6",
    "@rollup/plugin-babel": "^5.3.1",
    "@rollup/plugin-commonjs": "^22.0.1",
    "@rollup/plugin-node-resolve": "^13.3.0",
    "rollup": "^2.77.0",
    "rollup-plugin-peer-deps-external": "^2.2.4",
    "rollup-plugin-postcss": "^4.0.2",
    "rollup-plugin-terser": "^7.0.2"
  }
}
```

## Step 3: Create the Rollup Configuration

### rollup.config.js

```javascript
import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import { terser } from 'rollup-plugin-terser';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';

export default {
  input: 'src/index.js',
  output: [
    {
      file: 'dist/index.js',
      format: 'cjs',
      sourcemap: true
    },
    {
      file: 'dist/index.esm.js',
      format: 'esm',
      sourcemap: true
    }
  ],
  plugins: [
    peerDepsExternal(),
    postcss({
      extensions: ['.css'],
      minimize: true,
      inject: {
        insertAt: 'top'
      }
    }),
    babel({
      exclude: 'node_modules/**',
      babelHelpers: 'bundled',
      presets: ['@babel/preset-env', '@babel/preset-react']
    }),
    resolve(),
    commonjs(),
    terser()
  ]
};
```

## Step 4: Create the Entry Point

### src/index.js

```javascript
import ChatbotWidget from './components/ChatbotWidget';

export { ChatbotWidget };
export default ChatbotWidget;
```

## Step 5: Copy the Configurable Chatbot Widget

Copy the `ConfigurableChatbotWidget.js` and `ConfigurableChatbotWidget.css` files to the `src/components` directory, renaming them to `ChatbotWidget.js` and `ChatbotWidget.css`.

## Step 6: Build the Package

```bash
npm install
npm run build
```

## Step 7: Test Locally

You can test your package locally before publishing:

```bash
# In your package directory
npm link

# In your test project directory
npm link gemini-chatbot-widget
```

## Step 8: Publish to NPM

```bash
# Login to npm
npm login

# Publish the package
npm publish
```

## Usage in React Projects

After publishing, users can install and use your package:

```bash
npm install gemini-chatbot-widget
```

```javascript
import React from 'react';
import { ChatbotWidget } from 'gemini-chatbot-widget';

function App() {
  return (
    <div className="app">
      <h1>My Website</h1>
      
      <ChatbotWidget 
        apiUrl="https://your-backend-api.com/api/chat"
        theme="custom"
        primaryColor="#4f46e5"
        secondaryColor="#7c3aed"
        headerTitle="Your Company"
      />
    </div>
  );
}

export default App;
```

## Backend Requirements

Make sure to document that users need to:

1. Deploy the backend API separately
2. Configure CORS on the backend to allow requests from their domain
3. Set up the required environment variables (GEMINI_API_KEY)

## Additional Considerations

### TypeScript Support

For TypeScript support, add type definitions:

```typescript
// src/index.d.ts
import { FC } from 'react';

interface ChatbotWidgetProps {
  apiUrl?: string;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  theme?: 'default' | 'dark' | 'light' | 'custom';
  primaryColor?: string;
  secondaryColor?: string;
  headerTitle?: string;
  headerSubtitle?: string;
  welcomeMessage?: string;
  placeholderText?: string;
  showTimestamp?: boolean;
  buttonIcon?: string;
  closeIcon?: string;
}

declare const ChatbotWidget: FC<ChatbotWidgetProps>;

export { ChatbotWidget };
export default ChatbotWidget;
```

### Standalone Script for Non-React Sites

To support non-React websites, you can create a UMD build that can be included via a script tag:

```javascript
// Add to rollup.config.js outputs
{
  file: 'dist/index.umd.js',
  format: 'umd',
  name: 'GeminiChatbotWidget',
  globals: {
    react: 'React',
    'react-dom': 'ReactDOM',
    axios: 'axios'
  }
}
```

Then users can include it in their HTML:

```html
<!-- Include React and ReactDOM -->
<script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
<script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>

<!-- Include your widget -->
<script src="https://unpkg.com/gemini-chatbot-widget/dist/index.umd.js"></script>

<!-- Create a container -->
<div id="chatbot-container"></div>

<script>
  // Initialize the widget
  const container = document.getElementById('chatbot-container');
  ReactDOM.render(
    React.createElement(GeminiChatbotWidget.default, {
      apiUrl: 'https://your-backend-api.com/api/chat',
      theme: 'default',
      headerTitle: 'Your Company'
    }),
    container
  );
</script>
```

## Documentation

Ensure your README.md includes:

1. Installation instructions
2. Usage examples
3. Available props and their descriptions
4. Backend setup requirements
5. Customization options
6. Troubleshooting tips

This approach will create a professional, reusable npm package that can be easily integrated into various web projects.
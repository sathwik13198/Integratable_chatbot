# Chatbot Integration Examples

This directory contains examples and templates for integrating the Gemini 2.0 Flash chatbot into various types of websites and applications.

## Contents

### 1. ConfigurableChatbotWidget.js

A fully configurable React component that can be customized with various props. This component is designed to be used in React applications or converted into an npm package.

**Key features:**
- Multiple theme options (default, dark, light, custom)
- Configurable positioning
- Customizable colors, text, and icons
- Responsive design

### 2. ConfigurableChatbotWidget.css

The CSS file for the configurable chatbot widget, using CSS variables for theming. This file works in conjunction with the ConfigurableChatbotWidget.js component.

### 3. ReactIntegrationExample.js

An example of how to use the ConfigurableChatbotWidget in a React application. This file demonstrates how to import the component and configure it with custom props.

### 4. VanillaJsIntegration.html

An example of how to integrate the chatbot into a non-React website using vanilla JavaScript. This file demonstrates how to include the built chatbot files and configure them using a global configuration object.

### 5. NPM_PACKAGE_GUIDE.md

A comprehensive guide on how to create a distributable npm package from the chatbot widget. This guide covers:
- Setting up the package structure
- Creating the package configuration
- Building and testing the package
- Publishing to npm
- Usage examples

## How to Use These Examples

1. **For React Applications:**
   - Copy the ConfigurableChatbotWidget.js and ConfigurableChatbotWidget.css files to your project
   - Import and use the component as shown in ReactIntegrationExample.js

2. **For Non-React Websites:**
   - Build the React app using `npm run build`
   - Host the built files on your server
   - Include the scripts and CSS as shown in VanillaJsIntegration.html

3. **For Creating an NPM Package:**
   - Follow the instructions in NPM_PACKAGE_GUIDE.md

## Backend Requirements

All integration methods require a deployed backend API. Make sure to:

1. Deploy the backend to a server or serverless platform
2. Set the required environment variables (GEMINI_API_KEY)
3. Configure CORS to allow requests from your website domains
4. Update the apiUrl in your frontend configuration to point to your deployed backend

## Customization

You can customize the chatbot by modifying:

- The CSS file for visual changes
- The configuration props for behavioral changes
- The backend prompt in server/routes/chat.js for AI response changes

Refer to the main INTEGRATION.md file for more detailed instructions on integration and customization.
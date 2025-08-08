# Deployment Guide

This guide covers deploying the chatbot system to various platforms.

## 🚀 Quick Deployment Options

### 1. Render (Recommended for Backend)

#### Backend Deployment
1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Set build command: `npm install`
4. Set start command: `npm start`
5. Add environment variables:
   - `GEMINI_API_KEY`: Your Gemini API key (required, get it from https://aistudio.google.com/app/apikey)
   - `PORT`: 10000 (or let Render set it)

#### Frontend Deployment
1. Create a new Static Site on Render
2. Connect your GitHub repository
3. Set build command: `cd client && npm install && npm run build`
4. Set publish directory: `client/build`

### 2. Vercel (Great for Full-Stack)

1. Make sure you have the `vercel.json` configuration file in your project root (already included)
2. Connect your GitHub repository to Vercel
3. Set environment variables in Vercel dashboard:
   - `GEMINI_API_KEY`: Your Gemini API key
4. Vercel will use the configuration in `vercel.json` to build and deploy both frontend and backend as a single project
5. If you encounter the error `react-scripts: command not found`, make sure your `vercel.json` file is properly configured

### 3. Railway

1. Connect your GitHub repository
2. Railway will auto-detect the Node.js app
3. Add environment variables in Railway dashboard
4. Deploy both services

## 🔧 Manual Deployment Steps

### Backend Deployment

1. **Prepare the backend:**
```bash
# Ensure all dependencies are installed
npm install

# Test the server locally
npm start
```

2. **Set environment variables:**
```env
GEMINI_API_KEY=your_actual_api_key
PORT=5000
NODE_ENV=production
```

3. **Deploy to your chosen platform**

### Frontend Deployment

1. **Build the React app:**
```bash
cd client
npm install
npm run build
```

2. **Deploy the `build` folder** to any static hosting service

3. **Update API URL** in the frontend to point to your deployed backend

## 🌐 Platform-Specific Instructions

### Heroku

#### Backend
```bash
# Create Heroku app
heroku create your-chatbot-backend

# Add environment variables
heroku config:set GEMINI_API_KEY=your_api_key

# Deploy
git push heroku main
```

#### Frontend
```bash
# Create separate Heroku app for frontend
heroku create your-chatbot-frontend

# Build and deploy
cd client
npm run build
git add build
git commit -m "Add build files"
git push heroku main
```

### Netlify

1. Connect your GitHub repository
2. Set build command: `cd client && npm install && npm run build`
3. Set publish directory: `client/build`
4. Add environment variables in Netlify dashboard

### DigitalOcean App Platform

1. Create a new app
2. Connect your GitHub repository
3. Set build command: `npm install && cd client && npm install && npm run build`
4. Set run command: `npm start`
5. Add environment variables

## 🔒 Security Considerations

### Environment Variables
- Never commit API keys to version control
- Use platform-specific environment variable systems
- Rotate API keys regularly

### CORS Configuration
Update the CORS settings in `server/index.js` for production:

```javascript
app.use(cors({
  origin: ['https://your-frontend-domain.com'],
  credentials: true
}));
```

### Rate Limiting
Consider adding rate limiting for production:

```bash
npm install express-rate-limit
```

```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use('/api/', limiter);
```

## 📊 Monitoring and Logging

### Add Logging
```javascript
const morgan = require('morgan');
app.use(morgan('combined'));
```

### Health Check Endpoint
```javascript
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});
```

## 🔄 CI/CD Pipeline

### GitHub Actions Example
```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '16'
      - run: npm install
      - run: npm test
      # Add deployment steps for your platform

  deploy-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '16'
      - run: cd client && npm install
      - run: cd client && npm run build
      # Add deployment steps for your platform
```

## 🐛 Troubleshooting

### Common Issues

1. **CORS Errors**
   - Ensure frontend URL is in CORS configuration
   - Check that backend is accessible from frontend

2. **API Key Issues**
   - Verify API key is valid and has proper permissions
   - Check environment variables are set correctly

3. **Build Failures**
   - Ensure all dependencies are installed
   - Check Node.js version compatibility
   - For Vercel: If you see `react-scripts: command not found`, make sure your `vercel.json` file is properly configured with the correct build commands

4. **Port Issues**
   - Use platform-specific port configuration
   - Let the platform set the PORT environment variable

5. **Vercel-Specific Issues**
   - For `react-scripts: command not found` error:
     - Ensure your `vercel.json` file is in the project root
     - Verify the build command includes `npm install` before `npm run build`
     - Check that the `@vercel/static-build` builder is used for the client

### Debug Mode
Add to your `.env`:
```env
DEBUG=true
NODE_ENV=development
```

## 📈 Performance Optimization

1. **Enable compression:**
```bash
npm install compression
```

```javascript
const compression = require('compression');
app.use(compression());
```

2. **Add caching headers:**
```javascript
app.use(express.static('public', {
  maxAge: '1d'
}));
```

3. **Optimize React build:**
```bash
cd client && npm run build --production
```

## 🎯 Production Checklist

- [ ] Environment variables configured
- [ ] CORS settings updated for production domains
- [ ] Rate limiting implemented
- [ ] Logging configured
- [ ] Health check endpoint added
- [ ] SSL/HTTPS enabled
- [ ] Monitoring set up
- [ ] Error handling improved
- [ ] Performance optimized
- [ ] Security headers added

---

For more detailed instructions, refer to the platform-specific documentation or contact support.

import cors from 'cors';

const corsOptions = {
  origin: [
    'http://localhost:5173',
    'https://ramformbuilder.netlify.app',
    'https://form-builder-api.onrender.com'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

export const corsMiddleware = cors(corsOptions);

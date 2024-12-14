import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes';
import formRoutes from './routes/form.routes';
import { errorHandler } from './middleware/errorHandler';
import { authenticateToken } from './middleware/auth';

export const app = express();

// Apply CORS
app.use(cors());

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'ok', 
    message: 'Server is running',
    env: process.env.NODE_ENV
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/forms', authenticateToken, formRoutes);

// Error handling middleware
app.use(errorHandler);

import express from 'express';
import { corsMiddleware } from './cors.config';
import authRoutes from './routes/auth.routes';
import formRoutes from './routes/form.routes';
import submissionRoutes from './routes/submission.routes';
import { errorHandler } from './middleware/errorHandler';
import { authenticateToken } from './middleware/auth';

const app = express();

// Apply CORS first
app.use(corsMiddleware);

// Handle preflight requests
app.options('*', corsMiddleware);

// Other middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Server is running' });
});

// Routes
app.use('/auth', authRoutes);
app.use('/forms', authenticateToken, formRoutes);
app.use('/submissions', authenticateToken, submissionRoutes);

// Error handling
app.use(errorHandler);

export default app;

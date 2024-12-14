import express from 'express';
import { corsMiddleware } from './cors.config';
import authRoutes from './routes/auth';
import formRoutes from './routes/form';
import submissionRoutes from './routes/submission';
import { errorHandler } from './middleware/error';
import { authenticateToken } from './middleware/auth';

const app = express();

// Middleware
app.use(corsMiddleware);
app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/forms', authenticateToken, formRoutes);
app.use('/submissions', authenticateToken, submissionRoutes);

// Error handling
app.use(errorHandler);

export default app;

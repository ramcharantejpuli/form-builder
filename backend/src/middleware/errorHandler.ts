import { Request, Response, NextFunction } from 'express';
import { QueryFailedError } from 'typeorm';

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error('Error:', error);

  if (error instanceof QueryFailedError) {
    // Handle database errors
    return res.status(400).json({
      message: 'Database operation failed',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Database error'
    });
  }

  // Handle validation errors
  if (error.name === 'ValidationError') {
    return res.status(400).json({
      message: 'Validation failed',
      error: error.message
    });
  }

  // Handle JWT errors
  if (error.name === 'JsonWebTokenError') {
    return res.status(401).json({
      message: 'Invalid token',
      error: 'Authentication failed'
    });
  }

  // Default error
  return res.status(500).json({
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
  });
};

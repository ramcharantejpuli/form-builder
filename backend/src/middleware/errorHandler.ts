import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { QueryFailedError } from 'typeorm';

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error('Error:', error);

  if (error instanceof ZodError) {
    return res.status(400).json({
      status: 'error',
      message: 'Validation failed',
      errors: error.errors,
    });
  }

  if (error instanceof QueryFailedError) {
    return res.status(400).json({
      status: 'error',
      message: 'Database operation failed',
      error: error.message,
    });
  }

  return res.status(500).json({
    status: 'error',
    message: 'Internal server error',
    error: error.message,
  });
};

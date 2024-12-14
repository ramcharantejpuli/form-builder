import { Router } from 'express';
import { authenticateToken } from '../middleware/auth';
import {
  createSubmission,
  getSubmissionsByForm,
  exportSubmissions
} from '../controllers/SubmissionController';

const router = Router();

// Protected routes
router.post('/:formId', authenticateToken, createSubmission);
router.get('/form/:formId', authenticateToken, getSubmissionsByForm);
router.get('/export/:formId', authenticateToken, exportSubmissions);

export default router;

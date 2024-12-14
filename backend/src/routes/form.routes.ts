import { Router } from 'express';
import { FormController } from '../controllers/FormController';
import { validateRequest } from '../middleware/validateRequest';
import { formSchema, formSubmissionSchema } from '../utils/validation';
import { authenticateToken } from '../middleware/auth';
import { z } from 'zod';

const router = Router();
const formController = new FormController();

// Parameter validation schema
const paramSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
});

// Form CRUD routes - require authentication
router.post('/', authenticateToken, validateRequest(formSchema), (req, res) => formController.createForm(req, res));
router.get('/', authenticateToken, (req, res) => formController.getForms(req, res));
router.get('/:id', authenticateToken, validateRequest(paramSchema), (req, res) => formController.getForm(req, res));
router.put('/:id', authenticateToken, validateRequest(paramSchema.merge(formSchema)), (req, res) => formController.updateForm(req, res));
router.delete('/:id', authenticateToken, validateRequest(paramSchema), (req, res) => formController.deleteForm(req, res));

// Form submission routes - public routes
router.post('/:id/submit', validateRequest(paramSchema.merge(formSubmissionSchema)), (req, res) => formController.submitForm(req, res));

// Form submission management routes - require authentication
router.get('/:id/submissions', authenticateToken, validateRequest(paramSchema), (req, res) => formController.getSubmissions(req, res));
router.get('/:id/submissions/export', authenticateToken, validateRequest(paramSchema), (req, res) => formController.exportSubmissions(req, res));

export default router;

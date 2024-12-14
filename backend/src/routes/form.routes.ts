import { Router } from 'express';
import { FormController } from '../controllers/FormController';
import { validateRequest } from '../middleware/validateRequest';
import { formSchema, formSubmissionSchema } from '../utils/validation';
import { authenticateToken, AuthenticatedRequest } from '../middleware/auth';
import { z } from 'zod';
import { Request, Response } from 'express';

const router = Router();
const formController = new FormController();

// Parameter validation schema
const paramSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
});

// Helper function to cast Request to AuthenticatedRequest
const handleAuthenticatedRequest = (
  fn: (req: AuthenticatedRequest, res: Response) => Promise<any>
) => {
  return (req: Request, res: Response) => fn(req as AuthenticatedRequest, res);
};

// Form CRUD routes - require authentication
router.post(
  '/',
  authenticateToken,
  validateRequest(formSchema),
  handleAuthenticatedRequest(formController.createForm.bind(formController))
);

router.get(
  '/',
  authenticateToken,
  handleAuthenticatedRequest(formController.getForms.bind(formController))
);

router.get(
  '/:id',
  authenticateToken,
  validateRequest(paramSchema),
  handleAuthenticatedRequest(formController.getForm.bind(formController))
);

router.put(
  '/:id',
  authenticateToken,
  validateRequest(paramSchema.merge(formSchema)),
  handleAuthenticatedRequest(formController.updateForm.bind(formController))
);

router.delete(
  '/:id',
  authenticateToken,
  validateRequest(paramSchema),
  handleAuthenticatedRequest(formController.deleteForm.bind(formController))
);

// Form submission routes - public routes
router.post(
  '/:id/submit',
  validateRequest(paramSchema.merge(formSubmissionSchema)),
  handleAuthenticatedRequest(formController.submitForm.bind(formController))
);

// Form submission management routes - require authentication
router.get(
  '/:id/submissions',
  authenticateToken,
  validateRequest(paramSchema),
  handleAuthenticatedRequest(formController.getSubmissions.bind(formController))
);

router.get(
  '/:id/submissions/export',
  authenticateToken,
  validateRequest(paramSchema),
  handleAuthenticatedRequest(formController.exportSubmissions.bind(formController))
);

export default router;

import { z } from 'zod';

const fieldOptionSchema = z.object({
  label: z.string().min(1),
  value: z.string().min(1),
});

const validationSchema = z.object({
  required: z.boolean().optional(),
  min: z.number().optional(),
  max: z.number().optional(),
  minLength: z.number().optional(),
  maxLength: z.number().optional(),
  pattern: z.string().optional(),
  accept: z.string().optional(), // For file inputs
  message: z.string().optional(),
  email: z.boolean().optional(), // Email validation
});

const fieldSchema = z.object({
  id: z.string().uuid(),
  type: z.enum(['text', 'textarea', 'number', 'email', 'tel', 'date', 'time', 'checkbox', 'select', 'radio', 'file', 'url']),
  label: z.string().min(1),
  name: z.string().min(1),
  placeholder: z.string().optional(),
  required: z.boolean().optional(),
  options: z.array(fieldOptionSchema).optional(),
  validation: validationSchema.optional(),
});

const formSettingsSchema = z.object({
  allowMultipleSubmissions: z.boolean().optional(),
  requireAuthentication: z.boolean().optional(),
  notifyOnSubmission: z.boolean().optional(),
  submitButtonText: z.string().optional(),
  successMessage: z.string().optional(),
}).optional();

export const formSchema = z.object({
  body: z.object({
    title: z.string().min(1),
    description: z.string().optional(),
    fields: z.array(fieldSchema),
    isActive: z.boolean().optional(),
    settings: formSettingsSchema,
  }),
});

export const formSubmissionSchema = z.object({
  body: z.object({
    data: z.record(z.any()),
    formId: z.string().uuid(), // Added formId to submission schema
  }),
});

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export type FormField = z.infer<typeof fieldSchema>;
export type FormSettings = z.infer<typeof formSettingsSchema>;
export type FormData = z.infer<typeof formSchema>;
export type FormSubmissionData = z.infer<typeof formSubmissionSchema>;

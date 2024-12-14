import { z } from 'zod';

export const FormValidationSchema = z.object({
  required: z.boolean().optional(),
  pattern: z.string().optional(),
  minLength: z.number().optional(),
  maxLength: z.number().optional(),
  min: z.number().optional(),
  max: z.number().optional(),
  message: z.string().optional(),
});

export const FormFieldSchema = z.object({
  id: z.string(),
  type: z.enum(['text', 'textarea', 'number', 'email', 'phone', 'date', 'time', 'select', 'radio', 'checkbox', 'file', 'url']),
  label: z.string(),
  placeholder: z.string().optional(),
  required: z.boolean(),
  options: z.array(z.string()).optional(),
  validation: FormValidationSchema.optional(),
});

export const FormSettingsSchema = z.object({
  allowMultipleSubmissions: z.boolean(),
  requireAuthentication: z.boolean(),
  notifyOnSubmission: z.boolean(),
  submitButtonText: z.string(),
  successMessage: z.string(),
});

export const FormSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().optional(),
  fields: z.array(FormFieldSchema),
  isActive: z.boolean(),
  settings: FormSettingsSchema,
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export const FormSubmissionSchema = z.object({
  id: z.string(),
  formId: z.string(),
  data: z.record(z.any()),
  submittedAt: z.string(),
  submittedBy: z.string().optional(),
  status: z.enum(['pending', 'completed', 'rejected']),
  notes: z.string().optional(),
});

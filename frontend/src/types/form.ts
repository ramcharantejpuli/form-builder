export type FieldType =
  | 'text'
  | 'textarea'
  | 'number'
  | 'email'
  | 'tel'
  | 'date'
  | 'time'
  | 'checkbox'
  | 'select'
  | 'radio'
  | 'file'
  | 'url';

export interface FieldValidation {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  pattern?: string;
  accept?: string; // for file upload
}

export interface FieldOption {
  label: string;
  value: string;
}

export type ValidationRuleType =
  | 'required'
  | 'email'
  | 'url'
  | 'pattern'
  | 'minLength'
  | 'maxLength'
  | 'min'
  | 'max'
  | 'custom';

export type ConditionOperator =
  | 'equals'
  | 'not_equals'
  | 'contains'
  | 'not_contains'
  | 'greater_than'
  | 'less_than'
  | 'is_empty'
  | 'is_not_empty';

export interface Condition {
  id: string;
  field: string;
  operator: ConditionOperator;
  value?: string;
}

export interface ValidationRule {
  id: string;
  type: ValidationRuleType;
  message: string;
  pattern?: string;  // For pattern and custom types
  value?: string;    // For min/max/length rules
  conditions: Condition[];
}

export interface FormField {
  id: string;
  type: string;
  label: string;
  required: boolean;
  options?: string[];
  placeholder?: string;
  defaultValue?: any;
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
    message?: string;
  };
}

export interface FormSettings {
  allowAnonymous: boolean;
  requireSignIn: boolean;
  notifyOnSubmission: boolean;
  submitOnce: boolean;
  showProgressBar: boolean;
}

export interface ShareSettings {
  accessLevel: 'private' | 'restricted' | 'public';
  allowSubmissions: boolean;
  requireAuth: boolean;
  expiresAt?: string;
  maxSubmissions?: number;
}

export interface ShareLinkResponse {
  shareLink: string;
  expiresAt?: string;
}

export interface Form {
  id: string;
  title: string;
  description?: string;
  fields: FormField[];
  shareableLink?: string;
  isActive: boolean;
  settings: FormSettings;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface FormSubmission {
  id: string;
  formId: string;
  data: Record<string, any>;
  submittedBy?: string;
  status: 'pending' | 'approved' | 'rejected';
  notes?: string;
  submittedAt: string;
}

export interface FormSubmissionResponse {
  success: boolean;
  message: string;
  submissionId?: string;
}

export interface FormSubmissionStatus {
  id: string;
  formId: string;
  data: Record<string, any>;
  submittedAt: string;
  submittedBy?: string;
  status: 'pending' | 'completed' | 'rejected';
  notes?: string;
}

export type ExportFormat = 'csv' | 'excel' | 'pdf';

export interface DateRange {
  startDate: string;
  endDate: string;
}

export interface ExportOptions {
  includeMetadata: boolean;
  dateRange: 'all' | 'today' | 'week' | 'month' | 'custom';
  customDateRange: DateRange;
  fields: string[]; // List of field IDs to include
}

export interface ExportResponse {
  url: string;
  expiresAt: string;
}

export interface FormField {
  id: string;
  type: 'text' | 'number' | 'date' | 'checkbox' | 'select' | 'radio';
  label: string;
  placeholder?: string;
  required: boolean;
  options?: string[];
  defaultValue?: string | number | boolean;
}

export interface Form {
  id: string;
  title: string;
  description?: string;
  fields: FormField[];
  shareableLink: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface FormSubmission {
  id: string;
  formId: string;
  data: Record<string, any>;
  submittedAt: Date;
}

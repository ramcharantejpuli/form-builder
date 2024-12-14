import { Parser } from 'json2csv';
import { FormSubmission } from '../entities/FormSubmission';
import { Form } from '../entities/Form';

export const generateCsv = (form: Form, submissions: FormSubmission[]): string => {
  const fields = ['submittedAt', ...form.fields.map((f: any) => f.label)];
  
  const data = submissions.map((submission) => {
    const row: Record<string, any> = {
      submittedAt: submission.submittedAt.toISOString(),
    };

    form.fields.forEach((field: any) => {
      row[field.label] = submission.data[field.id] ?? '';
    });

    return row;
  });

  const parser = new Parser({ fields });
  return parser.parse(data);
};

export const formatSubmissionForExport = (submission: FormSubmission, form: Form) => {
  const formattedData: Record<string, any> = {
    submittedAt: submission.submittedAt,
  };

  form.fields.forEach((field: any) => {
    formattedData[field.label] = submission.data[field.id] ?? '';
  });

  return formattedData;
};

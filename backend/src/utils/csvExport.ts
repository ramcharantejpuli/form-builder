import { Parser } from 'json2csv';
import { FormSubmission } from '../entities/FormSubmission';

export const exportToCSV = async (submissions: FormSubmission[]): Promise<string> => {
  try {
    if (!submissions.length) {
      throw new Error('No submissions to export');
    }

    // Get all unique field names from all submissions
    const fields = new Set<string>();
    submissions.forEach(submission => {
      Object.keys(submission.data).forEach(key => fields.add(key));
    });

    // Create fields array with additional metadata
    const csvFields = [
      'Submission ID',
      'Form ID',
      'Form Title',
      'Submitted At',
      ...Array.from(fields)
    ];

    // Transform submissions data
    const csvData = submissions.map(submission => ({
      'Submission ID': submission.id,
      'Form ID': submission.form.id,
      'Form Title': submission.form.title,
      'Submitted At': submission.submittedAt,
      ...submission.data
    }));

    // Configure the parser
    const parser = new Parser({
      fields: csvFields,
      delimiter: ',',
      quote: '"'
    });

    // Parse data to CSV
    return parser.parse(csvData);
  } catch (error) {
    console.error('Error exporting to CSV:', error);
    throw error;
  }
};

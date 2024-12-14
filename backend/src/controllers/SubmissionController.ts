import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Form } from '../entities/Form';
import { FormSubmission } from '../entities/FormSubmission';
import { exportToCSV } from '../utils/csvExport';

const submissionRepository = AppDataSource.getRepository(FormSubmission);
const formRepository = AppDataSource.getRepository(Form);

export const createSubmission = async (req: Request, res: Response) => {
  try {
    const { formId } = req.params;
    const formData = req.body;

    const form = await formRepository.findOne({ where: { id: formId } });
    if (!form) {
      return res.status(404).json({ message: 'Form not found' });
    }

    const submission = submissionRepository.create({
      form,
      data: formData
    });

    await submissionRepository.save(submission);
    return res.status(201).json(submission);
  } catch (error) {
    console.error('Error creating submission:', error);
    return res.status(500).json({ message: 'Failed to create submission' });
  }
};

export const getSubmissionsByForm = async (req: Request, res: Response) => {
  try {
    const { formId } = req.params;
    const submissions = await submissionRepository.find({
      where: { form: { id: formId } },
      order: { submittedAt: 'DESC' }
    });

    return res.json(submissions);
  } catch (error) {
    console.error('Error fetching submissions:', error);
    return res.status(500).json({ message: 'Failed to fetch submissions' });
  }
};

export const exportSubmissions = async (req: Request, res: Response) => {
  try {
    const { formId } = req.params;
    const submissions = await submissionRepository.find({
      where: { form: { id: formId } },
      relations: ['form']
    });

    if (!submissions.length) {
      return res.status(404).json({ message: 'No submissions found' });
    }

    const csv = await exportToCSV(submissions);
    
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename=submissions-${formId}.csv`);
    return res.send(csv);
  } catch (error) {
    console.error('Error exporting submissions:', error);
    return res.status(500).json({ message: 'Failed to export submissions' });
  }
};

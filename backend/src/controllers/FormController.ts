import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Form } from '../entities/Form';
import { FormSubmission } from '../entities/FormSubmission';
import { v4 as uuidv4 } from 'uuid';
import { Parser } from 'json2csv';

export class FormController {
  private formRepository = AppDataSource.getRepository(Form);
  private submissionRepository = AppDataSource.getRepository(FormSubmission);

  async createForm(req: Request, res: Response) {
    try {
      const { title, description, fields, settings } = req.body;
      
      if (!req.user) {
        return res.status(401).json({
          error: 'Unauthorized',
          message: 'You must be logged in to create a form'
        });
      }

      const form = this.formRepository.create({
        title,
        description,
        fields,
        settings,
        shareableLink: uuidv4(),
        isActive: true,
        userId: req.user.id // Add the user ID from the authenticated user
      });

      const savedForm = await this.formRepository.save(form);
      res.status(201).json({
        message: 'Form created successfully',
        data: savedForm
      });
    } catch (error) {
      console.error('Error creating form:', error);
      res.status(500).json({
        error: 'Failed to create form',
        message: error instanceof Error ? error.message : 'Unknown error occurred'
      });
    }
  }

  async getForms(req: Request, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({
          error: 'Unauthorized',
          message: 'You must be logged in to view forms'
        });
      }

      const forms = await this.formRepository.find({
        where: { userId: req.user.id }, // Only get forms for the current user
        order: { createdAt: 'DESC' },
        relations: ['submissions']
      });
      
      res.json({
        message: 'Forms retrieved successfully',
        data: forms
      });
    } catch (error) {
      console.error('Error fetching forms:', error);
      res.status(500).json({
        error: 'Failed to fetch forms',
        message: error instanceof Error ? error.message : 'Unknown error occurred'
      });
    }
  }

  async getForm(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const form = await this.formRepository.findOne({
        where: { id },
        relations: ['submissions']
      });

      if (!form) {
        return res.status(404).json({
          error: 'Form not found',
          message: 'The requested form does not exist'
        });
      }

      // If not a public form, check user authorization
      if (!form.isActive && (!req.user || form.userId !== req.user.id)) {
        return res.status(403).json({
          error: 'Forbidden',
          message: 'You do not have permission to view this form'
        });
      }

      res.json({
        message: 'Form retrieved successfully',
        data: form
      });
    } catch (error) {
      console.error('Error fetching form:', error);
      res.status(500).json({
        error: 'Failed to fetch form',
        message: error instanceof Error ? error.message : 'Unknown error occurred'
      });
    }
  }

  async updateForm(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const updates = req.body;

      const form = await this.formRepository.findOne({
        where: { id }
      });

      if (!form) {
        return res.status(404).json({
          error: 'Form not found',
          message: 'The requested form does not exist'
        });
      }

      if (!req.user || form.userId !== req.user.id) {
        return res.status(403).json({
          error: 'Forbidden',
          message: 'You do not have permission to update this form'
        });
      }

      Object.assign(form, updates);
      const savedForm = await this.formRepository.save(form);

      res.json({
        message: 'Form updated successfully',
        data: savedForm
      });
    } catch (error) {
      console.error('Error updating form:', error);
      res.status(500).json({
        error: 'Failed to update form',
        message: error instanceof Error ? error.message : 'Unknown error occurred'
      });
    }
  }

  async deleteForm(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const form = await this.formRepository.findOne({
        where: { id }
      });

      if (!form) {
        return res.status(404).json({
          error: 'Form not found',
          message: 'The requested form does not exist'
        });
      }

      if (!req.user || form.userId !== req.user.id) {
        return res.status(403).json({
          error: 'Forbidden',
          message: 'You do not have permission to delete this form'
        });
      }

      await this.formRepository.remove(form);

      res.json({
        message: 'Form deleted successfully'
      });
    } catch (error) {
      console.error('Error deleting form:', error);
      res.status(500).json({
        error: 'Failed to delete form',
        message: error instanceof Error ? error.message : 'Unknown error occurred'
      });
    }
  }

  async submitForm(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { data } = req.body;

      const form = await this.formRepository.findOne({
        where: { id }
      });

      if (!form) {
        return res.status(404).json({
          error: 'Form not found',
          message: 'The requested form does not exist'
        });
      }

      if (!form.isActive) {
        return res.status(403).json({
          error: 'Form inactive',
          message: 'This form is no longer accepting submissions'
        });
      }

      const submission = this.submissionRepository.create({
        form,
        data,
        submittedBy: req.user?.id
      });

      const savedSubmission = await this.submissionRepository.save(submission);

      res.status(201).json({
        message: 'Form submitted successfully',
        data: savedSubmission
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      res.status(500).json({
        error: 'Failed to submit form',
        message: error instanceof Error ? error.message : 'Unknown error occurred'
      });
    }
  }

  async getSubmissions(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const form = await this.formRepository.findOne({
        where: { id },
        relations: ['submissions']
      });

      if (!form) {
        return res.status(404).json({
          error: 'Form not found',
          message: 'The requested form does not exist'
        });
      }

      if (!req.user || form.userId !== req.user.id) {
        return res.status(403).json({
          error: 'Forbidden',
          message: 'You do not have permission to view submissions for this form'
        });
      }

      res.json({
        message: 'Form submissions retrieved successfully',
        data: form.submissions
      });
    } catch (error) {
      console.error('Error fetching form submissions:', error);
      res.status(500).json({
        error: 'Failed to fetch form submissions',
        message: error instanceof Error ? error.message : 'Unknown error occurred'
      });
    }
  }

  async exportSubmissions(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const form = await this.formRepository.findOne({
        where: { id },
        relations: ['submissions']
      });

      if (!form) {
        return res.status(404).json({
          error: 'Form not found',
          message: 'The requested form does not exist'
        });
      }

      if (!req.user || form.userId !== req.user.id) {
        return res.status(403).json({
          error: 'Forbidden',
          message: 'You do not have permission to export submissions for this form'
        });
      }

      if (!form.submissions || form.submissions.length === 0) {
        return res.status(404).json({
          error: 'No submissions',
          message: 'This form has no submissions to export'
        });
      }

      // Prepare data for CSV export
      const submissions = form.submissions.map(sub => ({
        ...sub.data,
        submittedAt: sub.submittedAt,
        submissionId: sub.id
      }));

      // Convert to CSV
      const parser = new Parser();
      const csv = parser.parse(submissions);

      // Set headers for file download
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', `attachment; filename=form-${id}-submissions.csv`);

      res.send(csv);
    } catch (error) {
      console.error('Error exporting form submissions:', error);
      res.status(500).json({
        error: 'Failed to export form submissions',
        message: error instanceof Error ? error.message : 'Unknown error occurred'
      });
    }
  }
}

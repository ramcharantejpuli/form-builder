import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Form } from '../entities/Form';
import { FormSubmission } from '../entities/FormSubmission';
import { v4 as uuidv4 } from 'uuid';
import { Parser } from 'json2csv';
import { AuthenticatedRequest } from '../middleware/auth';

export class FormController {
  private formRepository = AppDataSource.getRepository(Form);
  private submissionRepository = AppDataSource.getRepository(FormSubmission);

  async createForm(req: AuthenticatedRequest, res: Response) {
    try {
      const { title, description, fields, settings } = req.body;
      const userId = req.user.userId;
      
      if (!userId) {
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
        userId
      });

      await this.formRepository.save(form);

      return res.status(201).json({
        message: 'Form created successfully',
        form: {
          id: form.id,
          title: form.title,
          description: form.description,
          shareableLink: form.shareableLink
        }
      });
    } catch (error) {
      console.error('Create form error:', error);
      return res.status(500).json({ message: 'Error creating form' });
    }
  }

  async getForms(req: AuthenticatedRequest, res: Response) {
    try {
      const userId = req.user.userId;

      if (!userId) {
        return res.status(401).json({
          error: 'Unauthorized',
          message: 'You must be logged in to view forms'
        });
      }

      const forms = await this.formRepository.find({
        where: { userId },
        order: { createdAt: 'DESC' }
      });

      return res.json(forms);
    } catch (error) {
      console.error('Get forms error:', error);
      return res.status(500).json({ message: 'Error fetching forms' });
    }
  }

  async getForm(req: AuthenticatedRequest, res: Response) {
    try {
      const { id } = req.params;
      const userId = req.user.userId;

      const form = await this.formRepository.findOne({
        where: { id, userId }
      });

      if (!form) {
        return res.status(404).json({ message: 'Form not found' });
      }

      // If not a public form, check user authorization
      if (!form.isActive && (!req.user || form.userId !== req.user.userId)) {
        return res.status(403).json({
          error: 'Forbidden',
          message: 'You do not have permission to view this form'
        });
      }

      return res.json(form);
    } catch (error) {
      console.error('Get form error:', error);
      return res.status(500).json({ message: 'Error fetching form' });
    }
  }

  async updateForm(req: AuthenticatedRequest, res: Response) {
    try {
      const { id } = req.params;
      const userId = req.user.userId;
      const { title, description, fields, settings } = req.body;

      const form = await this.formRepository.findOne({
        where: { id, userId }
      });

      if (!form) {
        return res.status(404).json({ message: 'Form not found' });
      }

      if (!req.user || form.userId !== req.user.userId) {
        return res.status(403).json({
          error: 'Forbidden',
          message: 'You do not have permission to update this form'
        });
      }

      form.title = title;
      form.description = description;
      form.fields = fields;
      form.settings = settings;

      await this.formRepository.save(form);

      return res.json({
        message: 'Form updated successfully',
        form
      });
    } catch (error) {
      console.error('Update form error:', error);
      return res.status(500).json({ message: 'Error updating form' });
    }
  }

  async deleteForm(req: AuthenticatedRequest, res: Response) {
    try {
      const { id } = req.params;
      const userId = req.user.userId;

      const form = await this.formRepository.findOne({
        where: { id, userId }
      });

      if (!form) {
        return res.status(404).json({ message: 'Form not found' });
      }

      if (!req.user || form.userId !== req.user.userId) {
        return res.status(403).json({
          error: 'Forbidden',
          message: 'You do not have permission to delete this form'
        });
      }

      await this.formRepository.remove(form);

      return res.json({ message: 'Form deleted successfully' });
    } catch (error) {
      console.error('Delete form error:', error);
      return res.status(500).json({ message: 'Error deleting form' });
    }
  }

  async submitForm(req: AuthenticatedRequest, res: Response) {
    try {
      const { id } = req.params;
      const formData = req.body;

      const form = await this.formRepository.findOne({
        where: { id }
      });

      if (!form) {
        return res.status(404).json({ message: 'Form not found' });
      }

      if (!form.isActive) {
        return res.status(400).json({ message: 'Form is not active' });
      }

      const submission = this.submissionRepository.create({
        form,
        data: formData,
        submittedBy: req.user?.userId
      });

      await this.submissionRepository.save(submission);

      return res.status(201).json({
        message: 'Form submitted successfully',
        submission: {
          id: submission.id,
          formId: submission.formId,
          submittedAt: submission.createdAt
        }
      });
    } catch (error) {
      console.error('Submit form error:', error);
      return res.status(500).json({ message: 'Error submitting form' });
    }
  }

  async getSubmissions(req: AuthenticatedRequest, res: Response) {
    try {
      const { id } = req.params;
      const userId = req.user.userId;

      const form = await this.formRepository.findOne({
        where: { id, userId }
      });

      if (!form) {
        return res.status(404).json({ message: 'Form not found' });
      }

      if (!req.user || form.userId !== req.user.userId) {
        return res.status(403).json({
          error: 'Forbidden',
          message: 'You do not have permission to view submissions for this form'
        });
      }

      const submissions = await this.submissionRepository.find({
        where: { formId: id },
        order: { createdAt: 'DESC' }
      });

      return res.json(submissions);
    } catch (error) {
      console.error('Get form submissions error:', error);
      return res.status(500).json({ message: 'Error fetching form submissions' });
    }
  }

  async exportSubmissions(req: AuthenticatedRequest, res: Response) {
    try {
      const { id } = req.params;
      const userId = req.user.userId;

      const form = await this.formRepository.findOne({
        where: { id, userId }
      });

      if (!form) {
        return res.status(404).json({ message: 'Form not found' });
      }

      if (!req.user || form.userId !== req.user.userId) {
        return res.status(403).json({
          error: 'Forbidden',
          message: 'You do not have permission to export submissions for this form'
        });
      }

      const submissions = await this.submissionRepository.find({
        where: { formId: id },
        order: { createdAt: 'DESC' }
      });

      const parser = new Parser();
      const csv = parser.parse(submissions.map(s => s.data));

      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', `attachment; filename=form-${id}-submissions.csv`);
      return res.send(csv);
    } catch (error) {
      console.error('Export submissions error:', error);
      return res.status(500).json({ message: 'Error exporting submissions' });
    }
  }
}

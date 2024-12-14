import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Form } from '../entities/Form';
import { User } from '../entities/User';

const formRepository = AppDataSource.getRepository(Form);

export const getForms = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const forms = await formRepository.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });

    return res.json({ forms });
  } catch (error) {
    console.error('Get forms error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const getForm = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = (req as any).user.id;

    const form = await formRepository.findOne({
      where: { id, userId },
    });

    if (!form) {
      return res.status(404).json({ message: 'Form not found' });
    }

    return res.json({ form });
  } catch (error) {
    console.error('Get form error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const createForm = async (req: Request, res: Response) => {
  try {
    const { title, description, fields } = req.body;
    const userId = (req as any).user.id;

    const form = formRepository.create({
      title,
      description,
      fields,
      userId,
    });

    await formRepository.save(form);
    return res.status(201).json({ form });
  } catch (error) {
    console.error('Create form error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const updateForm = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description, fields } = req.body;
    const userId = (req as any).user.id;

    const form = await formRepository.findOne({
      where: { id, userId },
    });

    if (!form) {
      return res.status(404).json({ message: 'Form not found' });
    }

    form.title = title;
    form.description = description;
    form.fields = fields;

    await formRepository.save(form);
    return res.json({ form });
  } catch (error) {
    console.error('Update form error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const deleteForm = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = (req as any).user.id;

    const form = await formRepository.findOne({
      where: { id, userId },
    });

    if (!form) {
      return res.status(404).json({ message: 'Form not found' });
    }

    await formRepository.remove(form);
    return res.json({ message: 'Form deleted successfully' });
  } catch (error) {
    console.error('Delete form error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

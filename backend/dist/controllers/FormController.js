"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormController = void 0;
const data_source_1 = require("../data-source");
const Form_1 = require("../entities/Form");
const FormSubmission_1 = require("../entities/FormSubmission");
const uuid_1 = require("uuid");
const json2csv_1 = require("json2csv");
class FormController {
    constructor() {
        this.formRepository = data_source_1.AppDataSource.getRepository(Form_1.Form);
        this.submissionRepository = data_source_1.AppDataSource.getRepository(FormSubmission_1.FormSubmission);
    }
    async createForm(req, res) {
        try {
            const { title, description, fields } = req.body;
            const form = new Form_1.Form();
            form.title = title;
            form.description = description;
            form.fields = fields;
            form.shareableLink = (0, uuid_1.v4)();
            const savedForm = await this.formRepository.save(form);
            res.json(savedForm);
        }
        catch (error) {
            res.status(500).json({ error: 'Error creating form' });
        }
    }
    async getForms(req, res) {
        try {
            const forms = await this.formRepository.find({
                order: { createdAt: 'DESC' },
            });
            res.json(forms);
        }
        catch (error) {
            res.status(500).json({ error: 'Error fetching forms' });
        }
    }
    async getForm(req, res) {
        try {
            const form = await this.formRepository.findOne({
                where: { id: req.params.id },
            });
            if (!form) {
                return res.status(404).json({ error: 'Form not found' });
            }
            res.json(form);
        }
        catch (error) {
            res.status(500).json({ error: 'Error fetching form' });
        }
    }
    async updateForm(req, res) {
        try {
            const form = await this.formRepository.findOne({
                where: { id: req.params.id },
            });
            if (!form) {
                return res.status(404).json({ error: 'Form not found' });
            }
            const { title, description, fields } = req.body;
            form.title = title;
            form.description = description;
            form.fields = fields;
            const updatedForm = await this.formRepository.save(form);
            res.json(updatedForm);
        }
        catch (error) {
            res.status(500).json({ error: 'Error updating form' });
        }
    }
    async deleteForm(req, res) {
        try {
            const result = await this.formRepository.delete(req.params.id);
            if (result.affected === 0) {
                return res.status(404).json({ error: 'Form not found' });
            }
            res.status(204).send();
        }
        catch (error) {
            res.status(500).json({ error: 'Error deleting form' });
        }
    }
    async submitForm(req, res) {
        try {
            const form = await this.formRepository.findOne({
                where: { id: req.params.id },
            });
            if (!form) {
                return res.status(404).json({ error: 'Form not found' });
            }
            const submission = new FormSubmission_1.FormSubmission();
            submission.form = form;
            submission.formId = form.id;
            submission.data = req.body;
            const savedSubmission = await this.submissionRepository.save(submission);
            res.json(savedSubmission);
        }
        catch (error) {
            res.status(500).json({ error: 'Error submitting form' });
        }
    }
    async getSubmissions(req, res) {
        try {
            const submissions = await this.submissionRepository.find({
                where: { formId: req.params.id },
                order: { submittedAt: 'DESC' },
                relations: ['form'],
            });
            res.json(submissions);
        }
        catch (error) {
            res.status(500).json({ error: 'Error fetching submissions' });
        }
    }
    async exportSubmissions(req, res) {
        try {
            const form = await this.formRepository.findOne({
                where: { id: req.params.id },
            });
            if (!form) {
                return res.status(404).json({ error: 'Form not found' });
            }
            const submissions = await this.submissionRepository.find({
                where: { formId: req.params.id },
                order: { submittedAt: 'DESC' },
            });
            const fields = ['submittedAt', ...form.fields.map((f) => f.label)];
            const data = submissions.map((sub) => ({
                submittedAt: sub.submittedAt,
                ...Object.fromEntries(form.fields.map((f) => [f.label, sub.data[f.id]])),
            }));
            const parser = new json2csv_1.Parser({ fields });
            const csv = parser.parse(data);
            res.header('Content-Type', 'text/csv');
            res.attachment(`${form.title}-submissions.csv`);
            res.send(csv);
        }
        catch (error) {
            res.status(500).json({ error: 'Error exporting submissions' });
        }
    }
}
exports.FormController = FormController;

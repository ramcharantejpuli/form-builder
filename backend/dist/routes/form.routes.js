"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const FormController_1 = require("../controllers/FormController");
const validateRequest_1 = require("../middleware/validateRequest");
const validation_1 = require("../utils/validation");
const zod_1 = require("zod");
const router = (0, express_1.Router)();
const formController = new FormController_1.FormController();
// Parameter validation schema
const paramSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z.string().uuid(),
    }),
});
// Form CRUD routes
router.post('/', (0, validateRequest_1.validateRequest)(validation_1.formSchema), (req, res) => formController.createForm(req, res));
router.get('/', (req, res) => formController.getForms(req, res));
router.get('/:id', (0, validateRequest_1.validateRequest)(paramSchema), (req, res) => formController.getForm(req, res));
router.put('/:id', (0, validateRequest_1.validateRequest)(paramSchema.merge(validation_1.formSchema)), (req, res) => formController.updateForm(req, res));
router.delete('/:id', (0, validateRequest_1.validateRequest)(paramSchema), (req, res) => formController.deleteForm(req, res));
// Form submission routes
router.post('/:id/submit', (0, validateRequest_1.validateRequest)(paramSchema.merge(validation_1.formSubmissionSchema)), (req, res) => formController.submitForm(req, res));
router.get('/:id/submissions', (0, validateRequest_1.validateRequest)(paramSchema), (req, res) => formController.getSubmissions(req, res));
router.get('/:id/submissions/export', (0, validateRequest_1.validateRequest)(paramSchema), (req, res) => formController.exportSubmissions(req, res));
exports.default = router;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formSubmissionSchema = exports.formSchema = exports.formFieldSchema = void 0;
const zod_1 = require("zod");
exports.formFieldSchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
    type: zod_1.z.enum(['text', 'number', 'date', 'checkbox', 'select', 'radio']),
    label: zod_1.z.string().min(1, 'Label is required'),
    placeholder: zod_1.z.string().optional(),
    required: zod_1.z.boolean(),
    options: zod_1.z.array(zod_1.z.string()).optional(),
    defaultValue: zod_1.z.union([zod_1.z.string(), zod_1.z.number(), zod_1.z.boolean()]).optional(),
});
exports.formSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, 'Title is required'),
    description: zod_1.z.string().optional(),
    fields: zod_1.z.array(exports.formFieldSchema),
});
exports.formSubmissionSchema = zod_1.z.object({
    formId: zod_1.z.string().uuid(),
    data: zod_1.z.record(zod_1.z.string(), zod_1.z.any()),
});

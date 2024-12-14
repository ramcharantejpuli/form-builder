"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatSubmissionForExport = exports.generateCsv = void 0;
const json2csv_1 = require("json2csv");
const generateCsv = (form, submissions) => {
    const fields = ['submittedAt', ...form.fields.map((f) => f.label)];
    const data = submissions.map((submission) => {
        const row = {
            submittedAt: submission.submittedAt.toISOString(),
        };
        form.fields.forEach((field) => {
            row[field.label] = submission.data[field.id] ?? '';
        });
        return row;
    });
    const parser = new json2csv_1.Parser({ fields });
    return parser.parse(data);
};
exports.generateCsv = generateCsv;
const formatSubmissionForExport = (submission, form) => {
    const formattedData = {
        submittedAt: submission.submittedAt,
    };
    form.fields.forEach((field) => {
        formattedData[field.label] = submission.data[field.id] ?? '';
    });
    return formattedData;
};
exports.formatSubmissionForExport = formatSubmissionForExport;

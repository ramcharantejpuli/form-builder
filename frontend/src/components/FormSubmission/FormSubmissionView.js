import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { formApi } from '../../services/api';
import ExportDialog from './ExportDialog';
export default function FormSubmissionView() {
    const { formId } = useParams();
    const [form, setForm] = useState(null);
    const [submissions, setSubmissions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showExportDialog, setShowExportDialog] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!formId)
                    return;
                const [formData, submissionData] = await Promise.all([
                    formApi.getForm(formId),
                    formApi.getFormSubmissions(formId)
                ]);
                setForm(formData);
                setSubmissions(submissionData);
            }
            catch (err) {
                setError('Failed to load form submissions');
                console.error(err);
            }
            finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [formId]);
    if (loading) {
        return (_jsx("div", { className: "flex items-center justify-center min-h-screen", children: _jsx("div", { className: "animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600" }) }));
    }
    if (error || !form) {
        return (_jsx("div", { className: "text-center py-8", children: _jsx("p", { className: "text-red-600", children: error || 'Form not found' }) }));
    }
    return (_jsxs("div", { className: "container mx-auto px-4 py-8", children: [_jsxs("div", { className: "flex justify-between items-center mb-6", children: [_jsxs("h1", { className: "text-2xl font-bold", children: [form.title, " - Submissions"] }), _jsxs("button", { onClick: () => setShowExportDialog(true), className: "inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700", children: [_jsx("svg", { className: "-ml-1 mr-2 h-5 w-5", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", children: _jsx("path", { fillRule: "evenodd", d: "M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z", clipRule: "evenodd" }) }), "Export"] })] }), submissions.length === 0 ? (_jsx("p", { className: "text-gray-500 text-center py-8", children: "No submissions yet" })) : (_jsx("div", { className: "bg-white shadow-md rounded-lg overflow-hidden", children: _jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "min-w-full divide-y divide-gray-200", children: [_jsx("thead", { className: "bg-gray-50", children: _jsxs("tr", { children: [_jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Submission Date" }), form.fields.map((field) => (_jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: field.label }, field.id)))] }) }), _jsx("tbody", { className: "bg-white divide-y divide-gray-200", children: submissions.map((submission, index) => (_jsxs("tr", { className: index % 2 === 0 ? 'bg-white' : 'bg-gray-50', children: [_jsx("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500", children: new Date(submission.createdAt).toLocaleString() }), form.fields.map((field) => (_jsx("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-900", children: renderFieldValue(submission.data[field.name], field.type) }, field.id)))] }, submission.id))) })] }) }) })), showExportDialog && (_jsx(ExportDialog, { isOpen: showExportDialog, onClose: () => setShowExportDialog(false), formId: formId }))] }));
}
function renderFieldValue(value, type) {
    if (value === null || value === undefined) {
        return '-';
    }
    switch (type) {
        case 'checkbox':
            return value ? '✓' : '✗';
        case 'file':
            return value.name || value; // Display filename or URL
        case 'date':
            return new Date(value).toLocaleDateString();
        case 'time':
            return value;
        default:
            return String(value);
    }
}

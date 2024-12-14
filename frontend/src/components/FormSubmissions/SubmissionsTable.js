import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useQuery } from '@tanstack/react-query';
import { Download, FileText } from 'lucide-react';
import { formApi } from '../../services/api';
export default function SubmissionsTable({ form }) {
    const { data: submissions = [], isLoading } = useQuery({
        queryKey: ['submissions', form.id],
        queryFn: () => formApi.getSubmissions(form.id),
    });
    const handleExport = async () => {
        try {
            const response = await formApi.exportSubmissions(form.id, 'csv', {
                includeMetadata: true,
                dateRange: 'all',
                fields: form.fields.map((field) => field.name),
            });
            // Create and download the file
            const blob = new Blob([response], { type: 'text/csv' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${form.title}-submissions.csv`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        }
        catch (error) {
            console.error('Export failed:', error);
        }
    };
    if (isLoading) {
        return (_jsx("div", { className: "flex justify-center items-center h-48", children: _jsx("div", { className: "text-gray-500", children: "Loading submissions..." }) }));
    }
    if (submissions.length === 0) {
        return (_jsxs("div", { className: "text-center py-12", children: [_jsx(FileText, { className: "mx-auto h-12 w-12 text-gray-400" }), _jsx("h3", { className: "mt-2 text-sm font-medium text-gray-900", children: "No submissions" }), _jsx("p", { className: "mt-1 text-sm text-gray-500", children: "Share your form to start collecting responses." })] }));
    }
    return (_jsx("div", { className: "bg-white shadow-sm rounded-lg", children: _jsxs("div", { className: "px-4 py-5 sm:p-6", children: [_jsxs("div", { className: "flex justify-between items-center mb-4", children: [_jsxs("h2", { className: "text-lg font-medium text-gray-900", children: ["Form Submissions (", submissions.length, ")"] }), _jsxs("button", { onClick: handleExport, className: "inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700", children: [_jsx(Download, { className: "h-4 w-4 mr-2" }), "Export CSV"] })] }), _jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "min-w-full divide-y divide-gray-200", children: [_jsx("thead", { className: "bg-gray-50", children: _jsxs("tr", { children: [_jsx("th", { scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Submission Date" }), form.fields.map((field) => (_jsx("th", { scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: field.label }, field.id)))] }) }), _jsx("tbody", { className: "bg-white divide-y divide-gray-200", children: submissions.map((submission) => (_jsxs("tr", { children: [_jsx("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500", children: new Date(submission.submittedAt).toLocaleDateString() }), form.fields.map((field) => (_jsx("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-900", children: submission.data[field.name]?.toString() || '-' }, field.id)))] }, submission.id))) })] }) })] }) }));
}

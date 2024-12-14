import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { formApi } from '../../services/api';
export default function ExportDialog({ isOpen, onClose, formId }) {
    const [format, setFormat] = useState('csv');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [options, setOptions] = useState({
        includeMetadata: true,
        dateRange: 'all',
        customDateRange: {
            startDate: '',
            endDate: '',
        },
        fields: [],
    });
    const handleExport = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await formApi.exportSubmissions(formId, format, options);
            // Create a blob URL and trigger download
            const blob = new Blob([response], { type: getContentType(format) });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `form-submissions.${format}`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
            onClose();
        }
        catch (err) {
            setError('Failed to export submissions. Please try again.');
            console.error('Export error:', err);
        }
        finally {
            setLoading(false);
        }
    };
    const getContentType = (format) => {
        switch (format) {
            case 'csv':
                return 'text/csv';
            case 'excel':
                return 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
            case 'pdf':
                return 'application/pdf';
            default:
                return 'application/octet-stream';
        }
    };
    if (!isOpen)
        return null;
    return (_jsx("div", { className: "fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50", children: _jsxs("div", { className: "bg-white rounded-lg p-6 max-w-lg w-full", children: [_jsx("h2", { className: "text-lg font-medium mb-4", children: "Export Submissions" }), error && (_jsx("div", { className: "mb-4 p-2 bg-red-50 text-red-500 rounded", children: error })), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Export Format" }), _jsxs("select", { value: format, onChange: (e) => setFormat(e.target.value), className: "block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm", disabled: loading, children: [_jsx("option", { value: "csv", children: "CSV" }), _jsx("option", { value: "excel", children: "Excel" }), _jsx("option", { value: "pdf", children: "PDF" })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Date Range" }), _jsxs("select", { value: options.dateRange, onChange: (e) => setOptions({ ...options, dateRange: e.target.value }), className: "block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm", disabled: loading, children: [_jsx("option", { value: "all", children: "All Time" }), _jsx("option", { value: "today", children: "Today" }), _jsx("option", { value: "week", children: "This Week" }), _jsx("option", { value: "month", children: "This Month" }), _jsx("option", { value: "custom", children: "Custom Range" })] })] }), options.dateRange === 'custom' && (_jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Start Date" }), _jsx("input", { type: "date", value: options.customDateRange.startDate, onChange: (e) => setOptions({
                                                ...options,
                                                customDateRange: {
                                                    ...options.customDateRange,
                                                    startDate: e.target.value,
                                                },
                                            }), className: "block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm", disabled: loading })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "End Date" }), _jsx("input", { type: "date", value: options.customDateRange.endDate, onChange: (e) => setOptions({
                                                ...options,
                                                customDateRange: {
                                                    ...options.customDateRange,
                                                    endDate: e.target.value,
                                                },
                                            }), className: "block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm", disabled: loading })] })] })), _jsxs("div", { className: "flex items-center", children: [_jsx("input", { type: "checkbox", id: "includeMetadata", checked: options.includeMetadata, onChange: (e) => setOptions({ ...options, includeMetadata: e.target.checked }), className: "h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500", disabled: loading }), _jsx("label", { htmlFor: "includeMetadata", className: "ml-2 block text-sm text-gray-700", children: "Include Metadata (submission date, user info)" })] })] }), _jsxs("div", { className: "mt-6 flex justify-end space-x-3", children: [_jsx("button", { type: "button", onClick: onClose, className: "inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500", disabled: loading, children: "Cancel" }), _jsx("button", { type: "button", onClick: handleExport, className: "inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500", disabled: loading, children: loading ? 'Exporting...' : 'Export' })] })] }) }));
}

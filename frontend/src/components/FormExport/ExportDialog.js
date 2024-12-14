import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { toast } from 'react-hot-toast';
import { formApi } from '../../services/api';
export default function ExportDialog({ isOpen, onClose, formId }) {
    const [loading, setLoading] = useState(false);
    const [format, setFormat] = useState('csv');
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
        setLoading(true);
        try {
            const response = await formApi.exportSubmissions(formId, format, options);
            // Create a download link
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `form-submissions.${format}`);
            document.body.appendChild(link);
            link.click();
            link.remove();
            toast.success('Export successful!');
            onClose();
        }
        catch (error) {
            toast.error('Failed to export submissions');
        }
        finally {
            setLoading(false);
        }
    };
    return (_jsxs(Dialog, { open: isOpen, onClose: onClose, className: "relative z-50", children: [_jsx("div", { className: "fixed inset-0 bg-black/30", "aria-hidden": "true" }), _jsx("div", { className: "fixed inset-0 flex items-center justify-center p-4", children: _jsxs(Dialog.Panel, { className: "mx-auto max-w-lg rounded-lg bg-white p-6", children: [_jsx(Dialog.Title, { className: "text-lg font-medium leading-6 text-gray-900 mb-4", children: "Export Form Submissions" }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Export Format" }), _jsxs("select", { value: format, onChange: (e) => setFormat(e.target.value), className: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm", children: [_jsx("option", { value: "csv", children: "CSV" }), _jsx("option", { value: "excel", children: "Excel" }), _jsx("option", { value: "pdf", children: "PDF" })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Date Range" }), _jsxs("select", { value: options.dateRange, onChange: (e) => setOptions({ ...options, dateRange: e.target.value }), className: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm", children: [_jsx("option", { value: "all", children: "All Time" }), _jsx("option", { value: "today", children: "Today" }), _jsx("option", { value: "week", children: "This Week" }), _jsx("option", { value: "month", children: "This Month" }), _jsx("option", { value: "custom", children: "Custom Range" })] })] }), options.dateRange === 'custom' && (_jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "Start Date" }), _jsx("input", { type: "date", value: options.customDateRange.startDate, onChange: (e) => setOptions({
                                                        ...options,
                                                        customDateRange: {
                                                            ...options.customDateRange,
                                                            startDate: e.target.value,
                                                        },
                                                    }), className: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-2", children: "End Date" }), _jsx("input", { type: "date", value: options.customDateRange.endDate, onChange: (e) => setOptions({
                                                        ...options,
                                                        customDateRange: {
                                                            ...options.customDateRange,
                                                            endDate: e.target.value,
                                                        },
                                                    }), className: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" })] })] })), _jsxs("div", { className: "flex items-center", children: [_jsx("input", { type: "checkbox", id: "include-metadata", checked: options.includeMetadata, onChange: (e) => setOptions({ ...options, includeMetadata: e.target.checked }), className: "h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" }), _jsx("label", { htmlFor: "include-metadata", className: "ml-2 block text-sm text-gray-900", children: "Include submission metadata (date, time, user info)" })] })] }), _jsxs("div", { className: "mt-6 flex justify-end gap-2", children: [_jsx("button", { type: "button", onClick: onClose, className: "inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500", children: "Cancel" }), _jsx("button", { type: "button", onClick: handleExport, disabled: loading, className: "inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500", children: loading ? (_jsxs(_Fragment, { children: [_jsxs("svg", { className: "animate-spin -ml-1 mr-2 h-4 w-4 text-white", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", children: [_jsx("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4" }), _jsx("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" })] }), "Exporting..."] })) : ('Export') })] })] }) })] }));
}

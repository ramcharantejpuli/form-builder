import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { formApi } from '../services/api';
export default function FormSubmissions() {
    const { id } = useParams();
    const { data: form } = useQuery({
        queryKey: ['form', id],
        queryFn: () => (id ? formApi.getForm(id) : null),
        enabled: !!id,
    });
    const { data: submissions, isLoading } = useQuery({
        queryKey: ['submissions', id],
        queryFn: () => (id ? formApi.getSubmissions(id) : []),
        enabled: !!id,
    });
    const handleExport = async () => {
        if (!id)
            return;
        try {
            const blob = await formApi.exportSubmissions(id);
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${form?.title || 'form'}-submissions.csv`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        }
        catch (error) {
            console.error('Error exporting submissions:', error);
            alert('Failed to export submissions');
        }
    };
    if (isLoading) {
        return (_jsx("div", { className: "flex items-center justify-center min-h-screen", children: _jsx("div", { className: "text-xl", children: "Loading..." }) }));
    }
    return (_jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8", children: [_jsxs("div", { className: "flex justify-between items-center mb-8", children: [_jsxs("div", { children: [_jsxs("h1", { className: "text-3xl font-bold text-gray-900", children: ["Submissions: ", form?.title] }), _jsxs("p", { className: "mt-2 text-gray-600", children: ["Total submissions: ", submissions?.length || 0] })] }), _jsx("button", { onClick: handleExport, className: "bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700", children: "Export CSV" })] }), submissions?.length === 0 ? (_jsx("div", { className: "text-center py-12", children: _jsx("h3", { className: "text-xl text-gray-600", children: "No submissions yet" }) })) : (_jsx("div", { className: "bg-white shadow-sm rounded-lg overflow-hidden", children: _jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "min-w-full divide-y divide-gray-200", children: [_jsx("thead", { className: "bg-gray-50", children: _jsxs("tr", { children: [_jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Submission Date" }), form?.fields?.map((field) => (_jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: field.label }, field.id)))] }) }), _jsx("tbody", { className: "bg-white divide-y divide-gray-200", children: submissions?.map((submission) => (_jsxs("tr", { children: [_jsx("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500", children: new Date(submission.submittedAt).toLocaleString() }), form?.fields?.map((field) => (_jsx("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-900", children: submission.data[field.id]?.toString() || '-' }, field.id)))] }, submission.id))) })] }) }) }))] }));
}

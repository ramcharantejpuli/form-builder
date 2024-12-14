import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import { formApi } from '../services/api';
import FieldRenderer from '../components/FormFields/FieldRenderer';
export default function FormView() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({});
    const { data: form, isLoading } = useQuery({
        queryKey: ['form', id],
        queryFn: () => (id ? formApi.getForm(id) : null),
        enabled: !!id,
    });
    const submitMutation = useMutation({
        mutationFn: (data) => formApi.submitForm(id, data),
        onSuccess: () => {
            alert('Form submitted successfully!');
            setFormData({});
        },
    });
    if (isLoading) {
        return (_jsx("div", { className: "flex items-center justify-center min-h-screen", children: _jsx("div", { className: "text-xl", children: "Loading..." }) }));
    }
    if (!form) {
        return (_jsx("div", { className: "flex items-center justify-center min-h-screen", children: _jsx("div", { className: "text-xl", children: "Form not found" }) }));
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        // Validate required fields
        const missingFields = form.fields
            .filter((field) => field.required && !formData[field.id])
            .map((field) => field.label);
        if (missingFields.length > 0) {
            alert(`Please fill in the following required fields: ${missingFields.join(', ')}`);
            return;
        }
        submitMutation.mutate(formData);
    };
    return (_jsx("div", { className: "max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8", children: _jsxs("div", { className: "bg-white shadow rounded-lg p-6", children: [_jsxs("div", { className: "mb-8", children: [_jsx("h1", { className: "text-3xl font-bold text-gray-900", children: form.title }), form.description && (_jsx("p", { className: "mt-2 text-gray-600", children: form.description }))] }), _jsxs("form", { onSubmit: handleSubmit, children: [_jsx("div", { className: "space-y-6", children: form.fields?.map((field) => (_jsx("div", { children: _jsx(FieldRenderer, { field: field, value: formData[field.id], onChange: (value) => setFormData((prev) => ({ ...prev, [field.id]: value })) }) }, field.id))) }), _jsx("div", { className: "mt-8", children: _jsx("button", { type: "submit", className: "w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed", disabled: submitMutation.isPending, children: submitMutation.isPending ? 'Submitting...' : 'Submit' }) })] })] }) }));
}

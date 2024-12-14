import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { formApi } from '../../services/api';
import { toast } from 'react-hot-toast';
export default function FormPreview({ form, isShared = false }) {
    const [formData, setFormData] = useState({});
    const handleInputChange = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field.name]: value,
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await formApi.submitForm(form.id, formData);
            toast.success('Form submitted successfully!');
            setFormData({});
        }
        catch (error) {
            toast.error('Failed to submit form');
        }
    };
    const renderField = (field) => {
        const commonProps = {
            id: field.name,
            name: field.name,
            placeholder: field.placeholder,
            required: field.validation?.required,
            onChange: (e) => handleInputChange(field, e.target.value),
            value: formData[field.name] || '',
            className: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm",
        };
        switch (field.type) {
            case 'text':
            case 'email':
            case 'tel':
            case 'url':
                return _jsx("input", { type: field.type, ...commonProps });
            case 'textarea':
                return _jsx("textarea", { ...commonProps, rows: 4 });
            case 'number':
                return (_jsx("input", { type: "number", ...commonProps, min: field.validation?.min, max: field.validation?.max }));
            case 'date':
            case 'time':
                return _jsx("input", { type: field.type, ...commonProps });
            case 'select':
                return (_jsxs("select", { ...commonProps, children: [_jsx("option", { value: "", children: "Select an option" }), field.options?.map((option) => (_jsx("option", { value: option.value, children: option.label }, option.value)))] }));
            case 'radio':
                return (_jsx("div", { className: "mt-1 space-y-2", children: field.options?.map((option) => (_jsxs("div", { className: "flex items-center", children: [_jsx("input", { type: "radio", id: `${field.name}-${option.value}`, name: field.name, value: option.value, checked: formData[field.name] === option.value, onChange: (e) => handleInputChange(field, e.target.value), className: "h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500" }), _jsx("label", { htmlFor: `${field.name}-${option.value}`, className: "ml-2 block text-sm text-gray-700", children: option.label })] }, option.value))) }));
            case 'checkbox':
                return (_jsx("div", { className: "mt-1", children: _jsx("input", { type: "checkbox", ...commonProps, checked: formData[field.name] || false, onChange: (e) => handleInputChange(field, e.target.checked), className: "h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" }) }));
            default:
                return null;
        }
    };
    return (_jsx("div", { className: "max-w-3xl mx-auto px-4 py-8", children: _jsx("div", { className: "bg-white shadow sm:rounded-lg", children: _jsxs("div", { className: "px-4 py-5 sm:p-6", children: [_jsx("h1", { className: "text-2xl font-bold text-gray-900 mb-2", children: form.title }), form.description && (_jsx("p", { className: "text-gray-600 mb-6", children: form.description })), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [form.fields.map((field) => (_jsxs("div", { children: [_jsxs("label", { htmlFor: field.name, className: "block text-sm font-medium text-gray-700", children: [field.label, field.validation?.required && (_jsx("span", { className: "text-red-500 ml-1", children: "*" }))] }), field.description && (_jsx("p", { className: "mt-1 text-sm text-gray-500", children: field.description })), renderField(field)] }, field.id))), _jsx("div", { className: "mt-6", children: _jsx("button", { type: "submit", className: "w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500", children: "Submit" }) })] })] }) }) }));
}

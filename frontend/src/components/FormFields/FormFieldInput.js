import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const FormFieldInput = ({ field, value, onChange, isBuilder = false }) => {
    const handleChange = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (typeof onChange === 'function') {
            const newValue = field.type === 'checkbox' ? e.target.checked : e.target.value;
            console.log('Field input change:', { type: field.type, value: newValue });
            onChange(newValue);
        }
    };
    const renderInput = () => {
        const commonProps = {
            id: field.id,
            name: field.name,
            value: value || '',
            onChange: handleChange,
            placeholder: field.placeholder,
            required: field.required,
            className: "w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500",
            disabled: false,
            'aria-label': field.label
        };
        switch (field.type) {
            case 'text':
                return (_jsx("input", { type: "text", ...commonProps, onClick: (e) => e.stopPropagation() }));
            case 'textarea':
                return (_jsx("textarea", { ...commonProps, rows: 4, onClick: (e) => e.stopPropagation() }));
            case 'number':
                return (_jsx("input", { type: "number", ...commonProps, min: field.validation?.min, max: field.validation?.max, onClick: (e) => e.stopPropagation() }));
            case 'email':
                return (_jsx("input", { type: "email", ...commonProps, onClick: (e) => e.stopPropagation() }));
            case 'tel':
                return (_jsx("input", { type: "tel", ...commonProps, onClick: (e) => e.stopPropagation() }));
            case 'date':
                return (_jsx("input", { type: "date", ...commonProps, onClick: (e) => e.stopPropagation() }));
            case 'time':
                return (_jsx("input", { type: "time", ...commonProps, onClick: (e) => e.stopPropagation() }));
            case 'url':
                return (_jsx("input", { type: "url", ...commonProps, onClick: (e) => e.stopPropagation() }));
            case 'checkbox':
                return (_jsx("input", { type: "checkbox", ...commonProps, checked: value || false, className: "h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded", onClick: (e) => e.stopPropagation() }));
            case 'select':
                return (_jsxs("select", { ...commonProps, onClick: (e) => e.stopPropagation(), children: [_jsx("option", { value: "", children: "Select an option" }), field.options?.map((option) => (_jsx("option", { value: option.value, children: option.label }, option.value)))] }));
            case 'radio':
                return (_jsx("div", { className: "space-y-2", children: field.options?.map((option) => (_jsxs("div", { className: "flex items-center", children: [_jsx("input", { type: "radio", id: `${field.id}-${option.value}`, name: field.name, value: option.value, checked: value === option.value, onChange: handleChange, className: "h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300", onClick: (e) => e.stopPropagation() }), _jsx("label", { htmlFor: `${field.id}-${option.value}`, className: "ml-2", onClick: (e) => e.stopPropagation(), children: option.label })] }, option.value))) }));
            default:
                return (_jsx("input", { type: "text", ...commonProps, onClick: (e) => e.stopPropagation() }));
        }
    };
    return renderInput();
};
export default FormFieldInput;

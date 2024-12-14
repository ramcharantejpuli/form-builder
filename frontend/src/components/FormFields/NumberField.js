import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export default function NumberField({ field, preview, value, onChange }) {
    return (_jsxs("div", { className: "form-field", children: [_jsxs("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: [field.label, field.required && _jsx("span", { className: "text-red-500 ml-1", children: "*" })] }), _jsx("input", { type: "number", placeholder: field.placeholder, value: value || '', onChange: (e) => onChange?.(parseFloat(e.target.value)), disabled: preview, required: field.required, className: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" })] }));
}

import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export default function CheckboxField({ field, preview, value, onChange }) {
    return (_jsxs("div", { className: "form-field", children: [_jsxs("div", { className: "flex items-center", children: [_jsx("input", { type: "checkbox", checked: value || false, onChange: (e) => onChange?.(e.target.checked), disabled: preview, required: field.required, className: "h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" }), _jsxs("label", { className: "ml-2 block text-sm text-gray-900", children: [field.label, field.required && _jsx("span", { className: "text-red-500 ml-1", children: "*" })] })] }), field.placeholder && (_jsx("p", { className: "mt-1 text-sm text-gray-500", children: field.placeholder }))] }));
}

import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import TextField from './TextField';
import NumberField from './NumberField';
import DateField from './DateField';
import CheckboxField from './CheckboxField';
import SelectField from './SelectField';
import RadioField from './RadioField';
export default function FieldRenderer({ field, preview, value, onChange }) {
    switch (field.type) {
        case 'text':
            return (_jsx(TextField, { field: field, preview: preview, value: value, onChange: onChange }));
        case 'number':
            return (_jsx(NumberField, { field: field, preview: preview, value: value, onChange: onChange }));
        case 'date':
            return (_jsx(DateField, { field: field, preview: preview, value: value, onChange: onChange }));
        case 'checkbox':
            return (_jsx(CheckboxField, { field: field, preview: preview, value: value, onChange: onChange }));
        case 'select':
            return (_jsx(SelectField, { field: field, preview: preview, value: value, onChange: onChange }));
        case 'radio':
            return (_jsx(RadioField, { field: field, preview: preview, value: value, onChange: onChange }));
        default:
            return _jsxs("div", { children: ["Unsupported field type: ", field.type] });
    }
}

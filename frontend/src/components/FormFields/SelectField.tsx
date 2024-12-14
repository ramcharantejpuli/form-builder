import { FormField } from '../../types/form';

interface SelectFieldProps {
  field: FormField;
  preview?: boolean;
  value?: string;
  onChange?: (value: string) => void;
}

export default function SelectField({ field, preview, value, onChange }: SelectFieldProps) {
  return (
    <div className="form-field">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {field.label}
        {field.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <select
        value={value || ''}
        onChange={(e) => onChange?.(e.target.value)}
        disabled={preview}
        required={field.required}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
      >
        <option value="">{field.placeholder || 'Select an option'}</option>
        {field.options?.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

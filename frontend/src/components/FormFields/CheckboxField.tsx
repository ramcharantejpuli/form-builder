import { FormField } from '../../types/form';

interface CheckboxFieldProps {
  field: FormField;
  preview?: boolean;
  value?: boolean;
  onChange?: (value: boolean) => void;
}

export default function CheckboxField({ field, preview, value, onChange }: CheckboxFieldProps) {
  return (
    <div className="form-field">
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={value || false}
          onChange={(e) => onChange?.(e.target.checked)}
          disabled={preview}
          required={field.required}
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label className="ml-2 block text-sm text-gray-900">
          {field.label}
          {field.required && <span className="text-red-500 ml-1">*</span>}
        </label>
      </div>
      {field.placeholder && (
        <p className="mt-1 text-sm text-gray-500">{field.placeholder}</p>
      )}
    </div>
  );
}

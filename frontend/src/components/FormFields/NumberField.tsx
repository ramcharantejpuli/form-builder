import { FormField } from '../../types/form';

interface NumberFieldProps {
  field: FormField;
  preview?: boolean;
  value?: number;
  onChange?: (value: number) => void;
}

export default function NumberField({ field, preview, value, onChange }: NumberFieldProps) {
  return (
    <div className="form-field">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {field.label}
        {field.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        type="number"
        placeholder={field.placeholder}
        value={value || ''}
        onChange={(e) => onChange?.(parseFloat(e.target.value))}
        disabled={preview}
        required={field.required}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
      />
    </div>
  );
}

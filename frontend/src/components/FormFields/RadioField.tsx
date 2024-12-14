import { FormField } from '../../types/form';

interface RadioFieldProps {
  field: FormField;
  preview?: boolean;
  value?: string;
  onChange?: (value: string) => void;
}

export default function RadioField({ field, preview, value, onChange }: RadioFieldProps) {
  return (
    <div className="form-field">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {field.label}
        {field.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="space-y-2">
        {field.options?.map((option, index) => (
          <div key={index} className="flex items-center">
            <input
              type="radio"
              id={`${field.id}-${index}`}
              name={field.id}
              value={option}
              checked={value === option}
              onChange={(e) => onChange?.(e.target.value)}
              disabled={preview}
              required={field.required}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
            />
            <label
              htmlFor={`${field.id}-${index}`}
              className="ml-2 block text-sm text-gray-900"
            >
              {option}
            </label>
          </div>
        ))}
      </div>
      {field.placeholder && (
        <p className="mt-1 text-sm text-gray-500">{field.placeholder}</p>
      )}
    </div>
  );
}

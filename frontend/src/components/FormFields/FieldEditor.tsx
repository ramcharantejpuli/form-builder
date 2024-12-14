import { FormField } from '../../types/form';

interface FieldEditorProps {
  field: FormField;
  onUpdate: (updates: Partial<FormField>) => void;
}

export default function FieldEditor({ field, onUpdate }: FieldEditorProps) {
  const handleOptionAdd = () => {
    if (field.options) {
      onUpdate({
        options: [...field.options, `Option ${field.options.length + 1}`],
      });
    } else {
      onUpdate({ options: ['Option 1'] });
    }
  };

  const handleOptionUpdate = (index: number, value: string) => {
    if (field.options) {
      const newOptions = [...field.options];
      newOptions[index] = value;
      onUpdate({ options: newOptions });
    }
  };

  const handleOptionRemove = (index: number) => {
    if (field.options) {
      const newOptions = field.options.filter((_, i) => i !== index);
      onUpdate({ options: newOptions });
    }
  };

  return (
    <div className="space-y-4 mt-4 p-4 bg-gray-50 rounded-md">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Field Label
        </label>
        <input
          type="text"
          value={field.label}
          onChange={(e) => onUpdate({ label: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Placeholder Text
        </label>
        <input
          type="text"
          value={field.placeholder || ''}
          onChange={(e) => onUpdate({ placeholder: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        />
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          checked={field.required}
          onChange={(e) => onUpdate({ required: e.target.checked })}
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label className="ml-2 block text-sm text-gray-900">
          Required Field
        </label>
      </div>

      {(field.type === 'select' || field.type === 'radio') && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Options
          </label>
          <div className="space-y-2">
            {field.options?.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <input
                  type="text"
                  value={option}
                  onChange={(e) => handleOptionUpdate(index, e.target.value)}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
                <button
                  onClick={() => handleOptionRemove(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  ×
                </button>
              </div>
            ))}
            <button
              onClick={handleOptionAdd}
              type="button"
              className="mt-2 inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Add Option
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

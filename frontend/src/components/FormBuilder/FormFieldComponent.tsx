import React, { useState } from 'react';
import { GripVertical, Settings, Trash2 } from 'lucide-react';
import { FormField } from '../../types/form';
import FormFieldInput from '../FormFields/FormFieldInput';
import FieldSettingsDialog from './FieldSettingsDialog';

interface FormFieldComponentProps {
  field: FormField;
  onUpdate: (field: FormField) => void;
  onDelete: () => void;
  isPreview?: boolean;
}

export default function FormFieldComponent({
  field,
  onUpdate,
  onDelete,
  isPreview = false,
}: FormFieldComponentProps) {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const handleFieldChange = (value: any) => {
    const updatedField = {
      ...field,
      value: value
    };
    console.log('Updating field:', updatedField);
    onUpdate(updatedField);
  };

  const handleSettingsUpdate = (updatedSettings: Partial<FormField>) => {
    onUpdate({
      ...field,
      ...updatedSettings,
    });
    setIsSettingsOpen(false);
  };

  return (
    <div className="group relative flex items-center gap-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      {!isPreview && (
        <div className="cursor-move text-gray-400">
          <GripVertical className="h-5 w-5" />
        </div>
      )}

      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-700">
          {field.label}
          {field.validation?.required && <span className="text-red-500">*</span>}
        </label>
        <div className="mt-1">
          <FormFieldInput
            field={field}
            value={field.value}
            onChange={handleFieldChange}
            isBuilder={!isPreview}
          />
        </div>
      </div>

      {!isPreview && (
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsSettingsOpen(true)}
            className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
          >
            <Settings className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onDelete();
            }}
            className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-red-500"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        </div>
      )}

      {isSettingsOpen && (
        <FieldSettingsDialog
          field={field}
          onClose={() => setIsSettingsOpen(false)}
          onUpdate={handleSettingsUpdate}
        />
      )}
    </div>
  );
}

import React from 'react';
import { Dialog } from '@headlessui/react';
import { X } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { FormField, FieldType } from '../../types/form';

interface AddFieldDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (field: FormField) => void;
}

const FIELD_TYPES: { type: FieldType; label: string; description: string }[] = [
  {
    type: 'text',
    label: 'Text Input',
    description: 'Single line text input for short answers',
  },
  {
    type: 'textarea',
    label: 'Text Area',
    description: 'Multi-line text input for longer answers',
  },
  {
    type: 'number',
    label: 'Number',
    description: 'Input field for numerical values',
  },
  {
    type: 'email',
    label: 'Email',
    description: 'Input field for email addresses',
  },
  {
    type: 'tel',
    label: 'Phone',
    description: 'Input field for phone numbers',
  },
  {
    type: 'date',
    label: 'Date',
    description: 'Input field for selecting dates',
  },
  {
    type: 'time',
    label: 'Time',
    description: 'Input field for selecting times',
  },
  {
    type: 'select',
    label: 'Dropdown',
    description: 'Dropdown menu for selecting from predefined options',
  },
  {
    type: 'radio',
    label: 'Radio Buttons',
    description: 'Radio buttons for selecting one option from a list',
  },
  {
    type: 'checkbox',
    label: 'Checkbox',
    description: 'Checkbox for yes/no or true/false selections',
  },
];

export default function AddFieldDialog({
  isOpen,
  onClose,
  onAdd,
}: AddFieldDialogProps) {
  const handleAddField = (type: FieldType) => {
    const newField: FormField = {
      id: uuidv4(),
      type,
      label: `New ${type} field`,
      name: `field_${uuidv4().split('-')[0]}`,
      placeholder: '',
      description: '',
      validation: {
        required: false,
      },
      options: type === 'select' || type === 'radio' ? [
        { label: 'Option 1', value: 'option1' },
        { label: 'Option 2', value: 'option2' },
      ] : undefined,
    };

    onAdd(newField);
    onClose();
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed inset-0 z-10 overflow-y-auto"
    >
      <div className="flex min-h-screen items-center justify-center">
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

        <div className="relative bg-white rounded-lg max-w-2xl w-full mx-4 p-6">
          <div className="flex justify-between items-center mb-6">
            <Dialog.Title className="text-lg font-medium text-gray-900">
              Add Form Field
            </Dialog.Title>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {FIELD_TYPES.map((fieldType) => (
              <button
                key={fieldType.type}
                onClick={() => handleAddField(fieldType.type)}
                className="flex flex-col items-center p-4 border rounded-lg hover:border-indigo-500 hover:bg-indigo-50 transition-colors"
              >
                <span className="text-sm font-medium text-gray-900">
                  {fieldType.label}
                </span>
                <span className="mt-1 text-xs text-gray-500 text-center">
                  {fieldType.description}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </Dialog>
  );
}

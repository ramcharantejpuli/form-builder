import { FormField } from '../../types/form';
import TextField from './TextField';
import NumberField from './NumberField';
import DateField from './DateField';
import CheckboxField from './CheckboxField';
import SelectField from './SelectField';
import RadioField from './RadioField';

interface FieldRendererProps {
  field: FormField;
  preview?: boolean;
  value?: any;
  onChange?: (value: any) => void;
}

export default function FieldRenderer({ field, preview, value, onChange }: FieldRendererProps) {
  switch (field.type) {
    case 'text':
      return (
        <TextField
          field={field}
          preview={preview}
          value={value}
          onChange={onChange}
        />
      );
    case 'number':
      return (
        <NumberField
          field={field}
          preview={preview}
          value={value}
          onChange={onChange}
        />
      );
    case 'date':
      return (
        <DateField
          field={field}
          preview={preview}
          value={value}
          onChange={onChange}
        />
      );
    case 'checkbox':
      return (
        <CheckboxField
          field={field}
          preview={preview}
          value={value}
          onChange={onChange}
        />
      );
    case 'select':
      return (
        <SelectField
          field={field}
          preview={preview}
          value={value}
          onChange={onChange}
        />
      );
    case 'radio':
      return (
        <RadioField
          field={field}
          preview={preview}
          value={value}
          onChange={onChange}
        />
      );
    default:
      return <div>Unsupported field type: {field.type}</div>;
  }
}

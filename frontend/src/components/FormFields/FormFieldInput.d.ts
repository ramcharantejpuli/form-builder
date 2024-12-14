import React from 'react';
import { FormField } from '../../types/form';
interface FormFieldInputProps {
    field: FormField;
    value: any;
    onChange: (value: any) => void;
    isBuilder?: boolean;
}
declare const FormFieldInput: React.FC<FormFieldInputProps>;
export default FormFieldInput;
//# sourceMappingURL=FormFieldInput.d.ts.map
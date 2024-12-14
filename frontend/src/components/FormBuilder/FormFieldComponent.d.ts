import { FormField } from '../../types/form';
interface FormFieldComponentProps {
    field: FormField;
    onUpdate: (field: FormField) => void;
    onDelete: () => void;
    isPreview?: boolean;
}
export default function FormFieldComponent({ field, onUpdate, onDelete, isPreview, }: FormFieldComponentProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=FormFieldComponent.d.ts.map
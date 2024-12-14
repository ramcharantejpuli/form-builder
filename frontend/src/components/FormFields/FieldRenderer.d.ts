import { FormField } from '../../types/form';
interface FieldRendererProps {
    field: FormField;
    preview?: boolean;
    value?: any;
    onChange?: (value: any) => void;
}
export default function FieldRenderer({ field, preview, value, onChange }: FieldRendererProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=FieldRenderer.d.ts.map
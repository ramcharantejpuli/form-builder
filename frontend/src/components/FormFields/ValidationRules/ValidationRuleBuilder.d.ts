import { ValidationRule, FormField } from '../../../types/form';
interface ValidationRuleBuilderProps {
    field: FormField;
    allFields: FormField[];
    onUpdate: (rules: ValidationRule[]) => void;
}
export default function ValidationRuleBuilder({ field, allFields, onUpdate, }: ValidationRuleBuilderProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=ValidationRuleBuilder.d.ts.map
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
export default function ValidationRuleBuilder({ field, allFields, onUpdate, }) {
    const [rules, setRules] = useState(field.validationRules || []);
    const addRule = () => {
        const newRule = {
            id: `rule_${Date.now()}`,
            type: 'required',
            conditions: [],
            message: '',
        };
        setRules([...rules, newRule]);
        onUpdate([...rules, newRule]);
    };
    const updateRule = (index, updates) => {
        const updatedRules = rules.map((rule, i) => i === index ? { ...rule, ...updates } : rule);
        setRules(updatedRules);
        onUpdate(updatedRules);
    };
    const removeRule = (index) => {
        const updatedRules = rules.filter((_, i) => i !== index);
        setRules(updatedRules);
        onUpdate(updatedRules);
    };
    const addCondition = (ruleIndex) => {
        const newCondition = {
            id: `condition_${Date.now()}`,
            field: '',
            operator: 'equals',
            value: '',
        };
        const updatedRules = rules.map((rule, i) => i === ruleIndex
            ? { ...rule, conditions: [...(rule.conditions || []), newCondition] }
            : rule);
        setRules(updatedRules);
        onUpdate(updatedRules);
    };
    const updateCondition = (ruleIndex, conditionIndex, updates) => {
        const updatedRules = rules.map((rule, i) => i === ruleIndex
            ? {
                ...rule,
                conditions: rule.conditions.map((condition, j) => j === conditionIndex ? { ...condition, ...updates } : condition),
            }
            : rule);
        setRules(updatedRules);
        onUpdate(updatedRules);
    };
    const removeCondition = (ruleIndex, conditionIndex) => {
        const updatedRules = rules.map((rule, i) => i === ruleIndex
            ? {
                ...rule,
                conditions: rule.conditions.filter((_, j) => j !== conditionIndex),
            }
            : rule);
        setRules(updatedRules);
        onUpdate(updatedRules);
    };
    return (_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsx("h3", { className: "text-lg font-medium text-gray-900", children: "Validation Rules" }), _jsx("button", { type: "button", onClick: addRule, className: "inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500", children: "Add Rule" })] }), rules.map((rule, ruleIndex) => (_jsxs("div", { className: "border border-gray-200 rounded-lg p-4 space-y-4", children: [_jsxs("div", { className: "flex justify-between items-start", children: [_jsxs("div", { className: "space-y-2 flex-1", children: [_jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700", children: "Rule Type" }), _jsxs("select", { value: rule.type, onChange: (e) => updateRule(ruleIndex, { type: e.target.value }), className: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm", children: [_jsx("option", { value: "required", children: "Required" }), _jsx("option", { value: "email", children: "Email" }), _jsx("option", { value: "url", children: "URL" }), _jsx("option", { value: "pattern", children: "Pattern" }), _jsx("option", { value: "minLength", children: "Min Length" }), _jsx("option", { value: "maxLength", children: "Max Length" }), _jsx("option", { value: "min", children: "Min Value" }), _jsx("option", { value: "max", children: "Max Value" }), _jsx("option", { value: "custom", children: "Custom" })] })] }), (rule.type === 'pattern' || rule.type === 'custom') && (_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700", children: rule.type === 'pattern' ? 'Pattern' : 'Custom Rule' }), _jsx("input", { type: "text", value: rule.pattern || '', onChange: (e) => updateRule(ruleIndex, { pattern: e.target.value }), className: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm", placeholder: rule.type === 'pattern' ? '^[A-Za-z]+$' : 'value.length > 0' })] })), (rule.type === 'minLength' ||
                                                rule.type === 'maxLength' ||
                                                rule.type === 'min' ||
                                                rule.type === 'max') && (_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700", children: "Value" }), _jsx("input", { type: "number", value: rule.value || '', onChange: (e) => updateRule(ruleIndex, { value: e.target.value }), className: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" })] }))] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700", children: "Error Message" }), _jsx("input", { type: "text", value: rule.message, onChange: (e) => updateRule(ruleIndex, { message: e.target.value }), className: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm", placeholder: "Please enter a valid value" })] })] }), _jsx("button", { type: "button", onClick: () => removeRule(ruleIndex), className: "ml-4 text-gray-400 hover:text-gray-500", children: _jsx("svg", { className: "h-5 w-5", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", children: _jsx("path", { fillRule: "evenodd", d: "M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z", clipRule: "evenodd" }) }) })] }), _jsxs("div", { className: "mt-4", children: [_jsxs("div", { className: "flex justify-between items-center mb-2", children: [_jsx("h4", { className: "text-sm font-medium text-gray-700", children: "Conditions" }), _jsx("button", { type: "button", onClick: () => addCondition(ruleIndex), className: "inline-flex items-center px-2 py-1 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500", children: "Add Condition" })] }), rule.conditions.map((condition, conditionIndex) => (_jsxs("div", { className: "grid grid-cols-3 gap-2 items-start mt-2", children: [_jsxs("select", { value: condition.field, onChange: (e) => updateCondition(ruleIndex, conditionIndex, {
                                            field: e.target.value,
                                        }), className: "block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-xs", children: [_jsx("option", { value: "", children: "Select Field" }), allFields
                                                .filter((f) => f.id !== field.id)
                                                .map((f) => (_jsx("option", { value: f.id, children: f.label }, f.id)))] }), _jsxs("select", { value: condition.operator, onChange: (e) => updateCondition(ruleIndex, conditionIndex, {
                                            operator: e.target.value,
                                        }), className: "block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-xs", children: [_jsx("option", { value: "equals", children: "Equals" }), _jsx("option", { value: "not_equals", children: "Not Equals" }), _jsx("option", { value: "contains", children: "Contains" }), _jsx("option", { value: "not_contains", children: "Not Contains" }), _jsx("option", { value: "greater_than", children: "Greater Than" }), _jsx("option", { value: "less_than", children: "Less Than" }), _jsx("option", { value: "is_empty", children: "Is Empty" }), _jsx("option", { value: "is_not_empty", children: "Is Not Empty" })] }), condition.operator !== 'is_empty' &&
                                        condition.operator !== 'is_not_empty' && (_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("input", { type: "text", value: condition.value, onChange: (e) => updateCondition(ruleIndex, conditionIndex, {
                                                    value: e.target.value,
                                                }), className: "block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-xs" }), _jsx("button", { type: "button", onClick: () => removeCondition(ruleIndex, conditionIndex), className: "text-gray-400 hover:text-gray-500", children: _jsx("svg", { className: "h-4 w-4", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", children: _jsx("path", { fillRule: "evenodd", d: "M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z", clipRule: "evenodd" }) }) })] }))] }, condition.id)))] })] }, rule.id)))] }));
}

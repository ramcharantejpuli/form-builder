import React, { useState } from 'react';
import { ValidationRule, FormField, Condition } from '../../../types/form';

interface ValidationRuleBuilderProps {
  field: FormField;
  allFields: FormField[];
  onUpdate: (rules: ValidationRule[]) => void;
}

export default function ValidationRuleBuilder({
  field,
  allFields,
  onUpdate,
}: ValidationRuleBuilderProps) {
  const [rules, setRules] = useState<ValidationRule[]>(field.validationRules || []);

  const addRule = () => {
    const newRule: ValidationRule = {
      id: `rule_${Date.now()}`,
      type: 'required',
      conditions: [],
      message: '',
    };
    setRules([...rules, newRule]);
    onUpdate([...rules, newRule]);
  };

  const updateRule = (index: number, updates: Partial<ValidationRule>) => {
    const updatedRules = rules.map((rule, i) =>
      i === index ? { ...rule, ...updates } : rule
    );
    setRules(updatedRules);
    onUpdate(updatedRules);
  };

  const removeRule = (index: number) => {
    const updatedRules = rules.filter((_, i) => i !== index);
    setRules(updatedRules);
    onUpdate(updatedRules);
  };

  const addCondition = (ruleIndex: number) => {
    const newCondition: Condition = {
      id: `condition_${Date.now()}`,
      field: '',
      operator: 'equals',
      value: '',
    };
    const updatedRules = rules.map((rule, i) =>
      i === ruleIndex
        ? { ...rule, conditions: [...(rule.conditions || []), newCondition] }
        : rule
    );
    setRules(updatedRules);
    onUpdate(updatedRules);
  };

  const updateCondition = (
    ruleIndex: number,
    conditionIndex: number,
    updates: Partial<Condition>
  ) => {
    const updatedRules = rules.map((rule, i) =>
      i === ruleIndex
        ? {
            ...rule,
            conditions: rule.conditions.map((condition, j) =>
              j === conditionIndex ? { ...condition, ...updates } : condition
            ),
          }
        : rule
    );
    setRules(updatedRules);
    onUpdate(updatedRules);
  };

  const removeCondition = (ruleIndex: number, conditionIndex: number) => {
    const updatedRules = rules.map((rule, i) =>
      i === ruleIndex
        ? {
            ...rule,
            conditions: rule.conditions.filter((_, j) => j !== conditionIndex),
          }
        : rule
    );
    setRules(updatedRules);
    onUpdate(updatedRules);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Validation Rules</h3>
        <button
          type="button"
          onClick={addRule}
          className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Add Rule
        </button>
      </div>

      {rules.map((rule, ruleIndex) => (
        <div
          key={rule.id}
          className="border border-gray-200 rounded-lg p-4 space-y-4"
        >
          <div className="flex justify-between items-start">
            <div className="space-y-2 flex-1">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Rule Type
                  </label>
                  <select
                    value={rule.type}
                    onChange={(e) =>
                      updateRule(ruleIndex, { type: e.target.value as ValidationRule['type'] })
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  >
                    <option value="required">Required</option>
                    <option value="email">Email</option>
                    <option value="url">URL</option>
                    <option value="pattern">Pattern</option>
                    <option value="minLength">Min Length</option>
                    <option value="maxLength">Max Length</option>
                    <option value="min">Min Value</option>
                    <option value="max">Max Value</option>
                    <option value="custom">Custom</option>
                  </select>
                </div>

                {(rule.type === 'pattern' || rule.type === 'custom') && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      {rule.type === 'pattern' ? 'Pattern' : 'Custom Rule'}
                    </label>
                    <input
                      type="text"
                      value={rule.pattern || ''}
                      onChange={(e) =>
                        updateRule(ruleIndex, { pattern: e.target.value })
                      }
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      placeholder={rule.type === 'pattern' ? '^[A-Za-z]+$' : 'value.length > 0'}
                    />
                  </div>
                )}

                {(rule.type === 'minLength' ||
                  rule.type === 'maxLength' ||
                  rule.type === 'min' ||
                  rule.type === 'max') && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Value
                    </label>
                    <input
                      type="number"
                      value={rule.value || ''}
                      onChange={(e) =>
                        updateRule(ruleIndex, { value: e.target.value })
                      }
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Error Message
                </label>
                <input
                  type="text"
                  value={rule.message}
                  onChange={(e) =>
                    updateRule(ruleIndex, { message: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="Please enter a valid value"
                />
              </div>
            </div>

            <button
              type="button"
              onClick={() => removeRule(ruleIndex)}
              className="ml-4 text-gray-400 hover:text-gray-500"
            >
              <svg
                className="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>

          {/* Conditions */}
          <div className="mt-4">
            <div className="flex justify-between items-center mb-2">
              <h4 className="text-sm font-medium text-gray-700">Conditions</h4>
              <button
                type="button"
                onClick={() => addCondition(ruleIndex)}
                className="inline-flex items-center px-2 py-1 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Add Condition
              </button>
            </div>

            {rule.conditions.map((condition, conditionIndex) => (
              <div
                key={condition.id}
                className="grid grid-cols-3 gap-2 items-start mt-2"
              >
                <select
                  value={condition.field}
                  onChange={(e) =>
                    updateCondition(ruleIndex, conditionIndex, {
                      field: e.target.value,
                    })
                  }
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-xs"
                >
                  <option value="">Select Field</option>
                  {allFields
                    .filter((f) => f.id !== field.id)
                    .map((f) => (
                      <option key={f.id} value={f.id}>
                        {f.label}
                      </option>
                    ))}
                </select>

                <select
                  value={condition.operator}
                  onChange={(e) =>
                    updateCondition(ruleIndex, conditionIndex, {
                      operator: e.target.value as Condition['operator'],
                    })
                  }
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-xs"
                >
                  <option value="equals">Equals</option>
                  <option value="not_equals">Not Equals</option>
                  <option value="contains">Contains</option>
                  <option value="not_contains">Not Contains</option>
                  <option value="greater_than">Greater Than</option>
                  <option value="less_than">Less Than</option>
                  <option value="is_empty">Is Empty</option>
                  <option value="is_not_empty">Is Not Empty</option>
                </select>

                {condition.operator !== 'is_empty' &&
                  condition.operator !== 'is_not_empty' && (
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={condition.value}
                        onChange={(e) =>
                          updateCondition(ruleIndex, conditionIndex, {
                            value: e.target.value,
                          })
                        }
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-xs"
                      />
                      <button
                        type="button"
                        onClick={() => removeCondition(ruleIndex, conditionIndex)}
                        className="text-gray-400 hover:text-gray-500"
                      >
                        <svg
                          className="h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>
                  )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

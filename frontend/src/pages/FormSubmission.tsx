import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { API_URL } from '../config';

interface FormField {
  id: string;
  label: string;
  type: string;
  required: boolean;
  options?: string[];
}

interface Form {
  id: string;
  title: string;
  fields: FormField[];
}

const FormSubmission: React.FC = () => {
  const { formId } = useParams<{ formId: string }>();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Record<string, string>>({});

  const { data: form, isLoading } = useQuery<Form>({
    queryKey: ['form', formId],
    queryFn: async () => {
      const response = await axios.get(`${API_URL}/forms/${formId}`, {
        withCredentials: true
      });
      return response.data;
    }
  });

  const submitMutation = useMutation({
    mutationFn: async (data: Record<string, string>) => {
      await axios.post(
        `${API_URL}/forms/${formId}/submissions`,
        data,
        { withCredentials: true }
      );
    },
    onSuccess: () => {
      toast.success('Form submitted successfully!');
      navigate('/');
    },
    onError: () => {
      toast.error('Failed to submit form');
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitMutation.mutate(formData);
  };

  const handleInputChange = (fieldId: string, value: string) => {
    setFormData(prev => ({ ...prev, [fieldId]: value }));
  };

  if (isLoading) return <div className="flex justify-center p-8">Loading...</div>;
  if (!form) return <div className="text-red-500 p-4">Form not found</div>;

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">{form.title}</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {form.fields.map((field) => (
          <div key={field.id} className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              {field.label}
              {field.required && <span className="text-red-500">*</span>}
            </label>
            {field.type === 'select' && field.options ? (
              <select
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={formData[field.id] || ''}
                onChange={(e) => handleInputChange(field.id, e.target.value)}
                required={field.required}
              >
                <option value="">Select an option</option>
                {field.options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={field.type}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={formData[field.id] || ''}
                onChange={(e) => handleInputChange(field.id, e.target.value)}
                required={field.required}
              />
            )}
          </div>
        ))}
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            disabled={submitMutation.isPending}
          >
            {submitMutation.isPending ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormSubmission;

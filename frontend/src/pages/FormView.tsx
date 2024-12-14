import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import { formApi } from '../services/api';
import FieldRenderer from '../components/FormFields/FieldRenderer';
import { Form } from '../types/form';

export default function FormView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Record<string, any>>({});

  const { data: form, isLoading } = useQuery<Form>({
    queryKey: ['form', id],
    queryFn: () => (id ? formApi.getForm(id) : null),
    enabled: !!id,
  });

  const submitMutation = useMutation({
    mutationFn: (data: Record<string, any>) =>
      formApi.submitForm(id!, data),
    onSuccess: () => {
      alert('Form submitted successfully!');
      setFormData({});
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (!form) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Form not found</div>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    const missingFields = form.fields
      .filter((field) => field.required && !formData[field.id])
      .map((field) => field.label);

    if (missingFields.length > 0) {
      alert(`Please fill in the following required fields: ${missingFields.join(', ')}`);
      return;
    }

    submitMutation.mutate(formData);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white shadow rounded-lg p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">{form.title}</h1>
          {form.description && (
            <p className="mt-2 text-gray-600">{form.description}</p>
          )}
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            {form.fields?.map((field) => (
              <div key={field.id}>
                <FieldRenderer
                  field={field}
                  value={formData[field.id]}
                  onChange={(value) =>
                    setFormData((prev) => ({ ...prev, [field.id]: value }))
                  }
                />
              </div>
            ))}
          </div>

          <div className="mt-8">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={submitMutation.isPending}
            >
              {submitMutation.isPending ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

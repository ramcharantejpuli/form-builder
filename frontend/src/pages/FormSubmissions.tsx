import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { formApi } from '../services/api';

export default function FormSubmissions() {
  const { id } = useParams();

  const { data: form } = useQuery({
    queryKey: ['form', id],
    queryFn: () => (id ? formApi.getForm(id) : null),
    enabled: !!id,
  });

  const { data: submissions, isLoading } = useQuery({
    queryKey: ['submissions', id],
    queryFn: () => (id ? formApi.getSubmissions(id) : []),
    enabled: !!id,
  });

  const handleExport = async () => {
    if (!id) return;
    
    try {
      const blob = await formApi.exportSubmissions(id);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${form?.title || 'form'}-submissions.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error exporting submissions:', error);
      alert('Failed to export submissions');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Submissions: {form?.title}
          </h1>
          <p className="mt-2 text-gray-600">
            Total submissions: {submissions?.length || 0}
          </p>
        </div>
        <button
          onClick={handleExport}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Export CSV
        </button>
      </div>

      {submissions?.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-xl text-gray-600">No submissions yet</h3>
        </div>
      ) : (
        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Submission Date
                  </th>
                  {form?.fields?.map((field) => (
                    <th
                      key={field.id}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {field.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {submissions?.map((submission) => (
                  <tr key={submission.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(submission.submittedAt).toLocaleString()}
                    </td>
                    {form?.fields?.map((field) => (
                      <td
                        key={field.id}
                        className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                      >
                        {submission.data[field.id]?.toString() || '-'}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

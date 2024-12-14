import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { API_URL } from '../config';

interface Form {
  id: string;
  title: string;
  createdAt: string;
}

const FormList: React.FC = () => {
  const { data: forms, isLoading, error } = useQuery<Form[]>({
    queryKey: ['forms'],
    queryFn: async () => {
      const response = await axios.get(`${API_URL}/forms`, {
        withCredentials: true
      });
      return response.data;
    }
  });

  if (isLoading) return <div className="flex justify-center p-8">Loading...</div>;
  if (error) return <div className="text-red-500 p-4">Error loading forms</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Forms</h1>
        <Link
          to="/forms/new"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Create New Form
        </Link>
      </div>

      {forms?.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No forms created yet.</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {forms?.map((form) => (
            <div
              key={form.id}
              className="border rounded-lg p-4 hover:shadow-lg transition-shadow"
            >
              <h2 className="text-xl font-semibold mb-2">{form.title}</h2>
              <p className="text-gray-500 text-sm mb-4">
                Created: {new Date(form.createdAt).toLocaleDateString()}
              </p>
              <div className="flex gap-2">
                <Link
                  to={`/forms/${form.id}`}
                  className="text-blue-500 hover:text-blue-600"
                >
                  Edit
                </Link>
                <Link
                  to={`/forms/${form.id}/submissions`}
                  className="text-green-500 hover:text-green-600"
                >
                  View Submissions
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FormList;

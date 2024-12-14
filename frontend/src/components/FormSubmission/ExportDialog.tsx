import React, { useState } from 'react';
import { ExportFormat, ExportOptions, DateRange } from '../../types/form';
import { formApi } from '../../services/api';

interface ExportDialogProps {
  isOpen: boolean;
  onClose: () => void;
  formId: string;
}

export default function ExportDialog({ isOpen, onClose, formId }: ExportDialogProps) {
  const [format, setFormat] = useState<ExportFormat>('csv');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [options, setOptions] = useState<ExportOptions>({
    includeMetadata: true,
    dateRange: 'all',
    customDateRange: {
      startDate: '',
      endDate: '',
    },
    fields: [],
  });

  const handleExport = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await formApi.exportSubmissions(formId, format, options);
      
      // Create a blob URL and trigger download
      const blob = new Blob([response], { type: getContentType(format) });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `form-submissions.${format}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      onClose();
    } catch (err) {
      setError('Failed to export submissions. Please try again.');
      console.error('Export error:', err);
    } finally {
      setLoading(false);
    }
  };

  const getContentType = (format: ExportFormat): string => {
    switch (format) {
      case 'csv':
        return 'text/csv';
      case 'excel':
        return 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
      case 'pdf':
        return 'application/pdf';
      default:
        return 'application/octet-stream';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-lg w-full">
        <h2 className="text-lg font-medium mb-4">Export Submissions</h2>

        {error && (
          <div className="mb-4 p-2 bg-red-50 text-red-500 rounded">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Export Format
            </label>
            <select
              value={format}
              onChange={(e) => setFormat(e.target.value as ExportFormat)}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              disabled={loading}
            >
              <option value="csv">CSV</option>
              <option value="excel">Excel</option>
              <option value="pdf">PDF</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date Range
            </label>
            <select
              value={options.dateRange}
              onChange={(e) =>
                setOptions({ ...options, dateRange: e.target.value as ExportOptions['dateRange'] })
              }
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              disabled={loading}
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="custom">Custom Range</option>
            </select>
          </div>

          {options.dateRange === 'custom' && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Start Date
                </label>
                <input
                  type="date"
                  value={options.customDateRange.startDate}
                  onChange={(e) =>
                    setOptions({
                      ...options,
                      customDateRange: {
                        ...options.customDateRange,
                        startDate: e.target.value,
                      },
                    })
                  }
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  disabled={loading}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  End Date
                </label>
                <input
                  type="date"
                  value={options.customDateRange.endDate}
                  onChange={(e) =>
                    setOptions({
                      ...options,
                      customDateRange: {
                        ...options.customDateRange,
                        endDate: e.target.value,
                      },
                    })
                  }
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  disabled={loading}
                />
              </div>
            </div>
          )}

          <div className="flex items-center">
            <input
              type="checkbox"
              id="includeMetadata"
              checked={options.includeMetadata}
              onChange={(e) =>
                setOptions({ ...options, includeMetadata: e.target.checked })
              }
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              disabled={loading}
            />
            <label
              htmlFor="includeMetadata"
              className="ml-2 block text-sm text-gray-700"
            >
              Include Metadata (submission date, user info)
            </label>
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleExport}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            disabled={loading}
          >
            {loading ? 'Exporting...' : 'Export'}
          </button>
        </div>
      </div>
    </div>
  );
}

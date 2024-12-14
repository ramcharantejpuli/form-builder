import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { toast } from 'react-hot-toast';
import { formApi } from '../../services/api';
import { ShareSettings } from '../../types/form';

interface ShareFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  formId: string;
  currentSettings: ShareSettings;
}

export default function ShareFormDialog({
  isOpen,
  onClose,
  formId,
  currentSettings,
}: ShareFormDialogProps) {
  const [settings, setSettings] = useState<ShareSettings>(currentSettings);
  const [shareLink, setShareLink] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const handleGenerateLink = async () => {
    setLoading(true);
    try {
      const response = await formApi.generateShareLink(formId);
      setShareLink(response.shareLink);
      toast.success('Share link generated successfully!');
    } catch (error) {
      toast.error('Failed to generate share link');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveSettings = async () => {
    setLoading(true);
    try {
      await formApi.updateShareSettings(formId, settings);
      toast.success('Share settings updated successfully!');
      onClose();
    } catch (error) {
      toast.error('Failed to update share settings');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareLink);
      toast.success('Link copied to clipboard!');
    } catch (error) {
      toast.error('Failed to copy link');
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-lg rounded-lg bg-white p-6">
          <Dialog.Title className="text-lg font-medium leading-6 text-gray-900 mb-4">
            Share Form
          </Dialog.Title>

          <div className="space-y-4">
            {/* Access Settings */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Who can access this form?
              </label>
              <select
                value={settings.accessLevel}
                onChange={(e) =>
                  setSettings({ ...settings, accessLevel: e.target.value as ShareSettings['accessLevel'] })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option value="private">Private - Only me</option>
                <option value="restricted">Restricted - Anyone with the link</option>
                <option value="public">Public - Anyone can access</option>
              </select>
            </div>

            {/* Submission Settings */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Submission Settings
              </label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={settings.allowSubmissions}
                    onChange={(e) =>
                      setSettings({ ...settings, allowSubmissions: e.target.checked })
                    }
                    className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 h-4 w-4"
                  />
                  <span className="ml-2 text-sm text-gray-600">Allow form submissions</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={settings.requireAuth}
                    onChange={(e) =>
                      setSettings({ ...settings, requireAuth: e.target.checked })
                    }
                    className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 h-4 w-4"
                  />
                  <span className="ml-2 text-sm text-gray-600">Require authentication to submit</span>
                </label>
              </div>
            </div>

            {/* Share Link */}
            {settings.accessLevel !== 'private' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Share Link
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={shareLink}
                    readOnly
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="Generate a share link..."
                  />
                  <button
                    type="button"
                    onClick={handleGenerateLink}
                    disabled={loading}
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Generate
                  </button>
                  {shareLink && (
                    <button
                      type="button"
                      onClick={copyToClipboard}
                      className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Copy
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="mt-6 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSaveSettings}
              disabled={loading}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Save Settings
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}

import { Head, useForm, usePage, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { useState } from 'react';
import { toast } from 'react-toastify';

export default function EditAbout() {
  const { content, success, errors } = usePage().props;

  const { data, setData, post, processing, reset } = useForm({
    mission_text: content?.mission_text || '',
    years_experience: content?.years_experience || 0,
    global_clients: content?.global_clients || 0,
    other_stats: content?.other_stats
      ? JSON.stringify(content.other_stats, null, 2)
      : '{\n  "projects_completed": 0,\n  "team_members": 0,\n  "awards_won": 0\n}',
    image: null,
    _method: 'PUT',
  });

  const [preview, setPreview] = useState(
    content?.image_path ? `/storage/${content.image_path}` : null
  );

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setData('image', file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const submit = (e) => {
    e.preventDefault();

    post(route('admin.aboutContent.update'), {
      preserveScroll: true,
      onSuccess: () => {
        reset('image');
        setPreview(null);
        toast.success('About content updated successfully!');
      },
      onError: () => {
        toast.error('Please correct the errors in the form.');
      },
    });
  };

  const handleRemoveImage = () => {
    if (!confirm('Are you sure you want to remove the image permanently?')) return;

    post(route('admin.aboutContent.image.destroy'), {
      method: 'delete',
      preserveScroll: true,
      onSuccess: () => {
        setPreview(null);
        toast.success('Image removed successfully.');
      },
      onError: () => toast.error('Failed to remove image.'),
    });
  };

  const handleCancel = () => {
    router.visit(route('admin.dashboard')); // or wherever you want to go back
  };

  return (
    <AdminLayout>
      <Head title="Edit About Content" />

      <div className="py-6">
       <div className="w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Edit About Page Content</h1>
            <p className="mt-1 text-sm text-gray-600">
              Update your company's mission, stats, and hero image.
            </p>
          </div>

          {/* Success Message */}
          {success && (
            <div className="mb-6 rounded-lg bg-green-50 p-4 border border-green-200 text-green-800 text-sm">
              {success}
            </div>
          )}

          {/* Main Form Card */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">About Section Details</h2>
            </div>

            <form onSubmit={submit} className="p-6 space-y-8">
              {/* Mission Text */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mission / Story Text *
                </label>
                <textarea
                  rows={6}
                  value={data.mission_text}
                  onChange={(e) => setData('mission_text', e.target.value)}
                  placeholder="Tell your company's story, mission, vision..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
                {errors.mission_text && (
                  <p className="mt-1 text-sm text-red-600">{errors.mission_text}</p>
                )}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Years of Experience *
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={data.years_experience}
                    onChange={(e) => setData('years_experience', Number(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  {errors.years_experience && (
                    <p className="mt-1 text-sm text-red-600">{errors.years_experience}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Global Clients Served *
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="10000"
                    value={data.global_clients}
                    onChange={(e) => setData('global_clients', Number(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  {errors.global_clients && (
                    <p className="mt-1 text-sm text-red-600">{errors.global_clients}</p>
                  )}
                </div>
              </div>

              {/* Other Stats (JSON) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Statistics (JSON)
                </label>
                <textarea
                  rows={5}
                  value={data.other_stats}
                  onChange={(e) => setData('other_stats', e.target.value)}
                  placeholder='Example:\n{\n  "projects_completed": 150,\n  "team_members": 25\n}'
                  className="w-full px-4 py-3 font-mono text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
                {errors.other_stats && (
                  <p className="mt-1 text-sm text-red-600">{errors.other_stats}</p>
                )}
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hero / About Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                />
                {errors.image && (
                  <p className="mt-1 text-sm text-red-600">{errors.image}</p>
                )}

                {preview && (
                  <div className="mt-4">
                    <div className="inline-block border border-gray-300 rounded-md overflow-hidden shadow-sm">
                      <img
                        src={preview}
                        alt="Preview"
                        className="max-h-64 w-auto object-contain"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Form Actions */}
              <div className="flex flex-col sm:flex-row justify-end gap-4 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-6 py-2.5 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  Cancel
                </button>

                {preview && (
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    disabled={processing}
                    className="px-6 py-2.5 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50"
                  >
                    Remove Image
                  </button>
                )}

                <button
                  type="submit"
                  disabled={processing}
                  className="px-6 py-2.5 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
                >
                  {processing ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
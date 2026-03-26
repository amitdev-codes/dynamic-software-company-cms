import { Head } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function MediaIndex() {
    return (
        <AdminLayout title="Media Library">
            <Head title="Media" />
            
            <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4">Media Library</h2>
                <p className="text-gray-600">Media management coming soon...</p>
            </div>
        </AdminLayout>
    );
}
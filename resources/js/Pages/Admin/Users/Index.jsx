import { Head } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function UsersIndex({ users }) {
    return (
        <AdminLayout title="Users Management">
            <Head title="Users" />
            
            <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4">All Users</h2>
                <p className="text-gray-600">Users management coming soon...</p>
            </div>
        </AdminLayout>
    );
}
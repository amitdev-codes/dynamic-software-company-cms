import { Head } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";

import ServiceForm from "@/Pages/Admin/Services/ServiceForm.jsx";

export default function Edit({ service }) {
    return (
        <AdminLayout title="Edit Service">
            <Head title="Edit Service" />

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow w-full">
                <h2 className="text-xl font-semibold mb-6">
                    Edit Service
                </h2>

                <ServiceForm service={service} />
            </div>
        </AdminLayout>
    );
}

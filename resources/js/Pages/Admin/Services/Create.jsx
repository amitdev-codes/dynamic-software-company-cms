import { Head } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import ServiceForm from "@/Pages/Admin/Services/ServiceForm.jsx";


export default function Create() {
    return (
        <AdminLayout title="Create Service">
            <Head title="Create Service" />

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow w-full">
                <h2 className="text-xl font-semibold mb-6">
                    Create Service
                </h2>

                <ServiceForm />
            </div>
        </AdminLayout>
    );
}

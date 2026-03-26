import { Head } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import ProjectForm from "@/Pages/Admin/Projects/ProjectForm.jsx";


export default function Create() {
    return (
        <AdminLayout title="Create Project">
            <Head title="Create Project" />

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow w-full">
                <h2 className="text-xl font-semibold mb-6">
                    Create Project
                </h2>

                <ProjectForm />
            </div>
        </AdminLayout>
    );
}

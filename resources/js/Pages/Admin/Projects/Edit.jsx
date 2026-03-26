import { Head } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import ProjectForm from "@/Pages/Admin/Projects/ProjectForm.jsx";


export default function Edit({ project }) {
    return (
        <AdminLayout title="Edit Project">
            <Head title="Edit Project" />

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow w-full">
                <h2 className="text-xl font-semibold mb-6">
                    Edit Project
                </h2>

                <ProjectForm project={project} />
            </div>
        </AdminLayout>
    );
}

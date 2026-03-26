import { Head, Link, router } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import { BiEdit,BiTrash } from "react-icons/bi";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);
function getColorForTechnology(techName) {
    const colors = [
        'bg-blue-500', 'bg-red-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500',
        'bg-pink-500', 'bg-indigo-500', 'bg-teal-500', 'bg-orange-500', 'bg-gray-500'
    ];

    // Generate a hash code from the technology name
    let hash = 0;
    for (let i = 0; i < techName.length; i++) {
        hash = techName.charCodeAt(i) + ((hash << 5) - hash);
    }

    // Ensure that the index is within the range of the colors array
    const colorIndex = Math.abs(hash) % colors.length;

    return colors[colorIndex]; // Return the color from the array based on the hash
}
export default function Index({ projects }) {

    const deleteProject = (id) => {
        MySwal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "Cancel",
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route("admin.projects.destroy", id), {
                    onSuccess: () => {
                        MySwal.fire(
                            "Deleted!",
                            "Project has been deleted.",
                            "success"
                        );
                    },
                    onError: () => {
                        MySwal.fire(
                            "Error!",
                            "Something went wrong.",
                            "error"
                        );
                    },
                });
            }
        });
    };

    return (
        <AdminLayout title="Projects">
            <Head title="Projects" />
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-6">

                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">Projects</h2>
                    <Link
                        href={route("admin.projects.create")}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-sm"
                    >
                        + Create
                    </Link>
                </div>

                <div className="overflow-x-auto bg-white dark:bg-gray-900 rounded-lg shadow p-6">
                    <table className="w-full border border-gray-200">
                        <thead className="bg-gray-100 dark:bg-gray-800">
                        <tr className="text-left text-sm text-gray-700 dark:text-gray-300">
                            <th className="p-3">Logo</th>
                            <th className="p-3">Title</th>
                            <th className="p-3">Category</th>
                            <th className="p-3">Description</th>
                            <th className="p-3">Tech Stack</th>
                            <th className="p-3">Order</th>
                            <th className="p-3 text-right">Actions</th>
                        </tr>
                        </thead>

                        <tbody>
                        {projects.map((t) => (
                            <tr key={t.id} className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800">
                                <td className="p-3 text-gray-600 dark:text-gray-200">{t.logo}</td>
                                <td className="p-3 text-gray-600 dark:text-gray-200">{t.title}</td>
                                <td className="p-3 text-gray-600 dark:text-gray-200">{t.category}</td>
                                <td className="p-3 text-gray-600 dark:text-gray-200">{t.description}</td>

                                <td className="p-3">
                                    <div className="flex flex-wrap gap-1">
                                        {t.technologies &&
                                            Object.entries(t.technologies).map(([key, value]) => (
                                                <div key={key} className="flex items-center">
                            <span className={`${getColorForTechnology(value)} text-white text-xs py-1 px-2 rounded-full`}>
                                {value}
                            </span>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </td>

                                <td className="p-3 text-gray-600 dark:text-gray-200">{t.order}</td>

                                <td className="p-3 text-right">
                                    <div className="flex justify-end gap-3">
                                        <Link
                                            href={route("admin.projects.edit", t.id)}
                                            className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-200"
                                        >
                                            <BiEdit className="w-4 h-4" />
                                        </Link>

                                        <button
                                            onClick={() => deleteProject(t.id)}
                                            className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-200"
                                        >
                                            <BiTrash className="w-4 h-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminLayout>
    );
}

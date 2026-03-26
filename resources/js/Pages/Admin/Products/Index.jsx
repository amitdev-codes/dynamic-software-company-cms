import { Head, Link, router } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import { BiEdit,BiTrash } from "react-icons/bi";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export default function Index({ products }) {

    const deleteProduct = (id) => {
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
                router.delete(route("admin.products.destroy", id), {
                    onSuccess: () => {
                        MySwal.fire(
                            "Deleted!",
                            "Product has been deleted.",
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
        <AdminLayout title="Products">
            <Head title="Products" />
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-6">

                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">Products</h2>
                    <Link
                        href={route("admin.products.create")}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-sm"
                    >
                        + Create
                    </Link>
                </div>

                <div className="overflow-x-auto bg-white dark:bg-gray-900 rounded-lg shadow p-6">
                    <table className="w-full border border-gray-200">
                        <thead className="bg-gray-100 dark:bg-gray-800">
                        <tr className="text-left text-sm text-gray-700 dark:text-gray-300">
                            <th className="p-3">Image</th>
                            <th className="p-3">Name</th>
                            <th className="p-3">Title</th>
                            <th className="p-3">Description</th>
                            <th className="p-3">Features</th>
                            <th className="p-3">Tech Stack</th>
                            <th className="p-3">Order</th>
                            <th className="p-3 text-right">Actions</th>
                        </tr>
                        </thead>

                        <tbody>
                        {products.map((t) => (
                            <tr key={t.id} className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800">
                                <td className="p-3">
                                    {t.image ? (
                                        <img
                                            src={t.image}
                                            className="h-12 w-12 object-cover rounded"
                                        />
                                    ) : (
                                        <div className="h-12 w-12 bg-gray-200 rounded"></div>
                                    )}
                                </td>
                                <td className="p-3 text-gray-600 dark:text-gray-200">{t.name}</td>
                                <td className="p-3 text-gray-600 dark:text-gray-200">{t.title}</td>
                                <td className="p-3 text-gray-600 dark:text-gray-200">{t.description}</td>
                                <td className="p-3 text-gray-600 dark:text-gray-200">
                                    <div className="flex flex-wrap gap-1">
                                        {t.features?.map((f, i) => (
                                            <span
                                                key={i}
                                                className="px-2 py-1 text-xs bg-gray-100 rounded"
                                            >
                                                {f}
                                            </span>
                                        ))}
                                    </div>
                                </td>
                                <td className="p-3 text-gray-600 dark:text-gray-200">
                                    <div className="flex flex-wrap gap-1">
                                        {t.tech_stack &&
                                            Object.entries(t.tech_stack).map(([key, value]) => (
                                                <div key={key}>
                                                    <strong>{key}:</strong> {value}
                                                </div>
                                            ))
                                        }
                                    </div>
                                </td>
                                <td className="p-3 text-gray-600 dark:text-gray-200">{t.sort_order}</td>

                                {/* Actions */}
                                <td className="p-3 text-right">
                                    <div className="flex justify-end gap-3">

                                        <Link
                                            href={route("admin.products.edit", t.id)}
                                            className="text-indigo-600 hover:text-indigo-800"
                                        >
                                            <BiEdit className="w-4 h-4" />
                                        </Link>

                                        <button
                                            onClick={() => deleteProduct(t.id)}
                                            className="text-red-600 hover:text-red-800"
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

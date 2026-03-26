import { Head, Link, router } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";


export default function Index({ testimonials }) {

    const deleteTestimonial = (id) => {
        if (confirm("Delete this testimonial?")) {
            router.delete(route("admin.testimonials.destroy", id));
        }
    };

    return (
        <AdminLayout title="Testimonials">
            <Head title="Testimonials" />
            <div className="bg-white rounded-lg shadow p-6">

                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">Testimonials</h2>

                    <Link
                        href={route("admin.testimonials.create")}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-sm"
                    >
                        + Create
                    </Link>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full border border-gray-200">
                        <thead className="bg-gray-100">
                        <tr className="text-left text-sm">
                            <th className="p-3">Name</th>
                            <th className="p-3">Role</th>
                            <th className="p-3">Content</th>
                            <th className="p-3">Rating</th>
                            <th className="p-3">Order</th>
                            <th className="p-3 text-right">Actions</th>
                        </tr>
                        </thead>

                        <tbody>
                        {testimonials.map((t) => (
                            <tr key={t.id} className="border-t hover:bg-gray-50">
                                <td className="p-3 font-medium">{t.name}</td>
                                <td className="p-3 text-gray-600">{t.role}</td>
                                <td className="p-3 text-gray-600">{t.content}</td>
                                <td className="p-3">{"⭐".repeat(t.rating)}</td>
                                <td className="p-3">{t.order}</td>

                                {/* Actions */}
                                <td className="p-3 text-right">
                                    <div className="flex justify-end gap-3">

                                        <Link
                                            href={route("admin.testimonials.edit", t.id)}
                                            className="text-indigo-600 hover:text-indigo-800"
                                        >
                                            <PencilIcon className="w-4 h-4" />
                                        </Link>

                                        <button
                                            onClick={() => deleteTestimonial(t.id)}
                                            className="text-red-600 hover:text-red-800"
                                        >
                                            <TrashIcon className="w-4 h-4" />
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

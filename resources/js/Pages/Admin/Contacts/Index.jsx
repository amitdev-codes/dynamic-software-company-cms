import { Head, Link, router } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import { BiShow, BiReply, BiTrash } from "react-icons/bi";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export default function Index({ contacts }) {

    const markAsRead = (id) => {
        router.post(route("admin.contacts.read", id));
    };

    const respondPrompt = (contact) => {
        MySwal.fire({
            title: `Respond to ${contact.name}`,
            input: "textarea",
            inputLabel: "Your Response",
            inputPlaceholder: "Type your reply here...",
            showCancelButton: true,
            confirmButtonText: "Send",
            preConfirm: (response) => {
                if (!response) {
                    Swal.showValidationMessage("Response is required");
                }
                return response;
            }
        }).then((result) => {
            if (result.isConfirmed) {
                router.post(route("admin.contacts.respond", contact.id), {
                    response: result.value
                }, {
                    onSuccess: () => {
                        MySwal.fire("Sent!", "Response sent successfully.", "success");
                    }
                });
            }
        });
    };

    const deleteContact = (id) => {
        MySwal.fire({
            title: "Delete message?",
            text: "This will permanently remove the message.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route("admin.contacts.destroy", id));
            }
        });
    };

    return (
        <AdminLayout title="Contact Messages">
            <Head title="Contacts" />

            <div className="bg-white rounded-lg shadow p-6">

                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">Contact Messages</h2>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full border border-gray-200">
                        <thead className="bg-gray-100">
                        <tr className="text-left text-sm">
                            <th className="p-3">Name</th>
                            <th className="p-3">Email</th>
                            <th className="p-3">Subject</th>
                            <th className="p-3">Status</th>
                            <th className="p-3">Date</th>
                            <th className="p-3 text-right">Actions</th>
                        </tr>
                        </thead>

                        <tbody>
                        {contacts.data.map((c) => (
                            <tr key={c.id} className="border-t hover:bg-gray-50">

                                <td className="p-3">{c.name}</td>
                                <td className="p-3 text-gray-600">{c.email}</td>
                                <td className="p-3">{c.subject}</td>

                                {/* Status Badge */}
                                <td className="p-3">
                                    {c.responded_at ? (
                                        <span className="px-2 py-1 text-xs rounded bg-green-100 text-green-700">
                                                Responded
                                            </span>
                                    ) : c.read_at ? (
                                        <span className="px-2 py-1 text-xs rounded bg-yellow-100 text-yellow-700">
                                                Read
                                            </span>
                                    ) : (
                                        <span className="px-2 py-1 text-xs rounded bg-red-100 text-red-700">
                                                Unread
                                            </span>
                                    )}
                                </td>

                                <td className="p-3 text-sm text-gray-500">
                                    {new Date(c.created_at).toLocaleDateString()}
                                </td>

                                {/* Actions */}
                                <td className="p-3 text-right">
                                    <div className="flex justify-end gap-3">

                                        {/* View */}
                                        <button
                                            onClick={() => {
                                                markAsRead(c.id);
                                                MySwal.fire({
                                                    title: c.subject,
                                                    html: `
                                                            <p><b>Name:</b> ${c.name}</p>
                                                            <p><b>Email:</b> ${c.email}</p>
                                                            <p><b>Message:</b><br>${c.message}</p>
                                                        `,
                                                });
                                            }}
                                            className="text-blue-600 hover:text-blue-800"
                                        >
                                            <BiShow className="w-5 h-5" />
                                        </button>

                                        {/* Respond */}
                                        <button
                                            onClick={() => respondPrompt(c)}
                                            className="text-indigo-600 hover:text-indigo-800"
                                        >
                                            <BiReply className="w-5 h-5" />
                                        </button>

                                        {/* Delete */}
                                        <button
                                            onClick={() => deleteContact(c.id)}
                                            className="text-red-600 hover:text-red-800"
                                        >
                                            <BiTrash className="w-5 h-5" />
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

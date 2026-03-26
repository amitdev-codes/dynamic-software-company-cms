import { useForm } from "@inertiajs/react";
import { toast } from "react-toastify";
import DropzoneInput from "@/Components/DropzoneInput.jsx";
import { useState, useEffect } from "react";

export default function ServiceForm({ service = null }) {
    const { data, setData, post, put, processing, errors } = useForm({
        title: service?.title || "",
        category: service?.category || "",
        description: service?.description || "",
        icon: service?.icon || "",
        order: service?.order || 0,
    });

    console.log("serviceForm", data);

    const submit = (e) => {
        e.preventDefault();
        const options = {
            preserveScroll: true,
            forceFormData: true,
            onSuccess: () => toast.success(service ? "Service Updated!" : "Service Created!"),
            onError: () => toast.error("Please correct the errors."),
        };
        if (service) put(route("admin.services.update", service.id), options);
        else post(route("admin.services.store"), options);
    };

    return (
        <form onSubmit={submit} className="space-y-6">

            {/* Name & Title */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <label className="text-sm font-medium">Title</label>
                    <input
                        name="title"
                        value={data.title}
                        onChange={(e) => setData("title", e.target.value)}
                        className="w-full mt-1 border rounded p-2"
                    />
                </div>
                {/* Category */}
                <div>
                    <label className="text-sm font-medium">Category</label>
                    <select
                        value={data.category}
                        onChange={(e) => setData("category", e.target.value)}
                        className="w-full mt-1 border rounded p-2"
                    >
                        <option value="">Select Category</option>
                        <option value="default">Main</option>
                        <option value="comprehensive">Comprehensive</option>
                    </select>

                    {errors.category && (
                        <div className="text-red-500 text-sm mt-1">
                            {errors.category}
                        </div>
                    )}
                </div>
                <div>
                    <label className="text-sm font-medium">Sort Order</label>
                    <input
                        type="number"
                        value={data.order}
                        onChange={(e) => setData("order", e.target.value)}
                        className="w-full mt-1 border rounded p-2"
                    />
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Description */}
                <div>
                    <label className="text-sm font-medium">Description</label>
                    <textarea
                        value={data.description}
                        onChange={(e) => setData("description", e.target.value)}
                        rows={4}
                        className="w-full mt-1 border rounded p-2"
                    />
                </div>
                {/* Image */}
                <DropzoneInput
                    label="Logo"
                    name="image"
                    existingImage={data?.image}
                    onChange={(file) => setData("image", file)}
                />
            </div>


            {/* Submit */}
            <button
                disabled={processing}
                className="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
                {service ? "Update Service" : "Create Service"}
            </button>
        </form>
    );
}

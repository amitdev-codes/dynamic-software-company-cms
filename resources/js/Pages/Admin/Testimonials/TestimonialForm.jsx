import { useForm } from "@inertiajs/react";
import {toast} from "react-toastify";

export default function TestimonialForm({ testimonial = null }) {

    const { data, setData, post, put, processing, errors } = useForm({
        name: testimonial?.name || "",
        role: testimonial?.role || "",
        content: testimonial?.content || "",
        rating: testimonial?.rating || 5,
        order: testimonial?.order || 0,
    });

    const submit = (e) => {
        e.preventDefault();

        if (testimonial) {
            put(route('admin.testimonials.update',testimonial.id), {
                preserveState: true,
                preserveScroll: true,
                onSuccess: () => {
                    toast.success('Testimonials Updated successfully!', {
                        position: "top-right",
                        autoClose: 4000,
                        hideProgressBar: false,
                    });
                },
                onError: (err) => {
                    toast.error('Please correct the errors in the form', {
                        position: "top-right",
                        autoClose: 5000,
                    });
                    // Optional: scroll to first error
                    const firstErrorField = Object.keys(err)[0];
                    document.querySelector(`[name="${firstErrorField}"]`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                },
            });
        } else {
            post(route('admin.testimonials.store'), {
                preserveState: true,
                preserveScroll: true,
                onSuccess: () => {
                    toast.success('Testimonials Created successfully!', {
                        position: "top-right",
                        autoClose: 4000,
                        hideProgressBar: false,
                    });
                },
                onError: (err) => {
                    toast.error('Please correct the errors in the form', {
                        position: "top-right",
                        autoClose: 5000,
                    });
                    // Optional: scroll to first error
                    const firstErrorField = Object.keys(err)[0];
                    document.querySelector(`[name="${firstErrorField}"]`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                },
            });
        }
    };

    return (
        <form onSubmit={submit} className="space-y-4">

            <div>
                <label className="block text-sm mb-1">Name</label>
                <input
                    value={data.name}
                    onChange={(e) => setData("name", e.target.value)}
                    className="w-full border rounded p-2"
                />
                {errors.name && <div className="text-red-500 text-sm">{errors.name}</div>}
            </div>

            <div>
                <label className="block text-sm mb-1">Role</label>
                <input
                    value={data.role}
                    onChange={(e) => setData("role", e.target.value)}
                    className="w-full border rounded p-2"
                />
            </div>

            <div>
                <label className="block text-sm mb-1">Content</label>
                <textarea
                    value={data.content}
                    onChange={(e) => setData("content", e.target.value)}
                    className="w-full border rounded p-2"
                    rows="4"
                />
            </div>

            <div className="grid grid-cols-2 gap-4">

                <div>
                    <label className="block text-sm mb-1">Rating</label>
                    <select
                        value={data.rating}
                        onChange={(e) => setData("rating", e.target.value)}
                        className="w-full border rounded p-2"
                    >
                        {[1,2,3,4,5].map(r => (
                            <option key={r} value={r}>{r}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm mb-1">Order</label>
                    <input
                        type="number"
                        value={data.order}
                        onChange={(e) => setData("order", e.target.value)}
                        className="w-full border rounded p-2"
                    />
                </div>

            </div>

            <button
                disabled={processing}
                className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
                {testimonial ? "Update Testimonial" : "Create Testimonial"}
            </button>

        </form>
    );
}

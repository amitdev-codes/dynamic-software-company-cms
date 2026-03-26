import { Head } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import TestimonialForm from "./TestimonialForm.jsx";

export default function Edit({ testimonial }) {
    return (
        <AdminLayout title="Edit Testimonial">
            <Head title="Edit Testimonial" />

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow w-full">
                <h2 className="text-xl font-semibold mb-6">
                    Edit Testimonial
                </h2>

                <TestimonialForm testimonial={testimonial} />
            </div>
        </AdminLayout>
    );
}

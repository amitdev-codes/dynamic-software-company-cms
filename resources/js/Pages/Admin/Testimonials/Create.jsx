import { Head } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import TestimonialForm from "./TestimonialForm.jsx";

export default function Create() {
    return (
        <AdminLayout title="Create Testimonial">
            <Head title="Create Testimonial" />

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow w-full">
                <h2 className="text-xl font-semibold mb-6">
                    Create Testimonial
                </h2>

                <TestimonialForm />
            </div>
        </AdminLayout>
    );
}

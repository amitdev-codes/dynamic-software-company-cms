import { Head } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import ProductForm from "@/Pages/Admin/Products/ProductForm.jsx";


export default function Create() {
    return (
        <AdminLayout title="Create Product">
            <Head title="Create Product" />

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow w-full">
                <h2 className="text-xl font-semibold mb-6">
                    Create Product
                </h2>

                <ProductForm />
            </div>
        </AdminLayout>
    );
}

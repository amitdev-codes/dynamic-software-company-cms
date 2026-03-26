import { Head } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
;
import ProductForm from "@/Pages/Admin/Products/ProductForm.jsx";

export default function Edit({ product }) {
    return (
        <AdminLayout title="Edit Product">
            <Head title="Edit Product" />

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow w-full">
                <h2 className="text-xl font-semibold mb-6">
                    Edit Product
                </h2>

                <ProductForm product={product} />
            </div>
        </AdminLayout>
    );
}

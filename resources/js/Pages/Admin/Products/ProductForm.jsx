import { useForm } from "@inertiajs/react";
import { toast } from "react-toastify";
import DropzoneInput from "@/Components/DropzoneInput.jsx";
import { useState, useEffect } from "react";

export default function ProductForm({ product = null }) {
    const { data, setData, post, put, processing, errors } = useForm({
        name: product?.name || "",
        title: product?.title || "",
        description: product?.description || "",
        pricing: product?.pricing || "",
        sort_order: product?.sort_order || 0,
        features: product?.features || [],       // stored as array
        tech_stack: product?.tech_stack || {},   // stored as object
        image: product?.image || null,
    });
    const techKeys = ["architecture", "frontend", "middleware", "database"];
    // Local string states for multi-line textarea
    const [featuresText, setFeaturesText] = useState("");
    const [techStackText, setTechStackText] = useState("");

    // Initialize textarea strings from product data
    useEffect(() => {
        setTechStackText(
            techKeys.map(key => `${key}: ${data.tech_stack[key] || ""}`).join("\n")
        );
    }, [data.tech_stack]);

    // Update form data on textarea change
    const handleFeaturesChange = (e) => {
        const value = e.target.value;
        setFeaturesText(value);
        setData(
            "features",
            value.split("\n").map((line) => line.trim()).filter(Boolean)
        );
    };

// Update only values after colon
    const handleTechStackChange = (e) => {
        const lines = e.target.value.split("\n");
        const newTechStack = {};
        lines.forEach((line, idx) => {
            const key = techKeys[idx];
            const value = line.includes(":") ? line.split(":")[1].trim() : "";
            newTechStack[key] = value;
        });
        setData("tech_stack", newTechStack);
        setTechStackText(
            techKeys.map(key => `${key}: ${newTechStack[key]}`).join("\n")
        );
    };

    const submit = (e) => {
        e.preventDefault();
        const options = {
            preserveScroll: true,
            forceFormData: true,
            onSuccess: () => toast.success(product ? "Product Updated!" : "Product Created!"),
            onError: () => toast.error("Please correct the errors."),
        };
        if (product) put(route("admin.products.update", product.id), options);
        else post(route("admin.products.store"), options);
    };

    return (
        <form onSubmit={submit} className="space-y-6">

            {/* Name & Title */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="text-sm font-medium">Name</label>
                    <input
                        name="name"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        className="w-full mt-1 border rounded p-2"
                    />
                    {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                </div>

                <div>
                    <label className="text-sm font-medium">Title</label>
                    <input
                        name="title"
                        value={data.title}
                        onChange={(e) => setData("title", e.target.value)}
                        className="w-full mt-1 border rounded p-2"
                    />
                </div>
            </div>

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

            {/* Features */}
            <div>
                <label className="text-sm font-medium mb-1">Features (one per line)</label>
                <textarea
                    value={featuresText}
                    onChange={handleFeaturesChange}
                    rows={4}
                    className="w-full border rounded p-2 font-mono text-sm"
                    placeholder=""
                />
                {errors.features && <p className="text-red-500 text-sm">{errors.features}</p>}
            </div>

            {/* Tech Stack */}
            <div>
                <label className="text-sm font-medium mb-1">Tech Stack (key: value)</label>
                <textarea
                    value={techStackText}
                    onChange={handleTechStackChange}
                    rows={6}
                    className="w-full border rounded p-2 font-mono text-sm"
                    placeholder={`architecture: 3 tiers
                                frontend: Angular, CSS, HTML
                                middleware: Java Spring boot
                                database: MariaDB`
                }
                />
                {errors.tech_stack && <p className="text-red-500 text-sm">{errors.tech_stack}</p>}
            </div>

            {/* Pricing + Sort Order */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="text-sm font-medium">Pricing</label>
                    <input
                        type="text"
                        value={data.pricing}
                        onChange={(e) => setData("pricing", e.target.value)}
                        placeholder="e.g $49 / project"
                        className="w-full mt-1 border rounded p-2"
                    />
                </div>
                <div>
                    <label className="text-sm font-medium">Sort Order</label>
                    <input
                        type="number"
                        value={data.sort_order}
                        onChange={(e) => setData("sort_order", e.target.value)}
                        className="w-full mt-1 border rounded p-2"
                    />
                </div>
            </div>

            {/* Image */}
            <DropzoneInput
                label="Logo"
                name="image"
                existingImage={product?.image}
                onChange={(file) => setData("image", file)}
            />

            {/* Submit */}
            <button
                disabled={processing}
                className="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
                {product ? "Update Product" : "Create Product"}
            </button>
        </form>
    );
}

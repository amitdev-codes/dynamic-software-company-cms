import { useForm } from "@inertiajs/react";
import { toast } from "react-toastify";
import DropzoneInput from "@/Components/DropzoneInput.jsx";
import { useState, useEffect } from "react";
import { FiCalendar } from "react-icons/fi";
import {Input} from "postcss";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.css";

export default function ProjectForm({ project = null }) {
    const { data, setData, post, put, processing, errors } = useForm({
        title: project?.title || "",
        logo: project?.logo || "🚀",
        description: project?.description || "",
        category: project?.category || "",
        completion_date: project?.completion_date || "",
        technologies: project?.technologies || [],
        project_link: project?.project_link || "",
        accent: project?.accent || "#3b82f6",
        order: project?.order || 0,

        thumbnail: null,
        screenshots: [],
    });

    // State to manage category and tech stack input values
    const [featuresText, setFeaturesText] = useState(data.category);  // category as text
    const [techStackText, setTechStackText] = useState(data.technologies.join(", "));  // technologies as comma-separated string

    useEffect(() => {
        if (project?.category) {
            setFeaturesText(project.category); // Set category text
        }
        if (project?.technologies) {
            setTechStackText(project.technologies.join(", ")); // Set technologies as a comma-separated string
        }
    }, [project]);

    // Handle category text change
    const handleCategoryChange = (e) => {
        setFeaturesText(e.target.value);
        setData("category", e.target.value);  // Store category as text
    };

    // Handle tech stack input change (convert comma-separated list to array)
    const handleTechStackChange = (e) => {
        const techArray = e.target.value.split(",").map(item => item.trim());
        setTechStackText(e.target.value);
        setData("technologies", techArray);  // Store as array
    };

    const submit = (e) => {
        e.preventDefault();
        const options = {
            preserveScroll: true,
            forceFormData: true,
            onSuccess: () => toast.success(project ? "Project Updated!" : "Project Created!"),
            onError: () => toast.error("Please correct the errors."),
        };
        if (project) {
            put(route("admin.projects.update", project.id), options);
        } else {
            post(route("admin.projects.store"), options);
        }
    };

    return (
        <form onSubmit={submit} className="space-y-6">
            {/* Title */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                    <label className="text-sm font-medium">Title</label>
                    <input
                        name="title"
                        value={data.title}
                        onChange={(e) => setData("title", e.target.value)}
                        className="w-full mt-1 border rounded p-2"
                    />
                    {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
                </div>
                {/* Category */}
                <div>
                    <label className="text-sm font-medium mb-1">Category</label>
                    <input
                        type="text"
                        value={featuresText}
                        onChange={handleCategoryChange}
                        className="w-full mt-1 border rounded p-2"
                        placeholder="Enter category"
                    />
                    {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}
                </div>
                <div>
                    <label className="text-sm font-medium">Logo (Emoji)</label>
                    <input
                        type="text"
                        value={data.logo || ""}
                        onChange={(e) => setData("logo", e.target.value)}
                        className="w-full mt-1 border rounded p-2"
                        placeholder="🚀"
                    />

                    {/* Helper text */}
                    <p className="text-xs text-gray-500 mt-1">
                        Get emoji from{" "}
                        <a
                            href="https://emojipedia.org"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-indigo-600 hover:underline"
                        >
                            emojipedia.org
                        </a>{" "}
                        and copy–paste here.
                    </p>
                </div>

                <div>
                    <label className="text-sm font-medium">Project Link</label>
                    <input
                        type="url"
                        value={data.project_link || ""}
                        onChange={(e) => setData("project_link", e.target.value)}
                        className="w-full mt-1 border rounded p-2"
                        placeholder="https://example.com"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative">
                    <label className="text-sm font-medium">Completion Date</label>
                    <div className="mt-1 relative">
                        <FiCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />

                        <Flatpickr
                            value={data.completion_date || ""}
                            onChange={(selectedDates) => {
                                // Flatpickr returns an array of Dates
                                setData(
                                    "completion_date",
                                    selectedDates.length ? selectedDates[0].toISOString().split("T")[0] : ""
                                );
                            }}
                            options={{
                                dateFormat: "Y-m-d", // compatible with Laravel date field
                                allowInput: true,
                            }}
                            className="w-full pl-10 pr-3 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        />
                    </div>
                    {errors.completion_date && (
                        <p className="text-red-500 text-sm mt-1">{errors.completion_date}</p>
                    )}
                </div>
                <div>
                    <label className="text-sm font-medium">Accent Color</label>
                    <input
                        type="color"
                        value={data.accent || "#3b82f6"}
                        onChange={(e) => setData("accent", e.target.value)}
                        className="w-full mt-1 h-10 border rounded"
                    />
                </div>
                 <div>
                    <label className="text-sm font-medium">Sort Order</label>
                    <input
                        type="number"
                        value={data.order}
                        onChange={(e) => setData("order", e.target.value)}
                        className="w-full mt-1 border rounded p-2"
                    />
                    {errors.order && <p className="text-red-500 text-sm">{errors.order}</p>}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Tech Stack */}
                <div>
                    <label className="text-sm font-medium mb-1">Tech Stack</label>
                    <textarea
                        value={techStackText}
                        onChange={handleTechStackChange}
                        rows={6}
                        className="w-full mt-1 border rounded p-2 font-mono text-sm"
                        placeholder="Enter technologies used (comma-separated)"
                    />
                    {errors.technologies && <p className="text-red-500 text-sm">{errors.technologies}</p>}
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
                    {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Image */}
                {/* Thumbnail (single) */}
                <DropzoneInput
                    label="Thumbnail"
                    name="thumbnail"
                    multiple={false}
                    existingImage={project?.thumbnail || null}
                    onChange={(file) => setData("thumbnail", file)}
                />

                {/* Screenshots (multiple) */}
                <DropzoneInput
                    label="Screenshots"
                    name="screenshots"
                    multiple={true}
                    existingImages={project?.existingImages ?? []}
                    onChange={(files) => setData("screenshots", files)}
                />
            </div>

            {/* Submit Button */}
            <button
                disabled={processing}
                className="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
                {project ? "Update Project" : "Create Project"}
            </button>
        </form>
    );
}

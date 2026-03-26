import { useDropzone } from "react-dropzone";
import { useEffect, useRef, useState } from "react";

export default function DropzoneInput({
                                          label,
                                          name,
                                          existingImage = null,   // single mode: string URL
                                          existingImages = [],    // multiple mode: array of string URLs
                                          accept = { "image/*": [] },
                                          multiple = false,
                                          maxFiles,
                                          onChange,               // single → file|null  /  multiple → File[]
                                      }) {
    // Each entry: { file?: File, url: string, isExisting: boolean }
    const [previews, setPreviews] = useState(() => {
        if (multiple) {
            return (existingImages || []).map((url) => ({ url, isExisting: true }));
        }
        return existingImage ? [{ url: existingImage, isExisting: true }] : [];
    });

    // ── Notify parent AFTER render, never during ───────────────────────────
    const isFirstRender = useRef(true);

    useEffect(() => {
        // skip the very first mount so we don't fire onChange with initial data
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        if (!onChange) return;

        if (multiple) {
            onChange(previews.filter((e) => e.file).map((e) => e.file));
        } else {
            const entry = previews[0];
            onChange(entry?.file ?? null);
        }
    }, [previews]);

    // ── Cleanup blob URLs on unmount ───────────────────────────────────────
    useEffect(() => {
        return () => {
            previews.forEach((e) => {
                if (!e.isExisting) URL.revokeObjectURL(e.url);
            });
        };
    }, []);

    // ── Dropzone ───────────────────────────────────────────────────────────
    const { getRootProps, getInputProps } = useDropzone({
        accept,
        multiple,
        maxFiles: maxFiles ?? (multiple ? undefined : 1),
        onDrop: (acceptedFiles) => {
            if (!acceptedFiles.length) return;

            const newEntries = acceptedFiles.map((file) => ({
                file,
                url: URL.createObjectURL(file),
                isExisting: false,
            }));

            setPreviews((prev) => {
                if (multiple) {
                    return [...prev, ...newEntries];
                }
                // revoke old blob if replacing
                prev.forEach((e) => { if (!e.isExisting) URL.revokeObjectURL(e.url); });
                return [newEntries[0]];
            });
        },
    });

    // ── Remove ─────────────────────────────────────────────────────────────
    const removeImage = (index) => {
        setPreviews((prev) => {
            const entry = prev[index];
            if (entry && !entry.isExisting) URL.revokeObjectURL(entry.url);
            return prev.filter((_, i) => i !== index);
        });
    };

    const showDropzone = multiple || previews.length === 0;

    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
                {label}
            </label>

            {showDropzone && (
                <div
                    {...getRootProps()}
                    className="border-2 border-dashed rounded-xl p-6 cursor-pointer
                               border-gray-300 hover:border-indigo-500 transition"
                >
                    <input {...getInputProps()} name={name} />
                    <p className="text-center text-sm text-gray-500">
                        {multiple
                            ? "Drag & drop files or click to upload multiple"
                            : "Drag & drop or click to upload"}
                    </p>
                    {multiple && previews.length > 0 && (
                        <p className="text-center text-xs text-indigo-500 mt-1">
                            {previews.length} file{previews.length !== 1 ? "s" : ""} selected — drop more to add
                        </p>
                    )}
                </div>
            )}

            {previews.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-3">
                    {previews.map((entry, index) => (
                        <div key={entry.url} className="relative">
                            <img
                                src={entry.url}
                                alt={`Preview ${index + 1}`}
                                className="h-24 w-24 object-cover rounded-lg border border-gray-200 shadow-sm"
                            />
                            <button
                                type="button"
                                onClick={() => removeImage(index)}
                                className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600
                                           text-white rounded-full w-5 h-5 flex items-center
                                           justify-items-center text-xs shadow transition"
                                aria-label="Remove image"
                            >
                                <span className="mx-auto">✕</span>
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

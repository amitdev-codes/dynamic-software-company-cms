import { usePage, Link } from "@inertiajs/react";
import { ArrowLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

export default function PageHeader() {
    const { url } = usePage();

    const segments = url.split("?")[0].split("/").filter(Boolean);

    const breadcrumbs = segments.map((segment, index) => {
        const href = "/" + segments.slice(0, index + 1).join("/");

        const label =
            segment.charAt(0).toUpperCase() +
            segment.slice(1).replace("-", " ");

        return { label, href };
    });

    const goBack = () => window.history.back();

    return (
        <div className="flex items-center justify-between mb-4">

            {/* Back Button */}
            <button
                onClick={goBack}
                className="inline-flex items-center gap-2 px-3 py-2 border border-gray-300
                rounded-md text-sm text-gray-700 bg-white hover:bg-gray-50
                dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-700"
            >
                <ArrowLeftIcon className="w-4 h-4" />
                Back
            </button>

            {/* Breadcrumb */}
            <nav className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                {breadcrumbs.map((item, index) => (
                    <div key={index} className="flex items-center">

                        {index !== 0 && (
                            <ChevronRightIcon className="w-4 h-4 mx-2" />
                        )}

                        {index === breadcrumbs.length - 1 ? (
                            <span className="font-medium text-gray-900 dark:text-white">
                                {item.label}
                            </span>
                        ) : (
                            <Link
                                href={item.href}
                                className="hover:text-gray-900 dark:hover:text-white"
                            >
                                {item.label}
                            </Link>
                        )}

                    </div>
                ))}
            </nav>
        </div>
    );
}

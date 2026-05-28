import { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';

export default function ProjectsSection({ projects }) {
    const [index, setIndex] = useState(0);
    const chunkSize = 4;

    // ✅ FIXED: Use chunks properly OR simplify the logic
    const totalChunks = Math.ceil(projects.length / chunkSize);

    // ✅ Show current chunk based on index
    const visibleProjects = projects.slice(index * chunkSize, (index + 1) * chunkSize);

    const next = () => {
        if (index < totalChunks - 1) {
            setIndex(index + 1);
        }
    };

    const prev = () => {
        if (index > 0) {
            setIndex(index - 1);
        }
    };

    // ✅ Early return if no projects
    if (!projects?.length) return null;

    return (
        <section
            id="projects"
            className="section-gap relative overflow-hidden
        bg-gradient-to-br
        from-[#f0f7ff] via-[#e6f0ff] to-[#f0e6ff]
        dark:from-[#0a0f1e]
        dark:via-[#0d1429]
        dark:to-[#1c2540]"
        >
            {/* Ambient Blue Glows */}
            <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
                <div className="absolute -top-32 left-1/4 w-[500px] h-[500px] rounded-full bg-blue-400/10 dark:bg-blue-500/10 blur-[100px]" />
                <div className="absolute bottom-10 right-1/4 w-[420px] h-[420px] rounded-full bg-indigo-400/10 dark:bg-indigo-500/10 blur-[90px]" />
            </div>
            {/* Your existing JSX remains the same */}
            <div className="container-landing relative z-10">
                {/* Header */}
                <div className="flex items-end justify-between gap-6 flex-wrap mb-10 md:mb-12">
                    <div className="flex-1 min-w-[260px]">
                        <span className="inline-flex items-center gap-2.5 text-[12.5px] font-bold tracking-[0.13em] uppercase text-blue-600 dark:text-blue-400 mb-3.5">
                            <span className="inline-block w-6 h-0.5 rounded bg-gradient-to-r from-blue-500 to-purple-500" />
                            Our Work
                            <span className="inline-block w-6 h-0.5 rounded bg-gradient-to-r from-blue-500 to-purple-500" />
                        </span>
                        <h2 className="font-extrabold leading-tight mb-3 text-slate-900 dark:text-white">
                            Projects We're
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
                                {' '}Proud Of
                            </span>
                        </h2>
                        <p className="text-slate-600 dark:text-gray-400 max-w-lg">
                            From concept to deployment — a glimpse of solutions we've crafted for our clients.
                        </p>
                    </div>

                    {/* Navigation Buttons - Show only if more than 1 chunk */}
                    {totalChunks > 1 && (
                        <div className="hidden sm:flex gap-2.5 shrink-0 pb-1">
                            <button
                                onClick={prev}
                                disabled={index === 0}
                                className="w-11 h-11 rounded-full border border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-slate-600 dark:text-gray-300 flex items-center justify-center shadow-sm hover:border-blue-500 hover:text-blue-600 dark:hover:border-blue-400 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-700 hover:shadow-md hover:-translate-y-px transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                                    <path d="M11 4l-5 5 5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                            <button
                                onClick={next}
                                disabled={index === totalChunks - 1}
                                className="w-11 h-11 rounded-full border border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-slate-600 dark:text-gray-300 flex items-center justify-center shadow-sm hover:border-blue-500 hover:text-blue-600 dark:hover:border-blue-400 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-700 hover:shadow-md hover:-translate-y-px transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                                    <path d="M7 4l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </div>
                    )}
                </div>

                {/* Projects Grid */}
                <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
                    {visibleProjects.map((project) => {
                        const accent = project.accent || '#3b82f6';
                        return (
                            <div key={project.id} className="group flex flex-col h-full bg-white dark:bg-gray-900/90 backdrop-blur-xl border border-slate-200 dark:border-gray-700 rounded-3xl p-8 hover:border-blue-400 dark:hover:border-blue-500 transition-all duration-300 hover:-translate-y-3 hover:shadow-2xl">
                                {/* Rest of your project card JSX remains unchanged */}
                                <div className="flex items-center justify-between mb-6">
                                    <div className="w-[58px] h-[58px] rounded-2xl flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700">
                                        <span className="text-3xl">{project.logo}</span>
                                    </div>
                                    {project.category && (
                                        <span
                                            className="text-[10px] font-bold px-3 py-1 rounded-full"
                                            style={{
                                                color: accent,
                                                backgroundColor: `${accent}15`,
                                                border: `1px solid ${accent}30`,
                                            }}
                                        >
                                            {project.category}
                                        </span>
                                    )}
                                </div>
                                <h3 className="font-bold text-[1.1rem] text-slate-900 dark:text-white mb-3 leading-tight">
                                    {project.title}
                                </h3>
                                <p className="text-sm text-slate-600 dark:text-gray-400 mb-6 leading-relaxed line-clamp-3 flex-1">
                                    {project.description}
                                </p>
                                {(project.technologies || []).length > 0 && (
                                    <div className="flex flex-wrap gap-1.5 mb-6">
                                        {project.technologies.map((tag) => (
                                            <span key={tag} className="text-[10px] px-3 py-1 rounded-full bg-slate-100 dark:bg-gray-800 text-slate-600 dark:text-gray-400">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Chunk Indicator */}
                {totalChunks > 1 && (
                    <div className="mt-8 flex justify-center gap-2">
                        {Array.from({ length: totalChunks }, (_, i) => (
                            <button
                                key={i}
                                onClick={() => setIndex(i)}
                                className={`w-2.5 h-2.5 rounded-full transition-all duration-200 ${
                                    i === index
                                        ? 'bg-blue-600 scale-125 shadow-sm'
                                        : 'bg-slate-200 dark:bg-gray-600 hover:bg-slate-300 dark:hover:bg-gray-500'
                                }`}
                            />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}

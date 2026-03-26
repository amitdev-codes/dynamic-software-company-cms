import { useState, useRef } from 'react';
import { Link } from '@inertiajs/react';

export default function ProjectsSection({ projects }) {
    const [hovered, setHovered] = useState(null);
    const scrollRef = useRef(null);

    const scroll = (dir) => {
        if (!scrollRef.current) return;
        scrollRef.current.scrollBy({
            left: dir === 'left' ? -340 : 340,
            behavior: 'smooth',
        });
    };

    if (!projects?.length) return null;

    return (
        <section id="projects" className="relative py-24 md:py-28 2xl:py-32 bg-[#f8faff] overflow-hidden">

            {/* ── Background decorations ─────────────────── */}
            <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
                {/* Blobs */}
                <div className="absolute -top-32 -left-20 w-[500px] h-[500px] rounded-full opacity-[0.16] blur-[72px]"
                     style={{ background: 'radial-gradient(circle, #3b82f6, transparent 70%)' }} />
                <div className="absolute -bottom-24 -right-16 w-[420px] h-[420px] rounded-full opacity-[0.16] blur-[72px]"
                     style={{ background: 'radial-gradient(circle, #8b5cf6, transparent 70%)' }} />
                {/* Grid */}
                <div className="absolute inset-0 bg-grid-pattern opacity-[0.04]" />
            </div>

            <div className="container-landing relative z-10">

                {/* ── Header row ─────────────────────────────── */}
                <div className="flex items-end justify-between gap-6 flex-wrap mb-10 md:mb-12">

                    {/* Left */}
                    <div className="flex-1 min-w-[260px]">
                        {/* Eyebrow */}
                        <span className="inline-flex items-center gap-2.5 text-[12.5px] font-bold tracking-[0.13em] uppercase text-blue-500 mb-3.5">
                            <span className="inline-block w-6 h-0.5 rounded bg-gradient-to-r from-blue-500 to-purple-500" />
                            Our Work
                            <span className="inline-block w-6 h-0.5 rounded bg-gradient-to-r from-blue-500 to-purple-500" />
                        </span>

                        <h2 className="font-extrabold !text-slate-900 leading-tight mb-3">
                            Projects We're
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
                                {' '}Proud Of
                            </span>
                        </h2>

                        <p className="!text-slate-500 max-w-lg">
                            From concept to deployment — a glimpse of solutions we've crafted for our clients.
                        </p>
                    </div>

                    {/* Arrow buttons — hidden on mobile (swipe naturally) */}
                    <div className="hidden sm:flex gap-2.5 shrink-0 pb-1">
                        {['left', 'right'].map((dir) => (
                            <button
                                key={dir}
                                onClick={() => scroll(dir)}
                                aria-label={`Scroll ${dir}`}
                                className="w-11 h-11 rounded-full border border-slate-200 bg-white text-slate-600 flex items-center justify-center shadow-sm hover:border-blue-400 hover:text-blue-500 hover:bg-blue-50 hover:shadow-md hover:-translate-y-px transition-all duration-200"
                            >
                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                                    {dir === 'left'
                                        ? <path d="M11 4l-5 5 5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        : <path d="M7 4l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    }
                                </svg>
                            </button>
                        ))}
                    </div>
                </div>

                {/* ── Scroll track ───────────────────────────── */}
                <div className="relative">
                    {/* Edge fades */}
                    <div className="absolute left-0 top-0 bottom-0 w-14 bg-gradient-to-r from-[#f8faff] to-transparent z-10 pointer-events-none" />
                    <div className="absolute right-0 top-0 bottom-0 w-14 bg-gradient-to-l from-[#f8faff] to-transparent z-10 pointer-events-none" />

                    <div
                        ref={scrollRef}
                        className="flex gap-5 overflow-x-auto pb-5 pt-3 px-1"
                        style={{
                            scrollSnapType: 'x mandatory',
                            WebkitOverflowScrolling: 'touch',
                            scrollbarWidth: 'none',
                            msOverflowStyle: 'none',
                        }}
                    >
                        {projects.map((project) => {
                            const accent = project.accent || '#3b82f6';
                            const isHovered = hovered === project.id;

                            return (
                                <div
                                    key={project.id}
                                    onMouseEnter={() => setHovered(project.id)}
                                    onMouseLeave={() => setHovered(null)}
                                    className="relative bg-white border rounded-[20px] flex flex-col overflow-hidden transition-all duration-300 flex-shrink-0 w-[300px] sm:w-[310px]"
                                    style={{
                                        scrollSnapAlign: 'start',
                                        borderColor: isHovered ? accent : '#e2e8f0',
                                        transform: isHovered ? 'translateY(-6px)' : 'translateY(0)',
                                        boxShadow: isHovered
                                            ? `0 20px 56px rgba(59,130,246,0.13), 0 4px 16px rgba(0,0,0,0.05)`
                                            : '0 1px 4px rgba(0,0,0,0.04)',
                                        padding: '28px 26px 24px',
                                    }}
                                >
                                    {/* Glow */}
                                    <div
                                        className="absolute -top-16 -right-16 w-44 h-44 rounded-full pointer-events-none transition-opacity duration-400"
                                        style={{
                                            background: `radial-gradient(circle, ${accent}, transparent 70%)`,
                                            opacity: isHovered ? 0.13 : 0,
                                        }}
                                    />

                                    {/* Top: logo + category */}
                                    <div className="flex items-center justify-between mb-4">
                                        <div
                                            className="w-[50px] h-[50px] rounded-[13px] flex items-center justify-center border border-blue-100 transition-transform duration-300"
                                            style={{
                                                background: 'linear-gradient(135deg, #f0f7ff, #e8f0fe)',
                                                transform: isHovered ? 'scale(1.08) rotate(-3deg)' : 'scale(1) rotate(0)',
                                            }}
                                        >
                                            <span className="text-[22px] leading-none">{project.logo}</span>
                                        </div>

                                        {project.category && (
                                            <span
                                                className="text-[10.5px] font-bold tracking-[0.08em] uppercase px-2.5 py-1 rounded-full border"
                                                style={{
                                                    color:           accent,
                                                    backgroundColor: `${accent}18`,
                                                    borderColor:     `${accent}38`,
                                                }}
                                            >
                                                {project.category}
                                            </span>
                                        )}
                                    </div>

                                    {/* Title */}
                                    <h3 className="!text-[1.06rem] font-bold text-slate-900 mb-2 tracking-tight leading-snug">
                                        {project.title}
                                    </h3>

                                    {/* Description */}
                                    <p className="!text-sm !text-slate-500 leading-relaxed mb-4 flex-1 line-clamp-3">
                                        {project.description}
                                    </p>

                                    {/* Tech tags */}
                                    {(project.technologies || []).length > 0 && (
                                        <div className="flex flex-wrap gap-1.5 mb-5">
                                            {project.technologies.map((tag) => (
                                                <span key={tag}
                                                      className="text-[10.5px] font-medium text-slate-500 bg-slate-50 border border-slate-200 px-2.5 py-0.5 rounded-full">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    )}

                                    {/* Know More */}
                                    <div className="mt-auto">
                                        <Link
                                            href={`/projects/${project.slug || project.id}`}
                                            className="inline-flex items-center gap-1.5 px-[18px] py-[9px] text-[0.84rem] font-semibold rounded-full border-[1.5px] no-underline transition-all duration-200 group"
                                            style={{
                                                color:           accent,
                                                backgroundColor: `${accent}12`,
                                                borderColor:     `${accent}40`,
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.backgroundColor = accent;
                                                e.currentTarget.style.color = '#fff';
                                                e.currentTarget.style.borderColor = accent;
                                                e.currentTarget.style.boxShadow = `0 6px 20px ${accent}55`;
                                                e.currentTarget.style.transform = 'translateY(-1px)';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.backgroundColor = `${accent}12`;
                                                e.currentTarget.style.color = accent;
                                                e.currentTarget.style.borderColor = `${accent}40`;
                                                e.currentTarget.style.boxShadow = 'none';
                                                e.currentTarget.style.transform = 'translateY(0)';
                                            }}
                                        >
                                            <span>Know More</span>
                                            <svg
                                                width="14" height="14" viewBox="0 0 14 14" fill="none"
                                                className="transition-transform duration-200 group-hover:translate-x-0.5"
                                            >
                                                <path d="M2.5 7h9M8 3.5l3.5 3.5L8 10.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </Link>
                                    </div>

                                    {/* Accent bottom bar */}
                                    <div
                                        className="absolute bottom-0 left-0 right-0 h-[3px] rounded-b-[20px] origin-left transition-transform duration-400"
                                        style={{
                                            background: `linear-gradient(90deg, ${accent}, ${accent}66)`,
                                            transform: isHovered ? 'scaleX(1)' : 'scaleX(0)',
                                        }}
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* ── Bottom CTA ─────────────────────────────── */}
                <div className="flex items-center justify-center gap-5 mt-12 flex-wrap">
                    <p className="!text-sm !text-slate-500 mb-0">
                        Interested in working with us?
                    </p>
                   <a
                    href="/contact"
                    className="inline-flex items-center gap-2 px-7 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-semibold rounded-full shadow-lg shadow-blue-500/30 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-blue-500/40 active:translate-y-0 transition-all duration-200"
                    >
                    <span>Start a Project</span>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </a>
            </div>

        </div>
</section>
);
}

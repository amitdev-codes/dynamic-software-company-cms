import { Head, Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Footer from './Footer';

/* ══════════════════════════════════════════════════════════
   DETAIL NAV
══════════════════════════════════════════════════════════ */
function DetailNav({ project, settings }) {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const fn = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', fn, { passive: true });
        return () => window.removeEventListener('scroll', fn);
    }, []);

    return (
        <nav className={`fixed w-full top-0 z-50 transition-all duration-500 ${
            isScrolled
                ? 'bg-white/95 backdrop-blur-xl shadow-lg border-b border-gray-100'
                : 'bg-white/80 backdrop-blur-sm'
        }`}>
            <div className="container-landing">
                <div className="flex items-center justify-between h-16 md:h-18">

                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl blur opacity-40 group-hover:opacity-70 transition-opacity" />
                            <div className="relative w-10 h-10 md:w-11 md:h-11 bg-white rounded-xl flex items-center justify-center shadow-lg overflow-hidden">
                                <img
                                    src={settings?.logo_light || settings?.favicon || '/image/logo.png'}
                                    alt="logo"
                                    className="w-full h-full object-contain p-1"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col leading-tight">
                            <span className="text-lg font-black bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                                {settings?.company_name || 'Cloudcoms'}
                            </span>
                            <span className="text-[10px] text-gray-500 font-semibold tracking-wide">
                                {settings?.company_slogan || 'Technology Partners'}
                            </span>
                        </div>
                    </Link>

                    {/* Breadcrumb */}
                    <div className="hidden md:flex items-center gap-2 text-sm">
                        {[
                            { label: 'Home',     href: '/'          },
                            { label: 'Projects', href: '/#projects' },
                        ].map((crumb, i) => (
                            <span key={i} className="flex items-center gap-2">
                                <Link href={crumb.href}
                                      className="text-slate-500 hover:text-blue-600 transition-colors font-medium">
                                    {crumb.label}
                                </Link>
                                <svg className="w-3 h-3 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </span>
                        ))}
                        <span className="text-slate-900 font-semibold truncate max-w-[180px]">
                            {project.title}
                        </span>
                    </div>

                    {/* Right */}
                    <div className="flex items-center gap-2">
                        <div className="hidden lg:flex items-center gap-1">
                            {[
                                { label: 'About',    href: '/#about'    },
                                { label: 'Services', href: '/#services' },
                                { label: 'Projects', href: '/#projects' },
                            ].map((item) => (
                                <Link key={item.href} href={item.href}
                                      className="px-4 py-2 rounded-lg text-sm font-semibold text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200">
                                    {item.label}
                                </Link>
                            ))}
                        </div>

                        <Link href="/contact"
                              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600 shadow-md hover:scale-105 transition-transform duration-200 overflow-hidden relative group">
                            <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                            <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            <span className="relative z-10">Get In Touch</span>
                        </Link>

                        <Link href="/#projects"
                              className="md:hidden inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            Back
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}

/* ══════════════════════════════════════════════════════════
   LIGHTBOX
══════════════════════════════════════════════════════════ */
function Lightbox({ screenshots, activeIndex, onClose, onPrev, onNext }) {
    useEffect(() => {
        const handler = (e) => {
            if (e.key === 'Escape')     onClose();
            if (e.key === 'ArrowLeft')  onPrev();
            if (e.key === 'ArrowRight') onNext();
        };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [onClose, onPrev, onNext]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] bg-black/92 backdrop-blur-md flex items-center justify-center p-4"
            onClick={onClose}
        >
            {/* Top bar */}
            <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-5 py-4 z-10">
                <span className="text-white/60 text-sm font-medium">
                    {activeIndex + 1} / {screenshots.length}
                </span>
                <button onClick={onClose}
                        className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center text-white transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            {/* Prev */}
            {screenshots.length > 1 && (
                <button onClick={(e) => { e.stopPropagation(); onPrev(); }}
                        className="absolute left-3 md:left-6 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center text-white transition-colors z-10">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
            )}

            {/* Image */}
            <AnimatePresence mode="wait">
                <motion.img
                    key={activeIndex}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.22 }}
                    src={screenshots[activeIndex]?.original_url}
                    alt={`Screenshot ${activeIndex + 1}`}
                    className="max-h-[80vh] max-w-[88vw] object-contain rounded-xl shadow-2xl"
                    onClick={(e) => e.stopPropagation()}
                />
            </AnimatePresence>

            {/* Next */}
            {screenshots.length > 1 && (
                <button onClick={(e) => { e.stopPropagation(); onNext(); }}
                        className="absolute right-3 md:right-6 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center text-white transition-colors z-10">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            )}

            {/* Thumbnail strip */}
            {screenshots.length > 1 && (
                <div
                    className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 overflow-x-auto max-w-[90vw] px-3 pb-1"
                    onClick={(e) => e.stopPropagation()}
                >
                    {screenshots.map((shot, i) => (
                        <button key={i} onClick={() => onPrev(i)}
                                className={`shrink-0 w-14 h-10 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                                    i === activeIndex
                                        ? 'border-blue-400 scale-110 shadow-lg shadow-blue-500/30'
                                        : 'border-white/20 opacity-55 hover:opacity-90'
                                }`}>
                            <img src={shot?.original_url} alt="" className="w-full h-full object-cover" />
                        </button>
                    ))}
                </div>
            )}
        </motion.div>
    );
}

/* ══════════════════════════════════════════════════════════
   MAIN
══════════════════════════════════════════════════════════ */
export default function ProjectDetail({ project, settings, menuItems, services }) {
    const [lightboxIndex, setLightboxIndex] = useState(null);

    /* ── Spatie media ── */
    const screenshots = project.media?.filter(
        m => m.collection_name === 'project_screenshots'
    ) ?? [];

    const thumbnail = project.media?.find(
        m => m.collection_name === 'project_thumbnail'
    );

    const heroImage = thumbnail?.original_url ?? screenshots[0]?.original_url ?? null;

    /* ── Normalise technologies ── */
    const technologies = Array.isArray(project.technologies)
        ? project.technologies
        : typeof project.technologies === 'string'
            ? (() => { try { return JSON.parse(project.technologies); } catch { return []; } })()
            : [];

    const gradient    = project.gradient  || 'from-blue-600 to-purple-600';
    const accentColor = project.accent    || '#3b82f6';

    /* ── Lightbox helpers ── */
    const closeLightbox = () => setLightboxIndex(null);
    const prevShot = (jumpTo) => setLightboxIndex(
        jumpTo !== undefined
            ? jumpTo
            : (lightboxIndex - 1 + screenshots.length) % screenshots.length
    );
    const nextShot = () => setLightboxIndex(
        (lightboxIndex + 1) % screenshots.length
    );

    /* ── Project meta rows ── */
    const metaRows = [
        {
            icon:  'M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z',
            label: 'Category',
            value: project.category,
            bg:    'from-blue-500 to-cyan-500',
        },
        {
            icon:  'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
            label: 'Status',
            value: 'Completed',
            bg:    'from-green-500 to-emerald-500',
        },
        {
            icon:  'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
            label: 'Completion Date',
            value: project.completion_date
                ? new Date(project.completion_date).toLocaleDateString('en-US', {
                    year: 'numeric', month: 'long', day: 'numeric',
                })
                : null,
            bg:    'from-purple-500 to-pink-500',
        },
        {
            icon:   'M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14',
            label:  'Project URL',
            value:  project.project_link,
            isLink: true,
            bg:     'from-orange-500 to-red-500',
        },
    ].filter(r => r.value);

    return (
        <>
            <Head title={`${project.title} — CloudCom`} />

            <div className="min-h-screen bg-white">
                <DetailNav project={project} settings={settings} />
                <div className="h-16 md:h-18" />

                {/* ════════════════════════════════════════
                    HERO
                ════════════════════════════════════════ */}
                <section className={`relative overflow-hidden bg-gradient-to-br ${gradient} py-16 md:py-24`}>
                    <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
                    <div className="absolute -top-40 -right-40 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-black/10 rounded-full blur-3xl pointer-events-none" />

                    <div className="container-landing relative z-10">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

                            {/* Left — info */}
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.7 }}
                                className="text-white space-y-5"
                            >
                                {project.category && (
                                    <span className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 text-white text-xs font-bold tracking-widest uppercase px-3 py-1.5 rounded-full">
                                        <span className="w-1.5 h-1.5 rounded-full bg-white/80 animate-pulse" />
                                        {project.category}
                                    </span>
                                )}

                                <div className="flex items-start gap-4">
                                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center text-3xl md:text-4xl shadow-xl shrink-0">
                                        {project.logo}
                                    </div>
                                    <div>
                                        <h1 className="font-black !text-white !text-3xl md:!text-4xl lg:!text-5xl leading-tight">
                                            {project.title}
                                        </h1>
                                        {project.created_at && (
                                            <p className="!text-white/60 !text-sm mt-1">
                                                {new Date(project.created_at).toLocaleDateString('en-US', {
                                                    year: 'numeric', month: 'long',
                                                })}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <p className="!text-white/85 !text-base md:!text-lg leading-relaxed max-w-lg">
                                    {project.description}
                                </p>

                                {technologies.length > 0 && (
                                    <div className="flex flex-wrap gap-2">
                                        {technologies.map((tech) => (
                                            <span key={tech}
                                                  className="text-xs font-semibold bg-white/15 backdrop-blur-sm border border-white/25 text-white px-3 py-1.5 rounded-full hover:bg-white/25 transition-colors duration-200">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                )}

                                <div className="flex flex-wrap gap-3 pt-2">
                                    {project.project_link && (
                                        <a href={project.project_link}
                                           target="_blank" rel="noopener noreferrer"
                                           className="inline-flex items-center gap-2 bg-white text-slate-900 font-bold text-sm px-5 py-3 rounded-xl shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                            </svg>
                                            View Live Project
                                        </a>
                                    )}
                                    {screenshots.length > 0 && (
                                        <button onClick={() => setLightboxIndex(0)}
                                                className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/30 text-white font-bold text-sm px-5 py-3 rounded-xl hover:bg-white/25 transition-all duration-300">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                            View Screenshots
                                        </button>
                                    )}
                                </div>
                            </motion.div>

                            {/* Right — hero image */}
                            {heroImage && (
                                <motion.div
                                    initial={{ opacity: 0, x: 30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.7, delay: 0.2 }}
                                    className="relative hidden md:block"
                                >
                                    <div
                                        className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/20 cursor-pointer group"
                                        onClick={() => setLightboxIndex(0)}
                                    >
                                        <img src={heroImage} alt={project.title}
                                             className="w-full h-auto object-cover max-h-80 lg:max-h-96 group-hover:scale-105 transition-transform duration-500" />
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors duration-300 flex items-center justify-center">
                                            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 backdrop-blur-sm rounded-xl px-4 py-2 flex items-center gap-2 text-sm font-semibold text-slate-900">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0-4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                                                </svg>
                                                Full Screen
                                            </div>
                                        </div>
                                    </div>
                                    {screenshots.length > 1 && (
                                        <div className="absolute -bottom-3 -right-3 bg-white rounded-xl shadow-lg px-3 py-1.5 flex items-center gap-1.5 text-xs font-bold text-slate-700 border border-slate-100">
                                            <svg className="w-3.5 h-3.5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                            {screenshots.length} Screenshots
                                        </div>
                                    )}
                                </motion.div>
                            )}
                        </div>
                    </div>
                </section>

                {/* ════════════════════════════════════════
                    DETAILS — left screenshots / right info
                ════════════════════════════════════════ */}
                <section className="section-gap bg-slate-50">
                    <div className="container-landing">

                        {/* Section label */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="mb-10"
                        >
                            <span className="inline-block text-blue-600 font-semibold text-sm tracking-wider uppercase mb-2">
                                Overview
                            </span>
                            <h2 className="font-black mb-0">
                                Project{' '}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                                    Details
                                </span>
                            </h2>
                        </motion.div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-start">

                            {/* ══ LEFT — scrollable screenshot stack ══ */}
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                            >
                                {/* Header row */}
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="font-bold !text-base text-slate-900 flex items-center gap-2">
                                        <span className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                                              style={{ background: `linear-gradient(135deg, ${accentColor}, ${accentColor}99)` }}>
                                            <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                        </span>
                                        Screenshots
                                        <span className="text-xs font-semibold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full ml-1">
                                            {screenshots.length}
                                        </span>
                                    </h3>
                                    {screenshots.length > 0 && (
                                        <button onClick={() => setLightboxIndex(0)}
                                                className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 transition-colors group">
                                            View All
                                            <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0-4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                                            </svg>
                                        </button>
                                    )}
                                </div>

                                {screenshots.length > 0 ? (
                                    <>
                                        {/* Scrollable vertical stack */}
                                        <div
                                            className="flex flex-col gap-4 overflow-y-auto pr-1.5"
                                            style={{
                                                maxHeight: '580px',
                                                scrollbarWidth: 'thin',
                                                scrollbarColor: `${accentColor}50 transparent`,
                                            }}
                                        >
                                            {screenshots.map((shot, i) => (
                                                <motion.div
                                                    key={shot.id ?? i}
                                                    initial={{ opacity: 0, y: 24 }}
                                                    whileInView={{ opacity: 1, y: 0 }}
                                                    viewport={{ once: true, margin: '-40px' }}
                                                    transition={{ delay: i * 0.07, duration: 0.45 }}
                                                    className="relative rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl cursor-pointer group bg-white flex-shrink-0 transition-shadow duration-300"
                                                    onClick={() => setLightboxIndex(i)}
                                                >
                                                    <img
                                                        src={shot.original_url}
                                                        alt={shot.name || `Screenshot ${i + 1}`}
                                                        className="w-full h-48 md:h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                                                    />

                                                    {/* Hover overlay */}
                                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                                                        <div className="opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 bg-white/90 backdrop-blur-sm rounded-xl px-4 py-2 flex items-center gap-2 text-sm font-semibold text-slate-900 shadow-lg">
                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                                                            </svg>
                                                            Expand
                                                        </div>
                                                    </div>

                                                    {/* Index pill */}
                                                    <div
                                                        className="absolute top-3 left-3 text-white text-xs font-bold px-2.5 py-1 rounded-lg backdrop-blur-sm"
                                                        style={{ backgroundColor: `${accentColor}cc` }}
                                                    >
                                                        {i + 1}/{screenshots.length}
                                                    </div>

                                                    {/* Accent bar */}
                                                    <div
                                                        className="absolute bottom-0 left-0 right-0 h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                                                        style={{ backgroundColor: accentColor }}
                                                    />
                                                </motion.div>
                                            ))}
                                        </div>

                                        {/* Scroll hint */}
                                        {screenshots.length > 2 && (
                                            <div className="flex items-center gap-2 mt-3">
                                                <div className="h-px flex-1 bg-slate-200" />
                                                <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
                                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                    </svg>
                                                    Scroll for more
                                                </span>
                                                <div className="h-px flex-1 bg-slate-200" />
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    /* Empty state */
                                    <div className="flex flex-col items-center justify-center h-64 bg-white rounded-2xl border border-dashed border-slate-200 text-slate-400">
                                        <svg className="w-12 h-12 mb-3 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        <p className="!text-sm font-medium">No screenshots available</p>
                                    </div>
                                )}
                            </motion.div>

                            {/* ══ RIGHT — technologies + meta ══ */}
                            <motion.div
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.1 }}
                                className="lg:sticky lg:top-24 space-y-5"
                            >
                                {/* Technologies */}
                                {technologies.length > 0 && (
                                    <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
                                        <h3 className="font-bold !text-base text-slate-900 mb-4 flex items-center gap-2">
                                            <span className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                                                  style={{ background: `linear-gradient(135deg, ${accentColor}, ${accentColor}99)` }}>
                                                <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                                                </svg>
                                            </span>
                                            Technologies Used
                                        </h3>
                                        <div className="flex flex-wrap gap-2">
                                            {technologies.map((tech, i) => (
                                                <motion.span
                                                    key={tech}
                                                    initial={{ opacity: 0, scale: 0.8 }}
                                                    whileInView={{ opacity: 1, scale: 1 }}
                                                    viewport={{ once: true }}
                                                    transition={{ delay: i * 0.05 }}
                                                    className="text-sm font-semibold px-3 py-1.5 rounded-xl border hover:scale-105 transition-transform duration-200 cursor-default"
                                                    style={{
                                                        color:           accentColor,
                                                        backgroundColor: `${accentColor}12`,
                                                        borderColor:     `${accentColor}35`,
                                                    }}
                                                >
                                                    {tech}
                                                </motion.span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Meta rows */}
                                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                                    {metaRows.map(({ icon, label, value, isLink, bg }, i) => (
                                        <div
                                            key={label}
                                            className={`flex items-center gap-4 p-5 group hover:bg-slate-50 transition-colors duration-200 ${
                                                i < metaRows.length - 1 ? 'border-b border-slate-100' : ''
                                            }`}
                                        >
                                            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${bg} flex items-center justify-center shadow-md shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icon} />
                                                </svg>
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <p className="!text-xs font-semibold text-slate-400 uppercase tracking-wider mb-0.5">
                                                    {label}
                                                </p>
                                                {isLink ? (
                                                    <a href={value} target="_blank" rel="noopener noreferrer"
                                                       className="!text-sm font-semibold text-blue-600 hover:text-blue-700 truncate block transition-colors">
                                                        {value}
                                                    </a>
                                                ) : (
                                                    <p className="!text-sm font-semibold text-slate-900 truncate">
                                                        {value}
                                                    </p>
                                                )}
                                            </div>
                                            {isLink && (
                                                <svg className="w-4 h-4 text-slate-300 group-hover:text-blue-500 transition-colors shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                </svg>
                                            )}
                                        </div>
                                    ))}
                                </div>

                                {/* CTA — uses project accent color */}
                                <Link href="/contact"
                                      className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl font-bold text-sm text-white shadow-lg hover:scale-[1.02] hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
                                      style={{ background: `linear-gradient(135deg, ${accentColor}, ${accentColor}bb)` }}
                                >
                                    <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                                    <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    <span className="relative z-10">Interested? Let's Talk</span>
                                </Link>
                            </motion.div>

                        </div>
                    </div>
                </section>

                {/* ════════════════════════════════════════
                    BOTTOM CTA
                ════════════════════════════════════════ */}
                <section className={`relative overflow-hidden bg-gradient-to-br ${gradient} py-16 md:py-20`}>
                    <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
                    <div className="container-landing relative z-10 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="space-y-5 max-w-xl mx-auto"
                        >
                            <h2 className="font-black !text-white">Like What You See?</h2>
                            <p className="!text-white/80 max-w-md mx-auto">
                                Let's build something amazing together. Reach out and tell us about your project.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                <Link href="/contact"
                                      className="inline-flex items-center justify-center gap-2 bg-white text-slate-900 font-bold text-sm px-6 py-3.5 rounded-xl shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    Start a Project
                                </Link>
                                <Link href="/#projects"
                                      className="inline-flex items-center justify-center gap-2 bg-white/15 backdrop-blur-sm border border-white/30 text-white font-bold text-sm px-6 py-3.5 rounded-xl hover:bg-white/25 transition-all duration-300">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                    All Projects
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </section>

                <Footer
                    settings={settings}
                    menuItems={menuItems}
                    services={services}
                    scrollToSection={(id) => { window.location.href = `/#${id}`; }}
                />
            </div>

            <AnimatePresence>
                {lightboxIndex !== null && (
                    <Lightbox
                        screenshots={screenshots}
                        activeIndex={lightboxIndex}
                        onClose={closeLightbox}
                        onPrev={prevShot}
                        onNext={nextShot}
                    />
                )}
            </AnimatePresence>
        </>
    );
}

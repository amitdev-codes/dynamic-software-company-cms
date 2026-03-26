import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';

export default function HeroSection({ scrollToSection, settings }) {
    return (
        <section
            id="home"
            className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50"
        >
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />

            {/* Animated Orbs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-72 h-72 sm:w-96 sm:h-96 bg-blue-400 rounded-full mix-blend-multiply blur-3xl opacity-20 animate-blob" />
                <div className="absolute -bottom-40 -left-40 w-72 h-72 sm:w-96 sm:h-96 bg-purple-400 rounded-full mix-blend-multiply blur-3xl opacity-20 animate-blob animation-delay-2000" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 sm:w-96 sm:h-96 bg-cyan-400 rounded-full mix-blend-multiply blur-3xl opacity-20 animate-blob animation-delay-4000" />
            </div>

            {/* ── Main Content ── */}
            <div className="relative w-full container-landing py-10 lg:py-0">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

                    {/* ══ LEFT ══ */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        className="text-left space-y-7 sm:space-y-8"
                    >
                        {/* ── Tagline badge ── */}
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.15, duration: 0.6 }}
                            className="inline-flex items-center gap-2.5 bg-white/80 backdrop-blur-sm border border-blue-200/70 px-4 py-2 rounded-full shadow-sm shadow-blue-100"
                        >
                            <span className="relative flex h-2 w-2 shrink-0">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
                            </span>
                            <span className="text-xs sm:text-sm font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent tracking-wide">
                                {settings.tagline}
                            </span>
                        </motion.div>

                        {/* ── Heading ── */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.25, duration: 0.8 }}
                            className="space-y-2"
                        >

                            <p className="!text-[10px] sm:!text-xs font-bold tracking-[0.2em] uppercase !text-blue-500 mb-2">
                                — Your Technology Partner
                            </p>

                            <h1 className="font-black leading-tight tracking-tight">
                                {/* First line — lighter, smaller */}
                                <span className="block !text-lg sm:!text-xl md:!text-2xl font-medium tracking-wide text-slate-400"
                                      style={{ fontFamily: 'Inter, sans-serif' }}>
        The best way to escape
    </span>

                                {/* Hero word — gradient, prominent but not oversized */}
                                <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent
                     !text-4xl sm:!text-5xl md:!text-6xl font-black tracking-tight leading-none py-1">
        Problems
    </span>

                                {/* Close line — matches first line weight */}
                                <span className="block !text-lg sm:!text-xl md:!text-2xl font-medium tracking-wide text-slate-600"
                                      style={{ fontFamily: 'Inter, sans-serif' }}>
        is to solve them.
    </span>
                            </h1>

                            {/* Quote */}
                            <p className="mt-3 !text-xs italic !text-slate-400" style={{ fontFamily: 'Inter, sans-serif' }}>
                                ~ Brendan Francis
                            </p>
                        </motion.div>

                        {/* ── Description ── */}
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.45, duration: 0.8 }}
                            className="!font-[Trocchi,serif] !text-base sm:!text-lg text-slate-600 leading-relaxed max-w-md"
                        >
                            {settings.description}
                        </motion.p>

                        {/* ── CTA Buttons ── */}
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 0.6 }}
                            className="flex flex-col sm:flex-row gap-3 sm:gap-4"
                        >
                            <Link href="/contact" className="btn-primary group">
                                Get Started
                                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </Link>

                            <button onClick={() => scrollToSection('services')} className="btn-secondary group">
                                Explore Services
                                <svg className="w-4 h-4 transition-transform group-hover:translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                                </svg>
                            </button>
                        </motion.div>

                        {/* ── Stats ── */}
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8, duration: 0.6 }}
                            className="grid grid-cols-3 gap-3 sm:gap-6 pt-6 sm:pt-8 border-t border-slate-200/70"
                        >
                            {[
                                { value: settings.years_of_experience, label: 'Years Experience', icon: '🏆' },
                                { value: settings.projects_delivered,   label: 'Projects Done',    icon: '🚀' },
                                { value: '50+',                         label: 'Happy Clients',    icon: '😊' },
                            ].map((stat, i) => (
                                <motion.div
                                    key={i}
                                    whileHover={{ y: -3 }}
                                    transition={{ duration: 0.2 }}
                                    className="text-center group cursor-default"
                                >
                                    <div className="text-xl sm:text-2xl mb-1">
                                        {stat.icon}
                                    </div>
                                    <div className="text-xl sm:text-2xl md:text-3xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent leading-tight">
                                        {stat.value}
                                    </div>
                                    <div className="text-[10px] sm:text-xs text-slate-500 font-medium leading-tight mt-0.5">
                                        {stat.label}
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* ══ RIGHT ══ */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.35, duration: 1 }}
                        className="relative hidden md:block"
                    >
                        <div className="relative">

                            {/* Main image frame */}
                            <div className="relative bg-gradient-to-br from-blue-100 to-purple-100 rounded-3xl p-6 md:p-8 shadow-2xl">
                                <div className="relative aspect-square rounded-2xl overflow-hidden bg-white shadow-inner">
                                    <img
                                        src="/image/slider1.png"
                                        alt="Cloud Com Solutions"
                                        className="w-full h-full object-contain"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-purple-400/10" />
                                </div>

                                {/* Floating card — top right */}
                                <motion.div
                                    animate={{ y: [0, -10, 0] }}
                                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                                    className="absolute -top-5 -right-5 md:-top-6 md:-right-6 bg-white rounded-2xl p-3 md:p-4 shadow-xl border border-blue-100"
                                >
                                    <div className="flex items-center gap-2 md:gap-3">
                                        <div className="w-9 h-9 md:w-11 md:h-11 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shrink-0">
                                            <svg className="w-4 h-4 md:w-5 md:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                                            </svg>
                                        </div>
                                        <div>
                                            <div className="text-[10px] text-slate-400 font-medium">Development</div>
                                            <div className="text-xs md:text-sm font-bold text-slate-900">Expert Team</div>
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Floating card — bottom left */}
                                <motion.div
                                    animate={{ y: [0, 10, 0] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                                    className="absolute -bottom-5 -left-5 md:-bottom-6 md:-left-6 bg-white rounded-2xl p-3 md:p-4 shadow-xl border border-purple-100"
                                >
                                    <div className="flex items-center gap-2 md:gap-3">
                                        <div className="w-9 h-9 md:w-11 md:h-11 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shrink-0">
                                            <svg className="w-4 h-4 md:w-5 md:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <div className="text-[10px] text-slate-400 font-medium">Quality</div>
                                            <div className="text-xs md:text-sm font-bold text-slate-900">100% Assured</div>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>

                            {/* Tech stack grid */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.85 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 1.1, duration: 0.7 }}
                                className="absolute -bottom-8 -right-8 md:-bottom-10 md:-right-10 bg-white rounded-2xl p-3 md:p-4 shadow-2xl border border-slate-100"
                            >
                                <p className="text-[9px] font-bold tracking-widest uppercase text-slate-400 mb-2 text-center">
                                    Tech Stack
                                </p>
                                <div className="grid grid-cols-3 gap-1.5 md:gap-2">
                                    {[
                                        { name: 'Java',       color: 'from-orange-400 to-red-500',  img: '/image/java.png'     },
                                        { name: '.NET',       color: 'from-blue-400 to-blue-600',   img: '/image/dotnet.png'   },
                                        { name: 'Laravel',    color: 'from-red-500 to-orange-500',  img: '/image/php.png'  },
                                        { name: 'MySQL',      color: 'from-cyan-400 to-blue-500',   img: '/image/mysql.png'    },
                                        { name: 'Oracle',     color: 'from-red-400 to-orange-500',  img: '/image/oracle.png'   },
                                        { name: 'PostgreSQL', color: 'from-blue-500 to-indigo-600', img: '/image/postgres.png' },
                                    ].map((tech, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, scale: 0 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: 1.3 + i * 0.08, duration: 0.4 }}
                                            whileHover={{ scale: 1.15, rotate: 4 }}
                                            className={`w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br ${tech.color} flex items-center justify-center shadow-md cursor-pointer`}
                                            title={tech.name}
                                        >
                                            <img src={tech.img} alt={tech.name} className="w-6 h-6 md:w-7 md:h-7 object-contain" />
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Glow */}
                            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-br from-blue-300 to-purple-300 rounded-3xl blur-3xl opacity-20" />
                        </div>
                    </motion.div>

                </div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.6, duration: 0.6 }}
                className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2"
            >
                <motion.button
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                    onClick={() => scrollToSection('about')}
                    className="flex flex-col items-center gap-2 group cursor-pointer"
                >
                    <span className="!text-xs !text-slate-400 font-medium tracking-widest uppercase group-hover:!text-slate-600 transition-colors">
                        Scroll to explore
                    </span>
                    <div className="w-5 h-9 rounded-full border-2 border-slate-300 group-hover:border-blue-400 transition-colors flex items-start justify-center pt-1.5">
                        <motion.div
                            animate={{ y: [0, 10, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="w-1 h-1 rounded-full bg-blue-500"
                        />
                    </div>
                </motion.button>
            </motion.div>

        </section>
    );
}

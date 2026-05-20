import { Link } from '@inertiajs/react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function HeroSection({ scrollToSection, settings }) {
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
    const yParallax = useTransform(scrollYProgress, [0, 1], [0, 80]);

    const techStack = [
        { name: 'Java',       bg: 'bg-[#ED8B00]', img: '/image/java.png'     },
        { name: '.NET',       bg: 'bg-[#512BD4]', img: '/image/dotnet.png'   },
        { name: 'Laravel',    bg: 'bg-[#FF2D20]', img: '/image/php.png'      },
        { name: 'MySQL',      bg: 'bg-[#00758F]', img: '/image/mysql.png'    },
        { name: 'Oracle',     bg: 'bg-[#C74634]', img: '/image/oracle.png'   },
        { name: 'PostgreSQL', bg: 'bg-[#336791]', img: '/image/postgres.png' },
    ];

    const stats = [
        { value: settings.years_of_experience, label: 'Years Experience', gradient: 'from-blue-500 to-cyan-400',    icon: <CalendarIcon /> },
        { value: settings.projects_delivered,   label: 'Projects Done',    gradient: 'from-violet-500 to-pink-500', icon: <RocketIcon />   },
        { value: '50+',                         label: 'Happy Clients',    gradient: 'from-emerald-500 to-teal-400',icon: <StarIcon />      },
    ];

    return (
        <section
            id="hero"
            className="section-gap relative overflow-hidden
                bg-gradient-to-br from-slate-50 via-indigo-50/30 to-blue-50/40
                dark:from-[#060910] dark:via-[#0a0f1e] dark:to-[#0d0b22]"
        >
            <style>{`
                :root {
                    --hero-bg: linear-gradient(135deg, #f8faff 0%, #eef2ff 40%, #faf5ff 70%, #fdf2f8 100%);
                    --orb-1: #93c5fd;
                    --orb-2: #c4b5fd;
                    --orb-3: #f9a8d4;
                    --card-bg: rgba(255,255,255,0.85);
                    --card-border: rgba(255,255,255,0.9);
                    --text-primary: #0f172a;
                    --text-muted: #64748b;
                    --badge-bg: rgba(239,246,255,0.9);
                    --badge-border: rgba(147,197,253,0.5);
                }
                .dark {
                    --hero-bg: linear-gradient(135deg, #060918 0%, #0a0f1e 40%, #0d0b1a 70%, #110916 100%);
                    --orb-1: rgba(59,130,246,0.25);
                    --orb-2: rgba(139,92,246,0.2);
                    --orb-3: rgba(236,72,153,0.15);
                    --card-bg: rgba(15,23,42,0.85);
                    --card-border: rgba(255,255,255,0.08);
                    --text-primary: #f1f5f9;
                    --text-muted: #94a3b8;
                    --badge-bg: rgba(30,41,59,0.9);
                    --badge-border: rgba(99,102,241,0.3);
                }

                /* Mesh background */
                .hero-mesh {
                    position: absolute;
                    inset: 0;
                    background-image:
                        radial-gradient(ellipse 80% 50% at 20% 40%, var(--orb-1), transparent),
                        radial-gradient(ellipse 60% 60% at 80% 60%, var(--orb-2), transparent),
                        radial-gradient(ellipse 50% 40% at 50% 10%, var(--orb-3), transparent);
                    opacity: 0.7;
                }

                /* Grid dot pattern */
                .hero-grid {
                    position: absolute;
                    inset: 0;
                    background-image: radial-gradient(circle, rgba(99,102,241,0.12) 1px, transparent 1px);
                    background-size: 32px 32px;
                    mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%);
                }
                .dark .hero-grid {
                    background-image: radial-gradient(circle, rgba(99,102,241,0.18) 1px, transparent 1px);
                }

                /* Floating card base */
                .float-card {
                    background: var(--card-bg);
                    backdrop-filter: blur(16px);
                    -webkit-backdrop-filter: blur(16px);
                    border: 1px solid var(--card-border);
                    border-radius: 16px;
                    box-shadow: 0 8px 32px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04);
                }
                .dark .float-card {
                    box-shadow: 0 8px 32px rgba(0,0,0,0.4), 0 2px 8px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.05);
                }

                /* Stat card */
                .stat-card {
                    background: var(--card-bg);
                    backdrop-filter: blur(12px);
                    -webkit-backdrop-filter: blur(12px);
                    border: 1px solid var(--card-border);
                    border-radius: 14px;
                    transition: transform 0.2s ease, box-shadow 0.2s ease;
                }
                .stat-card:hover {
                    box-shadow: 0 12px 40px rgba(99,102,241,0.15);
                }

                /* Gradient text */
                .gradient-text {
                    background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #ec4899 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }
                .dark .gradient-text {
                    background: linear-gradient(135deg, #60a5fa 0%, #a78bfa 50%, #f472b6 100%);
                    -webkit-background-clip: text;
                    background-clip: text;
                }

                /* Shimmer line */
                .shimmer-line {
                    position: absolute;
                    top: 0; left: 0; right: 0;
                    height: 1px;
                    background: linear-gradient(90deg, transparent, rgba(99,102,241,0.6), transparent);
                    animation: shimmer 3s ease-in-out infinite;
                }
                @keyframes shimmer {
                    0%,100% { opacity: 0; transform: scaleX(0.3); }
                    50% { opacity: 1; transform: scaleX(1); }
                }

                /* Noise grain overlay */
                .hero-grain::before {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E");
                    opacity: 0.025;
                    pointer-events: none;
                    z-index: 1;
                }

                /* Tech icon hover */
                .tech-icon {
                    transition: transform 0.2s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.2s ease;
                }
                .tech-icon:hover {
                    transform: scale(1.18) rotate(4deg);
                    box-shadow: 0 6px 20px rgba(0,0,0,0.25);
                }

                /* Scroll indicator */
                @keyframes scrollBounce {
                    0%,100% { transform: translateY(0); }
                    50% { transform: translateY(10px); }
                }
                .scroll-dot { animation: scrollBounce 1.8s ease-in-out infinite; }

                /* CTA button glow */
                .btn-primary {
                    position: relative;
                    overflow: hidden;
                    background: linear-gradient(135deg, #3b82f6, #8b5cf6);
                    transition: transform 0.2s ease, box-shadow 0.2s ease;
                }
                .btn-primary::before {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(135deg, #2563eb, #7c3aed);
                    opacity: 0;
                    transition: opacity 0.2s ease;
                }
                .btn-primary:hover::before { opacity: 1; }
                .btn-primary:hover { transform: translateY(-1px); box-shadow: 0 8px 25px rgba(99,102,241,0.4); }
                .btn-primary span, .btn-primary svg { position: relative; z-index: 1; }

                /* Image glow ring */
                .image-glow {
                    position: absolute;
                    inset: -10%;
                    border-radius: 50%;
                    background: radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%);
                    animation: pulse-glow 4s ease-in-out infinite;
                }
                @keyframes pulse-glow {
                    0%,100% { transform: scale(0.9); opacity: 0.5; }
                    50% { transform: scale(1.1); opacity: 1; }
                }

                /* Tagline badge */
                .tagline-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    padding: 4px 14px 4px 6px;
                    background: var(--badge-bg);
                    border: 1px solid var(--badge-border);
                    border-radius: 100px;
                    backdrop-filter: blur(8px);
                }

                /* Responsive float card adjustments */
                @media (max-width: 1280px) {
                    .float-card-tr,
                    .float-card-tl,
                    .float-card-bl,
                    .float-card-br {
                        display: none;
                    }
                }
                @media (min-width: 1280px) {
                    .float-card-tr,
                    .float-card-tl,
                    .float-card-bl,
                    .float-card-br {
                        display: block;
                    }
                }
            `}</style>

            {/* Layered Background */}
            <div className="hero-mesh" aria-hidden />
            <div className="hero-grid" aria-hidden />
            <div className="hero-grain absolute inset-0 pointer-events-none" aria-hidden />

            {/* Main Content */}

            <div className="relative z-10 w-full container-landing pt-0 pb-12 lg:py-0 lg:min-h-[calc(100vh-15rem)] lg:flex lg:items-center">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center w-full">
                    {/* ── LEFT: Text ── */}
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                        className="space-y-7"
                    >
                        {/* Tagline */}
                        <motion.div
                            initial={{ opacity: 0, x: -16 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1, duration: 0.6 }}
                        >
                            <div className="tagline-badge">
                                <span className="w-5 h-5 rounded-full bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center">
                                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"/>
                                    </svg>
                                </span>
                                <span className="text-xs font-semibold tracking-wider uppercase text-blue-600 dark:text-blue-400">
                                    Your Technology Partner
                                </span>
                            </div>
                        </motion.div>

                        {/* Heading block */}
                        {/* Enhanced Heading Block */}
                        <div className="space-y-0">

                            {/* Pre-heading */}
                            <motion.p
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.15, duration: 0.6 }}
                                className="
text-base sm:text-lg md:text-xl
font-medium tracking-[0.25em] uppercase
mb-2 sm:mb-3

text-transparent bg-clip-text
bg-gradient-to-r from-sky-500 via-indigo-500 to-violet-500

dark:from-sky-300 dark:via-indigo-300 dark:to-violet-300

drop-shadow-[0_2px_10px_rgba(99,102,241,0.35)]
"
                            >
                                The best way to escape
                            </motion.p>

                            {/* Main Headline */}
                            <motion.h1
                                initial={{ opacity: 0, y: 24, scale: 0.98 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{
                                    delay: 0.2,
                                    duration: 0.9,
                                    ease: [0.16, 1, 0.3, 1]
                                }}
                                className="
                                text-6xl sm:text-7xl md:text-[5.5rem] lg:text-[6rem] xl:text-[6.5rem]
                                font-black leading-[0.9] tracking-tighter

                                text-transparent bg-clip-text

                                bg-[linear-gradient(90deg,#ff00cc_0%,#3333ff_100%)]

                                drop-shadow-[0_0_55px_rgba(255,0,204,0.25)]
                                "
                            >
                                Problems
                            </motion.h1>

                            {/* Sub heading */}
                            <motion.p
                                initial={{ opacity: 0, y: 14 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.35, duration: 0.75 }}
                                className="
                                text-2xl sm:text-3xl md:text-4xl lg:text-5xl
                                font-semibold tracking-tight leading-snug
                                mb-3

                                bg-gradient-to-r from-slate-700 via-slate-500 to-slate-700
                                dark:from-slate-200 dark:via-slate-300 dark:to-slate-200

                                bg-clip-text text-transparent
                                "
                            >
                                is to solve them.
                            </motion.p>

                            {/* Quote */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5, duration: 0.7 }}
                                className="flex flex-col gap-1"
                            >
                                <div className="h-px w-10 bg-gradient-to-r from-transparent via-slate-400 to-transparent" />

                                <div className="
                                            text-sm sm:text-base italic
                                            text-slate-500 dark:text-slate-400
                                            tracking-wide
                                   ">
                                    ~ Brendan Francis
                                </div>
                            </motion.div>

                        </div>

                        {/* Description */}
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.45, duration: 0.8 }}
                            className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-lg"
                        >
                            {settings.description}
                        </motion.p>

                        {/* CTAs */}
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.55, duration: 0.6 }}
                            className="flex flex-col sm:flex-row gap-3"
                        >
                            <Link
                                href="/contact"
                                className="btn-primary inline-flex items-center justify-center gap-2 px-7 py-3.5 text-white text-sm font-bold rounded-2xl group"
                            >
                                <span>Get Started</span>
                                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </Link>

                            <button
                                onClick={() => scrollToSection('services')}
                                className="inline-flex items-center justify-center gap-2 px-7 py-3.5
                                           border border-slate-300 dark:border-slate-700
                                           hover:border-violet-400 dark:hover:border-violet-500
                                           hover:bg-violet-50 dark:hover:bg-violet-950/30
                                           text-slate-700 dark:text-slate-300 text-sm font-semibold rounded-2xl
                                           transition-all duration-300 group"
                            >
                                Explore Services
                                <svg className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                        </motion.div>

                        {/* Stats */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.65, duration: 0.7 }}
                            className="flex flex-col sm:flex-row gap-3 pt-2"
                        >
                            {stats.map((stat, i) => (
                                <motion.div
                                    key={i}
                                    whileHover={{ y: -3, scale: 1.02 }}
                                    className="stat-card flex items-center gap-3 px-4 py-3 flex-1"
                                >
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br ${stat.gradient} text-white shadow-md flex-shrink-0`}>
                                        {stat.icon}
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-xl font-black text-slate-900 dark:text-white leading-none">
                                            {stat.value}
                                        </p>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 truncate">
                                            {stat.label}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>
                    {/* ── RIGHT: Visual ── */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3, duration: 1.1, ease: [0.16,1,0.3,1] }}
                        className="relative hidden lg:flex items-center justify-center"
                    >
                        {/* Parallax wrapper */}
                        <motion.div
                            style={{ y: yParallax }}
                            className="relative flex items-center justify-center w-full"
                        >
                            {/* Glow ring behind image */}
                            <div className="image-glow" aria-hidden />

                            {/* Decorative ring */}
                            <div className="absolute w-[340px] h-[340px] xl:w-[420px] xl:h-[420px] rounded-full border border-violet-200/50 dark:border-violet-800/30" aria-hidden />
                            <div className="absolute w-[280px] h-[280px] xl:w-[360px] xl:h-[360px] rounded-full border border-blue-200/40 dark:border-blue-800/20" aria-hidden />

                            {/* Main image */}
                            <img
                                src="/image/slider1.png"
                                alt="Cloud Com Solutions"
                                className="relative z-10 w-64 xl:w-80 h-auto object-contain drop-shadow-2xl"
                            />

                            {/* ── FLOATING CARDS (xl+ only) ── */}

                            {/* TOP LEFT */}
                            <motion.div
                                animate={{ y: [0, -8, 0] }}
                                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                                className="float-card float-card-tl absolute z-20 p-3.5"
                                style={{
                                    top: '-2rem',
                                    left: '0',
                                    transform: 'translateX(-85%)',
                                    width: '220px'
                                }}
                            >
                                <div className="shimmer-line" />
                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center text-white flex-shrink-0 shadow-md">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-[11px] font-bold leading-snug" style={{ color: 'var(--text-primary)' }}>
                                            Simplifying IT with innovative solutions.
                                        </p>
                                        <p className="text-[10px] mt-0.5 leading-snug" style={{ color: 'var(--text-muted)' }}>
                                            Your trusted digital partner.
                                        </p>
                                    </div>
                                </div>
                            </motion.div>

                            {/* TOP RIGHT */}
                            <motion.div
                                animate={{ y: [0, -8, 0] }}
                                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
                                className="float-card float-card-tr absolute z-20 p-3.5"
                                style={{
                                    top: '-2rem',
                                    right: '0',
                                    transform: 'translateX(85%)',
                                }}
                            >
                                <div className="shimmer-line" />
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center flex-shrink-0 shadow-md">
                                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-medium" style={{ color: 'var(--text-muted)' }}>Quality</p>
                                        <p className="text-sm font-black" style={{ color: 'var(--text-primary)' }}>100% Assured</p>
                                    </div>
                                </div>
                            </motion.div>

                            {/* BOTTOM LEFT */}
                            <motion.div
                                animate={{ y: [0, 8, 0] }}
                                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
                                className="float-card float-card-bl absolute z-20 p-3.5"
                                style={{
                                    bottom: '-2rem',
                                    left: '0',
                                    transform: 'translateX(-85%)',
                                }}
                            >
                                <div className="shimmer-line" />
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center flex-shrink-0 shadow-md">
                                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/>
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-medium" style={{ color: 'var(--text-muted)' }}>Development</p>
                                        <p className="text-sm font-black" style={{ color: 'var(--text-primary)' }}>Expert Team</p>
                                    </div>
                                </div>
                            </motion.div>

                            {/* BOTTOM RIGHT - Tech Stack */}
                            <motion.div
                                animate={{ y: [0, 8, 0] }}
                                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
                                className="float-card float-card-br absolute z-20 p-3.5"
                                style={{
                                    bottom: '-2rem',
                                    right: '0',
                                    transform: 'translateX(85%)',
                                }}
                            >
                                <div className="shimmer-line" />
                                <p className="text-[9px] font-bold tracking-[0.15em] uppercase mb-2 text-center" style={{ color: 'var(--text-muted)' }}>
                                    Tech Stack
                                </p>
                                <div className="grid grid-cols-3 gap-1.5">
                                    {techStack.map((tech, i) => (
                                        <div
                                            key={i}
                                            className={`tech-icon w-10 h-10 rounded-xl ${tech.bg} flex items-center justify-center cursor-pointer`}
                                            title={tech.name}
                                        >
                                            <img src={tech.img} alt={tech.name} className="w-6 h-6 object-contain" />
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* Bottom fade */}
            <div className="absolute bottom-0 left-0 right-0  bg-gradient-to-t from-white/40 dark:from-black/20 to-transparent pointer-events-none" />
        </section>
    );
}

/* ── Inline SVG icon components ── */
function CalendarIcon() {
    return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
        </svg>
    );
}
function RocketIcon() {
    return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z"/>
        </svg>
    );
}
function StarIcon() {
    return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
        </svg>
    );
}

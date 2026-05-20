import { Link } from '@inertiajs/react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
    ArrowRight,
    CheckCircle2,
    ChevronDown,
    Code2,
    Lightbulb,
    ShieldCheck,
} from 'lucide-react';
import { useMemo, useRef } from 'react';

const ENTRANCE_EASE = [0.16, 1, 0.3, 1];

const TECH_STACK = [
    { name: 'Java', bg: 'bg-[#ED8B00]', img: '/image/java.png' },
    { name: '.NET', bg: 'bg-[#512BD4]', img: '/image/dotnet.png' },
    { name: 'Laravel', bg: 'bg-[#FF2D20]', img: '/image/php.png' },
    { name: 'MySQL', bg: 'bg-[#00758F]', img: '/image/mysql.png' },
    { name: 'Oracle', bg: 'bg-[#C74634]', img: '/image/oracle.png' },
    { name: 'PostgreSQL', bg: 'bg-[#336791]', img: '/image/postgres.png' },
];

const HERO_BADGES = [
    {
        title: 'Smart Solutions',
        subtitle: 'Simplifying IT with practical execution.',
        icon: Lightbulb,
        gradient: 'from-blue-500 to-violet-500',
        className: 'left-0 top-3 -translate-x-[42%]',
        animation: { y: [0, -8, 0] },
        delay: 0,
    },
    {
        title: '100% Assured',
        subtitle: 'Quality',
        icon: ShieldCheck,
        gradient: 'from-violet-500 to-pink-500',
        className: 'right-0 top-8 translate-x-[34%]',
        animation: { y: [0, -7, 0] },
        delay: 0.35,
    },
    {
        title: 'Expert Team',
        subtitle: 'Development',
        icon: Code2,
        gradient: 'from-cyan-500 to-blue-500',
        className: 'bottom-8 left-0 -translate-x-[34%]',
        animation: { y: [0, 8, 0] },
        delay: 0.55,
    },
];

export default function HeroSection({ scrollToSection, settings }) {
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start start', 'end start'],
    });
    const yParallax = useTransform(scrollYProgress, [0, 1], [0, 80]);

    const stats = useMemo(
        () => [
            {
                value: settings?.years_of_experience || '5+',
                label: 'Years Experience',
                gradient: 'from-blue-500 to-cyan-400',
                icon: <CalendarIcon />,
            },
            {
                value: settings?.projects_delivered || '100+',
                label: 'Projects Done',
                gradient: 'from-violet-500 to-pink-500',
                icon: <RocketIcon />,
            },
            {
                value: '50+',
                label: 'Happy Clients',
                gradient: 'from-emerald-500 to-teal-400',
                icon: <StarIcon />,
            },
        ],
        [settings?.projects_delivered, settings?.years_of_experience],
    );

    return (
        <section
            id="home"
            ref={sectionRef}
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
                    border-radius: 12px;
                    box-shadow: 0 12px 36px rgba(15,23,42,0.1), 0 2px 8px rgba(15,23,42,0.04);
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
                    inset: -14%;
                    border-radius: 50%;
                    background:
                        radial-gradient(circle, rgba(59,130,246,0.2) 0%, rgba(139,92,246,0.12) 38%, transparent 72%);
                    animation: pulse-glow 4s ease-in-out infinite;
                }
                .hero-device-shell {
                    background:
                        linear-gradient(145deg, rgba(255,255,255,0.88), rgba(255,255,255,0.45)),
                        radial-gradient(circle at 50% 0%, rgba(99,102,241,0.18), transparent 55%);
                    border: 1px solid rgba(255,255,255,0.8);
                    box-shadow: 0 24px 80px rgba(79,70,229,0.18);
                }
                .dark .hero-device-shell {
                    background:
                        linear-gradient(145deg, rgba(15,23,42,0.8), rgba(15,23,42,0.35)),
                        radial-gradient(circle at 50% 0%, rgba(99,102,241,0.22), transparent 55%);
                    border-color: rgba(255,255,255,0.1);
                    box-shadow: 0 24px 80px rgba(0,0,0,0.45);
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

            <div className="relative z-10 w-full container-landing pt-0 pb-12 lg:py-0 lg:min-h-[calc(100vh-15rem)] lg:flex lg:items-center">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center w-full">
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9, ease: ENTRANCE_EASE }}
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

                        <div className="space-y-0">
                            <motion.p
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.15, duration: 0.6 }}
                                className="mb-2 bg-gradient-to-r from-sky-500 via-indigo-500 to-violet-500 bg-clip-text text-base font-medium uppercase tracking-[0.25em] text-transparent drop-shadow-[0_2px_10px_rgba(99,102,241,0.35)] dark:from-sky-300 dark:via-indigo-300 dark:to-violet-300 sm:mb-3 sm:text-lg md:text-xl"
                            >
                                The best way to escape
                            </motion.p>

                            <motion.h1
                                initial={{ opacity: 0, y: 24, scale: 0.98 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{
                                    delay: 0.2,
                                    duration: 0.9,
                                    ease: ENTRANCE_EASE,
                                }}
                                className="bg-[linear-gradient(100deg,#0ea5e9_0%,#4f46e5_38%,#8b5cf6_68%,#ec4899_100%)] bg-clip-text text-6xl font-black leading-[0.9] tracking-tighter text-transparent drop-shadow-[0_18px_45px_rgba(79,70,229,0.22)] sm:text-7xl md:text-[5.5rem] lg:text-[6rem] xl:text-[6.5rem]"
                            >
                                Problems
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 14 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.35, duration: 0.75 }}
                                className="mb-3 bg-gradient-to-r from-slate-700 via-slate-500 to-slate-700 bg-clip-text text-2xl font-semibold leading-snug tracking-tight text-transparent dark:from-slate-200 dark:via-slate-300 dark:to-slate-200 sm:text-3xl md:text-4xl lg:text-5xl"
                            >
                                is to solve them.
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5, duration: 0.7 }}
                                className="flex flex-col gap-1"
                            >
                                <div className="h-px w-10 bg-gradient-to-r from-transparent via-slate-400 to-transparent" />

                                <div className="text-sm italic tracking-wide text-slate-500 dark:text-slate-400 sm:text-base">
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
                            {settings?.description}
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
                                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Link>

                            <button
                                type="button"
                                onClick={() => scrollToSection('services')}
                                className="inline-flex items-center justify-center gap-2 px-7 py-3.5
                                           border border-slate-300 dark:border-slate-700
                                           hover:border-violet-400 dark:hover:border-violet-500
                                           hover:bg-violet-50 dark:hover:bg-violet-950/30
                                           text-slate-700 dark:text-slate-300 text-sm font-semibold rounded-2xl
                                           transition-all duration-300 group"
                            >
                                Explore Services
                                <ChevronDown className="h-4 w-4 opacity-50 transition-opacity group-hover:opacity-100" />
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

                    <motion.div
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3, duration: 1.1, ease: ENTRANCE_EASE }}
                        className="relative hidden lg:flex items-center justify-center"
                    >
                        <motion.div
                            style={{ y: yParallax }}
                            className="relative flex min-h-[520px] w-full items-center justify-center"
                        >
                            <div className="image-glow" aria-hidden />
                            <div className="absolute h-[430px] w-[430px] rounded-full border border-violet-200/50 dark:border-violet-800/30 xl:h-[500px] xl:w-[500px]" aria-hidden />
                            <div className="absolute h-[350px] w-[350px] rounded-full border border-blue-200/50 dark:border-blue-800/25 xl:h-[410px] xl:w-[410px]" aria-hidden />

                            <div className="hero-device-shell relative z-10 flex h-[380px] w-[380px] items-center justify-center rounded-full xl:h-[440px] xl:w-[440px]">
                                <div className="absolute inset-8 rounded-full border border-white/60 dark:border-white/10" aria-hidden />
                                <img
                                    src="/image/slider1.png"
                                    alt="Cloud Com Solutions"
                                    className="relative z-10 h-auto w-72 object-contain drop-shadow-2xl xl:w-[22rem]"
                                />
                            </div>

                            {HERO_BADGES.map((badge) => (
                                <FloatingHeroBadge key={badge.title} badge={badge} />
                            ))}

                            <TechStackBadge />
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* Bottom fade */}
            <div className="absolute bottom-0 left-0 right-0  bg-gradient-to-t from-white/40 dark:from-black/20 to-transparent pointer-events-none" />
        </section>
    );
}

function FloatingHeroBadge({ badge }) {
    const Icon = badge.icon;

    return (
        <motion.div
            animate={badge.animation}
            transition={{
                duration: 3.7,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: badge.delay,
            }}
            className={`float-card absolute z-20 hidden w-[210px] p-3.5 xl:block ${badge.className}`}
        >
            <div className="shimmer-line" />
            <div className="flex items-center gap-3">
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${badge.gradient} text-white shadow-md`}>
                    <Icon className="h-5 w-5" aria-hidden />
                </div>
                <div className="min-w-0">
                    <p className="text-[10px] font-semibold leading-tight" style={{ color: 'var(--text-muted)' }}>
                        {badge.subtitle}
                    </p>
                    <p className="mt-0.5 text-sm font-black leading-tight" style={{ color: 'var(--text-primary)' }}>
                        {badge.title}
                    </p>
                </div>
            </div>
        </motion.div>
    );
}

function TechStackBadge() {
    return (
        <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{
                duration: 3.7,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 0.75,
            }}
            className="float-card absolute bottom-0 right-0 z-20 hidden translate-x-[32%] p-3.5 xl:block"
        >
            <div className="shimmer-line" />
            <p
                className="mb-2 text-center text-[9px] font-bold uppercase tracking-[0.15em]"
                style={{ color: 'var(--text-muted)' }}
            >
                Tech Stack
            </p>
            <div className="grid grid-cols-3 gap-1.5">
                {TECH_STACK.map((tech) => (
                    <div
                        key={tech.name}
                        className={`tech-icon flex h-10 w-10 items-center justify-center rounded-lg ${tech.bg}`}
                        title={tech.name}
                    >
                        <img
                            src={tech.img}
                            alt={tech.name}
                            className="h-6 w-6 object-contain"
                        />
                    </div>
                ))}
            </div>
        </motion.div>
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

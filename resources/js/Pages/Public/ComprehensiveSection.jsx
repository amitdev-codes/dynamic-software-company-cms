import { Link } from '@inertiajs/react';
import { motion, useInView } from 'framer-motion';
import {useMemo, useRef} from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import {FiAward} from "react-icons/fi";
import {BiCodeBlock, BiUser, BiWrench} from "react-icons/bi";
import {MdAttachMoney, MdFolder, MdSchool, MdWaterDrop} from "react-icons/md";
import {HiBeaker} from "react-icons/hi";

const ICON_MAP = {
    'FiAward': FiAward,
    'BiCodeBlock': BiCodeBlock,
    'MdFolder': MdFolder,
    'HiBeaker': HiBeaker,
    'MdSchool': MdSchool,
    'BiWrench': BiWrench,
    'MdAttachMoney': MdAttachMoney,
    'BiPeople': BiUser,
    'MdWaterDrop': MdWaterDrop,
};
const COLOR_VARIANTS = {
    '#3B82F6': {
        bg: 'bg-blue-50 dark:bg-blue-500/10',
        border: 'border-blue-100 dark:border-blue-500/20',
        hoverBg: 'group-hover:bg-blue-100 dark:group-hover:bg-blue-500/20',
        hoverBorder: 'group-hover:border-blue-200 dark:group-hover:border-blue-400/30',
        text: 'text-blue-600 dark:text-blue-400',
        accentLine: 'from-blue-500 via-blue-500 to-blue-500',
        hoverGlow: 'group-hover:from-blue-500/[0.03] group-hover:to-blue-500/[0.03] dark:group-hover:from-blue-500/[0.06] dark:group-hover:to-blue-500/[0.06]',
    },
    '#8B5CF6': {
        bg: 'bg-purple-50 dark:bg-purple-500/10',
        border: 'border-purple-100 dark:border-purple-500/20',
        hoverBg: 'group-hover:bg-purple-100 dark:group-hover:bg-purple-500/20',
        hoverBorder: 'group-hover:border-purple-200 dark:group-hover:border-purple-400/30',
        text: 'text-purple-600 dark:text-purple-400',
        accentLine: 'from-purple-500 via-purple-500 to-purple-500',
        hoverGlow: 'group-hover:from-purple-500/[0.03] group-hover:to-purple-500/[0.03] dark:group-hover:from-purple-500/[0.06] dark:group-hover:to-purple-500/[0.06]',
    },
    '#F59E0B': {
        bg: 'bg-amber-50 dark:bg-amber-500/10',
        border: 'border-amber-100 dark:border-amber-500/20',
        hoverBg: 'group-hover:bg-amber-100 dark:group-hover:bg-amber-500/20',
        hoverBorder: 'group-hover:border-amber-200 dark:group-hover:border-amber-400/30',
        text: 'text-amber-600 dark:text-amber-400',
        accentLine: 'from-amber-500 via-amber-500 to-amber-500',
        hoverGlow: 'group-hover:from-amber-500/[0.03] group-hover:to-amber-500/[0.03] dark:group-hover:from-amber-500/[0.06] dark:group-hover:to-amber-500/[0.06]',
    },
    '#EC4899': {
        bg: 'bg-pink-50 dark:bg-pink-500/10',
        border: 'border-pink-100 dark:border-pink-500/20',
        hoverBg: 'group-hover:bg-pink-100 dark:group-hover:bg-pink-500/20',
        hoverBorder: 'group-hover:border-pink-200 dark:group-hover:border-pink-400/30',
        text: 'text-pink-600 dark:text-pink-400',
        accentLine: 'from-pink-500 via-pink-500 to-pink-500',
        hoverGlow: 'group-hover:from-pink-500/[0.03] group-hover:to-pink-500/[0.03] dark:group-hover:from-pink-500/[0.06] dark:group-hover:to-pink-500/[0.06]',
    },
    '#10B981': {
        bg: 'bg-emerald-50 dark:bg-emerald-500/10',
        border: 'border-emerald-100 dark:border-emerald-500/20',
        hoverBg: 'group-hover:bg-emerald-100 dark:group-hover:bg-emerald-500/20',
        hoverBorder: 'group-hover:border-emerald-200 dark:group-hover:border-emerald-400/30',
        text: 'text-emerald-600 dark:text-emerald-400',
        accentLine: 'from-emerald-500 via-emerald-500 to-emerald-500',
        hoverGlow: 'group-hover:from-emerald-500/[0.03] group-hover:to-emerald-500/[0.03] dark:group-hover:from-emerald-500/[0.06] dark:group-hover:to-emerald-500/[0.06]',
    },
    '#06B6D4': {
        bg: 'bg-cyan-50 dark:bg-cyan-500/10',
        border: 'border-cyan-100 dark:border-cyan-500/20',
        hoverBg: 'group-hover:bg-cyan-100 dark:group-hover:bg-cyan-500/20',
        hoverBorder: 'group-hover:border-cyan-200 dark:group-hover:border-cyan-400/30',
        text: 'text-cyan-600 dark:text-cyan-400',
        accentLine: 'from-cyan-500 via-cyan-500 to-cyan-500',
        hoverGlow: 'group-hover:from-cyan-500/[0.03] group-hover:to-cyan-500/[0.03] dark:group-hover:from-cyan-500/[0.06] dark:group-hover:to-cyan-500/[0.06]',
    },
    '#14B8A6': {
        bg: 'bg-teal-50 dark:bg-teal-500/10',
        border: 'border-teal-100 dark:border-teal-500/20',
        hoverBg: 'group-hover:bg-teal-100 dark:group-hover:bg-teal-500/20',
        hoverBorder: 'group-hover:border-teal-200 dark:group-hover:border-teal-400/30',
        text: 'text-teal-600 dark:text-teal-400',
        accentLine: 'from-teal-500 via-teal-500 to-teal-500',
        hoverGlow: 'group-hover:from-teal-500/[0.03] group-hover:to-teal-500/[0.03] dark:group-hover:from-teal-500/[0.06] dark:group-hover:to-teal-500/[0.06]',
    },
    '#F97316': {
        bg: 'bg-orange-50 dark:bg-orange-500/10',
        border: 'border-orange-100 dark:border-orange-500/20',
        hoverBg: 'group-hover:bg-orange-100 dark:group-hover:bg-orange-500/20',
        hoverBorder: 'group-hover:border-orange-200 dark:group-hover:border-orange-400/30',
        text: 'text-orange-600 dark:text-orange-400',
        accentLine: 'from-orange-500 via-orange-500 to-orange-500',
        hoverGlow: 'group-hover:from-orange-500/[0.03] group-hover:to-orange-500/[0.03] dark:group-hover:from-orange-500/[0.06] dark:group-hover:to-orange-500/[0.06]',
    },
    '#0EA5E9': {
        bg: 'bg-sky-50 dark:bg-sky-500/10',
        border: 'border-sky-100 dark:border-sky-500/20',
        hoverBg: 'group-hover:bg-sky-100 dark:group-hover:bg-sky-500/20',
        hoverBorder: 'group-hover:border-sky-200 dark:group-hover:border-sky-400/30',
        text: 'text-sky-600 dark:text-sky-400',
        accentLine: 'from-sky-500 via-sky-500 to-sky-500',
        hoverGlow: 'group-hover:from-sky-500/[0.03] group-hover:to-sky-500/[0.03] dark:group-hover:from-sky-500/[0.06] dark:group-hover:to-sky-500/[0.06]',
    },
};

// Card accent colors cycling per index
const cardAccents = [
    {
        bar:     'from-purple-500 to-indigo-500',
        iconBg:  'bg-purple-50 dark:bg-purple-500/10',
        iconBorder: 'border-purple-100 dark:border-purple-500/20',
        iconText:'text-purple-600 dark:text-purple-400',
        btn:     'from-purple-600 to-indigo-600 dark:from-purple-500 dark:to-indigo-500',
        btnGlow: 'shadow-purple-500/25 hover:shadow-purple-500/40',
    },
    {
        bar:     'from-blue-500 to-cyan-500',
        iconBg:  'bg-blue-50 dark:bg-blue-500/10',
        iconBorder: 'border-blue-100 dark:border-blue-500/20',
        iconText:'text-blue-600 dark:text-blue-400',
        btn:     'from-blue-600 to-cyan-500 dark:from-blue-500 dark:to-cyan-400',
        btnGlow: 'shadow-blue-500/25 hover:shadow-blue-500/40',
    },
    {
        bar:     'from-fuchsia-500 to-purple-500',
        iconBg:  'bg-fuchsia-50 dark:bg-fuchsia-500/10',
        iconBorder: 'border-fuchsia-100 dark:border-fuchsia-500/20',
        iconText:'text-fuchsia-600 dark:text-fuchsia-400',
        btn:     'from-fuchsia-600 to-purple-600 dark:from-fuchsia-500 dark:to-purple-500',
        btnGlow: 'shadow-fuchsia-500/25 hover:shadow-fuchsia-500/40',
    },
];

export default function ComprehensiveServicesPage({ comprehensiveServices = [] }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <section
            id="comprehensive-services"
            ref={ref}
            className="relative py-24 overflow-hidden
                bg-gradient-to-br from-slate-50 via-indigo-50/40 to-blue-50/50
                dark:from-[#060910] dark:via-[#0a0f1e] dark:to-[#0d0b22]"
            style={{ fontFamily: "'Poppins', sans-serif" }}
        >
            <style>{`@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');`}</style>

            {/* Bg blobs */}
            <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
                <div className="absolute -top-28 right-1/4 w-96 h-96 rounded-full bg-indigo-300/15 dark:bg-indigo-700/10 blur-[100px]" />
                <div className="absolute bottom-0 left-1/4 w-80 h-80 rounded-full bg-purple-300/15 dark:bg-purple-700/10 blur-[90px]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-blue-300/10 dark:bg-blue-600/5 blur-[80px]" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* ── Header ── */}
                <div className="text-center mb-16">

                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2.5 mb-5
                            text-[10.5px] font-bold tracking-[3px] uppercase
                            text-indigo-600 dark:text-indigo-400
                            bg-indigo-50 dark:bg-indigo-500/10
                            border border-indigo-200 dark:border-indigo-500/25
                            px-4 py-2 rounded-full"
                    >
                        <Sparkles className="w-3.5 h-3.5" />
                        Our Comprehensive Services
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight
                            text-slate-900 dark:text-white"
                    >
                        We Are{' '}
                        <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600
                            dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400
                            bg-clip-text text-transparent">
                            Proficient In…
                        </span>
                    </motion.h2>
                </div>

                {/* ── Cards ── */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {comprehensiveServices.slice(0, 3).map((service, idx) => {
                        const accent = cardAccents[idx % cardAccents.length];

                        // Get icon component - memoize for performance
                        const IconComponent = useMemo(() => {
                            return ICON_MAP[service.icon] || FiAward;
                        }, [service.icon]);

                        // Get color variant - default to blue if not found
                        const iconColor = service.icon_color || '#3B82F6';
                        const colorClasses = COLOR_VARIANTS[iconColor] || COLOR_VARIANTS['#3B82F6'];

                        // Convert hex to RGB for inline styles if needed
                        const hexToRgb = (hex) => {
                            const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
                            return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : '59, 130, 246';
                        };

                        const rgbColor = hexToRgb(iconColor);

                        return (
                            <motion.div
                                key={service.id ?? idx}
                                initial={{ opacity: 0, y: 28 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ delay: idx * 0.1, duration: 0.55 }}
                                className="group relative flex flex-col overflow-hidden rounded-2xl
                                    bg-white dark:bg-white/[0.04]
                                    border border-slate-100 dark:border-white/[0.08]
                                    shadow-[0_4px_24px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.3)]
                                    hover:-translate-y-2
                                    hover:shadow-[0_20px_50px_rgba(99,102,241,0.12)]
                                    dark:hover:shadow-[0_20px_50px_rgba(99,102,241,0.15)]
                                    hover:border-indigo-200 dark:hover:border-white/[0.14]
                                    transition-all duration-300"
                            >
                                {/* Top accent bar */}
                                <div className={`h-[3px] w-full bg-gradient-to-r ${accent.bar}`} />

                                {/* Hover glow overlay */}
                                <div className="absolute inset-0 pointer-events-none rounded-2xl
                                    bg-gradient-to-br from-indigo-500/0 to-purple-500/0
                                    group-hover:from-indigo-500/[0.03] group-hover:to-purple-500/[0.03]
                                    dark:group-hover:from-indigo-500/[0.06] dark:group-hover:to-purple-500/[0.06]
                                    transition-all duration-300" />

                                <div className="relative flex flex-col flex-1 p-8">

                                    {/* Icon */}
                                    {/* Icon wrapper - dynamic color */}
                                    <div className={`w-12 h-12 rounded-xl mb-6 flex items-center justify-center
                                        ${colorClasses.bg} ${colorClasses.border}
                                        ${colorClasses.hoverBg} ${colorClasses.hoverBorder}
                                        border
                                        transition-all duration-300
                                        group-hover:scale-110 group-hover:shadow-lg`}
                                         style={{
                                             boxShadow: `inset 0 0 0 1px rgba(${rgbColor}, 0.1)`,
                                         }}
                                    >
                                        <IconComponent
                                            className={`text-2xl ${colorClasses.text} transition-all duration-300`}
                                            style={{
                                                color: iconColor,
                                                filter: `drop-shadow(0 2px 4px rgba(${rgbColor}, 0.15))`,
                                            }}
                                        />
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-xl font-bold leading-snug mb-3
                                        text-slate-900 dark:text-white
                                        group-hover:text-indigo-700 dark:group-hover:text-indigo-300
                                        transition-colors duration-300">
                                        {service.title}
                                    </h3>

                                    {/* Description */}
                                    <p className="text-[0.9rem] leading-[1.75] flex-grow mb-7
                                        text-slate-500 dark:text-white/55
                                        group-hover:text-slate-600 dark:group-hover:text-white/70
                                        transition-colors duration-300">
                                        {service.description}
                                    </p>

                                    {/* Divider */}
                                    <div className="h-px w-full mb-6
                                        bg-slate-100 dark:bg-white/[0.06]
                                        group-hover:bg-indigo-100 dark:group-hover:bg-indigo-500/15
                                        transition-colors duration-300" />

                                    {/* CTA Button */}
                                    <Link
                                        href={service.link || '#'}
                                        className={`inline-flex items-center gap-2 self-start
                                            px-5 py-2.5 rounded-xl text-white text-sm font-semibold
                                            bg-gradient-to-r ${accent.btn}
                                            shadow-lg ${accent.btnGlow}
                                            group-hover:-translate-y-0.5
                                            transition-all duration-300`}
                                    >
                                        Learn More
                                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-200" />
                                    </Link>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

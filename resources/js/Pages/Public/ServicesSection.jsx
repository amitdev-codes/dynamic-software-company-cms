import { motion, useInView } from 'framer-motion';
import { useRef, useMemo } from 'react';

// Icon imports - only icons used in ICON_MAP
import { FiAward } from 'react-icons/fi';
import { BiCodeBlock, BiUser, BiWrench } from 'react-icons/bi';
import { MdFolder, MdSchool, MdAttachMoney, MdWaterDrop } from 'react-icons/md';
import { HiBeaker } from 'react-icons/hi';

/**
 * Icon mapping - Maps database icon names to React Icon components
 */
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

/**
 * Color variants with Tailwind classes
 * Each color has light/dark mode support
 */
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

export default function ServicesSection({ services }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <section
            id="services"
            className="relative py-20 sm:py-28 overflow-hidden
                bg-gradient-to-br from-slate-50 via-indigo-50/30 to-blue-50/40
                dark:from-[#060910] dark:via-[#0a0f1e] dark:to-[#0d0b22]"
            style={{ fontFamily: "'Poppins', sans-serif" }}
        >
            {/* Background blobs */}
            <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
                <div className="absolute -top-24 left-1/3 w-80 h-80 rounded-full bg-indigo-300/15 dark:bg-indigo-600/8 blur-[90px]" />
                <div className="absolute bottom-0 right-1/4 w-96 h-80 rounded-full bg-blue-300/15 dark:bg-blue-700/8 blur-[100px]" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>

                {/* Header Section */}
                <div className="text-center mb-14 sm:mb-18">

                    {/* Pill label */}
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-3 mb-5"
                    >
                        <span className="h-px w-10 bg-gradient-to-r from-transparent to-indigo-400/60 dark:to-indigo-400/40" />
                        <span className="text-[10.5px] font-bold tracking-[3px] uppercase
                            text-indigo-600 dark:text-indigo-400
                            bg-indigo-50 dark:bg-indigo-500/10
                            border border-indigo-200 dark:border-indigo-500/25
                            px-4 py-1.5 rounded-full">
                            Our Services
                        </span>
                        <span className="h-px w-10 bg-gradient-to-l from-transparent to-indigo-400/60 dark:to-indigo-400/40" />
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight
                            text-slate-700 dark:text-white max-w-3xl mx-auto"
                    >
                        We Are Not Interested to Work with{' '} All Kinds {' '}of IT Services.{' '}
                        <span className="bg-gradient-to-r from-indigo-600 to-blue-500 dark:from-indigo-400 dark:to-blue-400 bg-clip-text text-transparent">
                            We Are Specific.
                        </span>
                    </motion.h2>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {services.map((service, index) => {
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
                                key={service.id ?? index}
                                initial={{ opacity: 0, y: 28 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ delay: index * 0.07, duration: 0.5 }}
                                className="group relative overflow-hidden rounded-2xl
                                    bg-white dark:bg-white/[0.04]
                                    border border-slate-100 dark:border-white/[0.08]
                                    shadow-[0_4px_24px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.3)]
                                    hover:-translate-y-2
                                    hover:border-slate-200 dark:hover:border-white/[0.15]
                                    transition-all duration-350"
                                style={{
                                    '--accent-color': iconColor,
                                }}
                            >
                                {/* Left accent bar - dynamic color */}
                                <div className="absolute left-0 top-0 bottom-0 w-[3px]
                                    bg-gradient-to-b opacity-0 group-hover:opacity-100
                                    transition-opacity duration-350"
                                     style={{
                                         backgroundImage: `linear-gradient(to bottom, ${iconColor}, ${iconColor}dd, ${iconColor}aa)`,
                                     }}
                                />

                                {/* Hover glow - dynamic color */}
                                <div className="absolute inset-0 rounded-2xl pointer-events-none
                                    opacity-0 group-hover:opacity-100
                                    transition-opacity duration-350"
                                     style={{
                                         background: `linear-gradient(135deg, rgba(${rgbColor}, 0.03), rgba(${rgbColor}, 0))`,
                                     }}
                                />

                                <div className="relative p-7 sm:p-8">

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
                                    <h3 className="text-lg sm:text-xl font-bold mb-3 leading-snug
                                        text-slate-900 dark:text-white
                                        transition-colors duration-300"
                                        style={{
                                            color: 'inherit',
                                        }}
                                    >
                                        {service.title}
                                    </h3>

                                    {/* Description */}
                                    <p className="text-[0.9rem] leading-[1.75]
                                        text-slate-500 dark:text-white/55
                                        group-hover:text-slate-600 dark:group-hover:text-white/70
                                        transition-colors duration-300">
                                        {service.description}
                                    </p>

                                    {/* Bottom subtle line - dynamic color */}
                                    <div className="mt-6 h-px w-full
                                        bg-slate-100 dark:bg-white/[0.06]
                                        transition-colors duration-300"
                                         style={{
                                             backgroundColor: `rgba(${rgbColor}, 0)`,
                                             backgroundImage: `linear-gradient(90deg, rgba(${rgbColor}, 0), rgba(${rgbColor}, 0.15), rgba(${rgbColor}, 0))`,
                                             opacity: 0,
                                             transitionProperty: 'opacity, background-image',
                                         }}
                                         className="group-hover:opacity-100"
                                    />

                                    {/* Learn more hint - dynamic color */}
                                    <p className="mt-4 text-[11px] font-semibold tracking-wider uppercase
                                        text-opacity-0 group-hover:text-opacity-100
                                        transition-all duration-300 translate-y-1 group-hover:translate-y-0"
                                       style={{
                                           color: iconColor,
                                           textShadow: `0 0 12px rgba(${rgbColor}, 0.3)`,
                                       }}
                                    >
                                        Learn more →
                                    </p>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

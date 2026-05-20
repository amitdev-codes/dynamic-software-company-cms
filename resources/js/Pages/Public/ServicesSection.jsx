import { motion, useInView } from 'framer-motion';
import { useRef, useMemo } from 'react';

import { FiAward } from 'react-icons/fi';
import { BiCodeBlock, BiUser, BiWrench } from 'react-icons/bi';
import { MdFolder, MdSchool, MdAttachMoney, MdWaterDrop } from 'react-icons/md';
import { HiBeaker } from 'react-icons/hi';

const ICON_MAP = {
    'FiAward':      FiAward,
    'BiCodeBlock':  BiCodeBlock,
    'MdFolder':     MdFolder,
    'HiBeaker':     HiBeaker,
    'MdSchool':     MdSchool,
    'BiWrench':     BiWrench,
    'MdAttachMoney':MdAttachMoney,
    'BiPeople':     BiUser,
    'MdWaterDrop':  MdWaterDrop,
};

const COLOR_VARIANTS = {
    '#3B82F6': { bg: 'bg-blue-50 dark:bg-blue-500/10',     border: 'border-blue-100 dark:border-blue-500/20',     hoverBg: 'group-hover:bg-blue-100 dark:group-hover:bg-blue-500/20',     text: 'text-blue-600 dark:text-blue-400'     },
    '#8B5CF6': { bg: 'bg-purple-50 dark:bg-purple-500/10', border: 'border-purple-100 dark:border-purple-500/20', hoverBg: 'group-hover:bg-purple-100 dark:group-hover:bg-purple-500/20', text: 'text-purple-600 dark:text-purple-400' },
    '#F59E0B': { bg: 'bg-amber-50 dark:bg-amber-500/10',   border: 'border-amber-100 dark:border-amber-500/20',   hoverBg: 'group-hover:bg-amber-100 dark:group-hover:bg-amber-500/20',   text: 'text-amber-600 dark:text-amber-400'   },
    '#EC4899': { bg: 'bg-pink-50 dark:bg-pink-500/10',     border: 'border-pink-100 dark:border-pink-500/20',     hoverBg: 'group-hover:bg-pink-100 dark:group-hover:bg-pink-500/20',     text: 'text-pink-600 dark:text-pink-400'     },
    '#10B981': { bg: 'bg-emerald-50 dark:bg-emerald-500/10',border: 'border-emerald-100 dark:border-emerald-500/20',hoverBg:'group-hover:bg-emerald-100 dark:group-hover:bg-emerald-500/20',text: 'text-emerald-600 dark:text-emerald-400'},
    '#06B6D4': { bg: 'bg-cyan-50 dark:bg-cyan-500/10',     border: 'border-cyan-100 dark:border-cyan-500/20',     hoverBg: 'group-hover:bg-cyan-100 dark:group-hover:bg-cyan-500/20',     text: 'text-cyan-600 dark:text-cyan-400'     },
    '#14B8A6': { bg: 'bg-teal-50 dark:bg-teal-500/10',     border: 'border-teal-100 dark:border-teal-500/20',     hoverBg: 'group-hover:bg-teal-100 dark:group-hover:bg-teal-500/20',     text: 'text-teal-600 dark:text-teal-400'     },
    '#F97316': { bg: 'bg-orange-50 dark:bg-orange-500/10', border: 'border-orange-100 dark:border-orange-500/20', hoverBg: 'group-hover:bg-orange-100 dark:group-hover:bg-orange-500/20', text: 'text-orange-600 dark:text-orange-400' },
    '#0EA5E9': { bg: 'bg-sky-50 dark:bg-sky-500/10',       border: 'border-sky-100 dark:border-sky-500/20',       hoverBg: 'group-hover:bg-sky-100 dark:group-hover:bg-sky-500/20',       text: 'text-sky-600 dark:text-sky-400'       },
};

const hexToRgb = (hex) => {
    const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return r ? `${parseInt(r[1],16)}, ${parseInt(r[2],16)}, ${parseInt(r[3],16)}` : '59, 130, 246';
};

/* ── Service card (extracted so useMemo is called at top level) ── */
function ServiceCard({ service, index, isInView }) {
    const IconComponent = useMemo(() => ICON_MAP[service.icon] || FiAward, [service.icon]);
    const iconColor     = service.icon_color || '#3B82F6';
    const colorClasses  = COLOR_VARIANTS[iconColor] || COLOR_VARIANTS['#3B82F6'];
    const rgb           = hexToRgb(iconColor);

    return (
        <motion.div
            key={service.id ?? index}
            initial={{ opacity: 0, y: 28 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: index * 0.07, duration: 0.5 }}
            className="group relative overflow-hidden rounded-2xl
                bg-white dark:bg-white/[0.04]
                border border-slate-100 dark:border-white/[0.08]
           + shadow-[0_2px_12px_rgba(0,0,0,0.06)]
+ dark:shadow-[0_2px_12px_rgba(0,0,0,0.35)]
                hover:-translate-y-1 hover:border-slate-200 dark:hover:border-white/[0.15]
                transition-all duration-300"
        >
            {/* Left accent bar */}
            <div
                className="absolute left-0 top-0 bottom-0 w-[3px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ backgroundImage: `linear-gradient(to bottom, ${iconColor}, ${iconColor}dd, ${iconColor}aa)` }}
            />

            {/* Hover glow */}
            <div
                className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: `linear-gradient(135deg, rgba(${rgb}, 0.04), rgba(${rgb}, 0))` }}
            />

            <div className="relative p-4 sm:p-5">

                {/* Icon */}
                <div
                    className={`w-10 h-10 rounded-lg mb-3 flex items-center justify-center border
        ${colorClasses.bg} ${colorClasses.border} ${colorClasses.hoverBg}
        transition-all duration-300 group-hover:scale-105`}
                    style={{
                        boxShadow: `0 0 0 1px rgba(${rgb}, 0.08), 0 8px 20px rgba(${rgb}, 0.08)`
                    }}
                >
                    <IconComponent
                        className="text-lg"
                        style={{ color: iconColor }}
                    />
                </div>

                {/* Title */}
                <h3
                    className="text-sm sm:text-base font-semibold leading-snug tracking-tight
        text-slate-900 dark:text-white mb-1.5"
                >
                    {service.title}
                </h3>

                {/* Description */}
                <p
                    className="text-xs sm:text-sm leading-relaxed
        text-slate-600 dark:text-white/60
        line-clamp-3"
                >
                    {service.description}
                </p>

                {/* Bottom subtle accent line */}
                <div
                    className="mt-3 h-px w-full opacity-70"
                    style={{
                        backgroundImage: `linear-gradient(90deg, rgba(${rgb},0), rgba(${rgb},0.25), rgba(${rgb},0))`
                    }}
                />
            </div>
        </motion.div>
    );
}

/* ── Main section ── */
export default function ServicesSection({ services }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <section
            id="services"
            className="section-gap relative overflow-hidden
                bg-gradient-to-br from-slate-50 via-indigo-50/30 to-blue-50/40
                dark:from-[#060910] dark:via-[#0a0f1e] dark:to-[#0d0b22]"
        >
            {/* Bg blobs */}
            <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
                <div className="absolute -top-24 left-1/3 w-80 h-80 rounded-full bg-indigo-300/15 dark:bg-indigo-600/8 blur-[90px]" />
                <div className="absolute bottom-0 right-1/4 w-96 h-80 rounded-full bg-blue-300/15 dark:bg-blue-700/8 blur-[100px]" />
            </div>

            {/* ← consistent container */}
            <div className="container-landing" ref={ref}>

                {/* Header */}
                <div className="text-center mb-12 sm:mb-16">
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
                        className="section-heading text-center !mb-0 max-w-3xl mx-auto"
                    >
                        We Are Not Interested to Work with{' '}
                        <span className="bg-gradient-to-r from-indigo-600 to-blue-500 dark:from-indigo-400 dark:to-blue-400 bg-clip-text text-transparent">
                            All Kinds
                        </span>
                        {' '}of IT Services. We Are{' '}
                        <span className="bg-gradient-to-r from-indigo-600 to-blue-500 dark:from-indigo-400 dark:to-blue-400 bg-clip-text text-transparent">
                            Specific.
                        </span>
                    </motion.h2>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {services.map((service, index) => (
                        <ServiceCard
                            key={service.id ?? index}
                            service={service}
                            index={index}
                            isInView={isInView}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

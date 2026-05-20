import { Link } from '@inertiajs/react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import { useMemo, useRef } from 'react';

import {
    fadeUp,
    getColorClasses,
    getIconComponent,
} from '@/Pages/Public/serviceSectionUtils.js';

const cardAccents = [
    {
        bar: 'from-indigo-500 to-blue-500',
        button: 'from-indigo-600 to-blue-600',
        shadow: 'shadow-indigo-500/20 hover:shadow-indigo-500/35',
    },
    {
        bar: 'from-cyan-500 to-teal-500',
        button: 'from-cyan-600 to-teal-600',
        shadow: 'shadow-cyan-500/20 hover:shadow-cyan-500/35',
    },
    {
        bar: 'from-violet-500 to-fuchsia-500',
        button: 'from-violet-600 to-fuchsia-600',
        shadow: 'shadow-violet-500/20 hover:shadow-violet-500/35',
    },
];

function ComprehensiveCard({ service, index, isInView }) {
    const IconComponent = useMemo(
        () => getIconComponent(service.icon),
        [service.icon],
    );
    const iconColor = service.icon_color || '#3B82F6';
    const colorClasses = getColorClasses(iconColor);
    const accent = cardAccents[index % cardAccents.length];

    return (
        <motion.article
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={fadeUp}
            transition={{ delay: index * 0.08, duration: 0.48 }}
            className="group relative flex h-full min-h-[320px] flex-col overflow-hidden rounded-lg border border-slate-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-500/10 dark:border-white/10 dark:bg-white/[0.04] dark:hover:border-indigo-400/30 dark:hover:shadow-indigo-950/30"
        >
            <div
                className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${accent.bar}`}
                aria-hidden
            />

            <div className="mb-6 flex items-start justify-between gap-4">
                <div
                    className={`flex h-12 w-12 items-center justify-center rounded-lg border ${colorClasses.bg} ${colorClasses.border}`}
                >
                    <IconComponent
                        className={`text-2xl ${colorClasses.text}`}
                        aria-hidden
                    />
                </div>

                <span className="rounded-full border border-slate-200 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400 dark:border-white/10 dark:text-white/35">
                    0{index + 1}
                </span>
            </div>

            <h3 className="mb-3 text-xl font-bold leading-snug text-slate-900 transition-colors group-hover:text-indigo-700 dark:text-white dark:group-hover:text-indigo-300">
                {service.title}
            </h3>

            <p className="mb-6 line-clamp-5 flex-1 text-sm leading-relaxed text-slate-600 dark:text-white/65">
                {service.description}
            </p>

            <div className="mb-6 space-y-2 border-t border-slate-100 pt-5 dark:border-white/10">
                {['Discovery', 'Implementation', 'Support'].map((item) => (
                    <div
                        key={item}
                        className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-white/50"
                    >
                        <CheckCircle2 className="h-3.5 w-3.5 text-indigo-500 dark:text-indigo-300" />
                        {item}
                    </div>
                ))}
            </div>

            <Link
                href={service.link || '/contact'}
                className={`inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r px-5 py-3 text-sm font-bold text-white shadow-lg transition-all duration-300 group-hover:-translate-y-0.5 ${accent.button} ${accent.shadow}`}
            >
                Learn More
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
        </motion.article>
    );
}

export default function ComprehensiveSection({ comprehensiveServices = [] }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });
    const featuredServices = comprehensiveServices.slice(0, 3);

    return (
        <section
            id="comprehensive-services"
            className="section-gap relative overflow-hidden bg-white dark:bg-[#070b14]"
        >
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-200 to-transparent dark:via-indigo-500/25" />

            <div className="container-landing relative z-10" ref={ref}>
                <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-12">
                    <motion.div
                        initial="hidden"
                        animate={isInView ? 'visible' : 'hidden'}
                        variants={fadeUp}
                        transition={{ duration: 0.42 }}
                        className="mb-5 inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-4 py-2 text-[10.5px] font-bold uppercase tracking-[3px] text-indigo-600 dark:border-indigo-500/25 dark:bg-indigo-500/10 dark:text-indigo-300"
                    >
                        <Sparkles className="h-3.5 w-3.5" aria-hidden />
                        Comprehensive Services
                    </motion.div>

                    <motion.h2
                        initial="hidden"
                        animate={isInView ? 'visible' : 'hidden'}
                        variants={fadeUp}
                        transition={{ duration: 0.48, delay: 0.08 }}
                        className="section-heading !mb-0 text-center"
                    >
                        Deeper capability for work that needs{' '}
                        <span className="bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent dark:from-indigo-300 dark:to-blue-300">
                            end-to-end ownership
                        </span>
                    </motion.h2>

                    <motion.p
                        initial="hidden"
                        animate={isInView ? 'visible' : 'hidden'}
                        variants={fadeUp}
                        transition={{ duration: 0.48, delay: 0.16 }}
                        className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-white/65 sm:text-base"
                    >
                        Strategy, implementation, and ongoing support arranged into
                        clear service paths.
                    </motion.p>
                </div>

                {featuredServices.length > 0 ? (
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                        {featuredServices.map((service, index) => (
                            <ComprehensiveCard
                                key={service.id ?? `${service.title}-${index}`}
                                service={service}
                                index={index}
                                isInView={isInView}
                            />
                        ))}
                    </div>
                ) : (
                    <motion.div
                        initial="hidden"
                        animate={isInView ? 'visible' : 'hidden'}
                        variants={fadeUp}
                        transition={{ duration: 0.42 }}
                        className="rounded-lg border border-slate-200 bg-slate-50 p-10 text-center dark:border-white/10 dark:bg-white/[0.04]"
                    >
                        <p className="text-sm font-semibold text-slate-500 dark:text-white/50">
                            Comprehensive services will be available soon.
                        </p>
                    </motion.div>
                )}
            </div>
        </section>
    );
}

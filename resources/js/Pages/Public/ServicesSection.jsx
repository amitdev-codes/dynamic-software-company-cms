import { motion, useInView } from 'framer-motion';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { useMemo, useRef } from 'react';

import {
    fadeUp,
    getColorClasses,
    getIconComponent,
} from '@/Pages/Public/serviceSectionUtils.js';

function ServiceCard({ service, index, isInView }) {
    const IconComponent = useMemo(
        () => getIconComponent(service.icon),
        [service.icon],
    );
    const iconColor = service.icon_color || '#3B82F6';
    const colorClasses = getColorClasses(iconColor);

    return (
        <motion.article
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={fadeUp}
            transition={{ delay: index * 0.05, duration: 0.42 }}
            className="group relative flex h-full min-h-[190px] flex-col overflow-hidden rounded-lg border border-slate-200/80 bg-white/95 p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-500/10 dark:border-white/10 dark:bg-white/[0.04] dark:hover:border-indigo-400/30 dark:hover:shadow-indigo-950/30"
        >
            <div
                className="absolute inset-x-0 top-0 h-1 opacity-80"
                style={{ backgroundColor: iconColor }}
                aria-hidden
            />

            <div className="mb-4 flex items-start justify-between gap-4">
                <div
                    className={`flex h-11 w-11 items-center justify-center rounded-lg border ${colorClasses.bg} ${colorClasses.border}`}
                >
                    <IconComponent
                        className={`text-xl ${colorClasses.text}`}
                        aria-hidden
                    />
                </div>

                <ArrowUpRight className="h-4 w-4 text-slate-300 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-indigo-500 dark:text-white/25 dark:group-hover:text-indigo-300" />
            </div>

            <h3 className="mb-2 text-base font-bold leading-snug tracking-tight text-slate-900 dark:text-white">
                {service.title}
            </h3>

            <p className="line-clamp-3 text-sm leading-relaxed text-slate-600 dark:text-white/65">
                {service.description}
            </p>
        </motion.article>
    );
}

export default function ServicesSection({ services = [] }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <section
            id="services"
            className="section-gap relative overflow-hidden border-y border-slate-200/70 bg-slate-50 dark:border-white/10 dark:bg-[#080d18]"
        >
            <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.06)_1px,transparent_1px)] bg-[size:40px_40px] opacity-60 dark:opacity-25" />

            <div className="container-landing relative z-10" ref={ref}>
                <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-12">
                    <motion.div
                        initial="hidden"
                        animate={isInView ? 'visible' : 'hidden'}
                        variants={fadeUp}
                        transition={{ duration: 0.42 }}
                        className="mb-5 inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-white px-4 py-2 text-[10.5px] font-bold uppercase tracking-[3px] text-indigo-600 shadow-sm dark:border-indigo-500/25 dark:bg-indigo-500/10 dark:text-indigo-300"
                    >
                        <Sparkles className="h-3.5 w-3.5" aria-hidden />
                        Our Services
                    </motion.div>

                    <motion.h2
                        initial="hidden"
                        animate={isInView ? 'visible' : 'hidden'}
                        variants={fadeUp}
                        transition={{ duration: 0.48, delay: 0.08 }}
                        className="section-heading !mb-0 text-center text-gray-900 dark:text-white"
                    >
                        Focused IT services for problems that need{' '}
                        <span className="bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent dark:from-indigo-300 dark:to-blue-300">
                            specific execution
                        </span>
                    </motion.h2>

                    <motion.p
                        initial="hidden"
                        animate={isInView ? 'visible' : 'hidden'}
                        variants={fadeUp}
                        transition={{ duration: 0.48, delay: 0.16 }}
                        className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-white/65 sm:text-base"
                    >
                        We keep the service catalog practical, measurable, and built
                        around delivery.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:gap-5">
                    {services.map((service, index) => (
                        <ServiceCard
                            key={service.id ?? `${service.title}-${index}`}
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

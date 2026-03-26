import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Link } from '@inertiajs/react';

export default function ServicesSection({ defaultServices, comprehensiveServices }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <section id="services" className="section-gap bg-slate-50">
            <div ref={ref} className="container-landing">

                {/* ── Section header ─────────────────────────────── */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12 md:mb-16"
                >
                    <span className="inline-block text-blue-600 font-semibold text-sm tracking-wider uppercase mb-3">
                        Our Services
                    </span>
                    <h2 className="font-black leading-tight mb-0">
                        We Are Not Interested to Work with All Kinds of IT Services.{' '}
                        <span className="text-blue-600">We Are Specific.</span>
                    </h2>
                </motion.div>

                {/* ── Default services grid ───────────────────────── */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-16 md:mb-24">
                    {defaultServices.map((service, index) => (
                        <motion.div
                            key={service.id ?? index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: index * 0.08, duration: 0.5 }}
                            className="bg-white rounded-xl p-5 md:p-6 shadow-md hover:shadow-xl
                                       transition-all duration-300 group hover:-translate-y-2"
                        >
                            {/* Icon */}
                            <div className="w-12 h-12 md:w-16 md:h-16 mb-4">
                                <img
                                    src={service.image}
                                    alt={service.title}
                                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                                />
                            </div>

                            {/* Title */}
                            <h3 className="!text-lg md:!text-xl font-bold text-slate-900 mb-2">
                                {service.title}
                            </h3>

                            {/* Description */}
                            <p className="!text-sm text-slate-600 leading-relaxed mb-0">
                                {service.description}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* ── Comprehensive services ──────────────────────── */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.4, duration: 0.6 }}
                >
                    {/* Sub-header */}
                    <div className="text-center mb-10 md:mb-12">
                        <span className="inline-block text-blue-600 font-semibold text-sm tracking-wider uppercase mb-3">
                            Our Comprehensive Services
                        </span>
                        <h2 className="font-black mb-0">
                            We Are Proficient In...
                        </h2>
                    </div>

                    {/* Comprehensive grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                        {comprehensiveServices.map((service, index) => (
                            <motion.div
                                key={service.id ?? index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                                className="group relative bg-white rounded-2xl p-6 md:p-8
                                           shadow-lg hover:shadow-2xl transition-all duration-300
                                           hover:-translate-y-1"
                            >
                                {/* Gradient accent top-left on hover */}
                                <div className="absolute top-0 left-0 w-1 h-0 group-hover:h-full
                                                bg-gradient-to-b from-blue-500 to-purple-500
                                                rounded-l-2xl transition-all duration-500" />

                                {/* Icon */}
                                <div className="w-14 h-14 md:w-20 md:h-20 mb-5">
                                    <img
                                        src={service.image}
                                        alt={service.title}
                                        className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                                    />
                                </div>

                                {/* Title */}
                                <h3 className="!text-xl md:!text-2xl font-bold text-slate-900 mb-3">
                                    {service.title}
                                </h3>

                                {/* Description */}
                                <p className="text-slate-600 leading-relaxed mb-5">
                                    {service.description}
                                </p>

                                {/* Arrow link — visible on hover */}
                                <Link
                                    href={service.link || '/services'}
                                    className="inline-flex items-center gap-2
                                               opacity-0 group-hover:opacity-100
                                               translate-y-2 group-hover:translate-y-0
                                               transition-all duration-300"
                                    aria-label={`Learn more about ${service.title}`}
                                >
                                    <img
                                        src="/image/arrow-img.png"
                                        alt="Learn more"
                                        className="w-7 h-7 md:w-8 md:h-8"
                                    />
                                    <span className="!text-sm font-semibold text-blue-600">
                                        Learn More
                                    </span>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

            </div>
        </section>
    );
}

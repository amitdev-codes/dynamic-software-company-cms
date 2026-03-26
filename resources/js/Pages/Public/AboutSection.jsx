import { Link } from '@inertiajs/react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function AboutSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    const features = [
        { icon: '💡', label: 'Innovation',     value: 'R&D Driven'   },
        { icon: '💰', label: 'Cost-Effective', value: 'Solutions'    },
        { icon: '🎯', label: 'Client-Focused', value: 'Approach'     },
        { icon: '✅', label: 'Quality',        value: 'Assured'      },
    ];

    return (
        <section id="about" className="section-gap bg-gradient-to-b from-white to-slate-50">
            <div ref={ref} className="container-landing">

                {/* ══════════════════════════════════════════════════
                    Top · Image + Content
                ══════════════════════════════════════════════════ */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center mb-16 md:mb-24">

                    {/* ── Left · Image ───────────────────────────── */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        <div className="relative">
                            {/* Main image */}
                            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                                <img
                                    src="/image/about-us.jpg"
                                    alt="CloudCom Team"
                                    className="w-full h-auto object-cover"
                                />
                            </div>

                            {/* Experience badge */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0 }}
                                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                                transition={{ delay: 0.5, type: 'spring', stiffness: 100 }}
                                className="absolute -bottom-5 -right-5 md:-bottom-6 md:-right-6
                                           bg-white rounded-full shadow-2xl
                                           p-5 md:p-8 border-4 md:border-8 border-white"
                            >
                                <div className="text-center">
                                    <div className="text-3xl md:text-5xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-1">
                                        12+
                                    </div>
                                    <div className="font-bold text-[10px] md:text-sm text-gray-600 uppercase tracking-wide leading-tight">
                                        Years of<br />Experience
                                    </div>
                                </div>
                            </motion.div>

                            {/* Decorative corners */}
                            <div className="absolute -top-4 -left-4 md:-top-6 md:-left-6 w-24 h-24 md:w-32 md:h-32 border-4 border-blue-100 rounded-3xl -z-10" />
                            <div className="absolute -bottom-4 -right-4 md:-bottom-6 md:-right-6 w-32 h-32 md:w-40 md:h-40 bg-gradient-to-br from-blue-100 to-purple-100 rounded-3xl -z-10" />
                        </div>
                    </motion.div>

                    {/* ── Right · Content ────────────────────────── */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="space-y-5 md:space-y-6"
                    >
                        {/* Badge + Heading */}
                        <div>
                            <span className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-4">
                                Know About Us
                            </span>
                            <h2 className="font-black leading-tight mb-0">
                                We Strive to be a Better{' '}
                                <span className="text-blue-600">Technology Partner</span>
                            </h2>
                        </div>

                        {/* Body text */}
                        <div className="space-y-3">
                            <p className="leading-relaxed">
                                We have simplified Information Technology (IT) services across organizations,
                                helping them solve their problems with cost-effective software and hardware solutions.
                            </p>
                            <p className="leading-relaxed">
                                We believe no solution can deliver significant results unless it goes through{' '}
                                <span className="font-bold text-slate-900">
                                    Research and Development (R&amp;D)
                                </span>.
                            </p>
                        </div>

                        {/* Feature grid */}
                        <div className="grid grid-cols-2 gap-3 md:gap-4 py-4 md:py-6">
                            {features.map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                                    transition={{ delay: 0.4 + i * 0.1 }}
                                    className="bg-white rounded-xl p-3 md:p-4 shadow-md hover:shadow-lg
                                               transition-shadow duration-300 group cursor-default"
                                >
                                    <div className="text-2xl md:text-3xl mb-1.5 group-hover:scale-110 transition-transform duration-300">
                                        {item.icon}
                                    </div>
                                    <div className="text-xs md:text-sm font-semibold text-slate-900">
                                        {item.label}
                                    </div>
                                    <div className="text-[10px] md:text-xs text-slate-500">
                                        {item.value}
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* CTA */}
                        <Link href="/contact" className="btn-primary group w-fit">
                            Learn More
                            <svg className="w-5 h-5 transition-transform group-hover:translate-x-1"
                                 fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                      d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                    </motion.div>
                </div>

                {/* ══════════════════════════════════════════════════
                    Bottom · Approach banner
                ══════════════════════════════════════════════════ */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                    className="relative bg-slate-900 rounded-3xl overflow-hidden"
                >
                    {/* Background overlays */}
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/95 to-transparent z-10" />
                    <div className="absolute inset-0 bg-[url('/image/wave-line-1.png')] bg-cover bg-center opacity-10" />

                    <div className="relative z-20 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12
                                    p-8 sm:p-10 md:p-12 lg:p-16 items-center">

                        {/* ── Left · Text ────────────────────────── */}
                        <div className="text-white space-y-4 md:space-y-6">
                            <span className="inline-block text-blue-400 font-semibold text-sm tracking-wider uppercase">
                                Our Approach
                            </span>

                            <h3 className="!text-3xl md:!text-4xl lg:!text-5xl font-black leading-tight !text-white">
                                Unlock Answers Through Questions
                            </h3>

                            <p className="!text-base md:!text-xl !text-gray-300 leading-relaxed">
                                We prioritize trust by fostering effective communication. Solutions emerge from
                                understanding past problems, which starts with discussing the issues, their causes,
                                reasoning, impacted areas, and expectations for resolution.
                            </p>

                            <p className="!text-sm md:!text-lg !text-gray-400 leading-relaxed">
                                This cycle continues until we have sufficient knowledge to design measurable
                                input, control, and output dimensions.
                            </p>

                            <Link
                                href="/contact"
                                className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300
                                           transition-colors font-semibold text-base md:text-lg group mt-2"
                            >
                                Have a question? We're here to help!
                                <svg className="w-5 h-5 transition-transform group-hover:translate-x-1"
                                     fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                          d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </Link>
                        </div>

                        {/* ── Right · Illustration ───────────────── */}
                        <div className="flex items-center justify-center">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                                transition={{ delay: 0.8, duration: 0.6 }}
                                className="relative w-full max-w-xs md:max-w-sm lg:max-w-md"
                            >
                                <img
                                    src="/image/appdig.png"
                                    alt="Digital Approach Illustration"
                                    className="w-full h-auto drop-shadow-2xl"
                                />
                                {/* Animated glow */}
                                <motion.div
                                    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                                    className="absolute inset-0 bg-blue-500 blur-3xl -z-10"
                                />
                            </motion.div>
                        </div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}

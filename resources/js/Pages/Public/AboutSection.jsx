import { Link } from '@inertiajs/react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Lightbulb, Wallet, Users, CheckCircle2 } from 'lucide-react';

export default function AboutSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-80px' });

    const features = [
        { icon: Lightbulb, label: 'Innovation', value: 'R&D Driven', color: '#8b5cf6' },
        { icon: Wallet, label: 'Cost-Effective', value: 'Solutions', color: '#3b82f6' },
        { icon: Users, label: 'Client-Focused', value: 'Approach', color: '#1e40af' },
        { icon: CheckCircle2, label: 'Quality', value: 'Assured', color: '#a855f7' },
    ];

    return (
        <section id="about" className="py-16 lg:py-20 relative overflow-hidden">
            {/* Background blobs */}
            <div className="absolute inset-0 pointer-events-none -z-10">
                <div className="absolute top-10 right-10 w-80 h-80 rounded-full bg-violet-100/40 dark:bg-violet-900/10 blur-[90px]" />
                <div className="absolute bottom-10 left-10 w-64 h-64 rounded-full bg-blue-100/40 dark:bg-blue-900/10 blur-[70px]" />
            </div>

            <div className="container-landing" ref={ref}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                    {/* LEFT: Image + Floating Stat */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                        className="relative"
                    >
                        {/* Floating stat */}


                        <img
                            src="/image/team.png"
                            alt="Our Team"
                            className="relative z-10 w-full rounded-2xl shadow-2xl aspect-[4/3] object-cover"
                        />

                        {/* Decorative accent */}
                        <div className="absolute -bottom-6 -right-6 w-36 h-36 rounded-full bg-gradient-to-br from-violet-200 to-purple-200 dark:from-violet-800/30 dark:to-purple-800/30 blur-2xl -z-10" />
                    </motion.div>

                    {/* RIGHT: Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                        className="space-y-6"
                    >
                        <span className="inline-block px-4 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-400 rounded-full text-xs font-semibold tracking-widest">
                            KNOW ABOUT US
                        </span>

                        <h2 className="text-4xl lg:text-5xl font-bold leading-tight">
                            We Strive to be a Better{' '}
                            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                                Technology Partner
                            </span>
                        </h2>

                        <div className="space-y-4 text-slate-600 dark:text-slate-400">
                            <p>
                                We simplify IT services for organizations with cost-effective, high-impact
                                software and hardware solutions.
                            </p>
                            <p>
                                Every solution we deliver is backed by strong{' '}
                                <strong className="text-slate-800 dark:text-slate-200">Research &amp; Development</strong>.
                            </p>
                        </div>

                        {/* Features */}
                        <div className="grid grid-cols-2 gap-3 pt-2">
                            {features.map((f, i) => {
                                const Icon = f.icon;
                                return (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                                        transition={{ delay: 0.2 + i * 0.07 }}
                                        className="flex gap-3 p-4 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all"
                                        style={{ borderLeft: `4px solid ${f.color}` }}
                                    >
                                        <div
                                            className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                                            style={{ backgroundColor: f.color }}
                                        >
                                            <Icon size={18} color="#fff" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-sm">{f.label}</p>
                                            <p className="text-xs text-slate-500 dark:text-slate-400">{f.value}</p>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>

                        {/* CTA */}
                        <div className="pt-4">
                            <Link
                                href="/services"
                                className="btn-primary inline-flex items-center gap-2 group"
                            >
                                Learn More
                                <span className="group-hover:translate-x-0.5 transition">→</span>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

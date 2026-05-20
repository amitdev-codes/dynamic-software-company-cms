import { ArrowRight } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

/* ── Bubble size classes ── */
const sizeStyles = {
    sm: 'w-12 h-12 text-[9px]',
    md: 'w-16 h-16 text-[10px]',
    lg: 'w-20 h-20 text-[11px]',
    xl: 'w-24 h-24 text-[12px]',
};

/* ── Single bubble ── */
const Bubble = ({ label, size, style }) => (
    <div
        className={`absolute rounded-full font-semibold flex items-center justify-center text-center px-1
            bg-white/10 border border-white/25 text-white/85
            backdrop-blur-sm shadow-[0_2px_12px_rgba(0,0,0,0.15)]
            hover:bg-blue-500/20 hover:border-blue-400/50 hover:text-white
            transition-all duration-300 cursor-default
            ${sizeStyles[size]}`}
        style={style}
    >
        {label}
    </div>
);

/* ── Vertical divider ── */
const Divider = () => (
    <div className="relative mx-1 flex-shrink-0 flex flex-col items-center" style={{ height: '160px' }}>
        <div className="w-px flex-1 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
        <div className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_12px_#3b82f6] flex-shrink-0" />
        <div className="w-px flex-1 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
    </div>
);

/* ── Phase column ── */
const Phase = ({ title, children, glow = false }) => (
    <div className="flex-1 flex flex-col items-center gap-3 min-w-0">
        <div
            className={`relative w-full ${glow ? 'bg-[radial-gradient(circle,rgba(59,130,246,0.12),transparent_70%)]' : ''}`}
            style={{ height: '160px' }}
        >
            {children}
        </div>
        <span className="text-[9px] font-bold uppercase tracking-[2px] text-white/40 text-center">
            {title}
        </span>
    </div>
);

/* ── Main section ── */
const QuestionSection = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-80px' });

    return (
        <section
            className="section-gap relative overflow-hidden
                bg-gradient-to-br from-slate-100 via-blue-50/40 to-indigo-50
                dark:from-[#060910] dark:via-[#0a0f1e] dark:to-[#0d0b22]"
            id="approach"
        >
            {/* Bg blobs */}
            <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
                <div className="absolute -top-20 left-1/4 w-72 h-72 rounded-full bg-blue-300/15 dark:bg-blue-600/10 blur-[80px]" />
                <div className="absolute -bottom-20 right-1/4 w-96 h-72 rounded-full bg-purple-300/15 dark:bg-purple-700/10 blur-[100px]" />
            </div>

            <div className="container-landing" ref={ref}>
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, ease: 'easeOut' }}
                    className="relative rounded-2xl overflow-hidden
                        bg-[#0D1117]
                        shadow-[0_40px_100px_rgba(0,0,0,0.25)]
                        dark:shadow-[0_40px_100px_rgba(0,0,0,0.5)]
                        border border-white/[0.06]"
                >
                    {/* Top shimmer */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />
                    {/* Radial glow */}
                    <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-blue-600/5 blur-[100px] pointer-events-none" />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center p-8 sm:p-10 md:p-12 lg:p-14">

                        {/* ── Left: text ── */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.15 }}
                        >
                            <span className="block text-[11px] font-bold tracking-[2.5px] uppercase text-blue-400 mb-4">
                                Our Approach
                            </span>

                            <h2 className="text-3xl md:text-4xl font-black leading-tight text-white mb-5">
                                Unlock Answers<br />Through{' '}
                                <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-rose-400 bg-clip-text text-transparent">
                                    Questions
                                </span>
                            </h2>

                            <p className="text-sm text-white/60 leading-relaxed mb-4">
                                We prioritize trust by fostering effective communication.
                                Solutions emerge from understanding past problems, which
                                starts with discussing the issues, their causes, reasoning,
                                impacted areas, and expectations for resolution.
                            </p>

                            <p className="text-sm text-white/60 leading-relaxed mb-7">
                                This cycle continues until we have sufficient knowledge to
                                design measurable input, control, and output dimensions.
                            </p>

                            <a
                                href="#contact"
                                className="inline-flex items-center gap-2.5 text-blue-400 hover:text-blue-300
                                    font-semibold text-sm group transition-colors duration-200"
                            >
                                Have a question? We're here to help!
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                            </a>
                        </motion.div>

                        {/* ── Right: diagram ── */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.25 }}
                            className="flex justify-center items-center"
                        >
                            <div className="flex items-center w-full max-w-sm">

                                {/* Communication */}
                                <Phase title="Communication">
                                    <Bubble label="Problems"    size="sm" style={{ top: '20%',    left: '0%'   }} />
                                    <Bubble label="Effect"      size="sm" style={{ bottom: '20%', left: '0%'   }} />
                                    <Bubble label="Reasons"     size="md" style={{ top: '10%',    left: '30%'  }} />
                                    <Bubble label="Expectation" size="md" style={{ bottom: '10%', left: '30%'  }} />
                                </Phase>

                                <Divider />

                                {/* Knowledge */}
                                <Phase title="Knowledge" glow>
                                    <Bubble label="Design"  size="md" style={{ top: '15%',  left: '10%'                              }} />
                                    <Bubble label="Output"  size="md" style={{ top: '15%',  right: '10%'                             }} />
                                    <Bubble label="Input"   size="lg" style={{ top: '45%',  left: '50%', transform: 'translateX(-50%)' }} />
                                </Phase>

                                <Divider />

                                {/* Development */}
                                <Phase title="Development">
                                    <Bubble label="Solutions" size="xl" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />
                                </Phase>

                            </div>
                        </motion.div>

                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default QuestionSection;

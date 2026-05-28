import { ArrowRight } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

/* ── Bubble size classes ── */
const sizeStyles = {
    sm: 'h-12 w-12 text-[9px]',
    md: 'h-14 w-14 text-[9px]',
    lg: 'h-16 w-16 text-[10px]',
    xl: 'h-20 w-20 text-[11px]',
};

/* ── Single bubble ── */
const Bubble = ({ label, size, style }) => (
    <div
        className={`absolute rounded-full font-semibold flex items-center justify-center text-center px-2
            bg-white/10 border border-white/25 text-white/85
            backdrop-blur-sm shadow-[0_2px_12px_rgba(0,0,0,0.15)]
            hover:bg-blue-500/20 hover:border-blue-400/50 hover:text-white
            transition-all duration-300 cursor-default leading-[1.05]
            ${sizeStyles[size]}`}
        style={style}
    >
        <span className="block max-w-full break-words">{label}</span>
    </div>
);

/* ── Vertical divider ── */
const Divider = () => (
    <div className="relative mx-2 flex-shrink-0 flex flex-col items-center" style={{ height: '176px' }}>
        <div className="w-px flex-1 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
        <div className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_12px_#3b82f6] flex-shrink-0" />
        <div className="w-px flex-1 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
    </div>
);

/* ── Phase column ── */
const Phase = ({ title, children, glow = false }) => (
    <div className="flex min-w-[104px] flex-1 flex-col items-center gap-3">
        <div
            className={`relative w-full ${glow ? 'bg-[radial-gradient(circle,rgba(59,130,246,0.12),transparent_70%)]' : ''}`}
            style={{ height: '176px' }}
        >
            {children}
        </div>
        <span className="w-full text-center text-[10px] font-bold uppercase tracking-[1px] text-white/45 leading-tight">
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

                    <div className="grid grid-cols-1 gap-10 items-center p-8 sm:p-10 md:grid-cols-[minmax(0,0.95fr)_minmax(340px,1.05fr)] md:gap-8 md:p-12 lg:gap-10 lg:p-14">

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
                            className="flex justify-center items-center overflow-x-auto pb-2 md:overflow-visible md:pb-0"
                        >
                            <div className="flex w-max min-w-[420px] items-center justify-center md:w-full md:min-w-0 md:max-w-[460px]">

                                {/* Communication */}
                                <Phase title="Communication">
                                    <Bubble label="Problems"    size="sm" style={{ top: '8px',     left: '2px'  }} />
                                    <Bubble label="Reasons"     size="md" style={{ top: '30px',    right: '0'   }} />
                                    <Bubble label="Effect"      size="sm" style={{ bottom: '34px', left: '6px'  }} />
                                    <Bubble label="Expectation" size="lg" style={{ bottom: '0',    right: '0'   }} />
                                </Phase>

                                <Divider />

                                {/* Knowledge */}
                                <Phase title="Knowledge" glow>
                                    <Bubble label="Design"  size="md" style={{ top: '18px',  left: '0'                               }} />
                                    <Bubble label="Output"  size="md" style={{ top: '18px',  right: '0'                              }} />
                                    <Bubble label="Input"   size="lg" style={{ bottom: '16px', left: '50%', transform: 'translateX(-50%)' }} />
                                </Phase>

                                <Divider />

                                {/* Development */}
                                <Phase title="Development">
                                    <Bubble label="Solutions" size="xl" style={{ top: '48%', left: '50%', transform: 'translate(-50%, -50%)' }} />
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

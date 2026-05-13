import { ArrowRight } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const bubbles = {
    communication: [
        { label: 'Problems', size: 'sm', style: { top: '8%',   left: '2%'  } },
        { label: 'Effect',   size: 'sm', style: { bottom: '8%', left: '2%'  } },
        { label: 'Reasons',  size: 'md', style: { top: '5%',   left: '32%' } },
        { label: 'Expectation', size: 'md', style: { bottom: '5%', left: '28%' } },
    ],
    knowledge: [
        { label: 'Design', size: 'md', style: { top: '10%',  left: '8%'              } },
        { label: 'Output', size: 'md', style: { top: '10%',  right: '8%'             } },
        { label: 'Input',  size: 'lg', style: { top: '44%',  left: '50%', transform: 'translateX(-50%)' } },
    ],
    development: [
        { label: 'Solutions', size: 'xl', style: { top: '20%', left: '50%', transform: 'translateX(-50%)' } },
    ],
};

const sizeClasses = {
    sm: 'px-2.5 py-1 text-[10px]',
    md: 'px-3 py-1.5 text-[10px]',
    lg: 'px-4 py-2 text-[11px]',
    xl: 'px-5 py-2.5 text-[12px]',
};

const Bubble = ({ label, size, style }) => (
    <div
        className={`absolute rounded-full font-semibold whitespace-nowrap
            bg-white/10 dark:bg-white/10
            border border-white/25 dark:border-white/20
            text-white/85 dark:text-white/80
            backdrop-blur-sm
            shadow-[0_2px_12px_rgba(0,0,0,0.15)]
            hover:bg-blue-500/20 hover:border-blue-400/50 hover:text-white
            transition-all duration-300 cursor-default
            ${sizeClasses[size]}`}
        style={style}
    >
        {label}
    </div>
);

const Divider = () => (
    <div className="relative mx-3 flex-shrink-0 flex flex-col items-center">
        <div className="w-px h-24 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
        <div className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_12px_#3b82f6]" />
    </div>
);

const Phase = ({ title, children, glow = false }) => (
    <div className="flex-1 flex flex-col items-center gap-4">
        <div className={`relative w-[148px] h-[148px] ${glow ? 'bg-[radial-gradient(circle,rgba(59,130,246,0.15),transparent_70%)]' : ''}`}>
            {children}
        </div>
        <span className="text-[10px] font-bold uppercase tracking-[2px] text-white/40">
            {title}
        </span>
    </div>
);

const QuestionSection = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-80px' });

    return (
        <section
            className="py-16 pb-24 relative overflow-hidden
                bg-gradient-to-br from-slate-100 via-blue-50/40 to-indigo-50
                dark:bg-gradient-to-br dark:from-[#060910] dark:via-[#0a0f1e] dark:to-[#0d0b22]"
            id="approach"
            style={{ fontFamily: "'Poppins', sans-serif" }}
        >
            <style>{`@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap');`}</style>

            {/* Bg blobs — light & dark */}
            <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
                <div className="absolute -top-20 left-1/4 w-72 h-72 rounded-full bg-blue-300/15 dark:bg-blue-600/10 blur-[80px]" />
                <div className="absolute -bottom-20 right-1/4 w-96 h-72 rounded-full bg-purple-300/15 dark:bg-purple-700/10 blur-[100px]" />
            </div>

            <div className="container mx-auto px-4 sm:px-6" ref={ref}>
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, ease: 'easeOut' }}
                    className="relative rounded-2xl overflow-hidden
                        bg-[#0D1117]
                        dark:bg-[#0D1117]
                        shadow-[0_40px_100px_rgba(0,0,0,0.25)]
                        dark:shadow-[0_40px_100px_rgba(0,0,0,0.5)]
                        border border-white/[0.06]"
                >
                    {/* Inner glow top */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />
                    {/* Radial glow center-right */}
                    <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-blue-600/5 blur-[100px] pointer-events-none" />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center p-10 md:p-14 lg:p-16">

                        {/* ── Left ── */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.15 }}
                        >
                            <span className="block text-[11px] font-bold tracking-[2.5px] uppercase text-blue-400 mb-4">
                                Our Approach
                            </span>

                            <h2 className="text-[2.2rem] md:text-[2.6rem] font-black leading-[1.15] text-white mb-5">
                                Unlock Answers<br />Through{' '}
                                <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-rose-400 bg-clip-text text-transparent">
                                    Questions
                                </span>
                            </h2>

                            <p className="text-[0.9rem] text-white/60 leading-[1.75] mb-4">
                                We prioritize trust by fostering effective communication.
                                Solutions emerge from understanding past problems, which
                                starts with discussing the issues, their causes, reasoning,
                                impacted areas, and expectations for resolution.
                            </p>

                            <p className="text-[0.9rem] text-white/60 leading-[1.75] mb-7">
                                This cycle continues until we have sufficient knowledge to
                                design measurable input, control, and output dimensions.
                            </p>

                            <a
                                href="#contact"
                                className="inline-flex items-center gap-2.5 text-blue-400 hover:text-blue-300
                                    font-semibold text-[0.88rem] group transition-colors duration-200"
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
                                    {bubbles.communication.map((b, i) => <Bubble key={i} {...b} />)}
                                </Phase>

                                <Divider />

                                {/* Knowledge */}
                                <Phase title="Knowledge" glow>
                                    {bubbles.knowledge.map((b, i) => <Bubble key={i} {...b} />)}
                                </Phase>

                                <Divider />

                                {/* Development */}
                                <Phase title="Development">
                                    {bubbles.development.map((b, i) => <Bubble key={i} {...b} />)}
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

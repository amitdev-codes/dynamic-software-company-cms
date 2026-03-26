import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useRef as useScrollRef } from 'react';

export default function TestimonialsSection({ settings, testimonials }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });
    const scrollRef = useRef(null);

    const count = testimonials?.length || 0;

    /* ── Auto-scroll ───────────────────────────────────────── */
    useEffect(() => {
        const el = scrollRef.current;
        if (!el || count === 0) return;

        let animId;
        let paused = false;

        const step = () => {
            if (!paused) {
                el.scrollLeft += 0.6;
                // loop: when we reach halfway (cloned list), reset silently
                if (el.scrollLeft >= el.scrollWidth / 2) {
                    el.scrollLeft = 0;
                }
            }
            animId = requestAnimationFrame(step);
        };

        animId = requestAnimationFrame(step);

        el.addEventListener('mouseenter', () => { paused = true; });
        el.addEventListener('mouseleave', () => { paused = false; });
        el.addEventListener('touchstart',  () => { paused = true; });
        el.addEventListener('touchend',    () => { paused = false; });

        return () => cancelAnimationFrame(animId);
    }, [count]);

    /* ── Card ──────────────────────────────────────────────── */
    const Card = ({ testimonial }) => (
        <div className="relative bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col group overflow-hidden"
             style={{ width: '300px', height: '220px', flexShrink: 0 }}>

            {/* Quote icon */}
            <div className="absolute -top-3 -left-3 w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg z-10">
                <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
            </div>

            <div className="relative z-10 flex flex-col h-full p-5">
                {/* Stars */}
                <div className="flex gap-0.5 mb-3">
                    {[...Array(5)].map((_, i) => (
                        <svg key={i}
                             className={`w-3.5 h-3.5 ${i < (testimonial.rating || 5) ? 'text-yellow-400' : 'text-gray-500'}`}
                             fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                    ))}
                </div>

                {/* Quote — fixed height, clamps overflow with fade */}
                <div className="relative flex-1 overflow-hidden">
                    <p className="text-white/90 text-sm italic leading-relaxed">
                        "{testimonial.content}"
                    </p>
                    {/* bottom fade so cut-off text looks intentional */}
                    <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-slate-900/60 to-transparent" />
                </div>

                {/* Author — always pinned to bottom */}
                <div className="flex items-center gap-2 pt-3 mt-2 border-t border-white/10 shrink-0">
                    <div className={`w-8 h-8 rounded-full ${testimonial.avatar_color || 'bg-gradient-to-br from-blue-400 to-purple-400'} flex items-center justify-center font-bold text-white text-xs shadow-lg shrink-0`}>
                        {testimonial.name.charAt(0)}
                    </div>
                    <div className="min-w-0">
                        <h4 className="font-bold text-white text-sm truncate">{testimonial.name}</h4>
                        <p className="text-blue-300 text-xs truncate">{testimonial.role}</p>
                    </div>
                </div>
            </div>

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/10 group-hover:to-purple-500/10 rounded-2xl transition-all duration-500" />
        </div>
    );

    return (
        <section id="testimonials" className="section-gap bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative overflow-hidden">

            {/* Blobs */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
                <div className="absolute top-20 left-20 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob" />
                <div className="absolute top-40 right-20 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000" />
                <div className="absolute bottom-20 left-1/2 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000" />
            </div>
            <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />

            <div ref={ref} className="relative z-10">

                {/* ── Header ─────────────────────────────────── */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12 container-landing"
                >
                    <span className="inline-block text-blue-400 font-semibold text-sm tracking-wider uppercase mb-4">
                        Client Testimonials
                    </span>
                    <h2 className="font-black !text-white mb-4">
                        What Our{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                            Clients Say
                        </span>
                    </h2>
                    <p className="!text-gray-300 max-w-2xl mx-auto">
                        Real feedback from real people who trust us with their technology needs
                    </p>
                </motion.div>

                {count > 0 ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="relative"
                    >
                        {/* Edge fades */}
                        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-slate-900 to-transparent z-10 pointer-events-none" />
                        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-slate-900 to-transparent z-10 pointer-events-none" />

                        {/* Scroll track */}
                        <div
                            ref={scrollRef}
                            className="flex gap-5 overflow-x-auto pb-4 px-8"
                            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                        >
                            {/* Render list twice for seamless loop */}
                            {[...testimonials, ...testimonials].map((testimonial, index) => (
                                <motion.div
                                    key={`${testimonial.id}-${index}`}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ duration: 0.4, delay: Math.min(index, testimonials.length - 1) * 0.07 }}
                                    whileHover={{ y: -6, transition: { duration: 0.2 } }}
                                >
                                    <Card testimonial={testimonial} />
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                ) : (
                    /* ── Empty state ───────────────────────── */
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.6 }}
                        className="text-center py-20 container-landing"
                    >
                        <motion.div
                            animate={{ scale: [1, 1.05, 1] }}
                            transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
                            className="w-32 h-32 bg-white/10 backdrop-blur-sm rounded-3xl flex items-center justify-center mx-auto mb-8 border border-white/20 shadow-2xl"
                        >
                            <svg className="w-16 h-16 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                        </motion.div>
                        <h3 className="font-bold !text-white mb-4">Client Testimonials Coming Soon</h3>
                        <p className="!text-gray-300 max-w-2xl mx-auto">
                            We're gathering feedback from our amazing clients. Check back soon!
                        </p>
                    </motion.div>
                )}
            </div>
        </section>
    );
}

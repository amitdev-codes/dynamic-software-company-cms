import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';

export default function TestimonialsSection({ settings, testimonials }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });
    const [currentIndex, setCurrentIndex] = useState(0);
    const count = testimonials?.length || 0;
    const totalGroups = Math.ceil(count / 4);

    useEffect(() => {
        if (count === 0) return;
        const timeoutId = setTimeout(() => {
            const intervalId = setInterval(() => {
                setCurrentIndex(prev => (prev + 1) % Math.ceil(count / 4));
            }, 5000);
            return () => clearInterval(intervalId);
        }, 2000);
        return () => clearTimeout(timeoutId);
    }, [count]);

    const prevSlide = () => setCurrentIndex(prev => (prev === 0 ? totalGroups - 1 : prev - 1));
    const nextSlide = () => setCurrentIndex(prev => (prev + 1) % totalGroups);

    const getInitials = (name = '') =>
        name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();

    const avatarGradients = [
        'from-indigo-500 to-purple-600',
        'from-blue-500 to-cyan-500',
        'from-violet-500 to-pink-500',
        'from-purple-500 to-indigo-600',
    ];

    const getVisibleTestimonials = () => {
        const startIndex = currentIndex * 4;
        const visible = testimonials.slice(startIndex, Math.min(startIndex + 4, count));
        const filled = [...visible];
        while (filled.length < 4 && testimonials.length > 0) {
            filled.push({ ...testimonials[filled.length % testimonials.length], isFiller: true });
        }
        return filled;
    };

    const Card = ({ testimonial, index }) => (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            className="group relative flex flex-col h-[380px]"
        >
            <div className="
                relative flex flex-col h-full rounded-3xl p-8 border
                transition-all duration-500 hover:-translate-y-2
                bg-white border-slate-200
                shadow-[0_2px_16px_rgba(0,0,0,0.06)]
                hover:bg-slate-50 hover:border-indigo-300
                hover:shadow-[0_12px_40px_rgba(99,102,241,0.12)]
                dark:bg-white/5 dark:border-white/10 dark:backdrop-blur-xl
                dark:hover:bg-white/[0.08] dark:hover:border-indigo-500/30
                dark:hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)]
            ">
                {/* Decorative quote */}
                <Quote className="
                    absolute top-7 right-8 w-10 h-10 rotate-180 transition-colors duration-500
                    text-indigo-100 group-hover:text-indigo-200
                    dark:text-white/[0.05] dark:group-hover:text-white/[0.09]
                " />

                {/* Stars */}
                <div className="flex gap-1 mb-6 flex-shrink-0">
                    {[...Array(5)].map((_, i) => (
                        <Star
                            key={i}
                            className={`w-3.5 h-3.5 flex-shrink-0 ${
                                i < (testimonial.rating || 5)
                                    ? 'text-amber-400 fill-amber-400'
                                    : 'text-slate-200 dark:text-white/20'
                            }`}
                        />
                    ))}
                </div>

                {/* Quote text */}
                <blockquote
                    className="flex-1 text-[0.95rem] leading-[1.75] italic mb-6 text-slate-600 dark:text-white/85"
                    style={{
                        display: '-webkit-box',
                        WebkitLineClamp: 6,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                    }}
                >
                    "{testimonial.content}"
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-3 mt-auto pt-5 border-t flex-shrink-0 border-slate-100 dark:border-white/10">
                    <div className={`w-[52px] h-[52px] rounded-full p-[3px] bg-gradient-to-br flex-shrink-0 ${avatarGradients[index % avatarGradients.length]}`}>
                        {testimonial.avatar ? (
                            <img
                                src={testimonial.avatar}
                                alt={testimonial.name}
                                className="w-full h-full rounded-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full rounded-full flex items-center justify-center bg-white dark:bg-[#0d0b2e]">
                                <span className="text-sm font-black tracking-tight text-indigo-700 dark:text-white/80">
                                    {getInitials(testimonial.name)}
                                </span>
                            </div>
                        )}
                    </div>
                    <div className="min-w-0">
                        <h5 className="font-bold text-[1rem] leading-tight truncate transition-colors duration-300 text-slate-900 group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-300">
                            {testimonial.name}
                        </h5>
                        <span className="text-[0.8rem] font-medium text-slate-400 dark:text-white/50">
                            {testimonial.role || 'Customer'}
                        </span>
                    </div>
                </div>
            </div>
        </motion.div>
    );

    return (
        <section
            id="testimonials"
            className="
                py-[120px] relative overflow-hidden
                bg-gradient-to-br from-[#f8faff] to-[#eef2ff]
                dark:bg-none
            "
            style={{
                // only applied in dark — light bg is handled by Tailwind above
                background: undefined,
            }}
        >
            {/*
                Dark mode needs the radial gradient which Tailwind can't do inline,
                so we use a pseudo-element via a sibling div instead.
            */}
            <div className="absolute inset-0 -z-10 hidden dark:block"
                 style={{ background: 'radial-gradient(circle at center, #1e3a8a 0%, #0d0b2e 100%)' }}
            />

            {/* Ambient blobs */}
            <div className="absolute inset-0 pointer-events-none opacity-30">
                <div className="absolute top-1/4 left-10 w-[400px] h-[400px] rounded-full blur-3xl bg-indigo-200/60 dark:bg-indigo-500/20" />
                <div className="absolute bottom-1/4 right-10 w-[500px] h-[500px] rounded-full blur-3xl bg-purple-200/50 dark:bg-purple-500/20" />
            </div>

            <div className="container mx-auto px-6 lg:px-12 relative z-10" ref={ref}>

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, ease: 'easeOut' }}
                    className="text-center mb-16 max-w-3xl mx-auto"
                >
                    <div className="flex items-center justify-center gap-4 mb-6">
                        <span className="h-px w-14 bg-gradient-to-r from-transparent via-indigo-400/40 to-transparent dark:via-indigo-400/60" />
                        <span className="
                            uppercase tracking-[3px] text-xs font-bold px-5 py-2 rounded-full border
                            text-indigo-600 bg-indigo-50 border-indigo-200
                            dark:text-indigo-400 dark:bg-indigo-500/10 dark:border-indigo-500/20
                        ">
                            Client Testimonials
                        </span>
                        <span className="h-px w-14 bg-gradient-to-r from-transparent via-indigo-400/40 to-transparent dark:via-indigo-400/60" />
                    </div>

                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-black mb-4 leading-tight text-slate-700 dark:text-white">
                        What Our{' '}
                        <span className="bg-gradient-to-r bg-clip-text text-transparent from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400">
                            Clients Say
                        </span>
                    </h2>

                    <p className="text-lg leading-relaxed text-slate-500 dark:text-white/60">
                        Real feedback from real people who trust us with their technology needs
                    </p>
                </motion.div>

                {count > 0 ? (
                    <div className="max-w-7xl mx-auto">

                        {/* Dot navigation */}
                        <div className="flex justify-center gap-2 mb-12">
                            {Array.from({ length: totalGroups }).map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setCurrentIndex(idx)}
                                    className={`rounded-full border-2 transition-all duration-300 ${
                                        idx === currentIndex
                                            ? 'w-4 h-4 scale-110 shadow-lg bg-indigo-600 border-indigo-600 shadow-indigo-400/40 dark:bg-indigo-400 dark:border-indigo-400 dark:shadow-indigo-500/50'
                                            : 'w-3 h-3 bg-slate-300 border-slate-300 hover:bg-indigo-200 dark:bg-white/25 dark:border-white/35 dark:hover:bg-white/45'
                                    }`}
                                />
                            ))}
                        </div>

                        {/* 4-col grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
                            {getVisibleTestimonials().map((testimonial, idx) => (
                                <Card
                                    key={`${testimonial.id || idx}-${currentIndex}`}
                                    testimonial={testimonial}
                                    index={idx}
                                />
                            ))}
                        </div>

                        {/* Prev / Next */}
                        <div className="flex justify-center gap-3">
                            {[{ Icon: ChevronLeft, fn: prevSlide }, { Icon: ChevronRight, fn: nextSlide }].map(({ Icon, fn }, i) => (
                                <button
                                    key={i}
                                    onClick={fn}
                                    className="
                                        w-11 h-11 border rounded-xl flex items-center justify-center transition-all duration-300
                                        bg-white hover:bg-indigo-50 border-slate-200 hover:border-indigo-300
                                        text-slate-500 hover:text-indigo-600 shadow-md hover:shadow-indigo-200/60
                                        dark:bg-white/10 dark:hover:bg-white/20 dark:border-white/20
                                        dark:hover:border-indigo-400/50 dark:text-white dark:hover:text-indigo-400
                                        dark:shadow-xl dark:hover:shadow-indigo-500/20
                                    "
                                >
                                    <Icon className="w-5 h-5" />
                                </button>
                            ))}
                        </div>
                    </div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        className="text-center py-28"
                    >
                        <div className="w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-6 border bg-slate-50 border-slate-200 dark:bg-white/5 dark:border-white/15">
                            <Quote className="w-10 h-10 text-slate-300 dark:text-white/30" />
                        </div>
                        <p className="text-xl font-semibold text-slate-400 dark:text-white/40">No testimonials yet</p>
                    </motion.div>
                )}
            </div>
        </section>
    );
}

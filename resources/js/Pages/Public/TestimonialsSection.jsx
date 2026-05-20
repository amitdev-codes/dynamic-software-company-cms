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
                setCurrentIndex(prev => (prev + 1) % totalGroups);
            }, 5000);
            return () => clearInterval(intervalId);
        }, 2000);
        return () => clearTimeout(timeoutId);
    }, [count, totalGroups]);

    const prevSlide = () => setCurrentIndex(prev => (prev === 0 ? totalGroups - 1 : prev - 1));
    const nextSlide = () => setCurrentIndex(prev => (prev + 1) % totalGroups);

    const getInitials = (name = '') =>
        name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();

    const avatarGradients = [
        'from-indigo-500 to-purple-600',
        'from-blue-500 to-cyan-500',
        'from-violet-500 to-pink-500',
        'from-purple-500 to-indigo-600',
        'from-emerald-500 to-teal-600',
        'from-orange-500 to-rose-600',
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
            className="group relative flex flex-col h-full"
        >
            <div className="
                relative flex flex-col h-full rounded-2xl p-7 sm:p-8 border
                transition-all duration-500 hover:-translate-y-3 hover:scale-[1.02]
                bg-white border-slate-150
                shadow-[0_4px_20px_rgba(0,0,0,0.05)]
                hover:bg-white hover:border-indigo-300
                hover:shadow-[0_16px_48px_rgba(99,102,241,0.15)]
                dark:bg-slate-900/70 dark:border-white/10 dark:backdrop-blur-xl
                dark:hover:bg-slate-900/90 dark:hover:border-indigo-500/30
                dark:hover:shadow-[0_20px_60px_rgba(99,102,241,0.25)]
            ">
                {/* Gradient accent on hover */}
                <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.06), rgba(139, 92, 246, 0.03))',
                    }}
                />

                <Quote className="
                    absolute top-6 right-7 w-9 h-9 rotate-180 transition-all duration-500
                    text-indigo-100 group-hover:text-indigo-200 group-hover:scale-110
                    dark:text-white/10 dark:group-hover:text-white/15
                " />

                {/* Stars */}
                <div className="flex gap-1.5 mb-6 flex-shrink-0 relative z-10">
                    {[...Array(5)].map((_, i) => (
                        <Star
                            key={i}
                            className={`w-4 h-4 flex-shrink-0 transition-all duration-300 ${
                                i < (testimonial.rating || 5)
                                    ? 'text-amber-400 fill-amber-400'
                                    : 'text-slate-200 dark:text-white/20'
                            }`}
                        />
                    ))}
                </div>

                <blockquote
                    className="flex-1 text-[0.95rem] leading-relaxed italic mb-6 text-slate-600 dark:text-white/80 relative z-10"
                    style={{
                        display: '-webkit-box',
                        WebkitLineClamp: 5,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                    }}
                >
                    "{testimonial.content}"
                </blockquote>

                <div className="h-px bg-gradient-to-r from-slate-100 via-indigo-200/40 to-slate-100 dark:from-white/10 dark:via-indigo-500/30 dark:to-white/10 mb-5 relative z-10" />

                <div className="flex items-center gap-3 flex-shrink-0 relative z-10">
                    <div className={`w-12 h-12 rounded-full p-[2.5px] bg-gradient-to-br flex-shrink-0 ${avatarGradients[index % avatarGradients.length]}`}>
                        {testimonial.avatar ? (
                            <img
                                src={testimonial.avatar}
                                alt={testimonial.name}
                                className="w-full h-full rounded-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full rounded-full flex items-center justify-center bg-white dark:bg-slate-950">
                                <span className="text-xs font-black tracking-tight text-indigo-700 dark:text-white/90">
                                    {getInitials(testimonial.name)}
                                </span>
                            </div>
                        )}
                    </div>
                    <div className="min-w-0 flex-1">
                        <h5 className="font-bold text-[0.95rem] leading-tight truncate text-slate-900 group-hover:text-indigo-700 dark:text-white dark:group-hover:text-indigo-300">
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
        section-gap relative overflow-hidden
        bg-gradient-to-br
        from-slate-50 via-zinc-50 to-slate-100
        dark:from-[#0a0c14]
        dark:via-[#0e1321]
        dark:to-[#161b2e]
    "
        >
            {/* Ambient blobs - slightly enhanced */}
            {/* Ambient blobs */}
            <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
                <div className="absolute -top-24 left-1/3 w-80 h-80 rounded-full bg-indigo-500/10 dark:bg-indigo-600/10 blur-[90px]" />
                <div className="absolute bottom-0 right-1/4 w-96 h-80 rounded-full bg-blue-500/10 dark:bg-blue-600/10 blur-[100px]" />
            </div>
            <div className="container-landing" ref={ref}>
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12 sm:mb-16"
                >
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-3 mb-5"
                    >
                        <span className="h-px w-10 bg-gradient-to-r from-transparent to-indigo-400/60 dark:to-indigo-400/40" />
                        <span className="text-[10.5px] font-bold tracking-[3px] uppercase
                            text-indigo-600 dark:text-indigo-400
                            bg-indigo-50 dark:bg-indigo-500/10
                            border border-indigo-200 dark:border-indigo-500/25
                            px-4 py-1.5 rounded-full">
                            Client Testimonials
                        </span>
                        <span className="h-px w-10 bg-gradient-to-l from-transparent to-indigo-400/60 dark:to-indigo-400/40" />
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="section-heading text-center !mb-0 max-w-3xl mx-auto"
                    >
                        What Our{' '}
                        <span className="bg-gradient-to-r from-indigo-600 to-blue-500 dark:from-indigo-400 dark:to-blue-400 bg-clip-text text-transparent">
                            Clients Say
                        </span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="mt-4 text-base sm:text-lg text-slate-600 dark:text-white/65 max-w-2xl mx-auto"
                    >
                        Real feedback from real people who trust us with their technology needs
                    </motion.p>
                </motion.div>

                {count > 0 ? (
                    <div className="w-full">
                        {/* Dot navigation - unchanged or can be enhanced later */}

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
                        >
                            {getVisibleTestimonials().map((testimonial, idx) => (
                                <Card
                                    key={`${testimonial.id || idx}-${currentIndex}`}
                                    testimonial={testimonial}
                                    index={idx}
                                />
                            ))}
                        </motion.div>

                        {/* Improved Navigation Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="flex justify-center gap-4"
                        >
                            {[{ Icon: ChevronLeft, fn: prevSlide, label: 'Previous' }, { Icon: ChevronRight, fn: nextSlide, label: 'Next' }].map(({ Icon, fn, label }, i) => (
                                <button
                                    key={i}
                                    onClick={fn}
                                    aria-label={label}
                                    className="
                                        w-12 h-12 border rounded-2xl flex items-center justify-center transition-all duration-300
                                        bg-white hover:bg-indigo-50 border-slate-200 hover:border-indigo-400
                                        text-slate-600 hover:text-indigo-600 shadow-md hover:shadow-lg hover:shadow-indigo-300/40

                                        dark:bg-slate-800 dark:hover:bg-slate-700
                                        dark:border-slate-600 dark:hover:border-indigo-500
                                        dark:text-slate-300 dark:hover:text-white
                                        dark:shadow-xl dark:hover:shadow-indigo-500/30
                                    "
                                >
                                    <Icon className="w-5 h-5" />
                                </button>
                            ))}
                        </motion.div>
                    </div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.5 }}
                        className="text-center py-20 sm:py-28"
                    >
                        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl flex items-center justify-center mx-auto mb-6 border bg-slate-50 border-slate-200 dark:bg-white/5 dark:border-white/10">
                            <Quote className="w-10 h-10 text-slate-300 dark:text-white/30" />
                        </div>
                        <p className="text-lg sm:text-xl font-semibold text-slate-400 dark:text-white/40">No testimonials yet</p>
                    </motion.div>
                )}
            </div>
        </section>
    );
}

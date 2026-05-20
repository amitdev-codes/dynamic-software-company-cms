import { motion, useInView } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

const PAGE_SIZE = 4;

const avatarGradients = [
    'from-indigo-500 to-purple-600',
    'from-blue-500 to-cyan-500',
    'from-violet-500 to-pink-500',
    'from-emerald-500 to-teal-600',
    'from-orange-500 to-rose-600',
];

const fadeUp = {
    hidden: { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0 },
};

function getInitials(name = '') {
    return name
        .split(' ')
        .filter(Boolean)
        .map((word) => word[0])
        .join('')
        .slice(0, 2)
        .toUpperCase();
}

function TestimonialCard({ testimonial, index, isInView }) {
    return (
        <motion.article
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={fadeUp}
            transition={{ duration: 0.45, delay: index * 0.07 }}
            className="group relative flex h-full flex-col overflow-hidden rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-500/10 dark:border-white/10 dark:bg-white/[0.04] dark:hover:border-indigo-400/30"
        >
            <Quote className="absolute right-5 top-5 h-8 w-8 rotate-180 text-indigo-100 transition-colors group-hover:text-indigo-200 dark:text-white/10 dark:group-hover:text-indigo-300/20" />

            <div className="relative z-10 mb-5 flex gap-1.5">
                {Array.from({ length: 5 }).map((_, starIndex) => (
                    <Star
                        key={starIndex}
                        className={`h-4 w-4 ${
                            starIndex < (testimonial.rating || 5)
                                ? 'fill-amber-400 text-amber-400'
                                : 'text-slate-200 dark:text-white/20'
                        }`}
                    />
                ))}
            </div>

            <blockquote className="relative z-10 mb-6 line-clamp-5 flex-1 text-sm italic leading-relaxed text-slate-600 dark:text-white/75">
                "{testimonial.content}"
            </blockquote>

            <div className="relative z-10 mb-5 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent dark:via-white/10" />

            <div className="relative z-10 flex items-center gap-3">
                <div
                    className={`h-11 w-11 shrink-0 rounded-full bg-gradient-to-br p-[2px] ${
                        avatarGradients[index % avatarGradients.length]
                    }`}
                >
                    {testimonial.avatar ? (
                        <img
                            src={testimonial.avatar}
                            alt={testimonial.name}
                            className="h-full w-full rounded-full object-cover"
                        />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center rounded-full bg-white dark:bg-slate-950">
                            <span className="text-xs font-black tracking-tight text-indigo-700 dark:text-white">
                                {getInitials(testimonial.name)}
                            </span>
                        </div>
                    )}
                </div>

                <div className="min-w-0">
                    <h5 className="truncate text-sm font-bold leading-tight text-slate-900 transition-colors group-hover:text-indigo-700 dark:text-white dark:group-hover:text-indigo-300">
                        {testimonial.name}
                    </h5>
                    <p className="truncate text-xs font-medium text-slate-500 dark:text-white/50">
                        {testimonial.role || 'Customer'}
                    </p>
                </div>
            </div>
        </motion.article>
    );
}

export default function TestimonialsSection({ testimonials = [] }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });
    const [currentIndex, setCurrentIndex] = useState(0);

    const count = testimonials.length;
    const totalGroups = Math.max(1, Math.ceil(count / PAGE_SIZE));

    const visibleTestimonials = useMemo(() => {
        const startIndex = currentIndex * PAGE_SIZE;
        return testimonials.slice(startIndex, startIndex + PAGE_SIZE);
    }, [currentIndex, testimonials]);

    const goToSlide = useCallback(
        (index) => {
            setCurrentIndex(index % totalGroups);
        },
        [totalGroups],
    );

    const prevSlide = useCallback(() => {
        setCurrentIndex((current) =>
            current === 0 ? totalGroups - 1 : current - 1,
        );
    }, [totalGroups]);

    const nextSlide = useCallback(() => {
        setCurrentIndex((current) => (current + 1) % totalGroups);
    }, [totalGroups]);

    useEffect(() => {
        if (count <= PAGE_SIZE) {
            setCurrentIndex(0);
            return undefined;
        }

        const intervalId = window.setInterval(nextSlide, 6000);

        return () => window.clearInterval(intervalId);
    }, [count, nextSlide]);

    return (
        <section
            id="testimonials"
            className="section-gap relative overflow-hidden bg-white dark:bg-[#070b14]"
        >
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-200 to-transparent dark:via-indigo-500/25" />

            <div className="container-landing relative z-10" ref={ref}>
                <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-12">
                    <motion.div
                        initial="hidden"
                        animate={isInView ? 'visible' : 'hidden'}
                        variants={fadeUp}
                        transition={{ duration: 0.45 }}
                        className="mb-5 inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-4 py-2 text-[10.5px] font-bold uppercase tracking-[3px] text-indigo-600 dark:border-indigo-500/25 dark:bg-indigo-500/10 dark:text-indigo-300"
                    >
                        <Quote className="h-3.5 w-3.5" aria-hidden />
                        Client Testimonials
                    </motion.div>

                    <motion.h2
                        initial="hidden"
                        animate={isInView ? 'visible' : 'hidden'}
                        variants={fadeUp}
                        transition={{ duration: 0.5, delay: 0.08 }}
                        className="section-heading !mb-0 text-center"
                    >
                        Trusted by clients who need{' '}
                        <span className="bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent dark:from-indigo-300 dark:to-blue-300">
                            reliable delivery
                        </span>
                    </motion.h2>

                    <motion.p
                        initial="hidden"
                        animate={isInView ? 'visible' : 'hidden'}
                        variants={fadeUp}
                        transition={{ duration: 0.5, delay: 0.16 }}
                        className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-white/65 sm:text-base"
                    >
                        Feedback from teams and customers who trust CloudCom with
                        practical technology work.
                    </motion.p>
                </div>

                {count > 0 ? (
                    <div>
                        <motion.div
                            initial="hidden"
                            animate={isInView ? 'visible' : 'hidden'}
                            variants={fadeUp}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:gap-5"
                        >
                            {visibleTestimonials.map((testimonial, index) => (
                                <TestimonialCard
                                    key={`${testimonial.id ?? testimonial.name}-${currentIndex}`}
                                    testimonial={testimonial}
                                    index={index}
                                    isInView={isInView}
                                />
                            ))}
                        </motion.div>

                        {count > PAGE_SIZE && (
                            <motion.div
                                initial="hidden"
                                animate={isInView ? 'visible' : 'hidden'}
                                variants={fadeUp}
                                transition={{ duration: 0.5, delay: 0.32 }}
                                className="mt-8 flex flex-wrap items-center justify-center gap-3"
                            >
                                <CarouselButton
                                    label="Previous testimonials"
                                    onClick={prevSlide}
                                    icon={ChevronLeft}
                                />

                                <div className="flex items-center gap-2 px-2">
                                    {Array.from({ length: totalGroups }).map((_, index) => (
                                        <button
                                            key={index}
                                            type="button"
                                            onClick={() => goToSlide(index)}
                                            className={`h-2 rounded-full transition-all duration-300 ${
                                                currentIndex === index
                                                    ? 'w-7 bg-indigo-600 dark:bg-indigo-300'
                                                    : 'w-2 bg-slate-300 hover:bg-slate-400 dark:bg-white/25 dark:hover:bg-white/40'
                                            }`}
                                            aria-label={`Go to testimonial group ${index + 1}`}
                                            aria-current={currentIndex === index}
                                        />
                                    ))}
                                </div>

                                <CarouselButton
                                    label="Next testimonials"
                                    onClick={nextSlide}
                                    icon={ChevronRight}
                                />
                            </motion.div>
                        )}
                    </div>
                ) : (
                    <motion.div
                        initial="hidden"
                        animate={isInView ? 'visible' : 'hidden'}
                        variants={fadeUp}
                        transition={{ duration: 0.45 }}
                        className="py-16 text-center"
                    >
                        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 dark:border-white/10 dark:bg-white/5">
                            <Quote className="h-8 w-8 text-slate-300 dark:text-white/30" />
                        </div>
                        <p className="text-base font-semibold text-slate-400 dark:text-white/40">
                            No testimonials yet
                        </p>
                    </motion.div>
                )}
            </div>
        </section>
    );
}

function CarouselButton({ label, onClick, icon: Icon }) {
    return (
        <button
            type="button"
            onClick={onClick}
            aria-label={label}
            className="flex h-11 w-11 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 shadow-sm transition-all duration-300 hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-600 hover:shadow-md dark:border-white/10 dark:bg-white/[0.04] dark:text-white/70 dark:hover:border-indigo-400/30 dark:hover:bg-indigo-500/10 dark:hover:text-white"
        >
            <Icon className="h-5 w-5" aria-hidden />
        </button>
    );
}

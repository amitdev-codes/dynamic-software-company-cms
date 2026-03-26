import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';

export default function ProductsSection({ products = [] }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });
    const [currentSlide, setCurrentSlide] = useState(0);
    const [direction, setDirection] = useState(1);

    const productsList = products.map((product) => ({
        id:          product.id,
        name:        product.name,
        title:       product.title,
        description: product.description || 'No description available.',
        features:    Array.isArray(product.features) ? product.features : [],
        techStack: {
            architecture: product.tech_stack?.architecture || '',
            frontend:     product.tech_stack?.frontend     || '',
            middleware:   product.tech_stack?.middleware   || '',
            database:     product.tech_stack?.database     || product.tech_stack?.Database || '',
        },
        pricing: product.pricing || '',
        image:   product.image   || '/image/products1.png',
    }));

    if (!productsList.length) return null;

    const total = productsList.length;
    const current = productsList[currentSlide];

    const goTo = (index) => {
        setDirection(index > currentSlide ? 1 : -1);
        setCurrentSlide(index);
    };
    const next = () => goTo((currentSlide + 1) % total);
    const prev = () => goTo((currentSlide - 1 + total) % total);

    /* ── tech stack rows, only truthy values ── */
    const techRows = [
        { label: 'Architecture', value: current.techStack.architecture },
        { label: 'Frontend',     value: current.techStack.frontend     },
        { label: 'Middleware',   value: current.techStack.middleware   },
        { label: 'Database',     value: current.techStack.database     },
    ].filter((r) => r.value);

    const hasTech = techRows.length > 0;

    /* ── slide animation variants ── */
    const slideVariants = {
        enter:  (d) => ({ opacity: 0, x: d > 0 ? 40 : -40 }),
        center: { opacity: 1, x: 0, transition: { duration: 0.35, ease: 'easeOut' } },
        exit:   (d) => ({ opacity: 0, x: d > 0 ? -40 : 40, transition: { duration: 0.25 } }),
    };

    /* ── nav button ── */
    const NavBtn = ({ onClick, label, children }) => (
        <button
            onClick={onClick}
            aria-label={label}
            className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 text-white flex items-center justify-center hover:scale-110 active:scale-95 transition-transform duration-200 shadow-lg shadow-blue-500/30"
        >
            {children}
        </button>
    );

    return (
        <section id="products" className="section-gap bg-slate-50 relative overflow-hidden">

            {/* Subtle background orbs */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute -top-32 -right-32 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-60" />
                <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-purple-100 rounded-full blur-3xl opacity-60" />
            </div>

            <div ref={ref} className="container-landing relative z-10">

                {/* ── Section header ─────────────────────────────── */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12 md:mb-16"
                >
                    <span className="inline-block text-blue-600 font-semibold text-sm tracking-wider uppercase mb-3">
                        Our Products
                    </span>
                    <h2 className="font-black leading-tight mb-0">
                        Consistently Driving Development,
                        Enhancement &amp; Execution of{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                            Our Products
                        </span>
                    </h2>
                </motion.div>

                {/* ── Slide wrapper ───────────────────────────────── */}
                <AnimatePresence custom={direction} mode="wait">
                    <motion.div
                        key={currentSlide}
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-10"
                    >
                        {/* ── Left · Product image ───────────────── */}
                        <div className="lg:col-span-5 order-2 lg:order-1">
                            <div className="relative">
                                <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-blue-50 to-purple-50 p-6 md:p-8">
                                    <img
                                        src={current.image}
                                        alt={current.name}
                                        className="w-full h-auto object-contain max-h-72 md:max-h-96 mx-auto"
                                    />
                                </div>
                                {/* Decorative tile */}
                                <div className="absolute -bottom-4 -right-4 w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-blue-200 to-purple-200 rounded-2xl -z-10" />
                            </div>
                        </div>

                        {/* ── Right · Product detail card ────────── */}
                        <div className="lg:col-span-7 order-1 lg:order-2">
                            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 relative">

                                {/* Nav arrows — top-right of card */}
                                {total > 1 && (
                                    <div className="absolute top-5 right-5 md:top-6 md:right-6 flex gap-2 z-10">
                                        <NavBtn onClick={prev} label="Previous product">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                            </svg>
                                        </NavBtn>
                                        <NavBtn onClick={next} label="Next product">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </NavBtn>
                                    </div>
                                )}

                                {/* Counter badge */}
                                {total > 1 && (
                                    <span className="inline-block text-xs font-semibold text-blue-600 bg-blue-50 border border-blue-100 px-2.5 py-1 rounded-full mb-4">
                                        {currentSlide + 1} / {total}
                                    </span>
                                )}

                                {/* Product name */}
                                <h3 className="font-black mb-3 pr-24">
                                    {current.name}
                                </h3>

                                {/* Description */}
                                <p className="leading-relaxed mb-5 text-slate-600">
                                    {current.description}
                                </p>

                                {/* Features */}
                                {current.features.length > 0 && (
                                    <div className="mb-5">
                                        <h4 className="font-bold text-slate-900 mb-2.5 !text-base">
                                            Features
                                        </h4>
                                        <ul className="space-y-1.5">
                                            {current.features.map((feature, i) => (
                                                <li key={i} className="flex items-start gap-2 !text-sm text-slate-600">
                                                    <svg className="w-4 h-4 text-green-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {/* Tech stack */}
                                {hasTech && (
                                    <div className="mb-5">
                                        <h4 className="font-bold text-slate-900 mb-2.5 !text-base">
                                            Tech Stack
                                        </h4>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5">
                                            {techRows.map(({ label, value }) => (
                                                <div key={label} className="!text-sm text-slate-600">
                                                    <span className="font-semibold text-slate-700">{label}:</span>{' '}
                                                    {value}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Pricing */}
                                {current.pricing && (
                                    <div className="pt-4 border-t border-slate-100">
                                        <h4 className="font-bold text-slate-900 mb-1 !text-base">Pricing</h4>
                                        <div className="text-2xl font-black text-green-600">
                                            {current.pricing}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* ── Dot indicators ──────────────────────────────── */}
                {total > 1 && (
                    <div className="flex justify-center items-center gap-2">
                        {productsList.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => goTo(index)}
                                aria-label={`Go to product ${index + 1}`}
                                className={`h-2.5 rounded-full transition-all duration-300 ${
                                    currentSlide === index
                                        ? 'w-8 bg-gradient-to-r from-blue-600 to-purple-600'
                                        : 'w-2.5 bg-slate-300 hover:bg-slate-400'
                                }`}
                            />
                        ))}
                    </div>
                )}

            </div>
        </section>
    );
}

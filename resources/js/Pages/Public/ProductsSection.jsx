import React, { useRef, useState } from 'react';
import { CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

const ProductsSection = ({ products = [] }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });
    const [currentSlide, setCurrentSlide] = useState(0);

    const productsList = products.map((product) => ({
        id: product.id,
        name: product.name,
        description: product.description || 'No description available.',
        features: Array.isArray(product.features) ? product.features : [],
        techStack: {
            architecture: product.tech_stack?.architecture || '',
            frontend: product.tech_stack?.frontend || '',
            middleware: product.tech_stack?.middleware || '',
            database: product.tech_stack?.database || product.tech_stack?.Database || '',
        },
        pricing: product.pricing || 'Free',
        image: product.image || '/image/products1.png',
    }));

    const current = productsList[currentSlide] || productsList[0];
    const total = productsList.length;

    const nextSlide = () => setCurrentSlide((p) => (p + 1) % total);
    const prevSlide = () => setCurrentSlide((p) => (p - 1 + total) % total);

    if (!total) return null;

    const techEntries = Object.entries(current.techStack).filter(([, v]) => v);

    return (
        <section
            id="products"
            className="section-gap relative overflow-hidden bg-white dark:bg-slate-950 transition-colors duration-300"
        >
            {/* Background blobs */}
            <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
                <div className="absolute -top-32 right-1/4 w-96 h-96 rounded-full bg-purple-100/60 dark:bg-purple-900/10 blur-[90px]" />
                <div className="absolute bottom-0 left-1/4 w-80 h-80 rounded-full bg-blue-100/60 dark:bg-blue-900/10 blur-[80px]" />
            </div>

            <div className="container-landing" ref={ref}>
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-10 sm:mb-14"
                >
                    <div className="inline-flex items-center gap-2 mb-4">
                        <div className="h-px w-10 bg-gradient-to-r from-transparent to-purple-400/60" />
                        <span className="text-[10.5px] font-bold tracking-[3px] uppercase text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-500/10 border border-purple-200 dark:border-purple-500/25 px-4 py-1.5 rounded-full">
                            Our Work
                        </span>
                        <div className="h-px w-10 bg-gradient-to-l from-transparent to-purple-400/60" />
                    </div>

                    <h2 className="section-heading text-center !mb-0 max-w-3xl mx-auto text-gray-900 dark:text-white">
                        Consistently Driving Development &amp; Execution of{' '}
                        <span className="bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400 bg-clip-text text-transparent">
                            Our Products
                        </span>
                    </h2>
                </motion.div>

                {/* Main Grid */}
                <div className="grid md:grid-cols-2 gap-6 lg:gap-8 items-start"> {/* Changed from items-stretch to items-start */}
                    {/* LEFT PANEL - Image Card */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.7 }}
                    >
                        <div className="relative">
                            <div className="relative rounded-[2rem] border border-white/60 dark:border-slate-700/70 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.08)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.4)] transition-all duration-500 hover:-translate-y-1">

                                <div className="p-4 md:p-5">
                                    {/* Image Container with Fixed Aspect Ratio */}
                                    <div className="relative aspect-[16/11] rounded-[1.5rem] overflow-hidden border border-blue-200/40 dark:border-blue-500/20 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-slate-900 dark:to-blue-950/40 shadow-inner">
                                        <AnimatePresence mode="wait">
                                            <motion.img
                                                key={current.id}
                                                src={current.image}
                                                alt={current.name}
                                                initial={{ opacity: 0, scale: 0.96 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 1.03 }}
                                                transition={{ duration: 0.45 }}
                                                className="w-full h-full object-contain group-hover:scale-[1.02] transition-transform duration-700"
                                            />
                                        </AnimatePresence>

                                        <div className="absolute inset-0 bg-gradient-to-t from-blue-500/10 via-transparent to-transparent" />
                                    </div>

                                    {/* Controls */}
                                    {total > 1 && (
                                        <div className="flex items-center justify-between mt-4 px-1">
                                            {/* Dots */}
                                            <div className="flex gap-2">
                                                {productsList.map((_, i) => (
                                                    <button
                                                        key={i}
                                                        onClick={() => setCurrentSlide(i)}
                                                        className={`h-1.5 rounded-full transition-all duration-300 ${
                                                            currentSlide === i
                                                                ? 'w-6 bg-blue-600'
                                                                : 'w-1.5 bg-slate-300 dark:bg-slate-700'
                                                        }`}
                                                    />
                                                ))}
                                            </div>

                                            {/* Prev / Next */}
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={prevSlide}
                                                    className="w-9 h-9 rounded-xl bg-white/80 dark:bg-slate-800/80 border border-blue-200/40 dark:border-slate-700 flex items-center justify-center text-slate-700 dark:text-slate-200 hover:text-blue-600 hover:scale-105 transition-all duration-300"
                                                >
                                                    <ChevronLeft className="w-5 h-5" />
                                                </button>
                                                <button
                                                    onClick={nextSlide}
                                                    className="w-9 h-9 rounded-xl bg-white/80 dark:bg-slate-800/80 border border-blue-200/40 dark:border-slate-700 flex items-center justify-center text-slate-700 dark:text-slate-200 hover:text-blue-600 hover:scale-105 transition-all duration-300"
                                                >
                                                    <ChevronRight className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* RIGHT PANEL - Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.7, delay: 0.1 }}
                        className="flex flex-col"
                    >
                        <div className="space-y-5">
                            {/* Title */}
                            <div className="flex items-start justify-between gap-4">
                                <AnimatePresence mode="wait">
                                    <motion.h3
                                        key={current.name}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.3 }}
                                        className="card-title !text-2xl !mb-0"
                                    >
                                        {current.name}
                                    </motion.h3>
                                </AnimatePresence>

                                {total > 1 && (
                                    <span className="flex-shrink-0 text-xs font-semibold text-slate-400 dark:text-slate-500 mt-1">
                                        {currentSlide + 1} / {total}
                                    </span>
                                )}
                            </div>

                            {/* Description */}
                            <AnimatePresence mode="wait">
                                <motion.p
                                    key={current.description}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="card-body"
                                >
                                    {current.description}
                                </motion.p>
                            </AnimatePresence>

                            {/* Features */}
                            {current.features.length > 0 && (
                                <div>
                                    <p className="text-[10.5px] font-bold tracking-[2px] uppercase text-slate-400 dark:text-slate-500 mb-3">
                                        Features
                                    </p>
                                    <ul className="space-y-2.5">
                                        {current.features.map((f, i) => (
                                            <li key={i} className="flex items-start gap-2.5">
                                                <CheckCircle className="w-4 h-4 text-purple-500 mt-0.5 flex-shrink-0" />
                                                <span className="card-body !text-sm">{f}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Tech Stack */}
                            {techEntries.length > 0 && (
                                <div>
                                    <p className="text-[10.5px] font-bold tracking-[2px] uppercase text-slate-400 dark:text-slate-500 mb-3">
                                        Tech Stack
                                    </p>
                                    <div className="grid grid-cols-2 gap-3">
                                        {techEntries.map(([key, val]) => (
                                            <div
                                                key={key}
                                                className="px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700"
                                            >
                                                <p className="text-[10px] font-medium text-slate-400 dark:text-slate-500 capitalize mb-0.5">
                                                    {key}
                                                </p>
                                                <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                                                    {val}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Pricing */}
                        <div className="mt-auto pt-6">
                            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-3 rounded-2xl shadow-lg shadow-purple-500/25 font-semibold transition-all duration-300 hover:scale-[1.02] active:scale-95">
                                <span className="text-base">{current.pricing}</span>
                                <div className="w-px h-4 bg-white/40" />
                                <span className="text-sm opacity-90">Pricing</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default ProductsSection;

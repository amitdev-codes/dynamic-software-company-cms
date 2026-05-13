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

    const currentProduct = productsList[currentSlide] || productsList[0];

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % productsList.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + productsList.length) % productsList.length);
    };

    if (!productsList.length) return null;

    return (
        <section
            className="py-24 bg-white dark:bg-slate-950 transition-colors duration-300"
            id="products"
        >
            <div className="max-w-7xl mx-auto px-6">
                {/* Header */}
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <div className="flex items-center justify-center gap-4 mb-3">
                        <div className="h-px w-12 bg-gray-300 dark:bg-slate-700"></div>
                        <span className="text-sm font-semibold tracking-widest text-purple-600 dark:text-purple-500 uppercase">
                            OUR WORK
                        </span>
                        <div className="h-px w-12 bg-gray-300 dark:bg-slate-700"></div>
                    </div>

                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white leading-tight">
                        Consistently Driving Development, Enhancement &<br />
                        Execution of{' '}
                        <span className="bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-500 dark:to-blue-500 bg-clip-text text-transparent">
                            Our Products
                        </span>
                    </h2>
                </motion.div>

                {/* Top Navigation Arrows */}
                {productsList.length > 1 && (
                    <div className="flex justify-center gap-6 mb-10">
                        <button
                            onClick={prevSlide}
                            className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-800 shadow-lg border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-purple-600 hover:scale-110 transition-all active:scale-95"
                            aria-label="Previous product"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>
                        <button
                            onClick={nextSlide}
                            className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-800 shadow-lg border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-purple-600 hover:scale-110 transition-all active:scale-95"
                            aria-label="Next product"
                        >
                            <ChevronRight className="w-6 h-6" />
                        </button>
                    </div>
                )}

                <div className="grid md:grid-cols-2 gap-10 lg:gap-16">
                    {/* ==================== IMAGE CARD ==================== */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
                        transition={{ duration: 0.7 }}
                        className="relative group h-full"
                    >
                        <div className="bg-[#F0F4FF] dark:bg-slate-900 rounded-3xl p-8 shadow-xl border border-slate-100 dark:border-slate-800 h-full flex flex-col relative overflow-hidden">

                            {/* Main Image Container */}
                            <div className="flex-1 flex items-center justify-center overflow-hidden">
                                <AnimatePresence mode="wait">
                                    <motion.img
                                        key={currentProduct.image}
                                        src={currentProduct.image}
                                        alt={currentProduct.name}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 1.1 }}
                                        transition={{ duration: 0.5 }}
                                        className="max-h-[420px] w-full object-contain rounded-2xl transition-transform duration-700 group-hover:scale-105"
                                    />
                                </AnimatePresence>
                            </div>

                            {/* Decorative Shadow Layer (as requested) */}
                            <div className="absolute -bottom-6 -right-6 w-80 h-80 bg-gradient-to-br from-purple-500/20 to-blue-500/20 dark:from-purple-600/30 dark:to-blue-600/30 rounded-full blur-3xl -z-10" />

                            {/* Extra subtle inner shadow for depth */}
                            <div className="absolute inset-0 bg-gradient-to-br from-black/5 to-transparent dark:from-white/5 rounded-3xl pointer-events-none" />
                        </div>
                    </motion.div>

                    {/* ==================== DESCRIPTION CARD ==================== */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                        className="h-full"
                    >
                        <div className="bg-white dark:bg-slate-900 rounded-3xl p-10 shadow-xl border border-slate-100 dark:border-slate-800 h-full flex flex-col">
                            <div className="flex-1">
                                <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">
                                    {currentProduct.name}
                                </h3>

                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-10 text-[15px]">
                                    {currentProduct.description}
                                </p>

                                {/* Features */}
                                {currentProduct.features.length > 0 && (
                                    <div className="mb-9">
                                        <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-4 tracking-wide">
                                            FEATURES
                                        </h4>
                                        <ul className="space-y-4">
                                            {currentProduct.features.map((feature, index) => (
                                                <li key={index} className="flex items-start gap-3 text-slate-600 dark:text-slate-400">
                                                    <CheckCircle className="w-5 h-5 text-purple-600 dark:text-purple-500 mt-0.5 flex-shrink-0" />
                                                    <span className="text-[15px] leading-relaxed">{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {/* Tech Stack */}
                                <div className="mb-10">
                                    <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-4 tracking-wide">
                                        TECH STACK
                                    </h4>
                                    <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                                        {currentProduct.techStack.architecture && (
                                            <div>
                                                <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Architecture</p>
                                                <p className="text-slate-800 dark:text-slate-200 font-semibold">
                                                    {currentProduct.techStack.architecture}
                                                </p>
                                            </div>
                                        )}
                                        {currentProduct.techStack.frontend && (
                                            <div>
                                                <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Frontend</p>
                                                <p className="text-slate-800 dark:text-slate-200 font-semibold">
                                                    {currentProduct.techStack.frontend}
                                                </p>
                                            </div>
                                        )}
                                        {currentProduct.techStack.middleware && (
                                            <div>
                                                <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Middleware</p>
                                                <p className="text-slate-800 dark:text-slate-200 font-semibold">
                                                    {currentProduct.techStack.middleware}
                                                </p>
                                            </div>
                                        )}
                                        {currentProduct.techStack.database && (
                                            <div>
                                                <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Database</p>
                                                <p className="text-slate-800 dark:text-slate-200 font-semibold">
                                                    {currentProduct.techStack.database}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Pricing Badge */}
                            <div className="mt-auto flex justify-end pt-6">
                                <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 rounded-2xl shadow-lg shadow-purple-500/30 font-semibold transition-all duration-300 hover:scale-105 active:scale-95">
                                    <span className="text-lg">{currentProduct.pricing}</span>
                                    <div className="w-px h-5 bg-white/40"></div>
                                    <span className="text-sm opacity-90">Pricing</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Bottom Dots */}
                {productsList.length > 1 && (
                    <div className="flex justify-center mt-12">
                        <div className="flex gap-3">
                            {productsList.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentSlide(index)}
                                    className={`h-3 rounded-full transition-all duration-300 ${
                                        currentSlide === index
                                            ? 'bg-gradient-to-r from-purple-600 to-blue-600 w-10'
                                            : 'bg-slate-300 dark:bg-slate-700 hover:bg-slate-400 w-3'
                                    }`}
                                    aria-label={`Go to product ${index + 1}`}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default ProductsSection;

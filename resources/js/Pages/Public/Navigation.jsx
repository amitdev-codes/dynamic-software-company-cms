import { Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navigation({ menuItems, settings, activeSection, scrollToSection }) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [hoveredItem, setHoveredItem] = useState(null);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    /* ── handle click — contact scrolls to footer ── */
// In Navigation.jsx — replace handleNavClick
    const handleNavClick = (item) => {
        const isContact =
            item.id === 'contact' ||
            item.label?.toLowerCase() === 'contact us';

        if (isContact) {
            // redirect to dedicated contact page
            window.location.href = '/contact';
        } else {
            scrollToSection(item.id);
        }
        setIsMobileMenuOpen(false);
    };

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className={`fixed w-full top-0 z-50 transition-all duration-500 ${
                    isScrolled
                        ? 'bg-white/95 backdrop-blur-xl shadow-lg shadow-slate-200/50 border-b border-gray-100'
                        : 'bg-transparent backdrop-blur-sm'
                }`}
            >
                <div className="container-landing">
                    <div className="flex justify-between items-center h-16 md:h-18">

                        {/* ── Logo ───────────────────────────────── */}
                        <motion.div
                            whileHover={{ scale: 1.03 }}
                            className="flex items-center gap-2.5 cursor-pointer shrink-0"
                            onClick={() => scrollToSection('home')}
                        >
                            <div className="relative group">
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl blur opacity-40 group-hover:opacity-70 transition-opacity" />

                                <div className="relative w-10 h-10 md:w-11 md:h-11 bg-white rounded-xl flex items-center justify-center shadow-lg overflow-hidden">
                                    <img
                                        src={
                                            settings?.logo_light ||
                                            settings?.favicon ||
                                            '/images/logo.png'
                                        }
                                        alt="logo"
                                        className="w-full h-full object-contain p-1"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col leading-tight">
                                <span className="text-lg md:text-xl font-black bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                                    {settings?.company_name || 'Cloudcoms'}
                                </span>
                                                        <span className="text-[10px] md:text-xs text-gray-500 font-semibold tracking-wide">
                                    {settings?.company_slogan || 'Technology Partners'}
                                </span>
                            </div>
                        </motion.div>

                        {/* ── Desktop menu ───────────────────────── */}
                        <div
                            className="hidden lg:flex items-center gap-1"
                            onMouseLeave={() => setHoveredItem(null)}
                        >
                            {menuItems?.map((item, index) => {
                                const isActive = activeSection === item.id;
                                const isContact =
                                    item.id === 'contact' ||
                                    item.label?.toLowerCase() === 'contact us';

                                /* ── Contact Us — pill CTA button ── */
                                if (isContact) {
                                    return (
                                        <motion.button
                                            key={item.id}
                                            onClick={() => handleNavClick(item)}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.97 }}
                                            className="ml-3 relative inline-flex items-center gap-2 px-5 py-2 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:shadow-xl transition-all duration-300 overflow-hidden group"
                                        >
                                            {/* shimmer */}
                                            <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
                                            <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                            <span className="relative z-10">{item.label}</span>
                                        </motion.button>
                                    );
                                }

                                /* ── Regular nav items ── */
                                if (item.route || item.url) {
                                    return (
                                        <Link
                                            key={item.id ?? item.route}
                                            href={item.route ? route(item.route) : item.url}
                                            onMouseEnter={() => setHoveredItem(item.id)}
                                            className="relative px-4 py-2 rounded-lg font-semibold text-sm transition-colors duration-200 group"
                                        >
                                            <NavLabel isActive={isActive} label={item.label} />
                                            <NavBg isActive={isActive} isHovered={hoveredItem === item.id} id={item.id} />
                                        </Link>
                                    );
                                }

                                return (
                                    <button
                                        key={item.id}
                                        onClick={() => handleNavClick(item)}
                                        onMouseEnter={() => setHoveredItem(item.id)}
                                        className="relative px-4 py-2 rounded-lg font-semibold text-sm transition-colors duration-200 group"
                                    >
                                        <NavLabel isActive={isActive} label={item.label} />
                                        <NavBg isActive={isActive} isHovered={hoveredItem === item.id} id={item.id} />
                                    </button>
                                );
                            })}

                        </div>

                        {/* ── Mobile hamburger ───────────────────── */}
                        <motion.button
                            whileTap={{ scale: 0.92 }}
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="lg:hidden relative w-10 h-10 flex flex-col items-center justify-center gap-1.5 rounded-xl bg-white border border-slate-200 shadow-sm hover:border-blue-300 transition-all duration-200"
                            aria-label="Toggle menu"
                        >
                            <motion.span
                                animate={isMobileMenuOpen
                                    ? { rotate: 45, y: 6 }
                                    : { rotate: 0, y: 0 }}
                                transition={{ duration: 0.2 }}
                                className="w-4.5 h-0.5 bg-slate-700 rounded-full block"
                            />
                            <motion.span
                                animate={isMobileMenuOpen
                                    ? { opacity: 0, scaleX: 0 }
                                    : { opacity: 1, scaleX: 1 }}
                                transition={{ duration: 0.2 }}
                                className="w-4.5 h-0.5 bg-slate-700 rounded-full block"
                            />
                            <motion.span
                                animate={isMobileMenuOpen
                                    ? { rotate: -45, y: -6 }
                                    : { rotate: 0, y: 0 }}
                                transition={{ duration: 0.2 }}
                                className="w-4.5 h-0.5 bg-slate-700 rounded-full block"
                            />
                        </motion.button>
                    </div>
                </div>

                {/* ── Mobile menu ────────────────────────────────── */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.25, ease: 'easeInOut' }}
                            className="lg:hidden border-t border-gray-100 bg-white/98 backdrop-blur-xl overflow-hidden shadow-xl"
                        >
                            <div className="container-landing py-4 space-y-1">
                                {menuItems?.map((item) => {
                                    const isActive = activeSection === item.id;
                                    const isContact =
                                        item.id === 'contact' ||
                                        item.label?.toLowerCase() === 'contact us';

                                    /* ── Mobile Contact CTA ── */
                                    if (isContact) {
                                        return (
                                            <button
                                                key={item.id}
                                                onClick={() => handleNavClick(item)}
                                                className="w-full mt-2 flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg shadow-blue-500/20 transition-all duration-200 active:scale-98"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                </svg>
                                                {item.label}
                                            </button>
                                        );
                                    }

                                    /* ── Mobile regular items ── */
                                    const cls = `flex items-center gap-3 w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                                        isActive
                                            ? 'bg-gradient-to-r from-blue-50 to-purple-50 text-blue-600'
                                            : 'text-gray-700 hover:bg-slate-50 hover:text-blue-600'
                                    }`;

                                    if (item.route || item.url) {
                                        return (
                                            <Link
                                                key={item.id ?? item.route}
                                                href={item.route ? route(item.route) : item.url}
                                                className={cls}
                                                onClick={() => setIsMobileMenuOpen(false)}
                                            >
                                                {/* Active dot indicator */}
                                                <span className={`w-1.5 h-1.5 rounded-full shrink-0 transition-colors ${isActive ? 'bg-blue-500' : 'bg-transparent'}`} />
                                                {item.label}
                                            </Link>
                                        );
                                    }

                                    return (
                                        <button
                                            key={item.id}
                                            onClick={() => handleNavClick(item)}
                                            className={cls}
                                        >
                                            <span className={`w-1.5 h-1.5 rounded-full shrink-0 transition-colors ${isActive ? 'bg-blue-500' : 'bg-transparent'}`} />
                                            {item.label}
                                        </button>
                                    );
                                })}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.nav>

            {/* ── Spacer — exactly matches nav height ── */}
            <div className="h-16 md:h-18" />
        </>
    );
}

/* ── Sub-components ─────────────────────────────────────── */

function NavLabel({ isActive, label }) {
    return (
        <span className={`relative z-10 transition-colors duration-200 ${
            isActive ? 'text-blue-600' : 'text-gray-600 group-hover:text-blue-600'
        }`}>
            {label}
        </span>
    );
}

function NavBg({ isActive, isHovered, id }) {
    return (
        <>
            {/* Active pill */}
            {isActive && (
                <motion.div
                    layoutId="activeNav"
                    className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-100"
                    transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                />
            )}
            {/* Hover bg — only when not active */}
            {!isActive && isHovered && (
                <motion.div
                    layoutId="hoverNav"
                    className="absolute inset-0 bg-slate-100 rounded-lg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                />
            )}
            {/* Active underline dot */}
            {isActive && (
                <motion.div
                    layoutId="activeDot"
                    className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-blue-500"
                    transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                />
            )}
        </>
    );
}

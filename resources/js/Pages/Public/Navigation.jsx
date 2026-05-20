import { Link } from '@inertiajs/react';
import { AnimatePresence, motion } from 'framer-motion';
import { Mail, Moon, Sun } from 'lucide-react';
import { useCallback, useEffect, useMemo, useState } from 'react';

const CONTACT_LABEL = 'contact us';

export default function Navigation({
    menuItems = [],
    settings,
    activeSection,
    scrollToSection,
    isDarkMode,
    toggleTheme,
}) {
    const [hoveredItem, setHoveredItem] = useState(null);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navItems = useMemo(
        () =>
            menuItems.map((item) => ({
                ...item,
                isContact:
                    item.id === 'contact' ||
                    item.label?.toLowerCase() === CONTACT_LABEL,
            })),
        [menuItems],
    );

    const logoSrc = isDarkMode
        ? settings?.logo_dark || settings?.logo_light || '/images/logo-dark.png'
        : settings?.logo_light || settings?.favicon || '/images/logo.png';

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);

        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const closeMobileMenu = useCallback(() => {
        setIsMobileMenuOpen(false);
    }, []);

    const handleNavClick = useCallback(
        (item) => {
            if (item.isContact) {
                window.location.href = '/contact';
            } else {
                scrollToSection(item.id);
            }

            closeMobileMenu();
        },
        [closeMobileMenu, scrollToSection],
    );

    const handleThemeToggle = useCallback(() => {
        toggleTheme();
        closeMobileMenu();
    }, [closeMobileMenu, toggleTheme]);

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className={`fixed top-0 z-50 w-full transition-all duration-500 ${
                isScrolled
                    ? 'border-b border-gray-100 bg-white/95 shadow-lg backdrop-blur-xl dark:border-gray-800 dark:bg-gray-950/95'
                    : 'bg-transparent backdrop-blur-sm'
            }`}
        >
            <div className="container-landing">
                <div className="flex h-16 items-center justify-between md:h-18">
                    <button
                        type="button"
                        onClick={() => scrollToSection('home')}
                        className="group flex shrink-0 items-center gap-2.5 text-left"
                        aria-label="Go to home section"
                    >
                        <motion.span
                            whileHover={{ scale: 1.03 }}
                            className="relative block"
                        >
                            <span className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 opacity-40 blur transition-opacity group-hover:opacity-70" />
                            <span className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl bg-white shadow-lg dark:bg-gray-900 md:h-11 md:w-11">
                                <img
                                    src={logoSrc}
                                    alt={settings?.company_name || 'CloudCom'}
                                    className="h-full w-full object-contain p-1"
                                />
                            </span>
                        </motion.span>

                        <span className="flex flex-col leading-tight">
                            <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-lg font-black text-transparent dark:from-white dark:to-gray-300 md:text-xl">
                                {settings?.company_name || 'CloudCom'}
                            </span>
                            <span className="text-[10px] font-semibold tracking-wide text-gray-500 dark:text-gray-400 md:text-xs">
                                {settings?.company_slogan || 'Technology Partners'}
                            </span>
                        </span>
                    </button>

                    <div
                        className="hidden items-center gap-1 lg:flex"
                        onMouseLeave={() => setHoveredItem(null)}
                    >
                        {navItems.map((item) => (
                            <DesktopNavItem
                                key={item.id}
                                item={item}
                                isActive={activeSection === item.id}
                                isHovered={hoveredItem === item.id}
                                onHover={setHoveredItem}
                                onClick={handleNavClick}
                            />
                        ))}

                        <ThemeToggle
                            isDarkMode={isDarkMode}
                            onClick={toggleTheme}
                            className="ml-4"
                        />
                    </div>

                    <motion.button
                        type="button"
                        whileTap={{ scale: 0.92 }}
                        onClick={() => setIsMobileMenuOpen((open) => !open)}
                        className="relative flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800 lg:hidden"
                        aria-label="Toggle navigation menu"
                        aria-expanded={isMobileMenuOpen}
                    >
                        <motion.span
                            animate={
                                isMobileMenuOpen
                                    ? { rotate: 45, y: 6 }
                                    : { rotate: 0, y: 0 }
                            }
                            className="block h-0.5 w-4.5 rounded-full bg-slate-700 dark:bg-gray-300"
                        />
                        <motion.span
                            animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                            className="block h-0.5 w-4.5 rounded-full bg-slate-700 dark:bg-gray-300"
                        />
                        <motion.span
                            animate={
                                isMobileMenuOpen
                                    ? { rotate: -45, y: -6 }
                                    : { rotate: 0, y: 0 }
                            }
                            className="block h-0.5 w-4.5 rounded-full bg-slate-700 dark:bg-gray-300"
                        />
                    </motion.button>
                </div>
            </div>

            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                        className="overflow-hidden border-t border-gray-100 bg-white/98 shadow-xl backdrop-blur-xl dark:border-gray-800 dark:bg-gray-950/98 lg:hidden"
                    >
                        <div className="container-landing space-y-1 py-4">
                            {navItems.map((item) => (
                                <MobileNavItem
                                    key={item.id ?? item.route ?? item.url}
                                    item={item}
                                    isActive={activeSection === item.id}
                                    onClick={handleNavClick}
                                    onClose={closeMobileMenu}
                                />
                            ))}

                            <button
                                type="button"
                                onClick={handleThemeToggle}
                                className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
                            >
                                {isDarkMode ? (
                                    <Sun className="h-4 w-4" aria-hidden />
                                ) : (
                                    <Moon className="h-4 w-4" aria-hidden />
                                )}
                                {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}

function DesktopNavItem({ item, isActive, isHovered, onHover, onClick }) {
    if (item.isContact) {
        return (
            <motion.button
                type="button"
                onClick={() => onClick(item)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="relative ml-3 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-2 text-sm font-bold text-white shadow-lg shadow-blue-500/25 transition-all hover:shadow-blue-500/40"
            >
                <Mail className="h-4 w-4" aria-hidden />
                <span>{item.label}</span>
            </motion.button>
        );
    }

    return (
        <button
            type="button"
            onClick={() => onClick(item)}
            onMouseEnter={() => onHover(item.id)}
            className="group relative rounded-lg px-4 py-2 text-sm font-semibold transition-colors duration-200"
        >
            <NavLabel isActive={isActive} label={item.label} />
            <NavBg isActive={isActive} isHovered={isHovered} />
        </button>
    );
}

function MobileNavItem({ item, isActive, onClick, onClose }) {
    if (item.isContact) {
        return (
            <button
                type="button"
                onClick={() => onClick(item)}
                className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-blue-500/20 transition-all duration-200 active:scale-98"
            >
                <Mail className="h-4 w-4" aria-hidden />
                {item.label}
            </button>
        );
    }

    const className = `flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-semibold transition-all duration-200 ${
        isActive
            ? 'bg-gradient-to-r from-blue-50 to-purple-50 text-blue-600 dark:from-blue-950/40 dark:to-purple-950/40 dark:text-blue-300'
            : 'text-gray-700 hover:bg-slate-50 hover:text-blue-600 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-blue-300'
    }`;

    const indicator = (
        <span
            className={`h-1.5 w-1.5 shrink-0 rounded-full transition-colors ${
                isActive ? 'bg-blue-500' : 'bg-transparent'
            }`}
        />
    );

    if (item.route || item.url) {
        return (
            <Link
                href={item.route ? route(item.route) : item.url}
                className={className}
                onClick={onClose}
            >
                {indicator}
                {item.label}
            </Link>
        );
    }

    return (
        <button type="button" onClick={() => onClick(item)} className={className}>
            {indicator}
            {item.label}
        </button>
    );
}

function ThemeToggle({ isDarkMode, onClick, className = '' }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 text-gray-700 transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700 ${className}`}
            aria-label="Toggle theme"
        >
            {isDarkMode ? (
                <Sun className="h-5 w-5" aria-hidden />
            ) : (
                <Moon className="h-5 w-5" aria-hidden />
            )}
        </button>
    );
}

function NavLabel({ isActive, label }) {
    return (
        <span
            className={`relative z-10 transition-colors duration-200 ${
                isActive
                    ? 'text-blue-600 dark:text-blue-300'
                    : 'text-gray-600 group-hover:text-blue-600 dark:text-gray-300 dark:group-hover:text-blue-300'
            }`}
        >
            {label}
        </span>
    );
}

function NavBg({ isActive, isHovered }) {
    return (
        <>
            {isActive && (
                <motion.span
                    layoutId="activeNav"
                    className="absolute inset-0 rounded-lg border border-blue-100 bg-gradient-to-r from-blue-50 to-purple-50 dark:border-blue-900/50 dark:from-blue-950/45 dark:to-purple-950/45"
                    transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                />
            )}

            {!isActive && isHovered && (
                <motion.span
                    layoutId="hoverNav"
                    className="absolute inset-0 rounded-lg bg-slate-100 dark:bg-gray-800"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                />
            )}

            {isActive && (
                <motion.span
                    layoutId="activeDot"
                    className="absolute bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-blue-500"
                    transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                />
            )}
        </>
    );
}

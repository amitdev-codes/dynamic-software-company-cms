import { Head } from '@inertiajs/react';
import { Mail, MapPin, Phone } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';

import Navigation from './Navigation';
import HeroSection from './HeroSection';
import AboutSection from './AboutSection';
import ServicesSection from './ServicesSection';
import ProductsSection from './ProductsSection';
import ProjectsSection from './ProjectsSection';
import TestimonialsSection from './TestimonialsSection';
import Footer from './Footer';
import LogoTicker from "@/Pages/Public/LogoTicker.jsx";
import QuestionSection from "@/Pages/Public/QuestionSection.jsx";
import ComprehensiveSection from "@/Pages/Public/ComprehensiveSection.jsx";

export default function Landing({
    menuItems = [],
    defaultServices,
    comprehensiveServices,
    services,
    projects,
    products,
    testimonials,
    settings,
}) {
    const [activeSection, setActiveSection] = useState('home');
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
            setIsDarkMode(true);
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, []);

    const toggleTheme = useCallback(() => {
        setIsDarkMode((currentMode) => {
            const nextMode = !currentMode;

            document.documentElement.classList.toggle('dark', nextMode);
            localStorage.setItem('theme', nextMode ? 'dark' : 'light');

            return nextMode;
        });
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const sectionIds = menuItems.map((item) => item.id);
            const current = sectionIds.find((section) => {
                const element = document.getElementById(section);

                if (!element) {
                    return false;
                }

                const rect = element.getBoundingClientRect();
                return rect.top <= 150 && rect.bottom >= 150;
            });

            if (current) {
                setActiveSection(current);
            }
        };

        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => window.removeEventListener('scroll', handleScroll);
    }, [menuItems]);

    const scrollToSection = useCallback((id) => {
        const targetId = id === 'contact' ? 'footer' : id;
        const element = document.getElementById(targetId);

        if (!element) {
            return;
        }

        window.scrollTo({
            top: element.offsetTop - 64,
            behavior: 'smooth',
        });
    }, []);

    return (
        <>
            <Head title="CloudCom - Your Technology Partner" />

            <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300">
                <TopContactBar settings={settings} />

                <Navigation
                    menuItems={menuItems}
                    settings={settings}
                    activeSection={activeSection}
                    scrollToSection={scrollToSection}
                    isDarkMode={isDarkMode}
                    toggleTheme={toggleTheme}
                    hasTopContactBar
                />

                <HeroSection
                    scrollToSection={scrollToSection}
                    settings={settings}
                />

                <LogoTicker />

                <AboutSection />

                <QuestionSection />

                <ServicesSection
                    services={defaultServices}
                    comprehensiveServices={comprehensiveServices}
                />

                <ComprehensiveSection comprehensiveServices={comprehensiveServices} />

                <ProductsSection products={products} />

                <ProjectsSection projects={projects} />

                <TestimonialsSection
                    settings={settings}
                    testimonials={testimonials}
                />

                <Footer
                    settings={settings}
                    menuItems={menuItems}
                    services={services}
                    scrollToSection={scrollToSection}
                />
            </div>
        </>
    );
}

// Replace your TopContactBar function in Landing.jsx with this version.
// On mobile, the right-side "Visit Us" badge is now visible and compact.

function TopContactBar({ settings }) {
    const email =
        settings?.email ||
        settings?.support_email ||
        'info@cloudcomsoftware.com';

    const phone = settings?.phone || '+977 980-1234567';
    const address = settings?.address || 'Anamnagar-32, Kathmandu';

    return (
        <div className="fixed left-0 top-0 z-[60] w-full border-b border-blue-500/20 bg-slate-950 text-white shadow-sm">
            <style>{`
                @keyframes contactBlink {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.45; }
                }
                .contact-blink {
                    animation: contactBlink 1.6s ease-in-out infinite;
                }
            `}</style>

            <div className="container-landing flex h-[34px] items-center justify-between gap-2 text-[10px] font-medium sm:h-9 sm:gap-4 sm:text-xs">
                {/* Left side */}
                <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-5">
                    {/* Address (desktop only) */}
                    <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                            address,
                        )}`}
                        target="_blank"
                        rel="noreferrer"
                        className="hidden min-w-0 items-center gap-1.5 text-slate-200 transition-colors hover:text-white md:flex"
                    >
                        <MapPin
                            className="h-3.5 w-3.5 shrink-0 text-sky-300"
                            aria-hidden
                        />
                        <span className="truncate">{address}</span>
                    </a>

                    {/* Email */}
                    <a
                        href={`mailto:${email}`}
                        className="flex min-w-0 items-center gap-1.5 text-slate-200 transition-colors hover:text-white"
                    >
                        <Mail
                            className="h-3.5 w-3.5 shrink-0 text-sky-300"
                            aria-hidden
                        />
                        <span className="truncate max-w-[130px] sm:max-w-none">
                            {email}
                        </span>
                    </a>

                    {/* Phone (tablet and up) */}
                    <a
                        href={`tel:${phone.replace(/\s+/g, '')}`}
                        className="hidden items-center gap-1.5 text-slate-200 transition-colors hover:text-white sm:flex"
                    >
                        <Phone
                            className="h-3.5 w-3.5 shrink-0 text-sky-300"
                            aria-hidden
                        />
                        <span>{phone}</span>
                    </a>
                </div>

                {/* Right side - visible on all devices */}
                <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                        address,
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="contact-blink flex shrink-0 items-center gap-1 rounded-full border border-sky-400/30 bg-sky-400/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-sky-100 sm:gap-1.5 sm:px-3 sm:py-1 sm:text-[10px]"
                >
                    <MapPin className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                    <span className="hidden xs:inline">Visit Us</span>
                    <span className="sm:inline hidden">: {address}</span>
                </a>
            </div>
        </div>
    );
}

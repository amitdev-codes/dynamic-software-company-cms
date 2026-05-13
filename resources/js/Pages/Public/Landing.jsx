import { Head } from '@inertiajs/react';
import { useState, useEffect } from 'react';

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
                                    menuItems,
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

    // Load theme from localStorage
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

    // Toggle theme
    const toggleTheme = () => {
        const newMode = !isDarkMode;
        setIsDarkMode(newMode);

        if (newMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    };

    // Scroll handler
    useEffect(() => {
        const handleScroll = () => {
            const sections = menuItems?.map(item => item.id) || [];
            const current = sections.find(section => {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    return rect.top <= 150 && rect.bottom >= 150;
                }
                return false;
            });
            if (current) setActiveSection(current);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [menuItems]);

    const scrollToSection = (id) => {
        const targetId = id === 'contact' ? 'footer' : id;
        const element = document.getElementById(targetId);
        if (element) {
            window.scrollTo({
                top: element.offsetTop - 64,
                behavior: 'smooth',
            });
        }
    };

    return (
        <>
            <Head title="CloudCom - Your Technology Partner" />

            <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300">
                <Navigation
                    menuItems={menuItems}
                    settings={settings}
                    activeSection={activeSection}
                    scrollToSection={scrollToSection}
                    isDarkMode={isDarkMode}
                    toggleTheme={toggleTheme}
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
                <ComprehensiveSection  comprehensiveServices={comprehensiveServices}/>

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

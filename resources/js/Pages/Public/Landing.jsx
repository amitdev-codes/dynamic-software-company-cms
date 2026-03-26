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
        // 'contact' and 'footer' both scroll to the footer element
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

            <div className="min-h-screen bg-white">

                <Navigation
                    menuItems={menuItems}
                    settings={settings}
                    activeSection={activeSection}
                    scrollToSection={scrollToSection}
                />

                <HeroSection
                    scrollToSection={scrollToSection}
                    settings={settings}
                />

                <AboutSection />

                <ServicesSection
                    defaultServices={defaultServices}
                    comprehensiveServices={comprehensiveServices}
                />

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

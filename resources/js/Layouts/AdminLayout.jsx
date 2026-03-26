import { useState, useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PageHeader from '@/Components/PageHeader';

export default function AdminLayout({ children, title = 'Dashboard' }) {
    const { auth } = usePage().props;
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [openMenus, setOpenMenus] = useState({
        content: false,
        media: false,
        users: false,
    });
    const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
    const [language, setLanguage] = useState(() => localStorage.getItem('language') || 'en');

    // Apply theme to document
    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('theme', theme);
    }, [theme]);

    // Save language preference
    useEffect(() => {
        localStorage.setItem('language', language);
    }, [language]);

    const toggleTheme = () => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light');
    };

    const toggleMenu = (menuName) => {
        setOpenMenus(prev => ({
            ...prev,
            [menuName]: !prev[menuName]
        }));
    };

    const translations = {
        en: {
            dashboard: 'Dashboard',
            testimonials: 'Testimonials',
            content: 'Content',
            media: 'Media',
            users: 'Users',
            settings: 'Settings',
            viewSite: 'View Site',
            logout: 'Logout',
            resources: 'Resources',
            projects: 'Projects',
            products: 'Products',
            services: 'Services',
            aboutContent: 'About Content',
            pages: 'Pages',
            blogPosts: 'Blog Posts',
            images: 'Images',
            videos: 'Videos',
            documents: 'Documents',
            allUsers: 'All Users',
            roles: 'Roles',
            permissions: 'Permissions',
            adminPanel: 'Admin Panel',
            profile: 'Profile',
            help: 'Help',
            privacyPolicy: 'Privacy Policy',
            termsOfService: 'Terms of Service',
            support: 'Support',
            messages: 'Messages',
        },
        ne: {
            dashboard: 'ड्यासबोर्ड',
            content: 'सामग्री',
            media: 'मिडिया',
            users: 'प्रयोगकर्ताहरू',
            settings: 'सेटिङहरू',
            viewSite: 'साइट हेर्नुहोस्',
            logout: 'लगआउट',
            resources: 'स्रोतहरू',
            projects: 'परियोजनाहरू',
            aboutContent: 'बारेमा सामग्री',
            pages: 'पृष्ठहरू',
            blogPosts: 'ब्लग पोस्टहरू',
            images: 'तस्बिरहरू',
            videos: 'भिडियोहरू',
            documents: 'कागजातहरू',
            allUsers: 'सबै प्रयोगकर्ताहरू',
            roles: 'भूमिकाहरू',
            permissions: 'अनुमतिहरू',
            adminPanel: 'एडमिन प्यानल',
            profile: 'प्रोफाइल',
            help: 'मद्दत',
            privacyPolicy: 'गोपनीयता नीति',
            termsOfService: 'सेवा सर्तहरू',
            support: 'समर्थन',
            messages:'',
        }
    };

    const t = (key) => translations[language][key] || key;
    useEffect(() => {
        const currentRoute = route().current();
        setOpenMenus({
            content: currentRoute.startsWith('admin.resources') ||
                currentRoute.startsWith('admin.projects') ||
                currentRoute.startsWith('admin.products') ||
                currentRoute.startsWith('admin.services') ||
                currentRoute.startsWith('admin.aboutContent') ||
                currentRoute.startsWith('admin.testimonials'),
            users: currentRoute.startsWith('admin.users'),
        });
    }, [usePage().props]);

    return (
        <div className="min-h-screen flex bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
            {/* Sidebar Section */}
            <Sidebar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
                auth={auth}
                openMenus={openMenus}
                toggleMenu={toggleMenu}
                t={t}
            />

            {/* Main Content Area with Flex Column */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Navbar Section */}
                <Navbar
                    title={title}
                    theme={theme}
                    toggleTheme={toggleTheme}
                    language={language}
                    setLanguage={setLanguage}
                    auth={auth}
                    t={t}
                />

                {/* Content Body Section - Scrollable */}
                <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
                    <div className="p-8">
                        <PageHeader />
                        {children}
                    </div>
                </main>

                {/* Footer Section */}
                <Footer t={t} />
            </div>
        </div>
    );
}

import { Head, Link as InertiaLink } from '@inertiajs/react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import ContactForm from '@/Components/ContactForm';
import Footer from './Footer';

/* ─── Nav that links back to landing page sections ───────── */
function ContactNav({ settings }) {
    const [isScrolled, setIsScrolled] = useState(false);

    useState(() => {
        const fn = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', fn);
        return () => window.removeEventListener('scroll', fn);
    });

    return (
        <nav className={`fixed w-full top-0 z-50 transition-all duration-500 ${
            isScrolled
                ? 'bg-white/95 backdrop-blur-xl shadow-lg border-b border-gray-100'
                : 'bg-white/80 backdrop-blur-sm'
        }`}>
            <div className="container-landing">
                <div className="flex justify-between items-center h-16 md:h-18">

                    {/* Logo → back to home */}
                    <InertiaLink
                        href="/"
                        className="flex items-center gap-2.5 shrink-0 group"
                    >
                        <div className="relative">
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
                            <span className="text-lg font-black bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                                {settings?.company_name || 'Cloudcoms'}
                            </span>
                            <span className="text-[10px] text-gray-500 font-semibold tracking-wide">
                                {settings?.company_slogan || 'Technology Partners'}
                            </span>
                        </div>
                    </InertiaLink>

                    {/* Nav links → land on landing page anchors */}
                    <div className="hidden lg:flex items-center gap-1">
                        {[
                            { label: 'Home',         href: '/#home'         },
                            { label: 'About',        href: '/#about'        },
                            { label: 'Services',     href: '/#services'     },
                            { label: 'Products',     href: '/#products'     },
                            { label: 'Projects',     href: '/#projects'     },
                            { label: 'Testimonials', href: '/#testimonials' },
                        ].map((item) => (
                            <InertiaLink
                                key={item.href}
                                href={item.href}
                                className="px-4 py-2 rounded-lg text-sm font-semibold text-gray-600
                                           hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
                            >
                                {item.label}
                            </InertiaLink>
                        ))}

                        {/* Active state — Contact pill */}
                        <span className="ml-2 px-4 py-2 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600 shadow-md shadow-blue-500/25">
                            Contact Us
                        </span>
                    </div>

                    {/* Mobile — just a back button */}
                    <InertiaLink
                        href="/"
                        className="lg:hidden inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back
                    </InertiaLink>
                </div>
            </div>
        </nav>
    );
}

/* ─── Main page ──────────────────────────────────────────── */
export default function Contact({ menuItems, services, settings }) {

    const scrollToSection = (id) => {
        const el = document.getElementById(id);
        if (el) window.scrollTo({ top: el.offsetTop - 64, behavior: 'smooth' });
    };

    /* trust badges shown in hero — NOT contact info (that's in sidebar) */
    const trustBadges = [
        {
            icon:  '⚡',
            value: '< 24h',
            label: 'Response Time',
            bg:    'from-yellow-400 to-orange-500',
        },
        {
            icon:  '🚀',
            value: settings.projects_delivered || '100+',
            label: 'Projects Delivered',
            bg:    'from-blue-500 to-cyan-500',
        },
        {
            icon:  '🏆',
            value: settings.years_of_experience || '12+',
            label: 'Years Experience',
            bg:    'from-purple-500 to-pink-500',
        },
        {
            icon:  '😊',
            value: '50+',
            label: 'Happy Clients',
            bg:    'from-green-500 to-emerald-500',
        },
    ];

    return (
        <>
            <Head title="Contact Us — CloudCom" />

            <div className="min-h-screen bg-white">
                <ContactNav settings={settings} />

                {/* spacer */}
                <div className="h-16 md:h-18" />

                {/* ══════════════════════════════════════════
                    Hero — tagline + trust badges
                ══════════════════════════════════════════ */}
                <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-16 md:py-24">
                    {/* Orbs */}
                    <div className="absolute inset-0 pointer-events-none overflow-hidden">
                        <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-500 rounded-full blur-3xl opacity-20 animate-blob" />
                        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-purple-500 rounded-full blur-3xl opacity-20 animate-blob animation-delay-2000" />
                    </div>
                    <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />

                    <div className="container-landing relative z-10">
                        {/* Heading */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="text-center mb-12"
                        >
                            <span className="inline-block text-blue-400 font-semibold text-sm tracking-wider uppercase mb-3">
                                Get In Touch
                            </span>
                            <h1 className="font-black !text-white mb-3">
                                Let's Build Something{' '}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                                    Together
                                </span>
                            </h1>
                            <p className="!text-gray-300 max-w-xl mx-auto">
                                Tell us about your project and we'll get back to you within 24 hours.
                            </p>
                        </motion.div>

                        {/* Trust badges — different from contact info below */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto"
                        >
                            {trustBadges.map((badge, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.3 + i * 0.08, duration: 0.4 }}
                                    className="flex flex-col items-center gap-2 p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl hover:bg-white/15 transition-all duration-300 group"
                                >
                                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${badge.bg} flex items-center justify-center text-lg shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                        {badge.icon}
                                    </div>
                                    <div className="text-center">
                                        <div className="text-xl font-black text-white">
                                            {badge.value}
                                        </div>
                                        <div className="!text-xs !text-gray-400 leading-tight">
                                            {badge.label}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* ══════════════════════════════════════════
                    Main — contact info (left) + form (right)
                ══════════════════════════════════════════ */}
                <section className="section-gap bg-slate-50">
                    <div className="container-landing">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">

                            {/* ── Left · Contact details (shown ONLY here) ── */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: 0.1 }}
                                className="lg:col-span-1 space-y-5"
                            >
                                <div>
                                    <h2 className="font-black mb-2">
                                        Contact{' '}
                                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                                            Details
                                        </span>
                                    </h2>
                                    <p className="!text-sm text-slate-500 leading-relaxed">
                                        Prefer to reach out directly? Use any of the channels below.
                                    </p>
                                </div>

                                {/* Contact cards */}
                                {[
                                    {
                                        bg:    'from-blue-500 to-cyan-500',
                                        label: 'Our Office',
                                        sub:   [settings.address, `${settings.city || ''}, ${settings.country || 'Nepal'}`],
                                        paths: [
                                            'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z',
                                            'M15 11a3 3 0 11-6 0 3 3 0 016 0z',
                                        ],
                                    },
                                    {
                                        bg:    'from-purple-500 to-pink-500',
                                        label: 'Phone',
                                        sub:   [settings.phone, settings.business_hours],
                                        href:  `tel:${settings.phone}`,
                                        paths: ['M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z'],
                                    },
                                    {
                                        bg:    'from-orange-500 to-red-500',
                                        label: 'Email',
                                        sub:   [settings.email, 'We reply within 24 hours'],
                                        href:  `mailto:${settings.email}`,
                                        paths: ['M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'],
                                    },
                                ].map(({ bg, label, sub, href, paths }, i) => {
                                    const card = (
                                        <div className="flex items-start gap-4 p-4 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 group">
                                            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${bg} flex items-center justify-center shadow-md shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    {paths.map((d, j) => (
                                                        <path key={j} strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={d} />
                                                    ))}
                                                </svg>
                                            </div>
                                            <div className="min-w-0">
                                                <p className="!text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">
                                                    {label}
                                                </p>
                                                {sub.filter(Boolean).map((line, j) => (
                                                    <p key={j} className={`!text-sm break-words ${j === 0 ? 'text-slate-900 font-medium' : '!text-slate-400'}`}>
                                                        {line}
                                                    </p>
                                                ))}
                                            </div>
                                            {/* Arrow on hover for clickable items */}
                                            {href && (
                                                <svg className="w-4 h-4 text-slate-300 group-hover:text-blue-500 transition-colors ml-auto shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                </svg>
                                            )}
                                        </div>
                                    );
                                    return href ? (
                                        <a key={i} href={href} className="block">{card}</a>
                                    ) : (
                                        <div key={i}>{card}</div>
                                    );
                                })}

                                {/* Online badge */}
                                <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-100 rounded-2xl">
                                    <div className="relative flex h-2.5 w-2.5 shrink-0">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
                                    </div>
                                    <p className="!text-sm !text-green-700 font-medium">
                                        We're online — reply within a few hours
                                    </p>
                                </div>

                                {/* Back to site link */}
                                <InertiaLink
                                    href="/"
                                    className="inline-flex items-center gap-2 !text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors group"
                                >
                                    <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                    Back to main site
                                </InertiaLink>
                            </motion.div>

                            {/* ── Right · Form ──────────────────────── */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="lg:col-span-2"
                            >
                                <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-6 md:p-8 2xl:p-10">
                                    <div className="flex items-center gap-3 mb-7">
                                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg shrink-0">
                                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h2 className="font-black !text-xl mb-0">
                                                Send Us a Message
                                            </h2>
                                            <p className="!text-xs !text-slate-400">
                                                We'll get back to you as soon as possible
                                            </p>
                                        </div>
                                    </div>

                                    <ContactForm />
                                </div>
                            </motion.div>

                        </div>
                    </div>
                </section>

                <Footer
                    menuItems={menuItems}
                    services={services}
                    settings={settings}
                    scrollToSection={scrollToSection}
                />
            </div>
        </>
    );
}

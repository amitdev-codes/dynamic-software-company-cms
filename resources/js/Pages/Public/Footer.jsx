import { motion } from 'framer-motion';

export default function Footer({ settings, menuItems, services, scrollToSection }) {
    const currentYear = new Date().getFullYear();
    const rawSocialLinks = settings.social_links;
    const socialData = typeof rawSocialLinks === 'string'
        ? JSON.parse(rawSocialLinks)
        : rawSocialLinks;

    const iconLib = {
        facebook: 'M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z',
        twitter:  'M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84',
        github:   'M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12',
        youtube:  'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z',
    };

    const NavArrow = ({ color = 'text-blue-500' }) => (
        <svg className={`w-4 h-4 ${color} opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300`}
             fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
    );

    return (
        <footer id="footer" className="bg-slate-900 text-white relative overflow-hidden">

            {/* Background grid — reuses global .bg-grid-pattern from app.css */}
            <div className="absolute inset-0 opacity-5 pointer-events-none bg-grid-pattern" />

            <div className="relative z-10">

                {/* ── Main content ───────────────────────────────────── */}
                <div className="container-landing py-12 md:py-16 2xl:py-20">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 2xl:gap-16 mb-10">

                        {/* ── Col 1 · Company info ───────────────────── */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="sm:col-span-2 lg:col-span-1"
                        >
                            {/* Logo row */}
                            <div className="flex items-center gap-3 mb-5">
                                <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shrink-0">
                                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="!text-white !text-lg md:!text-xl font-bold leading-tight">
                                        {settings.company_name}
                                    </h3>
                                    <p className="!text-xs !text-gray-400 leading-tight">
                                        {settings.company_slogan}
                                    </p>
                                </div>
                            </div>

                            <p className="!text-gray-400 !text-sm leading-relaxed mb-5">
                                {settings.tagline}
                            </p>

                            {/* Social icons */}
                            <div className="flex flex-wrap gap-2.5">
                                {Object.entries(socialData).map(([platform, url]) => {
                                    if (!url || !iconLib[platform]) return null;
                                    return (
                                        <motion.a
                                            key={platform}
                                            href={url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            whileHover={{ scale: 1.2, y: -3 }}
                                            className="w-9 h-9 bg-white/10 hover:bg-gradient-to-br hover:from-blue-600 hover:to-purple-600 rounded-lg flex items-center justify-center transition-all duration-300 group"
                                            title={platform}
                                        >
                                            <svg className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                                                <path d={iconLib[platform]} />
                                            </svg>
                                        </motion.a>
                                    );
                                })}
                            </div>
                        </motion.div>

                        {/* ── Col 2 · Quick links ────────────────────── */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                        >
                            <h4 className="!text-white !text-base font-bold mb-5 tracking-wide">
                                Quick Links
                            </h4>
                            <ul className="space-y-2.5">
                                {menuItems?.map((item) => (
                                    <li key={item.id}>
                                        <button
                                            onClick={() => scrollToSection(item.id)}
                                            className="flex items-center gap-2 group w-full text-left"
                                        >
                                            <NavArrow color="text-blue-500" />
                                            <span className="!text-gray-400 !text-sm group-hover:!text-white group-hover:translate-x-1 transition-all duration-300">
                                                {item.label}
                                            </span>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                        {/* ── Col 3 · Services ───────────────────────── */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <h4 className="!text-white !text-base font-bold mb-5 tracking-wide">
                                Our Services
                            </h4>
                            <ul className="space-y-2.5">
                                {services?.slice(0, 5).map((service) => (
                                    <li key={service.id}>

                                       <a href="#services"
                                        className="flex items-center gap-2 group"
                                        >
                                        <NavArrow color="text-purple-500" />
                                        <span className="!text-gray-400 !text-sm group-hover:!text-white group-hover:translate-x-1 transition-all duration-300 line-clamp-1">
                                                {service.title}
                                            </span>
                                    </a>
                                    </li>
                                    ))}
                            </ul>
                        </motion.div>

                        {/* ── Col 4 · Contact ────────────────────────── */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                        >
                            <h4 className="!text-white !text-base font-bold mb-5 tracking-wide">
                                Get In Touch
                            </h4>
                            <ul className="space-y-3.5">
                                {[
                                    {
                                        bg:   'bg-blue-500/10 group-hover:bg-blue-500/20',
                                        icon: 'text-blue-400',
                                        label: 'Email',
                                        content: (
                                            <a href={`mailto:${settings.email}`}
                                               className="!text-gray-300 !text-sm hover:!text-white transition-colors break-all">
                                                {settings.email}
                                            </a>
                                        ),
                                        path: 'M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
                                    },
                                    {
                                        bg:   'bg-purple-500/10 group-hover:bg-purple-500/20',
                                        icon: 'text-purple-400',
                                        label: 'Phone',
                                        content: (
                                            <a href={`tel:${settings.phone}`}
                                               className="!text-gray-300 !text-sm hover:!text-white transition-colors">
                                                {settings.phone}
                                            </a>
                                        ),
                                        path: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z',
                                    },
                                    {
                                        bg:   'bg-cyan-500/10 group-hover:bg-cyan-500/20',
                                        icon: 'text-cyan-400',
                                        label: 'Location',
                                        content: (
                                            <p className="!text-gray-300 !text-sm leading-snug">
                                                {settings.address}<br />
                                                {settings.city}, {settings.country}
                                            </p>
                                        ),
                                        paths: [
                                            'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z',
                                            'M15 11a3 3 0 11-6 0 3 3 0 016 0z',
                                        ],
                                    },
                                ].map(({ bg, icon, label, content, path, paths }, i) => (
                                    <li key={i} className="flex items-start gap-3 group">
                                        <div className={`w-9 h-9 ${bg} rounded-lg flex items-center justify-center shrink-0 transition-colors duration-300`}>
                                            <svg className={`w-4 h-4 ${icon}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                {path
                                                    ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={path} />
                                                    : paths?.map((d, j) => <path key={j} strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={d} />)
                                                }
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="!text-gray-500 !text-xs mb-0.5">{label}</p>
                                            {content}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    </div>
                </div>

                {/* ── Bottom bar ─────────────────────────────────────── */}
                <div className="border-t border-white/10">
                    <div className="container-landing py-5">
                        <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
                            <p className="!text-gray-400 !text-xs sm:!text-sm text-center sm:text-left">
                                &copy; {currentYear} {settings.company_name}. All rights reserved.
                            </p>
                            <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
                                {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((label) => (
                                    <a key={label} href="#"
                                       className="!text-gray-400 !text-xs sm:!text-sm hover:!text-white transition-colors duration-300">
                                        {label}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </footer>
    );
}

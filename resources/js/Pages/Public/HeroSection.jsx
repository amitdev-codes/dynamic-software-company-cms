import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';

export default function HeroSection({ scrollToSection, settings }) {
    return (
        <section
            id="home"
            className="relative min-h-screen flex items-center overflow-hidden
                       bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50
                       dark:from-gray-950 dark:via-slate-900 dark:to-indigo-950
                       transition-colors duration-500"
        >
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] dark:opacity-[0.04]" />

            {/* Animated Orbs - Better for dark mode */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-72 h-72 sm:w-96 sm:h-96
                              bg-blue-400/30 dark:bg-blue-500/20
                              rounded-full mix-blend-multiply blur-3xl animate-blob" />

                <div className="absolute -bottom-40 -left-40 w-72 h-72 sm:w-96 sm:h-96
                              bg-purple-400/30 dark:bg-purple-500/20
                              rounded-full mix-blend-multiply blur-3xl animate-blob animation-delay-2000" />

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 sm:w-96 sm:h-96
                              bg-cyan-400/30 dark:bg-cyan-500/20
                              rounded-full mix-blend-multiply blur-3xl animate-blob animation-delay-4000" />
            </div>

            {/* Main Content */}
            <div className="relative w-full mb-20 container-landing py-10 lg:py-0">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        className="text-left space-y-6 sm:space-y-7 font-sans"
                    >

                        {/* TAGLINE */}
                        <p className="text-xs font-semibold tracking-[0.2em] uppercase text-blue-500 dark:text-blue-400">
                            Your Technology Partner
                        </p>

                        {/* HEADING */}
                        <div className="space-y-2">
                            <p className="text-base sm:text-lg text-slate-500 dark:text-gray-400 font-medium">
                                The best way to escape
                            </p>

                            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight
                       bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500
                       dark:from-blue-400 dark:via-purple-400 dark:to-pink-400
                       bg-clip-text text-transparent">
                                Problems
                            </h1>

                            <p className="text-base sm:text-lg text-slate-600 dark:text-gray-300 font-medium">
                                is to solve them.
                            </p>

                            <p className="text-xs italic text-slate-400 dark:text-gray-500">
                                ~ Brendan Francis
                            </p>
                        </div>



                        {/* DESCRIPTION */}
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.45, duration: 0.8 }}
                            className="text-base sm:text-lg text-slate-600 dark:text-gray-400 leading-relaxed max-w-lg"
                        >
                            {settings.description}
                        </motion.p>

                        {/* CTA */}
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.55, duration: 0.6 }}
                            className="flex flex-col sm:flex-row gap-3 sm:gap-4"
                        >
                            <Link
                                href="/contact"
                                className="inline-flex items-center justify-center gap-2 px-6 py-3
                       bg-gradient-to-r from-blue-600 to-purple-600
                       hover:from-blue-700 hover:to-purple-700
                       text-white text-sm font-semibold rounded-xl
                       shadow-lg shadow-blue-500/25
                       transition-all duration-300 hover:scale-[1.02] group"
                            >
                                Get Started
                                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </Link>

                            <button
                                onClick={() => scrollToSection('services')}
                                className="inline-flex items-center justify-center gap-2 px-6 py-3
                       border border-slate-300 dark:border-gray-700
                       hover:bg-slate-100 dark:hover:bg-gray-800
                       text-slate-700 dark:text-slate-300 text-sm font-semibold rounded-xl
                       transition-all duration-300 group"
                            >
                                Explore Services
                            </button>
                        </motion.div>
                        {/* STATS BADGES */}
                        {/* STATS (Hero Style Cards) */}
                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-6">

                            {[
                                {
                                    value: settings.years_of_experience,
                                    label: 'Years Experience',
                                    icon: '📅',
                                    color: 'from-blue-500 to-cyan-500'
                                },
                                {
                                    value: settings.projects_delivered,
                                    label: 'Projects Done',
                                    icon: '📦',
                                    color: 'from-purple-500 to-pink-500'
                                },
                                {
                                    value: '50+',
                                    label: 'Happy Clients',
                                    icon: '👥',
                                    color: 'from-cyan-500 to-blue-500'
                                },
                            ].map((stat, i) => (
                                <motion.div
                                    key={i}
                                    whileHover={{ y: -4, scale: 1.02 }}
                                    className="flex items-center gap-3 px-4 py-3 rounded-xl
                       bg-white/70 dark:bg-gray-800/70
                       backdrop-blur-md border border-slate-200 dark:border-gray-700
                       shadow-sm transition-all"
                                >
                                    {/* ICON */}
                                    <div
                                        className={`w-10 h-10 rounded-lg flex items-center justify-center
                            bg-gradient-to-br ${stat.color}
                            text-white text-sm shadow-md`}
                                    >
                                        {stat.icon}
                                    </div>

                                    {/* TEXT */}
                                    <div className="flex flex-col leading-tight">
                <span className="text-lg font-bold text-slate-900 dark:text-white">
                    {stat.value}
                </span>
                                        <span className="text-xs text-slate-500 dark:text-gray-400">
                    {stat.label}
                </span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>



                    {/* RIGHT SIDE - Visual */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.35, duration: 1 }}
                        className="relative hidden md:flex items-center justify-center"
                    >
                        {/* CENTER WRAPPER */}
                        <div className="relative flex items-center justify-center">

                            {/* IMAGE */}
                            <img
                                src="/image/slider1.png"
                                alt="Cloud Com Solutions"
                                className="w-auto h-auto object-contain z-10 p-10"
                            />

                            {/* TOP LEFT */}
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 3, repeat: Infinity }}
                                className="absolute -top-10 -left-10
           -translate-x-full -translate-y-full
           bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-xl border"
                            >
                                <div className="flex items-start gap-3">
                                    <div
                                        className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-sm">
                                        ⚡
                                    </div>
                                    <div>
                                        <p className="text-[11px] font-bold text-slate-900 dark:text-white leading-snug"
                                           style={{fontFamily: "'DM Sans', sans-serif"}}>
                                            Simplifying IT with innovative solutions.
                                        </p>
                                        <p className="text-[10px] text-slate-400 dark:text-gray-400 mt-0.5 leading-snug"
                                           style={{fontFamily: "'DM Sans', sans-serif"}}>
                                            Your trusted digital partner.
                                        </p>
                                    </div>
                                </div>
                            </motion.div>

                            {/* TOP RIGHT */}
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 3, repeat: Infinity, delay: 0.3 }}
                                className="absolute -top-10 -right-10
           translate-x-full -translate-y-full
           bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-xl border"
                            >
                                <div className="flex items-center gap-2 md:gap-3">
                                    <div
                                        className="w-9 h-9 md:w-11 md:h-11 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                                        <svg className="w-4 h-4 md:w-5 md:h-5 text-white" fill="none"
                                             stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                        </svg>
                                    </div>
                                    <div>
                                        <div
                                            className="text-[10px] text-slate-400 dark:text-gray-400 font-medium">Quality
                                        </div>
                                        <div
                                            className="text-xs md:text-sm font-bold text-slate-900 dark:text-white">100%
                                            Assured
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* BOTTOM LEFT */}
                            <motion.div
                                animate={{ y: [0, 10, 0] }}
                                transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                                className="absolute -bottom-10 -left-10
           -translate-x-full translate-y-full
           bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-xl border">
                                <div className="flex items-center gap-2 md:gap-3">
                                    <div
                                        className="w-9 h-9 md:w-11 md:h-11 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                                        <svg className="w-4 h-4 md:w-5 md:h-5 text-white" fill="none"
                                             stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                  d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/>
                                        </svg>
                                    </div>
                                    <div>
                                        <div
                                            className="text-[10px] text-slate-400 dark:text-gray-400 font-medium">Development
                                        </div>
                                        <div
                                            className="text-xs md:text-sm font-bold text-slate-900 dark:text-white">Expert
                                            Team
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* BOTTOM RIGHT */}
                            <motion.div
                                animate={{ y: [0, 10, 0] }}
                                transition={{ duration: 3, repeat: Infinity, delay: 0.7 }}
                                className="absolute -bottom-10 -right-12
           translate-x-full translate-y-full
           bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-xl border"
                            >
                                <p className="text-[9px] font-bold tracking-widest uppercase text-slate-400 dark:text-gray-400 mb-2 text-center">
                                    Tech Stack
                                </p>
                                <div className="grid grid-cols-3 gap-1.5 md:gap-2">
                                    {/* Your tech items remain same - just added dark mode where needed */}
                                    {[
                                        { name: 'Java',       bg: 'bg-[#ED8B00]', img: '/image/java.png'     },  // Java Orange (official primary)
                                        { name: '.NET',       bg: 'bg-[#512BD4]', img: '/image/dotnet.png'   },  // .NET Purple (Microsoft's common .NET branding)
                                        { name: 'Laravel',    bg: 'bg-[#FF2D20]', img: '/image/php.png'      },  // Laravel Red (official)
                                        { name: 'MySQL',      bg: 'bg-[#00758F]', img: '/image/mysql.png'    },  // MySQL Dark Blue (official)
                                        { name: 'Oracle',     bg: 'bg-[#C74634]', img: '/image/oracle.png'   },  // Oracle Red (official)
                                        { name: 'PostgreSQL', bg: 'bg-[#336791]', img: '/image/postgres.png' },  // PostgreSQL Blue (official base blue)
                                    ].map((tech, i) => (
                                        <motion.div
                                            key={i}
                                            whileHover={{ scale: 1.15, rotate: 4 }}
                                            className={`w-10 h-10 md:w-12 md:h-12 rounded-xl ${tech.bg}
            flex items-center justify-center shadow-md cursor-pointer`}
                                            title={tech.name}
                                        >
                                            <img
                                                src={tech.img}
                                                alt={tech.name}
                                                className="w-6 h-6 md:w-7 md:h-7 object-contain"
                                            />
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>

                        </div>
                    </motion.div>




                </div>
            </div>






            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.6, duration: 0.6 }}
                className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2"
            >
                <motion.button
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                    onClick={() => scrollToSection('about')}
                    className="flex flex-col items-center gap-2 group cursor-pointer"
                >
                    <span className="text-xs text-slate-400 dark:text-gray-400 font-medium tracking-widest uppercase group-hover:text-slate-600 dark:group-hover:text-gray-300 transition-colors">
                        Scroll to explore
                    </span>
                    <div className="w-5 h-9 rounded-full border-2 border-slate-300 dark:border-gray-600 group-hover:border-blue-400 transition-colors flex items-start justify-center pt-1.5">
                        <motion.div
                            animate={{ y: [0, 10, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="w-1 h-1 rounded-full bg-blue-500"
                        />
                    </div>
                </motion.button>
            </motion.div>
        </section>
    );
}

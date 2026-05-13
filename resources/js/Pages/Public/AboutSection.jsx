import { Link } from '@inertiajs/react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import {
    Lightbulb,
    Wallet,
    Users,
    CheckCircle2
} from 'lucide-react';
export default function AboutSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    const features = [
        {
            icon: Lightbulb,
            label: 'Innovation',
            value: 'R&D Driven',
            color: '#8b5cf6'
        },
        {
            icon: Wallet,
            label: 'Cost-Effective',
            value: 'Solutions',
            color: '#3b82f6'
        },
        {
            icon: Users,
            label: 'Client-Focused',
            value: 'Approach',
            color: '#1e40af'
        },
        {
            icon: CheckCircle2,
            label: 'Quality',
            value: 'Assured',
            color: '#a855f7'
        },
    ];

    return (
        <section id="about" style={{ padding: '80px 0', position: 'relative', overflow: 'hidden' }}>
            <div ref={ref} style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 20px' }}>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '80px',
                    alignItems: 'center'
                }}>

                    {/* LEFT IMAGE */}
                    <div style={{ position: 'relative' }}>

                        {/* IMAGE WRAPPER */}
                        <div style={{ position: 'relative' }}>

                            {/* ✅ FLOATING STAT CIRCLE (ONLY ANIMATED PART) */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                                animate={isInView ? {
                                    opacity: 1,
                                    scale: 1,
                                    y: [0, -10, 0]
                                } : {}}
                                transition={{
                                    opacity: { duration: 0.4 },
                                    scale: { duration: 0.4 },
                                    y: {
                                        duration: 4,
                                        repeat: Infinity,
                                        ease: 'easeInOut'
                                    }
                                }}
                                style={{
                                    position: 'absolute',
                                    top: '-30px',
                                    left: '-30px',
                                    width: '130px',
                                    height: '130px',
                                    background: '#fff',
                                    borderRadius: '50%',
                                    borderTop: '4px solid #9333EA',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    textAlign: 'center',
                                    boxShadow: '0 15px 35px rgba(0,0,0,0.1)',
                                    zIndex: 5
                                }}
                            >
                                <span style={{
                                    fontSize: '2rem',
                                    fontWeight: 900,
                                    background: 'linear-gradient(135deg,#3b82f6,#8b5cf6)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    lineHeight: 1
                                }}>
                                    12+
                                </span>
                                <span style={{
                                    fontSize: '0.6rem',
                                    color: '#64748b',
                                    fontWeight: 700,
                                    marginTop: '4px',
                                    letterSpacing: '0.5px'
                                }}>
                                    YEARS OF<br />EXPERIENCE
                                </span>
                            </motion.div>

                            {/* IMAGE */}
                            <img
                                src="/image/team.png"
                                alt="Team"
                                style={{
                                    width: '100%',
                                    borderRadius: '20px',
                                    boxShadow: '0 30px 60px rgba(0,0,0,0.1)',
                                    position: 'relative',
                                    zIndex: 2
                                }}
                            />

                            {/* BLOB */}
                            <div style={{
                                position: 'absolute',
                                bottom: '-40px',
                                right: '-40px',
                                width: '200px',
                                height: '200px',
                                background: 'rgba(139,92,246,0.1)',
                                borderRadius: '50%',
                                zIndex: 1
                            }} />
                        </div>
                    </div>

                    {/* RIGHT CONTENT */}
                    <div>

                        <span style={{
                            display: 'inline-block',
                            padding: '6px 14px',
                            background: '#dbeafe',
                            color: '#1d4ed8',
                            borderRadius: '999px',
                            fontSize: '13px',
                            fontWeight: 600,
                            marginBottom: '15px'
                        }}>
                            Know About Us
                        </span>

                        <h2
                            className="text-5xl font-semibold leading-tight mb-[18px]
             text-gray-900 dark:text-white"
                            style={{
                                fontSize: '2.5rem',
                                fontWeight: 600,
                                lineHeight: '1.2',
                                marginBottom: '18px',
                            }}
                        >
                            We Strive to be a Better <br />
                            <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent font-bold">
    Technology Partner
  </span>
                        </h2>

                        <p style={{color: '#64748b', fontSize: '1rem', lineHeight: 1.6}}>
                            We have simplified Information Technology (IT) services across organizations,
                            helping them solve their problems with cost-effective software and hardware solutions.
                        </p>

                        <p style={{ color: '#475569', fontSize: '0.95rem', marginTop: '15px', lineHeight: 1.6 }}>
                            We believe no solution can deliver significant results unless it goes through
                            <b> Research and Development (R&amp;D)</b>.
                        </p>

                        {/* FEATURES */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-6 mb-8">
                            {features.map((f, i) => {
                                const Icon = f.icon;

                                return (
                                    <div
                                        key={i}
                                        className="flex gap-3 p-4 rounded-xl border border-gray-200 dark:border-gray-700
                           bg-white dark:bg-gray-800
                           border-l-4 shadow-sm hover:shadow-md transition-all"
                                        style={{ borderLeftColor: f.color }}
                                    >
                                        <div
                                            className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                                            style={{ backgroundColor: f.color }}
                                        >
                                            <Icon size={18} color="#fff" />
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <h5 className="text-[0.95rem] font-bold text-gray-900 dark:text-white mb-0.5">
                                                {f.label}
                                            </h5>
                                            <p className="text-[0.75rem] text-gray-500 dark:text-gray-400 mb-0">
                                                {f.value}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <Link
                            href="/services"
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '8px',
                                padding: '10px 18px',
                                background: 'linear-gradient(135deg,#3b82f6,#8b5cf6)',
                                color: '#fff',
                                borderRadius: '8px',
                                fontWeight: 600,
                                textDecoration: 'none'
                            }}
                        >
                            Learn More <i className="fas fa-arrow-right" />
                        </Link>
                    </div>

                </div>
            </div>
        </section>
    );
}

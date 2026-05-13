import { SiGoogle,  SiSlack, SiShopify, SiStripe, SiDigitalocean, SiFigma } from 'react-icons/si';
import { TfiMicrosoftAlt  as SiMicrosoft } from "react-icons/tfi";
import { FaAmazon as SiAmazonwebservices} from "react-icons/fa";

const logos = [
    { icon: SiGoogle,        name: 'Google'       },
    { icon: SiMicrosoft,     name: 'Microsoft'    },
    { icon: SiAmazonwebservices, name: 'AWS'       },
    { icon: SiSlack,         name: 'Slack'        },
    { icon: SiShopify,       name: 'Shopify'      },
    { icon: SiStripe,        name: 'Stripe'       },
    { icon: SiDigitalocean,  name: 'DigitalOcean' },
    { icon: SiFigma,         name: 'Figma'        },
];

const LogoTicker = () => {
    const track = [...logos, ...logos]; // duplicate for seamless loop

    return (
        <section
            className="relative py-14 overflow-hidden
                bg-gradient-to-r from-slate-50 via-blue-50/40 to-indigo-50/50
                dark:from-[#0a0f1e] dark:via-[#0d1530]/80 dark:to-[#0a0f1e]
                border-y border-slate-200 dark:border-white/[0.06]"
            style={{ fontFamily: "'Poppins', sans-serif" }}
        >
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@500;600;700&display=swap');

                @keyframes ticker {
                    0%   { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .ticker-track {
                    animation: ticker 28s linear infinite;
                    will-change: transform;
                }
                .ticker-track:hover {
                    animation-play-state: paused;
                }
                .mask-fade {
                    -webkit-mask-image: linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%);
                    mask-image: linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%);
                }
            `}</style>

            {/* Subtle bg blobs */}
            <div className="absolute inset-0 pointer-events-none -z-10">
                <div className="absolute left-1/4 top-0 w-64 h-full bg-blue-400/5 dark:bg-blue-500/5 blur-3xl" />
                <div className="absolute right-1/4 top-0 w-64 h-full bg-purple-400/5 dark:bg-purple-500/5 blur-3xl" />
            </div>

            <div className="max-w-7xl mx-auto px-6">

                {/* Label */}
                <div className="flex items-center justify-center gap-4 mb-10">
                    <span className="h-px w-12 bg-gradient-to-r from-transparent to-slate-300 dark:to-white/20" />
                    <span className="text-[10.5px] font-semibold tracking-[3.5px] uppercase
                        text-slate-400 dark:text-white/35">
                        Serve Clients
                    </span>
                    <span className="h-px w-12 bg-gradient-to-l from-transparent to-slate-300 dark:to-white/20" />
                </div>

                {/* Ticker */}
                <div className="overflow-hidden mask-fade">
                    <div className="ticker-track flex items-center gap-0 w-max">
                        {track.map(({ icon: Icon, name }, i) => (
                            <div
                                key={i}
                                className="flex items-center gap-3 mx-10 group cursor-default select-none"
                            >
                                {/* Icon bubble */}
                                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0
                                    bg-white dark:bg-white/[0.08]
                                    border border-slate-200 dark:border-white/20
                                    shadow-sm dark:shadow-none
                                    group-hover:border-blue-300 dark:group-hover:border-blue-400/60
                                    group-hover:bg-blue-50 dark:group-hover:bg-blue-500/20
                                    transition-all duration-200">
                                    <Icon className="w-4 h-4 text-slate-600 dark:text-white/80 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200" />
                                </div>

                                {/* Name */}
                                <span className="text-base font-semibold whitespace-nowrap
                                    text-slate-500 dark:text-white/65
                                    group-hover:text-slate-800 dark:group-hover:text-white
                                    transition-colors duration-200">
                                    {name}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LogoTicker;

import { FaAmazon as SiAmazonwebservices } from 'react-icons/fa';
import { SiDigitalocean, SiFigma, SiGoogle, SiShopify, SiSlack, SiStripe } from 'react-icons/si';
import { TfiMicrosoftAlt as SiMicrosoft } from 'react-icons/tfi';

const logos = [
    { icon: SiGoogle, name: 'Google' },
    { icon: SiMicrosoft, name: 'Microsoft' },
    { icon: SiAmazonwebservices, name: 'AWS' },
    { icon: SiSlack, name: 'Slack' },
    { icon: SiShopify, name: 'Shopify' },
    { icon: SiStripe, name: 'Stripe' },
    { icon: SiDigitalocean, name: 'DigitalOcean' },
    { icon: SiFigma, name: 'Figma' },
];

const LogoTicker = () => {
    const track = [...logos, ...logos];

    return (
        <section
            className="relative overflow-hidden border-y border-slate-200/80 bg-white py-5 dark:border-white/[0.06] dark:bg-[#070b14] sm:py-6"
        >
            <style>{`
                @keyframes ticker {
                    0%   { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .ticker-track {
                    animation: ticker 26s linear infinite;
                    will-change: transform;
                }
                .ticker-track:hover {
                    animation-play-state: paused;
                }
                .mask-fade {
                    -webkit-mask-image: linear-gradient(to right, transparent 0%, black 7%, black 93%, transparent 100%);
                    mask-image: linear-gradient(to right, transparent 0%, black 7%, black 93%, transparent 100%);
                }
            `}</style>

            <div className="absolute inset-0 bg-gradient-to-r from-slate-50 via-blue-50/45 to-slate-50 dark:from-[#070b14] dark:via-[#0b1220] dark:to-[#070b14]" aria-hidden />

            <div className="container-landing relative z-10">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-8">
                    <div className="flex shrink-0 items-center justify-center gap-3 lg:justify-start">
                        <span className="h-px w-8 bg-slate-300 dark:bg-white/15" />
                        <span className="whitespace-nowrap text-[10px] font-bold uppercase tracking-[0.24em] text-slate-500 dark:text-white/45">
                            Trusted Platforms
                        </span>
                    </div>

                    <div className="mask-fade min-w-0 overflow-hidden lg:flex-1">
                        <div className="ticker-track flex w-max items-center gap-0">
                            {track.map(({ icon: Icon, name }, i) => (
                                <div
                                    key={i}
                                    className="group mx-4 flex cursor-default select-none items-center gap-2.5 rounded-full border border-slate-200/80 bg-white/75 px-3.5 py-2 shadow-sm transition-all duration-200 hover:border-blue-300 hover:bg-blue-50/80 dark:border-white/10 dark:bg-white/[0.04] dark:hover:border-blue-400/45 dark:hover:bg-blue-500/10 sm:mx-5"
                                >
                                    <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition-colors duration-200 group-hover:bg-white group-hover:text-blue-600 dark:bg-white/10 dark:text-white/75 dark:group-hover:bg-blue-500/20 dark:group-hover:text-blue-300">
                                        <Icon className="h-3.5 w-3.5" />
                                    </div>

                                    <span className="whitespace-nowrap text-sm font-semibold text-slate-600 transition-colors duration-200 group-hover:text-slate-900 dark:text-white/65 dark:group-hover:text-white">
                                        {name}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LogoTicker;

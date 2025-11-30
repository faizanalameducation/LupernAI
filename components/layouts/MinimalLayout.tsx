import React from 'react';
import { LandingPageContent } from '@/types';
import { ArrowRight, Check, Zap, BarChart3 } from 'lucide-react';

interface LayoutProps {
    content: LandingPageContent;
    industry: string;
    audience: string;
    color_theme?: string;
    mode?: string;
}

export default function MinimalLayout({ content, industry, audience, color_theme = 'Blue', mode = 'Dark' }: LayoutProps) {
    // Theme configurations
    const themes: Record<string, {
        accent: string;
        button: string;
        icon: string;
    }> = {
        Blue: {
            accent: 'text-blue-600',
            button: 'bg-blue-600 hover:bg-blue-700',
            icon: 'text-blue-600'
        },
        Purple: {
            accent: 'text-purple-600',
            button: 'bg-purple-600 hover:bg-purple-700',
            icon: 'text-purple-600'
        },
        Green: {
            accent: 'text-emerald-600',
            button: 'bg-emerald-600 hover:bg-emerald-700',
            icon: 'text-emerald-600'
        },
        Orange: {
            accent: 'text-orange-600',
            button: 'bg-orange-600 hover:bg-orange-700',
            icon: 'text-orange-600'
        },
        Red: {
            accent: 'text-red-600',
            button: 'bg-red-600 hover:bg-red-700',
            icon: 'text-red-600'
        },
    };

    const theme = themes[color_theme] || themes['Blue'];
    const isDark = mode === 'Dark';

    const bgClass = isDark ? 'bg-zinc-950' : 'bg-white';
    const textClass = isDark ? 'text-white' : 'text-zinc-900';
    const subTextClass = isDark ? 'text-zinc-400' : 'text-zinc-600';
    const navLinkClass = isDark ? 'text-zinc-400 hover:text-white' : 'text-zinc-600 hover:text-black';
    const sectionBgClass = isDark ? 'bg-zinc-900' : 'bg-[#F5F5F7]';
    const cardBgClass = isDark ? 'bg-zinc-950 shadow-none border border-zinc-800' : 'bg-white shadow-sm';
    const badgeClass = isDark ? 'bg-zinc-800 text-zinc-300' : 'bg-gray-100 text-gray-600';

    return (
        <div className={`min-h-screen ${bgClass} ${textClass} font-sans selection:bg-black selection:text-white relative z-10 transition-colors duration-300`}>
            {/* Navbar */}
            <nav className="flex items-center justify-between px-6 py-6 md:px-12 max-w-[1400px] mx-auto">
                <div className="text-xl font-bold tracking-tighter">Lupern.</div>
                <div className={`hidden md:flex items-center gap-8 text-sm font-medium ${navLinkClass}`}>
                    <a href="#" className="transition-colors">Product</a>
                    <a href="#" className="transition-colors">Solutions</a>
                    <a href="#" className="transition-colors">Pricing</a>
                </div>
                <button className={`px-5 py-2.5 ${isDark ? 'bg-white text-black hover:bg-gray-200' : 'bg-black text-white hover:bg-gray-800'} text-sm font-medium rounded-full transition-colors`}>
                    Get Started
                </button>
            </nav>

            {/* Hero Section */}
            <section className="pt-12 md:pt-20 pb-20 md:pb-32 px-6 md:px-12 max-w-[1400px] mx-auto">
                <div className="max-w-4xl">
                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${badgeClass} text-xs font-medium uppercase tracking-wider mb-8`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${theme.button.split(' ')[0]}`} />
                        {industry} &bull; {audience}
                    </div>

                    <h1 className="text-5xl md:text-8xl lg:text-9xl font-medium tracking-tighter leading-[0.95] md:leading-[0.9] mb-8 md:mb-12">
                        {content.hero_headline}
                    </h1>

                    <div className={`flex flex-col md:flex-row gap-8 md:gap-12 items-start border-t ${isDark ? 'border-zinc-800' : 'border-gray-200'} pt-8 md:pt-12`}>
                        <p className={`text-lg md:text-2xl ${subTextClass} max-w-xl leading-relaxed font-light`}>
                            {content.sub_headline}
                        </p>

                        <div className="flex flex-col gap-4 w-full md:w-auto">
                            <button className={`px-8 py-4 ${theme.button} text-white rounded-full font-medium text-lg transition-all flex items-center justify-between gap-8 group shadow-lg`}>
                                {content.cta_text}
                                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                            </button>
                            <p className={`text-sm ${subTextClass} pl-2`}>
                                No credit card required. 14-day free trial.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className={`py-20 md:py-32 px-6 md:px-12 ${sectionBgClass} transition-colors duration-300`}>
                <div className="max-w-[1400px] mx-auto">
                    <div className="mb-16 md:mb-20 max-w-2xl">
                        <h2 className="text-3xl md:text-4xl font-medium tracking-tight mb-6">
                            Everything you need to scale.
                        </h2>
                        <p className={`text-xl ${subTextClass} font-light`}>
                            Powerful features designed to help you grow your business faster and more efficiently.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                        {content.features.map((feature: string, index: number) => (
                            <div key={index} className={`${cardBgClass} p-8 md:p-10 rounded-3xl transition-all duration-300 group hover:-translate-y-1`}>
                                <div className={`w-14 h-14 ${isDark ? 'bg-zinc-900' : 'bg-black'} text-white rounded-2xl flex items-center justify-center mb-8 text-xl font-bold group-hover:scale-110 transition-transform`}>
                                    {index === 0 ? <Zap size={24} className={theme.icon} /> : index === 1 ? <BarChart3 size={24} className={theme.icon} /> : <Check size={24} className={theme.icon} />}
                                </div>
                                <h3 className="text-2xl font-medium mb-4 tracking-tight">
                                    Feature {index + 1}
                                </h3>
                                <p className={`${subTextClass} text-lg leading-relaxed font-light`}>
                                    {feature}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}

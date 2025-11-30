import React from 'react';
import GlassCard from '@/components/GlassCard';
import { LandingPageContent } from '@/types';
import { ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';

interface LayoutProps {
    content: LandingPageContent;
    industry: string;
    audience: string;
    color_theme?: string;
    mode?: string;
}

export default function ModernLayout({ content, industry, audience, color_theme = 'Blue', mode = 'Dark' }: LayoutProps) {
    // Theme configurations with explicit Tailwind classes to prevent purging
    const themes: Record<string, {
        primaryBg: string;
        secondaryBg: string;
        badgeText: string;
        gradientTitle: string;
        button: string;
        buttonText: string;
        featureIcon: string;
        featureHover: string;
        divider: string;
    }> = {
        Blue: {
            primaryBg: 'bg-blue-600/20',
            secondaryBg: 'bg-purple-600/20',
            badgeText: 'text-blue-500',
            gradientTitle: 'from-blue-400 via-purple-200 to-cyan-400',
            button: 'bg-blue-600 hover:bg-blue-500',
            buttonText: 'text-white',
            featureIcon: 'text-blue-500',
            featureHover: 'group-hover:text-blue-500',
            divider: 'from-blue-500 to-purple-500'
        },
        Purple: {
            primaryBg: 'bg-purple-600/20',
            secondaryBg: 'bg-pink-600/20',
            badgeText: 'text-purple-500',
            gradientTitle: 'from-purple-400 via-pink-200 to-fuchsia-400',
            button: 'bg-purple-600 hover:bg-purple-500',
            buttonText: 'text-white',
            featureIcon: 'text-purple-500',
            featureHover: 'group-hover:text-purple-500',
            divider: 'from-purple-500 to-pink-500'
        },
        Green: {
            primaryBg: 'bg-emerald-600/20',
            secondaryBg: 'bg-teal-600/20',
            badgeText: 'text-emerald-500',
            gradientTitle: 'from-emerald-400 via-teal-200 to-lime-400',
            button: 'bg-emerald-600 hover:bg-emerald-500',
            buttonText: 'text-white',
            featureIcon: 'text-emerald-500',
            featureHover: 'group-hover:text-emerald-500',
            divider: 'from-emerald-500 to-teal-500'
        },
        Orange: {
            primaryBg: 'bg-orange-600/20',
            secondaryBg: 'bg-red-600/20',
            badgeText: 'text-orange-500',
            gradientTitle: 'from-orange-400 via-red-200 to-amber-400',
            button: 'bg-orange-600 hover:bg-orange-500',
            buttonText: 'text-white',
            featureIcon: 'text-orange-500',
            featureHover: 'group-hover:text-orange-500',
            divider: 'from-orange-500 to-red-500'
        },
        Red: {
            primaryBg: 'bg-red-600/20',
            secondaryBg: 'bg-orange-600/20',
            badgeText: 'text-red-500',
            gradientTitle: 'from-red-400 via-orange-200 to-rose-400',
            button: 'bg-red-600 hover:bg-red-500',
            buttonText: 'text-white',
            featureIcon: 'text-red-500',
            featureHover: 'group-hover:text-red-500',
            divider: 'from-red-500 to-orange-500'
        },
    };

    const theme = themes[color_theme] || themes['Blue'];
    const isDark = mode === 'Dark';

    const bgClass = isDark ? 'bg-[#0a0a0a]' : 'bg-slate-50';
    const textClass = isDark ? 'text-white' : 'text-slate-900';
    const subTextClass = isDark ? 'text-gray-400' : 'text-gray-600';
    const cardBgClass = isDark ? 'bg-white/5 border-white/10 hover:bg-white/10' : 'bg-white/80 border-black/5 hover:bg-white shadow-lg hover:shadow-xl';

    return (
        <div className={`min-h-screen ${bgClass} ${textClass} pb-20 relative overflow-hidden transition-colors duration-500 font-sans`}>
            {/* Background Elements */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className={`absolute top-[-10%] left-[-10%] w-[50%] h-[50%] ${theme.primaryBg} rounded-full blur-[120px] opacity-50`} />
                <div className={`absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] ${theme.secondaryBg} rounded-full blur-[120px] opacity-50`} />
            </div>

            {/* Hero Section */}
            <section className="min-h-screen flex flex-col items-center justify-center p-8 text-center relative z-10">
                <div className="max-w-6xl mx-auto space-y-10 pt-20">
                    <div className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-full ${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-black/5 shadow-sm'} ${theme.badgeText} text-sm font-semibold tracking-wide backdrop-blur-md animate-fade-in-up`}>
                        <Sparkles size={16} />
                        <span className="uppercase">{industry} &bull; {audience}</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-[1.1] animate-fade-in-up delay-100">
                        <span className={`bg-clip-text text-transparent bg-gradient-to-r ${theme.gradientTitle}`}>
                            {content.hero_headline}
                        </span>
                    </h1>

                    <p className={`text-xl md:text-2xl ${subTextClass} max-w-3xl mx-auto leading-relaxed animate-fade-in-up delay-200 font-light`}>
                        {content.sub_headline}
                    </p>

                    <div className="pt-8 animate-fade-in-up delay-300">
                        <button className={`group relative px-10 py-5 ${isDark ? 'bg-white text-black hover:bg-gray-100' : 'bg-black text-white hover:bg-gray-900'} font-bold rounded-full text-lg hover:scale-105 transition-all duration-300 shadow-2xl flex items-center gap-3 mx-auto`}>
                            {content.cta_text}
                            <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-32 px-8 relative z-10">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-24">
                        <h2 className={`text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b ${isDark ? 'from-white to-white/40' : 'from-black to-black/40'} mb-8`}>
                            Why Choose Us?
                        </h2>
                        <div className={`w-24 h-1.5 bg-gradient-to-r ${theme.divider} mx-auto rounded-full`} />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {content.features.map((feature: string, index: number) => (
                            <GlassCard key={index} className={`p-10 transition-all duration-500 group hover:-translate-y-2 ${cardBgClass}`}>
                                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${isDark ? 'from-white/10 to-white/5' : 'from-black/5 to-black/0'} ${isDark ? 'border-white/10' : 'border-black/5'} mb-8 flex items-center justify-center group-hover:scale-110 transition-transform duration-500`}>
                                    <span className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-black'}`}>{index + 1}</span>
                                </div>
                                <h3 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-black'} ${theme.featureHover} transition-colors`}>
                                    Feature {index + 1}
                                </h3>
                                <div className="flex gap-4 items-start">
                                    <CheckCircle2 className={`${theme.featureIcon} shrink-0 mt-1`} size={20} />
                                    <p className={`${subTextClass} leading-relaxed text-lg`}>
                                        {feature}
                                    </p>
                                </div>
                            </GlassCard>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}

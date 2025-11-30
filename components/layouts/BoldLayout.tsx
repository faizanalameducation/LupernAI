import React from 'react';
import { LandingPageContent } from '@/types';
import { ArrowUpRight, Star } from 'lucide-react';

interface LayoutProps {
    content: LandingPageContent;
    industry: string;
    audience: string;
    color_theme?: string;
    mode?: string;
}

export default function BoldLayout({ content, industry, audience, color_theme = 'Blue', mode = 'Dark' }: LayoutProps) {
    // Theme configurations
    const themes: Record<string, {
        bg: string;
        text: string;
        border: string;
        marqueeBg: string;
        marqueeText: string;
    }> = {
        Blue: {
            bg: 'bg-blue-600',
            text: 'text-blue-600',
            border: 'border-blue-600',
            marqueeBg: 'bg-blue-600',
            marqueeText: 'text-white'
        },
        Purple: {
            bg: 'bg-purple-600',
            text: 'text-purple-600',
            border: 'border-purple-600',
            marqueeBg: 'bg-purple-600',
            marqueeText: 'text-white'
        },
        Green: {
            bg: 'bg-emerald-600',
            text: 'text-emerald-600',
            border: 'border-emerald-600',
            marqueeBg: 'bg-emerald-600',
            marqueeText: 'text-white'
        },
        Orange: {
            bg: 'bg-[#FF4D00]',
            text: 'text-[#FF4D00]',
            border: 'border-[#FF4D00]',
            marqueeBg: 'bg-[#FF4D00]',
            marqueeText: 'text-black'
        },
        Red: {
            bg: 'bg-red-600',
            text: 'text-red-600',
            border: 'border-red-600',
            marqueeBg: 'bg-red-600',
            marqueeText: 'text-white'
        },
    };

    const theme = themes[color_theme] || themes['Orange'];
    const isDark = mode === 'Dark';

    // In Bold layout:
    // Light Mode = Colored Background, Black Text
    // Dark Mode = Black Background, Colored Text

    const mainBg = isDark ? 'bg-black' : theme.bg;
    const mainText = isDark ? theme.text : (color_theme === 'Orange' ? 'text-black' : 'text-white');
    const borderColor = isDark ? theme.border : 'border-black';

    const marqueeBg = isDark ? theme.marqueeBg : 'bg-black';
    const marqueeText = isDark ? (color_theme === 'Orange' ? 'text-black' : 'text-white') : theme.text;

    const buttonBg = isDark ? theme.bg : 'bg-white';
    const buttonText = isDark ? (color_theme === 'Orange' ? 'text-black' : 'text-white') : 'text-black';
    const buttonBorder = isDark ? theme.border : 'border-black';

    return (
        <div className={`min-h-screen ${mainBg} ${mainText} font-mono selection:bg-white selection:text-black transition-colors duration-300`}>
            {/* Marquee Bar */}
            <div className={`${marqueeBg} ${marqueeText} py-3 overflow-hidden whitespace-nowrap border-b-4 ${borderColor}`}>
                <div className="inline-block animate-marquee font-bold uppercase tracking-widest">
                    {industry} {'///'} {audience} {'///'} {industry} {'///'} {audience} {'///'} {industry} {'///'} {audience} {'///'}
                </div>
            </div>

            {/* Hero Section */}
            <section className={`min-h-screen flex flex-col justify-center p-6 md:p-12 border-b-4 ${borderColor}`}>
                <div className="max-w-[90rem] mx-auto w-full">
                    <h1 className="text-5xl md:text-7xl lg:text-9xl font-black uppercase leading-[0.9] tracking-tighter mb-8 md:mb-12 break-words">
                        {content.hero_headline}
                    </h1>

                    <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-end border-t-4 ${borderColor} pt-8 md:pt-12`}>
                        <p className="text-xl md:text-4xl font-bold leading-tight max-w-2xl">
                            {content.sub_headline}
                        </p>

                        <div className="flex justify-start md:justify-end">
                            <button className={`group relative px-6 py-4 md:px-8 md:py-6 ${buttonBg} ${buttonText} border-4 ${buttonBorder} text-xl md:text-2xl font-black uppercase hover:-translate-y-2 hover:translate-x-2 transition-transform shadow-[8px_8px_0px_0px_rgba(255,255,255,0.2)] hover:shadow-[12px_12px_0px_0px_rgba(255,255,255,0.4)] flex items-center gap-4`}>
                                {content.cta_text}
                                <ArrowUpRight className="w-6 h-6 md:w-8 md:h-8 group-hover:rotate-45 transition-transform" />
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className={isDark ? 'bg-zinc-900' : 'bg-white'}>
                <div className="grid grid-cols-1 md:grid-cols-3">
                    {content.features.map((feature: string, index: number) => (
                        <div key={index} className={`relative p-8 md:p-12 border-b-4 md:border-b-0 md:border-r-4 ${borderColor} last:border-r-0 hover:${theme.bg} transition-colors duration-300 group min-h-[300px] md:min-h-[400px] flex flex-col justify-between`}>
                            <div className="flex justify-between items-start mb-8">
                                <div className={`w-12 h-12 md:w-16 md:h-16 ${isDark ? theme.bg : 'bg-black'} ${isDark ? (color_theme === 'Orange' ? 'text-black' : 'text-white') : 'text-white'} flex items-center justify-center text-xl md:text-2xl font-bold border-2 ${borderColor} group-hover:bg-white group-hover:text-black transition-colors`}>
                                    0{index + 1}
                                </div>
                                <Star className={`w-10 h-10 md:w-12 md:h-12 fill-current text-transparent stroke-current ${isDark ? theme.text : 'text-black'} group-hover:fill-black group-hover:stroke-black transition-all`} />
                            </div>

                            <p className={`text-2xl md:text-3xl font-bold leading-tight uppercase ${isDark ? 'text-white' : 'text-black'} group-hover:text-black`}>
                                {feature}
                            </p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}

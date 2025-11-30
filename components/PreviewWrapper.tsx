'use client';

import React, { useState, useRef, useEffect } from 'react';
import { RotateCw, Monitor, Code } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface PreviewWrapperProps {
    children: React.ReactNode;
    siteUrl?: string;
}

export default function PreviewWrapper({ children, siteUrl = 'https://lupern.ai/preview' }: PreviewWrapperProps) {
    const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');
    const [htmlCode, setHtmlCode] = useState('');
    const previewRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    useEffect(() => {
        if (activeTab === 'code' && previewRef.current) {
            // Get the HTML content
            let html = previewRef.current.innerHTML;
            // Basic formatting
            html = html.replace(/class="/g, 'class="');
            setHtmlCode(html);
        }
    }, [activeTab]);

    const [isFullscreen, setIsFullscreen] = useState(false);

    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };

        document.addEventListener('fullscreenchange', handleFullscreenChange);
        return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
    }, []);

    const handleRefresh = () => {
        const viewport = document.getElementById('viewport');
        if (viewport) {
            viewport.style.opacity = '0.5';
            setTimeout(() => {
                viewport.style.opacity = '1';
                setActiveTab('preview');
            }, 300);
        }
    };

    const handleFullscreen = () => {
        const viewport = document.getElementById('viewport');
        if (!document.fullscreenElement && viewport) {
            viewport.requestFullscreen().catch(err => {
                console.error(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
            });
        } else {
            document.exitFullscreen();
        }
    };

    return (
        <div className="min-h-screen bg-[#0f0c29] text-white p-4 md:p-8 flex flex-col items-center">
            {/* Ambient Background Mesh */}
            <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-600/30 rounded-full blur-[120px] animate-pulse"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-600/30 rounded-full blur-[120px] animate-pulse delay-1000"></div>
            </div>

            <main className="relative z-10 w-full max-w-[1400px] mx-auto">
                {/* Tab Controls */}
                <div className="flex items-center gap-6 mb-4 px-2">
                    <button
                        onClick={() => setActiveTab('preview')}
                        className={`pb-2 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${activeTab === 'preview' ? 'border-blue-400 text-white' : 'border-transparent text-white/40 hover:text-white/70'}`}
                    >
                        <Monitor size={16} />
                        Live Preview
                    </button>
                    <button
                        onClick={() => setActiveTab('code')}
                        className={`pb-2 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${activeTab === 'code' ? 'border-blue-400 text-white' : 'border-transparent text-white/40 hover:text-white/70'}`}
                    >
                        <Code size={16} />
                        Code
                    </button>
                    <div className="flex-1"></div>
                    <div className="flex gap-2">
                        <div className="px-3 py-1 bg-white/5 rounded text-xs text-white/40 font-mono border border-white/5">
                            100%
                        </div>
                    </div>
                </div>

                {/* Browser Mockup Window */}
                <div className="glass-panel relative bg-[#1a1a2e] rounded-xl overflow-hidden shadow-2xl flex flex-col h-[85vh] border border-white/10 backdrop-blur-xl">

                    {/* Browser Address Bar */}
                    <div className="bg-black/40 backdrop-blur-md px-4 py-3 flex items-center gap-4 border-b border-white/5 shrink-0">
                        <div className="flex gap-2 group">
                            <button
                                onClick={() => router.push('/dashboard')}
                                className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-400 transition-colors flex items-center justify-center group-hover:after:content-['←'] group-hover:after:text-[8px] group-hover:after:text-black/50"
                                title="Back to Dashboard"
                            />
                            <button
                                onClick={() => router.push('/')}
                                className="w-3 h-3 rounded-full bg-yellow-500/80 hover:bg-yellow-400 transition-colors flex items-center justify-center group-hover:after:content-['⌂'] group-hover:after:text-[8px] group-hover:after:text-black/50"
                                title="Back to Home"
                            />
                            <button
                                onClick={handleFullscreen}
                                className="w-3 h-3 rounded-full bg-green-500/80 hover:bg-green-400 transition-colors flex items-center justify-center group-hover:after:content-['⤢'] group-hover:after:text-[8px] group-hover:after:text-black/50"
                                title="Toggle Fullscreen"
                            />
                        </div>
                        <div className="flex-1 bg-white/5 rounded-md h-7 mx-4 flex items-center px-3 text-xs text-white/30 font-mono select-none">
                            {siteUrl}
                        </div>
                        <div className="p-1 hover:bg-white/10 rounded-md transition-colors cursor-pointer" onClick={handleRefresh}>
                            <RotateCw className="w-4 h-4 text-white/30" />
                        </div>
                    </div>

                    {/* Viewport Content Container */}
                    <div className="flex-1 overflow-hidden relative bg-white" id="viewport">

                        {/* Fullscreen Exit Button */}
                        {isFullscreen && (
                            <button
                                onClick={handleFullscreen}
                                className="fixed top-4 right-4 z-50 bg-black/50 hover:bg-black/70 text-white px-4 py-2 rounded-full backdrop-blur-md transition-all flex items-center gap-2 text-sm font-medium border border-white/10"
                            >
                                <Monitor size={14} />
                                Exit Fullscreen
                            </button>
                        )}

                        {/* 1. PREVIEW STATE */}
                        <div
                            ref={previewRef}
                            className={`h-full w-full overflow-y-auto custom-scrollbar ${activeTab === 'preview' ? 'block' : 'hidden'}`}
                        >
                            {children}
                        </div>

                        {/* 2. CODE STATE */}
                        <div className={`h-full w-full overflow-hidden bg-[#1e1e1e] ${activeTab === 'code' ? 'block' : 'hidden'}`}>
                            <div className="h-full overflow-auto p-6 custom-scrollbar">
                                <pre className="font-mono text-sm text-blue-300 whitespace-pre-wrap break-all">
                                    {htmlCode}
                                </pre>
                            </div>
                        </div>

                    </div>
                </div>
            </main>
        </div>
    );
}

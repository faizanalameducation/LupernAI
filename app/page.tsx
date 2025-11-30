import Link from 'next/link';
import GlassCard from '@/components/GlassCard';
import { Sparkles, Zap, Globe, Github, Linkedin } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <header className="p-6 flex justify-between items-center max-w-7xl mx-auto w-full z-50">
        <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
          Lupern
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-400 font-medium hidden md:block">Created By Faizan</span>
          <a href="https://github.com/faizanalameducation" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 transition-all text-white hover:scale-110">
            <Github size={20} />
          </a>
          <a href="https://linkedin.com/in/faizanalamfa" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 transition-all text-white hover:scale-110">
            <Linkedin size={20} />
          </a>
        </div>
      </header>

      <section className="flex-1 flex flex-col items-center justify-center p-8 text-center relative">
        <div className="max-w-4xl mx-auto space-y-8 z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-sm">
            <Sparkles size={16} />
            <span>AI-Powered Landing Page Generator</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-bold tracking-tight">
            Create Stunning <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
              Landing Pages
            </span>
          </h1>

          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Generate high-converting, SEO-optimized landing pages in seconds using advanced AI.
            Just describe your business, and we handle the rest.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <Link href="/dashboard">
              <button className="px-8 py-4 bg-white text-black font-bold rounded-full text-lg hover:scale-105 transition-transform shadow-[0_0_40px_-10px_rgba(255,255,255,0.5)] flex items-center gap-2">
                <Zap className="fill-black" size={20} />
                Start Generating
              </button>
            </Link>
            <button className="px-8 py-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 backdrop-blur-sm transition-all text-lg font-medium">
              View Examples
            </button>
          </div>
        </div>
      </section>

      <section className="py-24 px-8 max-w-7xl mx-auto w-full z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <GlassCard className="p-8">
            <Globe className="w-10 h-10 text-blue-400 mb-4" />
            <h3 className="text-xl font-bold mb-2">SEO Optimized</h3>
            <p className="text-gray-400">
              Automatically generated meta tags and content structure optimized for search engines.
            </p>
          </GlassCard>
          <GlassCard className="p-8">
            <Sparkles className="w-10 h-10 text-purple-400 mb-4" />
            <h3 className="text-xl font-bold mb-2">AI Copywriting</h3>
            <p className="text-gray-400">
              Compelling headlines and copy tailored to your specific industry and audience.
            </p>
          </GlassCard>
          <GlassCard className="p-8">
            <Zap className="w-10 h-10 text-pink-400 mb-4" />
            <h3 className="text-xl font-bold mb-2">Instant Preview</h3>
            <p className="text-gray-400">
              See your landing page come to life instantly with our real-time preview engine.
            </p>
          </GlassCard>
        </div>
      </section>
    </main>
  );
}

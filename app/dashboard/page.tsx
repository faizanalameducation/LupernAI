'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import GlassCard from '@/components/GlassCard';
import { generateLandingPage } from '@/app/actions/generate';
import { Loader2 } from 'lucide-react';

export default function Dashboard() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [countdown, setCountdown] = useState<number | null>(null);

    // Timer logic
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (loading && countdown !== null && countdown > 0) {
            interval = setInterval(() => {
                setCountdown((prev) => (prev !== null ? prev - 1 : null));
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [loading, countdown]);

    async function handleSubmit(formData: FormData) {
        setLoading(true);
        setCountdown(8); // Start countdown from 8 seconds

        try {
            const result = await generateLandingPage(formData);

            if (result.success) {
                router.push(`/preview/${result.projectId}`);
            } else {
                alert('Failed to generate landing page. Please try again.');
                setLoading(false);
                setCountdown(null);
            }
        } catch (error) {
            console.error(error);
            alert('An error occurred.');
            setLoading(false);
            setCountdown(null);
        }
    }

    return (
        <div className="min-h-screen p-4 md:p-8 flex items-center justify-center relative">
            {/* Back Button */}
            <button
                onClick={() => router.push('/')}
                className="absolute top-4 left-4 md:top-8 md:left-8 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors flex items-center gap-2 z-10"
            >
                ← <span className="hidden md:inline">Back</span>
            </button>

            <GlassCard className="w-full max-w-2xl p-8">
                <h1 className="text-3xl font-bold text-white mb-6 text-center">
                    AI Landing Page Generator
                </h1>
                <form action={handleSubmit} className="space-y-6">
                    {/* ... (previous form fields remain unchanged) ... */}

                    {/* Note: I'm skipping the middle part of the form for brevity in this replacement, 
                        assuming the user wants me to keep the existing fields. 
                        However, replace_file_content requires exact context. 
                        I will target the specific blocks instead of the whole file to be safe.
                    */}

                    {/* Wait, I can't skip content in replace_file_content if I'm replacing a block. 
                        I need to be careful. The previous tool call showed the whole file. 
                        I will target the `handleSubmit` function and the submit button area.
                    */}

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Business Name
                        </label>
                        <input
                            name="businessName"
                            required
                            className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                            placeholder="e.g. Acme Corp"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Industry
                            </label>
                            <input
                                name="industry"
                                required
                                className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                placeholder="e.g. SaaS"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Target Audience
                            </label>
                            <input
                                name="audience"
                                required
                                className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                placeholder="e.g. Small Business Owners"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Keywords (comma separated)
                        </label>
                        <input
                            name="keywords"
                            required
                            className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                            placeholder="e.g. automation, efficiency, growth"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Tone of Voice
                            </label>
                            <div className="relative">
                                <select
                                    name="tone"
                                    className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                                >
                                    <option value="Professional" className="bg-slate-900 text-white">Professional</option>
                                    <option value="Friendly" className="bg-slate-900 text-white">Friendly</option>
                                    <option value="Persuasive" className="bg-slate-900 text-white">Persuasive</option>
                                    <option value="Bold" className="bg-slate-900 text-white">Bold</option>
                                </select>
                                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-gray-400">
                                    <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                                        <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path>
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Color Theme
                            </label>
                            <div className="relative">
                                <select
                                    name="color_theme"
                                    className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                                >
                                    <option value="Blue" className="bg-slate-900 text-white">Blue (Default)</option>
                                    <option value="Purple" className="bg-slate-900 text-white">Purple</option>
                                    <option value="Green" className="bg-slate-900 text-white">Green</option>
                                    <option value="Orange" className="bg-slate-900 text-white">Orange</option>
                                    <option value="Red" className="bg-slate-900 text-white">Red</option>
                                </select>
                                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-gray-400">
                                    <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                                        <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-4">
                            Select Layout
                        </label>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <label className="cursor-pointer group">
                                <input type="radio" name="layout" value="Modern" className="hidden peer" defaultChecked />
                                <div className="border border-white/10 rounded-xl p-4 bg-white/5 peer-checked:bg-blue-500/20 peer-checked:border-blue-500 transition-all hover:bg-white/10">
                                    <div className="h-24 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg mb-3 border border-white/5"></div>
                                    <div className="font-semibold text-center text-white">Modern</div>
                                    <div className="text-xs text-gray-400 text-center mt-1">Clean & Gradient</div>
                                </div>
                            </label>

                            <label className="cursor-pointer group">
                                <input type="radio" name="layout" value="Minimal" className="hidden peer" />
                                <div className="border border-white/10 rounded-xl p-4 bg-white/5 peer-checked:bg-blue-500/20 peer-checked:border-blue-500 transition-all hover:bg-white/10">
                                    <div className="h-24 bg-white/5 rounded-lg mb-3 border border-white/5"></div>
                                    <div className="font-semibold text-center text-white">Minimal</div>
                                    <div className="text-xs text-gray-400 text-center mt-1">Simple & Elegant</div>
                                </div>
                            </label>

                            <label className="cursor-pointer group">
                                <input type="radio" name="layout" value="Bold" className="hidden peer" />
                                <div className="border border-white/10 rounded-xl p-4 bg-white/5 peer-checked:bg-blue-500/20 peer-checked:border-blue-500 transition-all hover:bg-white/10">
                                    <div className="h-24 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-lg mb-3 border border-white/5"></div>
                                    <div className="font-semibold text-center text-white">Bold</div>
                                    <div className="text-xs text-gray-400 text-center mt-1">High Impact</div>
                                </div>
                            </label>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row items-center gap-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-4 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center shadow-lg shadow-blue-500/25"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="animate-spin mr-2" />
                                    Generating Magic...
                                </>
                            ) : (
                                'Generate Landing Page'
                            )}
                        </button>

                        {loading && countdown !== null && (
                            <div className="text-sm text-gray-300 animate-pulse whitespace-nowrap bg-white/5 px-4 py-2 rounded-lg border border-white/10">
                                your landing page will be generated in <span className="font-bold text-blue-400">{countdown} sec</span>
                            </div>
                        )}
                    </div>
                </form>
            </GlassCard>
        </div>
    );
}

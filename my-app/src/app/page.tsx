import { HandMetal, Activity, ShieldAlert, BarChart3, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
    return (
        <div className="min-h-screen bg-[#0B0F19] flex flex-col items-center pb-20 overflow-x-hidden relative">
            {/* Background Glow */}
            <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-indigo-600/20 blur-[120px] rounded-full point-events-none" />
            <div className="absolute bottom-[20%] right-[-10%] w-[40%] h-[40%] bg-violet-600/10 blur-[120px] rounded-full point-events-none" />

            {/* Navigation */}
            <nav className="w-full max-w-7xl px-6 py-6 flex justify-between items-center z-10 glass-card mx-4 mt-4 rounded-2xl">
                <div className="flex items-center gap-2 font-bold text-xl tracking-tight text-white">
                    <HandMetal className="w-6 h-6 text-indigo-400" />
                    Aporto.tech
                </div>
                <div className="flex gap-4 items-center">
                    <Link href="/login" className="text-sm font-medium hover:text-indigo-400 transition-colors">Log in</Link>
                    <Link href="/register" className="text-sm font-medium bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg transition-colors glow-effect">
                        Get Started
                    </Link>
                </div>
            </nav>

            {/* Hero Section */}
            <main className="flex-1 w-full max-w-5xl px-6 flex flex-col items-center justify-center text-center mt-32 z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/50 border border-slate-700 text-indigo-300 text-xs font-medium mb-8">
                    <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                    Real-time AI Cost Tracking
                </div>

                <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-indigo-300 leading-tight">
                    Stop Your AI Agent From <br /> <span className="text-indigo-400">Burning Your Budget</span>
                </h1>

                <p className="text-lg md:text-xl text-slate-400 max-w-2xl mb-12">
                    OpenClaw monitoring and AI agent cost tracking made simple. See every dollar your agent spends with real-time dashboards and bulletproof spending alerts.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                    <Link href="/register" className="flex items-center justify-center gap-2 bg-white text-slate-900 hover:bg-slate-200 px-8 py-4 rounded-xl font-semibold text-lg transition-all transform hover:scale-105">
                        Start Monitoring Free
                        <ChevronRight className="w-5 h-5" />
                    </Link>
                    <Link href="#features" className="flex items-center justify-center gap-2 bg-slate-800 text-white hover:bg-slate-700 border border-slate-700 px-8 py-4 rounded-xl font-semibold text-lg transition-all">
                        View Analytics
                    </Link>
                </div>

                {/* Features Grid */}
                <div id="features" className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-32 w-full text-left">
                    <div className="glass-card p-8 rounded-2xl flex flex-col gap-4">
                        <div className="w-12 h-12 bg-indigo-500/20 rounded-xl flex items-center justify-center text-indigo-400">
                            <Activity className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-semibold text-white">Live Token Tracking</h3>
                        <p className="text-slate-400 text-sm">Monitor input/output tokens dynamically as your OpenClaw agent processes tasks across multiple providers.</p>
                    </div>
                    <div className="glass-card p-8 rounded-2xl flex flex-col gap-4 border-indigo-500/30">
                        <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center text-red-400">
                            <ShieldAlert className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-semibold text-white">Budget Protection</h3>
                        <p className="text-slate-400 text-sm">Set strict financial limits. Automatically pause your agent when thresholds are reached to prevent billing surprises.</p>
                    </div>
                    <div className="glass-card p-8 rounded-2xl flex flex-col gap-4">
                        <div className="w-12 h-12 bg-violet-500/20 rounded-xl flex items-center justify-center text-violet-400">
                            <BarChart3 className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-semibold text-white">Cost Analytics</h3>
                        <p className="text-slate-400 text-sm">Deep dive into per-session costs. Understand exactly which tasks and models are driving your AI expenditure.</p>
                    </div>
                </div>
            </main>
        </div>
    );
}

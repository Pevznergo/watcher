import Link from "next/link";
import { Activity, ShieldAlert, BarChart3, ChevronRight, Menu, X, Rocket, Terminal, Box, Play, CreditCard } from "lucide-react";

export default function ClawwatcherClone() {
  return (
    <div className="min-h-screen bg-[#0A0A0F] text-white font-sans selection:bg-[#6366F1]/30">
      
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-[#0A0A0F]/80 backdrop-blur-md border-b border-indigo-500/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center p-1.5">
                <svg viewBox="0 0 24 24" fill="none" className="w-full h-full text-white" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                </svg>
              </div>
              <span className="font-bold text-xl tracking-tight">Aporto.tech</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <Link href="#features" className="text-sm text-gray-400 hover:text-white transition-colors">Features</Link>
              <Link href="#pricing" className="text-sm text-gray-400 hover:text-white transition-colors">Pricing</Link>
              <Link href="#faq" className="text-sm text-gray-400 hover:text-white transition-colors">FAQ</Link>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <Link href="/login" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Sign in</Link>
              <Link href="/register" className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-500 transition-colors shadow-lg shadow-indigo-500/25">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="pt-32 pb-16 sm:pt-40 sm:pb-24 lg:pb-32 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full overflow-hidden -z-10 pointer-events-none">
          <div className="absolute -top-48 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-indigo-600/20 blur-[120px] rounded-full mix-blend-screen opacity-50" />
          <div className="absolute top-32 -left-48 w-[600px] h-[600px] bg-violet-600/10 blur-[120px] rounded-full mix-blend-screen opacity-50" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-medium mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            Real-time Monitoring for OpenClaw
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8">
            <span className="block text-white">Stop your AI agent from</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-500">burning your budget</span>
          </h1>

          <p className="mt-6 text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed mb-10">
            A real-time dashboard and cost tracker for your OpenClaw agents. Set strict budget limits, analyze token usage, and get spending alerts before you go broke.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/register" className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-base font-medium rounded-xl text-white bg-indigo-600 hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-0.5">
              Start Monitoring Free
              <ChevronRight className="ml-2 w-5 h-5" />
            </Link>
            <a href="https://github.com/Pevznergo/watcher" target="_blank" rel="noreferrer" className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-base font-medium rounded-xl text-white bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
              <svg viewBox="0 0 24 24" className="w-5 h-5 mr-2" fill="currentColor">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>
              View GitHub setup
            </a>
          </div>

          {/* Interface Mockup */}
          <div className="mt-20 relative mx-auto max-w-5xl">
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-violet-600 rounded-2xl blur opacity-20"></div>
            <div className="relative rounded-2xl bg-[#0A0A0F] border border-white/10 shadow-2xl overflow-hidden flex flex-col hidden sm:flex h-[600px]">
              
              {/* Mockup Header */}
              <div className="h-12 border-b border-white/5 bg-white/[0.02] flex items-center px-4 gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                </div>
                <div className="mx-auto bg-black/40 px-3 py-1 rounded-md text-xs text-gray-400 font-mono border border-white/5 flex items-center gap-2">
                  <ShieldAlert className="w-3 h-3" />
                  watcher.aporto.tech
                </div>
              </div>

              {/* Mockup Body */}
              <div className="flex flex-1 overflow-hidden">
                {/* Mockup Sidebar */}
                <div className="w-64 border-r border-white/5 bg-white/[0.01] p-4 flex flex-col gap-2">
                  <div className="px-3 py-2 bg-indigo-500/10 text-indigo-400 rounded-lg text-sm font-medium flex items-center gap-2">
                    <Activity className="w-4 h-4" />
                    Dashboard
                  </div>
                  <div className="px-3 py-2 hover:bg-white/5 text-gray-400 rounded-lg text-sm transition-colors flex items-center gap-2">
                    <Terminal className="w-4 h-4" />
                    Sessions
                  </div>
                  <div className="px-3 py-2 hover:bg-white/5 text-gray-400 rounded-lg text-sm transition-colors flex items-center gap-2">
                    <CreditCard className="w-4 h-4" />
                    Billing & Limits
                  </div>
                </div>

                {/* Mockup Content */}
                <div className="flex-1 p-8 bg-[#0A0A0F] overflow-hidden">
                  <div className="flex justify-between items-center mb-8">
                    <h3 className="text-xl font-semibold text-white">Overview</h3>
                    <div className="flex gap-2">
                      <div className="px-3 py-1.5 rounded-md bg-white/5 border border-white/10 text-sm text-gray-400 flex items-center gap-2">
                        Last 24 Hours
                      </div>
                    </div>
                  </div>

                  {/* Mockup Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-8">
                    <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                      <div className="text-sm text-gray-400 mb-1">Total Cost</div>
                      <div className="text-3xl font-bold text-white">$14.28</div>
                      <div className="text-xs text-green-400 mt-2 flex items-center gap-1">
                        Trending down
                      </div>
                    </div>
                    <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                      <div className="text-sm text-gray-400 mb-1">Tokens Used</div>
                      <div className="text-3xl font-bold text-white">4.2M</div>
                      <div className="text-xs text-indigo-400 mt-2 flex items-center gap-1">
                        Across 3 models
                      </div>
                    </div>
                    <div className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
                      <div className="text-sm text-indigo-300 mb-1">Budget Limit</div>
                      <div className="text-3xl font-bold text-indigo-400">$30.00</div>
                      <div className="text-xs text-indigo-300/70 mt-2 flex items-center gap-1">
                        47% consumed
                      </div>
                    </div>
                  </div>

                  {/* Mockup Chart Area */}
                  <div className="h-48 rounded-xl bg-white/[0.01] border border-white/5 flex items-end justify-between p-4 gap-2">
                    {[40, 70, 45, 90, 65, 85, 40, 30, 60, 100, 75, 50, 40, 80, 55, 95].map((h, i) => (
                      <div key={i} className="w-full bg-indigo-500/20 rounded-t-sm hover:bg-indigo-500/40 transition-colors relative group" style={{ height: `${h}%` }}>
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black/80 px-2 py-1 rounded text-[10px] text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                          ${(h * 0.15).toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Features Section */}
      <section id="features" className="py-24 bg-[#0A0A0F] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything you need to control costs</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">OpenClaw agents can easily run loops and consume massive amounts of tokens. Aporto provides the safety rails you need.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-indigo-500/30 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 mb-4">
                <BarChart3 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Per-session Analytics</h3>
              <p className="text-gray-400 text-sm leading-relaxed">View exactly how much each individual agent session cost you, broken down by input and output tokens.</p>
            </div>
            
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-violet-500/30 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-violet-500/10 flex items-center justify-center text-violet-400 mb-4">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Hard Budget Limits</h3>
              <p className="text-gray-400 text-sm leading-relaxed">Set a daily or monthly budget. If your agent hits the limit, Aporto automatically rejects its API calls until reset.</p>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-indigo-500/30 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 mb-4">
                <Activity className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Live Tracking</h3>
              <p className="text-gray-400 text-sm leading-relaxed">Watch the tokens flow in real-time. No more waiting hours for billing dashboards to update.</p>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-violet-500/30 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-violet-500/10 flex items-center justify-center text-violet-400 mb-4">
                <Box className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Cross-Model Support</h3>
              <p className="text-gray-400 text-sm leading-relaxed">Automatically calculates accurate costs whether your agent uses Claude 3.5 Sonnet, GPT-4o, or OpenRouter models.</p>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-indigo-500/30 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 mb-4">
                <Terminal className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">1-Minute Setup</h3>
              <p className="text-gray-400 text-sm leading-relaxed">Just change your OpenClaw base URL to our proxy and add your API key. No code changes required to your agent.</p>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-violet-500/30 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-violet-500/10 flex items-center justify-center text-violet-400 mb-4">
                <Rocket className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Fast Proxy</h3>
              <p className="text-gray-400 text-sm leading-relaxed">Our edge-optimized proxy adds incredibly minimal latency to your agent's API requests.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-indigo-600/5"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-indigo-600/20 blur-[120px] rounded-full mix-blend-screen opacity-50" />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <h2 className="text-4xl font-bold mb-6 text-white">Ready to secure your AI budget?</h2>
          <p className="text-xl text-gray-400 mb-10">Join developers who trust Aporto to monitor their autonomous agents.</p>
          <Link href="/register" className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium rounded-xl text-white bg-indigo-600 hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-500/25 hover:-translate-y-0.5">
            Create Free Account
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0A0A0F] py-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-lg text-white">Aporto.tech</span>
          </div>
          <p className="text-sm text-gray-500">© 2026 Aporto.tech. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="text-gray-500 hover:text-white transition-colors text-sm">Terms</Link>
            <Link href="#" className="text-gray-500 hover:text-white transition-colors text-sm">Privacy</Link>
            <a href="https://github.com/Pevznergo/watcher" className="text-gray-500 hover:text-white transition-colors text-sm">GitHub</a>
          </div>
        </div>
      </footer>

    </div>
  );
}

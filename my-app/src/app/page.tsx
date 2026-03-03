"use client";

import { useEffect, useRef, useState } from "react";
import PricingProCard from "@/components/PricingProCard";

// Aporto logo icon
function ClawIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="16" r="15" stroke="#f97316" strokeWidth="2" />
      <path d="M10 22 L16 8 L22 22" stroke="#f97316" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12.5 17 L19.5 17" stroke="#f97316" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

// Navigation
function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: scrolled ? "rgba(10, 10, 15, 0.95)" : "rgba(10, 10, 15, 0.8)",
        backdropFilter: "blur(12px)",
        borderBottom: scrolled ? "1px solid #1f1f2e" : "1px solid transparent",
        transition: "all 0.3s ease",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", height: 60 }}>
        {/* Logo */}
        <a href="/" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
          <ClawIcon />
          <span style={{ fontWeight: 800, fontSize: 18, color: "#fff" }}>
            <span style={{ color: "#f97316" }}>Aporto</span>.tech
          </span>
        </a>

        {/* Nav Links */}
        <div style={{ display: "flex", alignItems: "center", gap: 32, marginLeft: 48 }}>
          {["Features", "About", "Leaderboard", "Pricing"].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="nav-link" style={{ fontSize: 14, textDecoration: "none", fontWeight: 500 }}>
              {item}
            </a>
          ))}
        </div>

        {/* Right side */}
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 16 }}>
          <a href="/login" className="nav-link" style={{ fontSize: 14, fontWeight: 500, textDecoration: "none" }}>Sign in</a>
          <a href="/register" className="btn-orange" style={{ padding: "8px 20px", fontSize: 14, textDecoration: "none" }}>Get Started</a>
        </div>
      </div>
    </nav>
  );
}

// Dashboard Screenshot Mockup
function DashboardMockup() {
  return (
    <div className="dashboard-mockup" style={{ width: "100%", maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: "180px 1fr", minHeight: 520 }}>
      {/* Sidebar */}
      <div style={{ borderRight: "1px solid #1e1e2e", padding: "16px 0", background: "#0a0a0f" }}>
        <div style={{ padding: "8px 12px 16px", borderBottom: "1px solid #1e1e2e", marginBottom: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <ClawIcon />
            <span style={{ fontSize: 13, fontWeight: 700, color: "#f97316" }}>Aporto.tech</span>
          </div>
        </div>
        <div style={{ padding: "4px 8px", fontSize: 10, color: "#52525b", textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>MONITORING</div>
        {[
          { label: "Overview", active: true, icon: "📊" },
          { label: "Tokens & Cost", active: false, icon: "💰" },
          { label: "Action Log", active: false, icon: "📋" },
          { label: "Sessions", active: false, icon: "🕐" },
          { label: "Agents", active: false, icon: "🤖" },
        ].map((item) => (
          <div key={item.label} className={`sidebar-item ${item.active ? "active" : ""}`}>
            <span style={{ fontSize: 13 }}>{item.icon}</span>
            <span style={{ fontSize: 12 }}>{item.label}</span>
          </div>
        ))}
        <div style={{ padding: "4px 8px", fontSize: 10, color: "#52525b", textTransform: "uppercase", letterSpacing: 1, margin: "12px 0 4px" }}>FEEDBACK</div>
        {[
          { label: "Alerts", icon: "🔔" },
          { label: "Feature Requests", icon: "💬" },
        ].map((item) => (
          <div key={item.label} className="sidebar-item">
            <span style={{ fontSize: 13 }}>{item.icon}</span>
            <span style={{ fontSize: 12 }}>{item.label}</span>
          </div>
        ))}
        <div style={{ marginTop: "auto", padding: "8px 12px", position: "absolute", bottom: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div className="live-dot" />
            <span style={{ fontSize: 11, color: "#52525b" }}>Agent Online</span>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div style={{ padding: 16, background: "#0d0d14" }}>
        {/* Breadcrumb */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
          <span style={{ fontSize: 12, color: "#52525b" }}>Dashboard</span>
          <span style={{ fontSize: 12, color: "#52525b" }}>/</span>
          <span style={{ fontSize: 12, color: "#fff", fontWeight: 600 }}>Overview</span>
          <div style={{ marginLeft: "auto", background: "#111118", border: "1px solid #1e1e2e", borderRadius: 6, padding: "4px 10px", fontSize: 11, color: "#71717a" }}>🔍 Search...</div>
        </div>

        {/* Stat Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, marginBottom: 14 }}>
          {[
            { label: "Token Usage (24h)", value: "1.2M", sub: "850k in · 350k out", icon: "⚡", color: "#f97316" },
            { label: "Total Cost", value: "$4.20", sub: "Saved $12.50 this month", icon: "💵", color: "#22c55e", badge: "+12%" },
            { label: "Requests", value: "14.5k", sub: "1.2k prompts/hour", icon: "📈", color: "#3b82f6" },
            { label: "Agents", value: "5", sub: "3 healthy · 2 issues", icon: "🤖", color: "#a855f7" },
          ].map((stat) => (
            <div key={stat.label} className="stat-card">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <div style={{ fontSize: 10, color: "#52525b", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 6 }}>{stat.label}</div>
                  <div style={{ fontSize: 22, fontWeight: 800, color: "#fff", marginBottom: 2 }}>{stat.value}</div>
                  <div style={{ fontSize: 10, color: "#52525b" }}>{stat.sub}</div>
                </div>
                <div style={{ fontSize: 18, opacity: 0.8 }}>{stat.icon}</div>
              </div>
              {stat.badge && <div style={{ background: "rgba(34,197,94,0.1)", color: "#22c55e", fontSize: 10, padding: "2px 6px", borderRadius: 4, marginTop: 6, display: "inline-block" }}>{stat.badge}</div>}
            </div>
          ))}
        </div>

        {/* Charts row */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 10 }}>
          {/* Token Chart */}
          <div className="stat-card">
            <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 10 }}>Token Usage (24h)</div>
            <svg width="100%" height="100" viewBox="0 0 400 100" preserveAspectRatio="none">
              <defs>
                <linearGradient id="gradOrange" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f97316" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="gradBlue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                </linearGradient>
              </defs>
              {/* Fill areas */}
              <path d="M0,80 C50,75 80,60 120,50 C160,40 180,35 220,30 C260,25 300,20 340,25 C370,28 390,30 400,28 L400,100 L0,100 Z" fill="url(#gradOrange)" />
              <path d="M0,90 C50,88 80,82 120,75 C160,68 180,65 220,60 C260,55 300,52 340,55 C370,57 390,58 400,57 L400,100 L0,100 Z" fill="url(#gradBlue)" />
              {/* Lines */}
              <path className="chart-line" d="M0,80 C50,75 80,60 120,50 C160,40 180,35 220,30 C260,25 300,20 340,25 C370,28 390,30 400,28" stroke="#f97316" strokeWidth="2" fill="none" />
              <path className="chart-line" d="M0,90 C50,88 80,82 120,75 C160,68 180,65 220,60 C260,55 300,52 340,55 C370,57 390,58 400,57" stroke="#3b82f6" strokeWidth="1.5" fill="none" />
            </svg>
          </div>

          {/* Model breakdown */}
          <div className="stat-card">
            <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 12 }}>Model Breakdown</div>
            {[
              { name: "claude-3-7-sonnet", pct: "75%", color: "#a855f7" },
              { name: "gpt-3.5-turbo", pct: "15%", color: "#3b82f6" },
              { name: "mistral-large", pct: "10%", color: "#f97316" },
            ].map((m) => (
              <div key={m.name} style={{ marginBottom: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                  <span style={{ fontSize: 11, color: "#a1a1aa" }}>{m.name}</span>
                  <span style={{ fontSize: 11, color: "#71717a" }}>{m.pct}</span>
                </div>
                <div style={{ background: "#1e1e2e", borderRadius: 2, height: 4 }}>
                  <div style={{ width: m.pct, background: m.color, height: "100%", borderRadius: 2 }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div style={{ marginTop: 10 }}>
          <div className="stat-card">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <span style={{ fontSize: 13, fontWeight: 600 }}>Recent Activity</span>
              <span style={{ color: "#52525b", fontSize: 16 }}>⋮</span>
            </div>
            {[
              { text: "Agent 'Support-Bot' accessed OpenAI", time: "2m ago", dot: "#22c55e", badge: "200" },
              { text: "Agent 'Critic' exceeded rate limit", time: "5m ago", dot: "#ef4444", badge: "429" },
              { text: "Agent 'Coder' used 45k tokens", time: "12m ago", dot: "#22c55e", badge: "200" },
              { text: "New API Key generated", time: "1h ago", dot: "#3b82f6", badge: "INFO" },
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderTop: i > 0 ? "1px solid #1e1e2e" : undefined }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: item.dot, flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, color: "#e5e5e5" }}>{item.text}</div>
                  <div style={{ fontSize: 10, color: "#52525b" }}>{item.time}</div>
                </div>
                <div style={{ fontSize: 11, color: "#71717a" }}>{item.badge}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Testimonial Card
function TestimonialCard({ name, handle, text, avatar }: { name: string; handle: string; text: string; avatar: string }) {
  return (
    <div style={{
      background: "#111118",
      border: "1px solid #1e1e2e",
      borderRadius: 12,
      padding: 20,
      width: 320,
      flexShrink: 0,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
        <div style={{
          width: 36,
          height: 36,
          borderRadius: "50%",
          background: avatar,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 16,
          fontWeight: 700,
          color: "#fff",
          flexShrink: 0,
        }}>
          {name[0]}
        </div>
        <div>
          <div style={{ fontSize: 14, fontWeight: 600, color: "#fff" }}>{name}</div>
          <div style={{ fontSize: 12, color: "#52525b" }}>{handle}</div>
        </div>
        <div style={{ marginLeft: "auto", fontSize: 18 }}>𝕏</div>
      </div>
      <p style={{ fontSize: 13, color: "#a1a1aa", lineHeight: 1.6 }}>{text}</p>
    </div>
  );
}

const testimonials = [
  { name: "Alex Chen", handle: "@alexchen_dev", text: "This monitoring should be built in from day one. Every OpenClaw project needs Clawwatcher.", avatar: "linear-gradient(135deg, #6366f1, #8b5cf6)" },
  { name: "Sarah Park", handle: "@sarahpark_ai", text: "Saved my entire week one by stopping a runaway OpenClaw loop. Budget limits that actually work!", avatar: "linear-gradient(135deg, #f97316, #ef4444)" },
  { name: "Marcus R.", handle: "@marcusr_eng", text: "Was watching costs spiral with no control. Now I actually have real-time visibility into every token.", avatar: "linear-gradient(135deg, #22c55e, #06b6d4)" },
  { name: "Priya S.", handle: "@priya_builds", text: "It's a good idea, to be honest. Simple setup and the dashboard is really clean.", avatar: "linear-gradient(135deg, #ec4899, #a855f7)" },
  { name: "Tom W.", handle: "@tomw_tech", text: "Monitoring should be table stakes for any AI product. Clawwatcher makes it dead simple.", avatar: "linear-gradient(135deg, #3b82f6, #06b6d4)" },
  { name: "Lena K.", handle: "@lenak_hacks", text: "Integrated in under 5 minutes. The action log alone is worth it — I can see every tool call my agent makes.", avatar: "linear-gradient(135deg, #f59e0b, #f97316)" },
];

// Scroll animation hook
function useScrollAnimation() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

function AnimatedSection({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useScrollAnimation();
  return (
    <div ref={ref} className="section-animate" style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

export default function Home() {
  return (
    <div style={{ background: "#0a0a0f", minHeight: "100vh", color: "#fff" }}>
      <Navbar />

      {/* HERO */}
      <section style={{ paddingTop: 140, paddingBottom: 80, position: "relative", overflow: "hidden" }}>
        {/* Glows */}
        <div className="hero-glow-blue" style={{ left: -100, top: 0 }} />
        <div className="hero-glow-right" style={{ right: -50, top: 100 }} />

        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          {/* Badge */}
          <div style={{ marginBottom: 24 }}>
            <span className="badge">
              <span style={{ fontSize: 16 }}>🤖</span>
              Up to $33 free OpenRouter* AI credits included
            </span>
          </div>

          {/* Headline */}
          <h1 style={{
            fontSize: "clamp(48px, 6vw, 84px)",
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            marginBottom: 24,
            maxWidth: 1000,
          }}>
            AI agent observability,<br />
            built for OpenClaw.
          </h1>

          {/* Subtext */}
          <p style={{
            fontSize: "clamp(16px, 2.5vw, 20px)",
            color: "#a1a1aa",
            lineHeight: 1.6,
            marginBottom: 32,
            maxWidth: 560,
          }}>
            See every token, trace every dollar, catch every anomaly — before your agents burn through your budget.
          </p>

          {/* AI Credits callout strip */}
          <div style={{
            display: "inline-flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: 12,
            background: "rgba(249,115,22,0.06)",
            border: "1px solid rgba(249,115,22,0.2)",
            borderRadius: 14,
            padding: "12px 18px",
            marginBottom: 32,
          }}>
            <span style={{ fontSize: 22 }}>🎁</span>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>
                Every plan includes OpenRouter* AI credits
              </div>
              <div style={{ fontSize: 12, color: "#71717a", marginTop: 2 }}>
                Free: $1 to test&nbsp;&nbsp;·&nbsp;&nbsp;Pro: $12/mo&nbsp;&nbsp;·&nbsp;&nbsp;With pack: up to $33 credits
              </div>
            </div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {[
                { model: "MiniMax M2.5", color: "#10a37f" },
                { model: "Claude Opus 4.6", color: "#c96442" },
                { model: "Gemini 3 Flash", color: "#4285f4" },
                { model: "+ 30 models", color: "#52525b" },
              ].map((m) => (
                <span key={m.model} style={{
                  background: "rgba(255,255,255,0.05)",
                  border: `1px solid ${m.color}40`,
                  borderRadius: 20,
                  padding: "3px 10px",
                  fontSize: 11,
                  color: m.color,
                  fontWeight: 600,
                  whiteSpace: "nowrap",
                }}>{m.model}</span>
              ))}
            </div>
          </div>

          {/* CTAs */}
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 32, flexWrap: "wrap" }}>
            <a href="/register" className="btn-orange-large" style={{ textDecoration: "none" }}>
              Get Started Free →
            </a>
            <a href="/login" className="btn-ghost" style={{ fontSize: 16, padding: "16px 8px", textDecoration: "none", display: "flex", alignItems: "center", gap: 6 }}>
              Sign in <span>›</span>
            </a>
          </div>

          {/* Trust indicators */}
          <p style={{ fontSize: 13, color: "#52525b" }}>
            Free forever · No credit card · Setup in 1 min · 🔒 We never access your code
          </p>

          {/* Dashboard mockup */}
          <div style={{ marginTop: 60, animation: "fadeInUp 0.8s ease 0.3s both" }}>
            <div style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid #1e1e2e",
              borderRadius: 16,
              padding: 16,
              maxWidth: 900,
              margin: "0 auto",
              boxShadow: "0 40px 80px rgba(0,0,0,0.5)",
            }}>
              <DashboardMockup />
            </div>
          </div>
        </div>
      </section>

      {/* LIVE PLATFORM ACTIVITY */}
      <section style={{ padding: "24px 0", borderTop: "1px solid #1e1e2e", borderBottom: "1px solid #1e1e2e" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
            <div className="live-dot" />
            <span style={{ fontSize: 12, color: "#52525b", textTransform: "uppercase", letterSpacing: 1, fontWeight: 600 }}>LIVE PLATFORM ACTIVITY</span>
          </div>
          <div style={{ flex: 1, overflow: "hidden" }}>
            <div className="marquee-track">
              {["claude-3-opus used 12k tokens", "support-bot saved $0.80", "gpt-4 call completed 200ms", "budget alert fired $8/$10", "coder-agent: 45 tool calls", "mistral query processed", "new agent connected", "session started 14:32"].concat(
                ["claude-3-opus used 12k tokens", "support-bot saved $0.80", "gpt-4 call completed 200ms", "budget alert fired $8/$10", "coder-agent: 45 tool calls", "mistral query processed", "new agent connected", "session started 14:32"]
              ).map((item, i) => (
                <span key={i} style={{ fontSize: 12, color: "#52525b", whiteSpace: "nowrap", padding: "0 16px" }}>• {item}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ padding: "80px 0", overflow: "hidden" }}>
        <AnimatedSection>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <h2 style={{ fontSize: 36, fontWeight: 700, marginBottom: 12 }}>Trusted by AI builders</h2>
            <p style={{ color: "#71717a", fontSize: 16 }}>Join developers building the future with Aporto.tech</p>
          </div>
        </AnimatedSection>

        <div className="marquee-container">
          <div className="marquee-track" style={{ padding: "8px 0" }}>
            {[...testimonials, ...testimonials].map((t, i) => (
              <TestimonialCard key={i} {...t} />
            ))}
          </div>
        </div>

        <div style={{ textAlign: "center", marginTop: 48 }}>
          <a href="/register" className="btn-orange-large" style={{ textDecoration: "none" }}>
            Get Started Free →
          </a>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" style={{ padding: "80px 0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          <AnimatedSection>
            <div style={{ textAlign: "center", marginBottom: 64 }}>
              <h2 style={{ fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 800, marginBottom: 16 }}>
                Everything you need to monitor AI agents
              </h2>
              <p style={{ fontSize: 18, color: "#71717a", maxWidth: 600, margin: "0 auto" }}>
                From token tracking to cost analytics, Aporto.tech gives you complete visibility into what your AI agents are doing.
              </p>
            </div>
          </AnimatedSection>

          {/* Feature cards grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
            <AnimatedSection delay={0}>
              <div className="feature-card" style={{ padding: 28, height: "100%" }}>
                <div style={{ marginBottom: 20 }}>
                  <svg width="48" height="48" fill="none" viewBox="0 0 48 48">
                    <rect width="48" height="48" rx="10" fill="rgba(34,197,94,0.08)" />
                    <path d="M32 22 L38 22 M32 28 L38 28 M15 22 C15 18 18 15 22 15 C26 15 29 18 29 22 C29 26 26 29 22 29 C18 29 15 26 15 22Z" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" />
                    <path d="M24 19 L24 22 L26 24" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round" />
                    <text x="10" y="42" fill="#22c55e" fontSize="7" fontWeight="bold">↑ saved 32%</text>
                  </svg>
                </div>
                <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 10 }}>Budget Alerts & Protection</h3>
                <p style={{ color: "#71717a", lineHeight: 1.6, fontSize: 14 }}>Set spending limits and get notified before your agents drain your wallet. Stop runaway agents instantly.</p>
                <div style={{ marginTop: 16, display: "flex", alignItems: "center", gap: 8, background: "#1a1a0e", border: "1px solid #f97316", borderRadius: 8, padding: "8px 12px" }}>
                  <span style={{ fontSize: 14 }}>🔔</span>
                  <div>
                    <div style={{ fontSize: 12, color: "#f97316", fontWeight: 600 }}>Budget Alert</div>
                    <div style={{ fontSize: 11, color: "#a1a1aa" }}>80% of daily limit ($8 / $10)</div>
                    <div style={{ marginTop: 4, height: 3, background: "#1e1e2e", borderRadius: 2 }}>
                      <div style={{ width: "80%", height: "100%", background: "#f97316", borderRadius: 2 }} />
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={100}>
              {/* Center large card - token counter */}
              <div className="feature-card" style={{ background: "linear-gradient(135deg, #0d0d14 0%, #1a0e08 100%)", border: "1px solid #2a1a0e", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 28, minHeight: 280, textAlign: "center" }}>
                <div style={{ fontSize: 64, fontWeight: 900 }} className="gradient-text-orange">2.4M</div>
                <div style={{ color: "#71717a", fontSize: 16, marginTop: 4 }}>tokens tracked</div>
                <div style={{ marginTop: 20, display: "flex", gap: 20 }}>
                  {[
                    { label: "Agents", value: "127" },
                    { label: "Projects", value: "43" },
                    { label: "Countries", value: "28" },
                  ].map((s) => (
                    <div key={s.label} style={{ textAlign: "center" }}>
                      <div style={{ fontSize: 18, fontWeight: 700, color: "#fff" }}>{s.value}</div>
                      <div style={{ fontSize: 11, color: "#52525b" }}>{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={200}>
              <div className="feature-card" style={{ padding: 28, height: "100%" }}>
                <div style={{ marginBottom: 16 }}>
                  {/* Lollipop chart */}
                  <svg width="80" height="60" viewBox="0 0 80 60" fill="none">
                    <line x1="20" y1="50" x2="20" y2="10" stroke="#3b82f6" strokeWidth="1.5" />
                    <circle cx="20" cy="10" r="6" fill="#3b82f6" />
                    <line x1="40" y1="50" x2="40" y2="20" stroke="#22c55e" strokeWidth="1.5" />
                    <circle cx="40" cy="20" r="6" fill="#22c55e" />
                    <line x1="60" y1="50" x2="60" y2="15" stroke="#71717a" strokeWidth="1.5" />
                    <circle cx="60" cy="15" r="5" fill="#71717a" />
                    <line x1="0" y1="50" x2="80" y2="50" stroke="#1e1e2e" strokeWidth="1" />
                  </svg>
                </div>
                <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 10 }}>Session History</h3>
                <p style={{ color: "#71717a", lineHeight: 1.6, fontSize: 14 }}>Review past sessions with full context. Filter by date or agent.</p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={300}>
              <div className="feature-card" style={{ padding: 28, height: "100%" }}>
                {/* Progress bars mockup */}
                <div style={{ marginBottom: 16 }}>
                  {[
                    { color: "#3b82f6", width: "75%" },
                    { color: "#a855f7", width: "55%" },
                    { color: "#f97316", width: "40%" },
                  ].map((bar, i) => (
                    <div key={i} style={{ marginBottom: 8 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                        <div style={{ width: 6, height: 6, borderRadius: "50%", background: bar.color }} />
                        <div style={{ flex: 1, height: 4, background: bar.color, borderRadius: 2, width: bar.width }} />
                      </div>
                    </div>
                  ))}
                  <div style={{ display: "flex", gap: 4, marginTop: 4 }}>
                    {["─", "─", "─"].map((d, i) => (
                      <div key={i} style={{ width: 20, height: 2, background: "#2a2a3e", borderRadius: 1 }} />
                    ))}
                  </div>
                </div>
                <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 10 }}>Action Log</h3>
                <p style={{ color: "#71717a", lineHeight: 1.6, fontSize: 14 }}>See every action your AI agents take. Track tool calls and decisions.</p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={400}>
              {/* Real-time token tracking */}
              <div className="feature-card" style={{ padding: 28, height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
                <div style={{ marginBottom: 16 }}>
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                    <path d="M6 28C8 24 10 20 14 18C18 16 20 24 24 24C28 24 30 16 34 18C38 20 40 24 42 28" stroke="#f97316" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                    <path d="M24 14 L24 8 M24 40 L24 34" stroke="#f97316" strokeWidth="1.5" strokeOpacity="0.3" />
                  </svg>
                </div>
                <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 10 }}>Real-Time Token Tracking</h3>
                <p style={{ color: "#71717a", lineHeight: 1.6, fontSize: 14 }}>Monitor token usage across all your AI agents as it happens. See input/output breakdowns and consumption patterns.</p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={500}>
              <div className="feature-card" style={{ padding: 28, height: "100%" }}>
                <div style={{ marginBottom: 16 }}>
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                    <rect width="48" height="48" rx="10" fill="rgba(249,115,22,0.08)" />
                    <path d="M14 30 L14 18 M22 30 L22 22 M30 30 L30 14 M38 30 L38 24" stroke="#f97316" strokeWidth="2.5" strokeLinecap="round" />
                    <text x="10" y="42" fill="#a1a1aa" fontSize="8">$ </text>
                  </svg>
                </div>
                <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 10 }}>Cost Monitoring</h3>
                <p style={{ color: "#71717a", lineHeight: 1.6, fontSize: 14 }}>Track your AI spending with precision. Get real-time cost data from providers.</p>
                <div style={{ marginTop: 12, fontSize: 13, color: "#22c55e", fontWeight: 600 }}>↑ saved 32%</div>
              </div>
            </AnimatedSection>
          </div>

          <div style={{ textAlign: "center", marginTop: 48 }}>
            <a href="/register" className="btn-orange-large" style={{ textDecoration: "none" }}>
              Start Monitoring Free →
            </a>
            <p style={{ marginTop: 12, fontSize: 13, color: "#52525b" }}>Free forever • Setup in 2 minutes</p>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ padding: "80px 0", background: "rgba(255,255,255,0.01)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          <AnimatedSection>
            <div style={{ textAlign: "center", marginBottom: 64 }}>
              <h2 style={{ fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 800, marginBottom: 12 }}>Up and running in minutes</h2>
              <p style={{ fontSize: 18, color: "#71717a" }}>Three simple steps to full observability</p>
            </div>
          </AnimatedSection>

          {/* Steps */}
          {[
            {
              num: "1",
              title: "Create an agent",
              desc: "Sign up and create your first agent profile in Aporto.tech. You’ll get a unique API key to authenticate your requests.",
              right: (
                <div style={{ background: "#111118", border: "1px solid #1e1e2e", borderRadius: 12, padding: 20 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                    <div style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg, #f97316, #ea580c)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700 }}>A</div>
                    <div style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg, #3b82f6, #06b6d4)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700 }}>B</div>
                    <div style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg, #22c55e, #16a34a)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700 }}>C</div>
                    <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 6 }}>
                      <div className="live-dot" />
                      <span style={{ fontSize: 12, color: "#22c55e" }}>Active</span>
                    </div>
                  </div>
                  <div style={{ fontSize: 11, color: "#52525b", marginBottom: 4, textTransform: "uppercase", letterSpacing: 0.5 }}>API Key</div>
                  <div style={{ background: "#0d0d14", border: "1px solid #1e1e2e", borderRadius: 6, padding: "6px 10px", fontSize: 12, fontFamily: "monospace", color: "#71717a" }}>cw_sk_•••••••••••••••• </div>
                </div>
              ),
            },
            {
              num: "2",
              title: "Install the SDK",
              desc: "Install our lightweight SDK with a single command. It’s designed to be drop-in ready for any Node.js environment.",
              right: (
                <div className="terminal">
                  <div className="terminal-header">
                    <span style={{ fontSize: 12, color: "#52525b" }}>⌨️ terminal</span>
                  </div>
                  <div style={{ padding: "14px 16px" }}>
                    <div style={{ display: "flex", gap: 8, marginBottom: 6 }}>
                      <span style={{ color: "#22c55e" }}>→</span>
                      <span style={{ color: "#71717a" }}>~</span>
                      <span style={{ color: "#fff", fontWeight: 600 }}>pipx install aporto</span>
                    </div>
                    <div style={{ color: "#52525b", fontSize: 12, marginBottom: 10 }}>Successfully installed aporto-0.2.0</div>
                    <div style={{ display: "flex", gap: 8, marginBottom: 6 }}>
                      <span style={{ color: "#22c55e" }}>→</span>
                      <span style={{ color: "#71717a" }}>~</span>
                      <span style={{ color: "#fff", fontWeight: 600 }}>aporto start</span>
                    </div>
                    <div style={{ fontSize: 12 }}>
                      <div style={{ color: "#22c55e" }}>✓ Connected to Aporto.tech</div>
                      <div style={{ color: "#22c55e" }}>✓ Telemetry agent running</div>
                      <div style={{ color: "#22c55e" }}>✓ Budget proxy active on :18790</div>
                    </div>
                  </div>
                </div>
              ),
            },
            {
              num: "3",
              title: "See real-time data",
              desc: "Start your AI agent and watch your dashboard come alive. Track tokens, costs, and traces instantly.",
              right: (
                <div className="stat-card" style={{ maxWidth: 360 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                    <div style={{ fontSize: 10, color: "#52525b", textTransform: "uppercase", letterSpacing: 0.5 }}>TOTAL TOKENS</div>
                    <span style={{ color: "#22c55e", fontSize: 20 }}>⚡</span>
                  </div>
                  <div style={{ fontSize: 32, fontWeight: 800, marginBottom: 12 }}>3.00k</div>
                  <svg width="100%" height="60" viewBox="0 0 300 60" preserveAspectRatio="none">
                    <path d="M0,55 L50,52 L100,45 L150,40 L200,30 L250,20 L300,15" stroke="#22c55e" strokeWidth="2" fill="none" />
                    <path d="M0,55 L50,52 L100,45 L150,40 L200,30 L250,20 L300,15 L300,60 L0,60Z" fill="rgba(34,197,94,0.1)" />
                  </svg>
                  <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
                    {["10:00", "10:30", "11:00"].map(t => (
                      <span key={t} style={{ fontSize: 10, color: "#52525b" }}>{t}</span>
                    ))}
                  </div>
                </div>
              ),
            },
          ].map((step, i) => (
            <AnimatedSection key={i} delay={i * 150}>
              <div style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 64,
                alignItems: "center",
                marginBottom: 80,
                direction: i % 2 === 1 ? "rtl" : "ltr",
              }}>
                <div style={{ direction: "ltr" }}>
                  <div className="step-badge" style={{ marginBottom: 20 }}>{step.num}</div>
                  <h3 style={{ fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 800, marginBottom: 12 }}>{step.title}</h3>
                  <p style={{ fontSize: 16, color: "#71717a", lineHeight: 1.7 }}>{step.desc}</p>
                </div>
                <div style={{ direction: "ltr" }}>{step.right}</div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>


      {/* PRICING */}
      <section id="pricing" style={{ padding: "80px 0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          <AnimatedSection>
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <h2 style={{ fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 800, marginBottom: 12 }}>Simple, honest pricing</h2>
              <p style={{ color: "#71717a", fontSize: 18 }}>Every plan includes OpenRouter* AI credits — use any model at official rates.</p>
            </div>
          </AnimatedSection>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, maxWidth: 960, margin: "0 auto" }}>
            {/* Free */}
            <AnimatedSection delay={0}>
              <div className="pricing-card" style={{ padding: 32 }}>
                <h3 style={{ fontSize: 22, fontWeight: 700, marginBottom: 6 }}>Free Forever</h3>
                <p style={{ color: "#71717a", fontSize: 14, marginBottom: 24 }}>For indie developers and side projects</p>
                <div style={{ marginBottom: 20 }}>
                  <span style={{ fontSize: 52, fontWeight: 900 }}>$0</span>
                  <span style={{ fontSize: 16, color: "#71717a" }}>/month</span>
                </div>
                {/* AI Credits badge */}
                <div style={{
                  background: "rgba(34,197,94,0.08)",
                  border: "1px solid rgba(34,197,94,0.2)",
                  borderRadius: 10,
                  padding: "10px 14px",
                  marginBottom: 24,
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}>
                  <span style={{ fontSize: 18 }}>🤖</span>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "#22c55e" }}>$1 OpenRouter* credits included</div>
                    <div style={{ fontSize: 11, color: "#52525b" }}>Test any AI model at official rates</div>
                  </div>
                </div>
                <div style={{ marginBottom: 24 }}>
                  <div style={{ fontSize: 11, color: "#52525b", textTransform: "uppercase", letterSpacing: 1, marginBottom: 16, fontWeight: 600 }}>WHAT&apos;S INCLUDED</div>
                  {[
                    { text: "1 AI agent", active: true },
                    { text: "7 days data retention", active: true },
                    { text: "Real-time analytics", active: true },
                    { text: "Community support", active: true },
                    { text: "Budget controls", active: false },
                    { text: "Priority support", active: false },
                  ].map((item) => (
                    <div key={item.text} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                      <div style={{ width: 20, height: 20, borderRadius: "50%", background: item.active ? "rgba(34,197,94,0.15)" : "rgba(113,113,122,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <span style={{ fontSize: 11, color: item.active ? "#22c55e" : "#52525b" }}>✓</span>
                      </div>
                      <span style={{ fontSize: 14, color: item.active ? "#e5e5e5" : "#52525b", textDecoration: item.active ? "none" : "line-through" }}>{item.text}</span>
                    </div>
                  ))}
                </div>
                <a href="/register" style={{ display: "block", width: "100%", padding: "14px", background: "transparent", border: "1px solid #2a2a3e", borderRadius: 10, color: "#fff", fontWeight: 600, cursor: "pointer", fontSize: 15, transition: "all 0.2s", textAlign: "center", textDecoration: "none", boxSizing: "border-box" }}>
                  Get Started Free →
                </a>
              </div>
            </AnimatedSection>

            {/* Pro */}
            <AnimatedSection delay={150}>
              <PricingProCard />
            </AnimatedSection>
          </div>

          <p style={{ textAlign: "center", color: "#52525b", fontSize: 13, marginTop: 24 }}>
            * OpenRouter credits — use any AI model at official rates. Prices lock in at signup.
          </p>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="cta-section" style={{ padding: "120px 24px" }}>
        <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
          <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)", width: 600, height: 300, background: "radial-gradient(ellipse, rgba(59,130,246,0.08) 0%, transparent 70%)" }} />
        </div>
        <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center", position: "relative" }}>
          <AnimatedSection>
            <h2 style={{ fontSize: "clamp(36px, 6vw, 64px)", fontWeight: 900, lineHeight: 1.05, marginBottom: 20 }}>
              Ready to take control of your AI costs?
            </h2>
            <p style={{ fontSize: 18, color: "#71717a", marginBottom: 40 }}>
              Join developers who are saving money and shipping faster with Aporto.tech.
            </p>
            <a href="/register" className="btn-orange-large" style={{ fontSize: 18, textDecoration: "none" }}>
              Get Started Free →
            </a>
            <p style={{ marginTop: 16, fontSize: 14, color: "#52525b" }}>Free forever • No credit card required</p>
          </AnimatedSection>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer-bg" style={{ borderTop: "1px solid #1e1e2e", padding: "48px 24px 32px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr repeat(3, auto)", gap: 48, marginBottom: 48 }}>
            {/* Brand */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                <ClawIcon />
                <span style={{ fontWeight: 800, fontSize: 17 }}>
                  <span className="gradient-text-orange">Aporto</span>.tech
                </span>
              </div>
              <p style={{ fontSize: 14, color: "#52525b", maxWidth: 200, lineHeight: 1.6 }}>Monitor your AI agent costs in real-time.</p>
            </div>

            {/* Product */}
            <div>
              <h4 style={{ fontWeight: 700, marginBottom: 16, fontSize: 15 }}>Product</h4>
              {["Features", "Pricing", "Blog"].map((item) => (
                <div key={item} style={{ marginBottom: 10 }}>
                  <a href="#" className="nav-link" style={{ fontSize: 14, textDecoration: "none" }}>{item}</a>
                </div>
              ))}
            </div>

            {/* Company */}
            <div>
              <h4 style={{ fontWeight: 700, marginBottom: 16, fontSize: 15 }}>Company</h4>
              {["About", "Contact"].map((item) => (
                <div key={item} style={{ marginBottom: 10 }}>
                  <a href="#" className="nav-link" style={{ fontSize: 14, textDecoration: "none" }}>{item}</a>
                </div>
              ))}
            </div>

            {/* Legal */}
            <div>
              <h4 style={{ fontWeight: 700, marginBottom: 16, fontSize: 15 }}>Legal</h4>
              {["Privacy Policy", "Terms of Service"].map((item) => (
                <div key={item} style={{ marginBottom: 10 }}>
                  <a href="#" className="nav-link" style={{ fontSize: 14, textDecoration: "none" }}>{item}</a>
                </div>
              ))}
            </div>
          </div>

          <div className="divider" />
          <div style={{ paddingTop: 24 }}>
            <p style={{ fontSize: 13, color: "#52525b" }}>© 2026 Aporto.tech. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

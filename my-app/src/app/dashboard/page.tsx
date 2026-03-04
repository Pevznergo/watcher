"use client";

import { useEffect, useState, useRef } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { trackEvent } from "@/lib/mixpanel";

function AportoLogo() {
    return (
        <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="16" cy="16" r="15" stroke="#f97316" strokeWidth="2" />
            <path d="M10 22 L16 8 L22 22" stroke="#f97316" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12.5 17 L19.5 17" stroke="#f97316" strokeWidth="2" strokeLinecap="round" />
        </svg>
    );
}

function AnimatedNumber({ value }: { value: number }) {
    const [display, setDisplay] = useState(value);
    const prev = useRef(value);

    useEffect(() => {
        if (value === prev.current) return;
        const diff = value - prev.current;
        const steps = Math.abs(diff);
        let step = 0;
        const interval = setInterval(() => {
            step++;
            setDisplay(prev.current + Math.round((diff * step) / steps));
            if (step >= steps) {
                clearInterval(interval);
                prev.current = value;
            }
        }, 30);
        return () => clearInterval(interval);
    }, [value]);

    return <span>{display}</span>;
}

export default function DashboardPage() {
    const { data: session, status } = useSession();
    const router = useRouter();

    const initialPosition = (session?.user as { queuePosition?: number })?.queuePosition ?? 101;

    const [queuePos, setQueuePos] = useState(initialPosition);
    const [promoCode, setPromoCode] = useState("");
    const [promoError, setPromoError] = useState("");
    const [promoLoading, setPromoLoading] = useState(false);
    const [promoShake, setPromoShake] = useState(false);

    useEffect(() => {
        if (session) {
            const pos = (session.user as { queuePosition?: number })?.queuePosition ?? 101;
            setQueuePos(pos);
        }
    }, [session]);

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login");
        }
    }, [status, router]);

    // Queue counter — slowly decreases by 1 every 18–25 seconds
    useEffect(() => {
        const tick = () => {
            setQueuePos((prev) => {
                if (prev <= 1) return 1;
                return prev - 1;
            });
            const delay = 18000 + Math.random() * 7000;
            timer = setTimeout(tick, delay);
        };
        let timer = setTimeout(tick, 22000);
        return () => clearTimeout(timer);
    }, []);

    // Promo code handler — always returns error
    const handlePromo = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!promoCode.trim()) return;
        trackEvent("Submit Promo Code", { code: promoCode });
        setPromoLoading(true);
        setPromoError("");

        await new Promise((r) => setTimeout(r, 900));

        setPromoLoading(false);
        setPromoError("Promo code not found");
        setPromoShake(true);
        setTimeout(() => setPromoShake(false), 600);
    };

    if (status === "loading") {
        return (
            <div style={{ minHeight: "100vh", background: "#0a0a0f", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ width: 40, height: 40, border: "3px solid #2a2a3e", borderTop: "3px solid #f97316", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
                <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </div>
        );
    }

    const userName = session?.user?.name || "there";
    const estMinutes = queuePos * 2;
    const estHours = Math.floor(estMinutes / 60);
    const estMins = estMinutes % 60;
    const waitText = estHours > 0 ? `~${estHours}h ${estMins}m` : `~${estMins}m`;

    const totalSlots = 200;
    const progressPct = Math.round(((totalSlots - queuePos) / totalSlots) * 100);

    return (
        <div style={{
            minHeight: "100vh",
            background: "#0a0a0f",
            fontFamily: "'Inter', system-ui, sans-serif",
            color: "#fff",
        }}>
            <div style={{
                position: "fixed",
                inset: 0,
                pointerEvents: "none",
                background: "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(249,115,22,0.08) 0%, transparent 70%)",
            }} />

            {/* Navbar */}
            <nav style={{
                background: "rgba(10,10,15,0.9)",
                backdropFilter: "blur(12px)",
                borderBottom: "1px solid #1f1f2e",
                padding: "0 24px",
                height: 56,
                display: "flex",
                alignItems: "center",
                position: "sticky",
                top: 0,
                zIndex: 50,
            }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <AportoLogo />
                    <span style={{ fontWeight: 800, fontSize: 17 }}>
                        <span style={{ color: "#f97316" }}>Aporto</span>.tech
                    </span>
                </div>
                <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 16 }}>
                    <span style={{ fontSize: 13, color: "#71717a" }}>{session?.user?.email}</span>
                    <button
                        onClick={() => {
                            trackEvent("Clicked Sign Out");
                            signOut({ callbackUrl: "/" });
                        }}
                        style={{
                            background: "transparent",
                            border: "1px solid #2a2a3e",
                            borderRadius: 8,
                            padding: "6px 14px",
                            color: "#a1a1aa",
                            fontSize: 13,
                            cursor: "pointer",
                            transition: "all 0.2s",
                        }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = "#3a3a5e"; e.currentTarget.style.color = "#fff"; }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = "#2a2a3e"; e.currentTarget.style.color = "#a1a1aa"; }}
                    >
                        Sign out
                    </button>
                </div>
            </nav>

            {/* Main content */}
            <div style={{ maxWidth: 680, margin: "0 auto", padding: "80px 24px 60px" }}>

                {/* Welcome badge */}
                <div style={{ textAlign: "center", marginBottom: 12 }}>
                    <span style={{
                        background: "rgba(249,115,22,0.1)",
                        border: "1px solid rgba(249,115,22,0.25)",
                        borderRadius: 50,
                        padding: "6px 18px",
                        fontSize: 13,
                        color: "#f97316",
                        fontWeight: 600,
                    }}>
                        👋 Hey, {userName}!
                    </span>
                </div>

                {/* Headline */}
                <h1 style={{ textAlign: "center", fontSize: "clamp(32px, 6vw, 52px)", fontWeight: 900, lineHeight: 1.1, marginBottom: 16 }}>
                    You&apos;re on the waitlist
                </h1>
                <p style={{ textAlign: "center", color: "#71717a", fontSize: 16, marginBottom: 64 }}>
                    Aporto.tech is currently in closed beta. You&apos;re registered — we&apos;ll let you in soon!
                </p>

                {/* Big queue number card */}
                <div style={{
                    background: "#111118",
                    border: "1px solid #1f1f2e",
                    borderRadius: 24,
                    padding: "48px 36px",
                    marginBottom: 24,
                    textAlign: "center",
                    position: "relative",
                    overflow: "hidden",
                }}>
                    <div style={{
                        position: "absolute",
                        top: -60,
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: 300,
                        height: 200,
                        background: "radial-gradient(ellipse, rgba(249,115,22,0.12) 0%, transparent 70%)",
                        pointerEvents: "none",
                    }} />

                    <div style={{ position: "relative" }}>
                        <div style={{ fontSize: 14, color: "#71717a", textTransform: "uppercase", letterSpacing: 2, marginBottom: 16, fontWeight: 600 }}>
                            YOUR POSITION IN QUEUE
                        </div>

                        {/* Big number */}
                        <div style={{
                            fontSize: "clamp(80px, 15vw, 120px)",
                            fontWeight: 900,
                            lineHeight: 1,
                            marginBottom: 8,
                            background: "linear-gradient(135deg, #f97316, #fb923c, #fbbf24)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                        }}>
                            #<AnimatedNumber value={queuePos} />
                        </div>

                        <div style={{ fontSize: 15, color: "#52525b", marginBottom: 36 }}>
                            out of ~{totalSlots > queuePos ? totalSlots : queuePos + 50} spots in queue
                        </div>

                        {/* Progress bar */}
                        <div style={{ marginBottom: 12 }}>
                            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#52525b", marginBottom: 8 }}>
                                <span>Queue progress</span>
                                <span>{progressPct}% done</span>
                            </div>
                            <div style={{ height: 8, background: "#1e1e2e", borderRadius: 4, overflow: "hidden" }}>
                                <div style={{
                                    height: "100%",
                                    width: `${progressPct}%`,
                                    background: "linear-gradient(90deg, #f97316, #fbbf24)",
                                    borderRadius: 4,
                                    transition: "width 1s ease",
                                }} />
                            </div>
                        </div>

                        {/* Stats row */}
                        <div style={{ display: "flex", justifyContent: "center", gap: 40, marginTop: 24 }}>
                            <div>
                                <div style={{ fontSize: 20, fontWeight: 700, color: "#fff" }}>{waitText}</div>
                                <div style={{ fontSize: 12, color: "#52525b", marginTop: 2 }}>Estimated wait</div>
                            </div>
                            <div style={{ width: 1, background: "#1f1f2e" }} />
                            <div>
                                <div style={{ fontSize: 20, fontWeight: 700, color: "#22c55e" }}>Active</div>
                                <div style={{ fontSize: 12, color: "#52525b", marginTop: 2 }}>Your registration</div>
                            </div>
                            <div style={{ width: 1, background: "#1f1f2e" }} />
                            <div>
                                <div style={{ fontSize: 20, fontWeight: 700, color: "#3b82f6" }}>~1,200</div>
                                <div style={{ fontSize: 12, color: "#52525b", marginTop: 2 }}>People waiting</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Info card */}
                <div style={{
                    background: "rgba(59,130,246,0.06)",
                    border: "1px solid rgba(59,130,246,0.15)",
                    borderRadius: 14,
                    padding: "16px 20px",
                    marginBottom: 32,
                    display: "flex",
                    gap: 12,
                    alignItems: "flex-start",
                }}>
                    <span style={{ fontSize: 20, flexShrink: 0 }}>ℹ️</span>
                    <div>
                        <p style={{ fontSize: 13, color: "#93c5fd", lineHeight: 1.6 }}>
                            We&apos;re opening access gradually to ensure the best experience. You&apos;ll receive an email at <strong style={{ color: "#fff" }}>{session?.user?.email}</strong> when your spot is ready.
                        </p>
                    </div>
                </div>

                {/* Promo code section */}
                <div style={{
                    background: "#111118",
                    border: "1px solid #1f1f2e",
                    borderRadius: 20,
                    padding: "32px",
                    marginBottom: 24,
                }}>
                    <div style={{ marginBottom: 20 }}>
                        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 6 }}>
                            🎟️ Got a promo code?
                        </h2>
                        <p style={{ fontSize: 14, color: "#71717a" }}>
                            Enter your promo code to skip the queue and get immediate access
                        </p>
                    </div>

                    <form onSubmit={handlePromo} style={{ display: "flex", gap: 10 }}>
                        <div style={{ flex: 1 }}>
                            <input
                                type="text"
                                value={promoCode}
                                onChange={(e) => { setPromoCode(e.target.value); setPromoError(""); }}
                                placeholder="APORTO-XXXX"
                                style={{
                                    width: "100%",
                                    background: "#0d0d14",
                                    border: promoError ? "1px solid rgba(239,68,68,0.5)" : "1px solid #2a2a3e",
                                    borderRadius: 10,
                                    padding: "12px 14px",
                                    fontSize: 14,
                                    color: "#fff",
                                    outline: "none",
                                    fontFamily: "inherit",
                                    letterSpacing: promoCode ? "0.05em" : undefined,
                                    transition: "border-color 0.2s",
                                    boxSizing: "border-box",
                                    animation: promoShake ? "shake 0.5s ease" : undefined,
                                }}
                                onFocus={(e) => !promoError && (e.target.style.borderColor = "#f97316")}
                                onBlur={(e) => !promoError && (e.target.style.borderColor = "#2a2a3e")}
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={promoLoading || !promoCode.trim()}
                            style={{
                                background: promoLoading || !promoCode.trim() ? "#1e1e2e" : "#f97316",
                                color: promoLoading || !promoCode.trim() ? "#52525b" : "#000",
                                fontWeight: 700,
                                fontSize: 14,
                                padding: "12px 24px",
                                border: "none",
                                borderRadius: 10,
                                cursor: promoLoading || !promoCode.trim() ? "not-allowed" : "pointer",
                                transition: "all 0.2s",
                                whiteSpace: "nowrap",
                                display: "flex",
                                alignItems: "center",
                                gap: 8,
                                flexShrink: 0,
                            }}
                        >
                            {promoLoading ? (
                                <>
                                    <span style={{ width: 14, height: 14, border: "2px solid rgba(0,0,0,0.3)", borderTop: "2px solid #000", borderRadius: "50%", animation: "spin 0.8s linear infinite", display: "inline-block" }} />
                                    Checking...
                                </>
                            ) : "Apply"}
                        </button>
                    </form>

                    {promoError && (
                        <div style={{
                            marginTop: 12,
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                            background: "rgba(239,68,68,0.08)",
                            border: "1px solid rgba(239,68,68,0.2)",
                            borderRadius: 8,
                            padding: "10px 14px",
                            animation: "fadeIn 0.2s ease",
                        }}>
                            <span style={{ fontSize: 16 }}>❌</span>
                            <span style={{ fontSize: 13, color: "#ef4444", fontWeight: 500 }}>{promoError}</span>
                        </div>
                    )}
                </div>

                {/* Tips */}
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 12,
                }}>
                    {[
                        { icon: "📬", title: "Watch your inbox", desc: "We'll notify you by email when your spot is ready" },
                        { icon: "🔗", title: "Move up the queue", desc: "Invite friends — each referral moves you one spot higher" },
                    ].map((tip) => (
                        <div key={tip.title} style={{
                            background: "#111118",
                            border: "1px solid #1f1f2e",
                            borderRadius: 14,
                            padding: "20px",
                            transition: "border-color 0.2s",
                        }}
                            onMouseEnter={e => (e.currentTarget.style.borderColor = "#2a2a3e")}
                            onMouseLeave={e => (e.currentTarget.style.borderColor = "#1f1f2e")}
                        >
                            <div style={{ fontSize: 28, marginBottom: 10 }}>{tip.icon}</div>
                            <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>{tip.title}</div>
                            <div style={{ fontSize: 12, color: "#71717a", lineHeight: 1.5 }}>{tip.desc}</div>
                        </div>
                    ))}
                </div>
            </div>

            <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(-4px); } to { opacity: 1; transform: none; } }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-8px); }
          40% { transform: translateX(8px); }
          60% { transform: translateX(-5px); }
          80% { transform: translateX(5px); }
        }
      `}</style>
        </div>
    );
}

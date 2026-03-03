"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

function AportoLogo() {
    return (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="16" cy="16" r="15" stroke="#f97316" strokeWidth="2" />
            <path d="M10 22 L16 8 L22 22" stroke="#f97316" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12.5 17 L19.5 17" stroke="#f97316" strokeWidth="2" strokeLinecap="round" />
        </svg>
    );
}

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        const result = await signIn("credentials", {
            email,
            password,
            redirect: false,
        });

        setLoading(false);

        if (result?.error) {
            setError("Invalid email or password");
        } else {
            router.push("/dashboard");
            router.refresh();
        }
    };

    return (
        <div style={{
            minHeight: "100vh",
            background: "#0a0a0f",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "24px",
            fontFamily: "'Inter', system-ui, sans-serif",
        }}>
            <div style={{
                position: "fixed",
                inset: 0,
                pointerEvents: "none",
                background: "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(249,115,22,0.07) 0%, transparent 70%)",
            }} />

            <div style={{
                width: "100%",
                maxWidth: 420,
                background: "#111118",
                border: "1px solid #1f1f2e",
                borderRadius: 20,
                padding: "40px 36px",
                position: "relative",
                zIndex: 1,
            }}>
                <div style={{ textAlign: "center", marginBottom: 32 }}>
                    <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
                        <AportoLogo />
                        <span style={{ fontSize: 22, fontWeight: 800, color: "#fff" }}>
                            <span style={{ color: "#f97316" }}>Aporto</span>.tech
                        </span>
                    </Link>
                    <div style={{ marginTop: 20 }}>
                        <h1 style={{ fontSize: 24, fontWeight: 700, color: "#fff", marginBottom: 4 }}>Welcome back</h1>
                        <p style={{ fontSize: 14, color: "#71717a" }}>Sign in to your account</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: 16 }}>
                        <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#a1a1aa", marginBottom: 8 }}>
                            Email
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="you@example.com"
                            style={{
                                width: "100%",
                                background: "#0d0d14",
                                border: "1px solid #2a2a3e",
                                borderRadius: 10,
                                padding: "12px 14px",
                                fontSize: 14,
                                color: "#fff",
                                outline: "none",
                                boxSizing: "border-box",
                                transition: "border-color 0.2s",
                            }}
                            onFocus={(e) => (e.target.style.borderColor = "#f97316")}
                            onBlur={(e) => (e.target.style.borderColor = "#2a2a3e")}
                        />
                    </div>

                    <div style={{ marginBottom: 24 }}>
                        <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#a1a1aa", marginBottom: 8 }}>
                            Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="••••••••"
                            style={{
                                width: "100%",
                                background: "#0d0d14",
                                border: "1px solid #2a2a3e",
                                borderRadius: 10,
                                padding: "12px 14px",
                                fontSize: 14,
                                color: "#fff",
                                outline: "none",
                                boxSizing: "border-box",
                                transition: "border-color 0.2s",
                            }}
                            onFocus={(e) => (e.target.style.borderColor = "#f97316")}
                            onBlur={(e) => (e.target.style.borderColor = "#2a2a3e")}
                        />
                    </div>

                    {error && (
                        <div style={{
                            background: "rgba(239,68,68,0.1)",
                            border: "1px solid rgba(239,68,68,0.3)",
                            borderRadius: 8,
                            padding: "10px 14px",
                            fontSize: 13,
                            color: "#ef4444",
                            marginBottom: 16,
                        }}>
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            width: "100%",
                            background: loading ? "#7c3a0e" : "#f97316",
                            color: "#000",
                            fontWeight: 700,
                            fontSize: 15,
                            padding: "13px",
                            border: "none",
                            borderRadius: 10,
                            cursor: loading ? "not-allowed" : "pointer",
                            transition: "all 0.2s",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: 8,
                        }}
                    >
                        {loading ? (
                            <>
                                <span style={{ width: 16, height: 16, border: "2px solid rgba(0,0,0,0.3)", borderTop: "2px solid #000", borderRadius: "50%", animation: "spin 0.8s linear infinite", display: "inline-block" }} />
                                Signing in...
                            </>
                        ) : "Sign in →"}
                    </button>
                </form>

                <p style={{ textAlign: "center", fontSize: 13, color: "#71717a", marginTop: 24 }}>
                    Don&apos;t have an account?{" "}
                    <Link href="/register" style={{ color: "#f97316", fontWeight: 600, textDecoration: "none" }}>
                        Sign up
                    </Link>
                </p>
            </div>

            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
    );
}

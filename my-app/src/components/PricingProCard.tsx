"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const CREDIT_PACKS = [
    { key: "S", price: 22, credits: 30, label: "$22 → $30 credits", bonus: "+$8 bonus" },
    { key: "M", price: 50, credits: 65, label: "$50 → $65 credits", bonus: "+$15 bonus" },
    { key: "L", price: 100, credits: 130, label: "$100 → $130 credits", bonus: "+$30 bonus" },
] as const;

type PackKey = "S" | "M" | "L" | null;

const PRO_FEATURES = [
    "Up to 5 AI agents",
    "30 days data retention",
    "Real-time analytics",
    "Budget controls & alerts",
    "Priority email support",
    "Early access to new features",
];

export default function PricingProCard() {
    const router = useRouter();
    const [selectedPack, setSelectedPack] = useState<PackKey>(null);
    const [upgrading, setUpgrading] = useState(false);

    const packCredits = selectedPack
        ? CREDIT_PACKS.find((p) => p.key === selectedPack)!.credits
        : 0;
    const packPrice = selectedPack
        ? CREDIT_PACKS.find((p) => p.key === selectedPack)!.price
        : 0;

    const totalCredits = 12 + packCredits;
    const totalPrice = 9 + packPrice;

    const handleUpgrade = async () => {
        setUpgrading(true);
        try {
            await fetch("/api/subscribe", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ creditPackage: selectedPack }),
            });
        } catch {
            // ignore — we'll store intent in cookie anyway
        }
        // Always redirect to register
        router.push("/register");
    };

    return (
        <div className="pricing-card pricing-card-pro" style={{ padding: 32 }}>
            {/* Header */}
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                <h3 style={{ fontSize: 22, fontWeight: 700 }} className="gradient-text-orange">Pro</h3>
                <span style={{
                    background: "rgba(249,115,22,0.15)",
                    border: "1px solid rgba(249,115,22,0.3)",
                    color: "#f97316",
                    fontSize: 11,
                    padding: "3px 10px",
                    borderRadius: 20,
                    fontWeight: 600,
                }}>🔥 Most Popular</span>
            </div>
            <p style={{ color: "#71717a", fontSize: 14, marginBottom: 20 }}>For growing teams shipping AI products</p>

            {/* Price — updates dynamically */}
            <div style={{ marginBottom: 16 }}>
                <span style={{ fontSize: 52, fontWeight: 900 }}>${totalPrice}</span>
                <span style={{ fontSize: 16, color: "#71717a" }}>/month</span>
                {selectedPack && (
                    <span style={{ fontSize: 13, color: "#f97316", marginLeft: 8, fontWeight: 600 }}>
                        (Pro + Pack {selectedPack})
                    </span>
                )}
            </div>

            {/* AI Credits badge */}
            <div style={{
                background: "rgba(34,197,94,0.08)",
                border: "1px solid rgba(34,197,94,0.2)",
                borderRadius: 10,
                padding: "10px 14px",
                marginBottom: 20,
                display: "flex",
                alignItems: "center",
                gap: 10,
            }}>
                <span style={{ fontSize: 20 }}>🤖</span>
                <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: "#22c55e" }}>
                        ${totalCredits} OpenRouter* credits/month
                    </div>
                    <div style={{ fontSize: 11, color: "#52525b" }}>
                        {selectedPack ? `$12 base + $${packCredits} pack — official rates` : "$12 included — use any AI model"}
                    </div>
                </div>
            </div>

            {/* Credit Pack selector */}
            <div style={{ marginBottom: 24 }}>
                <div style={{ fontSize: 12, color: "#71717a", fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 10 }}>
                    ⚡ Add extra AI credit pack (optional)
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {CREDIT_PACKS.map((pack) => {
                        const isSelected = selectedPack === pack.key;
                        return (
                            <button
                                key={pack.key}
                                onClick={() => setSelectedPack(isSelected ? null : pack.key)}
                                style={{
                                    background: isSelected ? "rgba(249,115,22,0.1)" : "rgba(255,255,255,0.03)",
                                    border: `1px solid ${isSelected ? "rgba(249,115,22,0.5)" : "#2a2a3e"}`,
                                    borderRadius: 10,
                                    padding: "10px 14px",
                                    cursor: "pointer",
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    transition: "all 0.2s",
                                    color: "#fff",
                                    fontFamily: "inherit",
                                    width: "100%",
                                    textAlign: "left",
                                }}
                            >
                                <span style={{ fontSize: 13, fontWeight: 600 }}>{pack.label}</span>
                                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                    <span style={{
                                        fontSize: 11,
                                        fontWeight: 700,
                                        color: "#22c55e",
                                        background: "rgba(34,197,94,0.1)",
                                        padding: "2px 8px",
                                        borderRadius: 20,
                                    }}>{pack.bonus}</span>
                                    <div style={{
                                        width: 18,
                                        height: 18,
                                        borderRadius: "50%",
                                        border: `2px solid ${isSelected ? "#f97316" : "#3a3a5e"}`,
                                        background: isSelected ? "#f97316" : "transparent",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        flexShrink: 0,
                                    }}>
                                        {isSelected && <span style={{ fontSize: 10, color: "#000", fontWeight: 900 }}>✓</span>}
                                    </div>
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Features list */}
            <div style={{ marginBottom: 24 }}>
                <div style={{ fontSize: 11, color: "#52525b", textTransform: "uppercase", letterSpacing: 1, marginBottom: 14, fontWeight: 600 }}>
                    WHAT&apos;S INCLUDED
                </div>
                {PRO_FEATURES.map((item) => (
                    <div key={item} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                        <div style={{ width: 20, height: 20, borderRadius: "50%", background: "rgba(34,197,94,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                            <span style={{ fontSize: 11, color: "#22c55e" }}>✓</span>
                        </div>
                        <span style={{ fontSize: 14, color: "#e5e5e5" }}>{item}</span>
                    </div>
                ))}
            </div>

            {/* Upgrade CTA */}
            <button
                onClick={handleUpgrade}
                disabled={upgrading}
                className="btn-orange"
                style={{
                    width: "100%",
                    padding: "14px",
                    border: "none",
                    fontSize: 15,
                    borderRadius: 10,
                    fontWeight: 700,
                    cursor: upgrading ? "not-allowed" : "pointer",
                    opacity: upgrading ? 0.7 : 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                }}
            >
                {upgrading ? (
                    <>
                        <span style={{ width: 16, height: 16, border: "2px solid rgba(0,0,0,0.3)", borderTop: "2px solid #000", borderRadius: "50%", animation: "spin 0.8s linear infinite", display: "inline-block" }} />
                        Redirecting...
                    </>
                ) : (
                    <>Upgrade to Pro {selectedPack ? `+ Pack ${selectedPack}` : ""} →</>
                )}
            </button>

            {selectedPack && (
                <p style={{ textAlign: "center", fontSize: 12, color: "#52525b", marginTop: 12 }}>
                    Total: ${totalPrice}/mo · ${totalCredits} AI credits · Saves ${packCredits - packPrice + 3}
                </p>
            )}

            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
    );
}

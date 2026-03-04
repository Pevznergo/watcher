import React from "react";
import Link from "next/link";
import { trackEvent } from "@/lib/mixpanel";

function ClawIcon() {
    return (
        <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="16" cy="16" r="15" stroke="#f97316" strokeWidth="2" />
            <path d="M10 22 L16 8 L22 22" stroke="#f97316" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12.5 17 L19.5 17" stroke="#f97316" strokeWidth="2" strokeLinecap="round" />
        </svg>
    );
}

function Navbar() {
    return (
        <nav
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                zIndex: 100,
                background: "rgba(10, 10, 15, 0.95)",
                backdropFilter: "blur(12px)",
                borderBottom: "1px solid #1f1f2e",
            }}
        >
            <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", height: 60 }}>
                {/* Logo */}
                <Link href="/" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
                    <ClawIcon />
                    <span style={{ fontWeight: 800, fontSize: 18, color: "#fff" }}>
                        <span style={{ color: "#f97316" }}>Aporto</span>.tech
                    </span>
                </Link>

                {/* Nav Links */}
                <div style={{ display: "flex", alignItems: "center", gap: 32, marginLeft: 48 }}>
                    {["Features", "About", "Leaderboard", "Pricing"].map((item) => (
                        <Link key={item} href={`/#${item.toLowerCase()}`} className="nav-link" style={{ fontSize: 14, textDecoration: "none", fontWeight: 500 }}>
                            {item}
                        </Link>
                    ))}
                    <Link href="/models" className="nav-link" style={{ fontSize: 14, textDecoration: "none", fontWeight: 500, color: "#f97316" }}>
                        Models
                    </Link>
                </div>

                {/* Right side */}
                <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 16 }}>
                    <Link href="/login" className="nav-link" style={{ fontSize: 14, fontWeight: 500, textDecoration: "none" }}>Sign in</Link>
                    <Link href="/register" className="btn-orange" style={{ padding: "8px 20px", fontSize: 14, textDecoration: "none" }}>Get Started</Link>
                </div>
            </div>
        </nav>
    );
}

async function getModelsData() {
    try {
        // Fetch yieldcars models
        const ycRes = await fetch("https://yieldcars.com/api/pricing", { next: { revalidate: 3600 } });
        const ycData = await ycRes.json();
        const yieldModels = ycData.data || [];

        // Fetch openrouter models
        const orRes = await fetch("https://openrouter.ai/api/v1/models", { next: { revalidate: 3600 } });
        const orData = await orRes.json();
        const orModels = orData.data || [];

        // Map openrouter models by id for quick lookup
        const orMap = new Map();
        for (const model of orModels) {
            orMap.set(model.id, model);
        }

        // Some yieldcars models have different IDs on OpenRouter
        const yieldcarToORMapping: Record<string, string> = {
            "trinity/trinity-large-preview": "arcee-ai/trinity-large-preview:free",
        };

        // Combine
        const combinedModels = yieldModels.map((ym: any) => {
            const name = ym.model_name;
            const mappedName = yieldcarToORMapping[name] || name;
            const orInfo = orMap.get(mappedName);

            let pricePrompt = "N/A";
            let priceCompletion = "N/A";
            let contextLength = "N/A";

            if (orInfo && orInfo.pricing) {
                // OpenRouter prices are usually per token. Multiply by 1M to get price per 1M tokens.
                const pPrompt = parseFloat(orInfo.pricing.prompt);
                const pCompletion = parseFloat(orInfo.pricing.completion);

                if (!isNaN(pPrompt)) pricePrompt = "$" + (pPrompt * 1000000).toFixed(4);
                if (!isNaN(pCompletion)) priceCompletion = "$" + (pCompletion * 1000000).toFixed(4);

                contextLength = orInfo.context_length ? orInfo.context_length.toLocaleString() : "N/A";
            }

            return {
                id: name,
                vendor: ym.vendor_id,
                pricePrompt,
                priceCompletion,
                contextLength,
                hasOfficialPricing: !!orInfo
            };
        });

        // Sort alphabetically
        combinedModels.sort((a: any, b: any) => a.id.localeCompare(b.id));

        return combinedModels;
    } catch (err) {
        console.error("Error fetching models:", err);
        return [];
    }
}

export default async function ModelsPage() {
    const models = await getModelsData();

    return (
        <div style={{ background: "#0a0a0f", minHeight: "100vh", color: "#fff", fontFamily: "'Inter', sans-serif" }}>
            <Navbar />

            <main style={{ paddingTop: 120, paddingBottom: 80, maxWidth: 1000, margin: "0 auto", paddingLeft: 24, paddingRight: 24 }}>
                <div style={{ textAlign: "center", marginBottom: 48 }}>
                    <h1 style={{ fontSize: "clamp(36px, 5vw, 48px)", fontWeight: 800, marginBottom: 16 }}>Available Models</h1>
                    <p style={{ color: "#71717a", fontSize: 18, maxWidth: 600, margin: "0 auto" }}>
                        A complete list of supported models powered by YieldCars. Prices shown are official OpenRouter rates per 1M tokens.
                    </p>
                </div>

                <div style={{
                    background: "#111118",
                    border: "1px solid #1e1e2e",
                    borderRadius: 12,
                    overflow: "hidden"
                }}>
                    <div style={{ overflowX: "auto" }}>
                        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
                            <thead>
                                <tr style={{ background: "rgba(255,255,255,0.03)", borderBottom: "1px solid #1e1e2e" }}>
                                    <th style={{ padding: "16px 24px", fontSize: 13, fontWeight: 600, color: "#a1a1aa", textTransform: "uppercase", letterSpacing: 0.5 }}>Model Name</th>
                                    <th style={{ padding: "16px 24px", fontSize: 13, fontWeight: 600, color: "#a1a1aa", textTransform: "uppercase", letterSpacing: 0.5 }}>Context</th>
                                    <th style={{ padding: "16px 24px", fontSize: 13, fontWeight: 600, color: "#a1a1aa", textTransform: "uppercase", letterSpacing: 0.5 }}>Prompt (per 1M)</th>
                                    <th style={{ padding: "16px 24px", fontSize: 13, fontWeight: 600, color: "#a1a1aa", textTransform: "uppercase", letterSpacing: 0.5 }}>Completion (per 1M)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {models.length > 0 ? (
                                    models.map((model: any, i: number) => (
                                        <tr key={model.id} style={{ borderBottom: "1px solid #1e1e2e", background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.01)", transition: "background 0.2s" }} className="table-row-hover">
                                            <td style={{ padding: "16px 24px", fontSize: 14, fontWeight: 500, color: "#fff" }}>
                                                {model.id}
                                            </td>
                                            <td style={{ padding: "16px 24px", fontSize: 14, color: "#71717a" }}>{model.contextLength}</td>
                                            <td style={{ padding: "16px 24px", fontSize: 14, color: model.pricePrompt === "N/A" ? "#52525b" : "#22c55e" }}>{model.pricePrompt}</td>
                                            <td style={{ padding: "16px 24px", fontSize: 14, color: model.priceCompletion === "N/A" ? "#52525b" : "#3b82f6" }}>{model.priceCompletion}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={4} style={{ padding: "48px 24px", textAlign: "center", color: "#71717a" }}>
                                            Loading models... or none found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>

            <style>{`
        .table-row-hover:hover {
          background: rgba(255,255,255,0.05) !important;
        }
      `}</style>
        </div>
    );
}

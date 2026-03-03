import { prisma } from "@/lib/prisma";

type Sub = {
    id: string; plan: string; creditPackage: string | null; creditPackagePaid: number | null;
    aiCreditsIncluded: number; totalPaid: number; status: string; createdAt: Date;
};
type UserWithSubs = {
    id: string; name: string; email: string; queuePosition: number; createdAt: Date;
    subscriptions: Sub[];
};


export default async function AdminPage() {
    const users = await prisma.user.findMany({
        include: { subscriptions: { orderBy: { createdAt: "desc" } } },
        orderBy: { createdAt: "desc" },
    });

    const totalRevenue = await prisma.subscription.aggregate({
        _sum: { totalPaid: true },
    });

    const proSubs = await prisma.subscription.count({ where: { plan: "PRO" } });

    return (
        <div style={{
            minHeight: "100vh",
            background: "#0a0a0f",
            color: "#fff",
            fontFamily: "'Inter', system-ui, sans-serif",
            padding: 32,
        }}>
            {/* Header */}
            <div style={{ marginBottom: 40 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                    <span style={{ fontSize: 28 }}>🗄️</span>
                    <h1 style={{ fontSize: 28, fontWeight: 800 }}>
                        <span style={{ color: "#f97316" }}>Aporto</span>.tech Admin
                    </h1>
                </div>
                <p style={{ color: "#52525b", fontSize: 14 }}>Database viewer — Users &amp; Subscriptions</p>
            </div>

            {/* Stats */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 40, maxWidth: 700 }}>
                {[
                    { label: "Total Users", value: users.length, color: "#3b82f6" },
                    { label: "Pro Subscribers", value: proSubs, color: "#f97316" },
                    { label: "Total Revenue", value: `$${(totalRevenue._sum.totalPaid ?? 0).toFixed(2)}`, color: "#22c55e" },
                ].map((s) => (
                    <div key={s.label} style={{
                        background: "#111118",
                        border: "1px solid #1f1f2e",
                        borderRadius: 14,
                        padding: "20px 24px",
                    }}>
                        <div style={{ fontSize: 11, color: "#52525b", textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>{s.label}</div>
                        <div style={{ fontSize: 28, fontWeight: 800, color: s.color }}>{s.value}</div>
                    </div>
                ))}
            </div>

            {/* Users table */}
            <div style={{ background: "#111118", border: "1px solid #1f1f2e", borderRadius: 16, overflow: "hidden", marginBottom: 32 }}>
                <div style={{ padding: "16px 24px", borderBottom: "1px solid #1f1f2e", display: "flex", justifyContent: "space-between" }}>
                    <h2 style={{ fontSize: 16, fontWeight: 700 }}>Users</h2>
                    <span style={{ fontSize: 12, color: "#52525b", alignSelf: "center" }}>{users.length} total</span>
                </div>
                <div style={{ overflowX: "auto" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                        <thead>
                            <tr style={{ borderBottom: "1px solid #1f1f2e" }}>
                                {["Name", "Email", "Queue #", "Plan", "AI Credits", "Total Paid", "Joined"].map((h) => (
                                    <th key={h} style={{ padding: "10px 16px", textAlign: "left", color: "#52525b", fontWeight: 600, fontSize: 11, textTransform: "uppercase", letterSpacing: 0.5 }}>{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {(users as UserWithSubs[]).map((user) => {
                                const latestSub = user.subscriptions[0];
                                return (
                                    <tr key={user.id} style={{ borderBottom: "1px solid #1f1f2e" }}>
                                        <td style={{ padding: "12px 16px", fontWeight: 600 }}>{user.name}</td>
                                        <td style={{ padding: "12px 16px", color: "#71717a" }}>{user.email}</td>
                                        <td style={{ padding: "12px 16px" }}>
                                            <span style={{ background: "rgba(249,115,22,0.1)", color: "#f97316", borderRadius: 6, padding: "2px 8px", fontWeight: 700 }}>
                                                #{user.queuePosition}
                                            </span>
                                        </td>
                                        <td style={{ padding: "12px 16px" }}>
                                            {latestSub ? (
                                                <span style={{
                                                    background: latestSub.plan === "PRO" ? "rgba(249,115,22,0.15)" : "rgba(113,113,122,0.15)",
                                                    color: latestSub.plan === "PRO" ? "#f97316" : "#71717a",
                                                    borderRadius: 6,
                                                    padding: "2px 8px",
                                                    fontWeight: 600,
                                                    fontSize: 12,
                                                }}>
                                                    {latestSub.plan}
                                                </span>
                                            ) : "—"}
                                        </td>
                                        <td style={{ padding: "12px 16px", color: "#22c55e", fontWeight: 600 }}>
                                            {latestSub ? `$${latestSub.aiCreditsIncluded}` : "—"}
                                        </td>
                                        <td style={{ padding: "12px 16px", fontWeight: 600 }}>
                                            {latestSub ? `$${latestSub.totalPaid}` : "—"}
                                        </td>
                                        <td style={{ padding: "12px 16px", color: "#52525b", fontSize: 12 }}>
                                            {new Date(user.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                                        </td>
                                    </tr>
                                );
                            })}
                            {users.length === 0 && (
                                <tr>
                                    <td colSpan={7} style={{ padding: "32px 16px", textAlign: "center", color: "#52525b" }}>
                                        No users yet. Register your first account to see data here.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Subscriptions table */}
            <div style={{ background: "#111118", border: "1px solid #1f1f2e", borderRadius: 16, overflow: "hidden" }}>
                <div style={{ padding: "16px 24px", borderBottom: "1px solid #1f1f2e" }}>
                    <h2 style={{ fontSize: 16, fontWeight: 700 }}>Subscriptions</h2>
                </div>
                <div style={{ overflowX: "auto" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                        <thead>
                            <tr style={{ borderBottom: "1px solid #1f1f2e" }}>
                                {["User", "Plan", "Credit Pack", "AI Credits", "Total Paid", "Status", "Date"].map((h) => (
                                    <th key={h} style={{ padding: "10px 16px", textAlign: "left", color: "#52525b", fontWeight: 600, fontSize: 11, textTransform: "uppercase", letterSpacing: 0.5 }}>{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {(users as UserWithSubs[]).flatMap((u) =>
                                u.subscriptions.map((sub) => (
                                    <tr key={sub.id} style={{ borderBottom: "1px solid #1e1e2e" }}>
                                        <td style={{ padding: "12px 16px", fontWeight: 600 }}>{u.name}</td>
                                        <td style={{ padding: "12px 16px" }}>
                                            <span style={{
                                                background: sub.plan === "PRO" ? "rgba(249,115,22,0.15)" : "rgba(113,113,122,0.15)",
                                                color: sub.plan === "PRO" ? "#f97316" : "#71717a",
                                                borderRadius: 6, padding: "2px 8px", fontWeight: 600, fontSize: 12,
                                            }}>
                                                {sub.plan}
                                            </span>
                                        </td>
                                        <td style={{ padding: "12px 16px", color: "#a1a1aa" }}>
                                            {sub.creditPackage ? `Pack ${sub.creditPackage} ($${sub.creditPackagePaid})` : "—"}
                                        </td>
                                        <td style={{ padding: "12px 16px", color: "#22c55e", fontWeight: 600 }}>${sub.aiCreditsIncluded}</td>
                                        <td style={{ padding: "12px 16px", fontWeight: 700 }}>${sub.totalPaid}</td>
                                        <td style={{ padding: "12px 16px" }}>
                                            <span style={{ color: sub.status === "ACTIVE" ? "#22c55e" : "#ef4444", fontSize: 12, fontWeight: 600 }}>{sub.status}</span>
                                        </td>
                                        <td style={{ padding: "12px 16px", color: "#52525b", fontSize: 12 }}>
                                            {new Date(sub.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                                        </td>
                                    </tr>
                                ))
                            )}
                            {(users as UserWithSubs[]).every((u) => u.subscriptions.length === 0) && (
                                <tr>
                                    <td colSpan={7} style={{ padding: "32px 16px", textAlign: "center", color: "#52525b" }}>
                                        No subscriptions yet.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <p style={{ marginTop: 32, fontSize: 12, color: "#3a3a5e", textAlign: "center" }}>
                💡 For full DB access run: <code style={{ background: "#1f1f2e", padding: "2px 8px", borderRadius: 4 }}>npx prisma studio</code> → opens at localhost:5555
            </p>
        </div>
    );
}

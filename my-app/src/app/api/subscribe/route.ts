import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

/**
 * Credit packs configuration
 */
const CREDIT_PACKS = {
    S: { paid: 22, credits: 30 },
    M: { paid: 50, credits: 65 },
    L: { paid: 100, credits: 130 },
} as const;

type PackKey = keyof typeof CREDIT_PACKS;

export async function POST(req: NextRequest) {
    try {
        const session = await auth();
        const body = await req.json();

        const {
            email,      // from landing page (anonymous user selecting plan before sign-up)
            creditPackage, // "S" | "M" | "L" | null
        } = body;

        // Determine credits
        // Pro base: $12 AI credits for $9/mo
        let aiCreditsIncluded = 12;
        let totalPaid = 9;
        let packPaid: number | null = null;

        if (creditPackage && creditPackage in CREDIT_PACKS) {
            const pack = CREDIT_PACKS[creditPackage as PackKey];
            aiCreditsIncluded += pack.credits;
            totalPaid += pack.paid;
            packPaid = pack.paid;
        }

        // If user is authenticated, save to their account
        if (session?.user?.email) {
            const user = await prisma.user.findUnique({
                where: { email: session.user.email },
            });

            if (user) {
                await prisma.subscription.create({
                    data: {
                        userId: user.id,
                        plan: "PRO",
                        creditPackage: creditPackage || null,
                        creditPackagePaid: packPaid,
                        aiCreditsIncluded,
                        totalPaid,
                    },
                });
                return NextResponse.json({ success: true, aiCreditsIncluded, totalPaid });
            }
        }

        // Anonymous user — store intent with email if provided (for follow-up)
        if (email) {
            // Try to find existing user
            const user = await prisma.user.findUnique({ where: { email } });
            if (user) {
                await prisma.subscription.create({
                    data: {
                        userId: user.id,
                        plan: "PRO",
                        creditPackage: creditPackage || null,
                        creditPackagePaid: packPaid,
                        aiCreditsIncluded,
                        totalPaid,
                    },
                });
            }
            // If no user yet — they'll be added on registration
        }

        // Store pending intent in cookie for pickup after registration
        const response = NextResponse.json({ success: true, aiCreditsIncluded, totalPaid });
        response.cookies.set(
            "subscribe_intent",
            JSON.stringify({ creditPackage: creditPackage || null }),
            { maxAge: 3600, httpOnly: false, path: "/" }
        );
        return response;
    } catch (err: unknown) {
        console.error("[subscribe]", err);
        return NextResponse.json({ error: "Failed to save subscription" }, { status: 500 });
    }
}

export async function GET() {
    // Simple stats endpoint for admin
    try {
        const [users, subs] = await Promise.all([
            prisma.user.count(),
            prisma.subscription.count(),
        ]);
        return NextResponse.json({ users, subscriptions: subs });
    } catch {
        return NextResponse.json({ error: "DB error" }, { status: 500 });
    }
}

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getNextQueuePosition } from "@/auth";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { name, email, password } = body;

        if (!name || !email || !password) {
            return NextResponse.json({ error: "All fields are required" }, { status: 400 });
        }
        if (password.length < 6) {
            return NextResponse.json(
                { error: "Password must be at least 6 characters" },
                { status: 400 }
            );
        }

        const existing = await prisma.user.findUnique({ where: { email } });
        if (existing) {
            return NextResponse.json({ error: "Email already registered" }, { status: 400 });
        }

        const queuePosition = await getNextQueuePosition();

        const user = await prisma.user.create({
            data: { name, email, password, queuePosition },
        });

        // Create a FREE subscription record with $1 test credits
        await prisma.subscription.create({
            data: {
                userId: user.id,
                plan: "FREE",
                aiCreditsIncluded: 1,
                totalPaid: 0,
            },
        });

        return NextResponse.json({ success: true, queuePosition: user.queuePosition });
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Registration failed";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}

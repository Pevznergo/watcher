import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";

// ── Queue position counter ────────────────────────────────────────────────────
// We persist this in the DB (count existing users) so it survives restarts.

export async function getNextQueuePosition(): Promise<number> {
    const count = await prisma.user.count();
    return 101 + count; // first user = #101, each new user = +1
}

// ── NextAuth config ───────────────────────────────────────────────────────────
export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                const email = credentials?.email as string;
                const password = credentials?.password as string;
                if (!email || !password) return null;

                const user = await prisma.user.findUnique({ where: { email } });
                if (!user || user.password !== password) return null;

                return {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    queuePosition: user.queuePosition,
                };
            },
        }),
    ],
    session: { strategy: "jwt" },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.queuePosition = (user as { queuePosition?: number }).queuePosition;
            }
            return token;
        },
        async session({ session, token }) {
            if (token && session.user) {
                (session.user as { queuePosition?: number }).queuePosition =
                    token.queuePosition as number;
            }
            return session;
        },
    },
    pages: { signIn: "/login" },
    secret: process.env.AUTH_SECRET || "aporto-dev-secret-change-in-prod-32chars!!",
});

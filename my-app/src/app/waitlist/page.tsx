import { auth, signOut } from "@/auth";
import { PrismaClient } from "@prisma/client";
import { LogOut, PartyPopper } from "lucide-react";
import { redirect } from "next/navigation";

const prisma = new PrismaClient();

export default async function WaitlistPage() {
    const session = await auth();

    if (!session?.user?.id) {
        redirect("/login");
    }

    const user = await prisma.user.findUnique({
        where: { id: session.user.id },
    });

    const position = user?.waitlistPosition || 245; // Default fallback if not set

    return (
        <div className="min-h-screen bg-[#0B0F19] flex flex-col items-center justify-center p-4 relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-[20%] right-[20%] w-[30%] h-[30%] bg-indigo-600/20 blur-[120px] rounded-full point-events-none" />

            <div className="absolute top-6 right-6 z-20">
                <form action={async () => {
                    "use server";
                    await signOut();
                }}>
                    <button type="submit" className="text-slate-400 hover:text-white flex items-center gap-2 text-sm transition-colors">
                        <LogOut className="w-4 h-4" />
                        Sign Out
                    </button>
                </form>
            </div>

            <div className="glass-card w-full max-w-2xl p-10 rounded-3xl relative z-10 border border-indigo-500/30 text-center flex flex-col items-center">
                <div className="w-20 h-20 bg-indigo-500/20 rounded-full flex items-center justify-center mb-6">
                    <PartyPopper className="w-10 h-10 text-indigo-400" />
                </div>

                <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
                    You are <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">{position}{
                        position % 10 === 1 && position !== 11 ? "st" :
                            position % 10 === 2 && position !== 12 ? "nd" :
                                position % 10 === 3 && position !== 13 ? "rd" : "th"
                    }</span> in the queue
                </h1>

                <p className="text-slate-400 text-lg mb-10 max-w-md">
                    Thank you for joining Aporto.tech! We are gradually rolling out access to ensure the best experience for everyone.
                </p>

                <div className="w-full max-w-md p-6 bg-slate-900/60 rounded-2xl border border-slate-700/50 flex flex-col items-center gap-4">
                    <h3 className="text-white font-medium">Have a promo code?</h3>
                    <p className="text-sm text-slate-400 mb-2">Enter your promo code to bypass the waitlist and get instant access.</p>

                    <form className="w-full flex gap-3" action={async (formData) => {
                        "use server";
                        // Mock promo code validation logic
                        const code = formData.get("code");
                        if (code === "VIP-APORTO") {
                            // Handle bump up queue logic
                            await prisma.user.update({
                                where: { id: session?.user?.id },
                                data: { waitlistPosition: 1, promoCode: code as string }
                            });
                        }
                    }}>
                        <input
                            name="code"
                            type="text"
                            placeholder="e.g. VIP-ACCESS"
                            className="flex-1 px-4 py-3 rounded-xl bg-slate-800/80 border border-slate-700 text-white focus:ring-2 focus:ring-indigo-500 transition-all font-mono uppercase"
                        />
                        <button type="submit" className="bg-white text-slate-900 font-semibold px-6 py-3 rounded-xl hover:bg-slate-200 transition-colors">
                            Apply
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

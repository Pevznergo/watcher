import { HandMetal } from "lucide-react";
import Link from "next/link";
import { revalidatePath } from "next/cache";

export default function ForgotPasswordPage() {
    return (
        <div className="min-h-screen bg-[#0B0F19] flex items-center justify-center p-4 relative overflow-hidden">
            <div className="absolute bottom-0 left-0 w-[50%] h-[50%] bg-indigo-600/10 blur-[120px] rounded-full point-events-none" />

            <div className="glass-card w-full max-w-md p-8 rounded-2xl relative z-10 border border-slate-700/50">
                <div className="flex flex-col items-center mb-8 text-center">
                    <Link href="/" className="flex items-center gap-2 font-bold text-2xl tracking-tight text-white mb-2">
                        <HandMetal className="w-8 h-8 text-indigo-400" />
                        Aporto.tech
                    </Link>
                    <p className="text-slate-400 text-sm">Enter your email and we'll send you a link to reset your password.</p>
                </div>

                <form className="flex flex-col gap-4" action={async (formData) => {
                    "use server";
                    const email = formData.get("email");
                    // Initialize Resend
                    // const resend = new Resend(process.env.RESEND_API_KEY);
                    // await resend.emails.send({ ... });
                    console.log("Password reset requested for:", email);
                    revalidatePath("/forgot-password");
                }}>
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">Email</label>
                        <input
                            name="email"
                            type="email"
                            required
                            className="w-full px-4 py-2 rounded-lg bg-slate-900/50 border border-slate-700 text-white focus:ring-2 focus:ring-indigo-500 transition-all placeholder:text-slate-600"
                            placeholder="agent@aporto.tech"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-2.5 rounded-lg transition-colors mt-2"
                    >
                        Send Reset Link
                    </button>
                </form>

                <p className="text-center text-sm text-slate-400 mt-6">
                    Remebered your password? <Link href="/login" className="text-indigo-400 hover:text-indigo-300 font-medium">Back to login</Link>
                </p>
            </div>
        </div>
    );
}

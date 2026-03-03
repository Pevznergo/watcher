import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Clawwatcher Clone | Aporto.tech',
    description: 'AI Agent Monitoring for OpenClaw',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" className="dark">
            <body className={`${inter.className} bg-[#0B0F19] text-white antialiased selection:bg-indigo-500/30`}>
                {children}
            </body>
        </html>
    )
}

import type { Metadata } from "next";
import { GoogleTagManager } from '@next/third-parties/google';
import "./globals.css";
import Providers from "./providers";

const siteUrl = "https://aporto.tech";
const siteTitle = "Aporto.tech – AI Agent Observability Platform";
const siteDescription =
  "Monitor your AI agents in real-time. See every token, trace every dollar, catch every anomaly — before your agents burn through your budget. Free forever.";
const siteImage = `${siteUrl}/og-image.png`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  // ── Basic SEO ──────────────────────────────────────────────
  title: {
    default: siteTitle,
    template: "%s | Aporto.tech",
  },
  description: siteDescription,
  keywords: [
    "AI agent monitoring",
    "AI observability",
    "token tracking",
    "LLM cost analytics",
    "OpenClaw monitoring",
    "AI budget alerts",
    "Aporto",
  ],
  authors: [{ name: "Aporto.tech", url: siteUrl }],
  creator: "Aporto.tech",
  publisher: "Aporto.tech",

  // ── Canonical ─────────────────────────────────────────────
  alternates: {
    canonical: siteUrl,
  },

  // ── Robots ────────────────────────────────────────────────
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // ── Open Graph ────────────────────────────────────────────
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: siteUrl,
    title: siteTitle,
    description: siteDescription,
    siteName: "Aporto.tech",
    images: [
      {
        url: siteImage,
        width: 1200,
        height: 630,
        alt: "Aporto.tech – AI Agent Observability Platform",
      },
    ],
  },

  // ── Twitter / X Card ─────────────────────────────────────
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    site: "@aportotech",
    creator: "@aportotech",
    images: [siteImage],
  },

  // ── Icons ─────────────────────────────────────────────────
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },

  // ── Theme color ───────────────────────────────────────────
  other: {
    "theme-color": "#f97316",
    "color-scheme": "dark",
    "msapplication-TileColor": "#0a0a0f",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <head>
        {/* Structured data – Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Aporto.tech",
              url: siteUrl,
              description: siteDescription,
              foundingDate: "2026",
              applicationCategory: "DeveloperApplication",
              operatingSystem: "Web",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
                description: "Free tier available",
              },
            }),
          }}
        />
        {/* Structured data – SoftwareApplication */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "Aporto.tech",
              url: siteUrl,
              description: siteDescription,
              applicationCategory: "BusinessApplication",
              operatingSystem: "Web",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
            }),
          }}
        />
      </head>
      <body>
        <Providers>{children}</Providers>
        <GoogleTagManager gtmId="GTM-TC3ZDB2V" />
      </body>
    </html>
  );
}

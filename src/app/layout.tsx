import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "https://openbench.xyz";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "OpenBench - EVMBench-Powered Smart Contract Security",
    template: "%s | OpenBench",
  },
  description:
    "Built on OpenAI & Paradigm's EVMBench standard. Detect honeypots, tax traps, and rug pull risks instantly.",
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    siteName: "OpenBench",
    locale: "en_US",
    images: [
      {
        url: "/og-default.png",
        width: 1200,
        height: 630,
        alt: "OpenBench - EVMBench-Powered Smart Contract Security",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-default.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pesisir Selatan Smart Civilization Atlas — PGA-166",
  description: "Atlas Peradaban Maritim Digital yang Berdaulat, Berkeadilan, dan Berkelanjutan. Kabupaten Pesisir Selatan, Sumatera Barat 2026-2030.",
  keywords: ["Smart City", "Pesisir Selatan", "Smart Civilization", "PGA-166", "Maritime", "Digital Twin", "Smart Governance"],
  authors: [{ name: "Dewan 46 Master Polymath" }],
  icons: {
    icon: "https://z-cdn.chatglm.cn/z-ai/static/logo.svg",
  },
  openGraph: {
    title: "Pesisir Selatan Smart Civilization Atlas",
    description: "Role Model ASEAN Smart Maritime Civilization 2030",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pesisir Selatan Smart Civilization Atlas",
    description: "Role Model ASEAN Smart Maritime Civilization 2030",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}

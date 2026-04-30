import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Matt Kuda - Software Engineer & Content Creator",
  description:
    "Software Engineer, Fitness Enthusiast, Content Creator, and Entrepreneur. Building things that combine tech and fitness.",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} antialiased bg-[#0a0a0a] text-[#ededed]`}
      >
        <Header />
        <main className="mx-auto max-w-2xl px-6 pt-24 pb-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

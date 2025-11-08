import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/components/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Marketing Examples - Learn from the Best Marketing Campaigns",
  description:
    "Discover 500+ real marketing examples from top brands. Learn from successful campaigns, landing pages, email marketing, and more. New examples added weekly.",
  keywords: [
    "marketing examples",
    "marketing campaigns",
    "email marketing",
    "landing pages",
    "marketing strategies",
  ],
  authors: [{ name: "Marketing Examples" }],
  openGraph: {
    title: "Marketing Examples - Learn from the Best Marketing Campaigns",
    description:
      "Discover 500+ real marketing examples from top brands. Learn from successful campaigns, landing pages, email marketing, and more.",
    url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
    siteName: "Marketing Examples",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Marketing Examples - Learn from the Best Marketing Campaigns",
    description:
      "Discover 500+ real marketing examples from top brands. Learn from successful campaigns, landing pages, email marketing, and more.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}


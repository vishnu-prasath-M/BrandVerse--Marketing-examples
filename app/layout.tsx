import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FAB from "@/components/FAB";
import { AuthProvider } from "@/components/AuthProvider";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const poppins = Poppins({ 
  subsets: ["latin"], 
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins" 
});

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
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${poppins.variable} font-sans antialiased`}>
        <ThemeProvider>
          <AuthProvider>
            <Navbar />
            <main className="min-h-screen pt-16">{children}</main>
            <FAB />
            <Footer />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}


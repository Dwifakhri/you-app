import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/styles/globals.css";
import { AuthProvider } from "@/app/contexts/auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "YouApp - MBTI, BaZi, Astrology, Numerology and more",
    template: "% || YouApp"
  },
  description: "MBTI, BaZi, Astrology, Numerology and more"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </AuthProvider>
  );
}

import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import FloatingChatbot from "@/components/FloatingChatbot";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Bureau of Indian Standards (BIS) | National Standards Body of India | मानक: पथप्रदर्शक:",
  description:
    "Official portal of the Bureau of Indian Standards (BIS), Ministry of Consumer Affairs, Government of India. Verify ISI mark products, scan barcodes, check Gold/Silver Hallmarking (HUID) purity, and file consumer grievances.",
  keywords: [
    "Bureau of Indian Standards",
    "BIS",
    "ISI Mark",
    "Hallmarking",
    "HUID Gold",
    "Indian Standards",
    "Barcode Verification",
    "Compulsory Registration Scheme",
    "BIS Care",
  ],
  authors: [{ name: "Bureau of Indian Standards" }],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}
      >
        {children}
        {/* Floating Chatbot Button linking to https://bis-ai-assistant-v2.vercel.app/ */}
        <FloatingChatbot redirectUrl="https://bis-ai-assistant-v2.vercel.app/" />
      </body>
    </html>
  );
}

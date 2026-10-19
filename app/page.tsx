"use client";

import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import StatsTicker from "@/components/StatsTicker";
import QCISpotlight from "@/components/QCISpotlight";
import StandardsExplorer from "@/components/StandardsExplorer";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";
import FloatingChatbot from "@/components/FloatingChatbot";
import Coin3D from "@/components/Coin3D";
import {
  ShieldCheck,
  ScanBarcode,
  Coins,
  BookOpen,
  AlertCircle,
  Microscope,
  CheckCircle2,
  ArrowRight,
  ExternalLink,
  Sparkles,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#fdfafc] dark:bg-[#14050d] text-zinc-900 dark:text-zinc-100 selection:bg-rose-200 selection:text-rose-950">
      {/* 1. Header Navigation */}
      <Navbar />

      <main className="flex-1">
        {/* 2. Hero Section with Lilac Meadow Rose Theme & 3D Buttons */}
        <HeroSection />

        {/* 3. Official Stats in Numbers (data.gov.in / bis.gov.in) */}
        <StatsTicker />

        {/* 4. Mandatory QCO Safety Spotlight */}
        <QCISpotlight />

        {/* 5. Indian Standards Division Explorer */}
        <StandardsExplorer />

        {/* 6. Citizen Empowerment & e-BIS Infrastructure Callout */}
        <section className="py-16 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="glass-card rounded-3xl p-8 sm:p-12 border border-rose-200/80 dark:border-rose-900/80 bg-gradient-to-br from-white/90 via-rose-50/50 to-amber-50/40 dark:from-[#210917]/90 dark:via-[#16040e]/90 dark:to-[#1a0812]/90 relative overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300 text-xs font-bold uppercase tracking-wider mb-3">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Citizen Empowerment Initiative</span>
                  </div>
                  <h2 className="text-2xl sm:text-4xl font-extrabold text-rose-950 dark:text-rose-50 mb-4">
                    Know Your Standards. Protect Your Rights.
                  </h2>
                  <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed mb-6">
                    Under the <strong>Bureau of Indian Standards Act 2016</strong>, Indian consumers have the legal right to purchase products that adhere to certified health and safety parameters. Our digital portals allow citizens to verify licenses, detect counterfeit goods, check hallmarking authenticity, and submit instant enforcement complaints.
                  </p>

                  <div className="flex flex-wrap gap-4">
                    <Link
                      href="/scanner"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-rose-700 to-rose-900 hover:from-rose-800 hover:to-rose-950 text-white font-bold text-xs shadow-md hover:shadow-lg transition-all"
                    >
                      <ScanBarcode className="w-4 h-4" />
                      <span>Scan Barcode Now</span>
                    </Link>

                    <Link
                      href="/coins"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-md hover:shadow-lg transition-all"
                    >
                      <Coins className="w-4 h-4" />
                      <span>Check Hallmarked Coins</span>
                    </Link>

                    <Link
                      href="/complaints"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl glass-card text-rose-900 dark:text-rose-200 hover:bg-rose-100 dark:hover:bg-rose-950 font-bold text-xs transition-all"
                    >
                      <AlertCircle className="w-4 h-4" />
                      <span>Report Fake ISI Mark</span>
                    </Link>
                  </div>
                </div>

                {/* Right side Visual Card */}
                <div className="lg:col-span-5 flex justify-center">
                  <div className="relative p-6 rounded-3xl glass-card border border-rose-300/60 dark:border-rose-800/60 shadow-xl max-w-sm w-full text-center">
                    <div className="w-16 h-16 rounded-2xl bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300 flex items-center justify-center mx-auto mb-4 shadow-inner">
                      <Microscope className="w-8 h-8" />
                    </div>
                    <h3 className="text-base font-bold text-rose-950 dark:text-rose-100 mb-1">
                      Central Testing Laboratory Network
                    </h3>
                    <p className="text-xs text-zinc-500 mb-4">
                      Over 1,600 accredited laboratories continuously test market surveillance samples to keep Indian homes safe.
                    </p>
                    <div className="pt-3 border-t border-rose-100 dark:border-rose-900/50 flex items-center justify-between text-xs text-rose-900 dark:text-rose-300 font-bold">
                      <span>NABL Accredited</span>
                      <span>ISO/IEC 17025</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 7. FAQ Knowledge Section */}
        <FAQSection />
      </main>

      {/* 8. Official Government Footer */}
      <Footer />
    </div>
  );
}

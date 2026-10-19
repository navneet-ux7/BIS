"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ScanBarcode,
  Coins,
  ShieldCheck,
  Search,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import MeadowCanvas from "./MeadowCanvas";
import Coin3D from "./Coin3D";

export default function HeroSection() {
  const router = useRouter();

  return (
    <section className="relative w-full pt-2 pb-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Lilac Meadow Rose Stage Card */}
        <div className="relative min-h-[580px] sm:min-h-[640px] rounded-3xl overflow-hidden shadow-2xl border border-rose-200/60 dark:border-rose-900/40 bg-gradient-to-b from-[#f3dde7] via-[#fbf3f6] to-[#f7e6ee] dark:from-[#2a0b1c] dark:via-[#190610] dark:to-[#14040d]">
          {/* Ambient Radial Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_25%,rgba(255,255,255,0.85),transparent_75%)] dark:bg-[radial-gradient(ellipse_60%_50%_at_50%_25%,rgba(173,66,120,0.25),transparent_75%)] pointer-events-none" />

          {/* Generative Meadow Canvas Layers */}
          <div className="absolute inset-0 z-0">
            <MeadowCanvas layerIndex={0} seed={17} className="absolute inset-0 w-full h-full" />
            <MeadowCanvas layerIndex={1} seed={31} className="absolute inset-0 w-full h-full" />
            <MeadowCanvas layerIndex={2} seed={59} className="absolute inset-0 w-full h-full" />
          </div>

          {/* Floating Interactive Decorative 3D Coins in Meadow */}
          <div className="absolute left-[8%] sm:left-[12%] bottom-[22%] sm:bottom-[28%] z-10 hidden md:block">
            <div className="lml-bob">
              <Coin3D
                metal="gold"
                purityText="22K 916"
                size={110}
                showBadge
                onClick={() => router.push("/coins?metal=gold")}
              />
            </div>
          </div>

          <div className="absolute right-[8%] sm:right-[12%] bottom-[20%] sm:bottom-[26%] z-10 hidden md:block">
            <div className="lml-bob" style={{ animationDelay: "-3s" }}>
              <Coin3D
                metal="silver"
                purityText="925 STERLING"
                size={96}
                showBadge
                onClick={() => router.push("/coins?metal=silver")}
              />
            </div>
          </div>

          {/* Pollen Particles in Air */}
          <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
            {[...Array(14)].map((_, i) => (
              <span
                key={i}
                className="absolute w-1.5 h-1.5 rounded-full bg-white dark:bg-rose-300 shadow-[0_0_8px_2px_rgba(255,255,255,0.8)] opacity-60 animate-float-slow"
                style={{
                  left: `${(i * 7.5 + 4) % 94}%`,
                  top: `${(i * 11 + 18) % 70}%`,
                  animationDuration: `${5 + (i % 4) * 2}s`,
                  animationDelay: `${-(i % 5)}s`,
                }}
              />
            ))}
          </div>

          {/* Central Hero Content */}
          <div className="relative z-20 flex flex-col items-center text-center px-4 pt-12 sm:pt-16 pb-20 max-w-4xl mx-auto">
            {/* Sparkle Govt Pill Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill text-xs font-bold text-rose-950 dark:text-rose-200 border border-rose-300/60 dark:border-rose-700/60 shadow-sm mb-6 animate-pulse-glow">
              <Sparkles className="w-4 h-4 text-rose-600 dark:text-rose-400" />
              <span>National Standards Body of India · Under BIS Act 2016</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-rose-950 dark:text-rose-50 leading-[1.1] mb-4">
              Building a Quality-Conscious Nation with{" "}
              <span className="bg-gradient-to-r from-rose-700 via-rose-900 to-amber-800 dark:from-rose-400 dark:via-rose-200 dark:to-amber-300 bg-clip-text text-transparent">
                Certified Trust
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base lg:text-lg text-rose-900/80 dark:text-rose-200/80 max-w-2xl mx-auto mb-8 font-normal leading-relaxed">
              Verify genuine <strong>ISI Mark</strong> products, detect fake counterfeit goods with barcode scanning, check <strong>Gold, Silver & Platinum Hallmarking</strong> purity (HUID), and ensure standard safety in every Indian household.
            </p>

            {/* THE TWO MAIN 3D BUTTONS: Barcode Scanner & Gold Coin Hallmarking */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full max-w-lg mb-8">
              {/* 1. 3D Barcode Scanner Button */}
              <Link
                href="/scanner"
                className="w-full sm:w-auto flex-1 barcode-3d-button group relative px-6 py-4 rounded-2xl flex items-center justify-center gap-3 text-white overflow-hidden text-center"
              >
                {/* Laser scan line effect */}
                <div className="absolute inset-x-0 h-0.5 bg-rose-300/80 shadow-[0_0_8px_#ff9ebb] animate-laser pointer-events-none" />

                <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
                  <ScanBarcode className="w-6 h-6 text-white" />
                </div>
                <div className="text-left">
                  <div className="text-xs font-semibold text-rose-200 tracking-wider uppercase">
                    3D Scanner
                  </div>
                  <div className="text-sm sm:text-base font-bold text-white flex items-center gap-1.5">
                    <span>Verify Barcode</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>

              {/* 2. 3D Gold Coin Button */}
              <Link
                href="/coins"
                className="w-full sm:w-auto flex-1 gold-3d-button group relative px-6 py-4 rounded-2xl flex items-center justify-center gap-3 text-amber-950 overflow-hidden text-center"
              >
                {/* Metallic glint shimmer */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />

                <div className="w-10 h-10 rounded-xl bg-amber-950/15 flex items-center justify-center shadow-inner group-hover:rotate-12 transition-transform">
                  <Coins className="w-6 h-6 text-amber-950" />
                </div>
                <div className="text-left">
                  <div className="text-xs font-bold text-amber-900 tracking-wider uppercase">
                    Hallmark Check
                  </div>
                  <div className="text-sm sm:text-base font-extrabold text-amber-950 flex items-center gap-1.5">
                    <span>Gold & Coins</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

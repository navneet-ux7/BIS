"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck, Phone, Mail, MapPin, ExternalLink, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative pt-16 pb-12 bg-[#faf0f4] dark:bg-[#12040c] border-t border-rose-200/50 dark:border-rose-950/60 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-2 flex flex-col">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-rose-700 to-amber-700 p-0.5 shadow-md flex items-center justify-center">
                <div className="w-full h-full rounded-[14px] bg-white dark:bg-zinc-950 flex items-center justify-center">
                  <div className="w-0 h-0 border-l-[9px] border-l-transparent border-r-[9px] border-r-transparent border-b-[15px] border-b-rose-700" />
                </div>
              </div>
              <div>
                <span className="text-base font-bold text-rose-950 dark:text-rose-100">
                  Bureau of Indian Standards
                </span>
                <p className="text-xs text-rose-800/70 dark:text-rose-300/70">
                  National Standards Body of India · राष्ट्रीय मानक निकाय
                </p>
              </div>
            </div>

            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6 max-w-sm">
              Under the Ministry of Consumer Affairs, Food & Public Distribution, Government of India. Mandated by the BIS Act 2016 for standardisation, conformity assessment, and quality assurance.
            </p>

            <div className="flex flex-col gap-2 text-xs text-zinc-700 dark:text-zinc-300">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-rose-700" />
                <span>Toll-Free Consumer Helpline: <strong>1800 11 1234</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-rose-700" />
                <span>Email: complaints@bis.gov.in</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-rose-700" />
                <span>Manak Bhavan, 9 Bahadur Shah Zafar Marg, New Delhi 110002</span>
              </div>
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h4 className="text-xs font-bold text-rose-900 dark:text-rose-300 uppercase tracking-wider mb-4">
              Key Portals
            </h4>
            <ul className="flex flex-col gap-2.5 text-xs text-zinc-600 dark:text-zinc-400">
              <li>
                <Link href="/scanner" className="hover:text-rose-800 dark:hover:text-white transition-colors">
                  Barcode & Product Scanner
                </Link>
              </li>
              <li>
                <Link href="/coins" className="hover:text-rose-800 dark:hover:text-white transition-colors">
                  Hallmarking & Coins Purity
                </Link>
              </li>
              <li>
                <Link href="/certification-guide" className="hover:text-rose-800 dark:hover:text-white transition-colors">
                  How to Get BIS Certified
                </Link>
              </li>
              <li>
                <Link href="/complaints" className="hover:text-rose-800 dark:hover:text-white transition-colors">
                  Grievance & Vigilance Portal
                </Link>
              </li>
              <li>
                <a href="https://www.manakonline.in" target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-rose-800 dark:hover:text-white">
                  <span>e-BIS Manakonline</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Standards & Schemes */}
          <div>
            <h4 className="text-xs font-bold text-rose-900 dark:text-rose-300 uppercase tracking-wider mb-4">
              Certification Schemes
            </h4>
            <ul className="flex flex-col gap-2.5 text-xs text-zinc-600 dark:text-zinc-400">
              <li>
                <Link href="/certification-guide#scheme1" className="hover:text-rose-800 dark:hover:text-white transition-colors">
                  Scheme I: ISI Mark Product Certification
                </Link>
              </li>
              <li>
                <Link href="/certification-guide#scheme2" className="hover:text-rose-800 dark:hover:text-white transition-colors">
                  Scheme II: Compulsory Registration (CRS)
                </Link>
              </li>
              <li>
                <Link href="/certification-guide#hallmarking" className="hover:text-rose-800 dark:hover:text-white transition-colors">
                  Scheme IV: Gold & Silver Hallmarking
                </Link>
              </li>
              <li>
                <Link href="/certification-guide#fmcs" className="hover:text-rose-800 dark:hover:text-white transition-colors">
                  Foreign Manufacturers (FMCS)
                </Link>
              </li>
              <li>
                <Link href="/certification-guide#mscs" className="hover:text-rose-800 dark:hover:text-white transition-colors">
                  Management Systems (ISO 9001/14001)
                </Link>
              </li>
            </ul>
          </div>

          {/* Official Government Data */}
          <div>
            <h4 className="text-xs font-bold text-rose-900 dark:text-rose-300 uppercase tracking-wider mb-4">
              Official Data Sources
            </h4>
            <ul className="flex flex-col gap-2.5 text-xs text-zinc-600 dark:text-zinc-400">
              <li>
                <a href="https://www.bis.gov.in" target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-rose-800 dark:hover:text-white">
                  <span>bis.gov.in Portal</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="https://data.gov.in" target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-rose-800 dark:hover:text-white">
                  <span>Open Government Data (OGD)</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="https://consumeraffairs.nic.in" target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-rose-800 dark:hover:text-white">
                  <span>Dept. of Consumer Affairs</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="https://nch.gov.in" target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-rose-800 dark:hover:text-white">
                  <span>National Consumer Helpline</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Large Decorative Watermark Wordmark (Lilac Meadow Signature Style) */}
        <div
          aria-hidden="true"
          className="relative my-6 select-none font-extrabold text-center tracking-tighter text-[clamp(48px,11vw,160px)] leading-none text-transparent bg-gradient-to-b from-rose-900/10 dark:from-rose-500/10 to-transparent bg-clip-text"
        >
          BIS MANAK
        </div>

        {/* Bottom Legal Bar */}
        <div className="pt-6 border-t border-rose-200/50 dark:border-rose-900/50 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 dark:text-zinc-400 gap-3">
          <p>© {new Date().getFullYear()} Bureau of Indian Standards, Government of India. All Rights Reserved.</p>
          <div className="flex items-center gap-6">
            <span>Website Policies</span>
            <span>Terms of Use</span>
            <span>Hyperlinking Policy</span>
            <span>Privacy Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

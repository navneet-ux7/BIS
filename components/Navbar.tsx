"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ShieldCheck,
  ScanBarcode,
  Coins,
  BookOpen,
  AlertCircle,
  Menu,
  X,
  Moon,
  Sun,
  Search,
  ExternalLink,
} from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    if (document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.remove("dark");
      setIsDark(false);
    } else {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    }
  };

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Barcode Scanner", href: "/scanner", icon: ScanBarcode, badge: "AI Verify" },
    { label: "Hallmarking & Coins", href: "/coins", icon: Coins, badge: "Purity" },
    { label: "Certification Guide", href: "/certification-guide", icon: BookOpen },
    { label: "Grievance Help", href: "/complaints", icon: AlertCircle },
  ];

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-white/80 dark:bg-[#1f0916]/80 backdrop-blur-md shadow-sm border-b border-rose-200/40 dark:border-rose-900/40 py-2.5"
          : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo & Title */}
          <Link href="/" className="flex items-center gap-3 group">
            {/* BIS Official Emblem Representation */}
            <div className="relative w-11 h-11 rounded-2xl bg-gradient-to-br from-rose-700 via-rose-900 to-amber-900 p-0.5 shadow-md group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full rounded-[14px] bg-white dark:bg-zinc-950 flex flex-col items-center justify-center p-1">
                {/* BIS Standard Triangle Mark */}
                <div className="relative flex flex-col items-center">
                  <div className="w-0 h-0 border-l-[11px] border-l-transparent border-r-[11px] border-r-transparent border-b-[18px] border-b-rose-700 dark:border-b-rose-500" />
                  <span className="text-[7px] font-black tracking-widest text-white -mt-3.5 z-10">
                    ISI
                  </span>
                </div>
              </div>
              {/* Ashoka Chakra Accent Dot */}
              <div className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-amber-500 border-2 border-white dark:border-zinc-900 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-white animate-ping opacity-75" />
              </div>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-base font-bold tracking-tight text-rose-950 dark:text-rose-100 group-hover:text-rose-700 dark:group-hover:text-rose-300 transition-colors">
                  Bureau of Indian Standards
                </span>
              </div>
              <span className="text-xs font-medium text-rose-800/70 dark:text-rose-300/70">
                भारतीय मानक ब्यूरो · मानक: पथप्रदर्शक:
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1.5">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-3.5 py-2 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 flex items-center gap-1.5 ${
                    isActive
                      ? "bg-rose-800 text-white shadow-md shadow-rose-900/20"
                      : "text-zinc-700 dark:text-zinc-200 hover:text-rose-800 dark:hover:text-rose-300 hover:bg-rose-50/80 dark:hover:bg-rose-950/40"
                  }`}
                >
                  {Icon && <Icon className="w-3.5 h-3.5" />}
                  <span>{link.label}</span>
                  {link.badge && (
                    <span
                      className={`text-[9px] px-1.5 py-0.2 rounded-full font-bold uppercase tracking-wider ${
                        isActive
                          ? "bg-white/20 text-white"
                          : "bg-rose-100 dark:bg-rose-900 text-rose-800 dark:text-rose-200"
                      }`}
                    >
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Header Actions */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              className="w-9 h-9 rounded-full flex items-center justify-center text-zinc-600 dark:text-zinc-300 hover:bg-rose-100/60 dark:hover:bg-rose-950/60 transition-colors"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-rose-800" />}
            </button>

            {/* Quick Scanner Shortcut CTA */}
            <Link
              href="/scanner"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold text-white bg-gradient-to-r from-rose-700 to-rose-900 hover:from-rose-800 hover:to-rose-950 shadow-md shadow-rose-900/20 hover:shadow-lg transition-all"
            >
              <ScanBarcode className="w-3.5 h-3.5" />
              <span>Verify Product</span>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden w-9 h-9 rounded-full flex items-center justify-center text-zinc-700 dark:text-zinc-200 hover:bg-rose-100/60 dark:hover:bg-rose-950/60"
              aria-label="Open Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 p-4 rounded-2xl bg-white/95 dark:bg-[#200916]/95 backdrop-blur-xl border border-rose-200/70 dark:border-rose-900/70 shadow-xl flex flex-col gap-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-semibold ${
                    isActive
                      ? "bg-rose-700 text-white"
                      : "text-zinc-800 dark:text-zinc-200 hover:bg-rose-50 dark:hover:bg-rose-950"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    {Icon && <Icon className="w-4 h-4" />}
                    <span>{link.label}</span>
                  </div>
                  {link.badge && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-amber-100 text-amber-900">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
            <div className="pt-2 border-t border-rose-100 dark:border-rose-900/50 flex items-center justify-between">
              <span className="text-xs text-zinc-500">Official Portal Helpline</span>
              <span className="text-xs font-bold text-rose-700 dark:text-rose-400">1800 11 1234</span>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

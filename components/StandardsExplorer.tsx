"use client";

import React, { useState } from "react";
import Link from "next/link";
import { BIS_DIVISIONS, StandardDivision } from "@/data/bis-data";
import {
  Building2,
  Utensils,
  Cpu,
  ShieldAlert,
  ShoppingBag,
  Coins,
  ArrowRight,
  ExternalLink,
  CheckCircle2,
  FileCheck,
} from "lucide-react";

export default function StandardsExplorer() {
  const [activeTab, setActiveTab] = useState<string>(BIS_DIVISIONS[0].id);

  const iconMap: Record<string, any> = {
    Building2,
    Utensils,
    Cpu,
    ShieldAlert,
    ShoppingBag,
    Coins,
  };

  const activeDivision = BIS_DIVISIONS.find((d) => d.id === activeTab) || BIS_DIVISIONS[0];
  const ActiveIcon = iconMap[activeDivision.icon] || Building2;

  return (
    <section className="py-16 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300 text-xs font-bold uppercase tracking-wider mb-3">
            <span>Standardization Divisions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-rose-950 dark:text-rose-100 mb-4">
            Setting the Benchmark for Indian Excellence
          </h2>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
            Over 21,500 active Indian Standards formulated by technical expert committees, civil society, and industry stakeholders to protect consumers and power Indian manufacturing.
          </p>
        </div>

        {/* Division Tab Selector */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none mb-8 justify-start lg:justify-center">
          {BIS_DIVISIONS.map((div) => {
            const Icon = iconMap[div.icon] || Building2;
            const isSelected = div.id === activeTab;
            return (
              <button
                key={div.id}
                onClick={() => setActiveTab(div.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                  isSelected
                    ? "bg-rose-800 text-white shadow-lg shadow-rose-900/20 scale-[1.02]"
                    : "glass-card text-zinc-700 dark:text-zinc-300 hover:bg-rose-50 dark:hover:bg-rose-950"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{div.name.split("&")[0].trim()}</span>
              </button>
            );
          })}
        </div>

        {/* Active Division Feature Card */}
        <div className="glass-card rounded-3xl p-6 sm:p-10 border border-rose-200/80 dark:border-rose-900/80 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left side division brief */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300 flex items-center justify-center shadow-inner">
                    <ActiveIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-rose-950 dark:text-rose-100">
                      {activeDivision.name}
                    </h3>
                    <span className="text-xs text-rose-700 dark:text-rose-400 font-medium">
                      {activeDivision.hindiName}
                    </span>
                  </div>
                </div>

                <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed mb-6">
                  {activeDivision.description}
                </p>

                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-100/70 dark:bg-amber-950/60 text-amber-900 dark:text-amber-200 text-xs font-semibold mb-6">
                  <FileCheck className="w-4 h-4 text-amber-700" />
                  <span>{activeDivision.count.toLocaleString()} Published Standards</span>
                </div>
              </div>

              <div className="pt-4 border-t border-rose-100 dark:border-rose-900/50">
                <Link
                  href="/certification-guide"
                  className="inline-flex items-center gap-2 text-xs font-bold text-rose-700 dark:text-rose-400 hover:text-rose-900 dark:hover:text-rose-200 transition-colors"
                >
                  <span>Learn how to get certified in this sector</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Right side Key Standards List */}
            <div className="lg:col-span-7 flex flex-col gap-3">
              <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1">
                Mandatory & Prominent Standards
              </span>

              {activeDivision.highlightStandards.map((std) => (
                <div
                  key={std.code}
                  className="p-4 rounded-2xl bg-white/70 dark:bg-zinc-900/70 border border-rose-100 dark:border-rose-950 hover:border-rose-300 dark:hover:border-rose-800 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm"
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-bold text-rose-900 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/80 px-2 py-0.5 rounded border border-rose-200 dark:border-rose-800">
                          {std.code}
                        </span>
                        {std.mandatory && (
                          <span className="text-[10px] font-bold text-red-700 dark:text-red-300 bg-red-50 dark:bg-red-950/70 px-2 py-0.5 rounded">
                            Mandatory QCO
                          </span>
                        )}
                      </div>
                      <p className="text-xs font-medium text-zinc-800 dark:text-zinc-200 mt-1">
                        {std.title}
                      </p>
                    </div>
                  </div>

                  <Link
                    href={`/scanner?code=${encodeURIComponent(std.code)}`}
                    className="flex-shrink-0 self-end sm:self-center px-3 py-1.5 rounded-xl text-xs font-semibold text-rose-800 dark:text-rose-300 hover:bg-rose-100 dark:hover:bg-rose-950 transition-colors flex items-center gap-1"
                  >
                    <span>Inspect</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

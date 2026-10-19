"use client";

import React from "react";
import { BIS_METRICS } from "@/data/bis-data";
import { BarChart3, Database, ShieldCheck, Award, Building, Microscope } from "lucide-react";

export default function StatsTicker() {
  const iconList = [ShieldCheck, Award, Database, Building, BarChart3, Microscope];

  return (
    <section className="relative py-12 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header citation */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-rose-200/50 dark:border-rose-900/50 mb-8 gap-4">
          <div>
            <div className="text-xs font-bold text-rose-700 dark:text-rose-400 tracking-wider uppercase mb-1">
              National Quality Infrastructure
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-rose-950 dark:text-rose-100">
              India's Standards Ecosystem in Numbers
            </h2>
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-rose-100/80 dark:bg-rose-950/80 text-rose-900 dark:text-rose-200 text-xs font-medium border border-rose-200 dark:border-rose-800">
            <Database className="w-3.5 h-3.5 text-rose-700" />
            <span>Verified Official Data: bis.gov.in & data.gov.in</span>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {BIS_METRICS.map((m, idx) => {
            const Icon = iconList[idx % iconList.length];
            return (
              <div
                key={m.label}
                className="glass-card glass-card-hover rounded-2xl p-6 relative overflow-hidden group"
              >
                {/* Subtle Rose Gradient Accent in corner */}
                <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-br from-rose-200/30 to-amber-200/20 dark:from-rose-800/20 dark:to-transparent rounded-bl-full pointer-events-none transition-transform group-hover:scale-125" />

                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300 flex items-center justify-center shadow-inner">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                    {m.source}
                  </span>
                </div>

                <div className="text-3xl sm:text-4xl font-extrabold text-rose-950 dark:text-rose-50 tracking-tight mb-2">
                  {m.value}
                </div>

                <div className="text-sm font-bold text-rose-900/90 dark:text-rose-200/90 mb-2">
                  {m.label}
                </div>

                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {m.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

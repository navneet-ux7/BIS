"use client";

import React from "react";
import Link from "next/link";
import {
  ShieldAlert,
  Droplet,
  Flame,
  Gamepad2,
  HardHat,
  Sparkles,
  ArrowRight,
  AlertTriangle,
} from "lucide-react";

export default function QCISpotlight() {
  const mandatoryItems = [
    {
      title: "Packaged Drinking Water",
      code: "IS 14543",
      warning: "Spurious water carries heavy microbial contaminants.",
      tip: "Always check for the ISI mark and 10-digit CM/L license number embossed directly on the bottle neck.",
      icon: Droplet,
      accent: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-50/80 dark:bg-blue-950/30",
    },
    {
      title: "Two-Wheeler Helmets",
      code: "IS 4151",
      warning: "Non-ISI roadside helmets crack on low impact, risking fatal skull trauma.",
      tip: "Under CMV Rule 138(4)(f), riding with a non-ISI helmet attracts legal fines and license suspension.",
      icon: HardHat,
      accent: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-50/80 dark:bg-amber-950/30",
    },
    {
      title: "Gold & Silver Jewellery",
      code: "IS 1417 / IS 2112",
      warning: "Un-hallmarked gold is often alloyed with excess brass, reducing 22K down to 14K.",
      tip: "Demand the 3 mandatory hallmark symbols: BIS Triangle, Caratage (e.g., 22K916), and 6-digit HUID.",
      icon: Sparkles,
      accent: "text-yellow-600 dark:text-yellow-400",
      bg: "bg-yellow-50/80 dark:bg-yellow-950/30",
    },
    {
      title: "LPG Gas Stoves & Cookers",
      code: "IS 4246 / IS 2347",
      warning: "Substandard valves leak flammable LPG; uncertified cookers pose catastrophic burst risks.",
      tip: "Check the metallic plate riveted behind the stove for the genuine ISI logo and fusible alloy plug mark.",
      icon: Flame,
      accent: "text-red-600 dark:text-red-400",
      bg: "bg-red-50/80 dark:bg-red-950/30",
    },
    {
      title: "Children's Toys",
      code: "IS 9873 (Parts 1-9)",
      warning: "Cheap imported toys often contain toxic lead paints and phthalates harmful to infants.",
      tip: "BIS Toy Safety QCO makes it mandatory for every toy sold in India to carry the ISI mark.",
      icon: Gamepad2,
      accent: "text-purple-600 dark:text-purple-400",
      bg: "bg-purple-50/80 dark:bg-purple-950/30",
    },
    {
      title: "LED Bulbs & Power Banks",
      code: "IS 16102 / IS 16046",
      warning: "Unregulated lithium cells can suffer thermal runaway explosions and fire hazards.",
      tip: "Look for the MeitY/BIS CRS registration mark with the unique 8-digit R-number.",
      icon: ShieldAlert,
      accent: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-50/80 dark:bg-emerald-950/30",
    },
  ];

  return (
    <section className="py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 dark:bg-red-950/80 text-red-800 dark:text-red-300 text-xs font-bold uppercase tracking-wider mb-2">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Mandatory Consumer Protection</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-rose-950 dark:text-rose-100">
              Products You Must Never Buy Without BIS Mark
            </h2>
          </div>
          <Link
            href="/scanner"
            className="inline-flex items-center gap-2 text-xs font-bold text-rose-700 dark:text-rose-300 hover:underline"
          >
            <span>Scan packaging now with AI detector</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mandatoryItems.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="glass-card glass-card-hover rounded-2xl p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-11 h-11 rounded-2xl ${item.bg} flex items-center justify-center`}>
                      <Icon className={`w-5 h-5 ${item.accent}`} />
                    </div>
                    <span className="text-xs font-mono font-bold text-rose-800 dark:text-rose-300 bg-rose-100/70 dark:bg-rose-950/70 px-2.5 py-1 rounded-lg">
                      {item.code}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-rose-950 dark:text-rose-100 mb-2">
                    {item.title}
                  </h3>

                  <p className="text-xs text-red-700 dark:text-red-400 font-semibold mb-3">
                    ⚠ {item.warning}
                  </p>

                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    <strong>Consumer Guide:</strong> {item.tip}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-rose-100 dark:border-rose-950 flex items-center justify-between">
                  <Link
                    href={`/scanner?code=${encodeURIComponent(item.code)}`}
                    className="text-xs font-bold text-rose-800 dark:text-rose-300 hover:text-rose-950 dark:hover:text-white flex items-center gap-1"
                  >
                    <span>Check Authentic Samples</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

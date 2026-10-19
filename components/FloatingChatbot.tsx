"use client";

import React from "react";
import { MessageSquare, Bot, Sparkles, ExternalLink } from "lucide-react";

interface FloatingChatbotProps {
  redirectUrl?: string;
}

export default function FloatingChatbot({
  redirectUrl = "https://bis-ai-assistant-v2.vercel.app/",
}: FloatingChatbotProps) {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Hover Tooltip / Status Pill */}
      <a
        href={redirectUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mb-2 hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full glass-card text-[11px] font-bold text-rose-950 dark:text-rose-100 shadow-lg border border-rose-200/80 dark:border-rose-800/80 hover:bg-rose-100 dark:hover:bg-rose-950 transition-all animate-bounce"
      >
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        <span>BIS AI Assistant · Click to Chat</span>
        <ExternalLink className="w-3 h-3 text-rose-700 dark:text-rose-400" />
      </a>

      {/* Floating SVG Interactive Bot Icon Button (Redirects to https://bis-ai-assistant-v2.vercel.app/) */}
      <a
        href={redirectUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Open BIS AI Assistant Chatbot"
        className="group relative w-16 h-16 rounded-full p-1 bg-gradient-to-tr from-rose-900 via-rose-700 to-amber-500 shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-rose-400 block"
      >
        {/* Animated Glowing Wave Ring */}
        <span className="absolute -inset-1.5 rounded-full bg-rose-500/30 blur-md group-hover:bg-rose-500/60 transition-colors animate-pulse" />

        {/* SVG Inner Container */}
        <div className="relative w-full h-full rounded-full bg-gradient-to-b from-rose-800 to-rose-950 flex items-center justify-center overflow-hidden border border-white/20">
          {/* Custom Detailed Animated SVG Chatbot Avatar */}
          <svg
            viewBox="0 0 64 64"
            className="w-10 h-10 transition-transform duration-300 group-hover:rotate-6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="botGrad" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#FFF2F7" />
                <stop offset="50%" stopColor="#F8D0E1" />
                <stop offset="100%" stopColor="#E38BB3" />
              </linearGradient>
              <linearGradient id="eyeGrad" x1="0" y1="0" x2="0" y2="10" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#4ADE80" />
                <stop offset="100%" stopColor="#16A34A" />
              </linearGradient>
            </defs>

            {/* Antenna */}
            <circle cx="32" cy="10" r="3.5" fill="#FFD700" stroke="#FFFFFF" strokeWidth="1" />
            <line x1="32" y1="13.5" x2="32" y2="20" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />

            {/* Head Body */}
            <rect x="14" y="20" width="36" height="28" rx="10" fill="url(#botGrad)" stroke="#FFFFFF" strokeWidth="1.5" />

            {/* Ear Pods */}
            <rect x="9" y="27" width="5" height="14" rx="2.5" fill="#FFD700" />
            <rect x="50" y="27" width="5" height="14" rx="2.5" fill="#FFD700" />

            {/* Face Visor Screen */}
            <rect x="18" y="25" width="28" height="18" rx="6" fill="#1C0A16" />

            {/* Glowing Eyes */}
            <circle cx="26" cy="33" r="3" fill="url(#eyeGrad)" className="animate-ping" style={{ animationDuration: "3s" }} />
            <circle cx="38" cy="33" r="3" fill="url(#eyeGrad)" className="animate-ping" style={{ animationDuration: "3s" }} />

            {/* Friendly Smile Wave */}
            <path d="M 28 38 Q 32 41 36 38" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" fill="none" />

            {/* ISI Triangle Emblem Chest Badge */}
            <polygon points="32,49 28,55 36,55" fill="#FFD700" />
          </svg>
        </div>

        {/* Online Notification Ping Indicator */}
        <span className="absolute top-0 right-0 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white dark:border-rose-950 flex items-center justify-center">
          <span className="w-2 h-2 rounded-full bg-white animate-ping" />
        </span>
      </a>
    </div>
  );
}

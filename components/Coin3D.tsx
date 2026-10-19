"use client";

import React, { useId, useState } from "react";
import { MetalType } from "@/data/hallmark-data";

interface Coin3DProps {
  metal?: MetalType;
  purityText?: string;
  size?: number;
  className?: string;
  interactive?: boolean;
  onClick?: () => void;
  showBadge?: boolean;
}

export default function Coin3D({
  metal = "gold",
  purityText = "22K 916",
  size = 140,
  className = "",
  interactive = true,
  onClick,
  showBadge = false,
}: Coin3DProps) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const [spinning, setSpinning] = useState(false);

  // Metal color stops
  const metalColors: Record<
    MetalType,
    {
      stops: string[];
      edge: string;
      rim: string;
      shadow: string;
      accent: string;
    }
  > = {
    gold: {
      stops: ["#FFF9D6", "#FAD864", "#D8A31E", "#B87F0D", "#7A5200", "#FDE074"],
      edge: "#8C6000",
      rim: "#FFE27B",
      shadow: "rgba(180, 120, 10, 0.4)",
      accent: "#6E4500",
    },
    silver: {
      stops: ["#FFFFFF", "#E8EDF2", "#B8C4CE", "#8E9DAA", "#52606C", "#F4F7FA"],
      edge: "#647482",
      rim: "#E1E8EE",
      shadow: "rgba(100, 115, 130, 0.35)",
      accent: "#384754",
    },
    platinum: {
      stops: ["#FFFFFF", "#E4EFF6", "#A7C1D1", "#6F8E9F", "#3B5665", "#EBF3F8"],
      edge: "#4E6B7B",
      rim: "#D7E7F0",
      shadow: "rgba(70, 105, 125, 0.4)",
      accent: "#263E4D",
    },
    diamond: {
      stops: ["#FFFFFF", "#DDF4FA", "#8CE0F2", "#35BAD6", "#0B7894", "#EBF9FC"],
      edge: "#0E839E",
      rim: "#BBEBF5",
      shadow: "rgba(14, 131, 158, 0.4)",
      accent: "#08576A",
    },
  };

  const palette = metalColors[metal] || metalColors.gold;

  const handleClick = () => {
    if (interactive) {
      setSpinning(true);
      setTimeout(() => setSpinning(false), 900);
    }
    if (onClick) onClick();
  };

  // Reeds along coin circumference
  const reeds = 36;
  const reedItems = [];
  const rx = 56;
  const ry = 48;
  for (let i = 0; i < reeds; i++) {
    const angle = (i / reeds) * Math.PI * 2;
    const x = Math.cos(angle) * rx;
    const y = Math.sin(angle) * ry;
    reedItems.push(
      <circle
        key={i}
        cx={x}
        cy={y}
        r={1.2}
        fill={i % 2 === 0 ? palette.rim : palette.edge}
        opacity={0.8}
      />
    );
  }

  return (
    <div
      onClick={handleClick}
      className={`relative inline-block select-none ${
        interactive ? "cursor-pointer group" : ""
      } ${className}`}
      style={{ width: size, height: (size * 116) / 128 }}
    >
      <div
        className={`w-full h-full transition-transform duration-500 ${
          spinning ? "scale-110 [transform:rotateY(360deg)]" : "group-hover:scale-105"
        }`}
        style={{
          transitionDuration: spinning ? "0.9s" : "0.4s",
          transitionTimingFunction: "cubic-bezier(0.2, 0.8, 0.2, 1)",
          filter: `drop-shadow(0 14px 18px ${palette.shadow})`,
        }}
      >
        <svg
          viewBox="-64 -58 128 116"
          className="w-full h-full overflow-visible"
          aria-hidden="true"
        >
          <defs>
            {/* Bevel gradient */}
            <linearGradient id={`${uid}-metal`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor={palette.stops[0]} />
              <stop offset="20%" stopColor={palette.stops[1]} />
              <stop offset="45%" stopColor={palette.stops[2]} />
              <stop offset="70%" stopColor={palette.stops[3]} />
              <stop offset="88%" stopColor={palette.stops[4]} />
              <stop offset="100%" stopColor={palette.stops[5]} />
            </linearGradient>

            {/* Inner plate gradient */}
            <radialGradient id={`${uid}-inner`} cx="40%" cy="35%" r="70%">
              <stop offset="0%" stopColor={palette.stops[0]} stopOpacity="0.9" />
              <stop offset="50%" stopColor={palette.stops[2]} stopOpacity="0.8" />
              <stop offset="100%" stopColor={palette.stops[4]} stopOpacity="0.95" />
            </radialGradient>

            {/* Glint shine */}
            <linearGradient id={`${uid}-glint`} x1="0" y1="0" x2="0.8" y2="0.8">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
              <stop offset="50%" stopColor="#ffffff" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Outer edge 3D thickness layers */}
          <ellipse cx="0" cy="5" rx="58" ry="50" fill={palette.edge} opacity="0.9" />
          <ellipse cx="0" cy="3" rx="58" ry="50" fill={palette.stops[3]} opacity="0.8" />
          <ellipse cx="0" cy="1" rx="58" ry="50" fill={palette.stops[2]} />

          {/* Reeds on coin rim */}
          <g transform="translate(0, 1)">{reedItems}</g>

          {/* Face plate */}
          <ellipse cx="0" cy="0" rx="55" ry="47" fill={`url(#${uid}-metal)`} />

          {/* Inner stepped ring */}
          <ellipse
            cx="0"
            cy="0"
            rx="46"
            ry="39"
            fill={`url(#${uid}-inner)`}
            stroke={palette.rim}
            strokeWidth="1.2"
          />

          {/* Circular decorative dots */}
          <circle cx="0" cy="0" r="41" fill="none" stroke={palette.rim} strokeWidth="0.8" strokeDasharray="2 3" opacity="0.75" />

          {/* Official BIS Triangle Logo Inscription */}
          <g transform="translate(0, -9) scale(0.65)">
            {/* BIS Triangle emblem */}
            <polygon
              points="0,-22 -20,14 20,14"
              fill="none"
              stroke={palette.accent}
              strokeWidth="3.2"
              strokeLinejoin="round"
            />
            {/* Inner horizontal divider */}
            <line x1="-12" y1="4" x2="12" y2="4" stroke={palette.accent} strokeWidth="2.5" />
            {/* Micro BIS letters */}
            <text
              x="0"
              y="1"
              fontSize="6"
              fontWeight="900"
              fontFamily="sans-serif"
              textAnchor="middle"
              fill={palette.accent}
              letterSpacing="0.5"
            >
              BIS
            </text>
          </g>

          {/* Purity inscription below emblem */}
          <text
            x="0"
            y="17"
            fontSize="9"
            fontWeight="800"
            fontFamily="sans-serif"
            textAnchor="middle"
            fill={palette.accent}
            letterSpacing="0.8"
          >
            {purityText}
          </text>

          {/* Hallmarking Standard Code */}
          <text
            x="0"
            y="26"
            fontSize="5.5"
            fontWeight="700"
            fontFamily="sans-serif"
            textAnchor="middle"
            fill={palette.accent}
            opacity="0.85"
            letterSpacing="0.5"
          >
            {metal === "gold" ? "IS 1417" : metal === "silver" ? "IS 2112" : "IS 15766"}
          </text>

          {/* Specular shine highlight */}
          <path
            d="M -35 -25 C -15 -40, 20 -40, 38 -24 C 20 -32, -15 -32, -35 -25 Z"
            fill={`url(#${uid}-glint)`}
          />
        </svg>
      </div>

      {showBadge && (
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-white/95 dark:bg-rose-950/95 border border-amber-300 dark:border-amber-600 shadow-md text-[10px] font-bold text-amber-900 dark:text-amber-200 whitespace-nowrap">
          {purityText}
        </div>
      )}
    </div>
  );
}

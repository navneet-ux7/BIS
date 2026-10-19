"use client";

import React, { useEffect, useRef, useState } from "react";

interface MeadowProps {
  layerIndex?: number;
  className?: string;
  seed?: number;
  isDark?: boolean;
}

export default function MeadowCanvas({
  layerIndex = 0,
  className = "",
  seed = 42,
  isDark = false,
}: MeadowProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId = 0;

    const draw = () => {
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      if (!width || !height) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);

      // Procedural PRNG seeded
      let s = (seed + layerIndex * 1337) >>> 0;
      const rnd = () => {
        s = (s + 1831565813) >>> 0;
        let t = s;
        t = Math.imul(t ^ (t >>> 15), t | 1);
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
      };

      // Rose palette
      const rosePalette = isDark
        ? ["#1a0510", "#3d0e28", "#782250", "#b8477f", "#eb8eb9", "#ffcee3"]
        : ["#3a0d22", "#6d1c45", "#ad4278", "#e38bb3", "#f8d0e1", "#fff6fa"];

      const baseElevation = height * (0.68 + layerIndex * 0.1);
      const wobbleFreq = 0.008 + layerIndex * 0.003;

      // Draw rolling meadow mound
      ctx.beginPath();
      ctx.moveTo(0, height);

      const points: [number, number][] = [];
      const step = 8;
      for (let x = -20; x <= width + 20; x += step) {
        const wave =
          Math.sin(x * wobbleFreq + seed) * 14 +
          Math.sin(x * wobbleFreq * 2.3 + seed * 1.5) * 8 +
          Math.cos(x * 0.003 + layerIndex) * 20;
        const y = baseElevation + wave;
        points.push([x, y]);
        ctx.lineTo(x, y);
      }
      ctx.lineTo(width, height);
      ctx.closePath();

      const grad = ctx.createLinearGradient(0, baseElevation - 30, 0, height);
      if (isDark) {
        grad.addColorStop(0, "rgba(70, 18, 48, 0.4)");
        grad.addColorStop(1, "rgba(20, 5, 13, 0.95)");
      } else {
        grad.addColorStop(0, "rgba(243, 216, 228, 0.65)");
        grad.addColorStop(1, "rgba(235, 185, 208, 0.95)");
      }
      ctx.fillStyle = grad;
      ctx.fill();

      // Draw flowers and stalks on the ridge
      const flowerCount = Math.min(65, Math.floor(width / (16 - layerIndex * 2)));

      for (let i = 0; i < flowerCount; i++) {
        const fx = rnd() * width;
        const wave =
          Math.sin(fx * wobbleFreq + seed) * 14 +
          Math.sin(fx * wobbleFreq * 2.3 + seed * 1.5) * 8 +
          Math.cos(fx * 0.003 + layerIndex) * 20;
        const fy = baseElevation + wave;

        const stalkHeight = 12 + rnd() * 26 + layerIndex * 6;
        const sway = Math.sin(fx * 0.05 + Date.now() * 0.001) * 3;
        const topX = fx + sway;
        const topY = fy - stalkHeight;

        // Stalk
        ctx.beginPath();
        ctx.moveTo(fx, fy);
        ctx.quadraticCurveTo(fx + sway * 0.5, fy - stalkHeight * 0.5, topX, topY);
        ctx.strokeStyle = isDark ? "rgba(90, 35, 60, 0.5)" : "rgba(165, 95, 125, 0.5)";
        ctx.lineWidth = 1.2;
        ctx.stroke();

        // Petal Blossom
        const radius = 2.5 + rnd() * 3.5 + (layerIndex === 2 ? 2 : 0);
        const petalColor = rosePalette[Math.floor(rnd() * rosePalette.length)];

        // Draw petal cluster
        const petals = 5;
        ctx.fillStyle = petalColor;
        for (let p = 0; p < petals; p++) {
          const angle = (p * Math.PI * 2) / petals;
          const px = topX + Math.cos(angle) * (radius * 0.8);
          const py = topY + Math.sin(angle) * (radius * 0.8);
          ctx.beginPath();
          ctx.arc(px, py, radius * 0.6, 0, Math.PI * 2);
          ctx.fill();
        }

        // Flower center
        ctx.beginPath();
        ctx.arc(topX, topY, radius * 0.45, 0, Math.PI * 2);
        ctx.fillStyle = isDark ? "#ffe89e" : "#ffecb3";
        ctx.fill();
      }

      setDrawn(true);
    };

    draw();

    let resizeTimer: any;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(draw, 150);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimer);
      cancelAnimationFrame(animId);
    };
  }, [layerIndex, seed, isDark]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none transition-opacity duration-1000 ${
        drawn ? "opacity-100" : "opacity-0"
      } ${className}`}
    />
  );
}

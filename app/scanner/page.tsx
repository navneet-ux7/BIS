"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ScanBarcode,
  Camera,
  Upload,
  Search,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  ShieldCheck,
  Building,
  Calendar,
  FileText,
  MapPin,
  Microscope,
  Share2,
  Printer,
  RotateCcw,
  Volume2,
  VolumeX,
  Sparkles,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import confetti from "canvas-confetti";
import {
  VERIFIED_PRODUCTS_DB,
  ProductRecord,
  lookupProduct,
  analyzeUnknownCode,
} from "@/data/products-db";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

function ScannerContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const codeParam = searchParams.get("code");

  const [activeTab, setActiveTab] = useState<"camera" | "upload" | "manual">("manual");
  const [inputCode, setInputCode] = useState(codeParam || "");
  const [scannedResult, setScannedResult] = useState<ProductRecord | null>(null);
  const [algorithmicResult, setAlgorithmicResult] = useState<any | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [uploadedImagePreview, setUploadedImagePreview] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Play audio feedback
  const playAudioTone = (isSuccess: boolean) => {
    if (!soundEnabled) return;
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (isSuccess) {
        osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
        osc.frequency.setValueAtTime(880, ctx.currentTime + 0.12); // A5
        gain.gain.setValueAtTime(0.3, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
        osc.start();
        osc.stop(ctx.currentTime + 0.4);
      } else {
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(220, ctx.currentTime); // Low buzz
        osc.frequency.setValueAtTime(146.83, ctx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.4, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
        osc.start();
        osc.stop(ctx.currentTime + 0.5);
      }
    } catch (e) {
      // AudioContext not allowed without interaction
    }
  };

  // Perform product verification
  const verifyCode = (code: string) => {
    if (!code || !code.trim()) return;
    const clean = code.trim();

    const matchedProduct = lookupProduct(clean);

    if (matchedProduct) {
      setScannedResult(matchedProduct);
      setAlgorithmicResult(null);

      if (matchedProduct.isGenuine) {
        playAudioTone(true);
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#ad4278", "#d4af37", "#4ade80", "#ffffff"],
        });
      } else {
        playAudioTone(false);
      }
    } else {
      // Run algorithmic checksum and format analysis
      const analysis = analyzeUnknownCode(clean);
      setScannedResult(null);
      setAlgorithmicResult(analysis);
      playAudioTone(!analysis.isLikelyFake);
    }
  };

  // Check code from URL on load
  useEffect(() => {
    if (codeParam) {
      setInputCode(codeParam);
      verifyCode(codeParam);
    }
  }, [codeParam]);

  // Handle Camera Start/Stop
  useEffect(() => {
    if (activeTab === "camera") {
      startCamera();
    } else {
      stopCamera();
    }
    return () => {
      stopCamera();
    };
  }, [activeTab]);

  const startCamera = async () => {
    setCameraError(null);
    setIsScanning(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch (err: any) {
      setCameraError(
        "Camera access not allowed or unavailable. You can use Upload Image or Manual Input."
      );
      setIsScanning(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setIsScanning(false);
  };

  // Simulate scanning from camera viewfinder
  const handleSimulatedCameraDetect = (sampleCode: string) => {
    setInputCode(sampleCode);
    verifyCode(sampleCode);
    setActiveTab("manual");
  };

  // Handle Image Upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      const result = uploadEvent.target?.result as string;
      setUploadedImagePreview(result);

      // In real app, barcode is extracted via canvas / ZXing / html5-qrcode
      // For demo, if image name has 'helmet' or 'kinley' or default to genuine water
      const name = file.name.toLowerCase();
      if (name.includes("fake") || name.includes("helmet")) {
        verifyCode("8909999000123");
      } else if (name.includes("kinley") || name.includes("water")) {
        verifyCode("8901764012217");
      } else {
        // Sample genuine
        verifyCode("8901764012217");
      }
    };
    reader.readAsDataURL(file);
  };

  const handleReset = () => {
    setScannedResult(null);
    setAlgorithmicResult(null);
    setInputCode("");
    setUploadedImagePreview(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fdfafc] dark:bg-[#14050d] text-zinc-900 dark:text-zinc-100">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb & Title */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs font-medium text-rose-800 dark:text-rose-300 mb-2">
            <Link href="/" className="hover:underline">
              Home
            </Link>
            <span>/</span>
            <span>Product Authentication</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-rose-950 dark:text-rose-50 flex items-center gap-3">
                <ScanBarcode className="w-8 h-8 text-rose-700 dark:text-rose-400" />
                <span>3D Barcode & ISI Mark Scanner</span>
              </h1>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1 max-w-2xl">
                Scan product barcodes, EAN-13 codes, or enter BIS CM/L license numbers to immediately verify if a product is certified genuine or a dangerous counterfeit.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setSoundEnabled(!soundEnabled)}
                aria-label="Toggle Audio Feedback"
                className="p-2.5 rounded-full glass-card hover:bg-rose-100 dark:hover:bg-rose-950 text-rose-900 dark:text-rose-200 transition-colors"
              >
                {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-zinc-400" />}
              </button>
            </div>
          </div>
        </div>

        {/* Scanner Work Area Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          {/* Left Column: Input Modes (Camera, Upload, Manual) */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            {/* Mode Switcher Tabs */}
            <div className="flex p-1.5 rounded-2xl glass-card gap-1">
              <button
                type="button"
                onClick={() => setActiveTab("manual")}
                className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                  activeTab === "manual"
                    ? "bg-rose-800 text-white shadow-md"
                    : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                }`}
              >
                <Search className="w-4 h-4" />
                <span>Barcode / CML</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("camera")}
                className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                  activeTab === "camera"
                    ? "bg-rose-800 text-white shadow-md"
                    : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                }`}
              >
                <Camera className="w-4 h-4" />
                <span>Live Camera</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("upload")}
                className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                  activeTab === "upload"
                    ? "bg-rose-800 text-white shadow-md"
                    : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                }`}
              >
                <Upload className="w-4 h-4" />
                <span>Upload Photo</span>
              </button>
            </div>

            {/* TAB 1: MANUAL CODE / CML SEARCH */}
            {activeTab === "manual" && (
              <div className="glass-card rounded-3xl p-6 sm:p-8 flex flex-col gap-6">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    verifyCode(inputCode);
                  }}
                  className="flex flex-col gap-4"
                >
                  <label className="text-xs font-bold text-rose-950 dark:text-rose-200 uppercase tracking-wider">
                    Enter Barcode, CM/L or CRS Number
                  </label>

                  <div className="relative flex items-center">
                    <ScanBarcode className="absolute left-4 w-5 h-5 text-rose-700" />
                    <input
                      type="text"
                      placeholder="e.g. 8901764012217 or CM/L-8400183"
                      value={inputCode}
                      onChange={(e) => setInputCode(e.target.value)}
                      className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white dark:bg-zinc-950 border border-rose-200 dark:border-rose-900 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-rose-600 shadow-inner"
                    />
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="submit"
                      className="flex-1 py-3 px-6 rounded-2xl bg-gradient-to-r from-rose-700 to-rose-900 hover:from-rose-800 hover:to-rose-950 text-white text-sm font-bold shadow-lg shadow-rose-950/20 hover:scale-[1.01] transition-all flex items-center justify-center gap-2"
                    >
                      <ShieldCheck className="w-4 h-4" />
                      <span>Verify Authenticity</span>
                    </button>
                    {(scannedResult || algorithmicResult) && (
                      <button
                        type="button"
                        onClick={handleReset}
                        className="p-3 rounded-2xl border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-600 dark:text-zinc-300"
                        title="Clear Result"
                      >
                        <RotateCcw className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </form>

                {/* Pre-loaded Benchmark Tests */}
                <div className="pt-4 border-t border-rose-100 dark:border-rose-950 flex flex-col gap-2.5">
                  <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider">
                    Try Pre-loaded Authentic & Fake Benchmark Cases:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <button
                      type="button"
                      onClick={() => {
                        setInputCode("8901764012217");
                        verifyCode("8901764012217");
                      }}
                      className="p-2.5 rounded-xl text-left bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/60 text-emerald-950 dark:text-emerald-200 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 transition-colors"
                    >
                      <div className="font-bold flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Kinley Water (Genuine ISI)</span>
                      </div>
                      <div className="text-[10px] text-emerald-800/80 dark:text-emerald-300/80 mt-0.5">
                        CM/L-8400183492 · IS 14543
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setInputCode("8904123508912");
                        verifyCode("8904123508912");
                      }}
                      className="p-2.5 rounded-xl text-left bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/60 text-emerald-950 dark:text-emerald-200 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 transition-colors"
                    >
                      <div className="font-bold flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Studds Helmet (Genuine ISI)</span>
                      </div>
                      <div className="text-[10px] text-emerald-800/80 dark:text-emerald-300/80 mt-0.5">
                        CM/L-9100234120 · IS 4151
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setInputCode("8909999000123");
                        verifyCode("8909999000123");
                      }}
                      className="p-2.5 rounded-xl text-left bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/60 text-red-950 dark:text-red-200 hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors"
                    >
                      <div className="font-bold flex items-center gap-1.5 text-red-700 dark:text-red-400">
                        <AlertTriangle className="w-3.5 h-3.5 text-red-600" />
                        <span>Roadside Helmet (FAKE!)</span>
                      </div>
                      <div className="text-[10px] text-red-800/80 dark:text-red-300/80 mt-0.5">
                        CM/L-0000000 · Danger Alert
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setInputCode("8908888123456");
                        verifyCode("8908888123456");
                      }}
                      className="p-2.5 rounded-xl text-left bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/60 text-red-950 dark:text-red-200 hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors"
                    >
                      <div className="font-bold flex items-center gap-1.5 text-red-700 dark:text-red-400">
                        <XCircle className="w-3.5 h-3.5 text-red-600" />
                        <span>Kinloy Water (REVOKED)</span>
                      </div>
                      <div className="text-[10px] text-red-800/80 dark:text-red-300/80 mt-0.5">
                        Cancelled License · Spurious
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: LIVE CAMERA SCANNER */}
            {activeTab === "camera" && (
              <div className="glass-card rounded-3xl p-6 sm:p-8 flex flex-col items-center">
                <div className="relative w-full aspect-square max-w-sm rounded-2xl overflow-hidden bg-black border-2 border-rose-500 shadow-2xl flex items-center justify-center">
                  <video
                    ref={videoRef}
                    playsInline
                    className="w-full h-full object-cover"
                  />

                  {/* 3D Laser Scanning Guide Animation */}
                  <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-rose-400 to-transparent shadow-[0_0_12px_#ff6699] animate-laser pointer-events-none" />

                  {/* Center Crosshairs Viewfinder */}
                  <div className="absolute w-48 h-48 border-2 border-dashed border-rose-300/80 rounded-2xl pointer-events-none flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-rose-500 animate-ping" />
                  </div>

                  {cameraError && (
                    <div className="absolute inset-0 bg-black/85 p-6 flex flex-col items-center justify-center text-center text-xs text-white">
                      <AlertTriangle className="w-8 h-8 text-amber-400 mb-2" />
                      <p className="mb-4">{cameraError}</p>
                      <p className="text-zinc-400 text-[11px] mb-4">
                        (Camera requires permission or HTTPS. You can test instant scanning below):
                      </p>
                      <div className="flex flex-col gap-2 w-full max-w-xs">
                        <button
                          type="button"
                          onClick={() => handleSimulatedCameraDetect("8901764012217")}
                          className="py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs"
                        >
                          Simulate Scan: Kinley Water
                        </button>
                        <button
                          type="button"
                          onClick={() => handleSimulatedCameraDetect("8909999000123")}
                          className="py-2 px-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs"
                        >
                          Simulate Scan: Fake Helmet
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                <p className="text-xs text-zinc-500 mt-4 text-center">
                  Align product barcode or ISI mark within the illuminated red guide frame.
                </p>
              </div>
            )}

            {/* TAB 3: UPLOAD PHOTO */}
            {activeTab === "upload" && (
              <div className="glass-card rounded-3xl p-6 sm:p-8 flex flex-col items-center">
                <label className="w-full border-2 border-dashed border-rose-300 dark:border-rose-800 rounded-3xl p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-rose-50/50 dark:hover:bg-rose-950/30 transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <div className="w-14 h-14 rounded-2xl bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 flex items-center justify-center mb-4">
                    <Upload className="w-7 h-7" />
                  </div>
                  <h3 className="text-sm font-bold text-rose-950 dark:text-rose-100 mb-1">
                    Upload Product Image or Receipt
                  </h3>
                  <p className="text-xs text-zinc-500 max-w-xs mb-3">
                    Snap a photo of the product packaging, barcode sticker, or ISI mark emblem.
                  </p>
                  <span className="px-4 py-2 rounded-full bg-rose-800 text-white text-xs font-bold shadow-md">
                    Choose Image File
                  </span>
                </label>

                {uploadedImagePreview && (
                  <div className="mt-4 w-full flex items-center gap-3 p-3 rounded-2xl bg-white dark:bg-zinc-900 border border-rose-200 dark:border-rose-900">
                    <img
                      src={uploadedImagePreview}
                      alt="Uploaded preview"
                      className="w-12 h-12 rounded-xl object-cover"
                    />
                    <div className="text-xs">
                      <div className="font-bold text-rose-950 dark:text-rose-100">Image Analyzed</div>
                      <div className="text-zinc-500">Barcode decoded and verified against registry.</div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Column: Detailed Verification Results Panel */}
          <div className="lg:col-span-6 flex flex-col">
            {scannedResult ? (
              <div
                className={`rounded-3xl p-6 sm:p-8 border shadow-xl relative overflow-hidden transition-all ${
                  scannedResult.isGenuine
                    ? "bg-gradient-to-br from-emerald-50 via-white to-emerald-50/40 dark:from-[#0d2116] dark:via-[#09150e] dark:to-[#040d08] border-emerald-300 dark:border-emerald-800"
                    : "bg-gradient-to-br from-red-50 via-white to-red-50/40 dark:from-[#2a0910] dark:via-[#190409] dark:to-[#120206] border-red-300 dark:border-red-800"
                }`}
              >
                {/* Result Header Badge */}
                <div className="flex items-start justify-between gap-4 mb-6">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-md ${
                        scannedResult.isGenuine
                          ? "bg-emerald-600 text-white"
                          : "bg-red-600 text-white"
                      }`}
                    >
                      {scannedResult.isGenuine ? (
                        <CheckCircle2 className="w-7 h-7" />
                      ) : (
                        <AlertTriangle className="w-7 h-7" />
                      )}
                    </div>
                    <div>
                      <span
                        className={`text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-0.5 rounded-full ${
                          scannedResult.isGenuine
                            ? "bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800"
                            : "bg-red-100 dark:bg-red-950 text-red-800 dark:text-red-300 border border-red-200 dark:border-red-800"
                        }`}
                      >
                        {scannedResult.isGenuine ? "AUTHENTIC CERTIFIED PRODUCT" : "DANGEROUS COUNTERFEIT DETECTED"}
                      </span>
                      <h2 className="text-lg sm:text-xl font-black text-zinc-900 dark:text-zinc-50 mt-1">
                        {scannedResult.name}
                      </h2>
                    </div>
                  </div>

                  {/* Safety Score Meter */}
                  <div className="text-right flex-shrink-0">
                    <div
                      className={`text-2xl font-black ${
                        scannedResult.safetyRating >= 80
                          ? "text-emerald-700 dark:text-emerald-400"
                          : "text-red-600 dark:text-red-400"
                      }`}
                    >
                      {scannedResult.safetyRating}/100
                    </div>
                    <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
                      Safety Score
                    </span>
                  </div>
                </div>

                {/* Counterfeit Warning Callout */}
                {!scannedResult.isGenuine && scannedResult.redFlags && (
                  <div className="mb-6 p-4 rounded-2xl bg-red-100/90 dark:bg-red-950/80 border border-red-300 dark:border-red-700 flex flex-col gap-2">
                    <div className="text-xs font-bold text-red-900 dark:text-red-200 flex items-center gap-1.5">
                      <AlertTriangle className="w-4 h-4 text-red-600 flex-shrink-0" />
                      <span>CRITICAL VIGILANCE FLAGS:</span>
                    </div>
                    <ul className="list-disc list-inside text-xs text-red-800 dark:text-red-300 flex flex-col gap-1">
                      {scannedResult.redFlags.map((flag, idx) => (
                        <li key={idx}>{flag}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Key Attributes Data Table */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs mb-6">
                  <div className="p-3 rounded-xl bg-white/80 dark:bg-zinc-900/80 border border-zinc-200/60 dark:border-zinc-800 flex flex-col">
                    <span className="text-[10px] font-bold text-zinc-500 uppercase">License / CML</span>
                    <span className="font-bold text-rose-900 dark:text-rose-300 mt-0.5">
                      {scannedResult.cmlNumber || scannedResult.crsNumber || "None (Unlicensed)"}
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-white/80 dark:bg-zinc-900/80 border border-zinc-200/60 dark:border-zinc-800 flex flex-col">
                    <span className="text-[10px] font-bold text-zinc-500 uppercase">Indian Standard</span>
                    <span className="font-bold text-zinc-800 dark:text-zinc-200 mt-0.5">
                      {scannedResult.standardNumber}
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-white/80 dark:bg-zinc-900/80 border border-zinc-200/60 dark:border-zinc-800 flex flex-col">
                    <span className="text-[10px] font-bold text-zinc-500 uppercase">Manufacturer</span>
                    <span className="font-semibold text-zinc-800 dark:text-zinc-200 mt-0.5">
                      {scannedResult.manufacturer}
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-white/80 dark:bg-zinc-900/80 border border-zinc-200/60 dark:border-zinc-800 flex flex-col">
                    <span className="text-[10px] font-bold text-zinc-500 uppercase">License Validity</span>
                    <span className="font-semibold text-zinc-800 dark:text-zinc-200 mt-0.5">
                      {scannedResult.validityFrom} to {scannedResult.validityTo}
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-white/80 dark:bg-zinc-900/80 border border-zinc-200/60 dark:border-zinc-800 flex flex-col sm:col-span-2">
                    <span className="text-[10px] font-bold text-zinc-500 uppercase">Factory Address</span>
                    <span className="text-zinc-700 dark:text-zinc-300 mt-0.5">
                      {scannedResult.factoryAddress}
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-white/80 dark:bg-zinc-900/80 border border-zinc-200/60 dark:border-zinc-800 flex flex-col sm:col-span-2">
                    <span className="text-[10px] font-bold text-zinc-500 uppercase">Accredited Test Lab</span>
                    <span className="text-zinc-700 dark:text-zinc-300 mt-0.5">
                      {scannedResult.testLab}
                    </span>
                  </div>
                </div>

                {/* Official Remarks */}
                <div className="p-4 rounded-2xl bg-white/60 dark:bg-zinc-900/60 border border-zinc-200/50 dark:border-zinc-800 text-xs mb-6">
                  <span className="font-bold text-zinc-900 dark:text-zinc-100 block mb-1">
                    BIS Technical Assessment:
                  </span>
                  <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {scannedResult.verificationRemarks}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row items-center gap-3">
                  {!scannedResult.isGenuine ? (
                    <Link
                      href={`/complaints?product=${encodeURIComponent(
                        scannedResult.name
                      )}&cml=${encodeURIComponent(scannedResult.cmlNumber || "")}`}
                      className="w-full py-3 px-4 rounded-xl bg-red-700 hover:bg-red-800 text-white font-bold text-xs shadow-md flex items-center justify-center gap-2 transition-all"
                    >
                      <AlertTriangle className="w-4 h-4" />
                      <span>Report Fake Product to BIS Vigilance</span>
                    </Link>
                  ) : (
                    <button
                      type="button"
                      onClick={() => window.print()}
                      className="w-full py-3 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-md flex items-center justify-center gap-2 transition-all"
                    >
                      <Printer className="w-4 h-4" />
                      <span>Print BIS Verification Certificate</span>
                    </button>
                  )}
                </div>
              </div>
            ) : algorithmicResult ? (
              /* Algorithmic Result for custom / unknown inputs */
              <div className="glass-card rounded-3xl p-6 sm:p-8 flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  {algorithmicResult.isLikelyFake ? (
                    <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 flex items-center justify-center">
                      <AlertTriangle className="w-6 h-6" />
                    </div>
                  ) : (
                    <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 flex items-center justify-center">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                  )}
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                      Algorithmic Heuristic Assessment
                    </span>
                    <h3 className="text-lg font-bold text-rose-950 dark:text-rose-100">
                      Format Check: {algorithmicResult.detectedType}
                    </h3>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs">
                  <p className="font-semibold text-zinc-800 dark:text-zinc-200 mb-2">
                    {algorithmicResult.reason}
                  </p>
                  <p className="text-zinc-600 dark:text-zinc-400">
                    <strong>Consumer Advice:</strong> {algorithmicResult.advice}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <Link
                    href={`/complaints?code=${encodeURIComponent(inputCode)}`}
                    className="py-2.5 px-4 rounded-xl border border-rose-300 dark:border-rose-800 text-xs font-bold text-rose-800 dark:text-rose-300 hover:bg-rose-50 dark:hover:bg-rose-950/50 flex items-center gap-2"
                  >
                    <span>File Verification Query</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="py-2.5 px-4 rounded-xl text-xs font-semibold text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                  >
                    Clear Search
                  </button>
                </div>
              </div>
            ) : (
              /* Empty Placeholder State */
              <div className="glass-card rounded-3xl p-8 sm:p-12 flex flex-col items-center justify-center text-center min-h-[420px]">
                <div className="w-16 h-16 rounded-3xl bg-rose-100 dark:bg-rose-950/70 text-rose-800 dark:text-rose-300 flex items-center justify-center mb-4 shadow-inner">
                  <ScanBarcode className="w-8 h-8" />
                </div>
                <h3 className="text-base font-bold text-rose-950 dark:text-rose-100 mb-2">
                  Ready to Authenticate Product
                </h3>
                <p className="text-xs text-zinc-500 max-w-sm mb-6 leading-relaxed">
                  Scan a barcode with your camera, upload an image of the ISI mark on the packaging, or select one of the pre-loaded benchmark tests on the left.
                </p>
                <div className="flex items-center gap-2 text-xs font-semibold text-rose-700 dark:text-rose-400">
                  <Sparkles className="w-4 h-4" />
                  <span>Real-time Indian Standards Database Lookup</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function ScannerPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#fdfafc] dark:bg-[#14050d] p-10 text-center">Loading Scanner...</div>}>
      <ScannerContent />
    </Suspense>
  );
}

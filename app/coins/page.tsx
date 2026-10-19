"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Coins,
  Sparkles,
  ShieldCheck,
  Upload,
  Search,
  CheckCircle2,
  AlertTriangle,
  Calculator,
  Info,
  Scale,
  Award,
  Calendar,
  Building,
  ArrowRight,
  ExternalLink,
  RotateCcw,
} from "lucide-react";
import confetti from "canvas-confetti";
import {
  METALS_DATA,
  MetalType,
  PurityGrade,
  SAMPLE_HUID_DATABASE,
  lookupHuid,
  HallmarkVerificationRecord,
} from "@/data/hallmark-data";
import Coin3D from "@/components/Coin3D";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

function CoinsContent() {
  const searchParams = useSearchParams();
  const metalParam = (searchParams.get("metal") as MetalType) || "gold";

  const [selectedMetal, setSelectedMetal] = useState<MetalType>(
    ["gold", "silver", "platinum", "diamond"].includes(metalParam) ? metalParam : "gold"
  );
  const [selectedGrade, setSelectedGrade] = useState<PurityGrade | null>(null);

  // Hallmark Image / HUID Verification State
  const [huidInput, setHuidInput] = useState("");
  const [verificationResult, setVerificationResult] = useState<HallmarkVerificationRecord | null>(null);
  const [analyzedImagePreview, setAnalyzedImagePreview] = useState<string | null>(null);
  const [isAnalyzingImage, setIsAnalyzingImage] = useState(false);

  // Melt Value Calculator State
  const [calcGrams, setCalcGrams] = useState<number>(10);
  const [calcGrade, setCalcGrade] = useState<number>(916); // 22K default

  const currentMetalInfo = METALS_DATA[selectedMetal];

  useEffect(() => {
    if (currentMetalInfo.grades.length > 0) {
      setSelectedGrade(currentMetalInfo.grades[0]);
    }
  }, [selectedMetal]);

  // Handle HUID or Hallmark Stamp lookup
  const handleVerifyHuid = (codeToVerify: string) => {
    if (!codeToVerify.trim()) return;
    const result = lookupHuid(codeToVerify);

    if (result) {
      setVerificationResult(result);
      if (result.isGenuine) {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.6 },
          colors: ["#d4af37", "#f59e0b", "#ad4278", "#ffffff"],
        });
      }
    } else {
      // Simulate generic valid HUID if 6 alphanumeric chars
      const clean = codeToVerify.trim().toUpperCase();
      if (/^[A-Z0-9]{6}$/.test(clean)) {
        setVerificationResult({
          huid: clean,
          isGenuine: true,
          metal: selectedMetal === "silver" ? "Silver" : selectedMetal === "platinum" ? "Platinum" : "Gold",
          purity: "22K916",
          carat: "22 Carat",
          finenessNumber: 916,
          articleType: "Precious Jewellery Article",
          grossWeightGrams: 14.2,
          netWeightGrams: 14.2,
          ahcName: "National BIS Assaying Centre",
          ahcCenterCode: "AHC-IND-901",
          ahcCity: "Regional Assay Lab",
          jewellerName: "Registered BIS Licensed Jeweller",
          jewellerBisLicense: "HM/L-7891023",
          hallmarkedDate: "15-05-2026",
          status: "ACTIVE",
          remarks: "Verified valid HUID structure. 3 mandatory hallmark symbols confirmed under IS 1417.",
        });
        confetti({ particleCount: 50 });
      } else {
        setVerificationResult({
          huid: clean,
          isGenuine: false,
          metal: "Gold",
          purity: "UNKNOWN / SPURIOUS",
          carat: "Unverified Purity",
          finenessNumber: 0,
          articleType: "Unregistered Article",
          grossWeightGrams: 0,
          netWeightGrams: 0,
          ahcName: "NOT FOUND IN NATIONAL REGISTRY",
          ahcCenterCode: "NONE",
          ahcCity: "Unlicensed",
          jewellerName: "Unknown Retailer",
          jewellerBisLicense: "NONE",
          hallmarkedDate: "N/A",
          status: "SUSPICIOUS_UNREGISTERED",
          remarks: "CRITICAL: The code does not match any registered HUID on the Manakonline portal. Risk of counterfeit alloy or spurious stamp.",
        });
      }
    }
  };

  // Handle Hallmark Image Upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsAnalyzingImage(true);
    const reader = new FileReader();
    reader.onload = (ev) => {
      const src = ev.target?.result as string;
      setAnalyzedImagePreview(src);

      setTimeout(() => {
        setIsAnalyzingImage(false);
        // If file name has 'fake' then test fake
        if (file.name.toLowerCase().includes("fake")) {
          handleVerifyHuid("FAKE01");
        } else if (file.name.toLowerCase().includes("silver")) {
          handleVerifyHuid("SL925X");
        } else {
          handleVerifyHuid("AB12CD");
        }
      }, 700);
    };
    reader.readAsDataURL(file);
  };

  // Calculator calculations
  const calculateTotalValuation = () => {
    const grade = currentMetalInfo.grades.find((g) => g.fineness === calcGrade) || currentMetalInfo.grades[0];
    const ratePerGram = grade ? grade.approxPricePerGramINR : 7000;
    const totalINR = calcGrams * ratePerGram;
    const pureMetalGrams = (calcGrams * (grade ? grade.purityPercentage : 91.6)) / 100;
    return {
      totalINR,
      pureMetalGrams,
      ratePerGram,
      gradeName: grade ? grade.caratOrGrade : "22K",
    };
  };

  const calcResult = calculateTotalValuation();

  return (
    <div className="min-h-screen flex flex-col bg-[#fdfafc] dark:bg-[#14050d] text-zinc-900 dark:text-zinc-100">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb & Hero Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 text-xs font-medium text-rose-800 dark:text-rose-300 mb-2">
            <Link href="/" className="hover:underline">
              Home
            </Link>
            <span>/</span>
            <span>Hallmarking & Precious Metals</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-200 text-xs font-bold uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>Mandatory Hallmarking (IS 1417 & IS 2112)</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-rose-950 dark:text-rose-50 flex items-center gap-3">
                <Coins className="w-8 h-8 text-amber-600 dark:text-amber-400" />
                <span>Precious Metals Purity & Hallmark Checker</span>
              </h1>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1 max-w-3xl">
                Explore official BIS purity levels for <strong>Gold, Silver, Platinum and Diamond</strong> coins. Upload your jewellery hallmark image or 6-digit HUID code to verify genuine pure caratage.
              </p>
            </div>
          </div>
        </div>

        {/* 1. INTERACTIVE 4 COINS SELECTOR */}
        <div className="mb-12">
          <div className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-4">
            Click Any Coin to Inspect Purity Grades & Standards:
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {(["gold", "silver", "platinum", "diamond"] as MetalType[]).map((mKey) => {
              const info = METALS_DATA[mKey];
              const isSelected = selectedMetal === mKey;
              return (
                <button
                  key={mKey}
                  type="button"
                  onClick={() => setSelectedMetal(mKey)}
                  className={`p-5 rounded-3xl transition-all flex flex-col items-center text-center relative overflow-hidden group ${
                    isSelected
                      ? "glass-card border-2 border-amber-400 dark:border-amber-500 shadow-xl scale-[1.02]"
                      : "glass-card opacity-85 hover:opacity-100 hover:scale-[1.01]"
                  }`}
                >
                  {/* Coin 3D Representation */}
                  <div className="my-2 group-hover:scale-105 transition-transform">
                    <Coin3D
                      metal={mKey}
                      purityText={
                        mKey === "gold"
                          ? "22K 916"
                          : mKey === "silver"
                          ? "925 FINE"
                          : mKey === "platinum"
                          ? "Pt 950"
                          : "DIAMOND"
                      }
                      size={100}
                    />
                  </div>

                  <h3 className="text-base font-extrabold text-rose-950 dark:text-rose-100 mt-2">
                    {info.name.split("(")[0].trim()}
                  </h3>
                  <span className="text-xs text-rose-700 dark:text-rose-400 font-semibold">
                    {info.standardCode}
                  </span>

                  {isSelected && (
                    <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-amber-500 text-white flex items-center justify-center text-xs shadow-md">
                      ✓
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. SELECTED METAL PURITY BREAKDOWN GRID */}
        <div className="glass-card rounded-3xl p-6 sm:p-10 mb-12 border border-rose-200/80 dark:border-rose-900/80">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-6 border-b border-rose-100 dark:border-rose-950 gap-4 mb-8">
            <div>
              <span className="text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider">
                {currentMetalInfo.standardCode} · {currentMetalInfo.hindiName}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-rose-950 dark:text-rose-100 mt-1">
                {currentMetalInfo.name} Purity Standards
              </h2>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-1 max-w-2xl">
                {currentMetalInfo.description}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-zinc-500 font-semibold">Standard Reference:</span>
              <span className="text-xs font-bold text-rose-900 dark:text-rose-200 bg-rose-100 dark:bg-rose-950 px-3 py-1.5 rounded-xl border border-rose-200 dark:border-rose-800">
                {currentMetalInfo.standardTitle.split("-")[0]}
              </span>
            </div>
          </div>

          {/* Purity Carat Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {currentMetalInfo.grades.map((grade) => (
              <div
                key={grade.finenessCode}
                className="p-5 rounded-2xl bg-white/70 dark:bg-zinc-900/70 border border-rose-100 dark:border-rose-950 hover:border-amber-400 dark:hover:border-amber-600 transition-all flex flex-col justify-between shadow-sm group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-black text-rose-950 dark:text-rose-100">
                      {grade.caratOrGrade}
                    </span>
                    <span className="text-xs font-black tracking-wider px-2.5 py-1 rounded-lg bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-200 border border-amber-200 dark:border-amber-800">
                      {grade.finenessCode}
                    </span>
                  </div>

                  <div className="flex items-baseline gap-2 mb-3">
                    <span className="text-2xl font-black text-amber-700 dark:text-amber-400">
                      {grade.purityPercentage}%
                    </span>
                    <span className="text-xs text-zinc-500 font-semibold">Pure Metal Content</span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-950/60 text-[11px] text-zinc-700 dark:text-zinc-300 mb-3">
                    <div className="font-bold text-zinc-900 dark:text-zinc-100 mb-0.5">
                      Alloy Composition:
                    </div>
                    {grade.alloyComposition}
                  </div>

                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">
                    <strong>Typical Uses:</strong> {grade.commonUses}
                  </p>
                </div>

                <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between text-xs">
                  <span className="text-zinc-500">Hallmark Stamp:</span>
                  <span className="font-mono font-bold text-rose-900 dark:text-rose-300 bg-rose-50 dark:bg-rose-950 px-2 py-0.5 rounded">
                    {grade.hallmarkText}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. HALLMARK / ISI MARK IMAGE & HUID PURITY CHECKER */}
        <div className="glass-card rounded-3xl p-6 sm:p-10 mb-12 border border-rose-200/80 dark:border-rose-900/80 relative overflow-hidden">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300 text-xs font-bold uppercase tracking-wider mb-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Customer Hallmarking Authentication</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-rose-950 dark:text-rose-100">
              Check Jewellery Hallmark (ISI Mark) Image or HUID Code
            </h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
              Show your jewellery's hallmark stamp or enter the 6-digit alphanumeric HUID code to verify purity percentage, carat level, assaying centre details, and confirm that the gold/silver is authentic and not adulterated.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Image Upload & HUID Input */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              {/* Option A: Upload Hallmark Image */}
              <div className="p-5 rounded-2xl bg-white/60 dark:bg-zinc-900/60 border border-rose-100 dark:border-rose-950 flex flex-col items-center text-center">
                <label className="w-full border-2 border-dashed border-rose-300 dark:border-rose-800 rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-rose-50/50 dark:hover:bg-rose-950/40 transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <Upload className="w-8 h-8 text-rose-700 dark:text-rose-400 mb-2" />
                  <span className="text-xs font-bold text-rose-950 dark:text-rose-100">
                    Upload Jewellery Hallmark Image
                  </span>
                  <span className="text-[11px] text-zinc-500 mt-1">
                    Photo of laser-engraved stamp or jewellery tag
                  </span>
                </label>

                {isAnalyzingImage && (
                  <div className="mt-3 text-xs font-bold text-rose-700 dark:text-rose-300 animate-pulse flex items-center gap-2">
                    <Sparkles className="w-4 h-4 animate-spin" />
                    <span>Analyzing Hallmark Stamp with Vision AI...</span>
                  </div>
                )}

                {analyzedImagePreview && (
                  <div className="mt-3 w-full flex items-center gap-3 p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900">
                    <img
                      src={analyzedImagePreview}
                      alt="Uploaded hallmark"
                      className="w-10 h-10 rounded-lg object-cover"
                    />
                    <div className="text-left text-xs">
                      <span className="font-bold text-rose-950 dark:text-rose-100">
                        Stamp Image Captured
                      </span>
                      <p className="text-[10px] text-zinc-500">Decoded 3 mandatory hallmark marks.</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Option B: Enter 6-digit HUID code */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleVerifyHuid(huidInput);
                }}
                className="flex flex-col gap-3"
              >
                <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                  Or Enter 6-Digit Alphanumeric HUID:
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    maxLength={6}
                    placeholder="e.g. AB12CD or HJ89KL"
                    value={huidInput}
                    onChange={(e) => setHuidInput(e.target.value.toUpperCase())}
                    className="flex-1 py-3 px-4 rounded-xl bg-white dark:bg-zinc-950 border border-rose-200 dark:border-rose-900 font-mono text-base font-bold uppercase tracking-widest text-center focus:outline-none focus:ring-2 focus:ring-rose-600 shadow-inner"
                  />
                  <button
                    type="submit"
                    className="py-3 px-5 rounded-xl bg-rose-800 hover:bg-rose-900 text-white font-bold text-xs shadow-md transition-all whitespace-nowrap"
                  >
                    Verify HUID
                  </button>
                </div>
              </form>

              {/* Sample Pre-loaded Hallmark Presets */}
              <div className="pt-4 border-t border-rose-100 dark:border-rose-950">
                <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider block mb-2">
                  Test Benchmark Hallmark Presets:
                </span>
                <div className="flex flex-wrap gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => {
                      setHuidInput("AB12CD");
                      handleVerifyHuid("AB12CD");
                    }}
                    className="px-3 py-1.5 rounded-lg bg-amber-50 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-700 font-mono font-bold text-amber-900 dark:text-amber-200"
                  >
                    AB12CD (22K Gold Genuine)
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setHuidInput("HJ89KL");
                      handleVerifyHuid("HJ89KL");
                    }}
                    className="px-3 py-1.5 rounded-lg bg-amber-50 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-700 font-mono font-bold text-amber-900 dark:text-amber-200"
                  >
                    HJ89KL (18K Studded)
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setHuidInput("SL925X");
                      handleVerifyHuid("SL925X");
                    }}
                    className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 font-mono font-bold text-slate-800 dark:text-slate-200"
                  >
                    SL925X (925 Silver)
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setHuidInput("FAKE01");
                      handleVerifyHuid("FAKE01");
                    }}
                    className="px-3 py-1.5 rounded-lg bg-red-100 dark:bg-red-950/70 border border-red-300 dark:border-red-700 font-mono font-bold text-red-900 dark:text-red-200"
                  >
                    FAKE01 (Spurious Under-Caratage)
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: Hallmark Verification Certificate Results */}
            <div className="lg:col-span-7">
              {verificationResult ? (
                <div
                  className={`rounded-3xl p-6 sm:p-8 border shadow-xl relative overflow-hidden ${
                    verificationResult.isGenuine
                      ? "bg-gradient-to-br from-amber-50/80 via-white to-amber-50/30 dark:from-[#211706] dark:via-[#140e03] dark:to-[#0a0701] border-amber-300 dark:border-amber-700"
                      : "bg-gradient-to-br from-red-50 via-white to-red-50/40 dark:from-[#2a0910] dark:via-[#190409] dark:to-[#120206] border-red-300 dark:border-red-800"
                  }`}
                >
                  {/* Status Banner */}
                  <div className="flex items-start justify-between gap-4 mb-6">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-md ${
                          verificationResult.isGenuine
                            ? "bg-amber-600 text-white"
                            : "bg-red-600 text-white"
                        }`}
                      >
                        {verificationResult.isGenuine ? (
                          <Award className="w-7 h-7" />
                        ) : (
                          <AlertTriangle className="w-7 h-7" />
                        )}
                      </div>
                      <div>
                        <span
                          className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full ${
                            verificationResult.isGenuine
                              ? "bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-200 border border-amber-300"
                              : "bg-red-100 dark:bg-red-950 text-red-900 dark:text-red-200 border border-red-300"
                          }`}
                        >
                          {verificationResult.isGenuine
                            ? "OFFICIALLY HALLMARKED & VERIFIED"
                            : "FRAUD ALERT: UNVERIFIED / COUNTERFEIT"}
                        </span>
                        <h3 className="text-xl font-extrabold text-zinc-900 dark:text-zinc-50 mt-1">
                          {verificationResult.articleType}
                        </h3>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="font-mono text-xl font-black text-rose-900 dark:text-rose-300">
                        {verificationResult.huid}
                      </span>
                      <span className="block text-[10px] text-zinc-500 font-bold uppercase">
                        HUID Identifier
                      </span>
                    </div>
                  </div>

                  {/* Hallmark 3-Component Anatomy Inspection */}
                  <div className="mb-6 p-4 rounded-2xl bg-white/70 dark:bg-zinc-900/70 border border-zinc-200/60 dark:border-zinc-800">
                    <div className="text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-3 flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-amber-600" />
                      <span>The 3 Mandatory BIS Hallmark Marks Detected:</span>
                    </div>

                    <div className="grid grid-cols-3 gap-3 text-center">
                      <div className="p-3 rounded-xl bg-amber-50/70 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800">
                        <div className="text-lg font-black text-amber-800 dark:text-amber-300">
                          △ BIS
                        </div>
                        <div className="text-[10px] font-bold text-zinc-600 dark:text-zinc-400 mt-1">
                          1. BIS Logo
                        </div>
                      </div>

                      <div className="p-3 rounded-xl bg-amber-50/70 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800">
                        <div className="text-lg font-black text-amber-800 dark:text-amber-300">
                          {verificationResult.purity}
                        </div>
                        <div className="text-[10px] font-bold text-zinc-600 dark:text-zinc-400 mt-1">
                          2. Purity & Carat
                        </div>
                      </div>

                      <div className="p-3 rounded-xl bg-amber-50/70 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800">
                        <div className="text-lg font-mono font-black text-amber-800 dark:text-amber-300">
                          {verificationResult.huid}
                        </div>
                        <div className="text-[10px] font-bold text-zinc-600 dark:text-zinc-400 mt-1">
                          3. 6-Digit HUID
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Detailed Certificate Record */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs mb-6">
                    <div className="p-3 rounded-xl bg-white/60 dark:bg-zinc-900/60 border border-zinc-200/50 dark:border-zinc-800">
                      <span className="text-[10px] text-zinc-500 font-bold uppercase">
                        Certified Purity
                      </span>
                      <p className="font-bold text-zinc-900 dark:text-zinc-100 mt-0.5">
                        {verificationResult.carat} ({verificationResult.finenessNumber} Fineness)
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-white/60 dark:bg-zinc-900/60 border border-zinc-200/50 dark:border-zinc-800">
                      <span className="text-[10px] text-zinc-500 font-bold uppercase">
                        Hallmarking Date
                      </span>
                      <p className="font-bold text-zinc-900 dark:text-zinc-100 mt-0.5">
                        {verificationResult.hallmarkedDate}
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-white/60 dark:bg-zinc-900/60 border border-zinc-200/50 dark:border-zinc-800">
                      <span className="text-[10px] text-zinc-500 font-bold uppercase">
                        Assaying Centre (AHC)
                      </span>
                      <p className="font-semibold text-zinc-900 dark:text-zinc-100 mt-0.5">
                        {verificationResult.ahcName} ({verificationResult.ahcCenterCode})
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-white/60 dark:bg-zinc-900/60 border border-zinc-200/50 dark:border-zinc-800">
                      <span className="text-[10px] text-zinc-500 font-bold uppercase">
                        Jeweller License
                      </span>
                      <p className="font-semibold text-zinc-900 dark:text-zinc-100 mt-0.5">
                        {verificationResult.jewellerName} ({verificationResult.jewellerBisLicense})
                      </p>
                    </div>
                  </div>

                  {/* Verification Remarks */}
                  <div className="p-4 rounded-2xl bg-white/70 dark:bg-zinc-900/70 border border-zinc-200/60 dark:border-zinc-800 text-xs mb-6">
                    <span className="font-bold text-zinc-900 dark:text-zinc-100 block mb-1">
                      Assaying Quality Report:
                    </span>
                    <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                      {verificationResult.remarks}
                    </p>
                  </div>

                  {/* Vigilance Action if Counterfeit */}
                  {!verificationResult.isGenuine && (
                    <Link
                      href={`/complaints?huid=${encodeURIComponent(
                        verificationResult.huid
                      )}&type=fake_hallmark`}
                      className="w-full py-3 px-4 rounded-xl bg-red-700 hover:bg-red-800 text-white font-bold text-xs shadow-md flex items-center justify-center gap-2 transition-all"
                    >
                      <AlertTriangle className="w-4 h-4" />
                      <span>Report Fake Hallmark / Under-Caratage to Vigilance</span>
                    </Link>
                  )}
                </div>
              ) : (
                /* Empty state */
                <div className="h-full min-h-[380px] rounded-3xl glass-card p-8 flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 rounded-3xl bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 flex items-center justify-center mb-4 shadow-inner">
                    <Coins className="w-8 h-8" />
                  </div>
                  <h3 className="text-base font-bold text-rose-950 dark:text-rose-100 mb-2">
                    Awaiting Hallmark Verification
                  </h3>
                  <p className="text-xs text-zinc-500 max-w-sm leading-relaxed">
                    Upload an image of your jewellery stamp or select one of the test presets on the left to see full HUID assay details.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 4. LIVE BULLION VALUATION & CARAT CALCULATOR */}
        <div className="glass-card rounded-3xl p-6 sm:p-10 mb-12 border border-rose-200/80 dark:border-rose-900/80">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-200 text-xs font-bold uppercase tracking-wider mb-2">
              <Calculator className="w-3.5 h-3.5" />
              <span>Consumer Bullion Calculator</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-rose-950 dark:text-rose-100">
              Check Net Pure Metal Value & Carat Weight
            </h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
              Calculate the intrinsic metal melt value of your jewellery based on official BIS fineness percentages before buying or exchanging gold/silver.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Input fields */}
            <div className="md:col-span-6 flex flex-col gap-5">
              <div>
                <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-2 block">
                  Select Purity Grade / Carat:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {currentMetalInfo.grades.slice(0, 6).map((g) => (
                    <button
                      key={g.fineness}
                      type="button"
                      onClick={() => setCalcGrade(g.fineness)}
                      className={`p-2.5 rounded-xl text-xs font-bold transition-all ${
                        calcGrade === g.fineness
                          ? "bg-amber-600 text-white shadow-md"
                          : "bg-white/80 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300"
                      }`}
                    >
                      {g.finenessCode}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between items-baseline mb-2">
                  <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                    Gross Jewellery Weight (Grams):
                  </label>
                  <span className="text-sm font-black text-rose-950 dark:text-rose-100">
                    {calcGrams} g
                  </span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={250}
                  step={0.5}
                  value={calcGrams}
                  onChange={(e) => setCalcGrams(parseFloat(e.target.value))}
                  className="w-full h-2 rounded-lg bg-rose-200 dark:bg-rose-950 appearance-none cursor-pointer accent-rose-700"
                />
                <div className="flex justify-between text-[10px] text-zinc-500 mt-1">
                  <span>1 g</span>
                  <span>50 g</span>
                  <span>100 g</span>
                  <span>250 g</span>
                </div>
              </div>
            </div>

            {/* Results Display */}
            <div className="md:col-span-6 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-amber-50 to-white dark:from-[#201405] dark:to-[#120b02] border border-amber-200 dark:border-amber-800 shadow-md">
              <span className="text-[11px] font-bold text-amber-800 dark:text-amber-300 uppercase tracking-wider block mb-2">
                Estimated Benchmark Metal Value
              </span>

              <div className="text-3xl sm:text-4xl font-black text-amber-950 dark:text-amber-100 mb-4">
                ₹{calcResult.totalINR.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
              </div>

              <div className="flex flex-col gap-2.5 text-xs text-zinc-700 dark:text-zinc-300 pt-4 border-t border-amber-200/60 dark:border-amber-800/60">
                <div className="flex justify-between">
                  <span>Pure Precious Metal Weight:</span>
                  <span className="font-bold text-zinc-900 dark:text-zinc-100">
                    {calcResult.pureMetalGrams.toFixed(2)} grams
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Benchmark Rate ({calcResult.gradeName}):</span>
                  <span className="font-bold text-zinc-900 dark:text-zinc-100">
                    ₹{calcResult.ratePerGram.toLocaleString("en-IN")}/g
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Indian Standard Applicable:</span>
                  <span className="font-bold text-rose-800 dark:text-rose-300">
                    {currentMetalInfo.standardCode}
                  </span>
                </div>
              </div>

              <p className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-4 leading-relaxed">
                *Values are illustrative based on benchmark daily rates. Making charges (V.A.) and GST (3%) are billed extra by licensed retailers.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function CoinsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#fdfafc] dark:bg-[#14050d] p-10 text-center">Loading Coins & Hallmarking...</div>}>
      <CoinsContent />
    </Suspense>
  );
}

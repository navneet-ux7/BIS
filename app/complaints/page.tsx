"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  AlertCircle,
  ShieldAlert,
  Send,
  Search,
  CheckCircle2,
  Clock,
  Phone,
  Mail,
  Building,
  Upload,
  FileText,
  AlertTriangle,
  RotateCcw,
} from "lucide-react";
import confetti from "canvas-confetti";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

function ComplaintsContent() {
  const searchParams = useSearchParams();
  const prefillProduct = searchParams.get("product") || "";
  const prefillCml = searchParams.get("cml") || "";
  const prefillHuid = searchParams.get("huid") || "";
  const prefillType = searchParams.get("type") || "fake_isi";

  const [activeTab, setActiveTab] = useState<"file" | "track">("file");

  // Form State
  const [complaintType, setComplaintType] = useState(
    prefillHuid ? "fake_hallmark" : prefillType === "fake_hallmark" ? "fake_hallmark" : "fake_isi"
  );
  const [productName, setProductName] = useState(prefillProduct);
  const [cmlOrHuid, setCmlOrHuid] = useState(prefillCml || prefillHuid);
  const [shopName, setShopName] = useState("");
  const [cityState, setCityState] = useState("");
  const [defectDetails, setDefectDetails] = useState("");
  const [complainantName, setComplainantName] = useState("");
  const [complainantEmail, setComplainantEmail] = useState("");
  const [complainantPhone, setComplainantPhone] = useState("");

  // Submission Status
  const [generatedTicket, setGeneratedTicket] = useState<string | null>(null);
  const [trackingId, setTrackingId] = useState("");
  const [trackedStatus, setTrackedStatus] = useState<any | null>(null);

  const handleSubmitComplaint = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productName || !defectDetails || !complainantName) {
      alert("Please fill in the required fields: Product Name, Details, and Name.");
      return;
    }

    const randomTicket = `BIS-GRV-2026-${Math.floor(10000 + Math.random() * 90000)}`;
    setGeneratedTicket(randomTicket);

    confetti({
      particleCount: 60,
      spread: 60,
      origin: { y: 0.6 },
    });
  };

  const handleTrackTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingId.trim()) return;

    // Simulated tracking lifecycle
    setTrackedStatus({
      ticketId: trackingId.trim().toUpperCase(),
      product: "Packaged Drinking Water / Helmet / Jewellery",
      registeredDate: "18-10-2026",
      currentStage: "STAGE_3_LAB_TESTING",
      stages: [
        { name: "Complaint Registered & Triaged", completed: true, date: "18-10-2026" },
        { name: "Assigned to Regional Vigilance Officer", completed: true, date: "19-10-2026" },
        { name: "Mystery Purchase & Sample Seizure", completed: true, date: "19-10-2026" },
        { name: "Laboratory Testing at Central Lab Sahibabad", completed: false, inProgress: true, date: "Pending" },
        { name: "Enforcement Prosecution / Court Complaint", completed: false, date: "Pending" },
      ],
      officerNote:
        "Field inspection raid conducted at the suspected premises. Physical samples seized under Section 28 of BIS Act 2016.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fdfafc] dark:bg-[#14050d] text-zinc-900 dark:text-zinc-100">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb & Title */}
        <div className="mb-10">
          <div className="flex items-center gap-2 text-xs font-medium text-rose-800 dark:text-rose-300 mb-2">
            <Link href="/" className="hover:underline">
              Home
            </Link>
            <span>/</span>
            <span>Grievance & Vigilance Portal</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 dark:bg-red-950/80 text-red-800 dark:text-red-300 text-xs font-bold uppercase tracking-wider mb-2">
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>BIS Enforcement & Vigilance Directorate</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-rose-950 dark:text-rose-50 flex items-center gap-3">
                <span>Consumer Grievance & Vigilance Help</span>
              </h1>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1 max-w-3xl">
                Report misuse of the <strong>ISI Mark</strong>, substandard product quality, fake <strong>Hallmarking (under-caratage)</strong>, or track your existing grievance in real time.
              </p>
            </div>
          </div>
        </div>

        {/* Action Mode Tabs */}
        <div className="flex items-center gap-3 mb-8">
          <button
            type="button"
            onClick={() => setActiveTab("file")}
            className={`py-3 px-6 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
              activeTab === "file"
                ? "bg-rose-800 text-white shadow-lg shadow-rose-950/20"
                : "glass-card text-zinc-700 dark:text-zinc-300 hover:bg-rose-50 dark:hover:bg-rose-950"
            }`}
          >
            <AlertCircle className="w-4 h-4" />
            <span>File New Grievance</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("track")}
            className={`py-3 px-6 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
              activeTab === "track"
                ? "bg-rose-800 text-white shadow-lg shadow-rose-950/20"
                : "glass-card text-zinc-700 dark:text-zinc-300 hover:bg-rose-50 dark:hover:bg-rose-950"
            }`}
          >
            <Search className="w-4 h-4" />
            <span>Track Grievance Status</span>
          </button>
        </div>

        {/* WORK AREA */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          {/* Main Form or Tracking Status */}
          <div className="lg:col-span-8">
            {activeTab === "file" ? (
              generatedTicket ? (
                /* Ticket Success State */
                <div className="glass-card rounded-3xl p-8 sm:p-12 text-center flex flex-col items-center">
                  <div className="w-16 h-16 rounded-3xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 flex items-center justify-center mb-4 shadow-inner">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>
                  <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-widest px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950 border border-emerald-200 dark:border-emerald-800 mb-2">
                    Complaint Registered Successfully
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black text-rose-950 dark:text-rose-100 mb-2">
                    Grievance Ticket: {generatedTicket}
                  </h2>
                  <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 max-w-md mx-auto mb-6">
                    Your complaint has been forwarded to the <strong>BIS Vigilance Enforcement Cell</strong>. A confirmation SMS and email have been dispatched to {complainantEmail || complainantPhone || "your contact"}.
                  </p>

                  <div className="flex flex-col sm:flex-row items-center gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setTrackingId(generatedTicket);
                        setActiveTab("track");
                        handleTrackTicket({ preventDefault: () => {} } as any);
                      }}
                      className="py-3 px-6 rounded-xl bg-rose-800 hover:bg-rose-900 text-white font-bold text-xs shadow-md"
                    >
                      Track Live Investigation Progress
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setGeneratedTicket(null);
                        setProductName("");
                        setDefectDetails("");
                      }}
                      className="py-3 px-6 rounded-xl border border-zinc-300 dark:border-zinc-700 text-xs font-semibold"
                    >
                      File Another Complaint
                    </button>
                  </div>
                </div>
              ) : (
                /* Grievance Filing Form */
                <div className="glass-card rounded-3xl p-6 sm:p-10 border border-rose-200/80 dark:border-rose-900/80">
                  <h2 className="text-xl sm:text-2xl font-extrabold text-rose-950 dark:text-rose-100 mb-1">
                    Official Grievance Registration Form
                  </h2>
                  <p className="text-xs text-zinc-500 mb-6">
                    Information provided will be used by BIS Vigilance enforcement officers under strict statutory confidentiality.
                  </p>

                  <form onSubmit={handleSubmitComplaint} className="flex flex-col gap-5">
                    {/* Complaint Nature */}
                    <div>
                      <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-2 block">
                        Category of Violation:
                      </label>
                      <select
                        value={complaintType}
                        onChange={(e) => setComplaintType(e.target.value)}
                        className="w-full py-3 px-4 rounded-xl bg-white dark:bg-zinc-950 border border-rose-200 dark:border-rose-900 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-rose-600 shadow-inner"
                      >
                        <option value="fake_isi">Spurious / Counterfeit ISI Mark on Uncertified Product</option>
                        <option value="fake_hallmark">Fake Hallmarking / Under-Caratage Gold Jewellery (HUID Fraud)</option>
                        <option value="substandard_quality">Substandard Quality of Certified Product (Defect / Hazard)</option>
                        <option value="no_huid_invoice">Jeweller Refusing Invoice with 6-Digit HUID</option>
                        <option value="qco_violation">Sale of Mandatory QCO Product without BIS License</option>
                      </select>
                    </div>

                    {/* Product Name & Brand */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5 block">
                          Product Name & Brand *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Helmet, Packaged Drinking Water, Ring"
                          value={productName}
                          onChange={(e) => setProductName(e.target.value)}
                          className="w-full py-3 px-4 rounded-xl bg-white dark:bg-zinc-950 border border-rose-200 dark:border-rose-900 text-xs focus:outline-none focus:ring-2 focus:ring-rose-600"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5 block">
                          License CM/L or HUID Code (if displayed)
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. CM/L-0000000 or HUID AB12CD"
                          value={cmlOrHuid}
                          onChange={(e) => setCmlOrHuid(e.target.value)}
                          className="w-full py-3 px-4 rounded-xl bg-white dark:bg-zinc-950 border border-rose-200 dark:border-rose-900 text-xs focus:outline-none focus:ring-2 focus:ring-rose-600 font-mono"
                        />
                      </div>
                    </div>

                    {/* Retailer / Shop Details */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5 block">
                          Shop / Seller / Platform Name
                        </label>
                        <input
                          type="text"
                          placeholder="Store name or e-commerce seller"
                          value={shopName}
                          onChange={(e) => setShopName(e.target.value)}
                          className="w-full py-3 px-4 rounded-xl bg-white dark:bg-zinc-950 border border-rose-200 dark:border-rose-900 text-xs focus:outline-none focus:ring-2 focus:ring-rose-600"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5 block">
                          City, District & State
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Karol Bagh, New Delhi"
                          value={cityState}
                          onChange={(e) => setCityState(e.target.value)}
                          className="w-full py-3 px-4 rounded-xl bg-white dark:bg-zinc-950 border border-rose-200 dark:border-rose-900 text-xs focus:outline-none focus:ring-2 focus:ring-rose-600"
                        />
                      </div>
                    </div>

                    {/* Defect Description */}
                    <div>
                      <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5 block">
                        Detailed Description of Defect or Misuse *
                      </label>
                      <textarea
                        required
                        rows={4}
                        placeholder="Please describe how you identified the fake mark, chemical odor, physical fracture, missing HUID, or false claims..."
                        value={defectDetails}
                        onChange={(e) => setDefectDetails(e.target.value)}
                        className="w-full py-3 px-4 rounded-xl bg-white dark:bg-zinc-950 border border-rose-200 dark:border-rose-900 text-xs focus:outline-none focus:ring-2 focus:ring-rose-600"
                      />
                    </div>

                    {/* Complainant Contact */}
                    <div className="pt-4 border-t border-rose-100 dark:border-rose-950">
                      <span className="text-xs font-bold text-rose-950 dark:text-rose-200 uppercase tracking-wider block mb-3">
                        Complainant Information (Confidential)
                      </span>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <label className="text-xs text-zinc-600 dark:text-zinc-400 mb-1 block">Your Name *</label>
                          <input
                            type="text"
                            required
                            placeholder="Full Name"
                            value={complainantName}
                            onChange={(e) => setComplainantName(e.target.value)}
                            className="w-full py-2.5 px-3 rounded-xl bg-white dark:bg-zinc-950 border border-rose-200 dark:border-rose-900 text-xs"
                          />
                        </div>

                        <div>
                          <label className="text-xs text-zinc-600 dark:text-zinc-400 mb-1 block">Email</label>
                          <input
                            type="email"
                            placeholder="you@email.com"
                            value={complainantEmail}
                            onChange={(e) => setComplainantEmail(e.target.value)}
                            className="w-full py-2.5 px-3 rounded-xl bg-white dark:bg-zinc-950 border border-rose-200 dark:border-rose-900 text-xs"
                          />
                        </div>

                        <div>
                          <label className="text-xs text-zinc-600 dark:text-zinc-400 mb-1 block">Mobile (for OTP/SMS)</label>
                          <input
                            type="tel"
                            placeholder="10-digit mobile"
                            value={complainantPhone}
                            onChange={(e) => setComplainantPhone(e.target.value)}
                            className="w-full py-2.5 px-3 rounded-xl bg-white dark:bg-zinc-950 border border-rose-200 dark:border-rose-900 text-xs"
                          />
                        </div>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="mt-4 w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-rose-700 to-rose-900 hover:from-rose-800 hover:to-rose-950 text-white font-bold text-sm shadow-lg shadow-rose-950/20 hover:scale-[1.01] transition-all flex items-center justify-center gap-2"
                    >
                      <Send className="w-4 h-4" />
                      <span>Submit Grievance to BIS Vigilance</span>
                    </button>
                  </form>
                </div>
              )
            ) : (
              /* TRACK GRIEVANCE TAB */
              <div className="glass-card rounded-3xl p-6 sm:p-10 border border-rose-200/80 dark:border-rose-900/80">
                <h2 className="text-xl sm:text-2xl font-extrabold text-rose-950 dark:text-rose-100 mb-1">
                  Track Your Grievance Status
                </h2>
                <p className="text-xs text-zinc-500 mb-6">
                  Enter your 16-character Grievance Tracking Ticket (e.g. BIS-GRV-2026-89412) to see investigation logs.
                </p>

                <form onSubmit={handleTrackTicket} className="flex gap-2 mb-8">
                  <input
                    type="text"
                    required
                    placeholder="Enter Grievance Ticket ID..."
                    value={trackingId}
                    onChange={(e) => setTrackingId(e.target.value)}
                    className="flex-1 py-3 px-4 rounded-xl bg-white dark:bg-zinc-950 border border-rose-200 dark:border-rose-900 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-rose-600"
                  />
                  <button
                    type="submit"
                    className="py-3 px-6 rounded-xl bg-rose-800 hover:bg-rose-900 text-white text-xs font-bold shadow-md"
                  >
                    Track Status
                  </button>
                </form>

                {trackedStatus ? (
                  <div className="p-6 rounded-2xl bg-white/70 dark:bg-zinc-900/70 border border-rose-100 dark:border-rose-950 flex flex-col gap-6">
                    <div className="flex items-center justify-between pb-4 border-b border-zinc-200 dark:border-zinc-800">
                      <div>
                        <span className="text-[10px] font-bold text-zinc-500 uppercase">
                          Grievance Case
                        </span>
                        <h3 className="text-lg font-black text-rose-950 dark:text-rose-100">
                          {trackedStatus.ticketId}
                        </h3>
                      </div>
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-200">
                        Investigation Active
                      </span>
                    </div>

                    {/* Progress steps */}
                    <div className="flex flex-col gap-4">
                      {trackedStatus.stages.map((st: any, idx: number) => (
                        <div key={idx} className="flex items-start gap-3">
                          <div
                            className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                              st.completed
                                ? "bg-emerald-600 text-white"
                                : st.inProgress
                                ? "bg-amber-500 text-white animate-pulse"
                                : "bg-zinc-200 dark:bg-zinc-800 text-zinc-500"
                            }`}
                          >
                            {st.completed ? "✓" : idx + 1}
                          </div>
                          <div className="flex-1">
                            <div className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
                              {st.name}
                            </div>
                            <span className="text-[10px] text-zinc-500">Timestamp: {st.date}</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-900 text-xs">
                      <span className="font-bold text-rose-950 dark:text-rose-100 block mb-1">
                        Latest Enforcement Officer Dispatch:
                      </span>
                      <p className="text-zinc-600 dark:text-zinc-400">{trackedStatus.officerNote}</p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-xs text-zinc-500">
                    Sample ticket for testing:{" "}
                    <button
                      type="button"
                      onClick={() => {
                        setTrackingId("BIS-GRV-2026-89412");
                        handleTrackTicket({ preventDefault: () => {} } as any);
                      }}
                      className="font-mono text-rose-700 dark:text-rose-400 font-bold underline"
                    >
                      BIS-GRV-2026-89412
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Column: Vigilance Directory & Consumer Legal Rights */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="glass-card rounded-3xl p-6 sm:p-8 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300 flex items-center justify-center shadow-inner">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-rose-950 dark:text-rose-100">
                    National Emergency Helpline
                  </h3>
                  <p className="text-[11px] text-zinc-500">Toll-free consumer grievance lines</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/70 dark:bg-zinc-900/70 border border-rose-100 dark:border-rose-950 flex flex-col gap-2 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-zinc-600 dark:text-zinc-400">BIS Care Helpline:</span>
                  <span className="font-bold text-rose-800 dark:text-rose-300">1800 11 1234</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-zinc-600 dark:text-zinc-400">National Consumer Hotline:</span>
                  <span className="font-bold text-zinc-900 dark:text-zinc-100">1915</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-zinc-600 dark:text-zinc-400">Vigilance Direct:</span>
                  <span className="font-bold text-zinc-900 dark:text-zinc-100">011-23230131</span>
                </div>
              </div>
            </div>

            {/* Consumer Rights under BIS Act 2016 */}
            <div className="glass-card rounded-3xl p-6 sm:p-8 flex flex-col gap-3 text-xs">
              <h3 className="text-sm font-bold text-rose-950 dark:text-rose-100 flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-rose-700" />
                <span>Statutory Consumer Rights</span>
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Under Section 16 & 29 of the <strong>BIS Act 2016</strong>:
              </p>
              <ul className="list-disc list-inside flex flex-col gap-1.5 text-zinc-700 dark:text-zinc-300">
                <li>Right to test purchased articles in a recognized laboratory.</li>
                <li>Right to financial compensation if goods fail specified standard tolerances.</li>
                <li>Offenders face up to <strong>2 years imprisonment</strong> and fines up to ₹5 Lakhs for misuse of ISI mark.</li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function ComplaintsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#fdfafc] dark:bg-[#14050d] p-10 text-center">Loading Grievance Help...</div>}>
      <ComplaintsContent />
    </Suspense>
  );
}

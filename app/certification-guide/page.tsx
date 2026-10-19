"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  Award,
  CheckCircle2,
  FileText,
  Clock,
  ShieldCheck,
  Building,
  Globe,
  Leaf,
  Layers,
  ArrowRight,
  ExternalLink,
  HelpCircle,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function CertificationGuidePage() {
  const [selectedScheme, setSelectedScheme] = useState("scheme1");

  const schemes = [
    {
      id: "scheme1",
      title: "Scheme I: ISI Mark Product Certification",
      hindi: "योजना I: उत्पाद प्रमाणन (आईएसआई मार्क)",
      icon: Award,
      badge: "Most Popular",
      summary:
        "Third-party guarantee of quality, safety and reliability of physical manufactured goods under the BIS Act 2016.",
      applicableFor:
        "Packaged drinking water, cement, steel rebars, helmets, domestic gas stoves, electrical wires, and 600+ mandatory QCO items.",
      validity: "1 to 2 Years (Renewable)",
      steps: [
        {
          num: "01",
          name: "Portal Registration",
          desc: "Register on e-BIS Manakonline portal (manakonline.in) and obtain login credentials.",
        },
        {
          num: "02",
          name: "Self-Evaluation & In-House Testing",
          desc: "Set up the required manufacturing machinery and in-house laboratory testing equipment as per the relevant Indian Standard (Scheme of Testing and Inspection - STI).",
        },
        {
          num: "03",
          name: "Application Submission",
          desc: "Submit Form-I along with manufacturing process details, plant layout, raw material test certificates, and initial application fee.",
        },
        {
          num: "04",
          name: "Factory Inspection by BIS Officers",
          desc: "BIS inspecting officers conduct physical verification of the manufacturing infrastructure, quality control processes, and draw official samples.",
        },
        {
          num: "05",
          name: "Independent Laboratory Testing",
          desc: "Samples are sent to BIS Central Laboratory or NABL accredited labs for rigorous conformity testing against standard parameters.",
        },
        {
          num: "06",
          name: "Grant of CM/L License",
          desc: "Upon successful test results, BIS issues the Certificate of License (CM/L Number) entitling the factory to apply the ISI Mark on products.",
        },
      ],
      docs: [
        "Proof of factory establishment (MSME Udyam / Factory License)",
        "Manufacturing machinery inventory list with capacities",
        "In-house testing equipment with valid calibration certificates",
        "Technical personnel qualifications & appointment letters",
        "Factory layout plan and process flow chart",
        "Water & electricity connection sanctions",
      ],
      feeEstimate: "Application: ₹1,000 | Inspection: ₹7,000 | Annual Marking Fee: As per product category",
    },
    {
      id: "scheme2",
      title: "Scheme II: Compulsory Registration Scheme (CRS)",
      hindi: "योजना II: अनिवार्य पंजीकरण योजना (इलेक्ट्रॉनिक्स)",
      icon: ShieldCheck,
      badge: "IT & Electronics",
      summary:
        "Self-declaration conformity scheme formulated under Ministry of Electronics & IT (MeitY) orders for consumer electronics.",
      applicableFor:
        "Laptops, smartphones, LED lamps, smartwatches, power banks, servers, and barcode scanners.",
      validity: "2 Years (Renewable)",
      steps: [
        {
          num: "01",
          name: "Select BIS-Recognized Lab",
          desc: "Submit sample units to a BIS recognized laboratory in India for safety testing under the applicable IS standard.",
        },
        {
          num: "02",
          name: "Obtain Test Report",
          desc: "Laboratory conducts safety testing and issues the standard test report (STR).",
        },
        {
          num: "03",
          name: "Online Filing with MeitY / BIS",
          desc: "Submit test report, Authorized Indian Representative (AIR) undertaking, and brand authorization on the CRS portal.",
        },
        {
          num: "04",
          name: "Grant of R-Number",
          desc: "BIS grants the unique 8-digit Registration Number (e.g. R-41000123) for product labelling.",
        },
      ],
      docs: [
        "Valid Test Report from BIS-approved Indian Laboratory",
        "Affidavit of undertaking for Authorized Indian Representative (AIR)",
        "Trademark certificate or brand owner authorization letter",
        "Factory business license with English translation",
      ],
      feeEstimate: "Registration Fee: ₹53,000 per report | Annual Fee: ₹1,000",
    },
    {
      id: "scheme4",
      title: "Scheme IV: Gold & Silver Hallmarking",
      hindi: "योजना IV: स्वर्ण और रजत हॉलमार्किंग",
      icon: Layers,
      badge: "Jewellery",
      summary:
        "Mandatory hallmarking registration for jewelers selling gold/silver and recognition for Assaying & Hallmarking Centres (AHC).",
      applicableFor:
        "Retail jewelers, wholesale distributors, and assaying centres operating across India.",
      validity: "5 Years",
      steps: [
        {
          num: "01",
          name: "Zero-Fee Jeweller Registration",
          desc: "Government has waived registration fees for jewelers. Register online on Manakonline with GST certificate.",
        },
        {
          num: "02",
          name: "Instant Grant of Certificate",
          desc: "System automatically issues the Jeweller Registration Certificate with unique registration number.",
        },
        {
          num: "03",
          name: "Article Assaying via Recognized AHC",
          desc: "Send jewellery articles to recognized AHC for laser XRF testing, fire assaying, and 6-digit HUID engraving.",
        },
      ],
      docs: [
        "GST Registration Certificate",
        "PAN Card of the firm/proprietor",
        "Sale deed / lease agreement of showroom premises",
      ],
      feeEstimate: "Jeweller Registration: FREE (Zero Fee) | Hallmarking Fee: ₹45 per gold article",
    },
    {
      id: "fmcs",
      title: "Foreign Manufacturers Certification Scheme (FMCS)",
      hindi: "विदेशी निर्माता प्रमाणन योजना",
      icon: Globe,
      badge: "Global Exporters",
      summary:
        "Enables overseas manufacturers exporting products to India to obtain an ISI mark license under Indian standards.",
      applicableFor:
        "Foreign production units exporting steel, chemicals, medical devices, tires, or appliances to India.",
      validity: "1 to 2 Years",
      steps: [
        {
          num: "01",
          name: "Appoint Authorized Indian Representative (AIR)",
          desc: "Foreign entity nominates an Indian resident representative responsible for compliance.",
        },
        {
          num: "02",
          name: "Submit FMCS Dossier",
          desc: "File comprehensive technical documentation and inspection charges with the BIS International Division.",
        },
        {
          num: "03",
          name: "Overseas Factory Audit",
          desc: "BIS auditors visit the overseas manufacturing plant for comprehensive process auditing and sample sealing.",
        },
        {
          num: "04",
          name: "Testing & Grant",
          desc: "Samples tested in Indian labs. Upon passing, foreign manufacturer license is granted.",
        },
      ],
      docs: [
        "Agreement between Foreign Manufacturer and Indian AIR",
        "Factory registration certificate from country of origin",
        "Performance Bank Guarantee (PBG) of USD 10,000",
      ],
      feeEstimate: "Application: USD 1,000 | Audit expenses & testing at actuals",
    },
    {
      id: "ecomark",
      title: "ECO Mark Scheme (Green Standards)",
      hindi: "इको मार्क (पर्यावरण अनुकूल उत्पाद)",
      icon: Leaf,
      badge: "Sustainability",
      summary:
        "Special environmental labeling awarded to products meeting strict environmental criteria along with quality standards.",
      applicableFor:
        "Soaps, detergents, paints, paper, packaging materials, batteries, and cosmetics.",
      validity: "Combined with ISI License",
      steps: [
        {
          num: "01",
          name: "Conformity to Relevant IS Quality Standard",
          desc: "Product must first fulfill all quality requirements under the relevant Indian Standard.",
        },
        {
          num: "02",
          name: "Environmental Parameter Verification",
          desc: "Assess raw material biodegradability, energy efficiency, non-toxic emissions, and recyclable packaging.",
        },
        {
          num: "03",
          name: "Grant of ECO Mark Logo (Earthen Pot Logo)",
          desc: "Certified products carry the iconic earthen pot 'Matka' logo symbolizing environmental stewardship.",
        },
      ],
      docs: [
        "Consent to Operate (CTO) from State Pollution Control Board",
        "Biodegradability and heavy metal test reports",
        "Recyclability documentation for packaging",
      ],
      feeEstimate: "Integrated with Scheme-I ISI Mark fee structure",
    },
  ];

  const current = schemes.find((s) => s.id === selectedScheme) || schemes[0];

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
            <span>Certification Guide</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 dark:bg-rose-950/80 text-rose-800 dark:text-rose-300 text-xs font-bold uppercase tracking-wider mb-2">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Manufacturer & Business Roadmap</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-rose-950 dark:text-rose-50 flex items-center gap-3">
                <span>BIS Certification & Licensing Guide</span>
              </h1>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1 max-w-3xl">
                A complete step-by-step citizen and industrial guide for obtaining the <strong>ISI Mark</strong>, <strong>CRS Registration</strong>, <strong>Hallmarking License</strong>, and <strong>FMCS</strong> under the Bureau of Indian Standards Act 2016.
              </p>
            </div>

            <a
              href="https://www.manakonline.in"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-rose-700 to-rose-900 hover:from-rose-800 hover:to-rose-950 text-white text-xs font-bold shadow-md hover:shadow-lg transition-all"
            >
              <span>Apply on e-BIS Manakonline</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Scheme Selector Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {schemes.map((s) => {
            const Icon = s.icon;
            const isSelected = s.id === selectedScheme;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => setSelectedScheme(s.id)}
                className={`flex items-center gap-2 px-4 py-3 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                  isSelected
                    ? "bg-rose-800 text-white shadow-lg shadow-rose-950/20 scale-[1.02]"
                    : "glass-card text-zinc-700 dark:text-zinc-300 hover:bg-rose-50 dark:hover:bg-rose-950"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{s.title.split(":")[0]}</span>
              </button>
            );
          })}
        </div>

        {/* Detailed Scheme Breakdown Card */}
        <div className="glass-card rounded-3xl p-6 sm:p-10 mb-12 border border-rose-200/80 dark:border-rose-900/80">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-6 border-b border-rose-100 dark:border-rose-950 gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold text-rose-700 dark:text-rose-400 uppercase tracking-wider">
                  {current.hindi}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-amber-100 text-amber-900">
                  {current.badge}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-rose-950 dark:text-rose-100">
                {current.title}
              </h2>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-1 max-w-3xl">
                {current.summary}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 text-xs">
              <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-900">
                <span className="text-[10px] text-zinc-500 font-bold uppercase block">Validity</span>
                <span className="font-bold text-rose-950 dark:text-rose-200">{current.validity}</span>
              </div>
            </div>
          </div>

          {/* Applicable products */}
          <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-xs mb-8">
            <span className="font-bold text-amber-900 dark:text-amber-200 block mb-1">
              Applicable Sectors & Goods:
            </span>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
              {current.applicableFor}
            </p>
          </div>

          {/* Step-by-Step Interactive Timeline */}
          <div className="mb-10">
            <h3 className="text-base font-bold text-rose-950 dark:text-rose-100 uppercase tracking-wider mb-6 flex items-center gap-2">
              <Clock className="w-4 h-4 text-rose-700" />
              <span>Step-by-Step Licensing Lifecycle</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {current.steps.map((st) => (
                <div
                  key={st.num}
                  className="p-5 rounded-2xl bg-white/70 dark:bg-zinc-900/70 border border-rose-100 dark:border-rose-950 flex flex-col justify-between shadow-sm relative overflow-hidden group hover:border-rose-300 transition-all"
                >
                  <div className="absolute top-2 right-3 text-3xl font-black text-rose-900/10 dark:text-rose-100/10 select-none">
                    {st.num}
                  </div>

                  <div>
                    <div className="text-xs font-black text-rose-800 dark:text-rose-300 mb-1">
                      Step {st.num}
                    </div>
                    <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 mb-2">
                      {st.name}
                    </h4>
                    <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                      {st.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mandatory Documents & Fee Structure */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-rose-100 dark:border-rose-950">
            <div>
              <h4 className="text-sm font-bold text-rose-950 dark:text-rose-100 mb-3 flex items-center gap-2">
                <FileText className="w-4 h-4 text-rose-700" />
                <span>Essential Documents Required:</span>
              </h4>
              <ul className="flex flex-col gap-2 text-xs text-zinc-700 dark:text-zinc-300">
                {current.docs.map((doc, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <span>{doc}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-white/70 dark:bg-zinc-900/70 border border-rose-100 dark:border-rose-950 flex flex-col justify-between">
              <div>
                <h4 className="text-sm font-bold text-rose-950 dark:text-rose-100 mb-2 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-rose-700" />
                  <span>Fee Structure & Surveillance:</span>
                </h4>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">
                  {current.feeEstimate}
                </p>
                <p className="text-[11px] text-zinc-500">
                  *Concessions available for Indian Micro and Small Enterprises (MSEs) and Women-led startups under the Atmanirbhar Bharat initiative.
                </p>
              </div>

              <div className="mt-4 pt-4 border-t border-zinc-100 dark:border-zinc-800">
                <a
                  href="https://www.manakonline.in"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl bg-rose-800 hover:bg-rose-900 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all"
                >
                  <span>Start Online Application</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

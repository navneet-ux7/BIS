"use client";

import React, { useState } from "react";
import { Plus, Minus, HelpCircle } from "lucide-react";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "How can I verify if an ISI Mark on a product is genuine or fake?",
      a: "Every genuine ISI mark product must display three distinct elements: (1) The official ISI triangular logo, (2) The Indian Standard number (e.g. IS 14543) printed above the mark, and (3) The 7-to-10 digit License Number (CM/L-XXXXXXXXXX) printed beneath the mark. You can use our 3D Barcode & CML Scanner to verify the manufacturer's operational status instantly against the national BIS database.",
    },
    {
      q: "What does the 6-digit HUID on Gold Jewellery mean?",
      a: "HUID stands for Hallmark Unique Identification. It is a 6-digit alphanumeric code laser-engraved onto every piece of hallmarked gold jewellery by a BIS-recognized Assaying & Hallmarking Centre (AHC). It gives the jewellery a unique national identity. By checking the HUID on our Hallmarking page, you can see the exact purity in carats (e.g. 22K 916), testing center name, date of assay, and registered jeweller details.",
    },
    {
      q: "Is it illegal for a shopkeeper to sell gold jewellery without hallmarking?",
      a: "Yes. In all notified districts across India, selling non-hallmarked gold jewellery is a cognizable legal offense under the BIS Act 2016. Jewellers found selling spurious or under-caratage gold are liable for fines up to five times the value of the article, imprisonment up to one year, and revocation of their BIS retail license.",
    },
    {
      q: "What is the difference between ISI Mark and CRS Registration?",
      a: "The ISI Mark (Product Certification Scheme-I) applies to physical goods like packaged water, helmets, cement, and gas stoves, where factory audits and periodic physical sampling are conducted. The CRS (Compulsory Registration Scheme) applies to electronic and IT equipment like laptops, mobile phones, and power banks, requiring compliance testing in accredited Indian labs according to MeitY orders.",
    },
    {
      q: "How do I file a grievance if I purchase a substandard or counterfeit ISI product?",
      a: "You can file a formal complaint via our Grievance Portal or the BIS Care Mobile App. BIS enforcement teams conduct mystery shopping, physical raids, sample seizures, and legal prosecution against unscrupulous manufacturers. Complainants are issued a trackable Grievance Ticket ID for real-time progress updates.",
    },
  ];

  return (
    <section className="py-16 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300 text-xs font-bold uppercase tracking-wider mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Citizen Knowledge Hub</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-rose-950 dark:text-rose-100 mb-3">
            Frequently Answered Questions
          </h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Essential guidelines to safeguard consumer safety and rights across India.
          </p>
        </div>

        <div className="flex flex-col divide-y divide-rose-200/60 dark:divide-rose-900/60">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={index} className="py-4">
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between text-left py-2 gap-4 group"
                >
                  <span className="text-base sm:text-lg font-medium text-rose-950 dark:text-rose-100 group-hover:text-rose-700 dark:group-hover:text-rose-300 transition-colors">
                    {faq.q}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${
                      isOpen
                        ? "bg-rose-800 text-white rotate-180"
                        : "bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300"
                    }`}
                  >
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="pt-2 pb-3 pr-8 text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed animate-in fade-in slide-in-from-top-2 duration-300">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

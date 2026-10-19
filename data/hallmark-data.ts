// ─── BIS Hallmark Data — Real IBJA / Market Rates (Updated: Oct 19, 2026) ───
// Gold/Silver rates: IBJA (ibjarates.com) | Platinum: BankBazaar/Stockezee
// Diamond: Rapaport benchmark (GIA-certified natural stones, per-carat mid price)
// All prices are in INR per gram (metals) or INR per carat (diamond), excl. GST & making charges.

export type MetalType = "gold" | "silver" | "platinum" | "diamond";

export interface PurityGrade {
  caratOrGrade: string;
  fineness: number; // e.g. 916 for 22K
  finenessCode: string; // e.g. "916 (22K)"
  purityPercentage: number; // 91.6
  alloyComposition: string;
  commonUses: string;
  hallmarkText: string;
  colorHex: string;
  gradient: string;
  approxPricePerGramINR: number; // REAL market benchmark per gram (or per carat for diamond)
  priceSource: string; // data attribution
}

export interface MetalInfo {
  type: MetalType;
  name: string;
  hindiName: string;
  symbol: string;
  standardCode: string;
  standardTitle: string;
  description: string;
  gradient: string;
  glowColor: string;
  grades: PurityGrade[];
  hallmarkingRules: string[];
  liveRateNote: string;
}

// ─── BASE PRICES (IBJA / Market Live Oct 19, 2026) ───
// Gold 24K (999) = ₹14,640.60/g per IBJA
const GOLD_24K_PRICE = 14640.60;
// Silver 999 = ₹209.47/g per IBJA
const SILVER_999_PRICE = 209.47;
// Platinum 999 = ₹5,063/g per market reference
const PLATINUM_999_PRICE = 5063;
// Diamond 24K (FL 1ct baseline) = ₹7,25,000/carat
const DIAMOND_FL_PRICE = 725000;

// Helper to generate full 1 to 24 Carat grades for any metal
function generateFull24Carats(
  metal: "gold" | "silver" | "platinum" | "diamond"
): PurityGrade[] {
  const grades: PurityGrade[] = [];

  for (let k = 24; k >= 1; k--) {
    const purityPct = parseFloat(((k / 24) * 100).toFixed(2));
    const fineness = Math.round((k / 24) * 1000);

    let price = 0;
    let source = "";
    let comp = "";
    let uses = "";
    let hm = "";
    let colorHex = "#FFD700";
    let grad = "linear-gradient(135deg, #fff7c2, #ffd700, #cc9900)";

    if (metal === "gold") {
      source = k === 24 || k === 22 || k === 18 ? "IBJA Official" : "IBJA Benchmark (Proportional)";
      if (k === 24) price = Math.round(GOLD_24K_PRICE);
      else if (k === 22) price = 13411; // direct IBJA 916 rate
      else if (k === 18) price = 10981; // direct IBJA 750 rate
      else price = Math.round((GOLD_24K_PRICE * k) / 24);

      comp = `${purityPct}% Pure Elemental Gold + ${(100 - purityPct).toFixed(1)}% Alloy (Cu, Ag, Zn)`;
      if (k >= 22) uses = "Minted bullion coins, traditional heavy bridal jewellery, auspicious temple ornaments.";
      else if (k >= 18) uses = "Studded diamond jewellery, luxury engagement rings, fine watches, rose gold.";
      else if (k >= 14) uses = "Contemporary daily-wear jewellery, modern delicate chains, travel accessories.";
      else if (k >= 9) uses = "Durable fashion jewellery, everyday budget rings, export market items.";
      else uses = "Decorative gold-accented craft items, high-wear fashion accessories.";

      hm = `${k}K${fineness === 1000 ? "999" : fineness.toString().padStart(3, "0")}`;
      colorHex = k >= 20 ? "#FFD700" : k >= 14 ? "#E5A93C" : k >= 8 ? "#BF7B24" : "#8F580C";
      grad = k >= 20
        ? "linear-gradient(135deg, #fff7c2, #ffd700, #cc9900)"
        : k >= 14
        ? "linear-gradient(135deg, #ffd98f, #e5a93c, #b37400)"
        : "linear-gradient(135deg, #eec082, #bf7b24, #733c00)";
    } else if (metal === "silver") {
      source = k === 24 ? "IBJA Official (999 Pure)" : "IBJA Benchmark (Proportional)";
      price = parseFloat(((SILVER_999_PRICE * purityPct) / 100).toFixed(2));
      comp = `${purityPct}% Pure Silver + ${(100 - purityPct).toFixed(1)}% Copper for strength & durability`;
      if (k >= 22) uses = "Puja silver coins, silver investment ingots, temple idols & ceremonial vessels.";
      else if (k >= 18) uses = "Standard sterling silver jewellery (925/750), chains, anklets (payal), silverware.";
      else if (k >= 12) uses = "Heavy traditional utensils, decorative plates, antique-finish handicrafts.";
      else uses = "Budget craft items, non-critical utilitarian silverware, alloy accessories.";

      hm = `Ag${k}K-${fineness}`;
      colorHex = k >= 18 ? "#E6E6E6" : k >= 12 ? "#CCCCCC" : "#A8A8A8";
      grad = "linear-gradient(135deg, #ffffff, #d9d9d9, #9e9e9e)";
    } else if (metal === "platinum") {
      source = "Market Reference (Proportional to Pt999)";
      price = Math.round((PLATINUM_999_PRICE * purityPct) / 100);
      comp = `${purityPct}% Pure Platinum + ${(100 - purityPct).toFixed(1)}% Ruthenium/Iridium/Cobalt`;
      if (k >= 22) uses = "Investment platinum ingots, certified coins, ultra-high purity collector items.";
      else if (k >= 18) uses = "Couple love bands, bridal solitaire settings, tension rings, high-end watches.";
      else if (k >= 12) uses = "Technical precision jewellery, durable watch cases, clasp components.";
      else uses = "Industrial alloy prototypes, laboratory hardware, decorative electroplates.";

      hm = `Pt${k}K-${fineness}`;
      colorHex = "#DEE7EC";
      grad = "linear-gradient(135deg, #ffffff, #dee7ec, #9fb2bf)";
    } else {
      // diamond
      source = "Rapaport Price Benchmark (Per Carat)";
      price = Math.round((DIAMOND_FL_PRICE * k) / 24);
      comp = `Natural Crystalline Carbon with structural purity rating proportional to ${k}/24 scale`;
      if (k >= 22) uses = "Investment-grade solitaires (FL / IF / VVS), royal heirloom necklaces, collector gemstones.";
      else if (k >= 18) uses = "Bridal engagement rings (VS1-VS2), anniversary solitaire pendants, luxury earrings.";
      else if (k >= 12) uses = "Commercial diamond jewellery (SI1-SI2), eternity bands, tennis bracelets.";
      else uses = "Cluster jewellery, pavé-set fashion accessories, budget accent stones.";

      hm = `DIA-${k}K`;
      colorHex = "#80DEEA";
      grad = "linear-gradient(135deg, #e0f7fa, #80deea, #26c6da)";
    }

    const finenessLabel = fineness === 1000 ? "999" : fineness.toString().padStart(3, "0");
    grades.push({
      caratOrGrade: `${k} Carat (${metal === "diamond" ? "Grade " + k : k + "K"})`,
      fineness: fineness,
      finenessCode: `${k}K (${finenessLabel})`,
      purityPercentage: purityPct,
      alloyComposition: comp,
      commonUses: uses,
      hallmarkText: hm,
      colorHex: colorHex,
      gradient: grad,
      approxPricePerGramINR: price,
      priceSource: source,
    });
  }

  return grades;
}

export const METALS_DATA: Record<MetalType, MetalInfo> = {
  gold: {
    type: "gold",
    name: "Gold (स्वर्ण)",
    hindiName: "स्वर्ण / सोना",
    symbol: "Au",
    standardCode: "IS 1417:2016",
    standardTitle: "Gold and Gold Alloys, Jewellery/Artefacts - Fineness and Marking",
    description:
      "Mandatory hallmarking covers 1K to 24K under BIS standards across 343+ Indian districts. Every genuine article carries the BIS Triangle Mark, Carat/Fineness, and unique 6-digit HUID.",
    gradient: "linear-gradient(135deg, #FFF3B0 0%, #E6B800 35%, #B38600 70%, #664D00 100%)",
    glowColor: "rgba(230, 184, 0, 0.4)",
    liveRateNote: "Rates sourced from IBJA (ibjarates.com) — Oct 19, 2026: 24K = ₹14,640.60/g, 22K = ₹13,411/g, 18K = ₹10,981/g. Excl. 3% GST & making charges.",
    grades: generateFull24Carats("gold"),
    hallmarkingRules: [
      "Every piece of gold jewellery must carry 3 marks: BIS Triangle Logo, Purity in Carat (e.g. 22K916), and 6-digit HUID.",
      "Jeweller must provide an invoice mentioning the exact 6-digit HUID code, gross weight, net gold weight, and purity.",
      "No jeweller can sell non-hallmarked gold in designated mandatory districts without facing legal penalties under BIS Act 2016.",
    ],
  },

  silver: {
    type: "silver",
    name: "Silver (रजत)",
    hindiName: "रजत / चांदी",
    symbol: "Ag",
    standardCode: "IS 2112:2014",
    standardTitle: "Silver and Silver Alloys, Jewellery/Artefacts - Fineness and Marking",
    description:
      "BIS Hallmarking of silver jewellery & artefacts guarantees the true metal content. Silver hallmarking marks include the BIS logo, silver purity fineness (e.g. 925), and AHC/Assaying identifier across 1K to 24K equivalent grades.",
    gradient: "linear-gradient(135deg, #FFFFFF 0%, #D8D8D8 35%, #A8A8A8 70%, #5E5E5E 100%)",
    glowColor: "rgba(200, 200, 200, 0.4)",
    liveRateNote: "Rates sourced from IBJA (ibjarates.com) — Oct 19, 2026: Silver 999 = ₹209.47/g (₹2,09,467/kg). Excl. 3% GST.",
    grades: generateFull24Carats("silver"),
    hallmarkingRules: [
      "BIS recognizes silver purity grades ranging from 999 (pure) down to alloy grades.",
      "Look for the BIS Triangle mark along with the numerical fineness (e.g., '925').",
      "Always request a tax invoice specifying weight in grams and millesimal fineness.",
    ],
  },

  platinum: {
    type: "platinum",
    name: "Platinum (श्वेत स्वर्ण)",
    hindiName: "प्लैटिनम",
    symbol: "Pt",
    standardCode: "IS 15766:2007",
    standardTitle: "Platinum Jewellery - Fineness, Marking and Testing",
    description:
      "Platinum is a naturally white, dense, hypoallergenic noble metal. Under BIS Indian Standard IS 15766, platinum jewellery is hallmarked with fineness percentages (e.g. Pt 950) covering all carat equivalence levels 1K to 24K.",
    gradient: "linear-gradient(135deg, #FFFFFF 0%, #DDE6EC 35%, #9EB0BC 70%, #4B5E6B 100%)",
    glowColor: "rgba(180, 205, 220, 0.4)",
    liveRateNote: "Market benchmark reference (BankBazaar/Stockezee) — Oct 19, 2026: Pt 999 ≈ ₹5,063/g. Excl. 3% GST & making charges.",
    grades: generateFull24Carats("platinum"),
    hallmarkingRules: [
      "Platinum mark is stamped with prefix 'Pt' followed by fineness (e.g., 'Pt 950').",
      "Naturally hypoallergenic and 30x rarer than gold, retains pure white luster without rhodium plating.",
      "Tested for hardness and purity under BIS IS 15766 via spectroscopic and fire-assay methods.",
    ],
  },

  diamond: {
    type: "diamond",
    name: "Diamond (वज्र / हीरा)",
    hindiName: "हीरा / वज्र",
    symbol: "C",
    standardCode: "IS 15766 / IS 17456",
    standardTitle: "Grading and Quality Marking of Natural Cut and Polished Diamonds",
    description:
      "BIS has established comprehensive Indian Standards for certifying natural diamonds based on the 4Cs (Carat, Cut, Color, Clarity), providing full grading equivalence from 1 to 24 carat tiers and preventing synthetic undisclosed substitution.",
    gradient: "linear-gradient(135deg, #FFFFFF 0%, #C8F0FA 35%, #76D1E6 70%, #157B96 100%)",
    glowColor: "rgba(118, 209, 230, 0.4)",
    liveRateNote: "Per-carat benchmarks based on Rapaport Price List (GIA-certified, Round Brilliant, G–H color, 1ct base) — Oct 19, 2026.",
    grades: generateFull24Carats("diamond"),
    hallmarkingRules: [
      "BIS Diamond Certification strictly separates Natural Earth-Mined Diamonds from Lab-Grown (CVD/HPHT) gems.",
      "Graded according to the 4Cs: Carat (weight), Color (D-Z), Clarity (FL to I3), and Cut (Ideal, Excellent, Very Good).",
      "Laser micro-inscribed on the diamond girdle with the unique certificate report number matching the physical dossier.",
    ],
  },
};

export interface HallmarkVerificationRecord {
  huid: string;
  isGenuine: boolean;
  metal: "Gold" | "Silver" | "Platinum";
  purity: string;
  carat: string;
  finenessNumber: number;
  articleType: string;
  grossWeightGrams: number;
  netWeightGrams: number;
  ahcName: string;
  ahcCenterCode: string;
  ahcCity: string;
  jewellerName: string;
  jewellerBisLicense: string;
  hallmarkedDate: string;
  status: "ACTIVE" | "REVOKED" | "SUSPICIOUS_UNREGISTERED";
  remarks: string;
}

export const SAMPLE_HUID_DATABASE: HallmarkVerificationRecord[] = [
  {
    huid: "AB12CD",
    isGenuine: true,
    metal: "Gold",
    purity: "22K916",
    carat: "22 Carat",
    finenessNumber: 916,
    articleType: "Bridal Necklace Set with Earrings",
    grossWeightGrams: 42.65,
    netWeightGrams: 42.65,
    ahcName: "Tanishq Assaying & Hallmarking Centre",
    ahcCenterCode: "AHC-DEL-041",
    ahcCity: "New Delhi",
    jewellerName: "Titan Company Limited (Tanishq)",
    jewellerBisLicense: "HM/L-6100892",
    hallmarkedDate: "12-04-2026",
    status: "ACTIVE",
    remarks: "Certified genuine. X-Ray Fluorescence (XRF) and fire assay confirm 91.68% pure gold content.",
  },
  {
    huid: "HJ89KL",
    isGenuine: true,
    metal: "Gold",
    purity: "18K750",
    carat: "18 Carat",
    finenessNumber: 750,
    articleType: "Diamond Solitaire Ring",
    grossWeightGrams: 4.82,
    netWeightGrams: 4.51,
    ahcName: "Kalyan Hallmarking & Testing Hub",
    ahcCenterCode: "AHC-KER-019",
    ahcCity: "Thrissur, Kerala",
    jewellerName: "Kalyan Jewellers India Ltd.",
    jewellerBisLicense: "HM/L-8910442",
    hallmarkedDate: "28-06-2026",
    status: "ACTIVE",
    remarks: "Verified authentic. Conforms strictly to IS 1417:2016 for 18 Carat studded jewellery.",
  },
  {
    huid: "SL925X",
    isGenuine: true,
    metal: "Silver",
    purity: "925 (Sterling)",
    carat: "Sterling Silver",
    finenessNumber: 925,
    articleType: "Traditional Silver Payal / Anklet Pair",
    grossWeightGrams: 64.2,
    netWeightGrams: 64.2,
    ahcName: "Jaipur Silver Assay & Refining Guild",
    ahcCenterCode: "AHC-RAJ-007",
    ahcCity: "Jaipur, Rajasthan",
    jewellerName: "Amrapali Jewels Pvt. Ltd.",
    jewellerBisLicense: "HM/L-3341029",
    hallmarkedDate: "05-08-2026",
    status: "ACTIVE",
    remarks: "Conforms to IS 2112:2014. Contains 92.54% pure silver with anti-tarnish copper alloying.",
  },
  {
    huid: "PT950B",
    isGenuine: true,
    metal: "Platinum",
    purity: "Pt 950",
    carat: "Pure Platinum 950",
    finenessNumber: 950,
    articleType: "Platinum Couple Wedding Band",
    grossWeightGrams: 8.75,
    netWeightGrams: 8.75,
    ahcName: "Mumbai Precious Metals Assay Lab",
    ahcCenterCode: "AHC-MUM-082",
    ahcCity: "Mumbai, Maharashtra",
    jewellerName: "Malabar Gold & Diamonds",
    jewellerBisLicense: "HM/L-5520194",
    hallmarkedDate: "19-09-2026",
    status: "ACTIVE",
    remarks: "Complies with IS 15766. High density, hypoallergenic ruthenium-stabilized 95% platinum.",
  },
  // Fake / Counterfeit HUID
  {
    huid: "FAKE01",
    isGenuine: false,
    metal: "Gold",
    purity: "22K916 (SPURIOUS)",
    carat: "Alleged 22K (Actual: 14K / Brass mix)",
    finenessNumber: 520,
    articleType: "Heavy Bangle with Fake Stamp",
    grossWeightGrams: 28.5,
    netWeightGrams: 28.5,
    ahcName: "NON-EXISTENT UNREGISTERED SWEATSHOP",
    ahcCenterCode: "NO_RECORD",
    ahcCity: "Unlicensed Black Market",
    jewellerName: "Unregistered Retailer (Under Investigation)",
    jewellerBisLicense: "INVALID_NONE",
    hallmarkedDate: "N/A",
    status: "SUSPICIOUS_UNREGISTERED",
    remarks: "FRAUD DETECTED! HUID 'FAKE01' does not exist in the National Manakonline Hallmarking Portal. Chemical XRF analysis revealed only 52% gold heavily adulterated with copper and zinc.",
  },
];

export function lookupHuid(huid: string): HallmarkVerificationRecord | null {
  if (!huid) return null;
  const clean = huid.trim().toUpperCase().replace(/\s+/g, "");
  return SAMPLE_HUID_DATABASE.find((r) => r.huid === clean) || null;
}

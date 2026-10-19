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
  approxPricePerGramINR: number; // approximate benchmark reference
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
      "Mandatory hallmarking is enforced across 343+ Indian districts. All gold jewellery sold must display the 3 official BIS hallmark components: BIS Triangle Logo, Purity Grade, and 6-digit alphanumeric HUID.",
    gradient: "linear-gradient(135deg, #FFF3B0 0%, #E6B800 35%, #B38600 70%, #664D00 100%)",
    glowColor: "rgba(230, 184, 0, 0.4)",
    grades: [
      {
        caratOrGrade: "24 Carat",
        fineness: 999,
        finenessCode: "24K (999)",
        purityPercentage: 99.9,
        alloyComposition: "99.9% Pure Elemental Gold · <0.1% Trace impurities",
        commonUses: "Investment coins, minted bullion bars, puja medallions (too soft for intricate daily jewellery).",
        hallmarkText: "24K999",
        colorHex: "#FFD700",
        gradient: "linear-gradient(135deg, #fff7c2, #ffd700, #cc9900)",
        approxPricePerGramINR: 7650,
      },
      {
        caratOrGrade: "23 Carat",
        fineness: 958,
        finenessCode: "23K (958)",
        purityPercentage: 95.8,
        alloyComposition: "95.8% Pure Gold + 4.2% Copper & Silver alloy",
        commonUses: "Traditional heavy heirloom bridal jewellery, south-indian temple jewellery, premium bangles.",
        hallmarkText: "23K958",
        colorHex: "#F5C242",
        gradient: "linear-gradient(135deg, #ffe599, #f5c242, #c79100)",
        approxPricePerGramINR: 7330,
      },
      {
        caratOrGrade: "22 Carat",
        fineness: 916,
        finenessCode: "22K (916)",
        purityPercentage: 91.6,
        alloyComposition: "91.6% Pure Gold + 8.4% Copper, Zinc & Silver for structural strength",
        commonUses: "Most popular Indian bridal jewellery, mangalsutras, chains, bangles, earrings and necklaces.",
        hallmarkText: "22K916",
        colorHex: "#E5A93C",
        gradient: "linear-gradient(135deg, #ffd98f, #e5a93c, #b37400)",
        approxPricePerGramINR: 7010,
      },
      {
        caratOrGrade: "20 Carat",
        fineness: 833,
        finenessCode: "20K (833)",
        purityPercentage: 83.3,
        alloyComposition: "83.3% Pure Gold + 16.7% Copper & Silver",
        commonUses: "Durable vintage jewellery, heavy daily wear rings, filigree craftsman ornaments.",
        hallmarkText: "20K833",
        colorHex: "#DB9930",
        gradient: "linear-gradient(135deg, #ffd182, #db9930, #9e5b00)",
        approxPricePerGramINR: 6370,
      },
      {
        caratOrGrade: "18 Carat",
        fineness: 750,
        finenessCode: "18K (750)",
        purityPercentage: 75.0,
        alloyComposition: "75.0% Pure Gold + 25.0% Silver, Copper, Nickel or Palladium",
        commonUses: "Diamond and gemstone studded jewellery, contemporary rings, luxury watches, rose gold jewellery.",
        hallmarkText: "18K750",
        colorHex: "#CF8B29",
        gradient: "linear-gradient(135deg, #f7c98b, #cf8b29, #8c4c00)",
        approxPricePerGramINR: 5740,
      },
      {
        caratOrGrade: "14 Carat",
        fineness: 585,
        finenessCode: "14K (585)",
        purityPercentage: 58.5,
        alloyComposition: "58.5% Pure Gold + 41.5% Alloy metals",
        commonUses: "Affordable contemporary daily-wear jewellery, modern Gen-Z delicate collections, travel jewellery.",
        hallmarkText: "14K585",
        colorHex: "#BF7B24",
        gradient: "linear-gradient(135deg, #eec082, #bf7b24, #733c00)",
        approxPricePerGramINR: 4480,
      },
      {
        caratOrGrade: "9 Carat",
        fineness: 375,
        finenessCode: "9K (375)",
        purityPercentage: 37.5,
        alloyComposition: "37.5% Pure Gold + 62.5% Base alloy metals",
        commonUses: "Minimalist fashion accessories, highly durable budget rings, export market jewellery.",
        hallmarkText: "9K375",
        colorHex: "#A6681E",
        gradient: "linear-gradient(135deg, #e0b07b, #a6681e, #572d00)",
        approxPricePerGramINR: 2870,
      },
    ],
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
      "BIS Hallmarking of silver jewellery & artefacts guarantees the true metal content. Silver hallmarking marks include the BIS logo, silver purity fineness (e.g. 925), and AHC/Assaying identifier.",
    gradient: "linear-gradient(135deg, #FFFFFF 0%, #D8D8D8 35%, #A8A8A8 70%, #5E5E5E 100%)",
    glowColor: "rgba(200, 200, 200, 0.4)",
    grades: [
      {
        caratOrGrade: "Fine Silver",
        fineness: 999,
        finenessCode: "999 (Pure)",
        purityPercentage: 99.9,
        alloyComposition: "99.9% Pure Silver · 0.1% Trace elements",
        commonUses: "Puja silver coins, silver investment ingots, commemorative gift medallions.",
        hallmarkText: "999",
        colorHex: "#F2F2F2",
        gradient: "linear-gradient(135deg, #ffffff, #f2f2f2, #c0c0c0)",
        approxPricePerGramINR: 98,
      },
      {
        caratOrGrade: "Medallion Grade",
        fineness: 970,
        finenessCode: "970 (Medallion)",
        purityPercentage: 97.0,
        alloyComposition: "97.0% Pure Silver + 3.0% Copper",
        commonUses: "Ceremonial temple vessels, luxury silverware, decorative silver plaques.",
        hallmarkText: "970",
        colorHex: "#E6E6E6",
        gradient: "linear-gradient(135deg, #fafafa, #e6e6e6, #b0b0b0)",
        approxPricePerGramINR: 95,
      },
      {
        caratOrGrade: "Sterling Silver",
        fineness: 925,
        finenessCode: "925 (Sterling)",
        purityPercentage: 92.5,
        alloyComposition: "92.5% Pure Silver + 7.5% Copper for hardness & tarnish resistance",
        commonUses: "The global and Indian benchmark standard for silver jewellery, chains, anklets (payal), and tableware.",
        hallmarkText: "925",
        colorHex: "#D9D9D9",
        gradient: "linear-gradient(135deg, #f5f5f5, #d9d9d9, #9e9e9e)",
        approxPricePerGramINR: 91,
      },
      {
        caratOrGrade: "Coin Silver",
        fineness: 900,
        finenessCode: "900 (Coin)",
        purityPercentage: 90.0,
        alloyComposition: "90.0% Pure Silver + 10.0% Copper",
        commonUses: "Traditional Indian silverware, dinner sets, antique reproduction coins.",
        hallmarkText: "900",
        colorHex: "#CCCCCC",
        gradient: "linear-gradient(135deg, #ededed, #cccccc, #8c8c8c)",
        approxPricePerGramINR: 88,
      },
      {
        caratOrGrade: "Jewellery Grade",
        fineness: 835,
        finenessCode: "835 (Alloy)",
        purityPercentage: 83.5,
        alloyComposition: "83.5% Pure Silver + 16.5% Hardening alloy",
        commonUses: "Heavy traditional anklets, toe rings (bichiya), ornate belts, and functional utensils.",
        hallmarkText: "835",
        colorHex: "#BFBFBF",
        gradient: "linear-gradient(135deg, #e3e3e3, #bfbfbf, #7a7a7a)",
        approxPricePerGramINR: 82,
      },
      {
        caratOrGrade: "Utensil Grade",
        fineness: 800,
        finenessCode: "800 (Utensil)",
        purityPercentage: 80.0,
        alloyComposition: "80.0% Pure Silver + 20.0% Copper/Zinc",
        commonUses: "Silver idols, lamps (diyas), presentation cups, heavy puja thalis.",
        hallmarkText: "800",
        colorHex: "#B3B3B3",
        gradient: "linear-gradient(135deg, #dcdcdc, #b3b3b3, #6b6b6b)",
        approxPricePerGramINR: 78,
      },
    ],
    hallmarkingRules: [
      "BIS recognizes 6 purity grades for silver: 999, 970, 925, 900, 835, and 800.",
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
      "Platinum is a naturally white, dense, hypoallergenic noble metal. Under BIS Indian Standard IS 15766, platinum jewellery is hallmarked with fineness percentages such as Pt 950.",
    gradient: "linear-gradient(135deg, #FFFFFF 0%, #DDE6EC 35%, #9EB0BC 70%, #4B5E6B 100%)",
    glowColor: "rgba(180, 205, 220, 0.4)",
    grades: [
      {
        caratOrGrade: "Pure Platinum",
        fineness: 999,
        finenessCode: "Pt 999",
        purityPercentage: 99.9,
        alloyComposition: "99.9% Pure Platinum",
        commonUses: "Investment platinum wafers, minted coins, collector ingots.",
        hallmarkText: "Pt999",
        colorHex: "#EBF1F5",
        gradient: "linear-gradient(135deg, #ffffff, #ebf1f5, #b8c7d1)",
        approxPricePerGramINR: 3250,
      },
      {
        caratOrGrade: "Bridal Benchmark",
        fineness: 950,
        finenessCode: "Pt 950",
        purityPercentage: 95.0,
        alloyComposition: "95.0% Pure Platinum + 5.0% Ruthenium, Iridium or Cobalt",
        commonUses: "Standard bridal bands, couple love bands, solitaire diamond settings, luxury chains.",
        hallmarkText: "Pt950",
        colorHex: "#DEE7EC",
        gradient: "linear-gradient(135deg, #f5f8fa, #dee7ec, #9fb2bf)",
        approxPricePerGramINR: 3100,
      },
      {
        caratOrGrade: "Fine Platinum",
        fineness: 900,
        finenessCode: "Pt 900",
        purityPercentage: 90.0,
        alloyComposition: "90.0% Pure Platinum + 10.0% Iridium",
        commonUses: "Complex filigree settings, high-wear gemstone claws and tension rings.",
        hallmarkText: "Pt900",
        colorHex: "#CFDCE3",
        gradient: "linear-gradient(135deg, #eef3f6, #cfdce3, #879ca9)",
        approxPricePerGramINR: 2950,
      },
      {
        caratOrGrade: "Alloy Platinum",
        fineness: 850,
        finenessCode: "Pt 850",
        purityPercentage: 85.0,
        alloyComposition: "85.0% Pure Platinum + 15.0% Alloy metals",
        commonUses: "Hardened watch casings, spring-loaded jewellery clasps, and structural pins.",
        hallmarkText: "Pt850",
        colorHex: "#BFD0D9",
        gradient: "linear-gradient(135deg, #e4ecf0, #bfd0d9, #728794)",
        approxPricePerGramINR: 2780,
      },
    ],
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
      "BIS has established comprehensive Indian Standards for certifying diamonds based on the international 4Cs: Carat, Cut, Color, and Clarity, guaranteeing against synthetic CVD/HPHT lab-grown substitution without disclosure.",
    gradient: "linear-gradient(135deg, #FFFFFF 0%, #C8F0FA 35%, #76D1E6 70%, #157B96 100%)",
    glowColor: "rgba(118, 209, 230, 0.4)",
    grades: [
      {
        caratOrGrade: "Flawless (FL / IF)",
        fineness: 1000,
        finenessCode: "FL / IF",
        purityPercentage: 100.0,
        alloyComposition: "100% Pure Crystallized Carbon · No internal or surface inclusions under 10x magnification",
        commonUses: "Museum-grade gems, ultra-luxury high jewellery solitaires, royal heirlooms.",
        hallmarkText: "BIS-DIA-FL",
        colorHex: "#E0F7FA",
        gradient: "linear-gradient(135deg, #ffffff, #e0f7fa, #80deea)",
        approxPricePerGramINR: 850000,
      },
      {
        caratOrGrade: "Very Very Slightly Included (VVS1-2)",
        fineness: 980,
        finenessCode: "VVS1 / VVS2",
        purityPercentage: 98.0,
        alloyComposition: "Minute inclusions extremely difficult for trained gemologist to locate under 10x magnification",
        commonUses: "High-end engagement solitaires, signature diamond necklaces, heritage pendants.",
        hallmarkText: "BIS-DIA-VVS",
        colorHex: "#B2EBF2",
        gradient: "linear-gradient(135deg, #f0fbfd, #b2ebf2, #4dd0e1)",
        approxPricePerGramINR: 620000,
      },
      {
        caratOrGrade: "Very Slightly Included (VS1-2)",
        fineness: 920,
        finenessCode: "VS1 / VS2",
        purityPercentage: 92.0,
        alloyComposition: "Minor inclusions not visible to the naked eye, minor crystals or pinpoints under 10x",
        commonUses: "Most popular choice for bridal diamond jewellery, bracelets, and anniversary rings.",
        hallmarkText: "BIS-DIA-VS",
        colorHex: "#80DEEA",
        gradient: "linear-gradient(135deg, #e6f9fc, #80deea, #26c6da)",
        approxPricePerGramINR: 420000,
      },
      {
        caratOrGrade: "Slightly Included (SI1-2)",
        fineness: 850,
        finenessCode: "SI1 / SI2",
        purityPercentage: 85.0,
        alloyComposition: "Noticeable inclusions under 10x magnification, typically eye-clean face-up",
        commonUses: "Earring studs, cluster jewellery, fashion eternity rings, daily wear tennis bracelets.",
        hallmarkText: "BIS-DIA-SI",
        colorHex: "#4DD0E1",
        gradient: "linear-gradient(135deg, #d8f5fa, #4dd0e1, #00acc1)",
        approxPricePerGramINR: 280000,
      },
    ],
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

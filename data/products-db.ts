export interface ProductRecord {
  id: string;
  name: string;
  brand: string;
  category: string;
  barcode: string;
  cmlNumber?: string;
  crsNumber?: string;
  standardNumber: string;
  standardTitle: string;
  isGenuine: boolean;
  status: "OPERATING" | "EXPIRED" | "REVOKED" | "COUNTERFEIT_DETECTED" | "SUSPENDED";
  manufacturer: string;
  factoryAddress: string;
  validityFrom: string;
  validityTo: string;
  testLab: string;
  sampleBatchNumber: string;
  safetyRating: number; // 0 - 100
  verificationRemarks: string;
  redFlags?: string[];
  productType: "ISI_MARK" | "CRS_REGISTRATION" | "HALLMARK";
  iconType: "water" | "helmet" | "electronics" | "cement" | "steel" | "toy" | "gold" | "gas";
}

export const VERIFIED_PRODUCTS_DB: ProductRecord[] = [
  // 1. Packaged Drinking Water - Kinley (Coca-Cola)
  {
    id: "prod-water-kinley",
    name: "Kinley Packaged Drinking Water (1 Litre)",
    brand: "Kinley",
    category: "Food & Beverages",
    barcode: "8901764012217",
    cmlNumber: "CM/L-8400183492",
    standardNumber: "IS 14543:2004",
    standardTitle: "Packaged Drinking Water (Other than Natural Mineral Water)",
    isGenuine: true,
    status: "OPERATING",
    manufacturer: "Hindustan Coca-Cola Beverages Pvt. Ltd.",
    factoryAddress: "Plot No. 18, Bidadi Industrial Area, Ramanagara, Bengaluru - 562109, Karnataka",
    validityFrom: "01-01-2023",
    validityTo: "31-12-2026",
    testLab: "Central Food Laboratory & Regional BIS Lab Chennai",
    sampleBatchNumber: "CCB-2026-09A",
    safetyRating: 99,
    verificationRemarks: "Fully conforms to microbiological, heavy metals, and pesticide residue limits under BIS Gazette norms.",
    productType: "ISI_MARK",
    iconType: "water",
  },
  // 2. Protective Helmet - Studds Professional
  {
    id: "prod-helmet-studds",
    name: "Studds Ninja Elite Full-Face Protective Helmet",
    brand: "Studds",
    category: "Automotive Safety",
    barcode: "8904123508912",
    cmlNumber: "CM/L-9100234120",
    standardNumber: "IS 4151:2020",
    standardTitle: "Protective Helmets for Two Wheeler Riders",
    isGenuine: true,
    status: "OPERATING",
    manufacturer: "Studds Accessories Limited",
    factoryAddress: "Plot No. 136-140, EPIP, Sector 53, Phase V, Kundli Industrial Area, Sonipat - 131028, Haryana",
    validityFrom: "15-04-2022",
    validityTo: "14-04-2027",
    testLab: "Central Road Research Institute & BIS Mohali Testing Centre",
    sampleBatchNumber: "STD-NINJA-884",
    safetyRating: 98,
    verificationRemarks: "Passed peak acceleration impact test (<300g), retention strap slippage test, and visor optical clarity standard.",
    productType: "ISI_MARK",
    iconType: "helmet",
  },
  // 3. Apple iPhone (CRS Electronics)
  {
    id: "prod-apple-iphone",
    name: "Apple iPhone 15 Pro / Max (CRS Certified)",
    brand: "Apple",
    category: "Electronics (CRS)",
    barcode: "194253782914",
    crsNumber: "R-41000123",
    standardNumber: "IS 13252 (Part 1):2010",
    standardTitle: "Information Technology Equipment - Safety General Requirements",
    isGenuine: true,
    status: "OPERATING",
    manufacturer: "Hon Hai Precision Industry (Foxconn) India Pvt. Ltd.",
    factoryAddress: "SIPCOT Industrial Park, Sriperumbudur, Kanchipuram - 602105, Tamil Nadu",
    validityFrom: "12-09-2023",
    validityTo: "11-09-2027",
    testLab: "SAMEER (Society for Applied Microwave Electronics Engineering & Research)",
    sampleBatchNumber: "FOX-IND-2026",
    safetyRating: 100,
    verificationRemarks: "Certified under Compulsory Registration Scheme (CRS). Battery cell safety complies with IS 16046.",
    productType: "CRS_REGISTRATION",
    iconType: "electronics",
  },
  // 4. Tata Tiscon TMT Rebar
  {
    id: "prod-steel-tata",
    name: "Tata Tiscon 550D High Ductility TMT Rebar (12mm)",
    brand: "Tata Tiscon",
    category: "Civil Engineering",
    barcode: "8902540918231",
    cmlNumber: "CM/L-0012489",
    standardNumber: "IS 1786:2008",
    standardTitle: "High Strength Deformed Steel Bars and Wires for Concrete Reinforcement",
    isGenuine: true,
    status: "OPERATING",
    manufacturer: "Tata Steel Limited",
    factoryAddress: "Jamshedpur Works, Jamshedpur - 831001, Jharkhand",
    validityFrom: "01-01-2020",
    validityTo: "31-12-2028",
    testLab: "National Metallurgical Laboratory (CSIR-NML) & BIS Sahibabad Lab",
    sampleBatchNumber: "TS-550D-4412",
    safetyRating: 100,
    verificationRemarks: "Exceeds Fe-550D yield strength (550 MPa minimum), carbon equivalent <0.42%, optimal earthquake ductility.",
    productType: "ISI_MARK",
    iconType: "steel",
  },
  // 5. Philips LED 9W Bulb (CRS & ISI)
  {
    id: "prod-led-philips",
    name: "Philips Stellar Bright 9W B22 LED Bulb",
    brand: "Philips (Signify)",
    category: "Electrical & Lighting",
    barcode: "8718696823190",
    cmlNumber: "CM/L-7200155289",
    crsNumber: "R-41015672",
    standardNumber: "IS 16102 (Part 1 & 2):2012",
    standardTitle: "Self-Ballasted LED Lamps for General Lighting Services - Performance and Safety",
    isGenuine: true,
    status: "OPERATING",
    manufacturer: "Signify Innovations India Ltd.",
    factoryAddress: "Village Malpur, P.O. Bhud, Baddi, District Solan - 173205, Himachal Pradesh",
    validityFrom: "01-06-2022",
    validityTo: "31-05-2027",
    testLab: "Central Power Research Institute (CPRI) Bangalore",
    sampleBatchNumber: "SIG-9W-2026-B",
    safetyRating: 97,
    verificationRemarks: "Surge protection tested up to 4kV, harmonic distortion THD < 15%, energy lumen efficacy > 100 lm/W.",
    productType: "ISI_MARK",
    iconType: "electronics",
  },
  // 6. Funskool Giggles Toddler Toy (Mandatory Toy QCO)
  {
    id: "prod-toy-funskool",
    name: "Funskool Giggles Chain Links Educational Toy",
    brand: "Funskool",
    category: "Toys Safety",
    barcode: "8901083981102",
    cmlNumber: "CM/L-6100192844",
    standardNumber: "IS 9873 (Part 1):2019",
    standardTitle: "Safety of Toys - Mechanical and Physical Properties",
    isGenuine: true,
    status: "OPERATING",
    manufacturer: "Funskool (India) Ltd.",
    factoryAddress: "Plot 10, Industrial Estate, Ranipet - 632403, Vellore District, Tamil Nadu",
    validityFrom: "01-01-2021",
    validityTo: "31-12-2026",
    testLab: "BIS Central Laboratory Sahibabad",
    sampleBatchNumber: "FS-TOY-981",
    safetyRating: 99,
    verificationRemarks: "100% Phthalate-free, non-toxic lead-free pigments tested under IS 9873 Part 3, zero choking hazard edges.",
    productType: "ISI_MARK",
    iconType: "toy",
  },
  // 7. Ambuja Plus Cement
  {
    id: "prod-cement-ambuja",
    name: "Ambuja Plus Roof Special Portland Pozzolana Cement (50kg)",
    brand: "Ambuja Cement",
    category: "Civil Engineering",
    barcode: "8901234789012",
    cmlNumber: "CM/L-0294158",
    standardNumber: "IS 1489 (Part 1):2015",
    standardTitle: "Portland Pozzolana Cement Specification (Fly-ash based)",
    isGenuine: true,
    status: "OPERATING",
    manufacturer: "Ambuja Cements Ltd. (Adani Group)",
    factoryAddress: "Ambujanagar, Taluka Kodinar, Gir Somnath - 362715, Gujarat",
    validityFrom: "15-03-2021",
    validityTo: "14-03-2028",
    testLab: "National Council for Cement and Building Materials (NCCBM) Ballabgarh",
    sampleBatchNumber: "AMB-2026-F04",
    safetyRating: 99,
    verificationRemarks: "Compressive strength at 28 days > 43 MPa, Soundness by Le-Chatelier method < 10 mm.",
    productType: "ISI_MARK",
    iconType: "cement",
  },

  // ---------------- COUNTERFEIT / FRAUD TEST CASES ----------------
  // 8. FAKE HELMET - Roadside Substandard Spurious Helmet
  {
    id: "fake-helmet-roadside",
    name: "Super-Safe 'Cruiser' Open Cap Motorcycle Helmet (COUNTERFEIT)",
    brand: "Cruiser Riders (Counterfeit)",
    category: "Automotive Safety (FAKE)",
    barcode: "8909999000123",
    cmlNumber: "CM/L-0000000",
    standardNumber: "IS 4151",
    standardTitle: "Protective Helmets for Two Wheeler Riders (FORGED ISI MARK)",
    isGenuine: false,
    status: "COUNTERFEIT_DETECTED",
    manufacturer: "Unknown Unlicensed Spurious Assembler",
    factoryAddress: "Alleged address: Mayapuri Industrial Phase II, New Delhi (Non-existent Unit)",
    validityFrom: "N/A",
    validityTo: "N/A",
    testLab: "SEIZED BY BIS ENFORCEMENT & DELHI POLICE VIGILANCE",
    sampleBatchNumber: "FAKE-HLM-X9",
    safetyRating: 4,
    verificationRemarks: "DANGER TO LIFE! Spurious ISI mark printed with invalid 7 zeroes. Helmet made of cheap brittle plastic without high-density EPS foam liner.",
    redFlags: [
      "CM/L number '0000000' is completely bogus and does not exist in BIS national registry.",
      "Shell is constructed from cheap thermo-plastic that fractures on 5J impact.",
      "No batch traceability, no chin strap micrometric buckle certification.",
      "Violates Supreme Court of India directive & Central Motor Vehicle Rule 138(4)(f).",
    ],
    productType: "ISI_MARK",
    iconType: "helmet",
  },
  // 9. FAKE WATER - Spurious "Kinloy" or Expired License Mineral Water
  {
    id: "fake-water-kinloy",
    name: "Kinloy Aqua Pure Packaged Drinking Water (SPURIOUS)",
    brand: "Kinloy (Lookalike Pirated Brand)",
    category: "Food & Beverages (FAKE)",
    barcode: "8908888123456",
    cmlNumber: "CM/L-7891234567",
    standardNumber: "IS 14543",
    standardTitle: "Packaged Drinking Water (EXPIRED & FORGED LICENSE)",
    isGenuine: false,
    status: "REVOKED",
    manufacturer: "Aqua Miracle Beverages (License Cancelled)",
    factoryAddress: "Khasra 42/1, Najafgarh Road, Delhi - 110043",
    validityFrom: "01-01-2019",
    validityTo: "31-12-2021 (EXPIRED)",
    testLab: "BIS Regional Enforcement Inspection",
    sampleBatchNumber: "SPURIOUS-AQ-01",
    safetyRating: 8,
    verificationRemarks: "HEALTH HAZARD! License was CANCELLED by BIS on 15-08-2022 due to coliform bacteria and absence of reverse osmosis purification.",
    redFlags: [
      "License CM/L-7891234567 has been officially REVOKED by the Competent Authority.",
      "Counterfeit lookalike trade dress infringing Coca-Cola's registered trademark 'Kinley'.",
      "Failed microbiological purity standards during raid.",
      "Selling this water is a cognizable criminal offense under BIS Act 2016 Section 14.",
    ],
    productType: "ISI_MARK",
    iconType: "water",
  },
  // 10. UNREGISTERED IMPORTED POWER BANK
  {
    id: "fake-powerbank-clone",
    name: "UltraPower 20000mAh Rapid Charge Power Bank (UNREGISTERED)",
    brand: "UltraPower Clone",
    category: "Electronics (ILLEGAL)",
    barcode: "6901234567890",
    crsNumber: "R-99999999",
    standardNumber: "IS 16046:2018",
    standardTitle: "Secondary Cells and Batteries (NO CRS REGISTRATION)",
    isGenuine: false,
    status: "COUNTERFEIT_DETECTED",
    manufacturer: "Unregistered Shenzhen Exporter / Grey Market Smuggler",
    factoryAddress: "Baoan District, Shenzhen, China (No BIS Authorised Indian Representative - AIR)",
    validityFrom: "N/A",
    validityTo: "N/A",
    testLab: "Customs & Central Electronics Testing Raids",
    sampleBatchNumber: "GREY-PB-2026",
    safetyRating: 12,
    verificationRemarks: "FIRE & EXPLOSION HAZARD! Li-ion cells lack mandatory thermal runaway cut-off circuits required under IS 16046.",
    redFlags: [
      "Fake CRS R-Number R-99999999 printed without MeitY/BIS registration certificate.",
      "Absence of Authorized Indian Representative (AIR) mandatory under Foreign Manufacturer scheme.",
      "Thermal stress test demonstrated casing ignition at 65°C.",
    ],
    productType: "CRS_REGISTRATION",
    iconType: "electronics",
  },
];

// Helper to find a product by query
export function lookupProduct(query: string): ProductRecord | null {
  if (!query) return null;
  const clean = query.trim().toUpperCase().replace(/\s+/g, "");

  // Match by barcode
  const byBarcode = VERIFIED_PRODUCTS_DB.find(
    (p) => p.barcode.replace(/\s+/g, "") === clean
  );
  if (byBarcode) return byBarcode;

  // Match by CML
  const byCml = VERIFIED_PRODUCTS_DB.find(
    (p) => p.cmlNumber && p.cmlNumber.toUpperCase().replace(/[\s\/-]/g, "").includes(clean.replace(/[\s\/-]/g, ""))
  );
  if (byCml) return byCml;

  // Match by CRS
  const byCrs = VERIFIED_PRODUCTS_DB.find(
    (p) => p.crsNumber && p.crsNumber.toUpperCase().replace(/[\s\/-]/g, "").includes(clean.replace(/[\s\/-]/g, ""))
  );
  if (byCrs) return byCrs;

  // Match by Name/Brand
  const byName = VERIFIED_PRODUCTS_DB.find(
    (p) =>
      p.name.toUpperCase().includes(query.toUpperCase().trim()) ||
      p.brand.toUpperCase().includes(query.toUpperCase().trim())
  );
  if (byName) return byName;

  return null;
}

// Algorithmic validation if product not explicitly in demo DB
export function analyzeUnknownCode(code: string): {
  isLikelyFake: boolean;
  score: number;
  reason: string;
  detectedType: "EAN13" | "CML" | "CRS" | "HUID" | "UNKNOWN";
  advice: string;
} {
  const clean = code.trim().toUpperCase().replace(/\s+/g, "");

  // 1. Check if looks like HUID (6 alphanumeric chars)
  if (/^[A-Z0-9]{6}$/.test(clean)) {
    return {
      isLikelyFake: false,
      score: 85,
      detectedType: "HUID",
      reason: `Valid 6-digit alphanumeric structure format for BIS Hallmark Unique Identification (HUID).`,
      advice: "Head to the Hallmarking & Coins page to verify HUID assaying centre and purity grade details.",
    };
  }

  // 2. Check if looks like CM/L license (CM/L followed by 7 or 10 digits)
  if (/^CM[\/\-]?[L]?[\/\-]?[0-9]{7,10}$/i.test(clean) || /^[0-9]{7,10}$/.test(clean)) {
    // Check if zeroes or repeated digits
    if (/^0{6,}/.test(clean) || /^(.)\1{6,}$/.test(clean)) {
      return {
        isLikelyFake: true,
        score: 5,
        detectedType: "CML",
        reason: "SUSPECT NUMBER: License number contains repetitive or dummy digits (e.g. all 0s or 9s).",
        advice: "Do not buy this item. File a complaint via BIS Care or our Grievance Portal immediately.",
      };
    }
    return {
      isLikelyFake: false,
      score: 78,
      detectedType: "CML",
      reason: `Format matches BIS Product Certification License (Scheme-I CM/L).`,
      advice: "Ensure the manufacturer's name and factory address match the invoice provided by the retailer.",
    };
  }

  // 3. Check if looks like CRS registration (R-XXXXXXXX)
  if (/^R[\-]?[0-9]{8}$/i.test(clean)) {
    return {
      isLikelyFake: false,
      score: 82,
      detectedType: "CRS",
      reason: "Format matches MeitY / BIS Compulsory Registration Scheme (CRS) for electronics.",
      advice: "Verify that the product model on the box exactly matches the registered CRS model number.",
    };
  }

  // 4. Check EAN-13 barcode checksum
  if (/^[0-9]{13}$/.test(clean)) {
    // Check Indian prefix: 890 is India GS1 prefix
    const isIndia = clean.startsWith("890");
    let sum = 0;
    for (let i = 0; i < 12; i++) {
      sum += parseInt(clean[i]) * (i % 2 === 0 ? 1 : 3);
    }
    const checksum = (10 - (sum % 10)) % 10;
    const isValidChecksum = checksum === parseInt(clean[12]);

    if (!isValidChecksum) {
      return {
        isLikelyFake: true,
        score: 15,
        detectedType: "EAN13",
        reason: "INVALID BARCODE CHECKSUM: The EAN-13 barcode has an invalid mathematical check digit.",
        advice: "This barcode is likely generated fraudulently without GS1 registration.",
      };
    }

    return {
      isLikelyFake: false,
      score: isIndia ? 90 : 75,
      detectedType: "EAN13",
      reason: isIndia
        ? "Valid GS1 India Barcode (Prefix 890). Mathematical checksum verified."
        : "Valid International EAN-13 Barcode. For mandatory Indian standards, also verify the BIS CM/L number.",
      advice: "Check that the ISI Mark with the corresponding IS number and CM/L license is visibly stamped on the box.",
    };
  }

  return {
    isLikelyFake: true,
    score: 25,
    detectedType: "UNKNOWN",
    reason: "Unrecognized identifier format. Authentic BIS products carry either an EAN-13 barcode, a 7-10 digit CM/L number, an R-number, or a 6-digit HUID.",
    advice: "Please double check the packaging for the ISI stamp or upload a clear photo of the label.",
  };
}

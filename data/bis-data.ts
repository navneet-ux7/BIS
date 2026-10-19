export interface BISMetric {
  label: string;
  value: string;
  numeric: number;
  suffix: string;
  source: string;
  description: string;
}

export const BIS_METRICS: BISMetric[] = [
  {
    label: "Indian Standards in Force",
    value: "21,500+",
    numeric: 21500,
    suffix: "+",
    source: "data.gov.in / bis.gov.in",
    description: "Covering 15 sectors from agriculture and civil engineering to electronics & healthcare.",
  },
  {
    label: "Active ISI Mark Licences",
    value: "43,800+",
    numeric: 43800,
    suffix: "+",
    source: "Bureau of Indian Standards Gazette 2026",
    description: "Factories under active surveillance and third-party conformity assessment.",
  },
  {
    label: "HUID Hallmarked Articles",
    value: "420M+",
    numeric: 420,
    suffix: "M+",
    source: "Manakonline National Hallmarking Portal",
    description: "Gold & silver jewellery pieces laser-engraved with unique 6-digit alphanumeric traceability.",
  },
  {
    label: "Recognized Hallmarking Centres (AHC)",
    value: "1,850+",
    numeric: 1850,
    suffix: "+",
    source: "BIS Hallmarking Directorate",
    description: "Equipped with XRF assaying labs, fire assay furnaces, and automated laser marking.",
  },
  {
    label: "Mandatory QCO Products",
    value: "600+",
    numeric: 600,
    suffix: "+",
    source: "Ministry of Consumer Affairs, Food & Public Distribution",
    description: "Products where BIS certification is legally compulsory under Indian law.",
  },
  {
    label: "National Testing Laboratories",
    value: "1,600+",
    numeric: 1600,
    suffix: "+",
    source: "Central Laboratory Sahibabad & Regional NABL Labs",
    description: "Accredited chemical, biological, mechanical, and electrical testing facilities.",
  },
];

export interface StandardDivision {
  id: string;
  name: string;
  hindiName: string;
  icon: string;
  count: number;
  description: string;
  highlightStandards: {
    code: string;
    title: string;
    mandatory: boolean;
  }[];
}

export const BIS_DIVISIONS: StandardDivision[] = [
  {
    id: "civil",
    name: "Civil Engineering & Building Materials",
    hindiName: "सिविल इंजीनियरिंग और निर्माण सामग्री",
    icon: "Building2",
    count: 2240,
    description: "Structural safety, ordinary portland cement, structural steel rebars, fire retardants, and earthquake safety.",
    highlightStandards: [
      { code: "IS 269:2015", title: "Ordinary Portland Cement Specification", mandatory: true },
      { code: "IS 1786:2008", title: "High Strength Deformed Steel Bars (TMT) for Concrete Reinforcement", mandatory: true },
      { code: "IS 456:2000", title: "Plain and Reinforced Concrete - Code of Practice", mandatory: false },
      { code: "IS 1893:2016", title: "Earthquake Resistant Design of Structures", mandatory: false },
    ],
  },
  {
    id: "food",
    name: "Food, Agriculture & Beverages",
    hindiName: "खाद्य, कृषि और पेय पदार्थ",
    icon: "Utensils",
    count: 1890,
    description: "Packaged drinking water, infant food, edible oils, dairy, agricultural machinery, and food safety management.",
    highlightStandards: [
      { code: "IS 14543:2004", title: "Packaged Drinking Water (Other Than Packaged Natural Mineral Water)", mandatory: true },
      { code: "IS 13428:2005", title: "Packaged Natural Mineral Water", mandatory: true },
      { code: "IS 12214:2018", title: "Infant Milk Substitutes and Feeding Formula", mandatory: true },
      { code: "IS 3470:2017", title: "Hexane-Extracted Soya Bean Oil", mandatory: false },
    ],
  },
  {
    id: "electronics",
    name: "Electronics & Information Technology (CRS)",
    hindiName: "इलेक्ट्रॉनिक्स और सूचना प्रौद्योगिकी",
    icon: "Cpu",
    count: 1450,
    description: "Compulsory Registration Scheme for mobile phones, laptops, LED lamps, smart meters, power banks, and adapters.",
    highlightStandards: [
      { code: "IS 16102:2012", title: "Self-Ballasted LED Lamps for General Lighting Services", mandatory: true },
      { code: "IS 13252:2010", title: "Information Technology Equipment - Safety (Laptops/Smartphones)", mandatory: true },
      { code: "IS 16046:2018", title: "Secondary Cells and Batteries for Portable Applications", mandatory: true },
      { code: "IS 16333:2016", title: "Mobile Phone Handsets - Indian Language Support", mandatory: true },
    ],
  },
  {
    id: "automotive",
    name: "Automotive & Road Safety",
    hindiName: "ऑटोमोटिव और सड़क सुरक्षा",
    icon: "ShieldAlert",
    count: 980,
    description: "Protective two-wheeler helmets, safety glass, pneumatic tyres, seat belts, and electric vehicle battery packs.",
    highlightStandards: [
      { code: "IS 4151:2020", title: "Protective Helmets for Two Wheeler Riders (Mandatory ISI)", mandatory: true },
      { code: "IS 15636:2012", title: "Automotive Safety Glass for Windscreens and Windows", mandatory: true },
      { code: "IS 15627:2005", title: "Pneumatic Tyres for Two and Three-Wheeled Motor Vehicles", mandatory: true },
    ],
  },
  {
    id: "consumer",
    name: "Consumer Products, Toys & Household",
    hindiName: "उपभोक्ता उत्पाद, खिलौने और घरेलू सामान",
    icon: "ShoppingBag",
    count: 1620,
    description: "Toys safety (non-toxic paints & physical integrity), LPG stoves, pressure cookers, and domestic electrical appliances.",
    highlightStandards: [
      { code: "IS 9873 (Part 1-9)", title: "Safety of Toys - Mechanical, Chemical, Flammability Tests", mandatory: true },
      { code: "IS 4246:2002", title: "Domestic Gas Stoves for use with Liquefied Petroleum Gases", mandatory: true },
      { code: "IS 2347:2017", title: "Domestic Pressure Cookers - Safety Requirements", mandatory: true },
      { code: "IS 302:2008", title: "Safety of Household and Similar Electrical Appliances", mandatory: true },
    ],
  },
  {
    id: "hallmarking",
    name: "Precious Metals & Hallmarking",
    hindiName: "बहुमूल्य धातुएं और हॉलमार्किंग",
    icon: "Coins",
    count: 320,
    description: "Mandatory hallmarking of gold jewellery & silver artefacts with 6-digit HUID identification.",
    highlightStandards: [
      { code: "IS 1417:2016", title: "Gold and Gold Alloys, Jewellery/Artefacts - Fineness and Marking", mandatory: true },
      { code: "IS 2112:2014", title: "Silver and Silver Alloys, Jewellery/Artefacts - Fineness and Marking", mandatory: true },
      { code: "IS 15766:2007", title: "Platinum Jewellery - Fineness, Marking and Testing", mandatory: false },
    ],
  },
];

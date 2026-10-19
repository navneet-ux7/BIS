# Bureau of Indian Standards (BIS) — National Standards Portal 🇮🇳
> **मानक: पथप्रदर्शक: (Standards Pave The Path)**  
> Next-generation citizen and enterprise portal for the Bureau of Indian Standards, Ministry of Consumer Affairs, Food & Public Distribution, Government of India.

Built with **Next.js 14**, **Tailwind CSS**, and **Framer Motion**, styled in an elegant **Lilac Meadow (Rose variant)** design with glassmorphism, 3D interactive physics, and grounded in official data from [bis.gov.in](https://www.bis.gov.in) and [data.gov.in](https://www.data.gov.in).

---

## 🌟 Key Highlights & Features

### 1. 🔍 3D Barcode & ISI Mark Product Scanner (`/scanner`)
- **3 Scanning Modes**:
  - **Live Camera Scanner**: Real-time camera feed with laser guide overlay, crosshairs viewfinder, flashlight toggle, and audio tone feedback.
  - **Packaging Image Upload**: Optical decoder for product photos, barcode tags, and receipts.
  - **Manual Code / CML Search**: Instant lookup for EAN-13 barcodes, BIS CM/L License numbers (e.g. `CM/L-8400183492`), and CRS R-Numbers (e.g. `R-41000123`).
- **Authentic vs. Counterfeit Detection Engine**:
  - Compares against a rich database of genuine products (*Kinley Water IS 14543, Studds Helmets IS 4151, Apple iPhone CRS, Tata Tiscon TMT IS 1786, Philips LED IS 16102, Funskool Toys IS 9873*) with confetti celebration on genuine verification.
  - Flags dangerous counterfeits (*Fake roadside helmets with 0000000 CM/L, Spurious water with revoked licenses, Unregistered Li-ion power banks*) with red flags, safety scores, and 1-click reporting to BIS Vigilance.
  - Downloadable & printable BIS Verification Certificate.

### 2. 🪙 Precious Metals & Hallmarking Verification (`/coins`)
- **Interactive 3D Metallic Coins**:
  - **Gold**: 24K (999), 23K (958), 22K (916), 20K (833), 18K (750), 14K (585), 9K (375).
  - **Silver**: 999 Fine, 970 Medallion, 925 Sterling, 900 Coin, 835, 800 Utensil.
  - **Platinum**: Pt 999, Pt 950 (Bridal benchmark), Pt 900, Pt 850.
  - **Diamond**: 4Cs certification grading under IS 15766 (Carat, Cut, Color, Clarity).
- **Hallmark Image & 6-Digit HUID Checker**:
  - Upload a hallmark photo or enter a 6-digit alphanumeric **HUID** code (e.g. `AB12CD`, `HJ89KL`, `SL925X`).
  - Verifies the **3 mandatory hallmark components**: (1) BIS Triangle Logo, (2) Purity in Carats & Fineness, and (3) Unique HUID code.
  - Displays registered Assaying & Hallmarking Centre (AHC), jeweller license, and gross/net weights.
- **Live Bullion Valuation Calculator**: Calculate pure metal weight and estimated market value based on current benchmark daily bullion rates.

### 3. 🤖 Floating BIS AI Assistant (Chatbot Redirection)
- Floating bottom-right corner animated SVG assistant with pulsing waves and online indicator.
- Automatically redirects directly on click to the official assistant: [https://bis-ai-assistant-v2.vercel.app/](https://bis-ai-assistant-v2.vercel.app/).

### 4. 📜 Certification Guide (`/certification-guide`)
- Step-by-step roadmap for:
  - **Scheme I**: ISI Mark Product Certification
  - **Scheme II**: Compulsory Registration Scheme (CRS for IT & Electronics)
  - **Scheme IV**: Gold & Silver Hallmarking Registration
  - **FMCS**: Foreign Manufacturers Certification Scheme
  - **ECO Mark**: Green & Environmentally Safe Products
- Comprehensive document checklists, fee structure breakdowns, and links to e-BIS Manakonline.

### 5. 🛡️ Consumer Grievance & Vigilance Portal (`/complaints`)
- Citizen grievance filing form for misuse of ISI mark, spurious hallmarking, under-caratage, and defective goods.
- Instant generation of trackable Grievance Ticket IDs (e.g. `BIS-GRV-2026-89412`).
- Live 5-stage investigation progress tracker and national vigilance emergency helplines (`1800 11 1234`).

---

## 🏛️ Official Data Grounding
- **21,500+** Indian Standards in Force
- **43,800+** Active ISI Mark Licences
- **420M+** HUID Hallmarked Articles
- **1,850+** Recognized Hallmarking Centres (AHCs)
- **600+** Mandatory Quality Control Order (QCO) Products
- **1,600+** Accredited National Testing Laboratories

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ (tested on Node v24.19.0)
- npm or yarn or pnpm

### Installation
```bash
git clone https://github.com/navneet-ux7/BIS.git
cd BIS
npm install
```

### Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build
```bash
npm run build
npm start
```

---

## 📂 Project Structure
```
bis-portal/
├── app/
│   ├── layout.tsx                # Root layout with BIS metadata & global FloatingChatbot
│   ├── page.tsx                  # Landing page (Hero, Stats, QCO Spotlight, Divisions, FAQs)
│   ├── globals.css               # Tailwind directives, glassmorphism, roseTheme styles
│   ├── scanner/page.tsx          # 3D Barcode & Fake Product Scanner
│   ├── coins/page.tsx            # Precious Metals & Hallmarking Verification Page
│   ├── certification-guide/page.tsx # Certification guide for businesses
│   └── complaints/page.tsx       # Consumer Grievance & Vigilance Portal
├── components/
│   ├── Navbar.tsx                # Sticky glassmorphism navigation with theme toggle
│   ├── HeroSection.tsx           # Lilac Meadow Rose stage with 3D buttons & quick verify
│   ├── MeadowCanvas.tsx          # Procedural floral meadow canvas with swaying flowers
│   ├── Coin3D.tsx                # 3D reeded interactive metallic coin SVG
│   ├── FloatingChatbot.tsx       # Floating SVG bot linking to bis-ai-assistant-v2
│   ├── StatsTicker.tsx           # Official BIS & data.gov.in metrics grid
│   ├── StandardsExplorer.tsx     # Standards divisions & mandatory standards
│   ├── QCISpotlight.tsx          # Mandatory consumer protection items
│   ├── FAQSection.tsx            # Accordion FAQ knowledge hub
│   └── Footer.tsx                # BIS MANAK watermark footer & helpline directory
└── data/
    ├── bis-data.ts               # Official metrics, divisions, and standards
    ├── products-db.ts            # Authentic products & counterfeit test database
    └── hallmark-data.ts          # Gold/Silver/Platinum/Diamond purity & HUID database
```

---

## 📄 License
Under the Bureau of Indian Standards Act 2016. Government of India.

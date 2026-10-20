# FIT CHECK — Personal Wardrobe & Outfit Architecture Prototype

A polished, responsive fashion-editorial website prototype designed for personal wardrobe curation, mood-driven outfit planning, peer-to-peer second-hand curation, and circular free garment donations.

---

## 1. Quick Start / Run Instructions

The prototype is built with standard modern ES6+ web standards (HTML5, modular CSS, Vanilla JavaScript) and requires **zero external build steps or node packages**.

### Option A: Local Python Server (Recommended)
1. Open PowerShell or Terminal.
2. Navigate to the project root:
   ```powershell
   cd C:\Users\hp\.gemini\antigravity\scratch\fit-check
   ```
3. Launch Python's built-in HTTP server:
   ```powershell
   python -m http.server 8000
   ```
4. Open your browser and navigate to:
   ```
   http://localhost:8000
   ```

### Option B: Direct Browser Preview
Because this prototype utilizes standard ES Modules (`type="module"`), modern browsers require an HTTP origin to avoid CORS restrictions on local `file://` module imports. Using Option A above or any local static server (e.g., Live Server in VS Code) ensures all assets and modules load smoothly.

---

## 2. Prototype Scope & Implemented Experiences

| Flow | Experience & Capabilities | Data Mode |
|---|---|---|
| **Welcome & Brand** | Editorial hero headline "Create your own profile", "Get started" CTA, feature overview cards, and ambient translucent floating bubble background. | Live UI |
| **Profile Setup (Step 1)** | Skippable sign-up form for Name, Username, Email, and Password. Explicitly states client-side prototype mode without claiming fake backend security. | LocalStorage |
| **Style Onboarding (Step 2)** | Multi-select aesthetic DNA tags (e.g., *Chatpata Desi*, *Gothic*, *Minimal*, *Streetwear*, *Traditional*, *Western*), "My style depends on my mood" toggle, designers, platforms, trends, and local photo moodboard preview via browser FileReader. | LocalStorage |
| **Studio Avatar (Step 3)** | Illustrated vector avatars (Editorial Chic, Minimalist Bob, Sculpted Curls, Desi Fusion) or typographical initials. No AI generation required. | LocalStorage |
| **My Wardrobe** | Visual wardrobe inventory spanning Tops, Bottoms, Dresses & Sets, Outerwear, Footwear, and Jewelry & Bags. Support for adding new pieces (custom photo upload or preset photography, color, occasions, notes) and deletion. | LocalStorage |
| **Style an Outfit** | Intelligent outfit engine that selects items **strictly from the user's saved wardrobe**. Responds to occasion (*College, Party, Vacation, Special Event, Work, Casual Coffee*), emotional mood (*Effortless & Chic, Bold & Dramatic, etc.*), and optional celebrity/movie style muses. Generates color harmony palette and editorial rationale ("Why this look works"). Includes empty state with starter wardrobe loading. | Algorithmic Client-side Engine |
| **Thrift Marketplace** | Peer-to-peer second-hand browse & listing flow. Cards display condition, price, size, seller info, and manual distance/location filters (*Within 5 mi, 15 mi, All*). Includes "+ List for Resale" modal. | Simulated Local Marketplace |
| **Free Donation Flow** | Distinct free mutual-aid giving flow for circular fashion. Filters by cause (*Career Closets, Winter Shelters, Student Mutual Aid*). Distinct from resale/thrift. Includes "+ List Free Donation" modal. | Simulated Mutual Aid |
| **Shop References** | Curated editorial inspiration cards benchmarks (The Row, Raw Mango, Reformation, Mejuri). Explicitly labeled as simulated mock inspiration links. | Curated Mock Data |
| **Creator Discovery** | Marked "Coming Soon" with editorial preview cards and a functional "Join Waitlist" form with toast notifications. | Teaser UI |
| **Session Control** | Global "Reset Demo" button to restore fresh starter state anytime. | LocalStorage Reset |

---

## 3. TinyFish Web Research Integration Point

**TinyFish** is explicitly structured as the intended autonomous web research and browser automation layer for discovering fashion references, lookbooks, and retailer pages across the open web.

### Architecture & Service Location
- File: [`js/tinyfishAdapter.js`](js/tinyfishAdapter.js)
- Class: `TinyFishService` (singleton exported as `tinyFish`)

### How It Operates in the Prototype
1. **Clear Status Indicator:** The top bar and navigation header display the TinyFish connection status (defaults to **Mock Fallback**).
2. **Interactive Inspector & Test Drawer:** Clicking the "TinyFish Adapter" button in the header opens a dedicated modal detailing its intended role, configuration requirements, and an interactive test query search simulator (`searchFashionReferences(query)`).
3. **No Fake API Calls:** When credentials are null, the adapter gracefully falls back to structured demo data with realistic simulated processing latency without throwing errors or claiming live authentication.

### Production Configuration Requirements
To connect a live TinyFish automation worker in production:
```javascript
window.TINYFISH_CONFIG = {
  apiKey: "tf_live_your_api_token_here",
  endpoint: "https://api.tinyfish.ai/v1",
  allowedDomains: ["vogue.com", "ssense.com", "reformation.com"]
};
```

---

## 4. Known Prototype Limitations

1. **Client-Side Persistence Only:** Data is stored within the user's browser `localStorage`. Closing the browser preserves data, but clearing browser cache or opening incognito resets the state.
2. **Simulated Marketplace Transactions:** The Thrift and Free Donation views do not process actual payments, credit cards, real-time messaging, or live geolocation tracking. Locations and distances use manual string matching.
3. **External Retailer Links:** Shopping reference links point to mock demonstration targets for visual inspiration.
4. **Offline Wardrobe Analysis:** The outfit generation algorithm runs client-side rules based on categorized garments, color palettes, and tags rather than a paid cloud AI model.

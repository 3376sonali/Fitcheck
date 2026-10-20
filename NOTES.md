# Architecture Notes & Production Roadmap

## 1. Architecture Choices

### 1.1 Zero-Dependency Vanilla ES Modules & Modern CSS
- **Rationale:** To deliver an instant, bulletproof prototype that runs immediately without Node.js dependencies, npm installs, build chains, or lockfile mismatches.
- **Modularity:** Functionality is split across domain modules (`state.js`, `outfitEngine.js`, `tinyfishAdapter.js`, `mockData.js`, and `app.js`).
- **Styling Architecture:** Built using CSS custom properties (variables) for consistent fashion-editorial color tokens (Ivory, Cream, Taupe, Charcoal, Blush-Pink). Responsive layouts use CSS Grid and Flexbox with fluid `clamp()` typography.
- **Ambient Translucent Bubbles:** Implemented with lightweight CSS blur filters and `@keyframes floatBubble` on pseudo/ambient elements. Fully hardware-accelerated (`transform3d`, `will-change`) with `prefers-reduced-motion` accessibility support.

### 1.2 State & Storage Management
- Handled by `StateManager` in [`js/state.js`](js/state.js).
- Persists all state across five discrete keys in `localStorage`:
  - `fitcheck_profile_v1`
  - `fitcheck_wardrobe_v1`
  - `fitcheck_thrift_v1`
  - `fitcheck_donations_v1`
  - `fitcheck_outfits_v1`
- Emits a custom window event (`fitcheck:statechange`) on state updates, allowing headers, badge counters, and views to update reactively without a full framework overhead.

### 1.3 Outfit Styler Algorithm
- Located in [`js/outfitEngine.js`](js/outfitEngine.js).
- Enforces strict constraints: outfits are generated **exclusively from garments currently present in the user's saved wardrobe**.
- Evaluates item occasion tags, emotional moods, and color harmonies to build cohesive combinations (Top + Bottom / Dress + Outerwear + Shoes + Jewelry).
- Crafts editorial rationale connecting the selected style muse/reference to visual proportions and provides practical occasion styling tips.

### 1.4 Isolated TinyFish Service Adapter
- Located in [`js/tinyfishAdapter.js`](js/tinyfishAdapter.js).
- Acts as a clean boundary between the UI and external web research/automation infrastructure.
- Gracefully handles unconfigured environments: informs the UI of fallback mode, returns realistic mock search data, and provides an in-app diagnostic test harness.

---

## 2. Mock Data Locations

All starter data, taxonomies, and simulation records are centralized in [`js/mockData.js`](js/mockData.js):

| Export Name | Description & Purpose |
|---|---|
| `AESTHETIC_TAGS` | Curated aesthetic categories (*Chatpata Desi, Gothic, Minimal, Streetwear, Traditional, Western, etc.*). |
| `DESIGNER_SUGGESTIONS` | Style muses and designer suggestion chips (*Sabyasachi, The Row, Vivienne Westwood, Zendaya, etc.*). |
| `PLATFORM_SUGGESTIONS` | Fashion retailer and thrift shopping hubs (*Zara, Depop, Myntra Luxe, Vestiaire Collective, etc.*). |
| `TREND_SUGGESTIONS` | Current micro and macro trends (*Clean Girl, Elevated Basics, Mob Wife, Dark Academia, etc.*). |
| `AVATAR_OPTIONS` | Scalable vector illustrations embedded directly in JS, avoiding broken external image links. |
| `STARTER_WARDROBE` | Initial capsule wardrobe (wool blazer, silk slip skirt, taupe trousers, chikankari kurta, molten gold hoops, boots, etc.). |
| `STARTER_THRIFT` | Sample community resale listings with conditions, prices, seller initials, and mock distances. |
| `STARTER_DONATIONS` | Sample free circular donation listings for mutual-aid causes (career closets, winter drives). |
| `SHOP_REFERENCES` | Curated editorial brand references with simulated links. |
| `CREATOR_PREVIEWS` | Editorial profile cards for upcoming Creator Discovery feature. |

---

## 3. Next Steps to Turn Prototype into a Real Product

1. **Authentication & Multi-Tenant Backend:**
   - Replace demo forms with Supabase Auth or NextAuth (JWT/OAuth with Google/Apple).
   - Migrate `localStorage` schemas to a relational PostgreSQL database with Row Level Security (RLS).

2. **Garment Image Pipeline:**
   - Integrate an automatic background-removal API (e.g. remove.bg or local WebAssembly segmenter) to isolate clothing items from user uploads.
   - Store compressed web-optimized images in Cloudflare R2 or AWS S3 with CDN delivery.

3. **Live TinyFish Automation Agent:**
   - Connect TinyFish browser automation workers to crawl product links entered by users.
   - Automatically extract item title, brand, fabric composition, color HEX codes, and pricing without requiring manual form entry.

4. **Geospatial & Real-Time Marketplace:**
   - Replace manual city inputs in Thrift and Donate with PostGIS geospatial queries (e.g., `ST_DWithin` for true radius queries).
   - Implement end-to-end encrypted messaging between buyers/donors using WebSockets or Supabase Realtime.

5. **Payments & Mutual-Aid Verification:**
   - Integrate Stripe Connect for peer-to-peer thrift payments with held escrow until delivery confirmation.
   - Add verification badges for non-profit shelters and university campus closets in the Free Donation flow.

6. **Multimodal AI Stylist:**
   - Transition `outfitEngine.js` to augment algorithmic matching with multimodal LLM embeddings (e.g. Gemini 2.0 Flash) to provide nuanced feedback on silhouette drape, weather appropriateness, and event dress codes.

// FIT CHECK - Mock & Starter Data
// Fashion-editorial curated starter items and taxonomy

export const AESTHETIC_TAGS = [
  { id: 'chatpata-desi', label: 'Chatpata Desi', desc: 'Vibrant, bold ethnic fusion with eclectic street flair' },
  { id: 'gothic', label: 'Gothic & Dark Glam', desc: 'Moody textures, rich velvets, lace, and dramatic dark silhouettes' },
  { id: 'minimal', label: 'Quiet Luxury & Minimal', desc: 'Clean lines, neutral tailoring, understated elegance' },
  { id: 'streetwear', label: 'Elevated Streetwear', desc: 'Oversized layers, chunky footwear, relaxed statement cuts' },
  { id: 'traditional', label: 'Heritage & Traditional', desc: 'Handloom silks, intricate embroidery, classic cultural staples' },
  { id: 'western', label: 'Contemporary Western', desc: 'Modern Parisian chic, structured blazers, denim, and trench coats' },
  { id: 'old-money', label: 'Old Money Aesthetic', desc: 'Linen shirts, cable knits, monochrome loafers, tennis skirts' },
  { id: 'balletcore', label: 'Balletcore & Soft Muse', desc: 'Wrap tops, tulle, satin slippers, and gentle pastel layers' },
  { id: 'indie-boho', label: 'Indie Sleaze & Boho', desc: 'Fringes, vintage leather, raw hems, and layered jewelry' }
];

export const DESIGNER_SUGGESTIONS = [
  'Vivienne Westwood', 'Sabyasachi', 'Jacquemus', 'The Row', 
  'Zendaya (Style Muse)', 'Komal Pandey', 'Bella Hadid', 'Maison Margiela',
  'Raw Mango', 'Prada', 'Iris Apfel', 'Haider Ackermann'
];

export const PLATFORM_SUGGESTIONS = [
  'Zara', 'Myntra Luxe', 'ASOS', 'Depop', 'H&M Trend', 
  'Vestiaire Collective', 'Local Thrift Bazaars', 'Pernia’s Pop-Up Shop', 'SSENSE'
];

export const TREND_SUGGESTIONS = [
  'Clean Girl Aesthetic', 'Elevated Basics', 'Mob Wife Glam', 
  'Dark Academia', 'Eclectic Grandpa', 'Monochrome Suiting', 'Metals Mixing'
];

export const AVATAR_OPTIONS = [
  {
    id: 'avatar-beret',
    name: 'Editorial Chic',
    svg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="48" fill="#F4EFEA" stroke="#E2959D" stroke-width="2"/>
      <ellipse cx="50" cy="36" rx="26" ry="14" fill="#211E1D"/>
      <path d="M48 20 C48 16 52 16 52 20 Z" fill="#211E1D"/>
      <circle cx="50" cy="52" r="19" fill="#F8E9EB"/>
      <path d="M38 50 Q50 56 62 50" stroke="#78716C" stroke-width="2" stroke-linecap="round" fill="none"/>
      <circle cx="43" cy="46" r="2" fill="#211E1D"/>
      <circle cx="57" cy="46" r="2" fill="#211E1D"/>
      <path d="M47 56 Q50 59 53 56" stroke="#D47A83" stroke-width="2" stroke-linecap="round" fill="none"/>
      <path d="M28 85 C32 68 68 68 72 85 Z" fill="#211E1D"/>
      <path d="M44 71 L50 78 L56 71 Z" fill="#FAF8F5"/>
    </svg>`
  },
  {
    id: 'avatar-bob',
    name: 'Minimalist Bob',
    svg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="48" fill="#FAF8F5" stroke="#D5CFC9" stroke-width="2"/>
      <path d="M30 46 C30 32 70 32 70 46 V62 H62 V52 C62 52 50 48 38 52 V62 H30 Z" fill="#8C827A"/>
      <circle cx="50" cy="54" r="17" fill="#FCEEED"/>
      <circle cx="43" cy="50" r="2" fill="#211E1D"/>
      <circle cx="57" cy="50" r="2" fill="#211E1D"/>
      <ellipse cx="50" cy="61" rx="3.5" ry="1.5" fill="#D47A83"/>
      <path d="M25 88 C30 72 70 72 75 88 Z" fill="#8C827A"/>
      <circle cx="36" cy="55" r="3" fill="#B08968"/>
      <circle cx="64" cy="55" r="3" fill="#B08968"/>
    </svg>`
  },
  {
    id: 'avatar-curls',
    name: 'Sculpted Curls',
    svg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="48" fill="#F4EFEA" stroke="#B08968" stroke-width="2"/>
      <circle cx="35" cy="38" r="12" fill="#211E1D"/>
      <circle cx="65" cy="38" r="12" fill="#211E1D"/>
      <circle cx="50" cy="30" r="14" fill="#211E1D"/>
      <circle cx="50" cy="54" r="18" fill="#E8B4B8"/>
      <path d="M42 48 Q50 47 58 48" stroke="#211E1D" stroke-width="1.5" fill="none"/>
      <circle cx="44" cy="51" r="2.2" fill="#211E1D"/>
      <circle cx="56" cy="51" r="2.2" fill="#211E1D"/>
      <path d="M46 62 Q50 65 54 62" stroke="#211E1D" stroke-width="2" stroke-linecap="round" fill="none"/>
      <path d="M28 88 C32 73 68 73 72 88 Z" fill="#FAF8F5" stroke="#211E1D" stroke-width="1.5"/>
    </svg>`
  },
  {
    id: 'avatar-jhumka',
    name: 'Desi Fusion',
    svg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="48" fill="#FAF8F5" stroke="#E2959D" stroke-width="2"/>
      <path d="M32 45 C32 30 68 30 68 45 C68 56 64 64 64 64 L36 64 C36 64 32 56 32 45 Z" fill="#1C1917"/>
      <circle cx="50" cy="52" r="17" fill="#F8E9EB"/>
      <circle cx="50" cy="46" r="2" fill="#B08968"/> <!-- Bindi -->
      <circle cx="43" cy="50" r="2" fill="#211E1D"/>
      <circle cx="57" cy="50" r="2" fill="#211E1D"/>
      <path d="M46 59 Q50 63 54 59" stroke="#D47A83" stroke-width="2" stroke-linecap="round" fill="none"/>
      <!-- Jhumkas -->
      <path d="M33 54 L30 60 L36 60 Z" fill="#B08968"/>
      <circle cx="33" cy="62" r="1.5" fill="#B08968"/>
      <path d="M67 54 L64 60 L70 60 Z" fill="#B08968"/>
      <circle cx="67" cy="62" r="1.5" fill="#B08968"/>
      <path d="M26 88 C32 72 68 72 74 88 Z" fill="#D47A83"/>
      <path d="M46 72 L50 82 L54 72 Z" fill="#FAF8F5"/>
    </svg>`
  }
];

export const STARTER_WARDROBE = [
  {
    id: 'w-1',
    name: 'Oversized Charcoal Wool Blazer',
    category: 'Outerwear',
    subCategory: 'Blazers',
    color: 'Charcoal',
    colorHex: '#211E1D',
    occasions: ['College', 'Work', 'Special Event', 'Party'],
    moods: ['Effortless & Chic', 'Bold & Dramatic', 'Edgy & Sleek'],
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=700&auto=format&fit=crop&q=80',
    notes: 'Thrifted Italian wool blend. Perfect boxy silhouette for layering over silk camis or hoodies.',
    isSample: true,
    addedAt: '2026-10-18T10:00:00Z'
  },
  {
    id: 'w-2',
    name: 'Ivory Silk Slip Midi Skirt',
    category: 'Bottoms',
    subCategory: 'Skirts',
    color: 'Ivory',
    colorHex: '#FAF8F5',
    occasions: ['Party', 'Vacation', 'Special Event', 'Casual Coffee'],
    moods: ['Romantic & Soft', 'Effortless & Chic'],
    image: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=700&auto=format&fit=crop&q=80',
    notes: 'Bias-cut mulberry silk with a subtle sheen. Drapes effortlessly and transitions from day to night.',
    isSample: true,
    addedAt: '2026-10-18T10:15:00Z'
  },
  {
    id: 'w-3',
    name: 'Wide-Leg Pleated Taupe Trousers',
    category: 'Bottoms',
    subCategory: 'Trousers',
    color: 'Taupe',
    colorHex: '#8C827A',
    occasions: ['College', 'Work', 'Casual Coffee', 'Special Event'],
    moods: ['Effortless & Chic', 'Cozy & Casual'],
    image: 'https://images.unsplash.com/photo-1509551388413-e18d0ac5d495?w=700&auto=format&fit=crop&q=80',
    notes: 'High-waisted tailored drape with deep pockets. Super comfortable for long campus days or flights.',
    isSample: true,
    addedAt: '2026-10-18T10:30:00Z'
  },
  {
    id: 'w-4',
    name: 'Fine-Knit Cream Ribbed Turtleneck',
    category: 'Tops',
    subCategory: 'Knitwear',
    color: 'Cream',
    colorHex: '#F4EFEA',
    occasions: ['College', 'Work', 'Casual Coffee', 'Vacation'],
    moods: ['Cozy & Casual', 'Effortless & Chic'],
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=700&auto=format&fit=crop&q=80',
    notes: 'Ultra-soft modal cotton knit. Great minimalist base layer under suits and leather jackets.',
    isSample: true,
    addedAt: '2026-10-18T10:45:00Z'
  },
  {
    id: 'w-5',
    name: 'Hand-Embroidered Chikankari Kurta',
    category: 'Tops',
    subCategory: 'Fusion & Ethnic',
    color: 'Blush Pink',
    colorHex: '#E2959D',
    occasions: ['College', 'Special Event', 'Vacation', 'Casual Coffee'],
    moods: ['Romantic & Soft', 'Effortless & Chic', 'Bold & Dramatic'],
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=700&auto=format&fit=crop&q=80',
    notes: 'Lucknowi artisan cotton with delicate shadow work. Pairs stunningly with denim or silver hoops.',
    isSample: true,
    addedAt: '2026-10-18T11:00:00Z'
  },
  {
    id: 'w-6',
    name: 'Sculptural Gold Molten Hoops',
    category: 'Jewelry & Accessories',
    subCategory: 'Earrings',
    color: 'Gold',
    colorHex: '#B08968',
    occasions: ['Party', 'Special Event', 'Work', 'College', 'Casual Coffee'],
    moods: ['Bold & Dramatic', 'Effortless & Chic', 'Edgy & Sleek'],
    image: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?w=700&auto=format&fit=crop&q=80',
    notes: '18k gold vermeil, organic droplet texture. Instantly pulls any simple outfit together.',
    isSample: true,
    addedAt: '2026-10-18T11:15:00Z'
  },
  {
    id: 'w-7',
    name: 'Square-Toe Leather Chelsea Boots',
    category: 'Footwear',
    subCategory: 'Boots',
    color: 'Charcoal',
    colorHex: '#211E1D',
    occasions: ['College', 'Party', 'Casual Coffee', 'Vacation'],
    moods: ['Edgy & Sleek', 'Effortless & Chic'],
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=700&auto=format&fit=crop&q=80',
    notes: 'Sleek architectural block heel. Weatherproof and effortlessly edgy with tailored trousers or skirts.',
    isSample: true,
    addedAt: '2026-10-18T11:30:00Z'
  },
  {
    id: 'w-8',
    name: 'Minimalist Crescent Leather Shoulder Bag',
    category: 'Jewelry & Accessories',
    subCategory: 'Bags',
    color: 'Taupe',
    colorHex: '#8C827A',
    occasions: ['Party', 'Vacation', 'Casual Coffee', 'Special Event'],
    moods: ['Effortless & Chic', 'Edgy & Sleek'],
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=700&auto=format&fit=crop&q=80',
    notes: 'Clean crescent silhouette with silver buckle detail. Fits phone, lip tint, and keys.',
    isSample: true,
    addedAt: '2026-10-18T11:45:00Z'
  }
];

export const STARTER_THRIFT = [
  {
    id: 'th-1',
    title: 'Vintage Leather Biker Jacket with Brass Hardware',
    category: 'Outerwear',
    price: 65,
    currency: '$',
    condition: 'Gently Loved (Vintage patina)',
    size: 'M (Oversized fit on S)',
    location: 'Brooklyn, NY (approx 3.2 mi)',
    sellerName: 'Clara V.',
    sellerAvatarInitials: 'CV',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=700&auto=format&fit=crop&q=80',
    story: 'Sourced from an estate sale in Montreal. Rich distressed finish, genuine heavyweight leather.',
    isMockListing: true
  },
  {
    id: 'th-2',
    title: 'Pure Linen Kimono Cardigan & Belt',
    category: 'Outerwear',
    price: 32,
    currency: '$',
    condition: 'Like New (Never worn)',
    size: 'Free Size',
    location: 'SoHo, NY (approx 1.8 mi)',
    sellerName: 'Aarav M.',
    sellerAvatarInitials: 'AM',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=700&auto=format&fit=crop&q=80',
    story: 'Handcrafted natural flax linen with wide bell sleeves. Bought for a trip and never wore it.',
    isMockListing: true
  },
  {
    id: 'th-3',
    title: 'Silver Kundan & Pearl Layered Choker',
    category: 'Jewelry & Accessories',
    price: 40,
    currency: '$',
    condition: 'Excellent Vintage',
    size: 'Adjustable dori',
    location: 'Queens, NY (approx 6.4 mi)',
    sellerName: 'Meera S.',
    sellerAvatarInitials: 'MS',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=700&auto=format&fit=crop&q=80',
    story: 'Worn once for a family reception. Authentic glass kundan set in oxidised silver plating.',
    isMockListing: true
  },
  {
    id: 'th-4',
    title: 'Pleated A-Line Midi Dress in Olive Satin',
    category: 'Dresses & Sets',
    price: 48,
    currency: '$',
    condition: 'Gently Loved',
    size: 'S',
    location: 'Williamsburg, NY (approx 4.0 mi)',
    sellerName: 'Zoe K.',
    sellerAvatarInitials: 'ZK',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=700&auto=format&fit=crop&q=80',
    story: 'Stunning drape for wedding guest outfits or gallery openings. Dry cleaned and ready for wear.',
    isMockListing: true
  }
];

export const STARTER_DONATIONS = [
  {
    id: 'dn-1',
    title: 'Women’s Formal Interview Blazers & Slacks (Set of 2)',
    category: 'Outerwear / Sets',
    size: 'M / 8',
    condition: 'Clean & Wearable',
    recipientCause: 'Career Closet for First-Gen College Grads',
    location: 'Downtown Center Hub',
    pickupMethod: 'Drop-off at Community Center or Free Porch Pickup',
    donorNotes: 'High quality navy & charcoal suiting, dry cleaned. Looking to support someone entering professional interviews.',
    isMockDonation: true,
    isFree: true
  },
  {
    id: 'dn-2',
    title: 'Cozy Fleece Sweaters & Thermal Winter Scarves (Bundle)',
    category: 'Knitwear & Accessories',
    size: 'Unisex L',
    condition: 'Excellent Warm Condition',
    recipientCause: 'Local Winter Warmth Shelter Drive',
    location: 'East Side Hub',
    pickupMethod: 'Drop-off Box #14',
    donorNotes: 'Thick cable knits and warm woolen scarves. Freshly washed in fragrance-free detergent.',
    isMockDonation: true,
    isFree: true
  },
  {
    id: 'dn-3',
    title: 'Sturdy Campus Backpack & Casual Sneakers',
    category: 'Bags & Footwear',
    size: 'US 7.5',
    condition: 'Gently Used, Solid Soles',
    recipientCause: 'Student Mutual Aid Clothing Swap',
    location: 'University District',
    pickupMethod: 'Campus Locker Free Exchange',
    donorNotes: 'Canvas backpack with laptop sleeve plus minimal canvas sneakers. Ready for everyday wear.',
    isMockDonation: true,
    isFree: true
  }
];

export const SHOP_REFERENCES = [
  {
    id: 'shop-1',
    brand: 'The Row (Reference Look)',
    itemTitle: 'Minimalist Wool Trench Coat in Raw Umber',
    priceTier: 'Luxury Reference ($$$$)',
    category: 'Outerwear & Tailoring',
    aestheticTag: 'Quiet Luxury & Minimal',
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=700&auto=format&fit=crop&q=80',
    curatorNote: 'Editorial inspiration for effortless long proportions and draped neutral wool.',
    mockUrl: 'https://example.com/mock-reference/the-row-trench',
    isMockData: true
  },
  {
    id: 'shop-2',
    brand: 'Raw Mango (Cultural Reference)',
    itemTitle: 'Handwoven Chanderi Silk Angrakha Set',
    priceTier: 'Artisanal Luxury ($$$)',
    category: 'Heritage & Fusion',
    aestheticTag: 'Chatpata Desi',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=700&auto=format&fit=crop&q=80',
    curatorNote: 'Masterclass in traditional textiles paired with contemporary minimalist styling.',
    mockUrl: 'https://example.com/mock-reference/raw-mango-angrakha',
    isMockData: true
  },
  {
    id: 'shop-3',
    brand: 'Reformation (Sustainable High-Street)',
    itemTitle: 'Cowl Neck Silk Slip Maxi Dress in Blush',
    priceTier: 'Contemporary ($$)',
    category: 'Dresses',
    aestheticTag: 'Balletcore & Soft Muse',
    image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=700&auto=format&fit=crop&q=80',
    curatorNote: 'Certified climate-neutral silk slip. Great silhouette reference for romantic party styling.',
    mockUrl: 'https://example.com/mock-reference/reformation-silk-slip',
    isMockData: true
  },
  {
    id: 'shop-4',
    brand: 'Mejuri (Fine Jewelry)',
    itemTitle: 'Bold Ribbed Dôme Ring in 14k Gold',
    priceTier: 'Demi-Fine ($$)',
    category: 'Jewelry & Accessories',
    aestheticTag: 'Quiet Luxury & Minimal',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=700&auto=format&fit=crop&q=80',
    curatorNote: 'Architectural staple piece designed for everyday stacking with mixed metals.',
    mockUrl: 'https://example.com/mock-reference/mejuri-dome-ring',
    isMockData: true
  }
];

export const CREATOR_PREVIEWS = [
  {
    id: 'cr-1',
    handle: '@maya.editorial',
    name: 'Maya Rao',
    aesthetic: 'Chatpata Desi × Minimalist Suiting',
    followers: '42K',
    bio: 'Draping heritage sarees over tailored oversized blazers. Mumbai & London.',
    previewImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'cr-2',
    handle: '@sylvie.archives',
    name: 'Sylvie Chen',
    aesthetic: 'Gothic Romance & 90s Deconstructed',
    followers: '68K',
    bio: 'Archival Japanese denim, distressed leather, and secondhand poetry.',
    previewImage: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'cr-3',
    handle: '@elena.capsule',
    name: 'Elena Rostova',
    aesthetic: 'Quiet Luxury & Old Money Neutrals',
    followers: '115K',
    bio: '30-piece capsule wardrobe for all 4 seasons. Neutral palettes only.',
    previewImage: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&auto=format&fit=crop&q=80'
  }
];

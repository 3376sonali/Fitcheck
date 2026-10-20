// TinyFish Web Research & Fashion Automation Adapter
// Service placeholder for automated fashion reference and retailer discovery

/**
 * TinyFish Service Adapter (Placeholder)
 * 
 * INTENDED PURPOSE:
 * TinyFish is envisioned as the automated web research agent for FIT CHECK.
 * In a production architecture, TinyFish automates:
 * 1. Discovering fashion reference lookbooks and runway archives based on style queries.
 * 2. Crawling retailer and resale product pages to extract garment silhouettes, fabric compositions,
 *    color palettes, sizes, and price tiers.
 * 3. Detecting visually similar wardrobe matches across sustainable and second-hand platforms.
 * 
 * PROTOTYPE STATUS:
 * - TinyFish API credentials and live endpoints are NOT configured in this prototype.
 * - This adapter gracefully catches unconfigured states and delivers realistic mock fallbacks.
 * - No fake authentication or misleading network calls are performed.
 */

export class TinyFishService {
  constructor() {
    this.apiKey = window.TINYFISH_CONFIG?.apiKey || null;
    this.endpoint = window.TINYFISH_CONFIG?.endpoint || null;
    this.isDemoFallbackMode = true;
  }

  /**
   * Check if TinyFish live service credentials have been configured
   */
  isConfigured() {
    return Boolean(this.apiKey && this.endpoint);
  }

  /**
   * Status information for the UI badge / debug drawer
   */
  getStatus() {
    return {
      configured: this.isConfigured(),
      statusText: this.isConfigured() ? 'Connected (Live)' : 'Mock Fallback Mode (Unconfigured)',
      endpoint: this.endpoint || 'Not configured (Local Prototype)',
      requiresSetup: !this.isConfigured(),
      capabilities: [
        'Automated runway & lookbook visual extraction',
        'Retailer product metadata parsing (cut, fabric, silhouette)',
        'Resale & thrift price trend crawling',
        'Cross-brand color palette harmonization'
      ],
      setupRequirements: [
        '1. Set window.TINYFISH_CONFIG = { apiKey: "tf_live_...", endpoint: "https://api.tinyfish.ai/v1" }',
        '2. Configure headless browser automation concurrency & rate limits',
        '3. Authorize allowed fashion platform domains for automated extraction'
      ]
    };
  }

  /**
   * Search for fashion references via TinyFish web research
   * Returns a promise with simulated or live results
   */
  async searchFashionReferences(query) {
    if (!this.isConfigured()) {
      // Intentional demo fallback
      console.info(`[TinyFishService] Live credentials unconfigured. Providing curated demo fallback for query: "${query}"`);
      
      // Simulate slight realistic processing latency
      await new Promise(resolve => setTimeout(resolve, 450));

      const fallbackDatabase = [
        {
          id: `tf-ref-1`,
          title: `Editorial ${query || 'Capsule'} Reference — High-Neck Layering`,
          sourcePlatform: 'Curated Lookbook Archives',
          domain: 'vogue-archives.demo',
          visualTag: 'Minimalist Structure',
          summary: `Deconstructed monochromatic tailoring with structured lapels. Sourced by TinyFish research engine simulation.`,
          sampleImage: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=700&auto=format&fit=crop&q=80',
          isMock: true,
          tinyfishDiscovered: true
        },
        {
          id: `tf-ref-2`,
          title: `Artisanal Texture & Drape Study: ${query || 'Fusion Elegance'}`,
          sourcePlatform: 'Textile Heritage Repository',
          domain: 'craft-curation.demo',
          visualTag: 'Handloom & Contemporary',
          summary: `Fluid handwoven textiles combined with clean Western silhouettes.`,
          sampleImage: 'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=700&auto=format&fit=crop&q=80',
          isMock: true,
          tinyfishDiscovered: true
        },
        {
          id: `tf-ref-3`,
          title: `Contemporary Street Proportion: ${query || 'Relaxed Cut'}`,
          sourcePlatform: 'Paris Street Style Feed',
          domain: 'street-archives.demo',
          visualTag: 'Relaxed Tailoring',
          summary: `Oversized proportions grounded by vintage leather boots and minimal jewelry.`,
          sampleImage: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=700&auto=format&fit=crop&q=80',
          isMock: true,
          tinyfishDiscovered: true
        }
      ];

      return {
        success: true,
        isMockFallback: true,
        source: 'TinyFish Prototype Mock Adapter',
        query,
        count: fallbackDatabase.length,
        results: fallbackDatabase
      };
    }

    // Live branch placeholder for when credentials exist in the future:
    try {
      const response = await fetch(`${this.endpoint}/research/fashion`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query })
      });
      return await response.json();
    } catch (err) {
      console.error('[TinyFishService] Request failed, reverting to mock fallback', err);
      return { success: false, error: err.message, isMockFallback: true };
    }
  }

  /**
   * Scrape / parse garment metadata from a retail URL placeholder
   */
  async scrapeGarmentMetadata(url) {
    if (!this.isConfigured()) {
      await new Promise(resolve => setTimeout(resolve, 350));
      return {
        success: true,
        isMockFallback: true,
        extractedData: {
          url,
          title: 'Simulated Extracted Silk-Linen Trench',
          estimatedPrice: '$148.00',
          category: 'Outerwear',
          dominantColors: ['#FAF8F5', '#8C827A'],
          silhouette: 'Relaxed Tailored',
          extractedAt: new Date().toISOString()
        }
      };
    }
    // Future live implementation placeholder
    return { success: false, message: 'Live extraction requires active TinyFish backend worker.' };
  }
}

// Singleton instance for client UI
export const tinyFish = new TinyFishService();

// FIT CHECK - Editorial Outfit Planning Engine
// Algorithmically styles outfits from user wardrobe items based on Occasion, Mood, & Reference

export class OutfitEngine {
  /**
   * Generates a styled look strictly using available wardrobe items
   */
  static generateLook({ wardrobe, occasion, mood, reference = '', userProfile = {} }) {
    if (!wardrobe || wardrobe.length === 0) {
      return {
        success: false,
        empty: true,
        message: 'Your wardrobe is currently empty. Add a few pieces or load the starter wardrobe to begin outfit planning.'
      };
    }

    // Categorize wardrobe
    const tops = wardrobe.filter(i => i.category === 'Tops');
    const bottoms = wardrobe.filter(i => i.category === 'Bottoms');
    const dresses = wardrobe.filter(i => i.category === 'Dresses & Sets');
    const outerwear = wardrobe.filter(i => i.category === 'Outerwear');
    const footwear = wardrobe.filter(i => i.category === 'Footwear');
    const accessories = wardrobe.filter(i => i.category === 'Jewelry & Accessories');

    // Score function based on occasion, mood, and aesthetic relevance
    const scoreItem = (item) => {
      let score = 1;
      if (item.occasions && item.occasions.includes(occasion)) score += 3;
      if (item.moods && item.moods.includes(mood)) score += 3;
      // Bonus if color complements blush/neutrals
      if (['Ivory', 'Cream', 'Charcoal', 'Taupe', 'Blush Pink', 'Gold'].includes(item.color)) score += 1;
      return score + Math.random() * 0.5; // slight variety for subsequent rolls
    };

    const sortByScore = (list) => [...list].sort((a, b) => scoreItem(b) - scoreItem(a));

    const selectedItems = [];
    let lookType = 'separates';

    // Decide between Dress or Top+Bottom
    const hasDresses = dresses.length > 0;
    const hasTopsAndBottoms = tops.length > 0 && bottoms.length > 0;

    const preferDress = hasDresses && (
      (occasion === 'Party' || occasion === 'Special Event' || occasion === 'Vacation') &&
      (!hasTopsAndBottoms || Math.random() > 0.45)
    );

    if (preferDress) {
      const topDress = sortByScore(dresses)[0];
      selectedItems.push(topDress);
      lookType = 'dress';
    } else {
      if (tops.length > 0) {
        selectedItems.push(sortByScore(tops)[0]);
      }
      if (bottoms.length > 0) {
        selectedItems.push(sortByScore(bottoms)[0]);
      }
    }

    // Add Outerwear if appropriate
    if (outerwear.length > 0) {
      const bestOuter = sortByScore(outerwear)[0];
      // Include outerwear if occasion calls for it or if user mood suggests structure
      if (occasion !== 'Vacation' || mood.includes('Dramatic') || Math.random() > 0.3) {
        selectedItems.push(bestOuter);
      }
    }

    // Add Footwear
    if (footwear.length > 0) {
      selectedItems.push(sortByScore(footwear)[0]);
    }

    // Add Accessories / Jewelry
    if (accessories.length > 0) {
      const sortedAcc = sortByScore(accessories);
      selectedItems.push(sortedAcc[0]);
      if (sortedAcc.length > 1 && Math.random() > 0.3) {
        selectedItems.push(sortedAcc[1]);
      }
    }

    // Ensure we have at least one or two items
    if (selectedItems.length === 0) {
      selectedItems.push(...wardrobe.slice(0, Math.min(3, wardrobe.length)));
    }

    // Generate bespoke editorial reasoning
    const stylingRationale = this.craftEditorialNotes({
      items: selectedItems,
      occasion,
      mood,
      reference,
      userProfile
    });

    const palette = [...new Set(selectedItems.map(i => i.color || 'Neutral'))];

    return {
      success: true,
      occasion,
      mood,
      reference: reference.trim(),
      items: selectedItems,
      lookType,
      palette,
      stylingTitle: this.craftLookTitle(occasion, mood, reference),
      stylingRationale,
      missingCategories: this.detectMissingPieces(wardrobe)
    };
  }

  static craftLookTitle(occasion, mood, reference) {
    if (reference) {
      return `The “${reference}” Editorial Edit`;
    }
    const moodAdjectives = {
      'Effortless & Chic': 'Sculpted Ease',
      'Bold & Dramatic': 'Graphic Statement',
      'Cozy & Casual': 'Elevated Loungewear',
      'Romantic & Soft': 'Ethereal Silhouette',
      'Edgy & Sleek': 'Architectural Edge'
    };
    return `${moodAdjectives[mood] || mood} for ${occasion}`;
  }

  static craftEditorialNotes({ items, occasion, mood, reference, userProfile }) {
    const itemNames = items.map(i => i.name);
    const colors = [...new Set(items.map(i => i.color))].join(' and ');

    let refNote = '';
    if (reference) {
      refNote = `Taking clear cues from the iconic ${reference} moodboard, `;
    }

    const moodPhrases = {
      'Effortless & Chic': 'prioritizes fluid movement and understated luxury without feeling overstyled.',
      'Bold & Dramatic': 'leans into commanding proportions, strong textures, and intentional contrast.',
      'Cozy & Casual': 'harmonizes tactile comfort with refined tailoring suitable for effortless daily wear.',
      'Romantic & Soft': 'celebrates tender draping, gentle light reflection, and subtle artisan details.',
      'Edgy & Sleek': 'delivers crisp architectural cut lines and a sharp, modern cosmopolitan sensibility.'
    };

    const occasionGuidance = {
      'College': 'It strikes the perfect balance for campus mobility while feeling impeccably put-together.',
      'Party': 'Catches ambient evening light gracefully, moving from dinner to late-night celebrations.',
      'Vacation': 'Breathes easily in warm breezes, packing effortlessly into a lightweight carry-on.',
      'Special Event': 'Commands quiet reverence with poise and refined tailoring that photographs timelessly.',
      'Work': 'Projects executive polish and contemporary elegance in any professional room.',
      'Casual Coffee': 'Effortlessly polished for spontaneous neighborhood strolls and espresso bar catchups.'
    };

    return {
      headline: `${refNote ? refNote.charAt(0).toUpperCase() + refNote.slice(1) : ''}This curated ensemble ${moodPhrases[mood] || 'balances personal expression with timeless ease.'}`,
      breakdown: `Anchored in a palette of ${colors}, the juxtaposition of ${itemNames.slice(0, 2).join(' with ')} creates balanced visual weight. ${items.length > 2 ? `Completed with ${items.slice(2).map(i => i.name).join(' and ')} for thoughtful detail.` : ''}`,
      stylistTip: occasionGuidance[occasion] || 'Style with confident poise and your signature scent.'
    };
  }

  static detectMissingPieces(wardrobe) {
    const categories = ['Tops', 'Bottoms', 'Outerwear', 'Footwear', 'Jewelry & Accessories'];
    const existing = new Set(wardrobe.map(i => i.category));
    return categories.filter(c => !existing.has(c));
  }
}

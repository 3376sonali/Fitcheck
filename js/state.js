// FIT CHECK - Client-side State & Storage Engine
// Uses localStorage for prototype persistence with instant reactivity

import { STARTER_WARDROBE, STARTER_THRIFT, STARTER_DONATIONS } from './mockData.js';

const STORAGE_KEYS = {
  PROFILE: 'fitcheck_profile_v1',
  WARDROBE: 'fitcheck_wardrobe_v1',
  THRIFT: 'fitcheck_thrift_v1',
  DONATIONS: 'fitcheck_donations_v1',
  SAVED_OUTFITS: 'fitcheck_outfits_v1'
};

const DEFAULT_PROFILE = {
  name: 'Rhea Sen',
  username: 'rheasen',
  email: 'rhea.sen@demo-fitcheck.studio',
  avatar: {
    type: 'preset',
    value: 'avatar-beret',
    initials: 'RS',
    color: '#D47A83'
  },
  aesthetics: ['chatpata-desi', 'minimal', 'western'],
  moodDependent: true,
  designers: ['Vivienne Westwood', 'Sabyasachi', 'The Row'],
  platforms: ['Zara', 'Depop', 'Local Thrift Bazaars'],
  trends: ['Clean Girl Aesthetic', 'Elevated Basics', 'Monochrome Suiting'],
  stylePreferences: {
    silhouette: 'Relaxed & Tailored',
    palette: 'Warm Neutrals with Blush & Charcoal Accents',
    metals: 'Gold Vermeil'
  },
  referenceImage: null,
  onboarded: false // user can begin from welcome screen
};

class StateManager {
  constructor() {
    this.init();
  }

  init() {
    if (!localStorage.getItem(STORAGE_KEYS.PROFILE)) {
      this.setProfile(DEFAULT_PROFILE);
    }
    if (!localStorage.getItem(STORAGE_KEYS.WARDROBE)) {
      this.setWardrobe(STARTER_WARDROBE);
    }
    if (!localStorage.getItem(STORAGE_KEYS.THRIFT)) {
      this.setThriftListings(STARTER_THRIFT);
    }
    if (!localStorage.getItem(STORAGE_KEYS.DONATIONS)) {
      this.setDonations(STARTER_DONATIONS);
    }
    if (!localStorage.getItem(STORAGE_KEYS.SAVED_OUTFITS)) {
      localStorage.setItem(STORAGE_KEYS.SAVED_OUTFITS, JSON.stringify([]));
    }
  }

  // --- Profile Methods ---
  getProfile() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PROFILE);
      return data ? JSON.parse(data) : { ...DEFAULT_PROFILE };
    } catch (e) {
      console.warn('Error reading profile state', e);
      return { ...DEFAULT_PROFILE };
    }
  }

  setProfile(profileData) {
    const current = this.getProfile();
    const updated = { ...current, ...profileData };
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(updated));
    this.notify('profile', updated);
    return updated;
  }

  // --- Wardrobe Methods ---
  getWardrobe() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.WARDROBE);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  setWardrobe(items) {
    localStorage.setItem(STORAGE_KEYS.WARDROBE, JSON.stringify(items));
    this.notify('wardrobe', items);
    return items;
  }

  addWardrobeItem(item) {
    const items = this.getWardrobe();
    const newItem = {
      ...item,
      id: 'w-' + Date.now().toString(36) + Math.random().toString(36).substring(2, 5),
      addedAt: new Date().toISOString(),
      isSample: false // User-created item
    };
    items.unshift(newItem);
    this.setWardrobe(items);
    return newItem;
  }

  removeWardrobeItem(id) {
    const items = this.getWardrobe().filter(item => item.id !== id);
    this.setWardrobe(items);
    return items;
  }

  loadSampleWardrobe() {
    this.setWardrobe([...STARTER_WARDROBE]);
    return STARTER_WARDROBE;
  }

  clearWardrobe() {
    this.setWardrobe([]);
    return [];
  }

  // --- Thrift Listings ---
  getThriftListings() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.THRIFT);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  setThriftListings(listings) {
    localStorage.setItem(STORAGE_KEYS.THRIFT, JSON.stringify(listings));
    this.notify('thrift', listings);
    return listings;
  }

  addThriftListing(listing) {
    const listings = this.getThriftListings();
    const user = this.getProfile();
    const newListing = {
      ...listing,
      id: 'th-' + Date.now().toString(36),
      sellerName: user.name || 'Anonymous User',
      sellerAvatarInitials: (user.name || 'Me').split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2),
      currency: '$',
      isMockListing: true
    };
    listings.unshift(newListing);
    this.setThriftListings(listings);
    return newListing;
  }

  removeThriftListing(id) {
    const listings = this.getThriftListings().filter(item => item.id !== id);
    this.setThriftListings(listings);
    return listings;
  }

  // --- Donation Listings ---
  getDonations() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.DONATIONS);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  setDonations(donations) {
    localStorage.setItem(STORAGE_KEYS.DONATIONS, JSON.stringify(donations));
    this.notify('donations', donations);
    return donations;
  }

  addDonation(donation) {
    const list = this.getDonations();
    const newDonation = {
      ...donation,
      id: 'dn-' + Date.now().toString(36),
      isMockDonation: true,
      isFree: true,
      createdAt: new Date().toISOString()
    };
    list.unshift(newDonation);
    this.setDonations(list);
    return newDonation;
  }

  // --- Saved Outfits ---
  getSavedOutfits() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SAVED_OUTFITS);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  saveOutfit(outfit) {
    const list = this.getSavedOutfits();
    const newOutfit = {
      ...outfit,
      id: 'outfit-' + Date.now().toString(36),
      savedAt: new Date().toISOString()
    };
    list.unshift(newOutfit);
    localStorage.setItem(STORAGE_KEYS.SAVED_OUTFITS, JSON.stringify(list));
    this.notify('savedOutfits', list);
    return newOutfit;
  }

  // --- Reset Entire Demo State ---
  resetAll() {
    localStorage.removeItem(STORAGE_KEYS.PROFILE);
    localStorage.removeItem(STORAGE_KEYS.WARDROBE);
    localStorage.removeItem(STORAGE_KEYS.THRIFT);
    localStorage.removeItem(STORAGE_KEYS.DONATIONS);
    localStorage.removeItem(STORAGE_KEYS.SAVED_OUTFITS);
    this.init();
    this.notify('all', null);
  }

  // Reactive listener notification
  notify(key, value) {
    window.dispatchEvent(new CustomEvent('fitcheck:statechange', {
      detail: { key, value }
    }));
  }
}

export const state = new StateManager();

// FIT CHECK - Main Application Controller
// Orchestrates screens, user interactions, modals, and reactive views

import { 
  AESTHETIC_TAGS, 
  DESIGNER_SUGGESTIONS, 
  PLATFORM_SUGGESTIONS, 
  TREND_SUGGESTIONS, 
  AVATAR_OPTIONS,
  STARTER_WARDROBE,
  SHOP_REFERENCES,
  CREATOR_PREVIEWS
} from './mockData.js';

import { state } from './state.js';
import { OutfitEngine } from './outfitEngine.js';
import { tinyFish } from './tinyfishAdapter.js';

// DOM Elements Cache
const DOM = {
  // Screens
  screenWelcome: document.getElementById('screen-welcome'),
  screenStep1: document.getElementById('screen-step1-profile'),
  screenStep2: document.getElementById('screen-step2-onboarding'),
  screenStep3: document.getElementById('screen-step3-avatar'),
  screenDashboard: document.getElementById('screen-dashboard'),
  dashboardTabsBar: document.getElementById('dashboard-tabs-bar'),

  // Header Elements
  navBrandLogo: document.getElementById('nav-brand-logo'),
  headerAvatarSlot: document.getElementById('header-avatar-slot'),
  headerUserName: document.getElementById('header-user-name'),
  navUserChip: document.getElementById('nav-user-chip'),
  btnTinyFishModal: document.getElementById('btn-tinyfish-modal'),
  btnOpenTinyFishBanner: document.getElementById('btn-open-tinyfish-banner'),
  topTinyFishStatus: document.getElementById('top-tinyfish-status'),
  btnResetDemoTop: document.getElementById('btn-reset-demo-top'),

  // Step 1 Form
  formStep1: document.getElementById('form-step1-profile'),
  inputProfName: document.getElementById('input-prof-name'),
  inputProfUsername: document.getElementById('input-prof-username'),
  inputProfEmail: document.getElementById('input-prof-email'),
  btnStep1Skip: document.getElementById('btn-step1-skip'),

  // Step 2 Onboarding
  onboardingAestheticsGrid: document.getElementById('onboarding-aesthetics-grid'),
  toggleMoodDependent: document.getElementById('toggle-mood-dependent'),
  onboardingDesignersPool: document.getElementById('onboarding-designers-pool'),
  onboardingPlatformsPool: document.getElementById('onboarding-platforms-pool'),
  onboardingTrendsPool: document.getElementById('onboarding-trends-pool'),
  inputOnboardingImage: document.getElementById('input-onboarding-image'),
  onboardingUploadDropzone: document.getElementById('onboarding-upload-dropzone'),
  onboardingPreviewHolder: document.getElementById('onboarding-preview-holder'),
  onboardingPreviewImg: document.getElementById('onboarding-preview-img'),
  onboardingUploadPrompt: document.getElementById('onboarding-upload-prompt'),
  btnStep2Back: document.getElementById('btn-step2-back'),
  btnStep2Skip: document.getElementById('btn-step2-skip'),
  btnStep2Next: document.getElementById('btn-step2-next'),

  // Step 3 Avatar
  avatarPresetsGrid: document.getElementById('avatar-presets-grid'),
  btnUseInitialsAvatar: document.getElementById('btn-use-initials-avatar'),
  btnStep3Back: document.getElementById('btn-step3-back'),
  btnStep3Finish: document.getElementById('btn-step3-finish'),

  // Dashboard Tabs
  tabButtons: document.querySelectorAll('.tab-btn'),
  dashboardViews: document.querySelectorAll('.dashboard-view'),
  tabCountWardrobe: document.getElementById('tab-count-wardrobe'),
  tabCountThrift: document.getElementById('tab-count-thrift'),
  tabCountDonate: document.getElementById('tab-count-donate'),

  // Wardrobe View
  wardrobeCategoryFilters: document.getElementById('wardrobe-category-filters'),
  wardrobeItemsGrid: document.getElementById('wardrobe-items-grid'),
  wardrobeEmptyState: document.getElementById('wardrobe-empty-state'),
  btnLoadSampleWardrobe: document.getElementById('btn-load-sample-wardrobe'),
  btnOpenAddWardrobeModal: document.getElementById('btn-open-add-wardrobe-modal'),
  btnEmptyLoadSamples: document.getElementById('btn-empty-load-samples'),
  btnEmptyAddItem: document.getElementById('btn-empty-add-item'),

  // Styler View
  stylerOccasionOptions: document.getElementById('styler-occasion-options'),
  stylerMoodOptions: document.getElementById('styler-mood-options'),
  inputStyleReference: document.getElementById('input-style-reference'),
  btnGenerateOutfit: document.getElementById('btn-generate-outfit'),
  stylerResultCanvas: document.getElementById('styler-result-canvas'),
  stylerLoadingState: document.getElementById('styler-loading-state'),
  stylerOutputContent: document.getElementById('styler-output-content'),

  // Thrift View
  inputThriftSearch: document.getElementById('input-thrift-search'),
  selectThriftDistance: document.getElementById('select-thrift-distance'),
  inputThriftLocation: document.getElementById('input-thrift-location'),
  thriftListingsGrid: document.getElementById('thrift-listings-grid'),
  btnOpenAddThriftModal: document.getElementById('btn-open-add-thrift-modal'),

  // Donate View
  donationListingsGrid: document.getElementById('donation-listings-grid'),
  btnOpenAddDonationModal: document.getElementById('btn-open-add-donation-modal'),

  // Shop & Creator Views
  shopReferencesGrid: document.getElementById('shop-references-grid'),
  creatorsPreviewGrid: document.getElementById('creators-preview-grid'),
  btnJoinCreatorWaitlist: document.getElementById('btn-join-creator-waitlist'),
  inputCreatorEmail: document.getElementById('input-creator-email'),

  // Modals
  modalAddWardrobe: document.getElementById('modal-add-wardrobe'),
  formAddWardrobe: document.getElementById('form-add-wardrobe'),
  wardrobePhotoPresets: document.getElementById('wardrobe-photo-presets'),
  inputWardrobeFile: document.getElementById('input-wardrobe-file'),
  modalAddThrift: document.getElementById('modal-add-thrift'),
  formAddThrift: document.getElementById('form-add-thrift'),
  modalAddDonation: document.getElementById('modal-add-donation'),
  formAddDonation: document.getElementById('form-add-donation'),
  modalTinyFishService: document.getElementById('modal-tinyfish-service'),
  modalResetConfirm: document.getElementById('modal-reset-confirm'),
  btnConfirmResetAll: document.getElementById('btn-confirm-reset-all'),

  // TinyFish Test elements
  inputTfTestQuery: document.getElementById('input-tf-test-query'),
  btnRunTfTest: document.getElementById('btn-run-tf-test'),
  tfTestResultsArea: document.getElementById('tf-test-results-area'),

  // Toasts
  toastContainer: document.getElementById('toast-container')
};

// Application State Cache
let activeScreen = 'welcome';
let activeDashboardTab = 'wardrobe';
let activeWardrobeFilter = 'all';
let selectedAvatarId = 'avatar-beret';
let selectedWardrobePresetImage = STARTER_WARDROBE[0].image;
let currentCustomWardrobeImageBase64 = null;
let currentOnboardingImageBase64 = null;

// Initialize Application
function initApp() {
  setupNavigation();
  setupOnboardingUI();
  setupWardrobeEvents();
  setupStylerEvents();
  setupThriftEvents();
  setupDonationEvents();
  setupShopReferences();
  setupCreatorsUI();
  setupModals();
  setupTinyFishInspector();

  // Listen for state changes
  window.addEventListener('fitcheck:statechange', handleStateChange);

  // Load initial view
  renderUserProfile();
  renderWardrobeGrid();
  renderThriftGrid();
  renderDonationGrid();
  updateBadgeCounts();

  // Initial outfit generation preview
  generateOutfitLook();
}

// ==========================================================================
// NAVIGATION & SCREEN MANAGEMENT
// ==========================================================================

function showScreen(screenName) {
  activeScreen = screenName;
  const screens = [
    { name: 'welcome', el: DOM.screenWelcome },
    { name: 'step1', el: DOM.screenStep1 },
    { name: 'step2', el: DOM.screenStep2 },
    { name: 'step3', el: DOM.screenStep3 },
    { name: 'dashboard', el: DOM.screenDashboard }
  ];

  screens.forEach(s => {
    if (s.name === screenName) {
      s.el.classList.add('active');
    } else {
      s.el.classList.remove('active');
    }
  });

  // Toggle dashboard nav bar visibility
  if (screenName === 'dashboard') {
    DOM.dashboardTabsBar.style.display = 'block';
  } else {
    DOM.dashboardTabsBar.style.display = 'none';
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function setupNavigation() {
  // Welcome page actions
  document.getElementById('btn-welcome-get-started')?.addEventListener('click', () => {
    showScreen('step1');
  });

  document.getElementById('btn-welcome-skip-to-studio')?.addEventListener('click', () => {
    showScreen('dashboard');
    showToast('Entered Fit Check Studio with sample wardrobe capsule.', '✨');
  });

  // Brand click returns to appropriate home
  DOM.navBrandLogo?.addEventListener('click', () => {
    const profile = state.getProfile();
    if (profile.onboarded) {
      showScreen('dashboard');
    } else {
      showScreen('welcome');
    }
  });

  DOM.navUserChip?.addEventListener('click', () => {
    showScreen('step1');
  });

  // Step 1 Form Actions
  DOM.formStep1?.addEventListener('submit', (e) => {
    e.preventDefault();
    state.setProfile({
      name: DOM.inputProfName.value.trim() || 'Rhea Sen',
      username: DOM.inputProfUsername.value.trim() || 'rheasen',
      email: DOM.inputProfEmail.value.trim() || 'rhea@demo-fitcheck.studio'
    });
    showToast('Profile created for this session.', '✓');
    showScreen('step2');
  });

  DOM.btnStep1Skip?.addEventListener('click', () => {
    showScreen('step2');
  });

  // Step 2 Onboarding Actions
  DOM.btnStep2Back?.addEventListener('click', () => showScreen('step1'));
  DOM.btnStep2Skip?.addEventListener('click', () => showScreen('step3'));
  DOM.btnStep2Next?.addEventListener('click', () => {
    saveOnboardingPreferences();
    showToast('Aesthetic preferences preserved.', '✓');
    showScreen('step3');
  });

  // Step 3 Avatar Actions
  DOM.btnStep3Back?.addEventListener('click', () => showScreen('step2'));
  DOM.btnStep3Finish?.addEventListener('click', () => {
    const profile = state.getProfile();
    const avatarData = selectedAvatarId === 'initials' 
      ? { type: 'initials', initials: (profile.name || 'RS').slice(0, 2).toUpperCase(), color: '#211E1D' }
      : { type: 'preset', value: selectedAvatarId };
    
    state.setProfile({ avatar: avatarData, onboarded: true });
    renderUserProfile();
    showToast('Welcome to your personal style studio!', '🥂');
    showScreen('dashboard');
  });

  // Dashboard Sub-Tabs Switching
  DOM.tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');
      switchDashboardTab(targetTab);
    });
  });
}

function switchDashboardTab(tabId) {
  activeDashboardTab = tabId;

  DOM.tabButtons.forEach(btn => {
    if (btn.getAttribute('data-tab') === tabId) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  DOM.dashboardViews.forEach(view => {
    if (view.id === `view-${tabId}`) {
      view.classList.add('active');
    } else {
      view.classList.remove('active');
    }
  });
}

// ==========================================================================
// USER PROFILE & ONBOARDING SETUP
// ==========================================================================

function setupOnboardingUI() {
  const profile = state.getProfile();

  // Populate Aesthetic Tags Grid
  DOM.onboardingAestheticsGrid.innerHTML = AESTHETIC_TAGS.map(tag => {
    const isSelected = profile.aesthetics?.includes(tag.id);
    return `
      <div class="aesthetic-card ${isSelected ? 'selected' : ''}" data-tag-id="${tag.id}">
        <div class="tag-title">${tag.label}</div>
        <div class="tag-desc">${tag.desc}</div>
      </div>
    `;
  }).join('');

  DOM.onboardingAestheticsGrid.querySelectorAll('.aesthetic-card').forEach(card => {
    card.addEventListener('click', () => {
      card.classList.toggle('selected');
    });
  });

  // Populate Designer Suggestions
  DOM.onboardingDesignersPool.innerHTML = DESIGNER_SUGGESTIONS.map(name => {
    const isSelected = profile.designers?.includes(name);
    return `<span class="chip-selectable ${isSelected ? 'selected' : ''}" data-val="${name}">${name}</span>`;
  }).join('');

  // Populate Platform Suggestions
  DOM.onboardingPlatformsPool.innerHTML = PLATFORM_SUGGESTIONS.map(name => {
    const isSelected = profile.platforms?.includes(name);
    return `<span class="chip-selectable ${isSelected ? 'selected' : ''}" data-val="${name}">${name}</span>`;
  }).join('');

  // Populate Trend Suggestions
  DOM.onboardingTrendsPool.innerHTML = TREND_SUGGESTIONS.map(name => {
    const isSelected = profile.trends?.includes(name);
    return `<span class="chip-selectable ${isSelected ? 'selected' : ''}" data-val="${name}">${name}</span>`;
  }).join('');

  // Chip selection click handler
  [DOM.onboardingDesignersPool, DOM.onboardingPlatformsPool, DOM.onboardingTrendsPool].forEach(pool => {
    pool.querySelectorAll('.chip-selectable').forEach(chip => {
      chip.addEventListener('click', () => chip.classList.toggle('selected'));
    });
  });

  // Mood Dependent Toggle
  DOM.toggleMoodDependent.checked = profile.moodDependent ?? true;

  // Reference Image Upload (Local Preview Demo)
  DOM.onboardingUploadDropzone?.addEventListener('click', () => DOM.inputOnboardingImage.click());
  DOM.inputOnboardingImage?.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        currentOnboardingImageBase64 = event.target.result;
        DOM.onboardingPreviewImg.src = currentOnboardingImageBase64;
        DOM.onboardingPreviewHolder.style.display = 'block';
        DOM.onboardingUploadPrompt.style.display = 'none';
        showToast('Reference image loaded for local preview.', '🖼️');
      };
      reader.readAsDataURL(file);
    }
  });

  // Render Avatar Options Grid
  DOM.avatarPresetsGrid.innerHTML = AVATAR_OPTIONS.map(av => `
    <div class="avatar-card ${av.id === selectedAvatarId ? 'selected' : ''}" data-avatar-id="${av.id}">
      <div class="avatar-card-svg">${av.svg}</div>
      <div class="avatar-card-name">${av.name}</div>
    </div>
  `).join('');

  DOM.avatarPresetsGrid.querySelectorAll('.avatar-card').forEach(card => {
    card.addEventListener('click', () => {
      DOM.avatarPresetsGrid.querySelectorAll('.avatar-card').forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      selectedAvatarId = card.getAttribute('data-avatar-id');
    });
  });

  DOM.btnUseInitialsAvatar?.addEventListener('click', () => {
    DOM.avatarPresetsGrid.querySelectorAll('.avatar-card').forEach(c => c.classList.remove('selected'));
    selectedAvatarId = 'initials';
    showToast('Initials typographical avatar selected.', '✨');
  });
}

function saveOnboardingPreferences() {
  const selectedAesthetics = Array.from(DOM.onboardingAestheticsGrid.querySelectorAll('.aesthetic-card.selected'))
    .map(c => c.getAttribute('data-tag-id'));

  const selectedDesigners = Array.from(DOM.onboardingDesignersPool.querySelectorAll('.chip-selectable.selected'))
    .map(c => c.getAttribute('data-val'));

  const selectedPlatforms = Array.from(DOM.onboardingPlatformsPool.querySelectorAll('.chip-selectable.selected'))
    .map(c => c.getAttribute('data-val'));

  const selectedTrends = Array.from(DOM.onboardingTrendsPool.querySelectorAll('.chip-selectable.selected'))
    .map(c => c.getAttribute('data-val'));

  state.setProfile({
    aesthetics: selectedAesthetics,
    moodDependent: DOM.toggleMoodDependent.checked,
    designers: selectedDesigners,
    platforms: selectedPlatforms,
    trends: selectedTrends,
    referenceImage: currentOnboardingImageBase64
  });
}

function renderUserProfile() {
  const profile = state.getProfile();
  DOM.headerUserName.textContent = profile.name || 'Rhea Sen';

  if (profile.avatar?.type === 'initials') {
    DOM.headerAvatarSlot.innerHTML = profile.avatar.initials || 'RS';
    DOM.headerAvatarSlot.style.background = 'var(--c-charcoal)';
    DOM.headerAvatarSlot.style.color = '#FFF';
  } else {
    const foundAvatar = AVATAR_OPTIONS.find(a => a.id === (profile.avatar?.value || 'avatar-beret'));
    if (foundAvatar) {
      DOM.headerAvatarSlot.innerHTML = foundAvatar.svg;
    } else {
      DOM.headerAvatarSlot.textContent = 'RS';
    }
  }
}

// ==========================================================================
// MY WARDROBE
// ==========================================================================

function setupWardrobeEvents() {
  // Category Filter Chips
  DOM.wardrobeCategoryFilters?.querySelectorAll('.filter-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      DOM.wardrobeCategoryFilters.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      activeWardrobeFilter = chip.getAttribute('data-cat');
      renderWardrobeGrid();
    });
  });

  // Reload Starter Pieces
  DOM.btnLoadSampleWardrobe?.addEventListener('click', () => {
    state.loadSampleWardrobe();
    renderWardrobeGrid();
    showToast('Starter fashion-editorial wardrobe reloaded.', '🧥');
  });

  DOM.btnEmptyLoadSamples?.addEventListener('click', () => {
    state.loadSampleWardrobe();
    renderWardrobeGrid();
    showToast('Starter wardrobe loaded successfully.', '✨');
  });

  DOM.btnEmptyAddItem?.addEventListener('click', () => {
    openModal(DOM.modalAddWardrobe);
  });

  DOM.btnOpenAddWardrobeModal?.addEventListener('click', () => {
    openModal(DOM.modalAddWardrobe);
  });

  // Preset photo selection in Add Modal
  const presetPhotos = [
    { title: 'Blazer', url: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=700&auto=format&fit=crop&q=80' },
    { title: 'Silk Skirt', url: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=700&auto=format&fit=crop&q=80' },
    { title: 'Knitwear', url: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=700&auto=format&fit=crop&q=80' },
    { title: 'Trousers', url: 'https://images.unsplash.com/photo-1509551388413-e18d0ac5d495?w=700&auto=format&fit=crop&q=80' },
    { title: 'Gold Hoops', url: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?w=700&auto=format&fit=crop&q=80' },
    { title: 'Boots', url: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=700&auto=format&fit=crop&q=80' }
  ];

  DOM.wardrobePhotoPresets.innerHTML = presetPhotos.map((p, idx) => `
    <img src="${p.url}" alt="${p.title}" data-url="${p.url}" class="preset-thumb" style="width: 52px; height: 52px; object-fit: cover; border-radius: var(--radius-sm); cursor: pointer; border: 2px solid ${idx === 0 ? 'var(--c-blush)' : 'transparent'}; flex-shrink: 0;">
  `).join('');

  DOM.wardrobePhotoPresets.querySelectorAll('.preset-thumb').forEach(thumb => {
    thumb.addEventListener('click', () => {
      DOM.wardrobePhotoPresets.querySelectorAll('.preset-thumb').forEach(t => t.style.borderColor = 'transparent');
      thumb.style.borderColor = 'var(--c-blush)';
      selectedWardrobePresetImage = thumb.getAttribute('data-url');
      currentCustomWardrobeImageBase64 = null;
    });
  });

  // Local file upload for wardrobe
  DOM.inputWardrobeFile?.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        currentCustomWardrobeImageBase64 = event.target.result;
        DOM.wardrobePhotoPresets.querySelectorAll('.preset-thumb').forEach(t => t.style.borderColor = 'transparent');
        showToast('Local image attached for item.', '🖼️');
      };
      reader.readAsDataURL(file);
    }
  });

  // Occasion chips in Add Modal
  document.getElementById('wardrobe-modal-occasions')?.querySelectorAll('.chip-selectable').forEach(chip => {
    chip.addEventListener('click', () => chip.classList.toggle('selected'));
  });

  // Add Item Form Submit
  DOM.formAddWardrobe?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('input-wardrobe-name').value.trim();
    const category = document.getElementById('select-wardrobe-category').value;
    const color = document.getElementById('input-wardrobe-color').value;
    const notes = document.getElementById('input-wardrobe-notes').value.trim();
    const selectedOccasions = Array.from(document.getElementById('wardrobe-modal-occasions').querySelectorAll('.chip-selectable.selected'))
      .map(c => c.getAttribute('data-val'));

    const image = currentCustomWardrobeImageBase64 || selectedWardrobePresetImage;

    state.addWardrobeItem({
      name,
      category,
      color,
      occasions: selectedOccasions.length > 0 ? selectedOccasions : ['Casual Coffee'],
      notes: notes || 'Pristine wardrobe staple.',
      image
    });

    closeModal(DOM.modalAddWardrobe);
    DOM.formAddWardrobe.reset();
    currentCustomWardrobeImageBase64 = null;
    renderWardrobeGrid();
    showToast(`Added "${name}" to your wardrobe!`, '✨');
  });
}

function renderWardrobeGrid() {
  const items = state.getWardrobe();
  const filtered = activeWardrobeFilter === 'all' 
    ? items 
    : items.filter(i => i.category === activeWardrobeFilter);

  if (items.length === 0) {
    DOM.wardrobeItemsGrid.style.display = 'none';
    DOM.wardrobeEmptyState.style.display = 'block';
    return;
  }

  DOM.wardrobeEmptyState.style.display = 'none';
  DOM.wardrobeItemsGrid.style.display = 'grid';

  if (filtered.length === 0) {
    DOM.wardrobeItemsGrid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 3rem 1rem; color: var(--c-taupe-dark);">
        <p>No items found in <strong>${activeWardrobeFilter}</strong>.</p>
        <button class="btn btn-outline btn-sm" onclick="document.querySelector('#wardrobe-category-filters .filter-chip').click()" style="margin-top: 0.5rem;">Show All Items</button>
      </div>
    `;
    return;
  }

  DOM.wardrobeItemsGrid.innerHTML = filtered.map(item => `
    <article class="fashion-card" data-item-id="${item.id}">
      <div class="fashion-card-media">
        <img src="${item.image}" alt="${item.name}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=700&auto=format&fit=crop&q=80'">
        <span class="card-tag-badge">${item.category}</span>
        ${item.isSample ? `<span class="card-proto-badge">Sample • Prototype</span>` : `<span class="card-proto-badge" style="background:var(--c-blush-deep);">User Item</span>`}
      </div>
      <div class="fashion-card-body">
        <div class="card-meta-line">
          <span>${item.color || 'Neutral'}</span>
          <span>${new Date(item.addedAt || Date.now()).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span>
        </div>
        <h3 class="card-item-title">${item.name}</h3>
        <p class="card-notes">${item.notes || 'Curated silhouette tailored for versatility.'}</p>
        
        <div class="card-pills-row">
          ${(item.occasions || []).map(occ => `<span class="card-pill">${occ}</span>`).join('')}
        </div>

        <div class="card-footer-actions">
          <button class="btn-text btn-delete-wardrobe" data-item-id="${item.id}" style="font-size:0.78rem; color:var(--c-taupe); padding:0;">
            Remove item
          </button>
          <span style="font-size:0.78rem; font-weight:600; color:var(--c-taupe-dark);">In Rotation</span>
        </div>
      </div>
    </article>
  `).join('');

  // Attach delete handlers
  DOM.wardrobeItemsGrid.querySelectorAll('.btn-delete-wardrobe').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.getAttribute('data-item-id');
      state.removeWardrobeItem(id);
      renderWardrobeGrid();
      showToast('Item removed from wardrobe.', '🗑️');
    });
  });
}

// ==========================================================================
// STYLE AN OUTFIT ENGINE
// ==========================================================================

function setupStylerEvents() {
  // Occasion selectors
  DOM.stylerOccasionOptions?.querySelectorAll('.option-select-card').forEach(card => {
    card.addEventListener('click', () => {
      DOM.stylerOccasionOptions.querySelectorAll('.option-select-card').forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
    });
  });

  // Mood selectors
  DOM.stylerMoodOptions?.querySelectorAll('.option-select-card').forEach(card => {
    card.addEventListener('click', () => {
      DOM.stylerMoodOptions.querySelectorAll('.option-select-card').forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
    });
  });

  // Quick Reference Chips
  document.querySelectorAll('.quick-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      DOM.inputStyleReference.value = chip.getAttribute('data-ref');
    });
  });

  // Generate Button Click
  DOM.btnGenerateOutfit?.addEventListener('click', () => {
    generateOutfitLook();
  });
}

function generateOutfitLook() {
  const occasionEl = DOM.stylerOccasionOptions.querySelector('.option-select-card.selected');
  const moodEl = DOM.stylerMoodOptions.querySelector('.option-select-card.selected');

  const occasion = occasionEl ? occasionEl.getAttribute('data-value') : 'College';
  const mood = moodEl ? moodEl.getAttribute('data-value') : 'Effortless & Chic';
  const reference = DOM.inputStyleReference.value.trim();

  const wardrobe = state.getWardrobe();

  // Show loading simulation
  DOM.stylerLoadingState.style.display = 'block';
  DOM.stylerOutputContent.style.display = 'none';

  setTimeout(() => {
    DOM.stylerLoadingState.style.display = 'none';
    DOM.stylerOutputContent.style.display = 'block';

    const result = OutfitEngine.generateLook({
      wardrobe,
      occasion,
      mood,
      reference,
      userProfile: state.getProfile()
    });

    renderStyledLook(result);
  }, 420);
}

function renderStyledLook(result) {
  if (!result.success && result.empty) {
    DOM.stylerOutputContent.innerHTML = `
      <div class="empty-state" style="margin: 2rem 0;">
        <div class="empty-state-icon">🧥</div>
        <h3>No Wardrobe Pieces Available</h3>
        <p>${result.message}</p>
        <button class="btn btn-primary" id="btn-styler-reload-samples">Load Starter Wardrobe</button>
      </div>
    `;
    document.getElementById('btn-styler-reload-samples')?.addEventListener('click', () => {
      state.loadSampleWardrobe();
      renderWardrobeGrid();
      generateOutfitLook();
      showToast('Starter wardrobe loaded. Generating your look!', '✨');
    });
    return;
  }

  const { stylingTitle, stylingRationale, items, palette, occasion, mood, reference } = result;

  DOM.stylerOutputContent.innerHTML = `
    <div>
      <div class="look-header-badge">
        <span>Curated Ensemble</span>
        <span>•</span>
        <span>${occasion}</span>
        <span>•</span>
        <span>${mood}</span>
      </div>

      <h2 class="look-title">${stylingTitle}</h2>

      <div class="look-palette-row">
        <span style="font-size:0.8rem; font-weight:600; color:var(--c-taupe);">Palette Harmony:</span>
        ${palette.map(color => `
          <div style="display:flex; align-items:center; gap:0.3rem;">
            <div class="color-swatch" style="background:${getColorHex(color)};"></div>
            <span style="font-size:0.75rem; color:var(--c-taupe-dark);">${color}</span>
          </div>
        `).join('')}
      </div>

      <!-- Curated Garment Spread -->
      <div class="styler-look-grid">
        ${items.map(item => `
          <div class="look-item-tile">
            <img class="look-item-img" src="${item.image}" alt="${item.name}" onerror="this.src='https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=700&auto=format&fit=crop&q=80'">
            <div class="look-item-info">
              <span class="look-item-category">${item.category}</span>
              <div class="look-item-name">${item.name}</div>
            </div>
          </div>
        `).join('')}
      </div>

      <!-- Editorial Explanation & Notes -->
      <div class="rationale-box">
        <h4 class="rationale-headline">${stylingRationale.headline}</h4>
        <p class="rationale-body">${stylingRationale.breakdown}</p>
        <div class="stylist-tip-badge">
          <span>💡 Stylist Guidance:</span>
          <span>${stylingRationale.stylistTip}</span>
        </div>
      </div>

      <div style="display: flex; gap: 0.75rem; flex-wrap: wrap; justify-content: flex-end; align-items: center;">
        <button class="btn btn-outline btn-sm" id="btn-copy-look-breakdown">
          📋 Copy Look Details
        </button>
        <button class="btn btn-primary btn-sm" id="btn-save-look-history">
          ❤️ Save to Lookbook
        </button>
      </div>
    </div>
  `;

  // Attach Look Actions
  document.getElementById('btn-save-look-history')?.addEventListener('click', () => {
    state.saveOutfit({
      stylingTitle,
      occasion,
      mood,
      reference,
      items: items.map(i => ({ id: i.id, name: i.name, category: i.category, image: i.image }))
    });
    showToast('Look saved to your lookbook collection!', '❤️');
  });

  document.getElementById('btn-copy-look-breakdown')?.addEventListener('click', () => {
    const textToCopy = `FIT CHECK EDITORIAL LOOK: ${stylingTitle}\nOccasion: ${occasion} | Mood: ${mood}\nItems: ${items.map(i => i.name).join(', ')}\nRationale: ${stylingRationale.headline} ${stylingRationale.breakdown}`;
    navigator.clipboard?.writeText(textToCopy);
    showToast('Look styling breakdown copied to clipboard!', '📋');
  });
}

function getColorHex(colorName) {
  const map = {
    'Ivory': '#FAF8F5',
    'Cream': '#F4EFEA',
    'Taupe': '#8C827A',
    'Charcoal': '#211E1D',
    'Blush Pink': '#E2959D',
    'Gold': '#B08968',
    'Silver': '#BCC1C5',
    'Olive': '#606C38',
    'Navy': '#1B263B'
  };
  return map[colorName] || '#8C827A';
}

// ==========================================================================
// THRIFT & DONATION MARKETPLACES
// ==========================================================================

function setupThriftEvents() {
  DOM.btnOpenAddThriftModal?.addEventListener('click', () => openModal(DOM.modalAddThrift));

  DOM.formAddThrift?.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('input-thrift-title').value.trim();
    const price = parseFloat(document.getElementById('input-thrift-price').value) || 25;
    const size = document.getElementById('input-thrift-size').value.trim();
    const condition = document.getElementById('select-thrift-condition').value;
    const location = document.getElementById('input-thrift-seller-location').value.trim() || 'Brooklyn, NY';
    const story = document.getElementById('input-thrift-story').value.trim();

    state.addThriftListing({
      title,
      price,
      size,
      condition,
      location,
      story: story || 'Well-cared-for piece seeking a stylish second home.',
      image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=700&auto=format&fit=crop&q=80',
      category: 'Outerwear'
    });

    closeModal(DOM.modalAddThrift);
    DOM.formAddThrift.reset();
    renderThriftGrid();
    showToast('Demo resale listing published to local marketplace!', '🏷️');
  });

  DOM.inputThriftSearch?.addEventListener('input', renderThriftGrid);
  DOM.selectThriftDistance?.addEventListener('change', renderThriftGrid);
  DOM.inputThriftLocation?.addEventListener('change', renderThriftGrid);
}

function renderThriftGrid() {
  const listings = state.getThriftListings();
  const search = DOM.inputThriftSearch?.value.toLowerCase().trim() || '';
  const distanceFilter = DOM.selectThriftDistance?.value || 'all';

  const filtered = listings.filter(item => {
    const matchesSearch = !search || item.title.toLowerCase().includes(search) || item.story?.toLowerCase().includes(search);
    if (!matchesSearch) return false;

    if (distanceFilter === '5') {
      // Mock distance matching check
      return item.location.includes('1.') || item.location.includes('2.') || item.location.includes('3.') || item.location.includes('4.');
    }
    return true;
  });

  DOM.thriftListingsGrid.innerHTML = filtered.map(item => `
    <article class="fashion-card">
      <div class="fashion-card-media">
        <img src="${item.image}" alt="${item.title}" loading="lazy">
        <span class="card-tag-badge">${item.condition}</span>
        <span class="card-proto-badge">Simulated Resale</span>
      </div>
      <div class="fashion-card-body">
        <div class="card-meta-line">
          <span class="thrift-price-pill">${item.currency || '$'}${item.price}</span>
          <span style="font-weight:600; color:var(--c-charcoal);">Size ${item.size}</span>
        </div>
        <h3 class="card-item-title">${item.title}</h3>
        <p class="card-notes">${item.story || 'Vintage wardrobe piece in lovely condition.'}</p>
        
        <div style="font-size:0.75rem; color:var(--c-taupe); margin-bottom:0.75rem;">
          📍 ${item.location} • Seller: ${item.sellerName}
        </div>

        <div class="card-footer-actions">
          <button class="btn btn-outline btn-sm btn-inquire-thrift" style="width:100%;">
            Inquire / Reserve (Demo)
          </button>
        </div>
      </div>
    </article>
  `).join('');

  DOM.thriftListingsGrid.querySelectorAll('.btn-inquire-thrift').forEach(btn => {
    btn.addEventListener('click', () => {
      showToast('Demo Reservation: No payments or chat servers in this prototype.', 'ℹ️');
    });
  });
}

function setupDonationEvents() {
  DOM.btnOpenAddDonationModal?.addEventListener('click', () => openModal(DOM.modalAddDonation));

  DOM.formAddDonation?.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('input-donation-title').value.trim();
    const recipientCause = document.getElementById('select-donation-cause').value;
    const size = document.getElementById('input-donation-size').value.trim();
    const pickupMethod = document.getElementById('input-donation-pickup').value.trim();
    const notes = document.getElementById('input-donation-notes').value.trim();

    state.addDonation({
      title,
      recipientCause,
      size,
      pickupMethod,
      donorNotes: notes || 'Freshly cleaned and packaged for immediate donation.',
      category: 'Wearable Staples',
      location: 'Community Hub'
    });

    closeModal(DOM.modalAddDonation);
    DOM.formAddDonation.reset();
    renderDonationGrid();
    showToast('Free mutual-aid donation listed! Thank you for giving.', '🌱');
  });
}

function renderDonationGrid() {
  const donations = state.getDonations();

  DOM.donationListingsGrid.innerHTML = donations.map(item => `
    <article class="fashion-card" style="border-top: 3px solid #606C38;">
      <div class="fashion-card-body" style="padding-top: 1.5rem;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.5rem;">
          <span class="free-donation-pill">100% Free Donation</span>
          <span style="font-size:0.78rem; font-weight:600; color:var(--c-taupe);">Size: ${item.size}</span>
        </div>
        <h3 class="card-item-title" style="margin-top:0.25rem;">${item.title}</h3>
        
        <div style="background:var(--c-cream); padding:0.65rem 0.85rem; border-radius:var(--radius-md); margin:0.6rem 0; font-size:0.8rem;">
          <strong style="color:var(--c-charcoal);">Cause:</strong> ${item.recipientCause}
        </div>

        <p class="card-notes">${item.donorNotes || 'Wearable garments in clean, gently worn condition.'}</p>
        
        <div style="font-size:0.75rem; color:var(--c-taupe-dark); margin-bottom:1rem;">
          📦 <strong>Exchange:</strong> ${item.pickupMethod}
        </div>

        <div class="card-footer-actions">
          <button class="btn btn-outline btn-sm btn-claim-donation" style="width:100%;">
            Claim for Mutual Aid (Demo)
          </button>
        </div>
      </div>
    </article>
  `).join('');

  DOM.donationListingsGrid.querySelectorAll('.btn-claim-donation').forEach(btn => {
    btn.addEventListener('click', () => {
      showToast('Mutual-Aid Demo: Donation claim acknowledged locally.', '🌱');
    });
  });
}

// ==========================================================================
// SHOP REFERENCES & CREATOR DISCOVERY
// ==========================================================================

function setupShopReferences() {
  DOM.shopReferencesGrid.innerHTML = SHOP_REFERENCES.map(ref => `
    <article class="fashion-card">
      <div class="fashion-card-media" style="height: 240px;">
        <img src="${ref.image}" alt="${ref.itemTitle}" loading="lazy">
        <span class="card-tag-badge">${ref.priceTier}</span>
        <span class="card-proto-badge">Mock Shop Ref</span>
      </div>
      <div class="fashion-card-body">
        <div class="card-meta-line">
          <span>${ref.brand}</span>
          <span>${ref.category}</span>
        </div>
        <h3 class="card-item-title">${ref.itemTitle}</h3>
        <p class="card-notes">${ref.curatorNote}</p>
        <div class="card-footer-actions">
          <button class="btn btn-outline btn-sm btn-mock-retailer-link" data-url="${ref.mockUrl}" style="width:100%;">
            Simulate Retailer Page ↗
          </button>
        </div>
      </div>
    </article>
  `).join('');

  DOM.shopReferencesGrid.querySelectorAll('.btn-mock-retailer-link').forEach(btn => {
    btn.addEventListener('click', () => {
      showToast('Simulated external retailer reference link (Prototype demo).', '🔗');
    });
  });
}

function setupCreatorsUI() {
  DOM.creatorsPreviewGrid.innerHTML = CREATOR_PREVIEWS.map(creator => `
    <article class="fashion-card">
      <div class="fashion-card-media" style="height: 260px;">
        <img src="${creator.previewImage}" alt="${creator.name}" loading="lazy">
        <span class="card-tag-badge">${creator.followers} Community</span>
      </div>
      <div class="fashion-card-body">
        <div style="font-size:0.8rem; font-weight:700; color:var(--c-blush-deep); margin-bottom:0.25rem;">
          ${creator.handle}
        </div>
        <h3 class="card-item-title">${creator.name}</h3>
        <div style="font-size:0.78rem; font-weight:600; color:var(--c-taupe-dark); margin-bottom:0.4rem;">
          ${creator.aesthetic}
        </div>
        <p class="card-notes">${creator.bio}</p>
      </div>
    </article>
  `).join('');

  DOM.btnJoinCreatorWaitlist?.addEventListener('click', () => {
    const val = DOM.inputCreatorEmail.value.trim();
    if (val) {
      DOM.inputCreatorEmail.value = '';
      showToast(`Added ${val} to Creator Discovery early access list!`, '💌');
    } else {
      showToast('Please enter your handle or email to join waitlist.', '⚠️');
    }
  });
}

// ==========================================================================
// TINYFISH SERVICE INSPECTOR & TEST
// ==========================================================================

function setupTinyFishInspector() {
  const updateUI = () => {
    const status = tinyFish.getStatus();
    DOM.topTinyFishStatus.textContent = status.configured ? 'Live' : 'Mock Fallback';
    const statusBadge = document.getElementById('tf-modal-status-badge');
    const headerDot = document.getElementById('header-tf-status-dot');

    if (statusBadge) {
      statusBadge.textContent = status.statusText;
      statusBadge.style.color = status.configured ? 'var(--c-success)' : 'var(--c-warning)';
    }
    if (headerDot) {
      headerDot.className = `tinyfish-pill-status ${status.configured ? 'live' : ''}`;
    }
  };

  updateUI();

  DOM.btnTinyFishModal?.addEventListener('click', () => {
    updateUI();
    openModal(DOM.modalAddWardrobe.parentElement.querySelector('#modal-tinyfish-service'));
  });

  DOM.btnOpenTinyFishBanner?.addEventListener('click', () => {
    updateUI();
    openModal(DOM.modalAddWardrobe.parentElement.querySelector('#modal-tinyfish-service'));
  });

  DOM.btnRunTfTest?.addEventListener('click', async () => {
    const query = DOM.inputTfTestQuery.value.trim() || 'Minimalist Suiting';
    DOM.btnRunTfTest.disabled = true;
    DOM.btnRunTfTest.textContent = 'Searching...';

    const res = await tinyFish.searchFashionReferences(query);
    DOM.btnRunTfTest.disabled = false;
    DOM.btnRunTfTest.textContent = 'Test Search';

    DOM.tfTestResultsArea.style.display = 'block';
    DOM.tfTestResultsArea.innerHTML = `
      <div style="background:var(--c-cream); padding:1rem; border-radius:var(--radius-md); border:1px solid var(--border-color);">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.75rem;">
          <strong style="font-size:0.86rem;">TinyFish Mock Adapter Response (${res.count} results)</strong>
          <span class="badge-soft" style="background:#FFF;">isMockFallback: true</span>
        </div>
        <div style="display:flex; flex-direction:column; gap:0.5rem;">
          ${res.results.map(r => `
            <div style="background:#FFF; padding:0.65rem; border-radius:var(--radius-sm); border:1px solid var(--border-color-subtle); display:flex; gap:0.75rem; align-items:center;">
              <img src="${r.sampleImage}" alt="Ref" style="width:44px; height:44px; border-radius:4px; object-fit:cover;">
              <div>
                <div style="font-weight:600; font-size:0.84rem;">${r.title}</div>
                <div style="font-size:0.75rem; color:var(--c-taupe-dark);">${r.summary}</div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  });
}

// ==========================================================================
// MODALS, TOASTS & RESET CONTROLLER
// ==========================================================================

function setupModals() {
  // Close buttons
  document.querySelectorAll('[data-close-modal]').forEach(btn => {
    btn.addEventListener('click', () => {
      const modalId = btn.getAttribute('data-close-modal');
      const targetModal = document.getElementById(modalId);
      if (targetModal) closeModal(targetModal);
    });
  });

  // Click outside to close
  document.querySelectorAll('.modal-backdrop').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal(modal);
    });
  });

  // ESC key listener
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-backdrop.open').forEach(m => closeModal(m));
    }
  });

  // Top reset demo button
  DOM.btnResetDemoTop?.addEventListener('click', () => {
    openModal(DOM.modalResetConfirm);
  });

  DOM.btnConfirmResetAll?.addEventListener('click', () => {
    state.resetAll();
    closeModal(DOM.modalResetConfirm);
    renderUserProfile();
    renderWardrobeGrid();
    renderThriftGrid();
    renderDonationGrid();
    generateOutfitLook();
    updateBadgeCounts();
    showScreen('dashboard');
    showToast('Demo reset: Restored initial starter capsule.', '🔄');
  });
}

function openModal(modalEl) {
  if (modalEl) {
    modalEl.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal(modalEl) {
  if (modalEl) {
    modalEl.classList.remove('open');
    document.body.style.overflow = '';
  }
}

function showToast(message, icon = '✨') {
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;
  DOM.toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(8px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 320);
  }, 3200);
}

function updateBadgeCounts() {
  const wardrobe = state.getWardrobe();
  const thrift = state.getThriftListings();
  const donations = state.getDonations();

  if (DOM.tabCountWardrobe) DOM.tabCountWardrobe.textContent = wardrobe.length;
  if (DOM.tabCountThrift) DOM.tabCountThrift.textContent = thrift.length;
  if (DOM.tabCountDonate) DOM.tabCountDonate.textContent = donations.length;
}

function handleStateChange(e) {
  updateBadgeCounts();
}

// Start application when DOM is ready
document.addEventListener('DOMContentLoaded', initApp);

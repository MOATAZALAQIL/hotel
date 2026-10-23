/**
 * Internationalization (i18n) Engine - Al-Diyafa Hotel
 */

let currentLang = 'ar';
let translations = {};

// Helper to get nested value by dot notation like "hero.title"
function getNestedValue(obj, path) {
  return path.split('.').reduce((prev, curr) => {
    return prev ? prev[curr] : null;
  }, obj);
}

// Determine correct path to JSON files whether in root or pages/
function getLangFilePath(lang) {
  const isPagesDir = window.location.pathname.includes('/pages/');
  const prefix = isPagesDir ? '../assets/lang/' : 'assets/lang/';
  return `${prefix}${lang}.json`;
}

// Apply translations to DOM
function applyTranslations() {
  // Update regular elements with data-i18n
  const translatables = document.querySelectorAll('[data-i18n]');
  translatables.forEach((el) => {
    const key = el.getAttribute('data-i18n');
    const value = getNestedValue(translations, key);
    if (value !== null && value !== undefined) {
      el.textContent = value;
    }
  });

  // Update input placeholders with data-i18n-placeholder
  const placeholders = document.querySelectorAll('[data-i18n-placeholder]');
  placeholders.forEach((el) => {
    const key = el.getAttribute('data-i18n-placeholder');
    const value = getNestedValue(translations, key);
    if (value !== null && value !== undefined) {
      el.setAttribute('placeholder', value);
    }
  });

  // Update toggle button text: if current is AR, button shows EN, and vice-versa
  const toggleBtn = document.getElementById('langToggle');
  if (toggleBtn) {
    toggleBtn.textContent = currentLang === 'ar' ? 'English' : 'عربي';
  }
}

// Set active language and direction
async function setLanguage(lang) {
  try {
    const response = await fetch(getLangFilePath(lang));
    if (!response.ok) {
      throw new Error(`Failed to load translation file: ${lang}`);
    }
    translations = await response.json();
    currentLang = lang;

    // Set HTML attributes
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';

    // Store in localStorage
    localStorage.setItem('aldiyafa_lang', lang);

    // Apply texts
    applyTranslations();

    // Dispatch event
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));
  } catch (error) {
    console.warn('Could not switch language dynamically:', error);
  }
}

// Toggle language
function toggleLanguage() {
  const nextLang = currentLang === 'ar' ? 'en' : 'ar';
  setLanguage(nextLang);
}

// Initialize i18n
function initI18n() {
  const savedLang = localStorage.getItem('aldiyafa_lang') || 'ar';
  setLanguage(savedLang);
}

// Expose globally
window.initI18n = initI18n;
window.setLanguage = setLanguage;
window.toggleLanguage = toggleLanguage;

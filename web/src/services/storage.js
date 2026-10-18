/**
 * @file storage.js
 * Versioned localStorage persistence service.
 */

import { migrateLocalStorage } from '@buildforce/core';

export const STORAGE_VERSION = 'v1';

export const storageService = {
  get(key, defaultValue = null) {
    if (typeof window === 'undefined') return defaultValue;
    try {
      const item = localStorage.getItem(`${key}_${STORAGE_VERSION}`) || localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch {
      return defaultValue;
    }
  },

  set(key, value) {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(`${key}_${STORAGE_VERSION}`, JSON.stringify(value));
    } catch (e) {
      if (e && (e.name === 'QuotaExceededError' || e.code === 22)) {
        console.warn(`[storageService] QuotaExceededError writing key: ${key}`);
        if (Array.isArray(value)) {
          try {
            localStorage.setItem(`${key}_${STORAGE_VERSION}`, JSON.stringify(value.slice(-50)));
          } catch {
            // Graceful non-crashing fallback
          }
        }
      }
    }
  },

  remove(key) {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(`${key}_${STORAGE_VERSION}`);
    localStorage.removeItem(key);
  },

  migrate(options = {}) {
    if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
      return { success: false, skipped: true };
    }
    return migrateLocalStorage(localStorage, options);
  }
};

// Auto-run migration on load
if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
  try {
    storageService.migrate();
  } catch {
    // non-blocking fallback
  }
}

export default storageService;

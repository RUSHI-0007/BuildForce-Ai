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
    } catch {
      // storage full or blocked
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

export default storageService;

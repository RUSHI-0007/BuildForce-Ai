/**
 * @file config.js
 * Central runtime configuration and defaults for @buildforce/core.
 * Free of DOM, UI, or framework dependencies.
 */

export const BUS_CONFIG = Object.freeze({
  MAX_CHAIN_DEPTH: 10
});

export const DEFAULT_MAX_CHAIN_DEPTH = BUS_CONFIG.MAX_CHAIN_DEPTH;

export default {
  bus: BUS_CONFIG
};

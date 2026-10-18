import { describe, it, expect } from 'vitest';
import { VERSION } from '../src/lib/agents/index.js';

describe('Sanity test', () => {
  it('loads pure agents library version', () => {
    expect(VERSION).toBe('2.0.0');
  });
});

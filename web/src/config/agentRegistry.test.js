import { describe, it, expect } from 'vitest';
import { AGENT_REGISTRY } from './agentRegistry.js';
import * as fs from 'fs';
import * as path from 'path';

describe('Shared Agent Framework Specifications (web/src/config/agentRegistry.test.js)', () => {
  it('defines the 6-agent team: capture, scheduler, procurement, cash, client, coordinator, all marked preview', () => {
    expect(AGENT_REGISTRY).toHaveLength(6);
    
    const previewAgents = AGENT_REGISTRY.filter(a => a.status === 'preview');
    expect(previewAgents).toHaveLength(6);

    const ids = AGENT_REGISTRY.map(a => a.id).sort();
    expect(ids).toEqual(['capture', 'cash', 'client', 'coordinator', 'procurement', 'scheduler'].sort());

    // Estimator and Quality must not exist in the active registry
    expect(ids).not.toContain('estimator');
    expect(ids).not.toContain('quality');
  });

  it('every agent document has purpose, dataItUses, whatItDoes, and whatItDoesNot', () => {
    AGENT_REGISTRY.forEach(agent => {
      expect(agent.name).toBeTruthy();
      expect(agent.purpose).toBeTruthy();
      expect(Array.isArray(agent.dataItUses)).toBe(true);
      expect(agent.dataItUses.length).toBeGreaterThan(0);
      expect(Array.isArray(agent.whatItDoes)).toBe(true);
      expect(agent.whatItDoes.length).toBeGreaterThan(0);
      expect(Array.isArray(agent.whatItDoesNot)).toBe(true);
      expect(agent.whatItDoesNot.length).toBeGreaterThan(0);
    });
  });

  it('no active agent component imports mockData.js', () => {
    const agentsDir = path.resolve('web/src/components/agents');
    if (fs.existsSync(agentsDir)) {
      const files = fs.readdirSync(agentsDir).filter(f => f.endsWith('.jsx') || f.endsWith('.js'));
      files.forEach(file => {
        const content = fs.readFileSync(path.join(agentsDir, file), 'utf8');
        expect(content).not.toContain('mockData');
      });
    }
  });

  it('no concept preview component imports mockData.js', () => {
    const previewDir = path.resolve('web/src/components/portal/concept_preview');
    if (fs.existsSync(previewDir)) {
      const files = fs.readdirSync(previewDir).filter(f => f.endsWith('.jsx') || f.endsWith('.js'));
      files.forEach(file => {
        const content = fs.readFileSync(path.join(previewDir, file), 'utf8');
        expect(content).not.toContain('mockData');
      });
    }
  });

  it('all preview agents explicitly declare non-invented boundaries', () => {
    AGENT_REGISTRY.forEach(agent => {
      expect(agent.whatItDoesNot.some(rule => 
        rule.toLowerCase().includes('hardcoded') || 
        rule.toLowerCase().includes('fake') || 
        rule.toLowerCase().includes('invent') ||
        rule.toLowerCase().includes('unreviewed') ||
        rule.toLowerCase().includes('unverified')
      )).toBe(true);
    });
  });
});

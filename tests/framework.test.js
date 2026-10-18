import { describe, it, expect } from 'vitest';
import { AGENT_REGISTRY } from '../src/config/agentRegistry.js';
import * as fs from 'fs';
import * as path from 'path';

describe('Shared Agent Framework Specifications', () => {
  it('defines exactly 5 agents with 3 live and 2 building', () => {
    expect(AGENT_REGISTRY).toHaveLength(5);
    
    const liveAgents = AGENT_REGISTRY.filter(a => a.status === 'live');
    const buildingAgents = AGENT_REGISTRY.filter(a => a.status === 'building');
    
    expect(liveAgents).toHaveLength(3);
    expect(buildingAgents).toHaveLength(2);

    expect(liveAgents.map(a => a.id).sort()).toEqual(['cash', 'procurement', 'scheduler'].sort());
    expect(buildingAgents.map(a => a.id).sort()).toEqual(['estimator', 'quality'].sort());
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
    const agentsDir = path.resolve('src/components/agents');
    if (fs.existsSync(agentsDir)) {
      const files = fs.readdirSync(agentsDir).filter(f => f.endsWith('.jsx') || f.endsWith('.js'));
      files.forEach(file => {
        const content = fs.readFileSync(path.join(agentsDir, file), 'utf8');
        expect(content).not.toContain('mockData');
      });
    }
  });

  it('security: .gitignore ignores .env and preserves .env.example', () => {
    const gitignore = fs.readFileSync('.gitignore', 'utf8');
    expect(gitignore).toContain('.env');
    expect(gitignore).toContain('!.env.example');
  });

  it('security: .env.example contains placeholder names only', () => {
    const example = fs.readFileSync('.env.example', 'utf8');
    expect(example).toContain('VITE_SUPABASE_URL=');
    expect(example).toContain('VITE_SUPABASE_ANON_KEY=');
    // Ensure no real API secret was pasted into the template
    expect(example).not.toContain('eyJhbGciOi');
    expect(example).not.toContain('gfpcqbsjkbakbvbptqaw');
  });

  it('documentation: README contains security note for Vercel and Supabase RLS', () => {
    const readme = fs.readFileSync('README.md', 'utf8');
    expect(readme).toContain('Vercel');
    expect(readme).toContain('Row Level Security');
    expect(readme).not.toContain('Powerplay');
  });
});

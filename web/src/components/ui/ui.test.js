import React from 'react';
import { describe, it, expect } from 'vitest';
import { renderToString } from 'react-dom/server';
import { Button, Card, Badge, EmptyState, StatsCard } from './index';

describe('UI Primitives (web/src/components/ui/)', () => {
  it('renders Button across variants and sizes', () => {
    const htmlPrimary = renderToString(React.createElement(Button, { variant: 'primary', size: 'md' }, 'Click Me'));
    expect(htmlPrimary).toContain('Click Me');
    expect(htmlPrimary).toContain('bf-button-primary');

    const htmlDanger = renderToString(React.createElement(Button, { variant: 'danger', size: 'sm', disabled: true }, 'Delete'));
    expect(htmlDanger).toContain('Delete');
    expect(htmlDanger).toContain('disabled');
  });

  it('renders Card with header, title, and content slots', () => {
    const cardEl = React.createElement(
      Card,
      { variant: 'elevated' },
      React.createElement(Card.Header, null, React.createElement(Card.Title, null, 'Project Cashflow')),
      React.createElement(Card.Content, null, React.createElement('p', null, 'Runway 24 weeks'))
    );
    const html = renderToString(cardEl);
    expect(html).toContain('Project Cashflow');
    expect(html).toContain('Runway 24 weeks');
    expect(html).toContain('bf-card-elevated');
  });

  it('renders Badge across status variants and with dot indicator', () => {
    const htmlSuccess = renderToString(React.createElement(Badge, { variant: 'success', dot: true }, 'Live'));
    expect(htmlSuccess).toContain('Live');
    expect(htmlSuccess).toContain('bf-badge-success');

    const htmlWarning = renderToString(React.createElement(Badge, { variant: 'warning' }, 'Pending'));
    expect(htmlWarning).toContain('Pending');
  });

  it('renders EmptyState and StatsCard correctly', () => {
    const emptyHtml = renderToString(React.createElement(EmptyState, { title: 'No Tasks', description: 'Create your first task' }));
    expect(emptyHtml).toContain('No Tasks');

    const statsHtml = renderToString(React.createElement(StatsCard, { title: 'Active Sites', value: '3' }));
    expect(statsHtml).toContain('Active Sites');
  });
});

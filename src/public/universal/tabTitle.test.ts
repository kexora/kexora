import test from 'node:test';
import assert from 'node:assert/strict';
import {
  formatDynamicTabTitle,
  setBaseTabTitle,
  setContextualTabLayer,
  clearContextualTabLayer,
  resolveActiveTabTitle,
  resetTabTitleManagerForTest,
} from './tabTitle';

test('formatDynamicTabTitle creates crisp short titles with Kexora brand', () => {
  assert.equal(formatDynamicTabTitle('Services'), 'Services · Kexora');
  assert.equal(formatDynamicTabTitle('Quote: SEO Optimization'), 'Quote: SEO Optimization · Kexora');
  assert.equal(formatDynamicTabTitle('Kexora · Web, App & AI-SEO'), 'Kexora · Web, App & AI-SEO');
  assert.equal(formatDynamicTabTitle(''), 'Kexora');
});

test('formatDynamicTabTitle compacts long activity titles while preserving brand suffix', () => {
  const formatted = formatDynamicTabTitle(
    'Quote: Custom Android & iOS Mobile Application Development With Backend'
  );
  assert.ok(formatted.endsWith('· Kexora'));
  assert.ok(formatted.includes('…'));
  assert.ok(formatted.length <= 46);
});

test('layered tab title stack prioritizes modals over page context and restores cleanly', () => {
  resetTabTitleManagerForTest();
  setBaseTabTitle('Pricing · Kexora');
  assert.equal(resolveActiveTabTitle(), 'Pricing · Kexora');

  // Page-level filter (priority 10)
  setContextualTabLayer('pricing-filter', 'Web Pricing (USD)', 10);
  assert.equal(resolveActiveTabTitle(), 'Web Pricing (USD) · Kexora');

  // Foreground modal (priority 30) overrides page filter
  setContextualTabLayer('services-explorer', 'Explore Services', 30);
  assert.equal(resolveActiveTabTitle(), 'Explore Services · Kexora');

  // Closing modal restores page filter
  clearContextualTabLayer('services-explorer');
  assert.equal(resolveActiveTabTitle(), 'Web Pricing (USD) · Kexora');

  // Clearing filter restores base route title
  clearContextualTabLayer('pricing-filter');
  assert.equal(resolveActiveTabTitle(), 'Pricing · Kexora');
});

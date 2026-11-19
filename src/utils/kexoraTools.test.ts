import test from 'node:test';
import assert from 'node:assert/strict';
import {
  parseWhatsAppChat,
  filterWhatsAppMessages,
  calculateKexoraEstimate,
} from './kexoraTools';

test('parseWhatsAppChat parses standard WhatsApp exported lines and multi-line messages', () => {
  const sampleLog = [
    '14/10/2026, 09:30 am - Rajan Singh: Welcome to Kexora Web Engineering!',
    'We reviewed your website speed and SEO metrics.',
    '14/10/2026, 09:32 am - Client: Thanks Rajan! How fast will the custom code site load?',
    '[14/10/2026, 09:35:10 AM] Rajan Singh: Under 0.4 seconds with 99+ PageSpeed.',
  ].join('\n');

  const parsed = parseWhatsAppChat(sampleLog);
  assert.equal(parsed.length, 3);
  assert.equal(parsed[0].sender, 'Rajan Singh');
  assert.ok(parsed[0].text.includes('We reviewed your website speed and SEO metrics.'));
  assert.equal(parsed[1].sender, 'Client');
  assert.equal(parsed[2].time, '09:35:10 AM');
});

test('filterWhatsAppMessages filters by sender and search keyword accurately', () => {
  const messages = [
    { id: '1', date: '14/10/2026', time: '09:30 am', sender: 'Rajan Singh', text: 'Custom React architecture' },
    { id: '2', date: '14/10/2026', time: '09:32 am', sender: 'Aarav Mehta', text: 'Need GST and Trademark registration' },
  ];

  const bySender = filterWhatsAppMessages(messages, 'Rajan Singh', '');
  assert.equal(bySender.length, 1);
  assert.equal(bySender[0].id, '1');

  const byKeyword = filterWhatsAppMessages(messages, 'all', 'trademark');
  assert.equal(byKeyword.length, 1);
  assert.equal(byKeyword[0].sender, 'Aarav Mehta');
});

test('calculateKexoraEstimate matches authentic Kexora INR and USD plans', () => {
  const creativeInr = calculateKexoraEstimate({
    projectType: 'business-custom',
    pageCount: 5,
    includeAiSeo: false,
    includeBranding: false,
    includeCompliance: false,
    currency: 'INR',
  });

  assert.equal(creativeInr.recommendedPlanName, 'Creative Plan');
  assert.equal(creativeInr.setupCost, 18000);
  assert.equal(creativeInr.monthlyRetainer, 2499);
  assert.equal(creativeInr.currencySymbol, '₹');

  const expertWithAddons = calculateKexoraEstimate({
    projectType: 'ecommerce',
    pageCount: 10,
    includeAiSeo: true,
    includeBranding: true,
    includeCompliance: true,
    currency: 'INR',
  });

  // 40000 base + (5*1200=6000) + 6000 SEO + 5000 Branding + 7500 Compliance = 64500
  assert.equal(expertWithAddons.recommendedPlanName, 'Expert Plan');
  assert.equal(expertWithAddons.setupCost, 64500);
  assert.equal(expertWithAddons.monthlyRetainer, 4999);
});

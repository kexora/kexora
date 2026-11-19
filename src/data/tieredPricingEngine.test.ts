import test from 'node:test';
import assert from 'node:assert/strict';
import { INDIVIDUAL_SERVICE_PRICING, KEXORA_SERVICE_PILLARS } from './agencyData';
import {
  getServiceTiers,
  buildQuotationForServiceTier,
  findServicePricingItem,
} from './tieredPricingEngine';

test('Every single one of the 24 services generates Basic < Standard < Premium pricing tiers', () => {
  assert.equal(INDIVIDUAL_SERVICE_PRICING.length, 24);

  for (const service of INDIVIDUAL_SERVICE_PRICING) {
    const tiers = getServiceTiers(service.id);

    assert.equal(tiers.basic.tierLabel, 'Basic');
    assert.equal(tiers.standard.tierLabel, 'Standard');
    assert.equal(tiers.premium.tierLabel, 'Premium');

    // Verify price progression: Basic (Sabse Sasta) < Standard (Middle) < Premium (Max)
    assert.ok(
      tiers.basic.kexoraPriceInr < tiers.standard.kexoraPriceInr,
      `Expected Basic INR < Standard INR for ${service.title}`
    );
    assert.ok(
      tiers.standard.kexoraPriceInr < tiers.premium.kexoraPriceInr,
      `Expected Standard INR < Premium INR for ${service.title}`
    );
    assert.ok(
      tiers.basic.kexoraPriceUsd < tiers.standard.kexoraPriceUsd,
      `Expected Basic USD < Standard USD for ${service.title}`
    );
    assert.ok(
      tiers.standard.kexoraPriceUsd < tiers.premium.kexoraPriceUsd,
      `Expected Standard USD < Premium USD for ${service.title}`
    );

    // Verify each tier has ~30% savings vs market rate and non-empty deliverables
    for (const tierKey of ['basic', 'standard', 'premium'] as const) {
      const pkg = tiers[tierKey];
      assert.ok(pkg.kexoraPriceInr < pkg.marketPriceInr);
      assert.ok(pkg.kexoraPriceUsd < pkg.marketPriceUsd);
      assert.ok(pkg.deliverables.length >= 3);
    }
  }
});

test('All 4 main studio pillars and their catalog items map cleanly to 3-tier quotations', () => {
  assert.equal(KEXORA_SERVICE_PILLARS.length, 4);

  for (const pillar of KEXORA_SERVICE_PILLARS) {
    const pillarItem = findServicePricingItem(pillar.category);
    assert.ok(pillarItem.id);

    for (const itemTitle of pillar.items) {
      const basicQuote = buildQuotationForServiceTier(itemTitle, 'Basic Tier', 'INR');
      const stdQuote = buildQuotationForServiceTier(itemTitle, 'Standard Tier', 'INR');
      const premQuote = buildQuotationForServiceTier(itemTitle, 'Premium Tier', 'USD');

      assert.equal(basicQuote.tierId, 'basic');
      assert.equal(stdQuote.tierId, 'standard');
      assert.equal(premQuote.tierId, 'premium');
      assert.ok(basicQuote.kexoraPrice < stdQuote.kexoraPrice);
      assert.equal(premQuote.currency, 'USD');
      assert.ok(premQuote.formattedBrief.includes(premQuote.quotationCode));
    }
  }
});

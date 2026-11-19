import assert from 'node:assert/strict';
import {
  CANONICAL_ORIGIN,
  SEO_ROUTES,
  resolveRoute,
  getRouteSeo,
  getSuggestedRoutes,
  isKnownValidPath,
  SEVEN_DAY_INDEXING_PLAN,
} from './seoRegistry';

// 1. Canonical configuration & route coverage
assert.equal(CANONICAL_ORIGIN, 'https://kexora.in');
assert.equal(SEO_ROUTES.length, 11, 'Expected 11 canonical routes (7 core + 4 tools)');

// 2. Valid routes & aliases resolve cleanly
const homeRes = resolveRoute('/');
assert.equal(homeRes.status, 'ok');
if (homeRes.status === 'ok') {
  assert.equal(homeRes.tab, 'home');
  assert.equal(homeRes.canonicalPath, '/');
}

const aliasRes = resolveRoute('/contact-us/');
assert.equal(aliasRes.status, 'ok');
if (aliasRes.status === 'ok') {
  assert.equal(aliasRes.tab, 'contact');
  assert.equal(aliasRes.canonicalPath, '/contact');
}

const toolRes = resolveRoute('/our-tools/seo-audit');
assert.equal(toolRes.status, 'ok');
if (toolRes.status === 'ok') {
  assert.equal(toolRes.tab, 'tools');
  assert.equal(toolRes.toolSlug, 'seo-audit');
}

// 3. Invalid paths & invalid tool slugs return real 404 (no Soft-404 to home!)
const unknownRes = resolveRoute('/wrong-way-page');
assert.equal(unknownRes.status, 'error');
if (unknownRes.status === 'error') {
  assert.equal(unknownRes.errorCode, 404);
}
assert.equal(isKnownValidPath('/wrong-way-page'), false);

const badToolRes = resolveRoute('/our-tools/non-existent-tool');
assert.equal(badToolRes.status, 'error');
if (badToolRes.status === 'error') {
  assert.equal(badToolRes.errorCode, 404);
}

// 4. Explicit 403 and 500 error preview routes
const res403 = resolveRoute('/403');
assert.equal(res403.status, 'error');
if (res403.status === 'error') assert.equal(res403.errorCode, 403);

const res500 = resolveRoute('/500');
assert.equal(res500.status, 'error');
if (res500.status === 'error') assert.equal(res500.errorCode, 500);

// 5. Fuzzy suggestion matcher recommends closest valid route for typos
const pricingSuggestions = getSuggestedRoutes('/pricng');
assert.equal(pricingSuggestions[0].path, '/pricing');

const servicesSuggestions = getSuggestedRoutes('/servce');
assert.equal(servicesSuggestions[0].path, '/services');

// 6. Metadata & 7-Day indexing plan validation
const pricingSeo = getRouteSeo('pricing', null);
assert.ok(pricingSeo.title.includes('Kexora'));
assert.equal(pricingSeo.breadcrumbs.length, 2);
assert.equal(SEVEN_DAY_INDEXING_PLAN.length, 7);

console.log('All Kexora SEO registry, 404/403/500 resolution & fuzzy suggestion tests passed!');

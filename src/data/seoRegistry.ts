import type { ActiveTab } from '../types';

export const CANONICAL_ORIGIN = 'https://kexora.in';
export const SITE_NAME = 'Kexora';
export const SITE_ALTERNATE_NAMES = ['Kexora Studio', 'Kexora Agency'];
export const DEFAULT_OG_IMAGE = `${CANONICAL_ORIGIN}/og-image.jpg`;
export const DEFAULT_LOGO_URL = `${CANONICAL_ORIGIN}/favicon-512x512.png`;
export const SITEMAP_LASTMOD = '2026-11-18';

export type ErrorCode = 404 | 403 | 500;

export interface BreadcrumbCrumb {
  name: string;
  path: string;
}

export interface SeoRouteDefinition {
  path: string;
  tab: ActiveTab;
  toolSlug?: string;
  label: string;
  tabTitle: string;
  title: string;
  description: string;
  ogType: 'website' | 'article';
  priority: string;
  changefreq: 'daily' | 'weekly' | 'monthly';
  breadcrumbs: BreadcrumbCrumb[];
  schemaType: 'WebSite' | 'CollectionPage' | 'WebPage' | 'AboutPage' | 'ContactPage' | 'SoftwareApplication';
}

export const SEO_ROUTES: SeoRouteDefinition[] = [
  {
    path: '/',
    tab: 'home',
    label: 'Home',
    tabTitle: 'Kexora · Web, App & AI-SEO',
    title: 'Kexora — Web Design, App, Game & AI-SEO Agency',
    description:
      'Kexora builds custom websites, mobile apps, 2D/3D games, AI-SEO systems, and business registrations with 0.3s load speeds and transparent pricing.',
    ogType: 'website',
    priority: '1.0',
    changefreq: 'daily',
    breadcrumbs: [{ name: 'Home', path: '/' }],
    schemaType: 'WebSite',
  },
  {
    path: '/services',
    tab: 'services',
    label: 'Services',
    tabTitle: 'Services · Kexora',
    title: 'Services — Web, App, Game Development & AI-SEO | Kexora',
    description:
      'Explore 24 digital engineering services from Kexora including custom web development, multi-vendor e-commerce, Android/iOS apps, game dev, SEO, and GST/ISO registration.',
    ogType: 'website',
    priority: '0.95',
    changefreq: 'weekly',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Services', path: '/services' },
    ],
    schemaType: 'CollectionPage',
  },
  {
    path: '/pricing',
    tab: 'pricing',
    label: 'Pricing Plan',
    tabTitle: 'Pricing · Kexora',
    title: 'Pricing Plans — Transparent 3-Tier Agency Rates | Kexora',
    description:
      'Compare Basic, Standard, and Premium pricing in INR and USD across all 24 Kexora web, app, game, branding, and SEO services with instant live quotations.',
    ogType: 'website',
    priority: '0.95',
    changefreq: 'weekly',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Pricing Plan', path: '/pricing' },
    ],
    schemaType: 'WebPage',
  },
  {
    path: '/our-tools',
    tab: 'tools',
    label: 'Our Tools',
    tabTitle: 'Tools · Kexora',
    title: 'Our Tools — Free Privacy-First Browser Utilities | Kexora',
    description:
      'Use free in-browser tools from Kexora: WhatsApp Chat Reader, Live AI SEO Auditor, Project Cost Estimator, and Schema.org JSON-LD Builder with zero server uploads.',
    ogType: 'website',
    priority: '0.90',
    changefreq: 'weekly',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Our Tools', path: '/our-tools' },
    ],
    schemaType: 'CollectionPage',
  },
  {
    path: '/our-tools/whatsapp-reader',
    tab: 'tools',
    toolSlug: 'whatsapp-reader',
    label: 'WhatsApp Message Reader',
    tabTitle: 'WhatsApp Reader · Kexora',
    title: 'WhatsApp Chat Export Reader — Free Local Viewer | Kexora',
    description:
      'Read and filter exported WhatsApp .txt chat logs privately inside your browser memory with zero cloud uploads, instant keyword search, and sender filters.',
    ogType: 'website',
    priority: '0.85',
    changefreq: 'monthly',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Our Tools', path: '/our-tools' },
      { name: 'WhatsApp Message Reader', path: '/our-tools/whatsapp-reader' },
    ],
    schemaType: 'SoftwareApplication',
  },
  {
    path: '/our-tools/seo-audit',
    tab: 'tools',
    toolSlug: 'seo-audit',
    label: 'AI SEO Auditor',
    tabTitle: 'AI SEO Auditor · Kexora',
    title: 'AI SEO & Core Web Vitals Auditor — Live Domain Scan | Kexora',
    description:
      'Audit any website for Core Web Vitals (LCP, CLS), meta tags, and Schema.org sitelink readiness with actionable recommendations from Kexora.',
    ogType: 'website',
    priority: '0.85',
    changefreq: 'monthly',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Our Tools', path: '/our-tools' },
      { name: 'AI SEO Auditor', path: '/our-tools/seo-audit' },
    ],
    schemaType: 'SoftwareApplication',
  },
  {
    path: '/our-tools/cost-calculator',
    tab: 'tools',
    toolSlug: 'cost-calculator',
    label: 'Cost & Speed Estimator',
    tabTitle: 'Cost Estimator · Kexora',
    title: 'Website & App Cost Estimator — INR & USD Calculator | Kexora',
    description:
      'Calculate transparent setup costs, timelines, and retainers for custom websites, mobile apps, games, and e-commerce stores in INR and USD.',
    ogType: 'website',
    priority: '0.85',
    changefreq: 'monthly',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Our Tools', path: '/our-tools' },
      { name: 'Cost & Speed Estimator', path: '/our-tools/cost-calculator' },
    ],
    schemaType: 'SoftwareApplication',
  },
  {
    path: '/our-tools/schema-generator',
    tab: 'tools',
    toolSlug: 'schema-generator',
    label: 'Schema.org JSON-LD Builder',
    tabTitle: 'Schema Builder · Kexora',
    title: 'Schema.org JSON-LD Generator — Google Rich Results | Kexora',
    description:
      'Generate Google-compliant Organization, ProfessionalService, and WebSite JSON-LD structured data to strengthen Site Names and SERP sitelinks.',
    ogType: 'website',
    priority: '0.85',
    changefreq: 'monthly',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Our Tools', path: '/our-tools' },
      { name: 'Schema.org Builder', path: '/our-tools/schema-generator' },
    ],
    schemaType: 'SoftwareApplication',
  },
  {
    path: '/about-us',
    tab: 'about',
    label: 'About Us',
    tabTitle: 'About Us · Kexora',
    title: 'About Us — Leadership, Engineering & Vision | Kexora',
    description:
      'Meet Rajan Singh (CEO) and Aditya Singh (CTO) at Kexora. Learn how our Siwan, Bihar studio delivers 0.3s custom websites, apps, and SEO globally.',
    ogType: 'website',
    priority: '0.85',
    changefreq: 'monthly',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'About Us', path: '/about-us' },
    ],
    schemaType: 'AboutPage',
  },
  {
    path: '/news',
    tab: 'news',
    label: 'News & Insights',
    tabTitle: 'News · Kexora',
    title: 'News & Digital Engineering Updates | Kexora',
    description:
      'Read Kexora dispatches on custom web performance, Google AI-SEO strategies, React migrations, mobile engineering, and digital growth.',
    ogType: 'article',
    priority: '0.80',
    changefreq: 'weekly',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'News', path: '/news' },
    ],
    schemaType: 'CollectionPage',
  },
  {
    path: '/contact',
    tab: 'contact',
    label: 'Contact Us',
    tabTitle: 'Contact · Kexora',
    title: 'Contact Us — Start Your Web, App or SEO Project | Kexora',
    description:
      'Request a custom quotation or speak directly with Kexora leadership via contact@kexora.in for websites, mobile apps, games, and SEO campaigns.',
    ogType: 'website',
    priority: '0.85',
    changefreq: 'monthly',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Contact Us', path: '/contact' },
    ],
    schemaType: 'ContactPage',
  },
];

export const VALID_TOOL_SLUGS = new Set(
  SEO_ROUTES.filter((r) => Boolean(r.toolSlug)).map((r) => r.toolSlug as string)
);

export type RouteResolution =
  | {
      status: 'ok';
      tab: ActiveTab;
      toolSlug: string | null;
      canonicalPath: string;
    }
  | {
      status: 'error';
      errorCode: ErrorCode;
      requestedPath: string;
    };

export function normalizePathname(pathname: string): string {
  const withoutQuery = pathname.split('?')[0].split('#')[0];
  const trimmed = withoutQuery.trim().toLowerCase().replace(/\/+$/, '');
  return trimmed === '' ? '/' : trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
}

export function resolveRoute(pathname: string): RouteResolution {
  const clean = normalizePathname(pathname);

  // Explicit preview/error status routes
  if (clean === '/404' || clean === '/not-found') {
    return { status: 'error', errorCode: 404, requestedPath: pathname };
  }
  if (clean === '/403' || clean === '/forbidden') {
    return { status: 'error', errorCode: 403, requestedPath: pathname };
  }
  if (clean === '/500' || clean === '/server-error') {
    return { status: 'error', errorCode: 500, requestedPath: pathname };
  }

  // Tool detail routes: strictly validate slug so invalid slugs render real 404
  if (clean.startsWith('/our-tools/') || clean.startsWith('/tools/')) {
    const remainder = clean.replace(/^\/(?:our-tools|tools)\//, '');
    const parts = remainder.split('/').filter(Boolean);
    if (parts.length === 1 && VALID_TOOL_SLUGS.has(parts[0])) {
      return {
        status: 'ok',
        tab: 'tools',
        toolSlug: parts[0],
        canonicalPath: `/our-tools/${parts[0]}`,
      };
    }
    return { status: 'error', errorCode: 404, requestedPath: pathname };
  }

  if (clean === '/our-tools' || clean === '/tools') {
    return { status: 'ok', tab: 'tools', toolSlug: null, canonicalPath: '/our-tools' };
  }

  switch (clean) {
    case '/':
    case '/home':
    case '/index.html':
      return { status: 'ok', tab: 'home', toolSlug: null, canonicalPath: '/' };
    case '/services':
    case '/service':
    case '/our-services':
      return { status: 'ok', tab: 'services', toolSlug: null, canonicalPath: '/services' };
    case '/pricing':
    case '/pricing-plan':
    case '/plans':
      return { status: 'ok', tab: 'pricing', toolSlug: null, canonicalPath: '/pricing' };
    case '/about-us':
    case '/about':
      return { status: 'ok', tab: 'about', toolSlug: null, canonicalPath: '/about-us' };
    case '/news':
    case '/blog':
      return { status: 'ok', tab: 'news', toolSlug: null, canonicalPath: '/news' };
    case '/contact':
    case '/contact-us':
    case '/contactus':
      return { status: 'ok', tab: 'contact', toolSlug: null, canonicalPath: '/contact' };
    default:
      return { status: 'error', errorCode: 404, requestedPath: pathname };
  }
}

export function getRouteSeo(tab: ActiveTab, toolSlug: string | null): SeoRouteDefinition {
  if (tab === 'tools' && toolSlug) {
    const toolMatch = SEO_ROUTES.find((r) => r.tab === 'tools' && r.toolSlug === toolSlug);
    if (toolMatch) return toolMatch;
  }
  const tabMatch = SEO_ROUTES.find((r) => r.tab === tab && !r.toolSlug);
  return tabMatch || SEO_ROUTES[0];
}

function levenshteinDistance(a: string, b: string): number {
  const m = a.length;
  const n = b.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + cost);
    }
  }
  return dp[m][n];
}

export function getSuggestedRoutes(badPath: string, limit = 3): SeoRouteDefinition[] {
  const clean = normalizePathname(badPath).replace(/^\//, '');
  if (!clean) return SEO_ROUTES.slice(0, limit);

  const tokens = clean.split(/[-_/]+/).filter(Boolean);

  const scored = SEO_ROUTES.filter((r) => r.path !== '/').map((route) => {
    const routeClean = route.path.replace(/^\//, '');
    const dist = levenshteinDistance(clean, routeClean);
    const labelLower = route.label.toLowerCase();
    let bonus = 0;
    for (const token of tokens) {
      if (token.length >= 2 && (routeClean.includes(token) || labelLower.includes(token))) {
        bonus += 6;
      }
    }
    const maxLen = Math.max(clean.length, routeClean.length, 1);
    const similarity = (1 - dist / maxLen) * 10 + bonus;
    return { route, similarity };
  });

  scored.sort((a, b) => b.similarity - a.similarity);
  return scored.slice(0, limit).map((s) => s.route);
}

export function isKnownValidPath(pathname: string): boolean {
  return resolveRoute(pathname).status === 'ok';
}

export interface IndexingTask {
  id: string;
  day: string;
  title: string;
  detail: string;
  copyValue?: string;
  copyLabel?: string;
}

export const SEVEN_DAY_INDEXING_PLAN: IndexingTask[] = [
  {
    id: 'day-1-https',
    day: 'Day 1',
    title: 'Enforce HTTPS & Apex Domain (kexora.in)',
    detail:
      'In GitHub Pages Settings → Pages, confirm custom domain is "kexora.in" with "Enforce HTTPS" enabled, and point www.kexora.in to 301-redirect to https://kexora.in so Google stops indexing http://kexora.in.',
    copyValue: 'https://kexora.in/',
    copyLabel: 'Copy Canonical URL',
  },
  {
    id: 'day-2-gsc-sitemap',
    day: 'Day 2',
    title: 'Verify Domain Property & Submit XML Sitemap',
    detail:
      'Add kexora.in as a Domain Property in Google Search Console (DNS TXT record), then submit the full 11-URL sitemap under Indexing → Sitemaps.',
    copyValue: 'https://kexora.in/sitemap.xml',
    copyLabel: 'Copy Sitemap URL',
  },
  {
    id: 'day-3-inspect-core',
    day: 'Day 3',
    title: 'Request Priority Indexing on Top 5 Commercial Pages',
    detail:
      'Use Google Search Console URL Inspection → Test Live URL → Request Indexing for /, /services, /pricing, /about-us, and /contact. Static HTTP 200 HTML guarantees instant rendering.',
    copyValue: 'https://kexora.in/services',
    copyLabel: 'Copy Services URL',
  },
  {
    id: 'day-4-sitename-favicon',
    day: 'Day 4',
    title: 'Verify "Kexora" Site Name & Square Favicon Crawl',
    detail:
      'Run https://kexora.in/ through Google Rich Results Test to confirm WebSite.name = "Kexora", matching canonical https://kexora.in/, and accessible /favicon.ico + /favicon-96x96.png.',
    copyValue: 'https://kexora.in/favicon-96x96.png',
    copyLabel: 'Copy Favicon URL',
  },
  {
    id: 'day-5-inspect-tools',
    day: 'Day 5',
    title: 'Index Tool Pages & Submit to Bing Webmaster Tools',
    detail:
      'Request indexing for /our-tools and the 4 utility pages in GSC, and import your verified property into Bing Webmaster Tools (which also feeds DuckDuckGo & AI Search via llms.txt).',
    copyValue: 'https://kexora.in/llms.txt',
    copyLabel: 'Copy llms.txt URL',
  },
  {
    id: 'day-6-404-audit',
    day: 'Day 6',
    title: 'Audit Robots, Soft-404s & Crawl Stats',
    detail:
      'Check GSC Pages report to confirm zero Soft-404 errors, confirm /robots.txt fetches cleanly, and verify invalid URLs return true HTTP 404 with noindex protection.',
    copyValue: 'https://kexora.in/robots.txt',
    copyLabel: 'Copy Robots URL',
  },
  {
    id: 'day-7-serp-check',
    day: 'Day 7',
    title: 'Confirm Full Indexing & Branded Site Name on Google',
    detail:
      'Search "site:kexora.in" and "Kexora" on Google to verify all 11 HTTPS pages are indexed, the square Kexora emblem replaces the globe icon, and Site Name updates from kexora.in to Kexora.',
    copyValue: 'site:kexora.in',
    copyLabel: 'Copy Search Query',
  },
];

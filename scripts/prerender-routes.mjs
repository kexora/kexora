import fs from 'fs';
import path from 'path';

const CANONICAL_ORIGIN = 'https://kexora.in';
const DIST_DIR = path.resolve(process.cwd(), 'dist');
const INDEX_HTML_PATH = path.join(DIST_DIR, 'index.html');

const ROUTES = [
  {
    path: '/',
    title: 'Kexora — Web Design, App, Game & AI-SEO Agency',
    description:
      'Kexora builds custom websites, mobile apps, 2D/3D games, AI-SEO systems, and business registrations with 0.3s load speeds and transparent pricing.',
    ogType: 'website',
    breadcrumbs: [{ name: 'Home', path: '/' }],
  },
  {
    path: '/services',
    title: 'Services — Web, App, Game Development & AI-SEO | Kexora',
    description:
      'Explore 24 digital engineering services from Kexora including custom web development, multi-vendor e-commerce, Android/iOS apps, game dev, SEO, and GST/ISO registration.',
    ogType: 'website',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Services', path: '/services' },
    ],
  },
  {
    path: '/pricing',
    title: 'Pricing Plans — Transparent 3-Tier Agency Rates | Kexora',
    description:
      'Compare Basic, Standard, and Premium pricing in INR and USD across all 24 Kexora web, app, game, branding, and SEO services with instant live quotations.',
    ogType: 'website',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Pricing Plan', path: '/pricing' },
    ],
  },
  {
    path: '/our-tools',
    title: 'Our Tools — Free Privacy-First Browser Utilities | Kexora',
    description:
      'Use free in-browser tools from Kexora: WhatsApp Chat Reader, Live AI SEO Auditor, Project Cost Estimator, and Schema.org JSON-LD Builder with zero server uploads.',
    ogType: 'website',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Our Tools', path: '/our-tools' },
    ],
  },
  {
    path: '/our-tools/whatsapp-reader',
    title: 'WhatsApp Chat Export Reader — Free Local Viewer | Kexora',
    description:
      'Read and filter exported WhatsApp .txt chat logs privately inside your browser memory with zero cloud uploads, instant keyword search, and sender filters.',
    ogType: 'website',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Our Tools', path: '/our-tools' },
      { name: 'WhatsApp Message Reader', path: '/our-tools/whatsapp-reader' },
    ],
  },
  {
    path: '/our-tools/seo-audit',
    title: 'AI SEO & Core Web Vitals Auditor — Live Domain Scan | Kexora',
    description:
      'Audit any website for Core Web Vitals (LCP, CLS), meta tags, and Schema.org sitelink readiness with actionable recommendations from Kexora.',
    ogType: 'website',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Our Tools', path: '/our-tools' },
      { name: 'AI SEO Auditor', path: '/our-tools/seo-audit' },
    ],
  },
  {
    path: '/our-tools/cost-calculator',
    title: 'Website & App Cost Estimator — INR & USD Calculator | Kexora',
    description:
      'Calculate transparent setup costs, timelines, and retainers for custom websites, mobile apps, games, and e-commerce stores in INR and USD.',
    ogType: 'website',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Our Tools', path: '/our-tools' },
      { name: 'Cost & Speed Estimator', path: '/our-tools/cost-calculator' },
    ],
  },
  {
    path: '/our-tools/schema-generator',
    title: 'Schema.org JSON-LD Generator — Google Rich Results | Kexora',
    description:
      'Generate Google-compliant Organization, ProfessionalService, and WebSite JSON-LD structured data to strengthen Site Names and SERP sitelinks.',
    ogType: 'website',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Our Tools', path: '/our-tools' },
      { name: 'Schema.org Builder', path: '/our-tools/schema-generator' },
    ],
  },
  {
    path: '/about-us',
    title: 'About Us — Leadership, Engineering & Vision | Kexora',
    description:
      'Meet Rajan Singh (CEO) and Aditya Singh (CTO) at Kexora. Learn how our Siwan, Bihar studio delivers 0.3s custom websites, apps, and SEO globally.',
    ogType: 'website',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'About Us', path: '/about-us' },
    ],
  },
  {
    path: '/news',
    title: 'News & Digital Engineering Updates | Kexora',
    description:
      'Read Kexora dispatches on custom web performance, Google AI-SEO strategies, React migrations, mobile engineering, and digital growth.',
    ogType: 'article',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'News', path: '/news' },
    ],
  },
  {
    path: '/contact',
    title: 'Contact Us — Start Your Web, App or SEO Project | Kexora',
    description:
      'Request a custom quotation or speak directly with Kexora leadership via contact@kexora.in for websites, mobile apps, games, and SEO campaigns.',
    ogType: 'website',
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Contact Us', path: '/contact' },
    ],
  },
];

function escapeHtmlAttr(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function buildRouteHtml(baseHtml, route) {
  const canonicalUrl =
    route.path === '/' ? `${CANONICAL_ORIGIN}/` : `${CANONICAL_ORIGIN}${route.path}`;
  const escapedTitle = escapeHtmlAttr(route.title);
  const escapedDesc = escapeHtmlAttr(route.description);

  const breadcrumbJsonLd =
    route.breadcrumbs.length > 1
      ? `<script type="application/ld+json">${JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: route.breadcrumbs.map((crumb, idx) => ({
            '@type': 'ListItem',
            position: idx + 1,
            name: crumb.name,
            item:
              crumb.path === '/'
                ? `${CANONICAL_ORIGIN}/`
                : `${CANONICAL_ORIGIN}${crumb.path}`,
          })),
        })}</script>`
      : '';

  let html = baseHtml;
  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${escapedTitle}</title>`);
  html = html.replace(
    /<link rel="canonical" href="[^"]*"\s*\/>/,
    `<link rel="canonical" href="${canonicalUrl}" />`
  );
  html = html.replace(
    /<meta name="description" content="[^"]*"\s*\/>/,
    `<meta name="description" content="${escapedDesc}" />`
  );
  html = html.replace(
    /<meta property="og:type" content="[^"]*"\s*\/>/,
    `<meta property="og:type" content="${route.ogType}" />`
  );
  html = html.replace(
    /<meta property="og:url" content="[^"]*"\s*\/>/,
    `<meta property="og:url" content="${canonicalUrl}" />`
  );
  html = html.replace(
    /<meta property="og:title" content="[^"]*"\s*\/>/,
    `<meta property="og:title" content="${escapedTitle}" />`
  );
  html = html.replace(
    /<meta property="og:description" content="[^"]*"\s*\/>/,
    `<meta property="og:description" content="${escapedDesc}" />`
  );
  html = html.replace(
    /<meta name="twitter:title" content="[^"]*"\s*\/>/,
    `<meta name="twitter:title" content="${escapedTitle}" />`
  );
  html = html.replace(
    /<meta name="twitter:description" content="[^"]*"\s*\/>/,
    `<meta name="twitter:description" content="${escapedDesc}" />`
  );
  html = html.replace('<!-- KEXORA_ROUTE_JSONLD -->', breadcrumbJsonLd);

  return html;
}

if (!fs.existsSync(INDEX_HTML_PATH)) {
  console.error('prerender-routes: dist/index.html not found. Run vite build first.');
  process.exit(1);
}

const baseHtml = fs.readFileSync(INDEX_HTML_PATH, 'utf-8');
let generatedCount = 0;

for (const route of ROUTES) {
  if (route.path === '/') continue;
  const routeHtml = buildRouteHtml(baseHtml, route);
  const targetDir = path.join(DIST_DIR, route.path.replace(/^\//, ''));
  fs.mkdirSync(targetDir, { recursive: true });
  fs.writeFileSync(path.join(targetDir, 'index.html'), routeHtml, 'utf-8');
  generatedCount++;
}

fs.writeFileSync(path.join(DIST_DIR, '.nojekyll'), '', 'utf-8');

console.log(
  `[Kexora SEO Build] Generated ${generatedCount} static HTTP-200 route HTML files + .nojekyll in dist/ (11 total canonical routes including /).`
);

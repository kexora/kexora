import React, { useState } from 'react';
import { Search, FileCode, Globe, Shield } from 'lucide-react';
import { BlurKex } from '../../effect';

export const SeoHubSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'schema' | 'opengraph' | 'sitemap'>('schema');

  return (
    <section
      id="seo-hub"
      className="py-20 bg-zinc-50 text-zinc-950 border-b border-zinc-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <BlurKex
          direction="up"
          blurPx={14}
          className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6"
        >
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2">
              Enterprise Google SEO & AI-SEO Architecture · Built Into Every Kexora Site
            </div>
            <h2
              className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-950 font-[Outfit]"
              style={{ textWrap: 'balance' }}
            >
              Engineered to Rank Like Industry-Leading Tech Brands
            </h2>
          </div>
          <p className="text-sm text-zinc-600 max-w-md leading-relaxed">
            Every custom code site we build ships with nested Schema.org JSON-LD graphs, Google SERP sitelink triggers, OpenGraph social cards, and Local GMB signals.
          </p>
        </BlurKex>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <BlurKex
            direction="up"
            staggerIndex={0}
            blurPx={14}
            className="p-7 rounded-2xl bg-white border border-zinc-200 space-y-3"
          >
            <FileCode className="w-5 h-5 text-zinc-950" />
            <h3 className="text-lg font-bold text-zinc-950 font-[Outfit]">
              01. Schema.org JSON-LD Sitelinks
            </h3>
            <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
              Structured Organization, ProfessionalService, WebSite, and SiteNavigationElement scripts help Google award multi-link sitelink panels directly under your domain.
            </p>
          </BlurKex>

          <BlurKex
            direction="up"
            staggerIndex={1}
            blurPx={14}
            className="p-7 rounded-2xl bg-white border border-zinc-200 space-y-3"
          >
            <Globe className="w-5 h-5 text-zinc-950" />
            <h3 className="text-lg font-bold text-zinc-950 font-[Outfit]">
              02. OpenGraph & Social Cards
            </h3>
            <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
              Sharing your URL on WhatsApp, LinkedIn, or X/Twitter automatically renders rich preview cards with tailored titles, descriptions, and high-contrast visuals.
            </p>
          </BlurKex>

          <BlurKex
            direction="up"
            staggerIndex={2}
            blurPx={14}
            className="p-7 rounded-2xl bg-white border border-zinc-200 space-y-3"
          >
            <Shield className="w-5 h-5 text-zinc-950" />
            <h3 className="text-lg font-bold text-zinc-950 font-[Outfit]">
              03. AI-SEO & Core Web Vitals
            </h3>
            <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
              Sub-second Largest Contentful Paint (0.3s LCP), zero layout shift (0.00 CLS), and clean semantic HTML5 headings ensure top placement in Google AI Overviews.
            </p>
          </BlurKex>
        </div>

        <div className="p-6 sm:p-8 rounded-2xl bg-white border border-zinc-200">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-5 pb-4 border-b border-zinc-200">
            <div className="flex items-center gap-2 text-sm font-bold text-zinc-950">
              <Search className="w-4 h-4 text-zinc-950" />
              <span>Live Kexora.org Technical SEO Blueprint</span>
            </div>
            <div className="flex flex-wrap gap-1.5 p-1 bg-zinc-100 rounded-xl border border-zinc-200">
              <button
                type="button"
                onClick={() => setActiveTab('schema')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                  activeTab === 'schema'
                    ? 'bg-zinc-950 text-white font-bold'
                    : 'text-zinc-600 hover:text-zinc-950'
                }`}
              >
                JSON-LD Graph
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('opengraph')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                  activeTab === 'opengraph'
                    ? 'bg-zinc-950 text-white font-bold'
                    : 'text-zinc-600 hover:text-zinc-950'
                }`}
              >
                OpenGraph Meta
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('sitemap')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                  activeTab === 'sitemap'
                    ? 'bg-zinc-950 text-white font-bold'
                    : 'text-zinc-600 hover:text-zinc-950'
                }`}
              >
                XML Sitemap
              </button>
            </div>
          </div>

          {activeTab === 'schema' && (
            <pre className="p-4 rounded-xl bg-zinc-950 text-zinc-100 text-xs font-mono overflow-x-auto max-h-60">
{`{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.kexora.org/#organization",
      "name": "Kexora",
      "url": "https://www.kexora.org",
      "founder": { "@type": "Person", "name": "Rajan Singh", "jobTitle": "CEO & Strategy Head" },
      "address": { "@type": "PostalAddress", "addressLocality": "Siwan", "addressRegion": "Bihar", "postalCode": "841226", "addressCountry": "IN" }
    },
    {
      "@type": "WebSite",
      "url": "https://www.kexora.org",
      "hasPart": [
        { "@type": "SiteNavigationElement", "name": "About Us", "url": "https://www.kexora.org/#about" },
        { "@type": "SiteNavigationElement", "name": "Services", "url": "https://www.kexora.org/#services" },
        { "@type": "SiteNavigationElement", "name": "Pricing Plan", "url": "https://www.kexora.org/#pricing" },
        { "@type": "SiteNavigationElement", "name": "Our Tools", "url": "https://www.kexora.org/#tools" }
      ]
    }
  ]
}`}
            </pre>
          )}

          {activeTab === 'opengraph' && (
            <pre className="p-4 rounded-xl bg-zinc-950 text-zinc-100 text-xs font-mono overflow-x-auto max-h-60">
{`<meta property="og:site_name" content="Kexora" />
<meta property="og:type" content="website" />
<meta property="og:title" content="Kexora — Crafting Fast Websites, Apps & Digital Brands" />
<meta property="og:description" content="Custom Web Design, Mobile App & Game Development, E-Commerce, AI-SEO, and Business Registration." />
<meta name="twitter:card" content="summary_large_image" />`}
            </pre>
          )}

          {activeTab === 'sitemap' && (
            <pre className="p-4 rounded-xl bg-zinc-950 text-zinc-100 text-xs font-mono overflow-x-auto max-h-60">
{`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://www.kexora.org/</loc><priority>1.0</priority></url>
  <url><loc>https://www.kexora.org/#services</loc><priority>0.9</priority></url>
  <url><loc>https://www.kexora.org/#pricing</loc><priority>0.9</priority></url>
  <url><loc>https://www.kexora.org/#tools</loc><priority>0.8</priority></url>
  <url><loc>https://www.kexora.org/#about</loc><priority>0.8</priority></url>
</urlset>`}
            </pre>
          )}
        </div>
      </div>
    </section>
  );
};

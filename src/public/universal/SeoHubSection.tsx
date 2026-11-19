import React, { useState, useEffect } from 'react';
import {
  Search,
  FileCode,
  Globe,
  Shield,
  Check,
  Copy,
  RotateCcw,
  CheckSquare,
  Square,
} from 'lucide-react';
import { BlurKex } from './effect';
import {
  CANONICAL_ORIGIN,
  SEVEN_DAY_INDEXING_PLAN,
  SITEMAP_LASTMOD,
} from '../../data/seoRegistry';

const CHECKLIST_STORAGE_KEY = 'kexora_indexing_checklist_v1';

export const SeoHubSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    'checklist' | 'schema' | 'crawl' | 'llms'
  >('checklist');
  const [completedIds, setCompletedIds] = useState<string[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const saved = window.localStorage.getItem(CHECKLIST_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed.filter((x) => typeof x === 'string');
      }
    } catch {
      // Ignore storage read errors
    }
    return [];
  });
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    try {
      window.localStorage.setItem(
        CHECKLIST_STORAGE_KEY,
        JSON.stringify(completedIds)
      );
    } catch {
      // Ignore storage write errors
    }
  }, [completedIds]);

  const toggleTask = (id: string) => {
    setCompletedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const resetChecklist = () => {
    setCompletedIds([]);
  };

  const handleCopy = (id: string, value: string) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(value);
      setCopiedId(id);
      window.setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const completedCount = completedIds.length;
  const totalCount = SEVEN_DAY_INDEXING_PLAN.length;
  const progressPercent = Math.round((completedCount / totalCount) * 100);

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
            <div className="text-xs font-semibold text-zinc-500 mb-2">
              Enterprise Google SEO &amp; AI-SEO Architecture · Canonical {CANONICAL_ORIGIN}
            </div>
            <h2
              className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-950 font-[Outfit]"
              style={{ textWrap: 'balance' }}
            >
              Engineered for 7-Day Indexing &amp; Verified Brand Site Names
            </h2>
          </div>
          <p className="text-sm text-zinc-600 max-w-md leading-relaxed">
            Every Kexora site ships with unified HTTPS canonicals, static HTTP-200 route HTML, square Google-ready favicons, JSON-LD Site Name graphs, and zero Soft-404 errors.
          </p>
        </BlurKex>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <BlurKex
            direction="up"
            staggerIndex={0}
            blurPx={14}
            className="p-7 rounded-2xl bg-white border border-zinc-200 space-y-3"
          >
            <FileCode className="w-5 h-5 text-zinc-950" aria-hidden="true" />
            <h3 className="text-lg font-bold text-zinc-950 font-[Outfit]">
              01. Google Site Name &amp; JSON-LD Graph
            </h3>
            <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
              Exact-root WebSite, Organization, and ProfessionalService schemas unified on {CANONICAL_ORIGIN}/ reinforce &ldquo;Kexora&rdquo; as the Google Site Name instead of a raw domain string.
            </p>
          </BlurKex>

          <BlurKex
            direction="up"
            staggerIndex={1}
            blurPx={14}
            className="p-7 rounded-2xl bg-white border border-zinc-200 space-y-3"
          >
            <Globe className="w-5 h-5 text-zinc-950" aria-hidden="true" />
            <h3 className="text-lg font-bold text-zinc-950 font-[Outfit]">
              02. Static HTTP-200 Routes &amp; Sitemap
            </h3>
            <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
              Every core page and browser utility pre-renders its own HTML file with route-specific metadata, breadcrumbs, robots.txt directives, XML sitemap, and llms.txt discovery.
            </p>
          </BlurKex>

          <BlurKex
            direction="up"
            staggerIndex={2}
            blurPx={14}
            className="p-7 rounded-2xl bg-white border border-zinc-200 space-y-3"
          >
            <Shield className="w-5 h-5 text-zinc-950" aria-hidden="true" />
            <h3 className="text-lg font-bold text-zinc-950 font-[Outfit]">
              03. True 404/403/500 Crawl Protection
            </h3>
            <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
              Unknown URLs return real 404 pages with noindex, follow protection and smart route suggestions—eliminating Soft-404 warnings and protecting crawl budget.
            </p>
          </BlurKex>
        </div>

        <div className="p-6 sm:p-8 rounded-2xl bg-white border border-zinc-200">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-6 pb-5 border-b border-zinc-200">
            <div className="flex items-center gap-2.5 text-sm font-bold text-zinc-950">
              <Search className="w-4 h-4 text-zinc-950 shrink-0" aria-hidden="true" />
              <span>Kexora Live Technical SEO &amp; 7-Day Crawl Console</span>
            </div>
            <div className="flex flex-wrap gap-1.5 p-1 bg-zinc-100 rounded-xl border border-zinc-200">
              <button
                type="button"
                onClick={() => setActiveTab('checklist')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                  activeTab === 'checklist'
                    ? 'bg-zinc-950 text-white font-bold'
                    : 'text-zinc-600 hover:text-zinc-950'
                }`}
              >
                7-Day Crawl Checklist ({completedCount}/{totalCount})
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('schema')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                  activeTab === 'schema'
                    ? 'bg-zinc-950 text-white font-bold'
                    : 'text-zinc-600 hover:text-zinc-950'
                }`}
              >
                JSON-LD Graph
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('crawl')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                  activeTab === 'crawl'
                    ? 'bg-zinc-950 text-white font-bold'
                    : 'text-zinc-600 hover:text-zinc-950'
                }`}
              >
                robots.txt &amp; Sitemap
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('llms')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                  activeTab === 'llms'
                    ? 'bg-zinc-950 text-white font-bold'
                    : 'text-zinc-600 hover:text-zinc-950'
                }`}
              >
                llms.txt (AI Search)
              </button>
            </div>
          </div>

          {activeTab === 'checklist' && (
            <div className="space-y-6">
              {/* Progress Bar & Summary */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-zinc-50 border border-zinc-200">
                <div className="space-y-1">
                  <div className="text-xs font-bold text-zinc-950">
                    Google Search Console &amp; Site Name Launch Progress
                  </div>
                  <div className="text-xs text-zinc-600">
                    Follow each day&rsquo;s action after deploying so Google replaces <span className="font-mono text-zinc-900">http://kexora.in</span> with <span className="font-semibold text-zinc-950">Kexora</span> and indexes all 11 HTTPS routes within 7 days.
                  </div>
                </div>
                <div className="flex items-center gap-4 shrink-0">
                  <div className="text-right">
                    <div className="text-sm font-extrabold font-mono tabular-nums text-zinc-950">
                      {progressPercent}%
                    </div>
                    <div className="text-[11px] text-zinc-500 tabular-nums">
                      {completedCount} of {totalCount} done
                    </div>
                  </div>
                  {completedCount > 0 && (
                    <button
                      type="button"
                      onClick={resetChecklist}
                      className="px-3 py-1.5 rounded-lg bg-white border border-zinc-200 hover:border-zinc-950 text-xs font-semibold text-zinc-700 hover:text-zinc-950 inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Reset</span>
                    </button>
                  )}
                </div>
              </div>

              <div className="w-full h-2 rounded-full bg-zinc-100 overflow-hidden">
                <div
                  className="h-full bg-zinc-950 transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              {/* 7 Daily Steps */}
              <div className="divide-y divide-zinc-200 border border-zinc-200 rounded-2xl overflow-hidden bg-white">
                {SEVEN_DAY_INDEXING_PLAN.map((task) => {
                  const isDone = completedIds.includes(task.id);
                  return (
                    <div
                      key={task.id}
                      className={`p-4 sm:p-5 flex flex-col sm:flex-row sm:items-start justify-between gap-4 transition-colors ${
                        isDone ? 'bg-zinc-50/80' : 'bg-white'
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => toggleTask(task.id)}
                        className="flex items-start gap-3.5 text-left flex-1 cursor-pointer group"
                      >
                        <span className="mt-0.5 text-zinc-950 shrink-0">
                          {isDone ? (
                            <CheckSquare className="w-5 h-5 text-emerald-700" />
                          ) : (
                            <Square className="w-5 h-5 text-zinc-400 group-hover:text-zinc-950 transition-colors" />
                          )}
                        </span>
                        <span className="space-y-1">
                          <span className="flex flex-wrap items-center gap-2 text-xs text-zinc-500">
                            <span className="font-mono font-bold text-zinc-950 tabular-nums">
                              {task.day}
                            </span>
                            <span aria-hidden="true">·</span>
                            <span className={isDone ? 'text-emerald-700 font-semibold' : 'text-zinc-500'}>
                              {isDone ? 'Completed' : 'Pending'}
                            </span>
                          </span>
                          <span
                            className={`block text-sm font-bold font-[Outfit] ${
                              isDone ? 'line-through text-zinc-500' : 'text-zinc-950'
                            }`}
                          >
                            {task.title}
                          </span>
                          <span className="block text-xs text-zinc-600 leading-relaxed max-w-3xl">
                            {task.detail}
                          </span>
                        </span>
                      </button>

                      {task.copyValue && (
                        <button
                          type="button"
                          onClick={() => handleCopy(task.id, task.copyValue!)}
                          className="self-start sm:self-center px-3.5 py-2 rounded-lg bg-zinc-50 hover:bg-zinc-950 text-zinc-800 hover:text-white border border-zinc-200 hover:border-zinc-950 text-xs font-semibold inline-flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                        >
                          {copiedId === task.id ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span>Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>{task.copyLabel || 'Copy URL'}</span>
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === 'schema' && (
            <pre className="p-4 rounded-xl bg-zinc-950 text-zinc-100 text-xs font-mono overflow-x-auto max-h-80">
{`{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://kexora.in/#website",
      "url": "https://kexora.in/",
      "name": "Kexora",
      "alternateName": ["Kexora Studio", "Kexora Agency"],
      "publisher": { "@id": "https://kexora.in/#organization" },
      "hasPart": [
        { "@type": "SiteNavigationElement", "name": "Services", "url": "https://kexora.in/services" },
        { "@type": "SiteNavigationElement", "name": "Pricing Plan", "url": "https://kexora.in/pricing" },
        { "@type": "SiteNavigationElement", "name": "Our Tools", "url": "https://kexora.in/our-tools" },
        { "@type": "SiteNavigationElement", "name": "About Us", "url": "https://kexora.in/about-us" },
        { "@type": "SiteNavigationElement", "name": "News", "url": "https://kexora.in/news" },
        { "@type": "SiteNavigationElement", "name": "Contact Us", "url": "https://kexora.in/contact" }
      ]
    },
    {
      "@type": "Organization",
      "@id": "https://kexora.in/#organization",
      "name": "Kexora",
      "url": "https://kexora.in/",
      "logo": {
        "@type": "ImageObject",
        "url": "https://kexora.in/favicon-512x512.png",
        "width": 512,
        "height": 512
      }
    }
  ]
}`}
            </pre>
          )}

          {activeTab === 'crawl' && (
            <pre className="p-4 rounded-xl bg-zinc-950 text-zinc-100 text-xs font-mono overflow-x-auto max-h-80">
{`# /robots.txt
User-agent: *
Allow: /
Disallow: /api/
Disallow: /src/
Disallow: /403
Disallow: /404
Disallow: /500
Sitemap: https://kexora.in/sitemap.xml

<!-- /sitemap.xml (11 Canonical HTTPS Routes, lastmod ${SITEMAP_LASTMOD}) -->
https://kexora.in/                         (priority 1.0 · daily)
https://kexora.in/services                 (priority 0.95 · weekly)
https://kexora.in/pricing                  (priority 0.95 · weekly)
https://kexora.in/our-tools                (priority 0.90 · weekly)
https://kexora.in/our-tools/whatsapp-reader (priority 0.85 · monthly)
https://kexora.in/our-tools/seo-audit      (priority 0.85 · monthly)
https://kexora.in/our-tools/cost-calculator (priority 0.85 · monthly)
https://kexora.in/our-tools/schema-generator (priority 0.85 · monthly)
https://kexora.in/about-us                 (priority 0.85 · monthly)
https://kexora.in/news                     (priority 0.80 · weekly)
https://kexora.in/contact                  (priority 0.85 · monthly)`}
            </pre>
          )}

          {activeTab === 'llms' && (
            <pre className="p-4 rounded-xl bg-zinc-950 text-zinc-100 text-xs font-mono overflow-x-auto max-h-80">
{`# Kexora — https://kexora.in/llms.txt
Official Canonical Website: https://kexora.in
Brand Name: Kexora
Leadership: Rajan Singh (CEO), Aditya Singh (CTO)
Headquarters: Siwan, Bihar 841226, India

Core Pages:
- https://kexora.in/
- https://kexora.in/services
- https://kexora.in/pricing
- https://kexora.in/our-tools
- https://kexora.in/about-us
- https://kexora.in/news
- https://kexora.in/contact`}
            </pre>
          )}
        </div>
      </div>
    </section>
  );
};

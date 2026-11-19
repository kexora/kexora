import React, { useState } from 'react';
import { ActiveTab, ToolTab } from '../../types';
import { KEXORA_TOOLS_CATALOG, ToolItem } from '../../data/toolsData';
import { PageBanner } from '../component/PageBanner';
import { SeoHubSection } from '../component/SeoHubSection';
import { WhatsAppReaderTool } from '../component/tools/WhatsAppReaderTool';
import { SeoAuditorTool } from '../component/tools/SeoAuditorTool';
import { CostEstimatorTool } from '../component/tools/CostEstimatorTool';
import { SchemaBuilderTool } from '../component/tools/SchemaBuilderTool';
import { DigiSagunTool } from '../component/tools/DigiSagunTool';
import { BlurKex } from '../../effect';
import {
  MessageSquare,
  Gauge,
  Calculator,
  FileCode,
  Smartphone,
  Search,
  ArrowRight,
  ShieldCheck,
  Zap,
  CheckCircle2,
  ExternalLink,
  Sparkles,
  ChevronDown,
  Layers,
  Lock,
  Share2,
  Check,
} from 'lucide-react';

interface OurToolsPageProps {
  onNavigatePage: (page: ActiveTab) => void;
  onNavigateTool: (slug: string) => void;
  openContactModal: (serviceName?: string, details?: string) => void;
}

export const OurToolsPage: React.FC<OurToolsPageProps> = ({
  onNavigatePage,
  onNavigateTool,
  openContactModal,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedPreviewSlug, setExpandedPreviewSlug] = useState<string | null>(null);
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'All Utilities (4)' },
    { id: 'Privacy & Messaging', label: 'Privacy & Messaging' },
    { id: 'AI & SEO', label: 'AI & SEO' },
    { id: 'Scoping & Pricing', label: 'Scoping & Pricing' },
    { id: 'Search Architecture', label: 'Search Architecture' },
  ];

  const filteredTools = KEXORA_TOOLS_CATALOG.filter((tool) => {
    const matchesCategory =
      selectedCategory === 'all' || tool.category === selectedCategory;
    const matchesSearch =
      searchQuery.trim() === '' ||
      tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.features.some((f) =>
        f.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return matchesCategory && matchesSearch;
  });

  const getToolIcon = (id: string) => {
    switch (id) {
      case 'whatsapp-reader':
        return <MessageSquare className="w-5 h-5 text-emerald-600" />;
      case 'seo-audit':
        return <Gauge className="w-5 h-5 text-blue-600" />;
      case 'cost-calculator':
        return <Calculator className="w-5 h-5 text-purple-600" />;
      case 'schema-generator':
        return <FileCode className="w-5 h-5 text-amber-600" />;
      default:
        return <Sparkles className="w-5 h-5 text-zinc-950" />;
    }
  };

  const copyToolUrl = (slug: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (typeof window !== 'undefined') {
      const fullUrl = `${window.location.origin}/our-tools/${slug}`;
      navigator.clipboard.writeText(fullUrl);
      setCopiedSlug(slug);
      setTimeout(() => setCopiedSlug(null), 2000);
    }
  };

  return (
    <div className="bg-white text-zinc-950">
      {/* 1. Header Banner */}
      <PageBanner
        kicker="Our Tools · Kexora Browser Utilities & Engineering Lab"
        title="Free In-Browser Utilities for"
        highlightText="Founders, Marketers & Developers"
        description="Explore Kexora’s signature client-side utilities. Each tool runs 100% in your local browser memory with zero cloud telemetry, sub-second execution, and dedicated dynamic pages."
        primaryCtaLabel="Request a Custom Web Utility"
        onPrimaryCta={() =>
          openContactModal(
            'Custom Web App / Utility Development',
            'Inquiry for a custom in-browser tool or progressive web app.'
          )
        }
        onBackHome={onNavigatePage}
      />

      {/* 2. Key Telemetry Strip */}
      <section className="py-6 bg-zinc-950 text-white border-b border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <BlurKex direction="up" blurPx={12} className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="space-y-1">
              <div className="text-xl sm:text-2xl font-extrabold font-[Outfit] text-white">
                4 Micro-Apps
              </div>
              <div className="text-xs text-zinc-400">Production-Ready &amp; Free</div>
            </div>
            <div className="space-y-1">
              <div className="text-xl sm:text-2xl font-extrabold font-[Outfit] text-emerald-400">
                0 Server Uploads
              </div>
              <div className="text-xs text-zinc-400">100% In-Browser Privacy</div>
            </div>
            <div className="space-y-1">
              <div className="text-xl sm:text-2xl font-extrabold font-[Outfit] text-white">
                0.3s Target LCP
              </div>
              <div className="text-xs text-zinc-400">Sub-Second Execution</div>
            </div>
            <div className="space-y-1">
              <div className="text-xl sm:text-2xl font-extrabold font-[Outfit] text-purple-400">
                Dedicated URLs
              </div>
              <div className="text-xs text-zinc-400">Dynamic Slug Routing</div>
            </div>
          </BlurKex>
        </div>
      </section>

      {/* 3. Main Tools Directory & Showcase List */}
      <section id="directory" className="py-16 sm:py-20 bg-zinc-50 border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {/* Section Heading & Category Filter Bar */}
          <BlurKex
            direction="up"
            blurPx={14}
            className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-zinc-200"
          >
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-1">
                Kexora Utility Directory
              </div>
              <h2
                className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-950 font-[Outfit]"
                style={{ textWrap: 'balance' }}
              >
                Explore All Free Client Utilities
              </h2>
              <p className="text-xs sm:text-sm text-zinc-600 mt-1 max-w-xl">
                Browse detailed technical breakdowns below. Click any card to launch its dedicated dynamic page with the complete interactive experience.
              </p>
            </div>

            {/* Search Input */}
            <div className="relative w-full lg:w-80 shrink-0">
              <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tools, features, specs..."
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-zinc-300 rounded-xl text-xs text-zinc-950 placeholder-zinc-400 focus:outline-none focus:border-zinc-950 transition-colors shadow-xs"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-400 hover:text-zinc-600"
                >
                  Clear
                </button>
              )}
            </div>
          </BlurKex>

          {/* Category Filter Chips */}
          <BlurKex direction="up" delay={0.06} blurPx={10} className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-zinc-950 text-white font-bold shadow-xs'
                    : 'bg-white text-zinc-600 hover:text-zinc-950 border border-zinc-200 hover:border-zinc-300'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </BlurKex>

          {/* Tools List Cards */}
          <div className="space-y-8">
            {filteredTools.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-3xl border border-zinc-200 space-y-3">
                <Search className="w-8 h-8 text-zinc-300 mx-auto" />
                <h3 className="text-base font-bold text-zinc-950 font-[Outfit]">
                  No matching tools found
                </h3>
                <p className="text-xs text-zinc-500 max-w-sm mx-auto">
                  Try adjusting your search query or reset the category filter to view all utilities.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCategory('all');
                    setSearchQuery('');
                  }}
                  className="px-4 py-2 bg-zinc-950 text-white rounded-xl text-xs font-bold"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              filteredTools.map((tool, idx) => {
                const isExpanded = expandedPreviewSlug === tool.slug;
                return (
                  <BlurKex
                    key={tool.slug}
                    direction="up"
                    staggerIndex={idx}
                    blurPx={15}
                    className="bg-white rounded-3xl border border-zinc-200 hover:border-zinc-300/80 transition-all shadow-xs overflow-hidden"
                  >
                    {/* Tool Header & Summary */}
                    <div className="p-6 sm:p-8 space-y-6">
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                        <div className="space-y-2">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-zinc-100 text-zinc-700">
                              {tool.category}
                            </span>
                            <span className="text-[10px] font-mono font-bold text-zinc-500 bg-zinc-50 px-2 py-0.5 rounded border border-zinc-200">
                              /our-tools/{tool.slug}
                            </span>
                            <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                              <ShieldCheck className="w-3 h-3 text-emerald-600" />
                              <span>{tool.badge}</span>
                            </span>
                          </div>

                          <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-950 font-[Outfit]">
                            {tool.title}
                          </h3>
                        </div>

                        {/* Top Action Buttons */}
                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            type="button"
                            onClick={(e) => copyToolUrl(tool.slug, e)}
                            title="Copy link to this tool"
                            className="p-2.5 rounded-xl border border-zinc-200 hover:border-zinc-400 bg-white hover:bg-zinc-50 text-zinc-600 hover:text-zinc-950 transition-colors"
                          >
                            {copiedSlug === tool.slug ? (
                              <Check className="w-4 h-4 text-emerald-600" />
                            ) : (
                              <Share2 className="w-4 h-4" />
                            )}
                          </button>

                          <button
                            type="button"
                            onClick={() => onNavigateTool(tool.slug)}
                            className="px-5 py-2.5 rounded-xl bg-zinc-950 hover:bg-zinc-800 text-white text-xs font-bold transition-all shadow-xs inline-flex items-center gap-2"
                          >
                            <span>Launch Dedicated Page</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed max-w-4xl">
                        {tool.fullDesc}
                      </p>

                      {/* 4 Metric Badges */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                        {tool.metrics.map((metric, i) => (
                          <div
                            key={i}
                            className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-200/90 space-y-0.5"
                          >
                            <div className="text-[11px] font-medium text-zinc-500">
                              {metric.label}
                            </div>
                            <div className="text-base sm:text-lg font-bold font-[Outfit] text-zinc-950 tabular-nums">
                              {metric.value}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Feature Capabilities Checklist */}
                      <div className="pt-4 border-t border-zinc-100">
                        <div className="text-xs font-bold text-zinc-900 mb-3">
                          Key Capabilities &amp; Built-In Features:
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5">
                          {tool.features.map((feat, i) => (
                            <div
                              key={i}
                              className="flex items-start gap-2 text-xs text-zinc-700"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                              <span>{feat}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Quick Inline Preview Toggle */}
                      <div className="pt-2 flex items-center justify-between text-xs">
                        <button
                          type="button"
                          onClick={() =>
                            setExpandedPreviewSlug(
                              isExpanded ? null : tool.slug
                            )
                          }
                          className="font-bold text-zinc-800 hover:text-zinc-950 inline-flex items-center gap-1.5 transition-colors"
                        >
                          <span>
                            {isExpanded
                              ? 'Hide Interactive Console'
                              : 'Test / Preview Tool Directly on This Page'}
                          </span>
                          <ChevronDown
                            className={`w-3.5 h-3.5 transition-transform duration-200 ${
                              isExpanded ? 'rotate-180' : ''
                            }`}
                          />
                        </button>

                        <button
                          type="button"
                          onClick={() => onNavigateTool(tool.slug)}
                          className="font-bold text-zinc-950 hover:underline inline-flex items-center gap-1"
                        >
                          <span>Open Fullscreen in /our-tools/{tool.slug}</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Inline Interactive Sandbox if expanded */}
                    {isExpanded && (
                      <div className="border-t border-zinc-200 bg-zinc-100/60 p-6 sm:p-8">
                        <div className="mb-4 flex items-center justify-between">
                          <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                            Inline Console Sandbox
                          </span>
                          <button
                            type="button"
                            onClick={() => onNavigateTool(tool.slug)}
                            className="text-xs font-bold text-zinc-950 hover:underline flex items-center gap-1"
                          >
                            <span>Open in Full Dynamic Page</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {tool.slug === 'whatsapp-reader' && <WhatsAppReaderTool />}
                        {tool.slug === 'seo-audit' && (
                          <SeoAuditorTool
                            onEnquireUpgrade={(url) =>
                              openContactModal(
                                'AI-SEO & 0.3s Speed Rebuild',
                                `Requested speed and AI-SEO overhaul for audited domain: ${url}`
                              )
                            }
                          />
                        )}
                        {tool.slug === 'cost-calculator' && (
                          <CostEstimatorTool
                            onLockInEstimate={(details) =>
                              openContactModal(
                                'Project Cost & Speed Estimate',
                                details
                              )
                            }
                          />
                        )}
                        {tool.slug === 'schema-generator' && <SchemaBuilderTool />}
                      </div>
                    )}
                  </BlurKex>
                );
              })
            )}
          </div>
        </div>
      </section>

      {/* 4. Cultural PWA Spotlight: Digi Sagun */}
      <section className="py-20 bg-white border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <BlurKex direction="up" blurPx={14} className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-xs font-bold mb-3">
              <Smartphone className="w-3.5 h-3.5 text-amber-700" />
              <span>Progressive Web App Innovation</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-950 font-[Outfit]">
              Digi Sagun — Cultural Wedding Gift Ledger PWA
            </h2>
            <p className="text-xs sm:text-sm text-zinc-600 mt-2 leading-relaxed">
              In addition to developer tools, Kexora builds real-world consumer PWAs. Digi Sagun digitizes the traditional Indian wedding gift diary (Sagun Bahi) into an offline-first mobile app that works seamlessly in rural and urban settings with zero connectivity.
            </p>
          </BlurKex>

          <DigiSagunTool />
        </div>
      </section>

      {/* 5. Architectural Comparison: In-Browser Micro-Apps vs Heavy SaaS */}
      <section className="py-20 bg-zinc-50 border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-2xl">
            <div className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2">
              Engineering Architecture
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-950 font-[Outfit]">
              Why Kexora In-Browser Micro-Apps Beat Traditional SaaS
            </h2>
            <p className="text-xs sm:text-sm text-zinc-600 mt-2">
              We design our tools with strict zero-server bloat. Here is how our architecture protects client privacy and delivers instant performance.
            </p>
          </div>

          <div className="rounded-3xl border border-zinc-200 bg-white overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-zinc-100/90 text-zinc-900 font-bold uppercase tracking-wider text-[11px] border-b border-zinc-200">
                  <tr>
                    <th className="py-4 px-6">Architectural Dimension</th>
                    <th className="py-4 px-6 text-emerald-700 bg-emerald-50/50">
                      Kexora In-Browser Micro-Apps
                    </th>
                    <th className="py-4 px-6 text-zinc-500">
                      Traditional Heavy SaaS Platforms
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 text-zinc-700">
                  <tr>
                    <td className="py-4 px-6 font-bold text-zinc-900">
                      Confidential Data &amp; Chat Storage
                    </td>
                    <td className="py-4 px-6 font-medium text-emerald-800 bg-emerald-50/20">
                      0 Bytes Uploaded · Pure local browser memory
                    </td>
                    <td className="py-4 px-6 text-zinc-500">
                      Stored indefinitely on remote third-party databases
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 font-bold text-zinc-900">
                      Initial Page Load &amp; Execution
                    </td>
                    <td className="py-4 px-6 font-medium text-emerald-800 bg-emerald-50/20">
                      0.3s Instant · Tree-shaken Vite + React bundles
                    </td>
                    <td className="py-4 px-6 text-zinc-500">
                      4–8 seconds with heavy tracker and marketing scripts
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 font-bold text-zinc-900">
                      Pricing &amp; Account Mandates
                    </td>
                    <td className="py-4 px-6 font-medium text-emerald-800 bg-emerald-50/20">
                      100% Free · No signups, no credit cards, no login walls
                    </td>
                    <td className="py-4 px-6 text-zinc-500">
                      $29 to $99/mo monthly subscription paywalls
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 font-bold text-zinc-900">
                      Session Lifecycle &amp; Telemetry
                    </td>
                    <td className="py-4 px-6 font-medium text-emerald-800 bg-emerald-50/20">
                      Flushed instantly from RAM on tab close
                    </td>
                    <td className="py-4 px-6 text-zinc-500">
                      Persistent session cookies and behavioral fingerprinting
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Custom Internal Utility Proposal Callout */}
      <section className="py-16 sm:py-20 bg-zinc-950 text-white border-b border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-12 rounded-3xl bg-zinc-900 border border-zinc-800 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="space-y-3 max-w-2xl">
              <div className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                Custom Engineering Studio
              </div>
              <h3 className="text-2xl sm:text-4xl font-extrabold text-white font-[Outfit] tracking-tight">
                Need a Custom In-Browser Tool or PWA for Your Brand?
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                Whether you need a confidential contract parser, mortgage calculator, inventory scanner, or custom client portal—Rajan Singh &amp; Aditya Singh build custom code web apps that load in 0.3 seconds.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() =>
                  openContactModal(
                    'Custom Web App / Utility Development',
                    'Requesting custom in-browser tool or PWA engineering.'
                  )
                }
                className="px-6 py-3.5 text-xs sm:text-sm font-bold text-zinc-950 bg-white hover:bg-zinc-200 rounded-full transition-all inline-flex items-center gap-2 shadow-xs"
              >
                <span>Request Custom Tool Proposal</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 7. SEO Hub Section */}
      <SeoHubSection />
    </div>
  );
};

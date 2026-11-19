import React from 'react';
import { ActiveTab, ToolTab } from '../../types';
import { KEXORA_THEME, BlurKex } from '../universal';
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Search,
  MessageSquare,
  Calculator,
  FileCode2,
} from 'lucide-react';

interface HomeToolsDockSectionProps {
  onNavigatePage: (page: ActiveTab) => void;
  openToolsWithTab: (tool: ToolTab) => void;
}

const HOME_TOOLS_CARDS: {
  slug: ToolTab;
  index: string;
  title: string;
  category: string;
  metric: string;
  desc: string;
  highlights: string[];
  icon: 'whatsapp' | 'seo' | 'calculator' | 'schema';
}[] = [
  {
    slug: 'whatsapp-reader',
    index: '01',
    title: 'WhatsApp Chat Archive Reader',
    category: '100% Offline Browser Utility',
    metric: 'Zero Server Upload · Instant Parse',
    desc: 'Drop any exported WhatsApp .txt file to inspect conversations in a clean chat bubble timeline with participant filters and keyword search.',
    highlights: ['Multi-speaker filter', 'Date & keyword jump', '1-click demo chat'],
    icon: 'whatsapp',
  },
  {
    slug: 'seo-audit',
    index: '02',
    title: 'Live AI-SEO & Sitelink Auditor',
    category: 'Search & Core Web Vitals Lab',
    metric: 'Checks 18+ Google & AI Signals',
    desc: 'Evaluate any domain for Google SERP sitelink readiness, Schema.org JSON-LD graphs, OpenGraph tags, and mobile speed bottlenecks.',
    highlights: ['AI Overview readiness', 'Sitelink eligibility score', 'Actionable fix roadmap'],
    icon: 'seo',
  },
  {
    slug: 'cost-calculator',
    index: '03',
    title: 'Interactive Project Cost Estimator',
    category: 'Transparent Budget Builder',
    metric: 'Instant INR / USD Breakdown',
    desc: 'Select your project type, page count, e-commerce or app modules, and delivery speed to calculate an instant fixed-price studio quote.',
    highlights: ['30% below market rate', 'Real-time timeline calc', 'Direct quote export'],
    icon: 'calculator',
  },
  {
    slug: 'schema-generator',
    index: '04',
    title: 'JSON-LD Schema Graph Builder',
    category: 'AI-SEO Code Generator',
    metric: 'Copy-Paste Production JSON-LD',
    desc: 'Generate validated Organization, WebSite, ProfessionalService, and FAQPage structured data scripts so Google & AI engines index your brand.',
    highlights: ['Rich sitelink triggers', 'Local GMB coordinates', 'Zero syntax errors'],
    icon: 'schema',
  },
];

const renderToolIcon = (type: 'whatsapp' | 'seo' | 'calculator' | 'schema') => {
  switch (type) {
    case 'whatsapp':
      return <MessageSquare className="w-5 h-5" />;
    case 'seo':
      return <Search className="w-5 h-5" />;
    case 'calculator':
      return <Calculator className="w-5 h-5" />;
    case 'schema':
      return <FileCode2 className="w-5 h-5" />;
  }
};

export const HomeToolsDockSection: React.FC<HomeToolsDockSectionProps> = ({
  onNavigatePage,
  openToolsWithTab,
}) => {
  return (
    <section
      id="home-tools-lab"
      aria-label="Kexora Free Browser Utilities and Product Lab"
      className="py-20 sm:py-28 bg-zinc-950 text-white border-b border-zinc-900"
    >
      <div className={KEXORA_THEME.classes.container}>
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14">
          <BlurKex direction="up" blurPx={14} className="max-w-2xl space-y-3">
            <div className="text-xs font-extrabold uppercase tracking-[0.22em] text-zinc-400">
              04 · Kexora Product Lab · 100% Free Client-Side Tools
            </div>
            <h2
              className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white font-[Outfit] leading-[1.08]"
              style={{ textWrap: 'balance' }}
            >
              Test Our Engineering With Free Browser Tools
            </h2>
            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
              Every utility below runs 100% inside your browser with zero server uploads. Click any card to open its dedicated workspace URL.
            </p>
          </BlurKex>

          <BlurKex direction="left" delay={0.1} blurPx={12} className="shrink-0">
            <button
              type="button"
              onClick={() => onNavigatePage('tools')}
              className={KEXORA_THEME.classes.btnPrimaryWhite}
            >
              <span>Open All Tools Directory</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </BlurKex>
        </div>

        {/* 4 Interactive Dark Architectural Tool Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {HOME_TOOLS_CARDS.map((tool, idx) => (
            <BlurKex
              key={tool.slug}
              direction="up"
              staggerIndex={idx}
              blurPx={15}
              className="group rounded-3xl bg-zinc-900/90 hover:bg-zinc-900 border border-zinc-800 hover:border-zinc-500 p-7 sm:p-9 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 shadow-xl"
            >
              <div className="space-y-5">
                <div className="flex items-center justify-between gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white text-zinc-950 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                    {renderToolIcon(tool.icon)}
                  </div>
                  <div className="text-right font-mono">
                    <div className="text-xs font-bold text-white">
                      TOOL {tool.index} · /our-tools/{tool.slug}
                    </div>
                    <div className="text-[11px] text-zinc-400">{tool.metric}</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                    {tool.category}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-white font-[Outfit]">
                    {tool.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                    {tool.desc}
                  </p>
                </div>

                <div className="pt-2 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-zinc-300 font-medium">
                  {tool.highlights.map((h, i) => (
                    <span key={h} className="inline-flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-white" />
                      <span>{h}</span>
                      {i < tool.highlights.length - 1 && (
                        <span className="text-zinc-600 ml-2" aria-hidden="true">
                          ·
                        </span>
                      )}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-6 mt-7 border-t border-zinc-800 flex items-center justify-between gap-4">
                <span className="text-xs font-mono text-zinc-400">
                  Instant Browser Execution
                </span>
                <button
                  type="button"
                  onClick={() => openToolsWithTab(tool.slug)}
                  className="px-6 py-3 text-xs sm:text-sm font-extrabold text-zinc-950 bg-white hover:bg-zinc-200 rounded-full transition-colors inline-flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <span>Launch Tool</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </BlurKex>
          ))}
        </div>
      </div>
    </section>
  );
};

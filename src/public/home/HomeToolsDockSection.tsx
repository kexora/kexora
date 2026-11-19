import React from 'react';
import { motion } from 'motion/react';
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
    category: 'Offline Browser Utility',
    metric: 'Zero Server Upload',
    desc: 'Drop any exported WhatsApp .txt file to inspect conversations in a clean chat bubble timeline with participant filters and keyword search.',
    highlights: ['Multi-speaker filter', 'Date & keyword jump', '1-click demo chat'],
    icon: 'whatsapp',
  },
  {
    slug: 'seo-audit',
    index: '02',
    title: 'Live AI-SEO & Sitelink Auditor',
    category: 'Search & Core Web Vitals',
    metric: '18+ Google & AI Signals',
    desc: 'Evaluate any domain for Google SERP sitelink readiness, Schema.org JSON-LD graphs, OpenGraph tags, and mobile speed bottlenecks.',
    highlights: ['AI Overview readiness', 'Sitelink score', 'Actionable roadmap'],
    icon: 'seo',
  },
  {
    slug: 'cost-calculator',
    index: '03',
    title: 'Interactive Project Cost Estimator',
    category: 'Transparent Budget Builder',
    metric: 'Instant INR / USD Quote',
    desc: 'Select your project type, page count, e-commerce or app modules, and delivery speed to calculate an instant fixed-price studio quote.',
    highlights: ['30% below market', 'Real-time timeline', 'Direct quote export'],
    icon: 'calculator',
  },
  {
    slug: 'schema-generator',
    index: '04',
    title: 'JSON-LD Schema Graph Builder',
    category: 'AI-SEO Code Generator',
    metric: 'Production JSON-LD',
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
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 sm:gap-8 mb-12 sm:mb-14">
          <BlurKex direction="up" blurPx={10} className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/15 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-zinc-200">
              <span>04</span>
              <span aria-hidden="true" className="text-zinc-500">·</span>
              <span>Kexora Product Lab · 100% Free Client-Side Tools</span>
            </div>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white font-[Outfit] leading-[1.08]"
              style={{ textWrap: 'balance' }}
            >
              Test Our Engineering With Free Browser Tools
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
              Every utility runs 100% inside your browser with zero server uploads. Pick any tool below to launch its dedicated interactive workspace.
            </p>
          </BlurKex>

          <BlurKex direction="left" delay={0.06} blurPx={10} className="shrink-0">
            <motion.button
              type="button"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onNavigatePage('tools')}
              className="px-6 sm:px-7 py-3.5 text-sm sm:text-base font-extrabold text-zinc-950 bg-white hover:bg-zinc-200 rounded-full transition-colors inline-flex items-center gap-2.5 whitespace-nowrap shrink-0 cursor-pointer shadow-[0_12px_30px_-10px_rgba(255,255,255,0.28)]"
            >
              <span>Open All Tools Directory</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </BlurKex>
        </div>

        {/* 2x2 Pill-Forward Dark Studio Tool Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {HOME_TOOLS_CARDS.map((tool, idx) => (
            <BlurKex
              key={tool.slug}
              direction="up"
              staggerIndex={idx}
              blurPx={10}
              className="h-full"
            >
              <div className="group h-full rounded-[2rem] bg-zinc-900/75 hover:bg-zinc-900 border border-zinc-800/90 hover:border-zinc-600 p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_-24px_rgba(0,0,0,0.85)]">
                <div className="space-y-5">
                  {/* Top Row: Circular Icon Medallion + Metric Pill */}
                  <div className="flex items-center justify-between gap-3 flex-wrap">
                    <div className="w-12 h-12 rounded-full bg-white text-zinc-950 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform shrink-0">
                      {renderToolIcon(tool.icon)}
                    </div>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-zinc-950/90 border border-zinc-800 px-3.5 py-1.5 text-xs font-bold text-zinc-200 tabular-nums whitespace-nowrap">
                      <span className="font-mono text-zinc-400">{tool.index}</span>
                      <span aria-hidden="true" className="text-zinc-600">·</span>
                      <span>{tool.metric}</span>
                    </span>
                  </div>

                  {/* Tool Title & Description */}
                  <div className="space-y-2">
                    <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-zinc-400">
                      {tool.category}
                    </div>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-white font-[Outfit] leading-snug">
                      {tool.title}
                    </h3>
                    <p className="text-sm text-zinc-400 leading-relaxed">
                      {tool.desc}
                    </p>
                  </div>

                  {/* Pill Feature Chips */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    {tool.highlights.map((h) => (
                      <span
                        key={h}
                        className="inline-flex items-center gap-1.5 rounded-full bg-zinc-950/75 border border-zinc-800 px-3 py-1 text-xs font-semibold text-zinc-300"
                      >
                        <Check className="w-3 h-3 text-white shrink-0" />
                        <span>{h}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Hairline Action Footer */}
                <div className="pt-5 mt-6 border-t border-zinc-800/90 flex items-center justify-between gap-4">
                  <span className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-400">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" aria-hidden="true" />
                    <span>Instant Browser Run</span>
                  </span>
                  <motion.button
                    type="button"
                    whileHover={{ y: -1 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => openToolsWithTab(tool.slug)}
                    className="px-5 py-2.5 text-xs sm:text-sm font-extrabold text-zinc-950 bg-white hover:bg-zinc-200 rounded-full transition-colors inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <span>Launch Tool</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
            </BlurKex>
          ))}
        </div>
      </div>
    </section>
  );
};

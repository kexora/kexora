import React, { useState } from 'react';
import { ActiveTab, CaseStudy, NewsArticle, ToolTab } from '../../types';
import { Hero } from '../component/Hero';
import { KEXORA_THEME } from '../component/theme';
import { ProtectedImage, KEXORA_MEDIA_VAULT } from '../component/ProtectedImage';
import { BlurKex } from '../../effect';
import {
  SERVICES_DATA,
  KEXORA_SERVICE_PILLARS,
  CASE_STUDIES,
  PRICING_PLANS,
  INDIVIDUAL_SERVICE_PRICING,
  KEXORA_COMPANY_INFO,
  NEWS_ARTICLES,
  CLIENT_TESTIMONIALS,
  FREQUENTLY_ASKED_QUESTIONS,
} from '../../data/agencyData';
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Code2,
  Zap,
  Search,
  Palette,
  ShieldCheck,
  ShoppingBag,
  MessageSquare,
  Calculator,
  FileCode2,
  MapPin,
  ChevronDown,
  X,
  Layers,
  Terminal,
  Compass,
  Award,
} from 'lucide-react';

interface HomePageProps {
  openContactModal: (serviceName?: string, details?: string) => void;
  onNavigatePage: (page: ActiveTab) => void;
  openToolsWithTab: (tool: ToolTab) => void;
}

const HOME_NEED_CATEGORIES = [
  {
    id: 'web-dev',
    label: 'Custom Website & E-Commerce',
    shortTag: '0.3s React / Next.js / WordPress / Multi-Vendor',
    summary: 'High-speed custom business sites, D2C storefronts, and multi-vendor marketplaces.',
  },
  {
    id: 'app-game',
    label: 'Android / iOS Apps & Games',
    shortTag: '60fps Native, Flutter, PWA & 2D/3D Games',
    summary: 'Mobile applications, installable PWAs like Digi Sagun, and interactive mobile/web games.',
  },
  {
    id: 'seo-marketing',
    label: 'Google SEO & AI-SEO Ranking',
    shortTag: 'Schema.org Sitelinks · GMB Local Pack · Ads',
    summary: 'Rank on Google Search, ChatGPT, Gemini, and Perplexity with structured JSON-LD graphs.',
  },
  {
    id: 'creative-business',
    label: 'Logo, Video & GST / ISO Setup',
    shortTag: 'Brand Identity · Explainer Video · Legal Filing',
    summary: 'Complete brand design, motion graphics, and GST, Trademark, ISO & Company registration.',
  },
] as const;

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

export const HomePage: React.FC<HomePageProps> = ({
  openContactModal,
  onNavigatePage,
  openToolsWithTab,
}) => {
  const [activePillarIdx, setActivePillarIdx] = useState<number>(0);
  const [activeCaseIndex, setActiveCaseIndex] = useState<number>(0);
  const [selectedCaseModal, setSelectedCaseModal] = useState<CaseStudy | null>(null);
  const [selectedNeedId, setSelectedNeedId] = useState<string>('web-dev');
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const activeCase = CASE_STUDIES[activeCaseIndex] || CASE_STUDIES[0];
  const needServices = INDIVIDUAL_SERVICE_PRICING.filter(
    (item) => item.pillarId === selectedNeedId
  ).slice(0, 4);

  const renderServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Zap':
        return <Zap className="w-5 h-5" />;
      case 'Code2':
        return <Code2 className="w-5 h-5" />;
      case 'Search':
        return <Search className="w-5 h-5" />;
      case 'Palette':
        return <Palette className="w-5 h-5" />;
      case 'ShoppingBag':
        return <ShoppingBag className="w-5 h-5" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5" />;
      default:
        return <Code2 className="w-5 h-5" />;
    }
  };

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

  return (
    <div className="bg-white text-zinc-950 overflow-x-hidden">
      {/* =====================================================================
          HERO SECTION (Preserved Visual Identity + BlurKex Slow-Motion Reveal)
         ===================================================================== */}
      <Hero
        openContactModal={() => openContactModal()}
        openTools={(t) => openToolsWithTab(t)}
        onNavigatePage={onNavigatePage}
      />

      {/* =====================================================================
          SECTION 01: BESPOKE HOME ASYMMETRIC SERVICE ARCHITECTURE & BENTO DECK
         ===================================================================== */}
      <section
        id="home-services-showcase"
        aria-label="Kexora Studio Core Capabilities"
        className="py-20 sm:py-28 bg-white border-b border-zinc-200"
      >
        <div className={KEXORA_THEME.classes.container}>
          {/* Section Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
            <BlurKex direction="up" blurPx={14} className="max-w-2xl space-y-3">
              <div className="text-xs font-extrabold uppercase tracking-[0.22em] text-zinc-500">
                01 · Full-Lifecycle Digital Engineering Studio
              </div>
              <h2
                className="text-3xl sm:text-5xl font-extrabold tracking-tight text-zinc-950 font-[Outfit] leading-[1.08]"
                style={{ textWrap: 'balance' }}
              >
                Four Specialized Studios Under One Roof
              </h2>
              <p className="text-sm sm:text-base text-zinc-600 leading-relaxed">
                Unlike generic template agencies, Kexora pairs custom 0.3s web architecture with native mobile apps, 2D/3D game engines, AI-SEO search dominance, and legal company compliance.
              </p>
            </BlurKex>

            <BlurKex direction="left" delay={0.12} blurPx={12} className="shrink-0">
              <button
                type="button"
                onClick={() => onNavigatePage('services')}
                className="px-7 py-4 text-sm sm:text-base font-extrabold text-zinc-950 bg-zinc-100 hover:bg-zinc-950 hover:text-white border border-zinc-300 rounded-full transition-all duration-300 inline-flex items-center gap-2.5 whitespace-nowrap shrink-0 cursor-pointer"
              >
                <span>Explore Full Service Catalog</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </BlurKex>
          </div>

          {/* Asymmetric Top Feature Bento: Left Dark Interactive Pillar Switcher (5 cols) + Right Featured Bento Grid (7 cols) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 mb-10">
            {/* Left Dark Architectural Pillar Explorer Card */}
            <BlurKex
              direction="up"
              staggerIndex={0}
              blurPx={16}
              className="lg:col-span-5 rounded-3xl bg-zinc-950 text-white p-7 sm:p-9 flex flex-col justify-between shadow-2xl border border-zinc-900"
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between gap-3 pb-5 border-b border-zinc-800">
                  <span className="text-xs font-mono uppercase tracking-[0.2em] text-zinc-400">
                    Interactive Pillar Matrix
                  </span>
                  <span className="text-xs font-mono font-bold text-zinc-300 tabular-nums">
                    24 Specialized Services
                  </span>
                </div>

                {/* Pillar Selector Buttons */}
                <div className="grid grid-cols-1 gap-2.5">
                  {KEXORA_SERVICE_PILLARS.map((pillar, idx) => {
                    const isSelected = activePillarIdx === idx;
                    return (
                      <button
                        key={pillar.category}
                        type="button"
                        onClick={() => setActivePillarIdx(idx)}
                        className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 flex items-center justify-between gap-3 cursor-pointer ${
                          isSelected
                            ? 'bg-white text-zinc-950 border-white shadow-lg'
                            : 'bg-zinc-900/80 text-zinc-300 border-zinc-800 hover:border-zinc-700 hover:text-white'
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <span
                            className={`text-xs font-mono font-extrabold tabular-nums ${
                              isSelected ? 'text-zinc-950' : 'text-zinc-500'
                            }`}
                          >
                            0{idx + 1}
                          </span>
                          <span className="text-sm sm:text-base font-extrabold font-[Outfit] truncate">
                            {pillar.category}
                          </span>
                        </div>
                        <ArrowUpRight
                          className={`w-4 h-4 shrink-0 transition-transform duration-300 ${
                            isSelected ? 'text-zinc-950 translate-x-0.5 -translate-y-0.5' : 'text-zinc-500'
                          }`}
                        />
                      </button>
                    );
                  })}
                </div>

                {/* Active Pillar Deliverables List */}
                <div className="p-5 rounded-2xl bg-zinc-900/90 border border-zinc-800 space-y-3">
                  <div className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                    Included in {KEXORA_SERVICE_PILLARS[activePillarIdx].category}:
                  </div>
                  <ul className="grid grid-cols-1 gap-2 text-xs sm:text-sm text-zinc-200">
                    {KEXORA_SERVICE_PILLARS[activePillarIdx].items.map((srv) => (
                      <li key={srv}>
                        <button
                          type="button"
                          onClick={() => openContactModal(srv)}
                          className="w-full text-left hover:text-white flex items-center justify-between gap-2 py-1 group cursor-pointer"
                        >
                          <span className="flex items-center gap-2">
                            <Check className="w-3.5 h-3.5 text-zinc-400 group-hover:text-white shrink-0" />
                            <span className="group-hover:underline underline-offset-4">
                              {srv}
                            </span>
                          </span>
                          <span className="text-[11px] font-mono text-zinc-500 group-hover:text-zinc-200 shrink-0">
                            Quote →
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-zinc-800 flex items-center justify-between gap-4">
                <div className="text-xs text-zinc-400">
                  Direct consultation with <strong className="text-white">Rajan Singh</strong>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    openContactModal(KEXORA_SERVICE_PILLARS[activePillarIdx].category)
                  }
                  className="px-5 py-3 text-xs sm:text-sm font-extrabold text-zinc-950 bg-white hover:bg-zinc-200 rounded-full transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  Request Custom Scope
                </button>
              </div>
            </BlurKex>

            {/* Right 6 Modern Architectural Capability Cards (2x3 Grid inside 7 cols) */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
              {SERVICES_DATA.map((service, idx) => (
                <BlurKex
                  key={service.id}
                  direction="up"
                  staggerIndex={idx + 1}
                  blurPx={14}
                  className="group rounded-3xl bg-[#F8F8FA] hover:bg-white border border-zinc-200/90 hover:border-zinc-950 p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.1)]"
                >
                  <div>
                    <div className="flex items-center justify-between gap-3 mb-5">
                      <div className="w-11 h-11 rounded-2xl bg-zinc-950 text-white flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
                        {renderServiceIcon(service.iconName)}
                      </div>
                      <span className="text-[11px] font-mono font-bold text-zinc-500 tabular-nums">
                        {service.index} · {service.metrics.split('·')[0].trim()}
                      </span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-extrabold text-zinc-950 font-[Outfit] leading-snug mb-2">
                      {service.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed mb-5">
                      {service.shortDesc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-zinc-200/80 flex items-center justify-between gap-2">
                    <span className="text-[11px] font-semibold text-zinc-500 truncate">
                      {service.category}
                    </span>
                    <button
                      type="button"
                      onClick={() => openContactModal(service.title)}
                      className="px-4 py-2 text-xs sm:text-sm font-extrabold text-zinc-950 bg-white group-hover:bg-zinc-950 group-hover:text-white border border-zinc-300 group-hover:border-zinc-950 rounded-full inline-flex items-center gap-1.5 transition-all whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      <span>Book</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </BlurKex>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 02: FLAGSHIP CASE STUDY SPOTLIGHT DECK (HOME EXCLUSIVE UI)
         ===================================================================== */}
      <section
        id="home-case-studies"
        aria-label="Featured Client Engineering Results"
        className="py-20 sm:py-28 bg-[#F8F8FA] border-b border-zinc-200"
      >
        <div className={KEXORA_THEME.classes.container}>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14">
            <BlurKex direction="up" blurPx={14} className="max-w-2xl space-y-3">
              <div className="text-xs font-extrabold uppercase tracking-[0.22em] text-zinc-500">
                02 · Verified Production Benchmarks
              </div>
              <h2
                className="text-3xl sm:text-5xl font-extrabold tracking-tight text-zinc-950 font-[Outfit] leading-[1.08]"
                style={{ textWrap: 'balance' }}
              >
                Real Code. Sub-Second Speed. Measurable ROI.
              </h2>
              <p className="text-sm sm:text-base text-zinc-600 leading-relaxed">
                Inspect how our custom web platforms, Digi Sagun mobile ecosystem, and multi-vendor stores transform slow legacy setups into market leaders.
              </p>
            </BlurKex>

            {/* Case Study Switcher Pills */}
            <BlurKex direction="left" delay={0.1} blurPx={12}>
              <div className="inline-flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-white border border-zinc-200 shadow-sm">
                {CASE_STUDIES.map((cs, idx) => (
                  <button
                    key={cs.id}
                    type="button"
                    onClick={() => setActiveCaseIndex(idx)}
                    className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                      activeCaseIndex === idx
                        ? 'bg-zinc-950 text-white shadow-sm'
                        : 'text-zinc-600 hover:text-zinc-950'
                    }`}
                  >
                    0{idx + 1}. {cs.client.split('&')[0].trim()}
                  </button>
                ))}
              </div>
            </BlurKex>
          </div>

          {/* Interactive Split Spotlight Card */}
          <BlurKex
            key={activeCase.id}
            direction="up"
            blurPx={16}
            className="rounded-3xl bg-white border border-zinc-200/90 shadow-[0_24px_60px_-15px_rgba(0,0,0,0.08)] overflow-hidden grid grid-cols-1 lg:grid-cols-12"
          >
            {/* Left Visual Frame (5 cols) */}
            <div className="lg:col-span-5 relative min-h-[290px] sm:min-h-[360px] bg-zinc-950 overflow-hidden flex flex-col justify-between p-7 sm:p-9 text-white">
              <ProtectedImage
                src={activeCase.image}
                alt={activeCase.title}
                className="absolute inset-0 w-full h-full object-cover opacity-55 scale-105 transition-transform duration-700"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/30"
                aria-hidden="true"
              />

              <div className="relative z-10 flex items-center justify-between gap-2 text-xs font-mono text-zinc-300">
                <span>{activeCase.categoryLabel}</span>
                <span>CASE 0{activeCaseIndex + 1} / 03</span>
              </div>

              <div className="relative z-10 space-y-3 pt-12">
                <div className="text-4xl sm:text-5xl font-extrabold text-white font-mono tabular-nums tracking-tight">
                  {activeCase.metric}
                </div>
                <div className="text-xs sm:text-sm font-bold uppercase tracking-wider text-zinc-300">
                  {activeCase.metricLabel} · {activeCase.client}
                </div>
                <div className="pt-3 flex flex-wrap gap-2 text-[11px] font-mono text-zinc-300">
                  {activeCase.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-lg bg-white/10 backdrop-blur-sm border border-white/15"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Architectural Breakdown (7 cols) */}
            <div className="lg:col-span-7 p-7 sm:p-10 lg:p-12 flex flex-col justify-between space-y-8">
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                    {activeCase.client}
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-zinc-950 font-[Outfit] leading-tight">
                    {activeCase.title}
                  </h3>
                  <p className="text-sm sm:text-base text-zinc-600 leading-relaxed">
                    {activeCase.summary}
                  </p>
                </div>

                {/* Before / After Problem vs Solution Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-5 rounded-2xl bg-[#F8F8FA] border border-zinc-200/90 space-y-1.5">
                    <div className="text-xs font-extrabold uppercase tracking-wider text-zinc-500">
                      Before Kexora (Challenge)
                    </div>
                    <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed">
                      {activeCase.challenge}
                    </p>
                  </div>
                  <div className="p-5 rounded-2xl bg-zinc-950 text-white space-y-1.5">
                    <div className="text-xs font-extrabold uppercase tracking-wider text-zinc-400">
                      Kexora Engineering Solution
                    </div>
                    <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed">
                      {activeCase.solution}
                    </p>
                  </div>
                </div>

                {/* Verified Results List */}
                <div className="space-y-2.5">
                  <div className="text-xs font-extrabold uppercase tracking-wider text-zinc-500">
                    Verified Production Impact
                  </div>
                  <div className="grid grid-cols-1 gap-2">
                    {activeCase.results.map((res, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-2.5 text-xs sm:text-sm font-semibold text-zinc-800"
                      >
                        <Check className="w-4 h-4 text-zinc-950 shrink-0 mt-0.5" />
                        <span>{res}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-zinc-200 flex flex-wrap items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() => setSelectedCaseModal(activeCase)}
                  className="px-6 py-3.5 text-xs sm:text-sm font-extrabold text-zinc-950 bg-zinc-100 hover:bg-zinc-200 rounded-full transition-colors inline-flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <span>Inspect Full Case Study</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => openContactModal(`Similar to: ${activeCase.title}`)}
                  className={KEXORA_THEME.classes.btnPrimaryBlack}
                >
                  <span>Build a Similar Project</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </BlurKex>

          {/* Secondary Quick-Switch Row of All 3 Case Studies */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-7">
            {CASE_STUDIES.map((study, idx) => {
              const isCurrent = idx === activeCaseIndex;
              return (
                <BlurKex
                  key={study.id}
                  direction="up"
                  staggerIndex={idx}
                  blurPx={12}
                  className={`p-6 rounded-2xl border transition-all duration-300 flex flex-col justify-between cursor-pointer ${
                    isCurrent
                      ? 'bg-zinc-950 text-white border-zinc-950 shadow-lg'
                      : 'bg-white text-zinc-950 border-zinc-200 hover:border-zinc-950'
                  }`}
                  onClick={() => setActiveCaseIndex(idx)}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className={isCurrent ? 'text-zinc-400' : 'text-zinc-500'}>
                        0{idx + 1} · {study.categoryLabel}
                      </span>
                      <span className="font-extrabold tabular-nums">{study.metric}</span>
                    </div>
                    <h4 className="text-base font-extrabold font-[Outfit] leading-snug">
                      {study.title}
                    </h4>
                  </div>
                  <div className="pt-4 mt-4 border-t border-current/10 flex items-center justify-between text-xs font-bold">
                    <span>{isCurrent ? 'Currently Viewing Above' : 'Click to Preview'}</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </BlurKex>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 03: HOME "ZAROORAT KE HISAAB SE" PRICING MATRIX & 3-TIER DECK
         ===================================================================== */}
      <section
        id="home-pricing-preview"
        aria-label="Kexora Transparent Pricing Preview"
        className="py-20 sm:py-28 bg-white border-b border-zinc-200"
      >
        <div className={KEXORA_THEME.classes.container}>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14">
            <BlurKex direction="up" blurPx={14} className="max-w-2xl space-y-3">
              <div className="text-xs font-extrabold uppercase tracking-[0.22em] text-zinc-500">
                03 · Transparent Studio Pricing (30% Below Market Rate)
              </div>
              <h2
                className="text-3xl sm:text-5xl font-extrabold tracking-tight text-zinc-950 font-[Outfit] leading-[1.08]"
                style={{ textWrap: 'balance' }}
              >
                Pricing Built Around Your Exact Need
              </h2>
              <p className="text-sm sm:text-base text-zinc-600 leading-relaxed">
                Choose a single standalone service according to your immediate business requirement or launch with our all-in-one monthly studio plans.
              </p>
            </BlurKex>

            <BlurKex direction="left" delay={0.1} blurPx={12} className="shrink-0">
              <button
                type="button"
                onClick={() => onNavigatePage('pricing')}
                className={KEXORA_THEME.classes.btnPrimaryBlack}
              >
                <span>Open Full 24-Service Price List (INR / USD)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </BlurKex>
          </div>

          {/* Need-Based Interactive Service Rate Finder (Distinct Home UI Card) */}
          <BlurKex
            direction="up"
            blurPx={16}
            className="rounded-3xl bg-[#F8F8FA] border border-zinc-200/90 p-6 sm:p-10 mb-14"
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 mb-8 border-b border-zinc-200">
              <div>
                <div className="text-xs font-extrabold uppercase tracking-wider text-zinc-500">
                  Step 1 · Select Your Requirement (Zaroorat Chunein)
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-zinc-950 font-[Outfit] mt-1">
                  Instant Standalone Service Rates
                </h3>
              </div>

              {/* 4 Need Category Tabs */}
              <div className="flex flex-wrap gap-2">
                {HOME_NEED_CATEGORIES.map((cat) => {
                  const active = selectedNeedId === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setSelectedNeedId(cat.id)}
                      className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                        active
                          ? 'bg-zinc-950 text-white shadow-sm'
                          : 'bg-white text-zinc-700 border border-zinc-200 hover:border-zinc-950'
                      }`}
                    >
                      {cat.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 4 Matching Service Cards for the Selected Need */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {needServices.map((item, idx) => {
                const savedInr = item.marketPriceInr - item.kexoraPriceInr;
                return (
                  <BlurKex
                    key={item.id}
                    direction="up"
                    staggerIndex={idx}
                    blurPx={12}
                    className="rounded-2xl bg-white border border-zinc-200/90 hover:border-zinc-950 p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between gap-2 text-[11px] font-mono text-zinc-500">
                        <span>{item.billingLabel}</span>
                        <span className="font-bold text-zinc-950">{item.turnaround}</span>
                      </div>

                      <h4 className="text-base sm:text-lg font-extrabold text-zinc-950 font-[Outfit] leading-snug">
                        {item.title}
                      </h4>

                      {/* Crisp Sans-Serif Currency & Numerals */}
                      <div className="p-4 rounded-xl bg-[#F8F8FA] border border-zinc-200/70 space-y-1">
                        <div className="flex items-center justify-between text-[11px] text-zinc-500">
                          <span className="line-through price-num">
                            Market:{' '}
                            <span className="currency-symbol">₹</span>
                            {item.marketPriceInr.toLocaleString('en-IN')}
                          </span>
                          <span className="font-extrabold text-zinc-950 price-num">
                            Save <span className="currency-symbol">₹</span>
                            {savedInr.toLocaleString('en-IN')}
                          </span>
                        </div>
                        <div className="text-2xl font-black text-zinc-950 price-num tracking-tight">
                          <span className="currency-symbol">₹</span>
                          {item.kexoraPriceInr.toLocaleString('en-IN')}
                          {item.billingCycle === 'monthly' && (
                            <span className="text-xs font-semibold text-zinc-500"> /mo</span>
                          )}
                        </div>
                      </div>

                      <p className="text-xs text-zinc-600 leading-relaxed">
                        {item.shortDesc}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        openContactModal(
                          item.title,
                          `Selected Service: ${item.title} (₹${item.kexoraPriceInr.toLocaleString('en-IN')} · ${item.billingLabel})`
                        )
                      }
                      className="mt-5 w-full py-3 px-4 rounded-xl bg-zinc-950 hover:bg-zinc-800 text-white text-xs sm:text-sm font-extrabold transition-colors flex items-center justify-center gap-1.5 whitespace-nowrap cursor-pointer"
                    >
                      <span>Book This Service</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </BlurKex>
                );
              })}
            </div>
          </BlurKex>

          {/* Compact 3-Tier Flagship Studio Plans Deck */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-7">
            {PRICING_PLANS.map((plan, idx) => {
              const isDark = Boolean(plan.popular);
              return (
                <BlurKex
                  key={plan.id}
                  direction="up"
                  staggerIndex={idx}
                  blurPx={15}
                  className={`rounded-3xl p-7 sm:p-9 flex flex-col justify-between transition-all duration-300 ${
                    isDark
                      ? 'bg-zinc-950 text-white border-2 border-zinc-950 shadow-2xl'
                      : 'bg-white text-zinc-950 border border-zinc-200 hover:border-zinc-950 shadow-sm'
                  }`}
                >
                  <div className="space-y-5">
                    <div className="flex items-center justify-between gap-2 text-xs font-mono">
                      <span className={isDark ? 'text-zinc-300 font-bold' : 'text-zinc-500 font-bold'}>
                        {plan.deliveryTimeline}
                      </span>
                      {isDark && (
                        <span className="text-xs font-extrabold uppercase tracking-wider text-white underline underline-offset-4">
                          Most Popular Studio Tier
                        </span>
                      )}
                    </div>

                    <div>
                      <h3
                        className={`text-2xl font-extrabold font-[Outfit] ${
                          isDark ? 'text-white' : 'text-zinc-950'
                        }`}
                      >
                        {plan.name}
                      </h3>
                      <p
                        className={`text-xs sm:text-sm mt-1.5 leading-relaxed ${
                          isDark ? 'text-zinc-300' : 'text-zinc-600'
                        }`}
                      >
                        {plan.tagline}
                      </p>
                    </div>

                    {/* Price Block with Crisp Currency Font */}
                    <div
                      className={`p-5 rounded-2xl border ${
                        isDark
                          ? 'bg-zinc-900 border-zinc-800'
                          : 'bg-[#F8F8FA] border-zinc-200/80'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="line-through text-zinc-400 price-num">
                          Market: <span className="currency-symbol">₹</span>
                          {plan.marketMonthlyPriceInr.toLocaleString('en-IN')}/mo
                        </span>
                        <span
                          className={`font-extrabold price-num ${
                            isDark ? 'text-white' : 'text-zinc-950'
                          }`}
                        >
                          Save 30%
                        </span>
                      </div>
                      <div className="flex items-baseline gap-1.5">
                        <span
                          className={`text-3xl sm:text-4xl font-black price-num tracking-tight ${
                            isDark ? 'text-white' : 'text-zinc-950'
                          }`}
                        >
                          <span className="currency-symbol">₹</span>
                          {plan.monthlyPriceInr.toLocaleString('en-IN')}
                        </span>
                        <span className="text-xs font-semibold text-zinc-400">
                          / month
                        </span>
                      </div>
                      <div
                        className={`mt-2 pt-2 border-t text-xs price-num ${
                          isDark
                            ? 'border-zinc-800 text-zinc-300'
                            : 'border-zinc-200 text-zinc-600'
                        }`}
                      >
                        + <span className="currency-symbol">₹</span>
                        {plan.setupFeeInr.toLocaleString('en-IN')}
                        {plan.customSetupSuffix || ''} one-time setup
                      </div>
                    </div>

                    <ul className="space-y-2.5 text-xs sm:text-sm">
                      {plan.features.slice(0, 5).map((feat, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <Check
                            className={`w-4 h-4 shrink-0 mt-0.5 ${
                              isDark ? 'text-white' : 'text-zinc-950'
                            }`}
                          />
                          <span className={isDark ? 'text-zinc-200' : 'text-zinc-700'}>
                            {feat}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      openContactModal(
                        plan.name,
                        `Selected ${plan.name}: ₹${plan.monthlyPriceInr.toLocaleString('en-IN')}/month + ₹${plan.setupFeeInr.toLocaleString('en-IN')} setup`
                      )
                    }
                    className={`mt-7 w-full py-4 px-6 rounded-full text-sm sm:text-base font-extrabold transition-all flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer ${
                      isDark
                        ? 'bg-white text-zinc-950 hover:bg-zinc-200'
                        : 'bg-zinc-950 text-white hover:bg-zinc-800'
                    }`}
                  >
                    <span>{plan.ctaText}</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </BlurKex>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 04: KEXORA PRODUCT LAB & FREE BROWSER TOOLS DOCK (HOME EXCLUSIVE)
         ===================================================================== */}
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

      {/* =====================================================================
          SECTION 05: STUDIO LEADERSHIP & ENGINEERING JOURNAL SPLIT BENTO
         ===================================================================== */}
      <section
        id="home-leadership-journal"
        aria-label="Kexora Leadership and Engineering Insights"
        className="py-20 sm:py-28 bg-[#F8F8FA] border-b border-zinc-200"
      >
        <div className={KEXORA_THEME.classes.container}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Column (6 cols): Leadership Cards & Studio Manifesto */}
            <div className="lg:col-span-6 space-y-6">
              <BlurKex direction="up" blurPx={14} className="space-y-3">
                <div className="text-xs font-extrabold uppercase tracking-[0.22em] text-zinc-500">
                  05 · Studio Leadership · Siwan, Bihar (841226) to Global
                </div>
                <h2
                  className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-950 font-[Outfit] leading-[1.1]"
                  style={{ textWrap: 'balance' }}
                >
                  Built by Engineers Obsessed With Speed & Craft
                </h2>
                <p className="text-sm sm:text-base text-zinc-600 leading-relaxed">
                  Led by <strong className="text-zinc-950">Rajan Singh</strong> and{' '}
                  <strong className="text-zinc-950">Aditya Singh</strong>, Kexora delivers enterprise-grade web, mobile app, game, and AI-SEO engineering directly to founders worldwide.
                </p>
              </BlurKex>

              {/* Founder & CTO Portrait Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <BlurKex
                  direction="up"
                  staggerIndex={1}
                  blurPx={14}
                  className="rounded-3xl bg-white border border-zinc-200/90 overflow-hidden shadow-sm flex flex-col justify-between"
                >
                  <div className="aspect-[4/3] bg-zinc-900 relative overflow-hidden">
                    <ProtectedImage
                      src={KEXORA_MEDIA_VAULT.RAJAN_KX}
                      alt={KEXORA_COMPANY_INFO.founder.name}
                      className="w-full h-full object-cover object-top"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-4 right-4 text-white">
                      <div className="text-base font-extrabold font-[Outfit]">
                        {KEXORA_COMPANY_INFO.founder.name}
                      </div>
                      <div className="text-[11px] text-zinc-300 font-medium">
                        {KEXORA_COMPANY_INFO.founder.role}
                      </div>
                    </div>
                  </div>
                  <div className="p-5 text-xs text-zinc-600 leading-relaxed">
                    {KEXORA_COMPANY_INFO.founder.bio}
                  </div>
                </BlurKex>

                <BlurKex
                  direction="up"
                  staggerIndex={2}
                  blurPx={14}
                  className="rounded-3xl bg-white border border-zinc-200/90 overflow-hidden shadow-sm flex flex-col justify-between"
                >
                  <div className="aspect-[4/3] bg-zinc-900 relative overflow-hidden">
                    <ProtectedImage
                      src={KEXORA_MEDIA_VAULT.ADITYA_CTO}
                      alt={KEXORA_COMPANY_INFO.cto.name}
                      className="w-full h-full object-cover object-top"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-4 right-4 text-white">
                      <div className="text-base font-extrabold font-[Outfit]">
                        {KEXORA_COMPANY_INFO.cto.name}
                      </div>
                      <div className="text-[11px] text-zinc-300 font-medium">
                        {KEXORA_COMPANY_INFO.cto.role}
                      </div>
                    </div>
                  </div>
                  <div className="p-5 text-xs text-zinc-600 leading-relaxed">
                    {KEXORA_COMPANY_INFO.cto.bio}
                  </div>
                </BlurKex>
              </div>

              <BlurKex
                direction="up"
                staggerIndex={3}
                blurPx={12}
                className="p-6 rounded-2xl bg-white border border-zinc-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3 text-xs sm:text-sm font-semibold text-zinc-800">
                  <MapPin className="w-4 h-4 text-zinc-950 shrink-0" />
                  <span>HQ: Siwan, Bihar (841226) · Serving India & Global Clients</span>
                </div>
                <button
                  type="button"
                  onClick={() => onNavigatePage('about')}
                  className="px-5 py-2.5 text-xs sm:text-sm font-extrabold text-zinc-950 bg-zinc-100 hover:bg-zinc-950 hover:text-white rounded-full transition-colors inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <span>Full Studio Story</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </BlurKex>
            </div>

            {/* Right Column (6 cols): Latest Engineering Journal & Insights Deck */}
            <div className="lg:col-span-6 space-y-6">
              <BlurKex
                direction="up"
                blurPx={14}
                className="flex flex-col sm:flex-row sm:items-end justify-between gap-4"
              >
                <div className="space-y-2">
                  <div className="text-xs font-extrabold uppercase tracking-[0.22em] text-zinc-500">
                    Kexora Engineering Journal
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-zinc-950 font-[Outfit]">
                    Latest Guides & Studio Releases
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => onNavigatePage('news')}
                  className="px-5 py-2.5 text-xs sm:text-sm font-extrabold text-zinc-950 bg-white border border-zinc-300 hover:border-zinc-950 rounded-full transition-colors inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <span>All News</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </BlurKex>

              <div className="space-y-4">
                {NEWS_ARTICLES.map((article, idx) => (
                  <BlurKex
                    key={article.id}
                    direction="up"
                    staggerIndex={idx + 1}
                    blurPx={14}
                    className="group p-6 sm:p-7 rounded-3xl bg-white border border-zinc-200/90 hover:border-zinc-950 transition-all duration-300 shadow-sm hover:shadow-lg"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-zinc-500 mb-2.5">
                      <span className="font-bold text-zinc-950">{article.category}</span>
                      <span className="font-mono tabular-nums">
                        {article.date} · {article.readTime}
                      </span>
                    </div>

                    <h4 className="text-lg font-extrabold text-zinc-950 font-[Outfit] leading-snug mb-2">
                      {article.title}
                    </h4>

                    <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed mb-4">
                      {article.excerpt}
                    </p>

                    <div className="pt-4 border-t border-zinc-100 flex items-center justify-between gap-3">
                      <span className="text-xs font-mono font-bold text-zinc-700">
                        {article.highlightMetric}
                      </span>
                      <button
                        type="button"
                        onClick={() => setSelectedArticle(article)}
                        className="px-4 py-2 text-xs sm:text-sm font-extrabold text-zinc-950 bg-zinc-100 group-hover:bg-zinc-950 group-hover:text-white rounded-full transition-colors inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
                      >
                        <span>Read Article</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </BlurKex>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 06: CLIENT IMPACT CARDS, QUICK FAQ & CONVERSION ARCHITECTURE
         ===================================================================== */}
      <section
        id="home-reviews-faq"
        aria-label="Client Reviews and Frequently Asked Questions"
        className="py-20 sm:py-28 bg-white border-b border-zinc-200"
      >
        <div className={`${KEXORA_THEME.classes.container} space-y-20`}>
          {/* Verified Client Outcomes Row */}
          <div>
            <BlurKex direction="up" blurPx={14} className="max-w-2xl space-y-3 mb-12">
              <div className="text-xs font-extrabold uppercase tracking-[0.22em] text-zinc-500">
                06 · Verified Client Impact
              </div>
              <h2
                className="text-3xl sm:text-5xl font-extrabold tracking-tight text-zinc-950 font-[Outfit] leading-[1.08]"
                style={{ textWrap: 'balance' }}
              >
                Trusted by Founders for Speed & Conversion
              </h2>
            </BlurKex>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
              {CLIENT_TESTIMONIALS.map((item, idx) => (
                <BlurKex
                  key={item.author}
                  direction="up"
                  staggerIndex={idx}
                  blurPx={14}
                  className="p-8 rounded-3xl bg-[#F8F8FA] border border-zinc-200/90 flex flex-col justify-between space-y-6"
                >
                  <div className="space-y-4">
                    <div className="pb-3 border-b border-zinc-200 text-xs font-mono font-extrabold text-zinc-950 tabular-nums">
                      {item.outcome}
                    </div>
                    <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed">
                      &ldquo;{item.quote}&rdquo;
                    </p>
                  </div>
                  <div className="pt-4 border-t border-zinc-200/80 text-xs">
                    <div className="font-extrabold text-zinc-950 text-sm font-[Outfit]">
                      {item.author}
                    </div>
                    <div className="text-zinc-500 mt-0.5">
                      {item.role} · {item.company}
                    </div>
                  </div>
                </BlurKex>
              ))}
            </div>
          </div>

          {/* Interactive FAQ Accordion */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pt-12 border-t border-zinc-200 items-start">
            <BlurKex direction="up" blurPx={14} className="lg:col-span-4 space-y-4">
              <div className="text-xs font-extrabold uppercase tracking-[0.22em] text-zinc-500">
                Direct Answers
              </div>
              <h3 className="text-2xl sm:text-4xl font-extrabold text-zinc-950 font-[Outfit] leading-tight">
                Frequently Asked Questions
              </h3>
              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                Have a specific technical or pricing question? Open a direct conversation with our engineering desk.
              </p>
              <button
                type="button"
                onClick={() => openContactModal('General Project Consultation')}
                className={KEXORA_THEME.classes.btnSecondaryOutline}
              >
                <span>Ask Our Team Directly</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </BlurKex>

            <div className="lg:col-span-8 space-y-3">
              {FREQUENTLY_ASKED_QUESTIONS.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <BlurKex
                    key={faq.question}
                    direction="up"
                    staggerIndex={idx}
                    blurPx={10}
                    className="rounded-2xl bg-[#F8F8FA] border border-zinc-200/90 overflow-hidden"
                  >
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full p-5 sm:p-6 text-left text-sm sm:text-base font-extrabold text-zinc-950 flex items-center justify-between gap-4 hover:bg-zinc-100/80 transition-colors cursor-pointer"
                    >
                      <span>{faq.question}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-zinc-950 shrink-0 transition-transform duration-300 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-5 sm:px-6 pb-6 pt-2 text-xs sm:text-sm text-zinc-600 leading-relaxed border-t border-zinc-200/70 bg-white">
                        {faq.answer}
                      </div>
                    )}
                  </BlurKex>
                );
              })}
            </div>
          </div>

          {/* Bottom High-Contrast Conversion Card */}
          <BlurKex
            direction="up"
            blurPx={16}
            className="p-8 sm:p-12 lg:p-14 rounded-3xl bg-zinc-950 text-white flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 shadow-2xl"
          >
            <div className="space-y-3 max-w-2xl">
              <div className={KEXORA_THEME.classes.kickerDark}>
                Ready to Launch Your Digital Brand?
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-[Outfit] leading-tight">
                Build Your Website, Mobile App, or Game With Kexora
              </h2>
              <p className="text-xs sm:text-base text-zinc-300 leading-relaxed">
                Speak directly with Rajan Singh and Aditya Singh for a free architecture consultation, transparent fixed quote, and rapid delivery roadmap.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3.5 shrink-0">
              <button
                type="button"
                onClick={() => openContactModal('New Website / App / Game Project')}
                className={KEXORA_THEME.classes.btnPrimaryWhite}
              >
                <span>Start Your Project</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={() => onNavigatePage('pricing')}
                className="px-7 py-4 text-sm sm:text-base font-extrabold text-white bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 rounded-full transition-colors inline-flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
              >
                <span>Compare Pricing</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </BlurKex>
        </div>
      </section>

      {/* Case Study Modal */}
      {selectedCaseModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="home-case-study-modal-title"
          className="fixed inset-0 z-50 bg-black/65 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
        >
          <div className="relative w-full max-w-2xl bg-white border border-zinc-200 rounded-3xl p-6 sm:p-8 space-y-5 shadow-2xl text-zinc-950">
            <button
              type="button"
              aria-label="Close project details"
              onClick={() => setSelectedCaseModal(null)}
              className="absolute top-4 right-4 p-2 text-zinc-500 hover:text-zinc-950 rounded-full hover:bg-zinc-100 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-xs text-zinc-500 font-bold uppercase tracking-wider">
              {selectedCaseModal.client} · {selectedCaseModal.categoryLabel}
            </div>

            <h3
              id="home-case-study-modal-title"
              className="text-2xl font-extrabold text-zinc-950 font-[Outfit]"
            >
              {selectedCaseModal.title}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-5 rounded-2xl bg-[#F8F8FA] border border-zinc-200 space-y-1.5">
                <div className="font-bold text-zinc-950">The Problem</div>
                <p className="text-zinc-600 leading-relaxed">
                  {selectedCaseModal.challenge}
                </p>
              </div>
              <div className="p-5 rounded-2xl bg-[#F8F8FA] border border-zinc-200 space-y-1.5">
                <div className="font-bold text-zinc-950">How Kexora Solved It</div>
                <p className="text-zinc-600 leading-relaxed">
                  {selectedCaseModal.solution}
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-xs font-bold text-zinc-950">Key Results</div>
              <ul className="space-y-2 text-xs text-zinc-700">
                {selectedCaseModal.results.map((res, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-zinc-950 shrink-0" />
                    <span>{res}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t border-zinc-200 flex items-center justify-between gap-3">
              <span className="text-xs text-zinc-500">
                {selectedCaseModal.techStack.join(' · ')}
              </span>
              <button
                type="button"
                onClick={() => {
                  const title = selectedCaseModal.title;
                  setSelectedCaseModal(null);
                  openContactModal(title);
                }}
                className={KEXORA_THEME.classes.btnPrimaryBlack}
              >
                Build a Similar Project
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Article Reader Modal */}
      {selectedArticle && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="home-journal-modal-title"
          className="fixed inset-0 z-50 bg-black/65 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
        >
          <div className="relative w-full max-w-2xl bg-white border border-zinc-200 rounded-3xl p-6 sm:p-8 space-y-5 shadow-2xl text-zinc-950">
            <button
              type="button"
              aria-label="Close article"
              onClick={() => setSelectedArticle(null)}
              className="absolute top-4 right-4 p-2 text-zinc-500 hover:text-zinc-950 rounded-full hover:bg-zinc-100 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-500">
              <span className="text-zinc-950 font-bold">{selectedArticle.category}</span>
              <span aria-hidden="true">·</span>
              <span>{selectedArticle.date}</span>
              <span aria-hidden="true">·</span>
              <span>By {selectedArticle.author}</span>
            </div>

            <h3
              id="home-journal-modal-title"
              className="text-2xl font-extrabold text-zinc-950 font-[Outfit]"
            >
              {selectedArticle.title}
            </h3>

            <div className="space-y-4 text-sm text-zinc-600 leading-relaxed pt-2 border-t border-zinc-200">
              {selectedArticle.content.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            <div className="pt-4 border-t border-zinc-200 flex items-center justify-between gap-3">
              <span className="text-xs font-mono text-zinc-600 font-bold">
                {selectedArticle.highlightMetric}
              </span>
              <button
                type="button"
                onClick={() => {
                  const title = selectedArticle.title;
                  setSelectedArticle(null);
                  openContactModal(`Enquiry from News: ${title}`);
                }}
                className={KEXORA_THEME.classes.btnPrimaryBlack}
              >
                Ask Us About This
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

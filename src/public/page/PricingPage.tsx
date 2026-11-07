import React, { useState, useMemo } from 'react';
import { ActiveTab, CurrencyCode, ServicePillarId } from '../../types';
import { INDIVIDUAL_SERVICE_PRICING } from '../../data/agencyData';
import { PageBanner } from '../component/PageBanner';
import { PricingSection } from '../component/PricingSection';
import { ToolsSuite } from '../component/ToolsSuite';
import { TestimonialsFaq } from '../component/TestimonialsFaq';
import { BlurKex } from '../../effect';
import {
  Search,
  Check,
  Plus,
  X,
  ArrowUpRight,
  Layers,
  RotateCcw,
} from 'lucide-react';

interface PricingPageProps {
  openContactModal: (serviceName?: string, details?: string) => void;
  onNavigatePage: (page: ActiveTab) => void;
  onNavigateTool?: (slug: string) => void;
  currency?: CurrencyCode;
  onCurrencyChange?: (currency: CurrencyCode) => void;
}

type PillarFilter = 'all' | ServicePillarId;
type BillingFilter = 'all' | 'one-time' | 'monthly';

export const PricingPage: React.FC<PricingPageProps> = ({
  openContactModal,
  onNavigatePage,
  onNavigateTool,
  currency: externalCurrency,
  onCurrencyChange,
}) => {
  const [internalCurrency, setInternalCurrency] = useState<CurrencyCode>('INR');
  const currency = externalCurrency ?? internalCurrency;
  const setCurrency = (next: CurrencyCode) => {
    setInternalCurrency(next);
    if (onCurrencyChange) {
      onCurrencyChange(next);
    }
  };
  const [selectedPillar, setSelectedPillar] = useState<PillarFilter>('all');
  const [billingFilter, setBillingFilter] = useState<BillingFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBundleIds, setSelectedBundleIds] = useState<string[]>([]);

  const symbol = currency === 'INR' ? '₹' : '$';

  const pillarTabs: { id: PillarFilter; label: string; count: number }[] = [
    { id: 'all', label: 'All Company Services', count: 24 },
    { id: 'web-dev', label: '01. Web Design & Dev', count: 6 },
    { id: 'app-game', label: '02. App & Game Dev', count: 6 },
    { id: 'seo-marketing', label: '03. Digital Marketing & SEO', count: 6 },
    { id: 'creative-business', label: '04. Creative & Compliance', count: 6 },
  ];

  const filteredServices = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return INDIVIDUAL_SERVICE_PRICING.filter((item) => {
      if (selectedPillar !== 'all' && item.pillarId !== selectedPillar) {
        return false;
      }
      if (billingFilter !== 'all' && item.billingCycle !== billingFilter) {
        return false;
      }
      if (query) {
        const haystack = `${item.title} ${item.shortDesc} ${item.pillarName} ${item.deliverables.join(' ')}`.toLowerCase();
        return haystack.includes(query);
      }
      return true;
    });
  }, [selectedPillar, billingFilter, searchQuery]);

  const toggleBundleService = (id: string) => {
    setSelectedBundleIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const selectedBundleItems = useMemo(
    () =>
      INDIVIDUAL_SERVICE_PRICING.filter((item) =>
        selectedBundleIds.includes(item.id)
      ),
    [selectedBundleIds]
  );

  const bundleTotals = useMemo(() => {
    return selectedBundleItems.reduce(
      (acc, item) => {
        const kexora =
          currency === 'INR' ? item.kexoraPriceInr : item.kexoraPriceUsd;
        const market =
          currency === 'INR' ? item.marketPriceInr : item.marketPriceUsd;
        acc.kexoraTotal += kexora;
        acc.marketTotal += market;
        acc.savedTotal += market - kexora;
        return acc;
      },
      { kexoraTotal: 0, marketTotal: 0, savedTotal: 0 }
    );
  }, [selectedBundleItems, currency]);

  const handleEnquireBundle = () => {
    if (selectedBundleItems.length === 0) return;
    const taskTitles = selectedBundleItems.map((i) => i.title);
    const primaryLabel =
      selectedBundleItems.length === 1
        ? selectedBundleItems[0].title
        : `Custom ${selectedBundleItems.length}-Service Bundle (${taskTitles.slice(0, 2).join(', ')}${selectedBundleItems.length > 2 ? '...' : ''})`;

    const breakdownLines = selectedBundleItems
      .map((item) => {
        const price =
          currency === 'INR' ? item.kexoraPriceInr : item.kexoraPriceUsd;
        const market =
          currency === 'INR' ? item.marketPriceInr : item.marketPriceUsd;
        return `• ${item.title}: ${symbol}${price.toLocaleString()} (Market: ${symbol}${market.toLocaleString()})`;
      })
      .join('\n');

    const details = `Hi Kexora Team, I would like to book the following ${selectedBundleItems.length} service(s) at the 30%-off Kexora Studio Rate:\n${breakdownLines}\n\nTotal Kexora Rate: ${symbol}${bundleTotals.kexoraTotal.toLocaleString()} (Total Saved vs Market: ${symbol}${bundleTotals.savedTotal.toLocaleString()}). Please share the combined timeline and next steps.`;

    openContactModal(primaryLabel, details);
  };

  const comparisonRows = [
    {
      feature: 'Monthly Managed Retainer (30% Below Market)',
      beginner: '₹999/mo (Market ₹1,450)',
      creative: '₹2,499/mo (Market ₹3,600)',
      expert: '₹4,999/mo (Market ₹7,200)',
    },
    {
      feature: 'One-Time Setup & Engineering Fee',
      beginner: '₹8,000 (Save ₹3,500)',
      creative: '₹18,000 (Save ₹8,000)',
      expert: '₹40,000+ (Save ₹18,000+)',
    },
    {
      feature: 'Included Custom Designed Pages',
      beginner: 'Single Page / Portfolio',
      creative: 'Up to 5–10 Custom Pages',
      expert: 'Unlimited Pages / Full Store',
    },
    {
      feature: 'Core Web Vitals & Speed Optimization',
      beginner: 'Standard Mobile Responsive',
      creative: '99+ PageSpeed Guarantee',
      expert: '99+ PageSpeed + Edge CDN',
    },
    {
      feature: 'UI/UX Design Revisions Included',
      beginner: 'Initial Build Sign-off',
      creative: '2–3 Dedicated Revisions',
      expert: 'Unlimited Design Revisions',
    },
    {
      feature: 'E-Commerce & Payment Gateways (UPI/Razorpay)',
      beginner: 'Optional Add-on',
      creative: 'Optional Add-on',
      expert: 'Included (Full Multi-Vendor/D2C)',
    },
    {
      feature: 'SEO, Schema.org JSON-LD & Google Maps',
      beginner: 'Foundational On-Page SEO',
      creative: 'Full GMB, Social & JSON-LD',
      expert: 'Enterprise AI-SEO & Sitelinks',
    },
    {
      feature: 'Engineering Support & Backup SLA',
      beginner: 'Basic Ticket Support',
      creative: 'Priority Support',
      expert: '24/7 Priority + Daily Backups',
    },
  ];

  return (
    <div className="bg-white text-zinc-950">
      <PageBanner
        kicker="Pricing & Rate Card · 30% Lower Than Industry Standard"
        title="Transparent Pricing for Every"
        highlightText="Website, App, SEO & Business Task"
        description="Compare Kexora’s 3 core monthly plans or browse individual task pricing across all 24 company services—engineered directly in-house at 30% below standard agency rates."
        primaryCtaLabel="Book Free Pricing Consultation"
        onPrimaryCta={() => openContactModal('Pricing Plan Consultation')}
        onBackHome={onNavigatePage}
      />

      {/* Section 1: Upgraded Core 3 Monthly Managed Plans */}
      <PricingSection
        externalCurrency={currency}
        onExternalCurrencyChange={setCurrency}
        hideQuickServicePreview
        openContactModalWithService={(serviceName, details) =>
          openContactModal(serviceName, details)
        }
      />

      {/* Section 2: Complete 24-Service Individual Task Rate Card (Interactive Tabs + Search + Bundle Builder) */}
      <section
        id="service-rate-card"
        className="py-20 sm:py-24 bg-white text-zinc-950 border-b border-zinc-200"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header & Why Kexora is 30% Cheaper Proof Strip */}
          <BlurKex
            direction="up"
            blurPx={14}
            className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10"
          >
            <div className="max-w-3xl">
              <div className="flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-500 mb-3">
                <span>All 24 Company Services</span>
                <span aria-hidden="true">·</span>
                <span className="text-zinc-950">
                  Individual Task-Wise Rate Card
                </span>
              </div>
              <h2
                className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold tracking-tight text-zinc-950 font-[Outfit] leading-[1.12]"
                style={{ textWrap: 'balance' }}
              >
                Separate Pricing for Every Single Task We Deliver — 30% Cheaper Than Market
              </h2>
              <p className="mt-3 text-sm sm:text-base text-zinc-600 leading-relaxed">
                Only need a specific service like a Custom Website, Android/iOS App, 2D/3D Game, Google SEO, Logo Design, or GST &amp; Trademark Registration? Pick any individual service below or combine multiple tasks into a custom bundle.
              </p>
            </div>

            {/* Currency Switcher Synced with Top Section */}
            <div className="flex items-center gap-3 self-start lg:self-end">
              <span className="text-xs font-semibold text-zinc-500">
                Rate Card Currency:
              </span>
              <div className="inline-flex items-center p-1 bg-[#F4F4F6] rounded-full border border-zinc-200/90">
                <button
                  type="button"
                  onClick={() => setCurrency('INR')}
                  className={`px-4 py-1.5 text-xs font-bold rounded-full transition-all duration-200 whitespace-nowrap shrink-0 ${
                    currency === 'INR'
                      ? 'bg-zinc-950 text-white shadow-xs'
                      : 'text-zinc-600 hover:text-zinc-950'
                  }`}
                >
                  INR (₹)
                </button>
                <button
                  type="button"
                  onClick={() => setCurrency('USD')}
                  className={`px-4 py-1.5 text-xs font-bold rounded-full transition-all duration-200 whitespace-nowrap shrink-0 ${
                    currency === 'USD'
                      ? 'bg-zinc-950 text-white shadow-xs'
                      : 'text-zinc-600 hover:text-zinc-950'
                  }`}
                >
                  USD ($)
                </button>
              </div>
            </div>
          </BlurKex>

          {/* 3-Column Direct Studio Advantage Strip */}
          <BlurKex direction="up" delay={0.08} blurPx={12} className="grid grid-cols-1 md:grid-cols-3 gap-4 p-5 rounded-3xl bg-[#FAFAFB] border border-zinc-200/90 mb-10">
            <div className="px-3 py-1">
              <div className="text-xs font-mono font-bold text-zinc-950 mb-1">
                01 · Zero Agency Middlemen
              </div>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Traditional agencies outsource and add a 40–50% markup. At Kexora, you work directly with the engineers building your product.
              </p>
            </div>
            <div className="px-3 py-1 md:border-l border-zinc-200/80">
              <div className="text-xs font-mono font-bold text-zinc-950 mb-1">
                02 · Guaranteed 30% Savings
              </div>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Every task shows the standard industry benchmark rate alongside Kexora’s 30% lower direct studio price in INR (₹) and USD ($).
              </p>
            </div>
            <div className="px-3 py-1 md:border-l border-zinc-200/80">
              <div className="text-xs font-mono font-bold text-zinc-950 mb-1">
                03 · Bundle Any Tasks Together
              </div>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Click <strong className="text-zinc-950">+ Add to Bundle</strong> on any cards below to calculate your combined multi-task quote and auto-fill your enquiry in one click.
              </p>
            </div>
          </BlurKex>

          {/* Interactive Filter Toolbar: 4 Pillar Tabs + Search Input + Billing Type */}
          <div className="space-y-4 mb-10">
            {/* Category Tabs */}
            <div
              role="tablist"
              aria-label="Filter all 24 services by company pillar"
              className="flex flex-wrap items-center gap-2 p-1.5 bg-[#F4F4F6] rounded-2xl border border-zinc-200/80"
            >
              {pillarTabs.map((tab) => {
                const active = selectedPillar === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setSelectedPillar(tab.id)}
                    className={`px-4 py-2.5 text-xs font-bold rounded-xl transition-all duration-200 flex items-center gap-2 whitespace-nowrap shrink-0 ${
                      active
                        ? 'bg-zinc-950 text-white shadow-xs'
                        : 'text-zinc-600 hover:text-zinc-950 hover:bg-white/70'
                    }`}
                  >
                    <span>{tab.label}</span>
                    <span
                      className={`font-mono text-[11px] tabular-nums ${
                        active ? 'text-zinc-400' : 'text-zinc-400'
                      }`}
                    >
                      ({tab.count})
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Search & Billing Filter Row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search any service (e.g. Logo, GST, Android App, SEO, Game, WordPress)..."
                  aria-label="Search 24 Kexora services"
                  className="w-full pl-10 pr-9 py-2.5 bg-[#FAFAFB] border border-zinc-300 rounded-xl text-xs sm:text-sm text-zinc-950 placeholder-zinc-400 focus:bg-white focus:outline-none focus:border-zinc-950 transition-colors"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    aria-label="Clear search query"
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-zinc-400 hover:text-zinc-950"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs text-zinc-500 font-medium">
                  Billing Type:
                </span>
                <div className="inline-flex items-center p-1 bg-[#F4F4F6] rounded-xl border border-zinc-200/80">
                  {(
                    [
                      { id: 'all', label: 'All (24)' },
                      { id: 'one-time', label: 'One-Time Project (20)' },
                      { id: 'monthly', label: 'Monthly Growth (4)' },
                    ] as const
                  ).map((b) => (
                    <button
                      key={b.id}
                      type="button"
                      onClick={() => setBillingFilter(b.id)}
                      className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all duration-200 whitespace-nowrap shrink-0 ${
                        billingFilter === b.id
                          ? 'bg-white text-zinc-950 shadow-xs'
                          : 'text-zinc-600 hover:text-zinc-950'
                      }`}
                    >
                      {b.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Empty Search State */}
          {filteredServices.length === 0 ? (
            <div className="p-12 text-center rounded-3xl border border-zinc-200 bg-[#FAFAFB]">
              <p className="text-base font-bold text-zinc-950 font-[Outfit] mb-1">
                No matching service found for &ldquo;{searchQuery}&rdquo;
              </p>
              <p className="text-xs text-zinc-600 mb-5">
                Try clearing your filter or request a custom quote directly for your requirement.
              </p>
              <div className="flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedPillar('all');
                    setBillingFilter('all');
                  }}
                  className="px-4 py-2.5 text-xs font-bold bg-zinc-200/80 hover:bg-zinc-300 text-zinc-950 rounded-full transition-colors inline-flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Filters</span>
                </button>
                <button
                  type="button"
                  onClick={() => openContactModal(searchQuery || 'Custom Task Quote')}
                  className="px-5 py-2.5 text-xs font-bold bg-zinc-950 hover:bg-zinc-800 text-white rounded-full transition-colors"
                >
                  Enquire Custom Task
                </button>
              </div>
            </div>
          ) : (
            /* 24 Service Pricing Cards Grid */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
              {filteredServices.map((srv, idx) => {
                const kexoraPrice =
                  currency === 'INR' ? srv.kexoraPriceInr : srv.kexoraPriceUsd;
                const marketPrice =
                  currency === 'INR' ? srv.marketPriceInr : srv.marketPriceUsd;
                const savedAmount = marketPrice - kexoraPrice;
                const savingsPercent = Math.round(
                  ((marketPrice - kexoraPrice) / marketPrice) * 100
                );
                const isSelectedInBundle = selectedBundleIds.includes(srv.id);

                return (
                  <BlurKex
                    key={srv.id}
                    direction="up"
                    staggerIndex={idx % 6}
                    blurPx={14}
                    className={`group rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 ${
                      isSelectedInBundle
                        ? 'bg-zinc-950 text-white border-2 border-zinc-950 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.3)]'
                        : 'bg-white text-zinc-950 border border-zinc-200/90 hover:border-zinc-950/60 shadow-[0_8px_28px_-10px_rgba(0,0,0,0.05)]'
                    }`}
                  >
                    <div>
                      {/* Unboxed Metadata Line (No Static Pill Boxes) */}
                      <div
                        className={`flex items-center justify-between gap-2 text-xs font-mono mb-2.5 ${
                          isSelectedInBundle ? 'text-zinc-400' : 'text-zinc-500'
                        }`}
                      >
                        <span>
                          {srv.index} · {srv.pillarName.split(' ')[0]} ·{' '}
                          {srv.turnaround}
                        </span>
                        <span
                          className={`font-bold tabular-nums ${
                            isSelectedInBundle ? 'text-white' : 'text-zinc-950'
                          }`}
                        >
                          {savingsPercent}% Cheaper
                        </span>
                      </div>

                      {/* Service Title & Description */}
                      <h3
                        className={`text-xl font-extrabold font-[Outfit] tracking-tight mb-2 ${
                          isSelectedInBundle ? 'text-white' : 'text-zinc-950'
                        }`}
                      >
                        {srv.title}
                      </h3>
                      <p
                        className={`text-xs sm:text-[13px] leading-relaxed mb-5 ${
                          isSelectedInBundle ? 'text-zinc-300' : 'text-zinc-600'
                        }`}
                      >
                        {srv.shortDesc}
                      </p>

                      {/* Strikethrough Market Rate vs Kexora 30%-Off Price Box */}
                      <div
                        className={`p-4 rounded-2xl mb-5 border transition-colors ${
                          isSelectedInBundle
                            ? 'bg-zinc-900 border-zinc-800'
                            : 'bg-[#FAFAFB] border-zinc-200/80 group-hover:bg-zinc-100/80'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2 text-[11px] font-mono mb-1.5">
                          <span
                            className={
                              isSelectedInBundle
                                ? 'text-zinc-400'
                                : 'text-zinc-500'
                            }
                          >
                            Industry Rate:{' '}
                            <span className="line-through tabular-nums">
                              <span className="currency-symbol">{symbol}</span>
                              <span className="price-num">{marketPrice.toLocaleString()}</span>
                            </span>
                          </span>
                          <span
                            className={`font-bold tabular-nums ${
                              isSelectedInBundle
                                ? 'text-zinc-200'
                                : 'text-zinc-950'
                            }`}
                          >
                            Save <span className="currency-symbol">{symbol}</span>
                            <span className="price-num">{savedAmount.toLocaleString()}</span>
                          </span>
                        </div>

                        <div className="flex items-baseline justify-between gap-2">
                          <div className="flex items-baseline gap-1">
                            <span
                              className={`currency-symbol text-xl font-bold ${
                                isSelectedInBundle
                                  ? 'text-white'
                                  : 'text-zinc-950'
                              }`}
                            >
                              {symbol}
                            </span>
                            <span
                              className={`price-num text-2xl sm:text-3xl font-extrabold tracking-tight ${
                                isSelectedInBundle
                                  ? 'text-white'
                                  : 'text-zinc-950'
                              }`}
                            >
                              {kexoraPrice.toLocaleString()}
                            </span>
                            <span
                              className={`text-xs font-mono ml-1 ${
                                isSelectedInBundle
                                  ? 'text-zinc-400'
                                  : 'text-zinc-500'
                              }`}
                            >
                              / {srv.billingLabel}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Deliverables List */}
                      <ul
                        className={`space-y-2 mb-6 text-xs ${
                          isSelectedInBundle ? 'text-zinc-300' : 'text-zinc-700'
                        }`}
                      >
                        {srv.deliverables.map((deliv, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <Check
                              className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${
                                isSelectedInBundle
                                  ? 'text-white'
                                  : 'text-zinc-950'
                              }`}
                            />
                            <span>{deliv}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Dual Action Row: Direct Smart Enquiry OR Add to Multi-Task Bundle */}
                    <div className="grid grid-cols-2 gap-2.5 pt-2">
                      <button
                        type="button"
                        onClick={() => toggleBundleService(srv.id)}
                        className={`py-3 px-3.5 text-sm font-bold rounded-full border transition-all duration-200 inline-flex items-center justify-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer ${
                          isSelectedInBundle
                            ? 'bg-zinc-800 border-zinc-700 text-white hover:bg-zinc-700'
                            : 'bg-white border-zinc-300 text-zinc-800 hover:border-zinc-950 hover:text-zinc-950'
                        }`}
                      >
                        {isSelectedInBundle ? (
                          <>
                            <Check className="w-4 h-4" />
                            <span>In Bundle</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-4 h-4" />
                            <span>Add Bundle</span>
                          </>
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          openContactModal(
                            srv.title,
                            `Hi Kexora Team, I would like to book "${srv.title}" at Kexora's 30%-off studio rate of ${symbol}${kexoraPrice.toLocaleString()} (${srv.billingLabel}, saving ${symbol}${savedAmount.toLocaleString()} vs the ${symbol}${marketPrice.toLocaleString()} market rate). Please share the next steps.`
                          )
                        }
                        className={`py-3 px-3.5 text-sm font-extrabold rounded-full transition-all duration-200 inline-flex items-center justify-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer ${
                          isSelectedInBundle
                            ? 'bg-white text-zinc-950 hover:bg-zinc-200 shadow-sm'
                            : 'bg-zinc-950 text-white hover:bg-zinc-800 shadow-sm'
                        }`}
                      >
                        <span>Book Now</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </button>
                    </div>
                  </BlurKex>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Section 3: Detailed Plan Comparison Matrix */}
      <section className="py-20 bg-[#FAFAFB] text-zinc-950 border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <div className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2">
              Side-by-Side Specification Matrix
            </div>
            <h2
              className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-950 font-[Outfit]"
              style={{ textWrap: 'balance' }}
            >
              Compare Beginner, Creative &amp; Expert Managed Plans
            </h2>
          </div>

          <div className="overflow-x-auto rounded-3xl border border-zinc-200 bg-white shadow-xs">
            <table className="w-full text-left text-xs sm:text-sm border-collapse tabular-nums">
              <thead>
                <tr className="border-b border-zinc-200 bg-zinc-100/80 text-xs font-bold text-zinc-700">
                  <th className="py-4 px-6">Deliverable / Capability</th>
                  <th className="py-4 px-6">Beginner Plan</th>
                  <th className="py-4 px-6 text-zinc-950">
                    Creative Plan (Popular)
                  </th>
                  <th className="py-4 px-6">Expert Plan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 text-zinc-700">
                {comparisonRows.map((row, i) => (
                  <tr key={i} className="hover:bg-zinc-50 transition-colors">
                    <td className="py-3.5 px-6 font-bold text-zinc-950">
                      {row.feature}
                    </td>
                    <td className="py-3.5 px-6 text-zinc-600 font-mono text-xs">
                      {row.beginner}
                    </td>
                    <td className="py-3.5 px-6 text-zinc-950 font-bold font-mono text-xs">
                      {row.creative}
                    </td>
                    <td className="py-3.5 px-6 text-zinc-950 font-mono text-xs">
                      {row.expert}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Section 4: Interactive Cost & Speed Estimator */}
      <ToolsSuite
        initialTab="cost-calculator"
        openContactModalWithDetails={(details) =>
          openContactModal('Custom Project Estimate', details)
        }
        onNavigateTool={(slug) => {
          if (onNavigateTool) {
            onNavigateTool(slug);
          } else if (typeof window !== 'undefined') {
            window.location.href = `/our-tools/${slug}`;
          }
        }}
      />

      {/* Section 5: Testimonials & FAQs */}
      <TestimonialsFaq />

      {/* Floating Glass Multi-Task Bundle Bar (Appears when 1+ individual services are selected) */}
      {selectedBundleItems.length > 0 && (
        <div className="fixed bottom-4 inset-x-0 z-40 px-4 pointer-events-none">
          <div className="max-w-5xl mx-auto pointer-events-auto rounded-3xl bg-zinc-950/88 backdrop-blur-2xl backdrop-saturate-180 border border-white/15 text-white p-4 sm:px-6 sm:py-4 shadow-[0_24px_60px_rgba(0,0,0,0.45)] transition-all duration-300">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                  <Layers className="w-3.5 h-3.5 text-zinc-300" />
                  <span className="font-bold text-white">
                    {selectedBundleItems.length} Service
                    {selectedBundleItems.length > 1 ? 's' : ''} in Your Bundle
                  </span>
                  <span aria-hidden="true" className="text-zinc-500">
                    ·
                  </span>
                  <span className="text-zinc-300 truncate max-w-xs sm:max-w-md">
                    {selectedBundleItems.map((i) => i.title).join(' + ')}
                  </span>
                </div>

                <div className="flex flex-wrap items-baseline gap-3 text-xs font-mono tabular-nums">
                  <span className="text-zinc-400">
                    Market Total:{' '}
                    <span className="line-through">
                      <span className="currency-symbol">{symbol}</span>
                      <span className="price-num">{bundleTotals.marketTotal.toLocaleString()}</span>
                    </span>
                  </span>
                  <span className="text-base sm:text-lg font-extrabold text-white">
                    Kexora Total: <span className="currency-symbol">{symbol}</span>
                    <span className="price-num">{bundleTotals.kexoraTotal.toLocaleString()}</span>
                  </span>
                  <span className="text-emerald-400 font-bold">
                    (You Save <span className="currency-symbol">{symbol}</span>
                    <span className="price-num">{bundleTotals.savedTotal.toLocaleString()}</span>)
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 self-end lg:self-center shrink-0">
                <button
                  type="button"
                  onClick={() => setSelectedBundleIds([])}
                  className="px-4 py-2.5 text-xs sm:text-sm font-bold text-zinc-300 hover:text-white bg-white/10 hover:bg-white/15 rounded-full transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  Clear
                </button>
                <button
                  type="button"
                  onClick={handleEnquireBundle}
                  className="px-6 py-3 text-sm sm:text-base font-extrabold bg-white hover:bg-zinc-200 text-zinc-950 rounded-full transition-colors inline-flex items-center gap-2 whitespace-nowrap shrink-0 shadow-md cursor-pointer"
                >
                  <span>Claim 30% Off Bundle Quote</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Schema.org Structured Data (JSON-LD) for Pricing Plans, Services & AI Search Optimization */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'Product',
                '@id': 'https://www.kexora.org/pricing#plans',
                name: 'Kexora Custom Web Design & Digital Engineering Pricing Plans',
                description:
                  'Transparent, 30% below-market pricing plans for custom websites, e-commerce stores, Android/iOS mobile apps, 2D/3D games, AI-SEO, and business registration.',
                brand: {
                  '@type': 'Brand',
                  name: 'Kexora',
                },
                offers: {
                  '@type': 'AggregateOffer',
                  priceCurrency: 'INR',
                  lowPrice: '999',
                  highPrice: '40000',
                  offerCount: '24',
                  offers: [
                    {
                      '@type': 'Offer',
                      name: 'Beginner Plan',
                      price: '999',
                      priceCurrency: 'INR',
                      priceValidUntil: '2027-12-31',
                      description:
                        'Single page & portfolio custom websites with 0.3s load speed and WhatsApp lead button.',
                      availability: 'https://schema.org/InStock',
                    },
                    {
                      '@type': 'Offer',
                      name: 'Creative Plan (Most Popular)',
                      price: '2499',
                      priceCurrency: 'INR',
                      priceValidUntil: '2027-12-31',
                      description:
                        '5 to 10 custom pages, Apple-style smart dropdown enquiry system, Google My Business Top 3 ranking.',
                      availability: 'https://schema.org/InStock',
                    },
                    {
                      '@type': 'Offer',
                      name: 'Expert Plan',
                      price: '4999',
                      priceCurrency: 'INR',
                      priceValidUntil: '2027-12-31',
                      description:
                        'Full-scale custom e-commerce stores, Android/iOS mobile apps, Razorpay/UPI gateways, and enterprise AI-SEO.',
                      availability: 'https://schema.org/InStock',
                    },
                  ],
                },
              },
              {
                '@type': 'FAQPage',
                '@id': 'https://www.kexora.org/pricing#faq',
                mainEntity: [
                  {
                    '@type': 'Question',
                    name: 'How much does a custom website cost at Kexora?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'Kexora offers custom websites starting from ₹999/month (+ ₹8,000 setup) for portfolios and landing pages, ₹2,499/month (+ ₹18,000 setup) for multi-page business websites, and ₹4,999/month (+ ₹40,000+ setup) for full e-commerce stores. All pricing is guaranteed 30% below standard agency rates.',
                    },
                  },
                  {
                    '@type': 'Question',
                    name: 'Why is Kexora guaranteed 30% cheaper than industry standard rates?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'Kexora is an engineer-led studio founded by Rajan Singh and Aditya Singh in Siwan, Bihar. Because your project is developed directly in-house with zero commissioned salespeople, middleman agencies, or expensive office overheads, 100% of your budget goes directly into writing clean code.',
                    },
                  },
                  {
                    '@type': 'Question',
                    name: 'Can I book a single individual service without a monthly plan?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'Yes! Every one of our 24 services (such as GST Registration for ₹1,499, Logo Design for ₹1,499, or Android App Development from ₹24,999) can be booked as a standalone one-time task with no monthly commitment.',
                    },
                  },
                ],
              },
            ],
          }),
        }}
      />
    </div>
  );
};

import React, { useState, useMemo } from 'react';
import {
  ActiveTab,
  CurrencyCode,
  ServicePillarId,
  ServiceTierId,
} from '../../types';
import { INDIVIDUAL_SERVICE_PRICING } from '../../data/agencyData';
import {
  buildQuotationForServiceTier,
  formatTierOptionValue,
  getServiceTiers,
  TIER_ORDER,
} from '../../data/tieredPricingEngine';
import { PageBanner, BlurKex, useContextualTabTitle } from '../universal';
import { PricingSection } from './PricingSection';
import { TestimonialsFaq } from './TestimonialsFaq';
import {
  Search,
  Check,
  Plus,
  X,
  ArrowUpRight,
  Layers,
  RotateCcw,
  Clock,
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

interface BundledServiceSelection {
  serviceId: string;
  tierId: ServiceTierId;
}

export const PricingPage: React.FC<PricingPageProps> = ({
  openContactModal,
  onNavigatePage,
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

  // Global default tier & per-card tier overrides across all 24 services
  const [globalTier] = useState<ServiceTierId>('standard');
  const [cardTierOverrides, setCardTierOverrides] = useState<
    Record<string, ServiceTierId>
  >({});

  // Multi-service bundle state storing exact serviceId + tierId
  const [selectedBundleItems, setSelectedBundleItems] = useState<
    BundledServiceSelection[]
  >([]);

  const symbol = currency === 'INR' ? '₹' : '$';

  const pricingTabContext = (() => {
    if (selectedBundleItems.length > 0) {
      return `Bundle (${selectedBundleItems.length} Selected) · ${currency}`;
    }
    if (searchQuery.trim()) {
      return `Pricing: ${searchQuery.trim()}`;
    }
    const pillarLabels: Record<PillarFilter, string | null> = {
      all: null,
      'web-dev': 'Web Pricing',
      'app-game': 'App & Game Pricing',
      'seo-marketing': 'SEO Pricing',
      'creative-business': 'Creative & GST Pricing',
    };
    const pillarName = pillarLabels[selectedPillar];
    if (pillarName) {
      return `${pillarName} (${currency})`;
    }
    return currency === 'USD' ? 'Pricing (USD)' : null;
  })();

  useContextualTabTitle(pricingTabContext, 10);

  const getActiveTierForCard = (serviceId: string): ServiceTierId => {
    return cardTierOverrides[serviceId] || globalTier;
  };

  const handleCardTierSwitch = (serviceId: string, nextTier: ServiceTierId) => {
    setCardTierOverrides((prev) => ({
      ...prev,
      [serviceId]: nextTier,
    }));
  };

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
        const tiers = getServiceTiers(item.id);
        const allDeliverables = [
          ...tiers.basic.deliverables,
          ...tiers.standard.deliverables,
          ...tiers.premium.deliverables,
        ].join(' ');
        const haystack =
          `${item.title} ${item.shortDesc} ${item.pillarName} ${allDeliverables}`.toLowerCase();
        return haystack.includes(query);
      }
      return true;
    });
  }, [selectedPillar, billingFilter, searchQuery]);

  const toggleBundleService = (serviceId: string, tierId: ServiceTierId) => {
    setSelectedBundleItems((prev) => {
      const existingIdx = prev.findIndex((b) => b.serviceId === serviceId);
      if (existingIdx !== -1) {
        // If same tier is clicked again, remove from bundle; if different tier, update tier
        if (prev[existingIdx].tierId === tierId) {
          return prev.filter((b) => b.serviceId !== serviceId);
        }
        const updated = [...prev];
        updated[existingIdx] = { serviceId, tierId };
        return updated;
      }
      return [...prev, { serviceId, tierId }];
    });
  };

  const resolvedBundleDetails = useMemo(() => {
    return selectedBundleItems
      .map((entry) => {
        const srv = INDIVIDUAL_SERVICE_PRICING.find(
          (s) => s.id === entry.serviceId
        );
        if (!srv) return null;
        const tiers = getServiceTiers(srv.id);
        const tierPkg = tiers[entry.tierId];
        const kexora =
          currency === 'INR'
            ? tierPkg.kexoraPriceInr
            : tierPkg.kexoraPriceUsd;
        const market =
          currency === 'INR'
            ? tierPkg.marketPriceInr
            : tierPkg.marketPriceUsd;
        return {
          service: srv,
          tierId: entry.tierId,
          tierPkg,
          kexora,
          market,
          saved: market - kexora,
        };
      })
      .filter((x): x is NonNullable<typeof x> => x !== null);
  }, [selectedBundleItems, currency]);

  const bundleTotals = useMemo(() => {
    return resolvedBundleDetails.reduce(
      (acc, item) => {
        acc.kexoraTotal += item.kexora;
        acc.marketTotal += item.market;
        acc.savedTotal += item.saved;
        return acc;
      },
      { kexoraTotal: 0, marketTotal: 0, savedTotal: 0 }
    );
  }, [resolvedBundleDetails]);

  const handleEnquireBundle = () => {
    if (resolvedBundleDetails.length === 0) return;

    if (resolvedBundleDetails.length === 1) {
      const single = resolvedBundleDetails[0];
      const quote = buildQuotationForServiceTier(
        single.service.title,
        formatTierOptionValue(single.tierId),
        currency
      );
      openContactModal(
        `${single.service.title} — ${single.tierPkg.tierLabel} Tier`,
        quote.formattedBrief
      );
      return;
    }

    const taskTitles = resolvedBundleDetails.map(
      (i) => `${i.service.title} (${i.tierPkg.tierLabel})`
    );
    const primaryLabel = `Custom ${resolvedBundleDetails.length}-Service Bundle (${taskTitles.slice(0, 2).join(', ')}${resolvedBundleDetails.length > 2 ? '...' : ''})`;

    const breakdownLines = resolvedBundleDetails
      .map((item) => {
        return `• ${item.service.title} [${item.tierPkg.tierLabel} Tier · ${item.tierPkg.turnaround}]: ${symbol}${item.kexora.toLocaleString()} (Market: ${symbol}${item.market.toLocaleString()} · Save ${symbol}${item.saved.toLocaleString()})`;
      })
      .join('\n');

    const details = [
      `Hi Kexora Engineering Desk,`,
      `I would like an official combined Studio Quotation for the following ${resolvedBundleDetails.length} selected services & tiers:`,
      breakdownLines,
      ``,
      `• Combined Kexora Studio Rate: ${symbol}${bundleTotals.kexoraTotal.toLocaleString()}`,
      `• Industry Market Total: ${symbol}${bundleTotals.marketTotal.toLocaleString()} (Total Savings: ${symbol}${bundleTotals.savedTotal.toLocaleString()})`,
      `Please share the combined timeline and kickoff steps.`,
    ].join('\n');

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
        kicker="3-Tier Pricing & Rate Card · Basic, Standard & Premium"
        title="Transparent 3-Tier Pricing for Every"
        highlightText="Website, App, SEO & Business Service"
        description="Every single one of Kexora’s 24 services is structured into Basic (Sabse Sasta), Standard (Middle), and Premium (Max) tiers—dynamically linked with our live Contact Form Quotation Desk."
        primaryCtaLabel="Open Live Quotation Desk"
        onPrimaryCta={() => openContactModal('Ecommerce & Custom Web Design — Standard Tier')}
        onBackHome={onNavigatePage}
      />

      {/* Section 1: 3-Tier Need Explorer & 3 Monthly Managed Plans */}
      <PricingSection
        externalCurrency={currency}
        onExternalCurrencyChange={setCurrency}
        hideQuickServicePreview
        openContactModalWithService={(serviceName, details) =>
          openContactModal(serviceName, details)
        }
      />

      {/* Section 2: Complete 24-Service Individual Task Rate Card (Each with Basic, Standard, Premium Tiers) */}
      <section
        id="service-rate-card"
        className="py-20 sm:py-24 bg-white text-zinc-950 border-b border-zinc-200"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header & Global Tier Switcher */}
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
                  3 Tiers Per Service (Basic · Standard · Premium)
                </span>
              </div>
              <h2
                className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold tracking-tight text-zinc-950 font-[Outfit] leading-[1.12]"
                style={{ textWrap: 'balance' }}
              >
                Compare Basic, Standard &amp; Premium Rates for All 24 Services
              </h2>
              <p className="mt-3 text-sm sm:text-base text-zinc-600 leading-relaxed">
                Switch between <strong>Basic</strong> (Sabse Sasta / Essential), <strong>Standard</strong> (Middle / Most Popular), and <strong>Premium</strong> (Max / Full Enterprise) on any service card below, or combine multiple service tiers into a custom bundle quotation.
              </p>
            </div>
          </BlurKex>

          {/* 3-Column Tier Guide Strip */}
          <BlurKex
            direction="up"
            delay={0.08}
            blurPx={12}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 p-5 rounded-3xl bg-[#FAFAFB] border border-zinc-200/90 mb-10"
          >
            <div className="px-3 py-1">
              <div className="text-xs font-mono font-bold text-zinc-950 mb-1">
                01 · Basic Tier (Sabse Sasta / Starter)
              </div>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Designed for early-stage founders and tight budgets—delivers the core essential build with fast turnaround and 1 revision round.
              </p>
            </div>
            <div className="px-3 py-1 md:border-l border-zinc-200/80">
              <div className="text-xs font-mono font-bold text-zinc-950 mb-1">
                02 · Standard Tier (Middle / Most Popular)
              </div>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Our most popular tier—includes custom UI/UX styling, 99+ speed optimization, full core features, and 2–3 dedicated revisions.
              </p>
            </div>
            <div className="px-3 py-1 md:border-l border-zinc-200/80">
              <div className="text-xs font-mono font-bold text-zinc-950 mb-1">
                03 · Premium Tier (Max / Enterprise Scope)
              </div>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Maximum scale with advanced API/AI-SEO integrations, unlimited design revisions, and 24/7 direct CTO/CEO engineering support.
              </p>
            </div>
          </BlurKex>

          {/* Interactive Filter Toolbar: Search Input + Billing Type */}
          <div className="space-y-4 mb-10">
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
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-zinc-400 hover:text-zinc-950 cursor-pointer"
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
                      className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all duration-200 whitespace-nowrap shrink-0 cursor-pointer ${
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
                  className="px-4 py-2.5 text-xs font-bold bg-zinc-200/80 hover:bg-zinc-300 text-zinc-950 rounded-full transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Filters</span>
                </button>
                <button
                  type="button"
                  onClick={() =>
                    openContactModal(searchQuery || 'Custom Task Quote')
                  }
                  className="px-5 py-2.5 text-xs font-bold bg-zinc-950 hover:bg-zinc-800 text-white rounded-full transition-colors cursor-pointer"
                >
                  Enquire Custom Task
                </button>
              </div>
            </div>
          ) : (
            /* 24 Service Pricing Cards Grid — Each Card Has Basic, Standard & Premium Tiers */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
              {filteredServices.map((srv, idx) => {
                const tiers = getServiceTiers(srv.id);
                const activeTierId = getActiveTierForCard(srv.id);
                const activeTier = tiers[activeTierId];

                const kexoraPrice =
                  currency === 'INR'
                    ? activeTier.kexoraPriceInr
                    : activeTier.kexoraPriceUsd;
                const marketPrice =
                  currency === 'INR'
                    ? activeTier.marketPriceInr
                    : activeTier.marketPriceUsd;
                const savedAmount = marketPrice - kexoraPrice;
                const savingsPercent = Math.round(
                  ((marketPrice - kexoraPrice) / marketPrice) * 100
                );

                const bundledEntry = selectedBundleItems.find(
                  (b) => b.serviceId === srv.id
                );
                const isSelectedInBundle = Boolean(
                  bundledEntry && bundledEntry.tierId === activeTierId
                );

                return (
                  <BlurKex
                    key={srv.id}
                    direction="up"
                    staggerIndex={idx % 6}
                    blurPx={14}
                    className={`group rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 ${
                      isSelectedInBundle
                        ? 'bg-zinc-950 text-white border-2 border-zinc-950 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.3)]'
                        : 'bg-white text-zinc-950 border border-zinc-200/90 hover:border-zinc-950/60 shadow-[0_8px_28px_-10px_rgba(0,0,0,0.05)]'
                    }`}
                  >
                    <div>
                      {/* Top Metadata Row */}
                      <div
                        className={`flex items-center justify-between gap-2 text-xs font-mono mb-2.5 ${
                          isSelectedInBundle ? 'text-zinc-400' : 'text-zinc-500'
                        }`}
                      >
                        <span>
                          {srv.index} · {srv.pillarName.split(' ')[0]} ·{' '}
                          {activeTier.turnaround}
                        </span>
                        <span
                          className={`font-bold tabular-nums ${
                            isSelectedInBundle
                              ? 'text-emerald-400'
                              : 'text-emerald-700'
                          }`}
                        >
                          {savingsPercent}% Cheaper
                        </span>
                      </div>

                      {/* Service Title */}
                      <h3
                        className={`text-xl font-extrabold font-[Outfit] tracking-tight mb-2 ${
                          isSelectedInBundle ? 'text-white' : 'text-zinc-950'
                        }`}
                      >
                        {srv.title}
                      </h3>

                      {/* 3-Tier In-Card Switcher (Basic | Standard | Premium) */}
                      <div
                        className={`grid grid-cols-3 gap-1.5 p-1 rounded-2xl mb-4 border ${
                          isSelectedInBundle
                            ? 'bg-zinc-900 border-zinc-800'
                            : 'bg-[#F4F4F6] border-zinc-200/80'
                        }`}
                      >
                        {TIER_ORDER.map((tId) => {
                          const pkg = tiers[tId];
                          const tPrice =
                            currency === 'INR'
                              ? pkg.kexoraPriceInr
                              : pkg.kexoraPriceUsd;
                          const isCurrentTier = activeTierId === tId;
                          return (
                            <button
                              key={tId}
                              type="button"
                              onClick={() => handleCardTierSwitch(srv.id, tId)}
                              className={`py-2 px-2 rounded-xl text-center transition-all cursor-pointer ${
                                isCurrentTier
                                  ? isSelectedInBundle
                                    ? 'bg-white text-zinc-950 shadow-xs font-extrabold'
                                    : 'bg-zinc-950 text-white shadow-xs font-extrabold'
                                  : isSelectedInBundle
                                    ? 'text-zinc-400 hover:text-white'
                                    : 'text-zinc-600 hover:text-zinc-950'
                              }`}
                            >
                              <div className="text-[11px] font-bold leading-none">
                                {pkg.tierLabel}
                              </div>
                              <div className="text-[11px] price-num font-extrabold mt-1">
                                <span className="currency-symbol">{symbol}</span>
                                {tPrice.toLocaleString()}
                              </div>
                            </button>
                          );
                        })}
                      </div>

                      {/* Active Tier Subtitle */}
                      <p
                        className={`text-xs sm:text-[13px] leading-relaxed mb-4 ${
                          isSelectedInBundle ? 'text-zinc-300' : 'text-zinc-600'
                        }`}
                      >
                        {activeTier.subtitle}
                      </p>

                      {/* Active Tier Price & Savings Box */}
                      <div
                        className={`p-4 rounded-2xl mb-4 border transition-colors ${
                          isSelectedInBundle
                            ? 'bg-zinc-900 border-zinc-800'
                            : 'bg-[#FAFAFB] border-zinc-200/80 group-hover:bg-zinc-100/70'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2 text-[11px] font-mono mb-1">
                          <span
                            className={
                              isSelectedInBundle
                                ? 'text-zinc-400'
                                : 'text-zinc-500'
                            }
                          >
                            {activeTier.tierLabel} Market:{' '}
                            <span className="line-through tabular-nums">
                              <span className="currency-symbol">{symbol}</span>
                              <span className="price-num">
                                {marketPrice.toLocaleString()}
                              </span>
                            </span>
                          </span>
                          <span
                            className={`font-bold tabular-nums ${
                              isSelectedInBundle
                                ? 'text-emerald-400'
                                : 'text-emerald-700'
                            }`}
                          >
                            Save <span className="currency-symbol">{symbol}</span>
                            <span className="price-num">
                              {savedAmount.toLocaleString()}
                            </span>
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
                          <span
                            className={`text-[11px] font-mono inline-flex items-center gap-1 ${
                              isSelectedInBundle
                                ? 'text-zinc-300'
                                : 'text-zinc-600'
                            }`}
                          >
                            <Clock className="w-3 h-3" />
                            {activeTier.turnaround}
                          </span>
                        </div>
                      </div>

                      {/* Deliverables List for Selected Tier */}
                      <div
                        className={`text-[11px] font-mono uppercase tracking-wider mb-2 ${
                          isSelectedInBundle ? 'text-zinc-400' : 'text-zinc-500'
                        }`}
                      >
                        {activeTier.tierLabel} Tier Deliverables:
                      </div>
                      <ul
                        className={`space-y-2 mb-6 text-xs ${
                          isSelectedInBundle ? 'text-zinc-300' : 'text-zinc-700'
                        }`}
                      >
                        {activeTier.deliverables.map((deliv, dIdx) => (
                          <li key={dIdx} className="flex items-start gap-2">
                            <Check
                              className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${
                                isSelectedInBundle
                                  ? 'text-emerald-400'
                                  : 'text-zinc-950'
                              }`}
                            />
                            <span>{deliv}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Dual Action Row: Add Tier to Bundle OR Book Tier Quotation Now */}
                    <div className="grid grid-cols-2 gap-2.5 pt-2">
                      <button
                        type="button"
                        onClick={() =>
                          toggleBundleService(srv.id, activeTierId)
                        }
                        className={`py-3 px-3 text-xs sm:text-sm font-bold rounded-full border transition-all duration-200 inline-flex items-center justify-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer ${
                          isSelectedInBundle
                            ? 'bg-zinc-800 border-zinc-700 text-white hover:bg-zinc-700'
                            : 'bg-white border-zinc-300 text-zinc-800 hover:border-zinc-950 hover:text-zinc-950'
                        }`}
                      >
                        {isSelectedInBundle ? (
                          <>
                            <Check className="w-4 h-4 text-emerald-400" />
                            <span>{activeTier.tierLabel} Added</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-4 h-4" />
                            <span>+ {activeTier.tierLabel} Bundle</span>
                          </>
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          const quote = buildQuotationForServiceTier(
                            srv.title,
                            formatTierOptionValue(activeTierId),
                            currency
                          );
                          openContactModal(
                            `${srv.title} — ${activeTier.tierLabel} Tier`,
                            quote.formattedBrief
                          );
                        }}
                        className={`py-3 px-3 text-xs sm:text-sm font-extrabold rounded-full transition-all duration-200 inline-flex items-center justify-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer ${
                          isSelectedInBundle
                            ? 'bg-white text-zinc-950 hover:bg-zinc-200 shadow-sm'
                            : 'bg-zinc-950 text-white hover:bg-zinc-800 shadow-sm'
                        }`}
                      >
                        <span>Book {activeTier.tierLabel}</span>
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

      {/* Section 4: Testimonials & FAQs */}
      <TestimonialsFaq />

      {/* Floating Glass Multi-Task Bundle Bar (Tracks exact service + Basic/Standard/Premium tier) */}
      {resolvedBundleDetails.length > 0 && (
        <div className="fixed bottom-4 inset-x-0 z-40 px-4 pointer-events-none">
          <div className="max-w-5xl mx-auto pointer-events-auto rounded-3xl bg-zinc-950/92 backdrop-blur-2xl backdrop-saturate-180 border border-white/15 text-white p-4 sm:px-6 sm:py-4 shadow-[0_24px_60px_rgba(0,0,0,0.45)] transition-all duration-300">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                  <Layers className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="font-bold text-white">
                    {resolvedBundleDetails.length} Tiered Service
                    {resolvedBundleDetails.length > 1 ? 's' : ''} in Quotation Bundle
                  </span>
                  <span aria-hidden="true" className="text-zinc-500">
                    ·
                  </span>
                  <span className="text-zinc-300 truncate max-w-xs sm:max-w-md">
                    {resolvedBundleDetails
                      .map(
                        (i) => `${i.service.title} (${i.tierPkg.tierLabel})`
                      )
                      .join(' + ')}
                  </span>
                </div>

                <div className="flex flex-wrap items-baseline gap-3 text-xs font-mono tabular-nums">
                  <span className="text-zinc-400">
                    Market Total:{' '}
                    <span className="line-through">
                      <span className="currency-symbol">{symbol}</span>
                      <span className="price-num">
                        {bundleTotals.marketTotal.toLocaleString()}
                      </span>
                    </span>
                  </span>
                  <span className="text-base sm:text-lg font-extrabold text-white">
                    Kexora Quotation:{' '}
                    <span className="currency-symbol">{symbol}</span>
                    <span className="price-num">
                      {bundleTotals.kexoraTotal.toLocaleString()}
                    </span>
                  </span>
                  <span className="text-emerald-400 font-bold">
                    (You Save <span className="currency-symbol">{symbol}</span>
                    <span className="price-num">
                      {bundleTotals.savedTotal.toLocaleString()}
                    </span>
                    )
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 self-end lg:self-center shrink-0">
                <button
                  type="button"
                  onClick={() => setSelectedBundleItems([])}
                  className="px-4 py-2.5 text-xs sm:text-sm font-bold text-zinc-300 hover:text-white bg-white/10 hover:bg-white/15 rounded-full transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  Clear
                </button>
                <button
                  type="button"
                  onClick={handleEnquireBundle}
                  className="px-6 py-3 text-sm sm:text-base font-extrabold bg-white hover:bg-zinc-200 text-zinc-950 rounded-full transition-colors inline-flex items-center gap-2 whitespace-nowrap shrink-0 shadow-md cursor-pointer"
                >
                  <span>Open Bundle Quotation in Contact Form</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Schema.org Structured Data (JSON-LD) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'Product',
                '@id': 'https://kexora.in/pricing#plans',
                name: 'Kexora 3-Tier Custom Web Design, App, Game & SEO Pricing',
                description:
                  'Transparent Basic, Standard, and Premium 3-tier pricing across all 24 Kexora services—engineered at 30% below standard market rates.',
                brand: {
                  '@type': 'Brand',
                  name: 'Kexora',
                },
                offers: {
                  '@type': 'AggregateOffer',
                  priceCurrency: 'INR',
                  lowPrice: '999',
                  highPrice: '58999',
                  offerCount: '72',
                },
              },
            ],
          }),
        }}
      />
    </div>
  );
};

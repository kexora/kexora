import React, { useState } from 'react';
import { PRICING_PLANS } from '../../data/agencyData';
import { NEED_BASED_PRICING_CATALOG, NeedBasedPricingTier } from '../../data/needBasedPricingData';
import { CurrencyCode, ServicePillarId } from '../../types';
import {
  Check,
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  Zap,
  ShieldCheck,
  Clock,
  Layers,
  HelpCircle,
  Laptop,
  Building2,
  ShoppingCart,
  Smartphone,
  TrendingUp,
  FileCheck2,
} from 'lucide-react';

interface PricingProps {
  openContactModalWithService?: (serviceName: string, details?: string) => void;
  onViewAllPage?: () => void;
  externalCurrency?: CurrencyCode;
  onExternalCurrencyChange?: (currency: CurrencyCode) => void;
  hideQuickServicePreview?: boolean;
}

export const PricingSection: React.FC<PricingProps> = ({
  openContactModalWithService,
  onViewAllPage,
  externalCurrency,
  onExternalCurrencyChange,
  hideQuickServicePreview,
}) => {
  const [internalCurrency, setInternalCurrency] = useState<CurrencyCode>('INR');
  const [pricingMode, setPricingMode] = useState<'by-need' | 'monthly-plans'>('by-need');
  const [selectedNeedId, setSelectedNeedId] = useState<string>('business-corporate');

  const currency = externalCurrency ?? internalCurrency;
  const setCurrency = (next: CurrencyCode) => {
    setInternalCurrency(next);
    if (onExternalCurrencyChange) {
      onExternalCurrencyChange(next);
    }
  };

  const symbol = currency === 'INR' ? '₹' : '$';

  const needIcons: Record<string, React.ReactNode> = {
    'landing-portfolio': <Laptop className="w-4 h-4 text-emerald-600" />,
    'business-corporate': <Building2 className="w-4 h-4 text-blue-600" />,
    'ecommerce-retail': <ShoppingCart className="w-4 h-4 text-purple-600" />,
    'mobile-app-game': <Smartphone className="w-4 h-4 text-amber-600" />,
    'seo-lead-generation': <TrendingUp className="w-4 h-4 text-rose-600" />,
    'creative-compliance': <FileCheck2 className="w-4 h-4 text-indigo-600" />,
  };

  const activeNeed =
    NEED_BASED_PRICING_CATALOG.find((n) => n.id === selectedNeedId) ||
    NEED_BASED_PRICING_CATALOG[1];

  const handleBookPlan = (planName: string, details: string) => {
    if (openContactModalWithService) {
      openContactModalWithService(planName, details);
    }
  };

  return (
    <section id="pricing" className="py-20 bg-zinc-50 text-zinc-950 border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header & Value Proposition */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold mb-3 shadow-xs">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Direct Studio Rates · 30% Below Metropolitan Agencies</span>
            </div>
            <h2
              className="text-3xl sm:text-5xl font-extrabold tracking-tight text-zinc-950 font-[Outfit] leading-[1.14]"
              style={{ textWrap: 'balance' }}
            >
              Transparent Pricing Engineered For Your Exact Business Need
            </h2>
            <p className="mt-3 text-sm sm:text-base text-zinc-600 leading-relaxed max-w-2xl">
              No hidden agency markups or surprise maintenance retainers. Select what you need or choose an all-inclusive monthly tier—with 0.3s load speed and 99+ PageSpeed guaranteed.
            </p>
          </div>

          {/* Interactive Controls: Currency & Mode Selector */}
          <div className="flex flex-wrap items-center gap-3 shrink-0 self-start lg:self-end">
            {/* Currency Selector */}
            <div
              role="group"
              aria-label="Select pricing currency"
              className="inline-flex items-center p-1 bg-white rounded-2xl border border-zinc-200 shadow-xs"
            >
              <button
                type="button"
                onClick={() => setCurrency('INR')}
                className={`px-4 py-2 text-sm font-bold rounded-xl transition-all cursor-pointer ${
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
                className={`px-4 py-2 text-sm font-bold rounded-xl transition-all cursor-pointer ${
                  currency === 'USD'
                    ? 'bg-zinc-950 text-white shadow-xs'
                    : 'text-zinc-600 hover:text-zinc-950'
                }`}
              >
                USD ($)
              </button>
            </div>

            {onViewAllPage && (
              <button
                type="button"
                onClick={onViewAllPage}
                className="px-5 py-2.5 text-sm font-bold text-zinc-950 bg-white hover:bg-zinc-100 border border-zinc-300 rounded-2xl transition-all flex items-center gap-2 shadow-xs whitespace-nowrap cursor-pointer"
              >
                <span>View All 24 Services</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Mode Switcher Tabs: By Business Need vs 3 Monthly Retainers */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1.5 bg-zinc-200/80 rounded-2xl border border-zinc-300/80 shadow-xs">
            <button
              type="button"
              onClick={() => setPricingMode('by-need')}
              className={`px-6 py-3 rounded-xl text-sm sm:text-base font-bold transition-all flex items-center gap-2 cursor-pointer ${
                pricingMode === 'by-need'
                  ? 'bg-zinc-950 text-white shadow-sm'
                  : 'text-zinc-600 hover:text-zinc-950 hover:bg-white/40'
              }`}
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Pricing By Your Need (Zaroorat Ke Hisaab Se)</span>
            </button>

            <button
              type="button"
              onClick={() => setPricingMode('monthly-plans')}
              className={`px-6 py-3 rounded-xl text-sm sm:text-base font-bold transition-all flex items-center gap-2 cursor-pointer ${
                pricingMode === 'monthly-plans'
                  ? 'bg-zinc-950 text-white shadow-sm'
                  : 'text-zinc-600 hover:text-zinc-950 hover:bg-white/40'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>3 All-Inclusive Monthly Plans</span>
            </button>
          </div>
        </div>

        {/* ---------------- MODE 1: PRICING BY YOUR NEED (ZAROORAT KE HISAAB SE) ---------------- */}
        {pricingMode === 'by-need' && (
          <div className="space-y-8">
            {/* Need Selection Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {NEED_BASED_PRICING_CATALOG.map((item) => {
                const isSelected = selectedNeedId === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSelectedNeedId(item.id)}
                    className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between space-y-3 relative ${
                      isSelected
                        ? 'bg-zinc-950 text-white border-zinc-950 shadow-md ring-2 ring-zinc-950/20'
                        : 'bg-white text-zinc-800 border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="p-2 rounded-xl bg-zinc-100 text-zinc-950">
                        {needIcons[item.id]}
                      </div>
                      {item.popular && (
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                          Popular
                        </span>
                      )}
                    </div>

                    <div>
                      <div className="text-xs font-bold leading-snug font-[Outfit]">
                        {item.headline}
                      </div>
                      <div
                        className={`text-[11px] mt-1 line-clamp-1 ${
                          isSelected ? 'text-zinc-400' : 'text-zinc-500'
                        }`}
                      >
                        {item.needCategory}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Selected Need Detail Hero Card */}
            <div className="bg-white rounded-3xl border border-zinc-200 p-7 sm:p-10 shadow-sm">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                {/* Left Column: Scope, Audience & Deliverables */}
                <div className="lg:col-span-7 space-y-6">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                        Tailored Scope: {activeNeed.needCategory}
                      </span>
                      <span className="text-xs text-zinc-400 font-mono">
                        · {activeNeed.timeline}
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-4xl font-extrabold text-zinc-950 font-[Outfit]">
                      {activeNeed.headline}
                    </h3>

                    <p className="text-xs sm:text-sm text-zinc-600 mt-2 leading-relaxed">
                      <strong className="text-zinc-900 font-bold">Ideal for: </strong>
                      {activeNeed.targetAudience}
                    </p>
                  </div>

                  {/* Deliverables Checklist */}
                  <div className="space-y-3 pt-2">
                    <div className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                      Everything Included in This Build:
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {activeNeed.deliverables.map((deliv, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 text-xs text-zinc-800">
                          <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span className="leading-relaxed font-medium">{deliv}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Why Kexora Saves Money Callout */}
                  <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/90 text-xs text-emerald-950 flex items-start gap-3">
                    <Sparkles className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                    <div>
                      <strong className="font-bold text-emerald-900">
                        30% Lower Rate Guarantee:{' '}
                      </strong>
                      <span>{activeNeed.whySaveText}</span>
                    </div>
                  </div>
                </div>

                {/* Right Column: Clean Transparent Pricing Card */}
                <div className="lg:col-span-5 p-7 sm:p-9 rounded-3xl bg-zinc-950 text-white flex flex-col justify-between space-y-7 shadow-xl">
                  <div className="space-y-5">
                    <div className="flex items-center justify-between pb-3 border-b border-zinc-800 text-xs">
                      <span className="text-zinc-400">Direct Studio Rate</span>
                      <span className="font-mono text-emerald-400 font-bold">
                        30% Cheaper than Market
                      </span>
                    </div>

                    {/* Price Numbers: Bulletproof Standard Sans Font */}
                    <div>
                      {activeNeed.billingType === 'monthly-setup' ? (
                        <>
                          <div className="text-xs uppercase tracking-wider text-zinc-400">
                            Monthly Managed Retainer
                          </div>
                          <div className="flex items-baseline gap-1.5 mt-1">
                            <span className="currency-symbol text-2xl sm:text-3xl font-bold text-white">
                              {symbol}
                            </span>
                            <span className="price-num text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
                              {(currency === 'INR'
                                ? activeNeed.priceInrMonthly
                                : activeNeed.priceUsdMonthly
                              ).toLocaleString()}
                            </span>
                            <span className="text-xs sm:text-sm font-medium text-zinc-400">
                              / month
                            </span>
                          </div>

                          <div className="mt-2 text-xs text-zinc-400 font-mono">
                            Market Standard:{' '}
                            <span className="line-through">
                              <span className="currency-symbol">{symbol}</span>
                              <span className="price-num">
                                {(currency === 'INR'
                                  ? activeNeed.marketPriceInrMonthly
                                  : activeNeed.marketPriceUsdMonthly
                                ).toLocaleString()}
                              </span>
                              /mo
                            </span>
                          </div>

                          {/* Setup Fee */}
                          <div className="mt-4 pt-4 border-t border-zinc-800 space-y-1">
                            <div className="flex items-baseline justify-between text-xs">
                              <span className="text-zinc-300">
                                One-Time Setup &amp; Architecture:
                              </span>
                              <span className="font-bold text-white text-sm">
                                <span className="currency-symbol">{symbol}</span>
                                <span className="price-num">
                                  {(currency === 'INR'
                                    ? activeNeed.setupFeeInr
                                    : activeNeed.setupFeeUsd
                                  ).toLocaleString()}
                                </span>
                              </span>
                            </div>
                            <div className="flex justify-between text-[11px] text-zinc-400">
                              <span>Industry Market Benchmark:</span>
                              <span className="line-through">
                                <span className="currency-symbol">{symbol}</span>
                                <span className="price-num">
                                  {(currency === 'INR'
                                    ? activeNeed.marketSetupFeeInr
                                    : activeNeed.marketSetupFeeUsd
                                  ).toLocaleString()}
                                </span>
                              </span>
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="text-xs uppercase tracking-wider text-zinc-400">
                            Fixed One-Time Turnkey Package
                          </div>
                          <div className="flex items-baseline gap-1.5 mt-1">
                            <span className="currency-symbol text-2xl sm:text-3xl font-bold text-white">
                              {symbol}
                            </span>
                            <span className="price-num text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
                              {(currency === 'INR'
                                ? activeNeed.setupFeeInr
                                : activeNeed.setupFeeUsd
                              ).toLocaleString()}
                            </span>
                            <span className="text-xs sm:text-sm font-medium text-zinc-400">
                              one-time
                            </span>
                          </div>

                          <div className="mt-2 text-xs text-zinc-400 font-mono">
                            Market Standard:{' '}
                            <span className="line-through">
                              <span className="currency-symbol">{symbol}</span>
                              <span className="price-num">
                                {(currency === 'INR'
                                  ? activeNeed.marketSetupFeeInr
                                  : activeNeed.marketSetupFeeUsd
                                ).toLocaleString()}
                              </span>
                            </span>{' '}
                            (Save ~30%)
                          </div>
                        </>
                      )}
                    </div>

                    {/* Speed & SLA Guarantee */}
                    <div className="p-3.5 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-1.5 text-xs">
                      <div className="flex justify-between text-zinc-300">
                        <span>Speed Guarantee:</span>
                        <span className="font-mono text-emerald-400 font-bold">0.3s Instant Load</span>
                      </div>
                      <div className="flex justify-between text-zinc-300">
                        <span>Codebase:</span>
                        <span className="text-white font-semibold">Custom React + Vite (Zero Bloat)</span>
                      </div>
                      <div className="flex justify-between text-zinc-300">
                        <span>Delivery SLA:</span>
                        <span className="font-mono text-zinc-200">{activeNeed.timeline}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      handleBookPlan(
                        activeNeed.headline,
                        `Enquiry for ${activeNeed.headline} (${activeNeed.needCategory}). Budget Scope: ${symbol}${(currency === 'INR' ? activeNeed.setupFeeInr : activeNeed.setupFeeUsd).toLocaleString()} setup + ${symbol}${(currency === 'INR' ? activeNeed.priceInrMonthly : activeNeed.priceUsdMonthly).toLocaleString()}/mo.`
                      )
                    }
                    className="w-full py-4 text-base sm:text-lg font-extrabold text-zinc-950 bg-white hover:bg-zinc-200 rounded-2xl transition-all flex items-center justify-center gap-2.5 shadow-md cursor-pointer"
                  >
                    <span>{activeNeed.ctaLabel}</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ---------------- MODE 2: 3 ALL-INCLUSIVE MONTHLY PLANS (REDESIGNED & CLEAN) ---------------- */}
        {pricingMode === 'monthly-plans' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {PRICING_PLANS.map((plan, index) => {
              const monthly =
                currency === 'INR' ? plan.monthlyPriceInr : plan.monthlyPriceUsd;
              const marketMonthly =
                currency === 'INR'
                  ? plan.marketMonthlyPriceInr
                  : plan.marketMonthlyPriceUsd;
              const setup =
                currency === 'INR' ? plan.setupFeeInr : plan.setupFeeUsd;
              const marketSetup =
                currency === 'INR'
                  ? plan.marketSetupFeeInr
                  : plan.marketSetupFeeUsd;

              const isPopular = Boolean(plan.popular);
              const savedOnSetup = marketSetup - setup;
              const savedPerMonth = marketMonthly - monthly;

              return (
                <div
                  key={plan.id}
                  className={`relative p-8 rounded-3xl flex flex-col justify-between transition-all duration-300 ${
                    isPopular
                      ? 'bg-zinc-950 text-white border-2 border-zinc-900 shadow-xl'
                      : 'bg-white text-zinc-950 border border-zinc-200 shadow-sm hover:border-zinc-300'
                  }`}
                >
                  <div className="space-y-6">
                    {/* Header: Badge & Delivery */}
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full ${
                          isPopular
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            : 'bg-zinc-100 text-zinc-700 border border-zinc-200'
                        }`}
                      >
                        {isPopular ? 'Most Popular · 30% Off' : `Tier 0${index + 1} · 30% Below Market`}
                      </span>
                      <span
                        className={`text-xs font-mono ${
                          isPopular ? 'text-zinc-400' : 'text-zinc-500'
                        }`}
                      >
                        {plan.deliveryTimeline}
                      </span>
                    </div>

                    <div>
                      <h3
                        className={`text-2xl font-extrabold font-[Outfit] tracking-tight ${
                          isPopular ? 'text-white' : 'text-zinc-950'
                        }`}
                      >
                        {plan.name}
                      </h3>
                      <p
                        className={`text-xs sm:text-sm mt-1.5 leading-relaxed ${
                          isPopular ? 'text-zinc-300' : 'text-zinc-600'
                        }`}
                      >
                        {plan.tagline}
                      </p>
                    </div>

                    {/* Price Block: Crisp Sans-Serif Numbers */}
                    <div
                      className={`p-5 rounded-2xl border ${
                        isPopular
                          ? 'bg-zinc-900/90 border-zinc-800'
                          : 'bg-zinc-50 border-zinc-200'
                      }`}
                    >
                      <div className="text-[11px] font-mono text-zinc-400 flex justify-between items-center mb-1">
                        <span>Market Standard:</span>
                        <span className="line-through">
                          <span className="currency-symbol">{symbol}</span>
                          <span className="price-num">{marketMonthly.toLocaleString()}</span>
                          /mo
                        </span>
                      </div>

                      <div className="flex items-baseline gap-1">
                        <span
                          className={`currency-symbol text-2xl font-bold ${
                            isPopular ? 'text-white' : 'text-zinc-950'
                          }`}
                        >
                          {symbol}
                        </span>
                        <span
                          className={`price-num text-4xl sm:text-5xl font-extrabold tracking-tight ${
                            isPopular ? 'text-white' : 'text-zinc-950'
                          }`}
                        >
                          {monthly.toLocaleString()}
                        </span>
                        <span
                          className={`text-xs font-medium ml-1 ${
                            isPopular ? 'text-zinc-400' : 'text-zinc-500'
                          }`}
                        >
                          / month
                        </span>
                      </div>

                      <div className="mt-3 pt-3 border-t border-zinc-200/50 dark:border-zinc-800 flex items-center justify-between text-xs font-mono">
                        <span className={isPopular ? 'text-zinc-300' : 'text-zinc-700'}>
                          + <span className="currency-symbol">{symbol}</span>
                          <span className="price-num">{setup.toLocaleString()}</span> setup
                        </span>
                        <span className="text-emerald-500 font-bold">
                          Save <span className="currency-symbol">{symbol}</span>
                          <span className="price-num">{savedOnSetup.toLocaleString()}</span>
                        </span>
                      </div>
                    </div>

                    {/* SLA Specs */}
                    <div
                      className={`p-3.5 rounded-xl text-xs space-y-1.5 ${
                        isPopular ? 'bg-zinc-900/50 text-zinc-300' : 'bg-zinc-50 text-zinc-700'
                      }`}
                    >
                      <div className="flex justify-between">
                        <span className="text-zinc-400">Revisions:</span>
                        <span className="font-semibold">{plan.revisions}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-400">Support:</span>
                        <span className="font-semibold">{plan.supportLevel}</span>
                      </div>
                    </div>

                    {/* Features Bullet List */}
                    <ul className="space-y-2.5 text-xs">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <Check
                            className={`w-4 h-4 shrink-0 mt-0.5 ${
                              isPopular ? 'text-emerald-400' : 'text-emerald-600'
                            }`}
                          />
                          <span
                            className={`leading-relaxed font-medium ${
                              isPopular ? 'text-zinc-200' : 'text-zinc-700'
                            }`}
                          >
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      handleBookPlan(
                        `${plan.name} Plan`,
                        `Booking inquiry for ${plan.name} Plan (${symbol}${monthly.toLocaleString()}/mo + ${symbol}${setup.toLocaleString()} setup).`
                      )
                    }
                    className={`w-full mt-8 py-4 text-sm sm:text-base font-extrabold rounded-2xl transition-all flex items-center justify-center gap-2.5 cursor-pointer ${
                      isPopular
                        ? 'bg-white text-zinc-950 hover:bg-zinc-200 shadow-md'
                        : 'bg-zinc-950 text-white hover:bg-zinc-800 shadow-md'
                    }`}
                  >
                    <span>{plan.ctaText}</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {/* ---------------- SEO & AI SEARCH ENGINE OPTIMIZATION ACCORDION & TELEMETRY ---------------- */}
        <div className="mt-16 pt-12 border-t border-zinc-200">
          <div className="max-w-3xl mb-8">
            <div className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-1">
              AI-Search &amp; Google Transparency
            </div>
            <h3 className="text-2xl font-bold text-zinc-950 font-[Outfit]">
              Frequently Asked Questions About Kexora Pricing
            </h3>
            <p className="text-xs sm:text-sm text-zinc-600 mt-1">
              Structured for direct quotation by Google Search, Perplexity, and ChatGPT search algorithms with zero ambiguity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-5 rounded-2xl bg-white border border-zinc-200 space-y-2">
              <h4 className="font-bold text-zinc-950 text-sm font-[Outfit]">
                Why is Kexora guaranteed 30% cheaper than industry standard rates?
              </h4>
              <p className="text-zinc-600 leading-relaxed">
                Kexora is an engineer-led studio founded by Rajan Singh (CEO) and Aditya Singh (CTO) based in Siwan, Bihar. Because your project is developed directly in-house with zero commissioned salespeople, middleman agencies, or expensive metropolitan office leases, 100% of your budget goes directly into writing clean code.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-zinc-200 space-y-2">
              <h4 className="font-bold text-zinc-950 text-sm font-[Outfit]">
                What is included in the ₹999/month Beginner vs ₹2,499/month Creative Plan?
              </h4>
              <p className="text-zinc-600 leading-relaxed">
                The Beginner Plan (₹999/mo + ₹8,000 setup) covers single-page landing pages and portfolios with 0.3s load speed. The Creative Plan (₹2,499/mo + ₹18,000 setup) includes 5 to 10 custom pages, Apple-style smart dropdown enquiry systems, 2–3 design iterations, Schema.org sitelinks, and Google My Business Top 3 optimization.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-zinc-200 space-y-2">
              <h4 className="font-bold text-zinc-950 text-sm font-[Outfit]">
                Can I order a single individual service without a monthly plan?
              </h4>
              <p className="text-zinc-600 leading-relaxed">
                Yes! Every one of our 24 services (such as GST Registration for ₹1,499, Logo Design for ₹1,499, or Android App Development from ₹24,999) can be booked as a standalone one-time task with no monthly commitment.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-zinc-200 space-y-2">
              <h4 className="font-bold text-zinc-950 text-sm font-[Outfit]">
                What is the 0.3s PageSpeed and 99+ Core Web Vitals guarantee?
              </h4>
              <p className="text-zinc-600 leading-relaxed">
                Unlike slow WordPress and Shopify templates that bundle 5+ MB of scripts, Kexora builds custom code (React, Next.js, Tailwind) that loads in under 300 milliseconds. If your custom website fails our 90+ mobile Core Web Vitals SLA upon launch, we optimize it at zero extra charge.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

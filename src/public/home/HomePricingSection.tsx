import React, { useState } from 'react';
import { ActiveTab, ServiceTierId } from '../../types';
import { KEXORA_THEME, BlurKex } from '../universal';
import { PRICING_PLANS, INDIVIDUAL_SERVICE_PRICING } from '../../data/agencyData';
import {
  buildQuotationForServiceTier,
  formatTierOptionValue,
  getServiceTiers,
  TIER_ORDER,
} from '../../data/tieredPricingEngine';
import { ArrowRight, ArrowUpRight, Check } from 'lucide-react';

interface HomePricingSectionProps {
  openContactModal: (serviceName?: string, details?: string) => void;
  onNavigatePage: (page: ActiveTab) => void;
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

export const HomePricingSection: React.FC<HomePricingSectionProps> = ({
  openContactModal,
  onNavigatePage,
}) => {
  const [selectedNeedId, setSelectedNeedId] = useState<string>('web-dev');
  const [homeActiveTier, setHomeActiveTier] = useState<ServiceTierId>('standard');
  const [homeCardTiers, setHomeCardTiers] = useState<Record<string, ServiceTierId>>({});

  const needServices = INDIVIDUAL_SERVICE_PRICING.filter(
    (item) => item.pillarId === selectedNeedId
  ).slice(0, 4);

  return (
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
                Step 1 · Select Requirement &amp; Tier (Basic · Standard · Premium)
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-zinc-950 font-[Outfit] mt-1">
                Instant 3-Tier Service Rate Finder
              </h3>
            </div>

            {/* 4 Need Category Tabs + 3-Tier Switcher */}
            <div className="flex flex-wrap items-center gap-3">
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

              <div className="inline-flex items-center p-1 bg-white rounded-xl border border-zinc-200">
                {(
                  [
                    { id: 'basic', label: 'Basic (Sasta)' },
                    { id: 'standard', label: 'Standard (Middle)' },
                    { id: 'premium', label: 'Premium (Max)' },
                  ] as const
                ).map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => {
                      setHomeActiveTier(t.id);
                      setHomeCardTiers({});
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      homeActiveTier === t.id &&
                      Object.keys(homeCardTiers).length === 0
                        ? 'bg-zinc-950 text-white'
                        : 'text-zinc-600 hover:text-zinc-950'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 4 Matching Service Cards for the Selected Need (Each with Basic, Standard, Premium Tiers) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {needServices.map((item, idx) => {
              const tiers = getServiceTiers(item.id);
              const cardTierId = homeCardTiers[item.id] || homeActiveTier;
              const activeTier = tiers[cardTierId];
              const savedInr =
                activeTier.marketPriceInr - activeTier.kexoraPriceInr;

              return (
                <BlurKex
                  key={item.id}
                  direction="up"
                  staggerIndex={idx}
                  blurPx={12}
                  className="rounded-2xl bg-white border border-zinc-200/90 hover:border-zinc-950 p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2 text-[11px] font-mono text-zinc-500">
                      <span>{item.billingLabel}</span>
                      <span className="font-bold text-zinc-950">
                        {activeTier.turnaround}
                      </span>
                    </div>

                    <h4 className="text-base sm:text-lg font-extrabold text-zinc-950 font-[Outfit] leading-snug">
                      {item.title}
                    </h4>

                    {/* In-Card Basic / Standard / Premium Switcher */}
                    <div className="grid grid-cols-3 gap-1 p-1 rounded-xl bg-[#F4F4F6] border border-zinc-200/80">
                      {TIER_ORDER.map((tId) => {
                        const pkg = tiers[tId];
                        const isCurrent = cardTierId === tId;
                        return (
                          <button
                            key={tId}
                            type="button"
                            onClick={() =>
                              setHomeCardTiers((prev) => ({
                                ...prev,
                                [item.id]: tId,
                              }))
                            }
                            className={`py-1.5 px-1 rounded-lg text-center transition-all cursor-pointer ${
                              isCurrent
                                ? 'bg-zinc-950 text-white font-extrabold shadow-xs'
                                : 'text-zinc-600 hover:text-zinc-950'
                            }`}
                          >
                            <div className="text-[10px] font-bold leading-none">
                              {pkg.tierLabel}
                            </div>
                            <div className="text-[10px] price-num font-extrabold mt-0.5">
                              <span className="currency-symbol">₹</span>
                              {pkg.kexoraPriceInr.toLocaleString('en-IN')}
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    {/* Crisp Sans-Serif Currency & Numerals */}
                    <div className="p-3.5 rounded-xl bg-[#F8F8FA] border border-zinc-200/70 space-y-1">
                      <div className="flex items-center justify-between text-[11px] text-zinc-500">
                        <span className="line-through price-num">
                          Market:{' '}
                          <span className="currency-symbol">₹</span>
                          {activeTier.marketPriceInr.toLocaleString('en-IN')}
                        </span>
                        <span className="font-extrabold text-emerald-700 price-num">
                          Save <span className="currency-symbol">₹</span>
                          {savedInr.toLocaleString('en-IN')}
                        </span>
                      </div>
                      <div className="text-2xl font-black text-zinc-950 price-num tracking-tight">
                        <span className="currency-symbol">₹</span>
                        {activeTier.kexoraPriceInr.toLocaleString('en-IN')}
                        {item.billingCycle === 'monthly' && (
                          <span className="text-xs font-semibold text-zinc-500">
                            {' '}
                            /mo
                          </span>
                        )}
                      </div>
                    </div>

                    <p className="text-xs text-zinc-600 leading-relaxed">
                      {activeTier.subtitle}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      const quote = buildQuotationForServiceTier(
                        item.title,
                        formatTierOptionValue(cardTierId),
                        'INR'
                      );
                      openContactModal(
                        `${item.title} — ${activeTier.tierLabel} Tier`,
                        quote.formattedBrief
                      );
                    }}
                    className="mt-5 w-full py-3 px-4 rounded-xl bg-zinc-950 hover:bg-zinc-800 text-white text-xs sm:text-sm font-extrabold transition-colors flex items-center justify-center gap-1.5 whitespace-nowrap cursor-pointer"
                  >
                    <span>Book {activeTier.tierLabel} Quote</span>
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
  );
};

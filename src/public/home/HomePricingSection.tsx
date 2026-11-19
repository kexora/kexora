import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
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
  { id: 'web-dev', label: 'Websites & E-Commerce' },
  { id: 'app-game', label: 'Mobile Apps & Games' },
  { id: 'seo-marketing', label: 'Google SEO & AI-SEO' },
  { id: 'creative-business', label: 'Branding & GST / ISO' },
] as const;

const TIER_SWITCH_OPTIONS: { id: ServiceTierId; label: string }[] = [
  { id: 'basic', label: 'Basic' },
  { id: 'standard', label: 'Standard' },
  { id: 'premium', label: 'Premium' },
];

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
      className="py-20 sm:py-28 bg-white border-b border-zinc-200/80"
    >
      <div className={KEXORA_THEME.classes.container}>
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 sm:gap-8 mb-12 sm:mb-14">
          <BlurKex direction="up" blurPx={10} className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-zinc-100 border border-zinc-200/90 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-zinc-700">
              <span>03</span>
              <span aria-hidden="true" className="text-zinc-400">·</span>
              <span>Transparent Studio Pricing · 30% Below Market</span>
            </div>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-zinc-950 font-[Outfit] leading-[1.08]"
              style={{ textWrap: 'balance' }}
            >
              Pricing Built Around Your Exact Need
            </h2>
            <p className="text-sm sm:text-base text-zinc-600 leading-relaxed">
              Pick a single standalone service with Basic, Standard, or Premium scope—or launch with our all-in-one monthly studio retainers.
            </p>
          </BlurKex>

          <BlurKex direction="left" delay={0.06} blurPx={10} className="shrink-0">
            <motion.button
              type="button"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onNavigatePage('pricing')}
              className="px-6 sm:px-7 py-3.5 text-sm sm:text-base font-extrabold text-white bg-zinc-950 hover:bg-zinc-800 rounded-full transition-colors inline-flex items-center gap-2.5 whitespace-nowrap shrink-0 shadow-md cursor-pointer"
            >
              <span>Full 24-Service Price List</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </BlurKex>
        </div>

        {/* Clean Un-nested Pill Control Bar: Floating Need Pills + Sliding Tier Pill */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
          {/* 4 Floating Need Category Pills */}
          <div
            role="tablist"
            aria-label="Service requirement category"
            className="flex flex-wrap items-center gap-2.5"
          >
            {HOME_NEED_CATEGORIES.map((cat) => {
              const active = selectedNeedId === cat.id;
              return (
                <motion.button
                  key={cat.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setSelectedNeedId(cat.id)}
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  className={`px-4 sm:px-5 py-2.5 rounded-full border text-xs sm:text-sm font-extrabold transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                    active
                      ? 'bg-zinc-950 text-white border-zinc-950 shadow-md'
                      : 'bg-white text-zinc-700 border-zinc-200/90 hover:border-zinc-950 hover:text-zinc-950'
                  }`}
                >
                  {cat.label}
                </motion.button>
              );
            })}
          </div>

          {/* Sliding Capsule Tier Switcher */}
          <div
            role="group"
            aria-label="Global scope tier"
            className="inline-flex items-center p-1 bg-zinc-100 rounded-full border border-zinc-200/80 self-start lg:self-auto"
          >
            {TIER_SWITCH_OPTIONS.map((t) => {
              const isSelected =
                homeActiveTier === t.id &&
                Object.keys(homeCardTiers).length === 0;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => {
                    setHomeActiveTier(t.id);
                    setHomeCardTiers({});
                  }}
                  className={`relative px-4 py-2 rounded-full text-xs font-extrabold transition-colors whitespace-nowrap cursor-pointer ${
                    isSelected
                      ? 'text-white'
                      : 'text-zinc-600 hover:text-zinc-950'
                  }`}
                >
                  {isSelected && (
                    <motion.span
                      layoutId="home-global-tier-pill"
                      transition={{ type: 'spring', stiffness: 460, damping: 34 }}
                      className="absolute inset-0 rounded-full bg-zinc-950 shadow-xs"
                    />
                  )}
                  <span className="relative z-10">{t.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 4 Clean Single-Elevation Standalone Service Rate Cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedNeedId}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16 sm:mb-20"
          >
            {needServices.map((item) => {
              const tiers = getServiceTiers(item.id);
              const cardTierId = homeCardTiers[item.id] || homeActiveTier;
              const activeTier = tiers[cardTierId];
              const savedInr =
                activeTier.marketPriceInr - activeTier.kexoraPriceInr;

              return (
                <div
                  key={item.id}
                  className="group rounded-[2rem] bg-[#F8F8FA] hover:bg-white border border-zinc-200/90 hover:border-zinc-950 p-6 flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_20px_48px_-20px_rgba(0,0,0,0.12)]"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between gap-2 text-[11px] font-medium text-zinc-500">
                      <span>{item.billingLabel}</span>
                      <span className="font-bold text-zinc-950 tabular-nums">
                        {activeTier.turnaround}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-extrabold text-zinc-950 font-[Outfit] leading-snug">
                      {item.title}
                    </h3>

                    {/* Pill-Shaped Per-Card Tier Switcher */}
                    <div className="grid grid-cols-3 gap-1 p-1 rounded-full bg-white border border-zinc-200/90">
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
                            className={`py-1.5 px-1 rounded-full text-[11px] font-extrabold transition-all cursor-pointer ${
                              isCurrent
                                ? 'bg-zinc-950 text-white shadow-xs'
                                : 'text-zinc-600 hover:text-zinc-950'
                            }`}
                          >
                            {pkg.tierLabel}
                          </button>
                        );
                      })}
                    </div>

                    {/* Clean Unboxed Price Readout */}
                    <div className="pt-2 pb-3 border-b border-zinc-200/80 space-y-1">
                      <div className="flex items-center justify-between text-[11px] text-zinc-500">
                        <span className="line-through price-num tabular-nums">
                          <span className="currency-symbol">₹</span>
                          {activeTier.marketPriceInr.toLocaleString('en-IN')}
                        </span>
                        <span className="font-extrabold text-zinc-950 price-num tabular-nums">
                          Save <span className="currency-symbol">₹</span>
                          {savedInr.toLocaleString('en-IN')}
                        </span>
                      </div>
                      <div className="text-2xl sm:text-[1.75rem] font-black text-zinc-950 price-num tabular-nums tracking-tight">
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

                  <motion.button
                    type="button"
                    whileTap={{ scale: 0.98 }}
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
                    className="mt-6 w-full py-3 px-4 rounded-full bg-white group-hover:bg-zinc-950 text-zinc-950 group-hover:text-white border border-zinc-300 group-hover:border-zinc-950 text-xs sm:text-sm font-extrabold transition-all flex items-center justify-center gap-1.5 whitespace-nowrap cursor-pointer"
                  >
                    <span>Book {activeTier.tierLabel} Quote</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </motion.button>
                </div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* Sub-heading Divider for All-In-One Studio Plans */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-8 mb-8 border-b border-zinc-200/80">
          <div className="space-y-1.5">
            <div className="text-xs font-extrabold uppercase tracking-[0.16em] text-zinc-500">
              All-In-One Monthly Studio Retainers
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-zinc-950 font-[Outfit]">
              Managed Website, App &amp; Growth Plans
            </h3>
          </div>
          <span className="text-xs sm:text-sm text-zinc-500 font-medium">
            Includes hosting support, updates, SEO &amp; direct team access
          </span>
        </div>

        {/* 3-Tier Flagship Studio Plans Deck */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-7">
          {PRICING_PLANS.map((plan, idx) => {
            const isDark = Boolean(plan.popular);
            return (
              <BlurKex
                key={plan.id}
                direction="up"
                staggerIndex={idx}
                blurPx={10}
                className="h-full"
              >
                <div
                  className={`h-full rounded-[2.25rem] p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 ${
                    isDark
                      ? 'bg-zinc-950 text-white border border-zinc-950 shadow-[0_24px_60px_-20px_rgba(9,9,11,0.4)]'
                      : 'bg-[#F8F8FA] hover:bg-white text-zinc-950 border border-zinc-200/90 hover:border-zinc-950 hover:shadow-[0_20px_48px_-20px_rgba(0,0,0,0.1)]'
                  }`}
                >
                  <div className="space-y-5">
                    <div className="flex items-center justify-between gap-2 text-xs">
                      <span
                        className={`font-semibold tabular-nums ${
                          isDark ? 'text-zinc-300' : 'text-zinc-500'
                        }`}
                      >
                        {plan.deliveryTimeline}
                      </span>
                      {isDark && (
                        <span className="inline-flex items-center rounded-full bg-white text-zinc-950 px-3 py-1 text-[11px] font-extrabold">
                          Most Popular
                        </span>
                      )}
                    </div>

                    <div>
                      <h4
                        className={`text-2xl font-extrabold font-[Outfit] ${
                          isDark ? 'text-white' : 'text-zinc-950'
                        }`}
                      >
                        {plan.name}
                      </h4>
                      <p
                        className={`text-xs sm:text-sm mt-1.5 leading-relaxed ${
                          isDark ? 'text-zinc-300' : 'text-zinc-600'
                        }`}
                      >
                        {plan.tagline}
                      </p>
                    </div>

                    {/* Clean Hairline-Separated Price Readout (No Heavy Nested Box) */}
                    <div
                      className={`py-4 border-y space-y-1.5 ${
                        isDark ? 'border-zinc-800' : 'border-zinc-200/80'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs">
                        <span className="line-through text-zinc-400 price-num tabular-nums">
                          Market: <span className="currency-symbol">₹</span>
                          {plan.marketMonthlyPriceInr.toLocaleString('en-IN')}/mo
                        </span>
                        <span
                          className={`font-extrabold ${
                            isDark ? 'text-white' : 'text-zinc-950'
                          }`}
                        >
                          Save 30%
                        </span>
                      </div>
                      <div className="flex items-baseline gap-1.5">
                        <span
                          className={`text-3xl sm:text-4xl font-black price-num tabular-nums tracking-tight ${
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
                        className={`text-xs price-num tabular-nums ${
                          isDark ? 'text-zinc-400' : 'text-zinc-500'
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
                          <span
                            className={`w-5 h-5 rounded-full inline-flex items-center justify-center shrink-0 mt-0.5 ${
                              isDark
                                ? 'bg-white/15 text-white'
                                : 'bg-zinc-950 text-white'
                            }`}
                          >
                            <Check className="w-3 h-3" />
                          </span>
                          <span className={isDark ? 'text-zinc-200' : 'text-zinc-700'}>
                            {feat}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <motion.button
                    type="button"
                    whileTap={{ scale: 0.98 }}
                    onClick={() =>
                      openContactModal(
                        plan.name,
                        `Selected ${plan.name}: ₹${plan.monthlyPriceInr.toLocaleString('en-IN')}/month + ₹${plan.setupFeeInr.toLocaleString('en-IN')} setup`
                      )
                    }
                    className={`mt-7 w-full py-3.5 px-6 rounded-full text-sm sm:text-base font-extrabold transition-colors flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer ${
                      isDark
                        ? 'bg-white text-zinc-950 hover:bg-zinc-200'
                        : 'bg-zinc-950 text-white hover:bg-zinc-800'
                    }`}
                  >
                    <span>{plan.ctaText}</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </motion.button>
                </div>
              </BlurKex>
            );
          })}
        </div>
      </div>
    </section>
  );
};

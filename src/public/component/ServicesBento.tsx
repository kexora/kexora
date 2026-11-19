import React, { useState } from 'react';
import { SERVICES_DATA, KEXORA_SERVICE_PILLARS } from '../../data/agencyData';
import {
  buildQuotationForServiceTier,
  formatTierOptionValue,
  getServiceTiers,
  TIER_ORDER,
} from '../../data/tieredPricingEngine';
import { ServiceTierId } from '../../types';
import { KEXORA_THEME } from './theme';
import { BlurKex } from '../../effect';
import {
  Zap,
  Code2,
  Search,
  Palette,
  ShoppingBag,
  ShieldCheck,
  ArrowUpRight,
  ArrowRight,
  Check,
} from 'lucide-react';

interface ServicesBentoProps {
  onSelectService: (serviceTitle: string, details?: string) => void;
  onViewAllPage?: () => void;
}

export const ServicesBento: React.FC<ServicesBentoProps> = ({
  onSelectService,
  onViewAllPage,
}) => {
  const [selectedTiers, setSelectedTiers] = useState<
    Record<string, ServiceTierId>
  >({});

  const getTierForService = (serviceId: string): ServiceTierId => {
    return selectedTiers[serviceId] || 'standard';
  };

  const setTierForService = (serviceId: string, tierId: ServiceTierId) => {
    setSelectedTiers((prev) => ({
      ...prev,
      [serviceId]: tierId,
    }));
  };

  const getIcon = (iconName: string) => {
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

  return (
    <section id="services" className={KEXORA_THEME.classes.sectionWhite}>
      <div className={KEXORA_THEME.classes.container}>
        {/* Clean Modern Section Header */}
        <BlurKex
          direction="up"
          blurPx={14}
          className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6"
        >
          <div className="max-w-2xl">
            <div className={KEXORA_THEME.classes.kicker}>
              What We Do · 3-Tier Studio Packages (Basic, Standard &amp; Premium)
            </div>
            <h2
              className={KEXORA_THEME.classes.heading2}
              style={{ textWrap: 'balance' }}
            >
              Everything You Need to Build &amp; Grow — With 3 Tiers for Every Budget
            </h2>
            <p className={`${KEXORA_THEME.classes.subtitle} mt-3`}>
              Switch between <strong>Basic</strong> (Sabse Sasta), <strong>Standard</strong> (Middle), and <strong>Premium</strong> (Max) on any capability below to inspect deliverables and request an instant quotation.
            </p>
          </div>

          {onViewAllPage && (
            <button
              type="button"
              onClick={onViewAllPage}
              className={KEXORA_THEME.classes.btnSecondaryOutline}
            >
              <span>Explore All Services</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </BlurKex>

        {/* Modern 3-Column Service Cards with Interactive 3-Tier Switcher */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 mb-14">
          {SERVICES_DATA.map((service, idx) => {
            const tiers = getServiceTiers(service.title);
            const activeTierId = getTierForService(service.id);
            const activeTier = tiers[activeTierId];
            const savedInr =
              activeTier.marketPriceInr - activeTier.kexoraPriceInr;

            return (
              <BlurKex
                key={service.id}
                as="article"
                direction="up"
                staggerIndex={idx}
                blurPx={14}
                className={`group p-7 sm:p-8 flex flex-col justify-between ${KEXORA_THEME.classes.cardOnWhite}`}
              >
                <div>
                  {/* Top Icon & Number Row */}
                  <div className="flex items-center justify-between gap-4 mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-zinc-950 text-white flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform duration-300">
                      {getIcon(service.iconName)}
                    </div>
                    <span className="text-xs font-mono font-bold text-zinc-400 group-hover:text-zinc-950 transition-colors tabular-nums">
                      {service.index} / 06 · {activeTier.turnaround}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-extrabold text-zinc-950 font-[Outfit] leading-snug mb-3">
                    {service.title}
                  </h3>

                  {/* 3-Tier Switcher (Basic | Standard | Premium) */}
                  <div className="grid grid-cols-3 gap-1.5 p-1 rounded-2xl bg-[#F4F4F6] border border-zinc-200/80 mb-4">
                    {TIER_ORDER.map((tId) => {
                      const pkg = tiers[tId];
                      const isCurrent = activeTierId === tId;
                      return (
                        <button
                          key={tId}
                          type="button"
                          onClick={() => setTierForService(service.id, tId)}
                          className={`py-2 px-2 rounded-xl text-center transition-all cursor-pointer ${
                            isCurrent
                              ? 'bg-zinc-950 text-white shadow-xs font-extrabold'
                              : 'text-zinc-600 hover:text-zinc-950'
                          }`}
                        >
                          <div className="text-[11px] font-bold leading-none">
                            {pkg.tierLabel}
                          </div>
                          <div className="text-[11px] price-num font-extrabold mt-1">
                            <span className="currency-symbol">₹</span>
                            {pkg.kexoraPriceInr.toLocaleString('en-IN')}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Active Tier Price Box */}
                  <div className="p-3.5 rounded-2xl bg-[#FAFAFB] border border-zinc-200/80 mb-4 flex items-center justify-between gap-2">
                    <div>
                      <div className="text-[11px] font-mono text-zinc-500">
                        {activeTier.tierLabel} Studio Rate:
                      </div>
                      <div className="text-2xl font-black text-zinc-950 price-num">
                        <span className="currency-symbol">₹</span>
                        {activeTier.kexoraPriceInr.toLocaleString('en-IN')}
                      </div>
                    </div>
                    <div className="text-right font-mono text-[11px]">
                      <div className="line-through text-zinc-400 price-num">
                        Market: <span className="currency-symbol">₹</span>
                        {activeTier.marketPriceInr.toLocaleString('en-IN')}
                      </div>
                      <div className="font-bold text-emerald-700 price-num">
                        Save <span className="currency-symbol">₹</span>
                        {savedInr.toLocaleString('en-IN')}
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-zinc-600 leading-relaxed mb-4">
                    {activeTier.subtitle}
                  </p>

                  {/* Clean Key Deliverables */}
                  <ul className="space-y-2 mb-6 text-xs text-zinc-700 pt-4 border-t border-zinc-200/80">
                    {activeTier.deliverables.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-zinc-950 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card Footer CTA */}
                <div className="pt-4 border-t border-zinc-200/80 flex items-center justify-between gap-3">
                  <span className="text-[11px] font-mono text-zinc-500 tabular-nums truncate">
                    {activeTier.revisions}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      const quote = buildQuotationForServiceTier(
                        service.title,
                        formatTierOptionValue(activeTierId),
                        'INR'
                      );
                      onSelectService(
                        `${service.title} — ${activeTier.tierLabel} Tier`,
                        quote.formattedBrief
                      );
                    }}
                    className="px-4 py-2.5 text-xs font-extrabold text-white bg-zinc-950 hover:bg-zinc-800 rounded-full flex items-center gap-1.5 whitespace-nowrap shrink-0 transition-all duration-300 cursor-pointer"
                  >
                    <span>Book {activeTier.tierLabel} Quote</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </BlurKex>
            );
          })}
        </div>

        {/* Sleek Monochrome 4-Pillar Complete Service Catalog (With Starting Basic Tier Rate) */}
        <BlurKex
          direction="up"
          blurPx={16}
          className="p-8 sm:p-10 lg:p-12 rounded-3xl bg-zinc-950 text-white shadow-xl"
        >
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-8 mb-8 border-b border-zinc-800">
            <div>
              <div className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400 mb-2">
                Complete 24-Service Directory · Basic, Standard &amp; Premium
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-[Outfit]">
                All 24 Services With 3-Tier Live Quotations
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-md">
              Click any service below to open its Basic, Standard, and Premium quotation inside our Contact Desk.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {KEXORA_SERVICE_PILLARS.map((pillar) => (
              <div key={pillar.category} className="space-y-4">
                <h4 className="text-sm font-extrabold text-white pb-2.5 border-b border-zinc-800 font-[Outfit]">
                  {pillar.category}
                </h4>
                <ul className="space-y-3 text-xs sm:text-sm text-zinc-300">
                  {pillar.items.map((item) => {
                    const t = getServiceTiers(item);
                    return (
                      <li key={item}>
                        <button
                          type="button"
                          onClick={() => {
                            const quote = buildQuotationForServiceTier(
                              item,
                              formatTierOptionValue('standard'),
                              'INR'
                            );
                            onSelectService(
                              `${item} — Standard Tier`,
                              quote.formattedBrief
                            );
                          }}
                          className="w-full text-left hover:text-white transition-colors flex items-start justify-between gap-2 group cursor-pointer"
                        >
                          <span className="group-hover:underline underline-offset-4 leading-snug">
                            {item}
                          </span>
                          <span className="text-[11px] font-mono text-emerald-400 shrink-0 price-num">
                            <span className="currency-symbol">₹</span>
                            {t.basic.kexoraPriceInr.toLocaleString('en-IN')}+
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </BlurKex>
      </div>
    </section>
  );
};

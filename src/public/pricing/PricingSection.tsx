import React, { useState, useMemo } from 'react';
import {
  INDIVIDUAL_SERVICE_PRICING,
  KEXORA_SERVICE_PILLARS,
} from '../../data/agencyData';
import {
  buildQuotationForServiceTier,
  findServicePricingItem,
  formatTierOptionValue,
  getServiceTiers,
  TIER_ORDER,
} from '../../data/tieredPricingEngine';
import { CurrencyCode, ServiceTierId } from '../../types';
import { BlurKex, Dropdown, DropdownGroup } from '../universal';
import {
  Check,
  ArrowRight,
  ShieldCheck,
  Clock,
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
}) => {
  const [internalCurrency] = useState<CurrencyCode>('INR');
  const [selectedServiceTitle, setSelectedServiceTitle] = useState<string>(
    INDIVIDUAL_SERVICE_PRICING[0].title
  );

  const currency = externalCurrency ?? internalCurrency;
  const symbol = currency === 'INR' ? '₹' : '$';

  // Resolve the active service item and its 3 tiers (Basic, Standard, Premium)
  const activeService = useMemo(
    () => findServicePricingItem(selectedServiceTitle),
    [selectedServiceTitle]
  );

  const activeTiers = useMemo(
    () => getServiceTiers(activeService.id),
    [activeService.id]
  );

  // Build grouped options for our signature <Dropdown /> component containing all 24 services + 4 main pillars
  const serviceDropdownGroups: DropdownGroup[] = useMemo(() => {
    const buildPillarGroup = (
      pillarId: 'web-dev' | 'app-game' | 'seo-marketing' | 'creative-business',
      label: string
    ): DropdownGroup => ({
      label,
      options: INDIVIDUAL_SERVICE_PRICING.filter(
        (srv) => srv.pillarId === pillarId
      ).map((srv) => {
        const t = getServiceTiers(srv.id);
        const basicPrice =
          currency === 'INR' ? t.basic.kexoraPriceInr : t.basic.kexoraPriceUsd;
        const premPrice =
          currency === 'INR'
            ? t.premium.kexoraPriceInr
            : t.premium.kexoraPriceUsd;
        return {
          value: srv.title,
          label: `${srv.index}. ${srv.title}`,
          sublabel: `${symbol}${basicPrice.toLocaleString()} – ${symbol}${premPrice.toLocaleString()}`,
        };
      }),
    });

    return [
      buildPillarGroup(
        'web-dev',
        '01 · Web Design & Development (6 Services)'
      ),
      buildPillarGroup(
        'app-game',
        '02 · App & Game Development (6 Services)'
      ),
      buildPillarGroup(
        'seo-marketing',
        '03 · Digital Marketing & SEO (6 Services)'
      ),
      buildPillarGroup(
        'creative-business',
        '04 · Creative & Business Services (6 Services)'
      ),
      {
        label: '4 Main Studio Pillars',
        options: KEXORA_SERVICE_PILLARS.map((p, idx) => ({
          value: p.category,
          label: `Pillar 0${idx + 1}: ${p.category}`,
          sublabel: '3 Tiers Available',
        })),
      },
    ];
  }, [currency, symbol]);

  const handleBookServiceTier = (tierId: ServiceTierId) => {
    if (!openContactModalWithService) return;
    const tierPkg = activeTiers[tierId];
    const quote = buildQuotationForServiceTier(
      activeService.title,
      formatTierOptionValue(tierId),
      currency
    );
    openContactModalWithService(
      `${activeService.title} — ${tierPkg.tierLabel} Tier`,
      quote.formattedBrief
    );
  };

  return (
    <section id="pricing" className="py-20 bg-zinc-50 text-zinc-950 border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header & Value Proposition */}
        <BlurKex
          direction="up"
          blurPx={14}
          className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6"
        >
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold mb-3 shadow-xs">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>3-Tier Studio Pricing · Basic, Standard &amp; Premium Across Every Service</span>
            </div>
            <h2
              className="text-3xl sm:text-5xl font-extrabold tracking-tight text-zinc-950 font-[Outfit] leading-[1.14]"
              style={{ textWrap: 'balance' }}
            >
              Select Any Service to Compare Its Basic, Standard &amp; Premium Tiers
            </h2>
            <p className="mt-3 text-sm sm:text-base text-zinc-600 leading-relaxed max-w-2xl">
              Pick any of our 24 company services from the dropdown below to immediately inspect its 3 pricing tiers—from <strong>Basic</strong> (Sabse Sasta) to <strong>Standard</strong> (Middle) to <strong>Premium</strong> (Max).
            </p>
          </div>

          {onViewAllPage && (
            <div className="flex flex-wrap items-center gap-3 shrink-0 self-start lg:self-end">
              <button
                type="button"
                onClick={onViewAllPage}
                className="px-5 py-2.5 text-sm font-bold text-zinc-950 bg-white hover:bg-zinc-100 border border-zinc-300 rounded-2xl transition-all flex items-center gap-2 shadow-xs whitespace-nowrap cursor-pointer"
              >
                <span>View All 24 Services</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </BlurKex>

        {/* ---------------- DROPDOWN SERVICE SELECTOR + 3 TIERS (BASIC / STANDARD / PREMIUM) ---------------- */}
        <div className="space-y-8">
            {/* Signature Frosted-Glass Dropdown Selector Card */}
            <div className="relative z-30 p-6 sm:p-8 rounded-3xl bg-white border border-zinc-200/90 shadow-sm">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
                {/* Left Column: Custom Kexora Dropdown with All 24 Services */}
                <div className="lg:col-span-7 space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-700">
                      Step 1 · Choose Any Kexora Service (All 24 Services)
                    </span>
                    <span className="text-xs font-mono text-zinc-500">
                      Pillar: {activeService.pillarName}
                    </span>
                  </div>

                  <Dropdown
                    id="pricing-section-service-dropdown"
                    label="Select Service to View Basic, Standard & Premium Pricing"
                    value={selectedServiceTitle}
                    onChange={(nextService) => setSelectedServiceTitle(nextService)}
                    groups={serviceDropdownGroups}
                    searchable
                    searchPlaceholder="Type to search any of our 24 services (e.g., E-Commerce, Android App, Logo, SEO, GST)..."
                  />
                </div>

                {/* Right Column: Selected Service Summary & Quick Price Range */}
                <div className="lg:col-span-5 p-4 rounded-2xl bg-[#FAFAFB] border border-zinc-200/80 flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <div className="text-[11px] font-mono text-zinc-500 truncate">
                      Service #{activeService.index} · {activeService.billingLabel}
                    </div>
                    <div className="text-sm sm:text-base font-extrabold text-zinc-950 font-[Outfit] truncate">
                      {activeService.title}
                    </div>
                    <div className="text-xs text-emerald-700 font-semibold mt-0.5 price-num">
                      Basic:{' '}
                      <span className="currency-symbol">{symbol}</span>
                      {(currency === 'INR'
                        ? activeTiers.basic.kexoraPriceInr
                        : activeTiers.basic.kexoraPriceUsd
                      ).toLocaleString()}{' '}
                      · Standard:{' '}
                      <span className="currency-symbol">{symbol}</span>
                      {(currency === 'INR'
                        ? activeTiers.standard.kexoraPriceInr
                        : activeTiers.standard.kexoraPriceUsd
                      ).toLocaleString()}{' '}
                      · Premium:{' '}
                      <span className="currency-symbol">{symbol}</span>
                      {(currency === 'INR'
                        ? activeTiers.premium.kexoraPriceInr
                        : activeTiers.premium.kexoraPriceUsd
                      ).toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 3 Side-by-Side Tier Cards for the Selected Dropdown Service (Basic | Standard | Premium) */}
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-7 items-stretch">
              {TIER_ORDER.map((tierId, idx) => {
                const tierPkg = activeTiers[tierId];
                const isPopular = tierId === 'standard';
                const kexoraPrice =
                  currency === 'INR'
                    ? tierPkg.kexoraPriceInr
                    : tierPkg.kexoraPriceUsd;
                const marketPrice =
                  currency === 'INR'
                    ? tierPkg.marketPriceInr
                    : tierPkg.marketPriceUsd;
                const savedAmount = marketPrice - kexoraPrice;

                const tierOrderLabel =
                  tierId === 'basic'
                    ? '01 · Basic (Sabse Sasta)'
                    : tierId === 'standard'
                      ? '02 · Standard (Middle · Popular)'
                      : '03 · Premium (Max Scope)';

                return (
                  <BlurKex
                    key={`${activeService.id}-${tierId}`}
                    direction="up"
                    staggerIndex={idx}
                    blurPx={14}
                    className={`rounded-3xl p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 ${
                      isPopular
                        ? 'bg-zinc-950 text-white border-2 border-zinc-950 shadow-xl'
                        : 'bg-white text-zinc-950 border border-zinc-200 hover:border-zinc-950 shadow-sm'
                    }`}
                  >
                    <div className="space-y-5">
                      {/* Unboxed Top Metadata Line */}
                      <div className="flex items-center justify-between gap-2 text-xs font-mono">
                        <span
                          className={`font-bold ${
                            isPopular ? 'text-emerald-400' : 'text-zinc-500'
                          }`}
                        >
                          {tierOrderLabel}
                        </span>
                        <span
                          className={`inline-flex items-center gap-1 ${
                            isPopular ? 'text-zinc-300' : 'text-zinc-500'
                          }`}
                        >
                          <Clock className="w-3.5 h-3.5" />
                          {tierPkg.turnaround}
                        </span>
                      </div>

                      <div>
                        <div
                          className={`text-xs font-mono mb-1 ${
                            isPopular ? 'text-zinc-400' : 'text-zinc-500'
                          }`}
                        >
                          {activeService.title}
                        </div>
                        <h3
                          className={`text-2xl font-extrabold font-[Outfit] tracking-tight ${
                            isPopular ? 'text-white' : 'text-zinc-950'
                          }`}
                        >
                          {tierPkg.tierLabel} Tier
                        </h3>
                        <p
                          className={`text-xs sm:text-sm mt-1.5 leading-relaxed ${
                            isPopular ? 'text-zinc-300' : 'text-zinc-600'
                          }`}
                        >
                          {tierPkg.subtitle}
                        </p>
                      </div>

                      {/* Price Box with Crisp Sans-Serif Numerals */}
                      <div
                        className={`p-5 rounded-2xl border ${
                          isPopular
                            ? 'bg-zinc-900 border-zinc-800'
                            : 'bg-[#FAFAFB] border-zinc-200/90'
                        }`}
                      >
                        <div className="flex items-center justify-between text-[11px] font-mono mb-1">
                          <span className="text-zinc-400">
                            Market Rate:{' '}
                            <span className="line-through price-num">
                              <span className="currency-symbol">{symbol}</span>
                              {marketPrice.toLocaleString()}
                            </span>
                          </span>
                          <span
                            className={`font-bold price-num ${
                              isPopular ? 'text-emerald-400' : 'text-emerald-700'
                            }`}
                          >
                            Save <span className="currency-symbol">{symbol}</span>
                            {savedAmount.toLocaleString()}
                          </span>
                        </div>

                        <div className="flex items-baseline gap-1.5">
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
                            {kexoraPrice.toLocaleString()}
                          </span>
                          <span
                            className={`text-xs font-mono ml-1 ${
                              isPopular ? 'text-zinc-400' : 'text-zinc-500'
                            }`}
                          >
                            / {activeService.billingLabel}
                          </span>
                        </div>
                      </div>

                      {/* SLA & Revisions Summary */}
                      <div
                        className={`p-3.5 rounded-xl text-xs space-y-1.5 ${
                          isPopular
                            ? 'bg-zinc-900/60 text-zinc-300'
                            : 'bg-zinc-50 text-zinc-700'
                        }`}
                      >
                        <div className="flex justify-between">
                          <span className="text-zinc-400">Revisions:</span>
                          <span className="font-semibold">{tierPkg.revisions}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-zinc-400">Support SLA:</span>
                          <span className="font-semibold">{tierPkg.support}</span>
                        </div>
                      </div>

                      {/* Deliverables Checklist */}
                      <div className="space-y-2">
                        <div
                          className={`text-[11px] font-mono uppercase tracking-wider ${
                            isPopular ? 'text-zinc-400' : 'text-zinc-500'
                          }`}
                        >
                          Included in {tierPkg.tierLabel}:
                        </div>
                        <ul className="space-y-2.5 text-xs">
                          {tierPkg.deliverables.map((deliv, dIdx) => (
                            <li key={dIdx} className="flex items-start gap-2.5">
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
                                {deliv}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleBookServiceTier(tierId)}
                      className={`w-full mt-7 py-4 text-sm sm:text-base font-extrabold rounded-2xl transition-all flex items-center justify-center gap-2.5 cursor-pointer ${
                        isPopular
                          ? 'bg-white text-zinc-950 hover:bg-zinc-200 shadow-md'
                          : 'bg-zinc-950 text-white hover:bg-zinc-800 shadow-md'
                      }`}
                    >
                      <span>
                        Select {tierPkg.tierLabel} Quotation ({symbol}
                        {kexoraPrice.toLocaleString()})
                      </span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </BlurKex>
                );
              })}
            </div>
          </div>

        {/* ---------------- SEO & AI SEARCH ENGINE OPTIMIZATION FAQ ---------------- */}
        <BlurKex direction="up" blurPx={14} className="mt-16 pt-12 border-t border-zinc-200">
          <div className="max-w-3xl mb-8">
            <div className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-1">
              AI-Search &amp; Google Transparency
            </div>
            <h3 className="text-2xl font-bold text-zinc-950 font-[Outfit]">
              Frequently Asked Questions About Kexora 3-Tier Pricing
            </h3>
            <p className="text-xs sm:text-sm text-zinc-600 mt-1">
              Structured for direct quotation by Google Search, Perplexity, and ChatGPT search algorithms with zero ambiguity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-5 rounded-2xl bg-white border border-zinc-200 space-y-2">
              <h4 className="font-bold text-zinc-950 text-sm font-[Outfit]">
                How do the Basic, Standard, and Premium tiers work across all 24 services?
              </h4>
              <p className="text-zinc-600 leading-relaxed">
                Every service Kexora offers is available in 3 distinct tiers: <strong>Basic</strong> (our lowest-cost starter package with essential deliverables), <strong>Standard</strong> (our most popular balanced package with custom UI/UX and speed optimization), and <strong>Premium</strong> (full enterprise scope with unlimited revisions and 24/7 priority support).
              </p>
            </div>

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
                How does the dynamic Live Quotation Card in the Contact Form work?
              </h4>
              <p className="text-zinc-600 leading-relaxed">
                Clicking any Basic, Standard, or Premium tier on any service card automatically opens the Contact Form with that exact service and tier selected—displaying your official Quotation Reference ID, itemized deliverables, market savings, and delivery SLA.
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
        </BlurKex>
      </div>
    </section>
  );
};

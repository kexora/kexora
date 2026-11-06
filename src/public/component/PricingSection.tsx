import React, { useState } from 'react';
import { PRICING_PLANS } from '../../data/agencyData';
import { CurrencyCode } from '../../types';
import { KEXORA_THEME } from './theme';
import { Check, ArrowRight } from 'lucide-react';

interface PricingProps {
  openContactModalWithService?: (serviceName: string) => void;
  onViewAllPage?: () => void;
}

export const PricingSection: React.FC<PricingProps> = ({
  openContactModalWithService,
  onViewAllPage,
}) => {
  const [currency, setCurrency] = useState<CurrencyCode>('INR');

  return (
    <section id="pricing" className={KEXORA_THEME.classes.sectionMuted}>
      <div className={KEXORA_THEME.classes.container}>
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <div className={KEXORA_THEME.classes.kicker}>
              Simple & Transparent Pricing
            </div>
            <h2
              className={KEXORA_THEME.classes.heading2}
              style={{ textWrap: 'balance' }}
            >
              Clear Plans for Every Business Budget
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs text-zinc-600 font-medium">Currency:</span>
              <div className="flex items-center gap-1 p-1 bg-white rounded-full border border-zinc-200">
                <button
                  type="button"
                  onClick={() => setCurrency('INR')}
                  className={`px-3.5 py-1.5 text-xs font-semibold rounded-full transition-all duration-300 whitespace-nowrap shrink-0 ${
                    currency === 'INR'
                      ? 'bg-zinc-950 text-white font-bold'
                      : 'text-zinc-600 hover:text-zinc-950'
                  }`}
                >
                  INR (₹)
                </button>
                <button
                  type="button"
                  onClick={() => setCurrency('USD')}
                  className={`px-3.5 py-1.5 text-xs font-semibold rounded-full transition-all duration-300 whitespace-nowrap shrink-0 ${
                    currency === 'USD'
                      ? 'bg-zinc-950 text-white font-bold'
                      : 'text-zinc-600 hover:text-zinc-950'
                  }`}
                >
                  USD ($)
                </button>
              </div>
            </div>

            {onViewAllPage && (
              <button
                type="button"
                onClick={onViewAllPage}
                className={KEXORA_THEME.classes.btnSecondaryOutline}
              >
                <span>Compare All Plan Details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {PRICING_PLANS.map((plan) => {
            const symbol = currency === 'INR' ? '₹' : '$';
            const monthly =
              currency === 'INR' ? plan.monthlyPriceInr : plan.monthlyPriceUsd;
            const setup =
              currency === 'INR' ? plan.setupFeeInr : plan.setupFeeUsd;
            const isPopular = Boolean(plan.popular);

            return (
              <div
                key={plan.id}
                className={`p-8 sm:p-9 flex flex-col justify-between ${
                  isPopular
                    ? KEXORA_THEME.classes.cardDarkFeatured
                    : KEXORA_THEME.classes.cardOnMuted
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <h3
                      className={`text-xl font-extrabold font-[Outfit] ${
                        isPopular ? 'text-white' : 'text-zinc-950'
                      }`}
                    >
                      {plan.name}
                    </h3>
                    {isPopular && (
                      <span className="text-xs font-bold text-zinc-300 uppercase tracking-wider">
                        Most Popular
                      </span>
                    )}
                  </div>

                  <p
                    className={`text-xs sm:text-sm leading-relaxed mb-6 ${
                      isPopular ? 'text-zinc-300' : 'text-zinc-600'
                    }`}
                  >
                    {plan.tagline}
                  </p>

                  <div
                    className={`pb-6 border-b ${
                      isPopular ? 'border-zinc-800' : 'border-zinc-200'
                    }`}
                  >
                    <div className="flex items-baseline gap-1.5">
                      <span
                        className={`text-3xl sm:text-4xl font-extrabold font-[Outfit] tabular-nums ${
                          isPopular ? 'text-white' : 'text-zinc-950'
                        }`}
                      >
                        {symbol}
                        {monthly.toLocaleString()}
                      </span>
                      <span
                        className={`text-xs font-mono ${
                          isPopular ? 'text-zinc-400' : 'text-zinc-500'
                        }`}
                      >
                        / month
                      </span>
                    </div>
                    <div
                      className={`text-xs font-mono mt-1.5 tabular-nums ${
                        isPopular ? 'text-zinc-300' : 'text-zinc-700 font-semibold'
                      }`}
                    >
                      + {symbol}
                      {setup.toLocaleString()}
                      {plan.customSetupSuffix || ''} (One-time setup)
                    </div>
                  </div>

                  <div
                    className={`py-4 border-b text-xs space-y-1 ${
                      isPopular
                        ? 'border-zinc-800 text-zinc-300'
                        : 'border-zinc-200 text-zinc-600'
                    }`}
                  >
                    <div>
                      <span>Revisions: </span>
                      <span
                        className={`font-semibold ${
                          isPopular ? 'text-white' : 'text-zinc-950'
                        }`}
                      >
                        {plan.revisions}
                      </span>
                    </div>
                    <div>
                      <span>Support: </span>
                      <span
                        className={`font-semibold ${
                          isPopular ? 'text-white' : 'text-zinc-950'
                        }`}
                      >
                        {plan.supportLevel}
                      </span>
                    </div>
                  </div>

                  <ul
                    className={`space-y-3 my-6 text-xs sm:text-sm ${
                      isPopular ? 'text-zinc-200' : 'text-zinc-700'
                    }`}
                  >
                    {plan.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <Check
                          className={`w-4 h-4 shrink-0 mt-0.5 ${
                            isPopular ? 'text-white' : 'text-zinc-950'
                          }`}
                        />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    openContactModalWithService &&
                    openContactModalWithService(
                      `${plan.name} (${symbol}${monthly.toLocaleString()}/mo + ${symbol}${setup.toLocaleString()}${plan.customSetupSuffix || ''} setup)`
                    )
                  }
                  className={`w-full py-4 text-xs sm:text-sm font-bold rounded-full transition-all duration-300 flex items-center justify-center gap-2 whitespace-nowrap shrink-0 ${
                    isPopular
                      ? 'bg-white hover:bg-zinc-200 text-zinc-950'
                      : 'bg-zinc-950 hover:bg-zinc-800 text-white'
                  }`}
                >
                  <span>{plan.ctaText}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

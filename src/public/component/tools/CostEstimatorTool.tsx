import React, { useState } from 'react';
import { CalculationInput, CurrencyCode } from '../../../types';
import { calculateKexoraEstimate } from '../../../utils/kexoraTools';
import {
  Calculator,
  ArrowRight,
  Sparkles,
  Zap,
  Check,
  Clock,
  Layers,
  Shield,
  HelpCircle,
} from 'lucide-react';

interface CostEstimatorToolProps {
  onLockInEstimate?: (details: string) => void;
}

export const CostEstimatorTool: React.FC<CostEstimatorToolProps> = ({
  onLockInEstimate,
}) => {
  const [calcInput, setCalcInput] = useState<CalculationInput>({
    projectType: 'business-custom',
    pageCount: 8,
    includeAiSeo: true,
    includeBranding: false,
    includeCompliance: false,
    currency: 'INR',
  });

  const estimate = calculateKexoraEstimate(calcInput);

  const projectChoices: {
    id: 'portfolio' | 'business-custom' | 'app-game' | 'ecommerce';
    title: string;
    tagline: string;
    tier: string;
  }[] = [
    {
      id: 'portfolio',
      title: 'Portfolio / Landing Page',
      tagline: 'Single high-conversion landing page or personal portfolio',
      tier: 'Beginner Plan',
    },
    {
      id: 'business-custom',
      title: 'Custom Business Website',
      tagline: '5–10 multi-page corporate website with custom React + Tailwind',
      tier: 'Creative Plan (Most Popular)',
    },
    {
      id: 'app-game',
      title: 'Android / iOS App & Game Dev',
      tagline: 'Native/cross-platform mobile app or 2D/3D web & mobile game',
      tier: 'App & Game Studio',
    },
    {
      id: 'ecommerce',
      title: 'Multi-Vendor / Full E-Commerce',
      tagline: 'Custom shop, payment gateways, admin panel, inventory & accounts',
      tier: 'Expert Plan',
    },
  ];

  const handleLockIn = () => {
    const details = `${estimate.recommendedPlanName} Estimate (${estimate.currencySymbol}${estimate.setupCost.toLocaleString()} one-time setup + ${estimate.currencySymbol}${estimate.monthlyRetainer.toLocaleString()}/mo) for ${calcInput.pageCount} ${
      calcInput.projectType === 'app-game' ? 'screens' : 'custom pages'
    } [Add-Ons: ${[
      calcInput.includeAiSeo ? 'AI-SEO' : null,
      calcInput.includeBranding ? 'Branding' : null,
      calcInput.includeCompliance ? 'Compliance' : null,
    ]
      .filter(Boolean)
      .join(', ') || 'Standard Core'}].`;

    if (onLockInEstimate) {
      onLockInEstimate(details);
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-zinc-200 shadow-sm overflow-hidden text-zinc-950">
      {/* Top Header */}
      <div className="p-6 sm:p-8 border-b border-zinc-200 bg-zinc-50/60">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 text-purple-700 border border-purple-200 text-xs font-bold mb-2">
              <Zap className="w-3.5 h-3.5 text-purple-600" />
              <span>Industry Standard vs Kexora · 30% Cheaper Rate Model</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-950 font-[Outfit]">
              Project Cost, Retainer &amp; Speed Forecast Planner
            </h3>
            <p className="text-xs sm:text-sm text-zinc-600 mt-1 max-w-2xl">
              Configure what you want to build and get an immediate, transparent estimate with delivery timelines and 0.3s PageSpeed guarantees.
            </p>
          </div>

          <div className="flex items-center gap-1.5 p-1 bg-white rounded-xl border border-zinc-300 shadow-xs shrink-0">
            <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider pl-2 pr-1">
              Currency:
            </span>
            {(['INR', 'USD'] as CurrencyCode[]).map((curr) => (
              <button
                key={curr}
                type="button"
                onClick={() => setCalcInput({ ...calcInput, currency: curr })}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  calcInput.currency === curr
                    ? 'bg-zinc-950 text-white shadow-xs'
                    : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100'
                }`}
              >
                {curr === 'INR' ? 'INR (₹)' : 'USD ($)'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Interactive Grid */}
      <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Interactive Inputs */}
        <div className="lg:col-span-7 space-y-7">
          {/* Step 1: Project Type */}
          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 block">
              1. What kind of product are we building for you?
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {projectChoices.map((choice) => {
                const isSelected = calcInput.projectType === choice.id;
                return (
                  <button
                    key={choice.id}
                    type="button"
                    onClick={() =>
                      setCalcInput({ ...calcInput, projectType: choice.id })
                    }
                    className={`p-4 rounded-2xl border text-left transition-all ${
                      isSelected
                        ? 'bg-zinc-950 border-zinc-950 text-white shadow-md'
                        : 'bg-zinc-50/70 border-zinc-200 text-zinc-800 hover:border-zinc-400 hover:bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold font-[Outfit]">
                        {choice.title}
                      </span>
                      <span
                        className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded ${
                          isSelected
                            ? 'bg-zinc-800 text-zinc-200'
                            : 'bg-zinc-200/80 text-zinc-600'
                        }`}
                      >
                        {choice.tier}
                      </span>
                    </div>
                    <p
                      className={`text-xs leading-relaxed ${
                        isSelected ? 'text-zinc-300' : 'text-zinc-500'
                      }`}
                    >
                      {choice.tagline}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Screen / Page Count Slider */}
          <div className="p-5 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-3">
            <div className="flex justify-between items-center">
              <div>
                <label
                  htmlFor="screen-count-slider"
                  className="text-xs font-bold text-zinc-900 block"
                >
                  2. Number of Custom Pages or Mobile App Screens
                </label>
                <div className="text-[11px] text-zinc-500">
                  Slide to adjust scope and design density
                </div>
              </div>
              <div className="text-lg font-mono text-zinc-950 font-extrabold tabular-nums bg-white px-3 py-1 rounded-xl border border-zinc-200">
                {calcInput.pageCount}{' '}
                <span className="text-xs text-zinc-500 font-normal">
                  {calcInput.projectType === 'app-game' ? 'Screens' : 'Pages'}
                </span>
              </div>
            </div>

            <input
              id="screen-count-slider"
              type="range"
              min="1"
              max="25"
              value={calcInput.pageCount}
              onChange={(e) =>
                setCalcInput({
                  ...calcInput,
                  pageCount: parseInt(e.target.value, 10),
                })
              }
              className="w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-zinc-950"
            />

            <div className="flex justify-between text-[11px] font-mono text-zinc-400">
              <span>1 Page (Landing)</span>
              <span>10 Pages (Mid-Market)</span>
              <span>25+ Screens (Enterprise)</span>
            </div>
          </div>

          {/* Step 3: Add-On Modules */}
          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 block">
              3. Optional High-Growth &amp; Compliance Add-Ons
            </label>

            <div className="space-y-2.5">
              <label className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white border border-zinc-200 hover:border-zinc-300 cursor-pointer transition-colors">
                <input
                  type="checkbox"
                  checked={calcInput.includeAiSeo}
                  onChange={(e) =>
                    setCalcInput({
                      ...calcInput,
                      includeAiSeo: e.target.checked,
                    })
                  }
                  className="rounded accent-zinc-950 w-4 h-4 mt-0.5"
                />
                <div className="text-xs">
                  <div className="font-bold text-zinc-900">
                    AI-SEO, Schema.org Sitelinks &amp; Google My Business Optimization
                  </div>
                  <div className="text-zinc-500 text-[11px] mt-0.5">
                    Pre-configured JSON-LD structured data graph and local search ranking setup
                  </div>
                </div>
              </label>

              <label className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white border border-zinc-200 hover:border-zinc-300 cursor-pointer transition-colors">
                <input
                  type="checkbox"
                  checked={calcInput.includeBranding}
                  onChange={(e) =>
                    setCalcInput({
                      ...calcInput,
                      includeBranding: e.target.checked,
                    })
                  }
                  className="rounded accent-zinc-950 w-4 h-4 mt-0.5"
                />
                <div className="text-xs">
                  <div className="font-bold text-zinc-900">
                    Logo Design, PDF Brochure &amp; Animated Explainer Video Kit
                  </div>
                  <div className="text-zinc-500 text-[11px] mt-0.5">
                    Complete creative branding package with 4K export assets
                  </div>
                </div>
              </label>

              <label className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white border border-zinc-200 hover:border-zinc-300 cursor-pointer transition-colors">
                <input
                  type="checkbox"
                  checked={calcInput.includeCompliance}
                  onChange={(e) =>
                    setCalcInput({
                      ...calcInput,
                      includeCompliance: e.target.checked,
                    })
                  }
                  className="rounded accent-zinc-950 w-4 h-4 mt-0.5"
                />
                <div className="text-xs">
                  <div className="font-bold text-zinc-900">
                    Company Registration, GST, Trademark &amp; ISO Certification Support
                  </div>
                  <div className="text-zinc-500 text-[11px] mt-0.5">
                    Turnkey regulatory documentation and business incorporation handling
                  </div>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Right Column: Live Itemized Scoping Summary */}
        <div className="lg:col-span-5 p-7 rounded-3xl bg-zinc-950 text-white flex flex-col justify-between space-y-6 shadow-xl">
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
              <span className="text-xs text-zinc-400 font-medium">
                Matched Tier: <strong className="text-white">{estimate.recommendedPlanName}</strong>
              </span>
              <span className="text-xs font-mono text-emerald-400 font-bold flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                ~{estimate.estimatedTimelineWeeks} Wks Delivery
              </span>
            </div>

            <div>
              <div className="text-xs uppercase tracking-wider text-zinc-400">
                Calculated One-Time Setup Fee
              </div>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="currency-symbol text-2xl sm:text-3xl font-bold text-white">
                  {estimate.currencySymbol}
                </span>
                <span className="price-num text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
                  {estimate.setupCost.toLocaleString()}
                </span>
              </div>
              <div className="text-xs text-zinc-300 mt-1.5 font-mono tabular-nums">
                + <span className="currency-symbol">{estimate.currencySymbol}</span>
                <span className="price-num font-bold">{estimate.monthlyRetainer.toLocaleString()}</span> / month managed hosting, security &amp; updates
              </div>
            </div>

            {/* Itemized Cost Breakdown */}
            <div className="p-4 rounded-2xl bg-zinc-900/90 border border-zinc-800 space-y-2.5 text-xs">
              <div className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 pb-1 border-b border-zinc-800">
                Itemized Scope Breakdown
              </div>
              {estimate.breakdown.map((item, i) => (
                <div key={i} className="flex justify-between items-center text-zinc-300">
                  <span>{item.label}</span>
                  <span className="font-mono text-white font-bold tabular-nums">
                    <span className="currency-symbol">{estimate.currencySymbol}</span>
                    <span className="price-num">{item.amount.toLocaleString()}</span>
                  </span>
                </div>
              ))}
            </div>

            {/* Performance Commitments */}
            <div className="p-4 rounded-2xl bg-zinc-900/40 border border-zinc-800/80 space-y-2 text-xs">
              <div className="flex items-center justify-between text-zinc-300">
                <span className="flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-yellow-400" />
                  Target Load Speed:
                </span>
                <span className="font-mono font-bold text-emerald-400">0.3s Instant</span>
              </div>
              <div className="flex items-center justify-between text-zinc-300">
                <span className="flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-blue-400" />
                  Google PageSpeed Target:
                </span>
                <span className="font-mono font-bold text-white">99+ Guaranteed</span>
              </div>
              <div className="flex items-center justify-between text-zinc-300">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                  Industry Savings:
                </span>
                <span className="font-mono font-bold text-emerald-400">~30% Cheaper</span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={handleLockIn}
            className="w-full py-4 text-xs sm:text-sm font-bold text-zinc-950 bg-white hover:bg-zinc-200 rounded-2xl transition-all flex items-center justify-center gap-2 shadow-sm hover:scale-[1.01] active:scale-[0.99]"
          >
            <span>Lock In This Estimate With Kexora</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

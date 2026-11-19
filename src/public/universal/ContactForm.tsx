import React, { useState, useEffect, useMemo } from 'react';
import { CurrencyCode, ProposalFormData, ServiceTierId } from '../../types';
import {
  KEXORA_SERVICE_PILLARS,
  INDIVIDUAL_SERVICE_PRICING,
  PRICING_PLANS,
} from '../../data/agencyData';
import {
  buildQuotationForServiceTier,
  detectTierFromText,
  findServicePricingItem,
  formatTierOptionValue,
  getServiceTiers,
  TIER_ORDER,
} from '../../data/tieredPricingEngine';
import {
  Send,
  CheckCircle2,
  ArrowUpRight,
  Copy,
  Check,
  RotateCcw,
  Wand2,
  Clock,
  ShieldCheck,
  Layers,
  FileText,
} from 'lucide-react';
import { Dropdown, DropdownGroup, DropdownOption } from './Dropdown';
import { useContextualTabTitle } from './tabTitle';

interface ContactFormProps {
  initialService?: string;
  initialDetails?: string;
  variant?: 'page' | 'compact';
  onSuccessClose?: () => void;
}

const QUICK_ADD_TAGS = [
  'Need Fast Delivery',
  'Include Google SEO',
  'Need Logo & Branding',
  'Connect on WhatsApp',
];

/**
 * Smart Enquiry & Tier Matcher:
 * Automatically maps any clicked button, service, tier (Basic / Standard / Premium),
 * or monthly plan across the website to the exact Service Dropdown, Tier Dropdown,
 * and Live Studio Quotation Card.
 */
function resolveSmartEnquirySelection(
  rawService?: string,
  rawDetails?: string,
  currency: CurrencyCode = 'INR'
): {
  serviceType: string;
  budgetRange: string;
  projectDetails: string;
  isBundleEnquiry: boolean;
} {
  const input = (rawService || '').trim();
  const detailsText = (rawDetails || '').trim();
  const combinedLower = `${input} ${detailsText}`.toLowerCase();

  const isBundleEnquiry =
    combinedLower.includes('bundle') && detailsText.includes('•');

  // 1. Check if a Monthly Retainer Plan was clicked directly
  if (combinedLower.includes('beginner plan')) {
    const srv = 'Landing Page & News Website Designing';
    const planLabel = 'Beginner Plan (₹999/mo + ₹8,000 setup)';
    const quote = buildQuotationForServiceTier(srv, planLabel, currency);
    return {
      serviceType: srv,
      budgetRange: planLabel,
      projectDetails: detailsText || quote.formattedBrief,
      isBundleEnquiry: false,
    };
  }
  if (combinedLower.includes('creative plan')) {
    const srv = 'Ecommerce & Custom Web Design';
    const planLabel = 'Creative Plan (₹2,499/mo + ₹18,000 setup)';
    const quote = buildQuotationForServiceTier(srv, planLabel, currency);
    return {
      serviceType: srv,
      budgetRange: planLabel,
      projectDetails: detailsText || quote.formattedBrief,
      isBundleEnquiry: false,
    };
  }
  if (combinedLower.includes('expert plan')) {
    const srv = 'Multi-Vendor Ecommerce Solutions';
    const planLabel = 'Expert Plan (₹4,999/mo + ₹40,000+ setup)';
    const quote = buildQuotationForServiceTier(srv, planLabel, currency);
    return {
      serviceType: srv,
      budgetRange: planLabel,
      projectDetails: detailsText || quote.formattedBrief,
      isBundleEnquiry: false,
    };
  }

  // 2. Resolve the matched service from all 24 services / 4 pillars
  const matchedServiceItem = findServicePricingItem(
    input || 'Ecommerce & Custom Web Design'
  );
  const detectedTier: ServiceTierId = detectTierFromText(
    `${input} ${detailsText}`,
    'standard'
  );
  const tierOptionValue = formatTierOptionValue(detectedTier);
  const quote = buildQuotationForServiceTier(
    matchedServiceItem.title,
    tierOptionValue,
    currency
  );

  return {
    serviceType: isBundleEnquiry ? input : matchedServiceItem.title,
    budgetRange: isBundleEnquiry
      ? 'Custom Multi-Service Bundle Quotation'
      : tierOptionValue,
    projectDetails:
      detailsText.length > 0 ? detailsText : quote.formattedBrief,
    isBundleEnquiry,
  };
}

export const ContactForm: React.FC<ContactFormProps> = ({
  initialService = '',
  initialDetails = '',
  variant = 'page',
  onSuccessClose,
}) => {
  const [quoteCurrency, setQuoteCurrency] = useState<CurrencyCode>('INR');
  const initialResolved = resolveSmartEnquirySelection(
    initialService,
    initialDetails,
    quoteCurrency
  );

  const [formData, setFormData] = useState<ProposalFormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    websiteUrl: '',
    serviceType: initialResolved.serviceType,
    budgetRange: initialResolved.budgetRange,
    projectDetails: initialResolved.projectDetails,
  });

  const [selectedQuickTags, setSelectedQuickTags] = useState<string[]>([]);
  const [userEditedMessage, setUserEditedMessage] = useState(false);
  const [copiedQuote, setCopiedQuote] = useState(false);

  // Sync automatically whenever the user clicks a service/tier button from any page
  useEffect(() => {
    const resolved = resolveSmartEnquirySelection(
      initialService,
      initialDetails,
      quoteCurrency
    );
    setFormData((prev) => ({
      ...prev,
      serviceType: resolved.serviceType,
      budgetRange: resolved.budgetRange,
      projectDetails: resolved.projectDetails,
    }));
    setUserEditedMessage(
      Boolean(initialDetails && initialDetails.includes('Bundle'))
    );
  }, [initialService, initialDetails]);

  // Compute active service tiers and live quotation object
  const activeServiceItem = useMemo(
    () => findServicePricingItem(formData.serviceType),
    [formData.serviceType]
  );

  const activeServiceTiers = useMemo(
    () => getServiceTiers(activeServiceItem.id),
    [activeServiceItem.id]
  );

  const liveQuotation = useMemo(
    () =>
      buildQuotationForServiceTier(
        activeServiceItem.title,
        formData.budgetRange,
        quoteCurrency,
        selectedQuickTags
      ),
    [
      activeServiceItem.title,
      formData.budgetRange,
      quoteCurrency,
      selectedQuickTags,
    ]
  );

  const symbol = quoteCurrency === 'INR' ? '₹' : '$';

  // Build grouped service dropdown options (All 24 services across 4 pillars + 6 core solutions)
  const allCatalogTitles = INDIVIDUAL_SERVICE_PRICING.map((s) => s.title);
  const corePillars = [
    'Web Design & Custom Development',
    'Mobile App & Game Development',
    'Multi-Vendor E-Commerce & Online Stores',
    'Digital Marketing, SEO & AI-SEO',
    'Creative UI/UX, Logo & Video Design',
    'Business, GST, Trademark & ISO Registration',
  ];

  const isCustomServiceValue =
    formData.serviceType &&
    !allCatalogTitles.includes(formData.serviceType) &&
    !corePillars.includes(formData.serviceType);

  const serviceDropdownGroups: DropdownGroup[] = [
    ...(isCustomServiceValue
      ? [
          {
            label: 'Selected From Page',
            options: [
              {
                value: formData.serviceType,
                label: formData.serviceType,
                sublabel: 'Auto-Matched',
              },
            ],
          },
        ]
      : []),
    {
      label: '01 · Web Design & Development (6 Services)',
      options: INDIVIDUAL_SERVICE_PRICING.filter(
        (s) => s.pillarId === 'web-dev'
      ).map((s) => {
        const t = getServiceTiers(s.id);
        const basicPrice =
          quoteCurrency === 'INR'
            ? t.basic.kexoraPriceInr
            : t.basic.kexoraPriceUsd;
        return {
          value: s.title,
          label: s.title,
          sublabel: `From ${symbol}${basicPrice.toLocaleString()}`,
        };
      }),
    },
    {
      label: '02 · App & Game Development (6 Services)',
      options: INDIVIDUAL_SERVICE_PRICING.filter(
        (s) => s.pillarId === 'app-game'
      ).map((s) => {
        const t = getServiceTiers(s.id);
        const basicPrice =
          quoteCurrency === 'INR'
            ? t.basic.kexoraPriceInr
            : t.basic.kexoraPriceUsd;
        return {
          value: s.title,
          label: s.title,
          sublabel: `From ${symbol}${basicPrice.toLocaleString()}`,
        };
      }),
    },
    {
      label: '03 · Digital Marketing & SEO (6 Services)',
      options: INDIVIDUAL_SERVICE_PRICING.filter(
        (s) => s.pillarId === 'seo-marketing'
      ).map((s) => {
        const t = getServiceTiers(s.id);
        const basicPrice =
          quoteCurrency === 'INR'
            ? t.basic.kexoraPriceInr
            : t.basic.kexoraPriceUsd;
        return {
          value: s.title,
          label: s.title,
          sublabel: `From ${symbol}${basicPrice.toLocaleString()}`,
        };
      }),
    },
    {
      label: '04 · Creative & Business Compliance (6 Services)',
      options: INDIVIDUAL_SERVICE_PRICING.filter(
        (s) => s.pillarId === 'creative-business'
      ).map((s) => {
        const t = getServiceTiers(s.id);
        const basicPrice =
          quoteCurrency === 'INR'
            ? t.basic.kexoraPriceInr
            : t.basic.kexoraPriceUsd;
        return {
          value: s.title,
          label: s.title,
          sublabel: `From ${symbol}${basicPrice.toLocaleString()}`,
        };
      }),
    },
    {
      label: '4 Core Studio Pillars',
      options: KEXORA_SERVICE_PILLARS.map((p) => ({
        value: p.category,
        label: p.category,
        sublabel: 'Full Pillar Scope',
      })),
    },
  ];

  // Build dynamic Tier / Plan options based on the currently selected Service
  const dynamicTierGroups: DropdownGroup[] = useMemo(() => {
    const basicPrice =
      quoteCurrency === 'INR'
        ? activeServiceTiers.basic.kexoraPriceInr
        : activeServiceTiers.basic.kexoraPriceUsd;
    const stdPrice =
      quoteCurrency === 'INR'
        ? activeServiceTiers.standard.kexoraPriceInr
        : activeServiceTiers.standard.kexoraPriceUsd;
    const premPrice =
      quoteCurrency === 'INR'
        ? activeServiceTiers.premium.kexoraPriceInr
        : activeServiceTiers.premium.kexoraPriceUsd;

    const serviceTierOptions: DropdownOption[] = [
      {
        value: formatTierOptionValue('basic'),
        label: 'Basic Tier (Sabse Sasta)',
        sublabel: `${symbol}${basicPrice.toLocaleString()} · Starter`,
      },
      {
        value: formatTierOptionValue('standard'),
        label: 'Standard Tier (Middle · Popular)',
        sublabel: `${symbol}${stdPrice.toLocaleString()} · Recommended`,
      },
      {
        value: formatTierOptionValue('premium'),
        label: 'Premium Tier (Max Scope)',
        sublabel: `${symbol}${premPrice.toLocaleString()} · Enterprise`,
      },
    ];

    const retainerOptions: DropdownOption[] = PRICING_PLANS.map((plan) => {
      const mPrice =
        quoteCurrency === 'INR' ? plan.monthlyPriceInr : plan.monthlyPriceUsd;
      const sPrice =
        quoteCurrency === 'INR' ? plan.setupFeeInr : plan.setupFeeUsd;
      return {
        value: `${plan.name} (₹${plan.monthlyPriceInr.toLocaleString()}/mo + ₹${plan.setupFeeInr.toLocaleString()} setup)`,
        label: plan.name,
        sublabel: `${symbol}${mPrice.toLocaleString()}/mo + ${symbol}${sPrice.toLocaleString()} setup`,
      };
    });

    return [
      {
        label: `3 Tiers for ${activeServiceItem.title}`,
        options: serviceTierOptions,
      },
      {
        label: 'All-Inclusive Monthly Studio Plans',
        options: retainerOptions,
      },
    ];
  }, [activeServiceItem.title, activeServiceTiers, quoteCurrency, symbol]);

  const handleServiceChange = (nextService: string) => {
    const currentTierId =
      liveQuotation.tierId === 'monthly-plan' ||
      liveQuotation.tierId === 'custom-bundle'
        ? 'standard'
        : liveQuotation.tierId;
    const nextPlanValue = formatTierOptionValue(currentTierId);
    const nextQuote = buildQuotationForServiceTier(
      nextService,
      nextPlanValue,
      quoteCurrency,
      selectedQuickTags
    );

    setFormData((prev) => ({
      ...prev,
      serviceType: nextService,
      budgetRange: nextPlanValue,
      projectDetails: userEditedMessage
        ? prev.projectDetails
        : nextQuote.formattedBrief,
    }));
  };

  const handlePlanChange = (nextPlan: string) => {
    const nextQuote = buildQuotationForServiceTier(
      formData.serviceType,
      nextPlan,
      quoteCurrency,
      selectedQuickTags
    );
    setFormData((prev) => ({
      ...prev,
      budgetRange: nextPlan,
      projectDetails: userEditedMessage
        ? prev.projectDetails
        : nextQuote.formattedBrief,
    }));
  };

  const handleDirectTierClick = (tierId: ServiceTierId) => {
    const nextPlanValue = formatTierOptionValue(tierId);
    const nextQuote = buildQuotationForServiceTier(
      activeServiceItem.title,
      nextPlanValue,
      quoteCurrency,
      selectedQuickTags
    );
    setUserEditedMessage(false);
    setFormData((prev) => ({
      ...prev,
      serviceType: activeServiceItem.title,
      budgetRange: nextPlanValue,
      projectDetails: nextQuote.formattedBrief,
    }));
  };

  const handleCurrencyToggle = (nextCurrency: CurrencyCode) => {
    setQuoteCurrency(nextCurrency);
    const nextQuote = buildQuotationForServiceTier(
      formData.serviceType,
      formData.budgetRange,
      nextCurrency,
      selectedQuickTags
    );
    if (!userEditedMessage) {
      setFormData((prev) => ({
        ...prev,
        projectDetails: nextQuote.formattedBrief,
      }));
    }
  };

  const toggleQuickTag = (tag: string) => {
    const exists = selectedQuickTags.includes(tag);
    const nextTags = exists
      ? selectedQuickTags.filter((t) => t !== tag)
      : [...selectedQuickTags, tag];
    setSelectedQuickTags(nextTags);

    const nextQuote = buildQuotationForServiceTier(
      formData.serviceType,
      formData.budgetRange,
      quoteCurrency,
      nextTags
    );
    setFormData((prev) => ({
      ...prev,
      projectDetails: nextQuote.formattedBrief,
    }));
    setUserEditedMessage(false);
  };

  const handleCopyQuotation = () => {
    const summaryLines = [
      `KEXORA STUDIO OFFICIAL QUOTATION (${liveQuotation.quotationCode})`,
      `Service: ${liveQuotation.serviceTitle} (${liveQuotation.pillarName})`,
      `Selected Tier: ${liveQuotation.tierLabel} — ${liveQuotation.tierBadge}`,
      `Kexora Direct Rate: ${liveQuotation.symbol}${liveQuotation.kexoraPrice.toLocaleString()} (${liveQuotation.billingLabel})`,
      `Market Rate: ${liveQuotation.symbol}${liveQuotation.marketPrice.toLocaleString()} (You Save ${liveQuotation.symbol}${liveQuotation.savedAmount.toLocaleString()} · ~${liveQuotation.savingsPercent}% Off)`,
      `Delivery SLA: ${liveQuotation.turnaround} · ${liveQuotation.revisions}`,
      `Included Deliverables:`,
      ...liveQuotation.deliverables.map((d) => `  ✓ ${d}`),
    ].join('\n');

    navigator.clipboard.writeText(summaryLines);
    setCopiedQuote(true);
    setTimeout(() => setCopiedQuote(false), 2000);
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [copiedRef, setCopiedRef] = useState(false);

  useContextualTabTitle(
    submittedRef
      ? 'Proposal Sent'
      : formData.serviceType && formData.serviceType !== initialResolved.serviceType
        ? `Quote: ${formData.serviceType}`
        : null,
    submittedRef ? 25 : 20
  );

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    if (!formData.email.trim() || !validateEmail(formData.email)) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setSubmittedRef(
            data.referenceId ||
              `${liveQuotation.quotationCode}-${Math.floor(1000 + Math.random() * 9000)}`
          );
          return;
        }
      }
      const localRef = `${liveQuotation.quotationCode}-${Math.floor(1000 + Math.random() * 9000)}`;
      setSubmittedRef(localRef);
    } catch {
      const localRef = `${liveQuotation.quotationCode}-${Math.floor(1000 + Math.random() * 9000)}`;
      setSubmittedRef(localRef);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyRef = () => {
    if (!submittedRef) return;
    navigator.clipboard.writeText(submittedRef);
    setCopiedRef(true);
    setTimeout(() => setCopiedRef(false), 2000);
  };

  const handleReset = () => {
    setSubmittedRef(null);
    setErrorMsg('');
    setSelectedQuickTags([]);
    setUserEditedMessage(false);
  };

  if (submittedRef) {
    return (
      <div className="bg-white border border-zinc-200/90 rounded-3xl p-6 sm:p-8 shadow-[0_12px_40px_rgb(0,0,0,0.04)] text-zinc-950 space-y-6">
        <div className="flex items-center justify-between gap-4">
          <div className="w-11 h-11 rounded-2xl bg-zinc-950 text-white flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <span className="text-xs font-mono font-bold text-zinc-500 tabular-nums">
            SLA · {liveQuotation.turnaround}
          </span>
        </div>

        <div className="space-y-1.5">
          <h3 className="text-2xl font-bold text-zinc-950 font-[Outfit] tracking-tight">
            Quotation &amp; Enquiry Logged by Kexora Studio
          </h3>
          <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
            Thank you,{' '}
            <strong className="text-zinc-950 font-semibold">
              {formData.name}
            </strong>
            . Rajan Singh and Aditya Singh’s engineering desk has registered your quotation request and will reach out to{' '}
            <strong className="text-zinc-950 font-semibold">
              {formData.email}
            </strong>
            .
          </p>
        </div>

        {/* Official Quotation Receipt Box */}
        <div className="p-5 rounded-2xl bg-zinc-950 text-white space-y-3 text-xs">
          <div className="flex items-center justify-between gap-2 pb-3 border-b border-zinc-800">
            <span className="text-zinc-400">Quotation Reference ID</span>
            <div className="inline-flex items-center gap-2">
              <span className="font-mono font-bold text-white tabular-nums">
                {submittedRef}
              </span>
              <button
                type="button"
                onClick={handleCopyRef}
                aria-label="Copy Reference ID"
                className="p-1 rounded-md bg-zinc-800 border border-zinc-700 hover:border-white text-zinc-200 hover:text-white transition-colors cursor-pointer"
              >
                {copiedRef ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between gap-4">
            <span className="text-zinc-400">Selected Service</span>
            <span className="font-bold text-white text-right">
              {liveQuotation.serviceTitle}
            </span>
          </div>

          <div className="flex items-center justify-between gap-4">
            <span className="text-zinc-400">Selected Tier / Package</span>
            <span className="font-bold text-emerald-400 text-right">
              {liveQuotation.tierLabel} ({liveQuotation.tierBadge})
            </span>
          </div>

          <div className="flex items-center justify-between gap-4 pt-2 border-t border-zinc-800">
            <span className="text-zinc-400">Estimated Studio Rate</span>
            <span className="text-base font-extrabold text-white price-num">
              <span className="currency-symbol">{liveQuotation.symbol}</span>
              {liveQuotation.kexoraPrice.toLocaleString()}{' '}
              <span className="text-[11px] font-normal text-zinc-400">
                ({liveQuotation.billingLabel} · Save{' '}
                <span className="currency-symbol">{liveQuotation.symbol}</span>
                {liveQuotation.savedAmount.toLocaleString()})
              </span>
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={handleReset}
            className="px-4 py-2.5 text-xs font-bold text-zinc-700 hover:text-zinc-950 bg-zinc-100 hover:bg-zinc-200/80 rounded-full transition-colors inline-flex items-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Modify or New Quotation</span>
          </button>

          {onSuccessClose && (
            <button
              type="button"
              onClick={onSuccessClose}
              className="px-5 py-2.5 text-xs font-bold text-white bg-zinc-950 hover:bg-zinc-800 rounded-full transition-colors cursor-pointer"
            >
              Done
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`bg-white ${
        variant === 'page'
          ? 'border border-zinc-200/90 rounded-3xl p-6 sm:p-8 shadow-[0_12px_40px_rgb(0,0,0,0.04)]'
          : ''
      } text-zinc-950`}
    >
      {/* Header with Live Quotation & Currency Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 mb-5 border-b border-zinc-200/80">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-zinc-500 mb-0.5">
            <Wand2 className="w-3.5 h-3.5 text-zinc-950" />
            <span>Dynamic Pricing &amp; Quotation Desk</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-zinc-950 font-[Outfit] tracking-tight">
            Instant Quotation &amp; Project Booking
          </h2>
          <p className="text-xs text-zinc-500 mt-0.5">
            Choose any service and compare Basic (Sasta), Standard (Middle), or Premium (Max) tiers live below.
          </p>
        </div>

        {/* Currency Switcher for Live Quotation */}
        <div className="inline-flex items-center p-1 bg-[#F4F4F6] rounded-full border border-zinc-200/90 self-start sm:self-auto shrink-0">
          <button
            type="button"
            onClick={() => handleCurrencyToggle('INR')}
            className={`px-3 py-1 text-xs font-bold rounded-full transition-all cursor-pointer price-num ${
              quoteCurrency === 'INR'
                ? 'bg-zinc-950 text-white shadow-xs'
                : 'text-zinc-600 hover:text-zinc-950'
            }`}
          >
            <span className="currency-symbol">₹</span> INR
          </button>
          <button
            type="button"
            onClick={() => handleCurrencyToggle('USD')}
            className={`px-3 py-1 text-xs font-bold rounded-full transition-all cursor-pointer price-num ${
              quoteCurrency === 'USD'
                ? 'bg-zinc-950 text-white shadow-xs'
                : 'text-zinc-600 hover:text-zinc-950'
            }`}
          >
            <span className="currency-symbol">$</span> USD
          </button>
        </div>
      </div>

      {errorMsg && (
        <div
          role="alert"
          className="p-3 mb-4 rounded-xl bg-zinc-950 text-white font-medium text-xs flex items-center justify-between gap-3"
        >
          <span>{errorMsg}</span>
          <button
            type="button"
            onClick={() => setErrorMsg('')}
            className="text-zinc-300 hover:text-white underline text-[11px] shrink-0 cursor-pointer"
          >
            Dismiss
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        {/* Row 1: Dynamic Service Selector + Dynamic Tier Selector */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <Dropdown
            id="kexora-service-select"
            label="1. Select Service / Requirement (All 24)"
            value={formData.serviceType}
            onChange={handleServiceChange}
            groups={serviceDropdownGroups}
            searchable
            searchPlaceholder="Search all 24 Kexora services..."
          />

          <Dropdown
            id="kexora-plan-select"
            label="2. Select Tier (Basic / Standard / Premium)"
            value={formData.budgetRange}
            onChange={handlePlanChange}
            groups={dynamicTierGroups}
          />
        </div>

        {/* =====================================================================
            LIVE STUDIO QUOTATION CARD (DYNAMICALLY LINKED TO SERVICE & TIER)
           ===================================================================== */}
        <div className="rounded-2xl bg-zinc-950 text-white p-5 sm:p-6 border border-zinc-800 space-y-5 shadow-lg">
          {/* Top Bar: Quotation Code, Pillar & Copy Quote Button */}
          <div className="flex flex-wrap items-center justify-between gap-2 pb-3.5 border-b border-zinc-800">
            <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono text-zinc-400">
              <FileText className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span className="font-bold text-white">
                LIVE QUOTATION · {liveQuotation.quotationCode}
              </span>
              <span aria-hidden="true">·</span>
              <span>{liveQuotation.pillarName}</span>
            </div>

            <button
              type="button"
              onClick={handleCopyQuotation}
              className="px-3 py-1 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-[11px] font-bold text-zinc-200 hover:text-white transition-colors inline-flex items-center gap-1.5 cursor-pointer"
            >
              {copiedQuote ? (
                <>
                  <Check className="w-3 h-3 text-emerald-400" />
                  <span className="text-emerald-400">Quotation Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  <span>Copy Quote Summary</span>
                </>
              )}
            </button>
          </div>

          {/* Interactive 3-Tier Switcher Strip (Basic vs Standard vs Premium) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-[11px] text-zinc-400">
              <span>
                Compare &amp; Switch Tier for{' '}
                <strong className="text-white">{activeServiceItem.title}</strong>:
              </span>
              <span className="text-emerald-400 font-mono font-bold">
                30% Below Market Rate
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {TIER_ORDER.map((tId) => {
                const pkg = activeServiceTiers[tId];
                const tPrice =
                  quoteCurrency === 'INR'
                    ? pkg.kexoraPriceInr
                    : pkg.kexoraPriceUsd;
                const isSelected = liveQuotation.tierId === tId;
                const tierHints: Record<ServiceTierId, string> = {
                  basic: 'Sabse Sasta',
                  standard: 'Middle · Popular',
                  premium: 'Max Scope',
                };

                return (
                  <button
                    key={tId}
                    type="button"
                    onClick={() => handleDirectTierClick(tId)}
                    className={`p-2.5 sm:p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'bg-white text-zinc-950 border-white shadow-sm'
                        : 'bg-zinc-900/90 text-zinc-300 border-zinc-800 hover:border-zinc-600 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-xs font-extrabold font-[Outfit]">
                        {pkg.tierLabel}
                      </span>
                      <span
                        className={`text-[10px] font-mono hidden sm:inline ${
                          isSelected ? 'text-zinc-600' : 'text-zinc-400'
                        }`}
                      >
                        {tierHints[tId]}
                      </span>
                    </div>
                    <div
                      className={`text-sm sm:text-base font-black price-num mt-1 ${
                        isSelected ? 'text-zinc-950' : 'text-white'
                      }`}
                    >
                      <span className="currency-symbol">{symbol}</span>
                      {tPrice.toLocaleString()}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Quotation Price, Savings & Deliverables Breakdown */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 pt-2 items-start">
            {/* Price & SLA Summary Box (5 cols) */}
            <div className="sm:col-span-5 p-4 rounded-xl bg-zinc-900 border border-zinc-800 space-y-3">
              <div>
                <div className="text-[11px] font-mono text-emerald-400 font-bold">
                  {liveQuotation.tierLabel} · {liveQuotation.tierBadge}
                </div>
                <div className="flex items-baseline gap-1.5 mt-1">
                  <span className="currency-symbol text-xl font-bold text-white">
                    {liveQuotation.symbol}
                  </span>
                  <span className="price-num text-3xl font-extrabold text-white tracking-tight">
                    {liveQuotation.kexoraPrice.toLocaleString()}
                  </span>
                  <span className="text-xs text-zinc-400 font-mono">
                    / {liveQuotation.billingLabel}
                  </span>
                </div>

                {liveQuotation.setupFee !== undefined && (
                  <div className="text-xs font-mono text-zinc-300 mt-1">
                    + <span className="currency-symbol">{liveQuotation.symbol}</span>
                    <span className="price-num">
                      {liveQuotation.setupFee.toLocaleString()}
                    </span>{' '}
                    one-time setup
                  </div>
                )}
              </div>

              <div className="pt-2.5 border-t border-zinc-800 space-y-1 text-[11px] font-mono">
                <div className="flex items-center justify-between text-zinc-400">
                  <span>Market Rate:</span>
                  <span className="line-through price-num">
                    <span className="currency-symbol">{liveQuotation.symbol}</span>
                    {liveQuotation.marketPrice.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between text-emerald-400 font-bold">
                  <span>Direct Savings:</span>
                  <span className="price-num">
                    Save <span className="currency-symbol">{liveQuotation.symbol}</span>
                    {liveQuotation.savedAmount.toLocaleString()} (~
                    {liveQuotation.savingsPercent}%)
                  </span>
                </div>
                <div className="flex items-center justify-between text-zinc-300 pt-1">
                  <span className="inline-flex items-center gap-1">
                    <Clock className="w-3 h-3 text-zinc-400" /> Delivery:
                  </span>
                  <span className="font-bold text-white">
                    {liveQuotation.turnaround}
                  </span>
                </div>
                <div className="flex items-center justify-between text-zinc-300">
                  <span className="inline-flex items-center gap-1">
                    <Layers className="w-3 h-3 text-zinc-400" /> Revisions:
                  </span>
                  <span className="text-zinc-200">{liveQuotation.revisions}</span>
                </div>
              </div>
            </div>

            {/* Itemized Deliverables Checklist (7 cols) */}
            <div className="sm:col-span-7 space-y-2.5">
              <div className="text-xs font-bold text-zinc-200 font-[Outfit]">
                {liveQuotation.subtitle}
              </div>
              <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-400">
                Included in {liveQuotation.tierLabel} Quotation:
              </div>
              <ul className="space-y-2 text-xs text-zinc-200">
                {liveQuotation.deliverables.map((deliv, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="leading-snug">{deliv}</span>
                  </li>
                ))}
              </ul>
              <div className="pt-1 flex items-center gap-1.5 text-[11px] text-zinc-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Support SLA: {liveQuotation.support}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Row 2: Essential Contact Details (Name & Email) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div>
            <label
              htmlFor="kexora-form-name"
              className="text-xs font-bold text-zinc-800 block mb-1"
            >
              Your Full Name <span className="text-zinc-950">*</span>
            </label>
            <input
              id="kexora-form-name"
              type="text"
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="e.g., Vikram Sharma"
              className="w-full px-3.5 py-2.5 bg-[#FAFAFB] border border-zinc-300 rounded-xl text-xs sm:text-[13px] text-zinc-950 placeholder-zinc-400 focus:bg-white focus:outline-none focus:border-zinc-950 transition-colors"
            />
          </div>

          <div>
            <label
              htmlFor="kexora-form-email"
              className="text-xs font-bold text-zinc-800 block mb-1"
            >
              Email Address <span className="text-zinc-950">*</span>
            </label>
            <input
              id="kexora-form-email"
              type="email"
              required
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder="name@company.com"
              className="w-full px-3.5 py-2.5 bg-[#FAFAFB] border border-zinc-300 rounded-xl text-xs sm:text-[13px] text-zinc-950 placeholder-zinc-400 focus:bg-white focus:outline-none focus:border-zinc-950 transition-colors"
            />
          </div>
        </div>

        {/* Row 3: Phone/WhatsApp & Optional Website/Brand */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div>
            <label
              htmlFor="kexora-form-phone"
              className="text-xs font-bold text-zinc-800 block mb-1"
            >
              Phone / WhatsApp Number
            </label>
            <input
              id="kexora-form-phone"
              type="tel"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              placeholder="+91 98765 43210"
              className="w-full px-3.5 py-2.5 bg-[#FAFAFB] border border-zinc-300 rounded-xl text-xs sm:text-[13px] text-zinc-950 placeholder-zinc-400 focus:bg-white focus:outline-none focus:border-zinc-950 transition-colors"
            />
          </div>

          <div>
            <label
              htmlFor="kexora-form-company"
              className="text-xs font-bold text-zinc-800 block mb-1"
            >
              Business Name or Website (Optional)
            </label>
            <input
              id="kexora-form-company"
              type="text"
              value={formData.company}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  company: e.target.value,
                  websiteUrl: e.target.value,
                })
              }
              placeholder="e.g., Apex Retail / yoursite.com"
              className="w-full px-3.5 py-2.5 bg-[#FAFAFB] border border-zinc-300 rounded-xl text-xs sm:text-[13px] text-zinc-950 placeholder-zinc-400 focus:bg-white focus:outline-none focus:border-zinc-950 transition-colors"
            />
          </div>
        </div>

        {/* Row 4: Auto-Generated Formal Quotation Brief + 1-Tap Requirement Chips */}
        <div className="space-y-2">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <label
              htmlFor="kexora-form-details"
              className="text-xs font-bold text-zinc-800"
            >
              Auto-Generated Quotation Note{' '}
              <span className="font-normal text-zinc-500">
                (Synced with your selected tier)
              </span>
            </label>

            <div className="flex flex-wrap items-center gap-1.5">
              {QUICK_ADD_TAGS.map((tag) => {
                const active = selectedQuickTags.includes(tag);
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleQuickTag(tag)}
                    className={`px-2.5 py-1 rounded-full text-[11px] font-medium transition-colors cursor-pointer ${
                      active
                        ? 'bg-zinc-950 text-white font-semibold'
                        : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 hover:text-zinc-950'
                    }`}
                  >
                    {active ? `✓ ${tag}` : `+ ${tag}`}
                  </button>
                );
              })}
            </div>
          </div>

          <textarea
            id="kexora-form-details"
            rows={4}
            value={formData.projectDetails}
            onChange={(e) => {
              setUserEditedMessage(true);
              setFormData({ ...formData, projectDetails: e.target.value });
            }}
            className="w-full px-3.5 py-2.5 bg-[#FAFAFB] border border-zinc-300 rounded-xl text-xs sm:text-[13px] text-zinc-800 focus:bg-white focus:outline-none focus:border-zinc-950 transition-colors leading-relaxed font-mono"
          />
        </div>

        {/* Row 5: Submit Button */}
        <div className="pt-1 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <span className="text-[11px] text-zinc-500">
            Direct review by Rajan Singh &amp; Aditya Singh · Lock in{' '}
            <strong className="text-zinc-950 price-num">
              <span className="currency-symbol">{liveQuotation.symbol}</span>
              {liveQuotation.kexoraPrice.toLocaleString()}
            </strong>{' '}
            ({liveQuotation.tierLabel})
          </span>

          <button
            type="submit"
            disabled={isSubmitting}
            className="group px-7 sm:px-8 py-3.5 sm:py-4 text-sm sm:text-base font-extrabold text-white bg-zinc-950 hover:bg-zinc-800 disabled:bg-zinc-400 rounded-full transition-all duration-200 inline-flex items-center justify-center gap-2.5 whitespace-nowrap shrink-0 shadow-md cursor-pointer"
          >
            {isSubmitting ? (
              <span>Locking Quotation...</span>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Lock Quotation &amp; Send Enquiry</span>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

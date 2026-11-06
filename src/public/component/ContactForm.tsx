import React, { useState, useEffect } from 'react';
import { ProposalFormData } from '../../types';
import { KEXORA_COMPANY_INFO, KEXORA_SERVICE_PILLARS } from '../../data/agencyData';
import {
  Send,
  CheckCircle2,
  ArrowUpRight,
  Copy,
  Check,
  RotateCcw,
  ChevronDown,
  Wand2,
} from 'lucide-react';

interface ContactFormProps {
  initialService?: string;
  initialDetails?: string;
  variant?: 'page' | 'compact';
  onSuccessClose?: () => void;
}

const PLAN_OPTIONS = [
  'Beginner Plan (₹999/mo + ₹8,000 setup)',
  'Creative Plan (₹2,499/mo + ₹18,000 setup)',
  'Expert Plan (₹4,999/mo + ₹40,000+ setup)',
  'Single Service / Custom Quote',
];

const QUICK_ADD_TAGS = [
  'Need Fast Delivery',
  'Include Google SEO',
  'Need Logo & Branding',
  'Connect on WhatsApp',
];

/**
 * Smart Enquiry Matcher:
 * Automatically maps any clicked button/service/plan across the website
 * to the right Service Dropdown, Plan Dropdown, and pre-filled Project Brief.
 */
function resolveSmartEnquiryDefaults(
  rawService?: string,
  rawDetails?: string
): {
  serviceType: string;
  budgetRange: string;
  projectDetails: string;
  isAutoMatched: boolean;
} {
  const input = (rawService || '').trim();
  const lower = input.toLowerCase();

  let matchedService = 'Web Design & Custom Development';
  let matchedPlan = 'Creative Plan (₹2,499/mo + ₹18,000 setup)';
  let isAutoMatched = Boolean(input || rawDetails);

  // 1. Detect if user clicked a Pricing Plan button directly
  if (lower.includes('beginner plan')) {
    matchedPlan = 'Beginner Plan (₹999/mo + ₹8,000 setup)';
    matchedService = 'Single Page / Portfolio Website';
  } else if (lower.includes('creative plan')) {
    matchedPlan = 'Creative Plan (₹2,499/mo + ₹18,000 setup)';
    matchedService = 'Web Design & Custom Development';
  } else if (lower.includes('expert plan')) {
    matchedPlan = 'Expert Plan (₹4,999/mo + ₹40,000+ setup)';
    matchedService = 'Multi-Vendor E-Commerce & Online Stores';
  } else if (input) {
    matchedService = input;
    // Smartly pair recommended plan tier based on service type
    if (
      lower.includes('app') ||
      lower.includes('game') ||
      lower.includes('multi-vendor') ||
      lower.includes('e-commerce') ||
      lower.includes('ecommerce')
    ) {
      matchedPlan = 'Expert Plan (₹4,999/mo + ₹40,000+ setup)';
    } else if (
      lower.includes('gst') ||
      lower.includes('trademark') ||
      lower.includes('iso') ||
      lower.includes('logo') ||
      lower.includes('brochure') ||
      lower.includes('video')
    ) {
      matchedPlan = 'Single Service / Custom Quote';
    } else if (lower.includes('portfolio') || lower.includes('landing page')) {
      matchedPlan = 'Beginner Plan (₹999/mo + ₹8,000 setup)';
    }
  }

  // 2. Build smart pre-filled message so user doesn't have to type from scratch
  const generatedBrief =
    rawDetails && rawDetails.trim().length > 0
      ? rawDetails.trim()
      : `Hi Kexora Team, I would like to enquire about "${matchedService}" (${matchedPlan}). Please share the timeline, deliverables, and next steps.`;

  return {
    serviceType: matchedService,
    budgetRange: matchedPlan,
    projectDetails: generatedBrief,
    isAutoMatched,
  };
}

export const ContactForm: React.FC<ContactFormProps> = ({
  initialService = '',
  initialDetails = '',
  variant = 'page',
  onSuccessClose,
}) => {
  const initialResolved = resolveSmartEnquiryDefaults(
    initialService,
    initialDetails
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

  // Sync automatically whenever the user clicks an enquiry trigger from any page
  useEffect(() => {
    const resolved = resolveSmartEnquiryDefaults(initialService, initialDetails);
    setFormData((prev) => ({
      ...prev,
      serviceType: resolved.serviceType,
      budgetRange: resolved.budgetRange,
      projectDetails: resolved.projectDetails,
    }));
    setUserEditedMessage(Boolean(initialDetails));
  }, [initialService, initialDetails]);

  // Build flat list of all services so any custom incoming service title is always present in the dropdown
  const allCatalogServices = KEXORA_SERVICE_PILLARS.flatMap((p) => p.items);
  const coreServices = [
    'Web Design & Custom Development',
    'Mobile App & Game Development',
    'Multi-Vendor E-Commerce & Online Stores',
    'Digital Marketing, SEO & AI-SEO',
    'Creative UI/UX, Logo & Video Design',
    'Business, GST, Trademark & ISO Registration',
    'Single Page / Portfolio Website',
  ];

  const isCustomServiceValue =
    formData.serviceType &&
    !coreServices.includes(formData.serviceType) &&
    !allCatalogServices.includes(formData.serviceType);

  const updateSmartBrief = (
    nextService: string,
    nextPlan: string,
    tags: string[]
  ) => {
    const tagSuffix =
      tags.length > 0 ? ` Key preferences: ${tags.join(', ')}.` : '';
    return `Hi Kexora Team, I would like to enquire about "${nextService}" (${nextPlan}).${tagSuffix} Please share the timeline and quote.`;
  };

  const handleServiceChange = (nextService: string) => {
    const lower = nextService.toLowerCase();
    let suggestedPlan = formData.budgetRange;
    if (
      lower.includes('app') ||
      lower.includes('game') ||
      lower.includes('multi-vendor')
    ) {
      suggestedPlan = 'Expert Plan (₹4,999/mo + ₹40,000+ setup)';
    } else if (
      lower.includes('gst') ||
      lower.includes('trademark') ||
      lower.includes('iso') ||
      lower.includes('logo') ||
      lower.includes('pdf') ||
      lower.includes('video')
    ) {
      suggestedPlan = 'Single Service / Custom Quote';
    } else if (lower.includes('landing page') || lower.includes('portfolio')) {
      suggestedPlan = 'Beginner Plan (₹999/mo + ₹8,000 setup)';
    } else if (suggestedPlan === 'Single Service / Custom Quote') {
      suggestedPlan = 'Creative Plan (₹2,499/mo + ₹18,000 setup)';
    }

    setFormData((prev) => ({
      ...prev,
      serviceType: nextService,
      budgetRange: suggestedPlan,
      projectDetails: userEditedMessage
        ? prev.projectDetails
        : updateSmartBrief(nextService, suggestedPlan, selectedQuickTags),
    }));
  };

  const handlePlanChange = (nextPlan: string) => {
    setFormData((prev) => ({
      ...prev,
      budgetRange: nextPlan,
      projectDetails: userEditedMessage
        ? prev.projectDetails
        : updateSmartBrief(prev.serviceType, nextPlan, selectedQuickTags),
    }));
  };

  const toggleQuickTag = (tag: string) => {
    const exists = selectedQuickTags.includes(tag);
    const nextTags = exists
      ? selectedQuickTags.filter((t) => t !== tag)
      : [...selectedQuickTags, tag];
    setSelectedQuickTags(nextTags);

    setFormData((prev) => ({
      ...prev,
      projectDetails: updateSmartBrief(
        prev.serviceType,
        prev.budgetRange,
        nextTags
      ),
    }));
    setUserEditedMessage(false);
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [copiedRef, setCopiedRef] = useState(false);

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
      const data = await response.json();
      if (data.success) {
        setSubmittedRef(data.referenceId || 'KX-984210');
      } else {
        setErrorMsg(data.error || 'Could not submit your enquiry. Please try again.');
      }
    } catch {
      setErrorMsg('Network error. Please check your connection and try again.');
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
            SLA · 1–2 Business Days
          </span>
        </div>

        <div className="space-y-1.5">
          <h3 className="text-2xl font-bold text-zinc-950 font-[Outfit] tracking-tight">
            Enquiry Received by Kexora Studio
          </h3>
          <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
            Thank you, <strong className="text-zinc-950 font-semibold">{formData.name}</strong>. Rajan Singh and Aditya Singh’s engineering desk has logged your brief and will reach out to{' '}
            <strong className="text-zinc-950 font-semibold">{formData.email}</strong>.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-[#FAFAFB] border border-zinc-200/90 space-y-2.5 text-xs">
          <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-zinc-200/80">
            <span className="text-zinc-500">Enquiry Reference ID</span>
            <div className="inline-flex items-center gap-2">
              <span className="font-mono font-bold text-zinc-950 tabular-nums">
                {submittedRef}
              </span>
              <button
                type="button"
                onClick={handleCopyRef}
                aria-label="Copy Reference ID"
                className="p-1 rounded-md bg-white border border-zinc-200 hover:border-zinc-950 text-zinc-700 hover:text-zinc-950 transition-colors"
              >
                {copiedRef ? (
                  <Check className="w-3.5 h-3.5 text-zinc-950" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between gap-4">
            <span className="text-zinc-500">Selected Service</span>
            <span className="font-semibold text-zinc-950 text-right">
              {formData.serviceType}
            </span>
          </div>

          <div className="flex items-center justify-between gap-4">
            <span className="text-zinc-500">Preferred Plan</span>
            <span className="font-semibold text-zinc-950 text-right">
              {formData.budgetRange}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={handleReset}
            className="px-4 py-2.5 text-xs font-bold text-zinc-700 hover:text-zinc-950 bg-zinc-100 hover:bg-zinc-200/80 rounded-full transition-colors inline-flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>New Enquiry</span>
          </button>

          {onSuccessClose && (
            <button
              type="button"
              onClick={onSuccessClose}
              className="px-5 py-2.5 text-xs font-bold text-white bg-zinc-950 hover:bg-zinc-800 rounded-full transition-colors"
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
      {/* Compact Header with Smart Auto-Fill Indicator */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-5 mb-5 border-b border-zinc-200/80">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-zinc-950 font-[Outfit] tracking-tight">
            Quick Project Enquiry
          </h2>
          <p className="text-xs text-zinc-500 mt-0.5">
            Service and project details are auto-filled—just enter your contact info.
          </p>
        </div>

        <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-zinc-700 bg-[#F4F4F6] px-3 py-1.5 rounded-full self-start sm:self-auto shrink-0">
          <Wand2 className="w-3.5 h-3.5 text-zinc-950" />
          <span>Smart Auto-Fill Active</span>
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
            className="text-zinc-300 hover:text-white underline text-[11px] shrink-0"
          >
            Dismiss
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        {/* Row 1: Compact Smart Dropdowns (Service + Pricing Plan) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div>
            <label
              htmlFor="kexora-service-select"
              className="text-xs font-bold text-zinc-800 block mb-1"
            >
              1. Select Service / Requirement
            </label>
            <div className="relative">
              <select
                id="kexora-service-select"
                value={formData.serviceType}
                onChange={(e) => handleServiceChange(e.target.value)}
                className="w-full appearance-none pl-3.5 pr-9 py-2.5 bg-[#FAFAFB] border border-zinc-300 hover:border-zinc-400 focus:bg-white focus:border-zinc-950 rounded-xl text-xs sm:text-[13px] font-semibold text-zinc-950 focus:outline-none transition-colors cursor-pointer"
              >
                {isCustomServiceValue && (
                  <optgroup label="Selected From Page">
                    <option value={formData.serviceType}>
                      {formData.serviceType}
                    </option>
                  </optgroup>
                )}

                <optgroup label="Core Kexora Solutions">
                  {coreServices.map((srv) => (
                    <option key={srv} value={srv}>
                      {srv}
                    </option>
                  ))}
                </optgroup>

                {KEXORA_SERVICE_PILLARS.map((pillar) => (
                  <optgroup key={pillar.category} label={pillar.category}>
                    {pillar.items.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-zinc-500 pointer-events-none absolute right-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div>
            <label
              htmlFor="kexora-plan-select"
              className="text-xs font-bold text-zinc-800 block mb-1"
            >
              2. Preferred Plan / Budget Tier
            </label>
            <div className="relative">
              <select
                id="kexora-plan-select"
                value={formData.budgetRange}
                onChange={(e) => handlePlanChange(e.target.value)}
                className="w-full appearance-none pl-3.5 pr-9 py-2.5 bg-[#FAFAFB] border border-zinc-300 hover:border-zinc-400 focus:bg-white focus:border-zinc-950 rounded-xl text-xs sm:text-[13px] font-semibold text-zinc-950 focus:outline-none transition-colors cursor-pointer"
              >
                {!PLAN_OPTIONS.includes(formData.budgetRange) && (
                  <option value={formData.budgetRange}>
                    {formData.budgetRange}
                  </option>
                )}
                {PLAN_OPTIONS.map((plan) => (
                  <option key={plan} value={plan}>
                    {plan}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-zinc-500 pointer-events-none absolute right-3 top-1/2 -translate-y-1/2" />
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

        {/* Row 4: Auto-Generated Smart Brief + 1-Tap Requirement Chips */}
        <div className="space-y-2">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <label
              htmlFor="kexora-form-details"
              className="text-xs font-bold text-zinc-800"
            >
              Auto-Filled Project Note{' '}
              <span className="font-normal text-zinc-500">
                (Ready to send or edit)
              </span>
            </label>

            {/* 1-Click Add-on Chips so user doesn't need to type */}
            <div className="flex flex-wrap items-center gap-1.5">
              {QUICK_ADD_TAGS.map((tag) => {
                const active = selectedQuickTags.includes(tag);
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleQuickTag(tag)}
                    className={`px-2.5 py-1 rounded-full text-[11px] font-medium transition-colors ${
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
            rows={2}
            value={formData.projectDetails}
            onChange={(e) => {
              setUserEditedMessage(true);
              setFormData({ ...formData, projectDetails: e.target.value });
            }}
            className="w-full px-3.5 py-2.5 bg-[#FAFAFB] border border-zinc-300 rounded-xl text-xs sm:text-[13px] text-zinc-800 focus:bg-white focus:outline-none focus:border-zinc-950 transition-colors leading-relaxed"
          />
        </div>

        {/* Row 5: Submit Button */}
        <div className="pt-1 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <span className="text-[11px] text-zinc-500">
            Direct review by Rajan Singh &amp; Aditya Singh · 1–2 Days SLA
          </span>

          <button
            type="submit"
            disabled={isSubmitting}
            className="group px-6 py-3.5 text-xs sm:text-sm font-bold text-white bg-zinc-950 hover:bg-zinc-800 disabled:bg-zinc-400 rounded-full transition-all duration-200 inline-flex items-center justify-center gap-2 whitespace-nowrap shrink-0 shadow-sm"
          >
            {isSubmitting ? (
              <span>Sending Enquiry...</span>
            ) : (
              <>
                <Send className="w-3.5 h-3.5" />
                <span>Send Enquiry Now</span>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

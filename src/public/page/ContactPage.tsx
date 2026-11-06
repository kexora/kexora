import React, { useState } from 'react';
import { ActiveTab } from '../../types';
import { KEXORA_COMPANY_INFO } from '../../data/agencyData';
import { ContactForm } from '../component/ContactForm';
import { ProtectedImage, KEXORA_MEDIA_VAULT } from '../component/ProtectedImage';
import {
  Mail,
  MapPin,
  Clock,
  Copy,
  Check,
  ArrowRight,
  ArrowUpRight,
} from 'lucide-react';

interface ContactPageProps {
  initialService?: string;
  initialDetails?: string;
  onNavigatePage: (page: ActiveTab) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({
  initialService,
  initialDetails,
  onNavigatePage,
}) => {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(KEXORA_COMPANY_INFO.contact.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const onboardingSteps = [
    {
      index: '01',
      title: 'Technical & Strategy Review',
      desc: 'Rajan Singh (CEO) and Aditya Singh (CTO) personally review your project brief, current website speed, and business goals.',
    },
    {
      index: '02',
      title: 'Clear Scope, Timeline & Pricing',
      desc: 'Within 1–2 business days, you receive a transparent proposal with exact deliverables, milestone dates, and zero hidden costs.',
    },
    {
      index: '03',
      title: 'Kickoff & 0.3s Custom Engineering',
      desc: 'We begin designing and coding your custom website, e-commerce store, mobile app, or game with weekly live preview links.',
    },
  ];

  return (
    <div className="bg-white text-zinc-950 min-h-screen">
      {/* Dark Blurred Studio Banner */}
      <section className="relative pt-28 pb-14 sm:pt-32 sm:pb-16 overflow-hidden bg-zinc-950 text-white">
        <div className="absolute inset-0 z-0">
          <ProtectedImage
            src={KEXORA_MEDIA_VAULT.HERO_BG}
            alt="Contact Kexora Studio Background"
            className="w-full h-full object-cover scale-105 blur-md opacity-45"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/90 via-zinc-900/75 to-zinc-900/60" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="space-y-3 max-w-3xl">
            <div className="text-xs font-semibold uppercase tracking-widest text-zinc-300">
              Contact Kexora Studio · Direct Engineering Desk
            </div>
            <h1
              className="text-3xl sm:text-5xl font-bold tracking-tight text-white font-[Outfit] leading-[1.12]"
              style={{ textWrap: 'balance' }}
            >
              Let’s Build Your Website, App, or Digital Brand
            </h1>
            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed max-w-2xl">
              Have a project in mind or want to launch a fast custom website, e-commerce store, or mobile app? Reach out directly to our team in{' '}
              <span className="text-white font-semibold">
                Siwan, Bihar (841226)
              </span>{' '}
              — serving businesses across India and globally.
            </p>
          </div>

          {/* Open Studio Highlights Row */}
          <div className="flex flex-wrap items-center gap-x-12 gap-y-4 pt-2">
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white font-[Outfit] tabular-nums">
                1–2 Days
              </div>
              <div className="text-xs text-zinc-400 mt-0.5">
                Proposal &amp; Audit Turnaround
              </div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white font-[Outfit] tabular-nums">
                24/7
              </div>
              <div className="text-xs text-zinc-400 mt-0.5">
                Priority Client Support
              </div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white font-[Outfit] tabular-nums">
                841226
              </div>
              <div className="text-xs text-zinc-400 mt-0.5">
                Siwan, Bihar Headquarters
              </div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white font-[Outfit] tabular-nums">
                0.3s
              </div>
              <div className="text-xs text-zinc-400 mt-0.5">
                Target Load-Time Standard
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main 2-Column Split: Studio Direct Channels (Left) + Compact Smart Enquiry Form (Right) */}
      <section className="py-12 sm:py-16 bg-[#FAFAFB] text-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* Left Column: Direct Studio Info, Leadership & Onboarding Flow */}
            <div className="lg:col-span-5 space-y-8">
              {/* Direct Contact Details */}
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                    Direct Studio Channels
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950 font-[Outfit]">
                    Speak Directly With the Engineers Building Your Product
                  </h2>
                  <p className="text-sm text-zinc-600 leading-relaxed">
                    At Kexora, there are no middlemen or sales scripts. Every project enquiry goes straight to our leadership and core development team.
                  </p>
                </div>

                {/* Email Channel */}
                <div className="pt-2 space-y-5">
                  <div className="flex items-start justify-between gap-4 pb-5 border-b border-zinc-200/80">
                    <div className="flex items-start gap-3.5">
                      <div className="w-10 h-10 rounded-full bg-zinc-950 text-white flex items-center justify-center shrink-0 mt-0.5">
                        <Mail className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-zinc-500">
                          Official Studio Email
                        </div>
                        <a
                          href={`mailto:${KEXORA_COMPANY_INFO.contact.email}`}
                          className="text-sm sm:text-base font-bold text-zinc-950 hover:underline underline-offset-4 break-all"
                        >
                          {KEXORA_COMPANY_INFO.contact.email}
                        </a>
                        <div className="text-xs text-zinc-500 mt-0.5">
                          Direct inbox for project proposals, SEO audits &amp; client support
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      className="px-3 py-1.5 rounded-full bg-white border border-zinc-300 hover:border-zinc-950 text-xs font-semibold text-zinc-800 hover:text-zinc-950 transition-colors inline-flex items-center gap-1.5 shrink-0"
                    >
                      {copiedEmail ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Location Channel */}
                  <div className="flex items-start gap-3.5 pb-5 border-b border-zinc-200/80">
                    <div className="w-10 h-10 rounded-full bg-zinc-950 text-white flex items-center justify-center shrink-0 mt-0.5">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-zinc-500">
                        Operations &amp; Studio Headquarters
                      </div>
                      <div className="text-sm sm:text-base font-bold text-zinc-950">
                        Siwan, Bihar — 841226, India
                      </div>
                      <div className="text-xs text-zinc-500 mt-0.5">
                        Rooted in Bihar · Serving Clients Across India &amp; Globally
                      </div>
                    </div>
                  </div>

                  {/* Support Hours & SLA */}
                  <div className="flex items-start gap-3.5 pb-5 border-b border-zinc-200/80">
                    <div className="w-10 h-10 rounded-full bg-zinc-950 text-white flex items-center justify-center shrink-0 mt-0.5">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-zinc-500">
                        Response Time &amp; Availability
                      </div>
                      <div className="text-sm sm:text-base font-bold text-zinc-950">
                        1–2 Business Days Proposal SLA
                      </div>
                      <div className="text-xs text-zinc-500 mt-0.5">
                        24/7 Priority Engineering Support for Active Clients
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Leadership Direct Desk */}
              <div className="space-y-4">
                <div className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                  Leadership Reviewing Your Brief
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-white border border-zinc-200/90">
                    <ProtectedImage
                      src={KEXORA_MEDIA_VAULT.RAJAN_KX}
                      alt="Rajan Singh — CEO & Strategy Head"
                      className="w-11 h-11 object-contain shrink-0"
                    />
                    <div className="min-w-0">
                      <div className="text-sm font-bold text-zinc-950 font-[Outfit] truncate">
                        Rajan Singh
                      </div>
                      <div className="text-xs text-zinc-500 truncate">
                        CEO &amp; Strategy Head
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-white border border-zinc-200/90">
                    <ProtectedImage
                      src={KEXORA_MEDIA_VAULT.ADITYA_CTO}
                      alt="Aditya Singh — CTO & Lead Developer"
                      className="w-11 h-11 rounded-full object-cover shrink-0"
                    />
                    <div className="min-w-0">
                      <div className="text-sm font-bold text-zinc-950 font-[Outfit] truncate">
                        Aditya Singh
                      </div>
                      <div className="text-xs text-zinc-500 truncate">
                        CTO &amp; Lead Developer
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* What Happens After You Submit (Open 3-Step Flow) */}
              <div className="space-y-4 pt-2">
                <div className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                  What Happens After You Reach Out
                </div>
                <div className="space-y-4">
                  {onboardingSteps.map((step) => (
                    <div key={step.index} className="flex items-start gap-3.5">
                      <span className="text-xs font-mono font-bold text-zinc-950 pt-0.5 tabular-nums">
                        {step.index}.
                      </span>
                      <div className="space-y-0.5">
                        <h3 className="text-sm font-bold text-zinc-950 font-[Outfit]">
                          {step.title}
                        </h3>
                        <p className="text-xs text-zinc-600 leading-relaxed">
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Helpful Quick Links */}
              <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-bold text-zinc-950">
                <button
                  type="button"
                  onClick={() => onNavigatePage('pricing')}
                  className="inline-flex items-center gap-1.5 hover:opacity-70 transition-opacity"
                >
                  <span>Compare Pricing Plans</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <span className="text-zinc-300" aria-hidden="true">
                  ·
                </span>
                <button
                  type="button"
                  onClick={() => onNavigatePage('services')}
                  className="inline-flex items-center gap-1.5 hover:opacity-70 transition-opacity"
                >
                  <span>Explore All 4 Service Pillars</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Right Column: Interactive Contact Form Component */}
            <div className="lg:col-span-7">
              <ContactForm
                initialService={initialService}
                initialDetails={initialDetails}
                variant="page"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

import React, { useState } from 'react';
import { ActiveTab } from '../../types';
import { KEXORA_THEME, BlurKex } from '../universal';
import { CLIENT_TESTIMONIALS, FREQUENTLY_ASKED_QUESTIONS } from '../../data/agencyData';
import { ArrowRight, ArrowUpRight, ChevronDown } from 'lucide-react';

interface HomeImpactFaqSectionProps {
  openContactModal: (serviceName?: string, details?: string) => void;
  onNavigatePage: (page: ActiveTab) => void;
}

export const HomeImpactFaqSection: React.FC<HomeImpactFaqSectionProps> = ({
  openContactModal,
  onNavigatePage,
}) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <section
      id="home-reviews-faq"
      aria-label="Client Reviews and Frequently Asked Questions"
      className="py-20 sm:py-28 bg-white border-b border-zinc-200"
    >
      <div className={`${KEXORA_THEME.classes.container} space-y-20`}>
        {/* Verified Client Outcomes Row */}
        <div>
          <BlurKex direction="up" blurPx={14} className="max-w-2xl space-y-3 mb-12">
            <div className="text-xs font-extrabold uppercase tracking-[0.22em] text-zinc-500">
              06 · Verified Client Impact
            </div>
            <h2
              className="text-3xl sm:text-5xl font-extrabold tracking-tight text-zinc-950 font-[Outfit] leading-[1.08]"
              style={{ textWrap: 'balance' }}
            >
              Trusted by Founders for Speed &amp; Conversion
            </h2>
          </BlurKex>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {CLIENT_TESTIMONIALS.map((item, idx) => (
              <BlurKex
                key={item.author}
                direction="up"
                staggerIndex={idx}
                blurPx={14}
                className="p-8 rounded-3xl bg-[#F8F8FA] border border-zinc-200/90 flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="pb-3 border-b border-zinc-200 text-xs font-mono font-extrabold text-zinc-950 tabular-nums">
                    {item.outcome}
                  </div>
                  <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                </div>
                <div className="pt-4 border-t border-zinc-200/80 text-xs">
                  <div className="font-extrabold text-zinc-950 text-sm font-[Outfit]">
                    {item.author}
                  </div>
                  <div className="text-zinc-500 mt-0.5">
                    {item.role} · {item.company}
                  </div>
                </div>
              </BlurKex>
            ))}
          </div>
        </div>

        {/* Interactive FAQ Accordion */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pt-12 border-t border-zinc-200 items-start">
          <BlurKex direction="up" blurPx={14} className="lg:col-span-4 space-y-4">
            <div className="text-xs font-extrabold uppercase tracking-[0.22em] text-zinc-500">
              Direct Answers
            </div>
            <h3 className="text-2xl sm:text-4xl font-extrabold text-zinc-950 font-[Outfit] leading-tight">
              Frequently Asked Questions
            </h3>
            <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
              Have a specific technical or pricing question? Open a direct conversation with our engineering desk.
            </p>
            <button
              type="button"
              onClick={() => openContactModal('General Project Consultation')}
              className={KEXORA_THEME.classes.btnSecondaryOutline}
            >
              <span>Ask Our Team Directly</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </BlurKex>

          <div className="lg:col-span-8 space-y-3">
            {FREQUENTLY_ASKED_QUESTIONS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <BlurKex
                  key={faq.question}
                  direction="up"
                  staggerIndex={idx}
                  blurPx={10}
                  className="rounded-2xl bg-[#F8F8FA] border border-zinc-200/90 overflow-hidden"
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-5 sm:p-6 text-left text-sm sm:text-base font-extrabold text-zinc-950 flex items-center justify-between gap-4 hover:bg-zinc-100/80 transition-colors cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-zinc-950 shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-6 pt-2 text-xs sm:text-sm text-zinc-600 leading-relaxed border-t border-zinc-200/70 bg-white">
                      {faq.answer}
                    </div>
                  )}
                </BlurKex>
              );
            })}
          </div>
        </div>

        {/* Bottom High-Contrast Conversion Card */}
        <BlurKex
          direction="up"
          blurPx={16}
          className="p-8 sm:p-12 lg:p-14 rounded-3xl bg-zinc-950 text-white flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 shadow-2xl"
        >
          <div className="space-y-3 max-w-2xl">
            <div className={KEXORA_THEME.classes.kickerDark}>
              Ready to Launch Your Digital Brand?
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-[Outfit] leading-tight">
              Build Your Website, Mobile App, or Game With Kexora
            </h2>
            <p className="text-xs sm:text-base text-zinc-300 leading-relaxed">
              Speak directly with Rajan Singh and Aditya Singh for a free architecture consultation, transparent fixed quote, and rapid delivery roadmap.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3.5 shrink-0">
            <button
              type="button"
              onClick={() => openContactModal('New Website / App / Game Project')}
              className={KEXORA_THEME.classes.btnPrimaryWhite}
            >
              <span>Start Your Project</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => onNavigatePage('pricing')}
              className="px-7 py-4 text-sm sm:text-base font-extrabold text-white bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 rounded-full transition-colors inline-flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>Compare Pricing</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </BlurKex>
      </div>
    </section>
  );
};

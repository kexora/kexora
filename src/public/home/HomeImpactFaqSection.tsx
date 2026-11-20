import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ActiveTab } from '../../types';
import { KEXORA_THEME, BlurKex } from '../universal';
import { CLIENT_TESTIMONIALS, FREQUENTLY_ASKED_QUESTIONS } from '../../data/agencyData';
import { ArrowRight, ArrowUpRight, ChevronDown } from 'lucide-react';

interface HomeImpactFaqSectionProps {
  openContactModal: (serviceName?: string, details?: string) => void;
  onNavigatePage: (page: ActiveTab) => void;
}

const getInitials = (name: string) =>
  name
    .split(' ')
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();

export const HomeImpactFaqSection: React.FC<HomeImpactFaqSectionProps> = ({
  openContactModal,
  onNavigatePage,
}) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <section
      id="home-reviews-faq"
      aria-label="Client Reviews and Frequently Asked Questions"
      className="py-20 sm:py-28 bg-white border-b border-zinc-200/80"
    >
      <div className={`${KEXORA_THEME.classes.container} space-y-16 sm:space-y-20`}>
        {/* Verified Client Outcomes Row */}
        <div>
          <BlurKex direction="up" blurPx={10} className="max-w-2xl space-y-4 mb-10 sm:mb-12">
            <div className="inline-flex items-center gap-2 rounded-full bg-zinc-100 border border-zinc-200/90 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-zinc-700">
              <span>06</span>
              <span aria-hidden="true" className="text-zinc-400">·</span>
              <span>Verified Client Impact</span>
            </div>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-zinc-950 font-[Outfit] leading-[1.08]"
              style={{ textWrap: 'balance' }}
            >
              Trusted by Founders for Speed &amp; Conversion
            </h2>
          </BlurKex>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CLIENT_TESTIMONIALS.map((item, idx) => (
              <BlurKex
                key={item.author}
                direction="up"
                staggerIndex={idx}
                blurPx={10}
                className="h-full"
              >
                <article className="group h-full p-6 sm:p-7 rounded-[2rem] bg-[#F8F8FA] hover:bg-white border border-zinc-200/90 hover:border-zinc-950 flex flex-col justify-between space-y-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_50px_-18px_rgba(0,0,0,0.1)]">
                  <div className="space-y-4">
                    <span className="inline-flex items-center rounded-full bg-white border border-zinc-200/90 px-3.5 py-1.5 text-xs font-mono font-extrabold text-zinc-950 tabular-nums">
                      {item.outcome}
                    </span>
                    <p className="text-sm text-zinc-700 leading-relaxed">
                      &ldquo;{item.quote}&rdquo;
                    </p>
                  </div>

                  <div className="pt-4 border-t border-zinc-200/80 flex items-center gap-3">
                    <span
                      aria-hidden="true"
                      className="w-10 h-10 rounded-full bg-zinc-950 text-white text-xs font-extrabold font-[Outfit] flex items-center justify-center shrink-0"
                    >
                      {getInitials(item.author)}
                    </span>
                    <div className="min-w-0">
                      <div className="font-extrabold text-zinc-950 text-sm font-[Outfit] truncate">
                        {item.author}
                      </div>
                      <div className="text-xs text-zinc-500 truncate">
                        {item.role} · {item.company}
                      </div>
                    </div>
                  </div>
                </article>
              </BlurKex>
            ))}
          </div>
        </div>

        {/* Responsive FAQ Accordion:
            - All items collapsed by default (zero forced vertical height)
            - Mobile (< sm): Compact stacked header + full-width readable accordion rows
            - Tablet (sm–lg): Horizontal split header + CTA on right
            - Laptop/Desktop (lg+): Balanced 5/7 sticky left rail + compact pill-rounded accordion list */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 pt-9 sm:pt-11 border-t border-zinc-200/80 items-start">
          <BlurKex
            direction="up"
            blurPx={10}
            className="lg:col-span-5 lg:sticky lg:top-24 flex flex-col sm:flex-row sm:items-end lg:flex-col lg:items-start justify-between gap-4 sm:gap-6 lg:gap-4"
          >
            <div className="space-y-2.5 sm:space-y-3 max-w-md">
              <div className="inline-flex items-center gap-2 rounded-full bg-zinc-100 border border-zinc-200/90 px-3.5 py-1 text-[11px] sm:text-xs font-bold uppercase tracking-[0.16em] text-zinc-700">
                <span>Direct Answers · {FREQUENTLY_ASKED_QUESTIONS.length} FAQs</span>
              </div>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-zinc-950 font-[Outfit] leading-[1.1]">
                Frequently Asked Questions
              </h3>
              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                Tap any question below for instant clarity, or open a direct line with our engineering desk.
              </p>
            </div>

            <motion.button
              type="button"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => openContactModal('General Project Consultation')}
              className="w-full sm:w-auto justify-center px-5 sm:px-6 py-3 text-xs sm:text-sm font-extrabold text-zinc-950 bg-zinc-100 hover:bg-zinc-950 hover:text-white border border-zinc-300/90 hover:border-zinc-950 rounded-full transition-colors inline-flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>Ask Our Team Directly</span>
              <ArrowUpRight className="w-4 h-4" />
            </motion.button>
          </BlurKex>

          <div className="lg:col-span-7 space-y-2.5">
            {FREQUENTLY_ASKED_QUESTIONS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <BlurKex key={faq.question} direction="up" staggerIndex={idx} blurPx={8}>
                  <div
                    className={`rounded-2xl sm:rounded-[1.5rem] border transition-colors duration-200 overflow-hidden ${
                      isOpen
                        ? 'bg-white border-zinc-950 shadow-[0_12px_28px_-16px_rgba(0,0,0,0.16)]'
                        : 'bg-[#F8F8FA] border-zinc-200/90 hover:border-zinc-400'
                    }`}
                  >
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full px-4 sm:px-5 py-3.5 sm:py-4 text-left text-[13.5px] sm:text-[15px] font-extrabold text-zinc-950 flex items-center justify-between gap-3 cursor-pointer"
                    >
                      <span className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                        <span
                          className={`inline-flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-full text-[11px] font-mono font-extrabold tabular-nums shrink-0 transition-colors ${
                            isOpen
                              ? 'bg-zinc-950 text-white'
                              : 'bg-white text-zinc-600 border border-zinc-200/90'
                          }`}
                        >
                          0{idx + 1}
                        </span>
                        <span className="leading-snug">{faq.question}</span>
                      </span>

                      <span
                        className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                          isOpen
                            ? 'bg-zinc-950 text-white'
                            : 'bg-white text-zinc-700 border border-zinc-200/90'
                        }`}
                      >
                        <ChevronDown
                          className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-300 ${
                            isOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key="faq-answer"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-2.5 sm:pt-3 text-xs sm:text-sm text-zinc-600 leading-relaxed border-t border-zinc-200/70 sm:pl-[3.75rem]">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </BlurKex>
              );
            })}
          </div>
        </div>

        {/* Responsive Studio Conversion Block:
            - Mobile (< sm): No outer box (transparent, zero box border/padding/shadow), clean open content with top hairline divider
            - Laptop/Desktop (sm+): Elevated studio box with rounded-[2.25rem], soft surface, border, and shadow */}
        <BlurKex direction="up" blurPx={10}>
          <div className="pt-10 border-t border-zinc-200/80 sm:pt-10 lg:pt-12 sm:p-10 lg:p-12 sm:rounded-[2.25rem] sm:bg-[#F7F7F9] sm:border sm:border-zinc-200/90 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 sm:gap-8 sm:shadow-[0_22px_55px_-28px_rgba(0,0,0,0.12)]">
            <div className="space-y-3.5 max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-zinc-100 sm:bg-white border border-zinc-200/90 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-zinc-700">
                <span className="w-2 h-2 rounded-full bg-emerald-500" aria-hidden="true" />
                <span>Direct Architecture Call</span>
              </div>
              <h2
                className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-zinc-950 font-[Outfit] leading-[1.12]"
                style={{ textWrap: 'balance' }}
              >
                Build Your Website, Mobile App, or Game With Kexora
              </h2>
              <p className="text-sm sm:text-base text-zinc-600 leading-relaxed">
                Speak directly with Rajan Singh and Aditya Singh for a free architecture consultation, transparent fixed quote, and rapid delivery roadmap.
              </p>
              <div className="flex flex-wrap items-center gap-2 pt-0.5">
                {['0.3s Load Guarantee', 'Fixed Studio Quote', 'Direct Founder Access'].map(
                  (pill) => (
                    <span
                      key={pill}
                      className="inline-flex items-center rounded-full bg-zinc-100 sm:bg-white border border-zinc-200/90 px-3 py-1 text-xs font-semibold text-zinc-700"
                    >
                      {pill}
                    </span>
                  )
                )}
              </div>
            </div>

            <div className="w-full sm:w-auto grid grid-cols-1 min-[380px]:grid-cols-2 sm:flex sm:flex-wrap items-center gap-3 shrink-0 pt-1 sm:pt-0">
              <motion.button
                type="button"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => openContactModal('New Website / App / Game Project')}
                className="w-full sm:w-auto justify-center px-6 sm:px-7 py-3.5 text-sm sm:text-base font-extrabold text-white bg-zinc-950 hover:bg-zinc-800 rounded-full transition-colors inline-flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer shadow-[0_14px_30px_-10px_rgba(9,9,11,0.38)]"
              >
                <span>Start Your Project</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
              <motion.button
                type="button"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onNavigatePage('pricing')}
                className="w-full sm:w-auto justify-center px-6 py-3.5 text-sm sm:text-base font-extrabold text-zinc-950 bg-zinc-100 sm:bg-white hover:bg-zinc-200/80 sm:hover:bg-zinc-100 border border-zinc-300/90 hover:border-zinc-950 rounded-full transition-colors inline-flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
              >
                <span>Compare Pricing</span>
                <ArrowUpRight className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        </BlurKex>
      </div>
    </section>
  );
};

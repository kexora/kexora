import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CaseStudy } from '../../types';
import {
  KEXORA_THEME,
  ProtectedImage,
  BlurKex,
  useContextualTabTitle,
} from '../universal';
import { CASE_STUDIES } from '../../data/agencyData';
import { ArrowRight, ArrowUpRight, Check, X } from 'lucide-react';

interface HomeCaseStudiesSectionProps {
  openContactModal: (serviceName?: string, details?: string) => void;
}

export const HomeCaseStudiesSection: React.FC<HomeCaseStudiesSectionProps> = ({
  openContactModal,
}) => {
  const [activeCaseIndex, setActiveCaseIndex] = useState<number>(0);
  const [selectedCaseModal, setSelectedCaseModal] = useState<CaseStudy | null>(null);

  useContextualTabTitle(
    selectedCaseModal
      ? `${selectedCaseModal.client.split('&')[0].trim()} Case Study`
      : null,
    30
  );

  const activeCase = CASE_STUDIES[activeCaseIndex] || CASE_STUDIES[0];

  return (
    <>
      <section
        id="home-case-studies"
        aria-label="Featured Client Engineering Results"
        className="py-20 sm:py-28 bg-[#F7F7F9] border-b border-zinc-200/80"
      >
        <div className={KEXORA_THEME.classes.container}>
          {/* Editorial Header + Separate Floating Case Study Pill Tabs */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 sm:gap-8 mb-10 sm:mb-12">
            <BlurKex direction="up" blurPx={10} className="max-w-2xl space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full bg-white border border-zinc-200/90 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-zinc-700 shadow-2xs">
                <span>02</span>
                <span aria-hidden="true" className="text-zinc-400">·</span>
                <span>Verified Production Benchmarks</span>
              </div>
              <h2
                className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-zinc-950 font-[Outfit] leading-[1.08]"
                style={{ textWrap: 'balance' }}
              >
                Real Code. Sub-Second Speed. Measurable ROI.
              </h2>
              <p className="text-sm sm:text-base text-zinc-600 leading-relaxed">
                Inspect how our custom web platforms, Digi Sagun mobile ecosystem, and multi-vendor stores transform slow legacy setups into category leaders.
              </p>
            </BlurKex>
          </div>

          {/* 3 Separate Floating Pill Tabs */}
          <div
            role="tablist"
            aria-label="Featured client case studies"
            className="flex flex-wrap items-center gap-3 mb-7"
          >
            {CASE_STUDIES.map((cs, idx) => {
              const isSelected = activeCaseIndex === idx;
              return (
                <motion.button
                  key={cs.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setActiveCaseIndex(idx)}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex-1 min-w-[210px] sm:min-w-fit px-5 py-3 rounded-full border text-xs sm:text-sm font-extrabold font-[Outfit] transition-all duration-200 inline-flex items-center justify-between sm:justify-center gap-3 cursor-pointer whitespace-nowrap ${
                    isSelected
                      ? 'bg-zinc-950 text-white border-zinc-950 shadow-[0_14px_30px_-10px_rgba(9,9,11,0.42)]'
                      : 'bg-white text-zinc-800 border-zinc-200/90 shadow-[0_6px_20px_-12px_rgba(9,9,11,0.14)] hover:border-zinc-950 hover:text-zinc-950'
                  }`}
                >
                  <span className="inline-flex items-center gap-2.5">
                    <span
                      className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-[11px] font-mono font-extrabold tabular-nums ${
                        isSelected
                          ? 'bg-white text-zinc-950'
                          : 'bg-zinc-100 text-zinc-700'
                      }`}
                    >
                      0{idx + 1}
                    </span>
                    <span>{cs.client.split('&')[0].trim()}</span>
                  </span>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[11px] font-mono font-extrabold tabular-nums ${
                      isSelected
                        ? 'bg-white/15 text-white'
                        : 'bg-zinc-100 text-zinc-700'
                    }`}
                  >
                    {cs.metric}
                  </span>
                </motion.button>
              );
            })}
          </div>

          {/* Interactive Split Spotlight Card — Clean Single-Elevation Architecture */}
          <div className="rounded-[2.25rem] bg-white border border-zinc-200/90 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.09)] overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCase.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="grid grid-cols-1 lg:grid-cols-12 items-stretch"
              >
                {/* Left Visual Spotlight Frame (5 cols) */}
                <div className="lg:col-span-5 relative min-h-[280px] sm:min-h-[360px] bg-zinc-950 overflow-hidden flex flex-col justify-between p-7 sm:p-9 text-white">
                  <ProtectedImage
                    src={activeCase.image}
                    alt={activeCase.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-50 scale-105 transition-transform duration-700"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/55 to-black/30"
                    aria-hidden="true"
                  />

                  <div className="relative z-10 flex items-center justify-between gap-2">
                    <span className="inline-flex items-center rounded-full bg-white/12 backdrop-blur-md border border-white/15 px-3.5 py-1 text-[11px] font-semibold text-zinc-100">
                      {activeCase.categoryLabel}
                    </span>
                    <span className="text-xs font-mono font-bold text-zinc-300 tabular-nums">
                      0{activeCaseIndex + 1} / 0{CASE_STUDIES.length}
                    </span>
                  </div>

                  <div className="relative z-10 space-y-3 pt-10">
                    <div className="text-4xl sm:text-5xl font-extrabold text-white font-mono tabular-nums tracking-tight">
                      {activeCase.metric}
                    </div>
                    <div className="text-xs sm:text-sm font-semibold text-zinc-200">
                      {activeCase.metricLabel} · {activeCase.client}
                    </div>
                    <div className="pt-2 flex flex-wrap gap-2">
                      {activeCase.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 rounded-full bg-white/12 backdrop-blur-sm border border-white/15 text-[11px] font-medium text-zinc-100"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Architectural Breakdown (7 cols — Clean Hairline Dividers, Zero Nested Boxes) */}
                <div className="lg:col-span-7 p-7 sm:p-10 lg:p-11 flex flex-col justify-between gap-7">
                  <div className="space-y-6">
                    <div className="space-y-2.5">
                      <div className="text-xs font-bold uppercase tracking-[0.14em] text-zinc-500">
                        {activeCase.client}
                      </div>
                      <h3
                        className="text-2xl sm:text-3xl font-extrabold text-zinc-950 font-[Outfit] leading-tight"
                        style={{ textWrap: 'balance' }}
                      >
                        {activeCase.title}
                      </h3>
                      <p className="text-sm sm:text-base text-zinc-600 leading-relaxed">
                        {activeCase.summary}
                      </p>
                    </div>

                    {/* Clean Editorial 2-Column Challenge vs Solution (Hairline Divided, No Nested Box Clutter) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 py-5 border-y border-zinc-200/80">
                      <div className="space-y-1.5">
                        <div className="text-xs font-extrabold uppercase tracking-[0.14em] text-zinc-500">
                          Challenge
                        </div>
                        <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed">
                          {activeCase.challenge}
                        </p>
                      </div>
                      <div className="space-y-1.5 sm:pl-6 sm:border-l sm:border-zinc-200/80">
                        <div className="text-xs font-extrabold uppercase tracking-[0.14em] text-zinc-950">
                          Kexora Solution
                        </div>
                        <p className="text-xs sm:text-sm text-zinc-800 leading-relaxed">
                          {activeCase.solution}
                        </p>
                      </div>
                    </div>

                    {/* Verified Results List */}
                    <div className="space-y-2.5">
                      <div className="text-xs font-extrabold uppercase tracking-[0.14em] text-zinc-500">
                        Verified Production Impact
                      </div>
                      <ul className="space-y-2">
                        {activeCase.results.map((res, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2.5 text-xs sm:text-sm font-semibold text-zinc-800"
                          >
                            <span className="w-5 h-5 rounded-full bg-zinc-950 text-white inline-flex items-center justify-center shrink-0 mt-0.5">
                              <Check className="w-3 h-3" />
                            </span>
                            <span>{res}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Pill Action Row */}
                  <div className="pt-5 border-t border-zinc-200/80 flex flex-wrap items-center justify-between gap-3">
                    <motion.button
                      type="button"
                      whileHover={{ y: -1 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedCaseModal(activeCase)}
                      className="px-5 sm:px-6 py-3 text-xs sm:text-sm font-extrabold text-zinc-950 bg-zinc-100 hover:bg-zinc-200/90 rounded-full transition-colors inline-flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      <span>Inspect Full Case Study</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </motion.button>

                    <motion.button
                      type="button"
                      whileHover={{ y: -1 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => openContactModal(`Similar to: ${activeCase.title}`)}
                      className="px-6 sm:px-7 py-3 text-xs sm:text-sm font-extrabold text-white bg-zinc-950 hover:bg-zinc-800 rounded-full transition-colors inline-flex items-center gap-2 whitespace-nowrap shrink-0 shadow-md cursor-pointer"
                    >
                      <span>Build a Similar Project</span>
                      <ArrowRight className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Smooth Animated Case Study Modal */}
      <AnimatePresence>
        {selectedCaseModal && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="home-case-study-modal-title"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={() => setSelectedCaseModal(null)}
            className="fixed inset-0 z-50 bg-black/65 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 8 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl bg-white border border-zinc-200 rounded-[2rem] p-6 sm:p-8 space-y-5 shadow-2xl text-zinc-950"
            >
              <button
                type="button"
                aria-label="Close project details"
                onClick={() => setSelectedCaseModal(null)}
                className="absolute top-4 right-4 p-2 text-zinc-500 hover:text-zinc-950 rounded-full hover:bg-zinc-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="inline-flex items-center rounded-full bg-zinc-100 px-3.5 py-1 text-xs font-bold text-zinc-700">
                {selectedCaseModal.client} · {selectedCaseModal.categoryLabel}
              </div>

              <h3
                id="home-case-study-modal-title"
                className="text-2xl font-extrabold text-zinc-950 font-[Outfit] pr-8"
              >
                {selectedCaseModal.title}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 py-4 border-y border-zinc-200 text-xs sm:text-sm">
                <div className="space-y-1.5">
                  <div className="font-extrabold text-zinc-950">The Problem</div>
                  <p className="text-zinc-600 leading-relaxed">
                    {selectedCaseModal.challenge}
                  </p>
                </div>
                <div className="space-y-1.5 sm:pl-5 sm:border-l sm:border-zinc-200">
                  <div className="font-extrabold text-zinc-950">How Kexora Solved It</div>
                  <p className="text-zinc-600 leading-relaxed">
                    {selectedCaseModal.solution}
                  </p>
                </div>
              </div>

              <div className="space-y-2.5">
                <div className="text-xs font-extrabold uppercase tracking-wider text-zinc-500">
                  Key Results
                </div>
                <ul className="space-y-2 text-xs sm:text-sm text-zinc-700">
                  {selectedCaseModal.results.map((res, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-zinc-950 text-white inline-flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3" />
                      </span>
                      <span>{res}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-zinc-200 flex flex-wrap items-center justify-between gap-3">
                <span className="text-xs text-zinc-500 font-medium">
                  {selectedCaseModal.techStack.join(' · ')}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    const title = selectedCaseModal.title;
                    setSelectedCaseModal(null);
                    openContactModal(title);
                  }}
                  className="px-6 py-3 rounded-full bg-zinc-950 hover:bg-zinc-800 text-white text-xs sm:text-sm font-extrabold transition-colors cursor-pointer"
                >
                  Build a Similar Project
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

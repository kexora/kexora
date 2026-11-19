import React, { useState } from 'react';
import { CaseStudy } from '../../types';
import { KEXORA_THEME, ProtectedImage, BlurKex } from '../universal';
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

  const activeCase = CASE_STUDIES[activeCaseIndex] || CASE_STUDIES[0];

  return (
    <>
      <section
        id="home-case-studies"
        aria-label="Featured Client Engineering Results"
        className="py-20 sm:py-28 bg-[#F8F8FA] border-b border-zinc-200"
      >
        <div className={KEXORA_THEME.classes.container}>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14">
            <BlurKex direction="up" blurPx={14} className="max-w-2xl space-y-3">
              <div className="text-xs font-extrabold uppercase tracking-[0.22em] text-zinc-500">
                02 · Verified Production Benchmarks
              </div>
              <h2
                className="text-3xl sm:text-5xl font-extrabold tracking-tight text-zinc-950 font-[Outfit] leading-[1.08]"
                style={{ textWrap: 'balance' }}
              >
                Real Code. Sub-Second Speed. Measurable ROI.
              </h2>
              <p className="text-sm sm:text-base text-zinc-600 leading-relaxed">
                Inspect how our custom web platforms, Digi Sagun mobile ecosystem, and multi-vendor stores transform slow legacy setups into market leaders.
              </p>
            </BlurKex>

            {/* Case Study Switcher Pills */}
            <BlurKex direction="left" delay={0.1} blurPx={12}>
              <div className="inline-flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-white border border-zinc-200 shadow-sm">
                {CASE_STUDIES.map((cs, idx) => (
                  <button
                    key={cs.id}
                    type="button"
                    onClick={() => setActiveCaseIndex(idx)}
                    className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                      activeCaseIndex === idx
                        ? 'bg-zinc-950 text-white shadow-sm'
                        : 'text-zinc-600 hover:text-zinc-950'
                    }`}
                  >
                    0{idx + 1}. {cs.client.split('&')[0].trim()}
                  </button>
                ))}
              </div>
            </BlurKex>
          </div>

          {/* Interactive Split Spotlight Card */}
          <BlurKex
            key={activeCase.id}
            direction="up"
            blurPx={16}
            className="rounded-3xl bg-white border border-zinc-200/90 shadow-[0_24px_60px_-15px_rgba(0,0,0,0.08)] overflow-hidden grid grid-cols-1 lg:grid-cols-12"
          >
            {/* Left Visual Frame (5 cols) */}
            <div className="lg:col-span-5 relative min-h-[290px] sm:min-h-[360px] bg-zinc-950 overflow-hidden flex flex-col justify-between p-7 sm:p-9 text-white">
              <ProtectedImage
                src={activeCase.image}
                alt={activeCase.title}
                className="absolute inset-0 w-full h-full object-cover opacity-55 scale-105 transition-transform duration-700"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/30"
                aria-hidden="true"
              />

              <div className="relative z-10 flex items-center justify-between gap-2 text-xs font-mono text-zinc-300">
                <span>{activeCase.categoryLabel}</span>
                <span>CASE 0{activeCaseIndex + 1} / 03</span>
              </div>

              <div className="relative z-10 space-y-3 pt-12">
                <div className="text-4xl sm:text-5xl font-extrabold text-white font-mono tabular-nums tracking-tight">
                  {activeCase.metric}
                </div>
                <div className="text-xs sm:text-sm font-bold uppercase tracking-wider text-zinc-300">
                  {activeCase.metricLabel} · {activeCase.client}
                </div>
                <div className="pt-3 flex flex-wrap gap-2 text-[11px] font-mono text-zinc-300">
                  {activeCase.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-lg bg-white/10 backdrop-blur-sm border border-white/15"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Architectural Breakdown (7 cols) */}
            <div className="lg:col-span-7 p-7 sm:p-10 lg:p-12 flex flex-col justify-between space-y-8">
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                    {activeCase.client}
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-zinc-950 font-[Outfit] leading-tight">
                    {activeCase.title}
                  </h3>
                  <p className="text-sm sm:text-base text-zinc-600 leading-relaxed">
                    {activeCase.summary}
                  </p>
                </div>

                {/* Before / After Problem vs Solution Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-5 rounded-2xl bg-[#F8F8FA] border border-zinc-200/90 space-y-1.5">
                    <div className="text-xs font-extrabold uppercase tracking-wider text-zinc-500">
                      Before Kexora (Challenge)
                    </div>
                    <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed">
                      {activeCase.challenge}
                    </p>
                  </div>
                  <div className="p-5 rounded-2xl bg-zinc-950 text-white space-y-1.5">
                    <div className="text-xs font-extrabold uppercase tracking-wider text-zinc-400">
                      Kexora Engineering Solution
                    </div>
                    <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed">
                      {activeCase.solution}
                    </p>
                  </div>
                </div>

                {/* Verified Results List */}
                <div className="space-y-2.5">
                  <div className="text-xs font-extrabold uppercase tracking-wider text-zinc-500">
                    Verified Production Impact
                  </div>
                  <div className="grid grid-cols-1 gap-2">
                    {activeCase.results.map((res, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-2.5 text-xs sm:text-sm font-semibold text-zinc-800"
                      >
                        <Check className="w-4 h-4 text-zinc-950 shrink-0 mt-0.5" />
                        <span>{res}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-zinc-200 flex flex-wrap items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() => setSelectedCaseModal(activeCase)}
                  className="px-6 py-3.5 text-xs sm:text-sm font-extrabold text-zinc-950 bg-zinc-100 hover:bg-zinc-200 rounded-full transition-colors inline-flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <span>Inspect Full Case Study</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => openContactModal(`Similar to: ${activeCase.title}`)}
                  className={KEXORA_THEME.classes.btnPrimaryBlack}
                >
                  <span>Build a Similar Project</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </BlurKex>

          {/* Secondary Quick-Switch Row of All 3 Case Studies */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-7">
            {CASE_STUDIES.map((study, idx) => {
              const isCurrent = idx === activeCaseIndex;
              return (
                <BlurKex
                  key={study.id}
                  direction="up"
                  staggerIndex={idx}
                  blurPx={12}
                  className={`p-6 rounded-2xl border transition-all duration-300 flex flex-col justify-between cursor-pointer ${
                    isCurrent
                      ? 'bg-zinc-950 text-white border-zinc-950 shadow-lg'
                      : 'bg-white text-zinc-950 border-zinc-200 hover:border-zinc-950'
                  }`}
                  onClick={() => setActiveCaseIndex(idx)}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className={isCurrent ? 'text-zinc-400' : 'text-zinc-500'}>
                        0{idx + 1} · {study.categoryLabel}
                      </span>
                      <span className="font-extrabold tabular-nums">{study.metric}</span>
                    </div>
                    <h4 className="text-base font-extrabold font-[Outfit] leading-snug">
                      {study.title}
                    </h4>
                  </div>
                  <div className="pt-4 mt-4 border-t border-current/10 flex items-center justify-between text-xs font-bold">
                    <span>{isCurrent ? 'Currently Viewing Above' : 'Click to Preview'}</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </BlurKex>
              );
            })}
          </div>
        </div>
      </section>

      {/* Case Study Modal */}
      {selectedCaseModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="home-case-study-modal-title"
          className="fixed inset-0 z-50 bg-black/65 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
        >
          <div className="relative w-full max-w-2xl bg-white border border-zinc-200 rounded-3xl p-6 sm:p-8 space-y-5 shadow-2xl text-zinc-950">
            <button
              type="button"
              aria-label="Close project details"
              onClick={() => setSelectedCaseModal(null)}
              className="absolute top-4 right-4 p-2 text-zinc-500 hover:text-zinc-950 rounded-full hover:bg-zinc-100 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-xs text-zinc-500 font-bold uppercase tracking-wider">
              {selectedCaseModal.client} · {selectedCaseModal.categoryLabel}
            </div>

            <h3
              id="home-case-study-modal-title"
              className="text-2xl font-extrabold text-zinc-950 font-[Outfit]"
            >
              {selectedCaseModal.title}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-5 rounded-2xl bg-[#F8F8FA] border border-zinc-200 space-y-1.5">
                <div className="font-bold text-zinc-950">The Problem</div>
                <p className="text-zinc-600 leading-relaxed">
                  {selectedCaseModal.challenge}
                </p>
              </div>
              <div className="p-5 rounded-2xl bg-[#F8F8FA] border border-zinc-200 space-y-1.5">
                <div className="font-bold text-zinc-950">How Kexora Solved It</div>
                <p className="text-zinc-600 leading-relaxed">
                  {selectedCaseModal.solution}
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-xs font-bold text-zinc-950">Key Results</div>
              <ul className="space-y-2 text-xs text-zinc-700">
                {selectedCaseModal.results.map((res, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-zinc-950 shrink-0" />
                    <span>{res}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t border-zinc-200 flex items-center justify-between gap-3">
              <span className="text-xs text-zinc-500">
                {selectedCaseModal.techStack.join(' · ')}
              </span>
              <button
                type="button"
                onClick={() => {
                  const title = selectedCaseModal.title;
                  setSelectedCaseModal(null);
                  openContactModal(title);
                }}
                className={KEXORA_THEME.classes.btnPrimaryBlack}
              >
                Build a Similar Project
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

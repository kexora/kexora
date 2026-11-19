import React, { useState } from 'react';
import { CASE_STUDIES } from '../../data/agencyData';
import { CaseStudy } from '../../types';
import { KEXORA_THEME } from './theme';
import { ProtectedImage } from './ProtectedImage';
import { BlurKex } from '../../effect';
import { ArrowUpRight, Check, X } from 'lucide-react';

interface PortfolioProps {
  openContactModal: (serviceName?: string) => void;
}

export const Portfolio: React.FC<PortfolioProps> = ({ openContactModal }) => {
  const [filter, setFilter] = useState<string>('all');
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<CaseStudy | null>(null);

  const filteredStudies =
    filter === 'all'
      ? CASE_STUDIES
      : CASE_STUDIES.filter((cs) => cs.category === filter);

  return (
    <section id="portfolio" className={KEXORA_THEME.classes.sectionWhite}>
      <div className={KEXORA_THEME.classes.container}>
        <BlurKex
          direction="up"
          blurPx={14}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6"
        >
          <div>
            <div className={KEXORA_THEME.classes.kicker}>
              Our Work · Featured Projects
            </div>
            <h2
              className={KEXORA_THEME.classes.heading2}
              style={{ textWrap: 'balance' }}
            >
              Recent Projects & Client Results
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-[#F8F8FA] rounded-full border border-zinc-200">
            {[
              { id: 'all', label: 'All Projects' },
              { id: 'custom-web', label: 'Custom Websites' },
              { id: 'digital-product', label: 'Mobile Apps & Digi Sagun' },
              { id: 'e-commerce', label: 'E-Commerce Stores' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setFilter(tab.id)}
                className={`px-5 py-2.5 text-sm font-bold rounded-full transition-all duration-300 whitespace-nowrap shrink-0 cursor-pointer ${
                  filter === tab.id
                    ? 'bg-zinc-950 text-white shadow-sm'
                    : 'text-zinc-600 hover:text-zinc-950'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </BlurKex>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredStudies.map((study, idx) => (
            <BlurKex
              key={study.id}
              as="article"
              direction="up"
              staggerIndex={idx}
              blurPx={14}
              className={`group overflow-hidden flex flex-col justify-between ${KEXORA_THEME.classes.cardOnWhite}`}
            >
              <div>
                <div className="relative aspect-[16/10] overflow-hidden bg-zinc-900">
                  <ProtectedImage
                    src={study.image}
                    alt={study.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                  <div className="absolute bottom-3 left-5 right-5 flex items-baseline justify-between">
                    <span className="text-xs text-zinc-200 font-medium">
                      {study.client}
                    </span>
                    <span className="text-sm font-extrabold text-white font-mono tabular-nums">
                      {study.metric} {study.metricLabel}
                    </span>
                  </div>
                </div>

                <div className="p-7 space-y-2.5">
                  <div className="text-xs font-semibold text-zinc-500">
                    {study.categoryLabel}
                  </div>
                  <h3 className="text-lg font-extrabold text-zinc-950 font-[Outfit]">
                    {study.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                    {study.summary}
                  </p>
                </div>
              </div>

              <div className="px-7 py-4 border-t border-zinc-200/80 flex items-center justify-between gap-2">
                <div className="text-[11px] text-zinc-500 truncate">
                  {study.techStack.slice(0, 3).join(' · ')}
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedCaseStudy(study)}
                  className="px-4.5 py-2 text-sm font-bold text-zinc-950 bg-white group-hover:bg-zinc-950 group-hover:text-white border border-zinc-300 group-hover:border-zinc-950 rounded-full flex items-center gap-1.5 whitespace-nowrap shrink-0 transition-all duration-300 cursor-pointer"
                >
                  <span>View Details</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </BlurKex>
          ))}
        </div>
      </div>

      {selectedCaseStudy && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="case-study-modal-title"
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
        >
          <div className="relative w-full max-w-2xl bg-white border border-zinc-200 rounded-3xl p-6 sm:p-8 space-y-5 shadow-2xl text-zinc-950">
            <button
              type="button"
              aria-label="Close project details"
              onClick={() => setSelectedCaseStudy(null)}
              className="absolute top-4 right-4 p-2 text-zinc-500 hover:text-zinc-950 rounded-full hover:bg-zinc-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-xs text-zinc-500 font-bold uppercase tracking-wider">
              {selectedCaseStudy.client} · {selectedCaseStudy.categoryLabel}
            </div>

            <h3
              id="case-study-modal-title"
              className="text-2xl font-extrabold text-zinc-950 font-[Outfit]"
            >
              {selectedCaseStudy.title}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-5 rounded-2xl bg-[#F8F8FA] border border-zinc-200 space-y-1.5">
                <div className="font-bold text-zinc-950">The Problem</div>
                <p className="text-zinc-600 leading-relaxed">
                  {selectedCaseStudy.challenge}
                </p>
              </div>
              <div className="p-5 rounded-2xl bg-[#F8F8FA] border border-zinc-200 space-y-1.5">
                <div className="font-bold text-zinc-950">How Kexora Solved It</div>
                <p className="text-zinc-600 leading-relaxed">
                  {selectedCaseStudy.solution}
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-xs font-bold text-zinc-950">Key Results</div>
              <ul className="space-y-2 text-xs text-zinc-700">
                {selectedCaseStudy.results.map((res, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-zinc-950 shrink-0" />
                    <span>{res}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t border-zinc-200 flex items-center justify-between">
              <span className="text-xs text-zinc-500">
                {selectedCaseStudy.techStack.join(' · ')}
              </span>
              <button
                type="button"
                onClick={() => {
                  const title = selectedCaseStudy.title;
                  setSelectedCaseStudy(null);
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
    </section>
  );
};

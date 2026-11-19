import React, { useState } from 'react';
import { CLIENT_TESTIMONIALS, FREQUENTLY_ASKED_QUESTIONS } from '../../data/agencyData';
import { KEXORA_THEME } from './theme';
import { BlurKex } from '../../effect';
import { ChevronDown } from 'lucide-react';

export const TestimonialsFaq: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <section className={KEXORA_THEME.classes.sectionMuted}>
      <div className={`${KEXORA_THEME.classes.container} space-y-20`}>
        <div>
          <BlurKex direction="up" blurPx={14} className="mb-12">
            <div className={KEXORA_THEME.classes.kicker}>
              Client Reviews & Results
            </div>
            <h2
              className={KEXORA_THEME.classes.heading2}
              style={{ textWrap: 'balance' }}
            >
              What Our Clients Say About Kexora
            </h2>
          </BlurKex>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {CLIENT_TESTIMONIALS.map((t, idx) => (
              <BlurKex
                key={idx}
                direction="up"
                staggerIndex={idx}
                blurPx={14}
                className={`p-8 flex flex-col justify-between space-y-6 ${KEXORA_THEME.classes.cardOnMuted}`}
              >
                <div className="space-y-4">
                  <div className="text-xs font-mono font-bold text-zinc-950 tabular-nums">
                    {t.outcome}
                  </div>
                  <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed">
                    "{t.quote}"
                  </p>
                </div>

                <footer className="pt-4 border-t border-zinc-200 text-xs">
                  <div className="font-bold text-zinc-950">{t.author}</div>
                  <div className="text-zinc-500 mt-0.5">
                    {t.role} · {t.company}
                  </div>
                </footer>
              </BlurKex>
            ))}
          </div>
        </div>

        <div className="max-w-4xl mx-auto pt-12 border-t border-zinc-200">
          <BlurKex direction="up" blurPx={14} className="mb-10">
            <div className={KEXORA_THEME.classes.kicker}>
              Common Questions
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-zinc-950 font-[Outfit]">
              Frequently Asked Questions
            </h3>
          </BlurKex>

          <div className="space-y-3">
            {FREQUENTLY_ASKED_QUESTIONS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <BlurKex
                  key={idx}
                  direction="up"
                  staggerIndex={idx}
                  blurPx={10}
                  className="rounded-2xl bg-white border border-zinc-200 overflow-hidden transition-colors"
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-5 sm:p-6 text-left text-sm font-bold text-zinc-950 flex items-center justify-between gap-4 hover:bg-zinc-50 transition-colors"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-zinc-950 shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-6 pt-2 text-xs sm:text-sm text-zinc-600 leading-relaxed border-t border-zinc-100 bg-[#F8F8FA]/60">
                      {faq.answer}
                    </div>
                  )}
                </BlurKex>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

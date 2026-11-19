import React, { useState } from 'react';
import { ActiveTab, NewsArticle } from '../../types';
import { KEXORA_THEME, ProtectedImage, KEXORA_MEDIA_VAULT, BlurKex } from '../universal';
import { KEXORA_COMPANY_INFO, NEWS_ARTICLES } from '../../data/agencyData';
import { ArrowRight, ArrowUpRight, MapPin, X } from 'lucide-react';

interface HomeLeadershipJournalSectionProps {
  openContactModal: (serviceName?: string, details?: string) => void;
  onNavigatePage: (page: ActiveTab) => void;
}

export const HomeLeadershipJournalSection: React.FC<HomeLeadershipJournalSectionProps> = ({
  openContactModal,
  onNavigatePage,
}) => {
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);

  return (
    <>
      <section
        id="home-leadership-journal"
        aria-label="Kexora Leadership and Engineering Insights"
        className="py-20 sm:py-28 bg-[#F8F8FA] border-b border-zinc-200"
      >
        <div className={KEXORA_THEME.classes.container}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Column (6 cols): Leadership Cards & Studio Manifesto */}
            <div className="lg:col-span-6 space-y-6">
              <BlurKex direction="up" blurPx={14} className="space-y-3">
                <div className="text-xs font-extrabold uppercase tracking-[0.22em] text-zinc-500">
                  05 · Studio Leadership · Siwan, Bihar (841226) to Global
                </div>
                <h2
                  className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-950 font-[Outfit] leading-[1.1]"
                  style={{ textWrap: 'balance' }}
                >
                  Built by Engineers Obsessed With Speed &amp; Craft
                </h2>
                <p className="text-sm sm:text-base text-zinc-600 leading-relaxed">
                  Led by <strong className="text-zinc-950">Rajan Singh</strong> and{' '}
                  <strong className="text-zinc-950">Aditya Singh</strong>, Kexora delivers enterprise-grade web, mobile app, game, and AI-SEO engineering directly to founders worldwide.
                </p>
              </BlurKex>

              {/* Founder & CTO Portrait Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <BlurKex
                  direction="up"
                  staggerIndex={1}
                  blurPx={14}
                  className="rounded-3xl bg-white border border-zinc-200/90 overflow-hidden shadow-sm flex flex-col justify-between"
                >
                  <div className="aspect-[4/3] bg-zinc-900 relative overflow-hidden">
                    <ProtectedImage
                      src={KEXORA_MEDIA_VAULT.RAJAN_KX}
                      alt={KEXORA_COMPANY_INFO.founder.name}
                      className="w-full h-full object-cover object-top"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-4 right-4 text-white">
                      <div className="text-base font-extrabold font-[Outfit]">
                        {KEXORA_COMPANY_INFO.founder.name}
                      </div>
                      <div className="text-[11px] text-zinc-300 font-medium">
                        {KEXORA_COMPANY_INFO.founder.role}
                      </div>
                    </div>
                  </div>
                  <div className="p-5 text-xs text-zinc-600 leading-relaxed">
                    {KEXORA_COMPANY_INFO.founder.bio}
                  </div>
                </BlurKex>

                <BlurKex
                  direction="up"
                  staggerIndex={2}
                  blurPx={14}
                  className="rounded-3xl bg-white border border-zinc-200/90 overflow-hidden shadow-sm flex flex-col justify-between"
                >
                  <div className="aspect-[4/3] bg-zinc-900 relative overflow-hidden">
                    <ProtectedImage
                      src={KEXORA_MEDIA_VAULT.ADITYA_CTO}
                      alt={KEXORA_COMPANY_INFO.cto.name}
                      className="w-full h-full object-cover object-top"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-4 right-4 text-white">
                      <div className="text-base font-extrabold font-[Outfit]">
                        {KEXORA_COMPANY_INFO.cto.name}
                      </div>
                      <div className="text-[11px] text-zinc-300 font-medium">
                        {KEXORA_COMPANY_INFO.cto.role}
                      </div>
                    </div>
                  </div>
                  <div className="p-5 text-xs text-zinc-600 leading-relaxed">
                    {KEXORA_COMPANY_INFO.cto.bio}
                  </div>
                </BlurKex>
              </div>

              <BlurKex
                direction="up"
                staggerIndex={3}
                blurPx={12}
                className="p-6 rounded-2xl bg-white border border-zinc-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3 text-xs sm:text-sm font-semibold text-zinc-800">
                  <MapPin className="w-4 h-4 text-zinc-950 shrink-0" />
                  <span>HQ: Siwan, Bihar (841226) · Serving India &amp; Global Clients</span>
                </div>
                <button
                  type="button"
                  onClick={() => onNavigatePage('about')}
                  className="px-5 py-2.5 text-xs sm:text-sm font-extrabold text-zinc-950 bg-zinc-100 hover:bg-zinc-950 hover:text-white rounded-full transition-colors inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <span>Full Studio Story</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </BlurKex>
            </div>

            {/* Right Column (6 cols): Latest Engineering Journal & Insights Deck */}
            <div className="lg:col-span-6 space-y-6">
              <BlurKex
                direction="up"
                blurPx={14}
                className="flex flex-col sm:flex-row sm:items-end justify-between gap-4"
              >
                <div className="space-y-2">
                  <div className="text-xs font-extrabold uppercase tracking-[0.22em] text-zinc-500">
                    Kexora Engineering Journal
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-zinc-950 font-[Outfit]">
                    Latest Guides &amp; Studio Releases
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => onNavigatePage('news')}
                  className="px-5 py-2.5 text-xs sm:text-sm font-extrabold text-zinc-950 bg-white border border-zinc-300 hover:border-zinc-950 rounded-full transition-colors inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <span>All News</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </BlurKex>

              <div className="space-y-4">
                {NEWS_ARTICLES.map((article, idx) => (
                  <BlurKex
                    key={article.id}
                    direction="up"
                    staggerIndex={idx + 1}
                    blurPx={14}
                    className="group p-6 sm:p-7 rounded-3xl bg-white border border-zinc-200/90 hover:border-zinc-950 transition-all duration-300 shadow-sm hover:shadow-lg"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-zinc-500 mb-2.5">
                      <span className="font-bold text-zinc-950">{article.category}</span>
                      <span className="font-mono tabular-nums">
                        {article.date} · {article.readTime}
                      </span>
                    </div>

                    <h4 className="text-lg font-extrabold text-zinc-950 font-[Outfit] leading-snug mb-2">
                      {article.title}
                    </h4>

                    <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed mb-4">
                      {article.excerpt}
                    </p>

                    <div className="pt-4 border-t border-zinc-100 flex items-center justify-between gap-3">
                      <span className="text-xs font-mono font-bold text-zinc-700">
                        {article.highlightMetric}
                      </span>
                      <button
                        type="button"
                        onClick={() => setSelectedArticle(article)}
                        className="px-4 py-2 text-xs sm:text-sm font-extrabold text-zinc-950 bg-zinc-100 group-hover:bg-zinc-950 group-hover:text-white rounded-full transition-colors inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
                      >
                        <span>Read Article</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </BlurKex>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Article Reader Modal */}
      {selectedArticle && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="home-journal-modal-title"
          className="fixed inset-0 z-50 bg-black/65 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
        >
          <div className="relative w-full max-w-2xl bg-white border border-zinc-200 rounded-3xl p-6 sm:p-8 space-y-5 shadow-2xl text-zinc-950">
            <button
              type="button"
              aria-label="Close article"
              onClick={() => setSelectedArticle(null)}
              className="absolute top-4 right-4 p-2 text-zinc-500 hover:text-zinc-950 rounded-full hover:bg-zinc-100 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-500">
              <span className="text-zinc-950 font-bold">{selectedArticle.category}</span>
              <span aria-hidden="true">·</span>
              <span>{selectedArticle.date}</span>
              <span aria-hidden="true">·</span>
              <span>By {selectedArticle.author}</span>
            </div>

            <h3
              id="home-journal-modal-title"
              className="text-2xl font-extrabold text-zinc-950 font-[Outfit]"
            >
              {selectedArticle.title}
            </h3>

            <div className="space-y-4 text-sm text-zinc-600 leading-relaxed pt-2 border-t border-zinc-200">
              {selectedArticle.content.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            <div className="pt-4 border-t border-zinc-200 flex items-center justify-between gap-3">
              <span className="text-xs font-mono text-zinc-600 font-bold">
                {selectedArticle.highlightMetric}
              </span>
              <button
                type="button"
                onClick={() => {
                  const title = selectedArticle.title;
                  setSelectedArticle(null);
                  openContactModal(`Enquiry from News: ${title}`);
                }}
                className={KEXORA_THEME.classes.btnPrimaryBlack}
              >
                Ask Us About This
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

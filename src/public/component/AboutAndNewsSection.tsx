import React, { useState } from 'react';
import { KEXORA_COMPANY_INFO, NEWS_ARTICLES } from '../../data/agencyData';
import { NewsArticle } from '../../types';
import { KEXORA_THEME } from './theme';
import { MapPin, ArrowUpRight, X, CheckCircle2, ArrowRight } from 'lucide-react';

interface AboutAndNewsSectionProps {
  openContactModal: (service?: string) => void;
  onNavigateAboutPage?: () => void;
  onNavigateNewsPage?: () => void;
}

export const AboutAndNewsSection: React.FC<AboutAndNewsSectionProps> = ({
  openContactModal,
  onNavigateAboutPage,
  onNavigateNewsPage,
}) => {
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);

  return (
    <>
      {/* About Us & Leadership */}
      <section id="about" className={KEXORA_THEME.classes.sectionMuted}>
        <div className={KEXORA_THEME.classes.container}>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="max-w-2xl">
              <div className={KEXORA_THEME.classes.kicker}>
                About Kexora · Our Team
              </div>
              <h2
                className={KEXORA_THEME.classes.heading2}
                style={{ textWrap: 'balance' }}
              >
                Modern Design Backed by Fast, Reliable Code
              </h2>
            </div>

            {onNavigateAboutPage && (
              <button
                type="button"
                onClick={onNavigateAboutPage}
                className={KEXORA_THEME.classes.btnSecondaryOutline}
              >
                <span>Read More About Us</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Clean Who We Are & Approach */}
            <div className="lg:col-span-7 space-y-6">
              <p className="text-sm sm:text-base text-zinc-700 leading-relaxed">
                At <strong className="text-zinc-950 font-bold">Kexora</strong>, we don&apos;t just build websites; we build the digital backbone of your business. Rooted in{' '}
                <strong className="text-zinc-950 font-bold">
                  Siwan, Bihar (841226)
                </strong>{' '}
                and serving clients globally, we are a team of dedicated developers and designers obsessed with clean code, fast loading speeds, and designs that actually convert visitors into customers.
              </p>
              <p className="text-sm sm:text-base text-zinc-700 leading-relaxed">
                We specialize in creating high-performance digital solutions—from custom-coded websites and multi-vendor e-commerce stores to Android/iOS mobile apps, games, and Google SEO—ensuring your tech stack is as modern as your vision.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-6 text-xs text-zinc-700 font-medium">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-zinc-950" />
                  Siwan, Bihar (841226) · Global Delivery
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-zinc-950" />
                  &ldquo;{KEXORA_COMPANY_INFO.motto}&rdquo;
                </span>
              </div>
            </div>

            {/* Right Column: Clean Leadership List (No Heavy Boxes) */}
            <div className="lg:col-span-5 space-y-6 lg:pl-8 lg:border-l lg:border-zinc-200">
              <div className="space-y-1">
                <div className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                  Meet Our Designers
                </div>
                <div className="text-lg font-bold text-zinc-950 font-[Outfit]">
                  {KEXORA_COMPANY_INFO.founder.name}
                </div>
                <div className="text-xs text-zinc-500">
                  {KEXORA_COMPANY_INFO.founder.role}
                </div>
                <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed pt-1">
                  {KEXORA_COMPANY_INFO.founder.bio}
                </p>
              </div>

              <div className="pt-5 border-t border-zinc-200 space-y-1">
                <div className="text-lg font-bold text-zinc-950 font-[Outfit]">
                  {KEXORA_COMPANY_INFO.cto.name}
                </div>
                <div className="text-xs text-zinc-500">
                  {KEXORA_COMPANY_INFO.cto.role}
                </div>
                <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed pt-1">
                  {KEXORA_COMPANY_INFO.cto.bio}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* News & Updates */}
      <section id="news" className={KEXORA_THEME.classes.sectionWhite}>
        <div className={KEXORA_THEME.classes.container}>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="max-w-2xl">
              <div className={KEXORA_THEME.classes.kicker}>
                Latest News & Articles
              </div>
              <h2
                className={KEXORA_THEME.classes.heading2}
                style={{ textWrap: 'balance' }}
              >
                Updates, Guides & Product Launches
              </h2>
            </div>

            {onNavigateNewsPage && (
              <button
                type="button"
                onClick={onNavigateNewsPage}
                className={KEXORA_THEME.classes.btnSecondaryOutline}
              >
                <span>View All News</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {NEWS_ARTICLES.map((article) => (
              <article
                key={article.id}
                className={`group p-7 flex flex-col justify-between ${KEXORA_THEME.classes.cardOnWhite}`}
              >
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center gap-1.5 text-xs text-zinc-500">
                    <span className="text-zinc-950 font-bold">{article.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{article.date}</span>
                    <span aria-hidden="true">·</span>
                    <span>{article.readTime}</span>
                  </div>

                  <h3 className="text-lg font-extrabold text-zinc-950 font-[Outfit] leading-snug">
                    {article.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>

                <div className="pt-5 mt-6 border-t border-zinc-200/80 flex items-center justify-between gap-2">
                  <span className="text-xs font-mono text-zinc-500 tabular-nums">
                    {article.highlightMetric}
                  </span>
                  <button
                    type="button"
                    onClick={() => setSelectedArticle(article)}
                    className="px-3.5 py-1.5 text-xs font-bold text-zinc-950 bg-white group-hover:bg-zinc-950 group-hover:text-white border border-zinc-300 group-hover:border-zinc-950 rounded-full flex items-center gap-1 whitespace-nowrap shrink-0 transition-all duration-300"
                  >
                    <span>Read Article</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Article Reader Modal */}
        {selectedArticle && (
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="home-article-modal-title"
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
          >
            <div className="relative w-full max-w-2xl bg-white border border-zinc-200 rounded-3xl p-6 sm:p-8 space-y-5 shadow-2xl text-zinc-950">
              <button
                type="button"
                aria-label="Close article"
                onClick={() => setSelectedArticle(null)}
                className="absolute top-4 right-4 p-2 text-zinc-500 hover:text-zinc-950 rounded-full hover:bg-zinc-100"
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
                id="home-article-modal-title"
                className="text-2xl font-extrabold text-zinc-950 font-[Outfit]"
              >
                {selectedArticle.title}
              </h3>

              <div className="space-y-4 text-sm text-zinc-600 leading-relaxed pt-2 border-t border-zinc-200">
                {selectedArticle.content.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>

              <div className="pt-4 border-t border-zinc-200 flex items-center justify-between">
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
      </section>
    </>
  );
};

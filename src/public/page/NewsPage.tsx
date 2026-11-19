import React, { useState } from 'react';
import { ActiveTab, NewsArticle } from '../../types';
import { PageBanner } from '../component/PageBanner';
import { NEWS_ARTICLES } from '../../data/agencyData';
import { BlurKex } from '../../effect';
import { ArrowUpRight, X, Check } from 'lucide-react';

interface NewsPageProps {
  openContactModal: (serviceName?: string, details?: string) => void;
  onNavigatePage: (page: ActiveTab) => void;
}

export const NewsPage: React.FC<NewsPageProps> = ({
  openContactModal,
  onNavigatePage,
}) => {
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const filteredArticles =
    categoryFilter === 'all'
      ? NEWS_ARTICLES
      : NEWS_ARTICLES.filter((a) =>
          a.category.toLowerCase().includes(categoryFilter.toLowerCase())
        );

  return (
    <div className="bg-white text-zinc-950">
      <PageBanner
        kicker="Kexora News & Digital Insights · Engineering Journal"
        title="Latest Updates, Tech Research &"
        highlightText="SEO Case Reports"
        description="Read Kexora’s latest engineering articles covering custom-coded web architectures, mobile app & game development, AI-SEO & Google sitelinks, and our flagship products like Digi Sagun and WhatsApp Reader."
        primaryCtaLabel="Discuss an Article With Our Team"
        onPrimaryCta={() => openContactModal('Enquiry from Kexora News Page')}
        onBackHome={onNavigatePage}
      />

      <section className="py-20 bg-white text-zinc-950 border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Filter Bar */}
          <BlurKex
            direction="up"
            blurPx={14}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-12"
          >
            <div className="text-sm font-bold text-zinc-950">
              Showing {filteredArticles.length} Published Engineering Reports
            </div>
            <div className="flex flex-wrap items-center gap-1.5 p-1 bg-zinc-100 rounded-xl border border-zinc-200">
              {[
                { id: 'all', label: 'All Articles' },
                { id: 'Web Engineering', label: 'Web Engineering' },
                { id: 'Kexora Lab', label: 'Kexora Lab & Products' },
                { id: 'AI-SEO', label: 'AI-SEO & Search' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setCategoryFilter(tab.id)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                    categoryFilter === tab.id
                      ? 'bg-zinc-950 text-white font-bold'
                      : 'text-zinc-600 hover:text-zinc-950'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </BlurKex>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filteredArticles.map((article, idx) => (
              <BlurKex
                key={article.id}
                as="article"
                direction="up"
                staggerIndex={idx}
                blurPx={14}
                className="p-7 rounded-2xl bg-zinc-50 border border-zinc-200 hover:border-zinc-950 transition-colors flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center gap-1.5 text-xs text-zinc-500">
                    <span className="text-zinc-950 font-bold">
                      {article.category}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{article.date}</span>
                    <span aria-hidden="true">·</span>
                    <span>{article.readTime}</span>
                  </div>

                  <h2 className="text-xl font-bold text-zinc-950 font-[Outfit] leading-snug">
                    {article.title}
                  </h2>

                  <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                    {article.excerpt}
                  </p>

                  <p className="text-xs text-zinc-500 leading-relaxed">
                    {article.content[0]}
                  </p>
                </div>

                <div className="pt-5 border-t border-zinc-200 flex items-center justify-between gap-2">
                  <span className="text-xs font-mono text-zinc-600 tabular-nums">
                    {article.highlightMetric}
                  </span>
                  <button
                    type="button"
                    onClick={() => setSelectedArticle(article)}
                    className="text-xs font-bold text-zinc-950 hover:text-zinc-600 flex items-center gap-1 whitespace-nowrap shrink-0"
                  >
                    <span>Read Full Report</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </BlurKex>
            ))}
          </div>

          {/* Featured Deep-Dive Summary Box */}
          <BlurKex
            direction="up"
            blurPx={16}
            className="mt-14 p-8 rounded-2xl bg-zinc-950 text-white grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
          >
            <div className="lg:col-span-8 space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                Kexora Technical Advisory · Free Website Architecture Review
              </div>
              <h3 className="text-2xl font-extrabold text-white font-[Outfit]">
                Want our engineering team to benchmark your current site?
              </h3>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                Whether your site runs on WordPress, a template builder, or a legacy framework, we will prepare a custom Core Web Vitals &amp; AI-SEO roadmap showing how to reach 99+ PageSpeed.
              </p>
              <div className="flex flex-wrap gap-4 pt-2 text-xs text-zinc-200">
                <span className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-white" />
                  LCP & Bundle Bloat Diagnosis
                </span>
                <span className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-white" />
                  Schema.org Sitelink Audit
                </span>
              </div>
            </div>
            <div className="lg:col-span-4 flex lg:justify-end">
              <button
                type="button"
                onClick={() => openContactModal('Custom Architecture & SEO Benchmark')}
                className="px-6 py-3.5 text-xs font-bold text-zinc-950 bg-white hover:bg-zinc-200 rounded-xl transition-colors whitespace-nowrap shrink-0"
              >
                Request Free Technical Review
              </button>
            </div>
          </BlurKex>
        </div>
      </section>

      {/* Article Reader Dialog */}
      {selectedArticle && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="news-modal-title"
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
        >
          <div className="relative w-full max-w-2xl bg-white border border-zinc-200 rounded-2xl p-6 sm:p-8 space-y-5 shadow-2xl text-zinc-950">
            <button
              type="button"
              aria-label="Close article"
              onClick={() => setSelectedArticle(null)}
              className="absolute top-4 right-4 p-2 text-zinc-500 hover:text-zinc-950 rounded-lg hover:bg-zinc-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-500">
              <span className="text-zinc-950 font-bold">
                {selectedArticle.category}
              </span>
              <span aria-hidden="true">·</span>
              <span>{selectedArticle.date}</span>
              <span aria-hidden="true">·</span>
              <span>By {selectedArticle.author}</span>
            </div>

            <h3
              id="news-modal-title"
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
                className="px-4 py-2 text-xs font-bold text-white bg-zinc-950 hover:bg-zinc-800 rounded-lg"
              >
                Discuss This Topic With Kexora
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

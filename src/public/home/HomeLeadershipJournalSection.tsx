import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ActiveTab, NewsArticle } from '../../types';
import {
  KEXORA_THEME,
  ProtectedImage,
  KEXORA_MEDIA_VAULT,
  BlurKex,
  useContextualTabTitle,
} from '../universal';
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

  useContextualTabTitle(
    selectedArticle ? selectedArticle.title : null,
    30
  );

  useEffect(() => {
    if (!selectedArticle) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedArticle(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedArticle]);

  const leaders = [
    {
      name: KEXORA_COMPANY_INFO.founder.name,
      role: KEXORA_COMPANY_INFO.founder.role,
      bio: KEXORA_COMPANY_INFO.founder.bio,
      image: KEXORA_MEDIA_VAULT.RAJAN_KX,
      badge: 'Founder & CEO',
    },
    {
      name: KEXORA_COMPANY_INFO.cto.name,
      role: KEXORA_COMPANY_INFO.cto.role,
      bio: KEXORA_COMPANY_INFO.cto.bio,
      image: KEXORA_MEDIA_VAULT.ADITYA_CTO,
      badge: 'Co-Founder & CTO',
    },
  ];

  return (
    <>
      <section
        id="home-leadership-journal"
        aria-label="Kexora Leadership and Engineering Insights"
        className="py-20 sm:py-28 bg-[#F7F7F9] border-b border-zinc-200/80"
      >
        <div className={KEXORA_THEME.classes.container}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* Left Column (6 cols): Leadership Portrait Cards + Pill HQ Capsule */}
            <div className="lg:col-span-6 space-y-6">
              <BlurKex direction="up" blurPx={10} className="space-y-4">
                <div className="inline-flex items-center gap-2 rounded-full bg-white border border-zinc-200/90 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-zinc-700">
                  <span>05</span>
                  <span aria-hidden="true" className="text-zinc-400">·</span>
                  <span>Studio Leadership · Siwan, Bihar to Global</span>
                </div>
                <h2
                  className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-950 font-[Outfit] leading-[1.08]"
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
                {leaders.map((leader, idx) => (
                  <BlurKex
                    key={leader.name}
                    direction="up"
                    staggerIndex={idx + 1}
                    blurPx={10}
                    className="h-full"
                  >
                    <article className="group h-full rounded-[2rem] bg-white border border-zinc-200/90 hover:border-zinc-950 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_50px_-18px_rgba(0,0,0,0.12)] flex flex-col">
                      <div className="aspect-[4/3] bg-zinc-900 relative overflow-hidden">
                        <ProtectedImage
                          src={leader.image}
                          alt={leader.name}
                          className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/85 via-zinc-950/15 to-transparent" />
                        <span className="absolute top-3.5 left-3.5 inline-flex items-center rounded-full bg-zinc-950/75 backdrop-blur-md border border-white/15 px-3 py-1 text-[11px] font-bold text-white">
                          {leader.badge}
                        </span>
                        <div className="absolute bottom-3.5 left-4 right-4 text-white">
                          <div className="text-lg font-extrabold font-[Outfit] leading-tight">
                            {leader.name}
                          </div>
                          <div className="text-xs text-zinc-300 font-medium mt-0.5">
                            {leader.role}
                          </div>
                        </div>
                      </div>
                      <div className="p-5 text-xs sm:text-sm text-zinc-600 leading-relaxed flex-1">
                        {leader.bio}
                      </div>
                    </article>
                  </BlurKex>
                ))}
              </div>

              {/* Sleek Pill HQ Capsule Bar */}
              <BlurKex direction="up" staggerIndex={3} blurPx={10}>
                <div className="p-3.5 sm:pl-4 sm:pr-3.5 sm:py-3 rounded-[1.75rem] sm:rounded-full bg-white border border-zinc-200/90 shadow-[0_10px_30px_-16px_rgba(0,0,0,0.08)] flex flex-col sm:flex-row sm:items-center justify-between gap-3.5">
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="w-10 h-10 rounded-full bg-zinc-950 text-white flex items-center justify-center shrink-0">
                      <MapPin className="w-4 h-4" />
                    </span>
                    <div className="text-xs sm:text-sm font-semibold text-zinc-800 leading-snug">
                      HQ: Siwan, Bihar (841226) · Serving India &amp; Global Clients
                    </div>
                  </div>
                  <motion.button
                    type="button"
                    whileHover={{ y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onNavigatePage('about')}
                    className="px-5 py-2.5 text-xs sm:text-sm font-extrabold text-white bg-zinc-950 hover:bg-zinc-800 rounded-full transition-colors inline-flex items-center justify-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <span>Full Studio Story</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </motion.button>
                </div>
              </BlurKex>
            </div>

            {/* Right Column (6 cols): Latest Engineering Journal & Insights Deck */}
            <div className="lg:col-span-6 space-y-6">
              <BlurKex
                direction="up"
                blurPx={10}
                className="flex flex-col sm:flex-row sm:items-end justify-between gap-4"
              >
                <div className="space-y-3">
                  <div className="inline-flex items-center gap-2 rounded-full bg-white border border-zinc-200/90 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-zinc-700">
                    <span>Engineering Journal</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-zinc-950 font-[Outfit] leading-tight">
                    Latest Guides &amp; Studio Releases
                  </h3>
                </div>
                <motion.button
                  type="button"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onNavigatePage('news')}
                  className="px-5 py-2.5 text-xs sm:text-sm font-extrabold text-zinc-950 bg-white border border-zinc-300/90 hover:border-zinc-950 hover:bg-zinc-950 hover:text-white rounded-full transition-colors inline-flex items-center justify-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer self-start sm:self-auto"
                >
                  <span>All News</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </motion.button>
              </BlurKex>

              <div className="space-y-4">
                {NEWS_ARTICLES.map((article, idx) => (
                  <BlurKex
                    key={article.id}
                    direction="up"
                    staggerIndex={idx + 1}
                    blurPx={10}
                  >
                    <article className="group p-6 sm:p-7 rounded-[2rem] bg-white border border-zinc-200/90 hover:border-zinc-950 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_45px_-20px_rgba(0,0,0,0.12)]">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                        <span className="inline-flex items-center rounded-full bg-zinc-100 border border-zinc-200/90 px-3 py-1 text-xs font-bold text-zinc-900">
                          {article.category}
                        </span>
                        <span className="text-xs font-mono text-zinc-500 tabular-nums">
                          {article.date} · {article.readTime}
                        </span>
                      </div>

                      <h4 className="text-lg font-extrabold text-zinc-950 font-[Outfit] leading-snug mb-2">
                        {article.title}
                      </h4>

                      <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed mb-5">
                        {article.excerpt}
                      </p>

                      <div className="pt-4 border-t border-zinc-200/75 flex flex-wrap items-center justify-between gap-3">
                        <span className="inline-flex items-center rounded-full bg-[#F7F7F9] border border-zinc-200/80 px-3 py-1 text-xs font-mono font-bold text-zinc-700">
                          {article.highlightMetric}
                        </span>
                        <motion.button
                          type="button"
                          whileHover={{ y: -1 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => setSelectedArticle(article)}
                          className="px-4 py-2 text-xs sm:text-sm font-extrabold text-zinc-950 bg-zinc-100 group-hover:bg-zinc-950 group-hover:text-white rounded-full transition-colors inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
                        >
                          <span>Read Article</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </motion.button>
                      </div>
                    </article>
                  </BlurKex>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Smooth Animated Article Reader Modal */}
      <AnimatePresence>
        {selectedArticle && (
          <motion.div
            key="journal-modal-backdrop"
            role="dialog"
            aria-modal="true"
            aria-labelledby="home-journal-modal-title"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => {
              if (e.target === e.currentTarget) setSelectedArticle(null);
            }}
            className="fixed inset-0 z-50 bg-zinc-950/65 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 14 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ type: 'spring', stiffness: 360, damping: 30 }}
              className="relative w-full max-w-2xl bg-white border border-zinc-200 rounded-[2rem] p-6 sm:p-8 space-y-5 shadow-2xl text-zinc-950 my-auto"
            >
              <button
                type="button"
                aria-label="Close article"
                onClick={() => setSelectedArticle(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-zinc-100 hover:bg-zinc-950 text-zinc-600 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-500 pr-10">
                <span className="inline-flex items-center rounded-full bg-zinc-100 border border-zinc-200 px-3 py-1 text-zinc-950 font-bold">
                  {selectedArticle.category}
                </span>
                <span>{selectedArticle.date}</span>
                <span aria-hidden="true">·</span>
                <span>By {selectedArticle.author}</span>
              </div>

              <h3
                id="home-journal-modal-title"
                className="text-2xl font-extrabold text-zinc-950 font-[Outfit] leading-snug"
              >
                {selectedArticle.title}
              </h3>

              <div className="space-y-4 text-sm text-zinc-600 leading-relaxed pt-4 border-t border-zinc-200">
                {selectedArticle.content.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>

              <div className="pt-5 border-t border-zinc-200 flex flex-wrap items-center justify-between gap-3">
                <span className="inline-flex items-center rounded-full bg-zinc-100 border border-zinc-200 px-3.5 py-1.5 text-xs font-mono text-zinc-700 font-bold">
                  {selectedArticle.highlightMetric}
                </span>
                <motion.button
                  type="button"
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    const title = selectedArticle.title;
                    setSelectedArticle(null);
                    openContactModal(`Enquiry from News: ${title}`);
                  }}
                  className="px-6 py-3 text-sm font-extrabold text-white bg-zinc-950 hover:bg-zinc-800 rounded-full transition-colors inline-flex items-center gap-2 cursor-pointer"
                >
                  <span>Ask Us About This</span>
                  <ArrowUpRight className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

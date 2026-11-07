import React from 'react';
import { ActiveTab } from '../../types';
import { ArrowRight } from 'lucide-react';
import { ProtectedImage, KEXORA_MEDIA_VAULT } from './ProtectedImage';

interface PageBannerProps {
  kicker: string;
  title: string;
  highlightText: string;
  description: string;
  primaryCtaLabel?: string;
  onPrimaryCta?: () => void;
  onBackHome?: (tab: ActiveTab) => void;
}

export const PageBanner: React.FC<PageBannerProps> = ({
  kicker,
  title,
  highlightText,
  description,
  primaryCtaLabel,
  onPrimaryCta,
  onBackHome,
}) => {
  return (
    <section className="relative overflow-hidden pt-28 pb-16 sm:pt-32 sm:pb-20 bg-zinc-950 text-white border-b border-zinc-200">
      {/* Subtle Blurred Studio Photo Behind Inner Page Banners (Protected Vault) */}
      <ProtectedImage
        src={KEXORA_MEDIA_VAULT.HERO_BG}
        alt="Kexora Studio"
        className="absolute inset-0 w-full h-full object-cover object-center opacity-40 scale-105"
      />
      <div
        className="absolute inset-0 bg-black/65 backdrop-blur-md"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Breadcrumb & Kicker */}
        <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-300 mb-4">
          {onBackHome && (
            <>
              <button
                type="button"
                onClick={() => onBackHome('home')}
                className="hover:text-white font-semibold transition-colors"
              >
                Home
              </button>
              <span aria-hidden="true">/</span>
            </>
          )}
          <span className="text-white font-bold uppercase tracking-wider">{kicker}</span>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-3xl space-y-4">
            <h1
              className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white font-[Outfit] leading-[1.1]"
              style={{ textWrap: 'balance' }}
            >
              {title} <span className="underline decoration-2 underline-offset-8">{highlightText}</span>
            </h1>
            <p className="text-base sm:text-lg text-zinc-200 leading-relaxed">
              {description}
            </p>
          </div>

          {primaryCtaLabel && onPrimaryCta && (
            <div className="shrink-0">
              <button
                type="button"
                onClick={onPrimaryCta}
                className="px-7 py-4 text-sm sm:text-base font-extrabold text-zinc-950 bg-white hover:bg-zinc-200 rounded-full transition-all inline-flex items-center gap-2.5 whitespace-nowrap shrink-0 shadow-lg cursor-pointer"
              >
                <span>{primaryCtaLabel}</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

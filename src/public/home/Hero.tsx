import React from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { ActiveTab, ToolTab } from '../../types';
import { ProtectedImage, KEXORA_MEDIA_VAULT } from '../universal';

interface HeroProps {
  openContactModal: () => void;
  openTools: (tab: ToolTab) => void;
  onNavigatePage: (page: ActiveTab) => void;
}

const HERO_CAPABILITIES = [
  { label: 'Custom Websites & E-Commerce', href: '/services' },
  { label: 'Android & iOS Mobile Apps', href: '/services' },
  { label: '2D & 3D Game Development', href: '/services' },
  { label: 'Google SEO & AI-SEO', href: '/services' },
  { label: 'Branding, Video & GST/ISO', href: '/services' },
];

export const Hero: React.FC<HeroProps> = ({
  openContactModal,
  onNavigatePage,
}) => {
  return (
    <section
      id="top"
      aria-labelledby="kexora-hero-heading"
      itemScope
      itemType="https://schema.org/ProfessionalService"
      className="relative w-full h-[100dvh] min-h-[480px] max-h-[1120px] overflow-hidden flex flex-col justify-between pt-[72px] bg-zinc-950 text-white border-b border-zinc-900"
    >
      {/* Structured SEO Microdata for Instant Crawler & AI Entity Extraction */}
      <meta itemProp="name" content="Kexora" />
      <meta itemProp="url" content="https://kexora.in/" />
      <meta itemProp="image" content="https://kexora.in/og-image.jpg" />
      <meta itemProp="priceRange" content="₹999 - ₹40,000+" />
      <meta itemProp="areaServed" content="Worldwide" />
      <meta
        itemProp="knowsAbout"
        content="Custom Web Design, Full-Stack Website Development, E-Commerce Stores, Android and iOS Mobile App Development, 2D and 3D Game Development, Google SEO, AI-SEO, Digital Marketing, Brand Identity, GST and Company Registration"
      />

      {/* High-Resolution Studio Background Photograph (Protected Vault) */}
      <ProtectedImage
        src={KEXORA_MEDIA_VAULT.HERO_BG}
        alt="Kexora Custom Web Design, Mobile App, Game Development and AI-SEO Studio"
        className="absolute inset-0 w-full h-full object-cover object-center scale-105"
      />

      {/* Measured Contrast Scrim for Guaranteed WCAG AAA Text Legibility Across Every Frame */}
      <div
        className="absolute inset-0 bg-zinc-950/72 backdrop-blur-[6px]"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-b from-zinc-950/70 via-zinc-950/35 to-zinc-950/90"
        aria-hidden="true"
      />

      {/* Centered Above-The-Fold Focal Content — Dynamically Scales to Fit Every Screen Without Clipping */}
      <div className="relative z-10 flex-1 min-h-0 flex flex-col items-center justify-center w-full max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 text-center py-[clamp(0.5rem,2.4vh,3rem)]">
        <div className="w-full max-w-5xl flex flex-col items-center justify-center gap-[clamp(0.55rem,2.6vh,2.4rem)]">
          {/* Editorial Brand Kicker */}
          <p
            className="font-semibold uppercase tracking-[0.14em] sm:tracking-[0.24em] text-zinc-200 leading-tight"
            style={{ fontSize: 'clamp(0.6rem, min(2.3vw, 1.65vh), 1rem)' }}
          >
            Kexora Studio · Web, App, Game &amp; AI-SEO Agency
          </p>

          {/* Primary SEO H1 Headline — Dynamic Viewport-Proportional Scale */}
          <h1
            id="kexora-hero-heading"
            itemProp="slogan"
            className="font-extrabold tracking-tight text-white font-[Outfit] leading-[1.08] max-w-5xl"
            style={{
              fontSize: 'clamp(1.6rem, min(6.8vw, 8.6vh), 5.4rem)',
              textWrap: 'balance',
            }}
          >
            Crafting Fast Websites, Apps &amp; Digital Brands
          </h1>

          {/* High-Clarity Value Proposition */}
          <p
            itemProp="description"
            className="text-zinc-200 max-w-3xl mx-auto leading-[1.45] sm:leading-relaxed font-normal"
            style={{
              fontSize: 'clamp(0.78rem, min(3.2vw, 2.65vh), 1.45rem)',
            }}
          >
            We design and code high-speed custom websites, e-commerce stores, Android &amp; iOS mobile apps, and 2D/3D games—backed by Google SEO, creative branding, and business registration.
          </p>

          {/* Quantitative Proof Line */}
          <div
            className="flex flex-wrap items-center justify-center gap-x-3 sm:gap-x-8 gap-y-1 font-mono text-zinc-200 tabular-nums"
            style={{
              fontSize: 'clamp(0.7rem, min(2.7vw, 2.05vh), 1.125rem)',
            }}
          >
            <span>
              <strong className="text-white font-bold">0.3s</strong> Load Speed
            </span>
            <span aria-hidden="true" className="text-zinc-500">
              ·
            </span>
            <span>
              <strong className="text-white font-bold">99+</strong> Google PageSpeed
            </span>
            <span aria-hidden="true" className="text-zinc-500">
              ·
            </span>
            <span>
              <strong className="text-white font-bold">24/7</strong> Direct Team Support
            </span>
          </div>

          {/* Semantic Crawlable Primary & Secondary CTAs */}
          <div className="pt-0.5 sm:pt-1 flex flex-row flex-wrap items-center justify-center gap-2.5 sm:gap-5 w-full sm:w-auto">
            <a
              href="/contact"
              onClick={(e) => {
                e.preventDefault();
                openContactModal();
              }}
              className="group px-[clamp(1rem,3.2vw,2.75rem)] py-[clamp(0.6rem,1.65vh,1.25rem)] font-extrabold text-zinc-950 bg-white hover:bg-zinc-200 rounded-full transition-all duration-200 inline-flex items-center justify-center gap-1.5 sm:gap-2.5 shadow-xl whitespace-nowrap shrink-0 cursor-pointer"
              style={{
                fontSize: 'clamp(0.76rem, min(3vw, 2.15vh), 1.15rem)',
              }}
            >
              <span>Start Your Project</span>
              <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>

            <a
              href="/services"
              onClick={(e) => {
                e.preventDefault();
                onNavigatePage('services');
              }}
              className="group px-[clamp(1rem,3.2vw,2.75rem)] py-[clamp(0.6rem,1.65vh,1.25rem)] font-bold text-white bg-white/[0.08] hover:bg-white/15 border border-white/40 hover:border-white/75 rounded-full transition-all duration-200 inline-flex items-center justify-center gap-1.5 sm:gap-2.5 whitespace-nowrap shrink-0 cursor-pointer"
              style={{
                fontSize: 'clamp(0.76rem, min(3vw, 2.15vh), 1.15rem)',
              }}
            >
              <span>Explore Our Services</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-200 group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </div>

      {/* Viewport-Anchored Crawlable Capabilities Footer Strip (Never Clips or Overflows) */}
      <nav
        aria-label="Kexora Core Capabilities"
        className="relative z-10 w-full shrink-0 border-t border-white/12 bg-zinc-950/60 backdrop-blur-md"
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-[clamp(0.5rem,1.5vh,1rem)]">
          <ul className="flex flex-wrap items-center justify-center gap-x-3 sm:gap-x-6 gap-y-1 text-[10px] sm:text-xs font-medium text-zinc-300 leading-tight">
            {HERO_CAPABILITIES.map((cap, idx) => (
              <React.Fragment key={cap.label}>
                <li>
                  <a
                    href={cap.href}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigatePage('services');
                    }}
                    className="hover:text-white transition-colors whitespace-nowrap"
                  >
                    {cap.label}
                  </a>
                </li>
                {idx < HERO_CAPABILITIES.length - 1 && (
                  <li aria-hidden="true" className="text-zinc-600 hidden sm:inline">
                    ·
                  </li>
                )}
              </React.Fragment>
            ))}
          </ul>
        </div>
      </nav>
    </section>
  );
};

import React from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { ActiveTab, ToolTab } from '../../types';
import { ProtectedImage, KEXORA_MEDIA_VAULT } from './ProtectedImage';

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
      className="relative w-full h-[100dvh] min-h-[540px] max-h-[1120px] overflow-hidden flex flex-col justify-between pt-[72px] bg-zinc-950 text-white border-b border-zinc-900"
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

      {/* Centered Above-The-Fold Focal Content — Dynamically Scales to Fill Viewport Without Dead Space */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center w-full max-w-6xl mx-auto px-5 sm:px-8 lg:px-12 text-center py-[clamp(1.25rem,3.5vh,3rem)]">
        <div className="w-full max-w-5xl flex flex-col items-center justify-center gap-[clamp(1.15rem,3.4vh,2.5rem)]">
          {/* Editorial Brand Kicker */}
          <p
            className="font-semibold uppercase tracking-[0.24em] text-zinc-200"
            style={{ fontSize: 'clamp(0.75rem, min(1.1vw, 1.8vh), 1rem)' }}
          >
            Kexora Studio · Web, App, Game &amp; AI-SEO Agency
          </p>

          {/* Primary SEO H1 Headline — Dynamic Viewport-Proportional Scale */}
          <h1
            id="kexora-hero-heading"
            itemProp="slogan"
            className="font-extrabold tracking-tight text-white font-[Outfit] leading-[1.06] max-w-5xl"
            style={{
              fontSize: 'clamp(2.4rem, min(6.2vw, 9.2vh), 5.4rem)',
              textWrap: 'balance',
            }}
          >
            Crafting Fast Websites, Apps &amp; Digital Brands
          </h1>

          {/* High-Clarity Value Proposition */}
          <p
            itemProp="description"
            className="text-zinc-200 max-w-3xl mx-auto leading-relaxed font-normal"
            style={{
              fontSize: 'clamp(1.05rem, min(1.85vw, 2.9vh), 1.45rem)',
            }}
          >
            We design and code high-speed custom websites, e-commerce stores, Android &amp; iOS mobile apps, and 2D/3D games—backed by Google SEO, creative branding, and business registration.
          </p>

          {/* Quantitative Proof Line */}
          <div
            className="flex flex-wrap items-center justify-center gap-x-6 sm:gap-x-8 gap-y-2 font-mono text-zinc-200 tabular-nums"
            style={{
              fontSize: 'clamp(0.875rem, min(1.3vw, 2.15vh), 1.125rem)',
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
          <div className="pt-1 flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-5 w-full sm:w-auto">
            <a
              href="/contact"
              onClick={(e) => {
                e.preventDefault();
                openContactModal();
              }}
              className="group w-full sm:w-auto px-[clamp(1.75rem,3vw,2.75rem)] py-[clamp(0.9rem,1.8vh,1.25rem)] font-extrabold text-zinc-950 bg-white hover:bg-zinc-200 rounded-full transition-all duration-200 inline-flex items-center justify-center gap-2.5 shadow-xl whitespace-nowrap shrink-0 cursor-pointer"
              style={{
                fontSize: 'clamp(0.95rem, min(1.4vw, 2.2vh), 1.15rem)',
              }}
            >
              <span>Start Your Project</span>
              <ArrowUpRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>

            <a
              href="/services"
              onClick={(e) => {
                e.preventDefault();
                onNavigatePage('services');
              }}
              className="group w-full sm:w-auto px-[clamp(1.75rem,3vw,2.75rem)] py-[clamp(0.9rem,1.8vh,1.25rem)] font-bold text-white bg-white/[0.08] hover:bg-white/15 border border-white/40 hover:border-white/75 rounded-full transition-all duration-200 inline-flex items-center justify-center gap-2.5 whitespace-nowrap shrink-0 cursor-pointer"
              style={{
                fontSize: 'clamp(0.95rem, min(1.4vw, 2.2vh), 1.15rem)',
              }}
            >
              <span>Explore Our Services</span>
              <ArrowRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </div>

      {/* Viewport-Anchored Crawlable Capabilities Footer Strip (Never Clips or Overflows) */}
      <nav
        aria-label="Kexora Core Capabilities"
        className="relative z-10 w-full border-t border-white/12 bg-zinc-950/55 backdrop-blur-md"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 sm:py-4">
          <ul className="flex flex-wrap items-center justify-center gap-x-4 sm:gap-x-6 gap-y-1.5 text-[11px] sm:text-xs font-medium text-zinc-300">
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

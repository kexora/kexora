import React from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { ActiveTab, ToolTab } from '../../types';
import { motion } from 'motion/react';
import { ProtectedImage, KEXORA_MEDIA_VAULT } from './ProtectedImage';

interface HeroProps {
  openContactModal: () => void;
  openTools: (tab: ToolTab) => void;
  onNavigatePage: (page: ActiveTab) => void;
}

export const Hero: React.FC<HeroProps> = ({
  openContactModal,
  onNavigatePage,
}) => {
  return (
    <section
      id="top"
      aria-label="Kexora Web, App and Game Development Agency"
      itemScope
      itemType="https://schema.org/ProfessionalService"
      className="relative overflow-hidden min-h-[90vh] flex items-center justify-center pt-32 pb-24 sm:pt-36 sm:pb-32 border-b border-zinc-200"
    >
      {/* Hidden SEO Microdata for Google Search (Keeps visible Hero super clean) */}
      <meta itemProp="name" content="Kexora" />
      <meta itemProp="url" content="https://www.kexora.org" />
      <meta itemProp="priceRange" content="₹999 - ₹40,000+" />
      <meta
        itemProp="knowsAbout"
        content="Web Design, Custom Website Development, Mobile App Development, Game Development, E-Commerce Website, Google SEO, AI-SEO, Digital Marketing, Logo Design, GST and Company Registration"
      />

      {/* High-Resolution Studio Background Photograph (Protected Vault) */}
      <ProtectedImage
        src={KEXORA_MEDIA_VAULT.HERO_BG}
        alt="Kexora Web, App and Game Development Studio"
        itemProp="image"
        className="absolute inset-0 w-full h-full object-cover object-center scale-105"
      />

      {/* Smooth Blur & Dark Overlay */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-md"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/80"
        aria-hidden="true"
      />

      {/* Elevated Premium Agency Hero Content */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center text-white space-y-6"
      >
        {/* Clean Editorial Kicker */}
        <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.24em] text-zinc-300">
          Kexora Studio · Web, App, Game &amp; SEO Agency
        </p>

        {/* Confirmed Premium Headline */}
        <h1
          itemProp="slogan"
          className="font-extrabold tracking-tight text-white font-[Outfit] leading-[1.06]"
          style={{
            fontSize: 'clamp(2.45rem, 5vw, 4.35rem)',
            textWrap: 'balance',
          }}
        >
          Crafting Fast Websites, Apps &amp; Digital Brands
        </h1>

        {/* Simple, High-Impact Description of What Kexora Does */}
        <p
          itemProp="description"
          className="text-base sm:text-xl text-zinc-200 max-w-2xl mx-auto leading-relaxed font-normal"
        >
          We design and code high-speed custom websites, e-commerce stores, Android &amp; iOS mobile apps, and games—backed by Google SEO, creative branding, and complete business registration.
        </p>

        {/* Quiet Quantitative Proof Bar */}
        <div className="pt-1 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs sm:text-sm font-mono text-zinc-300 tabular-nums">
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

        {/* Primary & Secondary Action Buttons */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            type="button"
            onClick={openContactModal}
            className="group w-full sm:w-auto px-8 py-4 text-sm font-bold text-zinc-950 bg-white hover:bg-zinc-200 rounded-full transition-all duration-200 flex items-center justify-center gap-2 shadow-lg whitespace-nowrap shrink-0"
          >
            <span>Start Your Project</span>
            <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>

          <button
            type="button"
            onClick={() => onNavigatePage('services')}
            className="group w-full sm:w-auto px-8 py-4 text-sm font-semibold text-white hover:bg-white/10 border border-white/35 rounded-full transition-all duration-200 flex items-center justify-center gap-2 whitespace-nowrap shrink-0"
          >
            <span>Explore Our Services</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </button>
        </div>

        {/* Clean Unboxed Service Pillars Strip */}
        <ul
          aria-label="Kexora Core Capabilities"
          className="pt-8 border-t border-white/15 text-xs sm:text-sm text-zinc-300 flex flex-wrap items-center justify-center gap-x-4 gap-y-2"
        >
          <li>Custom Websites &amp; E-Commerce</li>
          <li aria-hidden="true" className="text-zinc-500">
            ·
          </li>
          <li>Android &amp; iOS Mobile Apps</li>
          <li aria-hidden="true" className="text-zinc-500">
            ·
          </li>
          <li>2D &amp; 3D Game Development</li>
          <li aria-hidden="true" className="text-zinc-500">
            ·
          </li>
          <li>Google SEO &amp; AI-SEO</li>
          <li aria-hidden="true" className="text-zinc-500">
            ·
          </li>
          <li>Logo, Video &amp; GST/ISO Setup</li>
        </ul>
      </motion.div>
    </section>
  );
};

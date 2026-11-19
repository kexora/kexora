import React, { useState } from 'react';
import { ActiveTab } from '../../types';
import { KEXORA_THEME, BlurKex } from '../universal';
import { SERVICES_DATA, KEXORA_SERVICE_PILLARS } from '../../data/agencyData';
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Code2,
  Zap,
  Search,
  Palette,
  ShieldCheck,
  ShoppingBag,
} from 'lucide-react';

interface HomeServicesSectionProps {
  openContactModal: (serviceName?: string, details?: string) => void;
  onNavigatePage: (page: ActiveTab) => void;
}

const renderServiceIcon = (iconName: string) => {
  switch (iconName) {
    case 'Zap':
      return <Zap className="w-5 h-5" />;
    case 'Code2':
      return <Code2 className="w-5 h-5" />;
    case 'Search':
      return <Search className="w-5 h-5" />;
    case 'Palette':
      return <Palette className="w-5 h-5" />;
    case 'ShoppingBag':
      return <ShoppingBag className="w-5 h-5" />;
    case 'ShieldCheck':
      return <ShieldCheck className="w-5 h-5" />;
    default:
      return <Code2 className="w-5 h-5" />;
  }
};

export const HomeServicesSection: React.FC<HomeServicesSectionProps> = ({
  openContactModal,
  onNavigatePage,
}) => {
  const [activePillarIdx, setActivePillarIdx] = useState<number>(0);

  return (
    <section
      id="home-services-showcase"
      aria-labelledby="home-services-heading"
      itemScope
      itemType="https://schema.org/OfferCatalog"
      className="py-20 sm:py-28 bg-white border-b border-zinc-200"
    >
      <meta itemProp="url" content="https://kexora.in/services" />
      <div className={KEXORA_THEME.classes.container}>
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12 sm:mb-14">
          <BlurKex direction="up" blurPx={10} className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-zinc-100 border border-zinc-200 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-zinc-700">
              <span>01</span>
              <span aria-hidden="true" className="text-zinc-400">·</span>
              <span>Full-Lifecycle Digital Engineering Studio</span>
            </div>
            <h2
              id="home-services-heading"
              itemProp="name"
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-zinc-950 font-[Outfit] leading-[1.08]"
              style={{ textWrap: 'balance' }}
            >
              Four Specialized Studios Under One Roof
            </h2>
            <p
              itemProp="description"
              className="text-sm sm:text-base text-zinc-600 leading-relaxed"
            >
              Unlike generic template agencies, Kexora pairs custom 0.3s web architecture with native mobile apps, 2D/3D game engines, AI-SEO search dominance, and legal company compliance.
            </p>
          </BlurKex>

          <BlurKex direction="left" delay={0.08} blurPx={10} className="shrink-0">
            <a
              href="/services"
              onClick={(e) => {
                e.preventDefault();
                onNavigatePage('services');
              }}
              className="px-7 py-3.5 text-sm sm:text-base font-extrabold text-zinc-950 bg-zinc-100 hover:bg-zinc-950 hover:text-white border border-zinc-300 hover:border-zinc-950 rounded-full transition-all duration-300 inline-flex items-center gap-2.5 whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>Explore Full Service Catalog</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </BlurKex>
        </div>

        {/* Interactive Pill-Shaped Pillar Switcher + Compact Full-Width Capsule Showcase */}
        <BlurKex direction="up" blurPx={12} className="mb-12 sm:mb-14 space-y-5">
          {/* Separate Floating Pill Tabs */}
          <div
            role="tablist"
            aria-label="Kexora service studio pillars"
            className="flex flex-wrap items-center justify-center lg:justify-between gap-3 sm:gap-4"
          >
            {KEXORA_SERVICE_PILLARS.map((pillar, idx) => {
              const isSelected = activePillarIdx === idx;
              return (
                <button
                  key={pillar.category}
                  type="button"
                  role="tab"
                  id={`pillar-tab-${idx}`}
                  aria-selected={isSelected}
                  aria-controls={`pillar-panel-${idx}`}
                  onClick={() => setActivePillarIdx(idx)}
                  className={`flex-1 min-w-[210px] sm:min-w-fit px-5 sm:px-6 py-3.5 rounded-full border text-sm font-extrabold font-[Outfit] transition-all duration-300 inline-flex items-center justify-center gap-2.5 cursor-pointer whitespace-nowrap ${
                    isSelected
                      ? 'bg-zinc-950 text-white border-zinc-950 shadow-[0_14px_30px_-10px_rgba(9,9,11,0.45)] -translate-y-0.5'
                      : 'bg-white text-zinc-800 border-zinc-200/90 shadow-[0_8px_24px_-12px_rgba(9,9,11,0.16)] hover:border-zinc-950 hover:text-zinc-950 hover:shadow-[0_14px_30px_-12px_rgba(9,9,11,0.24)] hover:-translate-y-0.5'
                  }`}
                >
                  <span
                    className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-[11px] font-mono font-extrabold tabular-nums transition-colors ${
                      isSelected
                        ? 'bg-white text-zinc-950'
                        : 'bg-zinc-100 text-zinc-700 border border-zinc-200/80'
                    }`}
                  >
                    0{idx + 1}
                  </span>
                  <span>{pillar.category}</span>
                </button>
              );
            })}
          </div>

          {/* Active Pillar Sub-Services Capsule Band (Zero Dead Space) */}
          <div
            id={`pillar-panel-${activePillarIdx}`}
            role="tabpanel"
            aria-labelledby={`pillar-tab-${activePillarIdx}`}
            className="rounded-[2.25rem] bg-zinc-950 text-white p-6 sm:p-8 lg:p-9 border border-zinc-900 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.35)]"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-zinc-800/90">
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center rounded-full bg-white/10 border border-white/15 px-3.5 py-1 text-xs font-mono font-bold uppercase tracking-wider text-zinc-200 tabular-nums">
                  Pillar 0{activePillarIdx + 1} · {KEXORA_SERVICE_PILLARS[activePillarIdx].items.length} Services
                </span>
                <h3 className="text-lg sm:text-xl font-extrabold font-[Outfit] text-white">
                  {KEXORA_SERVICE_PILLARS[activePillarIdx].category}
                </h3>
              </div>

              <a
                href="/contact"
                onClick={(e) => {
                  e.preventDefault();
                  openContactModal(KEXORA_SERVICE_PILLARS[activePillarIdx].category);
                }}
                className="px-5 py-2.5 text-xs sm:text-sm font-extrabold text-zinc-950 bg-white hover:bg-zinc-200 rounded-full transition-colors inline-flex items-center justify-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
              >
                <span>Request Custom Scope</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>

            {/* Clickable Pill-Shaped Sub-Services */}
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 py-6">
              {KEXORA_SERVICE_PILLARS[activePillarIdx].items.map((srv) => (
                <li key={srv}>
                  <a
                    href="/contact"
                    onClick={(e) => {
                      e.preventDefault();
                      openContactModal(srv);
                    }}
                    className="group w-full px-4 py-3 rounded-full bg-zinc-900/95 hover:bg-white border border-zinc-800 hover:border-white text-zinc-100 hover:text-zinc-950 transition-all duration-200 flex items-center justify-between gap-3 cursor-pointer"
                  >
                    <span className="flex items-center gap-2.5 min-w-0">
                      <span className="w-6 h-6 rounded-full bg-white/10 group-hover:bg-zinc-950 text-zinc-200 group-hover:text-white flex items-center justify-center shrink-0 transition-colors">
                        <Check className="w-3.5 h-3.5" />
                      </span>
                      <span className="text-sm font-semibold leading-snug truncate">
                        {srv}
                      </span>
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-zinc-400 group-hover:text-zinc-950 shrink-0 transition-colors">
                      <span>Quote</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            <div className="pt-5 border-t border-zinc-800/90 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <p className="text-xs sm:text-sm text-zinc-400">
                Direct architecture &amp; strategy consultation with{' '}
                <strong className="text-white">Rajan Singh</strong> &amp;{' '}
                <strong className="text-white">Aditya Singh</strong> — 24 specialized services ready to launch.
              </p>
              <a
                href="/pricing"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigatePage('pricing');
                }}
                className="px-4 py-2 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-xs sm:text-sm font-bold text-zinc-100 inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 transition-colors self-start sm:self-auto"
              >
                <span>Compare Studio Pricing</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </BlurKex>

        {/* Balanced 3-Column Core Capabilities Grid (6 Semantic Service Articles) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES_DATA.map((service, idx) => {
            const capabilityTags = service.category
              .split('·')
              .map((tag) => tag.trim())
              .filter(Boolean);
            const primaryMetric = service.metrics.split('·')[0].trim();

            return (
              <BlurKex
                key={service.id}
                direction="up"
                staggerIndex={idx}
                blurPx={10}
                className="h-full"
              >
                <article
                  itemProp="itemListElement"
                  itemScope
                  itemType="https://schema.org/Service"
                  className="group h-full rounded-[2rem] bg-[#F8F8FA] hover:bg-white border border-zinc-200/90 hover:border-zinc-950 p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_50px_-18px_rgba(0,0,0,0.12)]"
                >
                  <meta itemProp="url" content={`https://kexora.in/services#${service.id}`} />
                  <meta itemProp="serviceType" content={service.category} />
                  <div itemProp="provider" itemScope itemType="https://schema.org/Organization" className="sr-only">
                    <meta itemProp="name" content="Kexora" />
                    <meta itemProp="url" content="https://kexora.in/" />
                  </div>

                  <div>
                    {/* Top Row: Circular Pill Icon Medallion + Pill Metric Badge */}
                    <div className="flex items-center justify-between gap-3 mb-5">
                      <div className="w-12 h-12 rounded-full bg-zinc-950 text-white flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform shrink-0">
                        {renderServiceIcon(service.iconName)}
                      </div>
                      <span className="inline-flex items-center rounded-full bg-white border border-zinc-200/90 px-3.5 py-1.5 text-xs font-bold text-zinc-700 tabular-nums whitespace-nowrap">
                        {service.index} · {primaryMetric}
                      </span>
                    </div>

                    <h3
                      itemProp="name"
                      className="text-xl font-extrabold text-zinc-950 font-[Outfit] leading-snug mb-2.5"
                    >
                      {service.title}
                    </h3>

                    <p
                      itemProp="description"
                      className="text-sm text-zinc-600 leading-relaxed mb-5"
                    >
                      {service.shortDesc}
                    </p>

                    {/* Untruncated Pill-Shaped Capability Tags */}
                    <div className="flex flex-wrap gap-2 mb-6" aria-label={`${service.title} specialties`}>
                      {capabilityTags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center rounded-full bg-white border border-zinc-200 px-3 py-1 text-xs font-semibold text-zinc-700"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Clean Pill-Shaped Action Bar */}
                  <div className="pt-4 border-t border-zinc-200/80 flex items-center justify-between gap-3">
                    <a
                      href="/services"
                      onClick={(e) => {
                        e.preventDefault();
                        onNavigatePage('services');
                      }}
                      className="px-3.5 py-2 rounded-full text-xs font-bold text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100 transition-colors inline-flex items-center gap-1 whitespace-nowrap"
                    >
                      <span>Details</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>

                    <a
                      href="/contact"
                      onClick={(e) => {
                        e.preventDefault();
                        openContactModal(service.title);
                      }}
                      className="px-5 py-2.5 text-xs sm:text-sm font-extrabold text-zinc-950 bg-white group-hover:bg-zinc-950 group-hover:text-white border border-zinc-300 group-hover:border-zinc-950 rounded-full inline-flex items-center gap-1.5 transition-all whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      <span>Book Service</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </article>
              </BlurKex>
            );
          })}
        </div>
      </div>
    </section>
  );
};

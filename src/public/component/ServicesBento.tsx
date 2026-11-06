import React from 'react';
import { SERVICES_DATA, KEXORA_SERVICE_PILLARS } from '../../data/agencyData';
import { KEXORA_THEME } from './theme';
import {
  Zap,
  Code2,
  Search,
  Palette,
  ShoppingBag,
  ShieldCheck,
  ArrowUpRight,
  ArrowRight,
  Check,
} from 'lucide-react';

interface ServicesBentoProps {
  onSelectService: (serviceTitle: string) => void;
  onViewAllPage?: () => void;
}

export const ServicesBento: React.FC<ServicesBentoProps> = ({
  onSelectService,
  onViewAllPage,
}) => {
  const getIcon = (iconName: string) => {
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

  return (
    <section id="services" className={KEXORA_THEME.classes.sectionWhite}>
      <div className={KEXORA_THEME.classes.container}>
        {/* Clean Modern Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div className="max-w-2xl">
            <div className={KEXORA_THEME.classes.kicker}>
              What We Do · Our Services
            </div>
            <h2
              className={KEXORA_THEME.classes.heading2}
              style={{ textWrap: 'balance' }}
            >
              Everything You Need to Build & Grow Online
            </h2>
            <p className={`${KEXORA_THEME.classes.subtitle} mt-3`}>
              From fast custom websites, mobile apps, and games to Google SEO, logo design, and GST/company registration—we handle everything under one roof.
            </p>
          </div>

          {onViewAllPage && (
            <button
              type="button"
              onClick={onViewAllPage}
              className={KEXORA_THEME.classes.btnSecondaryOutline}
            >
              <span>Explore All Services</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Modern 3-Column Service Cards with Elevated Hover State */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 mb-14">
          {SERVICES_DATA.map((service) => (
            <article
              key={service.id}
              className={`group p-8 flex flex-col justify-between ${KEXORA_THEME.classes.cardOnWhite}`}
            >
              <div>
                {/* Top Icon & Number Row */}
                <div className="flex items-center justify-between gap-4 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-zinc-950 text-white flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform duration-300">
                    {getIcon(service.iconName)}
                  </div>
                  <span className="text-xs font-mono font-bold text-zinc-400 group-hover:text-zinc-950 transition-colors tabular-nums">
                    {service.index} / 06
                  </span>
                </div>

                {/* Title & Simple Summary */}
                <h3 className="text-xl font-extrabold text-zinc-950 font-[Outfit] leading-snug mb-2.5">
                  {service.title}
                </h3>

                <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed mb-6">
                  {service.shortDesc}
                </p>

                {/* Clean Key Deliverables */}
                <ul className="space-y-2.5 mb-7 text-xs text-zinc-700 pt-5 border-t border-zinc-200/80">
                  {service.deliverables.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-zinc-950 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Card Footer CTA */}
              <div className="pt-4 border-t border-zinc-200/80 flex items-center justify-between gap-3">
                <span className="text-[11px] font-mono text-zinc-500 tabular-nums truncate">
                  {service.metrics}
                </span>
                <button
                  type="button"
                  onClick={() => onSelectService(service.title)}
                  className="px-4 py-2 text-xs font-bold text-zinc-950 bg-white group-hover:bg-zinc-950 group-hover:text-white border border-zinc-300 group-hover:border-zinc-950 rounded-full flex items-center gap-1.5 whitespace-nowrap shrink-0 transition-all duration-300"
                >
                  <span>Enquire</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Sleek Monochrome 4-Pillar Complete Service Catalog (Matches Dark Hero Contrast) */}
        <div className="p-8 sm:p-10 lg:p-12 rounded-3xl bg-zinc-950 text-white shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-8 mb-8 border-b border-zinc-800">
            <div>
              <div className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400 mb-2">
                Complete Service Directory
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-[Outfit]">
                All Services Offered by Kexora
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-md">
              Click any service below to request a custom quote or speak directly with our team.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {KEXORA_SERVICE_PILLARS.map((pillar) => (
              <div key={pillar.category} className="space-y-4">
                <h4 className="text-sm font-extrabold text-white pb-2.5 border-b border-zinc-800 font-[Outfit]">
                  {pillar.category}
                </h4>
                <ul className="space-y-2.5 text-xs sm:text-sm text-zinc-300">
                  {pillar.items.map((item) => (
                    <li key={item}>
                      <button
                        type="button"
                        onClick={() => onSelectService(item)}
                        className="text-left hover:text-white transition-colors flex items-start gap-2 group"
                      >
                        <span
                          className="text-zinc-500 group-hover:text-white transition-colors font-bold"
                          aria-hidden="true"
                        >
                          ·
                        </span>
                        <span className="group-hover:underline underline-offset-4">
                          {item}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

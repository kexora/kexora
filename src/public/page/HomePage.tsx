import React from 'react';
import { ActiveTab, ToolTab } from '../../types';
import { Hero } from '../component/Hero';
import { ServicesBento } from '../component/ServicesBento';
import { Portfolio } from '../component/Portfolio';
import { PricingSection } from '../component/PricingSection';
import { ToolsSuite } from '../component/ToolsSuite';
import { AboutAndNewsSection } from '../component/AboutAndNewsSection';
import { TestimonialsFaq } from '../component/TestimonialsFaq';
import { KEXORA_THEME } from '../component/theme';
import { ArrowRight, Sparkles } from 'lucide-react';

interface HomePageProps {
  openContactModal: (serviceName?: string, details?: string) => void;
  onNavigatePage: (page: ActiveTab) => void;
  openToolsWithTab: (tool: ToolTab) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  openContactModal,
  onNavigatePage,
  openToolsWithTab,
}) => {
  return (
    <div className="bg-white text-zinc-950">
      {/* 1. Blurred Studio Photo Hero Section With Simple Company Intro */}
      <Hero
        openContactModal={() => openContactModal()}
        openTools={(t) => openToolsWithTab(t)}
        onNavigatePage={onNavigatePage}
      />

      {/* Section 01: Core Services & Complete 4-Pillar Directory */}
      <ServicesBento
        onSelectService={(serviceTitle) => openContactModal(serviceTitle)}
        onViewAllPage={() => onNavigatePage('services')}
      />

      {/* Section 02: Featured Projects & Results */}
      <Portfolio
        openContactModal={(serviceTitle) => openContactModal(serviceTitle)}
      />

      {/* Section 04: Official Kexora Pricing Plans */}
      <PricingSection
        openContactModalWithService={(serviceName) =>
          openContactModal(serviceName)
        }
        onViewAllPage={() => onNavigatePage('pricing')}
      />

      {/* Section 05: Interactive Client Tools */}
      <ToolsSuite
        initialTab="whatsapp-reader"
        openContactModalWithDetails={(details) =>
          openContactModal('Custom Project Estimate', details)
        }
      />

      {/* Section 06 & Section 07: About Kexora & Latest News */}
      <AboutAndNewsSection
        openContactModal={(topic) => openContactModal(topic)}
        onNavigateAboutPage={() => onNavigatePage('about')}
        onNavigateNewsPage={() => onNavigatePage('news')}
      />

      {/* Section 08: Client Reviews & FAQs */}
      <TestimonialsFaq />

      {/* Bottom Direct Enquiry CTA Banner */}
      <section className="py-16 bg-white border-b border-zinc-200">
        <div className={KEXORA_THEME.classes.container}>
          <div className="p-8 sm:p-12 rounded-3xl bg-zinc-950 text-white flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 shadow-2xl">
            <div className="space-y-2 max-w-2xl">
              <div className={KEXORA_THEME.classes.kickerDark}>
                Ready to Start Your Project?
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-[Outfit]">
                Build Your Website, Mobile App, or Game With Kexora
              </h2>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                Talk directly with Rajan Singh and our team for a free consultation, clear project plan, and simple pricing quote.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() => openContactModal('New Website / App / Game Project')}
                className={KEXORA_THEME.classes.btnPrimaryWhite}
              >
                <span>Start Your Project</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => onNavigatePage('tools')}
                className="px-6 py-3.5 text-xs sm:text-sm font-semibold text-white bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 rounded-full transition-colors flex items-center gap-2 whitespace-nowrap shrink-0"
              >
                <Sparkles className="w-4 h-4 text-white" />
                <span>Try Our Free Tools</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

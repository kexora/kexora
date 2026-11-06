import React from 'react';
import { ActiveTab, ToolTab } from '../../types';
import { PageBanner } from '../component/PageBanner';
import { ToolsSuite } from '../component/ToolsSuite';
import { SeoHubSection } from '../component/SeoHubSection';
import { MessageSquare, Gauge, Calculator, Smartphone } from 'lucide-react';

interface OurToolsPageProps {
  initialToolTab?: ToolTab;
  openContactModal: (serviceName?: string, details?: string) => void;
  onNavigatePage: (page: ActiveTab) => void;
}

export const OurToolsPage: React.FC<OurToolsPageProps> = ({
  initialToolTab = 'whatsapp-reader',
  openContactModal,
  onNavigatePage,
}) => {
  return (
    <div className="bg-white text-zinc-950">
      <PageBanner
        kicker="Our Tools · Kexora Browser Utilities & Engineering Lab"
        title="Free Interactive Utilities for"
        highlightText="Founders, Marketers & Developers"
        description="Explore Kexora’s signature browser utilities—including our 100% client-side WhatsApp Message Reader, Live AI SEO & Core Web Vitals Auditor, Project Cost Estimator, and JSON-LD Schema Builder."
        primaryCtaLabel="Request a Custom Web Utility"
        onPrimaryCta={() => openContactModal('Custom Web App / Utility Development')}
        onBackHome={onNavigatePage}
      />

      {/* Interactive Tools Suite */}
      <ToolsSuite
        initialTab={initialToolTab}
        openContactModalWithDetails={(details) =>
          openContactModal('Tool Enquiry / Project Estimate', details)
        }
      />

      {/* Kexora Utility Directory & Digi Sagun Spotlight */}
      <section className="py-20 bg-zinc-50 text-zinc-950 border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <div className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2">
              Why Kexora Builds Open Utilities
            </div>
            <h2
              className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-950 font-[Outfit]"
              style={{ textWrap: 'balance' }}
            >
              Practical Micro-Apps Engineered With Zero Server Bloat
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="p-6 rounded-2xl bg-white border border-zinc-200 space-y-3">
              <MessageSquare className="w-5 h-5 text-zinc-950" />
              <h3 className="text-base font-bold text-zinc-950 font-[Outfit]">
                01. WhatsApp Message Reader
              </h3>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Parse exported <code className="font-mono text-zinc-950 font-bold">.txt</code> chat logs directly in your browser memory without uploading private conversations to any cloud server.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-zinc-200 space-y-3">
              <Gauge className="w-5 h-5 text-zinc-950" />
              <h3 className="text-base font-bold text-zinc-950 font-[Outfit]">
                02. AI SEO & Web Vitals Auditor
              </h3>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Evaluate any domain’s LCP, INP, CLS, meta descriptions, and Schema.org sitelink readiness in seconds.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-zinc-200 space-y-3">
              <Calculator className="w-5 h-5 text-zinc-950" />
              <h3 className="text-base font-bold text-zinc-950 font-[Outfit]">
                03. Project Cost &amp; Speed Estimator
              </h3>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Calculate setup fees, monthly retainers, and expected 0.3s load-speed &amp; 99+ PageSpeed targets across Web, Mobile App, Game, and SEO builds.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-zinc-200 space-y-3">
              <Smartphone className="w-5 h-5 text-zinc-950" />
              <h3 className="text-base font-bold text-zinc-950 font-[Outfit]">
                04. Digi Sagun Cultural PWA
              </h3>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Kexora’s flagship Progressive Web App for digitizing wedding and event gift ledgers with instant guest search and PDF export.
              </p>
            </div>
          </div>
        </div>
      </section>

      <SeoHubSection />
    </div>
  );
};

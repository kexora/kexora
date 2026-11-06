import React from 'react';
import { ActiveTab, ToolTab } from '../../types';
import { PageBanner } from '../component/PageBanner';
import { ServicesBento } from '../component/ServicesBento';
import { SeoHubSection } from '../component/SeoHubSection';
import { Portfolio } from '../component/Portfolio';
import { CheckCircle2 } from 'lucide-react';

interface ServicesPageProps {
  openContactModal: (serviceName?: string, details?: string) => void;
  onNavigatePage: (page: ActiveTab) => void;
  openToolsWithTab: (tool: ToolTab) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({
  openContactModal,
  onNavigatePage,
}) => {
  const deliverySteps = [
    {
      step: '01',
      title: 'Discovery, Technical Audit & Architecture Blueprint',
      desc: 'We understand your business workflow, analyze competitor keyword gaps, and design a clean custom code architecture with zero technical debt.',
      deliverable: 'Architecture Spec + Core Web Vitals Baseline',
    },
    {
      step: '02',
      title: 'Mobile-First UI/UX Wireframing & Figma Prototyping',
      desc: 'Our design team creates high-contrast, conversion-focused interfaces tailored to your brand identity—complete with interactive prototypes before a single line of code is written.',
      deliverable: 'Interactive Figma System + Brand Assets',
    },
    {
      step: '03',
      title: 'Custom Code Engineering, App & Payment Integration',
      desc: 'We build your website, e-commerce store, or mobile app in React, Next.js, Flutter, or custom CMS, connecting Razorpay, Stripe, UPI, and REST APIs.',
      deliverable: '99+ PageSpeed Custom Code Repository',
    },
    {
      step: '04',
      title: 'Enterprise AI-SEO, Schema.org Sitelinks & Launch',
      desc: 'We embed Organization, WebSite, Service, and FAQPage JSON-LD structured data, verify Google Search Console indexing, and launch your platform seamlessly.',
      deliverable: 'Live Production Deployment + SLA Support',
    },
  ];

  return (
    <div className="bg-white text-zinc-950">
      <PageBanner
        kicker="Services & Capabilities · Kexora Engineering"
        title="Custom Web Design, Mobile Apps, Games &"
        highlightText="Enterprise AI-SEO"
        description="From high-speed React & HTML5 websites, Android/iOS apps, and 2D/3D games to Local SEO, creative branding, and GST/Trademark/ISO compliance—Kexora delivers full-lifecycle digital execution."
        primaryCtaLabel="Request Custom Service Quote"
        onPrimaryCta={() => openContactModal('Web Design & Custom Code')}
        onBackHome={onNavigatePage}
      />

      {/* All 6 Service Pillars */}
      <ServicesBento
        onSelectService={(serviceTitle) => openContactModal(serviceTitle)}
      />

      {/* 4-Phase Engineering Process */}
      <section className="py-20 bg-zinc-50 text-zinc-950 border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <div className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2">
              How Kexora Executes · Predictable Engineering Workflow
            </div>
            <h2
              className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-950 font-[Outfit]"
              style={{ textWrap: 'balance' }}
            >
              4-Step Delivery from Strategy to 99+ PageSpeed Launch
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {deliverySteps.map((item) => (
              <div
                key={item.step}
                className="p-6 rounded-2xl bg-white border border-zinc-200 flex flex-col justify-between space-y-5"
              >
                <div className="space-y-3">
                  <div className="text-xs font-mono text-zinc-950 font-bold tabular-nums">
                    Phase {item.step}
                  </div>
                  <h3 className="text-lg font-bold text-zinc-950 font-[Outfit]">
                    {item.step}. {item.title}
                  </h3>
                  <p className="text-xs text-zinc-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-zinc-200 flex items-center gap-2 text-xs text-zinc-800 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-zinc-950 shrink-0" />
                  <span>{item.deliverable}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enterprise SEO Architecture Blueprint */}
      <SeoHubSection />

      {/* Case Studies */}
      <Portfolio
        openContactModal={(serviceTitle) => openContactModal(serviceTitle)}
      />
    </div>
  );
};

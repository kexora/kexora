import React from 'react';
import { ActiveTab } from '../../types';
import { PageBanner } from '../component/PageBanner';
import { PricingSection } from '../component/PricingSection';
import { ToolsSuite } from '../component/ToolsSuite';
import { TestimonialsFaq } from '../component/TestimonialsFaq';

interface PricingPageProps {
  openContactModal: (serviceName?: string, details?: string) => void;
  onNavigatePage: (page: ActiveTab) => void;
}

export const PricingPage: React.FC<PricingPageProps> = ({
  openContactModal,
  onNavigatePage,
}) => {
  const comparisonRows = [
    {
      feature: 'Monthly Managed Retainer (INR / USD)',
      beginner: '₹999/mo ($15/mo)',
      creative: '₹2,499/mo ($35/mo)',
      expert: '₹4,999/mo ($65/mo)',
    },
    {
      feature: 'One-Time Setup & Engineering Fee',
      beginner: '₹8,000 ($99)',
      creative: '₹18,000 ($229)',
      expert: '₹40,000+ ($499+)',
    },
    {
      feature: 'Included Custom Designed Pages',
      beginner: 'Single Page / Portfolio',
      creative: 'Up to 5–10 Custom Pages',
      expert: 'Unlimited Pages / Full Store',
    },
    {
      feature: 'Core Web Vitals & Speed Optimization',
      beginner: 'Standard Mobile Responsive',
      creative: '99+ PageSpeed Guarantee',
      expert: '99+ PageSpeed + Edge CDN',
    },
    {
      feature: 'UI/UX Design Revisions Included',
      beginner: 'Initial Build Sign-off',
      creative: '2–3 Dedicated Revisions',
      expert: 'Unlimited Design Revisions',
    },
    {
      feature: 'E-Commerce & Payment Gateways (UPI/Razorpay)',
      beginner: 'Optional Add-on',
      creative: 'Optional Add-on',
      expert: 'Included (Full Multi-Vendor/D2C)',
    },
    {
      feature: 'SEO, Schema.org JSON-LD & Google Maps',
      beginner: 'Foundational On-Page SEO',
      creative: 'Full GMB, Social & JSON-LD',
      expert: 'Enterprise AI-SEO & Sitelinks',
    },
    {
      feature: 'Engineering Support & Backup SLA',
      beginner: 'Basic Ticket Support',
      creative: 'Priority Support',
      expert: '24/7 Priority + Daily Backups',
    },
  ];

  return (
    <div className="bg-white text-zinc-950">
      <PageBanner
        kicker="Pricing Plan · Transparent INR (₹) & USD ($) Tiers"
        title="Invest in High-Performance"
        highlightText="Custom Web & App Architecture"
        description="Choose from Kexora’s structured Beginner, Creative, and Expert plans, or use our interactive Project Cost & Speed Estimator below to calculate a custom website, mobile app, game, or e-commerce build."
        primaryCtaLabel="Book Free Pricing Consultation"
        onPrimaryCta={() => openContactModal('Pricing Plan Consultation')}
        onBackHome={onNavigatePage}
      />

      {/* Core 3 Pricing Plans */}
      <PricingSection
        openContactModalWithService={(serviceName) =>
          openContactModal(serviceName)
        }
      />

      {/* Detailed Plan Comparison Matrix */}
      <section className="py-20 bg-white text-zinc-950 border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <div className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2">
              Side-by-Side Specification Matrix
            </div>
            <h2
              className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-950 font-[Outfit]"
              style={{ textWrap: 'balance' }}
            >
              Compare Beginner, Creative & Expert Deliverables
            </h2>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-zinc-200 bg-white">
            <table className="w-full text-left text-xs sm:text-sm border-collapse tabular-nums">
              <thead>
                <tr className="border-b border-zinc-200 bg-zinc-100 text-xs font-bold text-zinc-700">
                  <th className="py-4 px-6">Deliverable / Capability</th>
                  <th className="py-4 px-6">Beginner Plan</th>
                  <th className="py-4 px-6 text-zinc-950">Creative Plan (Popular)</th>
                  <th className="py-4 px-6">Expert Plan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 text-zinc-700">
                {comparisonRows.map((row, i) => (
                  <tr key={i} className="hover:bg-zinc-50 transition-colors">
                    <td className="py-3.5 px-6 font-bold text-zinc-950">{row.feature}</td>
                    <td className="py-3.5 px-6 text-zinc-500 font-mono text-xs">{row.beginner}</td>
                    <td className="py-3.5 px-6 text-zinc-950 font-bold font-mono text-xs">
                      {row.creative}
                    </td>
                    <td className="py-3.5 px-6 text-zinc-950 font-mono text-xs">{row.expert}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Interactive Cost Estimator pre-selected */}
      <ToolsSuite
        initialTab="cost-calculator"
        openContactModalWithDetails={(details) =>
          openContactModal('Custom Project Estimate', details)
        }
      />

      {/* Testimonials & FAQs */}
      <TestimonialsFaq />
    </div>
  );
};

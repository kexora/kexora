import React, { useState } from 'react';
import { ActiveTab, ToolTab } from '../../types';
import { KEXORA_COMPANY_INFO } from '../../data/agencyData';
import { BlurKex } from './effect';
import {
  Mail,
  MapPin,
  ArrowUpRight,
  ArrowUp,
  Copy,
  Check,
} from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: ActiveTab) => void;
  openContactModal: (serviceName?: string, details?: string) => void;
  openToolsWithTab?: (tab: ToolTab) => void;
}

export const Footer: React.FC<FooterProps> = ({
  setActiveTab,
  openContactModal,
  openToolsWithTab,
}) => {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(KEXORA_COMPANY_INFO.contact.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const pageLinks: { id: ActiveTab; label: string; path: string }[] = [
    { id: 'home', label: 'Home', path: '/' },
    { id: 'services', label: 'Services', path: '/services' },
    { id: 'pricing', label: 'Pricing Plan', path: '/pricing' },
    { id: 'tools', label: 'Our Tools', path: '/our-tools' },
    { id: 'about', label: 'About Us', path: '/about-us' },
    { id: 'news', label: 'News & Insights', path: '/news' },
    { id: 'contact', label: 'Contact Us', path: '/contact' },
  ];

  const coreServiceLinks = [
    'Web Design & Custom Development',
    'Multi-Vendor E-Commerce & Online Stores',
    'Mobile App & Game Development',
    'Digital Marketing, SEO & AI-SEO',
    'Creative UI/UX, Logo & Video Design',
    'Business, GST, Trademark & ISO Registration',
  ];

  const toolLinks: { id: ToolTab; label: string }[] = [
    { id: 'whatsapp-reader', label: 'WhatsApp Chat Reader' },
    { id: 'seo-audit', label: 'Live AI SEO Auditor' },
    { id: 'cost-calculator', label: 'Cost & Speed Estimator' },
    { id: 'schema-generator', label: 'JSON-LD Schema Builder' },
  ];

  return (
    <footer
      role="contentinfo"
      itemScope
      itemType="https://schema.org/WPFooter"
      className="bg-zinc-950 text-zinc-300 border-t border-zinc-900"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 1. Top Editorial Call-to-Action Strip */}
        <BlurKex
          direction="up"
          blurPx={14}
          className="py-12 sm:py-16 border-b border-zinc-800/80 flex flex-col lg:flex-row lg:items-end justify-between gap-8"
        >
          <div className="space-y-3 max-w-2xl">
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">
              Kexora Studio · Siwan, Bihar (841226) to Global Delivery
            </div>
            <h2
              className="text-2xl sm:text-4xl font-bold text-white font-[Outfit] tracking-tight leading-[1.15]"
              style={{ textWrap: 'balance' }}
            >
              Ready to build a fast website, mobile app, or digital brand?
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href="/contact"
              onClick={(e) => {
                e.preventDefault();
                openContactModal('Web Design & Custom Development');
              }}
              className="group px-7 py-4 text-sm sm:text-base font-extrabold text-zinc-950 bg-white hover:bg-zinc-200 rounded-full transition-all duration-200 inline-flex items-center gap-2.5 whitespace-nowrap shrink-0 shadow-md cursor-pointer"
            >
              <span>Start Your Project</span>
              <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>

            <button
              type="button"
              onClick={handleCopyEmail}
              className="px-6 py-4 text-sm font-bold text-zinc-200 hover:text-white bg-zinc-900 hover:bg-zinc-800/90 border border-zinc-800 rounded-full transition-colors inline-flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
            >
              {copiedEmail ? (
                <>
                  <Check className="w-4 h-4 text-white" />
                  <span>Copied: {KEXORA_COMPANY_INFO.contact.email}</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-zinc-400" />
                  <span>{KEXORA_COMPANY_INFO.contact.email}</span>
                </>
              )}
            </button>
          </div>
        </BlurKex>

        {/* 2. Main Multi-Column Navigation & Studio Architecture */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-10 items-start">
          {/* Column A: Brand Identity, Motto & Location (5 cols) */}
          <div
            itemScope
            itemType="https://schema.org/Organization"
            className="lg:col-span-5 space-y-5 pr-0 lg:pr-8"
          >
            <meta itemProp="url" content="https://kexora.in/" />
            <meta itemProp="logo" content="https://kexora.in/favicon-512x512.png" />

            <a
              href="/"
              aria-label="Kexora Home"
              onClick={(e) => {
                e.preventDefault();
                setActiveTab('home');
              }}
              className="kexora-logo-font inline-flex items-center whitespace-nowrap -mt-1.5 text-3xl sm:text-[40px] leading-none tracking-[0.06em] text-white hover:opacity-85 transition-opacity select-none"
            >
              <span itemProp="name">Kexora</span>
            </a>

            <p
              itemProp="description"
              className="text-[15px] sm:text-base text-zinc-300 leading-7 max-w-md"
            >
              We design and code high-speed custom websites, e-commerce stores, Android &amp; iOS mobile apps, and 2D/3D games—backed by Google SEO, creative branding, and business registration.
            </p>

            <p className="text-sm sm:text-[15px] font-medium text-zinc-100 leading-relaxed">
              &ldquo;{KEXORA_COMPANY_INFO.motto}&rdquo;
            </p>

            <address className="not-italic pt-1 space-y-3 text-sm text-zinc-200">
              <div
                itemProp="address"
                itemScope
                itemType="https://schema.org/PostalAddress"
                className="flex items-center gap-2.5"
              >
                <MapPin className="w-4 h-4 text-white shrink-0" aria-hidden="true" />
                <span>
                  <span itemProp="addressLocality">Siwan</span>,{' '}
                  <span itemProp="addressRegion">Bihar</span> —{' '}
                  <span itemProp="postalCode">841226</span>,{' '}
                  <span itemProp="addressCountry">India</span> · Global Delivery
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-white shrink-0" aria-hidden="true" />
                <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-sm text-zinc-200">
                  <a
                    itemProp="email"
                    href={`mailto:${KEXORA_COMPANY_INFO.contact.email}`}
                    className="hover:text-white transition-colors font-semibold underline underline-offset-4 decoration-zinc-600 hover:decoration-white"
                  >
                    {KEXORA_COMPANY_INFO.contact.email}
                  </a>
                  <span aria-hidden="true" className="text-zinc-600">·</span>
                  <a
                    itemProp="email"
                    href={`mailto:${KEXORA_COMPANY_INFO.contact.supportEmail}`}
                    className="hover:text-white transition-colors font-semibold underline underline-offset-4 decoration-zinc-600 hover:decoration-white"
                  >
                    {KEXORA_COMPANY_INFO.contact.supportEmail}
                  </a>
                </div>
              </div>
            </address>
          </div>

          {/* Column B: Website Navigation (2 cols) */}
          <nav aria-label="Footer Site Navigation" className="lg:col-span-2 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-white">
              Navigation
            </h3>
            <ul className="space-y-3 text-sm">
              {pageLinks.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.path}
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveTab(item.id);
                    }}
                    className="text-zinc-300 hover:text-white transition-colors inline-flex items-center gap-1 group"
                  >
                    <span>{item.label}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-y-0.5 translate-x-0.5 group-hover:opacity-100 transition-all duration-150" />
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Column C: Core Services (3 cols) */}
          <nav aria-label="Kexora Core Services" className="lg:col-span-3 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-white">
              Core Services
            </h3>
            <ul className="space-y-3 text-sm">
              {coreServiceLinks.map((serviceName) => (
                <li key={serviceName}>
                  <a
                    href="/services"
                    title={`${serviceName} by Kexora`}
                    onClick={(e) => {
                      e.preventDefault();
                      openContactModal(serviceName);
                    }}
                    className="text-zinc-300 hover:text-white transition-colors inline-flex items-center gap-1 group text-left"
                  >
                    <span>{serviceName}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Column D: Free Utilities & Search/AI Discovery (2 cols) */}
          <div className="lg:col-span-2 space-y-7">
            <nav aria-label="Kexora Free Browser Utilities" className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-white">
                Free Utilities
              </h3>
              <ul className="space-y-3 text-sm">
                {toolLinks.map((tool) => (
                  <li key={tool.id}>
                    <a
                      href={`/our-tools/${tool.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        if (openToolsWithTab) {
                          openToolsWithTab(tool.id);
                        } else {
                          setActiveTab('tools');
                        }
                      }}
                      className="text-zinc-300 hover:text-white transition-colors inline-flex items-center gap-1 group"
                    >
                      <span>{tool.label}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        {/* 3. Quiet Copyright & Back-to-Top Bar */}
        <div className="py-7 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-zinc-400">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-2 gap-y-1">
            <span className="text-zinc-200 font-medium tabular-nums">
              © 2021–{Math.max(2021, new Date().getFullYear())} Kexora. All rights reserved.
            </span>
          </div>

          <div className="flex items-center gap-5">
            <span className="hidden md:inline text-xs text-zinc-400">
              Web · Apps · Games · AI-SEO · Branding
            </span>
            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Scroll back to top"
              className="group px-4 py-2 rounded-full bg-zinc-900 hover:bg-zinc-800 text-zinc-200 hover:text-white border border-zinc-800 transition-colors inline-flex items-center gap-2 text-xs sm:text-sm font-bold cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-4 h-4 transition-transform duration-200 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

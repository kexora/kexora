import React, { useState } from 'react';
import { ActiveTab, ToolTab } from '../../types';
import { KEXORA_COMPANY_INFO } from '../../data/agencyData';
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
    <footer className="bg-zinc-950 text-zinc-400 border-t border-zinc-900 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 1. Top Editorial Call-to-Action Strip */}
        <div className="py-12 sm:py-16 border-b border-zinc-800/80 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
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
        </div>

        {/* 2. Main Multi-Column Navigation & Studio Architecture */}
        <div className="py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Column A: Brand Identity, Motto & Location (4 cols) */}
          <div className="lg:col-span-4 space-y-5 pr-0 lg:pr-6">
            <a
              href="/"
              aria-label="Kexora Home"
              onClick={(e) => {
                e.preventDefault();
                setActiveTab('home');
              }}
              className="kexora-logo-font inline-flex items-center whitespace-nowrap text-2xl sm:text-3xl tracking-wider text-white hover:opacity-85 transition-opacity select-none"
            >
              Kexora
            </a>

            <p className="text-xs sm:text-[13px] text-zinc-400 leading-relaxed max-w-sm">
              We design and code high-speed custom websites, e-commerce stores, Android &amp; iOS mobile apps, and 2D/3D games—backed by Google SEO, creative branding, and business registration.
            </p>

            <div className="text-xs font-medium text-zinc-200 italic font-[Outfit]">
              &ldquo;{KEXORA_COMPANY_INFO.motto}&rdquo;
            </div>

            <div className="pt-1 space-y-2 text-xs text-zinc-300">
              <div className="flex items-center gap-2.5">
                <MapPin className="w-3.5 h-3.5 text-white shrink-0" />
                <span>
                  Siwan, Bihar — 841226, India · Global Delivery
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-3.5 h-3.5 text-white shrink-0" />
                <a
                  href={`mailto:${KEXORA_COMPANY_INFO.contact.email}`}
                  className="hover:text-white transition-colors font-semibold underline underline-offset-4"
                >
                  {KEXORA_COMPANY_INFO.contact.email}
                </a>
              </div>
            </div>
          </div>

          {/* Column B: Website Navigation (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="text-xs font-bold uppercase tracking-wider text-white">
              Navigation
            </div>
            <ul className="space-y-2.5 text-xs sm:text-[13px]">
              {pageLinks.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.path}
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveTab(item.id);
                    }}
                    className="text-zinc-400 hover:text-white transition-colors inline-flex items-center gap-1 group"
                  >
                    <span>{item.label}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-0.5 translate-x-0.5 group-hover:opacity-100 transition-all duration-150" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column C: Core Services — Smart Auto-Fill Triggers (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <div className="text-xs font-bold uppercase tracking-wider text-white">
              Core Services
            </div>
            <ul className="space-y-2.5 text-xs sm:text-[13px]">
              {coreServiceLinks.map((serviceName) => (
                <li key={serviceName}>
                  <a
                    href="/contact"
                    onClick={(e) => {
                      e.preventDefault();
                      openContactModal(serviceName);
                    }}
                    className="text-zinc-400 hover:text-white transition-colors inline-flex items-center gap-1 group text-left"
                  >
                    <span>{serviceName}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column D: Interactive Tools & Pricing Plans (3 cols) */}
          <div className="lg:col-span-3 space-y-6">
            <div className="space-y-3.5">
              <div className="text-xs font-bold uppercase tracking-wider text-white">
                Free Client Utilities
              </div>
              <ul className="space-y-2 text-xs sm:text-[13px]">
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
                      className="text-zinc-400 hover:text-white transition-colors inline-flex items-center gap-1 group"
                    >
                      <span>{tool.label}</span>
                      <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t border-zinc-800/80 space-y-1.5">
              <div className="text-[11px] font-bold uppercase tracking-wider text-zinc-300">
                Leadership Desk
              </div>
              <div className="text-xs text-zinc-400">
                <span className="text-zinc-200 font-semibold">Rajan Singh</span> (CEO) ·{' '}
                <span className="text-zinc-200 font-semibold">Aditya Singh</span> (CTO)
              </div>
              <div className="text-[11px] font-mono text-zinc-500 tabular-nums">
                0.3s Load Speed · 99+ Google PageSpeed
              </div>
            </div>
          </div>
        </div>

        {/* 3. Quiet Copyright & Back-to-Top Bar */}
        <div className="py-7 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-3 gap-y-1">
            <span className="text-zinc-400 font-medium">
              © {new Date().getFullYear()} Kexora Studio (kexora.org).
            </span>
            <span aria-hidden="true">·</span>
            <span>All rights reserved.</span>
          </div>

          <div className="flex items-center gap-5">
            <span className="hidden md:inline text-zinc-500">
              Web · Apps · Games · AI-SEO · Branding
            </span>
            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Scroll back to top"
              className="group px-4 py-2 rounded-full bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 transition-colors inline-flex items-center gap-2 text-xs sm:text-sm font-bold cursor-pointer"
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

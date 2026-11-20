import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
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
  const [showFloatingTop, setShowFloatingTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowFloatingTop(window.scrollY > 260);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    <>
      <footer
        role="contentinfo"
        itemScope
        itemType="https://schema.org/WPFooter"
        className="relative w-full bg-zinc-950 text-zinc-300 border-t border-zinc-900"
      >
        <div className="w-full max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          {/* 1. Top Editorial Call-to-Action Strip */}
          <div className="pt-10 pb-8 sm:pt-11 sm:pb-9 lg:pt-9 lg:pb-8 border-b border-zinc-800/80 flex flex-col lg:flex-row lg:items-end justify-between gap-6 lg:gap-8">
            <div className="space-y-2.5 max-w-2xl">
              <div className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">
                Kexora Studio · Siwan, Bihar (841226) to Global Delivery
              </div>
              <h2
                className="text-2xl sm:text-3xl lg:text-[2rem] font-bold text-white font-[Outfit] tracking-tight leading-[1.18]"
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
                className="group px-5 sm:px-6 py-3 text-sm font-extrabold text-zinc-950 bg-white hover:bg-zinc-200 rounded-full transition-all duration-200 inline-flex items-center gap-2 whitespace-nowrap shrink-0 shadow-md cursor-pointer"
              >
                <span>Start Your Project</span>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              <button
                type="button"
                onClick={handleCopyEmail}
                className="px-5 py-3 text-sm font-bold text-zinc-200 hover:text-white bg-zinc-900 hover:bg-zinc-800/90 border border-zinc-800 rounded-full transition-colors inline-flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
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
          <div className="py-9 sm:py-11 lg:py-10">
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-y-9 md:gap-y-10 lg:gap-y-0 md:gap-x-8 lg:gap-x-10 items-start">
              {/* Column A: Brand Identity, Motto & Location */}
              <div
                itemScope
                itemType="https://schema.org/Organization"
                className="md:col-span-2 lg:col-span-4 flex flex-col gap-4 pb-8 md:pb-6 lg:pb-0 border-b border-zinc-800/70 lg:border-b-0 lg:pr-4"
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
                  className="kexora-logo-font inline-flex items-center whitespace-nowrap text-3xl sm:text-[2.15rem] leading-none tracking-[0.06em] text-white hover:opacity-85 transition-opacity select-none"
                >
                  <span itemProp="name">Kexora</span>
                </a>

                <p
                  itemProp="description"
                  className="text-sm sm:text-[15px] text-zinc-300 leading-relaxed max-w-md"
                >
                  We design and code high-speed custom websites, e-commerce stores, Android &amp; iOS mobile apps, and 2D/3D games—backed by Google SEO, creative branding, and business registration.
                </p>

                <p className="text-sm font-medium text-zinc-100 leading-snug">
                  &ldquo;{KEXORA_COMPANY_INFO.motto}&rdquo;
                </p>

                <address className="not-italic flex flex-col gap-2.5 pt-1 text-sm text-zinc-200">
                  <div
                    itemProp="address"
                    itemScope
                    itemType="https://schema.org/PostalAddress"
                    className="flex items-start sm:items-center gap-2.5"
                  >
                    <MapPin className="w-4 h-4 text-white shrink-0 mt-0.5 sm:mt-0" aria-hidden="true" />
                    <span>
                      <span itemProp="addressLocality">Siwan</span>,{' '}
                      <span itemProp="addressRegion">Bihar</span> —{' '}
                      <span itemProp="postalCode">841226</span>,{' '}
                      <span itemProp="addressCountry">India</span> · Global Delivery
                    </span>
                  </div>
                  <div className="flex items-start sm:items-center gap-2.5">
                    <Mail className="w-4 h-4 text-white shrink-0 mt-0.5 sm:mt-0" aria-hidden="true" />
                    <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-zinc-200">
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

              {/* Mobile/Tablet Paired Row for Navigation + Free Utilities; Separate Columns on Desktop */}
              <div className="grid grid-cols-2 gap-x-6 gap-y-8 md:contents">
                {/* Column B: Website Navigation */}
                <nav
                  aria-label="Footer Site Navigation"
                  className="lg:col-span-2 flex flex-col gap-3.5"
                >
                  <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-white">
                    Navigation
                  </h3>
                  <ul className="flex flex-col gap-2.5 text-sm">
                    {pageLinks.map((item) => (
                      <li key={item.id}>
                        <a
                          href={item.path}
                          onClick={(e) => {
                            e.preventDefault();
                            setActiveTab(item.id);
                          }}
                          className="text-zinc-300 hover:text-white transition-colors inline-flex items-center gap-1 group leading-snug"
                        >
                          <span>{item.label}</span>
                          <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-y-0.5 translate-x-0.5 group-hover:opacity-100 transition-all duration-150 hidden sm:inline" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>

                {/* Column D: Free Utilities */}
                <nav
                  aria-label="Kexora Free Browser Utilities"
                  className="lg:col-span-2 lg:order-4 flex flex-col gap-3.5"
                >
                  <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-white">
                    Free Utilities
                  </h3>
                  <ul className="flex flex-col gap-2.5 text-sm">
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
                          className="text-zinc-300 hover:text-white transition-colors inline-flex items-center gap-1 group leading-snug"
                        >
                          <span>{tool.label}</span>
                          <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 hidden sm:inline" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>

              {/* Column C: Core Services */}
              <nav
                aria-label="Kexora Core Services"
                className="md:col-span-2 lg:col-span-4 lg:order-3 flex flex-col gap-3.5 pt-8 md:pt-6 lg:pt-0 border-t border-zinc-800/70 lg:border-t-0"
              >
                <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-white">
                  Core Services
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-x-6 gap-y-2.5 text-sm">
                  {coreServiceLinks.map((serviceName) => (
                    <li key={serviceName}>
                      <a
                        href="/services"
                        title={`${serviceName} by Kexora`}
                        onClick={(e) => {
                          e.preventDefault();
                          openContactModal(serviceName);
                        }}
                        className="text-zinc-300 hover:text-white transition-colors inline-flex items-center gap-1 group text-left leading-snug"
                      >
                        <span>{serviceName}</span>
                        <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 hidden sm:inline" />
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>

          {/* 3. Clean Copyright Bar */}
          <div className="py-6 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm text-zinc-400">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-2 gap-y-1 text-center sm:text-left">
              <span className="text-zinc-200 font-medium tabular-nums">
                © 2021–{Math.max(2021, new Date().getFullYear())} Kexora. All rights reserved.
              </span>
            </div>

            <div className="flex items-center gap-5 shrink-0">
              <span className="text-xs text-zinc-400">
                Web · Apps · Games · AI-SEO · Branding
              </span>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Back-to-Top Pill Button */}
      <AnimatePresence>
        {showFloatingTop && (
          <motion.button
            key="floating-back-to-top"
            type="button"
            onClick={scrollToTop}
            aria-label="Scroll back to top"
            initial={{ opacity: 0, y: 18, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.92 }}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 360, damping: 28 }}
            className="group fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 px-4 py-2.5 sm:px-4.5 sm:py-3 rounded-full bg-zinc-950/95 hover:bg-zinc-900 text-white border border-white/20 shadow-[0_16px_38px_-10px_rgba(0,0,0,0.55)] backdrop-blur-md inline-flex items-center gap-2 text-xs sm:text-sm font-extrabold cursor-pointer whitespace-nowrap"
          >
            <span className="w-6 h-6 rounded-full bg-white text-zinc-950 flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:-translate-y-0.5">
              <ArrowUp className="w-3.5 h-3.5" />
            </span>
            <span>Back to Top</span>
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
};

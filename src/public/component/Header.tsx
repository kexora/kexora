import React, { useState, useEffect, useRef } from 'react';
import { ActiveTab, CurrencyCode } from '../../types';
import { KEXORA_SERVICE_PILLARS } from '../../data/agencyData';
import {
  Menu,
  X,
  ChevronDown,
  ArrowUpRight,
  ArrowRight,
  Search,
  Layers,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  openContactModal: (serviceName?: string) => void;
  currency?: CurrencyCode;
  onCurrencyChange?: (currency: CurrencyCode) => void;
  isLightTopPage?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  openContactModal,
  currency = 'INR',
  onCurrencyChange,
  isLightTopPage = false,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDrawerOpen, setServicesDrawerOpen] = useState(false);
  const [selectedPillarIdx, setSelectedPillarIdx] = useState(0);
  const [serviceSearch, setServiceSearch] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    let ticking = false;

    const updateScrollState = () => {
      const scrolled = window.scrollY > 24;
      setIsScrolled((prev) => (prev !== scrolled ? scrolled : prev));
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollState);
        ticking = true;
      }
    };

    updateScrollState();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close Services Explorer with Escape key & lock focus smoothly
  useEffect(() => {
    if (!servicesDrawerOpen) {
      setServiceSearch('');
      return;
    }
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setServicesDrawerOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    const focusTimer = window.setTimeout(() => {
      searchInputRef.current?.focus();
    }, 120);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.clearTimeout(focusTimer);
    };
  }, [servicesDrawerOpen]);

  const navItems: {
    id: ActiveTab;
    label: string;
    path: string;
    hasExplorer?: boolean;
  }[] = [
    { id: 'home', label: 'Home', path: '/' },
    { id: 'services', label: 'Services', path: '/services', hasExplorer: true },
    { id: 'pricing', label: 'Pricing Plan', path: '/pricing' },
    { id: 'tools', label: 'Our Tools', path: '/our-tools' },
    { id: 'about', label: 'About Us', path: '/about-us' },
    { id: 'news', label: 'News', path: '/news' },
  ];

  const handleNavClick = (tab: ActiveTab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    setServicesDrawerOpen(false);
  };

  const handleSubServiceEnquire = (serviceName: string) => {
    setMobileMenuOpen(false);
    setServicesDrawerOpen(false);
    openContactModal(serviceName);
  };

  // Adaptive crisp surface: light porcelain frosted glass when scrolled, on light-top pages (e.g. 404/403/500), or when mobile menu is open
  const useLightSurface = isScrolled || isLightTopPage || mobileMenuOpen;

  const isPricingView =
    activeTab === 'pricing' ||
    (typeof window !== 'undefined' &&
      window.location.pathname.includes('/pricing'));

  const normalizedQuery = serviceSearch.trim().toLowerCase();
  const displayedServices = normalizedQuery
    ? KEXORA_SERVICE_PILLARS.flatMap((pillar) =>
        pillar.items
          .filter(
            (item) =>
              item.toLowerCase().includes(normalizedQuery) ||
              pillar.category.toLowerCase().includes(normalizedQuery)
          )
          .map((item) => ({ item, category: pillar.category }))
      )
    : (KEXORA_SERVICE_PILLARS[selectedPillarIdx]?.items || []).map((item) => ({
        item,
        category: KEXORA_SERVICE_PILLARS[selectedPillarIdx].category,
      }));

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,border-color,color,box-shadow] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          useLightSurface
            ? 'bg-white/94 backdrop-blur-2xl backdrop-saturate-180 border-b border-zinc-200/90 text-zinc-950 shadow-[0_8px_28px_-12px_rgba(9,9,11,0.12)]'
            : 'bg-zinc-950/72 backdrop-blur-xl backdrop-saturate-150 border-b border-white/12 text-white shadow-[0_4px_24px_-8px_rgba(0,0,0,0.45)]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[72px] flex items-center justify-between gap-8">
          {/* Zone 1: Official Kexora Brand Wordmark */}
          <a
            href="/"
            aria-label="Kexora Home"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('home');
            }}
            className={`kexora-logo-font inline-flex items-center shrink-0 whitespace-nowrap text-xl sm:text-2xl tracking-wider leading-none select-none transition-opacity duration-150 ${
              useLightSurface
                ? 'text-zinc-950 hover:opacity-75'
                : 'text-white hover:opacity-85'
            }`}
          >
            Kexora
          </a>

          {/* Zone 2: Clean Single-Line Navigation (Zero Accidental Hover Dropdowns) */}
          <nav
            aria-label="Primary Navigation"
            className="hidden md:flex items-center gap-7 lg:gap-8 text-[15px] font-semibold"
          >
            {navItems.map((item) => {
              const isActive = activeTab === item.id && !isLightTopPage;

              if (item.hasExplorer) {
                return (
                  <div
                    key={item.id}
                    className="inline-flex items-center gap-1 whitespace-nowrap shrink-0"
                  >
                    <a
                      href={item.path}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(item.id);
                      }}
                      className={`relative py-1.5 whitespace-nowrap shrink-0 transition-colors duration-150 ${
                        useLightSurface
                          ? isActive
                            ? 'text-zinc-950 font-bold'
                            : 'text-zinc-700 hover:text-zinc-950'
                          : isActive
                            ? 'text-white font-bold'
                            : 'text-zinc-200 hover:text-white'
                      }`}
                    >
                      <span>{item.label}</span>
                      {isActive && (
                        <motion.span
                          layoutId="kexora-nav-underline"
                          transition={{
                            type: 'spring',
                            stiffness: 420,
                            damping: 34,
                          }}
                          className={`absolute left-0 right-0 -bottom-0.5 h-0.5 rounded-full ${
                            useLightSurface ? 'bg-zinc-950' : 'bg-white'
                          }`}
                        />
                      )}
                    </a>

                    {/* Click-Only Modern Services Explorer Trigger */}
                    <button
                      type="button"
                      onClick={() => setServicesDrawerOpen((open) => !open)}
                      aria-label="Quick browse all 24 Kexora services"
                      aria-expanded={servicesDrawerOpen}
                      aria-controls="kexora-services-explorer"
                      className={`p-1 rounded-md transition-colors duration-150 cursor-pointer ${
                        useLightSurface
                          ? servicesDrawerOpen
                            ? 'bg-zinc-950 text-white'
                            : 'text-zinc-500 hover:text-zinc-950 hover:bg-zinc-100'
                          : servicesDrawerOpen
                            ? 'bg-white text-zinc-950'
                            : 'text-zinc-300 hover:text-white hover:bg-white/15'
                      }`}
                    >
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          servicesDrawerOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                  </div>
                );
              }

              return (
                <a
                  key={item.id}
                  href={item.path}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.id);
                  }}
                  className={`relative py-1.5 whitespace-nowrap shrink-0 transition-colors duration-150 ${
                    useLightSurface
                      ? isActive
                        ? 'text-zinc-950 font-bold'
                        : 'text-zinc-700 hover:text-zinc-950'
                      : isActive
                        ? 'text-white font-bold'
                        : 'text-zinc-200 hover:text-white'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <motion.span
                      layoutId="kexora-nav-underline"
                      transition={{
                        type: 'spring',
                        stiffness: 420,
                        damping: 34,
                      }}
                      className={`absolute left-0 right-0 -bottom-0.5 h-0.5 rounded-full ${
                        useLightSurface ? 'bg-zinc-950' : 'bg-white'
                      }`}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Zone 3: Pricing Currency Toggle (Pricing Page Only) & Primary CTA */}
          <div className="flex items-center gap-2.5 sm:gap-3.5 shrink-0">
            {isPricingView && onCurrencyChange && (
              <div
                role="group"
                aria-label="Select pricing currency"
                className={`hidden sm:inline-flex items-center p-1 rounded-full border transition-colors ${
                  useLightSurface
                    ? 'bg-zinc-100 border-zinc-300 text-zinc-950'
                    : 'bg-white/12 border-white/25 text-white'
                }`}
              >
                <button
                  type="button"
                  onClick={() => onCurrencyChange('INR')}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer whitespace-nowrap ${
                    currency === 'INR'
                      ? useLightSurface
                        ? 'bg-zinc-950 text-white'
                        : 'bg-white text-zinc-950'
                      : useLightSurface
                        ? 'text-zinc-700 hover:text-zinc-950'
                        : 'text-zinc-200 hover:text-white'
                  }`}
                >
                  <span className="currency-symbol font-bold">₹</span>
                  <span>INR</span>
                </button>
                <button
                  type="button"
                  onClick={() => onCurrencyChange('USD')}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer whitespace-nowrap ${
                    currency === 'USD'
                      ? useLightSurface
                        ? 'bg-zinc-950 text-white'
                        : 'bg-white text-zinc-950'
                      : useLightSurface
                        ? 'text-zinc-700 hover:text-zinc-950'
                        : 'text-zinc-200 hover:text-white'
                  }`}
                >
                  <span className="currency-symbol font-bold">$</span>
                  <span>USD</span>
                </button>
              </div>
            )}

            <a
              href="/contact"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('contact');
              }}
              className={`group px-5 sm:px-6 py-2.5 text-sm font-extrabold rounded-full whitespace-nowrap shrink-0 inline-flex items-center justify-center gap-2 transition-colors duration-150 cursor-pointer ${
                useLightSurface
                  ? 'bg-zinc-950 text-white hover:bg-zinc-800 shadow-xs'
                  : 'bg-white text-zinc-950 hover:bg-zinc-200 shadow-md'
              }`}
            >
              <span>Contact Us</span>
              <ArrowUpRight className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>

            <button
              type="button"
              aria-label={
                mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'
              }
              onClick={() => {
                setServicesDrawerOpen(false);
                setMobileMenuOpen((v) => !v);
              }}
              className={`md:hidden p-2.5 rounded-xl transition-colors cursor-pointer ${
                useLightSurface
                  ? 'text-zinc-900 hover:bg-zinc-100'
                  : 'text-white hover:bg-white/15'
              }`}
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Clean High-Contrast Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
              aria-label="Mobile Navigation"
              className="md:hidden border-t border-zinc-200 bg-white text-zinc-950 px-4 py-4 space-y-1 shadow-xl"
            >
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={item.path}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.id);
                  }}
                  className={`block py-2.5 px-3.5 text-sm font-semibold rounded-xl transition-colors ${
                    activeTab === item.id && !isLightTopPage
                      ? 'bg-zinc-950 text-white font-bold'
                      : 'text-zinc-800 hover:bg-zinc-100 hover:text-zinc-950'
                  }`}
                >
                  {item.label}
                </a>
              ))}
              <a
                href="/contact"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('contact');
                }}
                className={`block py-2.5 px-3.5 text-sm font-semibold rounded-xl transition-colors ${
                  activeTab === 'contact' && !isLightTopPage
                    ? 'bg-zinc-950 text-white font-bold'
                    : 'text-zinc-800 hover:bg-zinc-100 hover:text-zinc-950'
                }`}
              >
                Contact Us
              </a>

              {isPricingView && onCurrencyChange && (
                <div className="pt-3 pb-1 px-3 flex items-center justify-between border-t border-zinc-200 mt-2">
                  <span className="text-xs font-bold text-zinc-700">
                    Pricing Currency
                  </span>
                  <div className="inline-flex items-center p-1 bg-zinc-100 rounded-full border border-zinc-200">
                    <button
                      type="button"
                      onClick={() => onCurrencyChange('INR')}
                      className={`px-3 py-1 rounded-full text-xs font-bold transition-colors cursor-pointer ${
                        currency === 'INR'
                          ? 'bg-zinc-950 text-white'
                          : 'text-zinc-700 hover:text-zinc-950'
                      }`}
                    >
                      <span className="currency-symbol">₹</span> INR
                    </button>
                    <button
                      type="button"
                      onClick={() => onCurrencyChange('USD')}
                      className={`px-3 py-1 rounded-full text-xs font-bold transition-colors cursor-pointer ${
                        currency === 'USD'
                          ? 'bg-zinc-950 text-white'
                          : 'text-zinc-700 hover:text-zinc-950'
                      }`}
                    >
                      <span className="currency-symbol">$</span> USD
                    </button>
                  </div>
                </div>
              )}
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      {/* Modern Click-Activated Command-Style Services Explorer Overlay */}
      <AnimatePresence>
        {servicesDrawerOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.16 }}
            onClick={() => setServicesDrawerOpen(false)}
            className="fixed inset-0 z-50 bg-zinc-950/50 backdrop-blur-sm flex items-start justify-center pt-[84px] px-4 pb-6"
          >
            <motion.div
              id="kexora-services-explorer"
              role="dialog"
              aria-modal="true"
              aria-label="Kexora Services Explorer"
              initial={{ opacity: 0, y: -10, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.985 }}
              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-4xl rounded-2xl bg-white text-zinc-950 border border-zinc-200 shadow-2xl overflow-hidden"
            >
              {/* Command Search Header */}
              <div className="px-5 py-4 border-b border-zinc-200 flex items-center gap-3 bg-zinc-50/70">
                <Search className="w-4 h-4 text-zinc-500 shrink-0" aria-hidden="true" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={serviceSearch}
                  onChange={(e) => setServiceSearch(e.target.value)}
                  placeholder="Search all 24 Kexora services (e.g. E-Commerce, App, Game, AI-SEO, GST)..."
                  className="w-full bg-transparent text-sm text-zinc-950 placeholder-zinc-400 focus:outline-none"
                />
                {serviceSearch && (
                  <button
                    type="button"
                    onClick={() => setServiceSearch('')}
                    className="text-xs font-semibold text-zinc-500 hover:text-zinc-950 whitespace-nowrap cursor-pointer"
                  >
                    Clear
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setServicesDrawerOpen(false)}
                  aria-label="Close services explorer"
                  className="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-950 hover:bg-zinc-200/70 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Split Explorer Body: Pillar Rail + Interactive Service Cards */}
              <div className="grid grid-cols-1 md:grid-cols-12 min-h-[310px] max-h-[65vh] overflow-y-auto">
                {/* Left Pillar Tabs */}
                <div className="md:col-span-4 border-b md:border-b-0 md:border-r border-zinc-200 p-3 bg-zinc-50/50 space-y-1">
                  <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-zinc-500">
                    Service Pillars
                  </div>
                  {KEXORA_SERVICE_PILLARS.map((pillar, idx) => {
                    const isSelected = !normalizedQuery && selectedPillarIdx === idx;
                    return (
                      <button
                        key={pillar.category}
                        type="button"
                        onClick={() => {
                          setServiceSearch('');
                          setSelectedPillarIdx(idx);
                        }}
                        className={`w-full text-left px-3.5 py-3 rounded-xl transition-colors flex items-center justify-between gap-2 cursor-pointer ${
                          isSelected
                            ? 'bg-zinc-950 text-white font-bold'
                            : 'text-zinc-700 hover:bg-zinc-200/60 hover:text-zinc-950 font-medium'
                        }`}
                      >
                        <span className="text-xs sm:text-sm truncate">
                          {pillar.category}
                        </span>
                        <span
                          className={`text-[11px] font-mono tabular-nums shrink-0 ${
                            isSelected ? 'text-zinc-300' : 'text-zinc-400'
                          }`}
                        >
                          {pillar.items.length}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Right Service Cards Grid */}
                <div className="md:col-span-8 p-5 space-y-3">
                  <div className="flex items-center justify-between text-xs text-zinc-500">
                    <span className="font-semibold text-zinc-950">
                      {normalizedQuery
                        ? `Matching services (${displayedServices.length})`
                        : KEXORA_SERVICE_PILLARS[selectedPillarIdx]?.category}
                    </span>
                    <span>Click any service to request a quote</span>
                  </div>

                  {displayedServices.length === 0 ? (
                    <div className="py-12 text-center space-y-2">
                      <Layers className="w-6 h-6 text-zinc-300 mx-auto" />
                      <p className="text-sm font-semibold text-zinc-800">
                        No matching service found
                      </p>
                      <p className="text-xs text-zinc-500">
                        Try another keyword or browse the 4 pillars on the left.
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {displayedServices.map(({ item, category }) => (
                        <a
                          key={`${category}-${item}`}
                          href="/contact"
                          onClick={(e) => {
                            e.preventDefault();
                            handleSubServiceEnquire(item);
                          }}
                          className="group p-3.5 rounded-xl bg-white border border-zinc-200 hover:border-zinc-950 hover:bg-zinc-50 transition-colors flex items-center justify-between gap-3"
                        >
                          <div className="min-w-0">
                            <div className="text-xs sm:text-[13px] font-bold text-zinc-950 leading-snug">
                              {item}
                            </div>
                            {normalizedQuery && (
                              <div className="text-[11px] text-zinc-500 mt-0.5 truncate">
                                {category}
                              </div>
                            )}
                          </div>
                          <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-zinc-950 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Clean Footer Strip */}
              <div className="px-5 py-3.5 border-t border-zinc-200 bg-zinc-50 flex flex-wrap items-center justify-between gap-3 text-xs">
                <a
                  href="/pricing"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick('pricing');
                  }}
                  className="font-semibold text-zinc-700 hover:text-zinc-950 transition-colors"
                >
                  Compare 3-Tier INR &amp; USD Pricing →
                </a>
                <a
                  href="/services"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick('services');
                  }}
                  className="font-bold text-zinc-950 hover:opacity-75 inline-flex items-center gap-1.5 transition-opacity"
                >
                  <span>Open Full Services Page</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

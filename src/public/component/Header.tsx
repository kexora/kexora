import React, { useState, useEffect, useRef } from 'react';
import { ActiveTab, CurrencyCode } from '../../types';
import { KEXORA_SERVICE_PILLARS } from '../../data/agencyData';
import { Menu, X, ChevronDown, ArrowUpRight, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  openContactModal: (serviceName?: string) => void;
  currency?: CurrencyCode;
  onCurrencyChange?: (currency: CurrencyCode) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  openContactModal,
  currency = 'INR',
  onCurrencyChange,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const closeDropdownTimeout = useRef<number | null>(null);

  useEffect(() => {
    let ticking = false;

    const updateScrollState = () => {
      const scrolled = window.scrollY > 16;
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
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (closeDropdownTimeout.current) {
        window.clearTimeout(closeDropdownTimeout.current);
      }
    };
  }, []);

  const openServicesMenu = () => {
    if (closeDropdownTimeout.current) {
      window.clearTimeout(closeDropdownTimeout.current);
      closeDropdownTimeout.current = null;
    }
    setServicesDropdownOpen(true);
  };

  const scheduleCloseServicesMenu = () => {
    if (closeDropdownTimeout.current) {
      window.clearTimeout(closeDropdownTimeout.current);
    }
    closeDropdownTimeout.current = window.setTimeout(() => {
      setServicesDropdownOpen(false);
    }, 110);
  };

  const navItems: {
    id: ActiveTab;
    label: string;
    path: string;
    hasDropdown?: boolean;
  }[] = [
    { id: 'home', label: 'Home', path: '/' },
    { id: 'services', label: 'Services', path: '/services', hasDropdown: true },
    { id: 'pricing', label: 'Pricing Plan', path: '/pricing' },
    { id: 'tools', label: 'Our Tools', path: '/our-tools' },
    { id: 'about', label: 'About Us', path: '/about-us' },
    { id: 'news', label: 'News', path: '/news' },
  ];

  const handleNavClick = (tab: ActiveTab) => {
    if (closeDropdownTimeout.current) {
      window.clearTimeout(closeDropdownTimeout.current);
    }
    setActiveTab(tab);
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
  };

  const handleSubServiceEnquire = (serviceName: string) => {
    if (closeDropdownTimeout.current) {
      window.clearTimeout(closeDropdownTimeout.current);
    }
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
    openContactModal(serviceName);
  };

  const useLightGlass = isScrolled || servicesDropdownOpen || mobileMenuOpen;

  // Hardware-accelerated glassmorphism transition curve
  const syncTransition =
    'transition-[background-color,border-color,color,transform,height,box-shadow,backdrop-filter,filter,opacity] duration-450 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-[transform,background-color,backdrop-filter]';

  return (
    <header
      onMouseLeave={scheduleCloseServicesMenu}
      className={`fixed top-0 left-0 right-0 z-50 select-none ${syncTransition} ${
        useLightGlass
          ? 'translate-y-0 bg-white/72 backdrop-blur-2xl backdrop-saturate-180 border-b border-zinc-200/75 text-zinc-950 shadow-[0_10px_35px_-10px_rgba(0,0,0,0.08),inset_0_1px_0_0_rgba(255,255,255,0.65)]'
          : 'translate-y-0 bg-black/22 backdrop-blur-xl backdrop-saturate-150 border-b border-white/[0.1] text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)]'
      }`}
    >
      <div
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-8 ${syncTransition} ${
          useLightGlass ? 'h-16' : 'h-[74px]'
        }`}
      >
        {/* Zone 1: Official Kexora Brand Wordmark rendered in src/assets/fonts/logos.ttf */}
        <a
          href="/"
          aria-label="Kexora Home"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('home');
          }}
          className={`kexora-logo-font inline-flex items-center shrink-0 whitespace-nowrap origin-left text-xl sm:text-2xl tracking-wider leading-none select-none ${syncTransition} ${
            useLightGlass
              ? 'text-zinc-950 scale-95 hover:opacity-75'
              : 'text-white scale-100 hover:opacity-85'
          }`}
        >
          Kexora
        </a>

        {/* Zone 2: Clean single-line text navigation links */}
        <nav
          aria-label="Primary Navigation"
          className="hidden md:flex items-center gap-7 text-sm font-medium"
        >
          {navItems.map((item) => {
            const isActive = activeTab === item.id;

            return (
              <div
                key={item.id}
                className="relative py-2"
                onMouseEnter={() => {
                  if (item.hasDropdown) {
                    openServicesMenu();
                  } else {
                    scheduleCloseServicesMenu();
                  }
                }}
              >
                <a
                  href={item.path}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.id);
                  }}
                  className={`relative whitespace-nowrap shrink-0 py-1 inline-flex items-center gap-1 ${syncTransition} ${
                    useLightGlass
                      ? isActive
                        ? 'text-zinc-950 font-bold'
                        : 'text-zinc-600 hover:text-zinc-950'
                      : isActive
                        ? 'text-white font-bold'
                        : 'text-zinc-200 hover:text-white'
                  }`}
                >
                  <span>{item.label}</span>
                  {item.hasDropdown && (
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                        servicesDropdownOpen ? 'rotate-180' : ''
                      }`}
                    />
                  )}
                  {isActive && (
                    <motion.span
                      layoutId="kexora-nav-underline"
                      transition={{
                        type: 'spring',
                        stiffness: 400,
                        damping: 32,
                      }}
                      className={`absolute left-0 right-0 -bottom-0.5 h-0.5 rounded-full ${syncTransition} ${
                        useLightGlass ? 'bg-zinc-950' : 'bg-white'
                      }`}
                    />
                  )}
                </a>
              </div>
            );
          })}
        </nav>

        {/* Zone 3: Actions & Currency Switcher on Pricing Page */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* USD / INR Currency Switch Button — Displayed specifically on Pricing Page */}
          {(activeTab === 'pricing' ||
            (typeof window !== 'undefined' &&
              window.location.pathname.includes('/pricing'))) &&
            onCurrencyChange && (
              <div
                role="group"
                aria-label="Select pricing currency"
                className={`inline-flex items-center p-0.5 sm:p-1 rounded-full border transition-all ${
                  useLightGlass
                    ? 'bg-zinc-100/90 border-zinc-300/80 text-zinc-950 shadow-xs'
                    : 'bg-white/10 border-white/20 text-white backdrop-blur-md'
                }`}
              >
                <button
                  type="button"
                  onClick={() => onCurrencyChange('INR')}
                  className={`px-2.5 sm:px-3 py-1 rounded-full text-xs font-bold transition-all duration-200 flex items-center gap-1 cursor-pointer ${
                    currency === 'INR'
                      ? useLightGlass
                        ? 'bg-zinc-950 text-white shadow-xs'
                        : 'bg-white text-zinc-950 shadow-xs'
                      : useLightGlass
                        ? 'text-zinc-600 hover:text-zinc-950'
                        : 'text-zinc-300 hover:text-white'
                  }`}
                >
                  <span className="currency-symbol text-[11px] font-bold">₹</span>
                  <span>INR</span>
                </button>
                <button
                  type="button"
                  onClick={() => onCurrencyChange('USD')}
                  className={`px-2.5 sm:px-3 py-1 rounded-full text-xs font-bold transition-all duration-200 flex items-center gap-1 cursor-pointer ${
                    currency === 'USD'
                      ? useLightGlass
                        ? 'bg-zinc-950 text-white shadow-xs'
                        : 'bg-white text-zinc-950 shadow-xs'
                      : useLightGlass
                        ? 'text-zinc-600 hover:text-zinc-950'
                        : 'text-zinc-300 hover:text-white'
                  }`}
                >
                  <span className="currency-symbol text-[11px] font-bold">$</span>
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
            className={`group px-4 sm:px-5 py-2 sm:py-2.5 text-xs font-bold rounded-full whitespace-nowrap shrink-0 inline-flex items-center justify-center gap-1.5 ${syncTransition} ${
              useLightGlass
                ? 'bg-zinc-950 text-white hover:bg-zinc-800 shadow-xs scale-95'
                : 'bg-white text-zinc-950 hover:bg-zinc-100 shadow-md scale-100'
            }`}
          >
            <span>Contact Us</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>

          <button
            type="button"
            aria-label={
              mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'
            }
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden p-2 rounded-xl ${syncTransition} ${
              useLightGlass
                ? 'text-zinc-800 hover:text-zinc-950 hover:bg-zinc-950/[0.06]'
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

      {/* Desktop Services Frosted Glass Mega-Menu Dropdown */}
      <AnimatePresence>
        {servicesDropdownOpen && (
          <motion.div
            onMouseEnter={openServicesMenu}
            onMouseLeave={scheduleCloseServicesMenu}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="hidden md:block border-t border-zinc-200/75 bg-white/82 backdrop-blur-2xl backdrop-saturate-180 text-zinc-950 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.14)]"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-7 space-y-6">
              <div className="grid grid-cols-4 gap-8">
                {KEXORA_SERVICE_PILLARS.map((pillar) => (
                  <div key={pillar.category} className="space-y-3">
                    <div className="text-xs font-extrabold uppercase tracking-wider text-zinc-950 pb-2 border-b border-zinc-200/90 font-[Outfit]">
                      {pillar.category}
                    </div>
                    <ul className="space-y-2 text-xs text-zinc-600">
                      {pillar.items.map((subItem) => (
                        <li key={subItem}>
                          <a
                            href="/contact"
                            onClick={(e) => {
                              e.preventDefault();
                              handleSubServiceEnquire(subItem);
                            }}
                            className="group flex items-center justify-between gap-2 py-0.5 text-left hover:text-zinc-950 transition-colors"
                          >
                            <span className="group-hover:underline underline-offset-4">
                              {subItem}
                            </span>
                            <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-150 shrink-0 text-zinc-950" />
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Bottom Mega-Menu Quick Action Bar */}
              <div className="pt-4 border-t border-zinc-200/80 flex items-center justify-between text-xs">
                <span className="text-zinc-500">
                  Click any service above to auto-fill your project enquiry, or view our full engineering breakdown.
                </span>
                <a
                  href="/services"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick('services');
                  }}
                  className="font-bold text-zinc-950 hover:opacity-75 inline-flex items-center gap-1.5 transition-opacity"
                >
                  <span>Explore Complete Services Page</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Smooth Frosted Glass Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            aria-label="Mobile Navigation"
            className="md:hidden border-t border-zinc-200/80 bg-white/86 backdrop-blur-2xl backdrop-saturate-180 text-zinc-950 px-4 py-4 space-y-1.5 shadow-2xl"
          >
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.path}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.id);
                }}
                className={`block py-2.5 px-3.5 text-sm font-medium rounded-xl transition-colors duration-150 ${
                  activeTab === item.id
                    ? 'bg-zinc-950 text-white font-bold shadow-xs'
                    : 'text-zinc-700 hover:bg-zinc-950/[0.06] hover:text-zinc-950'
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
              className={`block py-2.5 px-3.5 text-sm font-medium rounded-xl transition-colors duration-150 ${
                activeTab === 'contact'
                  ? 'bg-zinc-950 text-white font-bold shadow-xs'
                  : 'text-zinc-700 hover:bg-zinc-950/[0.06] hover:text-zinc-950'
              }`}
            >
              Contact Us
            </a>

            {/* Mobile Pricing Currency Selector */}
            {(activeTab === 'pricing' ||
              (typeof window !== 'undefined' &&
                window.location.pathname.includes('/pricing'))) &&
              onCurrencyChange && (
                <div className="pt-3 pb-1 px-3 flex items-center justify-between border-t border-zinc-200/80 mt-2">
                  <span className="text-xs font-bold text-zinc-600">
                    Pricing Currency:
                  </span>
                  <div className="inline-flex items-center p-1 bg-zinc-100 rounded-full border border-zinc-200">
                    <button
                      type="button"
                      onClick={() => onCurrencyChange('INR')}
                      className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                        currency === 'INR'
                          ? 'bg-zinc-950 text-white shadow-xs'
                          : 'text-zinc-600 hover:text-zinc-950'
                      }`}
                    >
                      <span className="currency-symbol">₹</span> INR
                    </button>
                    <button
                      type="button"
                      onClick={() => onCurrencyChange('USD')}
                      className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                        currency === 'USD'
                          ? 'bg-zinc-950 text-white shadow-xs'
                          : 'text-zinc-600 hover:text-zinc-950'
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
  );
};

import React, { useState, useEffect } from 'react';
import { ActiveTab } from '../../types';
import { KEXORA_SERVICE_PILLARS } from '../../data/agencyData';
import { Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ProtectedImage, KEXORA_MEDIA_VAULT } from './ProtectedImage';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  openContactModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  openContactModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;

    const updateScrollState = () => {
      const scrolled = window.scrollY > 20;
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
    setActiveTab(tab);
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
  };

  // Unified luxury easing curve so position, height, background, and text colors stay 100% in sync
  const syncTransition =
    'transition-[background-color,border-color,color,transform,height,box-shadow,backdrop-filter,filter,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-[transform,background-color,color,filter]';

  return (
    <header
      onMouseLeave={() => setServicesDropdownOpen(false)}
      className={`fixed top-0 left-0 right-0 z-50 ${syncTransition} ${
        isScrolled || servicesDropdownOpen
          ? 'translate-y-0 bg-white/95 backdrop-blur-xl border-b border-zinc-200/90 text-zinc-950 shadow-[0_8px_30px_rgb(0,0,0,0.06)]'
          : 'translate-y-2 bg-white/0 backdrop-blur-none border-b border-transparent text-white shadow-none'
      }`}
    >
      <div
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-8 ${syncTransition} ${
          isScrolled || servicesDropdownOpen ? 'h-16' : 'h-20'
        }`}
      >
        {/* Zone 1: Official Kexora Logo (Protected Media Vault) */}
        <a
          href="/"
          aria-label="Kexora Home"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('home');
          }}
          className={`inline-flex items-center shrink-0 origin-left ${syncTransition} ${
            isScrolled || servicesDropdownOpen
              ? 'scale-95 hover:opacity-75'
              : 'scale-100 hover:opacity-85'
          }`}
        >
          <ProtectedImage
            src={KEXORA_MEDIA_VAULT.LOGO}
            alt="Kexora Official Logo"
            className={`h-5 sm:h-6 w-auto select-none ${syncTransition} ${
              isScrolled || servicesDropdownOpen
                ? 'brightness-0 invert-0'
                : 'brightness-0 invert'
            }`}
          />
        </a>

        {/* Zone 2: Clean single-line text navigation links with real pathname hrefs */}
        <nav
          aria-label="Primary Navigation"
          className="hidden md:flex items-center gap-7 text-sm font-medium"
        >
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            const useDarkText = isScrolled || servicesDropdownOpen;

            return (
              <div
                key={item.id}
                className="relative"
                onMouseEnter={() => {
                  if (item.hasDropdown) setServicesDropdownOpen(true);
                }}
              >
                <a
                  href={item.path}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.id);
                  }}
                  className={`relative whitespace-nowrap shrink-0 py-1.5 inline-flex items-center gap-1 ${syncTransition} ${
                    useDarkText
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
                      className={`w-3.5 h-3.5 transition-transform duration-300 ${
                        servicesDropdownOpen ? 'rotate-180' : ''
                      }`}
                    />
                  )}
                  {isActive && (
                    <motion.span
                      layoutId="kexora-nav-underline"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      className={`absolute left-0 right-0 bottom-0 h-0.5 rounded-full ${syncTransition} ${
                        useDarkText ? 'bg-zinc-950' : 'bg-white'
                      }`}
                    />
                  )}
                </a>
              </div>
            );
          })}
        </nav>

        {/* Zone 3: 1 primary action -> Dedicated /contact Page */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="/contact"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('contact');
            }}
            className={`px-5 py-2.5 text-xs font-bold rounded-full whitespace-nowrap shrink-0 inline-flex items-center justify-center ${syncTransition} ${
              isScrolled || servicesDropdownOpen
                ? 'bg-zinc-950 text-white hover:bg-zinc-800 shadow-sm scale-95'
                : 'bg-white text-zinc-950 hover:bg-zinc-200 shadow-lg scale-100'
            }`}
          >
            Contact Us
          </a>

          <button
            type="button"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden p-2 rounded-lg ${syncTransition} ${
              isScrolled || servicesDropdownOpen
                ? 'text-zinc-700 hover:text-zinc-950 hover:bg-zinc-100'
                : 'text-white hover:bg-white/10'
            }`}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Desktop Services Mega-Menu Dropdown */}
      <AnimatePresence>
        {servicesDropdownOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="hidden md:block border-t border-zinc-200 bg-white/98 backdrop-blur-xl text-zinc-950 shadow-2xl"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="grid grid-cols-4 gap-8">
                {KEXORA_SERVICE_PILLARS.map((pillar) => (
                  <div key={pillar.category} className="space-y-3">
                    <div className="text-sm font-bold text-zinc-950 pb-2 border-b border-zinc-950 font-[Outfit]">
                      {pillar.category}
                    </div>
                    <ul className="space-y-2 text-xs text-zinc-600">
                      {pillar.items.map((subItem) => (
                        <li key={subItem}>
                          <a
                            href="/services"
                            onClick={(e) => {
                              e.preventDefault();
                              handleNavClick('services');
                            }}
                            className="block text-left hover:text-zinc-950 hover:underline transition-colors"
                          >
                            {subItem}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Smooth Animated Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            aria-label="Mobile Navigation"
            className="md:hidden border-b border-zinc-200 bg-white/98 backdrop-blur-xl text-zinc-950 px-4 py-4 space-y-1.5 shadow-xl"
          >
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.path}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.id);
                }}
                className={`block py-2.5 px-3 text-sm font-medium rounded-lg transition-colors duration-200 ${
                  activeTab === item.id
                    ? 'bg-zinc-950 text-white font-bold'
                    : 'text-zinc-700 hover:bg-zinc-100'
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
              className={`block py-2.5 px-3 text-sm font-medium rounded-lg transition-colors duration-200 ${
                activeTab === 'contact'
                  ? 'bg-zinc-950 text-white font-bold'
                  : 'text-zinc-700 hover:bg-zinc-100'
              }`}
            >
              Contact Us
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

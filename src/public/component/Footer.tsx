import React from 'react';
import { ActiveTab } from '../../types';
import { KEXORA_COMPANY_INFO } from '../../data/agencyData';
import { Mail, MapPin, ArrowUpRight } from 'lucide-react';
import { ProtectedImage, KEXORA_MEDIA_VAULT } from './ProtectedImage';

interface FooterProps {
  setActiveTab: (tab: ActiveTab) => void;
  openContactModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  setActiveTab,
  openContactModal,
}) => {
  const footerLinks: { id: ActiveTab; label: string; path: string }[] = [
    { id: 'home', label: 'Home Page (/)', path: '/' },
    { id: 'services', label: 'Services Page (/services)', path: '/services' },
    { id: 'pricing', label: 'Pricing Plan Page (/pricing)', path: '/pricing' },
    { id: 'tools', label: 'Our Tools Page (/our-tools)', path: '/our-tools' },
    { id: 'about', label: 'About Us Page (/about-us)', path: '/about-us' },
    { id: 'news', label: 'News Page (/news)', path: '/news' },
    { id: 'contact', label: 'Contact Us Page (/contact)', path: '/contact' },
  ];

  return (
    <footer className="bg-zinc-950 text-zinc-400 text-xs border-t border-zinc-900 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
          {/* Brand & Location */}
          <div className="md:col-span-5 space-y-4">
            <a
              href="/"
              aria-label="Kexora Home"
              onClick={(e) => {
                e.preventDefault();
                setActiveTab('home');
              }}
              className="inline-flex items-center hover:opacity-85 transition-opacity"
            >
              <ProtectedImage
                src={KEXORA_MEDIA_VAULT.LOGO}
                alt="Kexora Official Logo"
                className="h-6 w-auto brightness-0 invert select-none"
              />
            </a>
            <p className="text-xs text-zinc-400 leading-relaxed max-w-sm">
              {KEXORA_COMPANY_INFO.legalName}. Led by {KEXORA_COMPANY_INFO.founder.name} ({KEXORA_COMPANY_INFO.founder.role}). Building fast custom websites, mobile apps, games, e-commerce stores, and Google SEO.
            </p>
            <div className="space-y-1.5 text-zinc-300 pt-1">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-white shrink-0" />
                <span>
                  {KEXORA_COMPANY_INFO.headquarters.city}, {KEXORA_COMPANY_INFO.headquarters.state} {KEXORA_COMPANY_INFO.headquarters.postalCode}, {KEXORA_COMPANY_INFO.headquarters.country} · Global Delivery
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-white shrink-0" />
                <a
                  href={`mailto:${KEXORA_COMPANY_INFO.contact.email}`}
                  className="hover:text-white transition-colors font-semibold"
                >
                  {KEXORA_COMPANY_INFO.contact.email}
                </a>
              </div>
            </div>
          </div>

          {/* Dedicated Public Pages Navigation */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-xs font-bold text-white">
              Website Pages
            </div>
            <ul className="space-y-2">
              {footerLinks.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.path}
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveTab(item.id);
                    }}
                    className="hover:text-white transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Direct Action */}
          <div className="md:col-span-4 space-y-4">
            <div className="text-xs font-bold text-white">
              Start Your Project With Kexora
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              {KEXORA_COMPANY_INFO.contact.supportHours}. Get a clear project plan and pricing quote for your business.
            </p>
            <a
              href="/contact"
              onClick={(e) => {
                e.preventDefault();
                setActiveTab('contact');
              }}
              className="px-6 py-3 text-xs font-bold text-zinc-950 bg-white hover:bg-zinc-200 rounded-full transition-colors inline-flex items-center gap-1.5 whitespace-nowrap shrink-0"
            >
              <span>Request Project Proposal</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Quiet Copyright Bar */}
        <div className="pt-8 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <div>
            © {new Date().getFullYear()} Kexora (kexora.org). All rights reserved.
          </div>
          <div>
            Custom Web Design · App & Game Development · Google SEO
          </div>
        </div>
      </div>
    </footer>
  );
};

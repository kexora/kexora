import React, { useState, useEffect } from 'react';
import { ActiveTab, ToolTab } from './types';
import { Header } from './public/component/Header';
import { Footer } from './public/component/Footer';
import { ContactModal } from './public/component/ContactModal';
import { HomePage } from './public/page/HomePage';
import { ServicesPage } from './public/page/ServicesPage';
import { PricingPage } from './public/page/PricingPage';
import { OurToolsPage } from './public/page/OurToolsPage';
import { AboutUsPage } from './public/page/AboutUsPage';
import { NewsPage } from './public/page/NewsPage';
import { ContactPage } from './public/page/ContactPage';

export const TAB_TO_PATH: Record<ActiveTab, string> = {
  home: '/',
  services: '/services',
  pricing: '/pricing',
  tools: '/our-tools',
  about: '/about-us',
  news: '/news',
  contact: '/contact',
};

export function getTabFromPathname(pathname: string): ActiveTab {
  const clean = pathname.toLowerCase().replace(/\/+$/, '') || '/';
  switch (clean) {
    case '/':
    case '/home':
      return 'home';
    case '/services':
    case '/service':
      return 'services';
    case '/pricing':
    case '/pricing-plan':
      return 'pricing';
    case '/our-tools':
    case '/tools':
      return 'tools';
    case '/about-us':
    case '/about':
      return 'about';
    case '/news':
      return 'news';
    case '/contact':
    case '/contact-us':
      return 'contact';
    default:
      return 'home';
  }
}

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>(() =>
    typeof window !== 'undefined'
      ? getTabFromPathname(window.location.pathname)
      : 'home'
  );
  const [toolTab, setToolTab] = useState<ToolTab>('whatsapp-reader');
  const [isContactOpen, setIsContactOpen] = useState<boolean>(false);
  const [modalDetails, setModalDetails] = useState<string>('');
  const [modalService, setModalService] = useState<string>(
    'Web Design & Custom Code'
  );

  // Listen to browser Back / Forward navigation (popstate)
  useEffect(() => {
    const handlePopState = () => {
      const tab = getTabFromPathname(window.location.pathname);
      setActiveTab(tab);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Global Image Protection: block right-click context menu & drag on any image/svg
  useEffect(() => {
    const blockMediaAction = (e: Event) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      if (
        target.tagName === 'IMG' ||
        target.tagName === 'SVG' ||
        target.closest('svg') ||
        target.closest('[data-protected-media="true"]')
      ) {
        e.preventDefault();
      }
    };
    document.addEventListener('contextmenu', blockMediaAction);
    document.addEventListener('dragstart', blockMediaAction);
    return () => {
      document.removeEventListener('contextmenu', blockMediaAction);
      document.removeEventListener('dragstart', blockMediaAction);
    };
  }, []);

  // Sync page title, canonical URL & scroll position when switching public pages
  useEffect(() => {
    const pageTitles: Record<ActiveTab, string> = {
      home: 'Kexora — Web Design & Development Agency',
      services: 'Services (Web, App, Game & SEO) — Kexora',
      pricing: 'Pricing Plans (Beginner, Creative & Expert) — Kexora',
      tools: 'Our Tools (WhatsApp Reader & SEO Audit) — Kexora',
      about: 'About Us & Leadership (Rajan Singh) — Kexora',
      news: 'News & Digital Engineering Updates — Kexora',
      contact: 'Contact Us — Kexora Web Design & Development',
    };
    document.title = pageTitles[activeTab] || pageTitles.home;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  const handleNavChange = (tab: ActiveTab) => {
    const targetPath = TAB_TO_PATH[tab] || '/';
    if (
      typeof window !== 'undefined' &&
      window.location.pathname !== targetPath
    ) {
      window.history.pushState({ tab }, '', targetPath);
    }
    setActiveTab(tab);
  };

  const openContactModal = (serviceName?: string, details?: string) => {
    setModalService(serviceName || 'Web Design & Custom Development');
    setModalDetails(details || '');
    handleNavChange('contact');
  };

  const openToolsWithTab = (tabName: ToolTab) => {
    setToolTab(tabName);
    const targetPath = TAB_TO_PATH.tools;
    if (
      typeof window !== 'undefined' &&
      window.location.pathname !== targetPath
    ) {
      window.history.pushState({ tab: 'tools', toolTab: tabName }, '', targetPath);
    }
    setActiveTab('tools');
  };

  return (
    <div className="min-h-screen bg-white text-zinc-950 flex flex-col font-[Plus_Jakarta_Sans] selection:bg-zinc-950 selection:text-white">
      {/* Public Header Component */}
      <Header
        activeTab={activeTab}
        setActiveTab={handleNavChange}
        openContactModal={() => openContactModal()}
      />

      {/* Active Public Page View */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <HomePage
            openContactModal={openContactModal}
            onNavigatePage={handleNavChange}
            openToolsWithTab={openToolsWithTab}
          />
        )}

        {activeTab === 'services' && (
          <ServicesPage
            openContactModal={openContactModal}
            onNavigatePage={handleNavChange}
            openToolsWithTab={openToolsWithTab}
          />
        )}

        {activeTab === 'pricing' && (
          <PricingPage
            openContactModal={openContactModal}
            onNavigatePage={handleNavChange}
          />
        )}

        {activeTab === 'tools' && (
          <OurToolsPage
            initialToolTab={toolTab}
            openContactModal={openContactModal}
            onNavigatePage={handleNavChange}
          />
        )}

        {activeTab === 'about' && (
          <AboutUsPage
            openContactModal={openContactModal}
            onNavigatePage={handleNavChange}
          />
        )}

        {activeTab === 'news' && (
          <NewsPage
            openContactModal={openContactModal}
            onNavigatePage={handleNavChange}
          />
        )}

        {activeTab === 'contact' && (
          <ContactPage
            initialService={modalService}
            initialDetails={modalDetails}
            onNavigatePage={handleNavChange}
          />
        )}
      </main>

      {/* Public Footer Component */}
      <Footer
        setActiveTab={handleNavChange}
        openContactModal={() => openContactModal()}
      />

      {/* Public Contact & Proposal Modal Component */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        initialDetails={modalDetails}
        initialService={modalService}
      />
    </div>
  );
}

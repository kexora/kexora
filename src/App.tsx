import React, { useState, useEffect } from 'react';
import { ActiveTab, ToolTab, CurrencyCode } from './types';
import { Header } from './public/component/Header';
import { Footer } from './public/component/Footer';
import { ContactModal } from './public/component/ContactModal';
import { HomePage } from './public/page/HomePage';
import { ServicesPage } from './public/page/ServicesPage';
import { PricingPage } from './public/page/PricingPage';
import { OurToolsPage } from './public/page/OurToolsPage';
import { ToolDetailPage } from './public/page/ToolDetailPage';
import { AboutUsPage } from './public/page/AboutUsPage';
import { NewsPage } from './public/page/NewsPage';
import { ContactPage } from './public/page/ContactPage';
import { getToolBySlug } from './data/toolsData';

export const TAB_TO_PATH: Record<ActiveTab, string> = {
  home: '/',
  services: '/services',
  pricing: '/pricing',
  tools: '/our-tools',
  about: '/about-us',
  news: '/news',
  contact: '/contact',
};

export function getTabAndSlugFromPathname(pathname: string): {
  tab: ActiveTab;
  toolSlug: string | null;
} {
  const clean = pathname.toLowerCase().replace(/\/+$/, '') || '/';

  if (clean.startsWith('/our-tools/') || clean.startsWith('/tools/')) {
    const slug = clean.replace(/^\/(?:our-tools|tools)\//, '').split('/')[0];
    return { tab: 'tools', toolSlug: slug || null };
  }

  if (clean === '/our-tools' || clean === '/tools') {
    return { tab: 'tools', toolSlug: null };
  }

  switch (clean) {
    case '/':
    case '/home':
      return { tab: 'home', toolSlug: null };
    case '/services':
    case '/service':
      return { tab: 'services', toolSlug: null };
    case '/pricing':
    case '/pricing-plan':
      return { tab: 'pricing', toolSlug: null };
    case '/about-us':
    case '/about':
      return { tab: 'about', toolSlug: null };
    case '/news':
      return { tab: 'news', toolSlug: null };
    case '/contact':
    case '/contact-us':
      return { tab: 'contact', toolSlug: null };
    default:
      return { tab: 'home', toolSlug: null };
  }
}

export function getTabFromPathname(pathname: string): ActiveTab {
  return getTabAndSlugFromPathname(pathname).tab;
}

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>(() =>
    typeof window !== 'undefined'
      ? getTabAndSlugFromPathname(window.location.pathname).tab
      : 'home'
  );
  const [activeToolSlug, setActiveToolSlug] = useState<string | null>(() =>
    typeof window !== 'undefined'
      ? getTabAndSlugFromPathname(window.location.pathname).toolSlug
      : null
  );
  const [toolTab, setToolTab] = useState<ToolTab>('whatsapp-reader');
  const [isContactOpen, setIsContactOpen] = useState<boolean>(false);
  const [modalDetails, setModalDetails] = useState<string>('');
  const [modalService, setModalService] = useState<string>(
    'Web Design & Custom Code'
  );
  const [currency, setCurrency] = useState<CurrencyCode>('INR');

  // Listen to browser Back / Forward navigation (popstate)
  useEffect(() => {
    const handlePopState = () => {
      const { tab, toolSlug } = getTabAndSlugFromPathname(window.location.pathname);
      setActiveTab(tab);
      setActiveToolSlug(toolSlug);
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

  // Live Font Watcher: Automatically reloads website, heading & logo fonts whenever system.otf, heading.otf, or logos.ttf changes
  useEffect(() => {
    let lastSystemVer = '';
    let lastHeadingVer = '';
    let lastLogosVer = '';
    let isMounted = true;

    const syncLiveFonts = async () => {
      try {
        const res = await fetch('/api/fonts/meta', { cache: 'no-store' });
        if (!res.ok || !isMounted) return;
        const data = await res.json();
        const sysVer = String(data.systemVersion || '');
        const headVer = String(data.headingVersion || '');
        const logVer = String(data.logosVersion || '');

        if (
          sysVer !== lastSystemVer ||
          headVer !== lastHeadingVer ||
          logVer !== lastLogosVer
        ) {
          lastSystemVer = sysVer;
          lastHeadingVer = headVer;
          lastLogosVer = logVer;

          const styleId = 'kexora-live-font-faces';
          let styleEl = document.getElementById(styleId) as HTMLStyleElement | null;
          if (!styleEl) {
            styleEl = document.createElement('style');
            styleEl.id = styleId;
            document.head.appendChild(styleEl);
          }

          const systemUrl = `/api/media/v_4e82b9d1?v=${encodeURIComponent(sysVer)}`;
          const headingUrl = `/api/media/v_7b93c8f2?v=${encodeURIComponent(headVer)}`;
          const logosUrl = `/api/media/v_1c67d4e5?v=${encodeURIComponent(logVer)}`;

          styleEl.textContent = `
            @font-face {
              font-family: 'KexoraSystem';
              src: url('${systemUrl}');
              font-weight: 100 900;
              font-style: normal;
              font-display: swap;
            }
            @font-face {
              font-family: 'Plus Jakarta Sans';
              src: url('${systemUrl}');
              font-weight: 100 900;
              font-style: normal;
              font-display: swap;
            }
            @font-face {
              font-family: 'KexoraHeading';
              src: url('${headingUrl}');
              font-weight: 100 900;
              font-style: normal;
              font-display: swap;
            }
            @font-face {
              font-family: 'Outfit';
              src: url('${headingUrl}');
              font-weight: 100 900;
              font-style: normal;
              font-display: swap;
            }
            @font-face {
              font-family: 'KexoraLogos';
              src: url('${logosUrl}');
              font-weight: 100 900;
              font-style: normal;
              font-display: swap;
            }
          `;

          if (typeof FontFace !== 'undefined' && document.fonts) {
            const sysFace = new FontFace('KexoraSystem', `url(${systemUrl})`, {
              weight: '100 900',
              style: 'normal',
            });
            const headFace = new FontFace('KexoraHeading', `url(${headingUrl})`, {
              weight: '100 900',
              style: 'normal',
            });
            const logoFace = new FontFace('KexoraLogos', `url(${logosUrl})`, {
              weight: '100 900',
              style: 'normal',
            });
            Promise.allSettled([
              sysFace.load(),
              headFace.load(),
              logoFace.load(),
            ]).then((results) => {
              if (!isMounted) return;
              results.forEach((r) => {
                if (r.status === 'fulfilled') {
                  document.fonts.add(r.value);
                }
              });
            });
          }
        }
      } catch {
        // Ignore transient network errors
      }
    };

    syncLiveFonts();
    const intervalId = window.setInterval(syncLiveFonts, 3000);
    window.addEventListener('focus', syncLiveFonts);
    return () => {
      isMounted = false;
      window.clearInterval(intervalId);
      window.removeEventListener('focus', syncLiveFonts);
    };
  }, []);

  // Sync page title, canonical URL & scroll position when switching public pages
  useEffect(() => {
    if (activeTab === 'tools' && activeToolSlug) {
      const tool = getToolBySlug(activeToolSlug);
      if (tool) {
        document.title = `${tool.shortTitle} — Kexora Browser Utilities`;
      } else {
        document.title = 'Our Tools — Kexora Browser Utilities';
      }
    } else {
      const pageTitles: Record<ActiveTab, string> = {
        home: 'Kexora — Web Design & Development Agency',
        services: 'Services (Web, App, Game & SEO) — Kexora',
        pricing: 'Pricing Plans (Beginner, Creative & Expert) — Kexora',
        tools: 'Our Tools (WhatsApp Reader, SEO Audit & Estimator) — Kexora',
        about: 'About Us & Leadership (Rajan Singh) — Kexora',
        news: 'News & Digital Engineering Updates — Kexora',
        contact: 'Contact Us — Kexora Web Design & Development',
      };
      document.title = pageTitles[activeTab] || pageTitles.home;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab, activeToolSlug]);

  const handleNavChange = (tab: ActiveTab) => {
    const targetPath = TAB_TO_PATH[tab] || '/';
    if (
      typeof window !== 'undefined' &&
      window.location.pathname !== targetPath
    ) {
      window.history.pushState({ tab, toolSlug: null }, '', targetPath);
    }
    setActiveTab(tab);
    setActiveToolSlug(null);
  };

  const navigateToTool = (slug: string) => {
    const targetPath = `/our-tools/${slug}`;
    if (
      typeof window !== 'undefined' &&
      window.location.pathname !== targetPath
    ) {
      window.history.pushState({ tab: 'tools', toolSlug: slug }, '', targetPath);
    }
    setActiveTab('tools');
    setActiveToolSlug(slug);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openContactModal = (serviceName?: string, details?: string) => {
    setModalService(serviceName || 'Web Design & Custom Development');
    setModalDetails(details || '');
    handleNavChange('contact');
  };

  const openToolsWithTab = (tabName: ToolTab) => {
    navigateToTool(tabName);
  };

  return (
    <div className="min-h-screen bg-white text-zinc-950 flex flex-col font-[Plus_Jakarta_Sans] selection:bg-zinc-950 selection:text-white">
      {/* Public Header Component with USD/INR Switch on Pricing Page */}
      <Header
        activeTab={activeTab}
        setActiveTab={handleNavChange}
        openContactModal={openContactModal}
        currency={currency}
        onCurrencyChange={setCurrency}
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
            onNavigateTool={navigateToTool}
            currency={currency}
            onCurrencyChange={setCurrency}
          />
        )}

        {activeTab === 'tools' &&
          (activeToolSlug ? (
            <ToolDetailPage
              slug={activeToolSlug}
              onNavigatePage={handleNavChange}
              onNavigateTool={navigateToTool}
              openContactModal={openContactModal}
            />
          ) : (
            <OurToolsPage
              onNavigatePage={handleNavChange}
              onNavigateTool={navigateToTool}
              openContactModal={openContactModal}
            />
          ))}

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
        openContactModal={openContactModal}
        openToolsWithTab={openToolsWithTab}
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

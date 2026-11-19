import React, { useState, useEffect } from 'react';
import { ActiveTab, ToolTab, CurrencyCode } from './types';
import {
  Header,
  Footer,
  ContactModal,
  ErrorStatePage,
} from './public/universal';
import { HomePage } from './public/home';
import { ServicesPage } from './public/services';
import { PricingPage } from './public/pricing';
import { OurToolsPage, ToolDetailPage } from './public/tools';
import { AboutUsPage } from './public/about';
import { NewsPage } from './public/news';
import { ContactPage } from './public/contact';
import {
  CANONICAL_ORIGIN,
  getRouteSeo,
  resolveRoute,
  type ErrorCode,
} from './data/seoRegistry';

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
  errorCode: ErrorCode | null;
  requestedPath: string;
} {
  const resolution = resolveRoute(pathname);
  if (resolution.status === 'ok') {
    return {
      tab: resolution.tab,
      toolSlug: resolution.toolSlug,
      errorCode: null,
      requestedPath: resolution.canonicalPath,
    };
  }
  return {
    tab: 'home',
    toolSlug: null,
    errorCode: resolution.errorCode,
    requestedPath: resolution.requestedPath,
  };
}

export function getTabFromPathname(pathname: string): ActiveTab {
  return getTabAndSlugFromPathname(pathname).tab;
}

function upsertMetaTag(
  selector: string,
  attrName: 'name' | 'property',
  attrValue: string,
  content: string
) {
  let el = document.querySelector(selector) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attrName, attrValue);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertCanonicalLink(href: string | null) {
  let el = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!href) {
    if (el) el.remove();
    return;
  }
  if (!el) {
    el = document.createElement('link');
    el.rel = 'canonical';
    document.head.appendChild(el);
  }
  el.href = href;
}

function upsertDynamicBreadcrumbSchema(
  breadcrumbs: { name: string; path: string }[] | null
) {
  const scriptId = 'kexora-dynamic-breadcrumb-ld';
  let el = document.getElementById(scriptId) as HTMLScriptElement | null;
  if (!breadcrumbs || breadcrumbs.length <= 1) {
    if (el) el.remove();
    return;
  }
  if (!el) {
    el = document.createElement('script');
    el.id = scriptId;
    el.type = 'application/ld+json';
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: crumb.name,
      item:
        crumb.path === '/'
          ? `${CANONICAL_ORIGIN}/`
          : `${CANONICAL_ORIGIN}${crumb.path}`,
    })),
  });
}

export default function App() {
  const initialRoute =
    typeof window !== 'undefined'
      ? getTabAndSlugFromPathname(window.location.pathname)
      : { tab: 'home' as ActiveTab, toolSlug: null, errorCode: null, requestedPath: '/' };

  const [activeTab, setActiveTab] = useState<ActiveTab>(initialRoute.tab);
  const [activeToolSlug, setActiveToolSlug] = useState<string | null>(
    initialRoute.toolSlug
  );
  const [routeErrorCode, setRouteErrorCode] = useState<ErrorCode | null>(
    initialRoute.errorCode
  );
  const [requestedPath, setRequestedPath] = useState<string>(
    initialRoute.requestedPath
  );
  const [isOffline, setIsOffline] = useState<boolean>(() =>
    typeof navigator !== 'undefined' ? !navigator.onLine : false
  );
  const [isContactOpen, setIsContactOpen] = useState<boolean>(false);
  const [modalDetails, setModalDetails] = useState<string>('');
  const [modalService, setModalService] = useState<string>(
    'Web Design & Custom Code'
  );
  const [currency, setCurrency] = useState<CurrencyCode>('INR');

  // Listen to browser Back / Forward navigation (popstate)
  useEffect(() => {
    const handlePopState = () => {
      const next = getTabAndSlugFromPathname(window.location.pathname);
      setActiveTab(next.tab);
      setActiveToolSlug(next.toolSlug);
      setRouteErrorCode(next.errorCode);
      setRequestedPath(next.requestedPath);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Listen to browser Offline / Online network status
  useEffect(() => {
    const handleOffline = () => setIsOffline(true);
    const handleOnline = () => setIsOffline(false);
    window.addEventListener('offline', handleOffline);
    window.addEventListener('online', handleOnline);
    return () => {
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('online', handleOnline);
    };
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

  // Dynamic Head Manager: Sync title, description, canonical URL, OpenGraph, robots (index vs noindex), and BreadcrumbList JSON-LD
  useEffect(() => {
    if (isOffline) {
      document.title = 'Offline — Connection Lost | Kexora';
      upsertMetaTag('meta[name="robots"]', 'name', 'robots', 'noindex, follow');
      upsertCanonicalLink(null);
      upsertDynamicBreadcrumbSchema(null);
      return;
    }

    if (routeErrorCode) {
      const errorTitles: Record<ErrorCode, string> = {
        404: '404 — Page Not Found | Kexora',
        403: '403 — Restricted Access | Kexora',
        500: '500 — Application Error | Kexora',
      };
      document.title = errorTitles[routeErrorCode];
      upsertMetaTag('meta[name="robots"]', 'name', 'robots', 'noindex, follow');
      upsertMetaTag('meta[name="googlebot"]', 'name', 'googlebot', 'noindex, follow');
      upsertCanonicalLink(null);
      upsertDynamicBreadcrumbSchema(null);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const seo = getRouteSeo(activeTab, activeToolSlug);
    const canonicalUrl =
      seo.path === '/' ? `${CANONICAL_ORIGIN}/` : `${CANONICAL_ORIGIN}${seo.path}`;

    document.title = seo.title;
    upsertMetaTag(
      'meta[name="robots"]',
      'name',
      'robots',
      'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
    );
    upsertMetaTag(
      'meta[name="googlebot"]',
      'name',
      'googlebot',
      'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
    );
    upsertMetaTag('meta[name="description"]', 'name', 'description', seo.description);
    upsertMetaTag('meta[property="og:type"]', 'property', 'og:type', seo.ogType);
    upsertMetaTag('meta[property="og:url"]', 'property', 'og:url', canonicalUrl);
    upsertMetaTag('meta[property="og:title"]', 'property', 'og:title', seo.title);
    upsertMetaTag(
      'meta[property="og:description"]',
      'property',
      'og:description',
      seo.description
    );
    upsertMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', seo.title);
    upsertMetaTag(
      'meta[name="twitter:description"]',
      'name',
      'twitter:description',
      seo.description
    );
    upsertCanonicalLink(canonicalUrl);
    upsertDynamicBreadcrumbSchema(seo.breadcrumbs);

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab, activeToolSlug, routeErrorCode, isOffline]);

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
    setRouteErrorCode(null);
    setRequestedPath(targetPath);
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
    setRouteErrorCode(null);
    setRequestedPath(targetPath);
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
      {/* Public Header Component with Adaptive Contrast & USD/INR Switch on Pricing Page */}
      <Header
        activeTab={activeTab}
        setActiveTab={handleNavChange}
        openContactModal={openContactModal}
        currency={currency}
        onCurrencyChange={setCurrency}
        isLightTopPage={Boolean(routeErrorCode || isOffline)}
      />

      {/* Active Public Page View or Error Suite */}
      <main className="flex-1">
        {isOffline ? (
          <ErrorStatePage
            kind="offline"
            onNavigatePage={handleNavChange}
            onNavigateTool={navigateToTool}
            onRetry={() => {
              if (typeof navigator !== 'undefined' && navigator.onLine) {
                setIsOffline(false);
              } else {
                window.location.reload();
              }
            }}
          />
        ) : routeErrorCode ? (
          <ErrorStatePage
            kind={routeErrorCode}
            requestedPath={requestedPath}
            onNavigatePage={handleNavChange}
            onNavigateTool={navigateToTool}
          />
        ) : (
          <>
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
          </>
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

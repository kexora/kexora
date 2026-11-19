import React, { useState } from 'react';
import type { ActiveTab } from '../../types';
import {
  SEO_ROUTES,
  getSuggestedRoutes,
  type ErrorCode,
} from '../../data/seoRegistry';
import {
  ArrowLeft,
  ArrowRight,
  Home,
  RefreshCw,
  ShieldAlert,
  WifiOff,
  AlertTriangle,
  Compass,
  Mail,
  ChevronDown,
} from 'lucide-react';

export type ErrorStateKind = ErrorCode | 'offline';

interface ErrorStatePageProps {
  kind: ErrorStateKind;
  requestedPath?: string;
  errorMessage?: string;
  errorReferenceId?: string;
  onNavigatePage?: (tab: ActiveTab) => void;
  onNavigateTool?: (slug: string) => void;
  onRetry?: () => void;
}

const ERROR_COPY: Record<
  ErrorStateKind,
  {
    codeLabel: string;
    categoryLabel: string;
    heading: string;
    summary: string;
    statusTone: string;
    statusLabel: string;
  }
> = {
  404: {
    codeLabel: '404',
    categoryLabel: 'Page Not Found',
    heading: 'The page you requested does not exist.',
    summary:
      'This URL may have been mistyped, moved, or removed. Use one of the close matches below or jump directly to any verified Kexora page.',
    statusTone: 'text-zinc-950',
    statusLabel: 'HTTP 404 · Excluded from search index',
  },
  403: {
    codeLabel: '403',
    categoryLabel: 'Restricted Access',
    heading: 'Direct access to this resource is restricted.',
    summary:
      'Kexora protects studio assets and private endpoints from direct browsing. If you believe you need access, reach out to our engineering desk.',
    statusTone: 'text-amber-700',
    statusLabel: 'HTTP 403 · Protected resource',
  },
  500: {
    codeLabel: '500',
    categoryLabel: 'Application Error',
    heading: 'Something unexpected interrupted this view.',
    summary:
      'An unexpected runtime error occurred while rendering the page. Reloading usually resolves the issue immediately, or you can return to the home page.',
    statusTone: 'text-rose-700',
    statusLabel: 'HTTP 500 · Runtime recovery active',
  },
  offline: {
    codeLabel: 'OFFLINE',
    categoryLabel: 'Connection Lost',
    heading: 'You appear to be offline right now.',
    summary:
      'Your device lost its internet connection. Check Wi-Fi or mobile data and retry — this view will recover automatically once connectivity returns.',
    statusTone: 'text-amber-700',
    statusLabel: 'Network Offline · Waiting for connection',
  },
};

export const ErrorStatePage: React.FC<ErrorStatePageProps> = ({
  kind,
  requestedPath,
  errorMessage,
  errorReferenceId,
  onNavigatePage,
  onNavigateTool,
  onRetry,
}) => {
  const [showTechDetails, setShowTechDetails] = useState(false);
  const copy = ERROR_COPY[kind];

  const suggestedRoutes =
    kind === 404 && requestedPath ? getSuggestedRoutes(requestedPath, 3) : [];
  const coreRoutes = SEO_ROUTES.filter((r) => !r.toolSlug);
  const toolRoutes = SEO_ROUTES.filter((r) => Boolean(r.toolSlug));

  const goHome = () => {
    if (onNavigatePage) {
      onNavigatePage('home');
    } else if (typeof window !== 'undefined') {
      window.location.href = '/';
    }
  };

  const goContact = () => {
    if (onNavigatePage) {
      onNavigatePage('contact');
    } else if (typeof window !== 'undefined') {
      window.location.href = '/contact';
    }
  };

  const goRoute = (tab: ActiveTab, toolSlug?: string) => {
    if (toolSlug && onNavigateTool) {
      onNavigateTool(toolSlug);
      return;
    }
    if (onNavigatePage) {
      onNavigatePage(tab);
      return;
    }
    if (typeof window !== 'undefined') {
      window.location.href = toolSlug ? `/our-tools/${toolSlug}` : '/';
    }
  };

  const handleGoBack = () => {
    if (typeof window !== 'undefined' && window.history.length > 1) {
      window.history.back();
    } else {
      goHome();
    }
  };

  const renderIcon = () => {
    switch (kind) {
      case 404:
        return <Compass className="w-5 h-5 text-zinc-950" aria-hidden="true" />;
      case 403:
        return <ShieldAlert className="w-5 h-5 text-amber-700" aria-hidden="true" />;
      case 500:
        return <AlertTriangle className="w-5 h-5 text-rose-700" aria-hidden="true" />;
      case 'offline':
        return <WifiOff className="w-5 h-5 text-amber-700" aria-hidden="true" />;
    }
  };

  return (
    <section
      aria-labelledby="kexora-error-heading"
      className="min-h-[82vh] bg-white text-zinc-950 pt-28 pb-20 sm:pt-32 sm:pb-24 border-b border-zinc-200"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Primary Error Statement Surface */}
        <div className="rounded-3xl bg-zinc-50 border border-zinc-200 p-6 sm:p-10 lg:p-12 space-y-8">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-zinc-200">
            <div className="flex items-center gap-3 text-xs font-semibold text-zinc-600">
              {renderIcon()}
              <span className="font-mono font-bold tabular-nums text-zinc-950">
                {copy.codeLabel}
              </span>
              <span aria-hidden="true" className="text-zinc-300">
                /
              </span>
              <span>{copy.categoryLabel}</span>
            </div>

            <div className={`text-xs font-medium ${copy.statusTone}`}>
              {copy.statusLabel}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8 space-y-4">
              <h1
                id="kexora-error-heading"
                className="text-3xl sm:text-5xl font-extrabold tracking-tight text-zinc-950 font-[Outfit] leading-[1.12]"
                style={{ textWrap: 'balance' }}
              >
                {copy.heading}
              </h1>
              <p className="text-sm sm:text-base text-zinc-600 leading-relaxed max-w-2xl">
                {copy.summary}
              </p>

              {requestedPath && kind === 404 && (
                <div className="pt-2">
                  <div className="text-xs font-medium text-zinc-500 mb-1.5">
                    Requested address
                  </div>
                  <div className="px-4 py-3 rounded-xl bg-white border border-zinc-200 font-mono text-xs sm:text-sm text-zinc-950 break-all">
                    https://kexora.in{requestedPath.startsWith('/') ? requestedPath : `/${requestedPath}`}
                  </div>
                </div>
              )}

              {kind === 500 && (errorReferenceId || errorMessage) && (
                <div className="pt-2 space-y-2">
                  <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-500">
                    {errorReferenceId && (
                      <span className="font-mono tabular-nums text-zinc-700">
                        Reference ID: {errorReferenceId}
                      </span>
                    )}
                    {errorMessage && (
                      <button
                        type="button"
                        onClick={() => setShowTechDetails((v) => !v)}
                        className="inline-flex items-center gap-1 font-semibold text-zinc-950 hover:underline cursor-pointer"
                      >
                        <span>
                          {showTechDetails ? 'Hide technical details' : 'View technical details'}
                        </span>
                        <ChevronDown
                          className={`w-3.5 h-3.5 transition-transform duration-150 ${
                            showTechDetails ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                    )}
                  </div>
                  {showTechDetails && errorMessage && (
                    <pre className="p-4 rounded-xl bg-zinc-950 text-zinc-100 text-xs font-mono overflow-x-auto whitespace-pre-wrap">
                      {errorMessage}
                    </pre>
                  )}
                </div>
              )}
            </div>

            <div className="lg:col-span-4 lg:text-right">
              <div className="font-mono tabular-nums text-6xl sm:text-7xl font-extrabold tracking-tighter text-zinc-950 leading-none select-none">
                {copy.codeLabel}
              </div>
              <div className="text-xs text-zinc-500 mt-2">
                Kexora · kexora.in
              </div>
            </div>
          </div>

          {/* Primary Action Row */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            {(kind === 500 || kind === 'offline') && (
              <button
                type="button"
                onClick={() => {
                  if (onRetry) {
                    onRetry();
                  } else if (typeof window !== 'undefined') {
                    window.location.reload();
                  }
                }}
                className="px-6 py-3 rounded-full bg-zinc-950 hover:bg-zinc-800 text-white text-sm font-bold transition-colors inline-flex items-center gap-2 whitespace-nowrap cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
                <span>{kind === 'offline' ? 'Check Connection & Retry' : 'Reload Application'}</span>
              </button>
            )}

            <button
              type="button"
              onClick={goHome}
              className={`px-6 py-3 rounded-full text-sm font-bold transition-colors inline-flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                kind === 404 || kind === 403
                  ? 'bg-zinc-950 hover:bg-zinc-800 text-white'
                  : 'bg-white hover:bg-zinc-100 text-zinc-950 border border-zinc-300'
              }`}
            >
              <Home className="w-4 h-4" />
              <span>Return to Home</span>
            </button>

            <button
              type="button"
              onClick={handleGoBack}
              className="px-5 py-3 rounded-full bg-white hover:bg-zinc-100 text-zinc-950 border border-zinc-300 text-sm font-semibold transition-colors inline-flex items-center gap-2 whitespace-nowrap cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Go Back</span>
            </button>

            <button
              type="button"
              onClick={goContact}
              className="px-5 py-3 rounded-full bg-white hover:bg-zinc-100 text-zinc-700 hover:text-zinc-950 border border-zinc-200 text-sm font-semibold transition-colors inline-flex items-center gap-2 whitespace-nowrap cursor-pointer"
            >
              <Mail className="w-4 h-4" />
              <span>Contact Support</span>
            </button>
          </div>
        </div>

        {/* Smart Close-Match Suggestions for 404 Wrong Paths */}
        {kind === 404 && suggestedRoutes.length > 0 && (
          <div className="space-y-4">
            <div className="text-xs font-semibold text-zinc-500">
              Closest matching pages on Kexora
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {suggestedRoutes.map((route) => (
                <button
                  key={route.path}
                  type="button"
                  onClick={() => goRoute(route.tab, route.toolSlug)}
                  className="group text-left p-5 rounded-2xl bg-white border border-zinc-200 hover:border-zinc-950 transition-colors space-y-2 cursor-pointer"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-bold text-zinc-950 font-[Outfit]">
                      {route.label}
                    </span>
                    <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:text-zinc-950 group-hover:translate-x-0.5 transition-all shrink-0" />
                  </div>
                  <div className="text-xs font-mono text-zinc-500 truncate">
                    {route.path}
                  </div>
                  <p className="text-xs text-zinc-600 line-clamp-2 leading-relaxed">
                    {route.description}
                  </p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Complete Verified Site Directory for Zero Dead-Ends */}
        <div className="pt-4 border-t border-zinc-200 grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-7 space-y-3">
            <div className="text-xs font-semibold text-zinc-500">
              Primary Pages
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {coreRoutes.map((route) => (
                <a
                  key={route.path}
                  href={route.path}
                  onClick={(e) => {
                    e.preventDefault();
                    goRoute(route.tab);
                  }}
                  className="px-4 py-3 rounded-xl bg-white border border-zinc-200 hover:border-zinc-950 text-xs sm:text-sm font-semibold text-zinc-950 transition-colors flex items-center justify-between gap-2"
                >
                  <span className="truncate">{route.label}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                </a>
              ))}
            </div>
          </div>

          <div className="md:col-span-5 space-y-3">
            <div className="text-xs font-semibold text-zinc-500">
              Free Browser Tools
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {toolRoutes.map((route) => (
                <a
                  key={route.path}
                  href={route.path}
                  onClick={(e) => {
                    e.preventDefault();
                    goRoute(route.tab, route.toolSlug);
                  }}
                  className="px-4 py-3 rounded-xl bg-white border border-zinc-200 hover:border-zinc-950 text-xs font-semibold text-zinc-950 transition-colors flex items-center justify-between gap-2"
                >
                  <span className="truncate">{route.label}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

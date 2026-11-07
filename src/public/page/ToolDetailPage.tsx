import React, { useState, useEffect } from 'react';
import { ActiveTab } from '../../types';
import { KEXORA_TOOLS_CATALOG, getToolBySlug, ToolItem } from '../../data/toolsData';
import { WhatsAppReaderTool } from '../component/tools/WhatsAppReaderTool';
import { SeoAuditorTool } from '../component/tools/SeoAuditorTool';
import { CostEstimatorTool } from '../component/tools/CostEstimatorTool';
import { SchemaBuilderTool } from '../component/tools/SchemaBuilderTool';
import {
  ArrowLeft,
  Share2,
  Check,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  ExternalLink,
  MessageSquare,
  Gauge,
  Calculator,
  FileCode,
  Info,
  CheckCircle2,
  Lock,
} from 'lucide-react';

interface ToolDetailPageProps {
  slug: string;
  onNavigatePage: (page: ActiveTab) => void;
  onNavigateTool: (slug: string) => void;
  openContactModal: (serviceName?: string, details?: string) => void;
}

export const ToolDetailPage: React.FC<ToolDetailPageProps> = ({
  slug,
  onNavigatePage,
  onNavigateTool,
  openContactModal,
}) => {
  const [copiedShareLink, setCopiedShareLink] = useState(false);
  const tool = getToolBySlug(slug);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (tool) {
      document.title = `${tool.shortTitle} — Kexora Browser Utilities`;
    }
  }, [slug, tool]);

  if (!tool) {
    return (
      <div className="min-h-[70vh] bg-white flex items-center justify-center p-6 text-center text-zinc-950">
        <div className="max-w-md space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-zinc-100 flex items-center justify-center mx-auto text-zinc-950">
            <Info className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold font-[Outfit]">Utility Not Found</h1>
          <p className="text-xs text-zinc-600 leading-relaxed">
            The requested tool slug &ldquo;<span className="font-mono text-zinc-950 font-bold">{slug}</span>&rdquo; does not exist in Kexora&rsquo;s public directory.
          </p>
          <button
            type="button"
            onClick={() => onNavigatePage('tools')}
            className="px-5 py-2.5 bg-zinc-950 hover:bg-zinc-800 text-white rounded-full text-xs font-bold transition-all shadow-xs inline-flex items-center gap-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to All Tools</span>
          </button>
        </div>
      </div>
    );
  }

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopiedShareLink(true);
      setTimeout(() => setCopiedShareLink(false), 2000);
    }
  };

  const getToolIcon = (id: string) => {
    switch (id) {
      case 'whatsapp-reader':
        return <MessageSquare className="w-5 h-5 text-emerald-600" />;
      case 'seo-audit':
        return <Gauge className="w-5 h-5 text-blue-600" />;
      case 'cost-calculator':
        return <Calculator className="w-5 h-5 text-purple-600" />;
      case 'schema-generator':
        return <FileCode className="w-5 h-5 text-amber-600" />;
      default:
        return <Sparkles className="w-5 h-5 text-zinc-950" />;
    }
  };

  const otherTools = KEXORA_TOOLS_CATALOG.filter((t) => t.slug !== tool.slug);

  return (
    <div className="bg-white text-zinc-950 min-h-screen">
      {/* Editorial Header & Breadcrumb Strip */}
      <section className="pt-28 pb-12 sm:pb-16 bg-zinc-950 text-white border-b border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb Navigation */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8 text-xs text-zinc-400">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onNavigatePage('tools')}
                className="hover:text-white transition-colors flex items-center gap-1.5 font-semibold text-zinc-300"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>All Tools Directory</span>
              </button>
              <span className="text-zinc-600">/</span>
              <span className="text-zinc-400">{tool.category}</span>
              <span className="text-zinc-600">/</span>
              <span className="text-white font-bold">{tool.shortTitle}</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleShare}
                className="px-3.5 py-1.5 rounded-full bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 transition-colors flex items-center gap-1.5 text-xs font-semibold"
              >
                {copiedShareLink ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">URL Copied!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Share Tool</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Hero Title & Pitch */}
          <div className="max-w-4xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-zinc-200 border border-white/15 text-xs font-bold">
              {getToolIcon(tool.id)}
              <span>{tool.badge}</span>
            </div>

            <h1
              className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white font-[Outfit] leading-[1.12]"
              style={{ textWrap: 'balance' }}
            >
              {tool.title}
            </h1>

            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed max-w-3xl">
              {tool.fullDesc}
            </p>
          </div>

          {/* 4 Metric Chips */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-10 pt-8 border-t border-zinc-800/80">
            {tool.metrics.map((m, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-zinc-900/70 border border-zinc-800">
                <div className="text-xs text-zinc-400 uppercase tracking-wider font-semibold">
                  {m.label}
                </div>
                <div className="text-xl sm:text-2xl font-extrabold text-white font-[Outfit] mt-1 tabular-nums">
                  {m.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Interactive Tool Workstation */}
      <section className="py-12 sm:py-16 bg-zinc-100/70 border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-4 flex items-center justify-between">
            <div className="text-xs font-bold uppercase tracking-wider text-zinc-500 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Interactive Utility Console</span>
            </div>
            <span className="text-xs font-mono text-zinc-400">
              Direct Slug: /our-tools/{tool.slug}
            </span>
          </div>

          {/* Render Active Tool */}
          {tool.slug === 'whatsapp-reader' && <WhatsAppReaderTool />}
          {tool.slug === 'seo-audit' && (
            <SeoAuditorTool
              onEnquireUpgrade={(url) =>
                openContactModal(
                  'AI-SEO & 0.3s Speed Rebuild',
                  `Requested speed and AI-SEO overhaul for audited domain: ${url}`
                )
              }
            />
          )}
          {tool.slug === 'cost-calculator' && (
            <CostEstimatorTool
              onLockInEstimate={(details) =>
                openContactModal('Project Cost & Speed Estimate', details)
              }
            />
          )}
          {tool.slug === 'schema-generator' && <SchemaBuilderTool />}
        </div>
      </section>

      {/* Deep Dive Section: Step-by-Step How It Works & Specs */}
      <section className="py-20 bg-white border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {/* Step-by-Step Guide */}
          <div>
            <div className="max-w-2xl mb-10">
              <div className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2">
                Operational Walkthrough
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-950 font-[Outfit]">
                How to Use {tool.shortTitle}
              </h2>
              <p className="text-xs sm:text-sm text-zinc-600 mt-1">
                Engineered with zero learning curve. Follow these 4 practical steps to achieve immediate results.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {tool.howToUseSteps.map((stepItem) => (
                <div
                  key={stepItem.step}
                  className="p-6 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-3 relative group hover:border-zinc-300 transition-colors"
                >
                  <div className="text-2xl font-extrabold font-mono text-zinc-300 group-hover:text-zinc-950 transition-colors">
                    {stepItem.step}
                  </div>
                  <h3 className="text-base font-bold text-zinc-950 font-[Outfit]">
                    {stepItem.title}
                  </h3>
                  <p className="text-xs text-zinc-600 leading-relaxed">
                    {stepItem.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Specs & Privacy Guarantee Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Tech Specs */}
            <div className="lg:col-span-6 p-7 rounded-3xl bg-zinc-50 border border-zinc-200 space-y-5">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-900 pb-2 border-b border-zinc-200">
                <Info className="w-4 h-4 text-zinc-950" />
                <span>Technical Specifications</span>
              </div>

              <div className="space-y-3 text-xs">
                {tool.technicalSpecs.map((spec, i) => (
                  <div
                    key={i}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-xl bg-white border border-zinc-200 gap-1"
                  >
                    <span className="text-zinc-500 font-medium">{spec.label}</span>
                    <span className="font-mono text-zinc-950 font-bold">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Privacy & Confidentiality Guarantee */}
            <div className="lg:col-span-6 p-7 rounded-3xl bg-emerald-50/60 border border-emerald-200 space-y-5 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-900 pb-2 border-b border-emerald-200">
                  <Lock className="w-4 h-4 text-emerald-700" />
                  <span>Kexora Confidentiality &amp; Privacy Guarantee</span>
                </div>

                <p className="text-xs sm:text-[13px] text-emerald-950 leading-relaxed">
                  {tool.privacyGuarantee}
                </p>

                <div className="space-y-2 pt-2">
                  <div className="text-xs font-bold text-emerald-900">
                    Target User Workflows:
                  </div>
                  <ul className="space-y-1.5 text-xs text-emerald-900">
                    {tool.useCases.map((uc, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                        <span>{uc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <button
                type="button"
                onClick={() =>
                  openContactModal(
                    'Custom Micro-App / Utility Development',
                    `Inquiry inspired by ${tool.title}`
                  )
                }
                className="w-full mt-4 py-3 text-xs font-bold text-emerald-950 bg-white hover:bg-emerald-100 border border-emerald-300 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-xs"
              >
                <span>Request a Custom Internal Utility for Your Team</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Explore Other Kexora Utilities */}
      <section className="py-16 bg-zinc-50 border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-1">
                Engineering Suite
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-zinc-950 font-[Outfit]">
                Explore Other Free Utilities
              </h3>
            </div>

            <button
              type="button"
              onClick={() => onNavigatePage('tools')}
              className="text-xs font-bold text-zinc-950 hover:underline flex items-center gap-1"
            >
              <span>View All 4 Tools</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {otherTools.map((other) => (
              <div
                key={other.slug}
                onClick={() => onNavigateTool(other.slug)}
                className="p-6 rounded-2xl bg-white border border-zinc-200 hover:border-zinc-400 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-zinc-100 text-zinc-700">
                      {other.category}
                    </span>
                    {getToolIcon(other.id)}
                  </div>

                  <h4 className="text-base font-bold text-zinc-950 font-[Outfit] group-hover:text-zinc-800 transition-colors">
                    {other.shortTitle}
                  </h4>

                  <p className="text-xs text-zinc-600 line-clamp-2 leading-relaxed">
                    {other.shortDesc}
                  </p>
                </div>

                <div className="pt-3 border-t border-zinc-100 flex items-center justify-between text-xs font-bold text-zinc-950">
                  <span className="text-[11px] font-mono text-zinc-400">
                    /our-tools/{other.slug}
                  </span>
                  <span className="group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                    <span>Launch</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

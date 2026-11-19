import React, { useState, useEffect } from 'react';
import { ToolTab } from '../../types';
import { WhatsAppReaderTool } from './tools/WhatsAppReaderTool';
import { SeoAuditorTool } from './tools/SeoAuditorTool';
import { CostEstimatorTool } from './tools/CostEstimatorTool';
import { SchemaBuilderTool } from './tools/SchemaBuilderTool';
import { BlurKex } from '../../effect';
import {
  MessageSquare,
  Gauge,
  Calculator,
  FileCode,
  ArrowRight,
} from 'lucide-react';

interface ToolsSuiteProps {
  initialTab?: ToolTab;
  openContactModalWithDetails?: (details: string) => void;
  onNavigateTool?: (slug: string) => void;
}

export const ToolsSuite: React.FC<ToolsSuiteProps> = ({
  initialTab = 'whatsapp-reader',
  openContactModalWithDetails,
  onNavigateTool,
}) => {
  const [activeTab, setActiveTab] = useState<ToolTab>(initialTab);

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  const tabs: { id: ToolTab; label: string; icon: React.ReactNode; slug: string }[] = [
    {
      id: 'whatsapp-reader',
      label: 'WhatsApp Reader',
      icon: <MessageSquare className="w-3.5 h-3.5" />,
      slug: 'whatsapp-reader',
    },
    {
      id: 'seo-audit',
      label: 'AI SEO Audit',
      icon: <Gauge className="w-3.5 h-3.5" />,
      slug: 'seo-audit',
    },
    {
      id: 'cost-calculator',
      label: 'Cost & Speed Estimator',
      icon: <Calculator className="w-3.5 h-3.5" />,
      slug: 'cost-calculator',
    },
    {
      id: 'schema-generator',
      label: 'Schema Builder',
      icon: <FileCode className="w-3.5 h-3.5" />,
      slug: 'schema-generator',
    },
  ];

  const handleOpenDedicated = (slug: string) => {
    if (onNavigateTool) {
      onNavigateTool(slug);
    } else if (typeof window !== 'undefined') {
      window.location.href = `/our-tools/${slug}`;
    }
  };

  return (
    <section
      id="tools"
      className="py-20 bg-white text-zinc-950 border-b border-zinc-200 select-none"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <BlurKex
          direction="up"
          blurPx={14}
          className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 gap-6"
        >
          <div className="max-w-xl">
            <div className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2">
              Section 05 · Our Tools &amp; Interactive Client Utilities
            </div>
            <h2
              className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-950 font-[Outfit]"
              style={{ textWrap: 'balance' }}
            >
              WhatsApp Reader, Live SEO Auditor &amp; Estimator
            </h2>
          </div>

          <div
            role="tablist"
            aria-label="Kexora Interactive Tools"
            className="flex flex-wrap lg:flex-nowrap items-center gap-1 p-1 bg-zinc-100 rounded-2xl border border-zinc-200 shrink-0"
          >
            {tabs.map((tab) => {
              const isSelected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2.5 text-sm font-bold rounded-xl transition-all flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer ${
                    isSelected
                      ? 'bg-zinc-950 text-white shadow-xs'
                      : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-200/60'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </BlurKex>

        {/* Dedicated Page Promotion Bar */}
        <BlurKex
          direction="up"
          delay={0.08}
          blurPx={12}
          className="mb-6 px-5 py-3.5 rounded-2xl bg-zinc-50 border border-zinc-200/90 flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm"
        >
          <div className="flex items-center gap-2 text-zinc-600">
            <span>
              Dedicated dynamic slug URL for this utility:
            </span>
            <code className="font-mono font-bold text-zinc-950 bg-white px-2 py-0.5 rounded border border-zinc-200">
              /our-tools/{activeTab}
            </code>
          </div>

          <button
            type="button"
            onClick={() => handleOpenDedicated(activeTab)}
            className="text-sm font-bold text-zinc-950 hover:underline flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <span>Open in Full Dedicated Page</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </BlurKex>

        {/* Active Tool View */}
        <BlurKex key={activeTab} direction="up" blurPx={14}>
          {activeTab === 'whatsapp-reader' && <WhatsAppReaderTool />}
          {activeTab === 'seo-audit' && (
            <SeoAuditorTool
              onEnquireUpgrade={(url) =>
                openContactModalWithDetails &&
                openContactModalWithDetails(
                  `Requested speed and AI-SEO overhaul for audited domain: ${url}`
                )
              }
            />
          )}
          {activeTab === 'cost-calculator' && (
            <CostEstimatorTool
              onLockInEstimate={(details) =>
                openContactModalWithDetails && openContactModalWithDetails(details)
              }
            />
          )}
          {activeTab === 'schema-generator' && <SchemaBuilderTool />}
        </BlurKex>
      </div>
    </section>
  );
};

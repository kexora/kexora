import React, { useState, useEffect } from 'react';
import { ToolTab, SeoAuditReport, CalculationInput, CurrencyCode } from '../../types';
import { SAMPLE_WHATSAPP_EXPORT } from '../../data/agencyData';
import {
  parseWhatsAppChat,
  filterWhatsAppMessages,
  calculateKexoraEstimate,
} from '../../utils/kexoraTools';
import {
  MessageSquare,
  Gauge,
  Calculator,
  FileCode,
  Search,
  Check,
  Copy,
  Sparkles,
  ArrowRight,
  RefreshCw,
  Upload,
} from 'lucide-react';

interface ToolsSuiteProps {
  initialTab?: ToolTab;
  openContactModalWithDetails?: (details: string) => void;
}

export const ToolsSuite: React.FC<ToolsSuiteProps> = ({
  initialTab = 'whatsapp-reader',
  openContactModalWithDetails,
}) => {
  const [activeTab, setActiveTab] = useState<ToolTab>(initialTab);

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  // Tab 1: WhatsApp Message Reader
  const [rawWhatsAppText, setRawWhatsAppText] = useState(SAMPLE_WHATSAPP_EXPORT);
  const [senderFilter, setSenderFilter] = useState('all');
  const [chatSearch, setChatSearch] = useState('');
  const [showRawInput, setShowRawInput] = useState(false);

  const parsedMessages = parseWhatsAppChat(rawWhatsAppText);
  const uniqueSenders = Array.from(new Set(parsedMessages.map((m) => m.sender)));
  const visibleMessages = filterWhatsAppMessages(
    parsedMessages,
    senderFilter,
    chatSearch
  );

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const content = ev.target?.result;
      if (typeof content === 'string') {
        setRawWhatsAppText(content);
        setSenderFilter('all');
      }
    };
    reader.readAsText(file);
  };

  // Tab 2: Live AI SEO Audit
  const [auditUrl, setAuditUrl] = useState('kexora.org');
  const [isAuditing, setIsAuditing] = useState(false);
  const [auditResult, setAuditResult] = useState<SeoAuditReport>({
    url: 'https://www.kexora.org',
    overallScore: 98,
    performanceScore: 99,
    seoScore: 99,
    accessibilityScore: 96,
    metaTitle: 'Kexora — Custom Web Design, App, Game & AI-SEO Agency',
    metaTitleStatus: 'good',
    metaDescription:
      'Crafting fast custom websites, mobile apps, games, and digital brands with 0.3s load times, 99+ PageSpeed, and full Google SEO.',
    metaDescStatus: 'good',
    schemaDetected: true,
    schemaTypes: ['Organization', 'ProfessionalService', 'WebSite', 'SiteNavigationElement'],
    coreWebVitals: {
      lcp: '0.3s',
      fid: '8ms',
      cls: '0.00',
    },
    recommendations: [
      'Maintain sub-300ms LCP with tree-shaken React & Vite asset bundles.',
      'Keep SiteNavigationElement JSON-LD synchronized with top-level SERP sitelinks.',
      'Continue serving responsive next-gen images with explicit aspect ratios.',
    ],
    aiAnalysis:
      'kexora.org demonstrates enterprise-grade SEO architecture with full Google SERP sitelink eligibility, sub-second Core Web Vitals, and complete Organization/Service JSON-LD graphs.',
  });

  // Tab 3: Cost Calculator
  const [calcInput, setCalcInput] = useState<CalculationInput>({
    projectType: 'business-custom',
    pageCount: 8,
    includeAiSeo: true,
    includeBranding: false,
    includeCompliance: false,
    currency: 'INR',
  });

  const estimate = calculateKexoraEstimate(calcInput);

  // Tab 4: Schema Generator
  const [schemaType, setSchemaType] = useState<'Organization' | 'ProfessionalService' | 'WebSite'>('Organization');
  const [companyName, setCompanyName] = useState('Kexora');
  const [siteUrl, setSiteUrl] = useState('https://www.kexora.org');
  const [copiedCode, setCopiedCode] = useState(false);

  const runLiveAudit = async () => {
    if (!auditUrl.trim()) return;
    setIsAuditing(true);
    try {
      const response = await fetch('/api/seo-audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: auditUrl }),
      });
      const data = await response.json();
      if (data.success && data.report) {
        setAuditResult({ ...data.report, url: auditUrl });
      }
    } catch (err) {
      console.error('Audit error:', err);
    } finally {
      setIsAuditing(false);
    }
  };

  const generatedSchema = JSON.stringify(
    {
      '@context': 'https://schema.org',
      '@type': schemaType,
      name: companyName,
      url: siteUrl,
      founder: {
        '@type': 'Person',
        name: 'Rajan Singh',
        jobTitle: 'CEO & Strategy Head',
      },
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Siwan',
        addressRegion: 'Bihar',
        postalCode: '841226',
        addressCountry: 'IN',
      },
      description:
        'High-performance custom web design, mobile app & game development, e-commerce, and AI-SEO engineering.',
    },
    null,
    2
  );

  const copyToClipboard = () => {
    navigator.clipboard.writeText(
      `<script type="application/ld+json">\n${generatedSchema}\n</script>`
    );
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <section
      id="tools"
      className="py-20 bg-white text-zinc-950 border-b border-zinc-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
          <div className="max-w-xl">
            <div className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2">
              Section 05 · Our Tools & Interactive Client Utilities
            </div>
            <h2
              className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-950 font-[Outfit]"
              style={{ textWrap: 'balance' }}
            >
              WhatsApp Reader, Live SEO Auditor & Estimator
            </h2>
          </div>

          <div
            role="tablist"
            aria-label="Kexora Interactive Tools"
            className="flex flex-wrap lg:flex-nowrap items-center gap-1 p-1 bg-zinc-100 rounded-xl border border-zinc-200 shrink-0"
          >
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'whatsapp-reader'}
              onClick={() => setActiveTab('whatsapp-reader')}
              className={`px-3 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
                activeTab === 'whatsapp-reader'
                  ? 'bg-zinc-950 text-white font-bold'
                  : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-200/60'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp Reader</span>
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'seo-audit'}
              onClick={() => setActiveTab('seo-audit')}
              className={`px-3 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
                activeTab === 'seo-audit'
                  ? 'bg-zinc-950 text-white font-bold'
                  : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-200/60'
              }`}
            >
              <Gauge className="w-3.5 h-3.5" />
              <span>AI SEO Audit</span>
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'cost-calculator'}
              onClick={() => setActiveTab('cost-calculator')}
              className={`px-3 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
                activeTab === 'cost-calculator'
                  ? 'bg-zinc-950 text-white font-bold'
                  : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-200/60'
              }`}
            >
              <Calculator className="w-3.5 h-3.5" />
              <span>Cost &amp; Speed Estimator</span>
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'schema-generator'}
              onClick={() => setActiveTab('schema-generator')}
              className={`px-3 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
                activeTab === 'schema-generator'
                  ? 'bg-zinc-950 text-white font-bold'
                  : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-200/60'
              }`}
            >
              <FileCode className="w-3.5 h-3.5" />
              <span>Schema Builder</span>
            </button>
          </div>
        </div>

        {/* Tool 1: WhatsApp Message Reader */}
        {activeTab === 'whatsapp-reader' && (
          <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-zinc-200">
              <div>
                <div className="text-xs text-zinc-500 font-bold uppercase tracking-wider mb-1">
                  Kexora Featured Utility · 100% Client-Side Privacy
                </div>
                <h3 className="text-xl font-bold text-zinc-950 font-[Outfit]">
                  WhatsApp Chat Export Reader & Timeline Filter
                </h3>
                <p className="text-xs text-zinc-600 mt-1">
                  Load any exported WhatsApp <code className="text-zinc-950 font-mono font-bold">.txt</code> chat file or paste conversation logs to filter by sender and search messages cleanly.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <label className="px-3.5 py-2 text-xs font-semibold text-zinc-950 bg-white hover:bg-zinc-100 border border-zinc-300 rounded-lg cursor-pointer flex items-center gap-2 transition-colors whitespace-nowrap shrink-0">
                  <Upload className="w-3.5 h-3.5 text-zinc-950" />
                  <span>Upload .txt Chat</span>
                  <input
                    type="file"
                    accept=".txt"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>

                <button
                  type="button"
                  onClick={() => setShowRawInput(!showRawInput)}
                  className="px-3.5 py-2 text-xs font-bold text-white bg-zinc-950 hover:bg-zinc-800 rounded-lg transition-colors whitespace-nowrap shrink-0"
                >
                  {showRawInput ? 'Hide Raw Text Editor' : 'Paste Custom Chat Log'}
                </button>
              </div>
            </div>

            {showRawInput && (
              <div className="space-y-2">
                <label
                  htmlFor="whatsapp-raw-textarea"
                  className="text-xs font-bold text-zinc-800 block"
                >
                  Paste Exported WhatsApp Text Lines:
                </label>
                <textarea
                  id="whatsapp-raw-textarea"
                  rows={5}
                  value={rawWhatsAppText}
                  onChange={(e) => setRawWhatsAppText(e.target.value)}
                  className="w-full p-3.5 rounded-xl bg-white border border-zinc-300 text-xs font-mono text-zinc-900 focus:outline-none focus:border-zinc-950"
                />
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
              <div className="md:col-span-5 relative">
                <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  aria-label="Search WhatsApp messages"
                  value={chatSearch}
                  onChange={(e) => setChatSearch(e.target.value)}
                  placeholder="Search keywords in chat..."
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-zinc-300 rounded-xl text-xs text-zinc-950 placeholder-zinc-400 focus:outline-none focus:border-zinc-950"
                />
              </div>

              <div className="md:col-span-7 flex flex-wrap items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setSenderFilter('all')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                    senderFilter === 'all'
                      ? 'bg-zinc-950 text-white font-bold'
                      : 'bg-white text-zinc-600 hover:text-zinc-950 border border-zinc-200'
                  }`}
                >
                  All Participants ({parsedMessages.length})
                </button>
                {uniqueSenders.map((sender) => (
                  <button
                    key={sender}
                    type="button"
                    onClick={() => setSenderFilter(sender)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                      senderFilter === sender
                        ? 'bg-zinc-950 text-white font-bold'
                        : 'bg-white text-zinc-600 hover:text-zinc-950 border border-zinc-200'
                    }`}
                  >
                    {sender}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-4 sm:p-6 rounded-xl bg-white border border-zinc-200 max-h-96 overflow-y-auto space-y-3">
              {visibleMessages.length === 0 ? (
                <div className="text-center py-8 text-xs text-zinc-500">
                  No messages match your current filter. Try clearing the search query.
                </div>
              ) : (
                visibleMessages.map((msg) => {
                  const isKexora = msg.sender.toLowerCase().includes('kexora');
                  return (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${
                        isKexora ? 'items-start' : 'items-end'
                      }`}
                    >
                      <div
                        className={`max-w-xl p-4 rounded-xl border ${
                          isKexora
                            ? 'bg-zinc-50 border-zinc-200 text-zinc-900'
                            : 'bg-zinc-950 border-zinc-950 text-white'
                        }`}
                      >
                        <div
                          className={`flex items-center justify-between gap-4 text-[11px] mb-1.5 ${
                            isKexora ? 'text-zinc-500' : 'text-zinc-300'
                          }`}
                        >
                          <span className="font-bold">{msg.sender}</span>
                          <span className="font-mono tabular-nums">
                            {msg.date} · {msg.time}
                          </span>
                        </div>
                        <p className="text-xs leading-relaxed whitespace-pre-line">
                          {msg.text}
                        </p>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}

        {/* Tool 2: Live AI SEO Audit */}
        {activeTab === 'seo-audit' && (
          <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="relative flex-1 w-full">
                <Search className="w-4 h-4 text-zinc-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  aria-label="Website URL to audit"
                  value={auditUrl}
                  onChange={(e) => setAuditUrl(e.target.value)}
                  placeholder="Enter website domain (e.g., kexora.org or yourcompany.com)..."
                  className="w-full pl-11 pr-4 py-3 bg-white border border-zinc-300 rounded-xl text-sm text-zinc-950 placeholder-zinc-400 focus:outline-none focus:border-zinc-950"
                />
              </div>
              <button
                type="button"
                onClick={runLiveAudit}
                disabled={isAuditing}
                className="w-full sm:w-auto px-6 py-3 text-xs font-bold text-white bg-zinc-950 hover:bg-zinc-800 disabled:bg-zinc-400 rounded-xl transition-colors flex items-center justify-center gap-2 whitespace-nowrap shrink-0"
              >
                {isAuditing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Running Audit...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Audit Website SEO</span>
                  </>
                )}
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-white border border-zinc-200">
                <div className="text-2xl font-extrabold text-zinc-950 font-[Outfit] tabular-nums">
                  {auditResult.overallScore}/100
                </div>
                <div className="text-xs text-zinc-500 mt-1">Overall Health</div>
              </div>
              <div className="p-4 rounded-xl bg-white border border-zinc-200">
                <div className="text-2xl font-extrabold text-zinc-950 font-[Outfit] tabular-nums">
                  {auditResult.performanceScore}/100
                </div>
                <div className="text-xs text-zinc-500 mt-1">Core Web Vitals</div>
              </div>
              <div className="p-4 rounded-xl bg-white border border-zinc-200">
                <div className="text-2xl font-extrabold text-zinc-950 font-[Outfit] tabular-nums">
                  {auditResult.seoScore}/100
                </div>
                <div className="text-xs text-zinc-500 mt-1">AI-SEO & Schema</div>
              </div>
              <div className="p-4 rounded-xl bg-white border border-zinc-200">
                <div className="text-2xl font-extrabold text-zinc-950 font-[Outfit] tabular-nums">
                  {auditResult.accessibilityScore}/100
                </div>
                <div className="text-xs text-zinc-500 mt-1">WCAG Accessibility</div>
              </div>
            </div>

            {auditResult.aiAnalysis && (
              <div className="p-4 rounded-xl bg-white border border-zinc-200 text-xs text-zinc-700 leading-relaxed">
                <strong className="text-zinc-950 font-bold">Executive Audit Summary: </strong>
                {auditResult.aiAnalysis}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 rounded-xl bg-white border border-zinc-200 space-y-3">
                <h4 className="text-xs font-bold text-zinc-950">Core Web Vitals Telemetry</h4>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between py-1.5 border-b border-zinc-100">
                    <span className="text-zinc-500">Largest Contentful Paint (LCP)</span>
                    <span className="font-mono text-zinc-950 font-bold tabular-nums">
                      {auditResult.coreWebVitals.lcp}
                    </span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-zinc-100">
                    <span className="text-zinc-500">Interaction to Next Paint (INP)</span>
                    <span className="font-mono text-zinc-950 font-bold tabular-nums">
                      {auditResult.coreWebVitals.fid}
                    </span>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <span className="text-zinc-500">Cumulative Layout Shift (CLS)</span>
                    <span className="font-mono text-zinc-950 font-bold tabular-nums">
                      {auditResult.coreWebVitals.cls}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-5 rounded-xl bg-white border border-zinc-200 space-y-3">
                <h4 className="text-xs font-bold text-zinc-950">Actionable Engineering Recommendations</h4>
                <ul className="space-y-2 text-xs text-zinc-700">
                  {auditResult.recommendations.map((rec, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-zinc-950 shrink-0 mt-0.5" />
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Tool 3: Project Cost & Speed Estimator for Web, App & SEO */}
        {activeTab === 'cost-calculator' && (
          <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="pb-4 border-b border-zinc-200">
              <div className="text-xs text-zinc-500 font-bold uppercase tracking-wider mb-1">
                Kexora Interactive Planner · Instant Setup, Retainer &amp; Speed Forecast
              </div>
              <h3 className="text-xl font-bold text-zinc-950 font-[Outfit]">
                Project Cost &amp; Speed Estimator for Web, App &amp; SEO
              </h3>
              <p className="text-xs text-zinc-600 mt-1">
                Configure your website, mobile app, game, or e-commerce project to view transparent INR/USD pricing and target speed benchmarks.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-7 space-y-6">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-zinc-950">
                    1. Select What You Want to Build
                  </label>
                  <div className="flex items-center gap-1 p-0.5 bg-white rounded-lg border border-zinc-200">
                    {(['INR', 'USD'] as CurrencyCode[]).map((curr) => (
                      <button
                        key={curr}
                        type="button"
                        onClick={() => setCalcInput({ ...calcInput, currency: curr })}
                        className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors ${
                          calcInput.currency === curr
                            ? 'bg-zinc-950 text-white font-bold'
                            : 'text-zinc-600 hover:text-zinc-950'
                        }`}
                      >
                        {curr === 'INR' ? 'INR (₹)' : 'USD ($)'}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { id: 'portfolio', label: 'Portfolio / Landing Page (Beginner)' },
                    { id: 'business-custom', label: 'Custom Business Website (Creative)' },
                    { id: 'app-game', label: 'Android / iOS App & Game Dev' },
                    { id: 'ecommerce', label: 'Multi-Vendor / Full E-Commerce' },
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() =>
                        setCalcInput({ ...calcInput, projectType: item.id as any })
                      }
                      className={`p-3.5 text-xs font-semibold rounded-xl border text-left transition-colors ${
                        calcInput.projectType === item.id
                          ? 'bg-zinc-950 border-zinc-950 text-white font-bold'
                          : 'bg-white border-zinc-200 text-zinc-700 hover:border-zinc-950'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label
                      htmlFor="page-count-slider"
                      className="text-xs font-bold text-zinc-950"
                    >
                      2. Number of Custom Pages / App Screens
                    </label>
                    <span className="text-xs font-mono text-zinc-950 font-bold tabular-nums">
                      {calcInput.pageCount} {calcInput.projectType === 'app-game' ? 'Screens' : 'Pages'}
                    </span>
                  </div>
                  <input
                    id="page-count-slider"
                    type="range"
                    min="1"
                    max="25"
                    value={calcInput.pageCount}
                    onChange={(e) =>
                      setCalcInput({ ...calcInput, pageCount: parseInt(e.target.value, 10) })
                    }
                    className="w-full accent-zinc-950 bg-zinc-200 rounded-lg cursor-pointer"
                  />
                </div>

                <div className="space-y-2.5">
                  <div className="text-xs font-bold text-zinc-950">
                    3. Optional Growth & Compliance Add-Ons
                  </div>
                  <label className="flex items-center gap-3 p-3 rounded-xl bg-white border border-zinc-200 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={calcInput.includeAiSeo}
                      onChange={(e) =>
                        setCalcInput({ ...calcInput, includeAiSeo: e.target.checked })
                      }
                      className="rounded accent-zinc-950"
                    />
                    <span className="text-xs text-zinc-800">
                      AI-SEO, Schema.org Sitelinks & Google My Business Optimization
                    </span>
                  </label>

                  <label className="flex items-center gap-3 p-3 rounded-xl bg-white border border-zinc-200 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={calcInput.includeBranding}
                      onChange={(e) =>
                        setCalcInput({ ...calcInput, includeBranding: e.target.checked })
                      }
                      className="rounded accent-zinc-950"
                    />
                    <span className="text-xs text-zinc-800">
                      Logo, Brochure PDF Design & Animated Explainer Video Kit
                    </span>
                  </label>

                  <label className="flex items-center gap-3 p-3 rounded-xl bg-white border border-zinc-200 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={calcInput.includeCompliance}
                      onChange={(e) =>
                        setCalcInput({ ...calcInput, includeCompliance: e.target.checked })
                      }
                      className="rounded accent-zinc-950"
                    />
                    <span className="text-xs text-zinc-800">
                      Company Registration, GST, Trademark & ISO Certification Support
                    </span>
                  </label>
                </div>
              </div>

              <div className="lg:col-span-5 p-6 rounded-2xl bg-zinc-950 text-white flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs text-zinc-400">
                    <span>Matched Tier: {estimate.recommendedPlanName}</span>
                    <span className="font-mono text-white font-bold tabular-nums">
                      ~{estimate.estimatedTimelineWeeks} Weeks Delivery
                    </span>
                  </div>

                  <div>
                    <div className="text-xs text-zinc-400">Estimated One-Time Setup + Add-Ons</div>
                    <div className="text-3xl font-extrabold text-white font-[Outfit] tabular-nums mt-1">
                      {estimate.currencySymbol}
                      {estimate.setupCost.toLocaleString()}
                    </div>
                    <div className="text-xs text-zinc-300 font-mono mt-1 tabular-nums">
                      + {estimate.currencySymbol}
                      {estimate.monthlyRetainer.toLocaleString()} / month managed hosting & support
                    </div>
                  </div>

                  <div className="pt-4 border-t border-zinc-800 space-y-2 text-xs">
                    {estimate.breakdown.map((item, i) => (
                      <div key={i} className="flex justify-between text-zinc-300">
                        <span>{item.label}</span>
                        <span className="font-mono tabular-nums text-white">
                          {estimate.currencySymbol}
                          {item.amount.toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Speed & SEO Target Benchmarks */}
                  <div className="pt-3 border-t border-zinc-800 flex items-center justify-between text-[11px] font-mono text-zinc-300 tabular-nums">
                    <span>Target Load: 0.3s Instant</span>
                    <span>PageSpeed: 99+ Guaranteed</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    openContactModalWithDetails &&
                    openContactModalWithDetails(
                      `${estimate.recommendedPlanName} Estimate (${estimate.currencySymbol}${estimate.setupCost.toLocaleString()} setup + ${estimate.currencySymbol}${estimate.monthlyRetainer.toLocaleString()}/mo) for ${calcInput.pageCount} pages.`
                    )
                  }
                  className="w-full py-3.5 text-xs font-bold text-zinc-950 bg-white hover:bg-zinc-200 rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  <span>Lock In This Estimate With Kexora</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tool 4: Schema.org JSON-LD Builder */}
        {activeTab === 'schema-generator' && (
          <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-6 sm:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-base font-bold text-zinc-950">
                  Configure Schema.org JSON-LD Entity
                </h3>
                <div>
                  <label htmlFor="schema-type-select" className="text-xs text-zinc-600 block mb-1">
                    Schema Entity Type
                  </label>
                  <select
                    id="schema-type-select"
                    value={schemaType}
                    onChange={(e) => setSchemaType(e.target.value as any)}
                    className="w-full py-2.5 px-3 bg-white border border-zinc-300 rounded-lg text-xs text-zinc-950"
                  >
                    <option value="Organization">Organization</option>
                    <option value="ProfessionalService">ProfessionalService</option>
                    <option value="WebSite">WebSite</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="schema-brand-input" className="text-xs text-zinc-600 block mb-1">
                    Brand Name
                  </label>
                  <input
                    id="schema-brand-input"
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full py-2.5 px-3 bg-white border border-zinc-300 rounded-lg text-xs text-zinc-950"
                  />
                </div>

                <div>
                  <label htmlFor="schema-url-input" className="text-xs text-zinc-600 block mb-1">
                    Canonical Website URL
                  </label>
                  <input
                    id="schema-url-input"
                    type="text"
                    value={siteUrl}
                    onChange={(e) => setSiteUrl(e.target.value)}
                    className="w-full py-2.5 px-3 bg-white border border-zinc-300 rounded-lg text-xs text-zinc-950"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-zinc-700 font-bold">
                    Ready-to-Embed HTML Head Script
                  </span>
                  <button
                    type="button"
                    onClick={copyToClipboard}
                    className="px-3 py-1 text-xs font-bold text-white bg-zinc-950 hover:bg-zinc-800 rounded flex items-center gap-1"
                  >
                    {copiedCode ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedCode ? 'Copied' : 'Copy JSON-LD'}</span>
                  </button>
                </div>
                <pre className="p-4 rounded-xl bg-zinc-950 text-zinc-100 text-xs font-mono overflow-x-auto h-56">
{`<script type="application/ld+json">
${generatedSchema}
</script>`}
                </pre>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

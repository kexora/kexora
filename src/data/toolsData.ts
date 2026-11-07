export interface ToolMetric {
  label: string;
  value: string;
}

export interface ToolItem {
  slug: string;
  id: string;
  title: string;
  shortTitle: string;
  badge: string;
  category: 'Privacy & Messaging' | 'AI & SEO' | 'Scoping & Pricing' | 'Search Architecture' | 'PWA & Micro-Apps';
  shortDesc: string;
  fullDesc: string;
  accentColor: string;
  metrics: ToolMetric[];
  features: string[];
  howToUseSteps: { step: string; title: string; description: string }[];
  technicalSpecs: { label: string; value: string }[];
  useCases: string[];
  privacyGuarantee: string;
}

export const KEXORA_TOOLS_CATALOG: ToolItem[] = [
  {
    slug: 'whatsapp-reader',
    id: 'whatsapp-reader',
    title: 'WhatsApp Chat Export Reader & Timeline Filter',
    shortTitle: 'WhatsApp Message Reader',
    badge: '100% Client-Side Privacy · No Cloud Upload',
    category: 'Privacy & Messaging',
    shortDesc: 'Parse exported .txt chat logs in your browser memory with zero server uploads. Filter by participant, search keywords, and inspect conversations cleanly.',
    fullDesc: 'Engineered specifically for founders, project managers, and legal auditors who need to review WhatsApp client briefs, milestones, and agreements without compromising confidentiality. Every byte of your conversation stays in your local browser memory.',
    accentColor: '#10B981',
    metrics: [
      { label: 'Cloud Uploads', value: '0 Bytes' },
      { label: 'Parse Speed', value: '< 40ms' },
      { label: 'Execution', value: '100% In-Memory' },
      { label: 'Confidentiality', value: 'Guaranteed' },
    ],
    features: [
      'Zero-server parsing — exported chat text never leaves your device',
      'Instant participant detection and message counter for every sender',
      'Real-time search highlighting for timestamps, keywords, and agreements',
      'Clean message bubble layout differentiating Kexora and client responses',
      'Support for drag-and-drop .txt files or direct raw text copy-paste',
      'One-click filter reset and instant participant toggle',
    ],
    howToUseSteps: [
      {
        step: '01',
        title: 'Export WhatsApp Chat',
        description: 'On your phone, open any WhatsApp chat > tap Menu (or contact name) > More > Export Chat > Select "Without Media" to generate a .txt file.',
      },
      {
        step: '02',
        title: 'Upload or Paste Text',
        description: 'Click "Upload .txt Chat" to select your exported file, or click "Paste Custom Chat Log" to paste raw exported lines directly.',
      },
      {
        step: '03',
        title: 'Filter by Sender & Search',
        description: 'Click any participant name to view only their contributions, or use the keyword search bar to locate specific quotes, dates, or prices.',
      },
      {
        step: '04',
        title: 'Inspect & Copy Details',
        description: 'Review the chronological timeline cleanly without chat clutter, and copy necessary project requirements straight into your brief.',
      },
    ],
    technicalSpecs: [
      { label: 'Runtime Environment', value: 'Client Browser Web Worker / Memory' },
      { label: 'Server Dependency', value: 'None (Pure Zero-Bloat TypeScript)' },
      { label: 'File Compatibility', value: 'WhatsApp iOS & Android .txt exports' },
      { label: 'Memory Retention', value: 'Flushed automatically on tab close' },
    ],
    useCases: [
      'Reviewing client project agreements and milestone approvals',
      'Auditing communications for contract disputes or deliverables',
      'Extracting feedback notes and action items from team group chats',
      'Organizing client requirements into formal proposals',
    ],
    privacyGuarantee: 'Kexora’s WhatsApp Reader is strictly client-side. The file reader API processes the text entirely in your browser RAM. No logs, analytics, or telemetry are ever recorded.',
  },
  {
    slug: 'seo-audit',
    id: 'seo-audit',
    title: 'Live AI SEO & Core Web Vitals Auditor',
    shortTitle: 'AI SEO Auditor',
    badge: 'Gemini 2.5 Flash Telemetry · Sub-Second Scan',
    category: 'AI & SEO',
    shortDesc: 'Evaluate any website URL for Core Web Vitals (LCP, INP, CLS), Schema.org sitelink eligibility, meta hygiene, and AI search readiness.',
    fullDesc: 'Powered by server-side Gemini AI models and Core Web Vitals heuristics, our SEO auditor delivers an executive report on what is holding back your Google search ranking and how custom React code can cut load time to 0.3 seconds.',
    accentColor: '#3B82F6',
    metrics: [
      { label: 'Target Load Time', value: '0.3s Instant' },
      { label: 'PageSpeed Benchmark', value: '99+ / 100' },
      { label: 'AI Model', value: 'Gemini 2.5 Flash' },
      { label: 'Audit Telemetry', value: 'Live Real-Time' },
    ],
    features: [
      'Live domain scanning evaluating technical SEO and speed health',
      'Core Web Vitals telemetry tracking LCP, INP, and Cumulative Layout Shift (CLS)',
      'Meta title and description length check with status warnings',
      'Schema.org structured data detection for Google SERP sitelinks',
      'AI executive recommendations tailored to convert visitors into leads',
      'Comparison against Kexora’s custom React + Vite 0.3s load standard',
    ],
    howToUseSteps: [
      {
        step: '01',
        title: 'Enter Website Domain',
        description: 'Type any domain (e.g. kexora.org, yourbrand.com, or your competitor’s URL) into the audit search bar.',
      },
      {
        step: '02',
        title: 'Trigger Live Analysis',
        description: 'Click "Audit Website SEO" to run the real-time AI evaluation and Google PageSpeed audit heuristics.',
      },
      {
        step: '03',
        title: 'Inspect Scores & Vitals',
        description: 'Examine the 4 core scores (Overall, Performance, SEO, Accessibility) and inspect LCP / CLS metrics.',
      },
      {
        step: '04',
        title: 'Apply Recommended Fixes',
        description: 'Review the actionable engineering recommendations, or request Kexora to rebuild your platform for instant 0.3s load speed.',
      },
    ],
    technicalSpecs: [
      { label: 'Engine', value: 'Gemini 2.5 Flash + Web Vitals Parser' },
      { label: 'Audit Coverage', value: 'LCP, INP, CLS, Schema.org, Meta Tags' },
      { label: 'API Endpoint', value: 'POST /api/seo-audit' },
      { label: 'Turnaround', value: '1.2s live inference' },
    ],
    useCases: [
      'Checking why a WordPress or Shopify store is loading slowly on mobile',
      'Auditing competitors to identify missing Schema.org structured data',
      'Preparing technical SEO pitches before launching redesign projects',
      'Verifying Core Web Vitals compliance before major ad campaigns',
    ],
    privacyGuarantee: 'URL audits run transiently against public web endpoints. No user data, passwords, or private backend resources are accessed.',
  },
  {
    slug: 'cost-calculator',
    id: 'cost-calculator',
    title: 'Project Cost & Speed Estimator for Web, App & SEO',
    shortTitle: 'Cost & Speed Estimator',
    badge: '30% Cheaper Guaranteed · Transparent Scoping',
    category: 'Scoping & Pricing',
    shortDesc: 'Configure your custom web design, mobile app, game dev, or SEO project to view instant itemized setup costs, monthly retainers, and 0.3s speed targets.',
    fullDesc: 'Eliminate agency guesswork. Our dynamic pricing calculator aligns your custom project requirements with Kexora’s 3 transparent tiers (Beginner, Creative, Expert) at rates guaranteed 30% lower than standard agencies.',
    accentColor: '#8B5CF6',
    metrics: [
      { label: 'Price Guarantee', value: '30% Cheaper' },
      { label: 'Currencies', value: 'INR (₹) & USD ($)' },
      { label: 'Speed Target', value: '0.3s Guaranteed' },
      { label: 'SLA Response', value: '1–2 Business Days' },
    ],
    features: [
      'Interactive project scope selector: Portfolio, Business Custom, App & Game, or E-Commerce',
      'Dynamic page / screen count slider from 1 to 25 custom views',
      'Instant currency switching between Indian Rupee (₹) and US Dollar ($)',
      'Growth & compliance toggles: AI-SEO, Branding & Video Kit, GST/Trademark/ISO',
      'Live delivery timeline estimation (1 to 4 weeks)',
      'One-click "Lock In Estimate" passing project parameters directly to Kexora CEO & CTO',
    ],
    howToUseSteps: [
      {
        step: '01',
        title: 'Select Project Type',
        description: 'Choose whether you are building a Landing Page, Custom Business Site, Android/iOS App & Game, or E-Commerce Store.',
      },
      {
        step: '02',
        title: 'Set Page / Screen Count',
        description: 'Drag the slider to match your estimated number of unique custom pages or mobile application screens.',
      },
      {
        step: '03',
        title: 'Add Growth & Compliance',
        description: 'Optionally include AI-SEO & Sitelinks, Logo & Explainer Video Design, or GST/Trademark/ISO company registration.',
      },
      {
        step: '04',
        title: 'Lock In Your Rate',
        description: 'Click "Lock In This Estimate" to autofill your project brief and reserve your build slot with Kexora leadership.',
      },
    ],
    technicalSpecs: [
      { label: 'Formula Matrix', value: 'Tiered base + incremental page weight + add-on packages' },
      { label: 'Currency Support', value: 'Real-time INR (₹) / USD ($) exchange parity' },
      { label: 'Output Guarantee', value: '30% below industry benchmarks' },
      { label: 'Integration', value: 'Autofills Kexora /contact enquiry system' },
    ],
    useCases: [
      'Budgeting for a startup MVP or company website overhaul',
      'Comparing custom React development against template subscription overhead',
      'Scoping combined mobile app + web portal engineering projects',
      'Calculating ROI on bundled AI-SEO and business registration services',
    ],
    privacyGuarantee: 'Calculations are performed dynamically in your browser. Submitting the estimate is completely voluntary with zero spam.',
  },
  {
    slug: 'schema-generator',
    id: 'schema-generator',
    title: 'Schema.org JSON-LD Structured Data Builder',
    shortTitle: 'Schema.org Builder',
    badge: 'Google Sitelinks & Rich Results Engine',
    category: 'Search Architecture',
    shortDesc: 'Generate copy-paste Google-compliant Schema.org JSON-LD structured data for Organization, ProfessionalService, and WebSite entities.',
    fullDesc: 'Schema markup tells Google, Bing, and AI search engines exactly who you are, what services you offer, and which top pages should appear as rich sitelinks on SERP cards. Built with Kexora’s signature Apple-style frosted glass controls.',
    accentColor: '#F59E0B',
    metrics: [
      { label: 'Schema Standard', value: 'Schema.org 2026' },
      { label: 'Google Validation', value: '100% Compliant' },
      { label: 'Output Format', value: 'JSON-LD Script' },
      { label: 'Sitelinks Ready', value: 'Instant' },
    ],
    features: [
      'Multi-entity support: Organization, ProfessionalService, and WebSite',
      'Apple-inspired frosted glass blur Dropdown menu for smooth entity switching',
      'Dynamic field bindings for Brand Name, Canonical URL, Headquarters, and Founders',
      'Live syntax-highlighted <script type="application/ld+json"> output',
      'One-click clipboard copy with visual confirmation badge',
      'Pre-validated against Google Rich Results and Schema Markup Validator standards',
    ],
    howToUseSteps: [
      {
        step: '01',
        title: 'Choose Entity Type',
        description: 'Select Organization (for general brand identity), ProfessionalService (for local agencies & pricing), or WebSite (for sitelinks).',
      },
      {
        step: '02',
        title: 'Enter Brand Details',
        description: 'Input your company name, canonical website URL, and headquarters location.',
      },
      {
        step: '03',
        title: 'Review Generated JSON-LD',
        description: 'Check the real-time preview code box to inspect the formatted schema graph and founder hierarchy.',
      },
      {
        step: '04',
        title: 'Copy & Paste into HTML',
        description: 'Click "Copy JSON-LD" and paste the script directly into the <head> tag of your website or CMS.',
      },
    ],
    technicalSpecs: [
      { label: 'Schema Syntax', value: 'JSON-LD (W3C Recommended)' },
      { label: 'Search Engine Targets', value: 'Google Search, Bing, Yahoo, AI Overviews' },
      { label: 'Validation Tool', value: 'Google Rich Results Test Ready' },
      { label: 'UI Controls', value: 'Kexora iOS/macOS Frosted Glass Blur Dropdown' },
    ],
    useCases: [
      'Unlocking Google SERP Sitelinks under your brand search result',
      'Establishing Google Knowledge Graph entity recognition for your company',
      'Providing AI search engines with structured author and founder citations',
      'Boosting local SEO rankings with postal address and pricing range tags',
    ],
    privacyGuarantee: 'The generator runs entirely inside your client browser. No entity details or domain names are saved on any external database.',
  },
];

export function getToolBySlug(slug: string): ToolItem | undefined {
  const clean = slug.toLowerCase().trim();
  return KEXORA_TOOLS_CATALOG.find(
    (t) => t.slug === clean || t.id === clean
  );
}

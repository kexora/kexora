export interface NeedBasedPricingTier {
  id: string;
  needCategory: string;
  headline: string;
  targetAudience: string;
  popular?: boolean;
  priceInrMonthly: number;
  marketPriceInrMonthly: number;
  setupFeeInr: number;
  marketSetupFeeInr: number;
  priceUsdMonthly: number;
  marketPriceUsdMonthly: number;
  setupFeeUsd: number;
  marketSetupFeeUsd: number;
  billingType: 'monthly-setup' | 'one-time-fixed';
  timeline: string;
  deliverables: string[];
  recommendedAddons: string[];
  ctaLabel: string;
  whySaveText: string;
}

export const NEED_BASED_PRICING_CATALOG: NeedBasedPricingTier[] = [
  {
    id: 'landing-portfolio',
    needCategory: 'Personal Brand & Landing Page',
    headline: 'Single Page / Portfolio / Launch Page',
    targetAudience: 'Doctors, Lawyers, Freelancers, Consultants & Single Product Launches',
    priceInrMonthly: 999,
    marketPriceInrMonthly: 1450,
    setupFeeInr: 8000,
    marketSetupFeeInr: 11500,
    priceUsdMonthly: 19,
    marketPriceUsdMonthly: 29,
    setupFeeUsd: 120,
    marketSetupFeeUsd: 175,
    billingType: 'monthly-setup',
    timeline: '3–5 Days Delivery',
    deliverables: [
      '1 Custom High-Conversion Page (React + Tailwind or HTML5)',
      'Sub-0.3s Instant Load Speed with 99+ Mobile PageSpeed',
      'WhatsApp Quick Lead Floating Button & Smart Contact Form',
      'Free SSL Certificate, Fast CDN Hosting & Domain Linking',
      'Standard Initial Build Sign-off & 30-Day Launch Warranty',
    ],
    recommendedAddons: ['Local Google My Business Setup (₹2,499)', 'Logo Design (₹1,499)'],
    ctaLabel: 'Start Landing Page Project',
    whySaveText: 'Direct coding with no middleman saves you ₹3,500 upfront and ₹451 every month.',
  },
  {
    id: 'business-corporate',
    needCategory: 'Growing Business & Corporate',
    headline: 'Custom Business Website (5–10 Pages)',
    targetAudience: 'SMEs, Manufacturers, Real Estate, Schools, Clinics & Professional Firms',
    popular: true,
    priceInrMonthly: 2499,
    marketPriceInrMonthly: 3600,
    setupFeeInr: 18000,
    marketSetupFeeInr: 26000,
    priceUsdMonthly: 39,
    marketPriceUsdMonthly: 59,
    setupFeeUsd: 260,
    marketSetupFeeUsd: 380,
    billingType: 'monthly-setup',
    timeline: '7–10 Days Delivery',
    deliverables: [
      '5 to 10 Custom Designed Responsive Pages (Home, About, Services, News, Contact)',
      'Apple/macOS Smart Dropdown Enquiry System with auto-fill',
      'Full Local Google My Business & Schema.org JSON-LD Sitelinks',
      '2–3 Dedicated Design Iterations & Custom Vector Graphics',
      'Priority Phone & WhatsApp Engineering Support directly from Rajan & Aditya',
    ],
    recommendedAddons: ['AI-SEO Monthly Growth Retainer (₹4,999/mo)', 'Explainer Video (₹3,499)'],
    ctaLabel: 'Choose Business Website Plan',
    whySaveText: 'Save ₹8,000 on initial development and ₹1,101 each month vs standard agencies.',
  },
  {
    id: 'ecommerce-retail',
    needCategory: 'E-Commerce & Online Store',
    headline: 'Multi-Vendor / D2C Online Store',
    targetAudience: 'Retail Brands, Fashion D2C, Wholesale Distributors & Multi-Vendor Hubs',
    priceInrMonthly: 4999,
    marketPriceInrMonthly: 7200,
    setupFeeInr: 40000,
    marketSetupFeeInr: 58000,
    priceUsdMonthly: 79,
    marketPriceUsdMonthly: 119,
    setupFeeUsd: 580,
    marketSetupFeeUsd: 850,
    billingType: 'monthly-setup',
    timeline: '14–21 Days Delivery',
    deliverables: [
      'Unlimited Product Listings, Categories, Filter & Search Matrix',
      'Payment Gateway Integration (Razorpay, UPI, PhonePe, Stripe, Credit Cards)',
      'Customer Accounts, Order Tracking & Automated WhatsApp/Email Alerts',
      'Merchant Admin Panel with Inventory, Discount Codes & Sales Analytics',
      'High-Concurrency Edge CDN with 0.3s PageSpeed under heavy sales traffic',
    ],
    recommendedAddons: ['GST & Trademark Registration (₹5,499)', 'Multi-Vendor Marketplace Matrix'],
    ctaLabel: 'Build E-Commerce Store',
    whySaveText: 'Save ₹18,000+ on setup and ₹2,201/mo on managed hosting & maintenance.',
  },
  {
    id: 'mobile-app-game',
    needCategory: 'Mobile Apps & Game Studio',
    headline: 'Android & iOS App / 2D & 3D Game',
    targetAudience: 'Tech Startups, Gaming Founders & Mobile-First Businesses',
    priceInrMonthly: 3499,
    marketPriceInrMonthly: 5000,
    setupFeeInr: 24999,
    marketSetupFeeInr: 36000,
    priceUsdMonthly: 55,
    marketPriceUsdMonthly: 80,
    setupFeeUsd: 360,
    marketSetupFeeUsd: 520,
    billingType: 'one-time-fixed',
    timeline: '2–4 Weeks Delivery',
    deliverables: [
      'Native or Cross-Platform Mobile App (Flutter / React Native)',
      '2D & 3D Mobile / Web Game Development (Unity / HTML5 WebGL)',
      'Google Play Store & Apple App Store Publishing & ASO Optimization',
      'Push Notifications, Firebase Auth & Real-Time Cloud Database',
      'Smooth 60fps Performance on Budget & Flagship Smartphones',
    ],
    recommendedAddons: ['Multiplayer Server Integration', 'In-App Purchases & AdMob Monitization'],
    ctaLabel: 'Start Mobile App & Game Build',
    whySaveText: 'Save ₹11,000+ on development with zero outsourced third-party agency markup.',
  },
  {
    id: 'seo-lead-generation',
    needCategory: 'AI-SEO & Search Growth',
    headline: 'AI-SEO, Google Sitelinks & 1st Page Rank',
    targetAudience: 'Companies seeking high-intent client inquiries from Google & AI search engines',
    priceInrMonthly: 4999,
    marketPriceInrMonthly: 7500,
    setupFeeInr: 4999,
    marketSetupFeeInr: 7500,
    priceUsdMonthly: 79,
    marketPriceUsdMonthly: 120,
    setupFeeUsd: 79,
    marketSetupFeeUsd: 120,
    billingType: 'monthly-setup',
    timeline: 'Continuous Monthly Growth (SLA: 1st Page within 60–90 Days)',
    deliverables: [
      'Comprehensive Schema.org JSON-LD Graphs unlocking Google SERP Sitelinks',
      'Google My Business & Google Maps Top 3 Local Pack Rank Optimization',
      'AI Overviews, ChatGPT Search & Perplexity Citation Formatting',
      'Target Keyword Gap Analysis & High-Converting Content Publishing',
      'Monthly Ranking, Lead Volume & Technical Health Performance Reports',
    ],
    recommendedAddons: ['Content Writing Package (₹1,999)', 'Social Media Optimization (₹3,499)'],
    ctaLabel: 'Accelerate Organic SEO',
    whySaveText: 'Save ₹2,500 every month on expert SEO compared to typical metropolitan agencies.',
  },
  {
    id: 'creative-compliance',
    needCategory: 'Branding & Legal Compliance',
    headline: 'Logo, Explainer Video & GST/Trademark/ISO',
    targetAudience: 'New and expanding businesses establishing trusted legal & visual identity',
    priceInrMonthly: 0,
    marketPriceInrMonthly: 0,
    setupFeeInr: 6999,
    marketSetupFeeInr: 10500,
    priceUsdMonthly: 0,
    marketPriceUsdMonthly: 0,
    setupFeeUsd: 99,
    marketSetupFeeUsd: 150,
    billingType: 'one-time-fixed',
    timeline: '3–7 Days Turnaround',
    deliverables: [
      'Original 4K Vector Logo with Complete Brand Color Palette & Typography Guide',
      'Print-Ready Company Brochure PDF & Corporate Stationary Kit',
      '60-Second Animated Explainer Video with Voiceover for Social Media',
      'Official Government GST Registration & Certificate Issuance',
      'Trademark Filing with IP India (Class Search & Application Submission)',
      'ISO 9001:2015 Quality Management Certification Guidance',
    ],
    recommendedAddons: ['Annual GST Return Compliance Retainer', 'Brochure Print Runs'],
    ctaLabel: 'Enquire for Branding & Legal Kit',
    whySaveText: 'Save over 30% on combined creative branding and legal incorporation packages.',
  },
];

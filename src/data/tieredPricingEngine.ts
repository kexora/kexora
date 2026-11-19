import {
  CurrencyCode,
  ServicePricingItem,
  ServiceTierId,
  ServiceTierPackage,
  StudioQuotation,
} from '../types';
import { INDIVIDUAL_SERVICE_PRICING, PRICING_PLANS } from './agencyData';

export const TIER_ORDER: ServiceTierId[] = ['basic', 'standard', 'premium'];

export const TIER_META: Record<
  ServiceTierId,
  {
    id: ServiceTierId;
    label: 'Basic' | 'Standard' | 'Premium';
    hindiHint: string;
    shortDesc: string;
  }
> = {
  basic: {
    id: 'basic',
    label: 'Basic',
    hindiHint: 'Sabse Sasta · Essential',
    shortDesc: 'Lowest-cost starter scope with essential deliverables for quick launch.',
  },
  standard: {
    id: 'standard',
    label: 'Standard',
    hindiHint: 'Middle · Most Popular',
    shortDesc: 'Balanced mid-tier with custom styling, speed optimization & full features.',
  },
  premium: {
    id: 'premium',
    label: 'Premium',
    hindiHint: 'Max · Full Enterprise',
    shortDesc: 'Maximum scope, advanced integrations, unlimited revisions & 24/7 priority SLA.',
  },
};

interface CustomTierSpec {
  basicSub: string;
  basicTurnaround: string;
  basicDeliverables: string[];
  standardSub: string;
  standardTurnaround: string;
  standardDeliverables: string[];
  premiumSub: string;
  premiumTurnaround: string;
  premiumDeliverables: string[];
  basicRatio?: number;
  premiumRatio?: number;
}

/**
 * Domain-specific Basic, Standard, and Premium deliverables & turnaround specs
 * for all 24 Kexora company services.
 */
const SERVICE_TIER_SPECS: Record<string, CustomTierSpec> = {
  'srv-ecommerce-custom-web': {
    basicRatio: 0.6,
    premiumRatio: 1.67,
    basicSub: 'Starter single-category online catalog & UPI/WhatsApp checkout (Up to 25 products)',
    basicTurnaround: '4–6 Days',
    basicDeliverables: [
      'Up to 25 Products + Responsive Mobile Storefront UI',
      'UPI / Razorpay Standard Checkout & WhatsApp Order Button',
      'Basic Admin Product Manager, Free SSL & 0.3s Fast Load Setup',
    ],
    standardSub: 'Full custom D2C e-commerce store with Razorpay/Stripe, cart, and product SEO (Up to 200 products)',
    standardTurnaround: '7–10 Days',
    standardDeliverables: [
      'Up to 200 Products + Bespoke Brand UI/UX & 99+ Core Web Vitals',
      'Full Cart, Coupon Codes, Razorpay / Stripe / UPI Automated Checkout',
      'Admin Order & Inventory Dashboard + Schema.org Product Rich Snippets',
      'Automated Customer Email/WhatsApp Order Confirmation Alerts',
    ],
    premiumSub: 'Enterprise high-volume custom storefront with ERP/shipping sync & unlimited products',
    premiumTurnaround: '12–16 Days',
    premiumDeliverables: [
      'Unlimited Products, Dynamic Filters, Wishlist & Multi-Currency Checkout',
      'Shiprocket / Delhivery Automated Courier & GST Invoice Generation',
      'Custom CRM/ERP Sync, Advanced AI-SEO Product Graphs & Edge CDN',
      'Unlimited UI/UX Revisions + 24/7 Priority CTO Engineering Support',
    ],
  },
  'srv-responsive-wordpress': {
    basicRatio: 0.62,
    premiumRatio: 1.62,
    basicSub: 'Clean 3-page responsive WordPress starter site for personal brands & local shops',
    basicTurnaround: '2–3 Days',
    basicDeliverables: [
      'Up to 3 Responsive Pages (Home, About, Contact) with CMS Editor',
      'Mobile-Friendly Layout, Contact Form & WhatsApp Floating Button',
      'Basic Speed Caching, SSL Setup & Foundational Meta Tags',
    ],
    standardSub: 'Custom-styled 6–8 page business WordPress site with speed & security hardening',
    standardTurnaround: '4–6 Days',
    standardDeliverables: [
      '6 to 8 Custom Styled Responsive Pages & Easy Drag-and-Drop Admin',
      'Lightweight 95+ PageSpeed Optimization & Firewall Security Hardening',
      'Smart Lead Capture Forms, Blog Module, Google Maps & On-Page SEO',
      '2–3 Dedicated Design Revisions & Admin Training Walkthrough',
    ],
    premiumSub: '15+ page corporate WordPress portal with custom post types, multilingual & AI-SEO',
    premiumTurnaround: '7–10 Days',
    premiumDeliverables: [
      '15+ Custom Pages, Dynamic Custom Post Types & ACF Pro Architecture',
      'Sub-Second Cloudflare CDN Caching, Automated Daily Backups & Malware Shield',
      'Complete Schema.org Sitelinks, CRM Webhook Integration & Custom Graphics',
      'Unlimited Design Revisions + Priority Technical Support SLA',
    ],
  },
  'srv-php-cms-dev': {
    basicRatio: 0.62,
    premiumRatio: 1.65,
    basicSub: 'Essential dynamic PHP/MySQL website with basic admin content panel',
    basicTurnaround: '4–5 Days',
    basicDeliverables: [
      'Dynamic PHP Website (Up to 5 Modules) + Structured MySQL Database',
      'Secure Admin Login to Edit Text, Images & Enquiries',
      'Responsive Frontend Layout, SSL & Form Validation',
    ],
    standardSub: 'Custom PHP/Laravel CMS application with role-based admin & fast SQL queries',
    standardTurnaround: '6–9 Days',
    standardDeliverables: [
      'Custom PHP / Laravel Backend + Indexed Relational MySQL Schema',
      'Role-Based Admin CMS, Dynamic Content Modules & CSV/PDF Export',
      'Automated Database Backups, CSRF/SQLi Security & 0.3s Page Rendering',
      '3 Dedicated Revisions & Postman API Documentation',
    ],
    premiumSub: 'Enterprise multi-role PHP/Laravel platform with REST APIs, queues & high concurrency',
    premiumTurnaround: '10–14 Days',
    premiumDeliverables: [
      'Full-Scale Multi-Role PHP/Laravel Architecture with Redis Caching',
      'Custom Reporting Dashboards, Payment Gateways & Third-Party API Sync',
      'Automated Cron Workflows, Audit Logs & High-Concurrency Load Balancing',
      'Unlimited Revisions + 24/7 Priority Engineering SLA',
    ],
  },
  'srv-web-portal-api': {
    basicRatio: 0.63,
    premiumRatio: 1.68,
    basicSub: 'Single-workflow client login portal or single third-party REST API integration',
    basicTurnaround: '5–7 Days',
    basicDeliverables: [
      'Secure User Authentication Portal or 1 External REST API Integration',
      'Clean Responsive Dashboard View with Status Tracking',
      'Encrypted Token Handling, Error Logging & Production Deployment',
    ],
    standardSub: 'Full B2B customer/employee web portal with analytics dashboard & multi-API sync',
    standardTurnaround: '10–14 Days',
    standardDeliverables: [
      'Custom Client & Admin Web Portal with Interactive Analytics Charts',
      'Up to 3 REST/GraphQL API Integrations (Payment, Shipping, WhatsApp, CRM)',
      'Role-Based Access Control (RBAC), Document Uploads & PDF Receipts',
      '3 Dedicated Engineering Revisions & Load-Tested Architecture',
    ],
    premiumSub: 'Enterprise SaaS portal & custom middleware engine with unlimited API webhooks',
    premiumTurnaround: '15–21 Days',
    premiumDeliverables: [
      'Multi-Tenant SaaS / Enterprise Portal with Real-Time WebSockets',
      'Unlimited Custom REST/GraphQL Endpoints, ERP/Tally Sync & Webhooks',
      'End-to-End Encryption, Automated Failover & High-Throughput Database',
      'Unlimited Revisions + Direct CTO Architecture Support',
    ],
  },
  'srv-landing-news-site': {
    basicRatio: 0.6,
    premiumRatio: 1.65,
    basicSub: 'Fast single-scroll conversion landing page for ads, events, or personal portfolio',
    basicTurnaround: '2–3 Days',
    basicDeliverables: [
      '1 High-Converting Responsive Landing Page with 0.3s Load Speed',
      'Direct WhatsApp Lead Button, Call CTA & Enquiry Form',
      'Meta Pixel / Google Ads Tag Ready + Mobile Speed Optimization',
    ],
    standardSub: 'Custom multi-section ad landing funnel or automated digital news/media portal',
    standardTurnaround: '3–5 Days',
    standardDeliverables: [
      'Custom Conversion Landing Funnel OR Multi-Category News Website Grid',
      'Publisher CMS for Breaking News, Author Profiles, RSS & AdSense Slots',
      'NewsArticle / WebPage JSON-LD Schema for Google News Discovery',
      '2–3 Dedicated UI Revisions & 99+ Google PageSpeed Score',
    ],
    premiumSub: 'High-traffic digital media house portal with e-Paper PDF, live tickers & reporter roles',
    premiumTurnaround: '7–10 Days',
    premiumDeliverables: [
      'Complete Media Portal with Multi-Reporter Login, Approval Workflow & Live Ticker',
      'Daily e-Paper PDF Magazine Module, Video News Reels & Push Notifications',
      'High-Traffic CDN Caching, Ad Manager Slots & Google Publisher Center Setup',
      'Unlimited UI Revisions + Priority Newsroom Technical Support',
    ],
  },
  'srv-multivendor-ecommerce': {
    basicRatio: 0.65,
    premiumRatio: 1.65,
    basicSub: 'Starter multi-seller store with vendor registration & manual payout ledger',
    basicTurnaround: '10–12 Days',
    basicDeliverables: [
      'Multi-Seller Storefront (Up to 20 Vendors) & Seller Product Upload Panel',
      'Customer Cart, UPI/Card Checkout & Central Admin Commission Tracker',
      'Mobile-First Storefront with Category Search & Order Notifications',
    ],
    standardSub: 'Full turnkey marketplace with seller dashboards, split commissions & GST billing',
    standardTurnaround: '14–21 Days',
    standardDeliverables: [
      'Unlimited Vendors, Dedicated Seller Dashboards & Custom Commission Rules',
      'Automated Split Settlements (Razorpay Route / Stripe) & GST Invoices',
      'Customer Order Tracking, Verified Reviews, Coupons & Return Management',
      '3 Dedicated Design Revisions + 99+ Speed Frontend Architecture',
    ],
    premiumSub: 'Enterprise Amazon/Flipkart-style marketplace with delivery app API & live analytics',
    premiumTurnaround: '21–30 Days',
    premiumDeliverables: [
      'Full Marketplace Ecosystem + Warehouse/Courier API & Hyperlocal Pin-Code Routing',
      'Advanced Seller KYC Verification, Promotional Ad Slots & Bulk Excel Upload',
      'Mobile PWA App Experience, AI Product Recommendations & High-Scale Cloud CDN',
      'Unlimited Revisions + 24/7 Priority CTO Engineering Support',
    ],
  },
  'srv-android-ios-app': {
    basicRatio: 0.63,
    premiumRatio: 1.65,
    basicSub: 'MVP Android application with up to 5 core screens, login & cloud database',
    basicTurnaround: '8–12 Days',
    basicDeliverables: [
      'Android Native/Hybrid App (Up to 5 Screens) with Clean Material UI',
      'Email/OTP User Login, Cloud Database Sync & Push Notifications',
      'Signed Production APK/AAB Bundle Ready for Google Play Store',
    ],
    standardSub: 'Complete Android & iOS mobile app with 60fps UI, payments & admin dashboard',
    standardTurnaround: '14–21 Days',
    standardDeliverables: [
      'Android & iOS Mobile App (Up to 12 Custom Screens) at Smooth 60fps',
      'Secure Cloud API Backend, OTP Auth, Push Alerts & UPI/Razorpay Payments',
      'Web-Based Admin Control Panel + Play Store & App Store Submission',
      '3 Dedicated UI/UX Revisions & 30-Day Post-Launch Warranty',
    ],
    premiumSub: 'Enterprise full-scale Android + iOS ecosystem with real-time chat, geolocation & scale',
    premiumTurnaround: '21–30 Days',
    premiumDeliverables: [
      'Unlimited Custom Screens, Real-Time WebSockets, Live GPS/Maps & Offline Mode',
      'Advanced Role-Based Admin Suite, Analytics, Biometric Auth & Automated CI/CD',
      'High-Concurrency Cloud Infrastructure + Complete ASO Launch Kit',
      'Unlimited Revisions + 24/7 Direct CTO Engineering SLA',
    ],
  },
  'srv-cross-platform-flutter-rn': {
    basicRatio: 0.64,
    premiumRatio: 1.65,
    basicSub: 'Starter cross-platform Flutter/React Native app for rapid startup MVP launch',
    basicTurnaround: '7–10 Days',
    basicDeliverables: [
      'Single Flutter / React Native Codebase (Up to 5 Screens) for Android & iOS',
      'REST API Data Binding, User Authentication & Responsive Layouts',
      'Production Build Files + Basic Admin Management Panel',
    ],
    standardSub: 'Full-featured Flutter/React Native app with hardware APIs, offline sync & store launch',
    standardTurnaround: '12–18 Days',
    standardDeliverables: [
      'Up to 10–12 Custom Screens with 60fps Animations for Android & iOS',
      'Offline Local Storage Sync, Camera/GPS Access, Push Notifications & UPI Payment',
      'Full Web Admin Dashboard + Google Play & Apple App Store Ready Bundles',
      '3 Dedicated Design Revisions & Performance Profiling',
    ],
    premiumSub: 'Enterprise cross-platform super-app with custom native bridges & real-time sync',
    premiumTurnaround: '18–25 Days',
    premiumDeliverables: [
      'Complex Multi-Module Flutter/RN Architecture with Custom Native Plugins',
      'Real-Time Chat/Video, Background Location Tracking & Multi-Language Support',
      'Automated Cloud Scaling, Crashlytics Telemetry & Full Store Publishing',
      'Unlimited Revisions + 24/7 Priority Engineering Support',
    ],
  },
  'srv-2d-3d-mobile-game': {
    basicRatio: 0.6,
    premiumRatio: 1.68,
    basicSub: 'Casual 2D arcade, puzzle, or hyper-casual mobile game with score leaderboard',
    basicTurnaround: '10–14 Days',
    basicDeliverables: [
      'Complete 2D Casual / Puzzle Mobile Game (Up to 5 Levels / Endless Mode)',
      'Smooth 60fps Touch Controls, Sound Effects & Local High-Score System',
      'Google AdMob Banner/Interstitial Ads + Play Store APK/AAB Build',
    ],
    standardSub: 'Full 2D/3D mobile game with multi-level progression, coins, shop & monetization',
    standardTurnaround: '15–25 Days',
    standardDeliverables: [
      'Custom 2D or 3D Game Mechanics, Physics, Custom Art & 15+ Levels',
      'In-Game Coin Economy, Character/Skin Shop & Global Cloud Leaderboards',
      'AdMob Rewarded Video Ads + In-App Purchases (IAP) & Store Publishing',
      '3 Dedicated Gameplay Balancing & Art Revisions',
    ],
    premiumSub: 'Multiplayer 2D/3D mobile & cross-platform game with real-time rooms, tournaments & wallet',
    premiumTurnaround: '25–35 Days',
    premiumDeliverables: [
      'Real-Time Multiplayer Matchmaking (Photon / WebSockets), Friends & Private Rooms',
      '3D Environments, Custom Shaders, Daily Tournaments & Anti-Cheat Server Logic',
      'Live-Ops Admin Dashboard to Control Rewards, Events & User Accounts',
      'Unlimited Revisions + Priority Game Studio Post-Launch Support',
    ],
  },
  'srv-html5-webgl-unity': {
    basicRatio: 0.62,
    premiumRatio: 1.65,
    basicSub: 'Instant-play 2D HTML5 browser mini-game or interactive spin/quiz brand campaign',
    basicTurnaround: '5–7 Days',
    basicDeliverables: [
      'Zero-Install HTML5 Canvas 2D Browser Game (Mobile & Desktop Touch)',
      'Brand Logo Integration, Sound Toggle & Score End-Screen CTA',
      'Lightweight Bundle Embeddable on Any Website or Landing Page',
    ],
    standardSub: 'Custom HTML5 / WebGL / Unity browser game with leaderboard API & lead capture',
    standardTurnaround: '10–15 Days',
    standardDeliverables: [
      'Custom HTML5 / WebGL / Unity Web Build with 60fps Asset Compression',
      'Live Leaderboard API, Player Registration & Promotional Coupon Rewards',
      'Full Cross-Browser Compatibility (iOS Safari, Android Chrome, Desktop)',
      '3 Dedicated Gameplay & Visual Polish Revisions',
    ],
    premiumSub: 'Immersive 3D WebGL product configurator, virtual showroom, or multiplayer web game',
    premiumTurnaround: '15–22 Days',
    premiumDeliverables: [
      'Interactive 3D WebGL / Three.js / Unity Scene with Custom Lighting & Physics',
      'Real-Time Multiplayer or Interactive 3D Product Customizer with Cart Sync',
      'CDN Asset Streaming for Sub-2s Initial Load + Analytics Event Tracking',
      'Unlimited Revisions + Direct Technical Architect Support',
    ],
  },
  'srv-pwa-custom-utilities': {
    basicRatio: 0.62,
    premiumRatio: 1.65,
    basicSub: 'Offline-capable installable PWA wrapper & fast browser utility (1 core tool)',
    basicTurnaround: '4–6 Days',
    basicDeliverables: [
      'Installable Progressive Web App (Manifest + Service Worker Offline Cache)',
      '1 Custom Client-Side Utility / Calculator with Instant Search & Export',
      'Add-to-Home-Screen Prompt for Android, iOS & Desktop',
    ],
    standardSub: 'Full custom business PWA utility (like Digi Sagun / WhatsApp Reader) with cloud sync',
    standardTurnaround: '7–10 Days',
    standardDeliverables: [
      'Multi-Screen Installable PWA with Offline IndexedDB + Cloud Database Sync',
      'Sub-100ms Instant Search, Filters, PDF/CSV Report Generation & WhatsApp Share',
      'User Login, Role Permissions & Zero App Store Commission Overhead',
      '3 Dedicated UI/UX & Workflow Revisions',
    ],
    premiumSub: 'Enterprise offline-first field operations PWA suite with background sync & analytics',
    premiumTurnaround: '12–16 Days',
    premiumDeliverables: [
      'Full Enterprise PWA Suite with Background Sync, Web Push Alerts & QR/Barcode Scanner',
      'Multi-Branch Admin Dashboard, Audit Logs & Automated Cloud Backups',
      'Custom API Integrations, Role Hierarchy & 99+ Lighthouse PWA Score',
      'Unlimited Revisions + 24/7 Priority Engineering Support',
    ],
  },
  'srv-app-store-publishing-aso': {
    basicRatio: 0.65,
    premiumRatio: 1.65,
    basicSub: 'Single store submission (Google Play Store OR Apple App Store) with compliance check',
    basicTurnaround: '1–2 Days',
    basicDeliverables: [
      'Signed Production AAB or IPA Upload to 1 App Store Account',
      'Data Safety Form, Privacy Policy URL & Content Rating Compliance',
      'Standard Store Listing Title, Description & Icon Upload',
    ],
    standardSub: 'Complete Google Play + Apple App Store publishing with custom screenshots & ASO',
    standardTurnaround: '2–4 Days',
    standardDeliverables: [
      'Both Google Play Store & Apple App Store Production Submissions',
      '5–8 High-Conversion Device Mockup Screenshots & Feature Graphic Design',
      'Keyword-Rich ASO Title, Short/Long Description & Reviewer Approval Handling',
      '2 Revisions on Store Graphics & Listing Copy',
    ],
    premiumSub: 'Full Dual-Store Launch + Promotional Preview Video, 30-Day ASO Rank Tracking & Fixes',
    premiumTurnaround: '4–6 Days',
    premiumDeliverables: [
      'Play Store + App Store Submission + 30-Second App Preview Promo Video',
      'Competitor Keyword Gap Research, Localization & A/B Store Listing Setup',
      'Code-Level Policy Rejection Fixes & 30-Day Post-Launch ASO Rank Monitoring',
      'Unlimited Listing Revisions Until 100% Store Approval',
    ],
  },
  'srv-seo-optimization': {
    basicRatio: 0.6,
    premiumRatio: 1.65,
    basicSub: 'Foundational On-Page SEO for up to 5 pages & 10 target keywords',
    basicTurnaround: 'Monthly Starter SLA',
    basicDeliverables: [
      'Up to 5 Pages On-Page SEO (Meta Titles, Descriptions, H1–H3 & Alt Tags)',
      '10 Target Keywords Tracking + XML Sitemap & Google Search Console Setup',
      'Monthly Keyword Rank & Traffic Summary Report',
    ],
    standardSub: 'Complete Technical + On-Page + Off-Page SEO for Page 1 Google rankings (25 keywords)',
    standardTurnaround: 'Monthly Growth SLA',
    standardDeliverables: [
      'Up to 15 Pages Technical & On-Page SEO + 25 High-Intent Target Keywords',
      'Core Web Vitals Speed Fixes, Internal Linking & Broken Link Remediation',
      'High-Authority Backlink Building, 2 SEO Blog Posts/mo & Monthly ROI Report',
      'Dedicated SEO Strategist Review & Competitor Tracking',
    ],
    premiumSub: 'National / Global Enterprise SEO dominance for 60+ keywords & e-commerce catalogs',
    premiumTurnaround: 'Monthly Enterprise SLA',
    premiumDeliverables: [
      'Unlimited Pages / E-Commerce Catalog SEO + 60+ High-Volume Keywords',
      '4 In-Depth Authority Articles/mo, Digital PR Backlinks & Conversion Rate Optimization',
      'Full Schema.org Graph, AI-Search Optimization & Bi-Weekly Strategy Calls',
      'Priority 24/7 SEO & Engineering Support',
    ],
  },
  'srv-ai-seo-schema': {
    basicRatio: 0.62,
    premiumRatio: 1.65,
    basicSub: 'Core Organization & WebSite JSON-LD schema setup for clean brand indexing',
    basicTurnaround: '3–5 Days / Monthly',
    basicDeliverables: [
      'Validated Organization, WebSite & BreadcrumbList JSON-LD Schema Setup',
      'Canonical URL Hygiene, Robots.txt & LLMs.txt AI Crawler Configuration',
      'Google Rich Results Test Validation with Zero Syntax Errors',
    ],
    standardSub: 'Full Google SERP Sitelinks & AI Overview citation engine (ChatGPT / Perplexity / Gemini)',
    standardTurnaround: 'Monthly AI-SEO SLA',
    standardDeliverables: [
      'Interconnected Organization, WebSite, Service, Product & FAQPage JSON-LD Graphs',
      'Google Rich Sitelinks Architecture (About, Services, Pricing, Contact, Tools)',
      'AI Search Citation Optimization for Google AI Overviews, ChatGPT & Perplexity',
      'Monthly Entity Authority Auditing & Structured Data Updates',
    ],
    premiumSub: 'Enterprise Knowledge Graph engineering, multi-location schema & programmatic AI-SEO',
    premiumTurnaround: 'Monthly Enterprise AI-SEO',
    premiumDeliverables: [
      'Full Knowledge Panel Entity Signals, SameAs Authority Graph & Programmatic Schema',
      'Direct Answer-Box Formatting Across All Service & Product Landing Pages',
      'Continuous AI Prompt Visibility Tracking (ChatGPT, Claude, Gemini, Perplexity)',
      'Unlimited Schema Adjustments + Direct CEO/CTO Search Strategy Desk',
    ],
  },
  'srv-gmb-local-seo': {
    basicRatio: 0.6,
    premiumRatio: 1.67,
    basicSub: 'Google Business Profile setup, category optimization & map pin accuracy',
    basicTurnaround: '2–3 Days',
    basicDeliverables: [
      'Google My Business (GBP) Profile Setup / Claiming & Primary Category Selection',
      'Accurate Address, Service Area, Business Hours & Website Link Configuration',
      '5 Geo-Tagged Business Photos & Custom Review Request Link',
    ],
    standardSub: 'Complete Top 3 Google Maps Local Pack optimization with citations & LocalBusiness schema',
    standardTurnaround: '3–5 Days',
    standardDeliverables: [
      'Full GMB Profile Optimization, Secondary Categories, Services & Product Catalog',
      '15+ Local Directory Citations with 100% NAP (Name, Address, Phone) Consistency',
      'Geo-Tagged Media Upload, Q&A Seeding & LocalBusiness Website JSON-LD Schema',
      'Review Growth Playbook & 30-Day Local Pack Rank Tracking',
    ],
    premiumSub: 'Multi-location / City-Wide GMB dominance with weekly GMB posts & spam competitor fighting',
    premiumTurnaround: '5–7 Days + 60-Day Boost',
    premiumDeliverables: [
      'Complete Local Pack Dominance Setup + 8 Promotional GMB Offer/Update Posts',
      '40+ High-Authority Local & Industry Citations + Competitor Map Grid Audit',
      'Automated WhatsApp Review Funnel Template & Localized Landing Page Copy',
      'Priority Support Until Top 3 Local Map Pack Visibility',
    ],
  },
  'srv-instagram-facebook-ads': {
    basicRatio: 0.64,
    premiumRatio: 1.65,
    basicSub: 'Starter Meta Lead Generation campaign (1 campaign + 3 ad creatives)',
    basicTurnaround: 'Monthly Starter Ads',
    basicDeliverables: [
      '1 Targeted Instagram & Facebook Lead / WhatsApp Ad Campaign Setup',
      '3 Custom High-Converting Ad Graphics & Ad Copy Variations',
      'Basic Audience Targeting & Monthly Cost-Per-Lead Summary',
    ],
    standardSub: 'Full-funnel Meta Ads + retargeting + Pixel/Conversion API for maximum ROAS',
    standardTurnaround: 'Monthly Campaign Mgmt',
    standardDeliverables: [
      'Up to 3 Active Campaigns (Prospecting, Retargeting & WhatsApp/Lead Forms)',
      'Meta Pixel + Server-Side Conversion API (CAPI) & Custom Lookalike Audiences',
      '6–8 Ad Creatives (Reels/Carousels/Statics), A/B Testing & Weekly ROAS Reports',
      'Dedicated Performance Marketer Optimization',
    ],
    premiumSub: 'High-scale D2C / Enterprise Meta + Google Ads omnichannel performance engine',
    premiumTurnaround: 'Monthly Scale Engine',
    premiumDeliverables: [
      'Unlimited Campaign Funnels, Dynamic Product Catalog Ads (DPA) & Video Ad Scripts',
      'Daily Bid & Budget Scaling, Landing Page CRO Audits & CRM Lead Sync',
      '15+ Monthly Ad Creatives + Bi-Weekly Strategy Calls with Leadership',
      '24/7 Priority Campaign Monitoring & Support',
    ],
  },
  'srv-smo-social-media': {
    basicRatio: 0.62,
    premiumRatio: 1.65,
    basicSub: '8 custom branded social media posts per month for Instagram & Facebook',
    basicTurnaround: 'Monthly Starter Calendar',
    basicDeliverables: [
      '8 Custom Branded Graphic Posts Per Month (2 Posts / Week)',
      'Profile Bio Revamp, Captions & Targeted Hashtag Research',
      'Scheduled Publishing on Instagram & Facebook Pages',
    ],
    standardSub: '15 custom posts/carousels + reels editing across Instagram, Facebook & LinkedIn',
    standardTurnaround: 'Monthly Content Calendar',
    standardDeliverables: [
      '12–15 Custom Branded Social Posts & Educational Carousels Per Month',
      '2 Short Promotional Reels / Motion Posts + Story Highlight Covers',
      'Cross-Platform Publishing (Instagram, Facebook, LinkedIn, X) & Monthly Analytics',
      '2 Revisions Per Monthly Content Batch',
    ],
    premiumSub: 'Daily omnichannel brand studio: 25+ posts, 8 Reels/Shorts, community & festival kits',
    premiumTurnaround: 'Monthly Full Brand Studio',
    premiumDeliverables: [
      '25+ Custom Posts, Carousels & Festival Creatives + 8 Edited Reels/Shorts Per Month',
      'Complete Content Strategy, Trend Hijacking, Comment/DM Automation Setup',
      'LinkedIn Founder Ghostwriting Posts & Monthly Follower/Reach Growth Audit',
      'Unlimited Creative Revisions + Dedicated Brand Manager',
    ],
  },
  'srv-content-writing': {
    basicRatio: 0.6,
    premiumRatio: 1.65,
    basicSub: 'Up to 3 pages of website copy OR 2 SEO blog articles (1,000 words each)',
    basicTurnaround: '2 Days',
    basicDeliverables: [
      'Up to 3 Core Website Pages Copy OR 2 Research-Backed SEO Blog Posts',
      '100% Original, Plagiarism-Free Human Writing with Clear CTAs',
      '1 Round of Editing & Proofreading Included',
    ],
    standardSub: 'Up to 6 pages of conversion website copy OR 5 long-form SEO articles',
    standardTurnaround: '2–4 Days',
    standardDeliverables: [
      'Up to 6 Pages of High-Conversion Website Copy OR 5 SEO Articles (1,200+ words)',
      'Search-Intent Keyword Integration, H1–H3 Structuring & Meta Descriptions',
      'Brand Tone-of-Voice Alignment & 2 Dedicated Revision Rounds',
    ],
    premiumSub: 'Complete 12+ page brand copybook, company profile script & 10 authority articles',
    premiumTurnaround: '5–7 Days',
    premiumDeliverables: [
      '12+ Pages of Full Website & Landing Funnel Copy + 10 Pillar SEO Articles',
      'Competitor Messaging Matrix, Sales Pitch Scripts & FAQ Schema Copy',
      'Unlimited Edits Until 100% Sign-Off + Priority Delivery',
    ],
  },
  'srv-logo-designing': {
    basicRatio: 0.6,
    premiumRatio: 1.75,
    basicSub: '2 custom logo concepts with high-res PNG, JPG & transparent files',
    basicTurnaround: '1–2 Days',
    basicDeliverables: [
      '2 Original Custom Logo Concepts + 1 Revision Round',
      'High-Resolution Transparent PNG, JPG & Website Favicon',
      '100% Commercial Ownership Rights',
    ],
    standardSub: '3 custom vector logo concepts, master source files (SVG/AI) & brand color sheet',
    standardTurnaround: '2–3 Days',
    standardDeliverables: [
      '3 Distinct Custom Logo Concepts + 3 Dedicated Revision Rounds',
      'Full Vector Master Files (SVG, AI, EPS, PDF, High-Res PNG & Favicon)',
      'Brand Color Palette (HEX/RGB/CMYK) & Typography Pairing Guide',
      'Social Media Profile DP & Cover Sized Exports',
    ],
    premiumSub: '5 luxury brand concepts, complete brand book, business card, letterhead & social kit',
    premiumTurnaround: '4–5 Days',
    premiumDeliverables: [
      '5 Bespoke Logo Concepts + Unlimited Revisions by Senior Brand Designer',
      'Complete 12-Page Brand Identity Guidelines Book + 3D Mockup Presentations',
      'Print-Ready Business Card, Letterhead, Envelope & Social Media Brand Kit',
      'All Master Vector & Print Formats + Trademark-Ready Originality Guarantee',
    ],
  },
  'srv-pdf-brochure-design': {
    basicRatio: 0.6,
    premiumRatio: 1.68,
    basicSub: '2-to-4 page bi-fold/tri-fold digital & print brochure design',
    basicTurnaround: '2 Days',
    basicDeliverables: [
      'Up to 4 Pages (Bi-Fold or Tri-Fold) Custom Brochure / Flyer Layout',
      'Print-Ready CMYK PDF + WhatsApp-Friendly Compressed Web PDF',
      '2 Revision Rounds Included',
    ],
    standardSub: '8-to-12 page corporate profile, product catalog, or investor pitch deck',
    standardTurnaround: '2–4 Days',
    standardDeliverables: [
      '8 to 12 Custom Designed Pages with Infographics, Icons & Product Grids',
      'Interactive Clickable Links (WhatsApp, Website, Email, Phone) in Digital PDF',
      'Print-Ready 300 DPI CMYK PDF + Editable Source File + 3 Revisions',
    ],
    premiumSub: '20–30 page comprehensive product master catalog or fundraising pitch deck + copywriting',
    premiumTurnaround: '5–7 Days',
    premiumDeliverables: [
      '20 to 30 Pages Executive Catalog / Investor Deck with Custom Copywriting',
      'Custom Data Charts, 3D Product Callouts & Interactive HTML5 Flipbook Link',
      'Unlimited Design Revisions + Editable Figma / Illustrator / Canva Master Files',
    ],
  },
  'srv-animated-explainer-video': {
    basicRatio: 0.64,
    premiumRatio: 1.65,
    basicSub: '30-second 2D motion promo / Instagram Reel video with kinetic typography & music',
    basicTurnaround: '3–4 Days',
    basicDeliverables: [
      '30-Second 1080p Full-HD Promotional Motion Video',
      'On-Screen Kinetic Typography, Product Highlights & Licensed Background Music',
      'Optimized in Both 16:9 (YouTube/Web) and 9:16 (Instagram Reels/Shorts)',
    ],
    standardSub: '60-second custom 2D animated explainer video with script, voiceover & SFX',
    standardTurnaround: '5–7 Days',
    standardDeliverables: [
      '60-Second Custom Storyboard, Conversion Script & 1080p/4K 2D Animation',
      'Professional Studio Voiceover (Hindi or English) & Custom Sound Design',
      'Delivered in Website Hero, YouTube & WhatsApp/Reels Formats + 2 Revisions',
    ],
    premiumSub: '90–120 second flagship 2D/3D product film with dual-language voiceover & source project',
    premiumTurnaround: '8–12 Days',
    premiumDeliverables: [
      '90 to 120 Seconds Premium 2D/3D Motion & UI Walkthrough Commercial',
      'Dual-Language Voiceover (Both Hindi & English Versions) + Subtitles',
      '3 Short 15-Second Ad Cutdowns for Meta/YouTube Ads + Unlimited Script/Visual Edits',
    ],
  },
  'srv-ui-ux-branding': {
    basicRatio: 0.6,
    premiumRatio: 1.67,
    basicSub: 'Up to 5 key screens in Figma (Landing Page or App MVP wireframe + high-fi UI)',
    basicTurnaround: '2–3 Days',
    basicDeliverables: [
      'Up to 5 High-Fidelity Desktop & Mobile Screens in Figma',
      'Color & Typography Style Guide + Auto-Layout Responsive Frames',
      'Developer Inspect Link & SVG/PNG Asset Exports',
    ],
    standardSub: '12–15 custom screens in Figma with interactive clickable prototype & component library',
    standardTurnaround: '4–6 Days',
    standardDeliverables: [
      '12 to 15 High-Fidelity Desktop & Mobile Screens in Figma',
      'Reusable UI Component Library, Design Tokens & Interactive Clickable Prototype',
      'User Journey Mapping, Developer Handoff Specs & 3 Dedicated Revisions',
    ],
    premiumSub: '30+ screen full enterprise SaaS / Mobile App design system with dark/light modes',
    premiumTurnaround: '7–12 Days',
    premiumDeliverables: [
      '30+ Custom Screens Across Web, Android & iOS with Light + Dark Mode Tokens',
      'Complete Atomic Design System, Micro-Interaction Specs & Usability Audit',
      'Unlimited Figma Revisions + Direct Walkthrough with Your Engineering Team',
    ],
  },
  'srv-gst-trademark-reg': {
    basicRatio: 0.6,
    premiumRatio: 1.8,
    basicSub: 'Complete GST Registration filing & ARN tracking (or MSME Udyam + GST kit)',
    basicTurnaround: '2–3 Days Filing',
    basicDeliverables: [
      'Complete GST Registration Application Preparation & Portal Filing',
      'Document Verification, HSN/SAC Code Selection & ARN Tracking',
      'Official GSTIN Certificate Delivery + Digital Invoicing Format',
    ],
    standardSub: 'Brand Name / Logo Trademark Filing (TM-A) OR Combined GST + MSME Compliance Kit',
    standardTurnaround: '2–4 Days Filing',
    standardDeliverables: [
      'Comprehensive Trademark Availability Search & Nice Class Selection',
      'TM-A Application Filing for Brand Name / Logo (™ Symbol Usage in 24 Hours)',
      'Complete GST Registration + MSME Udyam Certificate for 50% Govt Fee Rebate',
      'Dedicated Compliance Specialist Guidance Until Certificate Issuance',
    ],
    premiumSub: 'Complete Brand Protection Suite: GST + Trademark Filing + Copyright/Objection Shield',
    premiumTurnaround: '3–5 Days Priority',
    premiumDeliverables: [
      'Combined GST Registration + Brand Name & Logo Trademark Filing + MSME Udyam',
      'Drafting of User Affidavit, Board Resolution & Examination Reply Support',
      '1-Year Trademark Status Monitoring + Zero-Hassle Priority Legal Desk',
    ],
  },
  'srv-iso-company-reg': {
    basicRatio: 0.6,
    premiumRatio: 1.7,
    basicSub: 'MSME Udyam + Shop Establishment + Startup India / Partnership Compliance Setup',
    basicTurnaround: '2–4 Days',
    basicDeliverables: [
      'MSME Udyam Registration + Business PAN/TAN Application Guidance',
      'Quality Policy Documentation & Official Digital Certificates',
      'Bank Current Account Opening Document Checklist',
    ],
    standardSub: 'ISO 9001:2015 Quality Certification + LLP / OPC / Startup Incorporation Filing',
    standardTurnaround: '5–10 Days',
    standardDeliverables: [
      'Accredited ISO 9001:2015 Quality Management Certificate with Online Verification',
      'Company Incorporation Filing (OPC / LLP / Pvt Ltd Name Approval + Spice+ Prep)',
      '2 Digital Signature Certificates (DSC), DIN, PAN & TAN Allotment',
      'Dedicated CA/CS Compliance Desk Support',
    ],
    premiumSub: 'Turnkey Private Limited Incorporation + ISO 9001 + GST + MSME + Startup Kit',
    premiumTurnaround: '7–12 Days Turnkey',
    premiumDeliverables: [
      'Complete Pvt Ltd / LLP Incorporation (MOA, AOA, COI, PAN, TAN & 2 DSCs)',
      'ISO 9001:2015 Certification + GST Registration + MSME Udyam Registration',
      'First Board Meeting Documentation, Share Certificates & Compliance Calendar',
      'Priority End-to-End Legal + Digital Launch Support',
    ],
  },
};

function roundCleanInr(val: number): number {
  if (val <= 1500) {
    return Math.max(799, Math.round(val / 100) * 100 - 1);
  }
  return Math.round(val / 500) * 500 - 1;
}

function roundCleanMarketInr(val: number): number {
  return Math.round(val / 100) * 100;
}

function roundCleanUsd(val: number): number {
  return Math.max(15, Math.round(val));
}

/**
 * Generates the 3 pricing tiers (Basic, Standard, Premium) for any ServicePricingItem.
 * - `standard` matches the core service rate in `INDIVIDUAL_SERVICE_PRICING`
 * - `basic` is the lowest-cost starter package (~38–40% lower than Standard, still 30% below market)
 * - `premium` is the max enterprise package (~65–70% higher than Standard, with full enterprise scope)
 */
export function buildTiersForServiceItem(
  item: ServicePricingItem
): Record<ServiceTierId, ServiceTierPackage> {
  const spec = SERVICE_TIER_SPECS[item.id];
  const basicRatio = spec?.basicRatio ?? 0.62;
  const premiumRatio = spec?.premiumRatio ?? 1.65;

  const basicInr = roundCleanInr(item.kexoraPriceInr * basicRatio);
  const basicMarketInr = roundCleanMarketInr(item.marketPriceInr * basicRatio);
  const basicUsd = roundCleanUsd(item.kexoraPriceUsd * basicRatio);
  const basicMarketUsd = roundCleanUsd(item.marketPriceUsd * basicRatio);

  const premiumInr = roundCleanInr(item.kexoraPriceInr * premiumRatio);
  const premiumMarketInr = roundCleanMarketInr(item.marketPriceInr * premiumRatio);
  const premiumUsd = roundCleanUsd(item.kexoraPriceUsd * premiumRatio);
  const premiumMarketUsd = roundCleanUsd(item.marketPriceUsd * premiumRatio);

  return {
    basic: {
      tierId: 'basic',
      tierLabel: 'Basic',
      tierBadge: 'Sabse Sasta · Starter Scope',
      subtitle:
        spec?.basicSub ||
        `Essential starter package for ${item.title} with core deliverables.`,
      kexoraPriceInr: basicInr,
      marketPriceInr: basicMarketInr,
      kexoraPriceUsd: basicUsd,
      marketPriceUsd: basicMarketUsd,
      turnaround: spec?.basicTurnaround || item.turnaround,
      revisions: '1 Dedicated Revision Round',
      support: 'Email & Ticket Support SLA',
      deliverables: spec?.basicDeliverables || item.deliverables.slice(0, 2),
    },
    standard: {
      tierId: 'standard',
      tierLabel: 'Standard',
      tierBadge: 'Most Popular · Recommended',
      subtitle: spec?.standardSub || item.shortDesc,
      kexoraPriceInr: item.kexoraPriceInr,
      marketPriceInr: item.marketPriceInr,
      kexoraPriceUsd: item.kexoraPriceUsd,
      marketPriceUsd: item.marketPriceUsd,
      turnaround: spec?.standardTurnaround || item.turnaround,
      revisions: '2–3 Dedicated Revisions',
      support: 'Priority Phone & WhatsApp Support',
      deliverables: spec?.standardDeliverables || item.deliverables,
      popular: true,
    },
    premium: {
      tierId: 'premium',
      tierLabel: 'Premium',
      tierBadge: 'Max Scope · Enterprise SLA',
      subtitle:
        spec?.premiumSub ||
        `Full-scale enterprise ${item.title} with maximum deliverables and priority support.`,
      kexoraPriceInr: premiumInr,
      marketPriceInr: premiumMarketInr,
      kexoraPriceUsd: premiumUsd,
      marketPriceUsd: premiumMarketUsd,
      turnaround: spec?.premiumTurnaround || item.turnaround,
      revisions: 'Unlimited Design & Code Revisions',
      support: '24/7 Priority CTO/CEO Direct Support',
      deliverables:
        spec?.premiumDeliverables || [
          ...item.deliverables,
          'Unlimited Revisions & 24/7 Priority Engineering SLA',
        ],
    },
  };
}

/**
 * Maps any service ID, service title, or pillar title to its matching `ServicePricingItem`.
 */
export function findServicePricingItem(
  serviceIdOrTitle: string
): ServicePricingItem {
  const clean = (serviceIdOrTitle || '').trim();
  const lower = clean.toLowerCase();

  // 1. Direct ID match
  const byId = INDIVIDUAL_SERVICE_PRICING.find((s) => s.id === clean);
  if (byId) return byId;

  // 2. Strip any trailing tier suffix like " — Basic Tier" or " (Standard)"
  const baseTitle = lower
    .replace(/\s*[—–-]\s*(basic|standard|premium)(\s*tier|\s*plan|\s*package)?.*$/i, '')
    .replace(/\s*\((basic|standard|premium)[^)]*\).*$/i, '')
    .trim();

  // 3. Exact title match
  const exactTitle = INDIVIDUAL_SERVICE_PRICING.find(
    (s) => s.title.toLowerCase() === baseTitle || s.title.toLowerCase() === lower
  );
  if (exactTitle) return exactTitle;

  // 4. Map main studio pillars / 6 core solutions to their flagship service
  if (
    baseTitle.includes('multi-vendor') ||
    baseTitle.includes('multivendor')
  ) {
    return INDIVIDUAL_SERVICE_PRICING[5]; // srv-multivendor-ecommerce
  }
  if (
    baseTitle.includes('web design & custom') ||
    baseTitle.includes('web design & development') ||
    baseTitle.includes('ecommerce & custom web')
  ) {
    return INDIVIDUAL_SERVICE_PRICING[0]; // srv-ecommerce-custom-web
  }
  if (baseTitle.includes('wordpress') || baseTitle.includes('responsive')) {
    return INDIVIDUAL_SERVICE_PRICING[1];
  }
  if (baseTitle.includes('php') || baseTitle.includes('cms')) {
    return INDIVIDUAL_SERVICE_PRICING[2];
  }
  if (baseTitle.includes('portal') || baseTitle.includes('api')) {
    return INDIVIDUAL_SERVICE_PRICING[3];
  }
  if (
    baseTitle.includes('landing page') ||
    baseTitle.includes('portfolio') ||
    baseTitle.includes('news website')
  ) {
    return INDIVIDUAL_SERVICE_PRICING[4];
  }
  if (
    baseTitle.includes('mobile app & game') ||
    baseTitle.includes('app & game') ||
    baseTitle.includes('android & ios')
  ) {
    return INDIVIDUAL_SERVICE_PRICING[6]; // srv-android-ios-app
  }
  if (baseTitle.includes('flutter') || baseTitle.includes('react native') || baseTitle.includes('cross-platform')) {
    return INDIVIDUAL_SERVICE_PRICING[7];
  }
  if (baseTitle.includes('2d & 3d') || baseTitle.includes('mobile game')) {
    return INDIVIDUAL_SERVICE_PRICING[8];
  }
  if (baseTitle.includes('html5') || baseTitle.includes('webgl') || baseTitle.includes('unity')) {
    return INDIVIDUAL_SERVICE_PRICING[9];
  }
  if (baseTitle.includes('pwa') || baseTitle.includes('progressive web')) {
    return INDIVIDUAL_SERVICE_PRICING[10];
  }
  if (baseTitle.includes('app store') || baseTitle.includes('play store') || baseTitle.includes('aso')) {
    return INDIVIDUAL_SERVICE_PRICING[11];
  }
  if (baseTitle.includes('ai-seo') || baseTitle.includes('sitelink')) {
    return INDIVIDUAL_SERVICE_PRICING[13]; // srv-ai-seo-schema
  }
  if (baseTitle.includes('gmb') || baseTitle.includes('google my business') || baseTitle.includes('local seo')) {
    return INDIVIDUAL_SERVICE_PRICING[14];
  }
  if (baseTitle.includes('instagram') || baseTitle.includes('facebook')) {
    return INDIVIDUAL_SERVICE_PRICING[15];
  }
  if (baseTitle.includes('smo') || baseTitle.includes('social media')) {
    return INDIVIDUAL_SERVICE_PRICING[16];
  }
  if (baseTitle.includes('content writing') || baseTitle.includes('copywriting')) {
    return INDIVIDUAL_SERVICE_PRICING[17];
  }
  if (baseTitle.includes('seo') || baseTitle.includes('digital marketing')) {
    return INDIVIDUAL_SERVICE_PRICING[12]; // srv-seo-optimization
  }
  if (baseTitle.includes('brochure') || baseTitle.includes('pdf')) {
    return INDIVIDUAL_SERVICE_PRICING[19];
  }
  if (baseTitle.includes('video') || baseTitle.includes('explainer')) {
    return INDIVIDUAL_SERVICE_PRICING[20];
  }
  if (baseTitle.includes('ui/ux') || baseTitle.includes('figma')) {
    return INDIVIDUAL_SERVICE_PRICING[21];
  }
  if (baseTitle.includes('gst') || baseTitle.includes('trademark')) {
    return INDIVIDUAL_SERVICE_PRICING[22];
  }
  if (baseTitle.includes('iso') || baseTitle.includes('company registration')) {
    return INDIVIDUAL_SERVICE_PRICING[23];
  }
  if (
    baseTitle.includes('logo') ||
    baseTitle.includes('creative') ||
    baseTitle.includes('brand')
  ) {
    return INDIVIDUAL_SERVICE_PRICING[18]; // srv-logo-designing
  }

  // 5. Partial substring match
  const partial = INDIVIDUAL_SERVICE_PRICING.find(
    (s) =>
      baseTitle.includes(s.title.toLowerCase()) ||
      s.title.toLowerCase().includes(baseTitle)
  );
  return partial || INDIVIDUAL_SERVICE_PRICING[0];
}

/**
 * Returns the 3 tiers (`basic`, `standard`, `premium`) for any service ID or title.
 */
export function getServiceTiers(
  serviceIdOrTitle: string
): Record<ServiceTierId, ServiceTierPackage> {
  const item = findServicePricingItem(serviceIdOrTitle);
  return buildTiersForServiceItem(item);
}

/**
 * Detects which tier (`basic`, `standard`, `premium`) was requested in a string.
 */
export function detectTierFromText(
  text?: string,
  fallback: ServiceTierId = 'standard'
): ServiceTierId {
  const lower = (text || '').toLowerCase();
  if (
    lower.includes('basic') ||
    lower.includes('starter') ||
    lower.includes('sasta') ||
    lower.includes('beginner')
  ) {
    return 'basic';
  }
  if (
    lower.includes('premium') ||
    lower.includes('max') ||
    lower.includes('enterprise') ||
    lower.includes('expert')
  ) {
    return 'premium';
  }
  if (
    lower.includes('standard') ||
    lower.includes('middle') ||
    lower.includes('creative')
  ) {
    return 'standard';
  }
  return fallback;
}

/**
 * Builds the canonical tier option value for the Contact Form dropdown.
 */
export function formatTierOptionValue(tierId: ServiceTierId): string {
  switch (tierId) {
    case 'basic':
      return 'Basic Tier (Sabse Sasta · Essential Scope)';
    case 'standard':
      return 'Standard Tier (Middle · Most Popular Scope)';
    case 'premium':
      return 'Premium Tier (Max · Full Enterprise Scope)';
  }
}

/**
 * Formats a clean, structured quotation & enquiry brief for any selected service + tier/plan.
 */
export function buildQuotationForServiceTier(
  serviceIdOrTitle: string,
  tierOrPlanValue: string,
  currency: CurrencyCode = 'INR',
  quickTags: string[] = []
): StudioQuotation {
  const symbol = currency === 'INR' ? '₹' : '$';
  const serviceItem = findServicePricingItem(serviceIdOrTitle);
  const tiers = buildTiersForServiceItem(serviceItem);
  const lowerPlan = (tierOrPlanValue || '').toLowerCase();

  // Check if the user selected one of the 3 Monthly Retainer Studio Plans explicitly
  const matchedMonthlyPlan = PRICING_PLANS.find((p) =>
    lowerPlan.includes(p.name.toLowerCase())
  );

  const tagNote =
    quickTags.length > 0 ? `\n• Preferences: ${quickTags.join(', ')}` : '';

  if (matchedMonthlyPlan) {
    const monthly =
      currency === 'INR'
        ? matchedMonthlyPlan.monthlyPriceInr
        : matchedMonthlyPlan.monthlyPriceUsd;
    const marketMonthly =
      currency === 'INR'
        ? matchedMonthlyPlan.marketMonthlyPriceInr
        : matchedMonthlyPlan.marketMonthlyPriceUsd;
    const setup =
      currency === 'INR'
        ? matchedMonthlyPlan.setupFeeInr
        : matchedMonthlyPlan.setupFeeUsd;
    const marketSetup =
      currency === 'INR'
        ? matchedMonthlyPlan.marketSetupFeeInr
        : matchedMonthlyPlan.marketSetupFeeUsd;
    const savedSetup = marketSetup - setup;
    const savingsPercent = Math.round(
      ((marketMonthly - monthly) / marketMonthly) * 100
    );
    const quoteCode = `QT-KX-${serviceItem.index}-${matchedMonthlyPlan.id
      .split('-')[0]
      .toUpperCase()}`;

    const brief = [
      `Hi Kexora Engineering Desk,`,
      `Please share the formal project kickoff for the following Studio Quotation:`,
      `• Quotation Ref: ${quoteCode}`,
      `• Selected Service: ${serviceItem.title}`,
      `• Selected Retainer Plan: ${matchedMonthlyPlan.name} (${symbol}${monthly.toLocaleString()}/mo + ${symbol}${setup.toLocaleString()} one-time setup — Save ${symbol}${savedSetup.toLocaleString()} on setup)`,
      `• Delivery SLA: ${matchedMonthlyPlan.deliveryTimeline}${tagNote}`,
    ].join('\n');

    return {
      quotationCode: quoteCode,
      serviceId: serviceItem.id,
      serviceTitle: serviceItem.title,
      pillarName: serviceItem.pillarName,
      tierId: 'monthly-plan',
      tierLabel: matchedMonthlyPlan.name,
      tierBadge: matchedMonthlyPlan.popular
        ? 'Most Popular Studio Retainer'
        : 'Managed Studio Retainer',
      subtitle: matchedMonthlyPlan.tagline,
      billingCycle: 'monthly-setup',
      billingLabel: 'Per Month + Setup',
      currency,
      symbol,
      kexoraPrice: monthly,
      marketPrice: marketMonthly,
      savedAmount: marketMonthly - monthly,
      savingsPercent,
      setupFee: setup,
      marketSetupFee: marketSetup,
      turnaround: matchedMonthlyPlan.deliveryTimeline,
      revisions: matchedMonthlyPlan.revisions,
      support: matchedMonthlyPlan.supportLevel,
      deliverables: matchedMonthlyPlan.features,
      formattedBrief: brief,
    };
  }

  // Otherwise resolve the Basic / Standard / Premium tier for the chosen service
  const tierId = detectTierFromText(tierOrPlanValue, 'standard');
  const activeTier = tiers[tierId];

  const kexoraPrice =
    currency === 'INR'
      ? activeTier.kexoraPriceInr
      : activeTier.kexoraPriceUsd;
  const marketPrice =
    currency === 'INR'
      ? activeTier.marketPriceInr
      : activeTier.marketPriceUsd;
  const savedAmount = marketPrice - kexoraPrice;
  const savingsPercent = Math.round(((marketPrice - kexoraPrice) / marketPrice) * 100);
  const quoteCode = `QT-KX-${serviceItem.index}-${tierId.slice(0, 3).toUpperCase()}`;

  const brief = [
    `Hi Kexora Engineering Desk,`,
    `I would like to book the following service & tier as per Kexora's 30%-off studio quotation:`,
    `• Quotation Ref: ${quoteCode}`,
    `• Service: ${serviceItem.title} (${serviceItem.pillarName})`,
    `• Selected Tier: ${activeTier.tierLabel} Tier — ${activeTier.tierBadge}`,
    `• Kexora Studio Rate: ${symbol}${kexoraPrice.toLocaleString()} (${serviceItem.billingLabel}) [Market Rate: ${symbol}${marketPrice.toLocaleString()} · You Save ${symbol}${savedAmount.toLocaleString()}]`,
    `• Delivery Turnaround: ${activeTier.turnaround} · ${activeTier.revisions}${tagNote}`,
  ].join('\n');

  return {
    quotationCode: quoteCode,
    serviceId: serviceItem.id,
    serviceTitle: serviceItem.title,
    pillarName: serviceItem.pillarName,
    tierId,
    tierLabel: `${activeTier.tierLabel} Tier`,
    tierBadge: activeTier.tierBadge,
    subtitle: activeTier.subtitle,
    billingCycle: serviceItem.billingCycle,
    billingLabel: serviceItem.billingLabel,
    currency,
    symbol,
    kexoraPrice,
    marketPrice,
    savedAmount,
    savingsPercent,
    turnaround: activeTier.turnaround,
    revisions: activeTier.revisions,
    support: activeTier.support,
    deliverables: activeTier.deliverables,
    formattedBrief: brief,
  };
}

import { ServiceItem, CaseStudy, PricingPlan, NewsArticle } from '../types';

export const KEXORA_COMPANY_INFO = {
  name: 'Kexora',
  legalName: 'Kexora Web Design, App & Game Development Agency',
  domain: 'https://www.kexora.org',
  tagline: 'Crafting Fast Websites, Apps & Digital Brands',
  philosophy: 'Performance Over Everything',
  motto: 'Excellence in every pixel, growth in every click.',
  founder: {
    name: 'Rajan Singh',
    role: 'CEO & Strategy Head',
    bio: 'Visionary force behind Kexora leading scalable web architecture, strategic AI-SEO, digital branding, and full-lifecycle business growth.',
  },
  cto: {
    name: 'Aditya Singh',
    role: 'CTO & Lead Developer',
    bio: 'Technical architect leading Full-Stack Web Engineering, Mobile App & Game Development, UI/UX Strategy, and 0.3s high-performance code standards.',
  },
  headquarters: {
    city: 'Siwan',
    state: 'Bihar',
    postalCode: '841226',
    country: 'India',
    reach: 'Serving Clients Globally from Siwan, Bihar (841226)',
  },
  contact: {
    email: 'kexorastudio@gmail.com',
    supportHours: '24/7 Priority Client Support · 1–2 Business Days Response SLA',
  },
};

export const KEXORA_SERVICE_PILLARS = [
  {
    category: 'Web Design & Development',
    items: [
      'Ecommerce & Custom Web Design',
      'Responsive & WordPress Sites',
      'PHP & CMS Web Development',
      'Web Portal & API Integration',
      'Landing Page & News Website Designing',
      'Multi-Vendor Ecommerce Solutions',
    ],
  },
  {
    category: 'App & Game Development',
    items: [
      'Android & iOS Mobile App Development',
      'Cross-Platform Apps (Flutter & React Native)',
      '2D & 3D Mobile Game Development',
      'HTML5, WebGL & Unity Game Development',
      'Progressive Web Apps (PWA & Custom Utilities)',
      'App Store & Play Store Publishing & ASO',
    ],
  },
  {
    category: 'Digital Marketing & SEO',
    items: [
      'SEO Optimization',
      'AI-SEO Optimization',
      'Google My Business & Local SEO',
      'Instagram & Facebook Marketing',
      'Social Media Optimization (SMO)',
      'Content Writing',
    ],
  },
  {
    category: 'Creative & Business Services',
    items: [
      'Logo Designing',
      'PDF & Brochure Designing',
      'Animated Explainer Videos',
      'UI/UX Design & Branding',
      'GST & Trademark Registration',
      'ISO & Company Registration',
    ],
  },
];

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'custom-web-dev',
    index: '01',
    title: 'Web Design & Custom Development',
    category: 'Custom Code · WordPress · PHP · Web Portals',
    shortDesc: 'Ecommerce & custom web design, responsive WordPress/PHP sites, web portals, API integrations, landing pages, news portals, and corporate websites.',
    fullDesc: 'We design and build fast, mobile-first websites with custom code (React, Next.js, HTML5/CSS3), PHP & CMS portals, responsive WordPress sites, high-converting landing pages, and digital news portals.',
    iconName: 'Code2',
    metrics: '0.3s Load Time · 99/100 Core Web Vitals',
    deliverables: [
      'Ecommerce & Custom Web Design (React, HTML5, Tailwind)',
      'Responsive & WordPress Sites + PHP & CMS Web Development',
      'Custom Web Portals, Dashboards & REST API Integrations',
      'Landing Page, Corporate & News Website Designing',
    ],
  },
  {
    id: 'app-game-dev',
    index: '02',
    title: 'Mobile App & Game Development',
    category: 'Android · iOS · 2D/3D Games · PWA',
    shortDesc: 'Custom Android & iOS mobile applications, cross-platform apps, and engaging 2D/3D mobile & web game development.',
    fullDesc: 'From high-performance Android and iOS business apps and Progressive Web Apps (like Digi Sagun) to interactive 2D/3D mobile and browser games built with modern engines, Kexora engineers smooth, engaging digital products.',
    iconName: 'Zap',
    metrics: '60fps Smooth Performance · Android, iOS & Web',
    deliverables: [
      'Native & Cross-Platform Mobile App Development (Android & iOS)',
      '2D & 3D Mobile, PC & Browser Game Development',
      'Progressive Web Apps (PWA) & Custom SaaS Tools',
      'In-App Payments, Multiplayer APIs & Play Store / App Store Launch',
    ],
  },
  {
    id: 'ai-seo-marketing',
    index: '03',
    title: 'Digital Marketing, SEO & AI-SEO',
    category: 'Search Dominance · GMB · Social Media',
    shortDesc: 'Complete SEO optimization, AI-SEO optimization, Google My Business & Local SEO, Instagram/Facebook marketing, SMO, and content writing.',
    fullDesc: 'We engineer your digital presence to rank #1 on Google and AI search engines through technical SEO optimization, AI-SEO Schema.org structured data, Google My Business (GMB) local rankings, Instagram & Facebook ad campaigns, SMO, and conversion content writing.',
    iconName: 'Search',
    metrics: 'Top 1% SERP Sitelinks · +240% Organic Enquiries',
    deliverables: [
      'SEO Optimization & AI-SEO Structured Data (Schema.org JSON-LD)',
      'Google My Business (GMB) & Local SEO Dominance',
      'Instagram & Facebook Marketing + Social Media Optimization (SMO)',
      'SEO Content Writing, Blogs & High-Conversion Website Copy',
    ],
  },
  {
    id: 'creative-branding',
    index: '04',
    title: 'Creative UI/UX, Logo & Video Design',
    category: 'Brand Identity · Brochures · Explainer Videos',
    shortDesc: 'Logo designing, PDF & brochure designing, animated explainer videos, and complete UI/UX design & branding systems.',
    fullDesc: 'Give your company a world-class visual identity. Our creative studio delivers memorable logo designing, interactive PDF & corporate brochure designing, engaging animated explainer videos, and user-centered UI/UX design in Figma.',
    iconName: 'Palette',
    metrics: 'Bespoke Brand Identity · High-Retention Visuals',
    deliverables: [
      'Custom Logo Designing & Complete Brand Identity Guidelines',
      'Corporate PDF, Pitch Deck & Brochure Designing',
      'Animated Explainer Videos & Promotional Motion Graphics',
      'Mobile-First UI/UX Design, Wireframing & Figma Prototyping',
    ],
  },
  {
    id: 'business-compliance',
    index: '05',
    title: 'Business, GST, Trademark & ISO Registration',
    category: 'Legal & Corporate Setup · Turnkey Launch',
    shortDesc: 'Complete business compliance support including GST & Trademark registration, ISO certification, and Company registration.',
    fullDesc: 'Launch and protect your business under one roof. Alongside your website and app, Kexora handles your company incorporation (Pvt Ltd, LLP, MSME), GST registration, brand name & logo Trademark registration, and ISO certification.',
    iconName: 'ShieldCheck',
    metrics: '100% Turnkey Setup · Legal + Digital Under One Roof',
    deliverables: [
      'GST Registration & Digital Invoicing Setup',
      'Brand Name & Logo Trademark Registration',
      'ISO 9001 Certification & Quality Compliance',
      'Private Limited, LLP, OPC & MSME Company Registration',
    ],
  },
  {
    id: 'ecommerce-custom-stores',
    index: '06',
    title: 'Multi-Vendor E-Commerce & Online Stores',
    category: 'Online Stores · Payment Gateways · Inventory Sync',
    shortDesc: 'Launch high-speed single-brand or multi-vendor e-commerce platforms with Razorpay, Stripe, UPI, and automated inventory management.',
    fullDesc: 'We build custom-coded D2C and multi-vendor e-commerce storefronts engineered for 0.3s page loads, seamless mobile checkouts, Razorpay/Stripe/PhonePe/UPI payment gateways, vendor dashboards, and automated GST billing.',
    iconName: 'ShoppingBag',
    metrics: '+190% Checkout Conversion · 0.3s Storefront Load',
    deliverables: [
      'Multi-Vendor & D2C E-Commerce Storefronts',
      'Vendor Onboarding, Order Tracking & Admin Dashboards',
      'Razorpay, Stripe, UPI & International Payment Gateways',
      'Automated Inventory, Shipping & CRM API Integrations',
    ],
  },
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'beginner-plan',
    name: 'Beginner Plan',
    tagline: 'Ideal for personal brands, portfolios, and startups launching a clean, mobile-responsive presence.',
    monthlyPriceInr: 999,
    setupFeeInr: 8000,
    monthlyPriceUsd: 15,
    setupFeeUsd: 99,
    revisions: 'Standard initial build sign-off',
    supportLevel: 'Basic Email & Ticket Support',
    features: [
      'Single Page / Portfolio Custom Website',
      'Basic Design & Foundational On-Page SEO',
      '100% Mobile-Responsive Layout',
      'Lead Capture Contact Form Integration',
      'Fast SSL & Cloud Hosting Configuration',
      'Basic Maintenance & Uptime Monitoring',
    ],
    ctaText: 'Start Beginner Plan',
  },
  {
    id: 'creative-plan',
    name: 'Creative Plan',
    tagline: 'Our most popular tier for growing businesses needing custom graphics, speed optimization, and local SEO.',
    monthlyPriceInr: 2499,
    setupFeeInr: 18000,
    monthlyPriceUsd: 35,
    setupFeeUsd: 229,
    popular: true,
    revisions: '2–3 Dedicated Design Revisions',
    supportLevel: 'Priority Support & Speed SLA',
    features: [
      'Up to 5–10 Custom Designed & Coded Pages',
      'Core Web Vitals & 99+ Speed Optimization',
      'Custom UI/UX Design, Graphics & Brand Styling',
      'Google Maps, GMB & Social Media Links Integration',
      'Schema.org JSON-LD & AI-SEO Metadata Setup',
      '2–3 Dedicated Design Revisions Included',
    ],
    ctaText: 'Choose Creative Plan',
  },
  {
    id: 'expert-plan',
    name: 'Expert Plan',
    tagline: 'Full-scale custom web architecture, mobile apps, games, or multi-vendor e-commerce stores with unlimited revisions.',
    monthlyPriceInr: 4999,
    setupFeeInr: 40000,
    monthlyPriceUsd: 65,
    setupFeeUsd: 499,
    customSetupSuffix: '+',
    revisions: 'Unlimited Design Revisions',
    supportLevel: '24/7 Priority Engineering Support',
    features: [
      'Unlimited Pages / Full-Stack E-Commerce or Mobile App',
      'Payment Gateway Integration (Razorpay / Stripe / UPI)',
      'Custom Web Portals, Admin Dashboards & API Integrations',
      'Unlimited UI/UX Design Revisions',
      'Advanced Security, Automated Backups & CDN',
      '24/7 Priority Support & Dedicated Strategy Head Review',
    ],
    ctaText: 'Launch Expert Project',
  },
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'kexora-enterprise-web-portal',
    title: 'High-Speed Custom React Web Portal & Google SERP Sitelinks',
    client: 'Enterprise B2B & Service Portal',
    category: 'custom-web',
    categoryLabel: 'Custom Web Architecture · AI-SEO',
    image: '/api/media/v_2b85c6f1',
    metric: '99/100',
    metricLabel: 'Google PageSpeed Score',
    summary: 'Engineered a lightning-fast custom React & TypeScript business platform featuring full Schema.org sitelinks and 0.3s page loads.',
    challenge: 'The client’s previous template website suffered from 4.2s mobile load times, cluttered navigation, and low visibility on Google search.',
    solution: 'Kexora built a custom-coded frontend with sub-second rendering, clean human-centric UI/UX, semantic HTML5 headings, and automated JSON-LD structured data.',
    results: [
      'Page load time dropped from 4.2s to 0.3s across mobile & desktop',
      'Earned 6 Google Search Sitelinks (About Us, Services, Pricing, Contact, News, Tools)',
      'Inbound qualified enquiries increased by +240% within 60 days',
    ],
    techStack: ['React 19', 'TypeScript', 'Tailwind CSS', 'Schema.org JSON-LD', 'REST APIs'],
  },
  {
    id: 'digi-sagun-platform',
    title: 'Digi Sagun & Custom Mobile App Ecosystem',
    client: 'Kexora Flagship App & Digital Product',
    category: 'digital-product',
    categoryLabel: 'App Development · FinTech & Utility',
    image: '/api/media/v_7e39a2d8',
    metric: '50,000+',
    metricLabel: 'Digital Entries Tracked',
    summary: 'Designed and engineered a mobile-first application for tracking wedding and auspicious event sagun contributions.',
    challenge: 'Families and event organizers relied on paper diaries to record monetary gifts (Sagun), leading to calculation errors and lost records.',
    solution: 'Built Digi Sagun with instant search, WhatsApp receipt sharing, multi-language accessibility, and cloud backup.',
    results: [
      'Sub-100ms instant search across thousands of guest records',
      'Zero data loss with encrypted cloud sync and PDF export',
      'Featured in Kexora News as a benchmark in regional digitalization',
    ],
    techStack: ['Mobile App & PWA', 'Mobile-First UI', 'Instant Search', 'PDF Ledger Export'],
  },
  {
    id: 'multivendor-retail-hub',
    title: 'Next-Gen Multi-Vendor E-Commerce & Local SEO Dominance',
    client: 'National Retail & Wholesale Collective',
    category: 'e-commerce',
    categoryLabel: 'Multi-Vendor Store · GMB SEO',
    image: '/api/media/v_5f12b8c7',
    metric: '+190%',
    metricLabel: 'Checkout Conversion Lift',
    summary: 'Built a full-stack multi-vendor storefront with Razorpay/UPI split settlements and automated Product Schema markup.',
    challenge: 'High mobile cart abandonment due to sluggish checkout steps and poor visibility on local Google searches.',
    solution: 'Implemented a 1-page fast checkout with UPI intent flow and structured Product/Offer JSON-LD for rich price snippets on Google.',
    results: [
      'Checkout completion rate surged by +190% on 4G mobile networks',
      'Ranked Top 3 in Google Local Pack & organic product carousels',
      'Automated vendor payouts and GST-compliant invoice generation',
    ],
    techStack: ['Custom E-Commerce', 'Razorpay & UPI', 'Product JSON-LD', 'Google My Business'],
  },
];

export const NEWS_ARTICLES: NewsArticle[] = [
  {
    id: 'custom-code-vs-cms-2026',
    title: 'Why Custom-Coded Websites Outperform Generic Drag-and-Drop Templates in 2026',
    category: 'Web Engineering · Core Web Vitals',
    date: 'October 2026',
    readTime: '4 min read',
    author: 'Rajan Singh, CEO & Strategy Head',
    highlightMetric: '0.3s LCP · 99+ PageSpeed',
    excerpt: 'When every second of load time costs up to 20% of your mobile conversions, relying on heavy page-builder templates holds your brand back.',
    content: [
      'Many growing businesses start with generic drag-and-drop website builders or bloated multi-purpose themes. While convenient on day one, these templates bundle megabytes of unused scripts that throttle mobile performance.',
      'At Kexora, our "Performance Over Everything" engineering philosophy focuses on clean, custom-coded React, Vite, and semantic HTML5 architectures. Your website loads in 0.3 seconds and scores 99+ on Google Lighthouse.',
      'The result is immediate: lower bounce rates, stronger brand authority, and significantly higher enquiry conversion from both organic Google search and social media campaigns.',
    ],
  },
  {
    id: 'digi-sagun-digital-india',
    title: 'Expanding Into Mobile App & Game Development Alongside Digi Sagun & WhatsApp Reader',
    category: 'Kexora Lab · App & Game Studio',
    date: 'September 2026',
    readTime: '3 min read',
    author: 'Kexora Product Team',
    highlightMetric: 'Android, iOS & Web Games',
    excerpt: 'How Kexora builds high-speed mobile applications, interactive 2D/3D games, and browser utilities like the WhatsApp Message Reader.',
    content: [
      'Great software engineering spans across web, mobile apps, and interactive gaming experiences. Alongside our custom web and e-commerce builds, Kexora’s app and game development division crafts Android/iOS applications and 2D/3D interactive games.',
      'Our WhatsApp Message Reader allows businesses and individuals to load exported .txt chat logs and immediately search, filter by participant, and inspect conversations in a clean timeline without uploading sensitive data to external servers.',
      'Similarly, our Digi Sagun application demonstrates how traditional ledger workflows can be transformed into mobile-first digital products with instant search and PDF reporting.',
    ],
  },
  {
    id: 'ai-seo-google-sitelinks',
    title: 'Mastering AI-SEO & Schema.org: How to Earn Full Google SERP Sitelinks for Your Brand',
    category: 'AI-SEO · Search Architecture',
    date: 'August 2026',
    readTime: '5 min read',
    author: 'Rajan Singh, CEO & Strategy Head',
    highlightMetric: '6+ Rich Sitelinks Indexed',
    excerpt: 'A deep dive into how Google’s search engine and AI Overviews parse Organization, WebSite, and ProfessionalService JSON-LD graphs.',
    content: [
      'When prospective clients search your company name on Google, does your result command half the screen with rich sitelinks—About Us, Services, Pricing Plan, Contact Us, News—or does it show a single plain link?',
      'Earning rich sitelinks and AI Overview citations requires more than keywords. It demands strict semantic HTML hierarchy, canonical URL hygiene, fast Core Web Vitals, and interconnected Schema.org JSON-LD graphs.',
      'Every custom website delivered by Kexora ships with pre-validated Organization, WebSite, Service, and FAQPage structured data so search engines understand your exact business offerings from day one.',
    ],
  },
];

export const SAMPLE_WHATSAPP_EXPORT = `18/10/2026, 10:12 am - Rajan Singh (Kexora CEO): Hi Vikram! Welcome to Kexora Web Design, App & Game Development. We just completed the speed and SEO audit of your current business website.
18/10/2026, 10:14 am - Vikram Sharma (Client): Hi Rajan! Thanks for the quick turnaround. Why is our current site feeling so slow on mobile phones?
18/10/2026, 10:16 am - Aditya Singh (Kexora CTO): Your old template theme is loading 4.6 MB of render-blocking scripts, giving a 43/100 mobile PageSpeed score. When we build your new Kexora Custom Code website (React + Tailwind), load time drops to 0.3 seconds.
18/10/2026, 10:19 am - Vikram Sharma (Client): That sounds awesome. Can you also build our Android/iOS mobile app and handle our Google SEO?
18/10/2026, 10:21 am - Rajan Singh (Kexora CEO): Absolutely! We handle Custom Web Design, Mobile App & Game Development, E-Commerce, AI-SEO, Google My Business, and even GST/Trademark/ISO registration under one roof.
18/10/2026, 10:24 am - Vikram Sharma (Client): Which pricing plan should we start with for our custom business website?
18/10/2026, 10:26 am - Rajan Singh (Kexora CEO): Our Creative Plan (₹2,499/month + ₹18,000 one-time setup) is ideal for 5-10 custom pages with speed optimization, custom graphics, and 2-3 revisions. Let's schedule your kickoff today!`;

export const CLIENT_TESTIMONIALS = [
  {
    quote: 'Launching our custom-coded website with Kexora cut our page load time to 0.3 seconds. Within 45 days of their AI-SEO setup, our inbound Google enquiries more than doubled.',
    author: 'Vikram Sharma',
    role: 'Managing Director',
    company: 'Nexus Industrial & FinTech',
    outcome: '+240% Inbound Enquiries · 99 PageSpeed',
  },
  {
    quote: 'Rajan Singh, Aditya Singh, and the Kexora team operate like our own in-house tech department. From custom UI/UX, mobile app development, and e-commerce payment gateways to GST and Trademark compliance, they handled everything seamlessly.',
    author: 'Ananya Verma',
    role: 'Founder',
    company: 'Lumina D2C Retail',
    outcome: '+190% Checkout Conversion · Turnkey Launch',
  },
  {
    quote: 'Their AI-SEO and Schema.org implementation got our brand rich Google sitelinks and Top 3 Google My Business rankings across our target cities. Best ROI we have ever spent on web engineering.',
    author: 'Rajesh K. Patel',
    role: 'Director of Operations',
    company: 'Apex Precision Engineering',
    outcome: '#1 Local & Organic Search Rank',
  },
];

export const FREQUENTLY_ASKED_QUESTIONS = [
  {
    question: 'What complete services does Kexora provide?',
    answer: 'Kexora provides 4 complete pillars: (1) Web Design & Development (Ecommerce & Custom Web Design, Responsive & WordPress Sites, PHP & CMS Web Development, Web Portal & API Integration, Landing Page & News Websites, Multi-Vendor Ecommerce); (2) App & Game Development (Android/iOS Apps, Cross-Platform Apps, 2D/3D Mobile & Web Games); (3) Digital Marketing & SEO (SEO Optimization, AI-SEO, Google My Business & Local SEO, Instagram/Facebook Marketing, SMO, Content Writing); and (4) Creative & Business Services (Logo, PDF/Brochure Design, Animated Explainer Videos, UI/UX Branding, GST, Trademark, ISO & Company Registration).',
  },
  {
    question: 'Why does Kexora focus on custom-coded websites and 0.3s load speeds?',
    answer: 'A slow website loses customers before they even read your offer. Kexora builds lightweight custom code (React, Next.js, HTML5/Tailwind) and optimized web portals that load in 0.3 seconds, achieve 99+ Google PageSpeed scores, and convert visitors into real business enquiries.',
  },
  {
    question: 'What are Kexora’s pricing plans and what is included?',
    answer: 'We offer three transparent tiers: Beginner Plan (₹999/mo + ₹8,000 setup) for single-page & portfolio sites; Creative Plan (₹2,499/mo + ₹18,000 setup) for 5–10 custom pages with speed optimization and custom graphics; and Expert Plan (₹4,999/mo + ₹40,000+ setup) for unlimited pages, e-commerce stores, custom mobile apps, payment gateways, and 24/7 priority support.',
  },
  {
    question: 'Does Kexora also build Android/iOS Mobile Apps and Games?',
    answer: 'Yes! Our App & Game Development studio builds native and cross-platform Android & iOS mobile applications, Progressive Web Apps (like Digi Sagun), and interactive 2D/3D mobile and web games with smooth 60fps performance.',
  },
  {
    question: 'Does Kexora help with Logo Design, Explainer Videos, and GST / Trademark / ISO Registration?',
    answer: 'Yes! Under our Creative & Business Services division, we deliver Logo Designing, PDF & Brochure Designing, Animated Explainer Videos, UI/UX Branding, GST & Trademark Registration, and ISO & Company Registration.',
  },
];

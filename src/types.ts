export type ActiveTab =
  | 'home'
  | 'services'
  | 'tools'
  | 'pricing'
  | 'about'
  | 'news'
  | 'contact';

export type ToolTab =
  | 'whatsapp-reader'
  | 'seo-audit'
  | 'cost-calculator'
  | 'schema-generator';

export type CurrencyCode = 'INR' | 'USD';

export interface ServiceItem {
  id: string;
  index: string;
  title: string;
  category: string;
  shortDesc: string;
  fullDesc: string;
  iconName: string;
  deliverables: string[];
  metrics: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  client: string;
  category: 'custom-web' | 'e-commerce' | 'seo-growth' | 'digital-product';
  categoryLabel: string;
  image: string;
  metric: string;
  metricLabel: string;
  summary: string;
  challenge: string;
  solution: string;
  results: string[];
  techStack: string[];
}

export interface PricingPlan {
  id: string;
  name: string;
  tagline: string;
  monthlyPriceInr: number;
  setupFeeInr: number;
  monthlyPriceUsd: number;
  setupFeeUsd: number;
  customSetupSuffix?: string;
  popular?: boolean;
  features: string[];
  revisions: string;
  supportLevel: string;
  ctaText: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  excerpt: string;
  content: string[];
  highlightMetric: string;
}

export interface WhatsAppMessage {
  id: string;
  date: string;
  time: string;
  sender: string;
  text: string;
  isSystem?: boolean;
}

export interface SeoAuditReport {
  url: string;
  overallScore: number;
  performanceScore: number;
  seoScore: number;
  accessibilityScore: number;
  metaTitle: string;
  metaTitleStatus: 'good' | 'warning' | 'error';
  metaDescription: string;
  metaDescStatus: 'good' | 'warning' | 'error';
  schemaDetected: boolean;
  schemaTypes: string[];
  coreWebVitals: {
    lcp: string;
    fid: string;
    cls: string;
  };
  recommendations: string[];
  aiAnalysis?: string;
}

export interface CalculationInput {
  projectType: 'portfolio' | 'business-custom' | 'app-game' | 'ecommerce';
  pageCount: number;
  includeAiSeo: boolean;
  includeBranding: boolean;
  includeCompliance: boolean;
  currency: CurrencyCode;
}

export interface CalculationResult {
  setupCost: number;
  monthlyRetainer: number;
  estimatedTimelineWeeks: number;
  currencySymbol: string;
  recommendedPlanName: string;
  breakdown: { label: string; amount: number }[];
}

export interface ProposalFormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  websiteUrl: string;
  serviceType: string;
  budgetRange: string;
  projectDetails: string;
}

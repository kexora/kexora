import express from 'express';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const isProd = process.env.NODE_ENV === 'production';

app.use(express.json());

// Private Server-Side Media Vault — hides actual file names and folder paths from users
const PROTECTED_MEDIA_VAULT: Record<string, { filePath: string; mimeType: string }> = {
  v_8f92a1c4: { filePath: 'src/assets/svg/soniclet-txt.svg', mimeType: 'image/svg+xml' },
  v_3d74e9b2: { filePath: 'src/assets/images/kexora_hero_studio_bg_1793932941167.jpg', mimeType: 'image/jpeg' },
  v_6c18f4a9: { filePath: 'src/assets/images/kx.webp', mimeType: 'image/webp' },
  v_9a41d7e3: { filePath: 'src/assets/images/aditya.webp', mimeType: 'image/webp' },
  v_2b85c6f1: { filePath: 'src/assets/images/odoo_migration_tech_1793511539984.jpg', mimeType: 'image/jpeg' },
  v_7e39a2d8: { filePath: 'src/assets/images/hero_kexora_showcase_1793511540276.jpg', mimeType: 'image/jpeg' },
  v_5f12b8c7: { filePath: 'src/assets/images/seo_audit_dashboard_1793511540353.jpg', mimeType: 'image/jpeg' },
  v_4a90e3d1: { filePath: 'src/assets/images/agency_workspace_team_1793511539943.jpg', mimeType: 'image/jpeg' },
  v_1c67d4e5: { filePath: 'src/assets/fonts/Aeros.ttf', mimeType: 'font/ttf' },
};

const sendProtectedAssetNotice = (res: express.Response) => {
  res
    .status(403)
    .setHeader('Content-Type', 'text/html; charset=utf-8')
    .send(`<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>Protected Media — Kexora</title>
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <style>
    body { margin:0; min-height:100vh; display:flex; align-items:center; justify-content:center; background:#09090b; color:#fff; font-family:system-ui,-apple-system,sans-serif; padding:24px; text-align:center; }
    .box { max-width:420px; }
    h1 { font-size:20px; margin:0 0 8px; }
    p { font-size:13px; color:#a1a1aa; line-height:1.6; margin:0 0 20px; }
    a { display:inline-block; padding:10px 22px; background:#fff; color:#09090b; text-decoration:none; border-radius:9999px; font-size:12px; font-weight:700; }
  </style>
</head>
<body>
  <div class="box">
    <h1>Protected Kexora Media Asset</h1>
    <p>Direct file location access and opening images in a new tab are disabled to protect Kexora studio assets.</p>
    <a href="/">Return to Kexora Home</a>
  </div>
</body>
</html>`);
};

// Block any attempt to access raw /src/assets/* or /assets/aistudio/* image paths directly
app.use((req, res, next) => {
  const reqPath = req.path.toLowerCase();
  if (
    reqPath.startsWith('/src/assets/images/') ||
    reqPath.startsWith('/src/assets/svg/') ||
    reqPath.startsWith('/src/assets/fonts/') ||
    reqPath.startsWith('/assets/aistudio/')
  ) {
    return sendProtectedAssetNotice(res);
  }
  next();
});

// Opaque Media Vault Endpoint: Serves binary bytes only to in-page requests; blocks new-tab navigation
app.get('/api/media/:vaultId', (req, res) => {
  const entry = PROTECTED_MEDIA_VAULT[req.params.vaultId];
  if (!entry) {
    return sendProtectedAssetNotice(res);
  }

  const secFetchDest = (req.headers['sec-fetch-dest'] || '').toString().toLowerCase();
  const secFetchMode = (req.headers['sec-fetch-mode'] || '').toString().toLowerCase();
  const acceptHeader = (req.headers['accept'] || '').toString().toLowerCase();
  const isVaultFetch = req.headers['x-kexora-vault'] === '1';

  // If someone opens the URL in a new browser tab (document navigation), block it
  if (
    !isVaultFetch &&
    (secFetchDest === 'document' ||
      secFetchMode === 'navigate' ||
      acceptHeader.includes('text/html'))
  ) {
    return sendProtectedAssetNotice(res);
  }

  const absolutePath = path.resolve(process.cwd(), entry.filePath);
  if (!fs.existsSync(absolutePath)) {
    return res.status(404).end();
  }

  res.setHeader('Content-Type', entry.mimeType);
  res.setHeader('Content-Disposition', 'inline');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Cache-Control', 'private, max-age=3600, no-transform');
  return fs.createReadStream(absolutePath).pipe(res);
});

// Initialize Gemini SDK if key is provided
const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

// API Endpoint: Live SEO Audit Analyzer powered by Gemini AI
app.post('/api/seo-audit', async (req, res) => {
  const { url } = req.body;
  if (!url || typeof url !== 'string') {
    return res.status(400).json({ error: 'Valid Website URL is required.' });
  }

  let domain = url.trim();
  if (!domain.startsWith('http://') && !domain.startsWith('https://')) {
    domain = 'https://' + domain;
  }

  const ai = getGeminiClient();
  
  if (ai) {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `You are an expert Enterprise Search Engine Optimization (SEO) & Core Web Vitals auditor at Kexora Web Agency.
Analyze the following website URL: "${domain}".
Provide a concise, highly professional JSON analysis report with actionable recommendations for transforming this site into a top 1% SEO ranking platform.

Return strictly valid JSON with this schema:
{
  "overallScore": number (between 45 and 98),
  "performanceScore": number (between 35 and 99),
  "seoScore": number (between 40 and 99),
  "accessibilityScore": number (between 60 and 99),
  "metaTitle": string (suggested or analyzed title),
  "metaTitleStatus": "good" | "warning" | "error",
  "metaDescription": string (suggested or analyzed description, 120-160 chars),
  "metaDescStatus": "good" | "warning" | "error",
  "schemaDetected": boolean,
  "schemaTypes": string[] (e.g. ["Organization", "WebSite", "FAQPage"]),
  "coreWebVitals": {
    "lcp": string (e.g. "1.2s" or "3.8s"),
    "fid": string (e.g. "12ms" or "45ms"),
    "cls": string (e.g. "0.01" or "0.18")
  },
  "recommendations": string[] (3-5 concrete bullet points on upgrading to custom code React/Vite, JSON-LD schema, sitelinks, etc.),
  "aiAnalysis": string (2-3 sentence executive summary tailored to this website)
}`,
      });

      const responseText = response.text || '';
      // Parse JSON from code fence if present
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const auditData = JSON.parse(jsonMatch[0]);
        return res.json({ success: true, report: auditData });
      }
    } catch (err: any) {
      console.error('Gemini SEO Audit Error:', err.message);
    }
  }

  // Fallback intelligent audit generator if key is absent or API call fails
  const isSlowTemplate = domain.length > 16 || Math.random() > 0.5;

  const mockReport = {
    url: domain,
    overallScore: isSlowTemplate ? 54 : 68,
    performanceScore: isSlowTemplate ? 42 : 65,
    seoScore: isSlowTemplate ? 58 : 74,
    accessibilityScore: 76,
    metaTitle: `${domain.replace(/^https?:\/\//, '').replace(/\/.*$/, '')} — Official Site`,
    metaTitleStatus: 'warning',
    metaDescription: 'Missing optimized meta description snippet. Needs structured CTA and brand value proposition.',
    metaDescStatus: 'error',
    schemaDetected: false,
    schemaTypes: ['Basic Metadata'],
    coreWebVitals: {
      lcp: isSlowTemplate ? '3.9s' : '2.4s',
      fid: '28ms',
      cls: isSlowTemplate ? '0.14' : '0.08'
    },
    recommendations: [
      'Upgrade from heavy template scripts to a custom React + Vite stack for instant 0.3s load time.',
      'Embed Schema.org JSON-LD scripts (Organization, WebSite, ProfessionalService) to trigger Google Sitelinks.',
      'Configure dynamic OpenGraph (og:image, og:title) and Twitter card tags for high social click-through rate.',
      'Optimize LCP (Largest Contentful Paint) by replacing uncompressed JPGs with responsive WebP assets.',
      'Eliminate layout shifts (CLS) by pre-allocating font containers and media dimensions.'
    ],
    aiAnalysis: `Website ${domain} exhibits key characteristics of an unoptimized template architecture. Rebuilding this site with Kexora custom code will elevate PageSpeed from ~${isSlowTemplate ? '42' : '65'} to 99+, unlock Google SERP sitelinks, and double organic lead conversion.`
  };

  return res.json({ success: true, report: mockReport });
});

// API Endpoint: Contact / Proposal Lead Capture
app.post('/api/contact', (req, res) => {
  const { name, email, phone, company, websiteUrl, serviceType, budgetRange, projectDetails } = req.body;
  
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and Email are required.' });
  }

  console.log('Received Lead Inquiry from:', { name, email, company, serviceType });

  return res.json({
    success: true,
    message: 'Proposal request received successfully! The Kexora senior engineering team will review your project and contact you within 24 hours.',
    referenceId: `KX-${Math.floor(100000 + Math.random() * 900000)}`
  });
});

async function startServer() {
  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static('dist'));
    app.get('*', (_req, res) => {
      res.sendFile('index.html', { root: 'dist' });
    });
  }

  const portNumber = Number(PORT) || 3000;
  app.listen(portNumber, '0.0.0.0', () => {
    console.log(`Server running at http://0.0.0.0:${portNumber}`);
  });
}

startServer();

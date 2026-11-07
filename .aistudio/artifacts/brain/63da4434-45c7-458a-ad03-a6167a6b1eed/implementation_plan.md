# Kexora Pricing & Plan Complete UI/UX Upgrade & 24-Service Rate Card

Upgrade the Kexora Pricing & Plan experience with fluid animations, a unified **30% Cheaper Than Industry Standard** value proposition (showing strikethrough market rates alongside Kexora's actual pricing and exact savings), upgraded **Beginner, Creative & Expert** monthly plans, and a searchable, category-tabbed **Complete 24-Service Pricing Catalog** covering every single task Kexora delivers across Web, Apps/Games, SEO/Marketing, and Creative/Compliance.

## User Review & Critical Decisions

> [!IMPORTANT]
> All Phase 1 preferences have been locked in and reflected across this blueprint:

- **Confirmed Decision 1 — 24-Service Catalog Organization**: Interactive category filter tabs (*All 24 Services*, *Web Design & Dev*, *App & Game Dev*, *Digital Marketing & SEO*, *Creative & Business Setup*) paired with instant live search and currency toggle (`INR ₹` / `USD $`).
- **Confirmed Decision 2 — "30% Cheaper Than Market" Presentation**: Every plan and individual service card displays the **Industry Standard Market Rate** in strikethrough (`line-through`), Kexora’s **30% Lower Direct Studio Price** in bold tabular numerals, and the exact rupee/dollar amount saved (`Save 30% · ₹X,XXX Saved`).
- **Confirmed Decision 3 — Combined Structure**: Keep the upgraded 3 core monthly plans (**Beginner Plan**, **Creative Plan**, **Expert Plan**) at the top for full-stack managed partnerships, followed immediately by the **Individual Task & Service-Wise Pricing Catalog (All 24 Services)** and multi-service bundle builder below.

---

## 1. Overview & Core Concept

- **What It Does**:
  1. **Upgraded 3 Core Managed Plans (Home & Pricing Page)**: Redesigns the Beginner, Creative, and Expert pricing cards with elevated motion transitions, a live **Industry Market Rate vs. Kexora Direct Rate (30% Off)** comparison strip inside each card, interactive billing/currency switching (`INR ₹` / `USD $`), and 1-click Smart Enquiry triggers.
  2. **Complete 24-Service Individual Task Rate Card**: Introduces a dedicated, animated catalog covering all 24 services across Kexora's 4 pillars so clients who want a specific task (e.g., *Logo Designing*, *GST Registration*, *Android/iOS App*, *Landing Page*, *Google My Business SEO*, *2D/3D Game Development*) can see transparent standalone pricing that is 30% below standard agency rates.
  3. **Interactive Multi-Task Quote Cart / Bundle Bar**: Allows visitors browsing the 24 individual services to either enquire about a single service immediately or select multiple tasks to see their combined **Market Cost vs. Kexora 30%-Off Total** and send all selected tasks directly into the Smart Enquiry form on `/contact`.
- **Target Audience / Persona**: Founders, local business owners, D2C brands, and enterprise teams comparing agency quotes who want transparent pricing for both complete monthly retainers and individual digital/legal tasks.
- **Key Value**: Eliminates hidden agency pricing and proves Kexora’s cost-efficiency by showing concrete industry benchmark rates right next to Kexora’s 30% lower direct engineering rates.

---

## 2. User Experience & Visual Design

- **Key User Flows**:
  1. **Currency & Savings Header Bar**: Users toggle between `INR (₹)` and `USD ($)` at any time; all 3 monthly plans and all 24 individual service cards animate smoothly to the selected currency with tabular numeral precision.
  2. **Upgraded 3 Monthly Plans**: Users inspect Beginner (`₹999/mo` vs `₹1,450/mo` market), Creative (`₹2,499/mo` vs `₹3,600/mo` market), and Expert (`₹4,999/mo` vs `₹7,200/mo` market), including strikethrough setup fees and calculated 30% savings callouts.
  3. **24-Service Interactive Task Explorer**:
     - Users filter across **All 24 Services** or click any of the **4 Service Pillar Tabs** (*Web Design & Development*, *App & Game Development*, *Digital Marketing & SEO*, *Creative & Business Services*), or type in the instant search bar (e.g., `"Logo"`, `"GST"`, `"Game"`, `"WordPress"`, `"SEO"`).
     - Each service card shows:
       - Pillar index & turnaround time (e.g., `01 · Web Design · 5–7 Days Delivery`)
       - Service title & concise deliverable scope
       - **Industry Standard Rate** (strikethrough) vs. **Kexora Price (30% Cheaper)** + exact savings amount
       - Key included deliverables (3 bullet points)
       - Dual action: **"Book This Service"** (1-click Smart Enquiry pre-fill) or **"+ Add to Bundle"** (multi-service quote calculator).
  4. **Floating Glass Bundle Summary Bar (When 1+ Tasks Selected)**:
     - If a user selects multiple individual services (e.g., *Custom Web Design* + *Logo Designing* + *GST Registration*), a sleek frosted-glass bottom summary bar displays total Market Price, Kexora 30%-Off Bundle Price, Total Money Saved, and a **"Claim 30% Off Bundle Quote"** button that auto-fills the entire bundle into `/contact`.

- **Visual Identity & Theme**:
  - *Aesthetic Direction*: High-Craft Monochrome Editorial (`#FFFFFF` pure white canvas, `#FAFAFA` subtle zinc surface, `#09090B` deep obsidian featured surfaces, and frosted glass `backdrop-blur-2xl` floating bars).
  - *Typography & Hierarchy*: `Outfit` geometric display headings (`text-wrap: balance`), `Plus Jakarta Sans` body prose, and `JetBrains Mono` (`tabular-nums`) for all prices, strikethrough market figures, and percentage savings.
  - *Interactive Motion*: Smooth card entrance stagger, spring-like tab indicator transitions (`cubic-bezier(0.16, 1, 0.3, 1)`), subtle hover elevation (`-translate-y-1`), and instant filter transitions under `180ms`.

---

## 3. Key Product Decisions & Trade-Offs

- **Decision 1 — Transparent Industry Benchmark vs. Kexora 30% Off Math**:
  - *Chosen Approach*: Every single plan and all 24 individual services store both the realistic industry standard rate and Kexora's ~30% lower rate in `INR` and `USD`, dynamically computing the exact savings (`marketPrice - kexoraPrice`) so the math is 100% authentic and verifiable.
  - *Why*: Users immediately trust pricing when the strikethrough benchmark and savings math are concrete rather than vague marketing claims.
- **Decision 2 — Multi-Service Bundle Selection + Single-Click Smart Enquiry**:
  - *Chosen Approach*: Each of the 24 service cards supports both direct 1-click enquiry (`Book Now -> /contact`) and optional multi-task selection (`+ Compare / Bundle`) that feeds into the existing Smart Enquiry system.
  - *Why*: Clients often need 2–3 tasks together (e.g., Website + Logo + GST Registration); letting them bundle tasks on the Pricing page and auto-fill `/contact` minimizes typing to zero.

---

## 4. Technical Architecture & Data Strategy *(Technical Reference)*

### Architecture & Component Diagram

```
┌────────────────────────────────────────────────────────────────────────────┐
│                     Centralized Pricing & Service Store                    │
│  • 3 Managed Retainer Plans (with Market Strikethrough & 30% Savings)      │
│  • 24 Individual Service Pricing Items across 4 Company Pillars            │
│    (Web Design & Dev · App & Game Dev · SEO & Marketing · Creative/Legal)  │
└───────────────────┬────────────────────────────────────┬───────────────────┘
                    │                                    │
                    ▼                                    ▼
┌───────────────────────────────────────┐  ┌─────────────────────────────────┐
│     Upgraded PricingSection (3 Tiers) │  │   PricingPage Full Experience   │
│  • Currency Switch (INR ₹ / USD $)    │  │  • 30% Market Savings Banner    │
│  • Market Rate Strikethrough Strip    │  │  • 4-Pillar Interactive Tabs    │
│  • Animated Card Hover & Highlights   │  │  • Live Search & Task Filter    │
│  • Direct Smart Enquiry Pre-Fill      │  │  • 24 Service Pricing Cards     │
└───────────────────┬───────────────────┘  │  • Multi-Task Bundle Bar        │
                    │                      └─────────────┬───────────────────┘
                    └──────────────────┬─────────────────┘
                                       ▼
┌────────────────────────────────────────────────────────────────────────────┐
│                 Smart Enquiry Auto-Fill System (/contact)                  │
│  • Pre-selects Service Pillar, Pricing Tier / Selected Task Bundle,        │
│    and populates formatted project brief with 30%-Off pricing details      │
└────────────────────────────────────────────────────────────────────────────┘
```

### Complete 24-Service Pricing Matrix (4 Pillars × 6 Services Each)

1. **Pillar 1 — Web Design & Development (6 Services)**:
   - *Ecommerce & Custom Web Design* (Kexora: `₹14,999` vs Market: `₹21,500`)
   - *Responsive & WordPress Sites* (Kexora: `₹7,999` vs Market: `₹11,500`)
   - *PHP & CMS Web Development* (Kexora: `₹11,999` vs Market: `₹17,200`)
   - *Web Portal & API Integration* (Kexora: `₹18,999` vs Market: `₹27,500`)
   - *Landing Page & News Website Designing* (Kexora: `₹5,999` vs Market: `₹8,600`)
   - *Multi-Vendor Ecommerce Solutions* (Kexora: `₹34,999` vs Market: `₹50,000`)

2. **Pillar 2 — App & Game Development (6 Services)**:
   - *Android & iOS Mobile App Development* (Kexora: `₹29,999` vs Market: `₹43,000`)
   - *Cross-Platform Apps (Flutter & React Native)* (Kexora: `₹24,999` vs Market: `₹36,000`)
   - *2D & 3D Mobile Game Development* (Kexora: `₹32,999` vs Market: `₹47,500`)
   - *HTML5, WebGL & Unity Game Development* (Kexora: `₹19,999` vs Market: `₹28,600`)
   - *Progressive Web Apps (PWA & Custom Utilities)* (Kexora: `₹12,999` vs Market: `₹18,600`)
   - *App Store & Play Store Publishing & ASO* (Kexora: `₹3,499` vs Market: `₹5,000`)

3. **Pillar 3 — Digital Marketing & SEO (6 Services)**:
   - *SEO Optimization (Complete On-Page & Technical)* (Kexora: `₹4,999/mo` vs Market: `₹7,200/mo`)
   - *AI-SEO Optimization & Schema.org Sitelinks* (Kexora: `₹6,499/mo` vs Market: `₹9,300/mo`)
   - *Google My Business (GMB) & Local SEO* (Kexora: `₹2,999` vs Market: `₹4,300`)
   - *Instagram & Facebook Performance Marketing* (Kexora: `₹5,499/mo` vs Market: `₹7,900/mo`)
   - *Social Media Optimization (SMO)* (Kexora: `₹3,999/mo` vs Market: `₹5,800/mo`)
   - *SEO Content Writing & Website Copywriting* (Kexora: `₹1,999` vs Market: `₹2,900`)

4. **Pillar 4 — Creative & Business Services (6 Services)**:
   - *Custom Logo Designing & Brand Mark* (Kexora: `₹1,999` vs Market: `₹2,900`)
   - *PDF, Pitch Deck & Corporate Brochure Designing* (Kexora: `₹2,499` vs Market: `₹3,600`)
   - *Animated Explainer & Promotional Videos* (Kexora: `₹6,999` vs Market: `₹10,000`)
   - *UI/UX Design & Figma Prototyping* (Kexora: `₹5,999` vs Market: `₹8,600`)
   - *GST & Brand Trademark Registration* (Kexora: `₹2,499` vs Market: `₹3,600`)
   - *ISO Certification & Company Registration* (Kexora: `₹4,999` vs Market: `₹7,200`)

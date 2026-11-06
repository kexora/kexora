import React, { useState, useEffect } from 'react';
import { ActiveTab } from '../../types';
import { KEXORA_COMPANY_INFO } from '../../data/agencyData';
import { ProtectedImage, KEXORA_MEDIA_VAULT } from '../component/ProtectedImage';
import {
  ArrowUpRight,
  MapPin,
  Mail,
  Check,
  ArrowRight,
} from 'lucide-react';

interface AboutUsPageProps {
  openContactModal: (serviceName?: string, details?: string) => void;
  onNavigatePage: (page: ActiveTab) => void;
}

type SectionId =
  | 'who-we-are'
  | 'our-approach'
  | 'what-sets-us-apart'
  | 'our-commitment'
  | 'how-we-work'
  | 'tech-capabilities'
  | 'meet-our-designers'
  | 'our-journey';

export const AboutUsPage: React.FC<AboutUsPageProps> = ({
  openContactModal,
  onNavigatePage,
}) => {
  const [activeSection, setActiveSection] = useState<SectionId>('who-we-are');
  const [activeMilestone, setActiveMilestone] = useState<number>(0);

  const sidebarLinks: { id: SectionId; label: string }[] = [
    { id: 'who-we-are', label: 'Who We Are' },
    { id: 'our-approach', label: 'Our Approach' },
    { id: 'what-sets-us-apart', label: 'What Sets Us Apart' },
    { id: 'our-commitment', label: 'Our Commitment' },
    { id: 'how-we-work', label: 'How We Work' },
    { id: 'tech-capabilities', label: 'Technologies & Stack' },
    { id: 'meet-our-designers', label: 'Meet Our Designers' },
    { id: 'our-journey', label: 'Our Journey' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const offsets: { id: SectionId; top: number }[] = sidebarLinks.map(
        (item) => {
          const el = document.getElementById(item.id);
          return {
            id: item.id,
            top: el ? Math.abs(el.getBoundingClientRect().top - 150) : Infinity,
          };
        }
      );
      offsets.sort((a, b) => a.top - b.top);
      if (offsets[0]) {
        setActiveSection(offsets[0].id);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: SectionId) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 110;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const agencyStats = [
    { value: '0.3s', label: 'Target Load Time' },
    { value: '99+', label: 'Google PageSpeed' },
    { value: '841226', label: 'Siwan, Bihar HQ' },
    { value: '24/7', label: 'Direct Team Support' },
  ];

  const processSteps = [
    {
      step: '01',
      title: 'Workflow Discovery & Strategy',
      desc: 'We understand your business story, target customers, and operational workflow before writing a single line of code.',
    },
    {
      step: '02',
      title: 'Human-Centric UI/UX Design',
      desc: 'We craft clean, natural interfaces and user journeys designed to keep visitors engaged and turn clicks into enquiries.',
    },
    {
      step: '03',
      title: 'Clean Code, App & E-Commerce Engineering',
      desc: 'Our developers build your custom web platform, e-commerce store, mobile app, or game with fast, SEO-ready architecture.',
    },
    {
      step: '04',
      title: 'Speed Audit, Launch & Care',
      desc: 'Every image and script is tuned for instant loading, backed by ongoing security patches and framework upgrades.',
    },
  ];

  const techCapabilities = [
    {
      domain: 'Custom Web Engineering',
      items:
        'React 19 · Next.js · TypeScript · Tailwind CSS · HTML5/CSS3 · PHP · WordPress CMS · Multi-Vendor Portals',
    },
    {
      domain: 'E-Commerce & Business Portals',
      items:
        'Single & Multi-Vendor Online Stores · Custom Admin Dashboards · REST API Sync · Razorpay / Stripe / UPI Gateways',
    },
    {
      domain: 'App & Game Development',
      items:
        'Android & iOS Mobile Apps · Flutter & React Native · 2D & 3D Mobile/Web Games · Progressive Web Apps (Digi Sagun)',
    },
    {
      domain: 'AI-SEO, Branding & Legal Setup',
      items:
        'Technical Google SEO · AI-SEO & Schema.org Sitelinks · GMB Local SEO · Logo & Video Design · GST, Trademark & ISO',
    },
  ];

  const milestones = [
    {
      index: '01',
      phase: 'Foundation',
      tag: 'Siwan, Bihar (841226)',
      metric: '100% Outcome-Driven Focus',
      title: 'Born in Siwan, Bihar With a Clear Mission',
      desc: 'Founded by Rajan Singh to bridge the gap between websites that merely look good and high-speed digital platforms that genuinely grow businesses.',
      highlights: 'Local Dedication · Global Standards · Direct Founder Oversight',
    },
    {
      index: '02',
      phase: 'Engineering Standard',
      tag: '0.3s Speed Benchmark',
      metric: '99+ Google PageSpeed',
      title: 'Custom Code & High-Speed Web Architecture',
      desc: 'Led technically by CTO Aditya Singh, Kexora established its 0.3s load-time benchmark—helping companies upgrade from sluggish templates to modern full-stack platforms.',
      highlights: 'React & TypeScript · Custom E-Commerce · Zero Code Bloat',
    },
    {
      index: '03',
      phase: 'In-House Products',
      tag: 'Kexora Product Lab',
      metric: '50,000+ Records Processed',
      title: 'Launching Digi Sagun & Kexora Browser Utilities',
      desc: 'Expanded into building flagship digital products like Digi Sagun and the client-side WhatsApp Message Reader used by thousands of users.',
      highlights: 'Digi Sagun PWA · Client-Side WhatsApp Reader · Instant Search',
    },
    {
      index: '04',
      phase: 'Full-Service Ecosystem',
      tag: 'Global Turnkey Partner',
      metric: '4 Core Digital Pillars',
      title: 'Global Delivery Across Web, Apps, Games, SEO & Compliance',
      desc: 'Today, Kexora acts as a complete outsourced tech department—handling custom web design, mobile apps, games, AI-SEO, and GST/Trademark/ISO registrations under one roof.',
      highlights: 'Custom Web & E-Commerce · Android/iOS & Games · AI-SEO & Legal Setup',
    },
  ];

  return (
    <div className="bg-white text-zinc-950 min-h-screen">
      {/* Dark Blurred Header Banner with Open Stats (No Boxes) */}
      <section className="relative pt-28 pb-14 sm:pt-32 sm:pb-16 overflow-hidden bg-zinc-950 text-white">
        <div className="absolute inset-0 z-0">
          <ProtectedImage
            src={KEXORA_MEDIA_VAULT.HERO_BG}
            alt="About Kexora Studio Background"
            className="w-full h-full object-cover scale-105 blur-md opacity-45"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/90 via-zinc-900/75 to-zinc-900/60" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="space-y-3 max-w-3xl">
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white font-[Outfit]">
              About Kexora
            </h1>
            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed max-w-2xl">
              We build the digital backbone of your business—combining local dedication from{' '}
              <span className="text-white font-semibold">
                Siwan, Bihar (841226)
              </span>{' '}
              with global engineering standards.
            </p>
          </div>

          {/* Open Stats Row (No Borders / No Boxes) */}
          <div className="flex flex-wrap items-center gap-x-12 gap-y-4 pt-2">
            {agencyStats.map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl sm:text-3xl font-extrabold text-white font-[Outfit] tabular-nums">
                  {stat.value}
                </div>
                <div className="text-xs text-zinc-400 mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Open Editorial Flow with Sticky Left Sidebar (All Details, Zero Boxes) */}
      <section className="py-14 sm:py-20 bg-white text-zinc-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-16 items-start">
            {/* Left Sticky Sidebar Navigation */}
            <aside className="md:col-span-3 md:sticky md:top-28 space-y-8">
              <nav aria-label="About Kexora Sections" className="space-y-3">
                {sidebarLinks.map((link) => {
                  const isActive = activeSection === link.id;
                  return (
                    <button
                      key={link.id}
                      type="button"
                      onClick={() => scrollToSection(link.id)}
                      className={`block w-full text-left text-sm sm:text-[15px] pl-3.5 py-0.5 transition-all duration-200 ${
                        isActive
                          ? 'border-l-2 border-zinc-950 text-zinc-950 font-semibold'
                          : 'border-l-2 border-transparent text-zinc-500 hover:text-zinc-900'
                      }`}
                    >
                      {link.label}
                    </button>
                  );
                })}
              </nav>

              {/* Direct Studio Info (Open, No Box) */}
              <div className="hidden md:block space-y-2 pt-4">
                <div className="text-xs font-semibold text-zinc-950 flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 shrink-0" />
                  <span>Siwan, Bihar (841226)</span>
                </div>
                <div className="text-xs text-zinc-600 flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 shrink-0 text-zinc-950" />
                  <a
                    href={`mailto:${KEXORA_COMPANY_INFO.contact.email}`}
                    className="hover:text-zinc-950 underline underline-offset-4"
                  >
                    {KEXORA_COMPANY_INFO.contact.email}
                  </a>
                </div>
                <button
                  type="button"
                  onClick={() => openContactModal('About Us Page Inquiry')}
                  className="inline-flex items-center gap-1 text-xs font-bold text-zinc-950 hover:opacity-70 pt-1 transition-opacity"
                >
                  <span>Start a Conversation</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </aside>

            {/* Right Open Editorial Column — All Details Preserved, No Boxy Wrappers */}
            <div className="md:col-span-9 space-y-14 text-zinc-800">
              {/* 1. Who We Are */}
              <div id="who-we-are" className="space-y-4 scroll-mt-28">
                <h2 className="text-2xl sm:text-[2.1rem] font-bold tracking-tight text-zinc-950 font-[Outfit]">
                  Who We Are
                </h2>
                <p className="text-sm sm:text-[16px] leading-relaxed text-zinc-700">
                  At <strong className="font-bold text-zinc-950">Kexora</strong>, we don&apos;t just build websites; we build the digital backbone of your business. In an era where everyone is online, we noticed a gap: many websites look good but don&apos;t actually work for the business owner. We started{' '}
                  <strong className="font-bold text-zinc-950">Kexora</strong> to change that. We are a team of dedicated developers and designers obsessed with clean code, fast loading speeds, and designs that actually convert visitors into customers.
                </p>
                <p className="text-sm sm:text-[16px] leading-relaxed text-zinc-700">
                  While we serve clients globally, our operations are proudly rooted in{' '}
                  <strong className="font-bold text-zinc-950">
                    Siwan, Bihar (841226)
                  </strong>
                  , where we combine local dedication with global tech standards.
                </p>
                <p className="text-base sm:text-lg font-semibold text-zinc-950 font-[Outfit] italic pt-1">
                  &ldquo;{KEXORA_COMPANY_INFO.motto}&rdquo;
                </p>
              </div>

              {/* 2. Our Approach */}
              <div id="our-approach" className="space-y-4 scroll-mt-28">
                <h2 className="text-2xl sm:text-[2.1rem] font-bold tracking-tight text-zinc-950 font-[Outfit]">
                  Our Approach
                </h2>
                <p className="text-sm sm:text-[16px] leading-relaxed text-zinc-700">
                  We don’t believe in &ldquo;one size fits all.&rdquo; Every business has a unique story, and your website should reflect that. Whether you are a local service provider or a growing startup, we take the time to understand your workflow before we write a single line of code. We specialize in creating high-performance web solutions—from custom-coded platforms and e-commerce stores to mobile apps and games—ensuring your tech stack is as modern as your vision.
                </p>
                <div className="pt-1 flex flex-wrap items-center gap-x-7 gap-y-2 text-xs sm:text-sm font-semibold text-zinc-900">
                  <span className="inline-flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-zinc-950" />
                    Workflow-First Architecture
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-zinc-950" />
                    100% Custom-Coded Platforms
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-zinc-950" />
                    Mobile Apps, Games &amp; E-Commerce
                  </span>
                </div>
              </div>

              {/* 3. What Sets Us Apart */}
              <div id="what-sets-us-apart" className="space-y-4 scroll-mt-28">
                <h2 className="text-2xl sm:text-[2.1rem] font-bold tracking-tight text-zinc-950 font-[Outfit]">
                  What Sets Us Apart
                </h2>
                <ul className="list-disc pl-6 space-y-3 text-sm sm:text-[16px] leading-relaxed text-zinc-700">
                  <li>
                    <strong className="font-bold text-zinc-950">
                      Performance Over Everything:
                    </strong>{' '}
                    A beautiful site is useless if it’s slow. We optimize every image and script so your users never have to wait.
                  </li>
                  <li>
                    <strong className="font-bold text-zinc-950">
                      SEO-Driven Logic:
                    </strong>{' '}
                    We build with Google in mind. Our structure is clean, making it easy for search engines to find you and rank you higher.
                  </li>
                  <li>
                    <strong className="font-bold text-zinc-950">
                      Human-Centric Design:
                    </strong>{' '}
                    We focus on UI/UX that feels natural. If your customers find the site easy to use, they stay longer.
                  </li>
                  <li>
                    <strong className="font-bold text-zinc-950">
                      The Partnership Mentality:
                    </strong>{' '}
                    We aren’t just a vendor you hire; we act as your outsourced tech department. Your growth is the only metric that matters to us.
                  </li>
                </ul>
              </div>

              {/* 4. Our Commitment */}
              <div id="our-commitment" className="space-y-4 scroll-mt-28">
                <h2 className="text-2xl sm:text-[2.1rem] font-bold tracking-tight text-zinc-950 font-[Outfit]">
                  Our Commitment
                </h2>
                <p className="text-sm sm:text-[16px] leading-relaxed text-zinc-700">
                  The digital world moves fast, and{' '}
                  <strong className="font-bold text-zinc-950">Kexora</strong> is here to make sure you don’t get left behind. We stay on top of the latest frameworks and security patches so you can focus on running your business while we handle the pixels and the programming.
                </p>
              </div>

              {/* 5. How We Work With You (Open Editorial Flow — No Boxes) */}
              <div id="how-we-work" className="space-y-5 scroll-mt-28">
                <div className="space-y-1.5">
                  <h2 className="text-2xl sm:text-[2.1rem] font-bold tracking-tight text-zinc-950 font-[Outfit]">
                    How We Work With You
                  </h2>
                  <p className="text-sm sm:text-[15.5px] text-zinc-600">
                    A transparent 4-step workflow from initial conversation to high-speed launch:
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-6 pt-1">
                  {processSteps.map((step) => (
                    <div key={step.step} className="space-y-1.5">
                      <h3 className="text-base sm:text-lg font-bold text-zinc-950 font-[Outfit]">
                        {step.step}. {step.title}
                      </h3>
                      <p className="text-sm text-zinc-700 leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 6. Technologies & Capabilities (Open Editorial List — No Boxes) */}
              <div id="tech-capabilities" className="space-y-5 scroll-mt-28">
                <div className="space-y-1.5">
                  <h2 className="text-2xl sm:text-[2.1rem] font-bold tracking-tight text-zinc-950 font-[Outfit]">
                    Technologies &amp; Capabilities
                  </h2>
                  <p className="text-sm sm:text-[15.5px] text-zinc-600">
                    Modern tools we use to build fast websites, mobile apps, games, and business systems:
                  </p>
                </div>

                <ul className="list-disc pl-6 space-y-3 text-sm sm:text-[16px] leading-relaxed text-zinc-700">
                  {techCapabilities.map((cap) => (
                    <li key={cap.domain}>
                      <strong className="font-bold text-zinc-950">
                        {cap.domain}:
                      </strong>{' '}
                      {cap.items}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Meet Our Designers — Clean Open Layout with Official WebP Images */}
      <section
        id="meet-our-designers"
        className="py-12 sm:py-20 bg-white text-zinc-950 scroll-mt-20"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {/* Section Title */}
          <div className="space-y-2">
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-zinc-950 font-[Outfit]">
              Meet Our Designers
            </h2>
            <p className="text-base sm:text-lg text-zinc-600">
              Passionate creatives driving our vision
            </p>
          </div>

          {/* Profile 1: Rajan Singh */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-14 items-center">
            <div className="md:col-span-4 flex items-center justify-center">
              <ProtectedImage
                src={KEXORA_MEDIA_VAULT.RAJAN_KX}
                alt="Rajan Singh — CEO & Strategy Head at Kexora"
                className="w-48 sm:w-56 h-auto object-contain select-none"
              />
            </div>

            <div className="md:col-span-8 space-y-4">
              <div className="space-y-1">
                <h3 className="text-xl sm:text-2xl font-semibold text-zinc-950 font-[Outfit]">
                  Rajan Singh
                </h3>
                <div className="text-sm text-zinc-500">
                  CEO &amp; Strategy Head
                </div>
              </div>

              <div className="space-y-4 text-sm sm:text-[16px] leading-relaxed text-zinc-700">
                <p>
                  Rajan Singh is the visionary force behind{' '}
                  <strong className="font-bold text-zinc-950">Kexora</strong>. With a deep-seated passion for technology and digital transformation, he founded the company to bridge the gap between complex engineering and user-centric design. As the{' '}
                  <strong className="font-bold text-zinc-950">CEO</strong>, Rajan leads the strategic direction of the firm, ensuring that every project delivered by Kexora meets global standards of performance and innovation.
                </p>
                <p>
                  Under his leadership, Kexora has grown from a specialized startup into a full-service digital agency. Rajan’s expertise lies in{' '}
                  <strong className="font-bold text-zinc-950">
                    scalable web architecture, strategic SEO, and digital business growth
                  </strong>
                  . He believes that a website isn&apos;t just a digital placeholder—it’s a powerful tool for winning customers and scaling operations.
                </p>
                <p>
                  Beyond his technical acumen, Rajan is committed to empowering the local tech ecosystem in{' '}
                  <strong className="font-bold text-zinc-950">
                    Siwan, Bihar,
                  </strong>{' '}
                  proving that world-class digital solutions can be engineered right from the heart of India. His motto is simple:{' '}
                  <strong className="font-bold text-zinc-950">
                    &ldquo;Excellence in every pixel, growth in every click.&rdquo;
                  </strong>
                </p>
              </div>

              <div className="pt-1 flex flex-wrap items-center justify-between gap-4">
                <span className="text-xs text-zinc-500">
                  Scalable Web Architecture · Strategic AI-SEO · Brand Growth
                </span>
                <button
                  type="button"
                  onClick={() =>
                    openContactModal('Strategy Consultation with Rajan Singh (CEO)')
                  }
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-zinc-950 hover:opacity-70 transition-opacity"
                >
                  <span>Connect with Rajan</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Profile 2: Aditya Singh */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-14 items-center pt-4">
            <div className="md:col-span-4 flex items-center justify-center">
              <ProtectedImage
                src={KEXORA_MEDIA_VAULT.ADITYA_CTO}
                alt="Aditya Singh — CTO & Lead Developer at Kexora"
                className="w-48 sm:w-56 h-auto rounded-full object-cover select-none"
              />
            </div>

            <div className="md:col-span-8 space-y-4">
              <div className="space-y-1">
                <h3 className="text-xl sm:text-2xl font-semibold text-zinc-950 font-[Outfit]">
                  Aditya Singh
                </h3>
                <div className="text-sm text-zinc-500">
                  CTO &amp; Lead Developer
                </div>
              </div>

              <div className="space-y-4 text-sm sm:text-[16px] leading-relaxed text-zinc-700">
                <p>
                  Aditya Singh is the technical architect and the driving force behind the development standards at{' '}
                  <strong className="font-bold text-zinc-950">Kexora</strong>. With a deep-rooted passion for clean code and high-performance architecture, Aditya leads the technology department with a focus on building scalable, future-ready digital solutions.
                </p>
                <p>
                  His expertise spans across{' '}
                  <strong className="font-bold text-zinc-950">
                    Full-Stack Web Engineering, Mobile App &amp; Game Development, and UI/UX Strategy
                  </strong>
                  . Aditya believes that a website should be more than just a digital brochure; it should be a seamless, fast, and secure tool that actively grows a business. From optimizing server-side logic to ensuring pixel-perfect front-end responsiveness, he oversees every technical detail to maintain Kexora’s signature quality.
                </p>
                <p>
                  A constant learner of emerging tech stacks, Aditya is dedicated to bringing global web standards to the local ecosystem in{' '}
                  <strong className="font-bold text-zinc-950">
                    Siwan, Bihar
                  </strong>
                  . Under his technical leadership, Kexora continues to push the boundaries of what’s possible in web engineering.
                </p>
              </div>

              <div className="pt-1 flex flex-wrap items-center justify-between gap-4">
                <span className="text-xs text-zinc-500">
                  Full-Stack Engineering · Mobile Apps &amp; Games · UI/UX &amp; Performance
                </span>
                <button
                  type="button"
                  onClick={() =>
                    openContactModal('Technical Consultation with Aditya Singh (CTO)')
                  }
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-zinc-950 hover:opacity-70 transition-opacity"
                >
                  <span>Connect with Aditya</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Our Journey & Evolution + Clean Open Call-to-Action (Modern Timeline, Zero Box Clutter) */}
      <section
        id="our-journey"
        className="py-16 sm:py-24 bg-[#FAFAFB] border-t border-zinc-200/70 text-zinc-950 scroll-mt-20"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {/* Header Row with Interactive Phase Selector */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="max-w-2xl space-y-3">
              <div className="text-xs font-semibold tracking-wider uppercase text-zinc-500">
                Our Evolution · Siwan, Bihar (841226) to Global Delivery
              </div>
              <h2
                className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-950 font-[Outfit] leading-[1.15]"
                style={{ textWrap: 'balance' }}
              >
                Our Journey — From Siwan, Bihar to Global Delivery
              </h2>
              <p className="text-sm sm:text-base text-zinc-600 leading-relaxed">
                How Kexora evolved into a full-service web, mobile app, game, and SEO engineering partner.
              </p>
            </div>

            {/* Clean Segmented Phase Stepper */}
            <div
              role="tablist"
              aria-label="Kexora Journey Phases"
              className="inline-flex items-center gap-1 p-1 bg-zinc-200/70 rounded-full self-start lg:self-auto"
            >
              {milestones.map((m, idx) => {
                const isSelected = activeMilestone === idx;
                return (
                  <button
                    key={m.index}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => setActiveMilestone(idx)}
                    className={`px-3.5 py-1.5 text-xs font-semibold rounded-full transition-all duration-200 whitespace-nowrap shrink-0 ${
                      isSelected
                        ? 'bg-zinc-950 text-white shadow-xs'
                        : 'text-zinc-600 hover:text-zinc-950'
                    }`}
                  >
                    {m.index} · {m.phase}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Continuous Horizontal Timeline Track + Open 4-Column Architectural Flow */}
          <div className="relative">
            {/* Desktop Continuous Hairline Track */}
            <div
              aria-hidden="true"
              className="hidden lg:block absolute top-[18px] left-0 right-0 h-px bg-zinc-200"
            />
            <div
              aria-hidden="true"
              className="hidden lg:block absolute top-[18px] left-0 h-0.5 bg-zinc-950 transition-all duration-300 ease-out"
              style={{
                width: `${((activeMilestone + 1) / milestones.length) * 100}%`,
              }}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-12">
              {milestones.map((m, idx) => {
                const isActive = activeMilestone === idx;
                const isPastOrCurrent = idx <= activeMilestone;
                return (
                  <div
                    key={m.index}
                    onMouseEnter={() => setActiveMilestone(idx)}
                    onClick={() => setActiveMilestone(idx)}
                    className={`group cursor-pointer transition-opacity duration-300 ${
                      isActive ? 'opacity-100' : 'opacity-80 hover:opacity-100'
                    }`}
                  >
                    {/* Timeline Node + Phase Label */}
                    <div className="flex items-center gap-3 mb-5">
                      <span
                        className={`relative z-10 w-9 h-9 rounded-full flex items-center justify-center text-xs font-mono font-bold tabular-nums transition-all duration-300 ${
                          isActive
                            ? 'bg-zinc-950 text-white scale-105 shadow-sm'
                            : isPastOrCurrent
                            ? 'bg-zinc-900 text-white'
                            : 'bg-white text-zinc-500 border border-zinc-300 group-hover:border-zinc-950 group-hover:text-zinc-950'
                        }`}
                      >
                        {m.index}
                      </span>
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-zinc-950 tracking-tight">
                          {m.phase}
                        </div>
                        <div className="text-[11px] text-zinc-500 truncate">
                          {m.tag}
                        </div>
                      </div>
                    </div>

                    {/* Milestone Content (Open & Unboxed) */}
                    <div className="space-y-3">
                      <h3
                        className={`text-base sm:text-[17px] font-bold font-[Outfit] leading-snug transition-colors duration-200 ${
                          isActive
                            ? 'text-zinc-950'
                            : 'text-zinc-800 group-hover:text-zinc-950'
                        }`}
                      >
                        {m.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                        {m.desc}
                      </p>

                      {/* Quiet Unboxed Proof & Capabilities Metadata */}
                      <div className="pt-2 border-t border-zinc-200/80 space-y-1">
                        <div className="text-xs font-bold text-zinc-950 font-mono tabular-nums">
                          {m.metric}
                        </div>
                        <div className="text-[11px] text-zinc-500 leading-relaxed">
                          {m.highlights}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Open Editorial Call-to-Action Strip */}
          <div className="pt-12 border-t border-zinc-200/90 flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8">
            <div className="space-y-2.5 max-w-2xl">
              <div className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
                Ready to Build Your Digital Backbone?
              </div>
              <h3
                className="text-2xl sm:text-3xl lg:text-[2.15rem] font-bold text-zinc-950 font-[Outfit] tracking-tight leading-[1.18]"
                style={{ textWrap: 'balance' }}
              >
                Let’s build a fast, modern website or app that grows your business.
              </h3>
              <p className="text-sm text-zinc-600">
                Direct collaboration with Rajan Singh &amp; Aditya Singh · 0.3s Load Time Target · Complete Web, App &amp; SEO Support
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3.5 shrink-0">
              <button
                type="button"
                onClick={() =>
                  openContactModal('Project Consultation with Rajan & Aditya')
                }
                className="group px-6 py-3.5 text-xs sm:text-sm font-bold text-white bg-zinc-950 hover:bg-zinc-800 rounded-full transition-all duration-200 inline-flex items-center gap-2 whitespace-nowrap shrink-0 shadow-xs"
              >
                <span>Talk to Our Team</span>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
              <button
                type="button"
                onClick={() => onNavigatePage('services')}
                className="group px-5 py-3.5 text-xs sm:text-sm font-bold text-zinc-950 hover:bg-zinc-200/70 rounded-full transition-all duration-200 inline-flex items-center gap-2 whitespace-nowrap shrink-0"
              >
                <span>View Our Services</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

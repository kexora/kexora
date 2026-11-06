/**
 * Kexora Official Design System & Theme Configuration
 * Centralized color codes, surface tokens, typography, and UI rules
 * for Kexora's White & Black Modern Monochrome Theme.
 */

export const KEXORA_THEME = {
  /**
   * 1. Core Color Codes (Hex & RGBA)
   */
  colors: {
    background: {
      primary: '#FFFFFF',      // Pure White main canvas
      secondary: '#F8F8FA',    // Soft Alabaster / Zinc-50 alternating section surface
      dark: '#09090B',         // Deep Carbon Black for Hero overlay, featured cards & Footer
      glassLight: 'rgba(255, 255, 255, 0.92)',
      glassDark: 'rgba(9, 9, 11, 0.68)',
    },
    text: {
      primary: '#09090B',      // Sharp Carbon Black for headings & primary labels
      secondary: '#52525B',    // Neutral Charcoal for readable body paragraphs
      muted: '#71717A',        // Muted Zinc for captions, dates & metadata
      inverse: '#FFFFFF',      // Pure White text on black surfaces
      inverseMuted: '#D4D4D8', // Soft White/Zinc-300 on dark surfaces
    },
    border: {
      subtle: '#E4E4E7',       // Crisp 1px hairline border (zinc-200)
      medium: '#D4D4D8',       // Medium border (zinc-300)
      strong: '#09090B',       // Active / hover high-contrast black border
      darkSubtle: '#27272A',   // Hairline border on dark surfaces (zinc-800)
    },
  },

  /**
   * 2. Design Rules & Principles
   */
  rules: {
    paletteRule: 'Strict White & Black monochrome hierarchy. Use solid black (#09090B) for primary actions and active states; crisp white (#FFFFFF) and soft zinc (#F8F8FA) for alternating sections.',
    languageRule: 'Use simple, clear, everyday English focused on client outcomes. Avoid overly technical jargon in headlines and summaries.',
    motionRule: 'Use unified cubic-bezier(0.16, 1, 0.3, 1) transitions for smooth, synchronized hover and scroll animations.',
    cardRule: 'All cards use 24px (rounded-3xl) or 16px (rounded-2xl) corners, 1px hairline borders, and subtle lift + black border emphasis on hover.',
  },

  /**
   * 3. Reusable Tailwind Class Tokens
   */
  classes: {
    // Section Wrappers
    sectionWhite: 'py-20 sm:py-24 bg-white text-zinc-950 border-b border-zinc-200',
    sectionMuted: 'py-20 sm:py-24 bg-[#F8F8FA] text-zinc-950 border-b border-zinc-200',
    sectionDark: 'py-20 sm:py-24 bg-zinc-950 text-white border-b border-zinc-900',
    container: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',

    // Typography
    kicker: 'text-xs font-bold uppercase tracking-[0.2em] text-zinc-500 mb-2.5',
    kickerDark: 'text-xs font-bold uppercase tracking-[0.2em] text-zinc-400 mb-2.5',
    heading2: 'text-3xl sm:text-4xl lg:text-[2.65rem] font-extrabold tracking-tight text-zinc-950 font-[Outfit] leading-[1.12]',
    heading2Dark: 'text-3xl sm:text-4xl lg:text-[2.65rem] font-extrabold tracking-tight text-white font-[Outfit] leading-[1.12]',
    subtitle: 'text-sm sm:text-base text-zinc-600 leading-relaxed',
    subtitleDark: 'text-sm sm:text-base text-zinc-300 leading-relaxed',

    // Cards
    cardOnWhite:
      'rounded-3xl bg-[#F8F8FA] border border-zinc-200/90 hover:bg-white hover:border-zinc-950 hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]',
    cardOnMuted:
      'rounded-3xl bg-white border border-zinc-200/90 hover:border-zinc-950 hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]',
    cardDarkFeatured:
      'rounded-3xl bg-zinc-950 text-white border-2 border-zinc-950 shadow-[0_24px_60px_rgba(0,0,0,0.18)] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]',

    // Buttons
    btnPrimaryBlack:
      'px-6 py-3.5 text-xs sm:text-sm font-bold text-white bg-zinc-950 hover:bg-zinc-800 rounded-full transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] inline-flex items-center justify-center gap-2 whitespace-nowrap shrink-0 shadow-sm',
    btnPrimaryWhite:
      'px-6 py-3.5 text-xs sm:text-sm font-bold text-zinc-950 bg-white hover:bg-zinc-200 rounded-full transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] inline-flex items-center justify-center gap-2 whitespace-nowrap shrink-0 shadow-md',
    btnSecondaryOutline:
      'px-5 py-3 text-xs sm:text-sm font-bold text-zinc-950 bg-white hover:bg-zinc-950 hover:text-white border border-zinc-300 hover:border-zinc-950 rounded-full transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] inline-flex items-center justify-center gap-2 whitespace-nowrap shrink-0',
  },
} as const;

export default KEXORA_THEME;

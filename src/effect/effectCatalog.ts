export type BlurKexDirection = 'up' | 'down' | 'left' | 'right' | 'scale';

export type EffectId = 'blurkex' | 'blurkex-stagger' | 'blurkex-card';

export interface BlurKexConfig {
  id: EffectId;
  name: string;
  description: string;
  duration: number;
  blurPx: number;
  offsetPx: number;
  scaleFrom: number;
  easing: [number, number, number, number];
}

/**
 * Official Kexora Effect Catalog
 * Contains the signature 'blurkex' slow-motion blur + slide + reveal preset
 * and its staggered and card variants.
 */
export const KEXORA_EFFECT_LIST: Record<EffectId, BlurKexConfig> = {
  blurkex: {
    id: 'blurkex',
    name: 'BlurKex Slow-Motion Reveal',
    description:
      'Signature Kexora slow-motion blur + directional slide + smooth opacity reveal on initial load and viewport entry.',
    duration: 0.95,
    blurPx: 14,
    offsetPx: 32,
    scaleFrom: 0.975,
    easing: [0.16, 1, 0.3, 1],
  },
  'blurkex-stagger': {
    id: 'blurkex-stagger',
    name: 'BlurKex Cascade Stagger',
    description:
      'Sequenced multi-card slow-motion blur + slide cascade for Bento grids, pricing cards, and case study lists.',
    duration: 0.88,
    blurPx: 12,
    offsetPx: 26,
    scaleFrom: 0.98,
    easing: [0.16, 1, 0.3, 1],
  },
  'blurkex-card': {
    id: 'blurkex-card',
    name: 'BlurKex Interactive Surface',
    description:
      'Combines BlurKex slow-motion entry with subtle hover elevation for interactive cards.',
    duration: 0.9,
    blurPx: 12,
    offsetPx: 28,
    scaleFrom: 0.98,
    easing: [0.16, 1, 0.3, 1],
  },
};

export interface BlurKexMotionFrames {
  initial: {
    opacity: number;
    filter: string;
    x: number;
    y: number;
    scale: number;
  };
  animate: {
    opacity: number;
    filter: string;
    x: number;
    y: number;
    scale: number;
  };
  transition: {
    duration: number;
    delay: number;
    ease: [number, number, number, number];
  };
}

/**
 * Pure deterministic helper that computes the initial, animate, and transition
 * keyframes for the 'blurkex' slow-motion blur + slide + reveal effect.
 */
export function computeBlurKexFrames(options?: {
  effect?: EffectId;
  direction?: BlurKexDirection;
  delay?: number;
  duration?: number;
  blurPx?: number;
  distance?: number;
  staggerIndex?: number;
  staggerStep?: number;
}): BlurKexMotionFrames {
  const preset = KEXORA_EFFECT_LIST[options?.effect ?? 'blurkex'];
  const direction = options?.direction ?? 'up';
  const distance = options?.distance ?? preset.offsetPx;
  const blur = options?.blurPx ?? preset.blurPx;
  const duration = options?.duration ?? preset.duration;
  const baseDelay = options?.delay ?? 0;
  const staggerDelay = (options?.staggerIndex ?? 0) * (options?.staggerStep ?? 0.09);
  const totalDelay = Number((baseDelay + staggerDelay).toFixed(3));

  let x = 0;
  let y = 0;
  let scale = preset.scaleFrom;

  switch (direction) {
    case 'up':
      y = distance;
      break;
    case 'down':
      y = -distance;
      break;
    case 'left':
      x = distance;
      break;
    case 'right':
      x = -distance;
      break;
    case 'scale':
      scale = 0.93;
      y = Math.round(distance * 0.45);
      break;
  }

  return {
    initial: {
      opacity: 0,
      filter: `blur(${blur}px)`,
      x,
      y,
      scale,
    },
    animate: {
      opacity: 1,
      filter: 'blur(0px)',
      x: 0,
      y: 0,
      scale: 1,
    },
    transition: {
      duration,
      delay: totalDelay,
      ease: preset.easing,
    },
  };
}

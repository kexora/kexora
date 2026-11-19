import React from 'react';
import { motion } from 'motion/react';
import {
  BlurKexDirection,
  EffectId,
  computeBlurKexFrames,
} from './effectCatalog';

export interface BlurKexProps {
  children: React.ReactNode;
  className?: string;
  effect?: EffectId;
  direction?: BlurKexDirection;
  delay?: number;
  duration?: number;
  blurPx?: number;
  distance?: number;
  staggerIndex?: number;
  staggerStep?: number;
  trigger?: 'mount' | 'inView';
  once?: boolean;
  amount?: number;
  as?: 'div' | 'section' | 'article' | 'header' | 'footer';
  onClick?: React.MouseEventHandler<HTMLElement>;
}

/**
 * BlurKex — Signature Kexora Slow-Motion Blur + Slide + Reveal Wrapper
 * Combines Gaussian blur dissolve, directional slide, and gentle scale settle
 * on first load or viewport entry across the entire Kexora application.
 */
export const BlurKex: React.FC<BlurKexProps> = ({
  children,
  className = '',
  effect = 'blurkex',
  direction = 'up',
  delay = 0,
  duration,
  blurPx,
  distance,
  staggerIndex = 0,
  staggerStep = 0.08,
  trigger = 'inView',
  once = true,
  amount = 0.12,
  as = 'div',
  onClick,
}) => {
  const frames = computeBlurKexFrames({
    effect,
    direction,
    delay,
    duration,
    blurPx,
    distance,
    staggerIndex,
    staggerStep,
  });

  const MotionTag =
    as === 'section'
      ? motion.section
      : as === 'article'
        ? motion.article
        : as === 'header'
          ? motion.header
          : as === 'footer'
            ? motion.footer
            : motion.div;

  if (trigger === 'mount') {
    return (
      <MotionTag
        data-effect={effect}
        onClick={onClick}
        initial={frames.initial}
        animate={frames.animate}
        transition={frames.transition}
        className={`will-change-[transform,opacity,filter] ${className}`}
      >
        {children}
      </MotionTag>
    );
  }

  return (
    <MotionTag
      data-effect={effect}
      onClick={onClick}
      initial={frames.initial}
      whileInView={frames.animate}
      viewport={{ once, amount }}
      transition={frames.transition}
      className={`will-change-[transform,opacity,filter] ${className}`}
    >
      {children}
    </MotionTag>
  );
};

export default BlurKex;

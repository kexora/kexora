import { useEffect, useId } from 'react';
import { SITE_NAME } from '../../data/seoRegistry';

const MAX_CONTEXT_LENGTH = 34;

/**
 * Formats a concise, readable browser tab title for display next to the favicon.
 * Always keeps the Kexora brand visible without messy truncation.
 */
export function formatDynamicTabTitle(
  context?: string | null,
  brandName: string = SITE_NAME
): string {
  const cleaned = (context || '').replace(/\s+/g, ' ').trim();
  if (!cleaned) return brandName;

  // If the string already ends with or starts with the brand separator, return cleanly
  if (
    cleaned === brandName ||
    cleaned.endsWith(`· ${brandName}`) ||
    cleaned.endsWith(`| ${brandName}`) ||
    cleaned.startsWith(`${brandName} ·`) ||
    cleaned.startsWith(`${brandName} —`)
  ) {
    return cleaned;
  }

  let compact = cleaned;
  if (compact.length > MAX_CONTEXT_LENGTH) {
    const sliced = compact.slice(0, MAX_CONTEXT_LENGTH);
    const lastSpace = sliced.lastIndexOf(' ');
    compact = (lastSpace > 16 ? sliced.slice(0, lastSpace) : sliced).trimEnd() + '…';
  }

  return `${compact} · ${brandName}`;
}

interface TitleLayer {
  id: string;
  priority: number;
  title: string;
}

let baseTabTitle = `${SITE_NAME} · Web, App & AI-SEO`;
const contextualLayers: TitleLayer[] = [];

export function resolveActiveTabTitle(): string {
  if (contextualLayers.length === 0) return baseTabTitle;
  let winner = contextualLayers[0];
  for (let i = 1; i < contextualLayers.length; i++) {
    // Higher priority wins; for equal priority, most recently pushed wins
    if (contextualLayers[i].priority >= winner.priority) {
      winner = contextualLayers[i];
    }
  }
  return winner.title;
}

function applyTitleToDocument(): void {
  if (typeof document !== 'undefined') {
    document.title = resolveActiveTabTitle();
  }
}

export function setBaseTabTitle(title: string): void {
  baseTabTitle = title;
  applyTitleToDocument();
}

export function setContextualTabLayer(
  id: string,
  context: string | null | undefined,
  priority = 10
): void {
  const existingIdx = contextualLayers.findIndex((layer) => layer.id === id);
  const cleaned = (context || '').trim();

  if (!cleaned) {
    if (existingIdx !== -1) {
      contextualLayers.splice(existingIdx, 1);
      applyTitleToDocument();
    }
    return;
  }

  const formatted = formatDynamicTabTitle(cleaned);
  const nextLayer: TitleLayer = { id, priority, title: formatted };

  if (existingIdx !== -1) {
    contextualLayers[existingIdx] = nextLayer;
  } else {
    contextualLayers.push(nextLayer);
  }
  applyTitleToDocument();
}

export function clearContextualTabLayer(id: string): void {
  const idx = contextualLayers.findIndex((layer) => layer.id === id);
  if (idx !== -1) {
    contextualLayers.splice(idx, 1);
    applyTitleToDocument();
  }
}

export function resetTabTitleManagerForTest(): void {
  baseTabTitle = `${SITE_NAME} · Web, App & AI-SEO`;
  contextualLayers.length = 0;
}

/**
 * React hook that dynamically updates the browser tab title while a user is
 * performing a specific task (opening a modal, inspecting a case study, reading
 * an article, filtering pricing, requesting a service quote, or auditing a domain).
 *
 * Priority guidelines:
 * - 10: In-page filter, active section, or active tool state
 * - 20: Active quote / form task intent
 * - 30: Foreground modal / drawer (article reader, case study preview, services explorer)
 */
export function useContextualTabTitle(
  context: string | null | undefined,
  priority = 10
): void {
  const layerId = useId();

  useEffect(() => {
    setContextualTabLayer(layerId, context, priority);
    return () => {
      clearContextualTabLayer(layerId);
    };
  }, [layerId, context, priority]);
}

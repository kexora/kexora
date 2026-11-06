import { WhatsAppMessage, CalculationInput, CalculationResult } from '../types';

/**
 * Parses raw WhatsApp exported .txt chat logs into structured messages.
 * Supports standard iOS/Android export formats:
 * - "12/05/2026, 10:15 am - Rajan Singh: Hello..."
 * - "[12/05/2026, 10:15:22 AM] Rajan Singh: Hello..."
 */
export function parseWhatsAppChat(rawText: string): WhatsAppMessage[] {
  if (!rawText || !rawText.trim()) {
    return [];
  }

  const lines = rawText.split(/\r?\n/);
  const messages: WhatsAppMessage[] = [];

  // Matches "DD/MM/YYYY, HH:MM am/pm - Sender: Message" or "[DD/MM/YYYY, HH:MM:SS] Sender: Message"
  const lineRegex = /^(?:\[)?(\d{1,2}[\/\.-]\d{1,2}[\/\.-]\d{2,4}),?\s+(\d{1,2}:\d{2}(?::\d{2})?(?:\s*[apAP][mM])?)(?:\])?\s*(?:-|\s)\s*([^:]+):\s*(.+)$/;

  let currentMsg: WhatsAppMessage | null = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    const match = line.match(lineRegex);
    if (match) {
      if (currentMsg) {
        messages.push(currentMsg);
      }
      currentMsg = {
        id: `msg-${messages.length + 1}`,
        date: match[1].trim(),
        time: match[2].trim(),
        sender: match[3].trim(),
        text: match[4].trim(),
      };
    } else if (currentMsg) {
      currentMsg.text += `\n${line}`;
    }
  }

  if (currentMsg) {
    messages.push(currentMsg);
  }

  return messages;
}

/**
 * Filters parsed WhatsApp messages by sender and search query.
 */
export function filterWhatsAppMessages(
  messages: WhatsAppMessage[],
  senderFilter: string,
  searchQuery: string
): WhatsAppMessage[] {
  const normalizedSender = senderFilter.trim().toLowerCase();
  const normalizedQuery = searchQuery.trim().toLowerCase();

  return messages.filter((msg) => {
    const matchesSender =
      !normalizedSender ||
      normalizedSender === 'all' ||
      msg.sender.toLowerCase() === normalizedSender;
    const matchesQuery =
      !normalizedQuery ||
      msg.text.toLowerCase().includes(normalizedQuery) ||
      msg.sender.toLowerCase().includes(normalizedQuery);
    return matchesSender && matchesQuery;
  });
}

/**
 * Calculates project setup & monthly maintenance cost based on Kexora's authentic pricing tiers:
 * - Beginner Plan: ₹999/mo + ₹8,000 setup
 * - Creative Plan: ₹2,499/mo + ₹18,000 setup
 * - Expert Plan: ₹4,999/mo + ₹40,000+ setup
 */
export function calculateKexoraEstimate(input: CalculationInput): CalculationResult {
  const isUsd = input.currency === 'USD';
  const rate = isUsd ? 1 / 80 : 1; // Clean conversion factor for USD display
  const currencySymbol = isUsd ? '$' : '₹';

  let baseSetupInr = 8000;
  let monthlyInr = 999;
  let recommendedPlanName = 'Beginner Plan';
  let baseWeeks = 2;

  if (input.projectType === 'business-custom') {
    baseSetupInr = 18000;
    monthlyInr = 2499;
    recommendedPlanName = 'Creative Plan';
    baseWeeks = 3;
  } else if (input.projectType === 'ecommerce' || input.projectType === 'app-game') {
    baseSetupInr = 40000;
    monthlyInr = 4999;
    recommendedPlanName = 'Expert Plan';
    baseWeeks = 4;
  }

  const breakdown: { label: string; amount: number }[] = [
    {
      label: `${recommendedPlanName} Base Setup`,
      amount: Math.round(baseSetupInr * rate),
    },
  ];

  // Additional pages beyond 5
  const extraPages = Math.max(0, input.pageCount - 5);
  const extraPagesCostInr = extraPages * 1200;
  if (extraPagesCostInr > 0) {
    breakdown.push({
      label: `Additional Custom Pages (+${extraPages} pages)`,
      amount: Math.round(extraPagesCostInr * rate),
    });
  }

  let addonsInr = 0;
  if (input.includeAiSeo) {
    const seoCost = 6000;
    addonsInr += seoCost;
    breakdown.push({
      label: 'AI-SEO, Schema.org Sitelinks & GMB Setup',
      amount: Math.round(seoCost * rate),
    });
  }

  if (input.includeBranding) {
    const brandCost = 5000;
    addonsInr += brandCost;
    breakdown.push({
      label: 'Brand Identity, Logo, Brochure & UI/UX Kit',
      amount: Math.round(brandCost * rate),
    });
  }

  if (input.includeCompliance) {
    const complianceCost = 7500;
    addonsInr += complianceCost;
    breakdown.push({
      label: 'GST, Trademark & ISO Registration Support',
      amount: Math.round(complianceCost * rate),
    });
  }

  const totalSetupInr = baseSetupInr + extraPagesCostInr + addonsInr;
  const setupCost = Math.round(totalSetupInr * rate);
  const monthlyRetainer = Math.round(monthlyInr * rate);
  const estimatedTimelineWeeks = baseWeeks + Math.floor(extraPages / 6) + (input.includeBranding ? 1 : 0);

  return {
    setupCost,
    monthlyRetainer,
    estimatedTimelineWeeks,
    currencySymbol,
    recommendedPlanName,
    breakdown,
  };
}

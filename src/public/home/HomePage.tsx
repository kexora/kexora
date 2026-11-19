import React from 'react';
import { ActiveTab, ToolTab } from '../../types';
import { Hero } from './Hero';
import { HomeServicesSection } from './HomeServicesSection';
import { HomeCaseStudiesSection } from './HomeCaseStudiesSection';
import { HomePricingSection } from './HomePricingSection';
import { HomeToolsDockSection } from './HomeToolsDockSection';
import { HomeLeadershipJournalSection } from './HomeLeadershipJournalSection';
import { HomeImpactFaqSection } from './HomeImpactFaqSection';

interface HomePageProps {
  openContactModal: (serviceName?: string, details?: string) => void;
  onNavigatePage: (page: ActiveTab) => void;
  openToolsWithTab: (tool: ToolTab) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  openContactModal,
  onNavigatePage,
  openToolsWithTab,
}) => {
  return (
    <div className="bg-white text-zinc-950 overflow-x-hidden">
      <Hero
        openContactModal={() => openContactModal()}
        openTools={(t) => openToolsWithTab(t)}
        onNavigatePage={onNavigatePage}
      />

      <HomeServicesSection
        openContactModal={openContactModal}
        onNavigatePage={onNavigatePage}
      />

      <HomeCaseStudiesSection openContactModal={openContactModal} />

      <HomePricingSection
        openContactModal={openContactModal}
        onNavigatePage={onNavigatePage}
      />

      <HomeToolsDockSection
        onNavigatePage={onNavigatePage}
        openToolsWithTab={openToolsWithTab}
      />

      <HomeLeadershipJournalSection
        openContactModal={openContactModal}
        onNavigatePage={onNavigatePage}
      />

      <HomeImpactFaqSection
        openContactModal={openContactModal}
        onNavigatePage={onNavigatePage}
      />
    </div>
  );
};

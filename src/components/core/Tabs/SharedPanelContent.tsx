'use client';

import { useTabs } from "./Tabs";

type SharedPanelContentProps = {
  activeTabContent: {
    [key: string]: React.ReactNode;
  };
};

export const SharedPanelContent: React.FC<SharedPanelContentProps> = ({ activeTabContent }) => {
  const { activeTab } = useTabs();

  return <>{activeTabContent[activeTab]}</>;
};

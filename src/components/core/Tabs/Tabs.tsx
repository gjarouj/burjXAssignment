'use client';

import React, { createContext, useContext, useState, useRef, useEffect } from 'react';
import { TabsProps, TabsContextType } from './Tabs.types';
import styles from './Tabs.module.scss';

const TabsContext = createContext<TabsContextType | undefined>(undefined);

export const useTabs = () => {
  const context = useContext(TabsContext);
  if (!context) throw new Error('Tab or TabPanel must be used within <Tabs />');
  return context;
};

export const Tabs: React.FC<TabsProps> = ({ children, defaultTab, onTabChange }) => {
  const [activeTab, setActiveTab] = useState(defaultTab);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

    useEffect(() => {
    if (onTabChange) onTabChange(activeTab);
  }, [activeTab, onTabChange]);

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab, tabRefs }}>
      <div className={styles.tabsWrapper} role="tablist">
        {children}
      </div>
    </TabsContext.Provider>
  );
};

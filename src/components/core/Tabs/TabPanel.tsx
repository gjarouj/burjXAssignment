
import React from 'react';
import { useTabs } from './Tabs';
import { TabPanelProps } from './Tabs.types';
import styles from './Tabs.module.scss';

export const TabPanel: React.FC<TabPanelProps> = ({ children, value }) => {
  const { activeTab } = useTabs()

  return activeTab === value ? <div className={styles.tabPanel}>{children}</div> : null
}

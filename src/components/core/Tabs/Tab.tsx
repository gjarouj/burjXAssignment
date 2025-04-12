import React, { useEffect, useRef } from 'react';
import { useTabs } from './Tabs';
import { TabProps } from './Tabs.types';
import styles from './Tabs.module.scss';
import Image from "next/image";

export const Tab: React.FC<TabProps> = ({ label, value, imgSrc }) => {
  const { activeTab, setActiveTab, tabRefs } = useTabs();
  const localRef = useRef<HTMLButtonElement>(null);
  const indexRef = useRef<number | null>(null);

  // Register tab ref
  useEffect(() => {
    if (tabRefs?.current) {
      const index = tabRefs.current.length;
      tabRefs.current[index] = localRef.current;
      indexRef.current = index;
    }
  }, [tabRefs]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (!tabRefs?.current || indexRef.current === null) return;
    const currentIndex = indexRef.current;

    if (e.key === 'ArrowRight') {
      e.preventDefault();
      const nextIndex = (currentIndex + 1) % tabRefs.current.length;
      tabRefs.current[nextIndex]?.focus();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      const prevIndex = (currentIndex - 1 + tabRefs.current.length) % tabRefs.current.length;
      tabRefs.current[prevIndex]?.focus();
    }
  };

  return (
    <button
      ref={localRef}
      onClick={() => setActiveTab(value)}
      onKeyDown={handleKeyDown}
      aria-label={activeTab === value ? `${label}, active tab` : `Go to ${label} tab`}
      className={`${styles.tab} ${activeTab === value ? styles.active : ''}`}
      role="tab"
      aria-selected={activeTab === value}
      tabIndex={activeTab === value ? 0 : -1}
    >
      <Image
        src={imgSrc}
        aria-hidden="true"
        alt={activeTab === value ? `${label} active tab icon` : `${label} inactive tab icon`}
        width={20}
        height={20}
      />
      {label}
    </button>
  );
};

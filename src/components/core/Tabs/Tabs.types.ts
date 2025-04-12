export interface TabsProps {
    children: React.ReactNode;
    defaultTab: string;
    onTabChange?: (tabValue: string) => void;
}
  
export interface TabsContextType {
    activeTab: string;
    setActiveTab: (value: string) => void;
    tabRefs?: React.RefObject<(HTMLButtonElement | null)[]>
}

export interface TabProps {
  imgSrc: string;
  label: string;
  value: string;
}

export interface TabPanelProps {
  children: React.ReactNode;
  value: string;
}
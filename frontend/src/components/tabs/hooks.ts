import { useState } from 'react';

import { ITab } from './interfaces';

export const useTabs = (
  tabs: ITab[],
  initActiveTabValue?: string
): [ITab[], ITab, (tab: ITab) => void] => {
  const [activeTab, setActiveTab] = useState(
    tabs.find((tab: ITab) => tab.value === initActiveTabValue) || tabs[0]
  );

  return [tabs, activeTab, setActiveTab];
};

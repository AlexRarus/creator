import { useState } from 'react';

import { ITab } from './interfaces';

export const useTabs = (
  tabs: ITab<any>[],
  initActiveTabValue?: string
): [ITab<any>[], ITab<any>, (tab: ITab<any>) => void] => {
  const [activeTab, setActiveTab] = useState(
    tabs.find((tab: ITab<any>) => tab.value === initActiveTabValue) || tabs[0]
  );

  return [tabs, activeTab, setActiveTab];
};

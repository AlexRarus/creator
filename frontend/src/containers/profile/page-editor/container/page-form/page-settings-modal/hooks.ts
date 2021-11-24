import { useState } from 'react';

import { TabValue, ITab } from './interfaces';

const tabs = [
  {
    value: TabValue.LINK,
    label: 'Ссылка',
  },
  {
    value: TabValue.QR,
    label: 'QR код',
  },
  {
    value: TabValue.SEO,
    label: 'СЕО',
  },
];

export const useTabs = (initActiveTabValue: TabValue): [ITab[], ITab, (tab: ITab) => void] => {
  const [activeTab, setActiveTab] = useState(
    tabs.find((tab: ITab) => tab.value === initActiveTabValue) || tabs[0]
  );

  return [tabs, activeTab, setActiveTab];
};

import React from 'react';

import { ITab } from './interfaces';
import { TabsWrapper, TabItem } from './style';

interface IProps {
  tabs: ITab<any>[];
  activeTab?: ITab<any>;
  onChangeTab?(tab: ITab<any>): void;
  hasUnderline?: boolean;
  padding?: string;
}

export { TabContainer } from './style';
export { useTabs } from './hooks';
export type { ITab } from './interfaces';

export const Tabs = (props: IProps) => {
  const { tabs, activeTab, onChangeTab, hasUnderline = true, padding = '0 10px' } = props;

  return (
    <TabsWrapper hasUnderline={hasUnderline} padding={padding}>
      {tabs.map((tab: ITab<any>) => (
        <TabItem
          key={tab.value}
          isActive={tab.value === activeTab?.value}
          onClick={() => onChangeTab && onChangeTab(tab)}>
          {tab.label}
        </TabItem>
      ))}
    </TabsWrapper>
  );
};

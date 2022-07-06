import React from 'react';
import Tabs, { tabsClasses } from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

export interface ITab {
  label: string;
  value: any;
  [key: string]: any;
}

interface IProps {
  value: any;
  tabs: ITab[];
  onChange(value: any): void;
}

export const MuiTabs = (props: IProps) => {
  const { value, tabs, onChange } = props;

  const onChangeTab = (event: React.SyntheticEvent, newValue: any) => {
    onChange(newValue);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: 'background.transparent',
        mb: 2,
        height: 48,
        maxHeight: 48,
      }}>
      <Tabs
        value={value}
        onChange={onChangeTab}
        variant='scrollable'
        scrollButtons={true}
        allowScrollButtonsMobile={true}
        aria-label='visible arrows tabs example'
        sx={{
          [`& .${tabsClasses.scrollButtons}`]: {
            '&.Mui-disabled': { opacity: 0.3 },
          },
        }}>
        {tabs.map((tab: ITab) => (
          <Tab label={tab.label} value={tab.value} key={tab.value} />
        ))}
      </Tabs>
    </Box>
  );
};

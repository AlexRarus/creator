import React from 'react';
import { Grid, GridColumn } from 'src/components/grid';
import { useThemeContext } from 'src/providers/dark-theme-provider';

import { ThemesWrapper, ThemesHeader, ThemeItem } from './styles';

// interface IProps {}

export const ThemesContainer = (props: any) => {
  const { themeType, toggleTheme, initialThemesList } = useThemeContext();

  const handleChangeTheme = (type: string) => () => {
    toggleTheme(type);
  };

  return (
    <ThemesWrapper>
      <ThemesHeader>Доступные темы</ThemesHeader>
      <Grid
        // alignItems="end" колонки будут выравнены по правому краю
        gap={24}
        verticalGap={32}
        // staticSize={6} если передать то пересчета размеров для разных breakPoints НЕ БУДЕТ
        breakPoints={{
          // все переданные здесь значения выставлены по-умолчанию
          // можно передать через контекст ThemeProvider theme: { gridBreakPoints: {...} }
          '320px': 4, // 4 колонки при ширине экрана 320 и меньше
          '530px': 6, // 6 колонок при ширине экрана 530 и меньше
          '950px': 8, // 8 колонок при ширине экрана 950 и меньше
          '1024px': 10, // 10 колонок при ширине экрана 1024 и меньше
          '1280px': 12, // 12 колонок при ширине экрана 1280 и меньше
        }}>
        {initialThemesList.map((theme: any) => (
          <GridColumn key={theme.type} size={2}>
            <ThemeItem
              onClick={handleChangeTheme(theme.type)}
              isSelected={theme.type === themeType}>
              {theme.type}
            </ThemeItem>
          </GridColumn>
        ))}
      </Grid>
    </ThemesWrapper>
  );
};

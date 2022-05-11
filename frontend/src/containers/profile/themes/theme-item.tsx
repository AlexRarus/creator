import React from 'react';
import { ITheme } from 'src/dal/themes/interfaces';
import { UserThemeBackground } from 'src/components/user-theme-background';

import { ThemeItemHeader, ThemeItemText, UserBlock } from './styles';

interface IProps {
  theme: ITheme;
}

export const ThemeItem = (props: IProps) => {
  const { theme } = props;

  return (
    <UserThemeBackground theme={theme} minHeight='100%'>
      <UserBlock color={theme.color} />
      <ThemeItemHeader color={theme.headerColor}>Заголовок</ThemeItemHeader>
      <ThemeItemText color={theme.color}>
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.
        Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur
        ridiculus mus.
      </ThemeItemText>
    </UserThemeBackground>
  );
};

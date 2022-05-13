import React from 'react';
import { withTheme } from 'styled-components';

import { ReactComponent as SvgDarkLogo } from '../icons/logo/dark-logo.svg';
import { ReactComponent as SvgLightLogo } from '../icons/logo/light-logo.svg';
import { ITheme } from '../theme';

import { LogoWrapper } from './style';

interface IProps {
  theme: ITheme;
}

export const LogoComponent = withTheme((props: IProps) => {
  const { theme } = props;

  return (
    <LogoWrapper>{theme.themeType === 'light' ? <SvgDarkLogo /> : <SvgLightLogo />}</LogoWrapper>
  );
});

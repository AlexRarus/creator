import React from 'react';
import { withTheme } from 'styled-components';

import { SvgDarkLogo, SvgLightLogo } from '../icons';
import { ITheme } from '../theme';

import { LogoWrapper } from './style';

interface IProps {
  theme: ITheme;
}

export const LogoComponent = withTheme((props: IProps) => {
  const { theme } = props;

  return (
    <LogoWrapper>
      {theme.themeType === 'light' ? (
        <SvgDarkLogo width={124} height={50} />
      ) : (
        <SvgLightLogo width={124} height={50} />
      )}
    </LogoWrapper>
  );
});

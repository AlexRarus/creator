import React from 'react';
import Locale from 'src/components/locale';
import { COLORS } from 'src/components/theme';

import { FooterWrapper, LeftSide, RightSide, LinkStyled } from './style';

export function Footer() {
  return (
    <FooterWrapper>
      <LeftSide />
      <RightSide>
        <LinkStyled to='/' color={COLORS.black}>
          Главная
        </LinkStyled>
        <Locale />
      </RightSide>
    </FooterWrapper>
  );
}

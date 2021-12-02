import styled, { css } from 'styled-components';
import { MEDIA, FONTS } from 'src/components/theme';

import { MENU_HEIGHT } from '../../../components/menu/constants';

export const ProfileLayoutWrapper = styled.div<{ isApp?: boolean; height?: number }>`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  ${FONTS.InterStyle};
  background: inherit;

  ${({ isApp, height }) =>
    isApp &&
    css`
      overflow: auto;
      height: ${height}px;
    `}
`;

export const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  color: ${({ theme }) => theme.color};
  background: ${({ theme }) => theme.background};
  ${MEDIA.max1024({
    marginLeft: '0',
  })}
`;

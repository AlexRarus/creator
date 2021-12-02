import styled from 'styled-components';
import { MEDIA, FONTS } from 'src/components/theme';
import { MENU_HEIGHT } from 'src/components/menu/constants';

export const ProfileLayoutWrapper = styled.div<{ isApp?: boolean; height?: number }>`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  ${FONTS.InterStyle};
  background: inherit;
  padding-top: ${MENU_HEIGHT}px;

  overflow: auto;
  height: 736px;
`;

export const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  ${MEDIA.max1024({
    marginLeft: '0',
  })}
`;

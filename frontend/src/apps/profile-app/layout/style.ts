import styled from 'styled-components';
import { MEDIA, FONTS } from 'src/components/theme';
import { MENU_HEIGHT } from 'src/components/menu/constants';

export const ProfileLayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  ${FONTS.InterStyle};
  background: inherit;
  padding-top: ${MENU_HEIGHT}px;
  padding-bottom: ${({ theme }) => (theme?.isMobile ? '80px' : '0px')};
`;

export const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  ${MEDIA.max1024({
    marginLeft: '0',
  })}
`;

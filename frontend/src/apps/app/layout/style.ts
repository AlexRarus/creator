import styled from 'styled-components';
import { MEDIA, FONTS } from 'src/components/theme';

export const ProfileLayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  ${FONTS.InterStyle};
  background: inherit;
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

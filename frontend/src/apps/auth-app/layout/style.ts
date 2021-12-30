import styled, { css } from 'styled-components';
import { MEDIA, FONTS } from 'src/components/theme';

export const AuthLayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  ${FONTS.InterStyle};
  background: inherit;

  ${({ theme }) =>
    theme.isMobile &&
    css`
      height: 100vh;
    `}
`;

export const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  ${MEDIA.max1024({
    marginLeft: '0',
  })}
`;

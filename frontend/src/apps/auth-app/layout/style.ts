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
      height: calc(100vh + 80px);
      padding-bottom: 80px;
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

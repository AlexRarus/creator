import styled from 'styled-components';
import { MEDIA, FONTS, defaultTheme } from 'src/components/theme';

export const AuthLayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  ${FONTS.InterStyle};
  background: inherit;
`;
AuthLayoutWrapper.defaultProps = {
  theme: defaultTheme,
};

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
PageWrapper.defaultProps = {
  theme: defaultTheme,
};

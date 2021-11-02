import styled from 'styled-components';
import { rgba } from 'polished';
import { COLORS, defaultTheme, getThemeProps } from 'src/components/theme';

export const AuthPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
AuthPageWrapper.defaultProps = {
  theme: defaultTheme,
};

export const AuthFormWrapper = styled.form`
  padding: 32px;
  max-width: 100%;
  width: 400px;
  margin: 100px 10px 0;
  border-radius: 4px;
  background: ${getThemeProps('background.primary')};
  box-shadow: 0 0.6px 1.8px ${rgba(COLORS.black, 0.1)}, 0px 3.2px 7.2px ${rgba(COLORS.black, 0.14)};
`;
AuthFormWrapper.defaultProps = {
  theme: defaultTheme,
};

export const FormTitle = styled.div`
  width: 100%;
  font-size: 21px;
  line-height: 1.5em;
  margin-bottom: 8px;
  text-align: center;
`;
FormTitle.defaultProps = {
  theme: defaultTheme,
};

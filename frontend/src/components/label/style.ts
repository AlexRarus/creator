import styled from 'styled-components';
import { defaultTheme, getThemeProps } from 'src/components/theme';

interface ILabelStyledProps {
  isRequired: boolean;
}

export const LabelStyled = styled.label<ILabelStyledProps>`
  position: relative;
  font-size: 14px;
  color: ${getThemeProps('textColor.primary')};
  cursor: pointer;
  margin-bottom: 4px;

  &:after {
    font-size: 16px;
    color: ${getThemeProps('color.warning')};
    display: ${({ isRequired }) => (isRequired ? 'block' : 'none')};
    position: absolute;
    right: -8px;
    top: 0;
    content: '*';
  }
`;
LabelStyled.defaultProps = {
  theme: defaultTheme,
};

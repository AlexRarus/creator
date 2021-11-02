import styled from 'styled-components';
import { defaultTheme, getThemeProps, ITheme } from 'src/components/theme';

import { getInputHeight, getInputFontSize } from '../input-components';

import { TDimension } from './interfaces';

interface IComponentWrapperProps {
  dimension: TDimension;
  theme: ITheme;
}

interface IInputStyledProps extends IComponentWrapperProps {
  disabled: boolean;
  iconWrapperWidth: number;
}

const getInputBackground = (props: IInputStyledProps) => {
  const propKey = props.disabled ? 'disabled' : 'primary';
  return getThemeProps(`component.input.background.${propKey}`)(props);
};
const getInputColor = (props: IInputStyledProps) => {
  const propKey = props.disabled ? 'disabled' : 'primary';
  return getThemeProps(`component.input.color.${propKey}`)(props);
};

export const InputStyled = styled.input<IInputStyledProps>`
  width: 100%;
  height: ${getInputHeight};
  background: ${getInputBackground};
  color: ${getInputColor};
  outline: none;
  border: none;
  padding-right: ${({ iconWrapperWidth }) => iconWrapperWidth}px;
`;
InputStyled.defaultProps = {
  theme: defaultTheme,
};

export const ComponentWrapper = styled.div<IComponentWrapperProps>`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;

  ${InputStyled} {
    font-size: ${getInputFontSize};
  }
`;
ComponentWrapper.defaultProps = {
  theme: defaultTheme,
};

export const IconWrapper = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  height: ${getInputHeight};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
IconWrapper.defaultProps = {
  theme: defaultTheme,
};

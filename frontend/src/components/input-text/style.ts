import styled from 'styled-components';
import { LIGHT_THEME, ITheme } from 'src/components/theme';

import {
  getInputHeight,
  getInputFontSize,
  getInputStyles,
  getIconWrapStyles,
} from '../input-components';

import { TDimension, TKind } from './interfaces';

interface IComponentWrapperProps {
  dimension: TDimension;
  theme: ITheme;
}

interface IInputStyledProps extends IComponentWrapperProps {
  disabled: boolean;
  iconWrapperWidth: number;
  type?: string;
  kind?: TKind;
}

const getInputBackground = (props: IInputStyledProps) => {
  const { theme, disabled, kind } = props;
  let propKey = 'primary';

  if (kind) {
    propKey = kind;
  }

  if (disabled) {
    propKey = 'disabled';
  }
  const background = theme.component.input.background;
  return background && background[propKey];
};
const getInputColor = (props: IInputStyledProps) => {
  const { theme, kind, disabled } = props;
  let propKey = 'primary';

  if (kind) {
    propKey = kind;
  }

  if (disabled) {
    propKey = 'disabled';
  }
  return theme.component.input.color[propKey];
};

export const InputStyled = styled.input<IInputStyledProps>`
  width: 100%;
  height: ${getInputHeight};
  background: ${getInputBackground};
  color: ${getInputColor};
  outline: none;
  border: none;
  padding-right: ${({ iconWrapperWidth }) => iconWrapperWidth}px;
  ${getInputStyles}
`;
InputStyled.defaultProps = {
  theme: LIGHT_THEME,
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
  theme: LIGHT_THEME,
};

export const IconWrapper = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  height: ${getInputHeight};
  display: flex;
  height: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  ${getIconWrapStyles}
`;
IconWrapper.defaultProps = {
  theme: LIGHT_THEME,
};

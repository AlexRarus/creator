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
  fontSizeInherit: boolean;
}

interface IInputStyledProps extends IComponentWrapperProps {
  disabled: boolean;
  iconWrapperWidth: number;
  fontWeight: string;
  type?: string;
  kind?: TKind;
  textAlign?: string;
  markError?: boolean;
  color?: string;
}

const getInputBackground = (props: IInputStyledProps) => {
  const { theme, disabled, kind } = props;
  let propKey = 'primary';

  if (kind) {
    propKey = kind;
  }

  // kind = primary прозрачный инпут, странно его делать серым, надо подумать
  if (disabled && kind !== 'primary') {
    propKey = 'disabled';
  }
  const background = theme.component.input.background;
  return background && background[propKey];
};
const getInputColor = (props: IInputStyledProps) => {
  const { theme, kind, disabled, color } = props;
  let propKey = 'primary';

  if (kind) {
    propKey = kind;
  }

  if (disabled) {
    propKey = 'disabled';
  }

  let resultColor = theme.component.input.color[propKey];

  if (!disabled && color) {
    resultColor = color;
  }

  return resultColor;
};

export const InputStyled = styled.input<IInputStyledProps>`
  width: 100%;
  height: ${getInputHeight};
  background: ${getInputBackground};
  color: ${getInputColor};
  outline: none;
  border: none;
  padding-right: ${({ iconWrapperWidth }) => iconWrapperWidth}px;
  text-align: ${({ textAlign }) => textAlign || 'inherit'};
  ${getInputStyles}
  font-weight: ${({ fontWeight }) => fontWeight};

  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  [type='number'] {
    -moz-appearance: textfield;
  }
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
    ${(props: IComponentWrapperProps) =>
      !props.fontSizeInherit ? `font-size: ${getInputFontSize(props)}` : 'font-size: inherit'};
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

export const PositionWrapper = styled.div`
  position: relative;
`;

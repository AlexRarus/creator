import styled, { css } from 'styled-components';
import { defaultTheme, getThemeProps, ITheme } from 'src/components/theme';
import { Link } from 'react-router-dom';

import { TKind, TDimension } from './interfaces';

interface IButtonStyledProps {
  kind: TKind;
  dimension: TDimension;
  theme: ITheme;
  disabled: boolean;
  block: boolean;
}

interface ILabelProps {
  dimension: TDimension;
  kind?: TKind;
}

const getButtonBackground = (props: IButtonStyledProps) => {
  const propKey = props.disabled ? 'disabled' : props.kind;
  return getThemeProps(`component.button.background.${propKey}`)(props);
};
const getButtonColor = (props: IButtonStyledProps) => {
  const propKey = props.disabled ? 'disabled' : props.kind;
  return getThemeProps(`component.button.color.${propKey}`)(props);
};
const getButtonBorder = (props: IButtonStyledProps) => {
  const propKey = props.disabled ? 'disabled' : props.kind;
  return getThemeProps(`component.button.borderColor.${propKey}`)(props);
};

const getButtonPadding = (props: ILabelProps) => {
  switch (props.dimension) {
    case 's':
      return '0 16px';
    case 'm':
      return '0 18px';
    case 'l':
      return '0 20px';
    case 'xxl':
      return '0 30px';
    default:
      return '0 20px';
  }
};

const getButtonHeight = (props: ILabelProps) => {
  switch (props.dimension) {
    case 's':
      return '24px';
    case 'm':
      return '32px';
    case 'l':
      return '40px';
    case 'xxl':
      return '60px';
    default:
      return '40px';
  }
};

const getButtonStyles = (props: IButtonStyledProps) => {
  switch (props.kind) {
    case 'air':
      return css`
        border-radius: 8px;
      `;
    default:
      return css`
        border-radius: 4px;
      `;
  }
};

const getLabelStyles = (props: ILabelProps) => {
  switch (props.kind) {
    case 'air':
      return css`
        white-space: nowrap;
      `;
    default:
      return '';
  }
};

const getLabelFontSize = (props: ILabelProps) => {
  switch (props.dimension) {
    case 's':
      return '13px';
    case 'm':
      return '14px';
    case 'l':
      return '16px';
    default:
      return '16px';
  }
};

export const ButtonStyledLink = styled(Link)<IButtonStyledProps>`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: ${getButtonPadding};
  background: ${getButtonBackground};
  color: ${getButtonColor};
  border: 1px solid ${getButtonBorder};
  height: ${getButtonHeight};
  cursor: pointer;
  width: ${({ block }) => (block ? '100%' : 'auto')};
  border-radius: 4px;
  text-decoration: none;

  :active,
  :visited,
  :hover {
    color: ${getButtonColor};
  }
`;
ButtonStyledLink.defaultProps = {
  theme: defaultTheme,
};

export const ButtonStyled = styled.button<IButtonStyledProps>`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: ${getButtonPadding};
  background: ${getButtonBackground};
  color: ${getButtonColor};
  border: 1px solid ${getButtonBorder};
  height: ${getButtonHeight};
  cursor: pointer;
  width: ${({ block }) => (block ? '100%' : 'auto')};
  ${getButtonStyles};
`;
ButtonStyled.defaultProps = {
  theme: defaultTheme,
};

export const Label = styled.div<ILabelProps>`
  font-size: ${getLabelFontSize};
  font-weight: bold;
  ${getLabelStyles}
`;
Label.defaultProps = {
  theme: defaultTheme,
};

interface IButtonListProps {
  align?: 'start' | 'end' | 'center';
  marginTop?: number;
}
export const ButtonsList = styled.div<IButtonListProps>`
  display: flex;
  flex-direction: row;
  align-items: ${({ align = 'start' }) => (align === 'center' ? align : `flex-${align}`)};
  justify-content: ${({ align = 'start' }) => (align === 'center' ? align : `flex-${align}`)};
  width: 100%;
  margin-top: ${({ marginTop = 0 }) => marginTop}px;

  ${ButtonStyled} {
    ${({ align = 'start' }) => {
      switch (align) {
        case 'start':
          return 'margin-right: 16px;';
        case 'end':
          return 'margin-left: 16px;';
        case 'center':
          return 'margin-right: 0;';
      }
    }};

    :last-child {
      margin-right: 0;
    }
    :first-child {
      margin-left: 0;
    }
  }
`;
ButtonsList.defaultProps = {
  theme: defaultTheme,
};

import styled, { css } from 'styled-components';
import { LIGHT_THEME, ITheme } from 'src/components/theme';
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
  const { theme, disabled, kind } = props;
  const propKey = disabled ? 'disabled' : kind;
  const background = theme.component.button.background;
  return background && background[propKey];
};

const getButtonColor = (props: IButtonStyledProps) => {
  const { theme, disabled, kind } = props;
  const propKey = disabled ? 'disabled' : kind;
  const color = theme.component.button.color;
  return color && color[propKey];
};

const getButtonBorder = (props: IButtonStyledProps) => {
  const { theme, disabled, kind } = props;
  const propKey = disabled ? 'disabled' : kind;
  const borderColor = theme?.component?.button?.borderColor;
  return `1px solid ${borderColor && borderColor[propKey]}`;
};

const getButtonPadding = (props: IButtonStyledProps) => {
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

const getButtonHeight = (props: IButtonStyledProps) => {
  const { dimension } = props;

  switch (dimension) {
    case 's':
      return '30px';
    case 'm':
      return '40px';
    case 'l':
      return '50px';
    case 'xxl':
      return '60px';
    default:
      return '50px';
  }
};
const getButtonStyles = (props: IButtonStyledProps) => {
  const { kind, theme } = props;
  const buttonTheme = theme?.component?.button;

  switch (kind) {
    case 'air':
      return css`
        border-radius: 8px;
      `;
    case 'secondary':
      return css`
        border-radius: 8px;
        font-weight: ${({ theme }) => (theme?.isMobile ? 400 : 200)};

        :visited,
        :active {
          background-color: ${buttonTheme?.active?.secondary};
          border-color: ${buttonTheme?.active?.secondary};
        }
      `;
    case 'formed':
      return css`
        border-radius: 3px;
        font-weight: ${({ theme }) => (theme?.isMobile ? 400 : 200)};

        :visited,
        :active {
          background-color: ${buttonTheme?.active?.formed};
          border-color: ${buttonTheme?.active?.formed};
        }
        :hover {
          background-color: ${buttonTheme?.hover?.formed};
          border-color: ${buttonTheme?.hover?.formed};
        }
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
    case 'secondary':
      return css`
        font-weight: ${({ theme }) => (theme?.isMobile ? 400 : 200)};
      `;
    case 'formed':
      return css`
        font-weight: ${({ theme }) => (theme?.isMobile ? 400 : 200)};
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
    case 'xxl':
      return '18px';
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
  border: ${getButtonBorder};
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

  ${getButtonBackground}
`;
ButtonStyledLink.defaultProps = {
  theme: LIGHT_THEME,
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
  border: ${getButtonBorder};
  height: ${getButtonHeight};
  cursor: pointer;
  width: ${({ block }) => (block ? '100%' : 'auto')};
  ${getButtonStyles};
`;
ButtonStyled.defaultProps = {
  theme: LIGHT_THEME,
};

export const Label = styled.div<ILabelProps>`
  font-size: ${getLabelFontSize};
  font-weight: bold;
  ${getLabelStyles}
`;
Label.defaultProps = {
  theme: LIGHT_THEME,
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
  theme: LIGHT_THEME,
};

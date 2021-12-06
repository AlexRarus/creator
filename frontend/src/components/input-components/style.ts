import styled, { css } from 'styled-components';
import { COLORS, ITheme } from 'src/components/theme';

import { TDimension } from './interfaces';

interface IComponentWrapperProps {
  dimension: TDimension;
  theme: ITheme;
  kind?: string;
}

interface IStatus {
  markError: boolean;
  isFocused: boolean;
  kind?: string;
}

export const getStatusBarStyles = (props: IStatus) => {
  switch (props.kind) {
    case 'air':
    case 'formed':
      return css`
        display: none;
      `;
    default:
      return '';
  }
};

export const getInputStyles = (props: IComponentWrapperProps) => {
  switch (props.kind) {
    case 'air':
      return css`
        border-radius: 8px;
        padding: 0 24px;
        box-shadow: 0 15px 45px rgb(40 67 79 / 15%);
        font-weight: 700;
      `;
    case 'formed':
      return css`
        border-radius: 3px;
        border: 1px solid;
        border-color: ${({ theme }) => theme?.component?.input?.borderColor?.formed};
        padding: 0 12px;
        transition: all 200ms;

        &:hover {
          border-color: ${({ theme }) => theme?.component?.input?.borderColor?.hover};
        }

        &:focus {
          box-shadow: 0 0 0 1px ${({ theme }) => theme?.component?.input?.borderColor?.hover};
        }

        :-webkit-autofill,
        :-webkit-autofill:hover,
        :-webkit-autofill:focus,
        :-webkit-autofill:active {
          -webkit-text-fill-color: ${({ theme }) =>
            theme?.component?.input?.color?.formed} !important;
          -webkit-box-shadow: 0 0 0px 1000px
            ${({ theme }) => theme?.component?.input?.background?.formed} inset;
        }
      `;
    default:
      return '';
  }
};

export const getPlaceholderHeight = (props: IComponentWrapperProps) => {
  switch (props.dimension) {
    case 'xxl':
      return css`
        left: 24px;
        font-size: 22px;
      `;
    default:
      return css`
        left: 12px;
        font-size: 14px;
      `;
  }
};

export const getInputHeight = (props: IComponentWrapperProps) => {
  switch (props.dimension) {
    case 's':
      return '24px';
    case 'm':
      return '28px';
    case 'l':
      return '32px';
    case 'xl':
      return '40px';
    case 'xxl':
      return '60px';
    default:
      return '32px';
  }
};

export const getIconWrapStyles = (props: IComponentWrapperProps) => {
  switch (props.kind) {
    case 'formed':
      return css`
        right: 12px;
      `;
    default:
      return '';
  }
};

export const getLabelTransform = (props: IComponentWrapperProps) => {
  switch (props.dimension) {
    case 's':
      return '12px';
    case 'm':
      return '16px';
    case 'l':
      return '20px';
    default:
      return '20px';
  }
};

export const getInputFontSize = (props: IComponentWrapperProps) => {
  switch (props.dimension) {
    case 's':
      return '14px';
    case 'm':
      return '16px';
    case 'l':
      return '16px';
    case 'xxl':
      return '22px';
    default:
      return '14px';
  }
};

export const Placeholder = styled.label<{
  isFocused: boolean;
  dimension: TDimension;
}>`
  display: ${({ isFocused }) => (isFocused ? 'none' : 'flex')};
  align-items: center;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  height: 100%;
  cursor: text;
  color: ${({ theme }) => theme.textColor.secondary};
  z-index: 99;
  ${getPlaceholderHeight}
`;

export const Label = styled.label<{
  isEmpty: boolean;
  dimension: TDimension;
}>`
  font-size: ${({ isEmpty }) => (isEmpty ? '16px' : '13px')};
  height: 13px;
  cursor: text;
  color: ${({ theme }) => theme.textColor.secondary};
  transform: translateY(${(props) => (props.isEmpty ? getLabelTransform(props) : '0px')});
  transition: all 300ms;
  z-index: 99;
`;

export const StatusBar = styled.div<IStatus>`
  width: 100%;
  height: ${({ isFocused }) => (isFocused ? 2 : 1)}px;
  background: ${({ isFocused, theme }) => (isFocused ? theme.color.primary : COLORS.grey[400])};
  position: absolute;
  bottom: 2px;
  transition: all 300ms;

  :after {
    position: absolute;
    top: 0;
    left: 0;
    content: '';
    width: ${({ markError }) => (markError ? 100 : 0)}%;
    height: 2px;
    background: ${({ theme }) => theme.color.error};
    transition: all 300ms;
  }

  ${getStatusBarStyles}
`;

export const ErrorStyled = styled.div`
  color: ${({ theme }) => theme.color.error};
  font-weight: bold;
  max-width: 200px;
  padding: 20px;
  background: ${COLORS.white};
`;

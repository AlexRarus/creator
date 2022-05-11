import styled, { css } from 'styled-components';
import { COLORS, ITheme } from 'src/components/theme';

import { TDimension } from './interfaces';

const isErrorBorderStylesFormed = (props: IComponentWrapperProps) => {
  const { theme, markError } = props;
  if (markError) {
    return css`
      border-color: ${theme?.component?.notification?.background?.error};
      &:hover {
        border-color: ${theme?.component?.notification?.background?.error};
      }

      &:focus {
        box-shadow: 0 0 0 1px ${theme?.component?.notification?.background?.error};
      }

      :-webkit-autofill,
      :-webkit-autofill:hover,
      :-webkit-autofill:focus,
      :-webkit-autofill:active {
        -webkit-text-fill-color: ${theme?.component?.notification?.background?.error} !important;
        -webkit-box-shadow: 0 0 0px 1000px ${theme?.component?.notification?.background?.error}
          inset;
      }
    `;
  }
  return css`
    border-color: ${theme?.component?.input?.borderColor?.formed};
    &:hover {
      border-color: ${theme?.component?.input?.borderColor?.hover};
    }

    &:focus {
      box-shadow: 0 0 0 1px ${theme?.component?.input?.borderColor?.hover};
    }

    :-webkit-autofill,
    :-webkit-autofill:hover,
    :-webkit-autofill:focus,
    :-webkit-autofill:active {
      -webkit-text-fill-color: ${theme?.component?.input?.color?.formed} !important;
      -webkit-box-shadow: 0 0 0px 1000px ${theme?.component?.input?.background?.formed} inset;
    }
  `;
};

interface IComponentWrapperProps {
  dimension: TDimension;
  theme: ITheme;
  kind?: string;
  markError?: boolean;
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
        padding: 0 12px;
        transition: all 200ms;

        ${isErrorBorderStylesFormed(props)}
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
        font-size: 16px;
      `;
  }
};

export const getInputHeight = (props: IComponentWrapperProps) => {
  switch (props.dimension) {
    case 's':
      return '28px';
    case 'm':
      return '32px';
    case 'l':
      return '36px';
    case 'xl':
      return '40px';
    case 'xxl':
      return '60px';
    default:
      return '36px';
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
      return '16px';
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
  z-index: 50;
  ${getPlaceholderHeight}
`;

export const Label = styled.label<{
  isEmpty: boolean;
  dimension: TDimension;
  labelWidth?: number;
  isStatic?: boolean;
}>`
  font-size: ${({ isEmpty, isStatic }) => (isEmpty && !isStatic ? '16px' : '14px')};
  cursor: text;
  color: ${({ theme }) => theme.textColor.secondary};
  transform: translateY(
    ${(props) => (props.isEmpty && !props.isStatic ? getLabelTransform(props) : '0px')}
  );
  transition: all 300ms;
  width: ${({ labelWidth }) => (labelWidth !== undefined ? `${labelWidth}px` : 'auto')};
  margin-bottom: 4px;
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

export const ErrorPreview = styled.div`
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  color: ${({ theme }) => theme.color.error};
  font-size: 12px;
  height: 14px;
`;

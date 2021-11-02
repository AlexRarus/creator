import styled from 'styled-components';
import { COLORS, defaultTheme, ITheme } from 'src/components/theme';

import { TDimension } from './interfaces';

interface IComponentWrapperProps {
  dimension: TDimension;
  theme: ITheme;
}

export const getInputHeight = (props: IComponentWrapperProps) => {
  switch (props.dimension) {
    case 's':
      return '24px';
    case 'm':
      return '28px';
    case 'l':
      return '32px';
    default:
      return '32px';
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
      return '14px';
    case 'l':
      return '16px';
    default:
      return '14px';
  }
};

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
Label.defaultProps = {
  theme: defaultTheme,
};

export const StatusBar = styled.div<{
  markError: boolean;
  isFocused: boolean;
}>`
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
`;
StatusBar.defaultProps = {
  theme: defaultTheme,
};

export const ErrorStyled = styled.div`
  color: ${({ theme }) => theme.color.error};
  font-weight: bold;
  max-width: 200px;
  padding: 20px;
  background: ${COLORS.white};
`;
ErrorStyled.defaultProps = {
  theme: defaultTheme,
};

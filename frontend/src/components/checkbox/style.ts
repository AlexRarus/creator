import styled from 'styled-components';
import { ITheme, COLORS } from 'src/components/theme';

import { TDimension } from './interfaces';

interface IComponentWrapperProps {
  dimension: TDimension;
  theme: ITheme;
}

interface IInputStyledProps extends IComponentWrapperProps {
  disabled: boolean;
}

const getInputHeight = (props: IComponentWrapperProps) => {
  switch (props.dimension) {
    case 's':
      return '16px';
    case 'm':
      return '20px';
    case 'l':
      return '24px';
    default:
      return '24px';
  }
};

export const CheckboxStyled = styled.input<IInputStyledProps>`
  width: ${getInputHeight};
  height: ${getInputHeight};
  margin: 0;
  background: ${COLORS.white};
  color: ${COLORS.black};
  outline: none;
  border: 1px solid black;
  cursor: pointer;
`;

export const ComponentWrapper = styled.div<IComponentWrapperProps>`
  position: relative;
  display: flex;
  flex-direction: row;
  width: 100%;
`;

export const Label = styled.label<{
  dimension: TDimension;
}>`
  line-height: ${getInputHeight};
  cursor: pointer;
  margin-left: 10px;
  user-select: none;
`;

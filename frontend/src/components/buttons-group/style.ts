import styled from 'styled-components';
import { TDimension } from 'src/components/input-components';
import { COLORS } from 'src/components/theme';

interface IButtonsWrapperProps {
  dimension: TDimension;
  buttons: any[]; // нам нужно просто количество кнопок внутри (удобнее работать с массивом кнопок)
}

interface IButtonOptionProps {
  isActive: boolean;
  kind: 'separated' | 'grouped';
}

const getHeight = (props: IButtonsWrapperProps) => {
  switch (props.dimension) {
    case 'xxl':
      return '48px';
    case 'xl':
      return '44px';
    case 'l':
      return '40px';
    case 'm':
      return '36px';
    case 's':
      return '32px';
    default:
      return '32px';
  }
};

export const ButtonsGroupWrapper = styled.div<IButtonsWrapperProps>`
  position: relative;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  height: ${getHeight};
  width: 100%;
`;

export const ButtonOption = styled.div<IButtonOptionProps>`
  flex-grow: 1;
  cursor: pointer;
  user-select: none;
  display: flex;
  padding: 4px 10px;
  align-items: center;
  justify-content: center;
  height: 100%;
  flex-direction: column;
  font-size: 14px;
  line-height: 16px;
  border: 1px solid ${({ isActive }) => (isActive ? COLORS.blue[500] : COLORS.grey[400])};
  color: ${({ isActive }) => (isActive ? COLORS.blue[500] : COLORS.grey[400])};
  margin: ${({ kind }) => (kind === 'separated' ? '0 5px' : '0')};
  white-space: nowrap;

  :first-child {
    border-radius: ${({ kind }) => (kind === 'separated' ? '4px' : '4px 0 0 4px')};
    margin-left: 0;
  }

  :last-child {
    border-radius: ${({ kind }) => (kind === 'separated' ? '4px' : '0 4px 4px 0')};
    margin-right: 0;
  }
`;

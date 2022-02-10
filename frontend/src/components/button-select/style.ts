import styled, { css } from 'styled-components';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { rgba } from 'polished';

import { IOptionsProps, IOptionProps, IPropsStyles } from './interfaces';

export const getSelectStyles = (props: IPropsStyles) => {
  switch (props.kind) {
    case 'formed':
      return css`
        border-radius: 3px;
        border: 1px solid;
        border-color: ${({ theme }) => theme?.component?.select?.borderColor?.formed};
        padding: 0 12px;
        transition: all 200ms;

        &:hover {
          border-color: ${({ theme }) => theme?.component?.select?.borderColor?.hover};
        }

        &:focus {
          box-shadow: 0 0 0 1px ${({ theme }) => theme?.component?.select?.borderColor?.hover};
        }
      `;
    default:
      return '';
  }
};

export const getSelectHeight = (props: IPropsStyles) => {
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

const getSelectBackground = (props: IPropsStyles) => {
  const { theme, disabled, kind } = props;
  let propKey = 'primary';

  if (kind) {
    propKey = kind;
  }

  if (disabled) {
    propKey = 'disabled';
  }
  const background = theme.component.select.background;
  return background && background[propKey];
};
const getSelectColor = (props: IPropsStyles) => {
  const { theme, kind, disabled } = props;
  let propKey = 'primary';

  if (kind) {
    propKey = kind;
  }

  if (disabled) {
    propKey = 'disabled';
  }
  return theme.component.select.color[propKey];
};

export const ButtonSelectWrapper = styled.div<{
  width?: string;
}>`
  display: flex;
  width: ${({ width }) => (width ? `${width}` : 'fit-content')};
`;

export const ButtonStyled = styled.div<IPropsStyles>`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  border-radius: 4px;
  box-sizing: border-box;
  cursor: pointer;
  height: ${getSelectHeight};
  background: ${getSelectBackground};
  color: ${getSelectColor};
  ${getSelectStyles}
  width: ${({ width }) => (width ? `${width}` : 'auto')};

  span {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    max-width: 90%;
  }
`;

export const ShivronIcon = styled(ExpandMore)`
  cursor: pointer;
`;

export const ShivronIconBox = styled.div<{ isOpen?: boolean }>`
  margin-left: auto;

  ${ShivronIcon} {
    transform: rotate(${({ isOpen }) => (isOpen ? 180 : 0)}deg);
  }
`;

export const OptionsListOuter = styled.div<IOptionsProps>`
  min-width: ${({ componentWidth }) => (componentWidth ? `${componentWidth}px` : 'auto')};
`;

export const OptionsListInner = styled.div<IOptionsProps>`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 8px 0;
  border-radius: 4px;
  overflow: hidden;
`;

export const Option = styled.div<IOptionProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
  z-index: 1;
  padding: 8px 12px;
  background: ${(props) => (props?.isActive ? getSelectBackground(props) : 'inherit')};
  color: ${getSelectColor};

  &:hover {
    background: ${getSelectBackground};
  }
`;

export const OptionIcon = styled.div`
  margin-right: 4px;
`;

export const OptionLabel = styled.div`
  margin: 0 4px;
`;

export const OptionChecked = styled.div`
  margin-left: auto;
`;

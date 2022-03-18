import styled from 'styled-components';
import { COLORS } from 'src/components/theme';
import { darken } from 'polished';

import { FORM_FOOTER_HEIGHT } from '../style';

interface IPropsStyled {
  disabled: boolean;
  isActive: boolean;
  isOpen?: boolean;
}

const getFillIcon = (props: IPropsStyled) => {
  const { disabled, isActive } = props;

  if (disabled) {
    return COLORS.grey[500];
  }

  if (isActive) {
    return COLORS.blue[500];
  }

  return COLORS.grey[300];
};

const getHoverFillIcon = (props: IPropsStyled) => {
  const { disabled, isActive } = props;

  if (disabled) {
    return COLORS.grey[500];
  }

  if (isActive) {
    return COLORS.blue[600];
  }

  return COLORS.white;
};

export const IconButtonWrapper = styled.div<IPropsStyled>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: ${FORM_FOOTER_HEIGHT}px;
  height: 100%;
  min-height: 100%;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  transition: all 200ms;

  * {
    cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  }

  svg {
    transition: all 300ms;
    ${({ isOpen }) => isOpen && 'transform: rotate(45deg);'}
    fill: ${({ theme }) => theme?.textColor?.primary};
  }

  :hover {
    svg {
        fill: ${({ theme }) => darken(0.08, theme?.textColor?.primary)};

    }
  }
`;

import styled from 'styled-components';
import { COLORS } from 'src/components/theme';

import { FORM_FOOTER_HEIGHT } from '../style';

interface IPropsStyled {
  disabled: boolean;
  isActive: boolean;
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
  width: ${FORM_FOOTER_HEIGHT}px;
  min-width: ${FORM_FOOTER_HEIGHT}px;
  height: ${FORM_FOOTER_HEIGHT}px;
  min-height: ${FORM_FOOTER_HEIGHT}px;
  border-left: 1px solid ${COLORS.grey[500]};
  border-right: 1px solid ${COLORS.grey[500]};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};

  * {
    cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  }

  :first-child {
    border-left: none;
  }
  :last-child {
    border-right: none;
  }

  svg {
    fill: ${getFillIcon};
  }

  :hover {
    svg {
      fill: ${getHoverFillIcon};
    }
  }
`;

import styled from 'styled-components';
import { COLORS } from 'src/components/theme';
import Check from '@material-ui/icons/Check';

interface IBoxProps {
  checked: boolean;
}

export const CheckboxWrapper = styled.div<{
  isHeader?: boolean;
}>`
  z-index: 1;
  position: relative;
  display: flex;
  padding-top: 12px;
  padding-bottom: 12px;
  padding-left: 12px;
  align-items: center;
`;

export const Box = styled.div<IBoxProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border: 1px solid ${COLORS.blue[400]};
  border-radius: 2px;
  background: ${({ checked }) => (checked ? COLORS.blue[800] : COLORS.white)};
  transition: all 200ms ease-out;
`;

export const CheckboxHidden = styled.input`
  position: absolute;
  width: 24px;
  height: 24px;
  opacity: 0;
  cursor: pointer;
  outline: none;
  border: none;
  box-shadow: none;
  z-index: 2;

  :focus {
    outline: none;
    border: none;
    box-shadow: none;
  }

  :hover + ${Box} {
    border: 1px solid ${({ checked }) => (checked ? COLORS.lightBlue[500] : COLORS.blue[400])};
    background: ${({ checked }) => (checked ? COLORS.lightBlue[500] : COLORS.grey[400])};
  }
`;

export const CheckIcon = styled(Check)`
  position: relative;
  z-index: 0;
  fill: ${COLORS.white};
  width: 16px;
  height: 12px;

  svg {
    position: absolute;
    top: 0;
    left: 0;
  }
`;

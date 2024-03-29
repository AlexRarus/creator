import styled from 'styled-components';
import { COLORS } from 'src/components/theme';
import ButtonSelect from 'src/components/button-select';

export const ButtonSelectStyled = styled(ButtonSelect)``;

export const Label = styled.div`
  font-size: 14px;
  margin-bottom: 4px;
  color: ${({ theme }) => theme.textColor.secondary};
`;

export const ColorsFormWrapper = styled.div<{ inputWidth?: number }>`
  height: 100%;
`;

export const ColorFieldWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin-bottom: 10px;

  :last-child {
    margin-bottom: 0;
  }
`;

export const DeleteIconWrapper = styled.div<{ disabled: boolean }>`
  grid-area: remove-icon;
  display: flex;
  height: 100%;
  padding-top: 13px;
  margin-left: 10px;
  align-items: center;
  justify-content: center;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};

  svg {
    cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
    color: ${({ disabled }) => (disabled ? COLORS.grey[400] : COLORS.red[600])};
  }
`;

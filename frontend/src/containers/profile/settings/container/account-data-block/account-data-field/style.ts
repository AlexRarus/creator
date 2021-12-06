import styled from 'styled-components';
import { COLORS, MEDIA } from 'src/components/theme';

export const AccountDataFieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const AccountDataFieldLabel = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  font-weight: bold;
  font-size: 13px;
  margin-bottom: 5px;
`;

export const AccountDataFieldInputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 32px;
`;

export const AccountDataFieldInput = styled.input`
  flex-grow: 1;
  font-size: 14px;
  color: ${COLORS.grey[500]};
  background: ${COLORS.grey[200]};
  border: 1px solid ${COLORS.grey[400]};
  border-right: none;
  border-radius: 4px 0 0 4px;
  padding: 10px;
  height: 100%;

  ${MEDIA.max768({
    fontSize: '16px',
  })};
`;

export const AccountDataFieldButton = styled.div<{ disabled: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  padding: 10px;
  user-select: none;
  font-size: 14px;
  border: 1px solid ${COLORS.grey[400]};
  border-radius: 0 4px 4px 0;
  height: 100%;
`;

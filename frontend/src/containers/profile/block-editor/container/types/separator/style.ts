import styled from 'styled-components';
import { rgba } from 'polished';
import { COLORS } from 'src/components/theme';

export const SeparateFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  flex-grow: 1;
`;

export const Label = styled.div`
  font-size: 14px;
  margin-bottom: 4px;
`;

export const Button = styled.button`
  width: 100%;
  padding: 16px;
  height: 48px;
`;

export const KindsList = styled.div`
  padding: 20px;
`;

export const KindWrapper = styled.div`
  width: 100%;
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
`;

export const MicroLabel = styled.div`
  margin-left: 4px;
`;

export const ToggleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  overflow: hidden;
`;

export const ToggleButton = styled.div<{ isSelected?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30%;
  height: 80px;
  padding: 10px;
  border: 1px solid
    ${({ theme, isSelected }) => (isSelected ? COLORS.green[500] : theme?.textColor.primary)};
  border-radius: 8px;
  background: ${({ isSelected }) => (isSelected ? rgba(COLORS.green[500], 0.3) : 'transparent')};
  cursor: pointer;
`;

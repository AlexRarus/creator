import styled from 'styled-components';
import { COLORS } from 'src/components/theme';

const ACTIVE_TAB_COLOR = COLORS.blue[500];
const DISABLE_TAB_COLOR = COLORS.grey[500];

export const TabsWrapper = styled.div<{ hasUnderline: boolean; padding: string }>`
  width: 100%;
  height: 40px;
  display: flex;
  flex-direction: row;
  border-bottom: ${({ hasUnderline }) =>
    hasUnderline ? `1px solid ${DISABLE_TAB_COLOR}` : 'none'};
  padding: ${({ padding }) => padding || 'none'};
`;

export const TabItem = styled.div<{ isActive: boolean }>`
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  cursor: pointer;
  user-select: none;
  font-size: 16px;
  font-weight: bold;
  margin-right: 15px;

  color: ${({ isActive }) => (isActive ? ACTIVE_TAB_COLOR : DISABLE_TAB_COLOR)};

  :after {
    content: ' ';
    position: absolute;
    bottom: 0;
    left: 0;
    display: ${({ isActive }) => (isActive ? 'block' : 'none')};
    width: 100%;
    height: 2px;
    background: ${ACTIVE_TAB_COLOR};
  }

  :last-child {
    margin-right: 0;
  }
`;

export const TabContainer = styled.div<{ value: string; activeTabValue: string }>`
  display: ${({ value, activeTabValue }) => (value === activeTabValue ? 'block' : 'none')};
`;

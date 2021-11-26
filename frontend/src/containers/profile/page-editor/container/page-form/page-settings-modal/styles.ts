import styled from 'styled-components';
import { COLORS } from 'src/components/theme';

const ACTIVE_TAB_COLOR = COLORS.blue[500];
const DISABLE_TAB_COLOR = COLORS.grey[500];

export const PageSettingsWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const PageSettingsHeader = styled.div`
  display: flex;
  width: 100%;
  padding: 0 10px;
  border-bottom: 1px solid ${COLORS.grey[400]};
`;

export const Tabs = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  flex-direction: row;
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

export const PageSettingsContent = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  width: 100%;
  padding: 10px;
`;

export const HideBlock = styled.div<{ isShow: boolean }>`
  display: ${({ isShow }) => (isShow ? 'block' : 'none')};
`;

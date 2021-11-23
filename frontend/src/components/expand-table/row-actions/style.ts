import styled from 'styled-components';
import { COLORS, FONTS } from 'src/components/theme';

interface IRowActionsProps {
  isActive: boolean;
  isHide: boolean;
  canHideActions?: boolean;
  isHeader?: boolean;
}

export const RowActionsWrapper = styled.div<IRowActionsProps>`
  position: absolute;
  height: 100%;
  right: 0;
  display: flex;
  justify-content: center;
  opacity: ${({ isActive, isHide, canHideActions, isHeader }) =>
    !isHeader ? (canHideActions ? (isActive && !isHide ? 1 : 0) : 1) : 0};
  padding: 0 12px 0 20px;
  background: inherit;
`;

export const RestActionsWrapper = styled.div`
  display: flex;
  height: 100%;
  flex-direction: row;
  align-items: center;
  align-content: center;
`;

export const RestActionsButton = styled.div<{
  isOpenActions: boolean;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  background: inherit;
  cursor: pointer;
  border-radius: 4px;
  ${({ isOpenActions }) =>
    isOpenActions
      ? `
      border 1px solid ${COLORS.blue[500]};
      & svg {
        fill: ${COLORS.blue[500]};
      }
    `
      : ''}

  * {
    cursor: pointer;
    width: 16px;
    height: 16px;
  }

  svg {
    position: absolute;
  }
`;

export const RestActionsList = styled.div`
  display: flex;
  flex-direction: column;
  padding: 8px 0;
`;

export const RestActionItem = styled.div`
  display: flex;
  align-items: center;
  width: 320px;
  flex-direction: row;
  padding: 12px 16px;
  font-size: 15px;
  line-height: 24px;
  cursor: pointer;
  ${FONTS.InterStyle}

  &:hover {
    background-color: ${COLORS.blue[500]};
  }
`;

export const RestActionTooltip = styled.div`
  margin-left: auto;
  & svg {
    cursor: pointer;
  }
`;

export const SpreadActionsWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SpreadActionsList = styled.div`
  display: flex;
  flex-direction: row;
`;

export const SpreadActionItem = styled.div`
  display: flex;
  flex-direction: row;
  cursor: pointer;
  opacity: 0.7;
  margin-right: 15px;

  * {
    cursor: pointer;
  }

  :hover {
    opacity: 1;
  }

  :last-child {
    margin-right: 0;
  }
`;

export const ActionIconWrapper = styled.div`
  position: relative;
  width: 24px;
  height: 24px;

  svg {
    position: absolute;
    top: 0;
    left: 0;
  }
`;

export const ActionLabel = styled.div`
  margin-left: 10px;
  width: 100%;
`;

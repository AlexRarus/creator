import styled, { css } from 'styled-components';
import { COLORS } from 'src/components/theme';
import { rgba } from 'polished';

import { getMobileAnimation } from './style-animations';
// import { ActionButtonStyled } from './mobile-action-button/style';

interface IActionsBackPlateProps {
  isMounted: boolean;
  zIndex?: number;
}

interface IActionsWrapperProps {
  animation: 'open' | 'close';
  animationTime: number;
  actionsWrapperHeight: number;
}

interface IActionsListProps {
  [key: string]: any;
}

export const ActionsBackPlate = styled.div<IActionsBackPlateProps>`
  position: fixed;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  z-index: ${({ zIndex }) => zIndex || '999'};
  opacity: ${({ isMounted }) => (isMounted ? 1 : 0)};
  transition: opacity 100ms ease-out;
  background: ${rgba(COLORS.black, 0.5)};
  overflow-x: auto;
`;

export const ActionsWrapper = styled.div<IActionsWrapperProps>`
  display: flex;
  flex-direction: column;
  position: absolute;
  bottom: -1000px;
  max-height: 100%;
  width: 100%;
  max-width: 100%;
  opacity: 0;

  animation: ${({ animation, actionsWrapperHeight, animationTime }: IActionsWrapperProps) =>
    actionsWrapperHeight
      ? css`
          ${getMobileAnimation(
            animation,
            actionsWrapperHeight
          )} ${animationTime}ms ease-out forwards
        `
      : 'none'};
`;

export const ActionsList = styled.div<IActionsListProps>`
  display: flex;
  flex-direction: column;
  margin: 0 15px 15px 15px;
  border: 1px solid ${COLORS.grey[700]};
  border-radius: 20px;
  overflow: hidden;
`;

export const CancelActionWrapper = styled.div<IActionsListProps>`
  display: flex;
  flex-direction: column;
  margin: 0 15px 15px 15px;
  border: 1px solid ${COLORS.grey[700]};
  border-radius: 20px;
  overflow: hidden;
`;

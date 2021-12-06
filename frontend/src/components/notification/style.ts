import styled, { createGlobalStyle, keyframes } from 'styled-components';
import { COLORS, FONTS, ITheme } from 'src/components/theme';

import { TNotificationLevel } from './interfaces';

interface IGlobalStyleProps {
  parentNodeId: string;
  isMobile: boolean;
  width: number;
}

interface IItemProps {
  level: TNotificationLevel;
  animation: 'open' | 'close';
  openAnimationTime: number;
  closeAnimationTime: number;
  height: number;
  immortal?: boolean;
}

interface INotificationHeaderProps {
  level: TNotificationLevel;
  theme: ITheme;
}

const TOP_POSITION = 50;
const HORIZONTAL_PADDING = 10;

const open = () => keyframes`
  from {
    left: 0%;
  }

  to {
    left: calc(-100% - ${HORIZONTAL_PADDING * 2}px);
  }
`;

const close = (height: number) => keyframes`
  0% {
    left: calc(-100% - ${HORIZONTAL_PADDING * 2}px);
    opacity: 1;
    height: ${height}px;
    margin-bottom: 8px;
  }

  50% {
    left: calc(-100% - ${HORIZONTAL_PADDING * 2}px);
    opacity: 0;
    height: ${height}px;
    margin-bottom: 8px;
  }
  
  100% {
    left: calc(-100% - ${HORIZONTAL_PADDING * 2}px);
    opacity: 0;
    height: 0;
    margin-bottom: 0;
  }
`;

const animations = {
  open,
  close,
};

const getAnimationTime = ({ animation, openAnimationTime, closeAnimationTime }: IItemProps) => {
  const animationTime = {
    open: openAnimationTime,
    close: closeAnimationTime,
  };

  return animationTime[animation];
};

const getAnimation = ({ animation, height }: IItemProps) => animations[animation](height);

function getLevelBackground(props: INotificationHeaderProps) {
  return props?.theme?.component?.notification?.background?.[props?.level] || 'transparent';
}

function getLevelColor(props: INotificationHeaderProps) {
  return props?.theme?.component?.notification?.color?.[props?.level] || COLORS.black;
}

export const GlobalStyle: any = createGlobalStyle`
  ${(props: IGlobalStyleProps) => `#${props.parentNodeId}`} {
    z-index: 1000;
    position: fixed;
    top: 0;
    right: -${({ isMobile, width }: IGlobalStyleProps) => (isMobile ? '100%' : `${width}px`)};
    width: ${({ isMobile, width }: IGlobalStyleProps) => (isMobile ? '100%' : `${width}px`)};
    padding: 0 ${HORIZONTAL_PADDING}px;
  }
`;

export const NotificationListWrapper = styled.div`
  position: relative;
  width: 100%;
  top: ${TOP_POSITION}px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`;

export const NotificationItemWrapper = styled.div<IItemProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 8px;
  width: 100%;
  position: relative;
  left: 0;
  opacity: 1;
  animation: ${getAnimation} ${getAnimationTime}ms linear forwards;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);

  &:last-child {
    margin-bottom: 0;
  }
`;

export const NotificationHeaderWrapper = styled.div<INotificationHeaderProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  background: ${getLevelBackground};
  color: ${getLevelColor};
  padding: 10px 18px;
`;

export const NotificationHeaderIconWrapper = styled.div<INotificationHeaderProps>`
  margin-right: 15px;

  svg {
    width: 20px;
    height: 20px;
    fill: ${getLevelColor};
  }
`;

export const NotificationHeaderTitle = styled.div`
  ${FONTS.InterBoldStyle};
  flex-grow: 1;
`;

export const CloseIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  svg {
    width: 20px;
    height: 20px;
    fill: ${COLORS.grey[600]};
    transition: all 200ms linear;
    cursor: pointer;
  }

  &:hover {
    svg {
      fill: ${COLORS.grey[800]};
    }
  }
`;

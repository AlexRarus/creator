import { keyframes } from 'styled-components';

const desktopOpen = () => keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const desktopClose = (height: number) => keyframes`
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
`;

const mobileOpen = (height: number) => keyframes`
  from {
    bottom: -${height}px;
  }

  to {
    bottom: 0;
  }
`;

const mobileClose = (height: number) => keyframes`
  from {
    bottom: 0;
  }

  to {
    bottom: -${height}px;
  }
`;

const desktopAnimations = {
  open: desktopOpen,
  close: desktopClose,
};

const mobileAnimations = {
  open: mobileOpen,
  close: mobileClose,
};

export const getDesktopAnimation = (animation: 'open' | 'close', height: number) =>
  desktopAnimations[animation](height);

export const getMobileAnimation = (animation: 'open' | 'close', height: number) =>
  mobileAnimations[animation](height);

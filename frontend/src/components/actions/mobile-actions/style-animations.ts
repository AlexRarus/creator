import { keyframes } from 'styled-components';

const mobileOpen = (height: number) => keyframes`
  0% {
    opacity: 0;
    bottom: -${height}px;
  }
  
  10% {
    opacity: 1;
    bottom: -${height}px;
  }

  100% {
    opacity: 1;
    bottom: 0;
  }
`;

const mobileClose = (height: number) => keyframes`
  0% {
    opacity: 1;
    bottom: 0;
  }

  90% {
    opacity: 1;
    bottom: -${height}px;
  }

  100% {
    opacity: 0;
    bottom: -${height}px;
  }
`;

const mobileAnimations = {
  open: mobileOpen,
  close: mobileClose,
};

export const getMobileAnimation = (animation: 'open' | 'close', height: number) =>
  mobileAnimations[animation](height);

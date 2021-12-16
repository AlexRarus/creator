import styled, { keyframes } from 'styled-components';
import { COLORS } from 'src/components/theme';

const prime = '#00FF80';

const getBubbleXPosition = (index: number, buubleWidth: number) => {
  const randomPercent = Math.floor(Math.random() * 100);
  if (randomPercent > 85) {
    return `calc(100% - ${buubleWidth}px);`;
  }
  return `${randomPercent}%`;
};

const moveBubble = keyframes`
 0% {
   transform: translate(0, 0);
 }
 99% {
  transform: translate(0, -${Math.floor(Math.random() * 80) + 50}px);
 }
  100% {
    transform: translate(0, 0);
    opacity: 0;
}
`;

export const StyledSvg = styled.svg`
  position: absolute;
  top: -4000px;
  left: -4000px;
`;

export const Button = styled.button`
  padding: 16px;
  font-size: 16px;
  height: 48px;
  border: none;
  filter: url('#gooey');
  position: relative;
  background-color: ${COLORS.cyan[500]};
  cursor: pointer;

  &:focus {
    outline: none;
  }
`;

export const Bubbles = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`;

export const Bubble = styled.span<{ index: number }>`
  background-color: ${COLORS.cyan[500]};
  border-radius: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  z-index: -1;

  &:nth-child(${({ index }) => index}) {
    left: ${({ index }) => getBubbleXPosition(index, 24)};
    width: 24px;
    height: 24px;
    animation: ${({ index }) => 3 + index * 0.02}s ${moveBubble} infinite;
    animation-delay: ${({ index }) => index * 0.2}s;
  }
`;

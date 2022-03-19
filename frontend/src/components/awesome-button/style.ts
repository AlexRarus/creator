import styled, { keyframes, css } from 'styled-components';
import { COLORS } from 'src/components/theme';

const buttonColor = css`
  ${COLORS.blue[500]}
`;

const pulse = keyframes`
 0% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(51, 217, 178, 0.7);
}

  70% {
    transform: scale(1);
    box-shadow: 0 0 0 10px rgba(51, 217, 178, 0);
}

  100% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(51, 217, 178, 0);
}
`;

export const Button = styled.div<{ isAnimate?: boolean }>`
  font-family: 'Helvetica', 'Arial', sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 72px;
  height: 72px;
  font-size: 1em;
  -webkit-appearance: none;
  appearance: none;
  color: #fff;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  position: relative;
  transition: transform ease-in 0.1s, box-shadow ease-in 0.25s;
  animation-delay: 2s;
  cursor: pointer;

  background: ${buttonColor};
  box-shadow: 0 0 0 0 rgba(51, 217, 178, 1);
  animation: ${pulse} 2s infinite;

  :focus {
    outline: 0;
  }
  :active {
    transform: scale(0.9);
    background-color: ${buttonColor};
  }
`;

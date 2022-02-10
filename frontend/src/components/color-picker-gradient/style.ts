import styled from 'styled-components';
import { COLORS } from 'src/components/theme';

export const ColorPreviewWrapper = styled.div<{ inputWidth?: number }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: ${({ inputWidth }) => inputWidth}px;
  padding-top: 13px;
  height: 100%;
`;

export const ColorPreview = styled.div<{ background?: string }>`
  position: relative;
  z-index: 50;
  width: 100%;
  height: 24px;
  border-radius: 4px;
  cursor: pointer;
  background: ${({ background = '#fff, #fff' }) => `linear-gradient(to right, ${background})`};

  :before {
    display: block;
    content: '';
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    background: ${COLORS.black};
    opacity: 0;
    transition: all 200ms;
  }

  :hover {
    &:before {
      opacity: 0.15;
    }
  }
`;

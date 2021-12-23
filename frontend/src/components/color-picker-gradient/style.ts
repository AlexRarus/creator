import styled from 'styled-components';

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
  z-index: 100;
  width: 100%;
  height: 28px;
  cursor: pointer;
  background: ${({ background = '#fff, #fff' }) => `linear-gradient(to right, ${background})`};
`;

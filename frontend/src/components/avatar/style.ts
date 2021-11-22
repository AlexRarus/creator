import styled from 'styled-components';
import { COLORS } from 'src/components/theme';

export const AvatarWrapper = styled.div<{ size: number }>`
  position: relative;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  border-radius: 100%;
  overflow: hidden;
  background: ${COLORS.grey[300]};
  border: 1px solid ${COLORS.grey[300]};
`;

export const DefaultBackground = styled.div`
  position: relative;
  width: 100%;
  height: 100%;

  svg {
    position: absolute;
    left: -4px;
    width: 46px;
    height: 46px;
    fill: ${COLORS.white};
  }
`;

export const Image = styled.img<{ isLoaded: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: ${({ isLoaded }) => (isLoaded ? 1 : 0)};
`;

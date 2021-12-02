import styled from 'styled-components';
import { COLORS, MEDIA } from 'src/components/theme';

interface IAvatarPreviewProps {
  borderRadius: number;
  size?: number;
}

interface IAvatarImageProps {
  isLoaded: boolean;
}

export const AvatarPreviewWrapper = styled.div<IAvatarPreviewProps>`
  position: relative;
  width: ${({ size = 80 }) => size}px;
  height: ${({ size = 80 }) => size}px;
  border-radius: ${({ borderRadius }) => borderRadius}%;
  background: ${COLORS.grey[300]};
  border: 1px solid ${COLORS.grey[300]};
  overflow: hidden;

  ${MEDIA.max768({
    width: `${({ size = 60 }) => size}px`,
    height: `${({ size = 60 }) => size}px`,
  })}
`;

export const DefaultBackground = styled.div<IAvatarPreviewProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
  height: 100%;

  svg {
    position: absolute;
    width: ${({ size = 80 }) => size}px;
    height: ${({ size = 80 }) => size}px;
    fill: ${COLORS.white};

    ${({ size = 60 }) =>
      MEDIA.max768({
        position: 'absolute',
        width: `${size}px`,
        height: `${size}px`,
      })}
  }
`;

export const Image = styled.img<IAvatarImageProps>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

import styled from 'styled-components';
import { COLORS, MEDIA } from 'src/components/theme';

export const AvatarPreviewWrapper = styled.div<{ borderRadius: string }>`
  position: relative;
  width: 80px;
  height: 80px;
  border-radius: ${({ borderRadius }) => borderRadius};
  overflow: hidden;
  background: ${COLORS.grey[300]};
  border: 1px solid ${COLORS.grey[300]};

  ${MEDIA.max768({
    width: '60px',
    height: '60px',
  })}
`;

export const DefaultBackground = styled.div`
  position: relative;
  width: 100%;
  height: 100%;

  svg {
    position: absolute;
    left: -8px;
    width: 94px;
    height: 94px;
    fill: ${COLORS.white};

    ${MEDIA.max768({
      left: '-6px',
      width: '70px',
      height: '70px',
    })}
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

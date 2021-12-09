import styled from 'styled-components';
import { COLORS } from 'src/components/theme';

import { TDimension } from '../input-components';

interface IAvatarPreviewProps {
  borderRadius: number;
  dimension: TDimension;
}

interface IAvatarImageProps {
  isLoaded: boolean;
}

const getSize = ({ dimension }: IAvatarPreviewProps) => {
  switch (dimension) {
    case 'xxl':
      return '180px';
    case 'xl':
      return '150px';
    case 'l':
      return '120px';
    case 'm':
      return '90px';
    case 's':
      return '60px';
    case 'xs':
      return '30px';
    default:
      return '90px';
  }
};
export const AvatarPreviewWrapper = styled.div<IAvatarPreviewProps>`
  position: relative;
  width: ${getSize};
  height: ${getSize};
  border-radius: ${({ borderRadius }) => borderRadius}%;
  background: ${COLORS.grey[300]};
  border: 1px solid ${COLORS.grey[300]};
  overflow: hidden;
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
    width: ${getSize};
    height: ${getSize};
    fill: ${COLORS.white};
  }
`;

export const Image = styled.img<IAvatarImageProps>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

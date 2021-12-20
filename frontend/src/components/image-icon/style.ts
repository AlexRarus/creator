import styled from 'styled-components';

export interface IImageIconWrapperProps {
  size?: number; // в пикселях
  borderRadius?: number; // в процентах
}

export interface IImageProps {
  size?: number; // в пикселях
  imageUrl?: string;
}

export interface IIconProps {
  size?: number; // в пикселях
  iconColor?: string; // цвет заливки иконки
}

export const ImageIconWrapper = styled.div<IImageIconWrapperProps>`
  grid-area: icon;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({ size }) => (size ? `${size}px` : '100%')};
  height: ${({ size }) => (size ? `${size}px` : '100%')};
  border-radius: ${({ borderRadius }) => borderRadius}%;
  background: transparent;
  overflow: hidden;
`;

export const ImageElement = styled.div<IImageProps>`
  transition: all 200ms ease-out;
  background-image: ${({ imageUrl }) => `url(${imageUrl})`};
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  width: ${({ size }) => (size ? `${size}px` : '100%')};
  height: ${({ size }) => (size ? `${size}px` : '100%')};
`;

export const IconElement = styled.div<IIconProps>`
  transition: all 200ms ease-out;
  width: ${({ size }) => (size ? `${size}px` : '100%')};
  height: ${({ size }) => (size ? `${size}px` : '100%')};

  svg {
    width: ${({ size }) => (size ? `${size}px` : '100%')};
    height: ${({ size }) => (size ? `${size}px` : '100%')};
    fill: ${({ iconColor }) => iconColor};
  }
`;

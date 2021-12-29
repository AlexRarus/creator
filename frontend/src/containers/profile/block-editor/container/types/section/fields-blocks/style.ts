import styled, { css } from 'styled-components';
import { IOption } from 'src/components/select';
import { IImage } from 'src/dal/images/interfaces';
import { COLORS } from 'src/components/theme';

export const FieldLabel = styled.div`
  font-size: 13px;
  height: 13px;
  color: ${({ theme }) => theme.textColor.secondary};
  transition: all 300ms;
  margin-bottom: 4px;
`;

export const PictureLabel = styled.div`
  text-align: center;
`;

export const PictureCell = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  min-height: 200px;
`;

export const ItemFieldPictureShape = styled.div`
  grid-area: icon;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  border-radius: 6px;
  border: 1px dashed;
  overflow: hidden;
  cursor: pointer;
`;

interface IBackgroundProps {
  backgroundType: IOption;
  backgroundColor: string;
  backgroundGradient: string;
  backgroundImage: IImage | null;
  backgroundRepeat: IOption;
  backgroundSmooth: boolean;
  backgroundSize: IOption;
  backgroundSizeCustomValue: string;
  backgroundPosition: IOption;
}
const getBackground = (props: IBackgroundProps) => {
  const {
    backgroundType,
    backgroundColor = COLORS.white,
    backgroundGradient = COLORS.white,
    backgroundImage,
    backgroundRepeat,
    backgroundSize,
    backgroundSizeCustomValue,
    backgroundPosition,
    // backgroundSmooth,
  } = props;
  const backgroundImageUrl = backgroundImage ? ` url('/media/${backgroundImage.src}'), ` : '';

  return css`
    ${backgroundType.value === 'color' && `background: ${backgroundImageUrl}${backgroundColor}`};
    ${backgroundType.value === 'gradient' &&
    `background-image: ${backgroundImageUrl}${backgroundGradient}`};
    background-repeat: ${backgroundRepeat.value};
    background-size: ${backgroundSize.value === 'custom'
      ? `${backgroundSizeCustomValue}%`
      : backgroundSize.value};
    background-position: ${backgroundPosition.value || 'initial'};
  `;
};
export const PictureElement = styled.div<IBackgroundProps>`
  width: 100%;
  height: 100%;
  ${getBackground}
`;

export const Block = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;

  :last-child {
    margin-bottom: 0;
  }
`;

export const BlockTitle = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
`;

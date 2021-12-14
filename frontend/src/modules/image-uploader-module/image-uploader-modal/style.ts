import styled from 'styled-components';
import { COLORS, MEDIA } from 'src/components/theme';

export const CommonImagesListWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
export const MyImagesListWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export const ImagesListWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 15px;
  padding: 10px;

  ${MEDIA.max768({
    gridTemplateColumns: `repeat(3, 1fr)`,
  })}
`;

export const ImagesListEmptyMessage = styled.div`
  color: ${COLORS.grey[500]};
  font-size: 16px;
`;

export const ImageItemWrapper = styled.div<{ isSelected?: boolean }>`
  position: relative;
  width: 90px;
  height: 90px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 2px;
  transition: all 200ms ease-out;
  border: ${({ isSelected }) =>
    isSelected ? `2px solid ${COLORS.blue[600]}` : `1px solid ${COLORS.grey[500]}`};
`;

export const ImageItemSelectedIcon = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 3px;
  right: 3px;
  border-radius: 50%;
  background: ${COLORS.white};
  overflow: hidden;
  width: 15px;
  height: 15px;

  svg {
    position: absolute;
    color: ${COLORS.blue[600]};
    font-size: 18px;
  }
`;

export const UploadingImageItemWrapper = styled(ImageItemWrapper)`
  cursor: not-allowed;
`;

export const ImageElement = styled.img<{ isLoaded?: boolean }>`
  opacity: ${({ isLoaded = true }) => (isLoaded ? 1 : 0)};
  max-width: 100%;
  max-height: 100%;
`;

export const DropZoneWrapper = styled.div<{ isDragActive: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 90px;
  height: 90px;
  background: ${({ isDragActive }) => (isDragActive ? COLORS.green[300] : COLORS.blue[100])};
  border: 2px solid ${COLORS.blue[600]};
  border-radius: 2px;
  overflow: hidden;
  user-select: none;
  cursor: pointer;

  * {
    cursor: pointer;
    color: ${COLORS.blue[600]};
  }
`;

export const DropZoneIcon = styled.div`
  svg {
    font-size: 40px;
  }
`;

export const DropZoneLabel = styled.div`
  font-size: 16px;
`;

export const DropZoneInput = styled.input`
  display: none;
`;

import styled from 'styled-components';
import { COLORS, MEDIA } from 'src/components/theme';

export const ImagesListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const ImagesListGrid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 15px;

  ${MEDIA.max768({
    gridTemplateColumns: `repeat(3, 1fr)`,
    gap: '10px',
  })}
`;

export const ImagesListEmptyMessage = styled.div`
  width: 100%;
  color: ${COLORS.grey[500]};
  font-size: 16px;
  user-select: none;
`;

export const ImageItemWrapper = styled.div<{ isSelected?: boolean }>`
  position: relative;
  width: 100%;
  height: 100px;
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

export const DropZoneWrapper = styled.div<{ isDragActive: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100px;
  background: ${({ isDragActive }) => (isDragActive ? COLORS.white : COLORS.grey[100])};
  border: 1px dashed ${COLORS.grey[400]};
  border-radius: 2px;
  overflow: hidden;
  user-select: none;
  cursor: pointer;

  * {
    cursor: pointer;
    color: ${COLORS.grey[400]};
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

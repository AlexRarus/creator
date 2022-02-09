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

export const DropZoneInput = styled.input`
  display: none;
`;

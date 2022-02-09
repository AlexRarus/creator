import styled from 'styled-components';
import { COLORS } from 'src/components/theme';

export const DropZoneWrapper = styled.div<{ isDragActive: boolean; hide: boolean }>`
  display: ${({ hide }) => (hide ? 'none' : 'flex')};
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

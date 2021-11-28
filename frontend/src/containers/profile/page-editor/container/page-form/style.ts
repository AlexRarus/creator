import styled from 'styled-components';
import { rgba } from 'polished';
import { Grid, GridColumn } from 'src/components/grid';
import { COLORS, MEDIA } from 'src/components/theme';

export const FORM_HEADER_HEIGHT = 64;
export const FORM_FOOTER_HEIGHT = 64;

const PAGE_PREVIEW_PADDING = 24;

export const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  padding: ${PAGE_PREVIEW_PADDING}px;
`;

export const FormHeader = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  height: ${FORM_HEADER_HEIGHT}px;
  width: 100%;
  background: ${COLORS.grey[800]};
  display: flex;
  flex-direction: row;
  padding: 10px 0 10px 10px;
  justify-content: space-between;
  align-items: center;

  ${MEDIA.max530({
    position: 'relative',
  })}
`;

export const LinkToPageField = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  cursor: pointer;

  * {
    cursor: pointer;
  }
`;

export const LinkToPageLabel = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 13px;
  color: ${COLORS.white};
`;

export const LinkToPageValue = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  color: ${COLORS.grey[400]};
  font-size: 16px;
  overflow-x: auto;
  padding-right: 5px;

  &::-webkit-scrollbar {
    height: 1px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${COLORS.grey[400]};
    background-clip: content-box;
  }
`;

export const PrefixPath = styled.span`
  color: ${COLORS.grey[500]};
`;

export const PageSlug = styled.span`
  color: ${COLORS.white};
`;

export const LinkCopyIndicator = styled.div`
  position: absolute;
  top: 0;
  right: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  color: ${COLORS.grey[500]};
  font-size: 13px;

  svg {
    margin-left: 5px;
    fill: ${COLORS.grey[500]};
    width: 16px;
    height: 16px;
  }
`;

export const FormFooter = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  height: ${FORM_FOOTER_HEIGHT}px;
  width: 100%;
  background: ${COLORS.grey[800]};
  color: ${COLORS.white};
  display: flex;
  flex-direction: row;

  ${MEDIA.max530({
    position: 'fixed',
  })}
`;

export const AddBlockButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  height: 100%;
  padding: 5px;
`;

export const BlockActionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  cursor: pointer;

  * {
    cursor: pointer;
  }
`;

export const DroppableList = styled(Grid)<{ isDraggingOver: boolean }>`
  background: ${({ theme, isDraggingOver }) =>
    isDraggingOver ? theme?.background?.secondary : theme?.background?.primary};
  width: 100%;
  height: 100%;
`;

export const DraggableItem = styled.div<{ isDragging: boolean }>`
  background: ${({ theme, isDragging }) =>
    isDragging ? rgba(theme?.component?.button?.borderColor?.secondary, 0.7) : 'inherit'};
  width: 100%;
`;

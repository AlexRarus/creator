import styled from 'styled-components';
import { rgba } from 'polished';
import { Grid } from 'src/components/grid';
import { COLORS, MEDIA } from 'src/components/theme';
import { ITheme } from 'src/dal/themes/interface';

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
  background: ${rgba(COLORS.grey[800], 0.85)};
  color: ${COLORS.white};
  backdrop-filter: blur(4px);
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
  background: ${rgba(COLORS.grey[800], 0.85)};
  color: ${COLORS.white};
  display: flex;
  flex-direction: row;
  backdrop-filter: blur(4px);
  z-index: 1;

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

export const FormWrapperDroppable = styled(Grid)<{
  isDraggingOver: boolean;
  selectedTheme: ITheme | null;
  width?: number;
}>`
  display: flex;
  flex-direction: column;
  flex-grow: 1;

  width: ${({ width }) => width}px;
  padding: 24px 20px 64px 20px;

  color: inherit;
  background: ${({ selectedTheme, isDraggingOver, theme }) =>
    isDraggingOver
      ? rgba(selectedTheme ? selectedTheme.background : theme.background.primary, 0.9)
      : selectedTheme?.background || theme.background.primary};
  width: 100%;
  height: 100%;
  ${({ theme }) => !theme?.isMobile && 'overflow: auto;'}
`;

export const DraggableItem = styled.div<{ isDragging: boolean }>`
  position: relative;
  width: calc(100% - 4px);
  padding-left: 48px;
  padding-right: 32px;
  margin: 8px 2px;

  &:before {
    content: '';
    position: absolute;
    left: 0px;
    top: 0px;
    width: calc(100% - 4px);
    height: 100%;
    background: ${({ isDragging }) =>
      isDragging ? rgba(COLORS.white, 0.15) : rgba(COLORS.white, 0.2)};
    border-radius: 6px;
    border: 1px dashed;
    border-color: ${({ isDragging }) => (isDragging ? rgba(COLORS.black, 0.1) : 'transparent')};
    box-shadow: ${({ isDragging }) =>
      !isDragging ? `0px 0px 10px ${rgba(COLORS.grey[900], 0.1)}` : 'none'};
    transition: all 200ms;
  }
`;

export const DragIcon = styled.div<{ isDragging: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 4px;
  color: ${({ isDragging }) => (isDragging ? COLORS.white : 'inherit')};
  transition: all 200ms;
`;

export const DragHandleZone = styled.div<{ isDragging: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 4px;
  left: 4px;
  height: 32px;
  width: 32px;
  border-radius: 6px;
  box-shadow: ${({ isDragging }) =>
    isDragging ? '0px 15px 20px rgba(46, 229, 157, 0.4)' : 'none'};
  background: ${({ isDragging, theme }) => (isDragging ? '#2EE59D' : '#7d2ae8')};
`;

export const DragIconBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 4px;
  height: 32px;
  width: 32px;
  border-radius: 6px;
`;

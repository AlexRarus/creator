import styled, { css } from 'styled-components';
import { rgba } from 'polished';
import { Grid } from 'src/components/grid';
import { COLORS, MEDIA } from 'src/components/theme';
import { ITheme } from 'src/dal/themes/interface';
import {
  USER_MENU_BACKGROUND,
  USER_MENU_BACKGROUND_HOVER,
} from 'src/components/menu/user-menu/style';

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

const getSectionStyles = (
  isSection?: boolean,
  isPrevSection?: boolean,
  isNextSection?: boolean
) => {
  // если первый элемент секции
  if (isSection && !isPrevSection && isNextSection) {
    return css`
      margin: 10px 2px 2px 2px;
      &:after {
        display: block;
        top: -10px;
        height: calc(100% + 12px);
        border-radius: 10px 10px 0 0;
      }
    `;
  }
  // если средний элемент секции
  if (isSection && isPrevSection && isNextSection) {
    return css`
      margin: 2px;
      &:after {
        display: block;
        top: -2px;
        height: calc(100% + 4px);
        border-radius: 0;
      }
    `;
  }

  // если последний элемент в секции
  if (isSection && isPrevSection && !isNextSection) {
    return css`
      margin: 2px 2px 10px 2px;
      &:after {
        display: block;
        top: -2px;
        height: calc(100% + 12px);
        border-radius: 0 0 10px 10px;
      }
    `;
  }
  // если один элемент в секции
  if (isSection && !isPrevSection && !isNextSection) {
    return css`
      margin: 10px 2px;
      &:after {
        top: 50%;
        transform: translateY(-50%);
        display: block;
      }
    `;
  }
  return '';
};

export const DraggableItem = styled.div<{ isDragging: boolean; isSubItem?: boolean }>`
  position: relative;
  width: calc(100% - 4px);
  padding-left: 48px;
  padding-right: 32px;
  margin: ${({ isSubItem }) => (isSubItem ? '2px' : '6px 2px')};

  &:before {
    content: '';
    position: absolute;
    left: 0px;
    top: 0px;
    width: calc(100% - 4px);
    height: 100%;
    background: ${({ isDragging }) =>
      isDragging ? rgba(COLORS.white, 0.15) : rgba(COLORS.white, 0.2)};
    border-radius: 12px;
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

export const SectionDraggable = styled.div<{ isDragging: boolean }>`
  position: relative;
  width: calc(100% - 4px);
  padding: 32px 4px 4px 4px;
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
    border-radius: 12px;
    border: 1px dashed;
    border-color: ${({ isDragging }) => (isDragging ? rgba(COLORS.black, 0.1) : 'transparent')};
    box-shadow: ${({ isDragging }) =>
      !isDragging ? `0px 0px 10px ${rgba(COLORS.grey[900], 0.1)}` : 'none'};
    transition: all 200ms;
  }
`;

export const SectionHandleZone = styled.div<{ isDragging: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 4px;
  left: 4px;
  height: 24px;
  width: 24px;
  border-radius: 6px;
  box-shadow: ${({ isDragging }) =>
    isDragging ? '0px 15px 20px rgba(46, 229, 157, 0.4)' : 'none'};
  background: ${({ isDragging, theme }) => (isDragging ? '#2EE59D' : '#7d2ae8')};
`;

export const DeleteSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 4px;
  right: 4px;
  height: 12px;
  border-radius: 6px;
  font-size: 12px;
  background: #2ee59d;
  cursor: pointer;
`;

export const SectionWrapper = styled.div<{ isDragging: boolean }>`
  position: relative;
  padding: 1px;
  width: calc(100% - 4px);
  border-radius: 10px;
  background-color: ${({ theme }) => theme?.background?.primary || 'inherit'};
`;

export const SettingsPopupList = styled.div`
  background: ${USER_MENU_BACKGROUND};
`;

export const SettingsItemButton = styled.div`
  color: ${COLORS.white};
  padding: 15px;
  transition: all 200ms ease-out;
  background: ${USER_MENU_BACKGROUND};

  border-top: 1px solid ${COLORS.grey[600]};
  border-bottom: 1px solid ${COLORS.grey[800]};

  &:first-child {
    border-top: none;
  }
  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: ${USER_MENU_BACKGROUND_HOVER};
  }
  cursor: pointer;
  user-select: none;
`;

export const CustomCheckbox = styled.div<{ isChecked?: boolean }>`
  position: absolute;
  right: -16px;
  top: 8px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 2px solid
    ${({ isChecked, theme }) => (isChecked ? '#2EE59D' : theme.borderColor.contrast)};
  background: ${({ isChecked }) => (isChecked ? '#2EE59D' : 'inherit')};
  cursor: pointer;
`;

export const AcceptButton = styled.div`
  position: absolute;
  bottom: 80px;
  right: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 32px;
  border-radius: 16px;
  background: #2ee59d;
  color: ${COLORS.grey[200]};
  cursor: pointer;
`;

export const CancelButton = styled.div`
  position: absolute;
  bottom: 80px;
  left: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 32px;
  border-radius: 16px;
  background: ${COLORS.red[400]};
  color: ${({ theme }) => theme?.textColor?.primary};
  cursor: pointer;
`;

import styled from 'styled-components';
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
  appType?: string;
  viewBlockHeight?: number;
}>`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  height: ${({ appType, viewBlockHeight }) =>
    appType === 'web' ? '100%' : `${viewBlockHeight}px`};
  overflow-x: ${({ theme }) => (theme?.isMobile ? 'scroll' : 'auto')};

  width: ${({ width }) => width}px;
  padding: 24px 28px 64px 24px;

  color: inherit;
  background: ${({ selectedTheme, isDraggingOver, theme }) =>
    isDraggingOver
      ? rgba(selectedTheme ? selectedTheme.background : theme.background.primary, 0.9)
      : selectedTheme?.background || theme.background.primary};
  width: 100%;
  ${({ theme }) => !theme?.isMobile && 'overflow: auto;'}
`;

export const DraggableItem = styled.div<{ isDragging: boolean; isSubItem?: boolean }>`
  position: relative;
  min-height: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
  padding: 2px 3px;
  height: 16px;
  border-radius: 6px;
  font-size: 12px;
  cursor: pointer;
  color: ${({ theme }) => theme?.background?.primary};
  background: ${({ theme }) => theme?.textColor?.primary};
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
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: -24px;
  top: 4px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid
    ${({ isChecked, theme }) => (isChecked ? '#2EE59D' : theme.borderColor.contrast)};
  background: ${({ isChecked }) => (isChecked ? '#2EE59D' : 'inherit')};
  cursor: pointer;

  &:before {
    content: '';
    width: 8px;
    height: 4px;
    border-bottom: 2px solid ${({ theme }) => theme?.background?.primary};
    border-left: 2px solid ${({ theme }) => theme?.background?.primary};
    opacity: ${({ isChecked }) => (isChecked ? 1 : 0)};
    transform: rotate(-45deg) translate(1px, -1px);
  }
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
  padding: 4px 6px;
  color: ${({ theme }) => theme?.textColor?.primary};
  background: ${({ theme }) => theme?.background?.primary};
  border: 2px solid ${({ theme }) => theme?.textColor?.primary};
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
  padding: 4px 6px;
  color: ${({ theme }) => theme?.textColor?.primary};
  background: ${({ theme }) => theme?.background?.primary};
  border: 2px solid ${({ theme }) => theme?.textColor?.primary};
  cursor: pointer;
`;

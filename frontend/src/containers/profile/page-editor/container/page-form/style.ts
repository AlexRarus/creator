import styled, { css } from 'styled-components';
import { lighten, rgba } from 'polished';
import { Grid } from 'src/components/grid';
import { COLORS } from 'src/components/theme';
import { typeColors } from 'src/containers/profile/block-editor/types-list/utils';

export const FORM_HEADER_HEIGHT = 64;
export const FORM_FOOTER_HEIGHT = 64;

export const ScrollableWrap = styled.div<{ maxHeight?: number; isEmpty?: boolean }>`
  ${({ theme, maxHeight }) =>
    !theme?.isMobile &&
    css`
      max-height: ${maxHeight}px;
      overflow: auto;
    `}
  width: 100%;
  height: inherit;

  ${({ isEmpty }) => isEmpty && 'position: relative;'}

  :before {
    position: absolute;
    display: ${({ isEmpty }) => (isEmpty ? 'block' : 'none')};
    content: 'Добавьте свой первый блок';
    left: 50%;
    top: 64px;
    transform: translate(-50%);
  }
`;

export const FormFooter = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  height: ${FORM_FOOTER_HEIGHT}px;
  background: ${({ theme }) => rgba(theme?.textColor?.primary, 0.1)};
  color: ${({ theme }) => theme?.textColor?.primary};
  display: flex;
  flex-direction: row;
  backdrop-filter: blur(4px);
  z-index: 1;

  width: auto;
  border-radius: 16px;
  transform: translateX(-50%);
  bottom: 16px;
  left: 50%;

  ${({ theme }) =>
    theme?.isMobile &&
    css`
      position: fixed;
      left: 50%;
      transform: translateX(-50%);
      border-radius: 16px;
      bottom: 16px;
      height: 60px;
      width: calc(100% - 20px);
    `}
`;

export const AddBlockButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  height: 100%;
  padding: 8px 24px;
`;

export const BlockActionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  cursor: pointer;
  z-index: 1;

  * {
    cursor: pointer;
  }
`;

export const FormWrapperDroppable = styled(Grid)<{
  isDraggingOver: boolean;
  width?: number;
  isCheckBlocks?: boolean;
}>`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  height: auto;

  width: ${({ width }) => width}px;
  padding: 16px 16px 64px 16px;
  ${({ isCheckBlocks }) => isCheckBlocks && 'padding-right: 32px;'}

  color: inherit;
  width: 100%;
  transition: all 200ms;
`;

export const DraggableItem = styled.div<{
  isDragging: boolean;
  isSubItem?: boolean;
  type: string;
}>`
  position: relative;
  min-height: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding-left: 48px;
  padding-right: 32px;
  margin-bottom: 4px;

  :last-child {
    margin-bottom: 0px;
  }

  &:before {
    content: '';
    position: absolute;
    left: 0px;
    top: 0px;
    width: 100%;
    height: calc(100% - 2px);
    background: ${({ isDragging, type }) =>
      isDragging ? lighten(0.1, typeColors[type] as string) : typeColors[type]};
    border-radius: 10px;
    border: 1px solid;
    border-color: ${({ isDragging }) => (isDragging ? rgba(COLORS.black, 0.1) : 'transparent')};
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
  top: 0px;
  left: 0px;
  height: 32px;
  width: 32px;
  border-radius: 6px;
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
  width: 100%;
  padding: 4px 4px 4px 4px;
  margin-bottom: 6px;

  &:before {
    content: '';
    position: absolute;
    left: 0px;
    top: 0px;
    width: 100%;
    height: calc(100% - 2px);
    border-radius: 10px;
    border: 1px solid;
    border-color: ${({ isDragging, theme }) =>
      isDragging ? COLORS.blue[500] : theme?.textColor?.primary};
    transition: all 200ms;
  }
`;

export const SectionHandleZone = styled.div<{ isDragging: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 4px;
  right: 4px;
  height: calc(100% - 34px);
  width: 24px;
  border-radius: 6px;
  background: ${({ theme }) => theme?.textColor?.primary};
  color: ${({ theme }) => theme?.background?.primary};
  writing-mode: vertical-rl;
`;

export const DeleteSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 4px;
  right: 4px;
  padding: 2px;
  width: 24px;
  border-radius: 6px;
  font-size: 12px;
  cursor: pointer;
  color: ${({ theme }) => theme?.background?.primary};
  background: ${({ theme }) => theme?.textColor?.primary};
`;

export const SectionWrapper = styled.div<{ isDragging: boolean }>`
  position: relative;
  padding: 1px;
  width: calc(100% - 30px);
  border-radius: 10px;
`;

export const SettingsPopupList = styled.div`
  backdrop-filter: blur(4px);
`;

export const SettingsItemButton = styled.div`
  display: flex;
  background: ${({ theme }) => rgba(theme?.textColor?.primary, 0.1)};
  color: ${({ theme }) => theme?.textColor?.primary};
  border-radius: 16px;
  margin-bottom: 6px;
  padding: 8px 10px;
  transition: all 200ms ease-out;

  &:first-child {
    border-top: none;
  }
  &:last-child {
    border-bottom: none;
  }

  :hover {
    background: ${({ theme }) => rgba(theme?.textColor?.primary, 0.2)};
  }

  cursor: pointer;
  user-select: none;
`;

export const CustomCheckbox = styled.div<{ isChecked?: boolean; isVisible?: boolean }>`
  display: flex;
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)}
  align-items: center;
  justify-content: center;
  position: absolute;
  right: -24px;
  top: 4px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 1px solid
    ${({ isChecked, theme }) => (isChecked ? '#2EE59D' : theme.borderColor.contrast)};
  background: ${({ isChecked }) => (isChecked ? '#2EE59D' : 'inherit')};
  cursor: pointer;
  transition: all 200ms;

  &:before {
    content: '';
    width: 8px;
    height: 4px;
    border-bottom: 2px solid ${({ theme }) => theme?.background?.primary};
    border-left: 2px solid ${({ theme }) => theme?.background?.primary};
    opacity: ${({ isChecked }) => (isChecked ? 1 : 0)};
    transform: rotate(-45deg) translate(-2px,1px);
  }
`;

export const AcceptButton = styled.div`
  position: absolute;
  bottom: ${({ theme }) => (theme?.isMobile ? 180 : 80)}px;
  right: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${COLORS.blue[500]};
  color: ${COLORS.white};
  backdrop-filter: blur(8px);
  border-radius: 16px;
  margin-bottom: 4px;
  padding: 8px 10px;
  transition: all 200ms ease-out;

  cursor: pointer;
  user-select: none;
`;

export const CancelButton = styled.div`
  position: absolute;
  bottom: ${({ theme }) => (theme?.isMobile ? 180 : 80)}px;
  left: 32px;

  display: flex;
  align-items: center;
  justify-content: center;
  background: ${COLORS.blue[500]};
  color: ${COLORS.white};
  backdrop-filter: blur(8px);
  border-radius: 16px;
  margin-bottom: 4px;
  padding: 8px 10px;
  transition: all 200ms ease-out;

  cursor: pointer;
  user-select: none;
`;

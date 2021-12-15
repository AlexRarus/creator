import styled from 'styled-components';
import { rgba } from 'polished';
import { Grid } from 'src/components/grid';
import { MobileView, BrowserView } from 'react-device-detect';

import { COLORS, MEDIA } from '../../../../components/theme';

import { FORM_HEADER_HEIGHT, FORM_FOOTER_HEIGHT } from './page-form/style';

export const StyledGrid = styled(Grid)`
  flex-grow: 1;
`;

export const DesktopPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

export const BlockWrapper = styled.div`
  height: 100%;
`;

export const ScaleBlock = styled.div`
  height: 100%;
  transform: scale(0.85);
`;

export const EditorWrapper = styled.div<{ isForm: boolean }>`
  display: flex;
  justify-content: center;
  position: relative;
  width: 100%;
  height: 100%;

  box-shadow: 0px 0px 10px ${({ theme }) => rgba(theme?.borderColor?.contrast, 0.1)};

  overflow: hidden;
  padding-bottom: ${({ isForm }) => (isForm ? FORM_FOOTER_HEIGHT : 0)}px;
`;

export const StyledMobileView = styled(MobileView)`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

export const StyledBrowserView = styled(BrowserView)`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

export const FlexBlock = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

export const EditorHeader = styled.div`
  width: 100%;
  height: 64px;
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
  height: 24px;
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

export const LinkActionBlock = styled.div`
  display: flex;
  align-items: center;
  min-width: ${FORM_FOOTER_HEIGHT}px;
  min-height: ${FORM_FOOTER_HEIGHT}px;
  border-left: 1px solid ${COLORS.grey[500]};
  border-right: 1px solid ${COLORS.grey[500]};
  transition: all 200ms;

  :first-child {
    border-left: none;
  }
  :last-child {
    border-right: none;
  }
`;

export const ActionWrapper = styled.div<{ isHide?: boolean }>`
  display: flex;
  width: ${({ isHide }) => (isHide ? 0 : 64)}px;
  opacity: ${({ isHide }) => (isHide ? 0 : 1)};
  height: 100%;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  overflow: hidden;
  transition: all 200ms;
`;

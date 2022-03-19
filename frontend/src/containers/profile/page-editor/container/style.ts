import styled, { css } from 'styled-components';
import { rgba } from 'polished';
import { Grid } from 'src/components/grid';
import { MobileView, BrowserView } from 'react-device-detect';

import { COLORS, MEDIA } from '../../../../components/theme';

import { FORM_FOOTER_HEIGHT } from './page-form/style';

export const StyledGrid = styled(Grid)`
  flex-grow: 1;
`;

export const DesktopPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: 0 20px;
}
`;

export const BlockWrapper = styled.div`
  height: 100%;
`;

// TODO скалированный блок приходится поднимать вверх, для того чтобы он стоял как scale(1)
export const ScaleBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  position: absolute;
  left: 50%;
  transform: scale(0.9) translateX(-50%);
`;

export const EditorWrapper = styled.div<{ isForm: boolean }>`
  display: flex;
  justify-content: center;
  position: relative;
  width: 100%;
  height: 100%;
  margin: 12px;
  border-radius: 16px;
  overflow: hidden;

  box-shadow: 0 2px 30px 0 ${({ theme }) => rgba(theme?.borderColor?.contrast, 0.1)};
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

export const EditorHeader = styled.div`
  width: 100%;
  height: 64px;
  background: ${({ theme }) => rgba(theme?.textColor?.primary, 0.1)};
  color: ${({ theme }) => theme?.textColor?.primary};
  backdrop-filter: blur(4px);
  display: flex;
  flex-direction: row;
  padding: 10px 0 10px 10px;
  justify-content: space-between;
  align-items: center;
  border-radius: 16px;
  margin-top: 8px;

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
  color: ${({ theme }) => theme?.textColor?.secondary};
`;

export const LinkToPageValue = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  color: ${({ theme }) => theme?.textColor?.primary};
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
    color: ${({ theme }) => theme?.textColor?.primary};
    background-clip: content-box;
  }
`;

export const PrefixPath = styled.span`
  color: ${({ theme }) => theme?.textColor?.primary};
`;

export const PageSlug = styled.span`
  color: ${({ theme }) => theme?.textColor?.primary};
`;

export const LinkCopyIndicator = styled.div`
  position: absolute;
  top: 0;
  right: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme?.textColor?.primary};
  font-size: 13px;

  svg {
    margin-left: 5px;
    fill: ${({ theme }) => theme?.textColor?.primary};
    width: 16px;
    height: 16px;
  }
`;

export const LinkActionBlock = styled.div`
  display: flex;
  align-items: center;
  min-width: ${FORM_FOOTER_HEIGHT}px;
  min-height: ${FORM_FOOTER_HEIGHT}px;
  border-left: 1px solid ${({ theme }) => theme?.textColor?.primary};
  border-left: 1px solid ${({ theme }) => theme?.textColor?.primary};
  border-right: 1px solid ${({ theme }) => theme?.textColor?.primary};
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

export const PreviewWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: center;
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

export const PreviewFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 0;
  bottom: 0;
  height: 64px;
  width: 100%;
  background: ${rgba(COLORS.grey[800], 0.85)};
  color: ${COLORS.white};
  display: flex;
  flex-direction: row;
  backdrop-filter: blur(4px);
  z-index: 1;
`;

export const FooterMainButton = styled.div``;

export const FlexBlock = styled.div<{ appType: string }>`
  display: flex;
  flex-direction: column;
  flex-grow: 1;

  ${({ theme, appType }: any) =>
    theme?.isMobile && appType === 'app'
      ? css`
          height: 100vh;
          padding-bottom: 80px;
          overflow: auto;
        `
      : css``}
`;

import styled, { css } from 'styled-components';
import { rgba } from 'polished';
import { Grid } from 'src/components/grid';
import { MobileView, BrowserView } from 'react-device-detect';
import { COLORS } from 'src/components/theme';

export const StyledGrid = styled(Grid)`
  flex-grow: 1;
`;

export const DesktopTemplateWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: 0 20px;
}
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

export const LinkToTemplateField = styled.div`
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
  flex-direction: row;
  backdrop-filter: blur(4px);
  z-index: 1;
`;

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

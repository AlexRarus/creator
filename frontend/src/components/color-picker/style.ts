import styled from 'styled-components';
import { COLORS } from 'src/components/theme';

export const ColorPreviewWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 60px;
  padding-top: 13px;
  height: 100%;
`;

export const ColorPreview = styled.div<{ background?: string; hasBorder?: boolean }>`
  position: relative;
  z-index: 50;
  width: 100%;
  height: 28px;
  cursor: pointer;
  border: ${({ hasBorder }) => (hasBorder ? `1px solid ${COLORS.black}` : 'none')};
  background: ${({ background = 'transparent' }) => background};
`;

export const PalleteWrapper = styled.div`
  height: 100%;
  background: ${COLORS.white};

  .swatches-picker {
    width: 100% !important;
    height: 100% !important;

    & > div {
      height: 100% !important;

      & > div {
        height: 100% !important;

        & > div {
          height: 100% !important;
        }
      }
    }
  }
`;

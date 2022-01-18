import styled from 'styled-components';
import { COLORS } from 'src/components/theme';
import { isMobile } from 'react-device-detect';

export const ColorPreviewWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 60px;
  padding-top: 13px;
  height: 100%;
`;

export const FormWrapper = styled.div`
  height: 100%;
`;

export const ColorPickerWrapper = styled.div`
  width: 100%;
  background: ${COLORS.white};

  & .chrome-picker {
    width: ${isMobile ? '100%' : '300px'} !important;
    box-shadow: none !important;
  }
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
